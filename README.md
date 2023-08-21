# Snowplow Micro-ui

[![License][license-image]][license]

An interface for Snowplow Micro.

## Running micro-ui locally

Note: this flow is for developers only. If you want to use the UI, refer to the [documentation for running Snowplow Micro](https://docs.snowplow.io/docs/testing-debugging/snowplow-micro/basic-usage/).

1. Clone the repo
2. Run Micro
3. Add the required environment variables. Run `cp .env.example .env.local` and then fill the `NEXT_PUBLIC_MICRO_HOSTNAME` with your Micro hostname e.g. `http://localhost:9090`
4. Run `npm install` and then `npm run dev`

The UI will be available at `http://localhost:3000/micro/ui`.

## Copyright and License

Copyright (c) 2023-present Snowplow Analytics Ltd. All rights reserved.

Licensed under the [Snowplow Community License](https://docs.snowplow.io/community-license-1.0). _(If you are uncertain how it applies to your use case, check our answers to [frequently asked questions](https://docs.snowplow.io/docs/contributing/community-license-faq/).)_

[license]: https://docs.snowplow.io/docs/contributing/community-license-faq/
[license-image]: https://img.shields.io/badge/license-Snowplow--Community-blue.svg?style=flat
