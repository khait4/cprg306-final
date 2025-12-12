"use client";
import Image from "next/image";
import Link from "next/link";
import { useUserAuth } from "../../_utils/auth-context";
import PlaylistList from "./playlist-list";


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
                Playlists
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

        {/* Main */}

        <main>
        <section className="flex-1 flex flex-col">
          <div className="self-stretch rounded-3xl border border-amber-100 bg-amber-50/40 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Playlists
            </h2>

            <PlaylistList />

          </div>
        </section>
        </main>

      {/* Footer */}
      <footer className="border-t border-amber-100 py-4 text-center text-xs text-slate-500">
        <span className="font-semibold text-amber-600">Firebase</span> Playlist
      </footer>
    </div>
  );
}
