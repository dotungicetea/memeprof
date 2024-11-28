import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import TouchRipple, {
  TouchRippleActions,
} from "@/components/TouchRipple/TouchRipple";
import useTouchRipple from "@/components/TouchRipple/useTouchRipple";
import classNames from "classnames/bind";
import styles from "./action-button.module.scss";
import { Box } from "@/components/Box";
import TripleDotLoader from "@/components/TripleDotLoader";

const cn = classNames.bind(styles);

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        outline: "border border-input bg-background ",
        secondary: "bg-secondary text-secondary-foreground",
        link: "text-primary underline-offset-4",
      },
      size: {
        default: "px-4 py-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isFixed?: boolean;
  isLoading?: boolean;
}

const ActionButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isFixed = true,
      isLoading,
      ...props
    },
    ref
  ) => {
    const rippleRef = React.useRef<TouchRippleActions>(null);

    const { enableTouchRipple, getRippleHandlers } = useTouchRipple({
      disabled: false,
      rippleRef,
      disableRipple: isLoading,
    });

    const Comp = asChild ? Slot : "button";
    return (
      <Box
        className={cn("btn__wrapper", {
          "btn--fixed": isFixed,
        })}
      >
        <Comp
          {...getRippleHandlers()}
          className={cn("btn", buttonVariants({ variant, size, className }), {
            "btn--disabled": props.disabled,
          })}
          ref={ref}
          {...props}
        >
          {isLoading ? <TripleDotLoader /> : props.children}

          {enableTouchRipple ? (
            <TouchRipple center={false} ref={rippleRef} />
          ) : null}
        </Comp>
      </Box>
    );
  }
);
ActionButton.displayName = "Button";

export { ActionButton, buttonVariants };
