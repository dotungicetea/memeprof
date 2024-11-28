import classnames from "classnames/bind";
import styles from "./prompt-field.module.scss";

import { Box } from "@/components/Box";
import { Divider } from "@/components/Divider";
import Icon from "@/components/Icon";
import IconButton from "@/components/IconButton";
import Paper from "@/components/Paper";
import { Typography } from "@/components/Typography";
import "keen-slider/keen-slider.min.css";
import { useIntl } from "react-intl";

const cn = classnames.bind(styles);

type Props = {
  inputRef: React.RefObject<HTMLTextAreaElement>;
};

const PromptField = ({ inputRef }: Props) => {
  const intl = useIntl();

  return (
    <Box className={cn("field-container")}>
      <Paper style={{}} className={cn("field")}>
        <div>
          <textarea
            rows={4}
            ref={inputRef}
            maxLength={150}
            className={cn("field__input")}
            placeholder={intl.formatMessage({ id: "promptFieldPlaceholder" })}
          />
        </div>

        <Box className={cn("field-actions")}>
          <div />
          <IconButton
            onClick={() => {
              if (inputRef.current) inputRef.current.value = "";
            }}
            icon="cancel"
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default PromptField;
