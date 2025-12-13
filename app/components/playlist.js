"use client";

export default function Playlist({ playlist, onSelect }) {
  const { name, genre, trackAmount, songs } = playlist;

  return (
    <section onClick={() => onSelect(playlist)}>
        <div
            className="flex items-center justify-between rounded-2xl bg-white border border-amber-100 px-4 py-3"
        >
            <div>
                <p className="text-sm font-semibold text-slate-900">
                    {name}
                </p>
                <p className="text-xs text-slate-500">{trackAmount} tracks</p>
            </div>
            <span className="rounded-full bg-amber-100 px-3 py-1 text-[11px] font-semibold text-amber-700">
                {genre}
            </span>
        </div>
    </section>    
  );
}