FROM node:24 AS build

WORKDIR /app

# Build
RUN corepack enable
RUN corepack prepare pnpm --activate

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .
RUN pnpm build

# Runtime
FROM node:24-slim AS runtime

WORKDIR /app

ENV NODE_ENV=production

RUN corepack enable
RUN corepack prepare pnpm --activate

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

COPY --from=build /app/dist ./dist

EXPOSE 1488

CMD ["pnpm", "start"]
