import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import drKhalidJameelImage from "@/images/Dr Khalid Jameel.jpeg";
import drVishrutBhartiImage from "@/images/Dr Vishrut Bharti.jpeg";
import drPPMishraImage from "@/images/P P Mishra.jpeg";
import drSomaShawGuptaImage from "@/images/Soma Shaw Gupta.jpeg";
import { 
  Calendar, 
  Clock, 
  Award, 
  Phone, 
  Mail, 
  MapPin,
  GraduationCap,
  Stethoscope,
  ArrowLeft
} from "lucide-react";
import { Link } from "wouter";
import type { Doctor, Department } from "@shared/schema";
import { AppointmentForm } from "@/components/appointment-form";
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

export default function DoctorProfile() {
  const { id } = useParams<{ id: string }>();
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);

  const { data: doctor, isLoading: doctorLoading } = useQuery<Doctor>({
    queryKey: ["/api/doctors", id],
    queryFn: () => fetch(`/api/doctors/${id}`).then(res => res.json()),
  });

  const { data: departments } = useQuery<Department[]>({
    queryKey: ["/api/departments"],
  });

  if (doctorLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading doctor profile...</p>
        </div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Doctor Not Found</h1>
          <p className="text-gray-600 mb-6">The doctor profile you're looking for doesn't exist.</p>
          <Link href="/">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const department = departments?.find(d => d.id === doctor.departmentId);

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
            <h1 className="text-xl font-semibold text-gray-900">Doctor Profile</h1>
            <div></div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Doctor Profile Header */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-12">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              {/* Doctor Image */}
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/30 shadow-xl">
                <img
                  src={getDoctorImage(doctor.name, doctor.id)}
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.classList.add('bg-white/20', 'flex', 'items-center', 'justify-center');
                    const icon = document.createElement('div');
                    icon.innerHTML = '<svg class="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>';
                    target.parentElement!.appendChild(icon);
                  }}
                />
              </div>
              
              {/* Doctor Info */}
              <div className="text-center md:text-left flex-1">
                <h1 className="text-4xl font-bold text-white mb-2">{doctor.name}</h1>
                <p className="text-xl text-blue-100 mb-4">{doctor.specialization}</p>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
                  {department && (
                    <Badge className="bg-white/20 text-white border-white/30 px-4 py-2 text-sm">
                      {department.name}
                    </Badge>
                  )}
                  <Badge className="bg-yellow-500 text-yellow-900 px-4 py-2 text-sm">
                    {doctor.experience} Years Experience
                  </Badge>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Button
                    onClick={() => setShowAppointmentForm(true)}
                    className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Appointment
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Contact Doctor
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Profile Information */}
          <div className="md:col-span-2 space-y-8">
            {/* About Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2 text-blue-600" />
                  About {doctor.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {doctor.name} is a highly experienced {doctor.specialization.toLowerCase()} 
                  with {doctor.experience} years of dedicated service in the medical field. 
                  Known for providing exceptional patient care and utilizing the latest medical 
                  technologies and treatment methods.
                </p>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Specialization</h4>
                    <p className="text-gray-600">{doctor.specialization}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Experience</h4>
                    <p className="text-gray-600">{doctor.experience} Years</p>
                  </div>
                  {department && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Department</h4>
                      <p className="text-gray-600">{department.name}</p>
                    </div>
                  )}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Qualifications</h4>
                    <p className="text-gray-600">{doctor.qualifications}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Education & Qualifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2 text-blue-600" />
                  Education & Qualifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {doctor.qualifications.split(', ').map((qualification, index) => (
                    <div key={index} className="flex items-center p-4 bg-blue-50 rounded-lg">
                      <div className="w-3 h-3 bg-blue-600 rounded-full mr-4"></div>
                      <span className="font-medium text-gray-900">{qualification}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Expertise Areas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Stethoscope className="w-5 h-5 mr-2 text-blue-600" />
                  Areas of Expertise
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {getExpertiseAreas(doctor.specialization).map((area, index) => (
                    <div key={index} className="flex items-center p-3 border border-blue-200 rounded-lg">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      <span className="text-gray-700">{area}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Consultation Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-blue-600" />
                  Consultation Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-medium">9:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-medium text-red-600">Closed</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-blue-600" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 text-gray-400 mr-3" />
                    <span className="text-gray-600">9918982900</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 text-gray-400 mr-3" />
                    <span className="text-gray-600">appointments@hospital.com</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 text-gray-400 mr-3" />
                    <span className="text-gray-600">Shri Krishna Mission Hospital</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button 
                    onClick={() => setShowAppointmentForm(true)}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Appointment
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Appointment Form Modal */}
      {showAppointmentForm && (
        <AppointmentForm onClose={() => setShowAppointmentForm(false)} />
      )}
    </div>
  );
}

// Helper function to get expertise areas based on specialization
function getExpertiseAreas(specialization: string): string[] {
  const expertiseMap: { [key: string]: string[] } = {
    "Senior Cardiologist": ["Heart Disease", "Hypertension", "Coronary Artery Disease", "Heart Failure"],
    "Interventional Cardiologist": ["Angioplasty", "Cardiac Catheterization", "Stent Placement", "Heart Attack Treatment"],
    "Chief Neurologist": ["Stroke Treatment", "Epilepsy", "Migraine", "Neurological Disorders"],
    "Orthopedic Surgeon": ["Joint Replacement", "Sports Injuries", "Fracture Treatment", "Arthritis"],
    "Gynecologist & Obstetrician": ["Women's Health", "Pregnancy Care", "Gynecological Surgery", "Family Planning"],
    "Pediatrician & Neonatologist": ["Child Healthcare", "Newborn Care", "Vaccinations", "Growth Development"],
    "General Surgeon": ["Surgical Procedures", "Emergency Surgery", "Trauma Care", "Minimally Invasive Surgery"],
    "Emergency Medicine Specialist": ["Critical Care", "Trauma Management", "Emergency Procedures", "Life Support"],
    "Medical Oncologist": ["Cancer Treatment", "Chemotherapy", "Radiation Therapy", "Tumor Management"],
    "Dermatologist": ["Skin Disorders", "Cosmetic Dermatology", "Skin Cancer", "Acne Treatment"],
    "Psychiatrist": ["Mental Health", "Depression Treatment", "Anxiety Disorders", "Psychological Therapy"],
    "Ophthalmologist": ["Eye Care", "Vision Correction", "Cataract Surgery", "Retinal Disorders"],
    "ENT Specialist": ["Ear Disorders", "Nose Surgery", "Throat Problems", "Hearing Loss"],
    "Gastroenterologist": ["Digestive Disorders", "Liver Disease", "Endoscopy", "Inflammatory Bowel Disease"],
    "Pulmonologist": ["Lung Diseases", "Asthma Treatment", "Respiratory Care", "Sleep Disorders"],
  };

  return expertiseMap[specialization] || ["General Medical Care", "Patient Consultation", "Health Monitoring", "Treatment Planning"];
}