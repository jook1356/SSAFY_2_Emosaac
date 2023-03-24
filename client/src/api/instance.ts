import axios from "axios";

function getToken() {
  if (typeof window !== "undefined") {
    const information = localStorage.getItem("access_token");
    return `Bearer ${information}`;
  }
  return "";
}

function defaultInstace() {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
      "Content-Type": "application/JSON;charset=utf-8",
    },
  });

  instance.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  });

  return instance;
}

function defaultFormDataInstance() {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: { "Content-Type": "multipart/form-data" },
  });

  instance.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  });

  return instance;
}

export const defaultAxiosInstance = defaultInstace();
export const defaultAxiosFormDataInstance = defaultFormDataInstance();
