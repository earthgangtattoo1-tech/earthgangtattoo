// Cloudflare Pages Function — Contact/Chat Message API
// POST /api/contact
// Sends chat widget messages to your email

export async function onRequestPost(context) {
  const { request, env } = context

  try {
    const body = await request.json()
    const { name, email, message } = body

    if (!message) {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const RESEND_API_KEY = env.RESEND_API_KEY

    if (!RESEND_API_KEY) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Email not configured',
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const html = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #0a0a0a; border-radius: 16px; padding: 32px; border: 1px solid #2a2a2a;">
          <div style="text-align: center; margin-bottom: 24px;">
            <h1 style="color: #dc2626; font-size: 24px; margin: 0;">🔥 EARTH GANG TATTOO</h1>
            <p style="color: #888; font-size: 14px; margin-top: 4px;">NEW CHAT MESSAGE</p>
          </div>

          <div style="background: #1a1a1a; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
            <table style="width: 100%; color: #ccc; font-size: 14px;">
              ${name ? `<tr><td style="padding: 8px 0; color: #888;">From</td><td style="padding: 8px 0;">${name}</td></tr>` : ''}
              ${email ? `<tr><td style="padding: 8px 0; color: #888;">Email</td><td style="padding: 8px 0;">${email}</td></tr>` : ''}
              <tr>
                <td style="padding: 8px 0; color: #888;">Time</td>
                <td style="padding: 8px 0;">${new Date().toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' })}</td>
              </tr>
            </table>
          </div>

          <div style="background: #1a1a1a; border-radius: 12px; padding: 20px;">
            <p style="color: #fff; font-size: 14px; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>

          <p style="color: #666; font-size: 12px; text-align: center; margin-top: 24px;">
            Sent from the chat widget on earthgangtattoo.net
          </p>
        </div>
      </div>
    `

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Earth Gang Tattoo <onboarding@resend.dev>',
        to: 'earthgangtattoo@gmail.com',
        subject: `💬 New message from website chat — ${name || 'Anonymous'}`,
        html,
        reply_to: email || 'onboarding@resend.dev',
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Resend error:', data)
      return new Response(JSON.stringify({ success: false, error: data }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ success: true, resendId: data.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('Contact API error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
