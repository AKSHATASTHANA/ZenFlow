import { ArrowLeft, Microscope, Activity, Clock, Phone, User } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const doctorImages = {
  "Dr. Dawad": "/src/images/Dr Dawad.jpeg",
};

const getImagePath = (doctorName: string) => {
  return doctorImages[doctorName as keyof typeof doctorImages] || "/src/images/doctor.jpg";
};

export default function Pathology() {
  const services = [
    "Clinical Pathology",
    "Histopathology",
    "Cytopathology",
    "Hematology",
    "Blood Chemistry",
    "Microbiology",
    "Immunology Tests",
    "Molecular Diagnostics"
  ];

  const doctors = [
    {
      name: "Dr. Dawad",
      qualification: "MBBS, MD (Pathology)",
      experience: "16+ years",
      specialization: "Clinical Pathology & Diagnostics"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="h-6 w-px bg-gray-300" />
            <h1 className="text-2xl font-bold text-navy-900">Pathology</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Department Overview */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-teal-100 rounded-full">
                <Microscope className="w-8 h-8 text-teal-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Pathology</h2>
                <p className="text-gray-600 mt-1">Advanced Laboratory Diagnostics</p>
              </div>
            </div>
            
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Our Pathology department provides comprehensive laboratory services with 
              state-of-the-art diagnostic equipment and expert pathologists. We offer 
              accurate and timely results for clinical diagnosis and treatment monitoring.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-teal-50 rounded-lg">
                <Activity className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900">24/7 Lab</h3>
                <p className="text-sm text-gray-600">Emergency testing available</p>
              </div>
              <div className="text-center p-4 bg-teal-50 rounded-lg">
                <Microscope className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900">Advanced Testing</h3>
                <p className="text-sm text-gray-600">Molecular diagnostics</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-xl mb-4 text-gray-900">Laboratory Services</h3>
                <div className="grid grid-cols-1 gap-2">
                  {services.map((service, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-teal-50">
                      <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                      <span className="text-gray-700">{service}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-teal-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6" />
                  <h3 className="font-bold text-lg">Laboratory Hours</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>6:00 AM - 10:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span>7:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span>8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Emergency Lab:</span>
                    <span>24/7 Available</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Doctors Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Pathology Expert</h2>
          <div className="grid md:grid-cols-1 gap-6 max-w-md mx-auto">
            {doctors.map((doctor, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="flex">
                    <div className="w-24 h-24 bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center">
                      <img
                        src={getImagePath(doctor.name)}
                        alt={doctor.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.setAttribute('style', 'display: flex');
                        }}
                      />
                      <div className="w-full h-full bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center" style={{display: 'none'}}>
                        <User className="w-12 h-12 text-teal-600" />
                      </div>
                    </div>
                    <div className="flex-1 p-4">
                      <h3 className="font-bold text-lg text-gray-900">{doctor.name}</h3>
                      <p className="text-teal-600 font-medium text-sm">{doctor.qualification}</p>
                      <p className="text-gray-600 text-sm mt-1">{doctor.specialization}</p>
                      <Badge variant="secondary" className="mt-2">
                        {doctor.experience} Experience
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <Card className="bg-gradient-to-r from-teal-600 to-teal-700 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Need Laboratory Testing?</h2>
            <p className="text-teal-100 mb-6">
              Schedule your lab tests with our pathology department
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#appointment">
                <Button variant="secondary" size="lg" className="bg-white text-teal-600 hover:bg-teal-50">
                  Book Lab Test
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-teal-600">
                <Phone className="w-4 h-4 mr-2" />
                Call: +91-1234567890
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}