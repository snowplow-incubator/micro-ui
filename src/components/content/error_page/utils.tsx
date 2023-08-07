import { UAParser } from "ua-parser-js";

// with trackSelfDescribingEvent({ event: { schema: "myschema.org", data: { test: 1 } } })
// Validation error does not show where there is an issue
// or is `singleError.data.failure.messages[0].error.dataReports[0].path` the path to the event structure
// maybe it is the path data.payload.enriched.unstruct_event .data.${path} in the case of unstruct event failure

export function extractUIErrorInfo({ data }: { data: any }) {
    const userAgent = data.payload.enriched.useragent;
    const parser = new UAParser(userAgent);

    const { name: browserName, version: browserVersion } = parser.getBrowser();
    const { type: deviceType } = parser.getDevice();
    const { name: osName, version: osVersion } = parser.getOS();

    return {
        errorType: data.failure.messages[0].error.error,
        errorMessage: data.failure.messages[0].error.error,
        pageUrl: data.payload.enriched.page_url,
        eventId: data.payload.enriched.event_id,
        errorTimestamp: data.failure.timestamp,
        browserName,
        browserVersion,
        deviceType,
        osName,
        osVersion,
        userId: data.payload.enriched.user_id,
        domainUserId: data.payload.enriched.domain_userid,
        appId: data.payload.enriched.app_id,
        // Check if we have friendly names list for trackers based on v_tracker
        trackerVersion: data.payload.enriched.v_tracker,
        platform: data.payload.enriched.platform,
        schema: data.failure.messages[0].schemaKey
    };
}
