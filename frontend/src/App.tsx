import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Layout from "./components/Layout";
import { AuthProvider } from "./contexts/AuthProvider";
import ProtectedLayout from "./components/ProtectedLayout";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Rotas públicas (sem menu) */}
            <Route path="/" element={<SignIn />} />
            {/* Rotas protegidas (com menu) */}
            <Route
              path="/dashboard"
              element={
                <Layout>
                  <ProtectedLayout>
                    <Dashboard />
                  </ProtectedLayout>
                </Layout>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
