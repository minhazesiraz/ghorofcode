// "use client";

import Link from "next/link";

export default function BlogsCard({ blog }) {
  return (
    <div className="overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200">
      {/* Image */}
      <figure>
        <img
          src={blog?.image || "https://picsum.photos/id/1081/800/600"}
          alt={blog?.title}
          className="aspect-video w-full object-cover"
        />
      </figure>

      {/* Body */}
      <div className="p-6">
        <header className="mb-4 flex gap-4 items-center">
          <div className="relative inline-flex h-12 w-12 items-center justify-center rounded-full overflow-hidden bg-slate-100">
            <img
              src={blog.author?.avatar || "https://i.pravatar.cc/48?img=25"}
              alt={blog.author?.firstName || "Author"}
              title={blog.author?.firstName || "Author"}
              width="48"
              height="48"
              className="max-w-full rounded-full"
            />
          </div>
          <div>
            <h3 className="text-xl font-medium text-slate-700">{blog.title}</h3>
            <p className="text-sm text-slate-400">
              By {blog.author?.firstName || "Unknown"},{" "}
              {new Date(blog.createdAt).toLocaleDateString() || ""}
            </p>
          </div>
        </header>

        <p className="text-slate-600">{blog.content.slice(0, 120)}...</p>
      </div>

      {/* Action Button */}
      <div className="flex justify-end gap-2 p-2 pt-0">
        <button className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded px-5 text-sm font-medium tracking-wide text-emerald-500 transition duration-300 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700">
          {/* <span>Read more</span> */}
          {/* <Link href={`/blogs/${blog._id}?blog=${blog.slug}`}>Read more</Link> */}
          <Link href={`/blogs/${blog.slug}`}>Read more</Link>
        </button>
      </div>
    </div>
  );
}
