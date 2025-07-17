import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Clock, Users, Award, Phone, Calendar } from "lucide-react";
import { AppointmentForm } from "@/components/appointment-form";
import { useState } from "react";
import type { Doctor } from "@shared/schema";

export default function CardiologyPage() {
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);

  const { data: doctors } = useQuery<Doctor[]>({
    queryKey: ["/api/doctors"],
  });

  const cardiologyDoctors = doctors?.filter(doctor => 
    doctor.specialization.toLowerCase().includes('cardiology') || 
    doctor.departmentId === 1
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Cardiology Department</h1>
            </div>
            <Button
              onClick={() => setShowAppointmentForm(true)}
              className="bg-red-600 hover:bg-red-700"
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
                Advanced Cardiac Care
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Our Cardiology Department offers comprehensive heart care services with state-of-the-art technology and expert cardiologists dedicated to your cardiovascular health.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-red-600" />
                  <span className="text-sm font-medium">24/7 Emergency</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-red-600" />
                  <span className="text-sm font-medium">Expert Team</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-red-600" />
                  <span className="text-sm font-medium">Advanced Technology</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-red-600" />
                  <span className="text-sm font-medium">24/7 Support</span>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Heart className="w-24 h-24 mx-auto mb-4 opacity-80" />
                    <h3 className="text-2xl font-bold mb-2">Cardiology Department</h3>
                    <p className="text-red-100">Advanced Heart Care</p>
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
            Our Cardiology Services
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Cardiac Surgery",
                description: "Advanced surgical procedures including bypass surgery, valve repair, and minimally invasive cardiac procedures.",
                icon: "⚕️"
              },
              {
                title: "Interventional Cardiology",
                description: "Catheter-based procedures, angioplasty, stenting, and other minimally invasive treatments.",
                icon: "🫀"
              },
              {
                title: "Electrophysiology",
                description: "Diagnosis and treatment of heart rhythm disorders, pacemaker implantation, and arrhythmia management.",
                icon: "⚡"
              },
              {
                title: "Heart Failure Management",
                description: "Comprehensive care for patients with heart failure including medication management and lifestyle counseling.",
                icon: "💊"
              },
              {
                title: "Preventive Cardiology",
                description: "Risk assessment, screening programs, and preventive care to maintain heart health.",
                icon: "🛡️"
              },
              {
                title: "Cardiac Rehabilitation",
                description: "Post-treatment recovery programs including exercise therapy and lifestyle modification.",
                icon: "🏃"
              }
            ].map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="text-4xl mb-2">{service.icon}</div>
                  <CardTitle className="text-xl text-red-800">{service.title}</CardTitle>
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
            Our Cardiology Experts
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cardiologyDoctors?.map((doctor) => (
              <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold text-lg">
                        {doctor.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <CardTitle className="text-lg">{doctor.name}</CardTitle>
                      <p className="text-red-600 font-medium">{doctor.specialization}</p>
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
      <section className="py-16 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold mb-6">Emergency Cardiac Care</h3>
          <p className="text-xl mb-8 text-red-100">
            Our cardiology team is available 24/7 for emergency heart care
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setShowAppointmentForm(true)}
              className="bg-white text-red-600 hover:bg-red-50"
            >
              Schedule Consultation
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-red-600">
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