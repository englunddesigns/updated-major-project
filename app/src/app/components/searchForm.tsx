"use client";

import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function SearchForm() {
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const createQueryParamString = (inputs: FieldValues): string => {
    const queryParams = [];

    for (const key in inputs) {
      if (inputs[key]) {
        queryParams.push(
          `${encodeURIComponent(key)}=${encodeURIComponent(inputs[key])}`
        );
      }
    }

    return queryParams.join("&");
  };

  const onSubmit = async (data: FieldValues) => {
    const queryString = createQueryParamString(data);
    router.push(`/data?${queryString}`);
  };

  return !searchSubmitted ? (
    <form
      className="flex place-items-center w-full sm:w-3/4 lg:w-1/2 bg-neutral-300/75 shadow-md rounded px-8 pt-6 pb-8 my-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="py-12 w-full text-black flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-center">Search Ships</h2>
        <div className="mt-8">
          <div className="grid grid-cols-12 gap-6 mx-4">
            <label className="block col-span-12 sm:col-span-6">
              <span>Ship Name:</span>
              <input
                {...register("vessel_name")}
                type="text"
                className="
                mt-1
                block
                w-full
                rounded-md
                border-gray-300
                shadow-sm
                focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
              "
                placeholder=""
              />
            </label>
            <label className="block col-span-12 sm:col-span-6">
              <span>Ship Number:</span>
              <input
                {...register("official_number")}
                type="text"
                className="
                mt-1
                block
                w-full
                rounded-md
                border-gray-300
                shadow-sm
                focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
              "
                placeholder=""
              />
            </label>
            <label className="block col-start-1 sm:col-start-4 col-span-12 sm:col-span-6">
              <span>Port of Registry:</span>
              <input
                {...register("port_of_registry")}
                type="text"
                className="
                mt-1
                block
                w-full
                rounded-md
                border-gray-300
                shadow-sm
                focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
              "
                placeholder=""
              />
            </label>

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded col-start-1 sm:col-start-5 col-span-12 sm:col-span-4"
              type="submit"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </form>
  ) : (
    <div className="flex min-h-screen flex-col items-center bg-white" />
  );
}
