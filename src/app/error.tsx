"use client";

import BackButton from "@/components/BackButton";
import { Box } from "@/components/Box";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { report } from "./lib/report";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

const ErrorBoundaryGlobal = ({ error, reset }: Props) => {
  console.log("ErrorBoundaryGlobal", error);
  const router = useRouter();

  useEffect(() => {
    if (error.message) {
      report(
        `ErrorBoundaryGlobal: ${error.message} ${error.digest} ${error.stack}`
      );
    }
  }, [error]);

  return (
    <Box>
      <BackButton isBackable onClick={() => router.push("/menu")} />
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h1>Something went wrong</h1>
        <p>Try refreshing the page</p>

        <Card>{error.message}</Card>
        <Button onClick={() => reset()}>Reset</Button>
      </Box>
    </Box>
  );
};

export default ErrorBoundaryGlobal;
