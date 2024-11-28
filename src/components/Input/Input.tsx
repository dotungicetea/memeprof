import { genuid } from "@webbot/utils";
import classNames from "classnames/bind";
import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";
import styles from "./Input.module.scss";

const cn = classNames.bind(styles);

interface InputProps<T extends FieldValues> {
  type?: string;
  label: string;
  disabled?: boolean;
  className?: string;
  name: UseControllerProps<T>["name"];
  control: UseControllerProps<T>["control"];
  rules?: UseControllerProps<T>["rules"];
  required?: boolean;
  multiline?: boolean;
  divider?: boolean;
}

const Input = <T extends FieldValues>({
  name,
  type,
  label,
  rules,
  control,
  divider,
  required,
  disabled,
  className,
  multiline,
}: InputProps<T>) => {
  const {
    field,
    fieldState: { invalid, error },
  } = useController({
    control,
    name,
    rules,
  });

  if (multiline) {
    return (
      <div className={cn("field")}>
        <textarea
          className={cn("field__input", className, {
            "field__input--divider": divider,
          })}
          disabled={disabled}
          placeholder={label}
          autoComplete={genuid()}
          {...field}
        />
        {invalid && <p className={cn("field__error")}>{error?.message}</p>}
      </div>
    );
  }

  return (
    <div className={cn("field")}>
      <input
        className={cn("field__input", className, {
          "field__input--divider": divider,
        })}
        type={type}
        disabled={disabled}
        placeholder={label}
        autoComplete={genuid()}
        {...field}
      />
      {/* {invalid && <p className={cn("field__error")}>{error?.message}</p>} */}
    </div>
  );
};

export default Input;
