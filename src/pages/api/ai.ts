// Minimal serverless endpoint for Astro (Node adapter / Vercel works)
// Set OPENAI_API_KEY in your env for prod; falls back to 200 demo text if missing.

import type { APIRoute } from 'astro';
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { messages = [] } = await request.json();

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      // no key → return demo text so the UI still works
      return new Response(JSON.stringify({ text: "AI demo mode: set OPENAI_API_KEY to enable live answers." }), { status: 200 });
    }

    // Call OpenAI Chat Completions
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method:'POST',
      headers: {
        'Content-Type':'application/json',
        'Authorization':`Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // fast/affordable; swap if you like
        temperature: 0.3,
        messages: [
          { role:'system', content:
            "You are the Camp David Concierge. Answer succinctly (1–4 sentences). Use details from the site context: Bantam Lake CT, 4 cottages (Lakefront, Viewpoint, Maplecrest, Hilltop), kayaks & lifejackets included, party room available, great for reunions & small weddings. Never promise a booking; direct to Availability/Contact for confirmations."
          },
          ...messages
        ]
      })
    });

    if(!r.ok){
      const t = await r.text();
      return new Response(JSON.stringify({ error: 'upstream', detail: t }), { status: 502 });
    }
    const data = await r.json();
    const text = data.choices?.[0]?.message?.content ?? '';
    return new Response(JSON.stringify({ text }), { status: 200 });

  } catch (e:any) {
    return new Response(JSON.stringify({ error: 'bad_request', detail: e?.message }), { status: 400 });
  }
};