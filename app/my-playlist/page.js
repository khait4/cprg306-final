"use client";
import Image from "next/image";
import Link from "next/link";
import { useUserAuth } from "../_utils/auth-context";
import PlaylistPreview from "./playlist-preview";

export default function Page() {
  const { firebaseSignOut } = useUserAuth();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Bar / Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-amber-100">
        <div className="flex items-center justify-between px-5 lg:px-10 py-3">
          
          {/* Logo + Brand */}
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              width={52}
              height={52}
              alt="Flame logo"
              className="rounded-2xl shadow-sm"
            />
            <div className="leading-tight">
              <p className="text-xs uppercase tracking-[0.25em] text-amber-500 font-semibold">
                Firebase
              </p>
              <h1 className="text-xl font-extrabold text-slate-900">
                Playlist
              </h1>
            </div>
          </div>  

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link
              href="/my-playlist/music-search"
              className="text-slate-600 hover:text-amber-600 transition"
            >
            Music Search
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
             onClick={async () => {
             try {
                await firebaseSignOut();  // wait for Firebase to sign out
                window.location.href = "/"; // redirect to or login page
            } catch (err) {
                console.error("Sign-out failed:", err);
            }
        }}
        className="hidden sm:inline-flex items-center justify-center rounded-full border border-amber-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:border-amber-400 hover:bg-amber-50 transition"
    >
        Sign Out
    </button>

            <Link
              href="/my-playlist/create-playlist"
              className="inline-flex items-center justify-center rounded-full bg-amber-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-md hover:bg-amber-700 transition"
            >
              + New playlist
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row px-6 lg:px-16 py-10 gap-10">
        
        {/* Left Hero */}
        <section className="flex-1 flex flex-col justify-center space-y-6">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900">
            Build playlists in seconds,
            <span className="text-amber-600"> powered by Firebase</span>.
          </h2>

          <div className="flex flex-wrap gap-3 mt-2">
            <Link
              href="/my-playlist/create-playlist"
              className="inline-flex items-center justify-center rounded-full bg-amber-600 px-6 py-3 text-sm md:text-base font-semibold text-white shadow-md hover:bg-amber-700 transition"
            >
              + Create a new playlist
            </Link>

            <Link
              href="/my-playlist/playlists"
              className="inline-flex items-center justify-center rounded-full border border-amber-600 px-5 py-3 text-sm md:text-base font-semibold text-amber-600 hover:bg-amber-50 transition"
            >
              View my playlists
            </Link>
          </div>
        </section>

        <PlaylistPreview />
      </main>

      {/* Footer */}
      <footer className="border-t border-amber-100 py-4 text-center text-xs text-slate-500">
        <span className="font-semibold text-amber-600">Firebase</span> Playlist
      </footer>
    </div>
  );
}
