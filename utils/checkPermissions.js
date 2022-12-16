import CustomAPIError from "../errors/custom-api.js";
import { UnauthenticatedError } from "../errors/index.js";

const checkPermissions = (requestUser, resourceUserId) => {
  if (requestUser.userId === resourceUserId.toString()) return;
  throw new UnauthenticatedError("not authorized to access this route");
};

export default checkPermissions;
