"use client";
import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <button
        onClick={login}
        className="bg-black text-white px-6 py-2 rounded"
      >
        Sign in with Google
      </button>
    </div>
  );
}