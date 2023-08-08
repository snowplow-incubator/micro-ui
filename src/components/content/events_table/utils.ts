import { TableEventEntry } from ".";

type EventEntry = {
  id: string;
  contexts: string[];
  event: Record<string, unknown>;
  eventType: string;
  rawEvent: {
    parameters: {
      eid: string;
      dtm: string;
      aid: string;
    };
  } & Record<string, unknown>;
  schema: string;
  collectorPayload: string[];
  errors: string[];
  timestamp: string;
};

const defaultBadEventEntry = {
  // eventType: "Bad Event - See Error",
  schema: "NA",
  valid: false,
};
const defaultGoodEventEntry = {
  errors: ["No Errors"],
  valid: true,
};

export function mergeTwo(bad: EventEntry[], good: EventEntry[]) {
  let merged: TableEventEntry[] = [];
  let index1 = 0;
  let index2 = 0;
  let current = 0;

  if (!bad) {
    return merged;
  }

  if (!good) {
    return merged;
  }

  let badEvents = buildBadEventEntryList(bad);
  let goodEvents = buildGoodEventEntryList(good);

  while (current < badEvents.length + goodEvents.length) {
    let isArr1Depleted = index1 >= badEvents.length;
    let isArr2Depleted = index2 >= goodEvents.length;

    if (
      !isArr1Depleted &&
      (isArr2Depleted ||
        badEvents[index1].timestamp > goodEvents[index2].timestamp)
    ) {
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
    let {
      contexts,
      event,
      rawEvent,
      collectorPayload,
      errors,
    } = badEvents[i]

    let aid, eid, dtm = ""

    if (rawEvent?.parameters) {
      let { parameters: { eid, dtm, aid } } = rawEvent
    }

    let testJson = JSON.parse(errors[1]);
    let eventType = testJson.data.payload.enriched?.event || null;
    let schema = testJson.data.payload.enriched?.schema || null;
    let newEvent: TableEventEntry = {
      ...defaultBadEventEntry,
      app_id: aid || "null",
      contexts,
      id: eid || "null",
      timestamp: dtm || "null",
      event,
      rawEvent,
      schema,
      collectorPayload,
      errors,
      eventType,
    };
    merged.push(newEvent);
  }
  return merged;
}

function buildGoodEventEntryList(goodEvents: EventEntry[]) {
  let merged: TableEventEntry[] = [];

  for (let i = 0; i < goodEvents.length; i++) {
    let {
      contexts,
      event,
      rawEvent: {
        parameters: { eid, dtm, aid },
      },
      rawEvent,
      schema,
      collectorPayload,
      eventType,
    } = goodEvents[i];
    let newEvent: TableEventEntry = {
      ...defaultGoodEventEntry,
      app_id: aid,
      id: eid,
      timestamp: dtm,
      contexts,
      event,
      rawEvent,
      schema,
      collectorPayload,
      eventType,
    };
    merged.push(newEvent);
  }
  return merged;
}
