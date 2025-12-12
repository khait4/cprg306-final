"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useUserAuth } from "../../_utils/auth-context";



export default function Page() {

    const [error, setError] = useState("");

  return (

    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-amber-100">
        <div className="flex items-center justify-between px-5 lg:px-10 py-3">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              width={44}
              height={44}
              alt="Logo"
              className="rounded-2xl shadow-sm"
            />
            <div className="leading-tight">
              <p className="text-xs uppercase tracking-[0.25em] text-amber-500 font-semibold">
                Firebase
              </p>
              <h1 className="text-xl font-extrabold text-slate-900">
                Create Playlist
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/my-playlist/playlists"
              className="inline-flex items-center justify-center rounded-full border border-amber-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:border-amber-400 hover:bg-amber-50 transition"
            >
              Back to Playlists
            </Link>
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="px-6 lg:px-16 py-10 max-w-5xl mx-auto">

        {/* Info */}
        <div className="mb-6 rounded-3xl border border-amber-100 bg-amber-50/40 p-6">
          <p className="text-sm text-slate-700">
            Create a playlist by giving it a name and adding tracks.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/*Playlist details */}
          <div className="lg:col-span-1 rounded-3xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">
              Playlist details
            </h2>

            <label className="block mt-4">
              <span className="text-xs font-semibold text-slate-600">Name</span>
              <input
                placeholder="e.g., Late Night Drive"
                className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-amber-200"
              />
            </label>

            <label className="block mt-4">
              <span className="text-xs font-semibold text-slate-600">Genre</span>
              <input
                placeholder="e.g., Chill / Hip-Hop / Study"
                className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-amber-200"
              />
            </label>

          </div>
        
        {/*_____________________Music search component section___________________ */}
        <div className="lg:col-span-2 rounded-3xl border border-slate-200 p-6 shadow-sm">
            <h1 className="">Music search component section</h1>
        </div>
        {/*_____________________Music search component section___________________ */}

        </div>
      </main>
    </div>
  );
}