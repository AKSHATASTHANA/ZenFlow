import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import logoImage from "@/images/logo.png";
import chairmanImage from "@/images/chairman.jpeg";
import drKhalidJameelImage from "@/images/Dr Khalid Jameel.jpeg";
import drVishrutBhartiImage from "@/images/Dr Vishrut Bharti.jpeg";
import drPPMishraImage from "@/images/P P Mishra.jpeg";
import drSomaShawGuptaImage from "@/images/Soma Shaw Gupta.jpeg";
import drDawadImage from "@/images/Dr Dawad.jpeg";
import drSaurabhSinghImage from "@/images/Dr Saurabh singh.jpeg";
import naveenKumarMauryaImage from "@/images/Naveen Kumar maurya.jpeg";
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
  Activity,
  Shield,
  Stethoscope,
  Zap,
  Facebook,
  Youtube,
  Instagram,
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

// Helper function to get doctor image based on name or ID
const getDoctorImage = (doctorName: string, doctorId: number) => {
  // Map doctor names to their images
  const imageMap: { [key: string]: string } = {
    "Dr. Khalid Jameel": drKhalidJameelImage,
    "Dr. Khalid Jamed": drKhalidJameelImage,
    "Dr. Vishrut Bharti": drVishrutBhartiImage,
    "Dr. P P Mishra": drPPMishraImage,
    "Dr. Pip Mishran": drPPMishraImage,
    "Dr. Soma Shaw Gupta": drSomaShawGuptaImage,
    "Dr. Mohd. Dawd Akhtar": drDawadImage,
    "Dr. Saurabh Singh": drSaurabhSinghImage,
    "Dr. Naveen Kumar Maurya": naveenKumarMauryaImage,
  };

  // Try to match by name first, then fall back to ID-based mapping
  return (
    imageMap[doctorName] ||
    imageMap[`Dr. ${doctorName.replace("Dr. ", "")}`] ||
    Object.values(imageMap)[(doctorId - 1) % Object.values(imageMap).length]
  );
};

