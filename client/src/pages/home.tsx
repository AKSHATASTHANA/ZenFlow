import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, Award, Phone, Mail, MapPin } from "lucide-react";
import { AppointmentForm } from "@/components/appointment-form";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Department, Doctor } from "@shared/schema";

export default function HomePage() {
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);

  const { data: departments } = useQuery<Department[]>({
    queryKey: ["/api/departments"],
  });

  const { data: doctors } = useQuery<Doctor[]>({
    queryKey: ["/api/doctors"],
  });

  const { data: stats } = useQuery<{
    totalAppointments: number;
    pendingAppointments: number;
    confirmedAppointments: number;
    totalDepartments: number;
    totalDoctors: number;
  }>({
    queryKey: ["/api/stats"],
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12z" clipRule="evenodd" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">MediCare Hospital</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#services" className="text-gray-600 hover:text-blue-600">Services</a>
              <a href="#doctors" className="text-gray-600 hover:text-blue-600">Doctors</a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600">Contact</a>
              <Button 
                onClick={() => setShowAppointmentForm(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Book Appointment
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Health is Our
            <span className="text-blue-600"> Priority</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Experience world-class healthcare with our team of expert doctors and state-of-the-art facilities. 
            We provide comprehensive medical care with compassion and excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => setShowAppointmentForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book Appointment
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-3"
            >
              <Phone className="w-5 h-5 mr-2" />
              Emergency: 911
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">{stats?.totalDoctors || 0}+</div>
              <div className="text-gray-600">Expert Doctors</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">{stats?.totalDepartments || 0}+</div>
              <div className="text-gray-600">Departments</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">10,000+</div>
              <div className="text-gray-600">Happy Patients</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">24/7</div>
              <div className="text-gray-600">Emergency Care</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Medical Departments</h3>
            <p className="text-xl text-gray-600">Comprehensive healthcare services across multiple specialties</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {departments?.map((department) => (
              <Card key={department.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-600">{department.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{department.description}</p>
                  {department.headDoctor && (
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="w-4 h-4 mr-2" />
                      Head: {department.headDoctor}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section id="doctors" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Expert Doctors</h3>
            <p className="text-xl text-gray-600">Experienced professionals dedicated to your health</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors?.slice(0, 6).map((doctor) => (
              <Card key={doctor.id} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-12 h-12 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{doctor.name}</CardTitle>
                  <Badge variant="secondary" className="mt-2">{doctor.specialization}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-2">{doctor.qualifications}</p>
                  <div className="flex items-center justify-center text-sm text-gray-500">
                    <Award className="w-4 h-4 mr-2" />
                    {doctor.experience} years experience
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-4">Contact Us</h3>
            <p className="text-xl opacity-90">Get in touch for appointments and inquiries</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <Phone className="w-8 h-8 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Phone</h4>
              <p className="opacity-90">+1 (555) 123-4567</p>
              <p className="opacity-90">Emergency: 911</p>
            </div>
            <div>
              <Mail className="w-8 h-8 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Email</h4>
              <p className="opacity-90">info@medicare-hospital.com</p>
              <p className="opacity-90">appointments@medicare-hospital.com</p>
            </div>
            <div>
              <MapPin className="w-8 h-8 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Address</h4>
              <p className="opacity-90">123 Medical Center Drive</p>
              <p className="opacity-90">Healthcare City, HC 12345</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h5 className="text-lg font-semibold mb-4">MediCare Hospital</h5>
              <p className="text-gray-400">Providing exceptional healthcare services with compassion and excellence.</p>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#services" className="hover:text-white">Services</a></li>
                <li><a href="#doctors" className="hover:text-white">Doctors</a></li>
                <li><a href="#contact" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4">Services</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Emergency Care</li>
                <li>Surgery</li>
                <li>Diagnostics</li>
                <li>Rehabilitation</li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4">Hours</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Mon-Fri: 8:00 AM - 8:00 PM</li>
                <li>Sat-Sun: 9:00 AM - 6:00 PM</li>
                <li>Emergency: 24/7</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 MediCare Hospital. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Appointment Form Modal */}
      {showAppointmentForm && (
        <AppointmentForm onClose={() => setShowAppointmentForm(false)} />
      )}
    </div>
  );
}