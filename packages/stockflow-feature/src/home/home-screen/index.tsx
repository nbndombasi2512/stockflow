import { useMemo, useState } from "react";
import { formatQuantity } from "stockflow-helpers";
import { InventoryTable } from "../Inventory-table";
import { QuickAddForm } from "../Quick-add-form";
import type { InventoryItem } from "../types";
import { Page, Card, Title, Subtitle } from "./styles";   

export const SEED_ITEMS: InventoryItem[] = [
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
