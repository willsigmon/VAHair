import { SALON, SALON_ADDRESS_LINE } from '@/lib/salon';

export interface Faq { question: string; answer: string; }

/** Answers shared by the visible service menu, schema, and machine-readable guide. */
export const SERVICE_FAQS: readonly Faq[] = [
  {
    question: 'Are the listed prices final?',
    answer: 'Prices are starting prices and are subject to consultation before service. Final pricing may vary with hair length, thickness, and condition. Listed prices may differ from the booking system.',
  },
  {
    question: 'Does a color service include a haircut or blowdry?',
    answer: 'The standard Hair Color menu does not include a haircut or blowdry; these can be added separately. Alyssa’s menu lists the combinations with a cut or blowdry in each service name.',
  },
  {
    question: 'Do new hair extensions require a consultation?',
    answer: 'New extension installs require a consultation first. Alyssa’s extension consultation is listed at $30.',
  },
  {
    question: 'Do you offer children’s haircuts?',
    answer: 'The Haircuts menu includes a Children’s Cut for ages 10 and under, listed at $30. Alyssa’s services are for adult women only.',
  },
];

export const FAQS: readonly Faq[] = [
  {
    question: 'How do I book an appointment?',
    answer: `Choose Book Now, select a service and stylist, then an available date and time. You can also call or text ${SALON.phoneDisplay}.`,
  },
  {
    question: 'Who can I book with?',
    answer: 'You can choose Virginia Page Watkins, Kim Latham, or Alyssa Valdes in the online scheduler.',
  },
  {
    question: 'Where is the studio?',
    answer: `${SALON.name} is at ${SALON_ADDRESS_LINE}.`,
  },
  {
    question: 'What are the studio’s hours?',
    answer: 'Tuesday and Wednesday: 9:30 AM–5 PM. Thursday: 9:30 AM–4 PM. Friday: 9:30 AM–2 PM. Saturdays alternate with Alyssa, 9 AM–5 PM. Closed Sunday and Monday. Check the scheduler for available Saturday appointments.',
  },
  {
    question: 'How can I cancel or reschedule?',
    answer: `Use the link in your confirmation email to manage your appointment. For help, call ${SALON.phoneDisplay}.`,
  },
  {
    question: 'Can I receive a text reminder?',
    answer: 'Select Acuity’s SMS reminder permission box when entering your information. A phone number alone does not opt you in. Booking confirmations are sent by email.',
  },
  ...SERVICE_FAQS,
];
