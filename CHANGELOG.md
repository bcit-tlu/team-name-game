# Changelog

## [0.10.0](https://github.com/bcit-tlu/team-name-game/compare/v0.9.1...v0.10.0) (2026-05-22)


### Features

* **client:** add info icon to app bar linking to intro page ([838cef3](https://github.com/bcit-tlu/team-name-game/commit/838cef3f05a065e200aab25927321a83a6977893))
* **client:** add intro page and game timer to timer screen ([24a595c](https://github.com/bcit-tlu/team-name-game/commit/24a595c0862a8de04c5f6301e35003f556cd8a3c))
* **client:** add intro page and game timer to timer screen ([2c3158d](https://github.com/bcit-tlu/team-name-game/commit/2c3158de6c0f844b6415b260375b009293fd3c2d))
* **client:** improve nuke timer row alignment and icon sizing ([8f03d74](https://github.com/bcit-tlu/team-name-game/commit/8f03d74989d3fcbc6c56cd8a8ccf55b2bfb90a06))
* **client:** move timer instructions below Nuke Timers heading ([5f19c33](https://github.com/bcit-tlu/team-name-game/commit/5f19c339c6519c56ce4a2a8072b3738615b09c3f))

## [0.9.1](https://github.com/bcit-tlu/team-name-game/compare/v0.9.0...v0.9.1) (2026-05-21)


### Bug Fixes

* **otel:** correct logRecordProcessor property name to logRecordProcessors ([724121c](https://github.com/bcit-tlu/team-name-game/commit/724121cdc1ffbe7a26589a8d4573d87f619d8b48))
* **otel:** wrap logRecordProcessors in array for correct SDK initialization ([d70d654](https://github.com/bcit-tlu/team-name-game/commit/d70d654c9648bc1521081122019f2a47e2f87cb9))

## [0.9.0](https://github.com/bcit-tlu/team-name-game/compare/v0.8.0...v0.9.0) (2026-05-21)


### Features

* **otel:** add log level and excluded URLs environment variables to deployment ([72b3a84](https://github.com/bcit-tlu/team-name-game/commit/72b3a84135cfbeffe315296555704fcc9a30f013))

## [0.8.0](https://github.com/bcit-tlu/team-name-game/compare/v0.7.6...v0.8.0) (2026-05-21)


### Features

* **otel:** add health check exclusion and enable logging auto-instrumentation ([84e862d](https://github.com/bcit-tlu/team-name-game/commit/84e862d5837afd5a281cd71418df95446c1e3895))

## [0.7.6](https://github.com/bcit-tlu/team-name-game/compare/v0.7.5...v0.7.6) (2026-05-21)


### Bug Fixes

* **otel:** switch from protobuf to HTTP/JSON exporters and remove debug logging ([aa94597](https://github.com/bcit-tlu/team-name-game/commit/aa945978474edffb6eb33a724932d5522c9cffae))

## [0.7.5](https://github.com/bcit-tlu/team-name-game/compare/v0.7.4...v0.7.5) (2026-05-21)


### Bug Fixes

* **otel:** add diagnostic logging support for logs exporter ([e57deef](https://github.com/bcit-tlu/team-name-game/commit/e57deefdbb7b24032b8fc2eabed44fbb06388fc9))

## [0.7.4](https://github.com/bcit-tlu/team-name-game/compare/v0.7.3...v0.7.4) (2026-05-21)


### Bug Fixes

* **otel:** switch from gRPC to HTTP/protobuf exporters and update collector port to 4318 ([c24d0c9](https://github.com/bcit-tlu/team-name-game/commit/c24d0c9ed14087b9d04b17a5d8c120eb09b871d7))

## [0.7.3](https://github.com/bcit-tlu/team-name-game/compare/v0.7.2...v0.7.3) (2026-05-21)


### Bug Fixes

* **otel:** strip http:// prefix from gRPC endpoint ([f5fa9bf](https://github.com/bcit-tlu/team-name-game/commit/f5fa9bfea60563411b96f185963085444deacf14))

## [0.7.2](https://github.com/bcit-tlu/team-name-game/compare/v0.7.1...v0.7.2) (2026-05-20)


### Bug Fixes

* **otel:** use BatchSpanProcessor and add debug option ([b6630f1](https://github.com/bcit-tlu/team-name-game/commit/b6630f188e74dae510feef5adcb792a52d1b79f7))

## [0.7.1](https://github.com/bcit-tlu/team-name-game/compare/v0.7.0...v0.7.1) (2026-05-20)


### Bug Fixes

* **otel:** add SDK logging and shutdown hook for trace flushing ([381ce42](https://github.com/bcit-tlu/team-name-game/commit/381ce426342b410b8949c2927e475e61fc8a89cb))

## [0.7.0](https://github.com/bcit-tlu/team-name-game/compare/v0.6.1...v0.7.0) (2026-05-20)


### Features

* add OpenTelemetry instrumentation for client-side traces ([d63e658](https://github.com/bcit-tlu/team-name-game/commit/d63e65893459bce26b76748d3161b4e69a22c2d7))
* add OpenTelemetry instrumentation for client-side traces ([88e55a7](https://github.com/bcit-tlu/team-name-game/commit/88e55a7112992ac192e7f31473dd8da4f6720786))
* **server:** add analytics event tracking with OpenTelemetry logs ([0ed0edb](https://github.com/bcit-tlu/team-name-game/commit/0ed0edb6b9276bf353f75434a03e1382a4f8f039))
* **server:** add analytics event tracking with OpenTelemetry logs ([e8a9b8e](https://github.com/bcit-tlu/team-name-game/commit/e8a9b8e2fd90fa009fdb2da15937cc3d859cf0be))
* **server:** add OpenTelemetry instrumentation for traces and logs ([3870f60](https://github.com/bcit-tlu/team-name-game/commit/3870f605dd5fad14456888641abb04d92f725722))
* **server:** add OpenTelemetry instrumentation for traces and logs ([c28ff34](https://github.com/bcit-tlu/team-name-game/commit/c28ff34a2bc69a1ff9d015fd20c5db5ff1df94fc))

## [0.6.1](https://github.com/bcit-tlu/team-name-game/compare/v0.6.0...v0.6.1) (2026-05-15)


### Bug Fixes

* use correct release-please output key for root package dispatch ([2025b9d](https://github.com/bcit-tlu/team-name-game/commit/2025b9dcf704f5e7b3306adefb317e41942ac7bf))

## [0.6.0](https://github.com/bcit-tlu/team-name-game/compare/v0.5.0...v0.6.0) (2026-05-11)


### Features

* **admin:** show deployed app version and hide raw GitHub errors ([69ede62](https://github.com/bcit-tlu/team-name-game/commit/69ede625b29aa11569adfa8b9e054ad1a000f000))
* **chart:** strip rc timestamp from deploy-time APP_VERSION ([fa72fa1](https://github.com/bcit-tlu/team-name-game/commit/fa72fa134fa33dc759f091ccba503fbb0cdb0ada))
* **client:** scale up typography and component sizes one level ([d36572b](https://github.com/bcit-tlu/team-name-game/commit/d36572b30850a576e27376a6e1b92e1e7f36938e))


### Bug Fixes

* **client:** keep Add-timer FAB clear of taller bottom nav ([63b65a2](https://github.com/bcit-tlu/team-name-game/commit/63b65a250c069fa622d15c32d7cbe4a347ee117a))
* **client:** share APP_MAX_WIDTH between App and Layout ([4220031](https://github.com/bcit-tlu/team-name-game/commit/4220031fa4c67cbf232364f1e46b9c02f4061d72))


### Reverts

* **client:** restore APP_MAX_WIDTH to 480 ([80717ae](https://github.com/bcit-tlu/team-name-game/commit/80717ae4a62679c934deb673d7345329351c9c67))

## [0.5.0](https://github.com/bcit-tlu/team-name-game/compare/v0.4.5...v0.5.0) (2026-05-10)


### Features

* add GitHub issue creation from feedback with snackbar link ([0473859](https://github.com/bcit-tlu/team-name-game/commit/0473859f11ca5919f28c53b01d6553d6ea764d1b))
* **client:** timer label gate, breadcrumb cleanup, and player icons on Teams & Roles ([0b3301e](https://github.com/bcit-tlu/team-name-game/commit/0b3301e0b0d31bccec5aff83a55b0f4d7461bcb5))
* **client:** unify taupe design system and tighten UX ([83fe76d](https://github.com/bcit-tlu/team-name-game/commit/83fe76d4390a0e463a36f4aa3131c5f1f558636a))
* UX adjustments batch 4 - emoji labels, totals, icons, profile editing, titles, breadcrumbs, version ([f1069be](https://github.com/bcit-tlu/team-name-game/commit/f1069be3872ce2afba28eeac37e46d045394558d))
* UX tweaks batch 3 - session emoji, abilities display, timer icons, breadcrumbs ([b10f522](https://github.com/bcit-tlu/team-name-game/commit/b10f52251b1b1199b48a15c5be45cf58a5ddba45))
* UX tweaks batch 5 - stylized totals, member avatars, text changes, roles listing ([1a6b0a9](https://github.com/bcit-tlu/team-name-game/commit/1a6b0a906f53012c2316003d02e9c21b4553c964))


### Bug Fixes

* add missing deps to TimerName auto-registration effect ([4d464a9](https://github.com/bcit-tlu/team-name-game/commit/4d464a94a04aa1e23b54018e3491f2696185768f))
* move setSessionInfo after successful registration, add try-catch to TeamMemberName ([7d236d1](https://github.com/bcit-tlu/team-name-game/commit/7d236d13a945d3910ae7ffceece817750c02c609))
* only show leave-team hint to team members ([929b710](https://github.com/bcit-tlu/team-name-game/commit/929b710c21697393b804882ea6c219115d9d4235))
* remove Adjudicator breadcrumb from adjudicator teams page ([3a18738](https://github.com/bcit-tlu/team-name-game/commit/3a18738ca8f87c5a3eb5984f2b6b33fa7b781b63))
* strip trailing slashes from SERVER_URL to prevent double-slash in production ([7a4e22f](https://github.com/bcit-tlu/team-name-game/commit/7a4e22fecf931ead5e026bf9a1d69299b4640a45))

## [0.4.5](https://github.com/bcit-tlu/team-name-game/compare/v0.4.4...v0.4.5) (2026-05-09)


### Bug Fixes

* add package-lock.json to extra-files to prevent version drift ([5dcce2a](https://github.com/bcit-tlu/team-name-game/commit/5dcce2ab8560e9c53c79772262b6e420e43fad82))
* switch release-type from node to simple to fix component auto-derive ([2cabdff](https://github.com/bcit-tlu/team-name-game/commit/2cabdff1eb6bd918285a3180eaca963a78c103ed))

## [0.4.4](https://github.com/bcit-tlu/team-name-game/compare/v0.4.3...v0.4.4) (2026-05-09)


### Bug Fixes

* reset versions ([1dd1b37](https://github.com/bcit-tlu/team-name-game/commit/1dd1b37a87bb54208caa67cc94673e13cdec1b55))

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
