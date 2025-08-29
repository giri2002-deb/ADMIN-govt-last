"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Wheat } from "lucide-react";
import FormsPage from "@/components/pages/FORMS14/forms-page";
import FormsAHPage from "@/components/pages/FORMS14/formsAh-page";

// 🌾 Floating + Rotating Animation (reusable with delay)
const floatingRotate = (delay = 0) => ({
  y: [0, -15, 0],
  rotate: [0, 10, -10, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
    delay,
  },
});

const FORMS14: React.FC = () => {
  const [selectedForm, setSelectedForm] = useState<
    "formspage" | "formsahpage" | null
  >(null);

  // ✅ When a form is selected
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
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-green-100 to-yellow-200 p-6 relative overflow-hidden">
        {/* Background blobs */}
        <motion.div className="absolute -top-20 -left-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
        <motion.div className="absolute top-40 right-10 w-72 h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedForm(null)}
          className="mb-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow relative z-10"
        >
          ← Back
        </motion.button>
        <div className="relative z-10">{renderForm()}</div>
      </div>
    );
  }

  // ✅ Initial selection UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-green-100 to-yellow-200 p-6 relative overflow-hidden">
      {/* Floating gradient background */}
      <motion.div className="absolute -top-20 -left-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
      <motion.div className="absolute bottom-20 right-10 w-72 h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />

      <h1 className="text-4xl font-bold text-center text-yellow-900 mb-10 relative z-10">
        Forms and Applications
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
        {/* 🌾 KCC Crop Loan Card */}
        <motion.div
          whileHover={{ scale: 1.07, y: -8 }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-xl p-8 min-h-[340px] hover:shadow-2xl transition cursor-pointer relative overflow-hidden"
          onClick={() => setSelectedForm("formspage")}
        >
          {/* 🌾 Multiple Floating Wheat Backgrounds */}
          <motion.div
            className="absolute top-6 right-6 text-yellow-500"
            animate={floatingRotate(0)}
          >
            <Wheat className="w-20 h-20 opacity-30" />
          </motion.div>
          <motion.div
            className="absolute bottom-6 left-8 text-yellow-400"
            animate={floatingRotate(1)}
          >
            <Wheat className="w-16 h-16 opacity-30" />
          </motion.div>

          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-5">
              <Wheat className="w-12 h-12 text-yellow-600" />
              <h2 className="text-2xl font-semibold text-yellow-700">
                KCC - FORM
              </h2>
            </div>
            <p className="text-gray-800 mb-6 font-medium text-lg">
            <br></br>
            </p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg shadow text-lg"
            >
              தொடங்கு
            </motion.button>
          </div>
        </motion.div>

        {/* 🐄 KCCAH Animal Loan Card */}
        <motion.div
          whileHover={{ scale: 1.07, y: -8 }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl p-8 min-h-[340px] hover:shadow-2xl transition cursor-pointer relative overflow-hidden"
          onClick={() => setSelectedForm("formsahpage")}
        >
          {/* 🐄 Multiple Floating Animals */}
          <motion.div
            className="absolute top-6 right-8 text-green-600 text-6xl"
            animate={floatingRotate(0)}
          >
            🐄
          </motion.div>
          <motion.div
            className="absolute bottom-10 left-8 text-green-500 text-5xl"
            animate={floatingRotate(1)}
          >
            🐑
          </motion.div>
          <motion.div
            className="absolute top-20 left-14 text-green-700 text-5xl"
            animate={floatingRotate(2)}
          >
            🐓
          </motion.div>
          <motion.div
            className="absolute bottom-6 right-16 text-green-500 text-5xl"
            animate={floatingRotate(3)}
          >
            🐐
          </motion.div>

          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-5">
              <h2 className="text-2xl font-semibold text-green-700">
                KCCAH -FORMS
              </h2>
            </div>
            <p className="text-gray-800 mb-6 font-medium text-lg">
             <br></br>
            </p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow text-lg"
            >
              தொடங்கு
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FORMS14;
