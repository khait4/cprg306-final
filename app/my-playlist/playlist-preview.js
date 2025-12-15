import PlaylistList from "../components/playlist-list";
// backend not implemented
export default function PlaylistPreview() {

    return (
        <section className="flex-1 flex flex-col">
          <div className="self-stretch rounded-3xl border border-amber-100 bg-amber-50/40 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Recent playlists
            </h2>

            <PlaylistList />

            <p className="mt-5 text-xs text-slate-500">
              Jump right into your recent playlists.
            </p>
          </div>
        </section>
    );
}