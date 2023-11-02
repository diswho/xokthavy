import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/api/v1";

export const getPublicContent = () => {
  let data = {};
  // const head = authHeader();
  return axios.post(API_URL + "/test-token", data, {
    headers: authHeader(),
  });
};

export const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

export const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

export const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};
