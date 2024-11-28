import React from "react";
import Skeleton from "../Skeleton";
import styles from "./ProductSkeleton.module.scss";
import classNames from "classnames/bind";
const cn = classNames.bind(styles);

type Props = {};

const ProductSkeleton = (props: Props) => {
  return (
    <div className={cn("flex")}>
      <Skeleton height="200px" />
      <Skeleton height="200px" />
      <Skeleton height="200px" />
      <Skeleton height="200px" />
      <Skeleton height="200px" />
      <Skeleton height="200px" />
    </div>
  );
};

export default ProductSkeleton;
