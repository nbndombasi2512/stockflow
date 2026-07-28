import { Button as AntButton } from "antd";
import type { ButtonProps as AntButtonProps } from "antd";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary";

export interface ButtonProps
  extends Omit<AntButtonProps, "type" | "htmlType" | "variant"> {
  variant?: Variant;
  /** Native HTML button type (mapped to antd `htmlType`). */
  type?: "button" | "submit" | "reset";
  children?: ReactNode;
}

const VARIANT_TO_ANT_TYPE = {
  primary: "primary",
  secondary: "default",
} as const;

export function Button({
  variant = "primary",
  type = "button",
  children,
  ...props
}: ButtonProps) {
  return (
    <AntButton
      type={VARIANT_TO_ANT_TYPE[variant]}
      htmlType={type}
      {...props}
    >
      {children}
    </AntButton>
  );
}
