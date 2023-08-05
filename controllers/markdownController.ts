import * as express from "express";
import catchAsync from "../utils/catchAsync";
import { Markdown } from "../models/markdownModel";
import AppError from "../utils/appError";

export const getMarkdowns = catchAsync(
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const markdowns = await Markdown.find();
    res.status(200).json({
      status: "success",
      results: markdowns.length,
      data: {
        markdowns,
      },
    });
  }
);
export const getMarkdown = catchAsync(
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const markdown = await Markdown.findById(req.params.id);
    if (!markdown) {
      return next(new AppError(`No markdown found with that id`, 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        markdown,
      },
    });
  }
);

export const createMarkdown = catchAsync(
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const newMarkdown = await Markdown.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        newMarkdown,
      },
    });
  }
);

export const updateMarkdown = catchAsync(
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const updateMarkdown = await Markdown.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        updateMarkdown,
      },
    });
  }
);
export const deleteMarkdown = catchAsync(
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    await Markdown.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  }
);
