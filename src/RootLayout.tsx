import { Outlet } from "@tanstack/react-router";
import { NuqsAdapter } from "nuqs/adapters/tanstack-router";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/lib/auth";
import { QueryProvider } from "@/lib/query-provider";
import FeedbackWidgetWrapper from "@/components/FeedbackWidgetWrapper";
import { AnalyticsProvider } from "@/components/posthog-provider";

export default function RootLayout() {
  return (
    <AnalyticsProvider>
      <NuqsAdapter>
        <QueryProvider>
          <AuthProvider>
            <Navigation />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-24 pt-8">
              <Outlet />
            </main>
            <Footer />
            <FeedbackWidgetWrapper />
          </AuthProvider>
        </QueryProvider>
      </NuqsAdapter>
    </AnalyticsProvider>
  );
}