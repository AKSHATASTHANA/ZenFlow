import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Clock, Shield, Users, Phone, Mail, ChevronLeft, Waves } from "lucide-react";
import { Link } from "wouter";

export default function EchoUltrasoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-pink-600 hover:text-pink-700">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Home
              </Button>
            </Link>
            <div className="border-l border-gray-300 h-6"></div>
            <h1 className="text-2xl font-bold text-gray-900">2D Echo & Ultrasound</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center">
              <Heart className="w-10 h-10 text-pink-600" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">2D Echo & Ultrasound Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced cardiac imaging and comprehensive ultrasound services using high-resolution 
            equipment for accurate diagnosis and monitoring of heart conditions and general health.
          </p>
        </div>

        {/* Ultrasound Equipment Image */}
        <div className="mb-16">
          <Card className="overflow-hidden">
            <div className="relative h-96 bg-gradient-to-br from-pink-100 to-pink-50 flex items-center justify-center">
              {/* SVG Ultrasound Equipment */}
              <svg width="500" height="300" viewBox="0 0 500 300" className="drop-shadow-lg">
                {/* Ultrasound Machine */}
                <rect x="50" y="100" width="120" height="150" rx="8" fill="#374151" stroke="#4b5563" strokeWidth="3"/>
                
                {/* Main Monitor */}
                <rect x="60" y="110" width="100" height="80" rx="6" fill="#111827"/>
                <rect x="65" y="115" width="90" height="70" rx="4" fill="#1f2937"/>
                
                {/* Ultrasound Image on Screen */}
                <g transform="translate(110, 150)">
                  <circle cx="0" cy="0" r="25" fill="#1e40af" opacity="0.3"/>
                  <circle cx="0" cy="0" r="20" fill="#3b82f6" opacity="0.4"/>
                  <circle cx="0" cy="0" r="15" fill="#60a5fa" opacity="0.5"/>
                  <circle cx="0" cy="0" r="10" fill="#93c5fd" opacity="0.6"/>
                  
                  {/* Heart chambers simulation */}
                  <ellipse cx="-5" cy="-5" rx="8" ry="12" fill="#ef4444" opacity="0.6">
                    <animate attributeName="ry" values="12;14;12" dur="1s" repeatCount="indefinite"/>
                  </ellipse>
                  <ellipse cx="5" cy="-5" rx="8" ry="12" fill="#dc2626" opacity="0.6">
                    <animate attributeName="ry" values="12;14;12" dur="1s" repeatCount="indefinite" begin="0.5s"/>
                  </ellipse>
                </g>
                
                {/* Control Panel */}
                <rect x="60" y="200" width="100" height="40" rx="4" fill="#6b7280"/>
                
                {/* Buttons and Controls */}
                <g transform="translate(70, 210)">
                  <circle cx="10" cy="5" r="3" fill="#10b981"/>
                  <circle cx="20" cy="5" r="3" fill="#f59e0b"/>
                  <circle cx="30" cy="5" r="3" fill="#ef4444"/>
                  <circle cx="40" cy="5" r="3" fill="#3b82f6"/>
                  <circle cx="50" cy="5" r="3" fill="#8b5cf6"/>
                  
                  {/* Sliders */}
                  <rect x="5" y="15" width="60" height="3" rx="1" fill="#9ca3af"/>
                  <rect x="5" y="22" width="60" height="3" rx="1" fill="#9ca3af"/>
                  
                  {/* Slider handles */}
                  <circle cx="25" cy="16" r="2" fill="#1f2937"/>
                  <circle cx="35" cy="23" r="2" fill="#1f2937"/>
                </g>
                
                {/* Probe/Transducer */}
                <g transform="translate(200, 180)">
                  {/* Cable */}
                  <path d="M 0 0 Q 30 -20 60 -10 Q 90 0 120 10 Q 150 20 180 15" 
                        stroke="#1f2937" strokeWidth="6" fill="none" strokeLinecap="round"/>
                  
                  {/* Probe Handle */}
                  <ellipse cx="180" cy="15" rx="15" ry="8" fill="#4b5563"/>
                  <rect x="165" y="11" width="30" height="8" rx="4" fill="#6b7280"/>
                  
                  {/* Transducer Head */}
                  <ellipse cx="195" cy="15" rx="8" ry="5" fill="#374151"/>
                  
                  {/* Ultrasound Waves */}
                  <g opacity="0.6">
                    <path d="M 203 15 Q 220 10 235 15 Q 250 20 265 15" 
                          stroke="#60a5fa" strokeWidth="2" fill="none">
                      <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1.5s" repeatCount="indefinite"/>
                    </path>
                    <path d="M 205 15 Q 225 8 245 15 Q 265 22 285 15" 
                          stroke="#3b82f6" strokeWidth="2" fill="none">
                      <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1.5s" repeatCount="indefinite" begin="0.3s"/>
                    </path>
                    <path d="M 207 15 Q 230 6 255 15 Q 280 24 305 15" 
                          stroke="#1e40af" strokeWidth="2" fill="none">
                      <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1.5s" repeatCount="indefinite" begin="0.6s"/>
                    </path>
                  </g>
                </g>
                
                {/* Patient Examination Table */}
                <g transform="translate(280, 200)">
                  <rect x="0" y="0" width="100" height="50" rx="8" fill="#f3f4f6" stroke="#9ca3af" strokeWidth="2"/>
                  <rect x="10" y="-10" width="80" height="15" rx="4" fill="#e5e7eb"/>
                  
                  {/* Patient */}
                  <ellipse cx="50" cy="10" rx="12" ry="5" fill="#fbbf24"/>
                  <rect x="38" y="15" width="24" height="25" rx="4" fill="#ddd6fe"/>
                  
                  {/* ECG leads */}
                  <circle cx="35" cy="20" r="2" fill="#ef4444"/>
                  <circle cx="65" cy="20" r="2" fill="#10b981"/>
                  <circle cx="50" cy="30" r="2" fill="#3b82f6"/>
                </g>
                
                {/* Secondary Monitor */}
                <g transform="translate(380, 120)">
                  <rect x="0" y="0" width="70" height="50" rx="4" fill="#1f2937"/>
                  <rect x="5" y="5" width="60" height="40" rx="2" fill="#111827"/>
                  
                  {/* ECG Trace */}
                  <g stroke="#10b981" strokeWidth="2" fill="none">
                    <path d="M 10 25 L 15 25 L 20 15 L 25 35 L 30 10 L 35 40 L 40 25 L 45 25 L 50 25 L 55 25 L 60 25">
                      <animateTransform attributeName="transform" type="translate" 
                                        values="0,0;-50,0;0,0" dur="2s" repeatCount="indefinite"/>
                    </path>
                  </g>
                </g>
                
                {/* Gel Bottle */}
                <g transform="translate(220, 120)">
                  <rect x="0" y="0" width="12" height="20" rx="6" fill="#3b82f6"/>
                  <rect x="2" y="2" width="8" height="16" rx="4" fill="#60a5fa"/>
                  <circle cx="6" cy="-2" r="3" fill="#1e40af"/>
                  <text x="6" y="30" textAnchor="middle" fill="#374151" fontSize="6">GEL</text>
                </g>
                
                {/* Keyboard */}
                <g transform="translate(180, 250)">
                  <rect x="0" y="0" width="80" height="25" rx="4" fill="#9ca3af"/>
                  {/* Keys */}
                  <rect x="5" y="5" width="8" height="6" rx="1" fill="#f3f4f6"/>
                  <rect x="15" y="5" width="8" height="6" rx="1" fill="#f3f4f6"/>
                  <rect x="25" y="5" width="8" height="6" rx="1" fill="#f3f4f6"/>
                  <rect x="35" y="5" width="8" height="6" rx="1" fill="#f3f4f6"/>
                  <rect x="45" y="5" width="8" height="6" rx="1" fill="#f3f4f6"/>
                  <rect x="55" y="5" width="8" height="6" rx="1" fill="#f3f4f6"/>
                  <rect x="65" y="5" width="8" height="6" rx="1" fill="#f3f4f6"/>
                  
                  <rect x="5" y="13" width="12" height="6" rx="1" fill="#f3f4f6"/>
                  <rect x="19" y="13" width="12" height="6" rx="1" fill="#f3f4f6"/>
                  <rect x="33" y="13" width="12" height="6" rx="1" fill="#f3f4f6"/>
                  <rect x="47" y="13" width="12" height="6" rx="1" fill="#f3f4f6"/>
                  <rect x="61" y="13" width="12" height="6" rx="1" fill="#f3f4f6"/>
                </g>
                
                {/* Printer */}
                <g transform="translate(420, 180)">
                  <rect x="0" y="0" width="50" height="30" rx="4" fill="#6b7280"/>
                  <rect x="5" y="5" width="40" height="20" rx="2" fill="#9ca3af"/>
                  
                  {/* Paper coming out */}
                  <rect x="10" y="-5" width="30" height="10" rx="2" fill="white" stroke="#d1d5db"/>
                  <g stroke="#ef4444" strokeWidth="1">
                    <line x1="15" y1="0" x2="40" y2="0"/>
                    <line x1="15" y1="3" x2="40" y2="3"/>
                  </g>
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
                <CardTitle className="flex items-center text-pink-600">
                  <Heart className="w-5 h-5 mr-2" />
                  Cardiac Imaging Services
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { name: "2D Echocardiography", desc: "Detailed heart structure assessment" },
                    { name: "Doppler Studies", desc: "Blood flow evaluation" },
                    { name: "Stress Echocardiography", desc: "Exercise-induced cardiac assessment" },
                    { name: "TEE (Transesophageal)", desc: "Advanced cardiac imaging" },
                    { name: "Fetal Echocardiography", desc: "Prenatal heart screening" },
                    { name: "3D/4D Echo", desc: "Three-dimensional heart imaging" }
                  ].map((service) => (
                    <div key={service.name} className="p-3 bg-pink-50 rounded-lg border border-pink-200">
                      <div className="flex items-start">
                        <Heart className="w-4 h-4 text-pink-600 mr-3 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-gray-900">{service.name}</h4>
                          <p className="text-sm text-gray-600">{service.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-blue-600">
                  <Waves className="w-5 h-5 mr-2" />
                  General Ultrasound Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Abdominal Ultrasound",
                    "Pelvic Ultrasound",
                    "Obstetric Ultrasound",
                    "Thyroid Ultrasound",
                    "Breast Ultrasound",
                    "Scrotal Ultrasound",
                    "Renal Ultrasound",
                    "Carotid Doppler",
                    "Venous Doppler",
                    "Arterial Doppler"
                  ].map((service) => (
                    <div key={service} className="flex items-center p-2 bg-blue-50 rounded">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      <span className="text-sm text-gray-700">{service}</span>
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
                    <span className="text-gray-600">Echo Services</span>
                    <Badge variant="secondary">8:00 AM - 6:00 PM</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">General Ultrasound</span>
                    <Badge variant="secondary">8:00 AM - 8:00 PM</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Emergency Scans</span>
                    <Badge className="bg-red-500">24/7 Available</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Obstetric Emergency</span>
                    <Badge className="bg-green-500">24/7 Available</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-green-600">
                  <Users className="w-5 h-5 mr-2" />
                  Expert Team
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Cardiologists</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Echo-certified specialists</li>
                      <li>• Advanced cardiac imaging</li>
                      <li>• Interventional expertise</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Radiologists</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Ultrasound specialists</li>
                      <li>• Doppler imaging experts</li>
                      <li>• Interventional radiologists</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Technical Staff</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Certified sonographers</li>
                      <li>• Echo technicians</li>
                      <li>• Cardiac technologists</li>
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
                  <Phone className="w-4 h-4 text-pink-600 mr-3" />
                  <span className="text-gray-700">Echo/Ultrasound: +91-XXX-XXX-XXXX</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 text-pink-600 mr-3" />
                  <span className="text-gray-700">imaging@shrikrishnamission.com</span>
                </div>
                <Button className="w-full bg-pink-600 hover:bg-pink-700">
                  Schedule Scan
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}