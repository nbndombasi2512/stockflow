import { Loading } from "stockflow-component";
import { ProductTable } from "../product-table";
import { useProductsQuery } from "../use-products-query";
import {
  StyledAddProductLink,
  StyledCard,
  StyledError,
  StyledHeader,
  StyledPage,
  StyledTitle,
} from "./styles";

const getQueryErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
};

export const ProductListPage = () => {
  const { data, isPending, isError, error } = useProductsQuery();
  const products = data ?? [];
  const shouldShowTable = !isPending && !isError;

  return (
    <StyledPage data-testid="product-list-page">
      <StyledCard>
        <StyledHeader>
          <StyledTitle>Products</StyledTitle>
          <StyledAddProductLink
            to="/products?create=1"
            data-testid="add-product"
          >
            Add product
          </StyledAddProductLink>
        </StyledHeader>
        {isPending && <Loading tip="Loading products" />}
        {isError && (
          <StyledError data-testid="product-list-error">
            {getQueryErrorMessage(error)}
          </StyledError>
        )}
        {shouldShowTable && <ProductTable products={products} />}
      </StyledCard>
    </StyledPage>
  );
};
