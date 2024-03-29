import { TableEventEntry } from ".";

type EventEntry = {
  id: string;
  contexts: string[];
  event: Record<string, unknown> &
  {
    event_id: string,
    event_name: string,
    event_vendor: string
  };
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

    const eid = (rawEvent.parameters.eid && rawEvent.parameters.eid) || (event.event_id && event.event_id) || "null"
    const aid = (rawEvent.parameters.aid && rawEvent.parameters.aid) || "null"
    const dtm = (rawEvent.parameters.dtm && rawEvent.parameters.dtm) || "null"
    const eventName = (event?.event_name && event?.event_name)
    const eventVendor = (event?.event_vendor && event?.event_vendor) || "Error"
    const rowId = eid.concat(i.toString())


    let testJson = JSON.parse(errors[1]);
    let eventType = testJson.data.payload.enriched?.event || null;
    let schema = testJson.data.payload.enriched?.schema || null;
    let newEvent: TableEventEntry = {
      ...defaultBadEventEntry,
      app_id: aid,
      contexts,
      id: rowId,
      timestamp: dtm,
      event,
      rawEvent,
      schema,
      collectorPayload,
      errors,
      eventType,
      eventName,
      eventVendor
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
      rawEvent,
      schema,
      collectorPayload,
      eventType,
    } = goodEvents[i];

    const eid = (rawEvent.parameters.eid && rawEvent.parameters.eid) || (event.event_id && event.event_id) || "null"
    const aid = (rawEvent.parameters.aid && rawEvent.parameters.aid) || "null"
    const dtm = (rawEvent.parameters.dtm && rawEvent.parameters.dtm) || "null"
    const eventName = (event?.event_name && event?.event_name) || "Error"
    const eventVendor = (event?.event_vendor && event?.event_vendor) || "Error"
    const rowId = eid.concat(i.toString())

    let newEvent: TableEventEntry = {
      ...defaultGoodEventEntry,
      app_id: aid,
      id: rowId,
      timestamp: dtm,
      contexts,
      event,
      rawEvent,
      schema,
      collectorPayload,
      eventType,
      eventName,
      eventVendor
    };
    merged.push(newEvent);
  }
  return merged;
}
