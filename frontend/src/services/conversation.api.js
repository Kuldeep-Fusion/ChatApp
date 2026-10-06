

import api from "./api";

// http://localhost:3000/api/chats/delete/6ac33cfd68c5850f08bae864
export  const DeleteConversation = (id) => api.delete(`/chats/delete/${id}`);
