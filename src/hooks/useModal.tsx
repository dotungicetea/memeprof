"use client";

import Modal, { ModalProps } from "@webbot/components/Modal/Modal";
import React from "react";

export const useModal = () => {
  const [open, setOpen] = React.useState(false);

  const onToggle = (open: boolean) => setOpen(open);

  const show = () => setOpen(true);
  const hide = () => setOpen(false);

  const Component = (props: Omit<ModalProps, "open" | "onToggle">) => (
    <Modal {...props} open={open} onToggle={onToggle} />
  );

  return {
    open,
    onToggle,
    show,
    hide,
    Component,
  };
};
