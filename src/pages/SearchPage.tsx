import { Suspense } from "react";
import FilterBuilder from "@/components/FilterBuilder";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ResultsGridSkeleton } from "@/components/ResultsGrid";
import { DEFAULT_ANIME_SEARCH_KEY } from "@/lib/animeSearchDefaults";
import type { SearchResponse } from "@/lib/types";
import searchSeed from "@/src/data/search-seed.json";

const initialSearchData = searchSeed as SearchResponse;

export default function SearchPage() {
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