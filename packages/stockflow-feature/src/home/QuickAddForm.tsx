import { useForm } from "react-hook-form";
import { Button } from "stockflow-component";
import styled from "styled-components";
import type { InventoryItem } from "./types";

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  gap: ${({ theme }) => theme.spacing(3)};
  margin-bottom: ${({ theme }) => theme.spacing(6)};
`;

const Field = styled.label`
  display: flex;
  flex: 1 1 140px;
  min-width: 0;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const QuantityField = styled(Field)`
  flex: 0 1 110px;
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing(2)} ${theme.spacing(3)}`};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

interface QuickAddFormValues {
  sku: string;
  name: string;
  quantity: number;
}

export function QuickAddForm({
  onAdd,
}: {
  onAdd: (item: InventoryItem) => void;
}) {
  const { register, handleSubmit, reset } = useForm<QuickAddFormValues>({
    defaultValues: { sku: "", name: "", quantity: 0 },
  });

  const onSubmit = handleSubmit((values) => {
    onAdd({
      sku: values.sku.trim(),
      name: values.name.trim(),
      quantity: Number(values.quantity) || 0,
    });
    reset();
  });

  return (
    <Form onSubmit={onSubmit}>
      <Field>
        SKU
        <Input placeholder="SKU-001" {...register("sku", { required: true })} />
      </Field>
      <Field>
        Product
        <Input
          placeholder="Widget"
          {...register("name", { required: true })}
        />
      </Field>
      <QuantityField>
        Quantity
        <Input
          type="number"
          min={0}
          {...register("quantity", { valueAsNumber: true, min: 0 })}
        />
      </QuantityField>
      <Button type="submit">Add item</Button>
    </Form>
  );
}
