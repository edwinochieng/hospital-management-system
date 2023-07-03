import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function POST(req) {
  const { date, time, doctor, patientId } = await req.json();

  if (!date || !time || !doctor || !patientId) {
    return NextResponse.json({
      message: "Validation Error",
    });
    return;
  }

  try {
    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        doctor: {
          id: doctor,
        },
        date: {
          equals: new Date(`${date} ${time}`),
        },
      },
    });
    if (existingAppointment) {
      return NextResponse.json({
        message: "Doctor is already booked at the specified date and time.",
      });
    }

    const appointment = await prisma.appointment.create({
      data: {
        date: new Date(`${date} ${time}`),
        doctor: {
          connect: {
            id: doctor,
          },
        },
        patient: {
          connect: {
            id: patientId,
          },
        },
      },
    });
    return NextResponse.json({
      message: "Appointment booked successfully",
    });
  } catch (err) {
    return NextResponse.json({ message: "Server error" });
  }
}
