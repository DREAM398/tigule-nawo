import { supabase } from "../lib/supabase";

export async function setTyping(
  conversationId: string,
  isTyping: boolean
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { error } = await supabase
    .from("typing_status")
    .upsert(
      {
        conversation_id: conversationId,
        user_id: user.id,
        is_typing: isTyping,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "conversation_id,user_id",
      }
    );

  if (error) throw error;
}