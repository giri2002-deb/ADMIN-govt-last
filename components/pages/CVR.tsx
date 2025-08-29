"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

import CropVerificationUI from "@/components/pages/CVR/CropVerificationUI";
import CropVerificationAHUI from "@/components/pages/CVR/CropVerificationUI AH";

const CVR: React.FC = () => {
  const [selectedForm, setSelectedForm] = useState<
    "KCCCVR" | "KCCAHCVR" | null
  >(null);

  // Render selected form
  if (selectedForm) {
    const renderForm = () => {
      switch (selectedForm) {
        case "KCCCVR":
          return <CropVerificationUI />;
        case "KCCAHCVR":
          return <CropVerificationAHUI />;
        default:
          return null;
      }
    };

    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* 🔥 Animated Gradient Background with different palette */}
        <motion.div
          className="absolute inset-0 z-0"
          animate={{
            background: [
              "linear-gradient(135deg, #f6d365, #fda085)",
              "linear-gradient(135deg, #ff9a9e, #fecfef)",
              "linear-gradient(135deg, #a1c4fd, #c2e9fb)",
              "linear-gradient(135deg, #d4fc79, #96e6a1)",
            ],
          }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "mirror" }}
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

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center">
      {/* 🔥 Different Gradient Background for landing */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          background: [
            "linear-gradient(135deg, #fdfbfb, #ebedee)",
            "linear-gradient(135deg, #a18cd1, #fbc2eb)",
            "linear-gradient(135deg, #ffecd2, #fcb69f)",
            "linear-gradient(135deg, #89f7fe, #66a6ff)",
          ],
        }}
        transition={{ duration: 18, repeat: Infinity, repeatType: "mirror" }}
      />

      {/* 🌿 Floating Particles */}
      <motion.div
        className="absolute text-5xl z-0"
        animate={{ y: [-20, 20, -20] }}
        transition={{ duration: 6, repeat: Infinity }}
        style={{ top: "15%", left: "12%" }}
      >
        🌿
      </motion.div>
      <motion.div
        className="absolute text-5xl z-0"
        animate={{ y: [20, -20, 20] }}
        transition={{ duration: 7, repeat: Infinity }}
        style={{ bottom: "10%", right: "18%" }}
      >
        🐐
      </motion.div>

      <h1 className="relative z-10 text-3xl font-bold text-center text-green-900 mb-10 drop-shadow-md">
        CVR Forms
      </h1>

      <div className="relative z-10 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 🌾 KCC-CVR */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
          transition={{ duration: 0.4 }}
          className="bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-2xl shadow-md p-6 cursor-pointer flex flex-col items-center"
          onClick={() => setSelectedForm("KCCCVR")}
        >
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="text-yellow-600 text-6xl mb-4"
          >
            🌾
          </motion.div>
          <h2 className="text-xl font-semibold text-yellow-700 mb-2">
            KCC-CVR
          </h2>
          <p className="text-gray-700 mb-4">Crop Verification</p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-full shadow-md"
          >
            தொடங்கு
          </motion.button>
        </motion.div>

        {/* 🐐 KCC-AH-CVR */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-gradient-to-br from-green-100 to-green-50 rounded-2xl shadow-md p-6 cursor-pointer flex flex-col items-center"
          onClick={() => setSelectedForm("KCCAHCVR")}
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-green-600 text-6xl mb-4"
          >
            🐄
          </motion.div>
          <h2 className="text-xl font-semibold text-green-700 mb-2">
            KCC-AH-CVR
          </h2>
          <p className="text-gray-700 mb-4">Animal Husbandry Verification</p>
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

export default CVR;
