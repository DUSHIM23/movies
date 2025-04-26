"use client";

import { useState, useEffect } from "react";
import { tmdbAPI, type MediaDetail, getImageUrl,type Movie,type TVShow } from "@/lib/tsmd";
import { Heart } from "lucide-react";
import { useWatchlist, type WatchlistItem } from "@/context/WatchlistContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { toast } from "sonner";

const Page = () => {
  const { id, type = "movie" } = useParams<{ id: string; type: "movie" | "tv" }>();
  const [media, setMedia] = useState<MediaDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  
  const mediaId = parseInt(id || "0");
  const mediaType = type === "tv" ? "tv" : "movie";
  const inWatchlist = isInWatchlist(mediaId, mediaType);
  
  useEffect(() => {
    const fetchMediaDetail = async () => {
      try {
        setLoading(true);
        const data = await tmdbAPI.getDetails(mediaId, mediaType);
        setMedia(data);
      } catch (error) {
        console.error(`Error fetching ${mediaType} details:`, error);
        toast("error");
      } finally {
        setLoading(false);
      }
    };
    
    if (mediaId) {
      fetchMediaDetail();
    }
  }, [mediaId, mediaType]);
  
  const handleWatchlistToggle = () => {
    if (!media) return;
    
    if (inWatchlist) {
      removeFromWatchlist(mediaId, mediaType);
      toast("`Removed from watchlist`");
    } else {
      if (mediaType === "movie") {
        const movieData: Movie & { type: "movie" } = {
          id: media.id!,
          title: media.title || "",
          poster_path: media.poster_path ?? null,
          backdrop_path: media.backdrop_path ?? null,
          overview: media.overview || "",
          release_date: media.release_date || "",
          vote_average: media.vote_average || 0,
          genre_ids: media.genres?.map(g => g.id) || [],
          original_title: media.original_title || "",
          popularity: media.popularity || 0,
          vote_count: media.vote_count || 0,
          adult: media.adult || false,
          original_language: media.original_language || "",
          video: media.video || false,
          type: "movie"
        };
        addToWatchlist(movieData);
      } else {
        const tvData: TVShow & { type: "tv" } = {
          id: media.id!,
          name: media.name || "",
          poster_path: media.poster_path ?? null,
          backdrop_path: media.backdrop_path ?? null,
          overview: media.overview || "",
          first_air_date: media.first_air_date || "",
          vote_average: media.vote_average || 0,
          genre_ids: media.genres?.map(g => g.id) || [],
          original_name: media.original_name || "",
          popularity: media.popularity || 0,
          vote_count: media.vote_count || 0,
          origin_country: media.origin_country || [],
          original_language: media.original_language || "",
          type: "tv"
        };
        addToWatchlist(tvData);
      }

      toast(`Added to watchlist`);
    }
  };
  
  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-transparent" />
      </div>
    );
  }
  
  if (!media) {
    return (
      <div className="container mx-auto mt-16 px-4 text-center">
        <h1 className="text-2xl font-bold">Content not found</h1>
        <p className="mt-4 text-gray-400">
          The {mediaType} you are looking for does not exist or has been removed.
        </p>
      </div>
    );
  }

  const isMovie = mediaType === "movie";
  const title = isMovie ? media.title : media.name;
  const releaseDate = isMovie ? media.release_date : media.first_air_date;
  
  const formatRuntime = (minutes?: number) => {
    if (!minutes) return "Unknown";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };
  
  return (
    <section className="bg-gray-700 min-h-screen">
      <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${getImageUrl(media.backdrop_path ?? null, "original")})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-700 gray-200/70 to-transparent" />
      </div>
      
      <div className="container mx-auto px-4">
        <div className="relative z-10 -mt-48 flex flex-col md:flex-row md:gap-8">
          <div className="w-48 flex-shrink-0 self-center md:self-start">
            <img
              src={getImageUrl(media.poster_path ?? null, "w500")}
              alt={title}
              className="glass rounded-lg shadow-lg"
            />
          </div>
          
          <div className="mt-6 md:mt-0 flex-grow">
            <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl animate-fade-in">
              {title}
            </h1>
            
            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-300">
              {releaseDate && (
                <span>{new Date(releaseDate).getFullYear()}</span>
              )}
              {isMovie && media.runtime && (
                <span>{formatRuntime(media.runtime)}</span>
              )}
              {!isMovie && (
                <span>
                  {media.number_of_seasons} {media.number_of_seasons === 1 ? "Season" : "Seasons"}
                </span>
              )}
              {(media.vote_average ?? 0) > 0 && (
                <span className="inline-flex items-center rounded-full bg-gray-200/20 px-2 py-1 text-sm font-medium text-gray-200">
                  {(media.vote_average??0).toFixed(1)}
                </span>
              )}
            </div>
            
            {media.genres && (
              <div className="mt-4 flex flex-wrap gap-2">
                {media.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="glass rounded-full px-3 py-1 text-xs"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}
            
            {media.tagline && (
              <p className="mt-4 italic text-gray-400">{media.tagline}</p>
            )}
            
            <div className="mt-4">
              <h3 className="text-lg font-medium text-white">Overview</h3>
              <p className="mt-2 text-gray-300">{media.overview}</p>
            </div>
            
            <div className="mt-6 flex flex-wrap gap-4">
              <Button
                variant="outline"
                className={cn(
                  "glass-button",
                  inWatchlist && "bg-gray-200/30"
                )}
                onClick={handleWatchlistToggle}
              >
                <Heart
                  className={cn(
                    "mr-2 h-4 w-4",
                    inWatchlist ? "fill-gray-200 text-gray-200" : ""
                  )}
                />
                {inWatchlist ? "In Watchlist" : "Add to Watchlist"}
              </Button>
            </div>
            
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {isMovie && (
                <>
                  <div>
                    <h3 className="text-sm font-medium text-white">Status</h3>
                    <p className="text-sm text-gray-400">{media.status}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white">Original Title</h3>
                    <p className="text-sm text-gray-400">{media.original_title}</p>
                  </div>
                </>
              )}
              {!isMovie && (
                <>
                  <div>
                    <h3 className="text-sm font-medium text-white">First Air Date</h3>
                    <p className="text-sm text-gray-400">
                      {media.first_air_date
                        ? new Date(media.first_air_date).toLocaleDateString()
                        : "Unknown"}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white">Episodes</h3>
                    <p className="text-sm text-gray-400">{media.number_of_episodes}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
