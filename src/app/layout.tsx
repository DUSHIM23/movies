import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { WatchlistProvider } from "@/context/WatchlistContext";
import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { Suspense } from "react";


export const metadata: Metadata = {
  title: "Cinema",
  description: "Make by movie DUSHIME Aime for movie lovers",
  icons: [{ rel: "icon", url: "/Logo.png" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} bg-gray-700`}>
      <body>
        <Suspense>

        <WatchlistProvider>
          <Toaster
            position="top-center"/>
        <NavBar/>
        {children}
        <Footer/>
        </WatchlistProvider>
            </Suspense>
        </body>
    </html>
  );
}
