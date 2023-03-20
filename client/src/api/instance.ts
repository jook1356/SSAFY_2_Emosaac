import axios from "axios";
const token =
  "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI2IiwiaWF0IjoxNjc4ODkyMzAzLCJleHAiOjE2Nzk3NTYzMDN9.TjRTWw-uPiccXjZdt0ZFDhQuVkiqRaLIYwBAC4nEVBd27NIxG2hzf3TjWx34zuEPrFwr0fUJbxNNs9wmWzfoPw";
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

export const defaultAxiosInstace = defaultInstace();
export const defaultAxiosFormDataInstance = defaultFormDataInstance();
