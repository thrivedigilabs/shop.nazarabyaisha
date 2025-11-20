export const APP_CONFIG = {
  whatsapp: {
    phoneNumber: '911234567890', // Update this with your WhatsApp number (format: country code + number, no spaces or symbols)
  },
  webhook: {
    appointmentUrl: 'https://your-webhook-url.com/appointment', // Update this with your webhook URL
  },
} as const;

// Helper function to generate WhatsApp URL
export function generateWhatsAppUrl(productTitle: string, sku: string): string {
  const message = `Hi, I'm interested in ${productTitle} (${sku})`;
  const encodedMessage = encodeURIComponent(message);
  return `https://api.whatsapp.com/send/?phone=${APP_CONFIG.whatsapp.phoneNumber}&text=${encodedMessage}&type=phone_number&app_absent=0`;
}
