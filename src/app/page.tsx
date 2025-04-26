"use client";

import { useEffect, useState } from "react";
import { tmdbAPI, type Movie,  type TVShow } from "@/lib/tsmd";
import HeroSection from "@/components/media/HeroSection";
import MediaSlider from "@/components/media/MediaSlider";
import { toast } from "sonner";

const Page = () => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [trendingTVShows, setTrendingTVShows] = useState<TVShow[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [heroMedia, setHeroMedia] = useState<Movie | null>(null);
  
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        
        // Fetch trending movies
        const trendingMoviesData = await tmdbAPI.getTrending("movie");
        setTrendingMovies(trendingMoviesData.results);
        
        // Randomly select a hero movie from trending
        if (trendingMoviesData.results.length > 0) {
          const randomIndex = Math.floor(Math.random() * Math.min(5, trendingMoviesData.results.length));
          setHeroMedia(trendingMoviesData.results[randomIndex]);
        }
        
        // Fetch trending TV shows
        const trendingTVData = await tmdbAPI.getTrending("tv");
        setTrendingTVShows(trendingTVData.results);
        
        // Fetch popular movies
        const popularMoviesData = await tmdbAPI.getPopular("movie");
        setPopularMovies(popularMoviesData.results);
        
        // Fetch upcoming movies
        const upcomingMoviesData = await tmdbAPI.getUpcoming();
        setUpcomingMovies(upcomingMoviesData.results);
        
        // Fetch top rated movies
        const topRatedMoviesData = await tmdbAPI.getTopRated("movie");
        setTopRatedMovies(topRatedMoviesData.results);
        
      } catch (error) {
        console.error("Error fetching home data:", error);
        toast.error("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchHomeData();
  }, [toast]);
  
  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-movie-primary border-t-transparent" />
      </div>
    );
  }
  
  return (
    <div>
      {heroMedia && <HeroSection media={heroMedia} mediaType="movie" />}
      
      <div className="pb-8 bg-gray-700">
        <MediaSlider title="Trending Movies" items={trendingMovies} mediaType="movie" />
        <MediaSlider title="Trending TV Shows" items={trendingTVShows} mediaType="tv" />
        <MediaSlider title="Popular Movies" items={popularMovies} mediaType="movie" />
        <MediaSlider title="Upcoming Movies" items={upcomingMovies} mediaType="movie" />
        <MediaSlider title="Top Rated Movies" items={topRatedMovies} mediaType="movie" />
      </div>
    </div>
  );
};

export default Page;
