import "styled-components";
import type { AppTheme } from "./theme";

// Module augmentation imported by index.ts so consuming packages also get a
// fully typed `theme` in their styled components.
declare module "styled-components" {
  export interface DefaultTheme extends AppTheme {}
}

export {};
