import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;

  th,
  td {
    text-align: left;
    padding: ${({ theme }) => `${theme.spacing(2)} ${theme.spacing(3)}`};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }

  th {
    color: ${({ theme }) => theme.colors.textMuted};
    font-weight: 600;
  }

  td:last-child,
  th:last-child {
    text-align: right;
  }
`;

export const StyledEmpty = styled.p`
  margin: ${({ theme }) => theme.spacing(4)} 0 0;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const StyledNotes = styled.span<{ $empty: boolean }>`
  ${({ $empty, theme }) =>
    $empty &&
    css`
      color: ${theme.colors.textMuted};
    `}
`;

export const StyledStatus = styled.span<{ $archived: boolean }>`
  ${({ $archived, theme }) =>
    $archived
      ? css`
          color: ${theme.colors.textMuted};
          font-weight: 600;
        `
      : css`
          color: ${theme.colors.text};
        `}
`;

export const StyledEditLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
