import useSWR from "swr";

// @ts-expect-error
const fetcher = (...args) => fetch(...args).then((res) => res.json());
type EventEntry = {
  id: string;
  contexts: string[];
  event: Record<string, unknown>;
  eventType: string;
  rawEvent: {
    parameters: {
      eid: string;
      dtm: string
    }
  } & Record<string, unknown>;
  schema: string;
  collectorPayload: string[],
  errors: string[]
  timestamp: string
};

type TableEventEntry = {
  id: string;
  contexts: string[];
  event: Record<string, unknown>;
  eventType: string;
  timestamp: string;
  rawEvent: Record<string, unknown>;
  schema: string;
  collectorPayload: string[],
  errors: string[],
  valid: boolean
};

const defaultBadEventEntry = {
  // eventType: "Bad Event - See Error",
  schema: "NA",
  valid: false,

};
const defaultGoodEventEntry = {
  errors: ["No Errors"],
  valid: true
};

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

export function mergeTwo(bad: EventEntry[], good: EventEntry[]) {
  let merged: TableEventEntry[] = [];
  let index1 = 0;
  let index2 = 0;
  let current = 0;

  if (!bad) {
    return merged
  }

  if (!good) {
    return merged
  }

  let badEvents = buildBadEventEntryList(bad)
  let goodEvents = buildGoodEventEntryList(good)

  while (current < (badEvents.length + goodEvents.length)) {

    let isArr1Depleted = index1 >= badEvents.length;
    let isArr2Depleted = index2 >= goodEvents.length;

    if (!isArr1Depleted && (isArr2Depleted || (badEvents[index1].timestamp > goodEvents[index2].timestamp))) {
      merged[current] = badEvents[index1];
      index1++;
    } else {
      merged[current] = goodEvents[index2];
      index2++;
    }

    current++;
  }
  return merged;
}

export function buildBadEventEntryList(badEvents: EventEntry[]) {
  let merged: TableEventEntry[] = [];

  for (let i = 0; i < badEvents.length; i++) {
    let { contexts, event, rawEvent, rawEvent: { parameters: { eid, dtm } }, collectorPayload, errors, } = badEvents[i]
    let testJson = JSON.parse(errors[1])
    let eventType = testJson.data.payload.enriched.event
    let schema = testJson.data.payload.enriched.schema
    let newEvent: TableEventEntry = { ...defaultBadEventEntry, contexts, id: eid, timestamp: dtm, event, rawEvent, schema, collectorPayload, errors, eventType }
    merged.push(newEvent)
  }
  return merged;
}

function buildGoodEventEntryList(goodEvents: EventEntry[]) {
  let merged: TableEventEntry[] = [];

  for (let i = 0; i < goodEvents.length; i++) {
    let { contexts, event, rawEvent: { parameters: { eid, dtm } }, rawEvent, schema, collectorPayload, eventType } = goodEvents[i]
    let newEvent: TableEventEntry = { ...defaultGoodEventEntry, id: eid, timestamp: dtm, contexts, event, rawEvent, schema, collectorPayload, eventType }
    merged.push(newEvent)
  }
  return merged;
}
