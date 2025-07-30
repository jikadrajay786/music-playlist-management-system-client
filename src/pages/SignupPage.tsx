import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import RHFFormProvider from "../components/hook-form/RHFFormProvider";
import RHFTextfield from "../components/hook-form/RHFTextfield";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRegisterMutation } from "../rtk-query/auth-actions";
import { enqueueSnackbar } from "notistack";
import { useCallback } from "react";

interface IFormValues {
  userName: string;
  email: string;
  password: string;
}
// Validation schema
const signupSchema = yup.object().shape({
  userName: yup
    .string()
    .required("Username is required")
    .min(2, "Username must have minimum two character")
    .max(20, "Username should not be more than twenty character long"),
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must have minimum six character")
    .max(14, "Password should not be more than forty character long"),
});

const SignupPage = () => {
  // API
  const [register, { isLoading, isSuccess }] = useRegisterMutation();

  // Form
  const methods = useForm({
    resolver: yupResolver(signupSchema),
    reValidateMode: "onChange",
    defaultValues: {
      userName: "",
      email: "",
      password: "",
    },
  });
  const { handleSubmit, reset } = methods;

  // Functions / handlers
  const onSubmit = useCallback(
    async (formValues: IFormValues) => {
      const res = await register(formValues);

      if (res?.data?.success) {
        enqueueSnackbar(res?.data?.message, { variant: "success" });
        reset({
          userName: "",
          email: "",
          password: "",
        });
      }
    },
    [register, reset]
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
        {isSuccess ? (
          <Stack direction="column">
            <Typography
              variant="h4"
              gutterBottom
              fontWeight={900}
              textAlign={"center"}
              mb={4}
            >
              Signup successful! Please login.
            </Typography>
            <Button
              component={Link}
              to="/login"
              variant="outlined"
              sx={{ borderRadius: 8 }}
            >
              Login
            </Button>
          </Stack>
        ) : (
          <>
            <Typography
              variant="h4"
              gutterBottom
              fontWeight={900}
              textAlign={"center"}
              mb={4}
            >
              Sign up to start listening
            </Typography>
            <RHFFormProvider
              methods={methods}
              onSubmit={handleSubmit(onSubmit)}
            >
              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <RHFTextfield name="userName" placeholder="User name" />
                </Grid>
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
                    <Typography>Signup</Typography>
                  </Button>
                </Grid>
                <Grid size={{ xs: 12 }} textAlign={"center"}>
                  <Typography gutterBottom color="grey.600">
                    Already Have an account? <Link to={"/login"}>Login</Link>
                  </Typography>
                </Grid>
              </Grid>
            </RHFFormProvider>
          </>
        )}
      </Box>
    </Container>
  );
};

export default SignupPage;
