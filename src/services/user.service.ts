import axios from "axios";

const api = axios.create({
   baseURL: "https://699212ce8f29113acd3d1c8b.mockapi.io/", 
});

export const getUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};