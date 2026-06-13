"use client";

import { motion } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════════════════
   HERO SECTION — pixel-matched to Figma node 24818:39095
   ═══════════════════════════════════════════════════════════════════════════ */

/* ── Mock profile data for Search Results screen ── */
const profiles = [
  { name: "Anika Bergson", degree: "Bachelor", match: 100, img: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Ashlynn Carder", degree: "Master", match: 80, img: "https://randomuser.me/api/portraits/women/68.jpg" },
  { name: "Aspen Lipshutz", degree: "Ph.D", match: 100, img: "https://randomuser.me/api/portraits/women/8.jpg" },
  { name: "Ann Workman", degree: "Bachelor", match: 80, img: "https://randomuser.me/api/portraits/women/65.jpg" },
  { name: "Miracle Calzoni", degree: "Bachelor", match: 80, img: "https://randomuser.me/api/portraits/women/90.jpg" },
];

/* ── Decorative dot ── */
function Dot({ size, color, top, left }: { size: number; color: string; top: string; left: string }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{ width: size, height: size, backgroundColor: color, top, left }}
    />
  );
}

/* ── Match percentage circle ── */
function MatchCircle({ pct }: { pct: number }) {
  return (
    <div className="relative w-[42px] h-[42px] shrink-0">
      <svg viewBox="0 0 42 42" className="w-full h-full -rotate-90">
        <circle cx="21" cy="21" r="18" fill="none" stroke="#e0e0e0" strokeWidth="3" />
        <circle
          cx="21" cy="21" r="18" fill="none" stroke="#0096C7" strokeWidth="3"
          strokeDasharray={`${(pct / 100) * 113} 113`}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-[#292a2c]">
        {pct}%
      </span>
    </div>
  );
}

/* ── Search Results Phone Screen ── */
function SearchResultsPhone() {
  return (
    <div className="bg-white rounded-[20px] shadow-[28px_8px_99px_0px_rgba(0,0,0,0.17)] w-[428px] overflow-hidden"
      style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}>
      {/* Header */}
      <div className="px-6 pt-5 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-[36px] h-[36px] rounded-[10px] bg-gray-200 overflow-hidden">
              <img src="https://randomuser.me/api/portraits/women/26.jpg" alt="" className="w-full h-full object-cover" />
            </div>
            <span className="text-[14px] text-black">welcome Anahita!</span>
          </div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#292a2c]">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
        <div className="h-px bg-gray-200 mt-3" />
      </div>

      {/* Match count */}
      <div className="flex items-center justify-end gap-1.5 px-6 py-2">
        <span className="text-[14px] font-bold text-black">138</span>
        <span className="text-[12px] text-black">profile match</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="ml-1">
          <circle cx="12" cy="12" r="10" stroke="#292a2c" strokeWidth="1.5" />
          <path d="M12 16v-4M12 8h.01" stroke="#292a2c" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* Profile cards */}
      <div className="px-6 space-y-3 pb-4">
        {profiles.map((p) => (
          <div key={p.name} className="bg-white rounded-[10px] shadow-[1px_2px_6px_0px_rgba(41,42,44,0.15)] p-3">
            <div className="flex items-center gap-3">
              <img src={p.img} alt={p.name}
                className="w-[50px] h-[50px] rounded-[16px] object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-[#292a2c]">{p.name}</p>
                <p className="text-[12px] text-[#292a2c]">{p.degree}</p>
              </div>
              <MatchCircle pct={p.match} />
            </div>
            <div className="h-px bg-gray-200 mt-2.5 mb-1.5" />
            <p className="text-[11px]">
              <span className="text-[#8a8a8a] font-medium">Status:</span>{" "}
              <span className="font-semibold text-black">Wants to be a roomate</span>
            </p>
          </div>
        ))}
      </div>

      {/* Bottom nav */}
      <div className="relative bg-white shadow-[1px_2px_10px_0px_rgba(0,0,0,0.25)] rounded-t-[24px] px-6 py-3">
        <div className="absolute left-1/2 -translate-x-1/2 -top-[28px]">
          <div className="w-[64px] h-[64px] rounded-full bg-white shadow-[0px_-5px_10px_0px_rgba(0,0,0,0.07)] flex items-center justify-center">
            <div className="w-[54px] h-[54px] rounded-full bg-[#0096C7] flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-end pt-2">
          <div className="flex flex-col items-center gap-1 w-16">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="#292a2c" strokeWidth="1.5" />
            </svg>
            <span className="text-[11px] text-[#292a2c]">Home</span>
          </div>
          <div className="flex flex-col items-center gap-1 w-16">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="#292a2c" strokeWidth="1.5" />
              <path d="M21 21l-4.35-4.35" stroke="#292a2c" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="text-[11px] font-bold text-[#292a2c]">Search</span>
          </div>
          <div className="w-16" />
          <div className="flex flex-col items-center gap-1 w-16">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" stroke="#292a2c" strokeWidth="1.5" />
            </svg>
            <span className="text-[11px] text-[#292a2c]">Inbox</span>
          </div>
          <div className="flex flex-col items-center gap-1 w-16">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" stroke="#292a2c" strokeWidth="1.5" />
            </svg>
            <span className="text-[11px] text-[#292a2c]">Profile</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Step 2 Phone Screen (University) ── */
function Step2Phone() {
  return (
    <div className="bg-white rounded-[20px] shadow-[28px_8px_99px_0px_rgba(0,0,0,0.17)] w-[428px] overflow-hidden"
      style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}>
      {/* Logo */}
      <div className="flex justify-center pt-8 pb-2">
        <div className="flex items-center gap-1">
          <span className="text-[18px] font-bold text-[#0096c7]" style={{ fontFamily: "var(--font-rowdies), 'Rowdies', sans-serif" }}>Roomie</span>
          <span className="bg-[#0096c7] text-white text-[18px] font-bold px-2 py-0.5 rounded-md" style={{ fontFamily: "var(--font-rowdies), 'Rowdies', sans-serif" }}>Match</span>
        </div>
      </div>

      {/* Globe illustration placeholder */}
      <div className="flex justify-center py-4">
        <div className="w-[280px] h-[220px] relative">
          <div className="w-[200px] h-[200px] rounded-full bg-gradient-to-br from-[#00B4D8] to-[#0077B6] mx-auto relative overflow-hidden">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-[20%] left-[10%] w-[60%] h-[30%] bg-[#023E8A] rounded-full transform rotate-12" />
              <div className="absolute top-[55%] left-[25%] w-[40%] h-[25%] bg-[#023E8A] rounded-full" />
            </div>
            {/* Graduation cap */}
            <div className="absolute -top-4 right-4">
              <div className="w-16 h-8 bg-[#1a1a2e] transform -rotate-12" style={{ clipPath: "polygon(0 100%, 50% 0, 100% 100%)" }} />
              <div className="w-20 h-3 bg-[#1a1a2e] -mt-1 rounded-sm" />
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-2 right-4 w-3 h-3 bg-[#0096c7] rounded-sm transform rotate-45" />
          <div className="absolute bottom-8 right-8 w-2 h-2 bg-red-500 rounded-sm transform rotate-12" />
          <div className="absolute bottom-4 left-8 w-4 h-4 border-2 border-[#0096c7] rounded-sm transform -rotate-12" />
        </div>
      </div>

      {/* Form fields */}
      <div className="px-6 space-y-5 pb-6">
        {/* University */}
        <div>
          <label className="text-[14px] font-semibold text-black block mb-2">University*</label>
          <div className="bg-[#f5f5f5] rounded-[10px] h-[48px] px-4 flex items-center justify-between">
            <span className="text-[12px] text-[#8a8a8a]">Choose...</span>
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1l5 5 5-5" stroke="#8a8a8a" strokeWidth="1.5" /></svg>
          </div>
        </div>

        {/* Degree programme */}
        <div>
          <label className="text-[14px] font-semibold text-black block mb-2">What kind of a degree programme are you in?</label>
          <div className="flex gap-2">
            {["DS.c", "Ph.D", "Master", "Bachlor"].map((d, i) => (
              <div key={d} className={`h-[36px] px-4 rounded-[10px] flex items-center justify-center text-[12px] ${
                i === 3 ? "bg-white border border-[#0096c7] font-medium shadow-[1px_2px_10px_0px_rgba(41,42,44,0.21)]" : "bg-[#f5f5f5]"
              }`}>
                {d}
              </div>
            ))}
          </div>
        </div>

        {/* Major */}
        <div>
          <label className="text-[14px] font-semibold text-black block mb-2">What is your Major?</label>
          <div className="bg-[#f5f5f5] rounded-[10px] h-[48px] px-4 flex items-center justify-between">
            <span className="text-[12px] text-[#8a8a8a]">Choose...</span>
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1l5 5 5-5" stroke="#8a8a8a" strokeWidth="1.5" /></svg>
          </div>
        </div>
      </div>

      {/* Pagination dots */}
      <div className="flex items-center justify-center gap-1.5 pb-6">
        <div className="w-[5px] h-[5px] rounded-full bg-[#d9d9d9]" />
        <div className="w-[13px] h-[5px] rounded-full bg-[#ee471a]" />
        <div className="w-[5px] h-[5px] rounded-full bg-[#d9d9d9]" />
      </div>

      {/* Buttons */}
      <div className="px-6 pb-8 flex items-center justify-between">
        <span className="text-[15px] text-[#8a8a8a]">Previous</span>
        <div className="bg-[#0096c7] rounded-[10px] h-[50px] px-8 flex items-center justify-center">
          <span className="text-[15px] font-bold text-white">Save and Continue</span>
        </div>
      </div>
    </div>
  );
}

/* ── Step 3 Phone Screen (Find roommate) ── */
function Step3Phone() {
  return (
    <div className="bg-white rounded-[20px] shadow-[28px_8px_99px_0px_rgba(0,0,0,0.17)] w-[428px] overflow-hidden"
      style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}>
      {/* Back arrow + logo */}
      <div className="px-5 pt-10 pb-2 flex items-center justify-between">
        <svg width="24" height="17" viewBox="0 0 24 17" fill="none" className="rotate-180">
          <path d="M0 8.5h22M14 1l8 7.5-8 7.5" stroke="#292a2c" strokeWidth="1.5" />
        </svg>
        <div className="flex items-center gap-1">
          <span className="text-[14px] font-bold text-[#0096c7]" style={{ fontFamily: "var(--font-rowdies)" }}>Roomie</span>
          <span className="bg-[#0096c7] text-white text-[14px] px-1.5 py-0.5 rounded-md font-bold" style={{ fontFamily: "var(--font-rowdies)" }}>Match</span>
        </div>
        <div className="w-6" />
      </div>

      {/* Search illustration placeholder */}
      <div className="flex justify-center py-8">
        <div className="w-[260px] h-[200px] bg-[#f0f8ff] rounded-2xl flex items-center justify-center">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="#0096c7" strokeWidth="2" />
            <path d="M21 21l-4.35-4.35" stroke="#0096c7" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Text */}
      <p className="text-[14px] text-black text-right px-8 mb-6 font-medium">
        Are you ready to find a compatible roommate?
      </p>

      {/* Buttons */}
      <div className="px-[62px] space-y-4 pb-10">
        <div className="bg-[#0096c7] rounded-[10px] h-[59px] flex items-center justify-center">
          <span className="text-[15px] font-semibold text-white">I want to find a roommate</span>
        </div>
        <div className="bg-white border border-[#0096c7] rounded-[10px] h-[59px] flex items-center justify-center">
          <span className="text-[15px] font-semibold text-[#0096c7]">I want to be a roommate</span>
        </div>
      </div>
    </div>
  );
}

