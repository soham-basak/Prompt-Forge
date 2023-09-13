"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updatePromptAction(formData, id) {
  if (!id) return alert("Prompt Id not found.");

  const prompt = formData.get("prompt")?.toString();
  const tag = formData.get("tag")?.toString();

  try {
    if (!prompt || !tag) return;

    await fetch(`${process.env.NEXTAUTH_URI_INTERNAL}/api/prompt/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        prompt,
        tag,
      }),
    });

    revalidatePath("/");
  } catch (err) {
    console.log(err);
  } finally {
    redirect("/");
  }
}
