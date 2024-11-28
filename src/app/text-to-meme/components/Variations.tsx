"use client";

import { Box } from "@/components/Box";
import Chip from "@/components/Chip";
import Icon from "@/components/Icon";
import Paper from "@/components/Paper";
import { Typography } from "@/components/Typography";
import classNames from "classnames/bind";
import { useState } from "react";
import styles from "./variations.module.scss";
import { FormattedMessage } from "react-intl";

const cn = classNames.bind(styles);

const Variations = () => {
  const [selected, setSelected] = useState<number>(1);

  return (
    <Paper className={cn("variations")}>
      <Typography useSecondaryFont>
        <FormattedMessage id="selectVariation" />
      </Typography>
      <Box className={cn("variations__list")}>
        <Chip
          isActive={selected === 1}
          className={cn("variations__item")}
          onClick={() => setSelected(1)}
        >
          <Typography useSecondaryFont>1</Typography>
        </Chip>
        <Chip
          className={cn("variations__item")}
          disabled
          isActive={selected === 2}
          onClick={() => setSelected(2)}
        >
          <Typography useSecondaryFont>2</Typography>
          <Icon icon="premium" color="cta" />
        </Chip>
        <Chip disabled className={cn("variations__item")}>
          <Typography useSecondaryFont>3</Typography>{" "}
          <Icon icon="premium" color="cta" />
        </Chip>
        <Chip disabled className={cn("variations__item")}>
          <Typography useSecondaryFont>4</Typography>{" "}
          <Icon icon="premium" color="cta" />
        </Chip>
      </Box>
    </Paper>
  );
};

export default Variations;
