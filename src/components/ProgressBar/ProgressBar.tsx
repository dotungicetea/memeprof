"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value?: number;
  bgColor?: string;
  gradientColor?: string;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(
  (
    {
      className,
      value,
      bgColor = "bg-secondary",
      gradientColor = "linear-gradient(to right, #a1df24, #a1df24)",
      ...props
    },
    ref
  ) => {
    return (
      <ProgressPrimitive.Root
        ref={ref}
        className={`relative h-[2px] w-full overflow-hidden rounded-full ${bgColor} ${className}`}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className="h-full w-full flex-1"
          style={{
            background: gradientColor,
            transform: `translateX(-${100 - (value || 0)}%)`,
            transition: "background 0.5s ease",
          }}
        />
      </ProgressPrimitive.Root>
    );
  }
);

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
