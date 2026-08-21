import { useLocation, useSearchParams } from "react-router-dom";
import { Loading } from "stockflow-component";
import { LocationFormDialog } from "../location-form-dialog";
import { LocationTable } from "../location-table";
import { useLocationsQuery } from "../use-locations-query";
import {
  StyledAddLocationLink,
  StyledCard,
  StyledError,
  StyledHeader,
  StyledNotice,
  StyledPage,
  StyledTitle,
} from "./styles";

export interface LocationListPageState {
  notice?: string;
}

const getQueryErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
};

export const LocationListPage = () => {
  const [searchParams] = useSearchParams();
  const routerLocation = useLocation();
  const notice = (routerLocation.state as LocationListPageState | null)?.notice;
  const { data, isPending, isError, error } = useLocationsQuery();
  const locations = data ?? [];
  const shouldShowTable = !isPending && !isError;
  const isCreate = searchParams.get("create") === "1";
  const editId = searchParams.get("edit") ?? undefined;
  const isDialogOpen = isCreate || Boolean(editId);
  const formMode = isCreate ? "create" : "edit";

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
        {notice && (
          <StyledNotice data-testid="location-list-notice">
            {notice}
          </StyledNotice>
        )}
        {isPending && <Loading tip="Loading locations" />}
        {isError && (
          <StyledError data-testid="location-list-error">
            {getQueryErrorMessage(error)}
          </StyledError>
        )}
        {shouldShowTable && <LocationTable locations={locations} />}
      </StyledCard>
      <LocationFormDialog
        open={isDialogOpen}
        mode={formMode}
        locationId={editId}
        locations={locations}
        isLocationsLoading={isPending}
      />
    </StyledPage>
  );
};
