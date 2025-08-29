"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import SpreadsheetTable from "@/components/pages/Disbur/SpreadsheetTable";
import KccRegister from "@/components/pages/Disbur/SpreadsheetTable AH";

const Disburre: React.FC = () => {
  const [selectedForm, setSelectedForm] = useState<
    "SpreadsheetTable" | "SpreadsheetTableAH" | null
  >(null);

  // Render the selected form with a back button
  if (selectedForm) {
    const renderForm = () => {
      switch (selectedForm) {
        case "SpreadsheetTable":
          return <SpreadsheetTable />;
        case "SpreadsheetTableAH":
          return <KccRegister />;
        default:
          return null;
      }
    };

    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* 🔥 Animated Gradient Background */}
        <motion.div
          className="absolute inset-0 z-0"
          animate={{
            background: [
              "linear-gradient(135deg, #fceabb, #f8b500)",
              "linear-gradient(135deg, #a8edea, #fed6e3)",
              "linear-gradient(135deg, #d4fc79, #96e6a1)",
              "linear-gradient(135deg, #fddb92, #d1fdff)",
            ],
          }}
          transition={{ duration: 12, repeat: Infinity, repeatType: "mirror" }}
        />

        <div className="relative z-10 p-6">
          <button
            onClick={() => setSelectedForm(null)}
            className="mb-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow-lg"
          >
            ← back
          </button>
          {renderForm()}
        </div>
      </div>
    );
  }

  // Animation Variants
  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1 },
    hover: { scale: 1.08, boxShadow: "0px 10px 25px rgba(0,0,0,0.25)" },
    tap: { scale: 0.97 },
  };

  // Initial form selection UI
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center">
      {/* 🔥 Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          background: [
            "linear-gradient(135deg, #ffecd2, #fcb69f)",
            "linear-gradient(135deg, #a1c4fd, #c2e9fb)",
            "linear-gradient(135deg, #fbc2eb, #a6c1ee)",
            "linear-gradient(135deg, #d4fc79, #96e6a1)",
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "mirror" }}
      />

      {/* 🌿 Floating Background Particles */}
      <motion.div
        className="absolute text-5xl z-0"
        animate={{ y: [-20, 20, -20] }}
        transition={{ duration: 6, repeat: Infinity }}
        style={{ top: "20%", left: "10%" }}
      >
        🌿
      </motion.div>
      <motion.div
        className="absolute text-5xl z-0"
        animate={{ y: [20, -20, 20] }}
        transition={{ duration: 8, repeat: Infinity }}
        style={{ bottom: "15%", right: "15%" }}
      >
        🐐
      </motion.div>

      <h1 className="relative z-10 text-3xl font-bold text-center text-green-900 mb-10 drop-shadow-md">
        Disbursement Forms
      </h1>

      <div className="relative z-10 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 🌾 KCC - Crops Loan */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
          transition={{ duration: 0.4 }}
          className="bg-white/80 backdrop-blur-md rounded-2xl shadow-md p-6 cursor-pointer flex flex-col items-center"
          onClick={() => setSelectedForm("SpreadsheetTable")}
        >
          {/* 🌾 Crop Icon */}
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="text-yellow-600 text-6xl mb-4"
          >
            🌾
          </motion.div>

          <h2 className="text-xl font-semibold text-yellow-700 mb-2">
            KCC-DISBUR
          </h2>
          <p className="text-gray-700 mb-4">For Crop Disbursement</p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-full shadow-md"
          >
            தொடங்கு
          </motion.button>
        </motion.div>

        {/* 🐐 KCC-AH - Animal Husbandry */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-white/80 backdrop-blur-md rounded-2xl shadow-md p-6 cursor-pointer flex flex-col items-center"
          onClick={() => setSelectedForm("SpreadsheetTableAH")}
        >
          {/* 🐐 Goat Icon */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-green-600 text-6xl mb-4"
          >
            🐐
          </motion.div>

          <h2 className="text-xl font-semibold text-green-700 mb-2">
            KCC-AH-DISBUR
          </h2>
          <p className="text-gray-700 mb-4">
            For Animal Husbandry Disbursement
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full shadow-md"
          >
            தொடங்கு
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Disburre;
