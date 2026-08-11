import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import { supabase } from "../lib/supabase";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Welcome back!");

    navigate("/");
  }

  return (
    <>
      <Navbar />

      <main className="flex min-h-screen items-center justify-center bg-orange-50 px-4 py-10 sm:px-6 sm:py-20">
        <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl sm:rounded-3xl sm:p-10">

          <h1 className="text-center text-3xl font-black text-gray-900 sm:text-5xl">
            Welcome Back 👋
          </h1>

          <p className="mt-2 text-center text-sm text-gray-500 sm:mt-3 sm:text-base">
            Login to your Tigule Nawo account
          </p>

          <form
            onSubmit={handleLogin}
            className="mt-6 space-y-4 sm:mt-10 sm:space-y-5"
          >

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-orange-500 sm:px-5 sm:py-4 sm:text-base"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-orange-500 sm:px-5 sm:py-4 sm:text-base"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-orange-500 py-3 text-sm font-bold text-white transition hover:bg-orange-600 disabled:bg-orange-300 sm:py-4 sm:text-base"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          <p className="mt-6 text-center text-sm text-gray-500 sm:mt-8 sm:text-base">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-orange-500 hover:underline"
            >
              Register
            </Link>
          </p>

        </div>
      </main>

      <Footer />
    </>
  );
}