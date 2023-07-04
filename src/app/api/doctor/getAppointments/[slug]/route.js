import { NextResponse } from "next/server";
import prisma from "../../../../../../prisma/client";

export async function GET(res, { params }) {
  const email = params.slug;

  try {
    const doctor = await prisma.doctor.findUnique({ where: { email: email } });

    const appointments = await prisma.appointment.findMany({
      where: {
        doctor: {
          id: doctor.id,
        },
      },
      include: {
        patient: true,
      },
    });

    return NextResponse.json(appointments);
  } catch (err) {
    return NextResponse.json({ message: "Server error" });
  }
}
