"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export default function SideBar({ items }) {
  const pathname = usePathname();
  return (
    <div className='h-screen bg-white w-[350px]'>
      <nav className='p-3'>
        <ul className='mt-20'>
          {items.map((item, index) => {
            const isActive = pathname.endsWith(item.link);
            return (
              <li
                key={index}
                className={`mb-2 font-medium text-gray-800 p-2 rounded-md hover:bg-gray-200 ${
                  isActive ? "bg-gray-300" : "bg-white"
                }`}
              >
                <Link href={item.link}>{item.title}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
