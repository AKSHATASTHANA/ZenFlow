import React from "react";

interface DepartmentIconProps {
  department: string;
  className?: string;
}

export function DepartmentIcon({ department, className = "w-16 h-16" }: DepartmentIconProps) {
  const getDepartmentIcon = (dept: string) => {
    const normalizedDept = dept.toLowerCase();
    
    if (normalizedDept.includes("cardiology") || normalizedDept.includes("cardiac")) {
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <defs>
            <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#ef4444", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "#dc2626", stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <g transform="translate(50,50)">
            <path
              d="M0,15 C-25,-10 -40,10 0,40 C40,10 25,-10 0,15 Z"
              fill="url(#heartGradient)"
              stroke="#b91c1c"
              strokeWidth="2"
            />
            <circle cx="-8" cy="5" r="2" fill="#fecaca" opacity="0.8" />
            <circle cx="12" cy="8" r="1.5" fill="#fecaca" opacity="0.6" />
            {/* ECG line */}
            <path
              d="M-30,0 L-20,0 L-15,-8 L-10,8 L-5,-12 L0,12 L5,0 L30,0"
              stroke="#fff"
              strokeWidth="1.5"
              fill="none"
              opacity="0.9"
            />
          </g>
        </svg>
      );
    }
    
    if (normalizedDept.includes("neurology") || normalizedDept.includes("neuro")) {
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <defs>
            <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#8b5cf6", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "#7c3aed", stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <g transform="translate(50,50)">
            {/* Brain outline */}
            <path
              d="M-20,-25 C-30,-30 -35,-20 -30,-10 C-35,0 -30,10 -25,20 C-20,25 -10,28 0,25 C10,28 20,25 25,20 C30,10 35,0 30,-10 C35,-20 30,-30 20,-25 C10,-30 0,-28 -10,-30 C-15,-28 -18,-26 -20,-25 Z"
              fill="url(#brainGradient)"
              stroke="#6d28d9"
              strokeWidth="2"
            />
            {/* Brain folds */}
            <path
              d="M-15,-15 Q-5,-10 5,-15 Q15,-10 20,-5"
              stroke="#a855f7"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M-20,0 Q-10,5 0,0 Q10,5 20,0"
              stroke="#a855f7"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M-15,10 Q-5,15 5,10 Q15,15 20,20"
              stroke="#a855f7"
              strokeWidth="1.5"
              fill="none"
            />
            {/* Neural connections */}
            <circle cx="-10" cy="-10" r="1.5" fill="#c4b5fd" />
            <circle cx="5" cy="-8" r="1.5" fill="#c4b5fd" />
            <circle cx="15" cy="5" r="1.5" fill="#c4b5fd" />
            <circle cx="-5" cy="12" r="1.5" fill="#c4b5fd" />
          </g>
        </svg>
      );
    }
    
    if (normalizedDept.includes("orthopedic") || normalizedDept.includes("bone")) {
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <defs>
            <linearGradient id="boneGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#f97316", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "#ea580c", stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <g transform="translate(50,50)">
            {/* Bone structure */}
            <ellipse cx="-15" cy="-20" rx="8" ry="6" fill="url(#boneGradient)" />
            <ellipse cx="15" cy="20" rx="8" ry="6" fill="url(#boneGradient)" />
            <rect x="-3" y="-15" width="6" height="30" fill="url(#boneGradient)" rx="3" />
            {/* Joint details */}
            <circle cx="-15" cy="-20" r="3" fill="#fed7aa" />
            <circle cx="15" cy="20" r="3" fill="#fed7aa" />
            {/* Bone texture */}
            <path
              d="M-2,-10 L2,-10 M-2,0 L2,0 M-2,10 L2,10"
              stroke="#fdba74"
              strokeWidth="1"
            />
          </g>
        </svg>
      );
    }
    
    if (normalizedDept.includes("pediatric") || normalizedDept.includes("child")) {
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <defs>
            <linearGradient id="babyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#10b981", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "#059669", stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <g transform="translate(50,50)">
            {/* Baby face */}
            <circle cx="0" cy="-5" r="18" fill="url(#babyGradient)" stroke="#047857" strokeWidth="2" />
            {/* Eyes */}
            <circle cx="-6" cy="-8" r="2" fill="#d1fae5" />
            <circle cx="6" cy="-8" r="2" fill="#d1fae5" />
            <circle cx="-6" cy="-8" r="1" fill="#047857" />
            <circle cx="6" cy="-8" r="1" fill="#047857" />
            {/* Nose */}
            <circle cx="0" cy="-3" r="1" fill="#a7f3d0" />
            {/* Mouth */}
            <path d="M-4,2 Q0,6 4,2" stroke="#047857" strokeWidth="1.5" fill="none" />
            {/* Body */}
            <ellipse cx="0" cy="15" rx="12" ry="8" fill="url(#babyGradient)" />
            {/* Arms */}
            <ellipse cx="-15" cy="12" rx="4" ry="6" fill="url(#babyGradient)" />
            <ellipse cx="15" cy="12" rx="4" ry="6" fill="url(#babyGradient)" />
            {/* Stethoscope */}
            <circle cx="0" cy="15" r="3" fill="none" stroke="#047857" strokeWidth="1.5" />
            <path d="M0,12 Q-5,8 -8,5" stroke="#047857" strokeWidth="1.5" fill="none" />
            <circle cx="-8" cy="5" r="1.5" fill="#047857" />
          </g>
        </svg>
      );
    }
    
    if (normalizedDept.includes("gynecology") || normalizedDept.includes("women")) {
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <defs>
            <linearGradient id="womenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#ec4899", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "#db2777", stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <g transform="translate(50,50)">
            {/* Female symbol */}
            <circle cx="0" cy="-8" r="12" fill="none" stroke="url(#womenGradient)" strokeWidth="3" />
            <path d="M0,4 L0,20" stroke="url(#womenGradient)" strokeWidth="3" />
            <path d="M-6,14 L6,14" stroke="url(#womenGradient)" strokeWidth="3" />
            {/* Decorative flowers */}
            <g transform="translate(-15, -20)">
              <circle cx="0" cy="0" r="2" fill="#fce7f3" />
              <circle cx="-3" cy="-2" r="1.5" fill="#fbcfe8" />
              <circle cx="3" cy="-2" r="1.5" fill="#fbcfe8" />
              <circle cx="-2" cy="3" r="1.5" fill="#fbcfe8" />
              <circle cx="2" cy="3" r="1.5" fill="#fbcfe8" />
            </g>
            <g transform="translate(18, -15)">
              <circle cx="0" cy="0" r="1.5" fill="#fce7f3" />
              <circle cx="-2" cy="-1.5" r="1" fill="#fbcfe8" />
              <circle cx="2" cy="-1.5" r="1" fill="#fbcfe8" />
              <circle cx="-1.5" cy="2" r="1" fill="#fbcfe8" />
              <circle cx="1.5" cy="2" r="1" fill="#fbcfe8" />
            </g>
          </g>
        </svg>
      );
    }
    
    if (normalizedDept.includes("emergency") || normalizedDept.includes("trauma")) {
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <defs>
            <linearGradient id="emergencyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#dc2626", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "#991b1b", stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <g transform="translate(50,50)">
            {/* Medical cross */}
            <rect x="-15" y="-5" width="30" height="10" fill="url(#emergencyGradient)" rx="2" />
            <rect x="-5" y="-15" width="10" height="30" fill="url(#emergencyGradient)" rx="2" />
            {/* Ambulance symbol */}
            <rect x="-25" y="15" width="50" height="15" fill="url(#emergencyGradient)" rx="3" />
            <circle cx="-15" cy="25" r="3" fill="#fecaca" />
            <circle cx="15" cy="25" r="3" fill="#fecaca" />
            {/* Pulse line */}
            <path
              d="M-30,-25 L-20,-25 L-15,-35 L-10,-15 L-5,-30 L0,-15 L5,-25 L30,-25"
              stroke="#dc2626"
              strokeWidth="2"
              fill="none"
            />
          </g>
        </svg>
      );
    }
    
    if (normalizedDept.includes("oncology") || normalizedDept.includes("cancer")) {
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <defs>
            <linearGradient id="oncologyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#7c3aed", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "#5b21b6", stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <g transform="translate(50,50)">
            {/* Ribbon symbol */}
            <path
              d="M-20,-20 Q-10,-30 0,-20 Q10,-30 20,-20 Q15,-10 10,0 Q15,10 20,20 Q10,30 0,20 Q-10,30 -20,20 Q-15,10 -10,0 Q-15,-10 -20,-20 Z"
              fill="url(#oncologyGradient)"
              stroke="#6d28d9"
              strokeWidth="2"
            />
            {/* Inner design */}
            <circle cx="0" cy="0" r="8" fill="none" stroke="#c4b5fd" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="4" fill="#c4b5fd" />
          </g>
        </svg>
      );
    }
    
    // Default medical icon
    return (
      <svg viewBox="0 0 100 100" className={className}>
        <defs>
          <linearGradient id="defaultGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#3b82f6", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#1d4ed8", stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <g transform="translate(50,50)">
          {/* Stethoscope */}
          <circle cx="0" cy="15" r="8" fill="none" stroke="url(#defaultGradient)" strokeWidth="3" />
          <path d="M0,7 Q-15,-5 -20,-15" stroke="url(#defaultGradient)" strokeWidth="3" fill="none" />
          <path d="M0,7 Q15,-5 20,-15" stroke="url(#defaultGradient)" strokeWidth="3" fill="none" />
          <circle cx="-20" cy="-15" r="4" fill="url(#defaultGradient)" />
          <circle cx="20" cy="-15" r="4" fill="url(#defaultGradient)" />
        </g>
      </svg>
    );
  };

  return getDepartmentIcon(department);
}