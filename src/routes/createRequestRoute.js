import * as admin from "firebase-admin";
import { createJoinRequest } from "../db";

export const createRequestRoute = {
  method: "post",
  path: "/api/groups/:id/request",
  handler: async (req, res) => {
    const token = req.headers.authtoken;
    const groupId = req.params.id;

    const authUser = await admin.auth().verifyIdToken(token);
    if (!token || !authUser) {
      return res.status(401).json({ message: "User is not logged in" });
    }

    await createJoinRequest(groupId, authUser.user_id);
    res.status(200).json({ message: "Success!" });
  },
};
