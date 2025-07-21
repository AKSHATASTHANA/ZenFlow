import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  Users,
  Award,
  Phone,
  Mail,
  MapPin,
  Heart,
  Brain,
  Bone,
  Baby,
  User,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { AppointmentForm } from "@/components/appointment-form";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Department, Doctor } from "@shared/schema";
import ReactMarkdown from "react-markdown";
import { Link } from "wouter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function AboutSection() {
  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-b from-white via-blue-50 to-white relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-blue-200 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-300 rounded-full opacity-10 animate-float"></div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-800 mb-6">
            About Shri Krishna Mission Hospital
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16">
          {/* Hospital Image Section - Enhanced */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-blue-400 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
              <div className="relative w-full max-w-md h-80 rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-200 to-blue-50 transform group-hover:scale-105 transition duration-300">
                <img
                  src="src/images/hospital.jpeg"
                  alt="Shri Krishna Mission Hospital"
                  className="object-cover w-full h-full rounded-2xl border-4 border-white shadow-xl"
                />
                {/* Overlay with hospital stats */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <div className="text-white text-center">
                    <div className="text-xl font-bold">Since 1985</div>
                    <div className="text-sm opacity-90">
                      Serving with Excellence
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section - Enhanced */}
          <div className="w-full lg:w-1/2">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-blue-100">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-blue-800">50K+</div>
                    <div className="text-xs text-gray-600">Patients</div>
                  </div>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-blue-100">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-green-700">200+</div>
                    <div className="text-xs text-gray-600">Doctors</div>
                  </div>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-blue-100">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Award className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-purple-700">
                      NABH
                    </div>
                    <div className="text-xs text-gray-600">Accredited</div>
                  </div>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-blue-100">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Clock className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-red-700">24/7</div>
                    <div className="text-xs text-gray-600">Emergency</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="bg-white/90 backdrop-blur-sm border border-blue-100 rounded-2xl shadow-xl p-6 relative overflow-hidden">
              {/* Decorative corner element */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-600/10 to-transparent rounded-bl-full"></div>

              <div className="prose prose-sm text-gray-700 leading-relaxed">
                <p className="mb-4">
                  Welcome to <strong>Shri Krishna Mission Hospital</strong> –
                  where compassion meets care, and healing is guided by
                  dedication and ethics.
                </p>
                <p className="mb-4">
                  Since 1985, we've served as a beacon of hope across Uttar
                  Pradesh, providing accessible, affordable, and world-class
                  healthcare inspired by Lord Shri Krishna's teachings.
                </p>
                <div className="mb-4">
                  <h4 className="font-semibold text-blue-800 mb-2">
                    Centers of Excellence:
                  </h4>
                  <div className="text-sm text-gray-600">
                    Cardiac Care • Neuroscience • Orthopedics • Oncology •
                    Maternity Care • Emergency & Trauma
                  </div>
                </div>
              </div>

              {/* Signature section */}
              <div className="mt-6 pt-4 border-t border-blue-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">BC</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-blue-800">
                      Shri Basant Chaudhary
                    </div>
                    <div className="text-xs text-gray-600">Chairman</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced animations */}
      <style>{`
        .animate-float {
          animation: floatImage 6s ease-in-out infinite;
        }
        @keyframes floatImage {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-pulse {
          animation: pulse 4s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.6; }
        }
        .animate-bounce {
          animation: bounce 3s ease-in-out infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </section>
  );
}

export default function HomePage() {
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: departments } = useQuery<Department[]>({
    queryKey: ["/api/departments"],
  });

  const { data: doctors } = useQuery<Doctor[]>({
    queryKey: ["/api/doctors"],
  });

  const { data: stats } = useQuery<{
    totalAppointments: number;
    pendingAppointments: number;
    confirmedAppointments: number;
    totalDepartments: number;
    totalDoctors: number;
  }>({
    queryKey: ["/api/stats"],
  });

  // Auto-scroll functionality for testimonials
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let intervalId: NodeJS.Timeout;
    let isHovered = false;

    const startAutoScroll = () => {
      intervalId = setInterval(() => {
        if (!isHovered && scrollContainer) {
          const scrollWidth = scrollContainer.scrollWidth;
          const clientWidth = scrollContainer.clientWidth;
          const maxScroll = scrollWidth - clientWidth;
          
          if (scrollContainer.scrollLeft >= maxScroll) {
            scrollContainer.scrollLeft = 0;
          } else {
            scrollContainer.scrollLeft += 1;
          }
        }
      }, 50);
    };

    const handleMouseEnter = () => {
      isHovered = true;
    };

    const handleMouseLeave = () => {
      isHovered = false;
    };

    // Start auto-scroll after component mounts
    setTimeout(() => {
      startAutoScroll();
    }, 1000);

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearInterval(intervalId);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                {" "}
                Shri Ram Krishan Mission Hospital
              </h1>
            </div>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 items-center">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-gray-600 hover:text-blue-600">
                  Departments
                  <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link href="/departments/cardiology" className="flex items-center w-full">
                      <Heart className="mr-2 h-4 w-4 text-red-600" />
                      Cardiology
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/departments/neurology" className="flex items-center w-full">
                      <Brain className="mr-2 h-4 w-4 text-purple-600" />
                      Neurology
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/departments/orthopedics" className="flex items-center w-full">
                      <Bone className="mr-2 h-4 w-4 text-orange-600" />
                      Orthopedics
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/departments/pediatrics" className="flex items-center w-full">
                      <Baby className="mr-2 h-4 w-4 text-green-600" />
                      Pediatrics
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/departments/gynecology" className="flex items-center w-full">
                      <User className="mr-2 h-4 w-4 text-pink-600" />
                      Gynecology
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <a href="#doctors" className="text-gray-600 hover:text-blue-600">
                Doctors
              </a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600">
                Contact
              </a>
              <Button
                onClick={() => setShowAppointmentForm(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Book Appointment
              </Button>
            </nav>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t shadow-lg">
            <div className="px-4 py-2 space-y-2">
              {/* Mobile Departments Section */}
              <div className="py-2">
                <div className="text-sm font-semibold text-gray-700 mb-2">Departments</div>
                <div className="space-y-2 pl-4">
                  <Link 
                    href="/departments/cardiology" 
                    className="flex items-center py-2 text-gray-600 hover:text-red-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Heart className="mr-2 h-4 w-4 text-red-600" />
                    Cardiology
                  </Link>
                  <Link 
                    href="/departments/neurology" 
                    className="flex items-center py-2 text-gray-600 hover:text-purple-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Brain className="mr-2 h-4 w-4 text-purple-600" />
                    Neurology
                  </Link>
                  <Link 
                    href="/departments/orthopedics" 
                    className="flex items-center py-2 text-gray-600 hover:text-orange-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Bone className="mr-2 h-4 w-4 text-orange-600" />
                    Orthopedics
                  </Link>
                  <Link 
                    href="/departments/pediatrics" 
                    className="flex items-center py-2 text-gray-600 hover:text-green-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Baby className="mr-2 h-4 w-4 text-green-600" />
                    Pediatrics
                  </Link>
                  <Link 
                    href="/departments/gynecology" 
                    className="flex items-center py-2 text-gray-600 hover:text-pink-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="mr-2 h-4 w-4 text-pink-600" />
                    Gynecology
                  </Link>
                </div>
              </div>
              
              {/* Mobile Navigation Links */}
              <div className="border-t pt-2">
                <a 
                  href="#doctors" 
                  className="block py-2 text-gray-600 hover:text-blue-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Doctors
                </a>
                <a 
                  href="#contact" 
                  className="block py-2 text-gray-600 hover:text-blue-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </a>
                <Button
                  onClick={() => {
                    setShowAppointmentForm(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full mt-2 bg-blue-600 hover:bg-blue-700"
                >
                  Book Appointment
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-100">
          <div className="absolute inset-0 opacity-5">
            <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
              <defs>
                <pattern
                  id="grid"
                  width="10"
                  height="10"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 10 0 L 0 0 0 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>
        </div>

        {/* Floating Medical Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-20 left-10 text-blue-200 animate-bounce"
            style={{ animationDelay: "0s", animationDuration: "3s" }}
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
          <div
            className="absolute top-40 right-20 text-green-200 animate-pulse"
            style={{ animationDelay: "1s" }}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 8h-2v3h-3v2h3v3h2v-3h3v-2h-3V8zM4 8h2V6H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-2h-2v2H4V8z" />
            </svg>
          </div>
          <div
            className="absolute bottom-32 left-20 text-blue-300 animate-bounce"
            style={{ animationDelay: "2s", animationDuration: "4s" }}
          >
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <div className="animate-fadeInUp">
            <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Your Health is Our
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
                {" "}
                Priority
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed">
              Experience world-class healthcare with our team of expert doctors
              and state-of-the-art facilities. We provide comprehensive medical
              care with compassion and excellence.
            </p>
          </div>

          <div
            className="flex flex-col sm:flex-row gap-6 justify-center animate-fadeInUp"
            style={{ animationDelay: "0.3s" }}
          >
            <Button
              size="lg"
              onClick={() => setShowAppointmentForm(true)}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-lg px-10 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Calendar className="w-5 h-5 mr-3" />
              Book Appointment
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-10 py-4 rounded-full border-2 border-red-500 text-red-600 hover:bg-red-50 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Phone className="w-5 h-5 mr-3" />
              Emergency: 911
            </Button>
          </div>

          {/* Trust Indicators */}
          <div
            className="mt-16 animate-fadeInUp"
            style={{ animationDelay: "0.6s" }}
          >
            <p className="text-sm text-gray-500 mb-4">
              Trusted by 10,000+ patients
            </p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
                <span className="ml-2 text-sm text-gray-600">4.9/5 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AboutSection />

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="grid grid-cols-8 grid-rows-8 w-full h-full">
              {[...Array(64)].map((_, i) => (
                <div
                  key={i}
                  className="border border-white/20"
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    animation: "pulse 4s ease-in-out infinite",
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12 animate-fadeInUp">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Healthcare Excellence in Numbers
            </h3>
            <p className="text-xl text-blue-100">
              Trusted by thousands, delivering exceptional care every day
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div
              className="group animate-fadeInUp"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 group-hover:bg-white/20 transition-all duration-300 hover-lift">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stats?.totalDoctors || 0}+
                </div>
                <div className="text-blue-100 font-medium">Expert Doctors</div>
                <div className="w-12 h-1 bg-white/30 rounded-full mx-auto mt-3 group-hover:bg-white/60 transition-colors duration-300"></div>
              </div>
            </div>

            <div
              className="group animate-fadeInUp"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 group-hover:bg-white/20 transition-all duration-300 hover-lift">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stats?.totalDepartments || 0}+
                </div>
                <div className="text-blue-100 font-medium">Departments</div>
                <div className="w-12 h-1 bg-white/30 rounded-full mx-auto mt-3 group-hover:bg-white/60 transition-colors duration-300"></div>
              </div>
            </div>

            <div
              className="group animate-fadeInUp"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 group-hover:bg-white/20 transition-all duration-300 hover-lift">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                  10,000+
                </div>
                <div className="text-blue-100 font-medium">Happy Patients</div>
                <div className="w-12 h-1 bg-white/30 rounded-full mx-auto mt-3 group-hover:bg-white/60 transition-colors duration-300"></div>
              </div>
            </div>

            <div
              className="group animate-fadeInUp"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 group-hover:bg-white/20 transition-all duration-300 hover-lift">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                  24/7
                </div>
                <div className="text-blue-100 font-medium">Emergency Care</div>
                <div className="w-12 h-1 bg-white/30 rounded-full mx-auto mt-3 group-hover:bg-white/60 transition-colors duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-green-300 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20 animate-fadeInUp">
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 gradient-text">
              Our Medical Departments
            </h3>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive healthcare services across multiple specialties with
              state-of-the-art facilities
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {departments?.map((department, index) => (
              <Card
                key={department.id}
                className="card-hover hover-lift group relative overflow-hidden border-0 shadow-lg bg-white/80 backdrop-blur-sm animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Card Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <CardHeader className="relative">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="medical-icon animate-float">
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 8h-2v3h-3v2h3v3h2v-3h3v-2h-3V8zM4 8h2V6H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-2h-2v2H4V8z" />
                      </svg>
                    </div>
                    <CardTitle className="text-xl font-bold text-blue-600 group-hover:text-blue-700 transition-colors">
                      {department.name}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {department.description}
                  </p>
                  {department.headDoctor && (
                    <div className="flex items-center text-sm text-gray-500 bg-gray-50 rounded-lg p-3">
                      <Users className="w-4 h-4 mr-2 text-blue-500" />
                      <span className="font-medium">Head Doctor:</span>
                      <span className="ml-1">{department.headDoctor}</span>
                    </div>
                  )}

                  {/* Hover Effect Arrow */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    <svg
                      className="w-5 h-5 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section
        id="doctors"
        className="py-24 bg-gradient-to-b from-white to-blue-50 relative"
      >
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-green-200 rounded-full blur-3xl opacity-20"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20 animate-fadeInUp">
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Meet Our <span className="gradient-text">Expert Doctors</span>
            </h3>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Experienced professionals dedicated to your health and wellbeing
              with years of specialized training
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {doctors?.slice(0, 6).map((doctor, index) => (
              <Card
                key={doctor.id}
                className="text-center card-hover hover-lift group bg-white/90 backdrop-blur-sm border-0 shadow-xl animate-fadeInUp"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <CardHeader className="relative pb-4">
                  {/* Doctor Avatar with Gradient Ring */}
                  <div className="relative mx-auto mb-6">
                    <div className="w-28 h-28 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300 animate-glow">
                      <Users className="w-14 h-14 text-white" />
                    </div>
                    {/* Online Indicator */}
                    <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-md animate-pulse"></div>
                  </div>

                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {doctor.name}
                  </CardTitle>
                  <Badge
                    variant="secondary"
                    className="mt-3 px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border-0 font-medium"
                  >
                    {doctor.specialization}
                  </Badge>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700 font-medium text-sm">
                      {doctor.qualifications}
                    </p>
                  </div>

                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3">
                    <Award className="w-4 h-4 text-green-600" />
                    <span className="font-semibold text-green-700">
                      {doctor.experience} years
                    </span>
                    <span>experience</span>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex justify-center items-center space-x-1 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                    <span className="ml-2 text-xs text-gray-500">(4.9)</span>
                  </div>

                  {/* Contact Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 w-full border-blue-200 text-blue-600 hover:bg-blue-50 group-hover:border-blue-400 transition-all duration-300"
                  >
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* View All Doctors Button */}
          <div
            className="text-center mt-16 animate-fadeInUp"
            style={{ animationDelay: "0.9s" }}
          >
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-3 border-2 border-blue-500 text-blue-600 hover:bg-blue-50 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              View All Doctors
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30 animate-float"></div>
        <div
          className="absolute bottom-0 left-0 w-80 h-80 bg-green-100 rounded-full blur-3xl opacity-30 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20 animate-fadeInUp">
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Our <span className="gradient-text">Patients Say</span>
            </h3>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Real stories from real patients who trusted us with their
              healthcare
            </p>
          </div>

          <div className="overflow-x-auto scrollbar-hide" ref={scrollRef}>
            <div className="flex space-x-8 pb-4" style={{ width: 'max-content' }}>
              {[
                {
                  name: "Sarah Johnson",
                  condition: "Cardiology Patient",
                  quote:
                    "The care I received was exceptional. Dr. Smith and the entire team made me feel comfortable throughout my treatment.",
                  rating: 5,
                },
                {
                  name: "Michael Chen",
                  condition: "Orthopedic Surgery",
                  quote:
                    "From diagnosis to recovery, every step was handled with professionalism. I'm back to my active lifestyle thanks to the amazing team.",
                  rating: 5,
                },
                {
                  name: "Emily Rodriguez",
                  condition: "Pediatric Care",
                  quote:
                    "The pediatric team was wonderful with my daughter. They made what could have been a scary experience feel safe and comfortable.",
                  rating: 5,
                },
                {
                  name: "David Wilson",
                  condition: "Neurology Patient",
                  quote:
                    "The neurological team provided exceptional care during my treatment. Their expertise and compassion made all the difference.",
                  rating: 5,
                },
                {
                  name: "Lisa Thompson",
                  condition: "Gynecology Patient",
                  quote:
                    "Professional, caring, and thorough. The entire women's health team exceeded my expectations at every visit.",
                  rating: 5,
                },
                {
                  name: "James Miller",
                  condition: "Emergency Care",
                  quote:
                    "When I needed emergency care, the team acted quickly and professionally. I'm grateful for their life-saving expertise.",
                  rating: 5,
                },
              ].map((testimonial, index) => (
                <Card
                  key={index}
                  className="p-8 border-0 shadow-xl bg-white/80 backdrop-blur-sm hover-lift animate-fadeInUp flex-shrink-0"
                  style={{ animationDelay: `${index * 0.2}s`, width: '380px' }}
                >
                  <CardContent className="space-y-6">
                    {/* Quote */}
                    <div className="relative">
                      <svg
                        className="absolute -top-2 -left-2 w-8 h-8 text-blue-200"
                        fill="currentColor"
                        viewBox="0 0 32 32"
                      >
                        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                      </svg>
                      <p className="text-gray-700 italic text-lg leading-relaxed pl-6">
                        "{testimonial.quote}"
                      </p>
                    </div>

                    {/* Rating */}
                    <div className="flex justify-center space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-5 h-5 text-yellow-400 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>

                    {/* Patient Info */}
                    <div className="text-center border-t pt-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {testimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <h4 className="font-bold text-gray-900">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-500 text-sm">
                        {testimonial.condition}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm">
              Auto-scrolling testimonials • Hover to pause
            </p>
          </div>

          {/* Trust Badges */}
          <div
            className="mt-20 text-center animate-fadeInUp"
            style={{ animationDelay: "0.8s" }}
          >
            <p className="text-gray-500 mb-8">
              Accredited by leading healthcare organizations
            </p>
            <div className="flex justify-center items-center space-x-12 opacity-60">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Award className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-600">
                  Joint Commission
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Award className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-600">
                  AAAHC Accredited
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Award className="w-4 h-4 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-gray-600">
                  Magnet Recognition
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-4">Contact Us</h3>
            <p className="text-xl opacity-90">
              Get in touch for appointments and inquiries
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <Phone className="w-8 h-8 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Phone</h4>
              <p className="opacity-90">+1 (555) 123-4567</p>
              <p className="opacity-90">Emergency: 911</p>
            </div>
            <div>
              <Mail className="w-8 h-8 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Email</h4>
              <p className="opacity-90">
                info@Shri Krishna Mission -hospital.com
              </p>
              <p className="opacity-90">
                appointments@Shri Krishna Mission -hospital.com
              </p>
            </div>
            <div>
              <MapPin className="w-8 h-8 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Address</h4>
              <p className="opacity-90">123 Medical Center Drive</p>
              <p className="opacity-90">Healthcare City, HC 12345</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h5 className="text-lg font-semibold mb-4">
                Shri Krishna Mission Hospital
              </h5>
              <p className="text-gray-400">
                Providing exceptional healthcare services with compassion and
                excellence.
              </p>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#services" className="hover:text-white">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#doctors" className="hover:text-white">
                    Doctors
                  </a>
                </li>
                <li>
                  <a href="/projects" className="hover:text-white">
                    Project Dashboard
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4">Services</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Emergency Care</li>
                <li>Surgery</li>
                <li>Diagnostics</li>
                <li>Rehabilitation</li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4">Hours</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Mon-Fri: 8:00 AM - 8:00 PM</li>
                <li>Sat-Sun: 9:00 AM - 6:00 PM</li>
                <li>Emergency: 24/7</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Hospital. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Appointment Form Modal */}
      {showAppointmentForm && (
        <AppointmentForm onClose={() => setShowAppointmentForm(false)} />
      )}
    </div>
  );
}
