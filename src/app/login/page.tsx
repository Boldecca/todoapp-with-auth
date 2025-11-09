"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const demoEmail = process.env.NEXT_PUBLIC_DEMO_EMAIL ?? "";
  const demoPassword = process.env.NEXT_PUBLIC_DEMO_PASSWORD ?? "";
  const isProd = process.env.NODE_ENV === "production";
  const [email, setEmail] = useState(!isProd ? demoEmail : "");
  const [password, setPassword] = useState(!isProd ? demoPassword : "");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      router.replace("/");
    } catch (err: any) {
      setError(err?.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-zinc-50 dark:from-black dark:to-zinc-950 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-4 text-center">
            <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Welcome back</h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Sign in to your account</p>
          </div>
          {error && (
            <p className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-200">
              {error}
            </p>
          )}
          <form onSubmit={onSubmit} className="space-y-3">
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-zinc-300 focus:ring-2 focus:ring-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:ring-zinc-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-zinc-300 focus:ring-2 focus:ring-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:ring-zinc-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800 disabled:opacity-60 dark:bg-zinc-200 dark:text-black dark:hover:bg-white"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
        <div className="mt-3 text-center text-sm text-zinc-600 dark:text-zinc-400">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            onClick={() => router.push("/register")}
            className="font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-200"
          >
            Create one
          </button>
        </div>
      </div>
    </div>
  );
}
