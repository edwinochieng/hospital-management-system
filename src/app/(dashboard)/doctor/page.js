import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

const fetchAppointments = async (email) => {
  const res = await fetch(
    `${process.env.BASE_URL}/api/doctor/getAppointments/${email}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
export default async function DoctorDashboard() {
  const session = await getServerSession();
  const email = session.user?.email;
  const appointments = await fetchAppointments(email);
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='text-3xl font-semibold text-gray-700'>
        <p>Dr. {session.user?.name}</p>
      </div>
      <div className='flex flex-row space-x-8 mt-10'>
        <div>
          <Link
            href='/doctor/appointments'
            className='bg-white rounded-xl text-lg w-[300px] py-12 shadow-2xl flex flex-col items-center '
          >
            <p>Appointments</p>
            <p className='text-5xl mt-1'>{appointments.length}</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
