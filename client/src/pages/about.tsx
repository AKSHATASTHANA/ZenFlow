import React from "react";
import ReactMarkdown from "react-markdown";
import { Award, Users, Heart, Shield, Clock, MapPin } from "lucide-react";

// You can adjust this image path to your hospital image
const hospitalImageUrl = "/images/hospital.jpg"; // Replace with your actual image path

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-b from-white via-blue-50 to-white relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-blue-200 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-300 rounded-full opacity-10 animate-float"></div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-blue-800 mb-6">
            About Our Hospital
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16">
          {/* Hospital Image Section - Enhanced */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-blue-400 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
              <div className="relative w-96 h-[28rem] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-200 to-blue-50 transform group-hover:scale-105 transition duration-300">
                <img
                  src={hospitalImageUrl}
                  alt="Shri Krishna Mission Hospital"
                  className="object-cover w-full h-full rounded-2xl border-4 border-white shadow-xl"
                />
                {/* Overlay with hospital stats */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  <div className="text-white text-center">
                    <div className="text-2xl font-bold">Since 1985</div>
                    <div className="text-sm opacity-90">Serving with Excellence</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section - Enhanced */}
          <div className="w-full lg:w-1/2">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-blue-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-800">2.45L+</div>
                    <div className="text-sm text-gray-600">Patients Served</div>
                  </div>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-blue-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Heart className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-700">15+</div>
                    <div className="text-sm text-gray-600">Expert Doctors</div>
                  </div>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-blue-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Award className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-purple-700">NABH</div>
                    <div className="text-sm text-gray-600">Accredited</div>
                  </div>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-blue-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Clock className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-red-700">24/7</div>
                    <div className="text-sm text-gray-600">Emergency</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="bg-white/90 backdrop-blur-sm border border-blue-100 rounded-2xl shadow-xl p-8 relative overflow-hidden">
              {/* Decorative corner element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-600/10 to-transparent rounded-bl-full"></div>
              
              <h3 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6 flex items-center gap-3">
                <MapPin className="h-8 w-8 text-blue-600" />
                Shri Krishna Mission Hospital
              </h3>
            <ReactMarkdown>
              {`
It gives me immense pride and satisfaction to welcome you to **Shri Krishna Mission Hospital** – a place where compassion meets care, and healing is guided by dedication and ethics.

## Our Legacy
Since its inception in 1985, our hospital has stood as a beacon of hope for countless individuals and families across Uttar Pradesh. Inspired by the teachings of Lord Shri Krishna, we believe in serving humanity with devotion, dignity, and the highest standard of medical excellence.

## Our Mission
Our mission has always been to provide accessible, affordable, and world-class healthcare to all, regardless of background or circumstance. We serve over **50,000 patients annually** with a commitment to excellence that has earned us recognition as one of the leading healthcare institutions in Eastern Uttar Pradesh.

## Centers of Excellence
- **Cardiac Care Center** - Advanced cardiac surgery and interventional cardiology
- **Neuroscience Institute** - Comprehensive neurological and neurosurgical services
- **Orthopedic & Joint Replacement Center** - State-of-the-art orthopedic treatments
- **Oncology Department** - Comprehensive cancer care with latest treatment protocols
- **Emergency & Trauma Center** - 24/7 emergency services with Level-1 trauma care
- **Maternity & Child Care** - Complete mother and child healthcare services

## Our Commitment
With a team of **200+ highly skilled doctors**, compassionate nurses, and dedicated staff, we aim to bring the best in modern medicine while staying rooted in values that nurture humanity. We are continuously investing in advanced technology, infrastructure, and training to respond effectively to the evolving healthcare needs of our community.

## Recognition & Accreditations
- **NABH Accredited** - National Accreditation Board for Hospitals
- **ISO 9001:2015 Certified** - Quality Management System
- **Best Hospital Award** - Healthcare Excellence Awards 2023
- **Green Hospital Initiative** - Environment-friendly healthcare practices

I am deeply grateful to everyone – our team, our patients, and our well-wishers – who have placed their trust in us. Together, we move forward with the vision of a healthier and more hopeful tomorrow.

---

*With warmest regards,*  
**Shri Basant Chaudhary**  
*Chairman*  
Shri Krishna Mission Hospital, Basti
              `}
              </ReactMarkdown>
              
              {/* Signature section with enhanced styling */}
              <div className="mt-8 pt-6 border-t border-blue-200">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">BC</span>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-blue-800">Shri Basant Chaudhary</div>
                    <div className="text-sm text-gray-600">Chairman</div>
                    <div className="text-sm text-blue-600">Shri Krishna Mission Hospital, Basti</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Centers of Excellence Section */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-blue-800 text-center mb-12">Centers of Excellence</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Cardiac Care", icon: "❤️", description: "Advanced cardiac surgery and interventional cardiology" },
              { name: "Neuroscience", icon: "🧠", description: "Comprehensive neurological and neurosurgical services" },
              { name: "Orthopedics", icon: "🦴", description: "State-of-the-art orthopedic treatments" },
              { name: "Oncology", icon: "🎗️", description: "Comprehensive cancer care with latest protocols" },
              { name: "Emergency & Trauma", icon: "🚑", description: "24/7 emergency services with Level-1 trauma care" },
              { name: "Maternity & Child Care", icon: "👶", description: "Complete mother and child healthcare services" }
            ].map((center, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300 group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{center.icon}</div>
                <h4 className="text-xl font-semibold text-blue-800 mb-2">{center.name}</h4>
                <p className="text-gray-600 text-sm">{center.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Accreditations Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold text-center mb-8">Recognition & Accreditations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "NABH Accredited", desc: "National Board for Hospitals" },
              { title: "ISO 9001:2015", desc: "Quality Management System" },
              { title: "Best Hospital 2023", desc: "Healthcare Excellence Awards" },
              { title: "Green Initiative", desc: "Environment-friendly practices" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <div className="font-semibold">{item.title}</div>
                <div className="text-blue-100 text-sm">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced animations */}
      <style>{`
        .animate-float {
          animation: floatImage 6s ease-in-out infinite;
        }
        @keyframes floatImage {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-pulse {
          animation: pulse 4s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.6; }
        }
        .animate-bounce {
          animation: bounce 3s ease-in-out infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </section>
  );
}