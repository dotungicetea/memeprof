import Skeleton from "@/components/Skeleton";
import classnames from "classnames/bind";
import styles from "./loading.module.scss";
const cn = classnames.bind(styles);

const LanguageLoading = () => {
  return (
    <div className={cn("loading")}>
      <Skeleton width="100%" height="60px" />
      <Skeleton width="100%" height="60px" />
      <Skeleton width="100%" height="60px" />
      <Skeleton width="100%" height="60px" />
      <Skeleton width="100%" height="60px" />
      <Skeleton width="100%" height="60px" />
      <Skeleton width="100%" height="60px" />
      <Skeleton width="100%" height="60px" />
      <Skeleton width="100%" height="60px" />
    </div>
  );
};

export default LanguageLoading;
