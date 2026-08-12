import { supabase } from "../lib/supabase";

// ==========================================
// Create Conversation
// ==========================================

export async function createConversation(
  productId: string,
  sellerId: string
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in.");
  }

  if (user.id === sellerId) {
    throw new Error("You can't message yourself.");
  }

  const { data: existing, error: existingError } = await supabase
    .from("conversations")
    .select("*")
    .eq("product_id", productId)
    .eq("buyer_id", user.id)
    .eq("seller_id", sellerId)
    .maybeSingle();

  if (existingError) {
    throw existingError;
  }

  if (existing) {
    return existing;
  }

  const { data, error } = await supabase
    .from("conversations")
    .insert({
      product_id: productId,
      buyer_id: user.id,
      seller_id: sellerId,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

// ==========================================
// Get Conversations (list, only with actual messages)
// ==========================================

export async function getConversations() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("conversations")
    .select(`
      *,
      products (
        id,
        title,
        image,
        price,
        location
      ),
      buyer:profiles!conversations_buyer_profile_fkey (
        id,
        full_name
      ),
      seller:profiles!conversations_seller_profile_fkey (
        id,
        full_name
      ),
      messages!inner (
        id
      )
    `)
    .or(`buyer_id.eq.${user.id},seller_id.eq.${user.id}`)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return data;
}

// ==========================================
// Get Messages
// ==========================================

export async function getMessages(conversationId: string) {
  const { data, error } = await supabase
    .from("messages")
    .select(`
      id,
      sender_id,
      message,
      created_at,
      seen
    `)
    .eq("conversation_id", conversationId)
    .order("created_at", {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  return data;
}

// ==========================================
// Send Message
// ==========================================

export async function sendMessage(
  conversationId: string,
  message: string
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in.");
  }

  const { data, error } = await supabase
    .from("messages")
    .insert({
      conversation_id: conversationId,
      sender_id: user.id,
      message,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

// ==========================================
// Get One Conversation (for Chat.tsx header)
// ==========================================

export async function getConversation(conversationId: string) {
  const { data, error } = await supabase
    .from("conversations")
    .select(`
      *,
      products (
        id,
        title,
        image,
        price,
        location
      ),
      buyer:profiles!conversations_buyer_profile_fkey (
        id,
        full_name
      ),
      seller:profiles!conversations_seller_profile_fkey (
        id,
        full_name
      )
    `)
    .eq("id", conversationId)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

// ==========================================
// Mark Messages As Seen
// ==========================================

export async function markMessagesAsSeen(conversationId: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { error } = await supabase
    .from("messages")
    .update({
      seen: true,
    })
    .eq("conversation_id", conversationId)
    .neq("sender_id", user.id)
    .eq("seen", false);

  if (error) {
    throw error;
  }
}

// ==========================================
// Get Unread Message Count
// ==========================================

export async function getUnreadCount() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return 0;

  const { data: convos, error: convoError } = await supabase
    .from("conversations")
    .select("id")
    .or(`buyer_id.eq.${user.id},seller_id.eq.${user.id}`);

  if (convoError || !convos || convos.length === 0) return 0;

  const conversationIds = convos.map((c) => c.id);

  const { count, error } = await supabase
    .from("messages")
    .select("id", { count: "exact", head: true })
    .in("conversation_id", conversationIds)
    .eq("seen", false)
    .neq("sender_id", user.id);

  if (error) {
    console.error(error);
    return 0;
  }

  return count || 0;
}