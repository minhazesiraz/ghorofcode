import { getBlogBySlug } from "@/queries/blogs";

export default async function Blog({ params }) {
  //   const blog = await getBlogById(_id);
  const { slug } = await params;
  //   const slug = params?.slug;
  //   if (!slug) return <h1>Invalid blog slug</h1>;

  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return <h1>Blog not found</h1>;
  }

  console.log(blog);

  return (
    <>
      <h1>Hello, Blog Page!</h1>
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
      <p>Author: {blog.author?.firstName || "Unknown"}</p>
    </>
  );
}
