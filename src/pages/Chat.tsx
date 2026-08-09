import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Button from "../components/ui/Button";

import { supabase } from "../lib/supabase";

import {
  getConversation,
  getMessages,
  sendMessage,
  markMessagesAsSeen,
} from "../services/messageService";

import { setTyping } from "../services/typingService";

export default function Chat() {
  const { id } = useParams();

  const [conversation, setConversation] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  const [userId, setUserId] = useState("");
  const [otherUserTyping, setOtherUserTyping] = useState(false);

  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  const typingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    setMessages([]);
    setConversation(null);
    setLoading(true);
    loadChat();
  }, [id]);

  async function loadChat() {
    if (!id) return;

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUserId(user?.id || "");

      const convo = await getConversation(id);
      setConversation(convo);

      const msgs = await getMessages(id);
      setMessages(msgs || []);

      await markMessagesAsSeen(id);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  // ==========================================
  // Realtime Messages
  // ==========================================

  useEffect(() => {
    if (!id) return;

    const channel = supabase
      .channel(`chat-${id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${id}`,
        },
        async () => {
          const msgs = await getMessages(id);
          setMessages(msgs || []);

          await markMessagesAsSeen(id);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id]);

  // ==========================================
  // Typing Indicator Listener
  // ==========================================

  useEffect(() => {
    if (!id) return;

    const channel = supabase
      .channel(`typing-${id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "typing_status",
          filter: `conversation_id=eq.${id}`,
        },
        (payload: any) => {
          const data = payload.new;

          if (!data) return;

          if (data.user_id !== userId) {
            setOtherUserTyping(data.is_typing);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id, userId]);

  // ==========================================
  // Typing Status Sender (Optimized)
  // ==========================================

  useEffect(() => {
    if (!id) return;

    if (message.trim() === "") {
      setTyping(id, false);
      return;
    }

    setTyping(id, true);

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    typingTimeout.current = setTimeout(() => {
      setTyping(id, false);
    }, 2000);

    return () => {
      if (typingTimeout.current) {
        clearTimeout(typingTimeout.current);
      }
    };
  }, [message, id]);

  // ==========================================
  // Auto Scroll
  // ==========================================

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  async function handleSend() {
  if (!message.trim()) return;
  if (!id) return;

  try {
    setSending(true);

    await sendMessage(id, message);

    setMessage("");

    try {
      await setTyping(id, false);
    } catch (err) {
      console.error("Typing status failed:", err);
    }

  } catch (error) {
    console.error(error);
    alert("Failed to send message.");
  } finally {
    setSending(false);
  }
}

  function getOtherPersonName() {
    if (!conversation) return "";
    const isBuyer = conversation.buyer_id === userId;
    const otherPerson = isBuyer ? conversation.seller : conversation.buyer;
    return otherPerson?.full_name || "Unknown user";
  }

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-screen items-center justify-center bg-orange-50">
          <h1 className="text-3xl font-bold">
            Loading chat...
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
        <section className="mx-auto max-w-4xl px-3 py-4 sm:px-6 sm:py-10">

          <div className="overflow-hidden rounded-2xl bg-white shadow-xl sm:rounded-3xl">

            {/* Header */}

            <div className="border-b bg-white p-3 sm:p-5">
              <div className="flex items-center gap-3 sm:gap-4">

                <img
                  src={conversation?.products?.image}
                  alt={conversation?.products?.title}
                  className="h-12 w-12 shrink-0 rounded-xl object-cover shadow sm:h-20 sm:w-20 sm:rounded-2xl"
                />

                <div className="min-w-0 flex-1">

                  <h1 className="truncate text-base font-black text-gray-800 sm:text-2xl">
                    {getOtherPersonName()}
                  </h1>

                  <p className="mt-0.5 truncate text-xs font-medium text-gray-600 sm:mt-1 sm:text-sm">
                    {conversation?.products?.title}
                  </p>

                  <p className="mt-0.5 text-sm font-bold text-orange-500 sm:mt-1 sm:text-lg">
                    {conversation?.products?.price}
                  </p>

                  <p className="mt-0.5 hidden text-sm text-gray-500 sm:mt-1 sm:block">
                    📍 {conversation?.products?.location}
                  </p>

                </div>

              </div>
            </div>

            {/* Messages */}

            <div className="h-[60vh] overflow-y-auto bg-orange-50 p-3 sm:h-[500px] sm:p-6">

              {messages.length === 0 ? (

                <p className="text-center text-sm text-gray-500 sm:text-base">
                  No messages yet.
                </p>

              ) : (

                <div className="space-y-3 sm:space-y-4">

                  {messages.map((msg) => (

                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.sender_id === userId
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >

                      <div
                        className={`max-w-[80%] break-words rounded-2xl px-3 py-2 text-sm shadow sm:max-w-[75%] sm:rounded-3xl sm:px-4 sm:py-3 sm:text-base ${
                          msg.sender_id === userId
                            ? "bg-orange-500 text-white"
                            : "bg-white text-gray-800"
                        }`}
                      >

                        <p>{msg.message}</p>

                        <div className="mt-1.5 flex items-center justify-end gap-2 text-[10px] opacity-70 sm:mt-2 sm:text-xs">
                          <span>
                            {new Date(msg.created_at).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                              })}
                          </span>

                          {msg.sender_id === userId && (
                          <span>
                            {msg.seen ? "✓✓ Seen" : "✓ Sent"}
                          </span>
                          )}
                       </div>

                      </div>

                    </div>

                  ))}

                </div>

              )}

              <div ref={bottomRef} />

            </div>

            {/* Typing Indicator */}

            {otherUserTyping && (
              <div className="px-3 py-2 text-xs italic text-green-600 animate-pulse sm:px-6 sm:text-sm">
                ✍️ Typing...
              </div>
            )}

            {/* Input */}

            <div className="flex gap-2 border-t bg-white p-3 sm:gap-4 sm:p-6">

              <input
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSend();
                  }
                }}
                placeholder="Write a message..."
                className="flex-1 rounded-xl border p-3 text-sm outline-none focus:border-orange-500 sm:p-4 sm:text-base"
              />

              <Button
                onClick={handleSend}
                disabled={sending}
              >
                {sending ? "..." : "Send"}
              </Button>

            </div>

          </div>

        </section>
      </main>

      <Footer />
    </>
  );
}