/* ── Step 1 Phone Screen (Registration) ── */
function Step1Phone() {
  return (
    <div className="bg-white rounded-[20px] w-[428px] overflow-hidden"
      style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}>
      {/* Logo */}
      <div className="flex justify-center pt-8 pb-2">
        <div className="flex items-center gap-1">
          <span className="text-[14px] font-bold text-[#0096c7]" style={{ fontFamily: "var(--font-rowdies)" }}>Roomie</span>
          <span className="bg-[#0096c7] text-white text-[14px] px-1.5 py-0.5 rounded-md font-bold" style={{ fontFamily: "var(--font-rowdies)" }}>Match</span>
        </div>
      </div>

      <p className="text-[12px] text-black px-4 pb-4 leading-[20px]">
        Are you a student seeking a compatible roommate? Share your details with us to find your perfect living companion.
      </p>

      {/* Avatar */}
      <div className="flex justify-center py-4">
        <div className="relative">
          <div className="w-[100px] h-[100px] rounded-full bg-[#f5f5f5] flex items-center justify-center">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" stroke="#8a8a8a" strokeWidth="1.5" />
            </svg>
          </div>
          <div className="absolute -bottom-1 -right-1 w-[30px] h-[30px] rounded-full bg-[#0096c7] flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="px-6 space-y-4 pb-4">
        <div>
          <label className="text-[14px] font-semibold text-black block mb-2">First Name</label>
          <div className="bg-[#f5f5f5] rounded-[10px] h-[44px] px-4 flex items-center">
            <span className="text-[12px] text-[#8a8a8a]">Write your First Name</span>
          </div>
        </div>
        <div>
          <label className="text-[14px] font-semibold text-black block mb-2">Last Name</label>
          <div className="bg-[#f5f5f5] rounded-[10px] h-[44px] px-4 flex items-center">
            <span className="text-[12px] text-[#8a8a8a]">Write your Last Name</span>
          </div>
        </div>

        {/* Gender */}
        <div>
          <label className="text-[14px] font-semibold text-black block mb-2">Gender</label>
          <div className="flex gap-6 items-center">
            <div className="flex flex-col items-center gap-1">
              <div className="w-[72px] h-[60px] bg-[#f5f5f5] rounded-[10px] flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" stroke="#292a2c" strokeWidth="1.5" />
                </svg>
              </div>
              <span className="text-[12px] font-semibold text-[#292a2c]">Male</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-[72px] h-[60px] bg-white rounded-[10px] border border-[#0096c7] shadow-[1px_2px_10px_0px_rgba(41,42,44,0.21)] flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="4" stroke="#292a2c" strokeWidth="1.5" />
                  <path d="M20 21c0-3.3-3.6-6-8-6s-8 2.7-8 6" stroke="#292a2c" strokeWidth="1.5" />
                </svg>
              </div>
              <span className="text-[12px] font-semibold text-[#292a2c]">Female</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-[24px] h-[24px] rounded-[10px] border border-[#0096c7]" />
          <span className="text-[12px] font-medium text-black">Married</span>
        </div>

        <div>
          <label className="text-[14px] font-semibold text-black block mb-2">Phone Number</label>
          <div className="bg-[#f5f5f5] rounded-[10px] h-[44px] px-4 flex items-center">
            <span className="text-[12px] text-[#292a2c]">09163330971</span>
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="px-6 pb-8 flex justify-end">
        <div className="bg-[#0096c7] rounded-[10px] h-[46px] px-8 flex items-center justify-center">
          <span className="text-[14px] font-bold text-white">Save and Continue</span>
        </div>
      </div>
    </div>
  );
}

/* ── Address Selection Phone Screen ── */
function AddressPhone() {
  return (
    <div className="bg-white rounded-[20px] shadow-[28px_8px_99px_0px_rgba(0,0,0,0.17)] w-[428px] overflow-hidden"
      style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}>
      <div className="px-5 pt-10 pb-2 flex items-center justify-between">
        <svg width="24" height="17" viewBox="0 0 24 17" fill="none" className="rotate-180">
          <path d="M0 8.5h22M14 1l8 7.5-8 7.5" stroke="#292a2c" strokeWidth="1.5" />
        </svg>
        <div className="flex items-center gap-1">
          <span className="text-[14px] font-bold text-[#0096c7]" style={{ fontFamily: "var(--font-rowdies)" }}>Roomie</span>
          <span className="bg-[#0096c7] text-white text-[14px] px-1.5 py-0.5 rounded-md font-bold" style={{ fontFamily: "var(--font-rowdies)" }}>Match</span>
        </div>
        <div className="w-6" />
      </div>

      <p className="text-[14px] font-semibold text-black text-center px-6 pt-4 pb-6">
        What neighborhoods would you like to live in?
      </p>

      <div className="px-6 space-y-5 pb-6">
        <div>
          <label className="text-[14px] font-semibold text-black block mb-2">Province</label>
          <div className="bg-[#f5f5f5] rounded-[10px] h-[48px] px-4 flex items-center justify-between">
            <span className="text-[12px] text-[#8a8a8a]">Choose...</span>
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1l5 5 5-5" stroke="#8a8a8a" strokeWidth="1.5" /></svg>
          </div>
        </div>
        <div>
          <label className="text-[14px] font-semibold text-black block mb-2">City</label>
          <div className="bg-[#f5f5f5] rounded-[10px] h-[48px] px-4 flex items-center justify-between">
            <span className="text-[12px] text-[#8a8a8a]">Choose...</span>
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1l5 5 5-5" stroke="#8a8a8a" strokeWidth="1.5" /></svg>
          </div>
        </div>
        <div>
          <label className="text-[14px] font-semibold text-black block mb-2">Area</label>
          <div className="flex gap-2">
            <div className="bg-[#f5f5f5] rounded-[10px] h-[48px] flex-1 px-4 flex items-center">
              <span className="text-[12px] text-[#8a8a8a]">Choose...</span>
            </div>
            <div className="bg-[#0096c7] rounded-[10px] w-[48px] h-[48px] flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
          <div className="mt-2 flex gap-2">
            <div className="bg-[#f5f5f5] rounded-[10px] h-[36px] px-4 flex items-center gap-2">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 1l6 6M7 1l-6 6" stroke="#292a2c" strokeWidth="1" /></svg>
              <span className="text-[12px] font-semibold text-black">Test1</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 pb-8 flex items-center justify-between">
        <span className="text-[15px] text-[#8a8a8a]">Previous</span>
        <div className="bg-[#0096c7] rounded-[10px] h-[50px] px-6 flex items-center justify-center gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="white" strokeWidth="1.5" />
            <path d="M21 21l-4.35-4.35" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="text-[15px] font-bold text-white">Seach</span>
        </div>
      </div>
    </div>
  );
}

