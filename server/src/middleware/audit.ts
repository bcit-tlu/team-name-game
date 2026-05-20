import { Request, Response, NextFunction } from 'express';
import { logs, SeverityNumber } from '@opentelemetry/api-logs';

const logger = logs.getLogger('http-audit');

export function auditMiddleware(req: Request, res: Response, next: NextFunction): void {
  const start = Date.now();

  res.on('finish', () => {
    const duration_ms = Date.now() - start;
    logger.emit({
      severityNumber: SeverityNumber.INFO,
      severityText: 'INFO',
      body: `${req.method} ${req.path} ${res.statusCode}`,
      attributes: {
        event: 'http.request',
        'http.method': req.method,
        'http.path': req.path,
        'http.status_code': res.statusCode,
        'http.duration_ms': duration_ms,
        client_ip: req.ip || req.socket.remoteAddress || 'unknown',
        user_agent: req.get('user-agent') || 'unknown',
      },
    });
  });

  next();
}
