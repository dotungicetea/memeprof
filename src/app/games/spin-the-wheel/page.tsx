"use client";

import useBackButton from "@/components/BackButton/useBackButton";
import { Box } from "@/components/Box";
import { getTgUser } from "@/utils";
import { useRouter } from "next/navigation";

type Props = {};

const SpinTheWheelGamePage = (props: Props) => {
  const router = useRouter();
  const tgUser = getTgUser();

  useBackButton({
    isBackable: true,
    onClick: router.back,
  });

  return (
    <Box>
      <iframe
        title="spin wheel"
        style={{ width: "100%", height: "100vh", border: "none" }}
        src={`https://spinner.memeprof.com/?user_id=${tgUser?.user?.id}`}
      />
    </Box>
  );
};

export default SpinTheWheelGamePage;
