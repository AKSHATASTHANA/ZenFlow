import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Clock, Shield, Activity, Phone, Mail, ChevronLeft, Zap } from "lucide-react";
import { Link } from "wouter";

export default function PhysiotherapyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-cyan-600 hover:text-cyan-700">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Home
              </Button>
            </Link>
            <div className="border-l border-gray-300 h-6"></div>
            <h1 className="text-2xl font-bold text-gray-900">Physiotherapy Center</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-cyan-100 rounded-full flex items-center justify-center">
              <Users className="w-10 h-10 text-cyan-600" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Comprehensive Physiotherapy</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Modern rehabilitation center equipped with advanced therapeutic equipment and 
            experienced physiotherapists providing personalized treatment plans for recovery.
          </p>
        </div>

        {/* Physiotherapy Equipment Image */}
        <div className="mb-16">
          <Card className="overflow-hidden">
            <div className="relative h-96 bg-gradient-to-br from-cyan-100 to-cyan-50 flex items-center justify-center">
              {/* SVG Physiotherapy Equipment */}
              <svg width="500" height="300" viewBox="0 0 500 300" className="drop-shadow-lg">
                {/* Exercise Bike */}
                <g transform="translate(80, 150)">
                  {/* Base */}
                  <ellipse cx="0" cy="30" rx="25" ry="8" fill="#374151"/>
                  
                  {/* Seat */}
                  <ellipse cx="0" cy="0" rx="15" ry="8" fill="#3b82f6"/>
                  <rect x="-12" y="-8" width="24" height="8" rx="4" fill="#60a5fa"/>
                  
                  {/* Pedals */}
                  <circle cx="-20" cy="15" r="8" fill="#6b7280"/>
                  <circle cx="20" cy="15" r="8" fill="#6b7280"/>
                  <rect x="-25" y="12" width="10" height="6" rx="2" fill="#374151"/>
                  <rect x="15" y="12" width="10" height="6" rx="2" fill="#374151"/>
                  
                  {/* Handlebars */}
                  <rect x="-2" y="-30" width="4" height="25" fill="#4b5563"/>
                  <rect x="-15" y="-35" width="30" height="4" rx="2" fill="#6b7280"/>
                  
                  {/* Digital Display */}
                  <rect x="-10" y="-25" width="20" height="10" rx="2" fill="#111827"/>
                  <rect x="-8" y="-23" width="16" height="6" rx="1" fill="#10b981"/>
                  
                  {/* Resistance wheel */}
                  <circle cx="0" cy="15" r="12" fill="#9ca3af">
                    <animateTransform attributeName="transform" type="rotate" 
                                      values="0;360" dur="3s" repeatCount="indefinite"/>
                  </circle>
                </g>
                
                {/* Parallel Bars */}
                <g transform="translate(200, 180)">
                  {/* Left bar */}
                  <rect x="0" y="0" width="4" height="60" fill="#6b7280"/>
                  <rect x="-5" y="0" width="14" height="4" rx="2" fill="#4b5563"/>
                  
                  {/* Right bar */}
                  <rect x="40" y="0" width="4" height="60" fill="#6b7280"/>
                  <rect x="35" y="0" width="14" height="4" rx="2" fill="#4b5563"/>
                  
                  {/* Support posts */}
                  <rect x="-2" y="60" width="8" height="20" fill="#374151"/>
                  <rect x="38" y="60" width="8" height="20" fill="#374151"/>
                  
                  {/* Base */}
                  <rect x="-10" y="80" width="60" height="8" rx="4" fill="#9ca3af"/>
                </g>
                
                {/* Therapy Table */}
                <g transform="translate(320, 160)">
                  <rect x="0" y="0" width="120" height="60" rx="8" fill="#f3f4f6" stroke="#9ca3af" strokeWidth="2"/>
                  <rect x="10" y="-10" width="100" height="15" rx="4" fill="#e5e7eb"/>
                  
                  {/* Patient */}
                  <ellipse cx="60" cy="10" rx="15" ry="6" fill="#fbbf24"/>
                  <rect x="45" y="15" width="30" height="35" rx="4" fill="#ddd6fe"/>
                  
                  {/* Adjustable sections */}
                  <rect x="0" y="35" width="40" height="4" fill="#6b7280"/>
                  <rect x="80" y="35" width="40" height="4" fill="#6b7280"/>
                  
                  {/* Height adjustment */}
                  <rect x="20" y="60" width="6" height="15" fill="#374151"/>
                  <rect x="100" y="60" width="6" height="15" fill="#374151"/>
                </g>
                
                {/* Weight Training Equipment */}
                <g transform="translate(100, 50)">
                  {/* Pulley system */}
                  <rect x="0" y="0" width="8" height="80" fill="#4b5563"/>
                  <circle cx="4" cy="10" r="6" fill="#6b7280"/>
                  <circle cx="4" cy="70" r="6" fill="#6b7280"/>
                  
                  {/* Cable */}
                  <line x1="4" y1="16" x2="4" y2="64" stroke="#1f2937" strokeWidth="2"/>
                  
                  {/* Weight stack */}
                  <rect x="15" y="20" width="20" height="40" fill="#374151"/>
                  <rect x="18" y="25" width="14" height="6" fill="#6b7280"/>
                  <rect x="18" y="35" width="14" height="6" fill="#6b7280"/>
                  <rect x="18" y="45" width="14" height="6" fill="#6b7280"/>
                  
                  {/* Handle */}
                  <rect x="40" y="40" width="25" height="4" rx="2" fill="#9ca3af"/>
                  <circle cx="52" cy="42" r="3" fill="#6b7280"/>
                </g>
                
                {/* Ultrasound Therapy Machine */}
                <g transform="translate(250, 50)">
                  <rect x="0" y="0" width="60" height="40" rx="6" fill="#374151"/>
                  <rect x="5" y="5" width="50" height="20" rx="4" fill="#111827"/>
                  <rect x="10" y="10" width="40" height="10" rx="2" fill="#1e40af"/>
                  
                  {/* Controls */}
                  <circle cx="15" cy="30" r="3" fill="#10b981"/>
                  <circle cx="25" cy="30" r="3" fill="#f59e0b"/>
                  <circle cx="35" cy="30" r="3" fill="#ef4444"/>
                  <circle cx="45" cy="30" r="3" fill="#8b5cf6"/>
                  
                  {/* Ultrasound probe */}
                  <rect x="65" y="15" width="20" height="8" rx="4" fill="#6b7280"/>
                  <circle cx="85" cy="19" r="4" fill="#3b82f6">
                    <animate attributeName="fill" values="#3b82f6;#60a5fa;#3b82f6" dur="1s" repeatCount="indefinite"/>
                  </circle>
                  
                  {/* Cable */}
                  <path d="M 60 20 Q 75 25 80 19" stroke="#1f2937" strokeWidth="3" fill="none"/>
                </g>
                
                {/* TENS Unit */}
                <g transform="translate(350, 50)">
                  <rect x="0" y="0" width="40" height="25" rx="4" fill="#4b5563"/>
                  <rect x="5" y="5" width="30" height="10" rx="2" fill="#111827"/>
                  <rect x="8" y="8" width="24" height="4" rx="1" fill="#10b981"/>
                  
                  {/* Electrode pads */}
                  <circle cx="50" cy="5" r="6" fill="#f59e0b"/>
                  <circle cx="65" cy="5" r="6" fill="#f59e0b"/>
                  <circle cx="50" cy="25" r="6" fill="#f59e0b"/>
                  <circle cx="65" cy="25" r="6" fill="#f59e0b"/>
                  
                  {/* Wires */}
                  <path d="M 40 12 Q 45 8 50 5" stroke="#ef4444" strokeWidth="2" fill="none"/>
                  <path d="M 40 12 Q 55 8 65 5" stroke="#10b981" strokeWidth="2" fill="none"/>
                  <path d="M 40 12 Q 45 22 50 25" stroke="#3b82f6" strokeWidth="2" fill="none"/>
                  <path d="M 40 12 Q 55 22 65 25" stroke="#8b5cf6" strokeWidth="2" fill="none"/>
                  
                  {/* Pulse indicators */}
                  <g opacity="0.8">
                    <circle cx="50" cy="5" r="8" fill="none" stroke="#f59e0b" strokeWidth="1">
                      <animate attributeName="r" values="6;10;6" dur="1s" repeatCount="indefinite"/>
                      <animate attributeName="opacity" values="0.8;0.2;0.8" dur="1s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="65" cy="5" r="8" fill="none" stroke="#f59e0b" strokeWidth="1">
                      <animate attributeName="r" values="6;10;6" dur="1s" repeatCount="indefinite" begin="0.5s"/>
                      <animate attributeName="opacity" values="0.8;0.2;0.8" dur="1s" repeatCount="indefinite" begin="0.5s"/>
                    </circle>
                  </g>
                </g>
                
                {/* Exercise Balls */}
                <g transform="translate(450, 200)">
                  <circle cx="0" cy="0" r="25" fill="#10b981" opacity="0.8"/>
                  <circle cx="-5" cy="-5" r="18" fill="#34d399" opacity="0.6"/>
                  
                  <circle cx="30" cy="10" r="20" fill="#3b82f6" opacity="0.8"/>
                  <circle cx="25" cy="5" r="15" fill="#60a5fa" opacity="0.6"/>
                </g>
                
                {/* Balance Platform */}
                <g transform="translate(50, 250)">
                  <ellipse cx="0" cy="0" rx="30" ry="8" fill="#6b7280"/>
                  <circle cx="0" cy="-5" r="4" fill="#374151"/>
                  
                  {/* Wobble effect */}
                  <ellipse cx="0" cy="0" rx="32" ry="2" fill="#9ca3af" opacity="0.5">
                    <animateTransform attributeName="transform" type="rotate" 
                                      values="0;5;-5;0" dur="3s" repeatCount="indefinite"/>
                  </ellipse>
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
                <CardTitle className="flex items-center text-cyan-600">
                  <Users className="w-5 h-5 mr-2" />
                  Therapy Services
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { name: "Orthopedic Rehabilitation", desc: "Post-surgery and injury recovery" },
                    { name: "Neurological Therapy", desc: "Stroke and brain injury rehabilitation" },
                    { name: "Sports Physiotherapy", desc: "Athletic injury treatment and prevention" },
                    { name: "Pediatric Therapy", desc: "Specialized treatment for children" },
                    { name: "Cardiopulmonary Rehab", desc: "Heart and lung condition therapy" },
                    { name: "Pain Management", desc: "Chronic pain relief programs" }
                  ].map((service) => (
                    <div key={service.name} className="p-3 bg-cyan-50 rounded-lg border border-cyan-200">
                      <div className="flex items-start">
                        <Activity className="w-4 h-4 text-cyan-600 mr-3 mt-0.5" />
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
                  <Zap className="w-5 h-5 mr-2" />
                  Treatment Modalities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Manual Therapy",
                    "Electrotherapy",
                    "Ultrasound Therapy",
                    "TENS",
                    "Hot/Cold Therapy",
                    "Exercise Therapy",
                    "Hydrotherapy",
                    "Laser Therapy",
                    "Traction Therapy",
                    "Balance Training"
                  ].map((modality) => (
                    <div key={modality} className="flex items-center p-2 bg-blue-50 rounded">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      <span className="text-sm text-gray-700">{modality}</span>
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
                    <span className="text-gray-600">Morning Sessions</span>
                    <Badge variant="secondary">8:00 AM - 12:00 PM</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Evening Sessions</span>
                    <Badge variant="secondary">2:00 PM - 7:00 PM</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Home Visits</span>
                    <Badge className="bg-green-500">Available</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Emergency Therapy</span>
                    <Badge className="bg-orange-500">On Call</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-green-600">
                  <Shield className="w-5 h-5 mr-2" />
                  Expert Team
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Physiotherapists</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• BPT/MPT qualified therapists</li>
                      <li>• Specialized certifications</li>
                      <li>• Experienced professionals</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Specializations</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Orthopedic conditions</li>
                      <li>• Neurological disorders</li>
                      <li>• Sports injuries</li>
                      <li>• Pediatric therapy</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Equipment</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Modern exercise equipment</li>
                      <li>• Electrotherapy devices</li>
                      <li>• Assessment tools</li>
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
                  <Phone className="w-4 h-4 text-cyan-600 mr-3" />
                  <span className="text-gray-700">Physiotherapy: +91-XXX-XXX-XXXX</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 text-cyan-600 mr-3" />
                  <span className="text-gray-700">physio@shrikrishnamission.com</span>
                </div>
                <Button className="w-full bg-cyan-600 hover:bg-cyan-700">
                  Book Therapy Session
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}