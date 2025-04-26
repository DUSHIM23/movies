"use client";

import React, { createContext, useState, useContext, useCallback, useEffect } from "react";
import { type Movie, type TVShow } from "@/lib/tsmd";

// Define the type for watchlist items
export type WatchlistItem = 
  | (Movie & { type: "movie" }) 
  | (TVShow & { type: "tv" });

type WatchlistContextType = {
  watchlist: WatchlistItem[];
  addToWatchlist: (item: WatchlistItem) => void;
  removeFromWatchlist: (id: number, type: "movie" | "tv") => void;
  isInWatchlist: (id: number, type: "movie" | "tv") => boolean;
};

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export const WatchlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);

  // Load watchlist from localStorage on initial render
  useEffect(() => {
    const savedWatchlist = localStorage.getItem("watchlist");
    if (savedWatchlist) {
      try {
        setWatchlist(JSON.parse(savedWatchlist));
      } catch (error) {
        console.error("Error parsing watchlist from localStorage:", error);
      }
    }
  }, []);

  // Save watchlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = useCallback((item: WatchlistItem) => {
    setWatchlist((prevList) => {
      // Check if the item is already in the watchlist
      if (prevList.some((i) => i.id === item.id && i.type === item.type)) {
        return prevList;
      }
      return [...prevList, item];
    });
  }, []);

  const removeFromWatchlist = useCallback((id: number, type: "movie" | "tv") => {
    setWatchlist((prevList) => 
      prevList.filter((item) => !(item.id === id && item.type === type))
    );
  }, []);

  const isInWatchlist = useCallback((id: number, type: "movie" | "tv") => {
    return watchlist.some((item) => item.id === id && item.type === type);
  }, [watchlist]);

  return (
    <WatchlistContext.Provider
      value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (context === undefined) {
    throw new Error("useWatchlist must be used within a WatchlistProvider");
  }
  return context;
};
