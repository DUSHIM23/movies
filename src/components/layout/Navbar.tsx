"use client"
import { Search, Film, Heart, User } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Link from "next/link";

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 text-white z-50  px-4 py-3">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Film className="h-8 w-8 text-movie-primary" />
          <span className="text-xl font-bold text-gradient">Cinema</span>
        </Link>

        {/* Search - Hidden on mobile */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
          <form onSubmit={handleSearch} className="w-full">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search movies & TV shows..."
                className="w-full bg-white/10 border-white/20 focus:border-movie-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="submit" 
                size="icon" 
                variant="ghost" 
                className="absolute right-0 top-0"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-4">
          <Link
            href="/movie"
            className="text-sm font-medium hover:text-movie-primary transition-colors hidden sm:block"
          >
            Movies
          </Link>
          <Link
            href="/tv"
            className="text-sm font-medium hover:text-movie-primary transition-colors hidden sm:block"
          >
            TV Shows
          </Link>
          <Link
            href="/watchlist"
            className="text-movie-primary hover:text-movie-light transition-colors"
          >
            <Heart className="h-5 w-5" />
          </Link>
        </div>
      </div>
      
      {/* Mobile Search Bar */}
      <div className="md:hidden mt-2">
        <form onSubmit={handleSearch} className="w-full">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search..."
              className="w-full bg-white/10 border-white/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button 
              type="submit" 
              size="icon" 
              variant="ghost" 
              className="absolute right-0 top-0"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </nav>
  );
};

export default NavBar;
