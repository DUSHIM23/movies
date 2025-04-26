"use client";
import { useRef } from "react";
import { type Movie,type TVShow } from "@/lib/tsmd";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MediaCard from "./MediaCard";

interface MediaSliderProps {
  title: string;
  items: (Movie | TVShow)[];
  mediaType: "movie" | "tv";
}

const MediaSlider = ({ title, items, mediaType }: MediaSliderProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const { current } = sliderRef;
      const scrollAmount = direction === "left" 
        ? -current.offsetWidth * 0.75 
        : current.offsetWidth * 0.75;
      
      current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className="py-6">
      <div className="mx-auto px-8 md:px-16 lg:px-32">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <div className="flex gap-2">
            <Button 
              onClick={() => scroll("left")} 
              variant="outline" 
              size="icon" 
              className="glass-button h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              onClick={() => scroll("right")} 
              variant="outline" 
              size="icon" 
              className=" h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div 
          ref={sliderRef} 
          className="flex w-full gap-4 overflow-x-auto scrollbar-none pb-4 snap-x snap-mandatory"
        >
          {items.map((item) => (
            <div key={item.id} className="min-w-[180px] max-w-[180px] snap-start">
              <MediaCard media={item} mediaType={mediaType} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MediaSlider;
