// "use client"; // This tells Next.js that this is a Client Component

// export default function BlogClient({ blog }) {
//   const currentUrl = typeof window !== "undefined" ? window.location.href : "";

//   return (
//     <>
//       <div className="overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200">
//         <figure>
//           <img
//             src={blog?.thumbnail || "https://picsum.photos/id/1081/800/600"}
//             alt="card image"
//             className="aspect-video w-full"
//           />
//         </figure>
//         <div className="p-6">
//           <header className="mb-4">
//             <h3 className="text-xl font-medium text-slate-700">{blog.title}</h3>
//             <p className="text-sm text-slate-400">By George, Jun 3 2023</p>
//           </header>
//           <p>
//             {blog.content.slice(0, 120)}...
//             <span className="text-slate-400">...</span>
//           </p>
//         </div>
//       </div>

//       <div className="p-6">
//         <button
//           onClick={() =>
//             window.open(
//               `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
//                 currentUrl
//               )}`,
//               "_blank"
//             )
//           }
//           className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
//         >
//           Share on Facebook
//         </button>
//       </div>
//     </>
//   );
// }

// "use client"; // This tells Next.js that this is a Client Component

// export default function BlogClient({ blog, metadata }) {
//   const handleShare = () => {
//     const { title, description, image, url } = metadata;

//     // Create the Facebook share URL with metadata
//     const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
//       url
//     )}&quote=${encodeURIComponent(description)}&title=${encodeURIComponent(
//       title
//     )}&picture=${encodeURIComponent(image)}`;

//     window.open(facebookShareUrl, "_blank");
//   };

//   return (
//     <>
//       <div className="overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200">
//         <figure>
//           <img
//             src={blog?.thumbnail || "https://picsum.photos/id/1081/800/600"}
//             alt="card image"
//             className="aspect-video w-full"
//           />
//         </figure>
//         <div className="p-6">
//           <header className="mb-4">
//             <h3 className="text-xl font-medium text-slate-700">{blog.title}</h3>
//             <p className="text-sm text-slate-400">
//               By {blog.author?.firstName || "Unknown"}
//             </p>
//           </header>
//           <p>
//             {blog.content.slice(0, 120)}...
//             <span className="text-slate-400">...</span>
//           </p>
//         </div>
//       </div>

//       <div className="p-6">
//         <button
//           onClick={handleShare}
//           className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
//         >
//           Share on Facebook
//         </button>
//       </div>
//     </>
//   );
// }
