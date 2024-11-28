import { existsSync, promises } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { z } from "zod";

const formDataSchema = z.object({
  file: z.custom<File>((file) => file instanceof File),
  userId: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const userId = formData.get("userId");

    console.log("uploading image", userId, file?.name);

    const safeData = formDataSchema.safeParse({ file, userId });

    if (!safeData.success) {
      return NextResponse.json(
        { status: "fail", message: "No file found" },
        { status: 400 }
      );
    }

    const folderPath = path.join(
      process.cwd(),
      "public",
      "memes",
      safeData.data.userId
    );
    try {
      if (!existsSync(folderPath)) {
        await promises.mkdir(folderPath, { recursive: true });
      }

      await promises.writeFile(
        path.join(folderPath, "temp.png"),
        Buffer.from(await file.arrayBuffer())
      );

      return NextResponse.json({ status: "success", data: file.size });
    } catch (e) {
      console.error("error uploading image", e);
      return NextResponse.json({ status: "fail", data: e });
    }
  } catch (e) {
    console.error("error uploading image top", e);
    return NextResponse.json({ status: "fail", data: e });
  }
}
