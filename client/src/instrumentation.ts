import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { Resource } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { trace } from '@opentelemetry/api';

const OTLP_ENDPOINT = import.meta.env.VITE_OTEL_EXPORTER_OTLP_ENDPOINT as string | undefined;

const resource = new Resource({
  [ATTR_SERVICE_NAME]: 'team-name-game-client',
});

const provider = new WebTracerProvider({ resource });

if (OTLP_ENDPOINT) {
  const exporter = new OTLPTraceExporter({
    url: `${OTLP_ENDPOINT}/v1/traces`,
  });
  provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
}

provider.register();

export const tracer = trace.getTracer('team-name-game-client');

export function trackEvent(name: string, attributes: Record<string, string> = {}): void {
  const span = tracer.startSpan(name, { attributes });
  span.end();
}
