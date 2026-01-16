'use client';

import Script from 'next/script';

export function Analytics() {
  return (
    <Script
      src="https://unami-analytics.fly.dev/script.js"
      data-website-id="49d46a6e-6307-4973-93d1-d1b80537f84e"
      strategy="afterInteractive"
    />
  );
}