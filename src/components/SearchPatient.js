"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AppointmentForm from "./AppointmentForm";

export default function SearchPatients({ results, doctors }) {
  const [patients, setPatients] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ searchTerm }) => {
    const filteredPatients = results?.filter(
      (patient) =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setPatients(filteredPatients);
  };

  return (
    <div>
      <div className='max-w-[700px] mx-auto'>
        <form
          className='bg-white rounded-xl p-8 shadow-2xl'
          onSubmit={handleSubmit(submitHandler)}
        >
          <p className='text-lg font-medium mb-2'>Search Patient</p>
          <div className='flex flex-row items-center space-x-4 w-full'>
            <div className='relative w-full'>
              <input
                {...register("searchTerm", {
                  required: "Please enter search input",
                })}
                type='text'
                id='searchTerm'
                className='w-full rounded-lg border border-gray-200 p-4 pr-12 text-sm focus:outline-indigo-500'
                placeholder='Search by name or email'
              />
            </div>

            <div className='w-[100px]'>
              <button
                type='submit'
                className='w-full rounded-lg bg-indigo-500 p-4 text-sm font-medium text-white'
              >
                Search
              </button>
            </div>
          </div>
          {errors.searchTerm && (
            <span className='text-red-500 pt-1 text-sm'>
              {errors.searchTerm.message}
            </span>
          )}
        </form>
      </div>
      <div className='px-8 mt-10'>
        {patients.length === 0 ? (
          <div className='text-center text-lg font-semibold mt-10'>
            No Results found!
          </div>
        ) : (
          <div>
            {patients.map((patient) => (
              <div
                key={patient.id}
                className='flex flex-row justify-between items-center bg-white rounded-lg p-5 '
              >
                <div>
                  <p>Name: {patient.name}</p>
                  <p>Email: {patient.email}</p>
                </div>

                <AppointmentForm doctors={doctors} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
