import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};

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

  if (isExistingUser) {
    throw new ApiError(409, "User with username or email already exists");
  }

  const avatarLocalPath = req.file.path;

  console.log("file path: ", avatarLocalPath);

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

const loginUser = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const { userId, password } = req.body;

  if (!userId) {
    throw new ApiError(400, "username or email is required");
  }

  const user = await User.findOne({
    $or: [{ username: userId }, { email: userId }],
  });

  if (!user) {
    throw new ApiError(404, "User doesn't exist");
  }

  if (!password) {
    throw new ApiError(400, "Password is required");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid password");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000, //1day
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, loggedInUser, "User logged in successfully"));
});

const logoutUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: { refreshToken: 1 },
    },
    {
      new: true,
    }
  );

  res.clearCookie("accessToken", {
    httpOnly: true,
    sameSite: "strict",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "strict",
  });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "User successfully logged out"));
});

export { registerUser, loginUser, logoutUser };
