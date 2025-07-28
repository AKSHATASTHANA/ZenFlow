import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import drKhalidJameelImage from "@/images/Dr Khalid Jameel.jpeg";
import drVishrutBhartiImage from "@/images/Dr Vishrut Bharti.jpeg";
import drPPMishraImage from "@/images/P P Mishra.jpeg";
import drSomaShawGuptaImage from "@/images/Soma Shaw Gupta.jpeg";
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

// Helper function to get doctor image based on name or ID
const getDoctorImage = (doctorName: string, doctorId: number) => {
  const imageMap: { [key: string]: string } = {
    "Dr. Khalid Jameel": drKhalidJameelImage,
    "Dr. Vishrut Bharti": drVishrutBhartiImage,
    "Dr. P P Mishra": drPPMishraImage,
    "Dr. Soma Shaw Gupta": drSomaShawGuptaImage,
  };
  
  return imageMap[doctorName] || 
         imageMap[`Dr. ${doctorName.replace("Dr. ", "")}`] ||
         Object.values(imageMap)[(doctorId - 1) % Object.values(imageMap).length];
};

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
                {/* Doctor Image Section */}
                <div className="relative h-48 bg-gradient-to-br from-blue-50 to-white overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent"></div>
                  <img
                    src={getDoctorImage(doctor.name, doctor.id)}
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const container = target.parentElement!;
                      container.innerHTML = `
                        <div class="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent"></div>
                        <div class="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                          <div class="text-center">
                            <div class="w-20 h-20 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                              <svg class="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                              </svg>
                            </div>
                            <div class="text-sm font-medium text-blue-700 bg-white/80 px-3 py-1 rounded-full">
                              ${doctor.specialization}
                            </div>
                          </div>
                        </div>
                      `;
                    }}
                  />
                  
                  {/* Experience badge overlay */}
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-blue-600 text-white shadow-lg">
                      {doctor.experience} Years
                    </Badge>
                  </div>
                </div>

                <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-white">{doctor.name}</CardTitle>
                      <p className="text-blue-100 text-sm">{doctor.specialization}</p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-center">
                      {department && (
                        <Badge className="bg-blue-100 text-blue-800">
                          {department.name}
                        </Badge>
                      )}
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