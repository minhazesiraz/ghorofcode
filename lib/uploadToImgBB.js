export async function uploadToImgBB(file) {
  //   const apiKey = "b4be52e3484e4c7ce2d5b349647b4c69";
  const apiKey = process.env.IMGBB_API_KEY;
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (data.success) {
    return data.data.url; // This is the image URL
  } else {
    throw new Error("Image upload failed");
  }
}
