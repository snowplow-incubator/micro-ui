# Snowplow Micro-ui

An interface for Snowplow Micro.

### Running micro-ui locally

1. Clone the repo.
2. Add the required environment variables. Run `cp .env.example .env.local` and then fill the `NEXT_PUBLIC_MICRO_HOSTNAME` with your Micro hostname e.g. `http://localhost:9090`
3. Build and run the docker container `docker build -t micro-ui . && docker run -p 3000:3000 micro-ui` (_This will run micro-ui in port 3000 on your localhost_)
