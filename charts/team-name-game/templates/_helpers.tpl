{{/*
Expand the name of the chart.
*/}}
{{- define "team-name-game.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
Truncates at 63 chars because some Kubernetes name fields are limited to this.
*/}}
{{- define "team-name-game.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Chart label (always uses .Chart.Name, unaffected by nameOverride).
*/}}
{{- define "team-name-game.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "team-name-game.labels" -}}
helm.sh/chart: {{ include "team-name-game.chart" . }}
{{ include "team-name-game.selectorLabels" . }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "team-name-game.selectorLabels" -}}
app.kubernetes.io/name: {{ include "team-name-game.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Create the name of the service account to use.
*/}}
{{- define "team-name-game.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "team-name-game.fullname" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}

{{/*
Runtime display version surfaced by /api/version and the Admin page.

Derived from the deploy-time image reference (.Values.image.tag, which
flux-fleet ImagePolicy writes for main-tracking envs; falls back to
.Chart.AppVersion for ad-hoc `helm install` / `helm template` use).

Main-build tags follow `<ver>-rc.<ts>.<short>` (e.g.
`1.1.18-rc.20260414194220.b286051`). The 14-digit UTC timestamp is
noise for a human reading the admin panel, so we strip it here to
yield `<ver>-rc.<short>` (e.g. `1.1.18-rc.b286051`). Clean release
tags (`<ver>` with no `-rc.` prerelease) pass through unchanged, so a
retag-promoted production image shows `1.1.18` — keeping the build
identity (immutable digest) separate from the display identity
(human-friendly version string). See `hriv` for the canonical pattern.

regexReplaceAll is sprig's full Go-regex binding; the pattern is
anchored to the literal `-rc.` prefix and 14 ASCII digits so release
tags that happen to contain 14 consecutive digits elsewhere (e.g. a
user-chosen build metadata segment) are not mis-matched.
*/}}
{{- define "team-name-game.displayVersion" -}}
{{- $tag := .Values.image.tag | default .Chart.AppVersion -}}
{{- regexReplaceAll "-rc\\.[0-9]{14}\\." $tag "-rc." -}}
{{- end -}}
