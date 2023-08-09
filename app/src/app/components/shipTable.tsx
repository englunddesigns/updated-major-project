"use client";

import { useSearchParams } from "next/navigation";
import useShipData from "../hooks/get-ship-data";
import Link from "next/link";

export default function ShipTable() {
  const searchParams = useSearchParams();
  const { shipData, isLoading } = useShipData(searchParams?.toString());

  return (
    <div className="p-4">
      <div className="flex flex-col mb-4">
        <Link href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 inline-block"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Go Back
        </Link>
        <h1 className="text-2xl font-semibold text-center">Ship List</h1>
      </div>
      {isLoading ? (
        <div
          className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      ) : (
        <table className="min-w-full text-left text-sm font-light">
          <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
            <tr>
              <th className="px-6 py-4">Vessel Name</th>
              <th className="px-6 py-4">Official Number</th>
              <th className="px-6 py-4">Port of Registry</th>
            </tr>
          </thead>
          <tbody>
            {shipData?.map((ship, index) => (
              <tr
                key={ship.ship_id}
                className={`border-b bg-neutral-100 dark:border-neutral-500 ${
                  index % 2 ? "dark:bg-neutral-600" : "dark:bg-neutral-700"
                }`}
              >
                <td className="whitespace-nowrap px-6 py-4">
                  {ship.vessel_name}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {ship.official_number}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {ship.port_of_registry}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
