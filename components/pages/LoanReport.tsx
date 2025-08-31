"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

import Kccther from "./KCCther";
import KCCAHther from "./KCCAHther";

const LoanReport: React.FC = () => {
  const [selectedForm, setSelectedForm] = useState<"KCC" | "KCC_AH" | null>(
    null
  );

  if (selectedForm === "KCC") return <Kccther />;
  if (selectedForm === "KCC_AH") return <KCCAHther />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-green-50 to-blue-50 animate-gradient p-6">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-8 drop-shadow-lg">
        வேளாண் கடன் தொகுப்புப் படிவங்கள்
      </h1>
<br></br>
<br></br>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 🌳 KCC Card */}
        <motion.div
          whileHover={{ scale: 1.05, rotate: -1 }}
          className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition cursor-pointer flex flex-col items-center relative overflow-hidden"
          onClick={() => setSelectedForm("KCC")}
        >
          {/* Mango animation */}
          <motion.div
            animate={{ rotate: [0, -15, 15, -10, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2.8 }}
            className="text-yellow-500 text-7xl mb-3 drop-shadow-lg"
          >
            🥭
          </motion.div>
          <h2 className="text-2xl font-semibold text-blue-600 mb-2">
            KCC
          </h2>
          <p className="text-gray-700 mb-4">வேளாண் கடன் விண்ணப்பப் படிவம்</p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow-md"
          >
            தொடங்கு
          </motion.button>
          {/* Floating background circles */}
          <motion.div
            className="absolute w-32 h-32 bg-yellow-200 rounded-full opacity-30 top-0 left-0 -z-10"
            animate={{ x: [0, 30, -30, 0], y: [0, -20, 20, 0] }}
            transition={{ repeat: Infinity, duration: 6 }}
          />
        </motion.div>

        {/* 🐖 KCC AH Card */}
        <motion.div
          whileHover={{ scale: 1.05, rotate: 1 }}
          className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition cursor-pointer flex flex-col items-center relative overflow-hidden"
          onClick={() => setSelectedForm("KCC_AH")}
        >
          {/* Pig animation */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-pink-600 text-7xl mb-3 drop-shadow-lg"
          >
             🐐
          </motion.div>
          <h2 className="text-2xl font-semibold text-green-600 mb-2">
            KCC AH
          </h2>
          <p className="text-gray-700 mb-4">
            விலங்குகள் சார்ந்த வேளாண் கடன் படிவம்
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full shadow-md"
          >
            தொடங்கு
          </motion.button>
          {/* Floating background shapes */}
          <motion.div
            className="absolute w-28 h-28 bg-pink-200 rounded-full opacity-30 bottom-0 right-0 -z-10"
            animate={{ x: [0, -25, 25, 0], y: [0, 20, -20, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default LoanReport;
