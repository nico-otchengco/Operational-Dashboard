import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/components/context/authContext";
import ProtectedRoute from "@/components/route/protectedRoute";
import Login from "@/pages/Login";
import { Dashboard } from "@/pages/Dashboard";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
