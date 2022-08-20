import { getAllGroupsRoute } from "./getAllGroupsRoute";
import { getUserGroupsRoute } from "./getUserGroupsRoute";
import { createRequestRoute } from "./createRequestRoute";
import { createGroupRoute } from "./createGroupRoute";
import { acceptRequestRoute } from "./acceptRequestRoute";
import { rejectRequestRoute } from "./rejectRequestRoute";
import { createMessageRoute } from "./createMessageRoute";
import { getGroupRoute } from "./getGroupRoute";

export const routes = [
  getAllGroupsRoute,
  getUserGroupsRoute,
  createRequestRoute,
  createGroupRoute,
  acceptRequestRoute,
  rejectRequestRoute,
  createMessageRoute,
  getGroupRoute,
];
