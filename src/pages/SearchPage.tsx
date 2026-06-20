import { Suspense } from "react";
import FilterBuilder from "@/components/FilterBuilder";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ResultsGridSkeleton } from "@/components/ResultsGrid";
import { DEFAULT_ANIME_SEARCH_KEY } from "@/lib/animeSearchDefaults";
import { getInitialAnimeSearch } from "@/lib/animeInitialSearch";

export default function SearchPage() {
  const initialSearchData = getInitialAnimeSearch();

  return (
    <Suspense fallback={<ResultsGridSkeleton />}>
      <ErrorBoundary>
        <FilterBuilder
          initialSearchData={initialSearchData}
          initialSearchKey={DEFAULT_ANIME_SEARCH_KEY}
        />
      </ErrorBoundary>
    </Suspense>
  );
}