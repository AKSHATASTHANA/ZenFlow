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

            {/* Image */}
            <div className="relative">
              <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600 to-orange-800 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Bone className="w-24 h-24 mx-auto mb-4 opacity-80" />
                    <h3 className="text-2xl font-bold mb-2">Orthopedics Department</h3>
                    <p className="text-orange-100">Advanced Bone & Joint Care</p>
                  </div>
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