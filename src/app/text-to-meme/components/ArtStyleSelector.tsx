"use client";

import Chip from "@/components/Chip";
import Paper from "@/components/Paper";
import { Typography } from "@/components/Typography";
import classNames from "classnames/bind";
import { useKeenSlider } from "keen-slider/react";
import { FC, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import styles from "./art-style-selector.module.scss";
import { StylePreset } from "./constants";

const cn = classNames.bind(styles);

type Props = {
  valueRef: React.MutableRefObject<StylePreset | null>;
};

const stylePresets = [
  StylePreset.ANALOG_FILM,
  StylePreset.ANIME,
  StylePreset.CINEMATIC,
  StylePreset.COMIC_BOOK,
  StylePreset.DIGITAL_ART,
  StylePreset.ENHANCE,
  StylePreset.FANTASY_ART,
  StylePreset.ISOMETRIC,
  StylePreset.LINE_ART,
  StylePreset.LOW_POLY,
  StylePreset.MODELING_COMPOUND,
  StylePreset.NEON_PUNK,
  StylePreset.ORIGAMI,
  StylePreset.PHOTOGRAPHIC,
  StylePreset.PIXEL_ART,
  StylePreset.TILE_TEXTURE,
];

const ArtStyleSelector: FC<Props> = ({ valueRef }) => {
  const [selected, setSelected] = useState<StylePreset | null>(null);
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 3,
      spacing: 15,
    },
  });

  useEffect(() => {
    if (selected) {
      valueRef.current = selected;
    }
  }, [selected, valueRef]);

  return (
    <Paper className={cn("selector")}>
      <Typography useSecondaryFont>
        <FormattedMessage id="artStyle" />
      </Typography>
      <div className={cn("keen-slider")} ref={sliderRef}>
        {stylePresets.map((preset) => {
          return (
            <div
              key={preset}
              className={cn("keen-slider__slide", "selector__item")}
            >
              <Chip
                className={cn("selector__item__chip")}
                isActive={selected === preset}
                onClick={() => {
                  setSelected(preset);
                }}
              >
                {preset}
              </Chip>
            </div>
          );
        })}
      </div>
    </Paper>
  );
};

export default ArtStyleSelector;
