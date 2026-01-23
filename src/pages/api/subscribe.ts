import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email || !email.includes('@')) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Invalid email address',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // In a real implementation, you would:
    // 1. Validate the email format more thoroughly
    // 2. Add to your email marketing platform (Mailchimp, ConvertKit, etc.)
    // 3. Store in database
    // 4. Send confirmation email

    // For demo purposes, just return success
    console.log(`Demo: Would subscribe email: ${email}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Subscription successful (demo mode)',
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
