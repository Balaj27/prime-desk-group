export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PHONE_PATTERN = /^\+?[\d(). -]+$/;

export function getContactError(email: string, phone: string): string {
  if (!email && !phone) return "Enter an email address or phone number.";
  if (email && !EMAIL_PATTERN.test(email)) return "Enter a valid email address.";
  if (phone) {
    const digits = phone.replace(/\D/g, "").length;
    if (!PHONE_PATTERN.test(phone) || digits < 7 || digits > 15) return "Enter a valid phone number.";
  }
  return "";
}
