import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Baby, Clock, Users, Award, Phone, Calendar } from "lucide-react";
import { AppointmentForm } from "@/components/appointment-form";
import { useState } from "react";
import type { Doctor } from "@shared/schema";
import drSaurabhSinghImage from "@/images/Dr Saurabh singh.jpeg";

export default function PediatricsPage() {
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);

  const { data: doctors } = useQuery<Doctor[]>({
    queryKey: ["/api/doctors"],
  });

  const pediatricsDoctors = doctors?.filter(doctor => 
    doctor.specialization.toLowerCase().includes('pediatric') || 
    doctor.specialization.toLowerCase().includes('paediatrician') ||
    doctor.departmentId === 5
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <Baby className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Pediatrics Department</h1>
            </div>
            <Button
              onClick={() => setShowAppointmentForm(true)}
              className="bg-green-600 hover:bg-green-700"
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
                Comprehensive Child Care
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Our Pediatrics Department provides specialized medical care for infants, children, and adolescents with expert pediatricians and child-friendly facilities designed to ensure the best possible care for your little ones.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium">24/7 NICU</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium">Expert Pediatricians</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium">Child-Friendly</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium">Emergency Care</span>
                </div>
              </div>
            </div>

            {/* Medical Image */}
            <div className="relative">
              <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl bg-white">
                <svg viewBox="0 0 400 300" className="w-full h-full">
                  {/* Background */}
                  <defs>
                    <linearGradient id="pedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f0fdf4" />
                      <stop offset="100%" stopColor="#bbf7d0" />
                    </linearGradient>
                  </defs>
                  <rect width="400" height="300" fill="url(#pedGradient)" />
                  
                  {/* Child silhouette with growth chart */}
                  <g transform="translate(120, 50)">
                    {/* Growth chart background */}
                    <rect x="0" y="0" width="160" height="200" fill="#ffffff" stroke="#16a34a" strokeWidth="2" opacity="0.9" />
                    
                    {/* Grid lines */}
                    <g opacity="0.3">
                      {[...Array(10)].map((_, i) => (
                        <line key={i} x1="0" y1={i * 20} x2="160" y2={i * 20} stroke="#16a34a" strokeWidth="0.5" />
                      ))}
                      {[...Array(8)].map((_, i) => (
                        <line key={i} x1={i * 20} y1="0" x2={i * 20} y2="200" stroke="#16a34a" strokeWidth="0.5" />
                      ))}
                    </g>
                    
                    {/* Growth curve */}
                    <path d="M20,180 Q40,160 60,140 Q80,120 100,100 Q120,80 140,70" 
                          stroke="#16a34a" strokeWidth="3" fill="none" strokeLinecap="round" />
                    
                    {/* Child figures at different ages */}
                    <g transform="translate(30, 160)">
                      {/* Baby */}
                      <circle cx="0" cy="-5" r="8" fill="#16a34a" opacity="0.7" />
                      <rect x="-6" y="3" width="12" height="20" fill="#16a34a" opacity="0.7" rx="6" />
                      <rect x="-4" y="23" width="3" height="12" fill="#16a34a" opacity="0.7" />
                      <rect x="1" y="23" width="3" height="12" fill="#16a34a" opacity="0.7" />
                    </g>
                    
                    <g transform="translate(70, 130)">
                      {/* Toddler */}
                      <circle cx="0" cy="-5" r="10" fill="#16a34a" opacity="0.7" />
                      <rect x="-7" y="5" width="14" height="25" fill="#16a34a" opacity="0.7" rx="7" />
                      <rect x="-5" y="30" width="4" height="15" fill="#16a34a" opacity="0.7" />
                      <rect x="1" y="30" width="4" height="15" fill="#16a34a" opacity="0.7" />
                    </g>
                    
                    <g transform="translate(110, 100)">
                      {/* Child */}
                      <circle cx="0" cy="-5" r="12" fill="#16a34a" opacity="0.7" />
                      <rect x="-8" y="7" width="16" height="30" fill="#16a34a" opacity="0.7" rx="8" />
                      <rect x="-6" y="37" width="5" height="18" fill="#16a34a" opacity="0.7" />
                      <rect x="1" y="37" width="5" height="18" fill="#16a34a" opacity="0.7" />
                    </g>
                    
                    {/* Age labels */}
                    <text x="30" y="195" textAnchor="middle" fontSize="12" fill="#16a34a" fontWeight="bold">1Y</text>
                    <text x="70" y="195" textAnchor="middle" fontSize="12" fill="#16a34a" fontWeight="bold">3Y</text>
                    <text x="110" y="195" textAnchor="middle" fontSize="12" fill="#16a34a" fontWeight="bold">7Y</text>
                    
                    {/* Height markers */}
                    <text x="165" y="180" fontSize="10" fill="#16a34a">75cm</text>
                    <text x="165" y="140" fontSize="10" fill="#16a34a">100cm</text>
                    <text x="165" y="100" fontSize="10" fill="#16a34a">125cm</text>
                  </g>
                  
                  {/* Medical toys and equipment */}
                  <g transform="translate(50, 80)">
                    {/* Stethoscope */}
                    <circle cx="0" cy="0" r="8" fill="#16a34a" stroke="#15803d" strokeWidth="1" />
                    <circle cx="0" cy="0" r="5" fill="#22c55e" />
                    <path d="M0,-8 Q-12,-20 -20,-15 Q-24,-12 -20,-8 Q-12,0 0,8" 
                          stroke="#15803d" strokeWidth="2" fill="none" strokeLinecap="round" />
                    
                    {/* Child-friendly colors */}
                    <circle cx="-15" cy="-12" r="3" fill="#fbbf24" />
                    <circle cx="-18" cy="-8" r="2" fill="#f59e0b" />
                  </g>
                  
                  {/* Vaccine syringe */}
                  <g transform="translate(320, 120)">
                    <rect x="0" y="0" width="30" height="6" fill="#6b7280" rx="3" />
                    <rect x="30" y="-2" width="8" height="10" fill="#374151" rx="1" />
                    <rect x="38" y="1" width="15" height="4" fill="#9ca3af" />
                    <circle cx="45" cy="3" r="2" fill="#16a34a" opacity="0.8" />
                  </g>
                  
                  {/* NICU incubator */}
                  <g transform="translate(30, 200)">
                    <rect x="0" y="0" width="80" height="40" fill="#e5e7eb" stroke="#6b7280" strokeWidth="2" rx="5" />
                    <rect x="5" y="5" width="70" height="30" fill="#f9fafb" stroke="#9ca3af" strokeWidth="1" rx="3" />
                    
                    {/* Baby inside */}
                    <g transform="translate(40, 20)">
                      <circle cx="0" cy="-3" r="4" fill="#fbbf24" opacity="0.8" />
                      <rect x="-3" y="1" width="6" height="8" fill="#fbbf24" opacity="0.8" rx="3" />
                    </g>
                    
                    {/* Monitor display */}
                    <rect x="55" y="8" width="20" height="12" fill="#374151" />
                    <path d="M58,14 L62,12 L66,16 L70,10 L72,14" stroke="#22c55e" strokeWidth="1" fill="none" />
                  </g>
                  
                  {/* Playful elements */}
                  <g opacity="0.6">
                    {/* Blocks */}
                    <rect x="350" y="200" width="15" height="15" fill="#ef4444" />
                    <rect x="365" y="200" width="15" height="15" fill="#3b82f6" />
                    <rect x="350" y="215" width="15" height="15" fill="#22c55e" />
                    <rect x="365" y="215" width="15" height="15" fill="#fbbf24" />
                    
                    {/* Teddy bear */}
                    <g transform="translate(300, 240)">
                      <circle cx="0" cy="0" r="8" fill="#92400e" />
                      <circle cx="-5" cy="-3" r="3" fill="#92400e" />
                      <circle cx="5" cy="-3" r="3" fill="#92400e" />
                      <circle cx="-2" cy="-1" r="1" fill="#000000" />
                      <circle cx="2" cy="-1" r="1" fill="#000000" />
                      <ellipse cx="0" cy="2" rx="1" ry="2" fill="#000000" />
                    </g>
                  </g>
                  
                  {/* Heartbeat line for vitals */}
                  <path d="M20 40 L50 40 L55 30 L60 50 L65 20 L70 60 L75 40 L380 40" 
                        stroke="#22c55e" strokeWidth="2" fill="none" opacity="0.7" strokeLinecap="round" />
                </svg>
                
                <div className="absolute bottom-4 left-4 text-green-800">
                  <h3 className="text-xl font-bold">Pediatrics Department</h3>
                  <p className="text-green-600">Caring for Children's Health</p>
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
            Our Pediatric Services
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Neonatal Care",
                description: "Specialized care for newborns including NICU services and premature baby care.",
                icon: "👶"
              },
              {
                title: "Childhood Vaccinations",
                description: "Complete immunization programs following national vaccination schedules.",
                icon: "💉"
              },
              {
                title: "Growth & Development",
                description: "Regular monitoring of child growth, development milestones, and nutritional guidance.",
                icon: "📊"
              },
              {
                title: "Pediatric Emergency",
                description: "24/7 emergency care for children with specialized pediatric emergency protocols.",
                icon: "🚨"
              },
              {
                title: "Childhood Infections",
                description: "Treatment of common childhood illnesses, infections, and fever management.",
                icon: "🩺"
              },
              {
                title: "Adolescent Health",
                description: "Comprehensive healthcare for teenagers including mental health support.",
                icon: "👦"
              }
            ].map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="text-4xl mb-2">{service.icon}</div>
                  <CardTitle className="text-xl text-green-800">{service.title}</CardTitle>
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
            Our Pediatric Specialists
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pediatricsDoctors?.map((doctor) => (
              <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold text-lg">
                        {doctor.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <CardTitle className="text-lg">{doctor.name}</CardTitle>
                      <p className="text-green-600 font-medium">{doctor.specialization}</p>
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
      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold mb-6">Pediatric Emergency Care</h3>
          <p className="text-xl mb-8 text-green-100">
            Our pediatric team provides 24/7 emergency care designed specifically for children
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setShowAppointmentForm(true)}
              className="bg-white text-green-600 hover:bg-green-50"
            >
              Schedule Consultation
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
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