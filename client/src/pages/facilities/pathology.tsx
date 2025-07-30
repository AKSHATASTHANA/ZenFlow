import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Clock, Activity, Users, Phone, Mail, ChevronLeft, Microscope } from "lucide-react";
import { Link } from "wouter";

export default function PathologyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Home
              </Button>
            </Link>
            <div className="border-l border-gray-300 h-6"></div>
            <h1 className="text-2xl font-bold text-gray-900">Pathology Laboratory</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <Shield className="w-10 h-10 text-green-600" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Advanced Pathology Lab</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive diagnostic testing services with state-of-the-art laboratory equipment 
            and certified pathologists providing accurate and timely results.
          </p>
        </div>

        {/* Laboratory Equipment Image */}
        <div className="mb-16">
          <Card className="overflow-hidden">
            <div className="relative h-96 bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center">
              {/* SVG Laboratory Equipment */}
              <svg width="500" height="300" viewBox="0 0 500 300" className="drop-shadow-lg">
                {/* Lab Bench */}
                <rect x="50" y="200" width="400" height="80" rx="8" fill="#f3f4f6" stroke="#9ca3af" strokeWidth="2"/>
                
                {/* Microscope */}
                <g transform="translate(120, 120)">
                  {/* Base */}
                  <ellipse cx="0" cy="60" rx="30" ry="15" fill="#374151"/>
                  {/* Arm */}
                  <rect x="-5" y="20" width="10" height="40" rx="5" fill="#4b5563"/>
                  {/* Head */}
                  <circle cx="0" cy="20" r="15" fill="#6b7280"/>
                  {/* Eyepiece */}
                  <rect x="-8" y="5" width="16" height="20" rx="8" fill="#1f2937"/>
                  {/* Objective */}
                  <circle cx="0" cy="35" r="6" fill="#374151"/>
                  {/* Stage */}
                  <rect x="-20" y="35" width="40" height="8" rx="4" fill="#9ca3af"/>
                  {/* Light source */}
                  <circle cx="0" cy="50" r="8" fill="#fbbf24">
                    <animate attributeName="fill" values="#fbbf24;#fde047;#fbbf24" dur="2s" repeatCount="indefinite"/>
                  </circle>
                </g>
                
                {/* Automated Analyzer */}
                <g transform="translate(250, 140)">
                  <rect x="0" y="0" width="100" height="60" rx="8" fill="#374151" stroke="#4b5563" strokeWidth="2"/>
                  <rect x="10" y="10" width="80" height="30" rx="4" fill="#111827"/>
                  <rect x="15" y="15" width="70" height="20" rx="2" fill="#1e40af"/>
                  
                  {/* Control Panel */}
                  <circle cx="20" cy="50" r="4" fill="#10b981"/>
                  <circle cx="35" cy="50" r="4" fill="#f59e0b"/>
                  <circle cx="50" cy="50" r="4" fill="#ef4444"/>
                  
                  {/* Sample tubes */}
                  <rect x="70" y="45" width="6" height="15" rx="3" fill="#8b5cf6"/>
                  <rect x="80" y="45" width="6" height="15" rx="3" fill="#ec4899"/>
                  <rect x="90" y="45" width="6" height="15" rx="3" fill="#06b6d4"/>
                </g>
                
                {/* Centrifuge */}
                <g transform="translate(380, 150)">
                  <circle cx="0" cy="0" r="25" fill="#6b7280" stroke="#4b5563" strokeWidth="2"/>
                  <circle cx="0" cy="0" r="15" fill="#374151"/>
                  <circle cx="0" cy="0" r="8" fill="#9ca3af">
                    <animateTransform attributeName="transform" type="rotate" 
                                      values="0;360" dur="1s" repeatCount="indefinite"/>
                  </circle>
                  {/* Lid */}
                  <path d="M -20 -15 A 20 20 0 0 1 20 -15" stroke="#4b5563" strokeWidth="3" fill="none"/>
                </g>
                
                {/* Test Tubes Rack */}
                <g transform="translate(100, 170)">
                  <rect x="0" y="0" width="60" height="20" rx="4" fill="#9ca3af"/>
                  {/* Test tubes */}
                  <rect x="5" y="-15" width="4" height="20" rx="2" fill="#ef4444"/>
                  <rect x="15" y="-15" width="4" height="20" rx="2" fill="#10b981"/>
                  <rect x="25" y="-15" width="4" height="20" rx="2" fill="#3b82f6"/>
                  <rect x="35" y="-15" width="4" height="20" rx="2" fill="#f59e0b"/>
                  <rect x="45" y="-15" width="4" height="20" rx="2" fill="#8b5cf6"/>
                  <rect x="55" y="-15" width="4" height="20" rx="2" fill="#06b6d4"/>
                </g>
                
                {/* Computer Terminal */}
                <g transform="translate(300, 200)">
                  <rect x="0" y="0" width="50" height="30" rx="4" fill="#1f2937"/>
                  <rect x="5" y="5" width="40" height="20" rx="2" fill="#111827"/>
                  {/* Screen content */}
                  <rect x="8" y="8" width="34" height="14" rx="1" fill="#1e40af"/>
                  <text x="25" y="18" textAnchor="middle" fill="#60a5fa" fontSize="6">LAB RESULTS</text>
                </g>
                
                {/* Reagent Bottles */}
                <g transform="translate(180, 160)">
                  <rect x="0" y="0" width="8" height="25" rx="4" fill="#dc2626"/>
                  <rect x="12" y="0" width="8" height="25" rx="4" fill="#059669"/>
                  <rect x="24" y="0" width="8" height="25" rx="4" fill="#2563eb"/>
                  
                  {/* Labels */}
                  <rect x="0" y="8" width="8" height="8" fill="white" opacity="0.8"/>
                  <rect x="12" y="8" width="8" height="8" fill="white" opacity="0.8"/>
                  <rect x="24" y="8" width="8" height="8" fill="white" opacity="0.8"/>
                </g>
                
                {/* Safety Equipment */}
                <g transform="translate(430, 180)">
                  {/* Gloves */}
                  <ellipse cx="0" cy="0" rx="8" ry="12" fill="#3b82f6" opacity="0.7"/>
                  <ellipse cx="0" cy="5" rx="6" ry="8" fill="#60a5fa" opacity="0.5"/>
                </g>
              </svg>
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Service Details */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-green-600">
                  <Shield className="w-5 h-5 mr-2" />
                  Laboratory Services
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { name: "Blood Tests", icon: "🩸" },
                    { name: "Urine Analysis", icon: "🧪" },
                    { name: "Stool Examination", icon: "🔬" },
                    { name: "Microbiology", icon: "🦠" },
                    { name: "Histopathology", icon: "🧬" },
                    { name: "Cytology", icon: "🔍" },
                    { name: "Biochemistry", icon: "⚗️" },
                    { name: "Immunology", icon: "🛡️" }
                  ].map((service) => (
                    <div key={service.name} className="flex items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-lg mr-3">{service.icon}</span>
                      <span className="text-gray-700">{service.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-blue-600">
                  <Activity className="w-5 h-5 mr-2" />
                  Specialized Tests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    "Hormone Assays",
                    "Tumor Markers",
                    "Cardiac Enzymes",
                    "Liver Function Tests",
                    "Kidney Function Tests",
                    "Lipid Profile",
                    "Thyroid Function",
                    "Diabetic Profile"
                  ].map((test) => (
                    <div key={test} className="flex items-center p-2 bg-blue-50 rounded">
                      <Activity className="w-3 h-3 text-blue-600 mr-2" />
                      <span className="text-sm text-gray-700">{test}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Facility Information */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-purple-600">
                  <Clock className="w-5 h-5 mr-2" />
                  Operating Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sample Collection</span>
                    <Badge variant="secondary">7:00 AM - 11:00 AM</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Report Collection</span>
                    <Badge variant="secondary">4:00 PM - 8:00 PM</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Emergency Tests</span>
                    <Badge className="bg-red-500">24/7 Available</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Home Collection</span>
                    <Badge className="bg-green-500">Available</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-orange-600">
                  <Users className="w-5 h-5 mr-2" />
                  Expert Team
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Pathologists</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• MD Pathology Specialists</li>
                      <li>• Clinical Pathologists</li>
                      <li>• Microbiologists</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Technical Staff</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Laboratory Technicians</li>
                      <li>• Phlebotomists</li>
                      <li>• Quality Control Specialists</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Accreditation</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• NABL Accredited</li>
                      <li>• ISO 15189 Certified</li>
                      <li>• CAP Approved</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-gray-900">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 text-green-600 mr-3" />
                  <span className="text-gray-700">Lab: +91-XXX-XXX-XXXX</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 text-green-600 mr-3" />
                  <span className="text-gray-700">lab@shrikrishnamission.com</span>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Book Lab Test
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}