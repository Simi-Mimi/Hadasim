import express from "express";
import commentsRouter from "./comments.js";
const router = express.Router();
router.use('/:postId/comments', commentsRouter);

export const posts = [{ id: 1, title: 'Hello' }];
export const comments = { 1: [] };

router.get("/", (req, res) => {
    res.json(posts);
  });


  
export default router;