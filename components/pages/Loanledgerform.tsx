"use client";

import React, { useState } from "react";

import {Loanledger} from "@/components/pages/Loanledger/Loanledger";
import {LoanledgerAH} from "@/components/pages/Loanledger/LoanledgerAH";


const Loanledgerform1: React.FC = () => {
  const [selectedForm, setSelectedForm] = useState<"Loanledger" | "LoanledgerAH" |  null>(null);

  // Render the selected form with a back button
  if (selectedForm) {
    const renderForm = () => {
      switch (selectedForm) {
        case "Loanledger":
          return <Loanledger />;
        case "LoanledgerAH":
          return <LoanledgerAH />;
      
        default:
          return null;
      }
    };

    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <button
          onClick={() => setSelectedForm(null)}
          className="mb-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          ← back
        </button>
        {renderForm()}
      </div>
    );
  }

  // Initial form selection UI
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-yellow-800 mb-8">
     Loanledger Forms
      </h1>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Gold Loan */}
        <div
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer"
          onClick={() => setSelectedForm("Loanledger")}
        >
          <h2 className="text-xl font-semibold text-yellow-600 mb-2">KCC-Loanledger</h2>
          <p className="text-gray-700 mb-4">KCC-Loanledger</p>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">
            தொடங்கு
          </button>
        </div>

        {/* Crops Loan */}
        <div
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer"
          onClick={() => setSelectedForm("LoanledgerAH")}
        >
          <h2 className="text-xl font-semibold text-green-600 mb-2">KCC-AH-Loanledger</h2>
          <p className="text-gray-700 mb-4">KCC-AH-Loanledger</p>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
            தொடங்கு
          </button>
        </div>

 
       
      </div>
    </div>
  );
};

export default Loanledgerform1;
