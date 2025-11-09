# Firebase CRUD Task App

A protected CRUD app built with Next.js (App Router) + TypeScript, Firebase Authentication, and Firestore. Authenticated users can create, read, update, and delete their own tasks. The dashboard greets the user by email and all operations run against Firestore.

## Technologies Used

- Next.js (App Router) + TypeScript
- Firebase Authentication
- Cloud Firestore
- React 19

## Features

- Firebase Authentication (Email/Password)
- Protected Routes (dashboard only for logged-in users)
- CRUD Operations (Tasks in Firestore)
- Personalized Dashboard Greeting (Hello, user@email)
- Live updates via Firestore onSnapshot subscription

## Project Structure (key files)

- `src/lib/firebase.ts` — Firebase app, `auth`, and `db` setup
- `src/context/AuthContext.tsx` — Auth provider using `onAuthStateChanged`
- `src/lib/tasks.ts` — Firestore CRUD helpers
- `src/types/task.ts` — Task interface and Priority type
- `src/app/login/page.tsx` — Login page
- `src/app/register/page.tsx` — Register page
- `src/app/page.tsx` — Protected Dashboard (TaskForm + TaskList)

## Setup Instructions

1) Clone the repository

```bash
git clone https://github.com/Boldecca/todoapp-with-auth.git
cd todoapp-with-auth
npm install
```

2) Firebase configuration

Create a Firebase project and enable:
- Authentication: Email/Password sign-in provider
- Firestore Database: in production or test mode

Add a web app in Firebase console and copy the config. Provide these env vars (create `.env.local` at project root):

```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

3) Run the app

```bash
npm run dev
# open http://localhost:3000
```

## Firestore

Collection: `tasks`

Fields per document:

- `title: string`
- `description: string`
- `completed: boolean`
- `priority: "Low" | "Medium" | "High"`
- `userEmail: string` (owner’s email)

Optional security rules (example) to restrict access by email owner:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /tasks/{taskId} {
      allow read, write: if request.auth != null &&
        request.auth.token.email == resource.data.userEmail;
    }
  }
}
```

## Usage

1. Register a new account at `/register` (email/password) → redirected to login
2. Log in at `/login` → redirected to dashboard `/`
3. On dashboard:
   - Add tasks with title, description, and priority
   - Toggle completion via the checkbox
   - Edit fills the form; submit to update
   - Delete removes from Firestore and UI
4. Logout button signs out and redirects to `/login`

## Deployment (Vercel)

1. Push to GitHub (ensure env vars are not committed)
2. Create a new Vercel project from this repo
3. In Vercel Project Settings → Environment Variables, add the Firebase vars above
4. Deploy. Your live link will look like: `https://<project>.vercel.app`

Deployment Link: <ADD YOUR LIVE VERCEL LINK HERE>

## Screenshots

- Login page: <add image>
- Dashboard: <add image>

## Testing Credentials

Demo account for evaluation (ensure it exists in Firebase Authentication):

- Email: `testuser@gmail.com`
- Password: `test1234`

Add one or two tasks in Firestore under that account for evaluation.
