## ─── Server dev (hot-reload) ─────────────────────────────────────
FROM node:22-alpine AS server-dev

WORKDIR /app
COPY package.json package-lock.json ./
COPY server/package.json ./server/
COPY client/package.json ./client/
RUN npm ci --workspace=server
COPY server/ ./server/

## ─── Client dev (hot-reload) ─────────────────────────────────────
FROM node:22-alpine AS client-dev

WORKDIR /app
COPY package.json package-lock.json ./
COPY server/package.json ./server/
COPY client/package.json ./client/
RUN npm ci --workspace=client
COPY client/ ./client/

## ─── Build client for production ─────────────────────────────────
FROM node:22-alpine AS client-builder

WORKDIR /app
COPY package.json package-lock.json ./
COPY server/package.json ./server/
COPY client/package.json ./client/
RUN npm ci --workspace=client
COPY client/ ./client/
ARG VITE_SERVER_URL=/
ARG APP_VERSION
ENV VITE_APP_VERSION=${APP_VERSION}
RUN npm run build --workspace=client

## ─── Build server for production ─────────────────────────────────
FROM node:22-alpine AS server-builder

WORKDIR /app
COPY package.json package-lock.json ./
COPY server/package.json ./server/
COPY client/package.json ./client/
RUN npm ci --workspace=server
COPY server/ ./server/
RUN npx --workspace=server tsc

## ─── Production image ────────────────────────────────────────────
FROM node:22-alpine AS production

LABEL maintainer=courseproduction@bcit.ca
LABEL org.opencontainers.image.source="https://github.com/bcit-tlu/team-name-game"
LABEL org.opencontainers.image.description="Team Name Game - real-time synchronizer app"

WORKDIR /app

COPY package.json package-lock.json ./
COPY server/package.json ./server/
COPY client/package.json ./client/
RUN npm ci --workspace=server --omit=dev

COPY --from=server-builder /app/server/dist ./server/dist
COPY --from=client-builder /app/client/dist ./client/dist

ENV NODE_ENV=production
ENV PORT=8080
ENV CLIENT_ORIGIN=*

EXPOSE 8080

CMD ["node", "--import", "./server/dist/instrumentation.js", "server/dist/index.js"]
