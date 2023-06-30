import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "../../../../../prisma/client";

const saltRounds = 10;

export async function POST(req) {
  const { name, email, role } = await req.json();
  console.log(name, email, role);

  if (!name || !email || !email.includes("@") || !role) {
    return NextResponse.json({
      message: "Validation Error",
    });
    return;
  }

  try {
    const existingStaff = await prisma.staff.findUnique({
      where: { email: email },
    });

    if (existingStaff) {
      return NextResponse.json({
        message: "User already exists",
      });
      return;
    }

    const latestRegistrationNumber = await prisma.staff.findFirst({
      orderBy: {
        staffId: "desc",
      },
      select: {
        staffId: true,
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
    const formattedRegistrationNumber = `ST-${nextRegistrationNumber
      .toString()
      .padStart(3, "0")}`;

    const password = Math.floor(100000 + Math.random() * 900000).toString();

    const newStaff = await prisma.staff.create({
      data: {
        staffId: formattedRegistrationNumber,
        name,
        email,
        role,
        password: bcrypt.hashSync(password, saltRounds),
      },
    });

    return NextResponse.json({
      message: `${role} registered successfully`,
    });
  } catch (err) {
    return NextResponse.json({ message: "Server error" });
  }
}
