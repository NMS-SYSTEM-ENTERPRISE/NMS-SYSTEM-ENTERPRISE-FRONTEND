import clsx from "clsx";
import styles from "./styles.module.css";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(
        styles.button,
        styles[`button_${variant}`],
        styles[`button_${size}`],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };
