import SideBar from "@/components/SideBar";

const sidebarItems = [
  { title: "Overview", link: "/admin" },
  { title: "Doctor List", link: "/admin/doctors" },
  { title: "Patient List", link: "/admin/patients" },
  { title: "Staff List", link: "/admin/staff" },
  { title: "Add New Doctor", link: "/admin/add-doctor" },
  { title: "Add New Staff", link: "/admin/add-staff" },
];

export default function AdminLayout({ children }) {
  return (
    <div className='flex flex-row'>
      <SideBar items={sidebarItems} />
      <div className='bg-gray-100 w-full h-screen pt-24'>{children}</div>
    </div>
  );
}
