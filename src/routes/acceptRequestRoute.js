import {
  acceptRequest,
  getRequest,
  getRequestsForGroup,
  getGroup,
} from "../db";
import * as admin from "firebase-admin";

export const acceptRequestRoute = {
  method: "post",
  path: "/api/requests/:requestId/accept",
  handler: async (req, res) => {
    const token = req.headers.authtoken;
    const authUser = await admin.auth().verifyIdToken(token);

    const { requestId } = req.params;
    const { groupId } = await getRequest(requestId);
    const group = await getGroup(groupId);

    if (!authUser || group.ownerId !== authUser.user_id) {
      return res.status(401).json({ message: "User is not group owner" });
    }

    await acceptRequest(requestId);
    const updatedRequests = await getRequestsForGroup(groupId);

    res.status(200).json(updatedRequests);
  },
};
