import React from "react";
import ReactMarkdown from "react-markdown";

// You can adjust this image path to your hospital image
const hospitalImageUrl = "/images/hospital.jpg"; // Replace with your actual image path

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-b from-white to-blue-50 flex items-center justify-center"
    >
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-24">
        {/* Hospital Image - left */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <div className="relative w-80 h-96 md:w-96 md:h-[30rem] rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center bg-gradient-to-br from-blue-200 to-blue-50">
            <img
              src={hospitalImageUrl}
              alt="Shri Krishna Mission Hospital"
              className="object-cover w-full h-full rounded-2xl border-8 border-white shadow-xl"
            />
            {/* Optional floating effect */}
            <div className="absolute inset-0 pointer-events-none animate-float opacity-10" />
          </div>
        </div>
        {/* Letter - right */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-start">
          <div
            className="prose prose-lg text-gray-700 leading-relaxed bg-white/90 border border-blue-100 rounded-2xl shadow-2xl p-10 relative md:-mr-12 md:ml-0 ml-0 mt-8 md:mt-0
              float-animation"
            style={{
              boxShadow: "0 8px 32px rgba(44, 76, 120, 0.13)",
              minWidth: "300px",
              maxWidth: "540px",
              zIndex: 2,
            }}
          >
            <h3 className="text-4xl md:text-5xl font-bold text-blue-800 mb-8 text-center md:text-left">
              About Shri Krishna Mission Hospital
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
            {/* Optional decorative float icon */}
            <div className="absolute top-4 right-4 opacity-15 pointer-events-none animate-float">
              <svg width="48" height="48" fill="none" viewBox="0 0 48 48">
                <rect
                  x="5"
                  y="5"
                  width="38"
                  height="38"
                  rx="8"
                  fill="#3B82F6"
                  fillOpacity="0.09"
                  stroke="#3B82F6"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      {/* Add this CSS to your global or component styles */}
      <style>{`
        .float-animation {
          animation: floatLetter 4s ease-in-out infinite;
        }
        @keyframes floatLetter {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-16px);
          }
        }
        .animate-float {
          animation: floatImage 6s ease-in-out infinite;
        }
        @keyframes floatImage {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </section>
  );
}