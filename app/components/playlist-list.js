"use client";

import Playlist from './playlist.js';
import { useUserAuth } from "../_utils/auth-context";
import { getPlaylists } from "../_services/playlist-service"; 
import { useEffect, useState } from "react"; 

export default function PlaylistList({ onItemSelect }){

    const { user } = useUserAuth(); 
    const [playlists, setPlaylists] = useState([]); 

    useEffect(() => {
    if (!user) return;

    async function loadPlaylists() {
      const data = await getPlaylists(user.uid);
      setPlaylists(data);
    }

    loadPlaylists();
    }, [user]);

    return (
        <div>
            <div>
                {playlists.map((playlist) => (
                    <Playlist key={playlist.id} playlist={playlist} onSelect={() => onItemSelect(playlist)} />
                ))}
            </div>
        </div>
    );
}