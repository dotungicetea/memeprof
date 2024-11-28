import React from "react";

const LogoIcon = () => (
  <svg
    width="170"
    height="170"
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="100"
      cy="100"
      r="90"
      fill="#FF8C00"
      stroke="#b8860b"
      strokeWidth="5"
    />

    <circle cx="100" cy="100" r="75" fill="#f5deb3" />

    <defs>
      <clipPath id="coinClip">
        <circle cx="100" cy="100" r="70" />
      </clipPath>
    </defs>
    <image
      x="30"
      y="30"
      width="140"
      height="140"
      href="/assets/logos/logo2.png"
      clipPath="url(#coinClip)"
    />

    <circle
      cx="100"
      cy="100"
      r="70"
      stroke="#d4af37"
      strokeWidth="4"
      fill="none"
    />
    <circle
      cx="100"
      cy="100"
      r="80"
      stroke="#d4af37"
      strokeWidth="4"
      fill="none"
    />
  </svg>
);

export default LogoIcon;
