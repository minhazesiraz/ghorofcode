import Blog from "@/models/Blog";
import User from "@/models/User";

export async function getBlogs() {
  const blogs = await Blog.find({ published: true })
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
  //  .sort({ createdAt: -1 });

  return blogs;
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
