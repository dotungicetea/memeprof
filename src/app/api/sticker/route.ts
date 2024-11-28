import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { unzip } from "zlib";

export async function GET(req: NextRequest) {
  const stickerId = req.nextUrl.searchParams.get("id");

  try {
    const publicPath = path.join(process.cwd(), "public", "assets");
    const filePath = path.join(publicPath, "stickers", `${stickerId}.tgs`);

    const bufferRes = await fs.readFile(filePath);

    return await new Promise((resolve, reject) => {
      unzip(bufferRes, (err, buffer) => {
        if (err) {
          console.error(err);
          return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
          );
        }

        resolve(NextResponse.json(buffer.toString(), { status: 200 }));
      });
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
