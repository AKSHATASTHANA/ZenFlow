import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, Clock, Users, Award, Phone, Calendar } from "lucide-react";
import { AppointmentForm } from "@/components/appointment-form";
import { useState } from "react";
import type { Doctor } from "@shared/schema";

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

            {/* Image */}
            <div className="relative">
              <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Brain className="w-24 h-24 mx-auto mb-4 opacity-80" />
                    <h3 className="text-2xl font-bold mb-2">Neurology Department</h3>
                    <p className="text-purple-100">Advanced Brain & Nerve Care</p>
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