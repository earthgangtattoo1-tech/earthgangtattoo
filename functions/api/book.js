// Cloudflare Pages Function — Booking API
// POST /api/book
// Receives booking data from frontend, sends email notifications

export async function onRequestPost(context) {
  const { request, env } = context

  try {
    const body = await request.json()

    // Validate required fields
    const { name, email, phone, artist, date, time, bookingType, service, notes, reference } = body

    if (!name || !email || !phone || !artist || !date || !time) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Server-side validation: date must be in the future
    const bookingDate = new Date(date)
    const now = new Date()
    // Set to start of today in Thailand timezone (UTC+7)
    const thailandOffset = 7 * 60
    const utcNow = new Date(now.getTime() + now.getTimezoneOffset() * 60000)
    const thailandNow = new Date(utcNow.getTime() + thailandOffset * 60000)
    const todayThailand = new Date(thailandNow.getFullYear(), thailandNow.getMonth(), thailandNow.getDate())

    if (isNaN(bookingDate.getTime()) || bookingDate < todayThailand) {
      return new Response(JSON.stringify({ error: 'Date must be in the future' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Validate time is within business hours (10:00-20:00)
    const timeNum = parseInt(time, 10)
    if (isNaN(timeNum) || timeNum < 10 || timeNum >= 20) {
      return new Response(JSON.stringify({ error: 'Time must be between 10:00 AM and 8:00 PM' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Get Resend API key from Cloudflare env
    const RESEND_API_KEY = env.RESEND_API_KEY

    if (!RESEND_API_KEY) {
      // If no API key, save booking but skip email (dev mode)
      console.log('No RESEND_API_KEY found — booking saved but email not sent')
      console.log('Booking:', JSON.stringify(body, null, 2))

      // Save to KV if available
      if (env.BOOKINGS) {
        const id = reference || 'BK-' + Date.now().toString(36).toUpperCase()
        await env.BOOKINGS.put(id, JSON.stringify({ ...body, id, createdAt: new Date().toISOString() }))
      }

      return new Response(JSON.stringify({
        success: true,
        reference: reference,
        emailSent: false,
        message: 'Booking saved (email notifications not configured)',
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Format date nicely
    const dateObj = new Date(date)
    const formattedDate = dateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

    const isFreeConsult = bookingType === 'consult'
    const depositAmount = isFreeConsult ? 'Free' : '500 THB (Cash at studio / PromptPay / Card)'

    // === EMAIL 1: Notification to YOU (studio owner) ===
    const ownerHtml = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #0a0a0a; border-radius: 16px; padding: 32px; border: 1px solid #2a2a2a;">
          <div style="text-align: center; margin-bottom: 24px;">
            <h1 style="color: #dc2626; font-size: 24px; margin: 0;">🔥 EARTH GANG TATTOO</h1>
            <p style="color: #888; font-size: 14px; margin-top: 4px;">NEW ${isFreeConsult ? 'CONSULTATION' : 'BOOKING'} ALERT</p>
          </div>

          <div style="background: #1a1a1a; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
            <h2 style="color: #fff; font-size: 18px; margin: 0 0 16px 0;">📋 Booking Details</h2>
            <table style="width: 100%; color: #ccc; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0; color: #888;">Reference</td>
                <td style="padding: 8px 0; color: #dc2626; font-weight: bold; font-family: monospace;">${reference || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888;">Type</td>
                <td style="padding: 8px 0;">${isFreeConsult ? '🆓 Free Consultation (30 min)' : '🎨 Tattoo Session'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888;">Artist</td>
                <td style="padding: 8px 0;">${artist?.name || artist}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888;">Date</td>
                <td style="padding: 8px 0;">${formattedDate}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888;">Time</td>
                <td style="padding: 8px 0;">${time}</td>
              </tr>
              ${!isFreeConsult && service ? `
              <tr>
                <td style="padding: 8px 0; color: #888;">Service</td>
                <td style="padding: 8px 0;">${service}</td>
              </tr>` : ''}
              <tr>
                <td style="padding: 8px 0; color: #888;">Deposit</td>
                <td style="padding: 8px 0; font-weight: bold; color: #4ade80;">${depositAmount}</td>
              </tr>
            </table>
          </div>

          <div style="background: #1a1a1a; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
            <h2 style="color: #fff; font-size: 18px; margin: 0 0 16px 0;">👤 Customer Info</h2>
            <table style="width: 100%; color: #ccc; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0; color: #888;">Name</td>
                <td style="padding: 8px 0;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888;">Email</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #dc2626;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888;">Phone / LINE</td>
                <td style="padding: 8px 0;">${phone}</td>
              </tr>
              ${notes ? `
              <tr>
                <td style="padding: 8px 0; color: #888;">Notes</td>
                <td style="padding: 8px 0;">${notes}</td>
              </tr>` : ''}
            </table>
          </div>

          <p style="color: #666; font-size: 12px; text-align: center; margin-top: 24px;">
            This is an automated notification from Earth Gang Tattoo Booking System.
          </p>
        </div>
      </div>
    `

    // === EMAIL 2: Confirmation to CUSTOMER ===
    const customerHtml = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #0a0a0a; border-radius: 16px; padding: 32px; border: 1px solid #2a2a2a;">
          <div style="text-align: center; margin-bottom: 24px;">
            <h1 style="color: #dc2626; font-size: 24px; margin: 0;">🔥 EARTH GANG TATTOO</h1>
            <p style="color: #4ade80; font-size: 16px; margin-top: 8px; font-weight: bold;">
              ${isFreeConsult ? '✅ Consultation Confirmed!' : '✅ Booking Confirmed!'}
            </p>
          </div>

          <p style="color: #ccc; font-size: 14px; margin-bottom: 20px;">
            Hi ${name}, thank you for ${isFreeConsult ? 'booking a free consultation' : 'booking your tattoo session'}!
            Here are your booking details:
          </p>

          <div style="background: #1a1a1a; border-radius: 12px; padding: 20px; margin-bottom: 20px; text-align: center;">
            <p style="color: #888; font-size: 12px; margin: 0 0 4px 0;">BOOKING REFERENCE</p>
            <p style="color: #dc2626; font-size: 22px; font-weight: bold; font-family: monospace; margin: 0;">${reference || 'N/A'}</p>
          </div>

          <div style="background: #1a1a1a; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
            <table style="width: 100%; color: #ccc; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0; color: #888;">Type</td>
                <td style="padding: 8px 0; font-weight: bold;">${isFreeConsult ? '🆓 Free Consultation (30 min)' : '🎨 Tattoo Session'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888;">Artist</td>
                <td style="padding: 8px 0;">${artist?.name || artist}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888;">Date</td>
                <td style="padding: 8px 0; font-weight: bold;">${formattedDate}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888;">Time</td>
                <td style="padding: 8px 0; font-weight: bold;">${time}</td>
              </tr>
              ${!isFreeConsult && service ? `
              <tr>
                <td style="padding: 8px 0; color: #888;">Service</td>
                <td style="padding: 8px 0;">${service}</td>
              </tr>` : ''}
              <tr>
                <td style="padding: 8px 0; color: #888;">${isFreeConsult ? 'Fee' : 'Deposit'}</td>
                <td style="padding: 8px 0; font-weight: bold; color: #4ade80;">${depositAmount}</td>
              </tr>
            </table>
          </div>

          <div style="background: #1a1a1a; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
            <h3 style="color: #fff; font-size: 16px; margin: 0 0 12px 0;">📍 Studio Location</h3>
            <p style="color: #ccc; font-size: 14px; margin: 0;">141/3 ถ.กำแพงดิน ต.หายยา อ.เมือง จ.เชียงใหม่ 50100</p>
            <p style="color: #ccc; font-size: 14px; margin: 4px 0 0 0;">📞 064-639-4795</p>
            <p style="color: #ccc; font-size: 14px; margin: 4px 0 0 0;">🕐 10:00 AM - 10:00 PM (Daily)</p>
          </div>

          ${!isFreeConsult ? `
          <div style="background: rgba(220,38,38,0.1); border: 1px solid rgba(220,38,38,0.3); border-radius: 12px; padding: 16px; margin-bottom: 20px;">
            <p style="color: #ccc; font-size: 13px; margin: 0;">
              <strong style="color: #dc2626;">💳 Payment:</strong> Please bring your deposit of 500 THB. We accept Cash, PromptPay, and Card.
            </p>
            <p style="color: #888; font-size: 12px; margin: 8px 0 0 0;">PromptPay: Panyanon Viradecha (064-639-4795)</p>
          </div>` : ''}

          <p style="color: #888; font-size: 12px; text-align: center; margin-top: 24px;">
            Need to reschedule? Contact us at 064-639-4795 or reply to this email.<br/>
            24 hours notice required for cancellations.
          </p>
        </div>
      </div>
    `

    // Send both emails via Resend
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Earth Gang Tattoo <noreply@earthgangtattoo.net>',
        to: [
          'earthgangtattoo@gmail.com',  // Notification to you
          email,                         // Confirmation to customer
        ],
        subject: isFreeConsult
          ? `✅ Consultation Confirmed — ${reference} | Earth Gang Tattoo`
          : `✅ Booking Confirmed — ${reference} | Earth Gang Tattoo`,
        html: ownerHtml,
        reply_to: 'earthgangtattoo@gmail.com',
      }),
    })

    const resendData = await resendResponse.json()

    if (!resendResponse.ok) {
      console.error('Resend error:', resendData)
      return new Response(JSON.stringify({
        success: false,
        error: 'Failed to send email',
        details: resendData,
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Save to KV if available
    if (env.BOOKINGS) {
      const id = reference || 'BK-' + Date.now().toString(36).toUpperCase()
      await env.BOOKINGS.put(id, JSON.stringify({
        ...body,
        id,
        emailSent: true,
        createdAt: new Date().toISOString(),
      }))
    }

    return new Response(JSON.stringify({
      success: true,
      reference,
      emailSent: true,
      resendId: resendData.id,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('Booking API error:', error)
    return new Response(JSON.stringify({
      success: false,
      error: 'Internal server error',
      message: error.message,
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

// GET /api/book — List bookings (simple admin view)
export async function onRequestGet(context) {
  const { env } = context
  const bookings = []

  if (env.BOOKINGS) {
    const list = await env.BOOKINGS.list()
    for (const key of list.keys) {
      const data = await env.BOOKINGS.get(key.name, { type: 'json' })
      if (data) bookings.push(data)
    }
  }

  return new Response(JSON.stringify({ bookings }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
