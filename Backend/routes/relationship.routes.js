import express from "express";

import {
  sendFriendRequest,
  getFriendRequests,
  acceptFriendRequest,
  rejectFriendRequest,
  getFriends,
  removeFriend,
  getRejected,
  getPending,
  cancelFriendRequest,
} from "../Controller/relationship/relationship.controller.js";

import {AuthMiddleware} from "../middleware/auth.middleware.js";
import { getFriendById } from "../Controller/relationship/getFriendById.controller.js";

const router = express.Router();


// Send request
router.post(
  "/request/:id",
  AuthMiddleware,
  sendFriendRequest
);

// Received requests
router.get(
  "/requests",
  AuthMiddleware,
  getFriendRequests
);

// Friends list
router.get(
  "/friends",
  AuthMiddleware,
  getFriends
);

// Friends list
router.get(
  "/friend/:userId",
  AuthMiddleware,
  getFriendById
);

// Rejected Friends list
router.get(
  "/rejected",
  AuthMiddleware,
  getRejected
);

// Pending Friends list
router.get(
  "/pending",
  AuthMiddleware,
  getPending
);

// Accept request
router.patch(
  "/request/:id/accept",
  AuthMiddleware,
  acceptFriendRequest
);


// Reject request
router.patch(
  "/request/:relationshipId/reject",
  AuthMiddleware,
  rejectFriendRequest
);

//request reject
router.delete(
  "/request/:relationshipId",
  AuthMiddleware,
  cancelFriendRequest
);

// Remove friend
router.delete(
  "/friend/:friendId/delete",
  AuthMiddleware,
  removeFriend
);


export default router;