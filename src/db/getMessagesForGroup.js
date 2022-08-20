import { db } from "./db";
import { getUser } from "./getUser";

export const getMessagesForGroup = async (groupId) => {
  const messages = await db
    .getConnection()
    .collection("messages")
    .find({ groupId })
    .toArray();

  const usersForMessages = await Promise.all(
    messages.map((message) => getUser(message.userId))
  );

  const populatedMessages = messages.map((message, index) => ({
    ...message,
    userName: usersForMessages[index].fullName,
  }));

  return populatedMessages;
};
