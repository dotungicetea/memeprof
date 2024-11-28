import classNames from "classnames/bind";
import styles from "./SocialLinkInput.module.scss";
const cn = classNames.bind(styles);

type Props = {
  inputRef: React.RefObject<HTMLTextAreaElement>;
  placeholder: string;
};

const SocialLinkInput = ({ inputRef, placeholder }: Props) => (
  <div>
    <textarea
      ref={inputRef}
      className={cn("social__input")}
      placeholder={placeholder}
    />
  </div>
);

export { SocialLinkInput };
