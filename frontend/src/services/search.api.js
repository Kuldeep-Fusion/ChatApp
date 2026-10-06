

// http://localhost:3000/api/users/search?search=kul

import api from "./api";


export const SearchUsers = async (search) => {
  return await api.get("/users/search", {
    params: {
      search,
    },
  });
};