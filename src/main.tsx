import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { createTheme, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./rtk-query/store.ts";
import { SnackbarProvider } from "notistack";

const theme = createTheme();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SnackbarProvider
      autoHideDuration={2000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
    </SnackbarProvider>
  </StrictMode>
);
