# Changelog

## [0.4.3](https://github.com/bcit-tlu/team-name-game/compare/v0.4.2...v0.4.3) (2026-05-09)


### Bug Fixes

* removes latest url ([be5603f](https://github.com/bcit-tlu/team-name-game/commit/be5603f1260010aad764d5fecef0ab73f8b8e3fd))

## [0.4.2](https://github.com/bcit-tlu/team-name-game/compare/v0.4.1...v0.4.2) (2026-05-09)


### Bug Fixes

* adds tng URL to README ([03cf56a](https://github.com/bcit-tlu/team-name-game/commit/03cf56a2e0143748093ab8f1e03f8f6208507e09))

## [0.4.1](https://github.com/bcit-tlu/team-name-game/compare/v0.4.0...v0.4.1) (2026-05-09)


### Bug Fixes

* Update shell.nix ([91f13dd](https://github.com/bcit-tlu/team-name-game/commit/91f13dd1a56084c33d60c7b1b768c91e79482673))

## [0.4.0](https://github.com/bcit-tlu/team-name-game/compare/v0.3.0...v0.4.0) (2026-05-09)


### Features

* UI tweaks - darker profile icon, breadcrumbs, remove dividers, smart team routing, create/join flow, admin reset redirect ([7242f93](https://github.com/bcit-tlu/team-name-game/commit/7242f93054266c0d428677a5f7d4338f97f11d60))
* UX tweaks batch 2 - bottom nav, enter key, timer states, profile back-nav, role caps, timer bug fix ([e5cb3b9](https://github.com/bcit-tlu/team-name-game/commit/e5cb3b9364a6cf0cb2053ffa6472bacb633f2cf9))


### Bug Fixes

* add server-side multi-team guards and disconnect cleanup per review ([ad4d41b](https://github.com/bcit-tlu/team-name-game/commit/ad4d41b663b1da675d06a84b6464858385cebaa3))
* add workflow_dispatch trigger to release-please for manual re-runs ([1ca6e58](https://github.com/bcit-tlu/team-name-game/commit/1ca6e58709444f56ef825da7bb7ee0885cce57ce))
* handle null response in createTeam client callback and reject when no current user ([15b48a2](https://github.com/bcit-tlu/team-name-game/commit/15b48a262993662eb989b8deca0813e3c75cc8f3))
* handle role-full rejection in name pages and tooltip on disabled IconButton ([ef6215f](https://github.com/bcit-tlu/team-name-game/commit/ef6215f18be8b33ca38371bda63334785796ad2a))
* prevent page flash during redirect for users with existing team ([7171d7c](https://github.com/bcit-tlu/team-name-game/commit/7171d7cea3aa10af81e6e5855cb34a1e7ced8c80))
* use Partial&lt;Record&lt;User['role'], number&gt;&gt; for ROLE_LIMITS type safety ([7ad48d6](https://github.com/bcit-tlu/team-name-game/commit/7ad48d6322611de3d1e1e23cda535b498f362c43))

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
