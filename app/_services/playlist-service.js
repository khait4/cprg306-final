import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

export async function getPlaylists(userId) {
    
    const playlistsRef = collection(db, "users", userId, "playlists");

    const snapshot = await getDocs(playlistsRef);

    const playlists = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    return playlists;
}

export async function addPlaylist(userId, playlist) {
    
    const playlistsRef = collection(db, "users", userId, "playlists")
    const docRef = await addDoc(playlistsRef, playlist)

    return docRef.id;
}