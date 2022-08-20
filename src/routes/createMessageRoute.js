import { getGroup, addMessageToGroup, getMessagesForGroup } from "../db";
import * as admin from "firebase-admin";

export const createMessageRoute = {
  method: "post",
  path: "/api/groups/:id/messages",
  handler: async (req, res) => {
    const token = req.headers.authtoken;
    const { id } = req.params;
    const { text } = req.body;

    const authUser = await admin.auth().verifyIdToken(token);
    const group = await getGroup(id);

    if (!user || !group.members.includes(authUser.user_id)) {
      return res
        .status(401)
        .json({ message: "User cannnot post to this group" });
    }

    const updatedGroup = await addMessageToGroup(id, authUser.user_id, text);
    res.status(200).json(updatedGroup);
  },
};
