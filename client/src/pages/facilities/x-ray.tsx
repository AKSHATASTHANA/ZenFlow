import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, Clock, Shield, Users, Phone, Mail, ChevronLeft } from "lucide-react";
import { Link } from "wouter";

export default function XRayPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Home
              </Button>
            </Link>
            <div className="border-l border-gray-300 h-6"></div>
            <h1 className="text-2xl font-bold text-gray-900">X-Ray Facility</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <Activity className="w-10 h-10 text-blue-600" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Digital X-Ray Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            State-of-the-art digital X-ray technology providing high-quality diagnostic imaging 
            with minimal radiation exposure and instant results.
          </p>
        </div>

        {/* X-Ray Machine Image */}
        <div className="mb-16">
          <Card className="overflow-hidden">
            <div className="relative h-96 bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
              {/* SVG X-Ray Machine */}
              <svg width="300" height="250" viewBox="0 0 300 250" className="drop-shadow-lg">
                {/* Machine Base */}
                <rect x="50" y="180" width="200" height="60" rx="8" fill="#374151" stroke="#4b5563" strokeWidth="2"/>
                
                {/* Main Unit */}
                <rect x="80" y="120" width="140" height="80" rx="6" fill="#6b7280" stroke="#4b5563" strokeWidth="2"/>
                
                {/* Control Panel */}
                <rect x="90" y="130" width="120" height="25" rx="4" fill="#1f2937"/>
                <circle cx="100" cy="142" r="3" fill="#10b981"/>
                <circle cx="110" cy="142" r="3" fill="#f59e0b"/>
                <circle cx="120" cy="142" r="3" fill="#ef4444"/>
                
                {/* Screen */}
                <rect x="140" y="135" width="60" height="40" rx="4" fill="#111827" stroke="#374151" strokeWidth="1"/>
                <rect x="145" y="140" width="50" height="30" rx="2" fill="#1e40af"/>
                
                {/* X-Ray Tube Housing */}
                <ellipse cx="150" cy="80" rx="40" ry="20" fill="#4b5563" stroke="#374151" strokeWidth="2"/>
                
                {/* C-Arm */}
                <path d="M 110 80 Q 110 50 150 50 Q 190 50 190 80" 
                      stroke="#6b7280" strokeWidth="8" fill="none" strokeLinecap="round"/>
                
                {/* Detector */}
                <rect x="130" y="200" width="40" height="20" rx="4" fill="#374151" stroke="#4b5563" strokeWidth="2"/>
                
                {/* Support Column */}
                <rect x="145" y="80" width="10" height="120" fill="#6b7280"/>
                
                {/* X-Ray Beams */}
                <g opacity="0.6">
                  <path d="M 150 100 L 130 220" stroke="#60a5fa" strokeWidth="2" opacity="0.7">
                    <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite"/>
                  </path>
                  <path d="M 150 100 L 150 220" stroke="#60a5fa" strokeWidth="3" opacity="0.8">
                    <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite"/>
                  </path>
                  <path d="M 150 100 L 170 220" stroke="#60a5fa" strokeWidth="2" opacity="0.7">
                    <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite"/>
                  </path>
                </g>
                
                {/* Status LED */}
                <circle cx="160" cy="85" r="4" fill="#10b981">
                  <animate attributeName="fill" values="#10b981;#34d399;#10b981" dur="1s" repeatCount="indefinite"/>
                </circle>
              </svg>
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Service Details */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-blue-600">
                  <Activity className="w-5 h-5 mr-2" />
                  X-Ray Services Available
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  {[
                    "Chest X-Ray",
                    "Bone & Joint X-Ray",
                    "Abdominal X-Ray",
                    "Skull & Spine X-Ray",
                    "Dental X-Ray",
                    "Mammography",
                  ].map((service) => (
                    <div key={service} className="flex items-center p-3 bg-blue-50 rounded-lg">
                      <Shield className="w-4 h-4 text-blue-600 mr-3" />
                      <span className="text-gray-700">{service}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-green-600">
                  <Shield className="w-5 h-5 mr-2" />
                  Safety Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                    <span className="text-gray-700">Low radiation dose digital technology</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                    <span className="text-gray-700">Lead protection for staff and patients</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                    <span className="text-gray-700">Automated exposure control</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                    <span className="text-gray-700">Quality assurance protocols</span>
                  </li>
                </ul>
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
                    <span className="text-gray-600">Monday - Friday</span>
                    <Badge variant="secondary">8:00 AM - 8:00 PM</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <Badge variant="secondary">9:00 AM - 6:00 PM</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <Badge variant="outline">Emergency Only</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Emergency</span>
                    <Badge className="bg-red-500">24/7 Available</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-orange-600">
                  <Users className="w-5 h-5 mr-2" />
                  Staff & Equipment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Expert Team</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Certified Radiologic Technologists</li>
                      <li>• Board-certified Radiologists</li>
                      <li>• Technical Support Staff</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Equipment</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Digital X-Ray Systems</li>
                      <li>• Portable X-Ray Units</li>
                      <li>• PACS Image Management</li>
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
                  <Phone className="w-4 h-4 text-blue-600 mr-3" />
                  <span className="text-gray-700">X-Ray Dept: +91-XXX-XXX-XXXX</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 text-blue-600 mr-3" />
                  <span className="text-gray-700">xray@shrikrishnamission.com</span>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Schedule X-Ray Appointment
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}