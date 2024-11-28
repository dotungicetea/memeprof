import classNames from "classnames/bind";
import React from "react";
import Button from "../Button/Button";
import styles from "./CurrentLocation.module.scss";
import Tick from "./Tick";
import { getTelegram } from "@/utils";
import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";

const cn = classNames.bind(styles);

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

interface CurrentLocationProps<T extends FieldValues> {
  control: UseControllerProps<T>["control"];
  rules?: UseControllerProps<T>["rules"];
  name: UseControllerProps<T>["name"];
}

const CurrentLocation = <T extends FieldValues>({
  name,
  rules,
  control,
}: CurrentLocationProps<T>) => {
  const Telegram = getTelegram();
  const {
    field: { onChange, value },
    fieldState: { invalid, error },
  } = useController<T>({ name, rules, control });

  const successClb: PositionCallback = (pos) => {
    const crd = pos.coords;

    onChange({ lat: crd.latitude, lng: crd.longitude } as any);
  };

  const errorClb: PositionErrorCallback = (err) => {
    Telegram?.HapticFeedback?.notificationOccurred("error");
    Telegram?.showAlert("Please enable location services");
  };

  const handleClick = function () {
    Telegram?.HapticFeedback?.notificationOccurred("success");
    navigator.geolocation.getCurrentPosition(successClb, errorClb, options);
  };

  return (
    <div className={cn("field")}>
      <Button onClick={handleClick} className={cn("field__button")}>
        {value ? (
          <div className={cn("field__label")}>
            <Tick />
            <span className={cn("field__label-text")}>
              Location Detected Successfully
            </span>
          </div>
        ) : (
          "Detect Current Location"
        )}
      </Button>
      {invalid && <p className={cn("field__error")}>{error?.message}</p>}
    </div>
  );
};

export default CurrentLocation;
