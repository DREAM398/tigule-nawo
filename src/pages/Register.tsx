import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import { supabase } from "../lib/supabase";

export default function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [campus, setCampus] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          campus: campus,
        },
      },
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    console.log(data);

    alert(
      "Account created successfully! Check your email if confirmation is required."
    );

    navigate("/login");
  }

  return (
    <>
      <Navbar />

      <main className="flex min-h-screen items-center justify-center bg-orange-50 px-6 py-20">
        <div className="w-full max-w-lg rounded-3xl bg-white p-10 shadow-xl">

          <h1 className="text-center text-5xl font-black text-gray-900">
            Create Account 🎉
          </h1>

          <p className="mt-3 text-center text-gray-500">
            Join Malawi's Student Marketplace
          </p>

          <form
            onSubmit={handleRegister}
            className="mt-10 space-y-5"
          >
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-5 py-4 outline-none transition focus:border-orange-500"
              required
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-5 py-4 outline-none transition focus:border-orange-500"
              required
            />

            <input
              type="text"
              placeholder="University / Campus"
              value={campus}
              onChange={(e) => setCampus(e.target.value)}
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

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-5 py-4 outline-none transition focus:border-orange-500"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-orange-500 py-4 font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-orange-300"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-8 text-center text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-orange-500 hover:underline"
            >
              Login
            </Link>
          </p>

        </div>
      </main>

      <Footer />
    </>
  );
}