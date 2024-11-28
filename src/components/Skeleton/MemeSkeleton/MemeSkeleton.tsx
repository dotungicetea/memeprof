import React from "react";
import Skeleton from "../Skeleton";
import styles from "./MemeSkeleton.module.scss";
import classNames from "classnames/bind";
const cn = classNames.bind(styles);

type Props = {};

const MemeSkeleton = (props: Props) => {
  return (
    <div className={cn("memeskeleton")}>
      <Skeleton
        height="500px"
        width="450px"
        className={cn("memeskeleton__image")}
      />

      <div className={cn("memeskeleton__buttons")}>
        <Skeleton
          height="50px"
          width="450px"
          className={cn("memeskeleton__btn")}
        />

        <div className={cn("memeskeleton__extra-buttons")}>
          <Skeleton
            height="50px"
            width="220px"
            className={cn("memeskeleton__btn")}
          />
          <Skeleton
            height="50px"
            width="220px"
            className={cn("memeskeleton__btn")}
          />
        </div>
      </div>
    </div>
  );
};

export default MemeSkeleton;
