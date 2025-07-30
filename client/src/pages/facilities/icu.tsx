import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Clock, Shield, Users, Phone, Mail, ChevronLeft, Activity } from "lucide-react";
import { Link } from "wouter";

export default function ICUPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Home
              </Button>
            </Link>
            <div className="border-l border-gray-300 h-6"></div>
            <h1 className="text-2xl font-bold text-gray-900">ICU, NICU, PICU</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
              <Heart className="w-10 h-10 text-red-600" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Critical Care Units</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced intensive care facilities providing 24/7 critical care monitoring 
            for adults, newborns, and pediatric patients with specialized medical equipment.
          </p>
        </div>

        {/* ICU Equipment Image */}
        <div className="mb-16">
          <Card className="overflow-hidden">
            <div className="relative h-96 bg-gradient-to-br from-red-100 to-red-50 flex items-center justify-center">
              {/* SVG ICU Equipment */}
              <svg width="400" height="280" viewBox="0 0 400 280" className="drop-shadow-lg">
                {/* Hospital Bed */}
                <rect x="50" y="180" width="120" height="80" rx="8" fill="#f3f4f6" stroke="#9ca3af" strokeWidth="2"/>
                <rect x="60" y="170" width="100" height="20" rx="4" fill="#e5e7eb"/>
                
                {/* Patient */}
                <ellipse cx="110" cy="185" rx="20" ry="8" fill="#fbbf24"/>
                <rect x="90" y="190" width="40" height="50" rx="4" fill="#ddd6fe"/>
                
                {/* Ventilator */}
                <rect x="200" y="150" width="80" height="100" rx="8" fill="#374151" stroke="#4b5563" strokeWidth="2"/>
                <rect x="210" y="160" width="60" height="40" rx="4" fill="#111827"/>
                <rect x="215" y="165" width="50" height="30" rx="2" fill="#1e40af"/>
                
                {/* Ventilator Controls */}
                <circle cx="225" cy="220" r="8" fill="#10b981"/>
                <circle cx="245" cy="220" r="8" fill="#f59e0b"/>
                <circle cx="265" cy="220" r="8" fill="#ef4444"/>
                
                {/* Monitor */}
                <rect x="300" y="120" width="80" height="60" rx="6" fill="#1f2937" stroke="#374151" strokeWidth="2"/>
                <rect x="310" y="130" width="60" height="40" rx="4" fill="#111827"/>
                
                {/* ECG Wave on Monitor */}
                <g stroke="#10b981" strokeWidth="2" fill="none">
                  <path d="M 320 145 L 325 145 L 330 135 L 335 155 L 340 125 L 345 165 L 350 145 L 355 145 L 360 145">
                    <animateTransform attributeName="transform" type="translate" 
                                      values="0,0;-50,0;0,0" dur="2s" repeatCount="indefinite"/>
                  </path>
                </g>
                
                {/* IV Stand */}
                <line x1="30" y1="50" x2="30" y2="180" stroke="#6b7280" strokeWidth="4"/>
                <circle cx="30" cy="50" r="15" fill="#9ca3af"/>
                
                {/* IV Bag */}
                <ellipse cx="30" cy="80" rx="12" ry="20" fill="#ddd6fe" stroke="#8b5cf6" strokeWidth="2"/>
                
                {/* Tubes/Wires */}
                <path d="M 42 85 Q 60 90 80 95 Q 100 100 110 180" 
                      stroke="#6366f1" strokeWidth="3" fill="none"/>
                <path d="M 170 190 Q 200 185 220 180" 
                      stroke="#ef4444" strokeWidth="2" fill="none"/>
                <path d="M 130 185 Q 250 150 300 150" 
                      stroke="#10b981" strokeWidth="2" fill="none"/>
                
                {/* Oxygen Tank */}
                <rect x="360" y="200" width="20" height="60" rx="10" fill="#6b7280" stroke="#4b5563" strokeWidth="2"/>
                <circle cx="370" cy="200" r="6" fill="#10b981"/>
                
                {/* Medical Cart */}
                <rect x="150" y="240" width="60" height="30" rx="4" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="2"/>
                <circle cx="160" cy="275" r="5" fill="#374151"/>
                <circle cx="200" cy="275" r="5" fill="#374151"/>
                
                {/* Alert Lights */}
                <circle cx="320" cy="110" r="4" fill="#ef4444">
                  <animate attributeName="fill" values="#ef4444;#fca5a5;#ef4444" dur="1s" repeatCount="indefinite"/>
                </circle>
                <circle cx="340" cy="110" r="4" fill="#10b981">
                  <animate attributeName="fill" values="#10b981;#6ee7b7;#10b981" dur="1.5s" repeatCount="indefinite"/>
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
                <CardTitle className="flex items-center text-red-600">
                  <Heart className="w-5 h-5 mr-2" />
                  Critical Care Units
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                    <h4 className="font-semibold text-red-800 mb-2">ICU (Intensive Care Unit)</h4>
                    <p className="text-sm text-red-700">24-bed unit for critically ill adult patients</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-800 mb-2">NICU (Neonatal ICU)</h4>
                    <p className="text-sm text-blue-700">16-bed specialized care for newborns</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-800 mb-2">PICU (Pediatric ICU)</h4>
                    <p className="text-sm text-green-700">12-bed unit for critically ill children</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-purple-600">
                  <Activity className="w-5 h-5 mr-2" />
                  Medical Equipment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Ventilators",
                    "Heart Monitors",
                    "Defibrillators",
                    "Infusion Pumps",
                    "Dialysis Machines",
                    "ECMO Support",
                    "Central Monitors",
                    "Blood Gas Analyzers"
                  ].map((equipment) => (
                    <div key={equipment} className="flex items-center p-2 bg-purple-50 rounded">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                      <span className="text-sm text-gray-700">{equipment}</span>
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
                <CardTitle className="flex items-center text-orange-600">
                  <Clock className="w-5 h-5 mr-2" />
                  Availability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">ICU Services</span>
                    <Badge className="bg-red-500">24/7 Available</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">NICU Services</span>
                    <Badge className="bg-blue-500">24/7 Available</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">PICU Services</span>
                    <Badge className="bg-green-500">24/7 Available</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Emergency Response</span>
                    <Badge className="bg-orange-500">Immediate</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-blue-600">
                  <Users className="w-5 h-5 mr-2" />
                  Medical Team
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">ICU Team</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Intensivists (Critical Care Specialists)</li>
                      <li>• ICU Nurses (1:2 ratio)</li>
                      <li>• Respiratory Therapists</li>
                      <li>• Clinical Pharmacists</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Support Services</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• 24/7 Laboratory Services</li>
                      <li>• Emergency Radiology</li>
                      <li>• Blood Bank Support</li>
                      <li>• Nutrition Specialists</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-gray-900">Emergency Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 text-red-600 mr-3" />
                  <span className="text-gray-700">ICU Emergency: +91-XXX-XXX-XXXX</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 text-red-600 mr-3" />
                  <span className="text-gray-700">icu@shrikrishnamission.com</span>
                </div>
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  Emergency Contact
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}