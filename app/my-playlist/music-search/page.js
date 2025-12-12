"use client";

import Image from "next/image";
import { useState } from "react";
import MusicSearch from "../../components/MusicSearch";
import { useUserAuth } from "../../_utils/auth-context";
import Link from "next/link";

export default function MyPlaylistPage() {
  const { user } = useUserAuth();
  const [input, setInput] = useState("");

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-6">
        <Link href="/my-playlist">
          <Image
          src="/logo.png"
          width={52}
          height={52}
          alt="Flame logo"
          className="rounded-2xl shadow-sm"
          />
        </Link>

        <p className="text-xs uppercase text-amber-500 font-semibold mt-3">
          F i r e b a s e
        </p>

        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2">
          You must be signed in.
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex items-center px-5 lg:px-10 py-4 gap-3">
        <Image
          src="/logo.png"
          width={52}
          height={52}
          alt="Flame logo"
          className="rounded-2xl"
        />
        <div className="leading-tight">
          <p className="text-xs uppercase text-amber-500 font-semibold">
            F i r e b a s e
          </p>
          <h1 className="text-xl font-extrabold text-slate-900">Playlist</h1>
        </div>
      </div>

      <main className="flex-1 flex flex-col items-center text-center px-6 py-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-8">
          Search Music
        </h1>

        <input
          type="text"
          placeholder="Search songs or artists..."
          className="text-slate-900 bg-white border border-slate-300 p-3 rounded-full w-80 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          onChange={(e) => setInput(e.target.value)}
        />

        <div className="mt-10 w-full max-w-2xl">
          <MusicSearch input={input} />
        </div>
      </main>

      <footer className="border-t border-amber-100 py-4 text-center text-xs text-slate-500">
        <span className="font-semibold text-amber-600">Firebase</span> Playlist
      </footer>
    </div>
  );
}