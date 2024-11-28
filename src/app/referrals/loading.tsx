import Skeleton from "@/components/Skeleton";
import classnames from "classnames/bind";
import styles from "./loading.module.scss";
const cn = classnames.bind(styles);

const loading = () => {
  return (
    <div className={cn("loading")}>
      <Skeleton width="100%" height="60px" />
      <Skeleton width="100%" height="200px" />
      <Skeleton width="100%" height="60px" />
    </div>
  );
};

export default loading;
