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

            {/* Image */}
            <div className="relative">
              <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-600 to-pink-800 flex items-center justify-center">
                  <div className="text-center text-white">
                    <User className="w-24 h-24 mx-auto mb-4 opacity-80" />
                    <h3 className="text-2xl font-bold mb-2">Gynecology & Obstetrics</h3>
                    <p className="text-pink-100">Complete Women's Healthcare</p>
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