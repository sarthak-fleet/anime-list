import { Suspense } from "react";
import FilterBuilder from "@/components/FilterBuilder";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ResultsGridSkeleton } from "@/components/ResultsGrid";
import { DEFAULT_ANIME_SEARCH_KEY } from "@/lib/animeSearchDefaults";

export default function SearchPage() {
  return (
    <Suspense fallback={<ResultsGridSkeleton />}>
      <ErrorBoundary>
        <FilterBuilder initialSearchKey={DEFAULT_ANIME_SEARCH_KEY} />
      </ErrorBoundary>
    </Suspense>
  );
}