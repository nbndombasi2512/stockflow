import styled, { css } from "styled-components";

type Variant = "primary" | "secondary";


export const StyledButton = styled.button<{ $variant: Variant }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => `${theme.spacing(2)} ${theme.spacing(4)}`};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid transparent;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;

  ${({ theme, $variant }) =>
    $variant === "primary"
      ? css`
          background: ${theme.colors.primary};
          color: #ffffff;

          &:hover {
            background: ${theme.colors.primaryHover};
          }
        `
      : css`
          background: ${theme.colors.surface};
          color: ${theme.colors.text};
          border-color: ${theme.colors.border};

          &:hover {
            background: ${theme.colors.background};
          }
        `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

