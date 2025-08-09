import { ArrowLeft, User, Clock, Phone } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const doctorImages = {
  "Dr. Soma Shaw Gupta": "/src/images/Soma Shaw Gupta.jpeg",
};

const getImagePath = (doctorName: string) => {
  return doctorImages[doctorName as keyof typeof doctorImages] || "/src/images/doctor.jpg";
};

export default function Gynecology() {
  const services = [
    "Pregnancy Care & Delivery",
    "Gynecological Surgery",
    "Fertility Treatment",
    "Menopause Management",
    "Reproductive Health",
    "High-Risk Pregnancy Care",
    "Family Planning",
    "Women's Health Screening"
  ];

  const doctors = [
    {
      name: "Dr. Soma Shaw Gupta",
      qualification: "MBBS, MD (Gynecology & Obstetrics)",
      experience: "14+ years",
      specialization: "Women's Health & Maternity Care"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
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
            <h1 className="text-2xl font-bold text-navy-900">Gynecology & Obstetrics</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Department Overview */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-pink-100 rounded-full">
                <User className="w-8 h-8 text-pink-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Gynecology & Obstetrics</h2>
                <p className="text-gray-600 mt-1">Comprehensive Women's Healthcare</p>
              </div>
            </div>
            
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Our Gynecology & Obstetrics department provides comprehensive healthcare for women 
              at every stage of life. We offer specialized care for pregnancy, childbirth, 
              reproductive health, and all gynecological conditions with compassionate expertise.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-pink-50 rounded-lg">
                <Clock className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900">24/7 Maternity</h3>
                <p className="text-sm text-gray-600">Emergency delivery care</p>
              </div>
              <div className="text-center p-4 bg-pink-50 rounded-lg">
                <User className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900">Expert Care</h3>
                <p className="text-sm text-gray-600">Experienced gynecologist</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-xl mb-4 text-gray-900">Women's Health Services</h3>
                <div className="grid grid-cols-1 gap-2">
                  {services.map((service, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-pink-50">
                      <div className="w-2 h-2 bg-pink-600 rounded-full"></div>
                      <span className="text-gray-700">{service}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-pink-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6" />
                  <h3 className="font-bold text-lg">Department Hours</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>8:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Maternity Emergency:</span>
                    <span>24/7 Available</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Doctors Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Women's Health Specialist</h2>
          <div className="grid md:grid-cols-1 gap-6 max-w-md mx-auto">
            {doctors.map((doctor, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="flex">
                    <div className="w-24 h-24 bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center">
                      <img
                        src={getImagePath(doctor.name)}
                        alt={doctor.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.setAttribute('style', 'display: flex');
                        }}
                      />
                      <div className="w-full h-full bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center" style={{display: 'none'}}>
                        <User className="w-12 h-12 text-pink-600" />
                      </div>
                    </div>
                    <div className="flex-1 p-4">
                      <h3 className="font-bold text-lg text-gray-900">{doctor.name}</h3>
                      <p className="text-pink-600 font-medium text-sm">{doctor.qualification}</p>
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
        <Card className="bg-gradient-to-r from-pink-600 to-pink-700 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Need Women's Health Consultation?</h2>
            <p className="text-pink-100 mb-6">
              Schedule an appointment with our gynecology and obstetrics specialist
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#appointment">
                <Button variant="secondary" size="lg" className="bg-white text-pink-600 hover:bg-pink-50">
                  Book Appointment
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-pink-600">
                <Phone className="w-4 h-4 mr-2" />
                Emergency: +91-1234567890
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}