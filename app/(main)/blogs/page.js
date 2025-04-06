import { getBlogs } from "@/queries/blogs";
import BlogsCard from "./_components/blogs-card";

const Blogs = async () => {
  const blogs = await getBlogs();
  console.log(blogs);
  return (
    <>
      <h1>Hello, Blog Post Page!</h1>
      {/* {blogs.map((blog) => (
        <div key={blog._id}>
          <h2>{blog.title}</h2>
          <p>{blog.content}</p>
          <p>Author: {blog.author?.firstName}</p>
          <p>Tags: {blog.tags.join(", ")}</p>
        </div>
      ))} */}
      {/* {blogs.map((blog) => (
        <BlogsCard key={blog._id} blog={blog} />
      ))} */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <BlogsCard key={blog._id} blog={blog} />
        ))}
      </div>
    </>
  );
};

export default Blogs;
