"use client";

import TouchRipple, {
  TouchRippleActions,
} from "@/components/TouchRipple/TouchRipple";
import useTouchRipple from "@/components/TouchRipple/useTouchRipple";
import * as Tabs from "@radix-ui/react-tabs";
import classNames from "classnames/bind";
import { FC, ReactNode, useRef } from "react";
import styles from "./steps.module.scss";

const cn = classNames.bind(styles);

type Props = {
  defaultValue?: string;
  options: {
    label: string;
    value: string;
    content: ReactNode;
    disabled?: boolean;
  }[];
  onChange?: (value: string) => void;
  step: string;
  disableRipple?: boolean;
};

const Steps: FC<Props> = ({
  step,
  onChange,
  options,
  defaultValue,
  disableRipple,
}) => {
  const rippleRef = useRef<TouchRippleActions>(null);

  const { enableTouchRipple, getRippleHandlers } = useTouchRipple({
    disabled: false,
    rippleRef,
    disableRipple,
    disableFocusRipple: disableRipple,
    disableTouchRipple: disableRipple,
  });

  return (
    <Tabs.Root
      value={step}
      defaultValue={defaultValue || options[0].value}
      orientation="horizontal"
      onValueChange={onChange}
      className={cn("steps__root")}
    >
      <Tabs.List className={cn("steps__list")}>
        {options.map((option) => (
          <Tabs.Trigger
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            className={cn("steps__trigger", {
              "steps__trigger--active": step === option.value,
            })}
            {...getRippleHandlers()}
          >
            {option.label}
            {enableTouchRipple ? (
              <TouchRipple center={false} ref={rippleRef} />
            ) : null}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {options.map((option) => (
        <Tabs.Content
          key={option.value}
          value={option.value}
          className={cn("steps__content")}
        >
          {option.content}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
};

export default Steps;
