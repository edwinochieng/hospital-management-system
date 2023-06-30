import React from "react";

const fetchStaff = async () => {
  const res = await fetch(`${process.env.BASE_URL}/api/admin/getStaffList`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export default async function StaffList() {
  const staffList = await fetchStaff();
  return (
    <div className='max-w-[1000px] mx-auto'>
      <table className='w-full bg-white border border-gray-200 rounded shadow'>
        <thead>
          <tr className='bg-gray-100'>
            <th className='px-4 py-2 font-semibold text-left'>Name</th>
            <th className='px-4 py-2 font-semibold text-left'>Email</th>
            <th className='px-4 py-2 font-semibold text-left'>Role</th>
          </tr>
        </thead>
        <tbody>
          {staffList.map((staff) => (
            <tr key={staff.id} className='border-b border-gray-200'>
              <td className='px-4 py-2'>{staff.name}</td>
              <td className='px-4 py-2'>{staff.email}</td>
              <td className='px-4 py-2'>{staff.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
