'use client';

/**
 * Interactive booking UI: stylist filter pills, "help me choose"
 * questionnaire, recommendation panel, and the Acuity scheduler embed.
 * (Port of the interactive portion of the old book.astro page.)
 */
import { useEffect, useRef, useState } from 'react';

interface StylistOption {
  id: number;
  name: string;
}

interface Props {
  stylists: StylistOption[];
  embedBaseUrl: string;
}

interface Recommendation {
  name: string;
  key: string;
  icon: string;
  reason: string;
}

// Stylist recommendations based on service
const RECOMMENDATIONS: Record<string, Recommendation> = {
  haircut: {
    name: 'Kim',
    key: 'kim',
    icon: '✂️',
    reason: '20 years of experience crafting the perfect cut',
  },
  color: {
    name: 'Alyssa',
    key: 'alyssa',
    icon: '🎨',
    reason: 'Our color specialist with an eye for stunning results',
  },
  both: {
    name: 'Virginia',
    key: 'virginia',
    icon: '💫',
    reason: 'Owner & master stylist for your full transformation',
  },
  treatment: {
    name: 'Virginia',
    key: 'virginia',
    icon: '✨',
    reason: 'Expert in Brazilian blowouts and treatments',
  },
};

const SERVICE_CHOICES = [
  {
    service: 'haircut',
    icon: '✂️',
    title: 'Haircut or Styling',
    subtitle: 'Cut, trim, blowout, or special occasion',
  },
  {
    service: 'color',
    icon: '🎨',
    title: 'Color Services',
    subtitle: 'Highlights, balayage, all-over color',
  },
  {
    service: 'both',
    icon: '💇‍♀️',
    title: 'Both Cut & Color',
    subtitle: 'Full transformation',
  },
  {
    service: 'treatment',
    icon: '✨',
    title: 'Treatment',
    subtitle: 'Brazilian blowout, deep conditioning',
  },
];

