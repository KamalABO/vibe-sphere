import { v2 as cloudinary } from "cloudinary";

// ✅ إعداد مفاتيح Cloudinary من env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// ✅ دالة لرفع الملفات من Buffer (صور / فيديوهات)
export async function uploadFile(fileBuffer: Buffer, folder: string = "uploads") {
  try {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder, resource_type: "auto" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(fileBuffer);
    });

    // @ts-ignore
    return (result as any).secure_url;
  } catch (error) {
    console.error("❌ Cloudinary upload error:", error);
    throw new Error("Upload failed");
  }
}
