import { GenerationResponse } from "@/types/generationResponse";
import { FetchMemesProps } from "@/utils/constant";
import axios from "axios";

enum Model {
  SD3 = "sd3",
  SD3_TURBO = "sd3-turbo",
}

//  3d-model analog-film anime cinematic comic-book digital-art enhance fantasy-art isometric line-art low-poly modeling-compound neon-punk origami photographic pixel-art tile-texture

enum StylePreset {
  ANALOG_FILM = "analog-film",
  ANIME = "anime",
  CINEMATIC = "cinematic",
  COMIC_BOOK = "comic-book",
  DIGITAL_ART = "digital-art",
  ENHANCE = "enhance",
  FANTASY_ART = "fantasy-art",
  ISOMETRIC = "isometric",
  LINE_ART = "line-art",
  LOW_POLY = "low-poly",
  MODELING_COMPOUND = "modeling-compound",
  NEON_PUNK = "neon-punk",
  ORIGAMI = "origami",
  PHOTOGRAPHIC = "photographic",
  PIXEL_ART = "pixel-art",
  TILE_TEXTURE = "tile-texture",
}

enum AspectRatio {
  _16_9 = "16:9",
  _1_1 = "1:1",
  _21_9 = "21:9",
  _2_3 = "2:3",
  _3_2 = "3:2",
  _4_5 = "4:5",
  _5_4 = "5:4",
  _9_16 = "9:16",
  _9_21 = "9:21",
}

const fetchMemes = async ({
  apiHost,
  stabilityKey,
  content,
  style,
}: FetchMemesProps & {
  style: Nullable<StylePreset>;
}) => {
  const formData = {
    prompt: `${content}`,
    output_format: "png",
    model: Model.SD3_TURBO,
    aspect_ratio: AspectRatio._4_5,
    ...(style && {
      style_preset: style,
    }),
  };

  const response = await axios.postForm<GenerationResponse>(
    `${apiHost}/v2beta/stable-image/generate/core`,
    axios.toFormData(formData, new FormData()),
    {
      validateStatus: undefined,
      responseType: "arraybuffer",
      headers: {
        Authorization: `Bearer ${stabilityKey}`,
        Accept: "image/*",
      },
    }
  );

  return response;
};

export { fetchMemes };
