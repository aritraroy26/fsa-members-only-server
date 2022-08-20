import { db } from "./db";
import { getUser } from "./getUser";

export const getUserGroups = async (userId) => {
  const connection = db.getConnection();
  const groups = connection
    .collection("groups")
    .find({ members: userId })
    .toArray();
  const groupOwners = await Promise.all(
    groups.map((group) => getUser(group.ownerId))
  );
  const populatedGroups = groups.map((group, index) => ({
    ...group,
    owner: groupOwners[index],
  }));

  return populatedGroups;
};
