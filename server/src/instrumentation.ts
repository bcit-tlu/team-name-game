import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-grpc';
import { Resource } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { SimpleLogRecordProcessor } from '@opentelemetry/sdk-logs';

const resource = new Resource({
  [ATTR_SERVICE_NAME]: 'team-name-game',
});

const traceExporter = new OTLPTraceExporter({
  url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT,
});

const logExporter = new OTLPLogExporter({
  url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT,
});

const sdk = new NodeSDK({
  resource,
  traceExporter,
  logRecordProcessor: new SimpleLogRecordProcessor(logExporter),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
