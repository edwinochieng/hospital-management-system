import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import sendRegistrationEmail from "../../../../../utils/notifications/registrationEmail";

const saltRounds = 10;

export async function POST() {
  try {
    const { name, email, specialization } = req.body;

    if (!name || !email || !email.includes("@") || !specialization) {
      NextResponse.status(422).send({
        message: "Validation Error",
      });
      return;
    }

    const existingDoctor = await prisma.doctor.findUnique({
      where: { email: email },
    });

    if (existingDoctor) {
      res.status(422).send({
        message: "User already exists",
      });
      return;
    }

    const latestRegistrationNumber = await prisma.doctor.findFirst({
      orderBy: {
        registrationNumber: "desc",
      },
      select: {
        registrationNumber: true,
      },
    });

    // Calculate the next registration number
    let nextRegistrationNumber = 1;
    if (latestRegistrationNumber) {
      const latestNumber = parseInt(
        latestRegistrationNumber.registrationNumber.substring(3),
        10
      );
      nextRegistrationNumber = latestNumber + 1;
    }

    // Format the registration number with leading zeros
    const formattedRegistrationNumber = `DR-${nextRegistrationNumber
      .toString()
      .padStart(3, "0")}`;

    const password = Math.floor(100000 + Math.random() * 900000).toString();

    const newDoctor = await prisma.doctor.create({
      data: {
        doctorId: formattedRegistrationNumber,
        name,
        email,
        specialization,
        password: bcrypt.hashSync(password, saltRounds),
      },
    });

    await sendRegistrationEmail({
      name,
      email,
      username: newDoctor.doctorId,
      password,
    });

    return NextResponse.json({
      message: "Doctor registered successfully",
    });
  } catch (err) {
    NextResponse.status(500).send({ message: "Server error" });
  }
}
