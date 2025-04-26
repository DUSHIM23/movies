
import { Film } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="pt-32 py-8 bg-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center md:flex-row md:justify-between">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="flex items-center gap-2">
              <Film className="h-6 w-6 text-primary " />
              <span className="font-bold text-gradient">Cinema</span>
            </Link>
            <p className="mt-2 text-xs text-gray-400">
              Discover the world of cinema through our .
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div className="text-center md:text-left">
              <h3 className="text-sm font-semibold text-white">Discover</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link href="/movies" className="text-xs text-gray-400 hover:text-primary ">
                    Movies
                  </Link>
                </li>
                <li>
                  <Link href="/tv" className="text-xs text-gray-400 hover:text-primary ">
                    TV Shows
                  </Link>
                </li>
                <li>
                  <Link href="/trending" className="text-xs text-gray-400 hover:text-primary ">
                    Trending
                  </Link>
                </li>
              </ul>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-sm font-semibold text-white">My Account</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link href="/watchlist" className="text-xs text-gray-400 hover:text-primary ">
                    Watchlist
                  </Link>
                </li>
              </ul>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-sm font-semibold text-white">About</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <a href="https://www.themoviedb.org/" className="text-xs text-gray-400 hover:text-primary " target="_blank" rel="noreferrer">
                    TMDB API
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-4 text-center">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Cinema. All rights reserved.
            Data provided by <a href="https://www.themoviedb.org/" className="text-primary  hover:underline" target="_blank" rel="noreferrer">TMDB</a>.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
