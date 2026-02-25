Smart Bookmark App
🚀 Overview

Smart Bookmark App is a full-stack web application that allows users to securely store and manage personal bookmarks in real-time.

The application supports Google OAuth authentication and ensures strict user-level data privacy using Row Level Security (RLS).

🛠 Tech Stack

Next.js (App Router)

React

Tailwind CSS

Supabase (Auth + PostgreSQL + Realtime)

Vercel (Deployment)

🔐 Features

Google OAuth Login

Secure session handling

Row Level Security (RLS)

Add & Delete bookmarks

Real-time updates

Responsive modern UI

Logout functionality

🧱 Database Structure

Table: bookmarks

Columns:

id (uuid)

title (text)

url (text)

user_id (uuid)

created_at (timestamp)

🔒 Security Implementation

Row Level Security was enabled on the bookmarks table.

Policies were created to ensure:

Users can insert bookmarks only if auth.uid() = user_id

Users can select only their own bookmarks

Users can delete only their own bookmarks

This ensures database-level protection, not just frontend-level validation.

⚡ Real-Time Implementation

Supabase Realtime was used with postgres_changes subscription.

The UI automatically updates whenever a bookmark is inserted or deleted without requiring a manual refresh.

🧩 Challenges Faced & Solutions
1️⃣ OAuth Redirect Issues

Problem: After login, the app redirected incorrectly.
Solution: Updated Site URL and Redirect URLs in Supabase Auth settings.

2️⃣ RLS Blocking Inserts

Problem: Insert operations failed due to missing policy.
Solution: Added INSERT policy with auth.uid() = user_id condition.

3️⃣ State Not Updating Instantly

Problem: UI required manual refresh.
Solution: Implemented realtime subscription and immediate state updates.

🖥 Local Setup

Clone the repository

Install dependencies
npm install

Create .env.local file
Add:
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key

Run:
npm run dev

🌍 Deployment

Deployed using Vercel.

Environment variables were configured in Vercel project settings.

📚 What I Learned

Implementing OAuth authentication

Database-level security using RLS

Real-time app architecture

Full-stack integration

Debugging authentication flows