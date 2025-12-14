import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, doc, getDoc } from "firebase/firestore";

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

export async function getPlaylist(userId, playlistId) {
  const playlistRef = doc(db, "users", userId, "playlists", playlistId);
  const snapshot = await getDoc(playlistRef);

  if (!snapshot.exists()) return null;

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}