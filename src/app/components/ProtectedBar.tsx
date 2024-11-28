"use client";

import { usePathname } from "next/navigation";
import BottomNavigation from "./bottom-navigation";

const exceptions = ["/memes", "/verification", "/games/"];

const ProtectedBar = () => {
  const pathname = usePathname();

  if (exceptions.some((exception) => pathname?.includes(exception))) {
    return null;
  }

  return <BottomNavigation />;
};

export default ProtectedBar;
