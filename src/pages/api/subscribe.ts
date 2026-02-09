import type { APIRoute } from 'astro';

export const prerender = false;

const GF_SUBMISSION_URL = import.meta.env.GF_SUBMISSION_URL;
const GF_AUTH_TOKEN = import.meta.env.GF_AUTH_TOKEN;

export const POST: APIRoute = async ({ request }) => {
  try {
    if (!GF_SUBMISSION_URL) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Server is missing GF_SUBMISSION_URL',
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const rawRequestBody = await request.text();
    if (!rawRequestBody.trim()) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Request body is empty',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    let body: Record<string, unknown>;
    try {
      body = JSON.parse(rawRequestBody) as Record<string, unknown>;
    } catch {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Invalid JSON body',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
    const fName = String(body?.fName ?? '').trim();
    const lName = String(body?.lName ?? '').trim();
    const email = String(body?.email ?? '').trim();

    if (!fName || !lName || !email || !email.includes('@')) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'First name, last name, and valid email are required',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const payload = {
      input_2_3: fName,
      input_2_6: lName,
      input_1: email,
      input_1_2: email,
      input_3_1: '1',
    };

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    if (GF_AUTH_TOKEN) {
      headers.Authorization = `Basic ${GF_AUTH_TOKEN}`;
    }

    const gfResponse = await fetch(GF_SUBMISSION_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    const raw = await gfResponse.text();
    let parsed: unknown = null;

    if (raw) {
      try {
        parsed = JSON.parse(raw);
      } catch {
        parsed = { raw };
      }
    }

    if (!gfResponse.ok) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Submission failed at Gravity Forms',
          details: parsed,
        }),
        {
          status: gfResponse.status,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Subscription successful',
        details: parsed,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Internal server error',
        error: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
};