// Helper function to get relevant medical icon for each department
const getDepartmentIcon = (departmentName: string) => {
  const iconMap: { [key: string]: { icon: any; color: string } } = {
    "Cardiology": { icon: Heart, color: "text-red-500" },
    "Neurology": { icon: Brain, color: "text-purple-500" },
    "Orthopedics": { icon: Bone, color: "text-orange-500" },
    "Pediatrics": { icon: Baby, color: "text-green-500" },
    "Gynecology": { icon: User, color: "text-pink-500" },
    "Emergency": { icon: Zap, color: "text-yellow-500" },
    "Surgery": { icon: Activity, color: "text-blue-500" },
    "Radiology": { icon: Activity, color: "text-indigo-500" },
    "Pathology": { icon: Shield, color: "text-teal-500" },
    "General Medicine": { icon: Stethoscope, color: "text-blue-600" },
    "ICU": { icon: Heart, color: "text-red-600" },
    "Dentistry": { icon: Users, color: "text-cyan-500" },
    "Dermatology": { icon: Shield, color: "text-amber-500" },
    "Ophthalmology": { icon: Activity, color: "text-emerald-500" },
  };

  // Default to stethoscope icon for unknown departments
  return iconMap[departmentName] || { icon: Stethoscope, color: "text-blue-500" };
};

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
                    <div className="text-xl font-bold text-blue-800">
                      2.45L+
                    </div>
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
                    <div className="text-xl font-bold text-green-700">15+</div>
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
                <div className="text-sm text-gray-700 max-w-2xl whitespace-pre-line">
                  *Shri Krishna Mission Hospital, established in **2015, stands
                  as one of the most trusted and advanced healthcare
                  institutions in **Basti, Uttar Pradesh. Located on **Dhorika
                  Road*, our hospital has been a symbol of compassionate care
                  and medical excellence since its inception. With a capacity of
                  *100 beds, our facility is equipped to provide
                  **comprehensive, affordable, and quality healthcare services*
                  to the people of Basti and neighboring regions. We are
                  committed to bringing the *latest medical technology, highly
                  experienced doctors, and dedicated healthcare staff* under one
                  roof to ensure that every patient receives the best possible
                  care.
                </div>

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

              {/* Chairman's Image and Signature section - Enhanced */}
              <div className="mt-8 pt-6 border-t border-blue-200">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  {/* Chairman's Image - Made larger and more prominent */}
                  <div className="flex-shrink-0">
                    <div className="relative group">
                      <div className="absolute -inset-3 bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
                      <div className="relative w-32 h-40 rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-100 to-blue-50 border-4 border-white transform group-hover:scale-105 transition duration-300">
                        <img
                          src={chairmanImage}
                          alt="Shri Basant Chaudhary - Chairman"
                          className="object-cover w-full h-full"
                        />
                        {/* Professional overlay badge */}
                        <div className="absolute bottom-2 left-2 right-2 bg-gradient-to-r from-blue-800/90 to-blue-700/90 rounded-lg px-2 py-1">
                          <div className="text-white text-center">
                            <div className="text-xs font-medium">Chairman</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Chairman's Information - Enhanced */}
                  <div className="text-center md:text-left">
                    <div className="text-xl font-bold text-blue-800 mb-1">
                      Shri Basant Chaudhary
                    </div>
                    <div className="text-sm font-medium text-gray-700 mb-1">
                      Chairman & Founder
                    </div>
                    <div className="text-sm text-blue-600 mb-3">
                      Shri Krishna Mission Hospital, Basti
                    </div>
                    <div className="text-xs text-gray-600 max-w-md mb-4">
                      *श्री कृष्णा मिशन अस्पताल* में आपका हार्दिक स्वागत करते
                      हुए मुझे अत्यंत गर्व एवं संतोष की अनुभूति हो रही है।
                      <br />
                      <br />
                      यह संस्थान करुणा, सेवा और समर्पण के मूल्यों पर आधारित एक
                      ऐसा केंद्र है जहाँ उपचार केवल एक प्रक्रिया नहीं, बल्कि एक
                      पवित्र कर्तव्य है।
                      <br />
                      <br />
                      श्रीकृष्ण जी की शिक्षाओं से प्रेरित होकर, हमारा उद्देश्य
                      मानवता की निःस्वार्थ सेवा करना है।
                      <br />
                      हम यह सुनिश्चित करते हैं कि हर व्यक्ति को सर्वोत्तम, सुलभ
                      एवं किफायती स्वास्थ्य सेवाएं प्राप्त हों — चाहे उसकी
                      सामाजिक या आर्थिक पृष्ठभूमि कुछ भी हो।
                      <br />
                      <br />
                      हमारे कुशल चिकित्सकों, सहानुभूतिपूर्ण नर्सों और समर्पित
                      स्टाफ की टीम के साथ हम आधुनिक चिकित्सा की श्रेष्ठ सेवाएं
                      प्रदान कर रहे हैं, साथ ही मानवीय मूल्यों को भी आत्मसात कर
                      रहे हैं।
                      <br />
                      <br />
                      हम निरंतर तकनीकी उन्नयन, बुनियादी ढांचे के विकास और
                      प्रशिक्षण में निवेश कर रहे हैं ताकि आपके स्वास्थ्य की
                      बदलती ज़रूरतों को पूरा किया जा सके।
                      <br />
                      <br />
                      मैं उन सभी का हृदय से आभार व्यक्त करता हूँ — हमारे सहयोगी,
                      मरीज, और शुभचिंतक — जिन्होंने हम पर विश्वास किया।
                      <br />
                      आइए, हम सभी मिलकर एक स्वस्थ और आशावान भविष्य की ओर कदम
                      बढ़ाएँ।
                      <br />
                      <br />
                      सादर,
                      <br />
                      <strong>श्री बसंत चौधरी</strong>
                      <br />
                      (चेयरमैन)
                      <br />
                      श्री कृष्णा मिशन अस्पताल, बस्ती
                    </div>

                    {/* Social Media Links */}
                    <div className="flex items-center justify-center md:justify-start space-x-3">
                      <a
                        href="https://www.facebook.com/share/1B6cferwga/?mibextid=wwXIfr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors duration-300 group"
                      >
                        <Facebook className="w-4 h-4 text-white" />
                      </a>
                      <a
                        href="https://youtube.com/@shrikrishnamissionhospital3376?si=dAwA02Upoef10ECt"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors duration-300 group"
                      >
                        <Youtube className="w-4 h-4 text-white" />
                      </a>
                      <a
                        href="https://www.instagram.com/shrikrishnamissionhospital?igsh=MWZwOXZydHR1c3p2aQ=="
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-full flex items-center justify-center transition-all duration-300 group"
                      >
                        <Instagram className="w-4 h-4 text-white" />
                      </a>
                    </div>
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
  const [departmentsOpen, setDepartmentsOpen] = useState(false);
  const [facilitiesOpen, setFacilitiesOpen] = useState(false);
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

    scrollContainer.addEventListener("mouseenter", handleMouseEnter);
    scrollContainer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearInterval(intervalId);
      scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-md border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center space-x-3">
              <img
                src={logoImage}
                alt="Shri Krishna Mission Hospital Logo"
                className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-contain"
              />
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 leading-tight">
                Shri Krishna Mission Hospital
              </h1>
            </div>
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-gray-600 hover:text-blue-600">
                  Departments
                  <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link
                      href="/departments/gynecology"
                      className="flex items-center w-full"
                    >
                      <User className="mr-2 h-4 w-4 text-pink-600" />
                      Gynecology
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href="/departments/neurology"
                      className="flex items-center w-full"
                    >
                      <Brain className="mr-2 h-4 w-4 text-purple-600" />
                      Neurology
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href="/departments/orthopedics"
                      className="flex items-center w-full"
                    >
                      <Bone className="mr-2 h-4 w-4 text-orange-600" />
                      Orthopedics
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href="/departments/pediatrics"
                      className="flex items-center w-full"
                    >
                      <Baby className="mr-2 h-4 w-4 text-green-600" />
                      Pediatrics
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href="/departments/gynecology"
                      className="flex items-center w-full"
                    >
                      <User className="mr-2 h-4 w-4 text-pink-600" />
                      Gynecology
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-gray-600 hover:text-blue-600">
                  Facilities
                  <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link
                      href="/facilities/x-ray"
                      className="flex items-center w-full"
                    >
                      <Activity className="mr-2 h-4 w-4 text-blue-600" />
                      X-Ray
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href="/facilities/icu"
                      className="flex items-center w-full"
                    >
                      <Heart className="mr-2 h-4 w-4 text-red-600" />
                      ICU, NICU, PICU
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href="/facilities/pathology"
                      className="flex items-center w-full"
                    >
                      <Shield className="mr-2 h-4 w-4 text-green-600" />
                      Pathology
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href="/facilities/blood-bank"
                      className="flex items-center w-full"
                    >
                      <Activity className="mr-2 h-4 w-4 text-purple-600" />
                      Blood Bank
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href="/facilities/endoscopy"
                      className="flex items-center w-full"
                    >
                      <Activity className="mr-2 h-4 w-4 text-teal-600" />
                      Endoscopy
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href="/facilities/echo-ultrasound"
                      className="flex items-center w-full"
                    >
                      <Heart className="mr-2 h-4 w-4 text-pink-600" />
                      2D Echo & Ultrasound
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href="/facilities/physiotherapy"
                      className="flex items-center w-full"
                    >
                      <Users className="mr-2 h-4 w-4 text-cyan-600" />
                      Physiotherapy
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link
                href="/doctors"
                className="text-gray-600 hover:text-blue-600"
              >
                Our Doctors
              </Link>
              <Link
                href="/gallery"
                className="text-gray-600 hover:text-blue-600"
              >
                Gallery
              </Link>
              <Link
                href="/news-events"
                className="text-gray-600 hover:text-blue-600"
              >
                News & Events
              </Link>
              <a href="#doctors" className="text-gray-600 hover:text-blue-600">
                About Doctors
              </a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600">
                Contact
              </a>
              <Button
                onClick={() => setShowAppointmentForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium"
              >
                Book Appointment
              </Button>
            </nav>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden">
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
          <div className="lg:hidden bg-white border-t shadow-lg">
            <div className="px-4 py-2 space-y-2">
              {/* Mobile Departments Section */}
              <div className="py-2">
                <button
                  onClick={() => setDepartmentsOpen(!departmentsOpen)}
                  className="flex items-center justify-between w-full text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-200"
                >
                  <span>Departments</span>
                  <ChevronDown 
                    className={`h-4 w-4 transition-transform duration-200 ${
                      departmentsOpen ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                
                {departmentsOpen && (
                  <div className="space-y-2 pl-4 mt-2 animate-in slide-in-from-top-2 duration-200">
                    <Link
                      href="/departments/gynecology"
                      className="flex items-center py-2 text-gray-600 hover:text-pink-600 transition-colors duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <User className="mr-2 h-4 w-4 text-pink-600" />
                      Gynecology
                    </Link>
                    <Link
                      href="/departments/neurology"
                      className="flex items-center py-2 text-gray-600 hover:text-purple-600 transition-colors duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Brain className="mr-2 h-4 w-4 text-purple-600" />
                      Neurology
                    </Link>
                    <Link
                      href="/departments/orthopedics"
                      className="flex items-center py-2 text-gray-600 hover:text-orange-600 transition-colors duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Bone className="mr-2 h-4 w-4 text-orange-600" />
                      Orthopedics
                    </Link>
                    <Link
                      href="/departments/pediatrics"
                      className="flex items-center py-2 text-gray-600 hover:text-green-600 transition-colors duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Baby className="mr-2 h-4 w-4 text-green-600" />
                      Pediatrics
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Facilities Section */}
              <div className="py-2">
                <button
                  onClick={() => setFacilitiesOpen(!facilitiesOpen)}
                  className="flex items-center justify-between w-full text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-200"
                >
                  <span>Facilities</span>
                  <ChevronDown 
                    className={`h-4 w-4 transition-transform duration-200 ${
                      facilitiesOpen ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                
                {facilitiesOpen && (
                  <div className="space-y-2 pl-4 mt-2 animate-in slide-in-from-top-2 duration-200">
                    <Link
                      href="/facilities/x-ray"
                      className="flex items-center py-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Activity className="mr-2 h-4 w-4 text-blue-600" />
                      X-Ray
                    </Link>
                    <Link
                      href="/facilities/icu"
                      className="flex items-center py-2 text-gray-600 hover:text-red-600 transition-colors duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Heart className="mr-2 h-4 w-4 text-red-600" />
                      ICU, NICU, PICU
                    </Link>
                    <Link
                      href="/facilities/pathology"
                      className="flex items-center py-2 text-gray-600 hover:text-green-600 transition-colors duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Shield className="mr-2 h-4 w-4 text-green-600" />
                      Pathology
                    </Link>
                    <Link
                      href="/facilities/blood-bank"
                      className="flex items-center py-2 text-gray-600 hover:text-purple-600 transition-colors duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Activity className="mr-2 h-4 w-4 text-purple-600" />
                      Blood Bank
                    </Link>
                    <Link
                      href="/facilities/endoscopy"
                      className="flex items-center py-2 text-gray-600 hover:text-teal-600 transition-colors duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Activity className="mr-2 h-4 w-4 text-teal-600" />
                      Endoscopy
                    </Link>
                    <Link
                      href="/facilities/echo-ultrasound"
                      className="flex items-center py-2 text-gray-600 hover:text-pink-600 transition-colors duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Heart className="mr-2 h-4 w-4 text-pink-600" />
                      2D Echo & Ultrasound
                    </Link>
                    <Link
                      href="/facilities/physiotherapy"
                      className="flex items-center py-2 text-gray-600 hover:text-cyan-600 transition-colors duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Users className="mr-2 h-4 w-4 text-cyan-600" />
                      Physiotherapy
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Navigation Links */}
              <div className="border-t pt-2">
                <Link
                  href="/doctors"
                  className="block py-2 text-gray-600 hover:text-blue-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Our Doctors
                </Link>
                <Link
                  href="/gallery"
                  className="block py-2 text-gray-600 hover:text-blue-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Gallery
                </Link>
                <Link
                  href="/news-events"
                  className="block py-2 text-gray-600 hover:text-blue-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  News & Events
                </Link>
                <a
                  href="#doctors"
                  className="block py-2 text-gray-600 hover:text-blue-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About Doctors
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
        {/* Enhanced Mobile-Optimized Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500">
          {/* Animated Background Shapes */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Large background circles */}
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full animate-pulse"></div>
            <div
              className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full animate-pulse"
              style={{ animationDelay: "2s" }}
            ></div>

            {/* Medical cross pattern overlay */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
                <defs>
                  <pattern
                    id="medical-cross"
                    width="80"
                    height="80"
                    patternUnits="userSpaceOnUse"
                  >
                    <g fill="white">
                      <rect x="30" y="20" width="20" height="40" />
                      <rect x="20" y="30" width="40" height="20" />
                    </g>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#medical-cross)" />
              </svg>
            </div>
          </div>

          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-blue-900/20"></div>
        </div>

        {/* Enhanced Floating Medical Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-20 left-4 md:left-10 text-white/30 animate-bounce"
            style={{ animationDelay: "0s", animationDuration: "3s" }}
          >
            <Heart className="w-8 h-8 md:w-12 md:h-12" />
          </div>
          <div
            className="absolute top-40 right-4 md:right-20 text-white/25 animate-pulse"
            style={{ animationDelay: "1s" }}
          >
            <Activity className="w-6 h-6 md:w-10 md:h-10" />
          </div>
          <div
            className="absolute bottom-32 left-4 md:left-20 text-white/20 animate-bounce"
            style={{ animationDelay: "2s", animationDuration: "4s" }}
          >
            <Shield className="w-7 h-7 md:w-12 md:h-12" />
          </div>
          <div
            className="absolute top-1/3 right-8 md:right-32 text-white/15 animate-pulse"
            style={{ animationDelay: "3s" }}
          >
            <Stethoscope className="w-6 h-6 md:w-10 md:h-10" />
          </div>
          <div
            className="absolute bottom-1/4 right-4 md:right-16 text-white/25 animate-bounce"
            style={{ animationDelay: "1.5s", animationDuration: "5s" }}
          >
            <Zap className="w-5 h-5 md:w-8 md:h-8" />
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <div className="animate-fadeInUp">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
              Your Health is Our
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-100">
                {" "}
                Priority
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-4xl mx-auto leading-relaxed drop-shadow-md">
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
              className="bg-gradient-to-r from-white to-yellow-100 text-blue-600 hover:from-yellow-50 hover:to-yellow-200 text-lg px-10 py-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 font-semibold border-2 border-white/20"
            >
              <Calendar className="w-5 h-5 mr-3" />
              Book Appointment
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-10 py-4 rounded-full border-2 border-white text-white hover:bg-white hover:text-red-600 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 font-semibold backdrop-blur-sm"
            >
              <Phone className="w-5 h-5 mr-3" />
              Emergency: 101
            </Button>
          </div>

          {/* Trust Indicators */}
          <div
            className="mt-16 animate-fadeInUp"
            style={{ animationDelay: "0.6s" }}
          >
            <p className="text-sm text-white/80 mb-4 drop-shadow-md">
              Trusted by 2.45L+ patients
            </p>
            <div className="flex justify-center items-center space-x-8">
              <div className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-300 fill-current drop-shadow-sm"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
                <span className="ml-3 text-sm text-white font-medium drop-shadow-sm">
                  4.9/5 Rating
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AboutSection />

      {/* Healthcare Excellence Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Healthcare Excellence
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our commitment to delivering world-class healthcare services
              across four key pillars of excellence
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {/* Excellence Pillar 1 - Blue Theme */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-4 md:p-8 text-white transform hover:scale-105 transition duration-300 shadow-xl">
              <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-xl mb-4 md:mb-6">
                <Heart className="h-6 w-6 md:h-8 md:w-8 text-white" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold mb-3 md:mb-4">
                Medical Excellence
              </h3>
              <div className="space-y-2 md:space-y-3">
                <div className="flex items-center">
                  <span className="text-xl md:text-3xl font-bold">2.45L+</span>
                  <span className="ml-1 md:ml-2 text-xs md:text-sm text-blue-100">
                    Patients Treated
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-lg md:text-2xl font-bold">15+</span>
                  <span className="ml-1 md:ml-2 text-xs md:text-sm text-blue-100">
                    Expert Doctors
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-lg md:text-2xl font-bold">14+</span>
                  <span className="ml-1 md:ml-2 text-xs md:text-sm text-blue-100">
                    Departments
                  </span>
                </div>
              </div>
            </div>

            {/* Excellence Pillar 2 - Green Theme */}
            <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-2xl p-4 md:p-8 text-white transform hover:scale-105 transition duration-300 shadow-xl">
              <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-xl mb-4 md:mb-6">
                <Award className="h-6 w-6 md:h-8 md:w-8 text-white" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold mb-3 md:mb-4">
                Quality Care
              </h3>
              <div className="space-y-2 md:space-y-3">
                <div className="flex items-center">
                  <span className="text-xl md:text-3xl font-bold">NABH</span>
                  <span className="ml-1 md:ml-2 text-xs md:text-sm text-green-100">
                    Accredited
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-lg md:text-2xl font-bold">850+</span>
                  <span className="ml-1 md:ml-2 text-xs md:text-sm text-green-100">
                    Bed Capacity
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-lg md:text-2xl font-bold">98%</span>
                  <span className="ml-1 md:ml-2 text-xs md:text-sm text-green-100">
                    Success Rate
                  </span>
                </div>
              </div>
            </div>

            {/* Excellence Pillar 3 - Purple Theme */}
            <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl p-4 md:p-8 text-white transform hover:scale-105 transition duration-300 shadow-xl">
              <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-xl mb-4 md:mb-6">
                <Clock className="h-6 w-6 md:h-8 md:w-8 text-white" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold mb-3 md:mb-4">
                24/7 Services
              </h3>
              <div className="space-y-2 md:space-y-3">
                <div className="flex items-center">
                  <span className="text-xl md:text-3xl font-bold">24/7</span>
                  <span className="ml-1 md:ml-2 text-xs md:text-sm text-purple-100">
                    Emergency
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-lg md:text-2xl font-bold">15K+</span>
                  <span className="ml-1 md:ml-2 text-xs md:text-sm text-purple-100">
                    Surgeries
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-lg md:text-2xl font-bold">365</span>
                  <span className="ml-1 md:ml-2 text-xs md:text-sm text-purple-100">
                    Days/Year
                  </span>
                </div>
              </div>
            </div>

            {/* Excellence Pillar 4 - Orange Theme */}
            <div className="bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl p-4 md:p-8 text-white transform hover:scale-105 transition duration-300 shadow-xl">
              <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-xl mb-4 md:mb-6">
                <Users className="h-6 w-6 md:h-8 md:w-8 text-white" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold mb-3 md:mb-4">
                Patient First
              </h3>
              <div className="space-y-2 md:space-y-3">
                <div className="flex items-center">
                  <span className="text-xl md:text-3xl font-bold">39</span>
                  <span className="ml-1 md:ml-2 text-xs md:text-sm text-orange-100">
                    Years Legacy
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-lg md:text-2xl font-bold">95%</span>
                  <span className="ml-1 md:ml-2 text-xs md:text-sm text-orange-100">
                    Satisfaction
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-lg md:text-2xl font-bold">100%</span>
                  <span className="ml-1 md:ml-2 text-xs md:text-sm text-orange-100">
                    Dedication
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Call to action */}
          <div className="text-center mt-16">
            <Button
              onClick={() => setShowAppointmentForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg transform hover:scale-105 transition duration-300"
            >
              Book Your Appointment
            </Button>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {departments?.map((department, index) => (
              <Card
                key={department.id}
                className="card-hover hover-lift group relative overflow-hidden border-0 shadow-lg bg-white/80 backdrop-blur-sm animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Card Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <CardHeader className="relative">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
                    <div className="medical-icon animate-float flex-shrink-0">
                      {(() => {
                        const { icon: IconComponent, color } = getDepartmentIcon(department.name);
                        return (
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-white to-gray-50 border-2 border-gray-100 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 ${color}`}>
                            <IconComponent className="w-6 h-6" />
                          </div>
                        );
                      })()}
                    </div>
                    <CardTitle className="text-lg sm:text-xl font-bold text-blue-600 group-hover:text-blue-700 transition-colors text-center sm:text-left">
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
                    <div className="w-28 h-28 rounded-full mx-auto overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300 animate-glow border-4 border-blue-400">
                      <img
                        src={getDoctorImage(doctor.name, doctor.id)}
                        alt={doctor.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to default icon if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          target.parentElement!.classList.add(
                            "bg-gradient-to-br",
                            "from-blue-400",
                            "to-blue-600",
                            "flex",
                            "items-center",
                            "justify-center",
                          );
                          const icon = document.createElement("div");
                          icon.innerHTML =
                            '<svg class="w-14 h-14 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>';
                          target.parentElement!.appendChild(icon);
                        }}
                      />
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

                  {/* Social Media Links */}
                  <div className="flex justify-center space-x-3 mt-4">
                    <a
                      href={`https://www.facebook.com/doctor${doctor.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors duration-300 group/social"
                    >
                      <Facebook className="w-4 h-4 text-white group-hover/social:scale-110 transition-transform" />
                    </a>
                    <a
                      href={`https://www.instagram.com/doctor${doctor.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-full flex items-center justify-center transition-all duration-300 group/social"
                    >
                      <Instagram className="w-4 h-4 text-white group-hover/social:scale-110 transition-transform" />
                    </a>
                    <a
                      href={`https://youtube.com/@doctor${doctor.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors duration-300 group/social"
                    >
                      <Youtube className="w-4 h-4 text-white group-hover/social:scale-110 transition-transform" />
                    </a>
                  </div>

                  {/* Contact Button */}
                  <Link href={`/doctors/${doctor.id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4 w-full border-blue-200 text-blue-600 hover:bg-blue-50 group-hover:border-blue-400 transition-all duration-300"
                    >
                      View Profile
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* View All Doctors Button */}
          <div
            className="text-center mt-16 animate-fadeInUp"
            style={{ animationDelay: "0.9s" }}
          >
            <Link href="/doctors">
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-3 border-2 border-blue-500 text-blue-600 hover:bg-blue-50 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                View All Doctors
              </Button>
            </Link>
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
            <div
              className="flex space-x-8 pb-4"
              style={{ width: "max-content" }}
            >
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
                  style={{ animationDelay: `${index * 0.2}s`, width: "380px" }}
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
              <p className="opacity-90">9918982900</p>
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
              <p className="opacity-90">Shri Krishna Nagar Dhorika Road</p>
              <p className="opacity-90">Bargodwa Near Bodewan Basti 272001</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hospital Location Map Section */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h4 className="text-2xl font-bold text-white mb-4">
                Our Location
              </h4>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Visit us at our state-of-the-art facility located in the heart
                of the city, easily accessible and equipped with modern
                healthcare amenities.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-4xl rounded-lg overflow-hidden shadow-2xl border-4 border-gray-700">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.8602943765654!2d82.7167783762586!3d26.812576676707092!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3990cfee7d33c05f%3A0x220ef7c5e2883edf!2sShri%20Krishna%20Mission%20Hospital!5e0!3m2!1sen!2sin!4v1753333918054!5m2!1sen!2sin"
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Shri Krishna Mission Hospital Location"
                />
              </div>
            </div>
            <div className="text-center mt-6">
              <div className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg">
                <MapPin className="w-5 h-5 mr-2" />
                <span className="font-semibold">
                  Shri Krishna Nagar Dhorika Road, Bargodwa Near Bodewan Basti
                  272001
                </span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h5 className="text-lg font-semibold mb-4">
                Shri Krishna Mission Hospital
              </h5>
              <p className="text-gray-400 mb-4">
                Providing exceptional healthcare services with compassion and
                excellence.
              </p>

              {/* Social Media Links */}
              <div className="flex space-x-3">
                <a
                  href="https://www.facebook.com/share/1B6cferwga/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors duration-300"
                >
                  <Facebook className="w-5 h-5 text-white" />
                </a>
                <a
                  href="https://youtube.com/@shrikrishnamissionhospital3376?si=dAwA02Upoef10ECt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors duration-300"
                >
                  <Youtube className="w-5 h-5 text-white" />
                </a>
                <a
                  href="https://www.instagram.com/shrikrishnamissionhospital?igsh=MWZwOXZydHR1c3p2aQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-full flex items-center justify-center transition-all duration-300"
                >
                  <Instagram className="w-5 h-5 text-white" />
                </a>
              </div>
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
