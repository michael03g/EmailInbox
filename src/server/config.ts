import dotenv from "dotenv";

dotenv.config();

export const DB_DATABASE=process.env.DB_DATABASE ?? "";
export const DB_USERNAME=process.env.DB_USERNAME ?? "";
export const DB_PASSWORD=process.env.DB_PASSWORD ?? "";
export const DB_HOST=process.env.DB_HOST ?? "";
export const DB_PORT=Number(process.env.DB_PORT);
export const USER_EMAIL=process.env.USER_EMAIL ?? "";
export const USER_NAME=process.env.USER_NAME ?? "";