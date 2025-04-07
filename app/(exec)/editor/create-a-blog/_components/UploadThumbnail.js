"use client";

import { uploadToImgBB } from "@/lib/uploadToImgBB";
import { useState } from "react";

export default function UploadThumbnail({ onUpload }) {
  const [uploading, setUploading] = useState(false);

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadToImgBB(file);
      onUpload(url);
    } catch (err) {
      alert("Upload failed");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleChange} />
      {uploading && <p>Uploading...</p>}
    </div>
  );
}
