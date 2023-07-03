import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function GET() {
  try {
    const data = await prisma.patient.findMany();

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ message: "Server error" });
  }
}
