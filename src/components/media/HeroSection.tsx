"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { getImageUrl, type Movie, type TVShow } from "@/lib/tsmd";
import Link from "next/link";

interface HeroSectionProps {
  media: Movie | TVShow;
  mediaType: "movie" | "tv";
}

const HeroSection = ({ media, mediaType }: HeroSectionProps) => {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    setLoaded(true);
  }, []);
  
  if (!media) return null;
  
  const isMovie = mediaType === "movie";
  const title = isMovie ? (media as Movie).title : (media as TVShow).name;
  const releaseDate = isMovie 
    ? (media as Movie).release_date 
    : (media as TVShow).first_air_date;
  
  // Format release date
  const year = releaseDate ? new Date(releaseDate).getFullYear() : "";
  
  // Backdrop path
  const backdropUrl = getImageUrl(media.backdrop_path, "original");
  
  return (
    <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
      {/* Backdrop image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700"
        style={{ 
          backgroundImage: `url(${backdropUrl})`,
          opacity: loaded ? 1 : 0 
        }}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-800 via-gray-800/50 to-transparent" />
      
      {/* Content */}
      <div className="container relative mx-auto h-full px-4">
        <div className="flex h-full flex-col justify-end pb-16">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              {title}
            </h1>
            {year && (
              <div className="mt-2 text-lg text-gray-300">{year}</div>
            )}
            <p className="mt-4 line-clamp-3 text-gray-200">
              {media.overview}
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Button asChild className="glass-button">
                <Link href={`/${mediaType}/${media.id}`}>
                  <Info className="mr-2 h-4 w-4" />
                  More Info
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
