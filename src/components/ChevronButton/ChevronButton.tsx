import styles from "./styles.module.css";
import classNames from "classnames";

type Props = {
  direction: "left" | "right";
  disabled?: boolean;
  onClick: () => void;
};

function ChevronButton({ direction, disabled = false, onClick }: Props) {
  return (
    <button
      className={classNames(styles.button, { [styles.disabled]: disabled })}
      onClick={onClick}
      disabled={disabled}
    >
      <svg
        className={direction === "left" ? undefined : styles.right}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M11.3535 0.979699C11.5488 1.17496 11.5488 1.49154 11.3535 1.68681L5.0404 7.99992L11.3535 14.313C11.5488 14.5083 11.5488 14.8249 11.3535 15.0201C11.1583 15.2154 10.8417 15.2154 10.6464 15.0201L4.3333 8.70703C3.94277 8.3165 3.94277 7.68334 4.3333 7.29281L10.6464 0.979699C10.8417 0.784436 11.1583 0.784436 11.3535 0.979699Z" />
      </svg>
    </button>
  );
}

export default ChevronButton;
