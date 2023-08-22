function getEventsMap(eventsDict: any) {
  const dataset = Object.keys(eventsDict).map((element) => ({
    x: Number(element),
    y: eventsDict[element],
  }));

  return dataset
}

function getEventsDict(events: any[], dict: any, timestampPropertyAccessor: (element: any) => unknown) {
  for (let i = 0; i < events.length; i++) {
    const timestampProperty = timestampPropertyAccessor(events[i]) as string;
    const timestampKeyMinutes = new Date(timestampProperty).setSeconds(0, 0).toString();

    if (dict[timestampKeyMinutes] > 0) {
      dict[timestampKeyMinutes] += 1;
    } else if (dict[timestampKeyMinutes] == 0) {
      dict[timestampKeyMinutes] = 1;
    }
  }
  return getEventsMap(dict)
}

export function aggregateMicroDatasets(
  goodEvents: any[],
  badEvents: any[],
  goodTimestampPropertyAccessor: (element: any) => unknown,
  badTimestampPropertyAccessor: (element: any) => unknown
) {

  var dict = Object()
  const now = new Date().setSeconds(0, 0)

  for (let i = 0; i < 15; i++) {
    const timestamp = (now - (i * 60000)).toString()
    dict[timestamp] = 0
  }
  const goodDataset = getEventsDict(goodEvents, { ...dict }, goodTimestampPropertyAccessor)
  const badDataset = getEventsDict(badEvents, { ...dict }, badTimestampPropertyAccessor)

  return { goodDataset, badDataset }
}
