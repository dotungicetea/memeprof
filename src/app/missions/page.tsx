import { Box } from "@/components/Box";
import classNames from "classnames/bind";
import Mission from "./components/Mission";
import styles from "./page.module.scss";
const cn = classNames.bind(styles);

const MissionPage = () => {
  return (
    <Box className={cn("missions")}>
      <Mission />
    </Box>
  );
};

export default MissionPage;
