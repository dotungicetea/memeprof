import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

const accessKeyId = process.env.AMA_ACCESS_KEY_ID;
const secretAccessKey = process.env.AMA_SECRET_ACCESS_KEY;

const uploadImage = async (userId: string, combinedImageBuffer: any) => {
  console.log("Uploading image", userId);

  const parallelUploads3 = new Upload({
    client: new S3Client({
      credentials: {
        accessKeyId: accessKeyId!,
        secretAccessKey: secretAccessKey!,
      },
      endpoint: "https://sgp1.digitaloceanspaces.com",
      forcePathStyle: false,
      region: "sgp1",
    }),

    params: {
      ACL: "public-read",
      Bucket: "memes",
      Key: `${userId}-${Date.now()}.png`,
      Body: combinedImageBuffer,
    },

    tags: [
      /*...*/
    ], // optional tags
    queueSize: 4, // optional concurrency configuration
    partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
    leavePartsOnError: false, // optional manually handle dropped parts
  });

  parallelUploads3.on("httpUploadProgress", (progress) => {
    console.log("uploadprogres", progress);
  });

  const data = await parallelUploads3.done();

  return data.Location;
};

export { uploadImage };
