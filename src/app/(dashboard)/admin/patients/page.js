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
export default async function PatientsList() {
  const data = await getPatients();
  return (
    <div className='max-w-[1000px] mx-auto'>
      <table className='w-full bg-white border border-gray-200 rounded shadow'>
        <thead>
          <tr className='bg-gray-100'>
            <th className='px-4 py-2 font-semibold text-left'>Name</th>
            <th className='px-4 py-2 font-semibold text-left'>Email</th>
            <th className='px-4 py-2 font-semibold text-left'>Gender</th>
          </tr>
        </thead>
        <tbody>
          {data.map((patient) => (
            <tr key={patient.id} className='border-b border-gray-200'>
              <td className='px-4 py-2'>{patient.name}</td>
              <td className='px-4 py-2'>{patient.email}</td>
              <td className='px-4 py-2'>{patient.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
