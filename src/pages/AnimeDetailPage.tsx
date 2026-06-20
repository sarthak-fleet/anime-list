import { useParams } from "@tanstack/react-router";
import AnimeDetailView from "@/components/AnimeDetailView";

export default function AnimeDetailPage() {
  const { malId } = useParams({ from: "/anime/$malId" });
  return <AnimeDetailView malId={Number(malId)} />;
}