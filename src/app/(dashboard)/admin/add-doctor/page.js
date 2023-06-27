"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { getError } from "../../../../../utils/error";
import { toast } from "react-hot-toast";

export default function AddDoctor() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ name, email, specialization }) => {
    try {
      await axios.post("/api/admin/registerDoctor", {
        name,
        email,
        specialization,
      });
    } catch (err) {
      toast.error(getError(err));
    }
  };
  return (
    <div className='max-w-[700px] mx-auto'>
      <form
        className='bg-white  mt-24 lg:mt-12 mb-0 space-y-4 rounded-xl py-8 px-3 sm:px-8 shadow-2xl'
        onSubmit={handleSubmit(submitHandler)}
      >
        <p className='text-lg font-medium'>Register New Doctor</p>

        <div>
          <label htmlFor='name' className='text-sm font-medium'>
            Name
          </label>

          <div className='relative mt-1'>
            <input
              {...register("name", {
                required: "Please enter name",
              })}
              type='name'
              id='name'
              className='w-full rounded-lg border border-gray-200 p-3 sm:p-4 pr-12 text-sm focus:outline-indigo-500'
              placeholder='Enter name'
            />
            {errors.name && (
              <span className='text-red-500 pt-1 text-sm'>
                {errors.name.message}
              </span>
            )}
          </div>
        </div>

        <div>
          <label htmlFor='email' className='text-sm font-medium'>
            Email
          </label>

          <div className='relative mt-1'>
            <input
              {...register("email", {
                required: "Please enter email",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA_Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                  message: "Please enter valid email",
                },
              })}
              type='email'
              id='email'
              className='w-full rounded-lg border border-gray-200 p-3 sm:p-4 pr-12 text-sm focus:outline-indigo-500'
              placeholder='Enter email'
            />
            {errors.email && (
              <span className='text-red-500 pt-1 text-sm'>
                {errors.email.message}
              </span>
            )}
          </div>
        </div>

        <div>
          <label htmlFor='specialization' className='text-sm font-medium'>
            Specialization
          </label>

          <div className='relative mt-1'>
            <input
              {...register("specialization", {
                required: "Please enter specialization",
              })}
              id='specialization'
              className='w-full rounded-lg border border-gray-200 p-3 sm:p-4 pr-12 text-sm focus:outline-indigo-500'
              placeholder='Enter specialization'
            />
            {errors.specialization && (
              <span className='text-red-500 pt-1'>
                {errors.specialization.message}
              </span>
            )}
          </div>
        </div>

        <button
          type='submit'
          className='block w-full rounded-lg bg-indigo-500 px-5 py-3 text-sm font-medium text-white'
        >
          Register
        </button>
      </form>
    </div>
  );
}
