// ============================================
// 📧 EMAIL SENDER — sends emails directly via Resend
// ============================================

const RESEND_API_KEY = 're_NEDYiuX8_3mKbEoPcaZnF9jj3gD41qs8t'
const FROM_EMAIL = 'noreply@earthgangtattoo.net'
const OWNER_EMAIL = 'earthgangtattoo1@gmail.com'

export async function sendBookingEmail(booking) {
  const { name, email, phone, artist, date, time, bookingType, service, notes, reference } = booking

  const dateObj = new Date(date)
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })

  const isFreeConsult = bookingType === 'consult'
  const depositAmount = isFreeConsult ? 'Free' : '500 THB (Cash / PromptPay / Card)'

  const ownerHtml = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px;">
      <div style="background:#0a0a0a;border-radius:16px;padding:32px;border:1px solid #2a2a2a;">
        <div style="text-align:center;margin-bottom:24px;">
          <h1 style="color:#dc2626;font-size:24px;margin:0;">🔥 EARTH GANG TATTOO</h1>
          <p style="color:#888;font-size:14px;margin-top:4px;">NEW ${isFreeConsult ? 'CONSULTATION' : 'BOOKING'} ALERT</p>
        </div>
        <div style="background:#1a1a1a;border-radius:12px;padding:20px;margin-bottom:20px;">
          <h2 style="color:#fff;font-size:18px;margin:0 0 16px 0;">📋 Booking Details</h2>
          <table style="width:100%;color:#ccc;font-size:14px;">
            <tr><td style="padding:8px 0;color:#888;">Reference</td><td style="padding:8px 0;color:#dc2626;font-weight:bold;font-family:monospace;">${reference || 'N/A'}</td></tr>
            <tr><td style="padding:8px 0;color:#888;">Type</td><td style="padding:8px 0;">${isFreeConsult ? '🆓 Free Consultation (30 min)' : '🎨 Tattoo Session'}</td></tr>
            <tr><td style="padding:8px 0;color:#888;">Artist</td><td style="padding:8px 0;">${artist?.name || artist}</td></tr>
            <tr><td style="padding:8px 0;color:#888;">Date</td><td style="padding:8px 0;">${formattedDate}</td></tr>
            <tr><td style="padding:8px 0;color:#888;">Time</td><td style="padding:8px 0;">${time}</td></tr>
            ${!isFreeConsult && service ? `<tr><td style="padding:8px 0;color:#888;">Service</td><td style="padding:8px 0;">${service}</td></tr>` : ''}
            <tr><td style="padding:8px 0;color:#888;">Deposit</td><td style="padding:8px 0;font-weight:bold;color:#4ade80;">${depositAmount}</td></tr>
          </table>
        </div>
        <div style="background:#1a1a1a;border-radius:12px;padding:20px;margin-bottom:20px;">
          <h2 style="color:#fff;font-size:18px;margin:0 0 16px 0;">👤 Customer Info</h2>
          <table style="width:100%;color:#ccc;font-size:14px;">
            <tr><td style="padding:8px 0;color:#888;">Name</td><td style="padding:8px 0;">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#888;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#dc2626;">${email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#888;">Phone / LINE</td><td style="padding:8px 0;">${phone}</td></tr>
            ${notes ? `<tr><td style="padding:8px 0;color:#888;">Notes</td><td style="padding:8px 0;">${notes}</td></tr>` : ''}
          </table>
        </div>
        <p style="color:#666;font-size:12px;text-align:center;margin-top:24px;">Automated notification from Earth Gang Tattoo</p>
      </div>
    </div>`

  const customerHtml = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px;">
      <div style="background:#0a0a0a;border-radius:16px;padding:32px;border:1px solid #2a2a2a;">
        <div style="text-align:center;margin-bottom:24px;">
          <h1 style="color:#dc2626;font-size:24px;margin:0;">🔥 EARTH GANG TATTOO</h1>
          <p style="color:#4ade80;font-size:16px;margin-top:8px;font-weight:bold;">
            ${isFreeConsult ? '✅ Consultation Confirmed!' : '✅ Booking Confirmed!'}
          </p>
        </div>
        <p style="color:#ccc;font-size:14px;margin-bottom:20px;">
          Hi ${name}, thank you for ${isFreeConsult ? 'booking a free consultation' : 'booking your tattoo session'}!
        </p>
        <div style="background:#1a1a1a;border-radius:12px;padding:20px;margin-bottom:20px;text-align:center;">
          <p style="color:#888;font-size:12px;margin:0 0 4px 0;">BOOKING REFERENCE</p>
          <p style="color:#dc2626;font-size:22px;font-weight:bold;font-family:monospace;margin:0;">${reference || 'N/A'}</p>
        </div>
        <div style="background:#1a1a1a;border-radius:12px;padding:20px;margin-bottom:20px;">
          <table style="width:100%;color:#ccc;font-size:14px;">
            <tr><td style="padding:8px 0;color:#888;">Type</td><td style="padding:8px 0;font-weight:bold;">${isFreeConsult ? '🆓 Free Consultation (30 min)' : '🎨 Tattoo Session'}</td></tr>
            <tr><td style="padding:8px 0;color:#888;">Artist</td><td style="padding:8px 0;">${artist?.name || artist}</td></tr>
            <tr><td style="padding:8px 0;color:#888;">Date</td><td style="padding:8px 0;font-weight:bold;">${formattedDate}</td></tr>
            <tr><td style="padding:8px 0;color:#888;">Time</td><td style="padding:8px 0;font-weight:bold;">${time}</td></tr>
            ${!isFreeConsult && service ? `<tr><td style="padding:8px 0;color:#888;">Service</td><td style="padding:8px 0;">${service}</td></tr>` : ''}
            <tr><td style="padding:8px 0;color:#888;">${isFreeConsult ? 'Fee' : 'Deposit'}</td><td style="padding:8px 0;font-weight:bold;color:#4ade80;">${depositAmount}</td></tr>
          </table>
        </div>
        <div style="background:#1a1a1a;border-radius:12px;padding:20px;margin-bottom:20px;">
          <h3 style="color:#fff;font-size:16px;margin:0 0 12px 0;">📍 Studio Location</h3>
          <p style="color:#ccc;font-size:14px;margin:0;">141/3 ถ.กำแพงดิน ต.หายยา อ.เมือง จ.เชียงใหม่ 50100</p>
          <p style="color:#ccc;font-size:14px;margin:4px 0 0 0;">📞 064-639-4795</p>
          <p style="color:#ccc;font-size:14px;margin:4px 0 0 0;">🕐 10:00 AM - 10:00 PM (Daily)</p>
        </div>
        ${!isFreeConsult ? `
        <div style="background:rgba(220,38,38,0.1);border:1px solid rgba(220,38,38,0.3);border-radius:12px;padding:16px;margin-bottom:20px;">
          <p style="color:#ccc;font-size:13px;margin:0;"><strong style="color:#dc2626;">💳 Payment:</strong> Please bring your deposit of 500 THB. We accept Cash, PromptPay, and Card.</p>
          <p style="color:#888;font-size:12px;margin:8px 0 0 0;">PromptPay: Panyanon Viradecha (064-639-4795)</p>
        </div>` : ''}
        <p style="color:#888;font-size:12px;text-align:center;margin-top:24px;">
          Need to reschedule? Contact us at 064-639-4795 or reply to this email.<br/>
          24 hours notice required for cancellations.
        </p>
      </div>
    </div>`

  // Send both emails at once
  return fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `Earth Gang Tattoo <${FROM_EMAIL}>`,
      to: [OWNER_EMAIL, email],
      subject: isFreeConsult
        ? `✅ Consultation Confirmed — ${reference} | Earth Gang Tattoo`
        : `✅ Booking Confirmed — ${reference} | Earth Gang Tattoo`,
      html: ownerHtml,
      reply_to: OWNER_EMAIL,
    }),
  })
}

