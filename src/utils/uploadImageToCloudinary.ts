export const uploadImageToCloudinary = async (file: any) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("cloud_name", process.env.NEXT_PUBLIC_Cloud_Name as string);
  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_UpLoad_presect as string
  );
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_Cloud_Name}/image/upload`,
    { method: "POST", body: formData }
  );
  const data = await res.json();
  return data?.url;
};
