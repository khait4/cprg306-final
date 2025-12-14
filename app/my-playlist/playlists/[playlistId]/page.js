"use client";

import { useState, useEffect } from "react";
import { getPlaylist } from "../../../_services/playlist-service";
import { useUserAuth } from "../../../_utils/auth-context";
import DisplayPlaylist from "../../../components/displayPlaylist";
import { useParams } from "next/navigation";

export default function Page() {
    const params = useParams();
    const playlistId = params.playlistId;
    const { user } = useUserAuth();
    const [playlist, setPlaylist] = useState(null);
    const [loading, setLoading] = useState(true);
    
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
    
    if (loading) return <div className="p-6">Loading playlist...</div>;
    if (!playlist) return <div className="p-6">Playlist not found.</div>;
    
    return (
    <main className="p-6 max-w-3xl mx-auto">
        <DisplayPlaylist playlist={playlist} />
    </main>
    );

}