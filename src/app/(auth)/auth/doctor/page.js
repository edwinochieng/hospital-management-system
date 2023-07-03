"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { getError } from "../../../../../utils/error";
import { signIn, useSession } from "next-auth/react";

export default function DoctorLogin() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user.role === "doctor") {
      router.push("/doctor");
      toast.success("Logged In successfuly");
    }
  }, [router, session]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ username, password }) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        username,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <div className='max-w-[700px] mx-auto'>
      <form
        className='bg-white space-y-4 rounded-xl py-8 px-8 shadow-2xl'
        onSubmit={handleSubmit(submitHandler)}
      >
        <p className='text-lg font-medium'>Doctor Login</p>

        <div>
          <label htmlFor='email' className='text-sm font-medium'>
            Username
          </label>

          <div className='relative mt-1'>
            <input
              {...register("username", {
                required: "Please enter your email",
              })}
              className='w-full rounded-lg border border-gray-200 p-4 pr-12 text-sm focus:outline-indigo-500'
              placeholder='Enter email.'
            />
            {errors.username && (
              <span className='text-red-500 pt-1 text-sm'>
                {errors.username.message}
              </span>
            )}
          </div>
        </div>

        <div>
          <label htmlFor='password' className='text-sm font-medium'>
            Password
          </label>

          <div className='relative mt-1'>
            <input
              {...register("password", {
                required: "Please enter your password",
              })}
              type='password'
              id='password'
              className='w-full rounded-lg border border-gray-200 p-4 pr-12 text-sm focus:outline-indigo-500'
              placeholder='Enter password'
            />
            {errors.password && (
              <span className='text-red-500 pt-1 text-sm'>
                {errors.password.message}
              </span>
            )}
          </div>
        </div>

        <button
          type='submit'
          className='block w-full rounded-lg bg-indigo-500 px-5 py-3 text-sm font-medium text-white'
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
