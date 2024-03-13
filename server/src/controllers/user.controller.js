import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";
import mongoose from "mongoose";

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
    avatarId: avatar.public_id,
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

const generateNewTokens = asyncHandler(async (req, res, next) => {
  const incomingRefreshToken = req.cookies?.refreshToken;
  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }
  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Inva;lid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
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

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          accessToken,
          refreshToken,
        },
        "Access token refreshed"
      )
    );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

const changeCurrentPassword = asyncHandler(async (req, res, next) => {
  const { oldPassword, newPassword, confPassword } = req.body;

  if (newPassword !== confPassword) {
    throw new ApiError(400, "Password didn't match");
  }
  const user = await User.findById(req.user._id);

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old password ");
  }

  user.password = newPassword;

  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

const changeEmail = asyncHandler(async (req, res, next) => {
  const { newEmail } = req.body;

  const isExistingUser = await User.findOne({ email: newEmail });

  if (isExistingUser) {
    throw new ApiError(400, "Email already registered");
  }

  const user = await User.findById(req.user._id);
  user.email = newEmail;

  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, { newEmail }, "Email changed successfully"));
});
const changeAvatar = asyncHandler(async (req, res, next) => {
  const avatarLocalPath = req?.file.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is missing");
  }

  const user = await User.findById(req.user._id);
  /*
    delete old avatar from cloudinary
    - fetch preivous avatar url and extract publicId from that.
    - use it to remove from cloudinary
  */
  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar) {
    return 400, "failed to upload image file";
  }

  await deleteFromCloudinary(user?.avatarId);

  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        avatar: avatar.url,
        avatarId: avatar.public_id,
      },
    },
    {
      new: true,
    }
  ).select("-password -refreshToken");

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { avatar: avatar.url, avatarId: avatar.public_id },
        "Avatar updated successfully"
      )
    );
});

const getCurrentUser = asyncHandler(async (req, res, next) => {
  console.log("User: ", req.user);

  return res.status(200).json(new ApiResponse(200, { user: req.user }, ""));
});

const getAllBudgets = asyncHandler(async (req, res, next) => {
  const data = await User.aggregate([
    {
      $match: { _id:new mongoose.Types.ObjectId(req.user._id) }, // Match the user by ID
    },
    {
      $lookup: {
        from: "budgets", // Assuming your budget model is named 'budgets'
        localField: "createdBudgets",
        foreignField: "_id",
        as: "budgets",
      },
    },
    {
      $unwind: "$budgets", // Unwind the budgets array
    },
    {
      $project: {
        category: "$budgets.category",
        budgetAmount: "$budgets.budgetAmount",
        spentAmount: "$budgets.spentAmount",
        remainingAmount: "$budgets.remainingAmount"
        // Include other fields you want from the budgets model
      },
    },
  ]);
  console.log("data ", data)


  return res.status(200).json(new ApiResponse(200, { data }, "budgets"))

  
});

const getRecentExpenses = asyncHandler( async(req,res, next) => {

  const data = await User.aggregate([
    {
      $match: { _id:new mongoose.Types.ObjectId(req.user._id) }, // Match the user by ID
    },
    {
      $lookup: {
        from: "expenses", // Assuming your budget model is named 'budgets'
        localField: "recentExpenses",
        foreignField: "_id",
        as: "expenses",
      },
    },
    {
      $unwind: "$expenses", // Unwind the budgets array
    },
    {
      $project: {
        category: "$expenses.category",
        paidAmount: "$expenses.paidAmount",
        date: "$expenses.date"
        
        // Include other fields you want from the budgets model
      },
    },
  ]);
  console.log("data ", data)

  return res.status(200).json( new ApiResponse(200, data, ""));

})

export {
  registerUser,
  loginUser,
  logoutUser,
  generateNewTokens,
  changeCurrentPassword,
  changeEmail,
  changeAvatar,
  getAllBudgets,
  getCurrentUser,
  getRecentExpenses
};
