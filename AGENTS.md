# AGENTS.md

## Setup Commands

### Quick Start (with Docker)
- Start dev environment: `docker compose up`
- Client available at: `http://localhost:5173`
- Server available at: `http://localhost:3001`

### Without Docker
- Install all dependencies: `npm install`
- Start both client and server: `npm run dev`
- Start server only: `npm run dev --workspace=server`
- Start client only: `npm run dev --workspace=client`

### Build
- Lint all workspaces: `npm run lint`
- Build all workspaces: `npm run build`
- Build production Docker image: `docker build --target production -t team-name-game .`

## Code Style

### Frontend (`client/`)
- Use TypeScript strict mode
- Prefer functional components in React
- Use MUI components for UI (no Tailwind)
- Use ESLint configuration in `client/eslint.config.js`
- Follow conventional commit format

### Backend (`server/`)
- Use TypeScript with ES modules (`"type": "module"`)
- Use type annotations for all Socket.io event contracts
- Use ESLint configuration in `server/eslint.config.js`
- Follow conventional commit format

## Testing Guidelines

- Write unit tests for new utility functions
- Manual testing via `docker compose up` with multiple browser tabs to verify real-time sync
- Test plan: register a team → adjudicator approves 4 entries → ability unlocks → timer countdown
- Run `npm run lint` and `npm run build` before committing

## Project Structure
- `/client/src/pages` - React page components (one per screen/role)
- `/client/src/components` - Shared UI components (NameForm, Breadcrumbs, Layout)
- `/client/src/contexts` - React contexts (GameContext for state, SocketContext for connection)
- `/client/src/theme` - MUI theme configuration (purple palette, accessibility)
- `/server/src` - Express + Socket.io backend
- `/server/src/types.ts` - Shared TypeScript type definitions for Socket.io events
- `/server/src/state.ts` - In-memory game state store
- `/server/src/socket.ts` - Socket.io event handlers
- `/conf.d` - Nginx configuration (if using nginx reverse proxy)
- `/.github/workflows` - CI/CD pipelines

## Architecture

- **State management**: In-memory on server, broadcast via Socket.io to all clients
- **Real-time sync**: Socket.io events for user registration, team creation, entry approval, ability conferral, timer management
- **No persistence**: Game state resets on server restart; admin can reset via the app
- **Ability threshold**: 4 approved entries unlocks 1 ability choice (star, nuke, interceptor, meh)

## Development Workflow
- Create feature branches from `main`
- Use pull requests with conventional commit titles for code review
- Squash merge into `main`
- release-please automates versioning and changelogs
- OCI images built and pushed to GHCR on merge to `main`
