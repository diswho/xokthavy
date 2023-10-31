import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/api/v1";

export const getPublicContent = () => {
  if(authHeader())
    return axios.post(API_URL + "/test-token", { headers: authHeader() });
  else
    throw new Error("authHeader");
    
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