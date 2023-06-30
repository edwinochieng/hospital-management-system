import SideBar from "@/components/SideBar";

const sidebarItems = [
  { title: "Patient Registration", link: "/receptionist" },
  { title: "Search Patient", link: "/receptionist/patients" },
];

export default function ReceptionistLayout({ children }) {
  return (
    <div className='flex flex-row'>
      <SideBar items={sidebarItems} />
      <div className='bg-gray-100 w-full h-screen pt-24'>{children}</div>
    </div>
  );
}
