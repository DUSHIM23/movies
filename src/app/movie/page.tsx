"use client";
import { useState, useEffect } from "react";
import { tmdbAPI, type Movie } from "@/lib/tsmd";
import MediaGrid from "@/components/media/MediaGrid";
import { toast } from "sonner";

const Page = () => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const data = await tmdbAPI.getPopular("movie");
        setPopularMovies(data.results);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
        toast("Failed to fetch popular movies");
      } finally {
        setLoading(false);
      }
    };
    
    fetchMovies();
  }, [toast]);
  
  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-movie-primary border-t-transparent" />
      </div>
    );
  }
  
  return (
    <div className=" mx-auto mt-16 bg-gray-700 px-8 md:px-16 lg:px-32 py-8">
      <h1 className="mb-8 text-3xl font-bold">Popular Movies</h1>
      <MediaGrid items={popularMovies} mediaType="movie" />
    </div>
  );
};

export default Page;
