FROM oven/bun:1.2-alpine AS build
WORKDIR /app
COPY package.json tsconfig.json .
COPY src ./src
RUN bun install --frozen-lockfile=false && bun run build

FROM oven/bun:1.2-alpine
WORKDIR /app
COPY package.json .
RUN bun install --production --frozen-lockfile=false
COPY --from=build /app/dist ./dist
ENV PORT=7845
EXPOSE 7845
CMD ["bun", "run", "dist/server.js"]
