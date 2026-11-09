import express from "express";
import { posts, comments } from "./posts.js";

const router = express.Router({ mergeParams: true });

//middleware to check if post exists
router.use((req, res, next) => {
  const postId = Number(req.params.postId);

  const postExists = posts.some((post) => post.id === postId);

  if (!postExists) {
    return res.status(404).json({ message: "Post not found" });
  }
  next();
});


router.get("/", (req, res) => {
    const postId = req.params.postId;
    res.json(comments[postId] || []);
});

router.post("/", (req, res) => {
const postId = req.params.postId;
const newComment = {
    id: Date.now(),
    text: req.body.text
};
comments[postId].push(newComment);

res.status(201).json(newComment);
});


export default router;
