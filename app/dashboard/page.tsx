"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Dashboard() {

  // ==============================
  // STEP 1: STATE VARIABLES
  // ==============================

  const [session, setSession] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [bookmarks, setBookmarks] = useState<any[]>([]);


  // ==============================
  // STEP 2: GET SESSION
  // ==============================

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });
  }, []);


  // ==============================
  // STEP 3: FETCH + REALTIME
  // ==============================

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


  // ==============================
  // STEP 4: FUNCTIONS
  // ==============================

  const fetchBookmarks = async () => {
    const { data } = await supabase
      .from("bookmarks")
      .select("*")
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


  // ==============================
  // STEP 5: UI
  // ==============================

  if (!session) return <div className="p-10">Loading...</div>;

  return (
    <div className="p-10 space-y-6">

      <h1 className="text-2xl font-bold">
        Welcome {session.user.email}
      </h1>

      {/* ADD BOOKMARK FORM */}
      <div className="space-y-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="border p-2 w-full"
        />
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="URL"
          className="border p-2 w-full"
        />
        <button
          onClick={addBookmark}
          className="bg-blue-500 text-white px-4 py-2"
        >
          Add Bookmark
        </button>
      </div>

      {/* BOOKMARK LIST */}
      <div className="mt-6 space-y-2">
        {bookmarks.map((b) => (
          <div
            key={b.id}
            className="border p-2 flex justify-between"
          >
            <a href={b.url} target="_blank">
              {b.title}
            </a>
            <button
              onClick={() => deleteBookmark(b.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}