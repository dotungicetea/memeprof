"use client";

import {
  selectBackdropClickable,
  selectGlobalLockerVisible,
  selectHideGlobalLocker,
  selectLoadingText,
  useGlobalTheme,
} from "../../store/useGlobalTheme";
import GlobalLoader from "./GlobalLoader";

const GlobalLocker = () => {
  const globalLockerVisible = useGlobalTheme(selectGlobalLockerVisible);
  const backdropClickable = useGlobalTheme(selectBackdropClickable);
  const hideGlobalLocker = useGlobalTheme(selectHideGlobalLocker);
  const loadingText = useGlobalTheme(selectLoadingText);

  if (!globalLockerVisible) {
    return null;
  }

  return (
    <GlobalLoader
      title={loadingText}
      onBackdropClick={() => {
        if (backdropClickable) {
          hideGlobalLocker();
        }
      }}
    />
  );
};

export default GlobalLocker;
