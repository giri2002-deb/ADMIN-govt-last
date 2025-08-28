"use client";

import React, { useState } from "react";
import FormsPage from "@/components/pages/FORMS14/forms-page";
import FormsAHPage from "@/components/pages/FORMS14/formsAh-page";


const FORMS14: React.FC = () => {
  const [selectedForm, setSelectedForm] = useState<"formspage" | "formsahpage"  | null>(null);

  // Render the selected form with a back button
  if (selectedForm) {
    const renderForm = () => {
      switch (selectedForm) {
        case "formspage":
          return <FormsPage />;
        case "formsahpage":
          return <FormsAHPage />;
        
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
        Forms and Applications
      </h1>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Gold Loan */}
        <div
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer"
          onClick={() => setSelectedForm("formspage")}
        >
          <h2 className="text-xl font-semibold text-yellow-600 mb-2">formspage-KCC</h2>
          <p className="text-gray-700 mb-4">KCC</p>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">
            தொடங்கு
          </button>
        </div>

        {/* Crops Loan */}
        <div
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer"
          onClick={() => setSelectedForm("formsahpage")}
        >
          <h2 className="text-xl font-semibold text-green-600 mb-2">formspage-KCCAH</h2>
          <p className="text-gray-700 mb-4">KCCAH</p>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
            தொடங்கு
          </button>
        </div>

        {/* Animal Loan */}
      
      </div>
    </div>
  );
};

export default FORMS14;
