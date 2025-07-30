import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/dashboard/Dashboard";
import ProtectedRoute from "./wrappers/ProtectedRoute";
import PublicRoute from "./wrappers/PublicRoute";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          {/* Login Route */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <SigninPage />
              </PublicRoute>
            }
          />

          {/* Signup Route */}
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignupPage />
              </PublicRoute>
            }
          />

          {/* Dashboard Route */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={
              // <PublicRoute>
              <PageNotFound />
              // </PublicRoute>
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
