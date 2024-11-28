"use client";

import classNames from "classnames/bind";
import { useRouter } from "next/navigation";
import { FormattedMessage } from "react-intl";
import BackButton from "../BackButton";
import { Typography } from "../Typography";
import styles from "./ComingSoon.module.scss";

const cn = classNames.bind(styles);

type CommingSoonProps = {};

const ComingSoon = (props: CommingSoonProps) => {
  const router = useRouter();

  return (
    <div className={cn("coming")}>
      <BackButton
        isBackable={true}
        onClick={() => {
          router.back();
        }}
      />
      <Typography variant="h1" className={cn("coming__title")}>
        <span className={cn("coming__title--mark")}>
          <FormattedMessage id="its" />
        </span>
        <br />
        <span>
          <FormattedMessage id="comingSoon" />
        </span>
      </Typography>
    </div>
  );
};

export default ComingSoon;
