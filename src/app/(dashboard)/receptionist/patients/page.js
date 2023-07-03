import SearchPatients from "@/components/SearchPatient";
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
export default async function Patients() {
  const data = await getPatients();
  const doctors = await fetchDoctors();

  return <SearchPatients results={data} doctors={doctors} />;
}
