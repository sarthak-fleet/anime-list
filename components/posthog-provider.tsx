'use client';

// posthog-js + PostHogProvider intentionally NOT imported at module top.
// The React wrapper was forcing posthog-js (~50 KB) into the LCP-critical
// chunk; no descendant uses `usePostHog`, and the actual emit() path lazy-
// loads posthog-js where it's needed. Dropping the wrapper shaves ~50 KB
// from the main bundle (psi-swarm coverage flagged the waste).
import { useEffect } from 'react';

import { installBrowserMonitoring } from '@/lib/foundry-monitoring';

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    return installBrowserMonitoring();
  }, []);

  return <>{children}</>;
}
