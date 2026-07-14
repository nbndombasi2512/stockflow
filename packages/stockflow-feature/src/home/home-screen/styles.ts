import styled from "styled-components";

export const Page = styled.main`
  max-width: 820px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing(12)};
`;

export const Card = styled.section`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.spacing(8)};
`;

export const Title = styled.h1`
  margin: 0 0 ${({ theme }) => theme.spacing(2)};
  font-size: 24px;
`;

export const Subtitle = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing(6)};
  color: ${({ theme }) => theme.colors.textMuted};
`;
