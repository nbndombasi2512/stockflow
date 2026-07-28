import { Spin } from "antd";
import type { ReactNode } from "react";

export interface LoadingProps {
  spinning?: boolean;
  tip?: string;
  size?: "small" | "default" | "large";
  children?: ReactNode;
}

export function Loading({
  spinning = true,
  tip,
  size = "default",
  children,
}: LoadingProps) {
  return (
    <Spin spinning={spinning} tip={tip} size={size} data-testid="loading">
      {children}
    </Spin>
  );
}
