import {
  MICRO_ALL_URL,
  MICRO_BAD_URL,
  MICRO_GOOD_URL,
  MICRO_RESET_URL,
} from "@/constants";
import useSWR, { useSWRConfig } from "swr";
import { useSetDocumentTitle } from "./utils";

// @ts-expect-error
const fetcher = (...args: any) => fetch(...args).then((res) => res.json());

export function useEventTotals() {
  type EventTotals = { bad: number; good: number; total: number };
  const { data, error, isLoading } = useSWR<EventTotals>(
    MICRO_ALL_URL,
    fetcher
  );

  useSetDocumentTitle(
    data
      ? `${data?.bad > data?.good ? "❌" : "✅"} | ${data?.bad}F ${data?.good}G`
      : "0G 0F"
  );

  return {
    eventTotals: data,
    error,
    isLoading,
  };
}

export function useGoodEvents() {
  const { data, error, isLoading } = useSWR(MICRO_GOOD_URL, fetcher, {
    refreshInterval: 3000,
  });

  return {
    goodEvents: data,
    error,
    isLoading,
  };
}

export function useBadEvents() {
  const { data, error, isLoading } = useSWR(MICRO_BAD_URL, fetcher);
  return {
    badEvents: data,
    error,
    isLoading,
  };
}

export function useMicroReset() {
  const { mutate } = useSWRConfig();
  const resetKeysRegex = new RegExp(
    `${MICRO_ALL_URL}|${MICRO_GOOD_URL}|${MICRO_BAD_URL}`
  );

  async function resetMicro() {
    await fetch(MICRO_RESET_URL);
    mutate(
      (key?: string) => typeof key === "string" && key.match(resetKeysRegex)
    );
  }

  return {
    resetMicro,
  };
}
