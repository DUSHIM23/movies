"use client";

import { useState } from "react";
import { useWatchlist } from "@/context/WatchlistContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MediaGrid from "@/components/media/MediaGrid";
import {type Movie,type TVShow } from "@/lib/tsmd";

const WatchlistPage = () => {
  const { watchlist } = useWatchlist();
  const [activeTab, setActiveTab] = useState<"all" | "movies" | "tv">("all");
  
  // Filter watchlist by type
  const movieWatchlist = watchlist.filter((item) => item.type === "movie") as (Movie & { type: "movie" })[];
  const tvWatchlist = watchlist.filter((item) => item.type === "tv") as (TVShow & { type: "tv" })[];
  
  // Determine which items to display based on the active tab
  const displayedItems = 
    activeTab === "all" ? watchlist : 
    activeTab === "movies" ? movieWatchlist : 
    tvWatchlist;
  
  return (
    <div className="px-8 mx-auto md:px-32 lg:px-32 text-white bg-gray-700 pt-32 py-8">
      <h1 className="mb-6 text-3xl font-bold">My Watchlist</h1>
      
      {watchlist.length === 0 ? (
        <div className="glass rounded-lg p-8 text-white text-center">
          <h2 className="mb-2 text-xl font-semibold">Your watchlist is empty</h2>
          <p className="text-gray-400">
            Start browsing movies and TV shows and add them to your watchlist.
          </p>
        </div>
      ) : (
        <Tabs defaultValue="all" className="" value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
          <TabsList className="mb-6 bg-gray-600 p-2 gap-4 size-fit">
            <TabsTrigger value="all">
              All ({watchlist.length})
            </TabsTrigger>
            <TabsTrigger value="movies">
              Movies ({movieWatchlist.length})
            </TabsTrigger>
            <TabsTrigger value="tv">
              TV Shows ({tvWatchlist.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            {displayedItems.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {displayedItems.map((item) => (
                  <MediaCard 
                    key={`${item.type}-${item.id}`} 
                    media={item} 
                    mediaType={item.type} 
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No items in this category.</p>
            )}
          </TabsContent>
          
          <TabsContent value="movies">
            {movieWatchlist.length > 0 ? (
              <MediaGrid items={movieWatchlist} mediaType="movie" />
            ) : (
              <p className="text-gray-400">No movies in your watchlist.</p>
            )}
          </TabsContent>
          
          <TabsContent value="tv">
            {tvWatchlist.length > 0 ? (
              <MediaGrid items={tvWatchlist} mediaType="tv" />
            ) : (
              <p className="text-gray-400">No TV shows in your watchlist.</p>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

// Import MediaCard component directly here since we need to use it with a custom list
import MediaCard from "@/components/media/MediaCard";

export default WatchlistPage;
