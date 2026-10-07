import api from './api'

export  const AddFriend = (id) => api.post(`/relationship/request/${id}`);

export  const GetRequestList = () => api.get(`/relationship/requests`);
export  const GetPendingList = () => api.get(`/relationship/pending`);
// http://localhost:3000/api/relationship/request/6abea5ca3901130dba2ad207/reject
export  const GetRejected = () => api.get(`/relationship/rejected`);

export  const FriendList = () => api.get(`/relationship/friends`);

export  const GetSingleFriend = (id) => api.get(`/relationship/friend/${id}`);


// http://localhost:3000/api/relationship/request/6abea01cf3a200ebc974b0b8/accept

export  const AcceptRequest = (relationId) => api.patch(`/relationship/request/${relationId}/accept`);
export  const RequestDelete = (relationId) => api.delete(`/relationship/friend/${relationId}`);
export  const RejectRequest = (id) => api.patch(`/relationship/request/${id}/reject`);
export  const CancelRequest = (id) => api.delete(`/relationship/request/${id}`);
export  const RemoveFreind = (id) => api.delete(`/relationship/friend/${id}/delete`);  

