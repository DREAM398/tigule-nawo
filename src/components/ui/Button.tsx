import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary";
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

export default function Button({
  children,
  variant = "primary",
  type = "button",
  onClick,
  disabled = false,
}: ButtonProps) {
  const base =
    "rounded-xl px-8 py-3 font-semibold transition duration-300 disabled:cursor-not-allowed disabled:opacity-60";

  const styles = {
    primary:
      "bg-orange-500 text-white hover:bg-orange-600",

    secondary:
      "border-2 border-orange-500 text-orange-500 hover:bg-orange-100",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${styles[variant]}`}
    >
      {children}
    </button>
  );
}