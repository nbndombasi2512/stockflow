import { useQuery } from "@tanstack/react-query";
import { Button } from "stockflow-component";
import { formatQuantity } from "stockflow-helpers";
import styled from "styled-components";

const Page = styled.main`
  max-width: 720px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing(12)};
`;

const Card = styled.section`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.spacing(8)};
`;

const Title = styled.h1`
  margin: 0 0 ${({ theme }) => theme.spacing(2)};
  font-size: 24px;
`;

const Subtitle = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing(6)};
  color: ${({ theme }) => theme.colors.textMuted};
`;

interface InventorySummary {
  totalUnits: number;
}

/**
 * Placeholder landing screen that exercises the full stack of workspace
 * packages: a TanStack Query call, a styled-components layout, a shared Button,
 * and a helper from stockflow-helpers.
 */
export function HomeScreen() {
  const { data, isLoading } = useQuery<InventorySummary>({
    queryKey: ["inventory-summary"],
    queryFn: async () => ({ totalUnits: 12500 }),
  });

  return (
    <Page>
      <Card>
        <Title>StockFlow</Title>
        <Subtitle>
          Monorepo scaffold is live. This screen comes from{" "}
          <code>stockflow-feature</code>.
        </Subtitle>
        <p>
          Total units on hand:{" "}
          <strong>
            {isLoading ? "…" : formatQuantity(data?.totalUnits ?? 0, "units")}
          </strong>
        </p>
        <Button onClick={() => window.alert("Wired up!")}>Get started</Button>
      </Card>
    </Page>
  );
}
