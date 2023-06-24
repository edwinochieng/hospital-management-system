"use client";
import React from "react";
import { useForm } from "react-hook-form";

export default function AddStaff() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = () => {};
  return (
    <div className='max-w-[700px] mx-auto'>
      <form
        className='bg-white  mt-24 lg:mt-12 mb-0 space-y-4 rounded-xl py-8 px-3 sm:px-8 shadow-2xl'
        onSubmit={handleSubmit(submitHandler)}
      >
        <p className='text-lg font-medium'>Register New Staff</p>

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

        <div className='mb-4 relative'>
          <label htmlFor='role' className='text-sm font-medium'>
            Role
          </label>
          <div className='mt-1'>
            <select
              id='role'
              {...register("role", { required: "Role is required" })}
              className='w-full rounded-lg border border-gray-200 p-4 pr-12 text-sm focus:outline-indigo-500 '
            >
              <option>Select Role</option>
              <option value='Nurse' className='py-1'>
                Nurse
              </option>
              <option value='Receptionist' className='py-1'>
                Receptionist
              </option>
            </select>
            {errors.role && (
              <span className='text-red-500 pt-1 text-sm'>
                {errors.role.message}
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
