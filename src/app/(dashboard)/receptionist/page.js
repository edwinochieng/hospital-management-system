"use client";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { getError } from "../../../../utils/error";
import { toast } from "react-hot-toast";

export default function ReceptionistDashboard() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ name, email, age, gender }) => {
    try {
      await axios.post("/api/receptionist/registerPatient", {
        name,
        email,
        age,
        gender,
      });
      toast.success("Patient registered successfully");
    } catch (err) {
      toast.error(getError(err));
    }
  };
  return (
    <div className='max-w-[700px] mx-auto'>
      <form
        className='bg-white  mb-0 space-y-4 rounded-xl py-8 px-3 sm:px-8 shadow-2xl'
        onSubmit={handleSubmit(submitHandler)}
      >
        <p className='text-lg font-medium'>Register New Patient</p>

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
          <label htmlFor='email' className='text-sm font-medium'>
            Age
          </label>

          <div className='relative mt-1'>
            <input
              {...register("age", {
                required: "Please enter age",
              })}
              type='text'
              id='age'
              className='w-full rounded-lg border border-gray-200 p-3 sm:p-4 pr-12 text-sm focus:outline-indigo-500'
              placeholder='Enter age'
            />
            {errors.age && (
              <span className='text-red-500 pt-1 text-sm'>
                {errors.age.message}
              </span>
            )}
          </div>
        </div>

        <div>
          <label htmlFor='specialization' className='text-sm font-medium'>
            Gender
          </label>

          <div className='flex flex-row space-x-8 mt-1'>
            <div className='flex items-center mb-4'>
              <input
                type='radio'
                id='male'
                name='gender'
                value='Male'
                className='mr-2'
                {...register("gender", { required: "Please select gender" })}
              />
              <label htmlFor='male' className='text-sm'>
                Male
              </label>
            </div>

            <div className='flex items-center mb-4'>
              <input
                type='radio'
                id='female'
                name='gender'
                value='Female'
                className='mr-2'
                {...register("gender", { required: "Please select gender" })}
              />
              <label htmlFor='female' className='text-sm'>
                Female
              </label>
            </div>
          </div>

          {errors.gender && (
            <span className='text-red-500 text-sm pt-1'>
              {errors.gender.message}
            </span>
          )}
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
