import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function Profile() {
  return (
    <>
      <Navbar />

      <main className="flex min-h-screen items-center justify-center bg-orange-50">
        <div className="rounded-3xl bg-white p-12 text-center shadow-lg">

          <h1 className="text-5xl font-black">
            👤 My Profile
          </h1>

          <p className="mt-4 text-gray-500">
            Manage your account.
          </p>
         
          <p className="mt-4 text-gray-500">   {/*  This page is under construction. Please check back later.*/ }
            This page is under construction. Please check back later.
          </p>

        </div>
      </main>

      <Footer />
    </>
  );
}