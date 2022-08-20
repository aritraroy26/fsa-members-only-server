import * as admin from "firebase-admin";
import {
  getGroup,
  getMemberPopulatedGroup,
  getOwnerPopulatedGroup,
} from "../db";

export const getGroupRoute = {
  method: "get",
  path: "/api/groups/:id",
  handler: async (req, res) => {
    const token = req.headers.authtoken;
    const { id } = req.params;
    const authUser = await admin.auth().verifyIdToken(token);
    if (!authUser || !token) {
      return res.status(401).json({ message: "Must be logged in" });
    }
    const group = await getGroup(id);
    if (group.ownerId === authUser.user_id) {
      const ownerPopulatedGroup = await getOwnerPopulatedGroup(id);
      return res.status(200).json(ownerPopulatedGroup);
    }
    if (group.members.includes(authUser.user_id)) {
      const memberPopulatedGroup = await getMemberPopulatedGroup(id);
      return res.status(200).json(memberPopulatedGroup);
    }
    return res.status(200).json(group);
  },
};
