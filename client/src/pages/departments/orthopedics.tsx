import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bone, Clock, Users, Award, Phone, Calendar } from "lucide-react";
import { AppointmentForm } from "@/components/appointment-form";
import { useState } from "react";
import type { Doctor } from "@shared/schema";

export default function OrthopedicsPage() {
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);

  const { data: doctors } = useQuery<Doctor[]>({
    queryKey: ["/api/doctors"],
  });

  const orthopedicsDoctors = doctors?.filter(doctor => 
    doctor.specialization.toLowerCase().includes('orthopedic') || 
    doctor.specialization.toLowerCase().includes('surgeon') ||
    doctor.departmentId === 4
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
                <Bone className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Orthopedics Department</h1>
            </div>
            <Button
              onClick={() => setShowAppointmentForm(true)}
              className="bg-orange-600 hover:bg-orange-700"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Book Appointment
            </Button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Advanced Orthopedic Care
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Our Orthopedics Department specializes in the diagnosis and treatment of musculoskeletal disorders, offering comprehensive bone, joint, and spine care with state-of-the-art surgical and non-surgical treatments.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-orange-600" />
                  <span className="text-sm font-medium">Emergency Surgery</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-orange-600" />
                  <span className="text-sm font-medium">Expert Surgeons</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-orange-600" />
                  <span className="text-sm font-medium">Minimally Invasive</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-orange-600" />
                  <span className="text-sm font-medium">Joint Replacement</span>
                </div>
              </div>
            </div>

            {/* Medical Image */}
            <div className="relative">
              <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl bg-white">
                <svg viewBox="0 0 400 300" className="w-full h-full">
                  {/* Background */}
                  <defs>
                    <linearGradient id="orthoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fff7ed" />
                      <stop offset="100%" stopColor="#fed7aa" />
                    </linearGradient>
                  </defs>
                  <rect width="400" height="300" fill="url(#orthoGradient)" />
                  
                  {/* Skeleton/Bone structure */}
                  <g transform="translate(200, 150)">
                    {/* Femur bone */}
                    <g transform="translate(-30, -60)">
                      <ellipse cx="0" cy="-15" rx="12" ry="8" fill="#ea580c" opacity="0.8" />
                      <rect x="-6" y="-15" width="12" height="80" fill="#ea580c" opacity="0.8" />
                      <ellipse cx="0" cy="65" rx="15" ry="10" fill="#ea580c" opacity="0.8" />
                      
                      {/* Bone marrow */}
                      <rect x="-3" y="-10" width="6" height="70" fill="#fb923c" opacity="0.6" />
                    </g>
                    
                    {/* Tibia */}
                    <g transform="translate(-30, 60)">
                      <ellipse cx="0" cy="0" rx="13" ry="8" fill="#ea580c" opacity="0.8" />
                      <rect x="-5" y="0" width="10" height="70" fill="#ea580c" opacity="0.8" />
                      <ellipse cx="0" cy="70" rx="10" ry="6" fill="#ea580c" opacity="0.8" />
                    </g>
                    
                    {/* Knee joint */}
                    <g transform="translate(-30, 50)">
                      <circle cx="0" cy="0" r="18" fill="#fdba74" opacity="0.7" stroke="#ea580c" strokeWidth="2" />
                      <circle cx="0" cy="0" r="12" fill="#fed7aa" opacity="0.8" />
                      
                      {/* Joint lines */}
                      <path d="M-12,0 L12,0 M0,-12 L0,12" stroke="#ea580c" strokeWidth="1" opacity="0.6" />
                    </g>
                    
                    {/* Hip joint */}
                    <g transform="translate(-30, -75)">
                      <circle cx="0" cy="0" r="20" fill="#fdba74" opacity="0.7" stroke="#ea580c" strokeWidth="2" />
                      <circle cx="0" cy="0" r="14" fill="#fed7aa" opacity="0.8" />
                    </g>
                    
                    {/* Spine representation */}
                    <g transform="translate(40, -80)">
                      {[...Array(8)].map((_, i) => (
                        <g key={i} transform={`translate(0, ${i * 20})`}>
                          <ellipse cx="0" cy="0" rx="8" ry="6" fill="#ea580c" opacity="0.8" />
                          <rect x="-6" y="-3" width="12" height="6" fill="#fb923c" opacity="0.6" />
                        </g>
                      ))}
                    </g>
                    
                    {/* X-ray effect lines */}
                    <g opacity="0.3">
                      <path d="M-80,-100 L80,100 M-80,100 L80,-100" stroke="#ea580c" strokeWidth="1" />
                      <path d="M-100,-50 L100,50 M-100,50 L100,-50" stroke="#ea580c" strokeWidth="1" />
                    </g>
                  </g>
                  
                  {/* Medical instruments */}
                  <g transform="translate(320, 60)">
                    {/* Scalpel */}
                    <rect x="0" y="0" width="40" height="4" fill="#6b7280" />
                    <polygon points="40,0 50,2 40,4" fill="#9ca3af" />
                    <rect x="0" y="-2" width="15" height="8" fill="#374151" />
                  </g>
                  
                  {/* Joint replacement implant */}
                  <g transform="translate(80, 200)">
                    <circle cx="0" cy="0" r="12" fill="#6b7280" stroke="#374151" strokeWidth="1" />
                    <rect x="-3" y="0" width="6" height="25" fill="#6b7280" />
                    <circle cx="0" cy="25" r="8" fill="#6b7280" />
                  </g>
                  
                  {/* Orthopedic screws */}
                  <g transform="translate(60, 120)">
                    <circle cx="0" cy="0" r="3" fill="#6b7280" />
                    <circle cx="0" cy="0" r="1.5" fill="#374151" />
                    <rect x="-1" y="0" width="2" height="20" fill="#6b7280" />
                  </g>
                  
                  <g transform="translate(70, 140)">
                    <circle cx="0" cy="0" r="3" fill="#6b7280" />
                    <circle cx="0" cy="0" r="1.5" fill="#374151" />
                    <rect x="-1" y="0" width="2" height="20" fill="#6b7280" />
                  </g>
                </svg>
                
                <div className="absolute bottom-4 left-4 text-orange-800">
                  <h3 className="text-xl font-bold">Orthopedics Department</h3>
                  <p className="text-orange-600">Advanced Bone & Joint Care</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Orthopedic Services
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Joint Replacement",
                description: "Complete knee, hip, and shoulder replacement surgeries with advanced prosthetic technology.",
                icon: "🦴"
              },
              {
                title: "Spine Surgery",
                description: "Comprehensive spine care including minimally invasive procedures and fusion surgeries.",
                icon: "🏥"
              },
              {
                title: "Sports Medicine",
                description: "Treatment for sports injuries, ACL reconstruction, and athletic performance optimization.",
                icon: "🏃"
              },
              {
                title: "Trauma Surgery",
                description: "Emergency orthopedic surgery for fractures, dislocations, and traumatic injuries.",
                icon: "🚑"
              },
              {
                title: "Arthroscopy",
                description: "Minimally invasive joint surgery using advanced arthroscopic techniques.",
                icon: "🔬"
              },
              {
                title: "Rehabilitation",
                description: "Comprehensive physical therapy and rehabilitation programs for recovery.",
                icon: "💪"
              }
            ].map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="text-4xl mb-2">{service.icon}</div>
                  <CardTitle className="text-xl text-orange-800">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Orthopedic Specialists
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {orthopedicsDoctors?.map((doctor) => (
              <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-orange-600 font-bold text-lg">
                        {doctor.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <CardTitle className="text-lg">{doctor.name}</CardTitle>
                      <p className="text-orange-600 font-medium">{doctor.specialization}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{doctor.experience} years experience</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Available for consultation</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold mb-6">Orthopedic Emergency Care</h3>
          <p className="text-xl mb-8 text-orange-100">
            Our orthopedic team provides emergency care for fractures and traumatic injuries
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setShowAppointmentForm(true)}
              className="bg-white text-orange-600 hover:bg-orange-50"
            >
              Schedule Consultation
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600">
              Emergency: Call Now
            </Button>
          </div>
        </div>
      </section>

      {/* Appointment Form Modal */}
      {showAppointmentForm && (
        <AppointmentForm onClose={() => setShowAppointmentForm(false)} />
      )}
    </div>
  );
}