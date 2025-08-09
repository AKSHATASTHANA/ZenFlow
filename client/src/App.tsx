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
import GeneralMedicinePage from "@/pages/departments/general-medicine";
import GeneralSurgeryPage from "@/pages/departments/general-surgery";
import GastroenterologyPage from "@/pages/departments/gastroenterology";
import UrologyPage from "@/pages/departments/urology";
import PathologyDeptPage from "@/pages/departments/pathology";
import AnesthesiologyPage from "@/pages/departments/anesthesiology";
import DoctorsPage from "@/pages/doctors";
import DoctorProfile from "@/pages/doctors/doctor-profile";
import Gallery from "@/pages/gallery";
import NewsEventsPage from "@/pages/news-events";
import XRayPage from "@/pages/facilities/x-ray";
import ICUPage from "@/pages/facilities/icu";
import PathologyPage from "@/pages/facilities/pathology";
import BloodBankPage from "@/pages/facilities/blood-bank";
import EndoscopyPage from "@/pages/facilities/endoscopy";
import EchoUltrasoundPage from "@/pages/facilities/echo-ultrasound";
import PhysiotherapyPage from "@/pages/facilities/physiotherapy";

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
      <Route path="/departments/general-medicine" component={GeneralMedicinePage} />
      <Route path="/departments/general-surgery" component={GeneralSurgeryPage} />
      <Route path="/departments/gastroenterology" component={GastroenterologyPage} />
      <Route path="/departments/urology" component={UrologyPage} />
      <Route path="/departments/pathology" component={PathologyDeptPage} />
      <Route path="/departments/anesthesiology" component={AnesthesiologyPage} />
      <Route path="/doctors" component={DoctorsPage} />
      <Route path="/doctors/:id" component={DoctorProfile} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/news-events" component={NewsEventsPage} />
      <Route path="/facilities/x-ray" component={XRayPage} />
      <Route path="/facilities/icu" component={ICUPage} />
      <Route path="/facilities/pathology" component={PathologyPage} />
      <Route path="/facilities/blood-bank" component={BloodBankPage} />
      <Route path="/facilities/endoscopy" component={EndoscopyPage} />
      <Route path="/facilities/echo-ultrasound" component={EchoUltrasoundPage} />
      <Route path="/facilities/physiotherapy" component={PhysiotherapyPage} />
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
