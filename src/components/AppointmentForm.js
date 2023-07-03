import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { getError } from "../../utils/error";
import axios from "axios";

export default function AppointmentForm({ doctors, patientId }) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ date, time, doctor }) => {
    try {
      await axios.post("/api/receptionist/bookAppointment", {
        date,
        time,
        doctor,
        patientId,
      });
      toast.success("Appointment booked");
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <div>
      <button
        className='bg-indigo-500 text-white px-4 py-2 rounded'
        onClick={() => setIsOpen(true)}
      >
        Book Appointment
      </button>
      {isOpen && (
        <div className='fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-500 bg-opacity-50'>
          <div className='w-[700px] '>
            <form
              onSubmit={handleSubmit(submitHandler)}
              className='bg-white  mb-0 space-y-4 rounded-xl py-8 px-3 sm:px-8 shadow-2xl'
            >
              <p className='text-lg font-medium'>Book Appointment</p>

              <div>
                <label htmlFor='date' className='text-sm font-medium'>
                  Date
                </label>

                <div className='relative mt-1'>
                  <input
                    {...register("date", {
                      required: "Please enter date",
                    })}
                    type='date'
                    id='date'
                    className='w-full rounded-lg border border-gray-200 p-3 sm:p-4 pr-12 text-sm focus:outline-indigo-500'
                    placeholder='Enter name'
                  />
                  {errors.date && (
                    <span className='text-red-500 pt-1 text-sm'>
                      {errors.date.message}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor='email' className='text-sm font-medium'>
                  Time
                </label>

                <div className='relative mt-1'>
                  <input
                    {...register("time", {
                      required: "Please enter time",
                    })}
                    type='time'
                    id='time'
                    className='w-full rounded-lg border border-gray-200 p-3 sm:p-4 pr-12 text-sm focus:outline-indigo-500'
                    placeholder='Enter email'
                  />
                  {errors.time && (
                    <span className='text-red-500 pt-1 text-sm'>
                      {errors.time.message}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor='doctor' className='text-sm font-medium'>
                  Doctor
                </label>

                <div className='relative mt-1'>
                  <select
                    {...register("doctor", {
                      required: "Please select a doctor",
                    })}
                    id='doctor'
                    className='w-full rounded-lg border border-gray-200 p-3 sm:p-4 pr-12 text-sm focus:outline-indigo-500'
                  >
                    <option value=''>Select a doctor</option>
                    {doctors?.map((doctor) => (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.name}
                      </option>
                    ))}
                  </select>

                  {errors.doctor && (
                    <span className='text-red-500 pt-1 text-sm'>
                      {errors.doctor.message}
                    </span>
                  )}
                </div>
              </div>

              <div className='flex flex-row space-x-4'>
                <button
                  onClick={() => setIsOpen(false)}
                  className='block w-full rounded-lg text-indigo-500 border border-indigo-500 px-5 py-3 text-sm font-medium bg-white'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='block w-full rounded-lg bg-indigo-500 px-5 py-3 text-sm font-medium text-white'
                >
                  Book Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
