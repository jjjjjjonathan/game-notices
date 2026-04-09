FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@10.0.0 --activate

FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run -r build
# RUN pnpm deploy --filter=@game-notices/server --prod /prod/server
# RUN pnpm deploy --filter=@game-notices/client --prod /prod/client


FROM base AS server
COPY --from=build /usr/src/app/apps/server /prod/server
WORKDIR /prod/server
EXPOSE 3001
CMD [ "pnpm", "start" ]

FROM base AS client
COPY --from=build /usr/src/app/apps/client /prod/client
WORKDIR /prod/client
EXPOSE 5173
CMD [ "pnpm", "start" ]


# COPY pnpm-lock.yaml .
# RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm fetch

# COPY . .
# RUN pnpm install --recursive --frozen-lockfile

# ## Create minimal deployment for given package

# FROM base AS pruned
# ARG service
# WORKDIR /app
# RUN pnpm --recursive run build
# RUN pnpm --filter ${service} deploy --prod pruned

# ## Production image

# FROM node:20-slim
# WORKDIR /app

# ENV NODE_ENV=production

# COPY --from=pruned /app/pruned/dist dist
# COPY --from=pruned /app/pruned/package.json package.json
# COPY --from=pruned /app/pruned/node_modules node_modules

# ENTRYPOINT ["node", "dist"]
