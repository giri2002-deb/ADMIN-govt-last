"use client";

import React, { useState } from "react";
import { Wheat, Cog as Cow, ArrowLeft, Sprout, Beef } from "lucide-react";
import { Loanledger } from "./Loanledger/Loanledger";
import { LoanledgerAH } from "./Loanledger/LoanledgerAH";
import { motion } from "framer-motion"

const iconVariants = {
  hover: { scale: 1.2, rotate: 10 },
};
const Loanledgerform1: React.FC = () => {
  const [selectedForm, setSelectedForm] = useState<"Loanledger" | "LoanledgerAH" | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFormSelect = (formType: "Loanledger" | "LoanledgerAH") => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedForm(formType);
      setIsAnimating(false);
    }, 300);
  };

  const handleBackClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedForm(null);
      setIsAnimating(false);
    }, 200);
  };

  // Custom CSS animations
  const animationStyles = `
    @keyframes fadeInDown {
      from {
        opacity: 0;
        transform: translate3d(0, -30px, 0);
      }
      to {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translate3d(0, 30px, 0);
      }
      to {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }
    }

    @keyframes slideInLeft {
      from {
        opacity: 0;
        transform: translate3d(-50px, 0, 0);
      }
      to {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }
    }

    @keyframes slideInRight {
      from {
        opacity: 0;
        transform: translate3d(50px, 0, 0);
      }
      to {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }
    }

    @keyframes bounce {
      0%, 20%, 53%, 80%, 100% {
        transform: translate3d(0, 0, 0);
      }
      40%, 43% {
        transform: translate3d(0, -8px, 0);
      }
      70% {
        transform: translate3d(0, -4px, 0);
      }
      90% {
        transform: translate3d(0, -2px, 0);
      }
    }

    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }

    @keyframes ping {
      75%, 100% {
        transform: scale(2);
        opacity: 0;
      }
    }

    @keyframes float {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-10px);
      }
    }

    @keyframes rotate {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    .animate-fadeInDown {
      animation: fadeInDown 0.8s ease-out;
    }

    .animate-fadeInUp {
      animation: fadeInUp 0.8s ease-out;
    }

    .animate-slideInLeft {
      animation: slideInLeft 0.8s ease-out;
    }

    .animate-slideInRight {
      animation: slideInRight 0.8s ease-out;
    }

    .animate-bounce-custom {
      animation: bounce 2s infinite;
    }

    .animate-pulse-custom {
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    .animate-ping-custom {
      animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
    }

    .animate-float {
      animation: float 3s ease-in-out infinite;
    }

    .animate-rotate-slow {
      animation: rotate 8s linear infinite;
    }

    .delay-100 {
      animation-delay: 0.1s;
    }

    .delay-200 {
      animation-delay: 0.2s;
    }

    .delay-300 {
      animation-delay: 0.3s;
    }

    .delay-400 {
      animation-delay: 0.4s;
    }

    .delay-500 {
      animation-delay: 0.5s;
    }

    .delay-700 {
      animation-delay: 0.7s;
    }

    .delay-1000 {
      animation-delay: 1s;
    }

    .hover-scale:hover {
      transform: scale(1.05);
    }

    .hover-rotate:hover {
      transform: rotate(12deg);
    }

    .hover-rotate-reverse:hover {
      transform: rotate(-12deg);
    }

    .group:hover .group-hover-scale {
      transform: scale(1.1);
    }

    .group:hover .group-hover-rotate {
      transform: rotate(12deg);
    }

    .group:hover .group-hover-rotate-reverse {
      transform: rotate(-12deg);
    }

    .group:hover .group-hover-translate {
      transform: translateX(-4px);
    }
  `;

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
      <>
        <style dangerouslySetInnerHTML={{ __html: animationStyles }} />
        <div className={`min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-6 transition-all duration-500 ${
          isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}>
          <button
            onClick={handleBackClick}
            className="group mb-6 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-xl shadow-lg hover-scale transition-all duration-300 flex items-center gap-2 font-semibold"
          >
            <ArrowLeft className="w-5 h-5 group-hover-translate transition-transform duration-300" />
            Back
          </button>
          <div className="animate-fadeInUp">
            {renderForm()}
          </div>
        </div>
      </>
    );
  }

  // Initial form selection UI
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: animationStyles }} />
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-green-50 p-6">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-200 rounded-full opacity-20 animate-pulse-custom"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-green-200 rounded-full opacity-20 animate-pulse-custom delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-orange-200 rounded-full opacity-20 animate-pulse-custom delay-500"></div>
          <div className="absolute top-10 right-1/4 w-16 h-16 bg-amber-200 rounded-full opacity-15 animate-float"></div>
          <div className="absolute bottom-10 left-1/4 w-20 h-20 bg-lime-200 rounded-full opacity-15 animate-float delay-700"></div>
        </div>

        <div className="relative z-10">
          <div className="text-center mb-12 animate-fadeInDown">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-700 via-orange-600 to-green-700 bg-clip-text text-transparent mb-4 animate-pulse-custom">
              Loanledger Forms
            </h1>
            <p className="text-gray-600 text-lg animate-fadeInUp delay-200">
              Choose your loan category to get started
            </p>
          </div>

          <div className={`max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-500 ${
            isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}>
            {/* Crop Loan Card */}
            <div
              className="group bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 cursor-pointer hover-scale hover-rotate animate-slideInLeft"
              onClick={() => handleFormSelect("Loanledger")}
            >
              {/* Icon Container with Animation */}
              <div className="relative mb-6 flex justify-center">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-pulse-custom"></div>
                <div className="relative bg-gradient-to-br from-yellow-100 to-orange-100 p-6 rounded-full group-hover-scale transition-transform duration-500">
                  <div className="flex gap-2">
                    <Wheat className="w-8 h-8 text-yellow-600 animate-bounce-custom delay-100" />
                    <Sprout className="w-8 h-8 text-green-600 animate-bounce-custom delay-300" />
                  </div>
                </div>
              </div>

              <div className="text-center">
                <h2 className="text-2xl font-bold text-yellow-700 mb-4 group-hover:text-yellow-800 transition-colors duration-300">
                  KCC-Loanledger
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  For crop cultivation loans and agricultural financing
                </p>
                
                {/* Animated crop icons */}
                <div className="flex justify-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center group-hover-rotate transition-transform duration-500">
                    <Wheat className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover-rotate-reverse transition-transform duration-500 delay-100">
                    <Sprout className="w-6 h-6 text-green-600" />
                  </div>
                </div>

                <button className="group-hover-scale bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300">
                  தொடங்கு
                </button>
              </div>

              {/* Floating particles effect */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                <div className="absolute top-4 right-4 w-2 h-2 bg-yellow-400 rounded-full animate-ping-custom opacity-75"></div>
                <div className="absolute bottom-6 left-6 w-1 h-1 bg-orange-400 rounded-full animate-ping-custom delay-700 opacity-75"></div>
              </div>
            </div>

            {/* Animal Husbandry Loan Card */}
           <div
  className="group bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 cursor-pointer hover-scale hover-rotate-reverse animate-slideInRight"
  onClick={() => handleFormSelect("LoanledgerAH")}
>
  {/* Icon Container with Animation */}
  <div className="relative mb-6 flex justify-center">
    <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-amber-400 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-pulse-custom"></div>
    <div className="relative bg-gradient-to-br from-green-100 to-amber-100 p-6 rounded-full group-hover-scale transition-transform duration-500">
      <div className="flex gap-3">
       <div className="flex flex-col items-center">
        <motion.div
          variants={iconVariants}
          whileHover="hover"
          className="text-5xl mb-2"
        >
          🐐
        </motion.div>
        <span className="text-sm text-gray-600"></span>
      </div>

      </div>
    </div>
  </div>

 <div className="text-center">
  <h2 className="text-2xl font-bold text-green-700 mb-4 group-hover:text-green-800 transition-colors duration-300">
    KCC-AH-Loanledger
  </h2>
  <p className="text-gray-600 mb-6 leading-relaxed">
    For animal husbandry loans and livestock financing
  </p>

  {/* ✅ Particulars Section with Animal Icons */}
  <div className="mb-6">
    <h3 className="text-lg font-semibold text-green-700 mb-3">Particulars</h3>
    <div className="flex justify-center gap-8">
      
 

      {/* Goat */}
      <div className="flex flex-col items-center">
        <motion.div
          variants={iconVariants}
          whileHover="hover"
          className="text-5xl mb-2"
        >
          🐐
        </motion.div>
        <span className="text-sm text-gray-600"></span>
      </div>

      {/* Buffalo */}
      <div className="flex flex-col items-center">
        <motion.div
          variants={iconVariants}
          whileHover="hover"
          className="text-5xl mb-2"
        >
          🐃
        </motion.div>
        <span className="text-sm text-gray-600"></span>
      </div>

    </div>
  </div>

  <button className="group-hover-scale bg-gradient-to-r from-green-600 to-amber-600 hover:from-green-700 hover:to-amber-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300">
    தொடங்கு
  </button>
</div>

{/* Floating particles effect */}
<div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
  <div className="absolute top-4 right-4 w-2 h-2 bg-green-400 rounded-full animate-ping-custom opacity-75"></div>
  <div className="absolute bottom-6 left-6 w-1 h-1 bg-amber-400 rounded-full animate-ping-custom delay-500 opacity-75"></div>
</div>

  {/* Floating particles effect */}
  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
    <div className="absolute top-4 right-4 w-2 h-2 bg-green-400 rounded-full animate-ping-custom opacity-75"></div>
    <div className="absolute bottom-6 left-6 w-1 h-1 bg-amber-400 rounded-full animate-ping-custom delay-500 opacity-75"></div>
  </div>
</div>

          </div>

          {/* Feature highlights */}
       
        </div>
      </div>
    </>
  );
};

export default Loanledgerform1;