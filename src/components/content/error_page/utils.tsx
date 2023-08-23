import { UAParser } from "ua-parser-js";

// with trackSelfDescribingEvent({ event: { schema: "myschema.org", data: { test: 1 } } })
// Validation error does not show where there is an issue
// or is `singleError.data.failure.messages[0].error.dataReports[0].path` the path to the event structure
// maybe it is the path data.payload.enriched.unstruct_event .data.${path} in the case of unstruct event failure

export function extractUIErrorInfo({ data, schema }: { data: any, schema: string }) {
    const userAgent = data.payload.enriched?.useragent;
    const parser = new UAParser(userAgent);

    const { name: browserName, version: browserVersion } = parser.getBrowser();
    const { type: deviceType } = parser.getDevice();
    const { name: osName, version: osVersion } = parser.getOS();
    var errorMessage = [{ message: "N/A" }]
    var errorType

    const schemaArray = schema.split("/")
    const error = data?.failure?.messages[0]?.error?.error || schemaArray[1]

    switch (error) {
        case "ValidationError":
            errorType = "Validation Error"
            errorMessage = data.failure.messages[0].error.dataReports
            break
        case "ResolutionError":
            errorType = "Resolution Error"
            errorMessage = [{ message: data.failure.messages[0].error.lookupHistory[0].errors[0].error }]
            break
        case "tracker_protocol_violations":
            errorType = "Tracker Protocol Violation"
            errorMessage = [{ message: data.failure.messages[0].error }]
            break
        case "adapter_failures":
            errorType = "Adapter Failure"
            errorMessage = [{ message: data.failure.messages[0].error || "N/A" }]
            break
        case "collector_payload_format_violation":
            errorType = "Collector Payload Format violation"
            errorMessage = [{ message: data.failure.messages[0].error || "N/A" }]
            break
        case "enrichment_failures":
            errorType = "Enrichment Failure"
            errorMessage = [{ message: data.failure.messages[0].message.expectation }, { message: data.failure.messages[0].message.field }]
            break
        case "size_violation":
            errorType = "Size Violation"
            errorMessage = [{ message: data.failure.messages[0].error || "N/A" }]
            break
        default:
            errorType = "Unknown Error"
            errorMessage = [{ message: data.failure.messages[0].message?.expectation }]
            break
    } {

    }

    return {
        errorType: errorType,
        errorMessage: errorMessage,
        pageUrl: data.payload.enriched?.page_url,
        eventId: data.payload.enriched?.event_id,
        errorTimestamp: data.failure.timestamp,
        browserName,
        browserVersion,
        deviceType,
        osName,
        osVersion,
        userId: data.payload.enriched?.user_id,
        domainUserId: data.payload.enriched?.domain_userid,
        appId: data.payload.enriched?.app_id,
        // Check if we have friendly names list for trackers based on v_tracker
        trackerVersion: data.payload.enriched?.v_tracker,
        platform: data.payload.enriched?.platform,
        schema: data.failure.messages[0].schemaKey
    };
}

// type ValidationError = {
//     schema: string,
//     data: {
//         processor: {
//             artifact: string,
//             version: string
//         },
//         failure: {
//             timestamp: string,
//             messages: [
//                 {
//                     schemaKey: string,
//                     error: {
//                         error: string
//                         dataReports: [
//                             {
//                                 message: string,
//                                 path: string,
//                                 keyword: string,
//                                 targets: [string]
//                             }
//                         ]
//                     }
//                 }
//             ]
//         },
//         payload: {
//             enriched: Object,
//             raw: Object
//         }
//     }
// }

// type ResolutionError = {
//     schema: string,
//     data: {
//         processor: {
//             artifact: string,
//             version: string,
//         },
//         failure: {
//             timestamp: string,
//             messages: [
//                 {
//                     schemaKey: string,
//                     error: {
//                         error: string,
//                         lookupHistory: [{
//                             repository: string,
//                             errors: [
//                                 {
//                                     error: string
//                                 }
//                             ],
//                             attempts: number,
//                             lastAttempt: string
//                         }]
//                     }
//                 }
//             ]
//         },
//         payload: {
//             enriched: object,
//             raw: object
//         }
//     }
// }
//   // const errorMessage =  singleError.data.failure.messages[0].error.dataReports[0].message;
