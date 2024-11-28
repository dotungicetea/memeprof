"use client";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import React from "react";

function TonConnectUIProviderElement({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TonConnectUIProvider manifestUrl="/assets/tonconnect-manifest.json">
      {children}
    </TonConnectUIProvider>
  );
}

export default TonConnectUIProviderElement;
