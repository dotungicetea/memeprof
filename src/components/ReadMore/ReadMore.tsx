import { FC, useState } from "react";

import HTMLEllipsis from "react-lines-ellipsis/lib/html";
import styles from "./ReadMore.module.scss";
import classNames from "classnames/bind";

const cn = classNames.bind(styles);

type ReadMoreProps = {
  text: string;
  maxLines?: number;
};

const ReadMore: FC<ReadMoreProps> = ({ text, maxLines = 2 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleTextClick = () => {
    setIsExpanded(!isExpanded);
  };

  if (isExpanded)
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: text,
        }}
      ></div>
    );

  return (
    <div onClick={handleTextClick} className={cn("read-more")}>
      <HTMLEllipsis
        className={cn("read-more__text")}
        unsafeHTML={text}
        maxLine={maxLines}
        ellipsis="... show more"
      />
    </div>
  );
};

export default ReadMore;
