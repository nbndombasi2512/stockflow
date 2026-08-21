import { Loading } from "stockflow-component";
import { LocationTable } from "../location-table";
import { useLocationsQuery } from "../use-locations-query";
import {
  StyledAddLocationLink,
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

export const LocationListPage = () => {
  const { data, isPending, isError, error } = useLocationsQuery();
  const locations = data ?? [];
  const shouldShowTable = !isPending && !isError;

  return (
    <StyledPage data-testid="location-list-page">
      <StyledCard>
        <StyledHeader>
          <StyledTitle>Locations</StyledTitle>
          <StyledAddLocationLink
            to="/locations?create=1"
            data-testid="add-location"
          >
            Add location
          </StyledAddLocationLink>
        </StyledHeader>
        {isPending && <Loading tip="Loading locations" />}
        {isError && (
          <StyledError data-testid="location-list-error">
            {getQueryErrorMessage(error)}
          </StyledError>
        )}
        {shouldShowTable && <LocationTable locations={locations} />}
      </StyledCard>
    </StyledPage>
  );
};
