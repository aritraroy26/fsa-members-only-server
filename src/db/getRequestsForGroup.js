import { db } from "./db";
import { getUser } from "./getUser";

export const getRequestsForGroup = async (groupId) => {
  const requests = await db
    .getConnection()
    .collection("requests")
    .find({ groupId })
    .toArray();

  const usersForRequests = await Promise.all(
    requests.map((request) => getUser(request.userId))
  );
  const populatedRequests = requests.map((request, index) => ({
    ...request,
    usernName: usersForRequests[index].fullName,
  }));

  return populatedRequests;
};
