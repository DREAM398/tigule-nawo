import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import { getConversations } from "../services/messageService";
import { supabase } from "../lib/supabase";

type Conversation = {
  id: string;
  buyer_id: string;
  seller_id: string;

  products: {
    id: string;
    title: string;
    image: string;
    price: string;
    location: string;
  } | null;

  buyer: { id: string; full_name: string } | null;
  seller: { id: string; full_name: string } | null;
};

export default function Messages() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    const channel = supabase.channel("conversations-realtime").on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "conversations",
      },
      () => {
        loadConversations();
      }
    ).subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function loadConversations() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUserId(user?.id || "");

      const data = await getConversations();
      setConversations(data as Conversation[]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function getOtherPerson(conversation: Conversation) {
    const isBuyer = conversation.buyer_id === userId;
    return isBuyer ? conversation.seller : conversation.buyer;
  }

  function getInitials(name: string) {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-orange-50">
        <section className="mx-auto max-w-5xl px-6 py-16">
          <h1 className="text-4xl font-black">Messages</h1>
          <p className="mt-3 text-gray-500">Your conversations</p>

          {loading ? (
            <div className="mt-10 rounded-2xl bg-white p-10 shadow">
              Loading...
            </div>
          ) : conversations.length === 0 ? (
            <div className="mt-10 rounded-2xl bg-white p-16 text-center shadow">
              <h2 className="text-3xl font-bold">No conversations yet</h2>
              <p className="mt-3 text-gray-500">
                Contact a seller to start chatting.
              </p>
            </div>
          ) : (
            <div className="mt-10 space-y-5">
              {conversations.map((conversation) => {
                const otherPerson = getOtherPerson(conversation);
                const name = otherPerson?.full_name || "Unknown user";

                return (
                  <div
                    key={conversation.id}
                    onClick={() => navigate(`/chat/${conversation.id}`)}
                    className="cursor-pointer rounded-2xl border bg-white p-5 shadow transition hover:border-orange-500 hover:shadow-xl"
                  >
                    <div className="flex items-center gap-4">

                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-orange-500 font-bold text-white">
                        {getInitials(name)}
                      </div>

                      <img
                        src={conversation.products?.image}
                        alt={conversation.products?.title}
                        className="h-20 w-20 rounded-xl object-cover"
                      />

                      <div className="flex-1">
                        <h2 className="text-lg font-bold text-gray-800">
                          {name}
                        </h2>

                        <p className="text-sm text-gray-600">
                          {conversation.products?.title}
                        </p>

                        <p className="text-orange-500 font-semibold">
                          {conversation.products?.price}
                        </p>

                        <p className="text-sm text-gray-500">
                          {conversation.products?.location}
                        </p>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}