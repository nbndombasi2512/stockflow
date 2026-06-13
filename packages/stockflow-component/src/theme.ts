export const theme = {
  colors: {
    background: "#f5f6f8",
    surface: "#ffffff",
    border: "#e2e5ea",
    text: "#1c2430",
    textMuted: "#6b7280",
    primary: "#2563eb",
    primaryHover: "#1d4ed8",
    danger: "#dc2626",
  },
  radii: {
    sm: "4px",
    md: "8px",
    lg: "12px",
  },
  spacing: (multiplier: number) => `${multiplier * 4}px`,
} as const;

export type AppTheme = typeof theme;
