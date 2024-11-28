"use client";

import { languageOptions } from "@/app/constants";
import FormGroup from "@/components/FormGroup";
import Paper from "@/components/Paper";
import RadioGroup from "@/components/RadioGroup/RadioGroup";
import { Locale, MessageIds } from "@/locale";
import classnames from "classnames/bind";
import { type FC } from "react";
import styles from "./LanguageFormGroup.module.scss";
const cn = classnames.bind(styles);

type LanguageFormGroupProps = {
  legend: MessageIds;
  defaultValue: Locale;
  onChange: (value: Locale) => void;
};

const LanguageFormGroup: FC<LanguageFormGroupProps> = ({
  legend,
  defaultValue,
  onChange,
}) => {
  return (
    <Paper>
      <FormGroup legend={legend} className={cn("legend")}>
        <RadioGroup
          defaultValue={defaultValue}
          onChange={onChange}
          options={languageOptions}
        />
      </FormGroup>
    </Paper>
  );
};

export default LanguageFormGroup;
