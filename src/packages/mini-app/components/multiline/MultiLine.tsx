"use client";

import classNames from "classnames";
import React from "react";

type Props = {
  disabled: boolean;
  inputRef: React.RefObject<HTMLTextAreaElement>;
};

// TODO
const MultiLine = ({ disabled, inputRef }: Props) => {
  return (
    <textarea
      rows={4}
      ref={inputRef}
      maxLength={150}
      disabled={disabled}
      className={classNames("field__input")}
      placeholder="Enter Prompt..."
    />
  );
};

export default MultiLine;
