type ConversionEvent = "form_submitted" | "book_a_call_clicked";

declare global {
  interface Window {
    dataLayer?: Array<{ event: ConversionEvent }>;
  }
}

export function trackConversion(event: ConversionEvent) {
  (window.dataLayer ??= []).push({ event });
}
