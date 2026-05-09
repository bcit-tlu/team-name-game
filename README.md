# Team Name Game

Real-time synchronizer app for playing the "Team Name Game" — a collaborative naming activity where teams propose entries, adjudicators approve/reject them, and abilities are unlocked at thresholds.

## Tech Stack

- **Frontend**: React + TypeScript + Vite + MUI (Material UI)
- **Backend**: Node.js + Express + Socket.io
- **Dev Environment**: Docker Compose
- **CI/CD**: GitHub Actions (OCI build, Helm OCI publish, release-please)

## Quick Start (Docker)

```bash
docker compose up
```

- Client: http://localhost:5173
- Server: http://localhost:3001

## Quick Start (Local)

```bash
npm install
npm run dev
```

## Project Structure

```
├── client/          # React + Vite + MUI frontend
├── server/          # Express + Socket.io backend
├── charts/          # Helm chart for Kubernetes deployment
├── conf.d/          # Nginx config (production)
├── Dockerfile       # Multi-stage build
├── docker-compose.yml
└── .github/workflows/
```

## Roles

| Role | Description |
|------|-------------|
| **Team Member** | Register name, create/join team, select icon |
| **Adjudicator** | Approve/reject entries, confer abilities |
| **Timer** | Manage nuke/bomb countdown timers |
| **Weaver** | Take pictures of the game board |

## Game Rules

1. Teams submit "entries" (word/phrase proposals) to adjudicators
2. Every 4 approved entries unlocks one ability (Star, Nuke, Interceptor, Meh)
3. Teams cannot submit to the same adjudicator twice in a row
4. Teams cannot submit the same entry twice

## License

This Source Code Form is subject to the terms of the Mozilla Public License, v2.0. If a copy of the MPL was not distributed with this file, You can obtain one at <https://mozilla.org/MPL/2.0/>.

## About

Developed in 🇨🇦 Canada by the [Teaching & Learning Unit](https://www.bcit.ca/learning-teaching-centre/) at [BCIT](https://www.bcit.ca/).
