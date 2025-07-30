import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, Clock, Shield, Users, Phone, Mail, ChevronLeft, Droplets } from "lucide-react";
import { Link } from "wouter";

export default function BloodBankPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Home
              </Button>
            </Link>
            <div className="border-l border-gray-300 h-6"></div>
            <h1 className="text-2xl font-bold text-gray-900">Blood Bank</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center">
              <Activity className="w-10 h-10 text-purple-600" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Blood Bank Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Safe blood collection, testing, processing, and storage facility with modern equipment 
            ensuring quality blood products for transfusion services.
          </p>
        </div>

        {/* Blood Bank Equipment Image */}
        <div className="mb-16">
          <Card className="overflow-hidden">
            <div className="relative h-96 bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center">
              {/* SVG Blood Bank Equipment */}
              <svg width="500" height="300" viewBox="0 0 500 300" className="drop-shadow-lg">
                {/* Blood Refrigerator */}
                <rect x="50" y="50" width="120" height="180" rx="8" fill="#374151" stroke="#4b5563" strokeWidth="2"/>
                <rect x="60" y="60" width="100" height="150" rx="4" fill="#111827"/>
                
                {/* Refrigerator Shelves */}
                <rect x="65" y="80" width="90" height="2" fill="#6b7280"/>
                <rect x="65" y="120" width="90" height="2" fill="#6b7280"/>
                <rect x="65" y="160" width="90" height="2" fill="#6b7280"/>
                <rect x="65" y="200" width="90" height="2" fill="#6b7280"/>
                
                {/* Blood Bags */}
                <g>
                  {/* Shelf 1 */}
                  <ellipse cx="80" cy="100" rx="8" ry="12" fill="#dc2626"/>
                  <ellipse cx="100" cy="100" rx="8" ry="12" fill="#dc2626"/>
                  <ellipse cx="120" cy="100" rx="8" ry="12" fill="#dc2626"/>
                  <ellipse cx="140" cy="100" rx="8" ry="12" fill="#dc2626"/>
                  
                  {/* Shelf 2 */}
                  <ellipse cx="80" cy="140" rx="8" ry="12" fill="#7c2d12"/>
                  <ellipse cx="100" cy="140" rx="8" ry="12" fill="#7c2d12"/>
                  <ellipse cx="120" cy="140" rx="8" ry="12" fill="#7c2d12"/>
                  <ellipse cx="140" cy="140" rx="8" ry="12" fill="#7c2d12"/>
                  
                  {/* Shelf 3 */}
                  <ellipse cx="80" cy="180" rx="8" ry="12" fill="#991b1b"/>
                  <ellipse cx="100" cy="180" rx="8" ry="12" fill="#991b1b"/>
                  <ellipse cx="120" cy="180" rx="8" ry="12" fill="#991b1b"/>
                  <ellipse cx="140" cy="180" rx="8" ry="12" fill="#991b1b"/>
                </g>
                
                {/* Temperature Display */}
                <rect x="70" y="220" width="40" height="15" rx="4" fill="#1e40af"/>
                <text x="90" y="230" textAnchor="middle" fill="white" fontSize="8">4°C</text>
                
                {/* Centrifuge */}
                <g transform="translate(250, 150)">
                  <circle cx="0" cy="0" r="35" fill="#6b7280" stroke="#4b5563" strokeWidth="3"/>
                  <circle cx="0" cy="0" r="25" fill="#374151"/>
                  <circle cx="0" cy="0" r="15" fill="#9ca3af">
                    <animateTransform attributeName="transform" type="rotate" 
                                      values="0;360" dur="2s" repeatCount="indefinite"/>
                  </circle>
                  {/* Test tubes in centrifuge */}
                  <rect x="-2" y="-20" width="4" height="15" rx="2" fill="#dc2626">
                    <animateTransform attributeName="transform" type="rotate" 
                                      values="0;360" dur="2s" repeatCount="indefinite"/>
                  </rect>
                  <rect x="15" y="-2" width="4" height="15" rx="2" fill="#dc2626" transform="rotate(90)">
                    <animateTransform attributeName="transform" type="rotate" 
                                      values="90;450" dur="2s" repeatCount="indefinite"/>
                  </rect>
                </g>
                
                {/* Blood Donation Chair */}
                <g transform="translate(350, 180)">
                  <rect x="0" y="0" width="80" height="60" rx="8" fill="#3b82f6"/>
                  <rect x="10" y="-20" width="60" height="20" rx="10" fill="#60a5fa"/>
                  {/* Armrest */}
                  <rect x="-5" y="10" width="15" height="30" rx="4" fill="#1d4ed8"/>
                  <rect x="70" y="10" width="15" height="30" rx="4" fill="#1d4ed8"/>
                  {/* Base */}
                  <rect x="20" y="60" width="40" height="20" rx="4" fill="#374151"/>
                </g>
                
                {/* Blood Testing Equipment */}
                <g transform="translate(200, 50)">
                  <rect x="0" y="0" width="80" height="50" rx="6" fill="#4b5563" stroke="#374151" strokeWidth="2"/>
                  <rect x="10" y="10" width="60" height="20" rx="4" fill="#111827"/>
                  <rect x="15" y="15" width="50" height="10" rx="2" fill="#1e40af"/>
                  
                  {/* Sample wells */}
                  <circle cx="20" cy="40" r="3" fill="#dc2626"/>
                  <circle cx="30" cy="40" r="3" fill="#10b981"/>
                  <circle cx="40" cy="40" r="3" fill="#f59e0b"/>
                  <circle cx="50" cy="40" r="3" fill="#8b5cf6"/>
                  <circle cx="60" cy="40" r="3" fill="#ec4899"/>
                  <circle cx="70" cy="40" r="3" fill="#06b6d4"/>
                </g>
                
                {/* Blood Bags on Table */}
                <g transform="translate(380, 120)">
                  <rect x="0" y="0" width="60" height="40" rx="4" fill="#e5e7eb"/>
                  {/* Blood bags */}
                  <ellipse cx="15" cy="15" rx="6" ry="10" fill="#dc2626"/>
                  <ellipse cx="30" cy="15" rx="6" ry="10" fill="#7c2d12"/>
                  <ellipse cx="45" cy="15" rx="6" ry="10" fill="#991b1b"/>
                  
                  {/* Labels */}
                  <rect x="10" y="25" width="10" height="5" fill="white" opacity="0.9"/>
                  <rect x="25" y="25" width="10" height="5" fill="white" opacity="0.9"/>
                  <rect x="40" y="25" width="10" height="5" fill="white" opacity="0.9"/>
                </g>
                
                {/* Plasma Separator */}
                <g transform="translate(120, 60)">
                  <rect x="0" y="0" width="60" height="40" rx="6" fill="#6b7280"/>
                  <circle cx="30" cy="20" r="12" fill="#374151"/>
                  <circle cx="30" cy="20" r="8" fill="#fbbf24">
                    <animate attributeName="fill" values="#fbbf24;#f59e0b;#fbbf24" dur="1.5s" repeatCount="indefinite"/>
                  </circle>
                </g>
                
                {/* Warning Signs */}
                <g transform="translate(450, 60)">
                  <polygon points="0,20 10,0 20,20" fill="#ef4444"/>
                  <text x="10" y="15" textAnchor="middle" fill="white" fontSize="8">!</text>
                  <text x="10" y="30" textAnchor="middle" fill="#ef4444" fontSize="6">BIOHAZARD</text>
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
                <CardTitle className="flex items-center text-purple-600">
                  <Activity className="w-5 h-5 mr-2" />
                  Blood Bank Services
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { name: "Blood Collection", color: "bg-red-50 border-red-200" },
                    { name: "Blood Testing", color: "bg-blue-50 border-blue-200" },
                    { name: "Blood Processing", color: "bg-green-50 border-green-200" },
                    { name: "Blood Storage", color: "bg-purple-50 border-purple-200" },
                    { name: "Cross Matching", color: "bg-orange-50 border-orange-200" },
                    { name: "Component Preparation", color: "bg-pink-50 border-pink-200" }
                  ].map((service) => (
                    <div key={service.name} className={`flex items-center p-3 rounded-lg border ${service.color}`}>
                      <Droplets className="w-4 h-4 text-red-600 mr-3" />
                      <span className="text-gray-700">{service.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-red-600">
                  <Droplets className="w-5 h-5 mr-2" />
                  Blood Products Available
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Whole Blood",
                    "Red Blood Cells",
                    "Platelets",
                    "Fresh Frozen Plasma",
                    "Cryoprecipitate",
                    "Albumin"
                  ].map((product) => (
                    <div key={product} className="flex items-center p-2 bg-red-50 rounded">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                      <span className="text-sm text-gray-700">{product}</span>
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
                  Operating Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Blood Donation</span>
                    <Badge variant="secondary">9:00 AM - 5:00 PM</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Blood Testing</span>
                    <Badge variant="secondary">24/7 Available</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Emergency Blood</span>
                    <Badge className="bg-red-500">24/7 Available</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cross Matching</span>
                    <Badge className="bg-purple-500">On Demand</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-blue-600">
                  <Shield className="w-5 h-5 mr-2" />
                  Safety Standards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Quality Assurance</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• NABH Accredited Blood Bank</li>
                      <li>• NACO Guidelines Compliance</li>
                      <li>• Regular Quality Audits</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Testing Protocol</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• HIV, HBV, HCV Testing</li>
                      <li>• Syphilis Screening</li>
                      <li>• Malaria Testing</li>
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
                  <Phone className="w-4 h-4 text-purple-600 mr-3" />
                  <span className="text-gray-700">Blood Bank: +91-XXX-XXX-XXXX</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 text-purple-600 mr-3" />
                  <span className="text-gray-700">bloodbank@shrikrishnamission.com</span>
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Donate Blood
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}