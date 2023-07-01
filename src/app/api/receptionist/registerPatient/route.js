import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function POST(req) {
  const { name, email, age, gender } = await req.json();

  if (!name || !email || !email.includes("@") || !gender || !age) {
    return NextResponse.json({
      message: "Validation Error",
    });
    return;
  }

  try {
    const existingPatient = await prisma.patient.findUnique({
      where: { email: email },
    });

    if (existingPatient) {
      return NextResponse.json({
        message: "Patient already exists",
      });
      return;
    }

    const newPatient = await prisma.patient.create({
      data: {
        name,
        email,
        age,
        gender,
      },
    });

    return NextResponse.json({
      message: "Patient registered successfully",
    });
  } catch (err) {
    return NextResponse.json({ message: "Server error" });
  }
}
