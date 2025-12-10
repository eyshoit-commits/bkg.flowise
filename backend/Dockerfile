FROM node:20-slim AS builder
WORKDIR /app
COPY package.json tsconfig.json ./
RUN npm install --only=production && npm cache clean --force
COPY src ./src
RUN npx tsc -p .

FROM node:20-slim
WORKDIR /app
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
ENV NODE_ENV=production
CMD ["node", "dist/server.js"]
