"use client";

import { useState, useEffect } from "react";
import { getPlaylist, updatePlaylist } from "../../../_services/playlist-service";
import { useUserAuth } from "../../../_utils/auth-context";
import DisplayPlaylist from "../../../components/displayPlaylist";
import { useParams } from "next/navigation";
import MusicSearch from "../../../components/MusicSearch";

export default function Page() {
    const params = useParams();
    const playlistId = params.playlistId;
    const { user } = useUserAuth();
    const [playlist, setPlaylist] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchInput, setSearchInput] = useState("");
    
    useEffect(() => {
        if (!user || !playlistId) return;
        
        const fetchPlaylist = async () => {
            setLoading(true);
            const data = await getPlaylist(user.uid, playlistId);
            setPlaylist(data);
            setLoading(false);
        };
        
        fetchPlaylist();
    }, [user, playlistId]);

    const handleAddTrack = async (track) => {
        if (playlist.tracks?.some((t) => t.id === track.id)) return;
        
        let newTracks = [...(playlist.tracks || []), track];
        setPlaylist({ ...playlist, tracks: newTracks });
        await updatePlaylist(user.uid, playlistId, { tracks: newTracks });
    };

    const handleRemoveTrack = async (trackId) => {
        let newTracks = playlist.tracks.filter((t) => t.id !== trackId);
        setPlaylist({ ...playlist, tracks: newTracks });
        await updatePlaylist(user.uid, playlistId, { tracks: newTracks });
    };
    
    if (loading) 
        return <div className="p-6">Loading playlist...</div>;

    if (!playlist) 
        return <div className="p-6">Playlist not found.</div>;
    
    return (
    <main className="p-6 max-w-3xl mx-auto space-y-6">
        
        <DisplayPlaylist playlist={playlist} onRemoveTrack={handleRemoveTrack}/>
        
        <div className="rounded-3xl border border-slate-200 p-6 shadow-sm">
            <div className="block mb-4">
                <div className="text-xs font-semibold text-slate-600">
                    Search and add songs
                </div>
                
                <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder="Search for songs or artists" className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-amber-200"/>
            </div>
            
            <MusicSearch input={searchInput} onAddTrack={handleAddTrack} />
            
        </div>
    </main>
    );

}