'use client';

/**
 * Displays next available time slot for a stylist
 * Features mind-blowing animations when slot is available
 */
import { useEffect, useState } from 'react';
import type { NextSlot } from '@/lib/acuity/types';

interface Props {
  calendarId: number;
  className?: string;
}

type BadgeStatus = 'loading' | 'available' | 'unavailable';

const CACHE_DURATION = 30 * 1000; // 30 seconds
const cache = new Map<number, { data: NextSlot | null; timestamp: number }>();
const pending = new Map<number, Promise<NextSlot | null>>(); // Deduplication for concurrent requests

async function fetchNextSlot(calendarId: number, signal?: AbortSignal): Promise<NextSlot | null> {
  // Check cache first
  const cached = cache.get(calendarId);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  // Deduplicate concurrent requests for same calendar
  const inflight = pending.get(calendarId);
  if (inflight) {
    return inflight;
  }

  const promise = (async () => {
    try {
      const response = await fetch(`/api/availability/next-slot?calendarId=${calendarId}`, { signal });

      // Check response status before parsing
      if (!response.ok) {
        console.error('API error:', response.status);
        return null;
      }

      const result = await response.json();

      // Don't cache error responses
      if (result.error || result.fallback) {
        return result.data;
      }

      // Cache successful responses only
      cache.set(calendarId, { data: result.data, timestamp: Date.now() });
      return result.data;
    } catch (error) {
      // Ignore abort errors (expected on navigation)
      if (error instanceof Error && error.name === 'AbortError') return null;
      console.error('Error fetching availability:', error);
      return null;
    } finally {
      pending.delete(calendarId);
    }
  })();

  pending.set(calendarId, promise);
  return promise;
}

export default function NextSlotBadge({ calendarId, className = '' }: Props) {
  const [status, setStatus] = useState<BadgeStatus>('loading');
  const [slot, setSlot] = useState<NextSlot | null>(null);
  const [sparkle, setSparkle] = useState(false);

  useEffect(() => {
    if (!Number.isInteger(calendarId) || calendarId <= 0) {
      setStatus('unavailable');
      return;
    }

    const controller = new AbortController();
    let sparkleTimer: ReturnType<typeof setTimeout> | undefined;

    fetchNextSlot(calendarId, controller.signal).then((slotData) => {
      if (controller.signal.aborted) return;

      if (slotData && slotData.displayText) {
        setSlot(slotData);
        setStatus('available');

        // Trigger sparkle animation for "Today" or "Tomorrow"
        if (slotData.relativeText === 'Today' || slotData.relativeText === 'Tomorrow') {
          setSparkle(true);
          sparkleTimer = setTimeout(() => setSparkle(false), 2000);
        }
      } else {
        setStatus('unavailable');
      }
    });

    return () => {
      controller.abort();
      if (sparkleTimer) clearTimeout(sparkleTimer);
    };
  }, [calendarId]);

  return (
    <div
      className={`next-slot-badge inline-flex items-center gap-2 relative ${className}`.trim()}
      data-calendar-id={calendarId}
    >
      {/* Loading state */}
      <span className={`loading-state inline-flex items-center gap-2 text-xs text-[var(--color-taupe)]${status !== 'loading' ? ' hidden' : ''}`}>
        <span className="loading-dot w-2 h-2 bg-[var(--color-cream-dark)] rounded-full" />
        <span className="loading-text">Checking...</span>
      </span>

      {/* Available state (hidden by default) */}
      <span className={`available-state inline-flex items-center gap-2 text-xs${status !== 'available' ? ' hidden' : ''}`}>
        {/* Animated pulse dot with glow */}
        <span className="availability-dot relative">
          <span className="dot-core w-2 h-2 bg-[var(--color-gold)] rounded-full relative z-10" />
          <span className="dot-pulse absolute inset-0 bg-[var(--color-gold)] rounded-full" />
          <span className="dot-glow absolute -inset-1 bg-[var(--color-gold)]/30 rounded-full blur-sm" />
        </span>
        <span className="slot-text text-[var(--color-gold)] font-medium">
          Next: {slot?.displayText ?? '—'}
        </span>
      </span>

      {/* Unavailable state (hidden by default) */}
      <span className={`unavailable-state inline-flex items-center gap-2 text-xs text-[var(--color-taupe)]${status !== 'unavailable' ? ' hidden' : ''}`}>
        <span className="w-2 h-2 bg-[var(--color-taupe)]/30 rounded-full" />
        <span>Check availability</span>
      </span>

      {/* Sparkle particles (for wow factor) */}
      <div className={`sparkle-container absolute -inset-4 pointer-events-none overflow-hidden${sparkle ? '' : ' hidden'}`}>
        <div className="sparkle sparkle-1" />
        <div className="sparkle sparkle-2" />
        <div className="sparkle sparkle-3" />
      </div>
    </div>
  );
}
