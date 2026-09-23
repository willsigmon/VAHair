/**
 * FAQ entries shown on /faq, used for its FAQPage schema, and repeated in /llms-full.txt.
 */
export interface Faq {
  question: string;
  answer: string;
}

export const FAQS: readonly Faq[] = [
  {
    question: 'How do I book an appointment?',
    answer: "You can book online through our website by clicking 'Book Now' or visiting our booking page. You can also call us at (919) 671-8353.",
  },
  {
    question: 'What is your cancellation policy?',
    answer: 'We kindly ask for at least 24 hours notice if you need to cancel or reschedule. You can use the link in your confirmation email to manage your appointment.',
  },
  {
    question: 'Do you accept walk-ins?',
    answer: 'While we primarily work by appointment to ensure quality time with each client, we do accommodate walk-ins when possible. Call ahead to check availability.',
  },
  {
    question: 'What forms of payment do you accept?',
    answer: 'We accept all major credit cards, debit cards, and cash.',
  },
  {
    question: 'How long should I expect my appointment to take?',
    answer: 'Appointment times vary by service. Haircuts typically take 30-60 minutes, while color services can range from 1.5 to 3+ hours depending on the treatment.',
  },
  {
    question: 'Should I wash my hair before my appointment?',
    answer: "For haircuts, clean hair is fine. For color services, it's actually better to come with hair that hasn't been washed for 1-2 days, as natural oils can help protect your scalp.",
  },
  {
    question: 'Do you offer consultations?',
    answer: 'Yes! We offer consultations for color services ($45) and extensions ($30). This helps us understand your goals and recommend the best approach. Book a consultation online or call us.',
  },
  {
    question: 'What products do you use and sell?',
    answer: 'We use and retail professional-grade products. Ask your stylist for personalized product recommendations for your hair type.',
  },
  {
    question: 'Is parking available?',
    answer: 'Yes, free street parking is available on South Main Street and in the surrounding downtown Rolesville area.',
  },
  {
    question: 'Do you offer services for children?',
    answer: "Yes! We offer children's haircuts for ages 10 and under. We recommend booking during quieter times for a more relaxed experience.",
  },
];
