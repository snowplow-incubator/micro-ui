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


/**
 *
 * Aggregate the good and bad events datasets to minute-level counts for usage in a X,Y access of a Chart.js Bar.
 * @export
 * @param {any[]} goodEvents
 * @param {any[]} badEvents
 * @param {(element: any) => unknown} goodTimestampPropertyAccessor Accessor function for the good events timestamp we wish to use for ordering.
 * @param {(element: any) => unknown} badTimestampPropertyAccessor Accessor function for the bad events timestamp we wish to use for ordering.
 * @return {*, *}
 */
export function aggregateMicroDatasets(
  goodEvents: any[],
  badEvents: any[],
  goodTimestampPropertyAccessor: (element: any) => unknown,
  badTimestampPropertyAccessor: (element: any) => unknown
) {

  const emptyChartDict: any = {};
  const now = new Date().setSeconds(0, 0)

  // Create object with keys for last 15 minutes 
  for (let i = 0; i < 15; i++) {
    const timestamp = (now - (i * 60000)).toString()
    emptyChartDict[timestamp] = 0
  }
  const goodDataset = getEventsDict(goodEvents, { ...emptyChartDict }, goodTimestampPropertyAccessor)
  const badDataset = getEventsDict(badEvents, { ...emptyChartDict }, badTimestampPropertyAccessor)

  return { goodDataset, badDataset }
}
