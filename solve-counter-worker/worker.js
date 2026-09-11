const ALLOWED_ORIGINS = new Set([
  'https://tceapr.github.io',
  'http://127.0.0.1:8060',
  'http://localhost:8060'
]);

const ID_PATTERN = /^[a-z0-9-]{1,80}$/;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin') || '';

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (!env.DB) {
      return json({ error: 'Counter database is not configured.' }, 500, origin);
    }

    const match = url.pathname.match(/^\/counts\/([a-z0-9-]{1,80})(?:\/(increment))?$/);
    if (!match) {
      return json({ error: 'Not found.' }, 404, origin);
    }

    const breakoutId = match[1];
    const action = match[2] || '';
    if (!ID_PATTERN.test(breakoutId)) {
      return json({ error: 'Invalid breakout ID.' }, 400, origin);
    }

    if (request.method === 'GET' && !action) {
      const count = await readCount(env.DB, breakoutId);
      return json({ breakoutId, count }, 200, origin);
    }

    if (request.method === 'POST' && action === 'increment') {
      if (Number(request.headers.get('Content-Length') || '0') > 0 || request.body !== null) {
        return json({ error: 'Increment requests must not include a body.' }, 400, origin);
      }

      const count = await incrementCount(env.DB, breakoutId);
      return json({ breakoutId, count }, 200, origin);
    }

    return json({ error: 'Method not allowed.' }, 405, origin);
  }
};

async function readCount(db, breakoutId) {
  const row = await db
    .prepare('SELECT count FROM solve_counts WHERE breakout_id = ?')
    .bind(breakoutId)
    .first();
  return row?.count || 0;
}

async function incrementCount(db, breakoutId) {
  await db
    .prepare(`
      INSERT INTO solve_counts (breakout_id, count, updated_at)
      VALUES (?, 1, CURRENT_TIMESTAMP)
      ON CONFLICT(breakout_id)
      DO UPDATE SET count = count + 1, updated_at = CURRENT_TIMESTAMP
    `)
    .bind(breakoutId)
    .run();

  return readCount(db, breakoutId);
}

function json(data, status, origin) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      ...corsHeaders(origin)
    }
  });
}

function corsHeaders(origin) {
  const headers = {
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Vary': 'Origin'
  };

  if (ALLOWED_ORIGINS.has(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
  }

  return headers;
}
