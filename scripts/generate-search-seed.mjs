#!/usr/bin/env node
/**
 * Build-time: derive a tiny default-search seed from cleaned_anime_data.json.
 * Same logic as the removed lib/animeInitialSearch.ts — keeps /search instant
 * without bundling the 17MB catalog into the client.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const catalogPath = resolve(root, "cleaned_anime_data.json");
const outPath = resolve(root, "src/data/search-seed.json");

const DEFAULT_ANIME_MIN_MEMBERS = 100_000;
const DEFAULT_ANIME_PAGE_SIZE = 40;

function truncateSynopsis(text, max = 180) {
  if (!text) return "";
  return text.length > max ? `${text.slice(0, max).trim()}...` : text;
}

function isDefaultCatalogItem(anime) {
  return (
    typeof anime.score === "number" &&
    typeof anime.members === "number" &&
    typeof anime.favorites === "number" &&
    typeof anime.year === "number" &&
    anime.members >= DEFAULT_ANIME_MIN_MEMBERS
  );
}

function toSummary(anime) {
  const score = anime.score ?? 0;
  return {
    id: anime.mal_id,
    score,
    points: score,
    name: anime.title,
    title_english: anime.title_english,
    link: anime.url,
    synopsis: truncateSynopsis(anime.synopsis),
    members: anime.members ?? 0,
    favorites: anime.favorites ?? 0,
    year: anime.year ?? 0,
    status: anime.status ?? "",
    genres: Object.keys(anime.genres ?? {}),
    themes: Object.keys(anime.themes ?? {}),
    type: anime.type ?? "",
    image: anime.image,
  };
}

const catalog = JSON.parse(readFileSync(catalogPath, "utf8"));
const filtered = catalog.filter(isDefaultCatalogItem);
const firstPage = [...filtered]
  .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
  .slice(0, DEFAULT_ANIME_PAGE_SIZE)
  .map(toSummary);

const seed = {
  totalFiltered: filtered.length,
  filteredList: firstPage,
};

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, `${JSON.stringify(seed)}\n`);
const kb = (Buffer.byteLength(JSON.stringify(seed)) / 1024).toFixed(1);
console.log(`[search-seed] wrote ${outPath} (${kb} KB, ${firstPage.length} items, totalFiltered=${filtered.length})`);