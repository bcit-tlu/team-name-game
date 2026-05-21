import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http';
import { Resource } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { SimpleLogRecordProcessor } from '@opentelemetry/sdk-logs';
// Note: HTTP/JSON exporter sends to ${OTEL_EXPORTER_OTLP_ENDPOINT}/v1/traces

const resource = new Resource({
  [ATTR_SERVICE_NAME]: 'team-name-game',
});

console.log(`[OTEL] Initializing with endpoint: ${process.env.OTEL_EXPORTER_OTLP_ENDPOINT}`);

const sdk = new NodeSDK({
  resource,
  traceExporter: new OTLPTraceExporter(),
  logRecordProcessors: new SimpleLogRecordProcessor(new OTLPLogExporter()),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();

console.log('[OTEL] SDK started successfully');

process.on('SIGTERM', () => {
  sdk.shutdown()
    .then(() => console.log('[OTEL] SDK shut down successfully'))
    .catch((err) => console.error('[OTEL] Error shutting down SDK:', err))
    .finally(() => process.exit(0));
});
