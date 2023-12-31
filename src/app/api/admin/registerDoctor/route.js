import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "../../../../../prisma/client";

const saltRounds = 10;

export async function POST(req) {
  const { name, email } = await req.json();
  console.log(name, email);

  if (!name || !email || !email.includes("@")) {
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
        message: "Doctor already exists",
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

    let nextRegistrationNumber = 1;
    if (latestRegistrationNumber) {
      const latestNumber = parseInt(
        latestRegistrationNumber.doctorId.substring(3),
        10
      );
      nextRegistrationNumber = latestNumber + 1;
    }

    const formattedRegistrationNumber = `DR-${nextRegistrationNumber
      .toString()
      .padStart(3, "0")}`;

    const password = Math.floor(100000 + Math.random() * 900000).toString();

    const newDoctor = await prisma.doctor.create({
      data: {
        doctorId: formattedRegistrationNumber,
        name,
        email,
        password: bcrypt.hashSync("123456", saltRounds),
      },
    });

    return NextResponse.json({
      message: "Doctor registered successfully",
    });
  } catch (err) {
    return NextResponse.json({ message: "Server error" });
  }
}
