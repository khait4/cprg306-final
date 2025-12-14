"use client";

import { useState, useEffect } from "react";

export default function MusicSearch({ input, onAddTrack }) {
  const [tracks, setTracks] = useState([]);

  async function fetchTracks(input) {
    if (!input?.trim()) return [];
    try {
      const res = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(
          input
        )}&media=music&limit=20`
      );
      const data = await res.json();

      return (
        data.results?.map((track) => ({
          id: track.trackId,
          name: track.trackName,
          artist: track.artistName,
          album: track.collectionName,
          preview: track.previewUrl,
        })) || []
      );
    } catch (err) {
      return [];
    }
  }

  const loadTracks = async () => {
    const fetched = await fetchTracks(input);
    setTracks(fetched || []);
  };

  useEffect(() => {
    loadTracks();
  }, [input]);

  if (!tracks.length) {
    return <p className="text-gray-400">No tracks found.</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-white">
        Music results for "{input}"
      </h2>

      <div className="grid grid-cols-2 gap-2">
        {tracks.map((track) => (
          <div key={track.id} className="bg-amber-600 text-white p-2 border rounded-md text-center hover:bg-amber-700 cursor-pointer">
            <p className="font-semibold">{track.name}</p>
            <p className="text-sm">{track.artist}</p>
            <p className="text-xs italic">{track.album}</p>
            {track.preview && (
              <audio controls className="mt-2 w-full">
                <source src={track.preview} type="audio/mpeg" />
              </audio>
            )}  
            <button onClick={() => onAddTrack(track)} className="mt-2 text-xs bg-white text-amber-700 px-3 py-1 rounded-full hover:bg-amber-400">
              + Add to Playlist
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
