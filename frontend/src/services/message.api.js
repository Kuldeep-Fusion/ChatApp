import api from "./api";


// http://localhost:3000/api/message/create/6abe1b9c2f41de0d1a7b6d4b
export const SendMessage = (receiverId, formData) =>
  api.post(`/message/create/${receiverId}`, formData);

// http://localhost:3000/api/message/update/6ac33dc168c5850f08bae869
export const UpdateMessage = (messageId, data) => api.put(`/message/update/${messageId}`, data);
export const DeleteSingleMessage = (id)=>  api.delete(`/message/delete/${id}`);
export const DeleteSingleMedia = (id) => api.delete(`/message/${id}/media`);


// http://localhost:3000/api/message/get/6abe1b9c2f41de0d1a7b6d4b

// ChatList from Single User
export const GetChatList = async (id) => api.get(`message/get/${id}`);
export const GetChatListAll = async () => api.get(`chats/get`);