import { Cross2Icon } from "@radix-ui/react-icons";
import * as PopoverRadix from "@radix-ui/react-popover";
import { ReactNode } from "react";

import classNames from "classnames/bind";
import styles from "./popover.module.scss";

const cn = classNames.bind(styles);

const Popover = ({
  children,
  trigger,
}: {
  children: ReactNode;
  trigger: ReactNode;
}) => (
  <PopoverRadix.Root>
    <PopoverRadix.Trigger className={cn("popover__trigger")} asChild>
      {trigger}
    </PopoverRadix.Trigger>
    <PopoverRadix.Portal>
      <PopoverRadix.Content className={cn("popover__content")} sideOffset={5}>
        {children}
        <PopoverRadix.Close className={cn("popover__close")} aria-label="Close">
          <Cross2Icon />
        </PopoverRadix.Close>
        <PopoverRadix.Arrow className={cn("popover__arrow")} />
      </PopoverRadix.Content>
    </PopoverRadix.Portal>
  </PopoverRadix.Root>
);

export default Popover;
