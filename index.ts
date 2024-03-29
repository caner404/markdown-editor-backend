import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import AppError from "./utils/appError";
import { globalErrHandler } from "./controllers/errorController";
import { router as markdownRouter } from "./routes/markdownRoutes";
import cors from "cors";

dotenv.config();

export const app: Express = express();
//1. Midldewares
//Middlware order in code is important .defines execution order -> needs be to always before othes routes
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// 3) Routers mouting

app.use("/api/v1/markdowns", markdownRouter);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrHandler);

//index.js mainly used for connecting our different middlewares
