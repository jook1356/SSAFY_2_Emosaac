import axios from "axios";

function getToken() {
  if (typeof window !== "undefined") {
    const information = localStorage.getItem("access_token");
    return `Bearer ${information}`;
  }
  return "";
}

function defaultInstace() {
  const token = getToken();
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
  const token = getToken();
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: { "Content-Type": "multipart/form-data", Authorization: token },
  });
  return instance;
}

// instance.interceptors.request.use((config) => {
//   const token = getToken();
//   if (token) {
//     config.headers["Authorization"] = token;
//   }
//   return config;
// });

// export default instance;
export const defaultAxiosInstance = defaultInstace();
export const defaultAxiosFormDataInstance = defaultFormDataInstance();
