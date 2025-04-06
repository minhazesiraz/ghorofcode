import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      // required: true,
    },
    content: {
      type: String,
      // required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
    tags: [String],
    published: {
      type: Boolean,
      default: false,
    },
    thumbnail: {
      type: String,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
export default Blog;
