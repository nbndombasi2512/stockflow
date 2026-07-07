import { useForm } from "react-hook-form";
import { Button } from "stockflow-component";
import styled from "styled-components";
import type { InventoryItem } from "../types";
import { Form, Field, QuantityField, Input } from "./styles";   

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
