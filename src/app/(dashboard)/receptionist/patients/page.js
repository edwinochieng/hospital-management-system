"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { getError } from "../../../../../utils/error";

export default function SearchPatients() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ name }) => {
    try {
      await axios.post("/api/receptionist/registerPatient", {
        name,
      });
      toast.success("Patient registered successfully");
    } catch (err) {
      toast.error(getError(err));
    }
  };
  return (
    <div>
      <div className='max-w-[700px] mx-auto'>
        <form
          className='bg-white rounded-xl p-8 shadow-2xl'
          onSubmit={handleSubmit(submitHandler)}
        >
          <p className='text-lg font-medium'>Search Patient</p>
          <div className='flex flex-row items-center space-x-4 w-full'>
            <div className='relative w-full'>
              <input
                {...register("name", {
                  required: "Please enter name",
                })}
                type='name'
                id='name'
                className='w-full rounded-lg border border-gray-200 p-4 pr-12 text-sm focus:outline-indigo-500'
                placeholder='Enter name'
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
          {errors.name && (
            <span className='text-red-500 pt-1 text-sm'>
              {errors.name.message}
            </span>
          )}
        </form>
      </div>
    </div>
  );
}
