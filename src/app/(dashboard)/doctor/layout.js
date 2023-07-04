import SideBar from "@/components/SideBar";

const sidebarItems = [
  { title: "Overview", link: "/doctor" },
  { title: "Appointments", link: "/doctor/appointments" },
];

export default function DoctorDashBoardLayout({ children }) {
  return (
    <div className='flex flex-row'>
      <SideBar items={sidebarItems} />
      <div className='bg-gray-100 w-full h-screen pt-24'>{children}</div>
    </div>
  );
}
