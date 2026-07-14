import { Slot } from "@radix-ui/react-slot";
import type { ButtonHTMLAttributes } from "react";
import { StyledButton } from "./styles";

type Variant = "primary" | "secondary";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  /** Render as the child element (Radix Slot pattern), e.g. wrapping a link. */
  asChild?: boolean;
}

export function Button({
  variant = "primary",
  asChild = false,
  ...props
}: ButtonProps) {
  return (
    <StyledButton
      as={asChild ? Slot : "button"}
      $variant={variant}
      {...props}
    />
  );
}
