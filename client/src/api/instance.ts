import axios from "axios";
const token =
  "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4IiwiaWF0IjoxNjc5MzU5MDQwLCJleHAiOjE2ODAyMjMwNDB9.5rJDelPFgBQRZclfOF5KE7teD-xIKTGyMkPEw7BQRJtETqM36wUqOaEnmNN12cIwz1drC9SOo03gLshlqGhuLw";
function defaultInstace() {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
      "Content-Type": "application/JSON;charset=utf-8",
      Authorization: token,
    },
  });
  return instance;
}
function defaultFormDataInstance() {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: { "Content-Type": "multipart/from-data", Authorization: token },
  });
  return instance;
}

export const defaultAxiosInstance = defaultInstace();
export const defaultAxiosFormDataInstance = defaultFormDataInstance();
