import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/AsyncHandler";

const registerUser = asyncHandler((req, res, next) => {
  const { fullName, username, email, password } = req.body;

  if (!username) {
    throw new ApiError(403, "Username is required");
  }
  if (!email) {
    throw new ApiError(403, "Email is required");
  }
  if (!password) {
    throw new ApiError(403, "Username is required");
  }

  const isExistingUser = User.findOne({
    $or: [{ username }, { email }],
  });

  if( isExistingUser ){
    throw new ApiError( 409, "User with username or email already exists");
  }

  const avatarLocalPath = req.file.path;
  if( !avatarLocalPath ){
    throw new ApiError(400, "Avatar file is required");
  }

  
});
