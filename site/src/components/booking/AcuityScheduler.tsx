'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { ACUITY_APP_ORIGIN, ACUITY_EMBED_JS_URL } from '@/lib/acuity/constants';
import { SALON } from '@/lib/salon';

/** A cross-origin error document can emit load. Require Acuity's own handshake. */
export default function AcuityScheduler({ src }: { src: string }) {
  const iframe = useRef<HTMLIFrameElement>(null);
  const scriptReady = useRef(false);
  const frameReady = useRef(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'failed'>('loading');

  function finishLoading() {
    if (scriptReady.current && frameReady.current) {
      if (timeout.current) clearTimeout(timeout.current);
      setStatus('ready');
    }
  }

  function fail() {
    if (timeout.current) clearTimeout(timeout.current);
    setStatus('failed');
  }

  useEffect(() => {
    frameReady.current = false;
    setStatus('loading');
    timeout.current = setTimeout(() => setStatus('failed'), 8000);
    function onMessage(event: MessageEvent) {
      if (event.origin !== ACUITY_APP_ORIGIN || event.source !== iframe.current?.contentWindow || typeof event.data !== 'string') return;
      const sizing = /^sizing:(\d+)(?::|$)/.exec(event.data);
      if (event.data === 'load' || event.data.startsWith('load:') || (sizing && Number(sizing[1]) > 150)) {
        frameReady.current = true;
        finishLoading();
      }
    }
    window.addEventListener('message', onMessage);
    // Covers a cached frame that loaded before the effect attached.
    iframe.current?.contentWindow?.postMessage('acuity:init', ACUITY_APP_ORIGIN);
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
      window.removeEventListener('message', onMessage);
    };
  }, [src]);

  return (
    <>
      <Script
        src={ACUITY_EMBED_JS_URL}
        strategy="afterInteractive"
        onReady={() => { scriptReady.current = true; finishLoading(); }}
        onError={() => { scriptReady.current = false; fail(); }}
      />
      <div className="booking-help">
        <p>Prefer to get in touch? Call or text {SALON.phoneDisplay}.</p>
        <div className="booking-help-actions">
          <a href={`tel:${SALON.phoneE164}`}>Call</a>
          <a href={`sms:${SALON.phoneE164}`}>Text</a>
          <a href={src} target="_blank" rel="noopener noreferrer">Open Acuity <span className="sr-only">in a new tab</span>↗</a>
        </div>
      </div>
      <div className="acuity-container" aria-busy={status === 'loading'}>
        <iframe
          ref={iframe}
          id="acuity-embed"
          src={src}
          title="Schedule an appointment with Virginia Page & Co. Hair Studio"
          width="100%"
          height="900"
          tabIndex={status === 'ready' ? 0 : -1}
          style={{ visibility: status === 'failed' ? 'hidden' : 'visible' }}
          className="acuity-iframe"
          onLoad={() => iframe.current?.contentWindow?.postMessage('acuity:init', ACUITY_APP_ORIGIN)}
          onError={fail}
        />
        {status === 'loading' && (
          <div id="acuity-loader" className="scheduler-status" role="status">
            <span className="loader" aria-hidden="true" />
            <p>Loading appointment times…</p>
          </div>
        )}
        {status === 'failed' && (
          <div className="scheduler-status scheduler-fallback" role="status">
            <h2 className="text-3xl">Having trouble loading appointments?</h2>
            <p>You can call or text us to book, or open the scheduler directly.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a className="btn btn-primary" href={`tel:${SALON.phoneE164}`}>Call {SALON.phoneDisplay}</a>
              <a className="btn btn-outline" href={`sms:${SALON.phoneE164}`}>Text us</a>
            </div>
            <a className="booking-direct-link" href={src} target="_blank" rel="noopener noreferrer">Open Acuity in a new tab ↗</a>
          </div>
        )}
      </div>
      <noscript><p>Online booking works best with JavaScript. Use the Call, Text, or Open Acuity links above if the scheduler is unavailable.</p></noscript>
    </>
  );
}
