"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useUserAuth } from "../../_utils/auth-context";
import MusicSearch from "../../components/MusicSearch";
import { addPlaylist } from "../../_services/playlist-service";

function DisplayPlaylist({ playlist }) {
  const { name, genre, tracks } = playlist;

  return (
    <div className="border p-4 rounded-md mb-4">
      <h3 className="font-bold">{name}</h3>
      <p className="text-sm text-gray-500">{genre}</p>
      {tracks?.length > 0 && (
        <ul className="mt-2 list-disc list-inside">
          {tracks.map((track) => (
            <li key={track.id}>{track.name} — {track.artist}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Page() {

    const [error, setError] = useState("");
    const [playlistName, setPlaylistName] = useState("");
    const [genre, setGenre] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [tracks, setTracks] = useState([]);
    const { user } = useUserAuth();
    const [playlists, setPlaylists] = useState([]);

    function handleAddTrack(track) {
    if (tracks.some((t) => t.id === track.id)) return;
    setTracks([...tracks, track]);
  }

  async function handleCreatePlaylist() {
    if (!playlistName.trim()) {
      setError("Playlist name is required");
      return;
    }

    if (tracks.length === 0) {
      setError("Add at least one song");
      return;
    }

    setError("");

    const playlist = {
      name: playlistName,
      genre,
      tracks,
    };

    try {
      const id = await addPlaylist(user.uid, playlist);
      const newPlaylist = { ...playlist, id };
      setPlaylists((prev) => [...prev, newPlaylist]);

      setPlaylistName("");
      setGenre("");
      setTracks([]);
    } catch (err) {
      setError("Failed to create playlist");
    }
  } 

  return (

    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-amber-100">
        <div className="flex items-center justify-between px-5 lg:px-10 py-3">
          <div className="flex items-center gap-3">

            <Link href="/my-playlist">
              <Image
              src="/logo.png"
              width={52}
              height={52}
              alt="Flame logo"
              className="rounded-2xl shadow-sm"
              />
            </Link>
            
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
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
                placeholder="e.g., Late Night Drive"
                className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-amber-200"
              />
            </label>

            <label className="block mt-4">
              <span className="text-xs font-semibold text-slate-600">Genre</span>
              <input
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                placeholder="e.g., Chill / Hip-Hop / Study"
                className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-amber-200"
              />
            </label>

            <button
              onClick={handleCreatePlaylist}
              className="mt-6 w-full rounded-2xl bg-amber-600 px-4 py-3 text-sm font-semibold text-white hover:bg-amber-700 transition"
            >
              Create Playlist
            </button>

          </div>
        
        {/*_____________________Music search component section___________________ */}
        <div className="lg:col-span-2 rounded-3xl border border-slate-200 p-6 shadow-sm">
            <label className="block mb-4">
              <span className="text-xs font-semibold text-slate-600">
                Search music
              </span>
              <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search for songs or artists"
                className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-amber-200"
              />
            </label>

            <MusicSearch input={searchInput} onAddTrack={handleAddTrack}/>

            {tracks.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-slate-900 mb-2">
                  Songs in playlist ({tracks.length})
                </h3>

                <ul className="space-y-2">
                  {tracks.map((track) => (
                    <li key={track.id} className="flex justify-between items-center rounded-xl border border-slate-200 px-4 py-2 text-sm">
                      {track.name} — {track.artist}
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </div>
        {/*_____________________Music search component section___________________ */}

        </div>
      </main>
    </div>
  );
}