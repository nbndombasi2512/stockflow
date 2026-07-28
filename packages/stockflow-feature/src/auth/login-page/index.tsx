import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Button, Loading } from "stockflow-component";
import { ApiError, setToken } from "stockflow-helpers";
import { useLoginMutation } from "../use-login-mutation";
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
  Footer,
} from "./styles";

interface LoginFormValues {
  email: string;
  password: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getServerErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    if (error.status === 401) {
      return error.message || "Invalid credentials";
    }

    return error.message || "Something went wrong. Please try again.";
  }

  return "Something went wrong. Please try again.";
}

export function LoginPage() {
  const navigate = useNavigate();
  const loginMutation = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = handleSubmit((values) => {
    loginMutation.mutate(
      {
        email: values.email.trim(),
        password: values.password,
      },
      {
        onSuccess: (data) => {
          setToken(data.accessToken);
          navigate("/");
        },
      },
    );
  });

  const serverError = loginMutation.isError
    ? getServerErrorMessage(loginMutation.error)
    : undefined;

  return (
    <Page data-testid="login-page">
      <Card>
        <Title>Log in</Title>
        <Subtitle>Enter your email and password to continue.</Subtitle>
        <Loading spinning={loginMutation.isPending} tip="Logging in…">
          <Form onSubmit={onSubmit} noValidate>
            {serverError && (
              <FormError data-testid="login-form-error">{serverError}</FormError>
            )}
            <Field>
              Email
              <Input
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                data-testid="login-email"
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
                <FieldError data-testid="login-email-error">
                  {errors.email.message}
                </FieldError>
              )}
            </Field>
            <Field>
              Password
              <Input
                type="password"
                autoComplete="current-password"
                placeholder="Your password"
                data-testid="login-password"
                $hasError={Boolean(errors.password)}
                {...register("password", {
                  required: "Password is required",
                })}
              />
              {errors.password?.message && (
                <FieldError data-testid="login-password-error">
                  {errors.password.message}
                </FieldError>
              )}
            </Field>
            <Button
              type="submit"
              disabled={loginMutation.isPending}
              data-testid="login-submit"
            >
              {loginMutation.isPending ? <Loading />: "Log in"}
            </Button>
          </Form>
        </Loading>
        <Footer>
          Don&apos;t have an account?{" "}
          <Link to="/signup" data-testid="login-signup-link">
            Sign up
          </Link>
        </Footer>
      </Card>
    </Page>
  );
}
