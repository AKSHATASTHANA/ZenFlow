import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Clock, Users, Award, Phone, Calendar } from "lucide-react";
import { AppointmentForm } from "@/components/appointment-form";
import { useState } from "react";
import type { Doctor } from "@shared/schema";

export default function GynecologyPage() {
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);

  const { data: doctors } = useQuery<Doctor[]>({
    queryKey: ["/api/doctors"],
  });

  const gynecologyDoctors = doctors?.filter(doctor => 
    doctor.specialization.toLowerCase().includes('gynecolog') || 
    doctor.specialization.toLowerCase().includes('obstetrician') ||
    doctor.departmentId === 1
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Gynecology & Obstetrics</h1>
            </div>
            <Button
              onClick={() => setShowAppointmentForm(true)}
              className="bg-pink-600 hover:bg-pink-700"
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
                Comprehensive Women's Health
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Our Gynecology & Obstetrics Department provides comprehensive healthcare for women at every stage of life, from adolescence through menopause, with specialized care for pregnancy, childbirth, and reproductive health.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-pink-600" />
                  <span className="text-sm font-medium">24/7 Maternity</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-pink-600" />
                  <span className="text-sm font-medium">Expert Gynecologists</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-pink-600" />
                  <span className="text-sm font-medium">Advanced Care</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-pink-600" />
                  <span className="text-sm font-medium">Emergency Services</span>
                </div>
              </div>
            </div>

            {/* Medical Image */}
            <div className="relative">
              <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl bg-white">
                <svg viewBox="0 0 400 300" className="w-full h-full">
                  {/* Background */}
                  <defs>
                    <linearGradient id="gynoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fdf2f8" />
                      <stop offset="100%" stopColor="#fce7f3" />
                    </linearGradient>
                  </defs>
                  <rect width="400" height="300" fill="url(#gynoGradient)" />
                  
                  {/* Reproductive anatomy representation */}
                  <g transform="translate(200, 150)">
                    {/* Uterus outline */}
                    <path d="M-25,-30 Q-35,-40 -25,-50 Q0,-55 25,-50 Q35,-40 25,-30 Q30,-20 25,-10 Q20,10 15,25 Q10,35 0,40 Q-10,35 -15,25 Q-20,10 -25,-10 Q-30,-20 -25,-30 Z" 
                          fill="#ec4899" opacity="0.6" stroke="#db2777" strokeWidth="2" />
                    
                    {/* Fallopian tubes */}
                    <path d="M-25,-40 Q-45,-35 -55,-25 Q-60,-20 -55,-15 Q-50,-18 -45,-20" 
                          stroke="#ec4899" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.8" />
                    <path d="M25,-40 Q45,-35 55,-25 Q60,-20 55,-15 Q50,-18 45,-20" 
                          stroke="#ec4899" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.8" />
                    
                    {/* Ovaries */}
                    <ellipse cx="-50" cy="-22" rx="8" ry="12" fill="#ec4899" opacity="0.7" />
                    <ellipse cx="50" cy="-22" rx="8" ry="12" fill="#ec4899" opacity="0.7" />
                    
                    {/* Cervix */}
                    <ellipse cx="0" cy="35" rx="8" ry="10" fill="#db2777" opacity="0.8" />
                  </g>
                  
                  {/* Ultrasound representation */}
                  <g transform="translate(80, 80)">
                    <rect x="0" y="0" width="100" height="80" fill="#374151" rx="5" />
                    <rect x="5" y="5" width="90" height="60" fill="#000000" />
                    
                    {/* Ultrasound image simulation */}
                    <g opacity="0.7">
                      <circle cx="50" cy="35" r="20" fill="#6b7280" opacity="0.5" />
                      <ellipse cx="50" cy="35" rx="12" ry="15" fill="#9ca3af" opacity="0.6" />
                      <circle cx="45" cy="32" r="4" fill="#d1d5db" opacity="0.8" />
                    </g>
                    
                    {/* Screen details */}
                    <rect x="10" y="70" width="20" height="5" fill="#6b7280" />
                    <rect x="35" y="70" width="15" height="5" fill="#6b7280" />
                    <rect x="55" y="70" width="25" height="5" fill="#6b7280" />
                  </g>
                  
                  {/* Medical instruments */}
                  <g transform="translate(320, 100)">
                    {/* Speculum */}
                    <ellipse cx="0" cy="0" rx="15" ry="6" fill="#9ca3af" stroke="#6b7280" strokeWidth="1" />
                    <rect x="-12" y="-2" width="24" height="4" fill="#6b7280" />
                    <circle cx="-20" cy="0" r="3" fill="#374151" />
                  </g>
                  
                  {/* Pregnancy stages */}
                  <g transform="translate(60, 200)">
                    {/* First trimester */}
                    <circle cx="0" cy="0" r="15" fill="#ec4899" opacity="0.3" stroke="#db2777" strokeWidth="2" />
                    <circle cx="0" cy="0" r="4" fill="#ec4899" opacity="0.8" />
                    <text x="0" y="25" textAnchor="middle" fontSize="10" fill="#db2777" fontWeight="bold">1st</text>
                    
                    {/* Second trimester */}
                    <circle cx="40" cy="0" r="18" fill="#ec4899" opacity="0.3" stroke="#db2777" strokeWidth="2" />
                    <circle cx="40" cy="0" r="8" fill="#ec4899" opacity="0.8" />
                    <text x="40" y="25" textAnchor="middle" fontSize="10" fill="#db2777" fontWeight="bold">2nd</text>
                    
                    {/* Third trimester */}
                    <circle cx="90" cy="0" r="22" fill="#ec4899" opacity="0.3" stroke="#db2777" strokeWidth="2" />
                    <circle cx="90" cy="0" r="12" fill="#ec4899" opacity="0.8" />
                    <text x="90" y="25" textAnchor="middle" fontSize="10" fill="#db2777" fontWeight="bold">3rd</text>
                  </g>
                  
                  {/* Baby development */}
                  <g transform="translate(300, 200)">
                    {/* Newborn */}
                    <circle cx="0" cy="-5" r="8" fill="#fbbf24" opacity="0.8" />
                    <ellipse cx="0" cy="5" rx="6" ry="12" fill="#fbbf24" opacity="0.8" />
                    <rect x="-3" y="17" width="2" height="8" fill="#fbbf24" opacity="0.8" />
                    <rect x="1" y="17" width="2" height="8" fill="#fbbf24" opacity="0.8" />
                    <rect x="-4" y="2" width="2" height="6" fill="#fbbf24" opacity="0.8" />
                    <rect x="2" y="2" width="2" height="6" fill="#fbbf24" opacity="0.8" />
                  </g>
                  
                  {/* Birth chart/monitoring */}
                  <g transform="translate(260, 50)">
                    <rect x="0" y="0" width="60" height="40" fill="#ffffff" stroke="#ec4899" strokeWidth="1" opacity="0.9" />
                    
                    {/* Vital signs */}
                    <path d="M5,20 Q15,15 25,20 Q35,25 45,20 Q55,15 55,20" 
                          stroke="#ec4899" strokeWidth="2" fill="none" />
                    <path d="M5,30 Q15,25 25,30 Q35,35 45,30 Q55,25 55,30" 
                          stroke="#f97316" strokeWidth="2" fill="none" />
                    
                    <text x="30" y="12" textAnchor="middle" fontSize="8" fill="#db2777" fontWeight="bold">Vitals</text>
                  </g>
                  
                  {/* Medical cross */}
                  <g transform="translate(50, 50)">
                    <rect x="-3" y="-12" width="6" height="24" fill="#ec4899" />
                    <rect x="-12" y="-3" width="24" height="6" fill="#ec4899" />
                  </g>
                  
                  {/* Heartbeat for mother and baby */}
                  <path d="M30 270 Q50 260 70 270 Q90 280 110 270 Q130 260 150 270" 
                        stroke="#ec4899" strokeWidth="2" fill="none" opacity="0.6" strokeLinecap="round" />
                  <path d="M170 270 Q180 265 190 270 Q200 275 210 270 Q220 265 230 270" 
                        stroke="#f97316" strokeWidth="2" fill="none" opacity="0.6" strokeLinecap="round" />
                </svg>
                
                <div className="absolute bottom-4 left-4 text-pink-800">
                  <h3 className="text-xl font-bold">Gynecology & Obstetrics</h3>
                  <p className="text-pink-600">Complete Women's Healthcare</p>
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
            Our Women's Health Services
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Pregnancy Care",
                description: "Comprehensive prenatal care, delivery services, and postpartum support for mother and baby.",
                icon: "🤱"
              },
              {
                title: "Gynecological Surgery",
                description: "Minimally invasive and traditional surgical procedures for various gynecological conditions.",
                icon: "⚕️"
              },
              {
                title: "Fertility Services",
                description: "Complete fertility evaluation, treatment, and counseling for couples trying to conceive.",
                icon: "👶"
              },
              {
                title: "Menopause Management",
                description: "Comprehensive care and hormone therapy for women going through menopause.",
                icon: "🌸"
              },
              {
                title: "Reproductive Health",
                description: "Family planning, contraception counseling, and reproductive health screenings.",
                icon: "💊"
              },
              {
                title: "High-Risk Pregnancy",
                description: "Specialized care for high-risk pregnancies with advanced monitoring and treatment.",
                icon: "🏥"
              }
            ].map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="text-4xl mb-2">{service.icon}</div>
                  <CardTitle className="text-xl text-pink-800">{service.title}</CardTitle>
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
            Our Women's Health Specialists
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gynecologyDoctors?.map((doctor) => (
              <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center">
                      <span className="text-pink-600 font-bold text-lg">
                        {doctor.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <CardTitle className="text-lg">{doctor.name}</CardTitle>
                      <p className="text-pink-600 font-medium">{doctor.specialization}</p>
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
      <section className="py-16 bg-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold mb-6">Maternity Emergency Care</h3>
          <p className="text-xl mb-8 text-pink-100">
            Our women's health team provides 24/7 emergency care for pregnancy and gynecological emergencies
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setShowAppointmentForm(true)}
              className="bg-white text-pink-600 hover:bg-pink-50"
            >
              Schedule Consultation
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-pink-600">
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