import api from "./api";

export const Explore = async () =>  api.get("/users/explore");

export const GetSignle = async (id) => api.get(`/users/get/${id}`);

// update single user 
// http://localhost:3000/api/users/update/6abe1b9c2f41de0d1a7b6d4b
export const UpdateProfile = async (data) => api.put(`/users/update`, data);
export const UpdateAvatar = async (data) => api.put(`/users/update/profile`, data);