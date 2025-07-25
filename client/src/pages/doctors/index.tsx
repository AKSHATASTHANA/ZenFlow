import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Award, 
  Phone, 
  Mail, 
  MapPin,
  Stethoscope,
  ArrowLeft,
  Search
} from "lucide-react";
import { Link } from "wouter";
import type { Doctor, Department } from "@shared/schema";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function DoctorsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: doctors, isLoading: doctorsLoading } = useQuery<Doctor[]>({
    queryKey: ["/api/doctors"],
  });

  const { data: departments } = useQuery<Department[]>({
    queryKey: ["/api/departments"],
  });

  const filteredDoctors = doctors?.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (doctorsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading doctors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" className="flex items-center">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">Our Doctors</h1>
            <div></div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Meet Our Expert Doctors
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Our team of highly qualified and experienced medical professionals is dedicated 
            to providing you with the best healthcare services.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search doctors by name or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 w-full border-2 border-gray-200 focus:border-blue-500 rounded-full"
            />
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors?.map((doctor) => {
            const department = departments?.find(d => d.id === doctor.departmentId);
            
            return (
              <Card key={doctor.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                      <Stethoscope className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-white">{doctor.name}</CardTitle>
                      <p className="text-blue-100">{doctor.specialization}</p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      {department && (
                        <Badge className="bg-blue-100 text-blue-800">
                          {department.name}
                        </Badge>
                      )}
                      <Badge variant="outline" className="border-green-200 text-green-700">
                        {doctor.experience} Years
                      </Badge>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Qualifications</h4>
                      <p className="text-sm text-gray-600">{doctor.qualifications}</p>
                    </div>
                    
                    <div className="pt-4 flex flex-col space-y-2">
                      <Link href={`/doctors/${doctor.id}`}>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">
                          <Award className="w-4 h-4 mr-2" />
                          View Profile
                        </Button>
                      </Link>
                      <Button variant="outline" className="w-full">
                        <Calendar className="w-4 h-4 mr-2" />
                        Book Appointment
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredDoctors?.length === 0 && (
          <div className="text-center py-12">
            <Stethoscope className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No doctors found</h3>
            <p className="text-gray-600">Try adjusting your search terms.</p>
          </div>
        )}

        {/* Contact Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Need Help Finding a Doctor?</h2>
            <p className="text-gray-600">Our patient care team is here to help you connect with the right specialist.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="p-6">
              <Phone className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600">9918982900</p>
            </div>
            <div className="p-6">
              <Mail className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600">appointments@hospital.com</p>
            </div>
            <div className="p-6">
              <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Visit Us</h3>
              <p className="text-gray-600">Shri Krishna Mission Hospital</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}