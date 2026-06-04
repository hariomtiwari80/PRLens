import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Security from "./pages/Security";
import Reports from "./pages/Reports";
import Team from "./pages/Team";
import Settings from "./pages/Settings";
import Assistant from "./pages/Assistant";
import Notifications from "./pages/Notifications";
import Billing from "./pages/Billing";

import SidebarLayout from "./layouts/SidebarLayout";

import BackToTop from "./components/BackToTop";

const queryClient = new QueryClient();

const AppContent = () => {

  const location = useLocation();

  const isHomePage = location.pathname === "/";

  return (

    <>

      {!isHomePage ? (

        <SidebarLayout>

          <Routes>

            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/analytics"
              element={<Analytics />}
            />

            <Route
              path="/security"
              element={<Security />}
            />

            <Route
              path="/reports"
              element={<Reports />}
            />

            <Route
              path="/team"
              element={<Team />}
            />

            <Route
              path="/settings"
              element={<Settings />}
            />

            <Route
              path="/assistant"
              element={<Assistant />}
            />

            <Route
              path="/notifications"
              element={<Notifications />}
            />

            <Route
              path="/billing"
              element={<Billing />}
            />

          </Routes>

        </SidebarLayout>

      ) : (

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

        </Routes>

      )}

    </>

  );
};

const App = () => {

  return (

    <QueryClientProvider client={queryClient}>

      <TooltipProvider>

        <Toaster />

        <Sonner />

        <AppContent />

        <BackToTop />

      </TooltipProvider>

    </QueryClientProvider>

  );
};

export default App;