# The web Dockerfile is copy-pasted into our main docs at /docs/handbook/deploying-with-docker.
# Make sure you update this Dockerfile, the Dockerfile in the web workspace and copy that over to Dockerfile in the docs.

FROM node:alpine AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
ARG NODE_ENV=production
ARG APP_ENV

ENV NODE_ENV=$NODE_ENV
ENV APP_ENV=$APP_ENV
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"

RUN npm install -g pnpm
RUN pnpm add -g turbo
COPY . .
RUN turbo prune --scope=api --docker

# Add lockfile and package.json's of isolated subworkspace
FROM node:alpine AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"
RUN npm install -g pnpm
RUN pnpm add -g turbo
# First install dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install

# Build the project and its dependencies
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

# Uncomment and use build args to enable remote caching
# ARG TURBO_TEAM
# ENV TURBO_TEAM=$TURBO_TEAM

# ARG TURBO_TOKEN
# ENV TURBO_TOKEN=$TURBO_TOKEN

ENV NODE_ENV=$NODE_ENV
ENV APP_ENV=$APP_ENV
RUN pnpm turbo run build --filter=api...

FROM node:alpine AS runner
WORKDIR /app

CMD npm install -g turbo
ARG APP_ENV
# Don't run production as root
RUN addgroup --system --gid 1001 apiuser
RUN adduser --system --uid 1001 apiuser
USER apiuser
COPY --from=installer /app .
ENV NODE_ENV=production
ENV APP_ENV=$APP_ENV
EXPOSE 2000
CMD ["node", "apps/api/dist/main.js"]
