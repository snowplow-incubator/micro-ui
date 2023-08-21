# Snowplow Micro-ui

An interface for Snowplow Micro.

### Running micro-ui locally

Note: this flow is for developers only. If you want to use the UI, refer to the [documentation for running Snowplow Micro](https://docs.snowplow.io/docs/testing-debugging/snowplow-micro/basic-usage/).

1. Clone the repo
2. Run Micro
3. Add the required environment variables. Run `cp .env.example .env.local` and then fill the `NEXT_PUBLIC_MICRO_HOSTNAME` with your Micro hostname e.g. `http://localhost:9090`
4. Run `npm install` and then `npm run dev`

The UI will be available at `http://localhost:3000/micro/ui`.
