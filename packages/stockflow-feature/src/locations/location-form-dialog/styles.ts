import * as AlertDialog from "@radix-ui/react-alert-dialog";
import * as Dialog from "@radix-ui/react-dialog";
import styled, { css } from "styled-components";

export const StyledOverlay = styled(Dialog.Overlay)`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.colors.text};
  opacity: 0.4;
  z-index: 50;
`;

export const StyledContent = styled(Dialog.Content)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: min(440px, calc(100vw - ${({ theme }) => theme.spacing(8)}));
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.spacing(8)};
  z-index: 51;
`;

export const StyledTitle = styled(Dialog.Title)`
  margin: 0 0 ${({ theme }) => theme.spacing(2)};
  font-size: 20px;
`;

export const StyledDescription = styled(Dialog.Description)`
  margin: 0 0 ${({ theme }) => theme.spacing(6)};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 14px;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
`;

export const StyledField = styled.label`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const fieldControlStyles = css<{ $hasError?: boolean }>`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing(2)} ${theme.spacing(3)}`};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  box-sizing: border-box;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  ${({ $hasError, theme }) =>
    $hasError &&
    css`
      border-color: ${theme.colors.danger};

      &:focus {
        border-color: ${theme.colors.danger};
      }
    `}
`;

export const StyledInput = styled.input<{ $hasError?: boolean }>`
  ${fieldControlStyles}
`;

export const StyledTextarea = styled.textarea<{ $hasError?: boolean }>`
  ${fieldControlStyles}
  min-height: 88px;
  resize: vertical;
`;

export const StyledFieldError = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.danger};
`;

export const StyledFormError = styled.div`
  padding: ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.danger};
  color: ${({ theme }) => theme.colors.danger};
  font-size: 14px;
`;

export const StyledFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
`;

export const StyledActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing(3)};
  margin-left: auto;
`;

export const StyledAlertOverlay = styled(AlertDialog.Overlay)`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.colors.text};
  opacity: 0.4;
  z-index: 60;
`;

export const StyledAlertContent = styled(AlertDialog.Content)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: min(400px, calc(100vw - ${({ theme }) => theme.spacing(8)}));
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.spacing(8)};
  z-index: 61;
`;

export const StyledAlertTitle = styled(AlertDialog.Title)`
  margin: 0 0 ${({ theme }) => theme.spacing(2)};
  font-size: 18px;
`;

export const StyledAlertDescription = styled(AlertDialog.Description)`
  margin: 0 0 ${({ theme }) => theme.spacing(6)};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 14px;
`;
