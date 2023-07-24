/**
 *
 * Aggregate the events dataset to minute-level counts for usage in a X,Y access of a Chart.js Bar.
 * @export
 * @param {any[]} events
 * @param {(element: any) => unknown} timestampPropertyAccessor Accessor function for the timestamp we wish to use for ordering.
 * @return {*}
 */
export function aggregateMicroDataset(
  events: any[],
  timestampPropertyAccessor: (element: any) => unknown
) {
  const data = events.reduce((accum, current) => {
    const timestampProperty = timestampPropertyAccessor(current) as string;
    const timestampKeyMinutes = new Date(timestampProperty).setSeconds(0, 0);
    if (accum[timestampKeyMinutes]) {
      accum[timestampKeyMinutes] = accum[timestampKeyMinutes] += 1;
    } else {
      accum[timestampKeyMinutes] = accum[timestampKeyMinutes] = 1;
    }
    return accum;
  }, {});

  const dataset = Object.keys(data).map((element) => ({
    x: Number(element),
    y: data[element],
  }));

  return dataset;
}
