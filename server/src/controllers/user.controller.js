import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res, next) => {
  const { fullName, username, email, password } = req.body;

  console.log(req.body);
  if (!username) {
    throw new ApiError(403, "Username is required");
  }
  if (!email) {
    throw new ApiError(403, "Email is required");
  }
  if (!password) {
    throw new ApiError(403, "Username is required");
  }

  const isExistingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if ( isExistingUser) {
    throw new ApiError(409, "User with username or email already exists");
  }

  const avatarLocalPath = req.file.path;

  console.log("file path: ", avatarLocalPath)

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  console.log(avatar);

  if (!avatar) {
    throw new ApiError(500, "Failed to upload avatar");
  }

  const user = await User.create({
    fullName: fullName || "",
    username: username.toLowerCase(),
    avatar: avatar.url,
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

const loginUser = asyncHandler(async( req, res, next) => {
  const { userId, password} = req.body;

  if(!userId){
    throw new ApiError(400, "username or email is required");
  }

  const user = await User.findOne({
    $or: [ { username:userId }, { email : userId}]
  })

  if(!password){
    throw new ApiError(400, "Password is required");
  }

})


export {
  registerUser,
  loginUser
}