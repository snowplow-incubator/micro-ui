import useSWR from "swr";

// @ts-expect-error
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export function useEventTotals() {
  type EventTotals = { bad: number; good: number; total: number };
  const { data, error, isLoading } = useSWR<EventTotals>(
    process.env.NEXT_PUBLIC_MICRO_HOSTNAME + "/micro/all",
    fetcher
  );

  return {
    eventTotals: data,
    error,
    isLoading,
  };
}

export function useGoodEvents() {
  const { data, error, isLoading } = useSWR(
    process.env.NEXT_PUBLIC_MICRO_HOSTNAME + "/micro/good",
    fetcher
  );

  return {
    goodEvents: data,
    error,
    isLoading,
  };
}

export function useBadEvents() {
  const { data, error, isLoading } = useSWR(
    process.env.NEXT_PUBLIC_MICRO_HOSTNAME + "/micro/bad",
    fetcher
  );

  return {
    badEvents: data,
    error,
    isLoading,
  };
}
