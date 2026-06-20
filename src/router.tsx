import {
  createRouter,
  createRootRoute,
  createRoute,
  notFound,
} from "@tanstack/react-router";
import RootLayout from "./RootLayout";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import DiscoverPage from "./pages/DiscoverPage";
import AnimeDetailPage from "./pages/AnimeDetailPage";
import MangaDetailPage from "./pages/MangaDetailPage";
import GenreRandomPage from "./pages/GenreRandomPage";
import RandomPage from "./pages/RandomPage";
import SchedulePage from "./pages/SchedulePage";
import WatchlistPage from "./pages/WatchlistPage";
import StatsPage from "./pages/StatsPage";
import MangaSearchPage from "./pages/MangaSearchPage";
import MangaStatsPage from "./pages/MangaStatsPage";
import MangaWatchlistPage from "./pages/MangaWatchlistPage";
import QuizPage from "./pages/QuizPage";
import ChangelogPage from "./pages/ChangelogPage";
import AboutPage from "./pages/AboutPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";

function validateMalId(malId: string) {
  const numericMalId = Number(malId);
  if (!Number.isInteger(numericMalId) || numericMalId <= 0) {
    throw notFound();
  }
}

const rootRoute = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFoundPage,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const searchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/search",
  component: SearchPage,
});

const discoverRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/discover",
  component: DiscoverPage,
});

const animeDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/anime/$malId",
  beforeLoad: ({ params }) => validateMalId(params.malId),
  component: AnimeDetailPage,
});

const mangaDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/manga/$malId",
  beforeLoad: ({ params }) => validateMalId(params.malId),
  component: MangaDetailPage,
});

const genreRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/genre/$genre",
  component: GenreRandomPage,
});

const randomRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/random",
  component: RandomPage,
});

const scheduleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/schedule",
  component: SchedulePage,
});

const watchlistRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/watchlist",
  component: WatchlistPage,
});

const statsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/stats",
  component: StatsPage,
});

const mangaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/manga",
  component: MangaSearchPage,
});

const mangaStatsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/manga/stats",
  component: MangaStatsPage,
});

const mangaWatchlistRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/manga/watchlist",
  component: MangaWatchlistPage,
});

const quizRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/quiz",
  component: QuizPage,
});

const changelogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/changelog",
  component: ChangelogPage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});

const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/privacy",
  component: PrivacyPage,
});

const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/terms",
  component: TermsPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  searchRoute,
  discoverRoute,
  animeDetailRoute,
  genreRoute,
  randomRoute,
  scheduleRoute,
  watchlistRoute,
  statsRoute,
  mangaStatsRoute,
  mangaWatchlistRoute,
  mangaDetailRoute,
  mangaRoute,
  quizRoute,
  changelogRoute,
  aboutRoute,
  privacyRoute,
  termsRoute,
]);

export const router = createRouter({
  routeTree,
  defaultPreload: "intent",
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}