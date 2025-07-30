import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, Clock, Shield, Users, Phone, Mail, ChevronLeft, Eye } from "lucide-react";
import { Link } from "wouter";

export default function EndoscopyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-teal-600 hover:text-teal-700">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Home
              </Button>
            </Link>
            <div className="border-l border-gray-300 h-6"></div>
            <h1 className="text-2xl font-bold text-gray-900">Endoscopy Unit</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center">
              <Activity className="w-10 h-10 text-teal-600" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Advanced Endoscopy Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            State-of-the-art endoscopic procedures for diagnostic and therapeutic interventions 
            with high-definition imaging and minimally invasive techniques.
          </p>
        </div>

        {/* Endoscopy Equipment Image */}
        <div className="mb-16">
          <Card className="overflow-hidden">
            <div className="relative h-96 bg-gradient-to-br from-teal-100 to-teal-50 flex items-center justify-center">
              {/* SVG Endoscopy Equipment */}
              <svg width="500" height="300" viewBox="0 0 500 300" className="drop-shadow-lg">
                {/* Endoscopy Tower */}
                <rect x="50" y="50" width="80" height="150" rx="8" fill="#374151" stroke="#4b5563" strokeWidth="2"/>
                
                {/* Monitor Stack */}
                <rect x="60" y="60" width="60" height="30" rx="4" fill="#111827"/>
                <rect x="65" y="65" width="50" height="20" rx="2" fill="#1e40af"/>
                
                <rect x="60" y="100" width="60" height="30" rx="4" fill="#111827"/>
                <rect x="65" y="105" width="50" height="20" rx="2" fill="#059669"/>
                
                <rect x="60" y="140" width="60" height="30" rx="4" fill="#111827"/>
                <rect x="65" y="145" width="50" height="20" rx="2" fill="#dc2626"/>
                
                {/* Control Panel */}
                <rect x="60" y="180" width="60" height="15" rx="4" fill="#6b7280"/>
                <circle cx="70" cy="187" r="2" fill="#10b981"/>
                <circle cx="80" cy="187" r="2" fill="#f59e0b"/>
                <circle cx="90" cy="187" r="2" fill="#ef4444"/>
                <circle cx="100" cy="187" r="2" fill="#3b82f6"/>
                <circle cx="110" cy="187" r="2" fill="#8b5cf6"/>
                
                {/* Endoscope */}
                <g transform="translate(150, 120)">
                  {/* Handle */}
                  <rect x="0" y="0" width="40" height="15" rx="7" fill="#4b5563"/>
                  <rect x="5" y="3" width="30" height="9" rx="4" fill="#6b7280"/>
                  
                  {/* Flexible Cable */}
                  <path d="M 40 7 Q 80 7 120 20 Q 160 35 200 35 Q 240 35 280 50 Q 320 65 350 80" 
                        stroke="#1f2937" strokeWidth="8" fill="none" strokeLinecap="round"/>
                  
                  {/* Light Guide Cable */}
                  <path d="M 40 12 Q 80 12 120 25 Q 160 40 200 40 Q 240 40 280 55 Q 320 70 350 85" 
                        stroke="#fbbf24" strokeWidth="3" fill="none" strokeLinecap="round">
                    <animate attributeName="stroke" values="#fbbf24;#f59e0b;#fbbf24" dur="2s" repeatCount="indefinite"/>
                  </path>
                  
                  {/* Endoscope Tip */}
                  <circle cx="350" cy="82" r="6" fill="#374151"/>
                  <circle cx="350" cy="82" r="3" fill="#1e40af">
                    <animate attributeName="fill" values="#1e40af;#60a5fa;#1e40af" dur="1s" repeatCount="indefinite"/>
                  </circle>
                </g>
                
                {/* Patient Bed */}
                <g transform="translate(280, 180)">
                  <rect x="0" y="0" width="120" height="60" rx="8" fill="#f3f4f6" stroke="#9ca3af" strokeWidth="2"/>
                  <rect x="10" y="-10" width="100" height="15" rx="4" fill="#e5e7eb"/>
                  
                  {/* Patient */}
                  <ellipse cx="60" cy="10" rx="15" ry="6" fill="#fbbf24"/>
                  <rect x="45" y="15" width="30" height="35" rx="4" fill="#ddd6fe"/>
                  
                  {/* Bed Rails */}
                  <rect x="-5" y="5" width="3" height="25" fill="#9ca3af"/>
                  <rect x="122" y="5" width="3" height="25" fill="#9ca3af"/>
                </g>
                
                {/* Light Source */}
                <g transform="translate(160, 60)">
                  <rect x="0" y="0" width="50" height="40" rx="6" fill="#6b7280"/>
                  <circle cx="25" cy="20" r="12" fill="#fbbf24">
                    <animate attributeName="fill" values="#fbbf24;#f59e0b;#fbbf24" dur="1.5s" repeatCount="indefinite"/>
                  </circle>
                  <text x="25" y="50" textAnchor="middle" fill="#374151" fontSize="8">LIGHT</text>
                </g>
                
                {/* Monitor Display */}
                <g transform="translate(200, 50)">
                  <rect x="0" y="0" width="80" height="60" rx="6" fill="#1f2937" stroke="#374151" strokeWidth="2"/>
                  <rect x="5" y="5" width="70" height="50" rx="4" fill="#111827"/>
                  
                  {/* Endoscopic View */}
                  <circle cx="40" cy="30" r="20" fill="#dc2626" opacity="0.3"/>
                  <circle cx="40" cy="30" r="15" fill="#f59e0b" opacity="0.4"/>
                  <circle cx="40" cy="30" r="10" fill="#10b981" opacity="0.5"/>
                  
                  {/* Crosshairs */}
                  <line x1="40" y1="15" x2="40" y2="45" stroke="#60a5fa" strokeWidth="1"/>
                  <line x1="25" y1="30" x2="55" y2="30" stroke="#60a5fa" strokeWidth="1"/>
                </g>
                
                {/* Instrument Tray */}
                <g transform="translate(420, 120)">
                  <rect x="0" y="0" width="60" height="40" rx="4" fill="#e5e7eb"/>
                  
                  {/* Instruments */}
                  <rect x="5" y="5" width="3" height="25" rx="1" fill="#6b7280"/>
                  <rect x="12" y="5" width="3" height="25" rx="1" fill="#6b7280"/>
                  <rect x="19" y="5" width="3" height="25" rx="1" fill="#6b7280"/>
                  <rect x="26" y="5" width="3" height="25" rx="1" fill="#6b7280"/>
                  
                  {/* Biopsy Forceps */}
                  <circle cx="40" cy="15" r="3" fill="#374151"/>
                  <rect x="37" y="18" width="6" height="15" rx="1" fill="#4b5563"/>
                  
                  {/* Injection Needle */}
                  <circle cx="50" cy="15" r="2" fill="#dc2626"/>
                  <rect x="49" y="18" width="2" height="15" rx="1" fill="#ef4444"/>
                </g>
                
                {/* CO2 Tank */}
                <g transform="translate(30, 220)">
                  <rect x="0" y="0" width="15" height="50" rx="7" fill="#6b7280"/>
                  <circle cx="7" cy="0" r="5" fill="#10b981"/>
                  <text x="7" y="60" textAnchor="middle" fill="#374151" fontSize="6">CO2</text>
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
                <CardTitle className="flex items-center text-teal-600">
                  <Activity className="w-5 h-5 mr-2" />
                  Endoscopy Procedures
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { name: "Upper GI Endoscopy", desc: "Stomach & duodenum examination" },
                    { name: "Colonoscopy", desc: "Colon & rectum screening" },
                    { name: "ERCP", desc: "Bile duct & pancreas procedures" },
                    { name: "Bronchoscopy", desc: "Lung & airway examination" },
                    { name: "Cystoscopy", desc: "Bladder & urinary tract" },
                    { name: "Arthroscopy", desc: "Joint examination & surgery" }
                  ].map((procedure) => (
                    <div key={procedure.name} className="p-3 bg-teal-50 rounded-lg border border-teal-200">
                      <div className="flex items-start">
                        <Eye className="w-4 h-4 text-teal-600 mr-3 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-gray-900">{procedure.name}</h4>
                          <p className="text-sm text-gray-600">{procedure.desc}</p>
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
                  <Shield className="w-5 h-5 mr-2" />
                  Advanced Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    "High-Definition Imaging",
                    "Narrow Band Imaging (NBI)",
                    "Therapeutic Interventions",
                    "Biopsy Capabilities",
                    "Polypectomy Procedures",
                    "Hemostasis Treatment",
                    "Stricture Dilation",
                    "Foreign Body Removal"
                  ].map((feature) => (
                    <div key={feature} className="flex items-center p-2 bg-blue-50 rounded">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      <span className="text-sm text-gray-700">{feature}</span>
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
                  Operating Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Diagnostic Procedures</span>
                    <Badge variant="secondary">9:00 AM - 5:00 PM</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Therapeutic Procedures</span>
                    <Badge variant="secondary">By Appointment</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Emergency Endoscopy</span>
                    <Badge className="bg-red-500">24/7 Available</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Preparation Required</span>
                    <Badge className="bg-orange-500">8-12 Hours</Badge>
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
                    <h4 className="font-semibold text-gray-900 mb-2">Gastroenterologists</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Board-certified specialists</li>
                      <li>• Advanced endoscopy training</li>
                      <li>• Therapeutic expertise</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Support Staff</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Endoscopy nurses</li>
                      <li>• Anesthesia support</li>
                      <li>• Technical specialists</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Safety Standards</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Infection control protocols</li>
                      <li>• Equipment sterilization</li>
                      <li>• Patient monitoring</li>
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
                  <Phone className="w-4 h-4 text-teal-600 mr-3" />
                  <span className="text-gray-700">Endoscopy: +91-XXX-XXX-XXXX</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 text-teal-600 mr-3" />
                  <span className="text-gray-700">endoscopy@shrikrishnamission.com</span>
                </div>
                <Button className="w-full bg-teal-600 hover:bg-teal-700">
                  Schedule Procedure
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}