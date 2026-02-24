"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function Dashboard() {



  const [session, setSession] = useState<any>(null);
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [bookmarks, setBookmarks] = useState<any[]>([]);



  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });
  }, []);




  useEffect(() => {
    if (!session) return;

    fetchBookmarks();

    const channel = supabase
      .channel("bookmarks")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bookmarks" },
        () => {
          fetchBookmarks();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [session]);


 

  const fetchBookmarks = async () => {
    const { data } = await supabase
  .from("bookmarks")
  .select("*")
  .eq("user_id", session.user.id)
  .order("created_at", { ascending: false });

    setBookmarks(data || []);
  };


  const addBookmark = async () => {
    if (!title || !url) return;

    await supabase.from("bookmarks").insert([
      {
        title,
        url,
        user_id: session.user.id,
      },
    ]);

    setTitle("");
    setUrl("");
  };

  const deleteBookmark = async (id: string) => {
    await supabase.from("bookmarks").delete().eq("id", id);
  };

  const logout = async () => {
  await supabase.auth.signOut();
  router.push("/");
};



  if (!session) return <div className="p-10">Loading...</div>;

  return (
  <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 p-10 text-white">

    <div className="max-w-3xl mx-auto space-y-8">

      <div className="flex items-center gap-4">
  <img
    src={session.user.user_metadata.avatar_url}
    alt="profile"
    className="w-10 h-10 rounded-full"
  />
  <h1 className="text-2xl font-bold">
    {session.user.user_metadata.full_name}
  </h1> 
    <button
    onClick={logout}
    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
  >
    Logout
  </button>
</div>

      
      <div className="bg-gray-900 p-6 rounded-2xl shadow-lg space-y-4">
        <h2 className="text-lg font-semibold">Add New Bookmark</h2>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700"
        />

        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700"
        />

        <button
          onClick={addBookmark}
          className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg transition"
        >
          Add Bookmark
        </button>
      </div>

   
      <div className="space-y-4">
        {bookmarks.length === 0 && (
          <p className="text-gray-400">No bookmarks yet...</p>
        )}

        {bookmarks.map((b) => (
          <div
            key={b.id}
            className="bg-gray-900 p-4 rounded-xl flex justify-between items-center shadow-md"
          >
            <a
              href={
                b.url.startsWith("http")
                  ? b.url
                  : `https://${b.url}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              {b.title}
            </a>

            <button
              onClick={() => deleteBookmark(b.id)}
              className="text-red-500 hover:text-red-400"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

    </div>
  </div>
);
}