/* ── Phone device frame wrapper ── */
function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {/* Outer bezel */}
      <div className="bg-[#1a1a1a] rounded-[36px] p-[10px] shadow-[0_25px_60px_-12px_rgba(0,0,0,0.5)]">
        {/* Inner screen */}
        <div className="rounded-[26px] overflow-hidden bg-white">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════════════════════════════════════ */
export function RoomieMatchHero() {
  return (
    <section className="relative w-full overflow-hidden bg-white" style={{ height: "100vh", minHeight: 700 }}>
      {/* ── Big arc circle (right side) ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "58vw",
          height: "58vw",
          top: "-12vh",
          left: "calc(50% - 5vw)",
          border: "2px solid #b8dce8",
          borderRadius: "50%",
          opacity: 0.5,
        }}
      />

      {/* ── Decorative dots ── */}
      <div className="absolute w-[10px] h-[10px] rounded-full border-2 border-[#b8dce8] top-[27%] left-[0.8%] pointer-events-none" />
      <div className="absolute w-[22px] h-[22px] rounded-full border-2 border-[#b8dce8] bottom-[10%] left-[10%] pointer-events-none" />
      <Dot size={50} color="#dceef4" top="26%" left="31%" />
      <Dot size={12} color="#0096C7" top="57%" left="38%" />
      <Dot size={14} color="#d0e8f0" top="1%" left="10.7%" />

      {/* ── Left content ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="absolute"
        style={{ left: "10.5%", top: "16vh" }}
      >
        {/* Roomie Match logo */}
        <div className="flex items-center gap-[8px] mb-[clamp(20px,4vh,50px)]">
          <span
            className="text-[clamp(36px,3.5vw,52px)] text-[#3a3a3a] leading-none"
            style={{ fontFamily: "var(--font-rowdies), 'Rowdies', sans-serif" }}
          >
            Roomie
          </span>
          <span
            className="bg-[#0096c7] text-white text-[clamp(36px,3.5vw,52px)] leading-none px-[14px] py-[6px] rounded-[16px]"
            style={{ fontFamily: "var(--font-rowdies), 'Rowdies', sans-serif" }}
          >
            Match
          </span>
        </div>

        {/* UI/UX */}
        <h1
          className="text-[clamp(60px,6vw,96px)] leading-[0.95] font-bold text-[#3a3a3a] tracking-tight"
          style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
        >
          UI/UX
        </h1>

        {/* Case Study */}
        <h2
          className="text-[clamp(60px,6vw,96px)] leading-[1.1] font-bold text-[#0096c7] tracking-tight"
          style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
        >
          Case Study
        </h2>

        {/* Figma cursor + name tag */}
        <div className="relative mt-[clamp(10px,2vh,20px)] ml-[clamp(100px,12vw,180px)]">
          <svg width="32" height="44" viewBox="0 0 32 44" fill="none" className="transform -rotate-[10deg]">
            <path d="M8 0L0 40l12-16h20L8 0z" fill="#292a2c" />
          </svg>
          <div
            className="absolute top-[28px] left-[24px] bg-[#282d46] text-white text-[14px] font-bold px-[14px] py-[7px] rounded-[8px] whitespace-nowrap"
            style={{ fontFamily: "'Montserrat', var(--font-poppins), sans-serif", letterSpacing: "-0.32px" }}
          >
            Anahita Aria
          </div>
        </div>

        {/* Project Duration */}
        <div className="mt-[clamp(30px,5vh,60px)]">
          <p className="text-[clamp(22px,2vw,30px)] leading-[36px] font-extrabold text-[#3a3a3a]" style={{ fontFamily: "'Roboto', sans-serif" }}>
            Project Duration
          </p>
          <p className="text-[clamp(22px,2vw,30px)] leading-[36px] font-bold text-[#828282] mt-[10px]" style={{ fontFamily: "'Roboto', sans-serif" }}>
            July - Aug 2022
          </p>
        </div>
      </motion.div>

      {/* ── Phone mockups (right side) ── */}
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute pointer-events-none"
        style={{ top: 0, right: 0, width: "58%", height: "100%" }}
      >
        {/* ── Top row: 3 phones (Address, Step3, Step1) ── */}

        {/* Address selection — top-left, partially clipped at top */}
        <div className="absolute" style={{
          transform: "rotate(-15deg)",
          width: "38%",
          top: "-30%",
          left: "2%",
        }}>
          <PhoneFrame><AddressPhone /></PhoneFrame>
        </div>

        {/* Step 3 — top-center */}
        <div className="absolute" style={{
          transform: "rotate(-15deg)",
          width: "34%",
          top: "-38%",
          left: "36%",
        }}>
          <PhoneFrame><Step3Phone /></PhoneFrame>
        </div>

        {/* Step 1 (Registration) — top-right, partially clipped */}
        <div className="absolute" style={{
          transform: "rotate(-15deg)",
          width: "38%",
          top: "-30%",
          right: "-10%",
        }}>
          <PhoneFrame><Step1Phone /></PhoneFrame>
        </div>

        {/* ── Bottom row: 2 phones (Search Results, Step2 University) ── */}

        {/* Search Results — bottom-left, largest and most visible */}
        <div className="absolute" style={{
          transform: "rotate(-15deg)",
          width: "42%",
          top: "18%",
          left: "0%",
        }}>
          <PhoneFrame><SearchResultsPhone /></PhoneFrame>
        </div>

        {/* Step 2 University — bottom-right, partially clipped */}
        <div className="absolute" style={{
          transform: "rotate(-15deg)",
          width: "42%",
          top: "12%",
          right: "-12%",
        }}>
          <PhoneFrame><Step2Phone /></PhoneFrame>
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   FULL CASE STUDY
   ═══════════════════════════════════════════════════════════════════════════ */
export function RoomieMatchCaseStudy() {
  return (
    <>
      <RoomieMatchHero />

      {[
        "Problem Statement",
        "Design Process",
        "User Research",
        "User Persona",
        "Wireframes",
        "High Fidelity Screens",
        "Usability Testing",
      ].map((title, i) => (
        <section
          key={title}
          className={`py-16 lg:py-20 ${i % 2 === 0 ? "bg-white" : "bg-[#f8fbfc]"}`}
        >
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2
                className="text-3xl font-bold text-[#3a3a3a] mb-6"
                style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
              >
                {title}
              </h2>
              <div className="h-48 rounded-xl border-2 border-dashed border-[#0096c7]/20 flex items-center justify-center text-[#828282] text-sm bg-[#f8fbfc]">
                Share the &quot;{title}&quot; Figma section to populate this
              </div>
            </motion.div>
          </div>
        </section>
      ))}

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-[#3a3a3a]" style={{ fontFamily: "var(--font-poppins)" }}>
              Thank You <span className="text-[#0096c7]">For Watching</span>
            </h2>
            <p className="text-[#828282] mt-4">
              Designed by <span className="text-[#0096c7] font-semibold">Anahita Aria</span> — Product Designer
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
