import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-grpc';
import { ConsoleSpanExporter, BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { Resource } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { SimpleLogRecordProcessor } from '@opentelemetry/sdk-logs';

const resource = new Resource({
  [ATTR_SERVICE_NAME]: 'team-name-game',
});

const rawEndpoint = process.env.OTEL_EXPORTER_OTLP_ENDPOINT || '';
// Strip http:// or https:// prefix for gRPC exporters
const otelEndpoint = rawEndpoint.replace(/^https?:\/\//, '');

console.log(`[OTEL] Initializing with endpoint: ${otelEndpoint} (raw: ${rawEndpoint})`);

const traceExporter = new OTLPTraceExporter({
  url: otelEndpoint,
});

const logExporter = new OTLPLogExporter({
  url: otelEndpoint,
});

const spanProcessors = [new BatchSpanProcessor(traceExporter)];

if (process.env.OTEL_DEBUG === 'true') {
  console.log('[OTEL] Debug mode enabled - adding console exporter');
  spanProcessors.push(new BatchSpanProcessor(new ConsoleSpanExporter()));
}

const sdk = new NodeSDK({
  resource,
  spanProcessors,
  logRecordProcessor: new SimpleLogRecordProcessor(logExporter),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();

console.log('[OTEL] SDK started successfully');

process.on('SIGTERM', () => {
  console.log('[OTEL] Shutting down SDK...');
  sdk.shutdown()
    .then(() => console.log('[OTEL] SDK shut down successfully'))
    .catch((err) => console.error('[OTEL] Error shutting down SDK:', err))
    .finally(() => process.exit(0));
});
