"use client";

import Image from "next/image";
import { useUserAuth } from "./_utils/auth-context";
import playlistPreview from "./my-playlist/playlist-preview";


export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  return (
    <div className="p-6 text-center flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold leading-tight">
        Firebase <br /> Playlist
      </h1>

      <div className="relative mt-4">
        <Image src="/flame.png" width={90} height={90} alt="Flame" className="absolute top-3 left-1/2 -translate-x-1/2 z-0"/>
        <Image src="/music.png" width={75} height={75} alt="Music Notes" className="relative z-10"/>
      </div>

      <p className="mt-6">
        {!user && (
          <button onClick={gitHubSignIn} className="bg-blue-600 hover:bg-blue-300 text-white py-3 px-6 rounded-full">
            Sign In with GitHub
          </button>
        )}
      </p>

      {user && (
        <p className="mt-6 flex flex-col items-center">
          <span className="text-xl font-semibold mb-4">
            Welcome, {user.displayName}!
          </span>

          <img src={user.photoURL} alt={user.displayName} className="mx-auto rounded-full w-40 h-40 mb-6 shadow"/>

          <a href="my-playlist" className="bg-purple-500 hover:bg-purple-400 text-white py-3 px-6 rounded-full text-lg shadow mb-6">
            Jump Into Your Playlist!
          </a>

          <button onClick={firebaseSignOut}className="bg-indigo-800 hover:bg-indigo-600 text-white py-2 px-6 rounded-full shadow">
            Log Out
          </button>
        </p>
      )}
    </div>
  );
}