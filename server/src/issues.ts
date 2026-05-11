/**
 * Express router for creating GitHub Issues from user feedback.
 *
 * Follows the same pattern as bcit-tlu/hriv backend/app/routers/issues.py:
 *   - POST /api/issues  → create issue, return { issueUrl }
 *   - Best-effort "feedback" label application
 *   - In-memory per-session rate limiting (max 5 per 24 h window)
 */

import { Router } from 'express';
import type { Request, Response } from 'express';

const router = Router();

const GITHUB_TOKEN = process.env.GITHUB_TOKEN ?? '';
const GITHUB_REPO = normalizeRepo(process.env.GITHUB_REPO ?? '');

function normalizeRepo(raw: string): string {
  return raw
    .replace(/^https?:\/\/github\.com\//, '')
    .replace(/\/+$/, '');
}

// Simple per-IP rate limiting: max 5 issues per 24-hour window
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 86_400_000; // 24 hours
const ipTimestamps: Map<string, number[]> = new Map();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = (ipTimestamps.get(ip) ?? []).filter(
    (t) => now - t < RATE_WINDOW_MS,
  );
  ipTimestamps.set(ip, timestamps);
  return timestamps.length < RATE_LIMIT;
}

function recordRequest(ip: string): void {
  const timestamps = ipTimestamps.get(ip) ?? [];
  timestamps.push(Date.now());
  ipTimestamps.set(ip, timestamps);
}

router.post('/api/issues', async (req: Request, res: Response) => {
  const { description, userName } = req.body as {
    description?: string;
    userName?: string;
  };

  if (!description || description.trim().length === 0) {
    res.status(400).json({ error: 'Description is required' });
    return;
  }

  if (!GITHUB_TOKEN || !GITHUB_REPO) {
    res.status(503).json({ error: 'Issue reporting is not configured' });
    return;
  }

  const ip = req.ip ?? req.socket.remoteAddress ?? 'unknown';
  if (!checkRateLimit(ip)) {
    res
      .status(429)
      .json({ error: 'Rate limit exceeded — max 5 reports per 24 hours.' });
    return;
  }

  const title = 'feedback: User feedback submission';
  const body =
    `${description.trim()}\n\n` +
    `---\n\n` +
    `**Submitted by:** ${userName ?? 'Anonymous'}`;

  try {
    const createResp = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/issues`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, body }),
      },
    );

    if (createResp.status !== 201) {
      const responseBody = await createResp.text().catch(() => '');
      console.error(
        `GitHub issue creation failed: status=${createResp.status} body=${responseBody}`,
      );
      res.status(502).json({
        error: 'Feedback submission failed. Please try again later.',
      });
      return;
    }

    const data = (await createResp.json()) as {
      html_url: string;
      number: number;
    };

    // Best-effort label application
    try {
      await fetch(
        `https://api.github.com/repos/${GITHUB_REPO}/issues/${data.number}/labels`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ labels: ['feedback'] }),
        },
      );
    } catch {
      // Label failure is non-fatal
    }

    recordRequest(ip);
    res.status(201).json({ issueUrl: data.html_url });
  } catch (err) {
    console.error('Failed to create GitHub issue:', err);
    res.status(502).json({
      error: 'Feedback submission failed. Please try again later.',
    });
  }
});

export default router;
