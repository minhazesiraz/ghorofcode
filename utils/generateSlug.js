import Blog from "@/models/Blog";
import slugify from "slugify";

export async function generateUniqueSlug(title) {
  let baseSlug = slugify(title, { lower: true, strict: true });
  let uniqueSlug = baseSlug;
  let count = 1;

  // Check if slug already exists
  while (await Blog.exists({ slug: uniqueSlug })) {
    uniqueSlug = `${baseSlug}-${count++}`;
  }

  return uniqueSlug;
}
