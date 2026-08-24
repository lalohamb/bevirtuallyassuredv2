// Lightweight analytics event tracker — fires gtag if available, always logs in dev
export function track(event: string, props?: Record<string, string | number | boolean>) {
  if (import.meta.env.DEV) {
    console.debug('[analytics]', event, props);
  }
  const w = window as unknown as { gtag?: (cmd: string, event: string, props: object) => void };
  if (typeof window !== 'undefined' && typeof w.gtag === 'function') {
    w.gtag('event', event, props ?? {});
  }
}

export const Events = {
  PAGE_VIEW: 'page_view',
  HERO_CTA_CLICK: 'hero_cta_click',
  ASSESSMENT_STARTED: 'assessment_started',
  ASSESSMENT_COMPLETED: 'assessment_completed',
  CONSULTATION_STARTED: 'consultation_started',
  CONSULTATION_BOOKED: 'consultation_booked',
  CONTACT_SUBMITTED: 'contact_submitted',
  CASE_STUDY_VIEWED: 'case_study_viewed',
  CALCULATOR_STARTED: 'calculator_started',
  CALCULATOR_COMPLETED: 'calculator_completed',
  SERVICES_VIEWED: 'services_viewed',
  PRICING_VIEWED: 'pricing_viewed',
} as const;
