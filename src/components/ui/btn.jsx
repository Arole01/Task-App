import { cn } from "../../lib/utils";

const Btn = ({
  label,
  className,
  btnSize = "default",
  btnStyle = "primary",
  iconLeft,
  iconRight,
}) => {
  const sizes = {
    default: "py-2 px-1 rounded-sm",
    sm: "p-2 text-sm",
  };

  const style = {
    primary: "bg-blue-500 text-white",
    secondary: "border border-blue-500 text-blue-500",
  };

  return (
    <button
      type="button"
      className={cn(sizes[btnSize], className, style[btnStyle])}
    >
      {iconLeft && iconLeft}
      {label}
      {iconRight && iconRight}
    </button>
  );
};

export default Btn;
