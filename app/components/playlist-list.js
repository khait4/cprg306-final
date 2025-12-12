"use client";
import Playlist from './playlist.js';

export default function PlaylistList({ playlists = [], onItemSelect }){
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