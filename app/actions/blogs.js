"use server";

import { auth } from "@/auth"; // If using NextAuth
import Blog from "@/models/Blog";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export async function createBlog(formData) {
  const title = formData.get("title");
  const content = formData.get("content");
  const thumbnail = formData.get("thumbnail");

  if (!title || !content || !thumbnail) {
    throw new Error("All fields are required");
  }

  const slug = title.trim().toLowerCase().replace(/\s+/g, "-");

  const session = await auth();
  const userId = session?.user?.id || new ObjectId();

  await Blog.create({
    title,
    content,
    thumbnail,
    slug,
    published: true,
    author: userId,
  });

  revalidatePath("/blogs");
}
