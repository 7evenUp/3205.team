FROM node:24 AS build

WORKDIR /app

# Build
RUN corepack enable
RUN corepack prepare pnpm --activate

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .

RUN pnpm build

# Nginx
FROM nginx:stable

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

