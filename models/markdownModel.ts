import { Schema, model } from "mongoose";

export interface IMarkdown {
  title: String;
  text: String;
  createdAt: Date;
}
const markdownSchema = new Schema<IMarkdown>({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Markdown = model<IMarkdown>("Markdown", markdownSchema);