export default function BookPageClient({ stylists, embedBaseUrl }: Props) {
  // Stylist calendar IDs (from centralized stylist data)
  const calendars: Record<string, string> = {
    all: '',
    ...Object.fromEntries(stylists.map((s) => [s.name.toLowerCase(), String(s.id)])),
  };

  const [activeStylist, setActiveStylist] = useState('all');
  const [panel, setPanel] = useState<'pills' | 'questionnaire' | 'recommendation'>('pills');
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [iframeSrc, setIframeSrc] = useState(embedBaseUrl);
  const [loaderVisible, setLoaderVisible] = useState(true);
  const [loaderFading, setLoaderFading] = useState(false);
  const schedulerRef = useRef<HTMLElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const timers = timersRef.current;
    return () => timers.forEach(clearTimeout);
  }, []);

  function scrollToScheduler() {
    schedulerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function updateScheduler(stylistKey: string) {
    const calendarId = calendars[stylistKey] || '';
    const newUrl = calendarId ? `${embedBaseUrl}&calendarID=${calendarId}` : embedBaseUrl;

    // Show loader while the new schedule loads
    setLoaderVisible(true);
    setLoaderFading(false);
    setIframeSrc(newUrl);
    setActiveStylist(stylistKey);
  }

  function handleIframeLoad() {
    timersRef.current.push(
      setTimeout(() => {
        setLoaderFading(true);
        timersRef.current.push(setTimeout(() => setLoaderVisible(false), 500));
      }, 500)
    );
  }

  function selectStylist(stylistKey: string) {
    updateScheduler(stylistKey);
    scrollToScheduler();
  }

  function handleServiceChoice(service: string) {
    const rec = RECOMMENDATIONS[service];
    if (!rec) return;
    setRecommendation(rec);
    setPanel('recommendation');
  }

  function bookRecommended() {
    if (!recommendation) return;
    updateScheduler(recommendation.key);
    setPanel('pills');
    scrollToScheduler();
  }

  // Check for URL params to pre-select stylist
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const stylistParam = urlParams.get('stylist');
    if (stylistParam && calendars[stylistParam]) {
      updateScheduler(stylistParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pillsHidden = panel !== 'pills';

  return (
    <div className="book-scope">
      {/* Compact Hero */}
      <section className="pt-16 pb-8 px-6 relative overflow-hidden">
        {/* Ambient decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[var(--color-gold)]/5 blur-3xl" />
        <div className="max-w-4xl mx-auto text-center relative">
          <h1 className="display-lg mb-4 animate-fade-up" style={{ fontFamily: 'var(--font-display)', animationDelay: '0.1s' }}>
            Book Your Appointment
          </h1>
          <p className="text-lg text-[var(--color-taupe)] max-w-2xl mx-auto mb-6 animate-fade-up leading-relaxed" style={{ animationDelay: '0.2s' }}>
            Select your stylist, or let us help you find the perfect match.
          </p>

          <div className="max-w-2xl mx-auto mb-6 animate-fade-up" style={{ animationDelay: '0.25s' }}>
            <p className="rounded-full border border-[var(--color-gold)]/30 bg-white/70 px-5 py-3 text-sm text-[var(--color-charcoal)] shadow-sm">
              Want a text reminder? After entering your info, check Acuity&rsquo;s SMS reminder permission box.
              Confirmation still arrives by email.
            </p>
          </div>

          {/* Stylist quick-select buttons */}
          <div className="flex flex-wrap justify-center gap-3 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <button
              type="button"
              data-stylist="all"
              className={`quick-book-btn filter-pill${activeStylist === 'all' ? ' active' : ''}`}
              style={pillsHidden ? { display: 'none' } : undefined}
              onClick={() => selectStylist('all')}
            >
              All Stylists
            </button>
            {stylists.map((stylist) => {
              const key = stylist.name.toLowerCase();
              return (
                <button
                  key={stylist.id}
                  type="button"
                  data-stylist={key}
                  aria-label={`Book appointment with ${stylist.name}`}
                  className={`quick-book-btn filter-pill${activeStylist === key ? ' active' : ''}`}
                  style={pillsHidden ? { display: 'none' } : undefined}
                  onClick={() => selectStylist(key)}
                >
                  {stylist.name}
                </button>
              );
            })}
            <button
              type="button"
              id="help-choose-btn"
              className="filter-pill help-choose-pill"
              aria-label="Help me choose a stylist"
              onClick={() => setPanel('questionnaire')}
            >
              <svg className="w-4 h-4 inline-block mr-1.5 -mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Help me choose
            </button>
          </div>

          {/* Questionnaire Panel (hidden by default) */}
          <div id="questionnaire" className={`mt-8 animate-fade-up${panel !== 'questionnaire' ? ' hidden' : ''}`}>
            <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6 border border-[var(--color-cream-dark)]">
              <h3 className="text-lg font-semibold mb-4 text-center" style={{ fontFamily: 'var(--font-display)' }}>
                What brings you in today?
              </h3>
              <div className="grid gap-3">
                {SERVICE_CHOICES.map((choice) => (
                  <button
                    key={choice.service}
                    type="button"
                    className="service-choice"
                    data-service={choice.service}
                    onClick={() => handleServiceChoice(choice.service)}
                  >
                    <span className="choice-icon">{choice.icon}</span>
                    <span className="choice-text">
                      <strong>{choice.title}</strong>
                      <small>{choice.subtitle}</small>
                    </span>
                  </button>
                ))}
              </div>
              <button
                type="button"
                id="close-questionnaire"
                className="mt-4 text-sm text-[var(--color-taupe)] hover:text-[var(--color-gold)] transition-colors"
                onClick={() => setPanel('pills')}
              >
                &larr; Back to all stylists
              </button>
            </div>
          </div>

          {/* Recommendation Panel (hidden by default) */}
          <div id="recommendation" className={`mt-8 animate-fade-up${panel !== 'recommendation' ? ' hidden' : ''}`}>
            <div className="max-w-md mx-auto bg-gradient-to-br from-[var(--color-gold)]/5 to-[var(--color-blush)]/5 rounded-2xl shadow-lg p-6 border border-[var(--color-gold)]/20">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-gold)]/10 flex items-center justify-center">
                  <span className="text-2xl" id="rec-icon">{recommendation?.icon ?? '⭐'}</span>
                </div>
                <p className="text-sm text-[var(--color-taupe)] mb-2">We recommend</p>
                <h3 id="rec-name" className="text-2xl font-semibold mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                  {recommendation?.name ?? 'Virginia'}
                </h3>
                <p id="rec-reason" className="text-[var(--color-taupe)] text-sm mb-4">
                  {recommendation?.reason ?? 'Perfect for your haircut needs'}
                </p>
                <button
                  type="button"
                  id="book-recommended"
                  className="w-full py-3 px-6 bg-[var(--color-gold)] text-white rounded-full font-medium hover:bg-[var(--color-charcoal)] transition-colors"
                  onClick={bookRecommended}
                >
                  Book with <span id="rec-name-btn">{recommendation?.name ?? 'Virginia'}</span>
                </button>
                <button
                  type="button"
                  id="see-all-stylists"
                  className="mt-3 text-sm text-[var(--color-taupe)] hover:text-[var(--color-gold)] transition-colors"
                  onClick={() => setPanel('pills')}
                >
                  Or see all stylists
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Acuity Embed */}
      <section ref={schedulerRef} className="pb-12 px-6 bg-[var(--color-cream)]" id="scheduler">
        <div className="max-w-5xl mx-auto">
          <div className="acuity-container relative">
            <iframe
              id="acuity-embed"
              src={iframeSrc}
              title="Schedule Appointment with Virginia Page & Co. Hair Studio"
              width="100%"
              frameBorder="0"
              loading="lazy"
              className="acuity-iframe w-full"
              onLoad={handleIframeLoad}
            />

            {/* Loading overlay */}
            {loaderVisible && (
              <div
                id="acuity-loader"
                className="absolute inset-0 bg-[var(--color-cream)]/95 backdrop-blur-sm flex items-center justify-center transition-opacity duration-500"
                style={{ opacity: loaderFading ? 0 : 1 }}
              >
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-[var(--color-gold)]/20 border-t-[var(--color-gold)] rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-[var(--color-taupe)] text-sm">Loading scheduler...</p>
                </div>
              </div>
            )}
          </div>
          <p className="text-center text-sm text-[--color-taupe] mt-4">
            Having trouble with the scheduler? Call us directly at{' '}
            <a href="tel:9196718353" className="text-[--color-gold] hover:underline">(919) 671-8353</a>
          </p>
        </div>
      </section>
    </div>
  );
}
