## ─── Server dev (hot-reload) ─────────────────────────────────────
FROM node:22-alpine AS server-dev

WORKDIR /app/server
COPY server/package*.json ./
RUN npm install
COPY server/ ./

## ─── Client dev (hot-reload) ─────────────────────────────────────
FROM node:22-alpine AS client-dev

WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./

## ─── Build client for production ─────────────────────────────────
FROM node:22-alpine AS client-builder

WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
ARG VITE_SERVER_URL=/
RUN npm run build

## ─── Build server for production ─────────────────────────────────
FROM node:22-alpine AS server-builder

WORKDIR /app/server
COPY server/package*.json ./
RUN npm ci
COPY server/ ./
RUN npx tsc

## ─── Production image ────────────────────────────────────────────
FROM node:22-alpine AS production

LABEL maintainer=courseproduction@bcit.ca
LABEL org.opencontainers.image.source="https://github.com/bcit-tlu/team-name-game"
LABEL org.opencontainers.image.description="Team Name Game - real-time synchronizer app"

WORKDIR /app

COPY --from=server-builder /app/server/dist ./server/dist
COPY --from=server-builder /app/server/package*.json ./server/
COPY --from=client-builder /app/client/dist ./client/dist

WORKDIR /app/server
RUN npm ci --omit=dev

ENV NODE_ENV=production
ENV PORT=8080
ENV CLIENT_ORIGIN=*

EXPOSE 8080

CMD ["node", "dist/index.js"]
