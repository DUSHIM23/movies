"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import {  getImageUrl, type Movie, type TVShow } from "@/lib/tsmd";
import { useWatchlist, type WatchlistItem } from "@/context/WatchlistContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface MediaCardProps {
  media: Movie | TVShow;
  mediaType: "movie" | "tv";
  className?: string;
}

const MediaCard = ({ media, mediaType, className }: MediaCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  
  // Determine if it's a movie or TV show
  const isMovie = mediaType === "movie";
  const title = isMovie ? (media as Movie).title : (media as TVShow).name;
  const releaseDate = isMovie 
    ? (media as Movie).release_date 
    : (media as TVShow).first_air_date;
  
  // Format release date
  const formattedDate = releaseDate 
    ? new Date(releaseDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      }) 
    : "Unknown";
  
  const inWatchlist = isInWatchlist(media.id, mediaType);

  const handleWatchlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (inWatchlist) {
      removeFromWatchlist(media.id, mediaType);
    } else {
      addToWatchlist({
        ...media,
        type: mediaType,
      } as WatchlistItem);
    }
  };

  return (
    <Link
      href={`/${mediaType}/${media.id}`}
      className={cn(
        "block animate-fade-in glass-card overflow-hidden relative",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-[2/3] relative">
        <img
          src={getImageUrl(media.poster_path)}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 ease-in-out"
          style={{
            transform: isHovered ? "scale(1.05)" : "scale(1)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300" 
          style={{ opacity: isHovered ? 1 : 0 }}
        />
        
        {/* Watchlist button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/50 hover:bg-black/70 text-white"
          onClick={handleWatchlistToggle}
        >
          <Heart
            className={cn(
              "h-4 w-4 transition-colors",
              inWatchlist ? "fill-movie-primary text-movie-primary" : "fill-transparent"
            )}
          />
        </Button>
      </div>
      
      <div className="p-3">
        <h3 className="text-sm font-medium line-clamp-1 text-white">{title}</h3>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-xs text-gray-400">{formattedDate}</span>
          {media.vote_average > 0 && (
            <span className="inline-flex items-center rounded-full bg-movie-primary/20 px-2 py-0.5 text-xs font-medium text-movie-primary">
              {media.vote_average.toFixed(1)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default MediaCard;
