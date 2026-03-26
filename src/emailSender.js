// emailSender.js — Routes email through Cloudflare Functions (server-side)
// API keys are never exposed to the client.

const API_BASE = '' // Same origin

export async function sendBookingEmail(booking) {
  try {
    const response = await fetch(`${API_BASE}/api/book`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(booking),
    })
    const data = await response.json()
    if (!response.ok && !data.success) {
      throw new Error(data.error || 'Booking API failed')
    }
    return data
  } catch (error) {
    console.error('Booking submission failed:', error.message)
    // Fallback: save to localStorage (already done in Booking.jsx)
    throw error
  }
}

export async function sendChatMessage(name, message, email = '') {
  try {
    const response = await fetch(`${API_BASE}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, message, email }),
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Chat message submission failed:', error.message)
    throw error
  }
}
