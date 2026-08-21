import * as AlertDialog from "@radix-ui/react-alert-dialog";
import * as Dialog from "@radix-ui/react-dialog";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, Loading } from "stockflow-component";
import { ApiError } from "stockflow-helpers";
import type { Location } from "../types";
import { useCreateLocationMutation } from "../use-create-location-mutation";
import { useUpdateLocationMutation } from "../use-update-location-mutation";
import {
  StyledActions,
  StyledAlertContent,
  StyledAlertDescription,
  StyledAlertOverlay,
  StyledAlertTitle,
  StyledContent,
  StyledDescription,
  StyledField,
  StyledFieldError,
  StyledFooter,
  StyledForm,
  StyledFormError,
  StyledInput,
  StyledOverlay,
  StyledTextarea,
  StyledTitle,
} from "./styles";

export type LocationFormMode = "create" | "edit";

export interface LocationFormValues {
  name: string;
  notes: string;
}

export interface LocationFormDialogProps {
  open: boolean;
  mode: LocationFormMode;
  locationId?: string;
  locations: Location[];
  isLocationsLoading: boolean;
}

const getMutationErrorMessage = (error: unknown): string => {
  if (error instanceof ApiError) {
    return error.message || "Something went wrong. Please try again.";
  }

  return "Something went wrong. Please try again.";
};

export const LocationFormDialog = ({
  open,
  mode,
  locationId,
  locations,
  isLocationsLoading,
}: LocationFormDialogProps) => {
  const navigate = useNavigate();
  const createMutation = useCreateLocationMutation();
  const updateMutation = useUpdateLocationMutation();
  const isCreate = mode === "create";
  const location = locations.find((item) => item.id === locationId);
  const shouldShowArchive =
    !isCreate && Boolean(location) && !location?.archived;
  const isSaving = createMutation.isPending || updateMutation.isPending;
  const mutationError = isCreate ? createMutation.error : updateMutation.error;
  const serverError = (
    isCreate ? createMutation.isError : updateMutation.isError
  )
    ? getMutationErrorMessage(mutationError)
    : undefined;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LocationFormValues>({
    defaultValues: { name: "", notes: "" },
  });

  useEffect(() => {
    if (isCreate) {
      reset({ name: "", notes: "" });
      return;
    }

    if (location) {
      reset({
        name: location.name,
        notes: location.notes ?? "",
      });
    }
  }, [isCreate, location, reset]);

  const closeToList = () => {
    navigate("/locations");
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      closeToList();
    }
  };

  const onSubmit = handleSubmit((values) => {
    const name = values.name.trim();
    const notes = values.notes.trim();

    if (isCreate) {
      createMutation.mutate(
        {
          name,
          notes: notes || undefined,
        },
        {
          onSuccess: () => {
            navigate("/locations", {
              replace: true,
              state: { notice: "Location created." },
            });
          },
        },
      );
      return;
    }

    if (!location) {
      return;
    }

    updateMutation.mutate(
      {
        id: location.id,
        name,
        notes,
      },
      {
        onSuccess: () => {
          navigate("/locations", {
            replace: true,
            state: { notice: "Location updated." },
          });
        },
      },
    );
  });

  const onArchive = () => {
    if (!location) {
      return;
    }

    updateMutation.mutate(
      {
        id: location.id,
        archived: true,
      },
      {
        onSuccess: () => {
          navigate("/locations", {
            replace: true,
            state: { notice: "Location archived." },
          });
        },
      },
    );
  };

  const shouldShowMissingLocation =
    !isCreate && !isLocationsLoading && !location;

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <StyledOverlay />
        <StyledContent data-testid="location-form-dialog">
          <StyledTitle data-testid="location-form-title">
            {isCreate ? "Add location" : "Edit location"}
          </StyledTitle>
          <StyledDescription>
            {isCreate
              ? "Create a warehouse or storage location."
              : "Update this location's name and notes."}
          </StyledDescription>
          {isLocationsLoading && !isCreate && (
            <Loading tip="Loading location" />
          )}
          {shouldShowMissingLocation && (
            <StyledFormError data-testid="location-form-error">
              Location not found.
            </StyledFormError>
          )}
          {(isCreate || location) && (
            <StyledForm onSubmit={onSubmit} noValidate>
              {serverError && (
                <StyledFormError data-testid="location-form-error">
                  {serverError}
                </StyledFormError>
              )}
              <StyledField>
                Name
                <StyledInput
                  $hasError={Boolean(errors.name)}
                  data-testid="location-form-name"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name?.message && (
                  <StyledFieldError data-testid="location-form-name-error">
                    {errors.name.message}
                  </StyledFieldError>
                )}
              </StyledField>
              <StyledField>
                Notes
                <StyledTextarea
                  data-testid="location-form-notes"
                  {...register("notes")}
                />
              </StyledField>
              <StyledFooter>
                {shouldShowArchive && (
                  <AlertDialog.Root>
                    <AlertDialog.Trigger asChild>
                      <Button
                        variant="secondary"
                        danger
                        data-testid="location-form-archive"
                      >
                        Archive
                      </Button>
                    </AlertDialog.Trigger>
                    <AlertDialog.Portal>
                      <StyledAlertOverlay />
                      <StyledAlertContent data-testid="location-archive-dialog">
                        <StyledAlertTitle>Archive location</StyledAlertTitle>
                        <StyledAlertDescription>
                          Archived locations stay in the list but are marked as
                          archived. You can still view them later.
                        </StyledAlertDescription>
                        <StyledActions>
                          <AlertDialog.Cancel asChild>
                            <Button
                              variant="secondary"
                              data-testid="location-archive-cancel"
                            >
                              Cancel
                            </Button>
                          </AlertDialog.Cancel>
                          <AlertDialog.Action asChild>
                            <Button
                              danger
                              loading={updateMutation.isPending}
                              data-testid="location-archive-confirm"
                              onClick={(event) => {
                                event.preventDefault();
                                onArchive();
                              }}
                            >
                              Archive
                            </Button>
                          </AlertDialog.Action>
                        </StyledActions>
                      </StyledAlertContent>
                    </AlertDialog.Portal>
                  </AlertDialog.Root>
                )}
                <StyledActions>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={closeToList}
                    data-testid="location-form-cancel"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    loading={isSaving}
                    data-testid="location-form-submit"
                  >
                    {isCreate ? "Create location" : "Save changes"}
                  </Button>
                </StyledActions>
              </StyledFooter>
            </StyledForm>
          )}
        </StyledContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
