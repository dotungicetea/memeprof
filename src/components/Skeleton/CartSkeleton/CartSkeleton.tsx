import React from "react";
import classNames from "classnames/bind";
import styles from "./CartSkeleton.module.scss";
import Skeleton from "../Skeleton";

const cn = classNames.bind(styles);

type Props = {};

const CartSkeleton = (props: Props) => {
  return (
    <div className={cn("flex")}>
      <Skeleton height="100px" />
      <Skeleton height="100px" />
      <div className={cn("flex-column")}>
        <Skeleton width="6%" height="20px" borderRadius="100%" />
        <Skeleton width="60%" height="20px" />
      </div>
      <div className={cn("flex-column")}>
        <Skeleton width="6%" height="20px" borderRadius="100%" />
        <Skeleton width="40%" height="20px" />
      </div>
    </div>
  );
};

export default CartSkeleton;
