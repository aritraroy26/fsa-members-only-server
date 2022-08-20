import * as admin from "firebase-admin";
import { getUserGroups } from "../db";

export const getUserGroupsRoute = {
  method: "get",
  path: "/api/users/:id/groups",
  handler: async (req, res) => {
    const token = req.headers.authtoken;
    const userId = req.params.id;

    const authUser = await admin.auth().verifyIdToken(token);
    if (authUser.user_id !== userId) {
      return res.status(401).json({ message: "Not authorised" });
    }

    const userGroups = await getUserGroups(userId);
    return res.status(200).json(userGroups);
  },
};
