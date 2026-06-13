/**
 * Formats a numeric quantity with thousands separators and an optional unit.
 * Used across inventory views to render on-hand counts consistently.
 */
export function formatQuantity(quantity: number, unit?: string): string {
  const formatted = new Intl.NumberFormat("en-US").format(quantity);
  return unit ? `${formatted} ${unit}` : formatted;
}
