import express from "express";
import * as markdownController from "../controllers/markdownController";

export const router = express.Router();

router.route("/").get(markdownController.getMarkdowns).post(markdownController.createMarkdown);
router
  .route("/:id")
  .get(markdownController.getMarkdown)
  .patch(markdownController.updateMarkdown)
  .delete(markdownController.deleteMarkdown);
