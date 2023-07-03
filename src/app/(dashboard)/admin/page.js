import Link from "next/link";
import React from "react";

const getPatients = async () => {
  const res = await fetch(`${process.env.BASE_URL}/api/patients`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

const fetchDoctors = async () => {
  const res = await fetch(`${process.env.BASE_URL}/api/admin/getDoctorList`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export default async function AdminDashboard() {
  const fetchedDoctors = await fetchDoctors();
  const fetchedPatients = await getPatients();

  const [doctors, patients] = await Promise.all([
    fetchedDoctors,
    fetchedPatients,
  ]);
  return (
    <div className='flex justify-center'>
      <div className='flex flex-row space-x-8'>
        <div>
          <Link
            href='/admin/doctors'
            className='bg-white rounded-xl text-lg w-[300px] py-12 shadow-2xl flex flex-col items-center '
          >
            <p>Doctors</p>
            <p className='text-5xl mt-1'>{doctors.length}</p>
          </Link>
        </div>
        <div>
          <Link
            href='/admin/patients'
            className='bg-white rounded-xl text-lg w-[300px] py-12 shadow-2xl flex flex-col items-center '
          >
            <p>Patients</p>
            <p className='text-5xl mt-1'>{patients.length}</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
