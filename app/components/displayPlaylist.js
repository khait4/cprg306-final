"use client";

export default function DisplayPlaylist({ playlist }) {

    if (!playlist) {
        return (
            <p className="text-sm text-slate 500">
                Select your playlist!
            </p>
        );
    }

    const { name, genre, tracks = [] } = playlist;

    return (
    <div className="mt-6 rounded-3xl border border-slate-200 p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">{name}</h2>
        <p className="text-sm text-slate-500 mb-4">{genre}</p>
        
        {tracks.length === 0 ? (
            <p className="text-sm text-slate-400">No songs here!</p>
        ) : (
        <ul className="space-y-2">
            {tracks.map((track) => (
                <li key={track.id} className="rounded-xl border border-slate-200 px-4 py-2 text-sm">
                    {track.name} — {track.artist}
                </li>
            ))}
        </ul>
      )}
    </div>
  );
}