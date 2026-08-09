import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Button from "../components/ui/Button";

import {
  MapPin,
  Clock,
  Phone,
  User,
  Heart,
  Share2,
  Flag,
} from "lucide-react";

import type { Product } from "../types/product";
import { getProduct } from "../services/productService";
import { createConversation } from "../services/messageService";
import { submitReport } from "../services/reportService";
import { useProducts } from "../context/ProductContext";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toggleWishlist, isWishlisted } = useProducts();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const [showReportForm, setShowReportForm] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportSubmitting, setReportSubmitting] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      if (!id) return;

      try {
        const data = await getProduct(id);
        setProduct(data as Product);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  async function handleContactSeller() {
    if (!product) return;

    try {
      const conversation = await createConversation(
        product.id,
        product.user_id
      );

      navigate(
        `/chat/${conversation.id}`
      );
    } catch (error) {
      console.error(error);
      alert("Failed to start conversation.");
    }
  }

  async function handleShare() {
    if (!product) return;

    const shareUrl = window.location.href;
    const shareData = {
      title: product.title,
      text: `Check out ${product.title} on Tigule Nawo`,
      url: shareUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareUrl);
        alert("Link copied to clipboard!");
        return;
      }

      window.prompt("Copy this link to share:", shareUrl);
    } catch (error) {
      console.error(error);
      window.prompt("Copy this link to share:", shareUrl);
    }
  }

  async function handleReportSubmit() {
    if (!product || !reportReason) return;

    try {
      setReportSubmitting(true);

      await submitReport(
        product.id,
        product.user_id,
        reportReason
      );

      alert("Thanks — we've received your report and will review it.");
      setShowReportForm(false);
      setReportReason("");
    } catch (error) {
      console.error(error);
      alert("Failed to submit report. Please try again.");
    } finally {
      setReportSubmitting(false);
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-screen items-center justify-center bg-orange-50">
          <h1 className="text-3xl font-bold">
            Loading product...
          </h1>
        </main>

        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-screen items-center justify-center bg-orange-50">
          <h1 className="text-3xl font-bold text-red-500">
            Product not found.
          </h1>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-orange-50">
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-16">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">

            {/* Product Image */}
            <div>
              <img
                src={product.image}
                alt={product.title}
                className="w-full rounded-2xl shadow-lg sm:rounded-3xl"
              />
            </div>

            {/* Product Information */}
            <div>

              <span className="rounded-full bg-orange-100 px-3 py-1.5 text-xs font-semibold text-orange-600 sm:px-4 sm:py-2 sm:text-sm">
                {product.category}
              </span>

              <h1 className="mt-4 text-2xl font-black sm:mt-6 sm:text-5xl">
                {product.title}
              </h1>

              <p className="mt-2 text-2xl font-black text-orange-500 sm:mt-4 sm:text-4xl">
                {product.price}
              </p>

              <div className="mt-5 space-y-3 text-sm text-gray-600 sm:mt-8 sm:space-y-4 sm:text-base">

                <div className="flex items-center gap-3">
                  <MapPin size={18} className="shrink-0 sm:size-5" />
                  {product.location}
                </div>

                <div className="flex items-center gap-3">
                  <Clock size={18} className="shrink-0 sm:size-5" />
                  Recently Posted
                </div>

                <div className="flex items-center gap-3">
                  <User size={18} className="shrink-0 sm:size-5" />
                  Student Seller
                </div>

              </div>

              <p className="mt-6 text-sm leading-6 text-gray-700 sm:mt-10 sm:text-base sm:leading-8">
                {product.description}
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">

                <Button onClick={handleContactSeller}>
                  <Phone className="mr-2 inline" size={18} />
                  Contact Seller
                </Button>

                <div className="flex gap-3">
                  <Button
                    variant="secondary"
                    onClick={() => toggleWishlist(product)}
                  >
                    <Heart
                      className="mr-2 inline"
                      size={18}
                      fill={isWishlisted(product.id) ? "currentColor" : "none"}
                    />
                    {isWishlisted(product.id) ? "Saved" : "Save"}
                  </Button>

                  <Button variant="secondary" onClick={handleShare}>
                    <Share2 className="mr-2 inline" size={18} />
                    Share
                  </Button>
                </div>

              </div>

              <div className="mt-4">

                <button
                  onClick={() => setShowReportForm(!showReportForm)}
                  className="flex items-center gap-1.5 text-sm text-gray-400 transition hover:text-red-500"
                >
                  <Flag size={14} />
                  Report this listing
                </button>

                {showReportForm && (
                  <div className="mt-2 rounded-xl border border-gray-200 bg-white p-4">
                    <p className="mb-2 text-sm font-semibold text-gray-700">
                      Why are you reporting this?
                    </p>

                    <select
                      value={reportReason}
                      onChange={(e) => setReportReason(e.target.value)}
                      className="w-full rounded-lg border p-2 text-sm outline-none focus:border-orange-500"
                    >
                      <option value="">Select a reason</option>
                      <option value="Scam or fraud">Scam or fraud</option>
                      <option value="Fake or misleading listing">Fake or misleading listing</option>
                      <option value="Inappropriate content">Inappropriate content</option>
                      <option value="Item already sold">Item already sold</option>
                      <option value="Other">Other</option>
                    </select>

                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={handleReportSubmit}
                        disabled={!reportReason || reportSubmitting}
                        className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600 disabled:opacity-50"
                      >
                        {reportSubmitting ? "Submitting..." : "Submit Report"}
                      </button>

                      <button
                        onClick={() => setShowReportForm(false)}
                        className="rounded-lg border px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

              </div>

            </div>

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}