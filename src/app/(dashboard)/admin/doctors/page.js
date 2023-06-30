import React from "react";

const fetchDoctors = async () => {
  const res = await fetch(`${process.env.BASE_URL}/api/admin/getDoctorList`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
export default async function DoctorsList() {
  const doctors = await fetchDoctors();
  return (
    <div className='max-w-[1000px] mx-auto'>
      <table className='w-full bg-white border border-gray-200 rounded shadow'>
        <thead>
          <tr className='bg-gray-100'>
            <th className='px-4 py-2 font-semibold text-left'>Name</th>
            <th className='px-4 py-2 font-semibold text-left'>Email</th>
            <th className='px-4 py-2 font-semibold text-left'>
              Specialization
            </th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor.id} className='border-b border-gray-200'>
              <td className='px-4 py-2'>{doctor.name}</td>
              <td className='px-4 py-2'>{doctor.email}</td>
              <td className='px-4 py-2'>{doctor.specialization}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
