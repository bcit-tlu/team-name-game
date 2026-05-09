# Changelog

## [0.3.0](https://github.com/bcit-tlu/team-name-game/compare/v0.2.0...v0.3.0) (2026-05-09)


### Features

* add Helm chart for Kubernetes deployment ([ae2e6d7](https://github.com/bcit-tlu/team-name-game/commit/ae2e6d741ba02dd1624e57f35430e5681b387ef9))
* add Helm chart OCI publishing pipeline ([6c77af9](https://github.com/bcit-tlu/team-name-game/commit/6c77af9bcbcf33e7760ece59e6e6715f5bedbd1c))
* add user profile management and role locking ([de9bf96](https://github.com/bcit-tlu/team-name-game/commit/de9bf96789ab8eff35c52c29174b5a2effdb51d7))
* display app version on admin screen ([bf78d9b](https://github.com/bcit-tlu/team-name-game/commit/bf78d9b1c076f19a55d1290b9889b07ab143986e))
* update colour scheme to earthy neutral palette ([98c48bf](https://github.com/bcit-tlu/team-name-game/commit/98c48bf70ab214e56658dd28629cc402d4492d8e))


### Bug Fixes

* add charts directory to project structure in README ([2717777](https://github.com/bcit-tlu/team-name-game/commit/2717777763d3f1da5bf14e1248559ecc6657012f))
* align chart appVersion with current release and use Dockerfile port 8080 ([b00bcfc](https://github.com/bcit-tlu/team-name-game/commit/b00bcfc067dd574c7d89bb24643a46cf9fdd56f2))
* align release-please config with org patterns (simple type + extra-files) ([2b02449](https://github.com/bcit-tlu/team-name-game/commit/2b02449475a13e5c2a9bb40f8d3db17400e9f839))
* clean up team membership on role removal and remove dead user:updated event ([49d9c24](https://github.com/bcit-tlu/team-name-game/commit/49d9c2468c25742c0d6554393d8a6a1f8ba9ffab))
* document Helm chart in project structure ([a9f1214](https://github.com/bcit-tlu/team-name-game/commit/a9f12146acec2fac8f7b697636eaea36d4b40ea9))
* mention Helm OCI publish in CI/CD tech stack ([558cc2c](https://github.com/bcit-tlu/team-name-game/commit/558cc2c19c154a43f482c93b51a632b33ac9c7c2))
* removes release-as ([89af4dc](https://github.com/bcit-tlu/team-name-game/commit/89af4dcaa7618bdc4da7eff9abd0554fcad45d60))
* removes release-as ([6abf5c0](https://github.com/bcit-tlu/team-name-game/commit/6abf5c07ddc124aed23fce2f43f8cc6c45c96099))
* revert to node release-type and add release-as override to unstick ([41f7b8b](https://github.com/bcit-tlu/team-name-game/commit/41f7b8b692a48ff2e658b856ae422e82980d83d3))

## [0.2.0](https://github.com/bcit-tlu/team-name-game/compare/v0.1.0...v0.2.0) (2026-05-08)


### Features

* scaffold team name game with React/Socket.io real-time architecture ([3570bf3](https://github.com/bcit-tlu/team-name-game/commit/3570bf3437d7e4946bdfcd65ed74b933344d0ce8))


### Bug Fixes

* always invoke socket callbacks to prevent hanging promises ([cf7c847](https://github.com/bcit-tlu/team-name-game/commit/cf7c84717f457ec16c81aa666221e894649a1976))
* Dockerfile uses root lockfile for npm workspaces and server serves static files in production ([69d8f32](https://github.com/bcit-tlu/team-name-game/commit/69d8f32cbbbb36db59b46f3b028dfddbbf13159b))
