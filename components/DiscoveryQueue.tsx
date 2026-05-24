"use client";

import { useState, useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getDiscoveryQueue, dismissDiscoveryItems, addToWatchlist, getWatchlistTags } from "@/lib/api";
import type { DiscoveryQueueResponse } from "@/lib/types";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

type DiscoveryAnime = DiscoveryQueueResponse["results"][number];

interface DiscoveryCardProps {
    anime: DiscoveryAnime;
    onDismiss: (malId: number) => void;
    onAddToWatchlist: (malId: number, status: string) => void;
    onSkip: () => void;
}

function DiscoveryCard({ anime, onDismiss, onAddToWatchlist, onSkip }: DiscoveryCardProps) {
    const [selectedStatus, setSelectedStatus] = useState("Watching");
    const { data: tagsData } = useQuery({ queryKey: ["watchlistTags"], queryFn: getWatchlistTags });

    const availableTags = useMemo(() => {
        return tagsData?.tags?.map(t => t.tag) || ["Watching", "Completed", "Deferred", "Avoiding", "BRR"];
    }, [tagsData]);

    const handleAddToWatchlist = () => {
        onAddToWatchlist(anime.mal_id, selectedStatus);
    };

    return (
        <div className="max-w-sm mx-auto bg-card border border-border rounded-xl shadow-lg overflow-hidden md:max-w-2xl animate-in fade-in">
            <div className="md:flex">
                <div className="md:shrink-0">
                    <img className="h-96 w-full object-cover md:h-full md:w-48" src={anime.image} alt={anime.title} />
                </div>
                <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-primary font-semibold">{anime.year} {anime.season}</div>
                    <a href={`/anime/${anime.mal_id}`} className="block mt-1 text-lg leading-tight font-medium text-foreground hover:underline">{anime.title_english || anime.title}</a>
                    <p className="mt-2 text-muted-foreground text-sm line-clamp-4">{anime.synopsis}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {anime.genres.slice(0, 4).map(genre => (
                            <span key={genre} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">{genre}</span>
                        ))}
                    </div>
                    <div className="mt-6 space-y-4">
                        <div className="flex gap-2">
                           <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                               <SelectTrigger className="w-full">
                                   <SelectValue placeholder="Select status" />
                               </SelectTrigger>
                               <SelectContent>
                                   {availableTags.map(status => (
                                       <SelectItem key={status} value={status}>{status}</SelectItem>
                                   ))}
                               </SelectContent>
                           </Select>
                            <Button onClick={handleAddToWatchlist}>Add to List</Button>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" onClick={() => onDismiss(anime.mal_id)} className="w-full">Dismiss</Button>
                            <Button variant="ghost" onClick={onSkip} className="w-full">Skip</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export function DiscoveryQueue() {
  const queryClient = useQueryClient();
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["discoveryQueue"],
    queryFn: () => getDiscoveryQueue(50),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const dismissMutation = useMutation({
    mutationFn: (malId: number) => dismissDiscoveryItems([malId]),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["discoveryQueue"] });
      nextItem();
    },
  });

  const addToWatchlistMutation = useMutation({
    mutationFn: ({ malId, status }: { malId: number, status: string }) => addToWatchlist([malId], status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["discoveryQueue"] });
      queryClient.invalidateQueries({ queryKey: ["watchlist"] });
      nextItem();
    },
  });

  const nextItem = () => {
    if (data && currentIndex < data.results.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      refetch();
      setCurrentIndex(0);
    }
  };

  const handleDismiss = (malId: number) => {
    dismissMutation.mutate(malId);
  };
  
  const handleAddToWatchlist = (malId: number, status: string) => {
    addToWatchlistMutation.mutate({ malId, status });
  };

  if (isLoading) return <div className="text-center p-8">Finding new anime for you...</div>;
  if (isError) return <div className="text-center p-8 text-destructive">Could not fetch recommendations. Please try again later.</div>;
  if (!data || data.results.length === 0) return <div className="text-center p-8">No new recommendations right now. Check back later!</div>;

  const currentAnime = data.results[currentIndex];

  if (!currentAnime) {
     return <div className="text-center p-8">You've seen everything for now! Check back later.</div>;
  }

  return (
    <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Discover New Anime</h1>
        <DiscoveryCard 
            anime={currentAnime}
            onDismiss={handleDismiss}
            onAddToWatchlist={handleAddToWatchlist}
            onSkip={nextItem}
        />
    </div>
  );
}
