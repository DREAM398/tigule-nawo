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

      <main className="flex min-h-screen items-center justify-center bg-orange-50 px-6 py-20">
        <div className="w-full max-w-lg rounded-3xl bg-white p-10 shadow-xl">

          <h1 className="text-center text-5xl font-black text-gray-900">
            Welcome Back 👋
          </h1>

          <p className="mt-3 text-center text-gray-500">
            Login to your Tigule Nawo account
          </p>

          <form
            onSubmit={handleLogin}
            className="mt-10 space-y-5"
          >

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-5 py-4 outline-none transition focus:border-orange-500"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-5 py-4 outline-none transition focus:border-orange-500"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-orange-500 py-4 font-bold text-white transition hover:bg-orange-600 disabled:bg-orange-300"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          <p className="mt-8 text-center text-gray-500">
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