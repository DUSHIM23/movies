"use client"


import { useState, useEffect } from "react";
import { tmdbAPI,type Movie,type TVShow } from "@/lib/tsmd";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MediaGrid from "@/components/media/MediaGrid";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

const Page = () => {
  const searchParams = useSearchParams();
  const query = searchParams?.get("query") ?? "";
  
  const [movieResults, setMovieResults] = useState<Movie[]>([]);
  const [tvResults, setTvResults] = useState<TVShow[]>([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query.trim()) return;
      
      try {
        setLoading(true);
        
        // Search for movies
        const movieData = await tmdbAPI.search(query, "movie");
        setMovieResults(movieData.results);
        
        // Search for TV shows
        const tvData = await tmdbAPI.search(query, "tv");
        setTvResults(tvData.results);
      } catch (error) {
        console.error("Error fetching search results:", error);
        toast("Failed to fetch search results");
      } finally {
        setLoading(false);
      }
    };
    
    fetchSearchResults();
  }, [query, toast]);
  
  return (
    <div className=" bg-gray-700 mx-auto px-8 pt-32 md:px-16 lg:px-32 py-8">
      <h1 className="mb-2 text-3xl font-bold">Search Results</h1>
      <p className="mb-6 text-gray-400">
        {query ? `Results for "${query}"` : "Enter a search term to find movies and TV shows"}
      </p>
      
      {loading ? (
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-movie-primary border-t-transparent" />
        </div>
      ) : (
        <Tabs defaultValue="movies" className="w-full">
          <TabsList className="mb-6 glass">
            <TabsTrigger value="movies">
              Movies ({movieResults.length})
            </TabsTrigger>
            <TabsTrigger value="tv">
              TV Shows ({tvResults.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="movies">
            {movieResults.length > 0 ? (
              <MediaGrid items={movieResults} mediaType="movie" />
            ) : (
              <p className="text-gray-400">No movie results found.</p>
            )}
          </TabsContent>
          
          <TabsContent value="tv">
            {tvResults.length > 0 ? (
              <MediaGrid items={tvResults} mediaType="tv" />
            ) : (
              <p className="text-gray-400">No TV show results found.</p>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default Page;
