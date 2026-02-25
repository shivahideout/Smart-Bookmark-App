# 🚀 Smart Bookmark App

## 📌 Overview
Smart Bookmark App is a full-stack web application that allows users to securely store and manage personal bookmarks in real-time.

The application uses Google OAuth authentication and enforces strict user-level data privacy using Row Level Security (RLS).

---

## 🛠 Tech Stack
- Next.js (App Router)
- React
- Tailwind CSS
- Supabase (Auth + PostgreSQL + Realtime)
- Vercel (Deployment)

---

## 🔐 Features
- Google OAuth Login
- Secure session handling
- Row Level Security (RLS)
- Add & Delete bookmarks
- Real-time updates
- Responsive modern UI
- Logout functionality

---

## 🧱 Database Structure

**Table: `bookmarks`**

| Column      | Type        |
|------------|------------|
| id         | uuid       |
| title      | text       |
| url        | text       |
| user_id    | uuid       |
| created_at | timestamp  |

---

## 🔒 Security Implementation

Row Level Security (RLS) is enabled on the `bookmarks` table.

Policies ensure:
- Users can insert bookmarks only if `auth.uid() = user_id`
- Users can select only their own bookmarks
- Users can delete only their own bookmarks

This ensures database-level protection, not just frontend-level validation.

---

## ⚡ Real-Time Implementation

Supabase Realtime was implemented using `postgres_changes` subscription.

Whenever a bookmark is added or deleted:
- The UI updates automatically
- No manual refresh is required
- React state updates instantly for better UX

---

## 🧩 Challenges Faced & Solutions

### 1️⃣ OAuth Redirect Issue
**Problem:** After login, the app redirected incorrectly.  
**Solution:** Updated Site URL and Redirect URLs in Supabase Authentication settings.

### 2️⃣ RLS Blocking Insert
**Problem:** Insert operation failed due to missing policy.  
**Solution:** Added INSERT policy with condition `auth.uid() = user_id`.

### 3️⃣ UI Not Updating Instantly
**Problem:** Page required manual refresh after adding bookmark.  
**Solution:** Implemented realtime subscription and state updates.

---

## 🖥 Local Setup

```bash
cd smart-bookmark-app
npm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

Run the project:

```bash
npm run dev
```

---

## 🌍 Deployment

The application is deployed using Vercel.

Environment variables are configured in Vercel Project Settings.

---

## 📚 What I Learned
- Implementing OAuth authentication
- Database security using Row Level Security
- Real-time web application design
- Debugging authentication flows
- Full-stack project structuring