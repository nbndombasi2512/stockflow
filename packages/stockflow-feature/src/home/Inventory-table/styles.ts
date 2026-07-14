import styled from "styled-components";

export const Table = styled.table`
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

export const Empty = styled.p`
  margin: ${({ theme }) => theme.spacing(4)} 0 0;
  color: ${({ theme }) => theme.colors.textMuted};
`;
