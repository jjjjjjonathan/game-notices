FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

FROM base AS client
COPY --from=build /usr/src/app /usr/src/app
WORKDIR  /usr/src/app
EXPOSE 5173
CMD [ "pnpm", "run", "client", "dev" ]

FROM base AS server
COPY --from=build /usr/src/app /usr/src/app
WORKDIR  /usr/src/app
EXPOSE 5174
CMD [ "pnpm", "run", "server", "dev" ]
