import classNames from "classnames/bind";
import styles from "./TripleDotLoader.module.scss";

const cn = classNames.bind(styles);

const TripleDotLoader = () => {
  return (
    <span role={"progressbar"}>
      <span className={cn("dot")}></span>
      <span className={cn("dot")}></span>
      <span className={cn("dot")}></span>
    </span>
  );
};

export default TripleDotLoader;
