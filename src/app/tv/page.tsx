"use client";

import { useState, useEffect } from "react";
import { tmdbAPI, type TVShow } from "@/lib/tsmd";
import MediaGrid from "@/components/media/MediaGrid";
import { toast } from "sonner";

const Page = () => {
  const [popularTVShows, setPopularTVShows] = useState<TVShow[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchTVShows = async () => {
      try {
        setLoading(true);
        const data = await tmdbAPI.getPopular("tv");
        setPopularTVShows(data.results);
      } catch (error) {
        console.error("Error fetching popular TV shows:", error);
        toast("Failed to fetch popular TV shows");
      } finally {
        setLoading(false);
      }
    };
    
    fetchTVShows();
  }, [toast]);
  
  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-movie-primary border-t-transparent" />
      </div>
    );
  }
  
  return (
    <div className="mx-auto px-8 md:px-16 lg:px-32 pt-32 bg-gray-700 py-8">
      <h1 className="mb-8 text-3xl text-white font-bold">Popular TV Shows</h1>
      <MediaGrid items={popularTVShows} mediaType="tv" />
    </div>
  );
};

export default Page;
