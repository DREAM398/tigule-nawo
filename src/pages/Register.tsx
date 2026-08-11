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

      <main className="flex min-h-screen items-center justify-center bg-orange-50 px-4 py-10 sm:px-6 sm:py-20">
        <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl sm:rounded-3xl sm:p-10">

          <h1 className="text-center text-3xl font-black text-gray-900 sm:text-5xl">
            Create Account 🎉
          </h1>

          <p className="mt-2 text-center text-sm text-gray-500 sm:mt-3 sm:text-base">
            Join Malawi's Student Marketplace
          </p>

          <form
            onSubmit={handleRegister}
            className="mt-6 space-y-4 sm:mt-10 sm:space-y-5"
          >
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-orange-500 sm:px-5 sm:py-4 sm:text-base"
              required
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-orange-500 sm:px-5 sm:py-4 sm:text-base"
              required
            />

            <input
              type="text"
              placeholder="University / Campus"
              value={campus}
              onChange={(e) => setCampus(e.target.value)}
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

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-orange-500 sm:px-5 sm:py-4 sm:text-base"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-orange-500 py-3 text-sm font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-orange-300 sm:py-4 sm:text-base"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500 sm:mt-8 sm:text-base">
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