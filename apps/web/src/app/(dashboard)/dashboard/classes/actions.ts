"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabaseServer";
import { getSessionProfile } from "@/lib/getSessionProfile";

export async function createClass(formData: FormData): Promise<void> {
  const me = await getSessionProfile();
  if (!me || me.role !== "admin") {
    throw new Error("Unauthorized");
  }

  const supabase = await createClient();

  const title = String(formData.get("title") ?? "").trim();
  const slug = String(formData.get("slug") ?? "")
    .trim()
    .toLowerCase();
  const summary = String(formData.get("summary") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const cover_url = String(formData.get("cover_url") ?? "").trim() || null;
  const skill_level = String(formData.get("skill_level") ?? "").trim() || null;

// Dollars → cents
  const priceRaw = String(formData.get("price") ?? "").trim();
  let price_cents = 0;
  if (priceRaw !== "") {
    const priceNumber = Number(priceRaw);
    if (Number.isNaN(priceNumber) || priceNumber < 0) {
      throw new Error("Price must be a valid non-negative number.");
    }
    const normalized = Math.round(priceNumber * 100) / 100;
    price_cents = Math.round(normalized * 100);
  }

  const currency = String(formData.get("currency") ?? "CAD").toUpperCase();
  const capacity = Number(formData.get("capacity") ?? 0);
  const is_published = formData.get("is_published") === "on";

  const start_time = String(formData.get("start_time") ?? "").trim();
  const end_time = String(formData.get("end_time") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim() || null;
  const capacity_override_raw = String(
    formData.get("capacity_override") ?? ""
  ).trim();
  const capacity_override = capacity_override_raw
    ? Number(capacity_override_raw)
    : null;

  if (!title || !slug || !summary || !description) {
    throw new Error("Please fill all required fields.");
  }
  if (!capacity || capacity <= 0) {
    throw new Error("Capacity must be greater than zero.");
  }
  if (price_cents < 0) {
    throw new Error("Price cannot be negative.");
  }

  const { data: insertedClass, error: classError } = await supabase
    .from("classes")
    .insert({
      title,
      slug,
      summary,
      description,
      cover_url,
      skill_level,
      price_cents,
      currency,
      capacity,
      is_published,
      created_by: me.userId,
    })
    .select()
    .single();

  if (classError || !insertedClass) {
    console.error(classError);
    throw new Error("Could not create class.");
  }

  if (start_time && end_time) {
    const { error: sessionError } = await supabase
      .from("class_sessions")
      .insert({
        class_id: insertedClass.id,
        start_time,
        end_time,
        location,
        capacity_override,
      });

    if (sessionError) {
      console.error(sessionError);
      throw new Error("Class created, but failed to create first session.");
    }
  }

  revalidatePath("/dashboard/classes");
  revalidatePath("/classes");
  revalidatePath("/");
}


// ------------------ Delete Class ------------------ //
export async function deleteClass(formData: FormData): Promise<void> {
  const me = await getSessionProfile();
  if (!me || me.role !== "admin") {
    throw new Error("Unauthorized");
  }

  const id = String(formData.get("id") ?? "").trim();
  if (!id) {
    throw new Error("Missing class id.");
  }

  const supabase = await createClient();

  // Optional: if you have RLS, ensure policy allows admin/athlete or created_by == auth.uid()
  const { error } = await supabase.from("classes").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Failed to delete class.");
  }

  // Also clears from public list immediately
  revalidatePath("/dashboard/classes");
  revalidatePath("/classes");
  revalidatePath("/");
}


// ------------------ Update Class ------------------ //
export async function updateClass(formData: FormData): Promise<void> {
  const me = await getSessionProfile();
  if (!me || me.role !== "admin") {
    throw new Error("Unauthorized");
  }

  const id = String(formData.get("id") ?? "").trim();
  if (!id) throw new Error("Missing class id.");

  const title = String(formData.get("title") ?? "").trim();
  const slug = String(formData.get("slug") ?? "")
    .trim()
    .toLowerCase();
  const summary = String(formData.get("summary") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const cover_url = String(formData.get("cover_url") ?? "").trim() || null;
  const skill_level = String(formData.get("skill_level") ?? "").trim() || null;
  // Dollars → cents
  const priceRaw = String(formData.get("price") ?? "").trim();
  let price_cents = 0;
  if (priceRaw !== "") {
    const priceNumber = Number(priceRaw);
    if (Number.isNaN(priceNumber) || priceNumber < 0) {
      throw new Error("Price must be a valid non-negative number.");
    }
    const normalized = Math.round(priceNumber * 100) / 100;
    price_cents = Math.round(normalized * 100);
  }

  const currency = String(formData.get("currency") ?? "CAD").toUpperCase();
  const capacity = Number(formData.get("capacity") ?? 0);
  const is_published = formData.get("is_published") === "on";

  if (!title || !slug || !summary || !description) {
    throw new Error("Please fill all required fields.");
  }
  if (!capacity || capacity <= 0) {
    throw new Error("Capacity must be greater than zero.");
  }
  if (price_cents < 0) {
    throw new Error("Price cannot be negative.");
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("classes")
    .update({
      title,
      slug,
      summary,
      description,
      cover_url,
      skill_level,
      price_cents,
      currency,
      capacity,
      is_published,
    })
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Failed to update class.");
  }

  revalidatePath("/dashboard/classes");
  revalidatePath("/classes");
  revalidatePath("/");
}

