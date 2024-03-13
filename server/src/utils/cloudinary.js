import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  console.log("Inside cloudinary local: ", localFilePath);

  try {
    if (!localFilePath) return null;
    //upload the file on cloudinary

    const response = await cloudinary.uploader.upload(localFilePath, {
      use_filename: true,
      resource_type: "auto",
    });

    //file has been uploaded successfully
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    //remove the locally saved temp file as the up[load operation got failed
    return null;
  }
};
const deleteFromCloudinary = async ( fileId ) => {
 try {
   const res = await cloudinary.uploader.destroy(fileId)
   console.log(res);
 } catch (error) {
  console.log("failed to remove oldAvatar ",error)
  
 }



}

export { uploadOnCloudinary, deleteFromCloudinary };
