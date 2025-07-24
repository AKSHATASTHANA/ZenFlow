import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import HomePage from "@/pages/home";
import AdminPage from "@/pages/admin";
import AdminLoginPage from "@/pages/admin-login";
import ProjectDashboard from "@/pages/project-dashboard";
import NotFound from "@/pages/not-found";
import CardiologyPage from "@/pages/departments/cardiology";
import NeurologyPage from "@/pages/departments/neurology";
import OrthopedicsPage from "@/pages/departments/orthopedics";
import PediatricsPage from "@/pages/departments/pediatrics";
import GynecologyPage from "@/pages/departments/gynecology";
import DoctorsPage from "@/pages/doctors";
import DoctorProfile from "@/pages/doctors/doctor-profile";

function Router() {
  return (
    <Switch>
      <Route path="/projects" component={ProjectDashboard} />
      <Route path="/admin" component={AdminPage} />
      <Route path="/admin/login" component={AdminLoginPage} />
      <Route path="/departments/cardiology" component={CardiologyPage} />
      <Route path="/departments/neurology" component={NeurologyPage} />
      <Route path="/departments/orthopedics" component={OrthopedicsPage} />
      <Route path="/departments/pediatrics" component={PediatricsPage} />
      <Route path="/departments/gynecology" component={GynecologyPage} />
      <Route path="/doctors" component={DoctorsPage} />
      <Route path="/doctors/:id" component={DoctorProfile} />
      <Route path="/" component={HomePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
