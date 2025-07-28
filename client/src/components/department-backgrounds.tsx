import React from "react";

interface DepartmentBackgroundProps {
  department: string;
  className?: string;
}

export function DepartmentBackground({ department, className = "absolute inset-0 opacity-5" }: DepartmentBackgroundProps) {
  const getDepartmentBackground = (dept: string) => {
    const normalizedDept = dept.toLowerCase();
    
    if (normalizedDept.includes("cardiology") || normalizedDept.includes("cardiac")) {
      return (
        <svg viewBox="0 0 200 200" className={className}>
          <defs>
            <pattern id="cardioPattern" patternUnits="userSpaceOnUse" width="40" height="40">
              <circle cx="20" cy="20" r="15" fill="none" stroke="#ef4444" strokeWidth="1" opacity="0.3" />
              <path d="M10,20 L15,15 L20,25 L25,10 L30,30" stroke="#ef4444" strokeWidth="1.5" fill="none" opacity="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cardioPattern)" />
          {/* Large heart watermark */}
          <g transform="translate(100,100)">
            <path
              d="M0,15 C-25,-10 -40,10 0,40 C40,10 25,-10 0,15 Z"
              fill="#ef4444"
              opacity="0.1"
              transform="scale(2)"
            />
          </g>
        </svg>
      );
    }
    
    if (normalizedDept.includes("neurology") || normalizedDept.includes("neuro")) {
      return (
        <svg viewBox="0 0 200 200" className={className}>
          <defs>
            <pattern id="neuroPattern" patternUnits="userSpaceOnUse" width="30" height="30">
              <circle cx="15" cy="15" r="2" fill="#8b5cf6" opacity="0.3" />
              <path d="M5,15 Q15,5 25,15 Q15,25 5,15" stroke="#8b5cf6" strokeWidth="0.5" fill="none" opacity="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#neuroPattern)" />
          {/* Brain silhouette */}
          <g transform="translate(100,100)">
            <path
              d="M-40,-50 C-60,-60 -70,-40 -60,-20 C-70,0 -60,20 -50,40 C-40,50 -20,56 0,50 C20,56 40,50 50,40 C60,20 70,0 60,-20 C70,-40 60,-60 40,-50 C20,-60 0,-56 -20,-60 C-30,-56 -36,-52 -40,-50 Z"
              fill="#8b5cf6"
              opacity="0.08"
            />
          </g>
        </svg>
      );
    }
    
    if (normalizedDept.includes("orthopedic") || normalizedDept.includes("bone")) {
      return (
        <svg viewBox="0 0 200 200" className={className}>
          <defs>
            <pattern id="orthoPattern" patternUnits="userSpaceOnUse" width="35" height="35">
              <rect x="15" y="5" width="5" height="25" fill="#f97316" opacity="0.2" />
              <circle cx="17.5" cy="5" r="3" fill="#f97316" opacity="0.2" />
              <circle cx="17.5" cy="30" r="3" fill="#f97316" opacity="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#orthoPattern)" />
          {/* Bone watermark */}
          <g transform="translate(100,100)">
            <ellipse cx="-30" cy="-40" rx="16" ry="12" fill="#f97316" opacity="0.1" />
            <ellipse cx="30" cy="40" rx="16" ry="12" fill="#f97316" opacity="0.1" />
            <rect x="-6" y="-30" width="12" height="60" fill="#f97316" opacity="0.1" rx="6" />
          </g>
        </svg>
      );
    }
    
    if (normalizedDept.includes("pediatric") || normalizedDept.includes("child")) {
      return (
        <svg viewBox="0 0 200 200" className={className}>
          <defs>
            <pattern id="pediatricPattern" patternUnits="userSpaceOnUse" width="25" height="25">
              <circle cx="12.5" cy="12.5" r="8" fill="none" stroke="#10b981" strokeWidth="0.5" opacity="0.3" />
              <circle cx="12.5" cy="12.5" r="2" fill="#10b981" opacity="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pediatricPattern)" />
          {/* Child silhouette */}
          <g transform="translate(100,100)">
            <circle cx="0" cy="-20" r="25" fill="#10b981" opacity="0.08" />
            <ellipse cx="0" cy="20" rx="20" ry="15" fill="#10b981" opacity="0.08" />
          </g>
        </svg>
      );
    }
    
    if (normalizedDept.includes("gynecology") || normalizedDept.includes("women")) {
      return (
        <svg viewBox="0 0 200 200" className={className}>
          <defs>
            <pattern id="gynePattern" patternUnits="userSpaceOnUse" width="30" height="30">
              <circle cx="15" cy="10" r="3" fill="#ec4899" opacity="0.2" />
              <circle cx="10" cy="8" r="2" fill="#ec4899" opacity="0.15" />
              <circle cx="20" cy="8" r="2" fill="#ec4899" opacity="0.15" />
              <circle cx="8" cy="13" r="2" fill="#ec4899" opacity="0.15" />
              <circle cx="22" cy="13" r="2" fill="#ec4899" opacity="0.15" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gynePattern)" />
          {/* Floral watermark */}
          <g transform="translate(100,100)">
            <circle cx="0" cy="0" r="40" fill="none" stroke="#ec4899" strokeWidth="3" opacity="0.1" />
            <path d="M0,40 L0,80" stroke="#ec4899" strokeWidth="6" opacity="0.1" />
            <path d="M-12,60 L12,60" stroke="#ec4899" strokeWidth="6" opacity="0.1" />
          </g>
        </svg>
      );
    }
    
    // Default medical pattern
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <pattern id="medicalPattern" patternUnits="userSpaceOnUse" width="20" height="20">
            <rect x="7" y="2" width="6" height="16" fill="#3b82f6" opacity="0.1" />
            <rect x="2" y="7" width="16" height="6" fill="#3b82f6" opacity="0.1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#medicalPattern)" />
      </svg>
    );
  };

  return getDepartmentBackground(department);
}