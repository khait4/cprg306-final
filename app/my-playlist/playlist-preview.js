
// backend not implemented
export default function PlaylistPreview() {

    return (
        <section className="flex-1 flex flex-col">
          <div className="self-stretch rounded-3xl border border-amber-100 bg-amber-50/40 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Recent playlists
            </h2>

            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-2xl bg-white border border-amber-100 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Place Holder
                    </p>
                    <p className="text-xs text-slate-500">xx tracks</p>
                  </div>
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-[11px] font-semibold text-amber-700">
                    Genre
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-5 text-xs text-slate-500">
              Jump right into your recent playlists.
            </p>
          </div>
        </section>
    );
}