import Icon from "@/components/Icon";
import { Typography } from "@/components/Typography";
import classNames from "classnames/bind";
import styles from "./snackbar.module.scss";
import { useSnackbar } from "./useSnackbar";

const cn = classNames.bind(styles);

const Snackbar = () => {
  const { message, visible, variant } = useSnackbar();

  if (!visible) return null;

  return (
    <div className={cn("snackbar")}>
      <div className={cn("snackbar__card")}>
        <Icon
          icon={variant === "success" ? "snackbarCheck" : "info"}
          className={cn("snackbar__icon", {
            "snackbar__icon--success": variant === "success",
            "snackbar__icon--info": variant === "info",
            "snackbar__icon--error": variant === "error",
          })}
          size="sm"
        />
        <Typography className={cn("snackbar__title")}>{message}</Typography>
      </div>
    </div>
  );
};

export default Snackbar;
