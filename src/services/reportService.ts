import { supabase } from "../lib/supabase";

export async function submitReport(
  productId: string,
  reportedUserId: string,
  reason: string,
  details?: string
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in to report.");
  }

  const { error } = await supabase
    .from("reports")
    .insert({
      reporter_id: user.id,
      product_id: productId,
      reported_user_id: reportedUserId,
      reason,
      details: details || null,
    });

  if (error) {
    throw error;
  }
}
