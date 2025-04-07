"use client";

import { createBlog } from "@/app/actions/blogs"; // Adjust the import path as necessary
import Image from "next/image";
import { useState } from "react";

export default function CreateBlogPage() {
  const [loading, setLoading] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const apiKey = process.env.IMGBB_API_KEY;

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    if (thumbnailUrl) {
      formData.append("thumbnail", thumbnailUrl);
    }

    try {
      await createBlog(formData);
      alert("Blog created!");
    } catch (err) {
      alert("Error: " + err.message);
    }

    setLoading(false);
  }

  //   async function handleImageUpload(e) {
  //     const file = e.target.files[0];
  //     if (!file) return;

  //     const body = new FormData();
  //     body.append("image", file);

  //     const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
  //       method: "POST",
  //       body,
  //     });

  //     const data = await res.json();
  //     if (data?.data?.url) {
  //       setThumbnailUrl(data.data.url);
  //     }
  //   }

  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const body = new FormData();
    body.append("image", file);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=b4be52e3484e4c7ce2d5b349647b4c69`,
      {
        method: "POST",
        body,
      }
    );

    const data = await res.json();
    console.log("Upload Response:", data);

    if (data?.data?.url) {
      setThumbnailUrl(data.data.url);
      console.log("Thumbnail URL set:", data.data.url);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Blog title" required />
      <textarea name="content" placeholder="Write your blog..." required />

      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        required
      />
      {thumbnailUrl && (
        <Image src={thumbnailUrl} alt="Uploaded" width={200} height={200} />
      )}

      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Blog"}
      </button>
    </form>
  );
}
