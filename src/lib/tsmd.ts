
// TMDB API Configuration
const TMDB_API_KEY = "8824473926d37dbf91ff430be012d6c6"; // This is a demo key - typically you'd store this securely
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  original_title: string;
  popularity: number;
  vote_count: number;
  adult: boolean;
  original_language: string;
  video: boolean;
}

export interface TVShow {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  first_air_date: string;
  vote_average: number;
  genre_ids: number[];
  original_name: string;
  popularity: number;
  vote_count: number;
  origin_country: string[];
  original_language: string;
}

export interface MediaDetail extends Partial<Movie>, Partial<TVShow> {
  genres: { id: number; name: string }[];
  status: string;
  tagline?: string;
  homepage?: string;
  runtime?: number;
  number_of_seasons?: number;
  number_of_episodes?: number;
  created_by?: { id: number; name: string }[];
  production_companies: { id: number; name: string; logo_path: string | null }[];
}

export interface Genre {
  id: number;
  name: string;
}

type MediaType = "movie" | "tv";

// Helper to get image URL
export const getImageUrl = (path: string | null, size: string = "w500"): string => {
  if (!path) return "/placeholder.svg";
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

// Fetch wrapper with error handling
const fetchTMDB = async (endpoint: string, params: Record<string, string> = {}) => {
  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
  url.searchParams.append("api_key", TMDB_API_KEY);
  
  // Add additional params
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching from TMDB:", error);
    throw error;
  }
};

// API Methods
export const tmdbAPI = {
  // Get trending items
  getTrending: async (mediaType: MediaType = "movie", timeWindow: "day" | "week" = "week") => {
    return fetchTMDB(`/trending/${mediaType}/${timeWindow}`);
  },
  
  // Get popular items
  getPopular: async (mediaType: MediaType = "movie") => {
    return fetchTMDB(`/${mediaType}/popular`);
  },
  
  // Get upcoming movies
  getUpcoming: async () => {
    return fetchTMDB("/movie/upcoming");
  },
  
  // Get top rated items
  getTopRated: async (mediaType: MediaType = "movie") => {
    return fetchTMDB(`/${mediaType}/top_rated`);
  },
  
  // Get details of a specific movie or TV show
  getDetails: async (id: number, mediaType: MediaType = "movie") => {
    return fetchTMDB(`/${mediaType}/${id}`);
  },
  
  // Search for movies or TV shows
  search: async (query: string, mediaType: MediaType = "movie") => {
    return fetchTMDB(`/search/${mediaType}`, { query });
  },
  
  // Get genres list
  getGenres: async (mediaType: MediaType = "movie") => {
    return fetchTMDB(`/genre/${mediaType}/list`);
  },
  
  // Discover movies or TV shows by genre
  discoverByGenre: async (genreId: number, mediaType: MediaType = "movie") => {
    return fetchTMDB(`/discover/${mediaType}`, { with_genres: genreId.toString() });
  }
};
