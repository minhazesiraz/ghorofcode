"use server";

import Blog from "@/models/Blog";
import User from "@/models/User";

// export async function getBlogs() {
//   const blogs = await Blog.find({ published: true })
//     .select([
//       "title",
//       "content",
//       "author",
//       "tags",
//       "published",
//       "thumbnail",
//       "slug",
//       "createdAt",
//     ])
//     .populate({
//       path: "author",
//       model: User,
//       select: ["firstName", "email", "avatar"],
//       match: { _id: { $ne: null } },
//     })
//     .lean();
//   //  .sort({ createdAt: -1 });

//   return blogs;
// }

// app/actions/getBlogs.js

export async function getBlogs({
  page = 1,
  limit = 5,
  search = "",
  category = "",
}) {
  //   await connectDB();

  const query = {};

  // Search only for title
  if (search) {
    query.title = { $regex: search, $options: "i" }; // Case-insensitive search
  }

  // Filter by category if provided
  if (category) {
    query.category = category;
  }

  const total = await Blog.countDocuments(query);
  const blogs = await Blog.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .populate({
      path: "author",
      model: User,
      select: ["firstName", "email", "avatar"],
      match: { _id: { $ne: null } },
    });
  // .lean()

  console.log("blogs", blogs);

  return { blogs: JSON.parse(JSON.stringify(blogs)), total };
}

export async function getBlogById(_id) {
  const blog = await Blog.findOne({ _id })
    .select([
      "title",
      "content",
      "author",
      "tags",
      "published",
      "thumbnail",
      "slug",
    ])
    .populate({
      path: "author",
      model: User,
      select: ["firstName", "email", "avatar"],
      match: { _id: { $ne: null } },
    })
    .lean();

  return blog;
}

// export async function getBlogBySlug(slug) {
//   const blog = await Blog.findOne({ slug, published: true })
//     .select([
//       "title",
//       "content",
//       "author",
//       "tags",
//       "published",
//       "thumbnail",
//       "slug",
//     ])
//     .populate({
//       path: "author",
//       model: User,
//       select: ["firstName", "email", "avatar"],
//       match: { _id: { $ne: null } },
//     })
//     .lean();

//   return blog;
// }

// export async function getBlogBySlug(slug) {
//   const blog = await Blog.findOne({ slug, published: true })
//     .select([
//       "title",
//       "content",
//       "author",
//       "tags",
//       "published",
//       "thumbnail",
//       "slug",
//     ])
//     .populate({
//       path: "author",
//       model: User,
//       select: ["firstName", "email", "avatar"],
//       match: { _id: { $ne: null } },
//     })
//     .lean();

//   // Ensure any complex objects like Buffer are serialized
//   if (blog) {
//     // Convert _id to string
//     blog._id = blog._id.toString();

//     // Check and convert avatar (if it's a Buffer)
//     if (blog.author && blog.author.avatar) {
//       blog.author.avatar = blog.author.avatar.toString(); // Convert Buffer to string if necessary
//     }
//   }

//   return blog;
// }

export async function getBlogBySlug(slug) {
  const blog = await Blog.findOne({ slug, published: true })
    .select([
      "title",
      "content",
      "author",
      "tags",
      "published",
      "thumbnail",
      "slug",
      "createdAt",
    ])
    .populate({
      path: "author",
      model: User,
      select: ["firstName", "email", "avatar"],
      match: { _id: { $ne: null } },
    })
    .lean();

  console.log("Fetched Blog:", blog); // Log the result for debugging

  return blog;
}
