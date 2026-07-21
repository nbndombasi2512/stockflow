import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "stockflow-component";
import { ApiError } from "stockflow-helpers";
import { useSignupMutation } from "../use-signup-mutation";
import {
  Page,
  Card,
  Title,
  Subtitle,
  Form,
  Field,
  Input,
  FieldError,
  FormError,
} from "./styles";

interface SignupFormValues {
  email: string;
  password: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d)/;

function getServerErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    if (error.status === 409) {
      return error.message || "Email already registered";
    }

    return error.message || "Something went wrong. Please try again.";
  }

  return "Something went wrong. Please try again.";
}

export function SignupPage() {
  const navigate = useNavigate();
  const signupMutation = useSignupMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = handleSubmit((values) => {
    signupMutation.mutate(
      {
        email: values.email.trim(),
        password: values.password,
      },
      {
        onSuccess: () => {
          navigate("/");
        },
      },
    );
  });

  const serverError = signupMutation.isError
    ? getServerErrorMessage(signupMutation.error)
    : undefined;

  return (
    <Page data-testid="signup-page">
      <Card>
        <Title>Create account</Title>
        <Subtitle>Sign up with your email and password to get started.</Subtitle>
        <Form onSubmit={onSubmit} noValidate>
          {serverError && (
            <FormError data-testid="signup-form-error">{serverError}</FormError>
          )}
          <Field>
            Email
            <Input
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              data-testid="signup-email"
              $hasError={Boolean(errors.email)}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: EMAIL_PATTERN,
                  message: "Enter a valid email address",
                },
              })}
            />
            {errors.email?.message && (
              <FieldError data-testid="signup-email-error">
                {errors.email.message}
              </FieldError>
            )}
          </Field>
          <Field>
            Password
            <Input
              type="password"
              autoComplete="new-password"
              placeholder="At least 8 characters"
              data-testid="signup-password"
              $hasError={Boolean(errors.password)}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                pattern: {
                  value: PASSWORD_PATTERN,
                  message:
                    "Password must contain at least one letter and one number",
                },
              })}
            />
            {errors.password?.message && (
              <FieldError data-testid="signup-password-error">
                {errors.password.message}
              </FieldError>
            )}
          </Field>
          <Button
            type="submit"
            disabled={signupMutation.isPending}
            data-testid="signup-submit"
          >
            {signupMutation.isPending ? "Creating account…" : "Sign up"}
          </Button>
        </Form>
      </Card>
    </Page>
  );
}
