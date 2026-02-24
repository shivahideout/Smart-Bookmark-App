"use client";
import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/dashboard`,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center">
      <div className="bg-gray-900 p-10 rounded-2xl shadow-2xl text-center space-y-6 w-[400px]">
        
        <h1 className="text-3xl font-bold text-white">
          Smart Bookmark
        </h1>

        <p className="text-gray-400">
          Save and manage your favorite websites securely
        </p>

        <button
          onClick={login}
          className="w-full bg-white text-black py-3 rounded-xl font-semibold hover:bg-gray-200 transition duration-300"
        >
          Sign in with Google
        </button>

      </div>
    </div>
  );
}