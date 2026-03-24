// ============================================
// 📧 EMAIL CONFIGURATION
// ============================================
// To set up email notifications:
//
// 1. Go to https://resend.com and sign up (free)
// 2. Go to https://resend.com/api-keys → Create API Key
// 3. Go to https://resend.com/domains → Add your domain (earthgangtattoo.net)
// 4. Add the DNS records Resend gives you to your Cloudflare DNS
// 5. Add the API key as environment variable RESEND_API_KEY in Cloudflare
//
// Then every booking will send:
// - Email to YOU (earthgangtattoo@gmail.com)
// - Confirmation email to the CUSTOMER
// ============================================

export const EMAIL_CONFIG = {
  // Resend API key (set in Cloudflare env vars)
  // Get one at https://resend.com/api-keys
  resendApiKey: '', // Will be read from env: process.env.RESEND_API_KEY

  // Who receives booking notifications (you)
  ownerEmail: 'earthgangtattoo@gmail.com',

  // Email addresses for replies
  replyTo: 'earthgangtattoo@gmail.com',

  // Studio info for emails
  studio: {
    name: 'Earth Gang Tattoo',
    address: '141/3 ถ.กำแพงดิน ต.หายยา อ.เมือง จ.เชียงใหม่ 50100',
    phone: '064-639-4795',
    website: 'https://earthgangtattoo.net',
  },
}
