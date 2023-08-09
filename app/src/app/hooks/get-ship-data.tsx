import { Prisma } from "@prisma/client";
import useSWR from "swr";

const fetcher = (url: RequestInfo | URL) => fetch(url).then((r) => r.json());

export default function useShipData(searchParams?: string) {
  const { data, isLoading, error } = useSWR(
    `/api/data${searchParams && `?${searchParams}`}`,
    fetcher
  );

  return {
    shipData: data as Prisma.shipGetPayload<false>[],
    isLoading,
    isError: error,
  };
}
