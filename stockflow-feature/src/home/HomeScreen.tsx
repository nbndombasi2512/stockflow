import { useMemo, useState } from "react";
import { formatQuantity } from "stockflow-helpers";
import styled from "styled-components";
import { InventoryTable } from "./InventoryTable";
import { QuickAddForm } from "./QuickAddForm";
import type { InventoryItem } from "./types";

const Page = styled.main`
  max-width: 820px;
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

const SEED_ITEMS: InventoryItem[] = [
  { sku: "SKU-001", name: "Pallet jack", quantity: 12 },
  { sku: "SKU-002", name: "Shipping box (L)", quantity: 4200 },
];

/**
 * Placeholder landing screen that exercises every core frontend library:
 * styled-components layout, a shared Radix-backed Button (via QuickAddForm),
 * react-hook-form (QuickAddForm), @tanstack/react-table (InventoryTable), and a
 * helper from stockflow-helpers.
 */
export function HomeScreen() {
  const [items, setItems] = useState<InventoryItem[]>(SEED_ITEMS);

  const totalUnits = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

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
          <strong>{formatQuantity(totalUnits, "units")}</strong>
        </p>
        <QuickAddForm onAdd={(item) => setItems((prev) => [...prev, item])} />
        <InventoryTable items={items} />
      </Card>
    </Page>
  );
}
