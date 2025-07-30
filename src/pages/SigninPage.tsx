import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import RHFFormProvider from "../components/hook-form/RHFFormProvider";
import RHFTextfield from "../components/hook-form/RHFTextfield";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../rtk-query/auth-actions";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { enqueueSnackbar } from "notistack";
import type { CustomError } from "../rtk-query/api-interceptor";
import { useCallback } from "react";

interface IFormValues {
  email: string;
  password: string;
}
// Validation schema
const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const SigninPage = () => {
  // Hooks
  const navigate = useNavigate();

  // API
  const [login, { isLoading }] = useLoginMutation();

  // Form
  const methods = useForm({
    resolver: yupResolver(loginSchema),
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { handleSubmit } = methods;

  // functions / handlers
  const onSubmit = useCallback(
    async (formValues: IFormValues) => {
      const res = await login(formValues);
      if (res?.data?.success) {
        localStorage.setItem("accessToken", res.data.data.accessToken);
        localStorage.setItem("refreshToken", res.data.data.refreshToken);
        navigate("/dashboard");
      } else {
        enqueueSnackbar(
          (res?.error as CustomError)?.data?.message || "Unable to do login",
          {
            variant: "error",
          }
        );
      }
    },
    [login, navigate]
  );
  return (
    <Container
      maxWidth="xs"
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box boxShadow={8} borderRadius={4} px={4} py={6}>
        <Typography
          variant="h4"
          gutterBottom
          fontWeight={900}
          textAlign={"center"}
          mb={4}
        >
          Log in to start listening
        </Typography>
        <RHFFormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <RHFTextfield name="email" placeholder="Email" />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <RHFTextfield name="password" placeholder="Password" />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handleSubmit((values) => onSubmit(values))}
                sx={{ borderRadius: 8 }}
                loading={isLoading}
                disabled={isLoading}
              >
                <Typography>Login</Typography>
              </Button>
            </Grid>

            <Grid size={{ xs: 12 }} textAlign={"center"}>
              <Typography gutterBottom color="grey.600">
                Don't save an account? <Link to={"/signup"}>Register here</Link>
              </Typography>
            </Grid>
          </Grid>
        </RHFFormProvider>
      </Box>
    </Container>
  );
};

export default SigninPage;
