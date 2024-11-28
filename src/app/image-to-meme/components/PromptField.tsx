import classnames from "classnames/bind";
import styles from "./prompt-field.module.scss";

import { Box } from "@/components/Box";
import IconButton from "@/components/IconButton";
import Paper from "@/components/Paper";
import { FC } from "react";
import { useIntl } from "react-intl";

const cn = classnames.bind(styles);

type Props = {
  inputRef: React.RefObject<HTMLTextAreaElement>;
};

const PromptField: FC<Props> = ({ inputRef }) => {
  const intl = useIntl();

  return (
    <Box className={cn("field-container")}>
      <Paper style={{}} className={cn("field")}>
        <textarea
          rows={4}
          ref={inputRef}
          maxLength={150}
          className={cn("field__input")}
          placeholder={intl.formatMessage({ id: "promptFieldPlaceholder" })}
        />

        <Box className={cn("field-actions")}>
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
