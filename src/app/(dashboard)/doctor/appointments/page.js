import { getServerSession } from "next-auth";
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
export default async function Appointments() {
  const session = await getServerSession();
  const email = session.user?.email;
  const appointments = await fetchAppointments(email);

  const formatDate = (date) => {
    const appointmentDate = new Date(date);
    return appointmentDate.toLocaleDateString();
  };

  const formatTime = (date) => {
    const appointmentDate = new Date(date);
    const hours = appointmentDate.getHours();
    const minutes = appointmentDate.getMinutes();
    return `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;
  };
  return (
    <div className='max-w-[1000px] mx-auto'>
      {appointments.length == 0 ? (
        <div className='flex justify-center items-center'>
          <div className='text-gray-800 font-semibold text-2xl'>
            {" "}
            You have no appointments!
          </div>
        </div>
      ) : (
        <table className='w-full bg-white border border-gray-200 rounded shadow'>
          <thead>
            <tr className='bg-gray-100'>
              <th className='px-4 py-2 font-semibold text-left'>Patient</th>
              <th className='px-4 py-2 font-semibold text-left'>Email</th>
              <th className='px-4 py-2 font-semibold text-left'>Date</th>
              <th className='px-4 py-2 font-semibold text-left'>Time</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id} className='border-b border-gray-200'>
                <td className='px-4 py-2'>{appointment.patient.name}</td>
                <td className='px-4 py-2'>{appointment.patient.email}</td>
                <td className='px-4 py-2'>{formatDate(appointment.date)}</td>
                <td className='px-4 py-2'>{formatTime(appointment.date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
