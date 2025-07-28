import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, Clock, Users, Award, Phone, Calendar } from "lucide-react";
import { AppointmentForm } from "@/components/appointment-form";
import { useState } from "react";
import type { Doctor } from "@shared/schema";
import drSomaShawGuptaImage from "@/images/Soma Shaw Gupta.jpeg";

export default function NeurologyPage() {
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);

  const { data: doctors } = useQuery<Doctor[]>({
    queryKey: ["/api/doctors"],
  });

  const neurologyDoctors = doctors?.filter(doctor => 
    doctor.specialization.toLowerCase().includes('neurology') || 
    doctor.departmentId === 2
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Neurology Department</h1>
            </div>
            <Button
              onClick={() => setShowAppointmentForm(true)}
              className="bg-purple-600 hover:bg-purple-700"
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
                Advanced Neurological Care
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Our Neurology Department specializes in the diagnosis and treatment of disorders affecting the brain, spinal cord, and nervous system with cutting-edge technology and expert neurologists.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium">24/7 Stroke Care</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium">Expert Neurologists</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium">Advanced Imaging</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium">Specialized Care</span>
                </div>
              </div>
            </div>

            {/* Medical Image */}
            <div className="relative">
              <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl bg-white">
                <svg viewBox="0 0 400 300" className="w-full h-full">
                  {/* Background */}
                  <defs>
                    <linearGradient id="neuroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f3e8ff" />
                      <stop offset="100%" stopColor="#e9d5ff" />
                    </linearGradient>
                  </defs>
                  <rect width="400" height="300" fill="url(#neuroGradient)" />
                  
                  {/* Brain outline */}
                  <g transform="translate(200, 150)">
                    {/* Main brain shape */}
                    <path d="M-60,-40 Q-80,-60 -60,-80 Q-40,-90 -20,-80 Q0,-85 20,-80 Q40,-90 60,-80 Q80,-60 60,-40 Q70,-20 60,0 Q70,20 60,40 Q40,60 20,50 Q0,55 -20,50 Q-40,60 -60,40 Q-70,20 -60,0 Q-70,-20 -60,-40 Z" 
                          fill="#7c3aed" opacity="0.8" stroke="#6d28d9" strokeWidth="2" />
                    
                    {/* Brain hemispheres division */}
                    <path d="M0,-80 L0,50" stroke="#6d28d9" strokeWidth="2" opacity="0.6" />
                    
                    {/* Brain lobes */}
                    <circle cx="-30" cy="-30" r="15" fill="#8b5cf6" opacity="0.6" />
                    <circle cx="30" cy="-30" r="15" fill="#8b5cf6" opacity="0.6" />
                    <circle cx="-30" cy="10" r="12" fill="#8b5cf6" opacity="0.6" />
                    <circle cx="30" cy="10" r="12" fill="#8b5cf6" opacity="0.6" />
                    
                    {/* Neural pathways */}
                    <g opacity="0.7">
                      <path d="M-40,-20 Q-20,-10 0,0 Q20,-10 40,-20" 
                            stroke="#a855f7" strokeWidth="2" fill="none" strokeLinecap="round" />
                      <path d="M-40,0 Q-20,10 0,20 Q20,10 40,0" 
                            stroke="#a855f7" strokeWidth="2" fill="none" strokeLinecap="round" />
                      <path d="M-30,-40 Q0,-30 30,-40" 
                            stroke="#a855f7" strokeWidth="2" fill="none" strokeLinecap="round" />
                    </g>
                    
                    {/* Electrical activity */}
                    <g opacity="0.8">
                      <circle cx="-25" cy="-25" r="3" fill="#fbbf24">
                        <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="25" cy="-25" r="3" fill="#fbbf24">
                        <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" begin="1s" />
                      </circle>
                      <circle cx="0" cy="5" r="3" fill="#fbbf24">
                        <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" begin="0.5s" />
                      </circle>
                    </g>
                  </g>
                  
                  {/* Spinal cord */}
                  <g transform="translate(200, 220)">
                    <rect x="-8" y="0" width="16" height="60" fill="#7c3aed" opacity="0.7" rx="8" />
                    <path d="M-6,10 L6,10 M-6,20 L6,20 M-6,30 L6,30 M-6,40 L6,40 M-6,50 L6,50" 
                          stroke="#6d28d9" strokeWidth="1" opacity="0.8" />
                  </g>
                  
                  {/* MRI Scanner representation */}
                  <g transform="translate(80, 100)">
                    <rect x="0" y="0" width="80" height="40" fill="#374151" rx="20" />
                    <rect x="10" y="10" width="60" height="20" fill="#6b7280" rx="10" />
                    <circle cx="40" cy="20" r="8" fill="#9ca3af" />
                  </g>
                  
                  {/* Neuron representation */}
                  <g transform="translate(320, 80)">
                    <circle cx="0" cy="0" r="8" fill="#7c3aed" />
                    <path d="M8,0 L25,0 M-8,0 L-25,0 M0,-8 L0,-20 M0,8 L0,20" 
                          stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="25" cy="0" r="2" fill="#7c3aed" />
                    <circle cx="-25" cy="0" r="2" fill="#7c3aed" />
                  </g>
                  
                  {/* EEG waves */}
                  <path d="M50 250 Q80 240 110 250 T170 250 T230 250 T290 250 T350 250" 
                        stroke="#7c3aed" strokeWidth="2" fill="none" opacity="0.6" />
                </svg>
                
                <div className="absolute bottom-4 left-4 text-purple-800">
                  <h3 className="text-xl font-bold">Neurology Department</h3>
                  <p className="text-purple-600">Advanced Brain & Nerve Care</p>
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
            Our Neurology Services
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Stroke Care",
                description: "Emergency stroke treatment, rehabilitation, and prevention programs with 24/7 specialized care.",
                icon: "🧠"
              },
              {
                title: "Epilepsy Management",
                description: "Comprehensive epilepsy diagnosis, treatment, and seizure management with advanced monitoring.",
                icon: "⚡"
              },
              {
                title: "Movement Disorders",
                description: "Treatment for Parkinson's disease, tremors, and other movement-related neurological conditions.",
                icon: "🤲"
              },
              {
                title: "Neurosurgery",
                description: "Advanced surgical procedures for brain and spine conditions with minimally invasive techniques.",
                icon: "🔬"
              },
              {
                title: "Headache & Migraine",
                description: "Specialized treatment for chronic headaches, migraines, and related neurological conditions.",
                icon: "💊"
              },
              {
                title: "Neurological Rehabilitation",
                description: "Comprehensive rehabilitation programs for stroke recovery and neurological conditions.",
                icon: "🏥"
              }
            ].map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="text-4xl mb-2">{service.icon}</div>
                  <CardTitle className="text-xl text-purple-800">{service.title}</CardTitle>
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
            Our Neurology Experts
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {neurologyDoctors?.map((doctor) => (
              <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-bold text-lg">
                        {doctor.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <CardTitle className="text-lg">{doctor.name}</CardTitle>
                      <p className="text-purple-600 font-medium">{doctor.specialization}</p>
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
      <section className="py-16 bg-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold mb-6">Neurological Emergency Care</h3>
          <p className="text-xl mb-8 text-purple-100">
            Our neurology team provides 24/7 emergency care for stroke and neurological emergencies
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setShowAppointmentForm(true)}
              className="bg-white text-purple-600 hover:bg-purple-50"
            >
              Schedule Consultation
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
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