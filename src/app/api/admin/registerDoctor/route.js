import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import sendRegistrationEmail from "../../../../../utils/notifications/registrationEmail";
import prisma from "../../../../../prisma/client";

const saltRounds = 10;

export async function POST(req) {
  const { name, email, specialization } = await req.json();
  console.log(name, email, specialization);

  if (!name || !email || !email.includes("@") || !specialization) {
    return NextResponse.json({
      message: "Validation Error",
    });
    return;
  }

  try {
    const existingDoctor = await prisma.doctor.findUnique({
      where: { email: email },
    });

    if (existingDoctor) {
      return NextResponse.json({
        message: "User already exists",
      });
      return;
    }

    const latestRegistrationNumber = await prisma.doctor.findFirst({
      orderBy: {
        doctorId: "desc",
      },
      select: {
        doctorId: true,
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

    sendRegistrationEmail({
      name,
      email,
      username: newDoctor.doctorId,
      password,
    });

    return NextResponse.json({
      message: "Doctor registered successfully",
    });
  } catch (err) {
    return NextResponse.json({ message: "Server error" });
  }
}
