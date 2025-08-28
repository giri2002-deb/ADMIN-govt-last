"use client";

import React, { useState } from "react";
// import KccAhForm from "./KccAhForm";
// Update the import path below if the actual location is different, e.g.:
import KccForm from "./KCCAHther"
// Or, if KccForm does not exist, create 'KccForm.tsx' in the same directory with a basic component like:
// export default function KccForm() { return <div>KCC Form</div>; }
import Kccther from "./KCCther"
import KCCAHther from "./KCCAHther";
const LoanReport: React.FC = () => {
  const [selectedForm, setSelectedForm] = useState<"KCC" | "KCC_AH" | null>(null);

  if (selectedForm === "KCC") return <Kccther />;
  if (selectedForm === "KCC_AH") return <KCCAHther/>; 

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">
        வேளாண் கடன் தொகுப்புப் படிவங்கள்
      </h1>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* KCC Card */}
        <div
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer"
          onClick={() => setSelectedForm("KCC")}
        >
          <h2 className="text-xl font-semibold text-blue-600 mb-2">KCC</h2>
          <p className="text-gray-700 mb-4">வேளாண் கடன் விண்ணப்பப் படிவம்</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            தொடங்கு
          </button>
        </div>

        {/* KCC AH Card */}
        <div
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer"
          onClick={() => setSelectedForm("KCC_AH")}
        >
          <h2 className="text-xl font-semibold text-green-600 mb-2">KCC AH</h2>
          <p className="text-gray-700 mb-4">விலங்குகள் சார்ந்த வேளாண் கடன் படிவம்</p>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
            தொடங்கு
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoanReport;
