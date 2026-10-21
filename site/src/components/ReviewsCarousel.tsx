'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { FocusEvent, KeyboardEvent, PointerEvent } from 'react';
import {
  CLIENT_REVIEWS,
  GOOGLE_REVIEWS_URL,
  MAX_RATING,
  reviewAuthor,
  reviewMonthYear,
} from '@/lib/data/reviews';

/** Time each review stays on screen while auto-rotating. */
const ROTATE_INTERVAL_MS = 8000;
/** Horizontal drag distance that counts as a swipe. */
const SWIPE_THRESHOLD_PX = 48;
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(REDUCED_MOTION_QUERY);
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return reduced;
}

export default function ReviewsCarousel() {
  const total = CLIENT_REVIEWS.length;
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [stopped, setStopped] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const swipeStartX = useRef<number | null>(null);

  const autoRotating = !reducedMotion && !stopped && !hovered && !focused && total > 1;

  const goTo = useCallback((index: number) => setActive((index + total) % total), [total]);
  const previous = useCallback(() => setActive((current) => (current - 1 + total) % total), [total]);
  const next = useCallback(() => setActive((current) => (current + 1) % total), [total]);

  useEffect(() => {
    if (!autoRotating) return undefined;
    const timer = window.setInterval(next, ROTATE_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [autoRotating, next]);

  const handleBlur = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowLeft') previous();
    if (event.key === 'ArrowRight') next();
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    swipeStartX.current = event.clientX;
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (swipeStartX.current === null) return;
    const distance = event.clientX - swipeStartX.current;
    swipeStartX.current = null;
    if (distance <= -SWIPE_THRESHOLD_PX) next();
    if (distance >= SWIPE_THRESHOLD_PX) previous();
  };

  const handlePointerCancel = () => {
    swipeStartX.current = null;
  };

  return (
    <section
      className="reviews-carousel max-w-6xl mx-auto"
      aria-roledescription="carousel"
      aria-labelledby="reviews-heading"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      <header className="reviews-carousel-head">
        <div>
          <span className="eyebrow">Client Reviews</span>
          <h2 id="reviews-heading" className="display-md">Hear it from our clients</h2>
        </div>
        <a
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Read all our reviews on Google (opens in new window)"
          className="reviews-carousel-all"
        >
          Read all our reviews on Google
        </a>
      </header>

      <div
        className="reviews-carousel-viewport"
        aria-live={autoRotating ? 'off' : 'polite'}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
        {CLIENT_REVIEWS.map((review, index) => {
          const isActive = index === active;
          return (
            <figure
              key={review.id}
              id={review.id}
              className="reviews-slide"
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${total}`}
              aria-hidden={!isActive}
              inert={!isActive}
              data-active={isActive}
            >
              <p className="reviews-stars">
                <span aria-hidden="true">{'★'.repeat(review.rating)}{'☆'.repeat(MAX_RATING - review.rating)}</span>
                <span className="sr-only">Rated {review.rating} out of {MAX_RATING} stars</span>
              </p>
              <blockquote className="reviews-quote">
                <p>{review.text}</p>
              </blockquote>
              <figcaption className="reviews-meta">
                <span className="reviews-author">{reviewAuthor(review)}</span>
                <span>
                  {review.source} · <time dateTime={review.date}>{reviewMonthYear(review)}</time>
                </span>
              </figcaption>
            </figure>
          );
        })}
      </div>

      <div className="reviews-controls">
        <button type="button" className="reviews-control" onClick={previous} aria-controls={CLIENT_REVIEWS[active].id}>
          Previous
        </button>
        <div className="reviews-dots">
          {CLIENT_REVIEWS.map((review, index) => (
            <button
              key={review.id}
              type="button"
              className="reviews-dot"
              aria-label={`Show review ${index + 1} of ${total}`}
              aria-current={index === active ? 'true' : undefined}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
        <button type="button" className="reviews-control" onClick={next} aria-controls={CLIENT_REVIEWS[active].id}>
          Next
        </button>
        {!reducedMotion && (
          <button
            type="button"
            className="reviews-control reviews-toggle"
            onClick={() => setStopped((value) => !value)}
          >
            {stopped ? 'Play' : 'Pause'}
          </button>
        )}
      </div>
    </section>
  );
}
