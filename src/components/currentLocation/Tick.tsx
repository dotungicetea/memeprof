import classNames from "classnames/bind";
import styles from "./Tick.module.scss";

const cn = classNames.bind(styles);

const Tick = () => {
  return (
    <svg
      className={cn("icon")}
      viewBox="0 0 26 26"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          className={cn("circle")}
          d="M13 1C6.372583 1 1 6.372583 1 13s5.372583 12 12 12 12-5.372583 12-12S19.627417 1 13 1z"
        />
        <path className={cn("tick")} d="M6.5 13.5L10 17 l8.808621-8.308621" />
      </g>
    </svg>
  );
};

export default Tick;
