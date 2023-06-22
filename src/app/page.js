import Image from "next/image";
import admin from "../../public/admin.png";
import doctor from "../../public/doctor.png";
import staff from "../../public/nurse.png";
import Link from "next/link";

export default function Home() {
  return (
    <div className='flex justify-center mt-36'>
      <div className='flex flex-row space-x-8'>
        <div className='bg-gray-100 rounded-lg w-[200px] h-[250px] cursor-pointer p-2'>
          <Link href='auth/admin'>
            <Image src={admin} alt='administrator' />
            <div className='text-center text-lg my-1'>Admin</div>
          </Link>
        </div>
        <div className='bg-gray-100 rounded-lg w-[200px] h-[250px] cursor-pointer p-2'>
          <Link href='auth/doctor'>
            <Image src={doctor} alt='doctor' />
            <div className='text-center text-lg my-1'>Doctor</div>
          </Link>
        </div>
        <div className='bg-gray-100 rounded-lg w-[200px] h-[250px] cursor-pointer p-2'>
          <Link href='auth/staff'>
            <Image src={staff} alt='staff' />
            <div className='text-center text-lg my-1'>Staff</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
