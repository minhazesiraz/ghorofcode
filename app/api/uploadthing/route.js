import { ourFileRouter } from "@/lib/uploadToImgBB";
import { createUploadthingHandler } from "uploadthing/next";

export const { GET, POST } = createUploadthingHandler({
  router: ourFileRouter,
});
