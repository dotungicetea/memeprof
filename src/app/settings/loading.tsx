import Skeleton from "@/components/Skeleton";
import classnames from "classnames/bind";
import styles from "./loading.module.scss";
const cn = classnames.bind(styles);

const SettingsLoader = () => {
  return (
    <div className={cn("loading")}>
      <div className={cn("loading__general")}>
        <Skeleton width="100%" height="60px" />
        <Skeleton width="100%" height="60px" />
      </div>

      <div className={cn("loading__help")}>
        <Skeleton width="100%" height="60px" />
        <Skeleton width="100%" height="60px" />
        <Skeleton width="100%" height="60px" />
      </div>
    </div>
  );
};

export default SettingsLoader;
