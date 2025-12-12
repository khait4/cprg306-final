"use client";

import Image from "next/image";
import { useUserAuth } from "./_utils/auth-context";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex items-center justify-between px-5 lg:px-10 py-3"></div>
        <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              width={52}
              height={52}
              alt="Flame logo"
              className="rounded-2xl"
            />
            <div className="leading-tight">
              <p className="text-xs uppercase text-amber-500 font-semibold">
                F i r e b a s e
              </p>
              <h1 className="text-xl font-extrabold text-slate-900">Playlist</h1>
            </div>
        </div>
    
    <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-16">
        {!user && (
          <div className="flex flex-col items-center space-y-6">
            <div className="flex flex-col items-center gap-2">
              <Image
                src="/logo.png"
                width={90}
                height={90}
                alt="Logo"
                className="rounded-2xl"
              />

              <p className="text-xs uppercase text-amber-500 font-semibold">
                F i r e b a s e
              </p>

              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">
                Playlist Manager
              </h1>
            </div>
          
            <button onClick={gitHubSignIn} className="bg-amber-600 hover:bg-amber-700 text-white py-3 px-8 rounded-full text-lg">
              Sign In with GitHub
            </button>
          </div>
        )}

      {user && (
        <div className="flex flex-col items-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              Welcome, <span className="text-amber-600">{user.displayName}</span>!
            </h2>

          <img src={user.photoURL} alt={user.displayName} className="rounded-full w-40 h-40 shadow"/>

          <a href="my-playlist" className="bg-amber-600 hover:bg-amber-700 text-white py-3 px-6 rounded-full text-lg">
            Jump Into Your Playlist!
          </a>

          <button onClick={firebaseSignOut}className="bg-slate-800 hover:bg-slate-700 text-white py-2 px-6 rounded-full">
            Log Out
          </button>
        </div>
      )}
      </main>
      <footer className="border-t border-amber-100 py-4 text-center text-xs text-slate-500">
        <span className="font-semibold text-amber-600">Firebase</span> Playlist
      </footer>
    </div>
  );
}