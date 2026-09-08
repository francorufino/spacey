import { GridFSBucket, ObjectId } from "mongodb";
import getDatabase from "../../../data/mongodb";

export const dynamic = "force-dynamic";

export const GET = async (request, { params }) => {
  if (!ObjectId.isValid(params.id)) {
    return new Response("Image not found", { status: 404 });
  }

  try {
    const database = await getDatabase();

    if (!database) {
      return new Response("Database unavailable", { status: 503 });
    }

    const imageId = new ObjectId(params.id);
    const bucket = new GridFSBucket(database, {
      bucketName: "testimonialImages"
    });
    const files = await bucket.find({ _id: imageId }).limit(1).toArray();

    if (!files.length) {
      return new Response("Image not found", { status: 404 });
    }

    const imageChunks = [];

    for await (const chunk of bucket.openDownloadStream(imageId)) {
      imageChunks.push(chunk);
    }

    const image = Buffer.concat(imageChunks);

    return new Response(image, {
      headers: {
        "Content-Type": files[0].metadata?.contentType || "image/jpeg",
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    });
  } catch {
    return new Response("Image unavailable", { status: 500 });
  }
};
