"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

import TamilReceiptBuilder from "@/components/pages/Slips/slips-page";
import TamilReceiptAHBuilder from "@/components/pages/Slips/slipsAH-page";

const Slips: React.FC = () => {
  const [selectedForm, setSelectedForm] = useState<
    "TamilReceiptBuilder" | "TamilReceiptAHBuilder" | null
  >(null);

  // Render the selected form with a back button
  if (selectedForm) {
    const renderForm = () => {
      switch (selectedForm) {
        case "TamilReceiptBuilder":
          return <TamilReceiptBuilder />;
        case "TamilReceiptAHBuilder":
          return <TamilReceiptAHBuilder />;
        default:
          return null;
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-green-100 to-yellow-200 p-6">
        <button
          onClick={() => setSelectedForm(null)}
          className="mb-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow-md"
        >
          ← back
        </button>
        {renderForm()}
      </div>
    );
  }

  // Card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1 },
    hover: { scale: 1.08, boxShadow: "0px 12px 30px rgba(0,0,0,0.25)" },
    tap: { scale: 0.95 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 via-blue-50 to-yellow-100 p-6 flex flex-col">
      <h1 className="text-3xl font-bold text-center text-green-900 mb-10 drop-shadow-lg">
        Slips Forms
      </h1>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* 🌾 KCC Slips */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
          transition={{ duration: 0.4 }}
          className="bg-gradient-to-br from-yellow-200 via-yellow-100 to-yellow-300 rounded-2xl shadow-lg p-6 cursor-pointer flex flex-col items-center"
          onClick={() => setSelectedForm("TamilReceiptBuilder")}
        >
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="text-yellow-700 text-6xl mb-4"
          >
            🌾
          </motion.div>
          <h2 className="text-xl font-semibold text-yellow-700 mb-2">
            KCC - Slips
          </h2>
          <p className="text-gray-700 mb-4">Crop Loan Slips</p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-full shadow-md"
          >
            தொடங்கு
          </motion.button>
        </motion.div>

        {/* 🐄 KCC-AH Slips */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-gradient-to-br from-green-200 via-green-100 to-green-300 rounded-2xl shadow-lg p-6 cursor-pointer flex flex-col items-center"
          onClick={() => setSelectedForm("TamilReceiptAHBuilder")}
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-green-700 text-6xl mb-4"
          >
            🐄
          </motion.div>
          <h2 className="text-xl font-semibold text-green-700 mb-2">
            KCC-AH - Slips
          </h2>
          <p className="text-gray-700 mb-4">Animal Husbandry Slips</p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full shadow-md"
          >
            தொடங்கு
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Slips;

