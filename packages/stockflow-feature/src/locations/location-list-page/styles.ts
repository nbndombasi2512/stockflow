import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledPage = styled.main`
  max-width: 820px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing(12)};
`;

export const StyledCard = styled.section`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.spacing(8)};
`;

export const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(4)};
  margin-bottom: ${({ theme }) => theme.spacing(6)};
`;

export const StyledTitle = styled.h1`
  margin: 0;
  font-size: 24px;
`;

export const StyledAddLocationLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spacing(2)} ${theme.spacing(4)}`};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.md};
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }
`;

export const StyledError = styled.div`
  padding: ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.danger};
  color: ${({ theme }) => theme.colors.danger};
  font-size: 14px;
`;
