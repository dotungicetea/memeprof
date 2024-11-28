import Jimp from "jimp";
import path from "path";

export type OverlayTextOnImageProps = {
  img: any;
  content: string | null;
  overlayPos?: "up" | "down";
  watermarkUrl?: string;
};

const topPadding = 30;
const textPaddingLeft = 30;
const textPaddingRight = 30;

const overlayTextOnImage = async ({
  img,
  content,
  overlayPos = "up",
  watermarkUrl = "watermark.png",
}: OverlayTextOnImageProps) => {
  try {
    const image = await Jimp.read(Buffer.from(img, "base64"));
    let font;

    try {
      const fontPath = path.join(process.cwd(), "public", "fonts", "lato.fnt");

      font = await Jimp.loadFont(fontPath);
    } catch (error) {
      console.error("Error occurred while loading font:", error);
      return null;
    }

    const newWidth = image.bitmap.width;
    const textBoxWidth = newWidth - textPaddingLeft - textPaddingRight;

    const textHeight = Jimp.measureTextHeight(font, content, textBoxWidth);
    const newHeight = image.bitmap.height + textHeight + topPadding;

    const newImage = new Jimp(newWidth, newHeight, 0xffffffff);

    if (overlayPos === "up") {
      newImage.composite(image, 0, textHeight + topPadding);
    } else {
      newImage.composite(image, 0, 0);
    }

    const watermarkPath = path.join(
      process.cwd(),
      "public",
      "images",
      watermarkUrl
    );
    const watermark = await Jimp.read(watermarkPath);
    watermark.resize(140, 140);

    const paddingX = 16;
    const paddingY = 16;

    if (overlayPos === "up") {
      const watermarkX = newWidth - watermark.bitmap.width - paddingX;
      const watermarkY = newHeight - watermark.bitmap.height - paddingY;
      newImage.composite(watermark, watermarkX, watermarkY);
    } else {
      newImage.composite(watermark, 10, 10);
    }

    newImage.print(
      font,
      overlayPos === "up" ? textPaddingLeft : 0,
      overlayPos === "up" ? 0 : newHeight - textHeight - topPadding,
      {
        text: content,
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
      },
      newWidth - textPaddingLeft - textPaddingRight
    );

    return newImage;
  } catch (error) {
    console.error("Error occurred while overlaying text on image:", error);
    return null;
  }
};

export { overlayTextOnImage };
