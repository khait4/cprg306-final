"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useUserAuth } from "../../_utils/auth-context";


export default function Page() {
      const { user } = useUserAuth();

  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [tracks, setTracks] = useState([{ title: "", artist: "" }]);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const canSave = useMemo(() => {
    const hasName = name.trim().length > 0;
    const hasAtLeastOneTrack = tracks.some(
      (t) => t.title.trim() && t.artist.trim()
    );
    return hasName && hasAtLeastOneTrack && !isSaving;
  }, [name, tracks, isSaving]);

  const updateTrack = (index, key, value) => {
    setTracks((prev) =>
      prev.map((t, i) => (i === index ? { ...t, [key]: value } : t))
    );
  };

  const addTrack = () => setTracks((prev) => [...prev, { title: "", artist: "" }]);

  const removeTrack = (index) => {
    setTracks((prev) => prev.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setName("");
    setGenre("");
    setTracks([{ title: "", artist: "" }]);
    setError("");
  };

  const handleSave = async () => {
    setError("");

    if (!user) {
      setError("You must be signed in to create a playlist.");
      return;
    }

    if (!canSave) return;

    setIsSaving(true);

    try {
      // ✅ TODO: Replace this with Firestore addDoc(...)
      // Example payload:
      const payload = {
        uid: user.uid,
        name: name.trim(),
        genre: genre.trim(),
        tracks: tracks
          .map((t) => ({ title: t.title.trim(), artist: t.artist.trim() }))
          .filter((t) => t.title && t.artist),
        createdAt: new Date().toISOString(),
      };

      console.log("Saving playlist:", payload);

      // Simulate save
      await new Promise((r) => setTimeout(r, 500));

      // Redirect to playlists list after save
      window.location.href = "/my-playlist/playlists";
    } catch (e) {
      console.error(e);
      setError("Something went wrong while saving. Try again.");
    } finally {
      setIsSaving(false);
    }
  };

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

            <button
              onClick={resetForm}
              className="hidden sm:inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
              type="button"
            >
              Reset
            </button>

            <button
              onClick={handleSave}
              disabled={!canSave}
              className="inline-flex items-center justify-center rounded-full bg-amber-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-md hover:bg-amber-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              type="button"
            >
              {isSaving ? "Saving..." : "Save playlist"}
            </button>
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="px-6 lg:px-16 py-10 max-w-5xl mx-auto">
        {/* Info */}
        <div className="mb-6 rounded-3xl border border-amber-100 bg-amber-50/40 p-6">
          <p className="text-sm text-slate-700">
            Create a playlist by giving it a name and adding tracks. When you’re
            ready, hit <span className="font-semibold">Save playlist</span>.
          </p>
          {!user && (
            <p className="mt-2 text-xs text-amber-700 font-semibold">
              You’re not signed in — saving is disabled until you log in.
            </p>
          )}
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Playlist details */}
          <div className="lg:col-span-1 rounded-3xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">
              Playlist details
            </h2>

            <label className="block mt-4">
              <span className="text-xs font-semibold text-slate-600">Name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
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

            <p className="mt-4 text-xs text-slate-500">
              Tip: Add at least one track with both title + artist to enable saving.
            </p>
          </div>

          {/* Right: Tracks */}
          <div className="lg:col-span-2 rounded-3xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-900">Tracks</h2>
              <button
                onClick={addTrack}
                type="button"
                className="inline-flex items-center justify-center rounded-full border border-amber-200 px-4 py-2 text-xs font-semibold text-amber-700 hover:bg-amber-50 transition"
              >
                + Add track
              </button>
            </div>

            

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleSave}
                disabled={!canSave}
                type="button"
                className="inline-flex items-center justify-center rounded-full bg-amber-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-amber-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? "Saving..." : "Save playlist"}
              </button>

              <Link
                href="/my-playlist/playlists"
                className="inline-flex items-center justify-center rounded-full border border-amber-600 px-6 py-3 text-sm font-semibold text-amber-600 hover:bg-amber-50 transition"
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}