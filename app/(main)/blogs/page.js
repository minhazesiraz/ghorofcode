// // import { getBlogs } from "@/queries/blogs";
// // import BlogsCard from "./_components/blogs-card";

// // const Blogs = async () => {
// //   const blogs = await getBlogs();
// //   console.log(blogs);
// //   return (
// //     <>
// //       <h1>Hello, Blog Post Page!</h1>
// //       {/* {blogs.map((blog) => (
// //         <div key={blog._id}>
// //           <h2>{blog.title}</h2>
// //           <p>{blog.content}</p>
// //           <p>Author: {blog.author?.firstName}</p>
// //           <p>Tags: {blog.tags.join(", ")}</p>
// //         </div>
// //       ))} */}
// //       {/* {blogs.map((blog) => (
// //         <BlogsCard key={blog._id} blog={blog} />
// //       ))} */}
// //       <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
// //         {blogs.map((blog) => (
// //           <BlogsCard key={blog._id} blog={blog} />
// //         ))}
// //       </div>
// //     </>
// //   );
// // };

// // export default Blogs;

// // app/blogs/page.jsx
// "use client";

// import { getBlogs } from "@/queries/blogs"; // Adjust the import path as necessary
// import { useEffect, useState } from "react";

// export default function BlogsPage() {
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("");
//   const [page, setPage] = useState(1);
//   const [blogs, setBlogs] = useState([]);
//   const [total, setTotal] = useState(0);
//   const limit = 5;

//   useEffect(() => {
//     const loadBlogs = async () => {
//       const res = await getBlogs({ page, limit, search, category });
//       setBlogs(res.blogs);
//       setTotal(res.total);
//     };
//     loadBlogs();
//   }, [page, search, category]);

//   const totalPages = Math.ceil(total / limit);

//   return (
//     <div className="p-4">
//       <div className="flex gap-2 mb-4">
//         <input
//           placeholder="Search..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="border px-2 py-1"
//         />
//         <select
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           className="border px-2 py-1"
//         >
//           <option value="">All Categories</option>
//           <option value="tech">Tech</option>
//           <option value="lifestyle">Lifestyle</option>
//           {/* Add more categories here */}
//         </select>
//         <button
//           onClick={() => setPage(1)}
//           className="bg-blue-500 text-white px-3 py-1"
//         >
//           Search
//         </button>
//       </div>

//       <ul>
//         {blogs.map((blog) => (
//           <li key={blog._id} className="mb-2">
//             <h2 className="font-bold text-lg">{blog.title}</h2>
//             <p>{blog.content.slice(0, 100)}...</p>
//           </li>
//         ))}
//       </ul>

//       <div className="mt-4 flex gap-2">
//         {Array.from({ length: totalPages }, (_, i) => (
//           <button
//             key={i}
//             onClick={() => setPage(i + 1)}
//             className={`px-3 py-1 border ${
//               page === i + 1 ? "bg-blue-500 text-white" : ""
//             }`}
//           >
//             {i + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";
import { getBlogs } from "@/queries/blogs"; // Adjust the import path as necessary
import { useEffect, useState } from "react";
import BlogsCard from "./_components/blogs-card";

export default function BlogsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [total, setTotal] = useState(0);
  const limit = 5;

  useEffect(() => {
    const loadBlogs = async () => {
      const res = await getBlogs({ page, limit, search, category });
      setBlogs(res.blogs);
      setTotal(res.total);
    };
    loadBlogs();
  }, [page, search, category]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-4">
      {/* Search and Filter */}
      <div className="flex gap-2 mb-4">
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-2 py-1"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-2 py-1"
        >
          <option value="">All Categories</option>
          <option value="tech">Tech</option>
          <option value="lifestyle">Lifestyle</option>
        </select>
        <button
          onClick={() => setPage(1)}
          className="bg-blue-500 text-white px-3 py-1"
        >
          Search
        </button>
      </div>

      {/* Blog List */}
      {/* <ul>
        {blogs.map((blog) => (
          <li key={blog._id} className="mb-2">
            <h2 className="font-bold text-lg">{blog.title}</h2>
            <p>{blog.content.slice(0, 100)}...</p>
          </li>
        ))}
      </ul> */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <BlogsCard key={blog._id} blog={blog} />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-center gap-2">
        {/* Prev Button */}
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 border bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          disabled={page === 1}
        >
          Prev
        </button>

        {/* Page Number Buttons */}
        {page > 3 && (
          <>
            <button
              onClick={() => setPage(1)}
              className="px-4 py-2 border hover:bg-gray-300"
            >
              1
            </button>
            <span className="px-2">...</span>
          </>
        )}
        {Array.from({ length: totalPages }, (_, i) =>
          (i + 1 >= page - 2 && i + 1 <= page + 2) ||
          i === 0 ||
          i === totalPages - 1 ? (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 border ${
                page === i + 1
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-300 bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ) : null
        )}
        {page < totalPages - 2 && (
          <>
            <span className="px-2">...</span>
            <button
              onClick={() => setPage(totalPages)}
              className="px-4 py-2 border hover:bg-gray-300"
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Next Button */}
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          className="px-4 py-2 border bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          disabled={page === totalPages}
        >
          Next
        </button>

        {/* Jump to Page Input */}
        <input
          type="number"
          min={1}
          max={totalPages}
          value={page}
          onChange={(e) =>
            setPage(Math.min(Math.max(1, e.target.value), totalPages))
          }
          className="px-2 py-1 border ml-2 w-16 text-center"
        />
      </div>
    </div>
  );
}
