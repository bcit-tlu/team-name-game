# AGENTS.md

## Setup Commands

- Local development: `docker compose up` (starts client + server with hot-reload)
- Install all dependencies: `npm install`
- Start both client and server: `npm run dev`
- Start server only: `npm run dev --workspace=server`
- Start client only: `npm run dev --workspace=client`
- Lint all workspaces: `npm run lint`
- Build all workspaces: `npm run build`
- Helm lint: `helm lint charts/team-name-game/`
- Helm validate: `helm template test charts/team-name-game/ | kubeconform -strict -summary -schema-location default -ignore-missing-schemas`

## Code Style

- Use TypeScript strict mode
- Prefer functional components in React (MUI, no Tailwind)
- Use ESLint configurations in `client/eslint.config.js` and `server/eslint.config.js`
- Follow conventional commit format for PR titles
- License: MPL-2.0

## Testing Guidelines

- Use Vitest for both frontend and backend tests
- Run all tests: `npm test`
- Run server tests only: `npm run test --workspace=server`
- Run client tests only: `npm run test --workspace=client`
- Watch mode: `npm run test:watch --workspace=server` (or `client`)
- Client tests use `@testing-library/react` with jsdom environment

## Project Structure

- `/client` — React frontend (Vite + MUI)
- `/server` — Node.js/Express backend (Socket.io + OpenTelemetry)
- `/charts/team-name-game` — Helm chart for Kubernetes deployment
- `/.github/workflows/` — CI/CD pipelines
- `/package.json` — Root monorepo orchestration using npm workspaces

## Architecture

- **Runtime**: Node.js/Express on port 8080 (serves both API and built client assets)
- **Real-time sync**: Socket.io events for user registration, team creation, entry approval, ability conferral, timer management
- **State management**: In-memory on server, broadcast via Socket.io to all clients
- **No persistence**: Game state resets on server restart; admin can reset via the app
- **Ability threshold**: 4 approved entries unlocks 1 ability choice (star, nuke, interceptor, meh)

## Development Workflow

- Create feature branches from `main`
- Use pull requests for code review
- PR titles must follow conventional commit format (enforced by `pr-title-lint.yaml`)
- Squash commits before merging

## CI/CD

- CI uses shared `bcit-tlu/.github` OCI build reusable workflow
- `helm-lint` validates Helm charts on every push and PR
- `release-please` manages versioning via conventional commits (`release-type: "simple"`)
- Version is tracked in `.release-please-manifest.json` and `Chart.yaml` (`# x-release-please-version` annotations)
- Images are published to `ghcr.io/bcit-tlu/team-name-game/team-name-game`
- Charts are published to `oci://ghcr.io/bcit-tlu/team-name-game/charts`
- `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true` is set in all workflows

## Deployment

- Deployed to Kubernetes via Flux CD (see `bcit-tlu/flux-fleet`)
- Ingress: `team-name-game.<CLUSTER_ENV>.ltc.bcit.ca`
- Both `latest` (cluster03) and `stable` (cluster04) overlays exist