export async function sendChatMessage(name, message) {
  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px;">
      <div style="background:#0a0a0a;border-radius:16px;padding:32px;border:1px solid #2a2a2a;">
        <div style="text-align:center;margin-bottom:24px;">
          <h1 style="color:#dc2626;font-size:24px;margin:0;">🔥 EARTH GANG TATTOO</h1>
          <p style="color:#888;font-size:14px;margin-top:4px;">NEW CHAT MESSAGE</p>
        </div>
        <div style="background:#1a1a1a;border-radius:12px;padding:20px;margin-bottom:16px;">
          <table style="width:100%;color:#ccc;font-size:14px;">
            <tr><td style="padding:8px 0;color:#888;">From</td><td style="padding:8px 0;">${name || 'Anonymous'}</td></tr>
            <tr><td style="padding:8px 0;color:#888;">Time</td><td style="padding:8px 0;">${new Date().toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' })}</td></tr>
          </table>
        </div>
        <div style="background:#1a1a1a;border-radius:12px;padding:20px;">
          <p style="color:#fff;font-size:14px;margin:0;white-space:pre-wrap;">${message}</p>
        </div>
      </div>
    </div>`

  return fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `Earth Gang Tattoo <${FROM_EMAIL}>`,
      to: [OWNER_EMAIL],
      subject: `💬 New chat message from ${name || 'website visitor'} — Earth Gang Tattoo`,
      html,
    }),
  })
}
