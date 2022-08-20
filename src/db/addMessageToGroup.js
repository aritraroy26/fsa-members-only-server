import { db } from "./db";
import { getGroup } from "./getGroup";
import { getMemberPopulatedGroup } from "./getMemberPopulatedGroup";
import { getOwnerPopulatedGroup } from "./getOwnerPopulatedGroup";

export const addMessageToGroup = async (groupId, userId, text) => {
  await db
    .getConnection()
    .collection("messages")
    .insertOne({ groupId, userId, text });

  const group = await getGroup(groupId);
  if (group.ownerId === userId) {
    return await getOwnerPopulatedGroup(groupId);
  }
  return await getMemberPopulatedGroup(groupId);
};
