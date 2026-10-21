import type { Faq } from '@/lib/data/faqs';

export default function FaqList({ faqs }: { faqs: readonly Faq[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type': 'Question', name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      <div className="space-y-4">
        {faqs.map(({ question, answer }) => (
          <details key={question} className="faq-item group">
            <summary className="flex items-center justify-between gap-6 p-6 cursor-pointer">
              <span className="text-lg font-medium">{question}</span>
              <span className="faq-chevron shrink-0" aria-hidden="true">⌄</span>
            </summary>
            <p className="px-6 pb-6 text-[var(--color-taupe)]">{answer}</p>
          </details>
        ))}
      </div>
    </>
  );
}
