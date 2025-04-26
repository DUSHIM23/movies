
import { type Movie, type TVShow } from "@/lib/tsmd";
import MediaCard from "./MediaCard";

interface MediaGridProps {
  items: (Movie | TVShow)[];
  mediaType: "movie" | "tv";
  className?: string;
}

const MediaGrid = ({ items, mediaType, className }: MediaGridProps) => {
  if (!items || items.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center">
        <p className="text-gray-400">No items found.</p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 ${className || ""}`}>
      {items.map((item) => (
        <MediaCard 
          key={item.id} 
          media={item} 
          mediaType={mediaType} 
        />
      ))}
    </div>
  );
};

export default MediaGrid;
