// import { getBlogBySlug } from "@/queries/blogs";

// export default async function Blog({ params }) {
//   //   const blog = await getBlogById(_id);
//   const { slug } = await params;
//   //   const slug = params?.slug;
//   //   if (!slug) return <h1>Invalid blog slug</h1>;

//   const blog = await getBlogBySlug(slug);

//   if (!blog) {
//     return <h1>Blog not found</h1>;
//   }

//   console.log(blog);

//   //   const metadata = {
//   //     title: blog.title,
//   //     description: blog.content.slice(0, 160), // A brief description of the blog
//   //     image: blog?.thumbnail || "https://picsum.photos/id/1081/800/600", // Default image
//   //     url: typeof window !== "undefined" ? window.location.href : "", // Current page URL
//   //   };

//   //   const metadata = {
//   //     title: "Create Next App",
//   //     description: "Generated by create next app",
//   //   };

//   return (
//     //  <>
//     //    <h1>Hello, Blog Page!</h1>
//     //    <h1>{blog.title}</h1>
//     //    <p>{blog.content}</p>
//     //    <p>Author: {blog.author?.firstName || "Unknown"}</p>
//     //  </>
//     <>
//       {/*<!-- Component: Basic blog card --> */}
//       <div className="overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200">
//         {/*  <!-- Image --> */}
//         <figure>
//           <img
//             src={blog?.thumbnail || "https://picsum.photos/id/1081/800/600"}
//             alt="card image"
//             className="aspect-video w-full"
//           />
//         </figure>
//         {/*  <!-- Body--> */}
//         <div className="p-6">
//           <header className="mb-4">
//             <h3 className="text-xl font-medium text-slate-700">{blog.title}</h3>
//             {/* <p className="text-sm text-slate-400"> By George, jun 3 2023</p> */}
//             <p className="text-sm text-slate-400">
//               By {blog.author?.firstName || "Unknown"},{" "}
//               {new Date(blog?.createdAt).toLocaleDateString("en-US", {
//                 year: "numeric",
//                 month: "long", // "short" দিলে Apr হবে
//                 day: "numeric",
//               })}
//             </p>
//           </header>
//           <p>
//             {blog.content.slice(0, 120)}...
//             <span className="text-slate-400">...</span>
//           </p>
//         </div>
//       </div>
//       {/*<!-- End Basic blog card --> */}
//     </>
//   );
// }

// import { getBlogBySlug } from "@/queries/blogs";

// export async function generateMetadata({ params }) {
//   const blog = await getBlogBySlug(params.slug);

//   if (!blog) {
//     return {
//       title: "Blog not found",
//       description: "This blog does not exist or is no longer published.",
//     };
//   }

//   return {
//     title: blog.title,
//     description: blog.content.slice(0, 160),
//     openGraph: {
//       images: [blog?.thumbnail || "https://picsum.photos/id/1081/800/600"],
//     },
//   };
// }

import { getBlogBySlug } from "@/queries/blogs";
import Image from "next/image";

export async function generateMetadata({ params }) {
  const blog = await getBlogBySlug(params.slug);

  if (!blog) {
    return {
      title: "Blog not found",
      description: "This blog does not exist or is no longer published.",
    };
  }

  const title = blog.title;
  const description = blog.content.slice(0, 160);
  const image = blog.thumbnail || "https://picsum.photos/id/1081/800/600";
  const url = `https://yourdomain.com/blogs/${params.slug}`; // 🔁 update with your domain

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function Blog({ params }) {
  const { slug } = params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return <h1>Blog not found</h1>;
  }

  return (
    <div className="overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200">
      <figure>
        <Image
          width={800}
          height={600}
          src={blog?.thumbnail || "https://picsum.photos/id/1081/800/600"}
          alt="card image"
          className="aspect-video w-full"
        />
      </figure>
      <div className="p-6">
        <header className="mb-4">
          <h3 className="text-xl font-medium text-slate-700">{blog.title}</h3>
          <p className="text-sm text-slate-400">
            By {blog.author?.firstName || "Unknown"},{" "}
            {new Date(blog?.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </header>
        <p>
          {blog.content.slice(0, 120)}...
          <span className="text-slate-400">...</span>
        </p>
      </div>
      <div className="mt-4">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=https://ghor-of-code.vercel.app/blogs/${blog.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Share on Facebook
        </a>
      </div>
    </div>
  );
}
