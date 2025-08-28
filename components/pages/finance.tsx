// "use client";

// import React, { useState } from "react";
// import GoldForm from "@/components/pages/Financeparticulars/gold-page";
// import CropsForm from "@/components/pages/Financeparticulars/crops-page";
// import AnimalForm from "@/components/pages/Financeparticulars/animals-page";

// const FinanceParticulars: React.FC = () => {
//   const [selectedForm, setSelectedForm] = useState<"gold" | "crops" | "animal" | null>(null);

//   // Render the selected form with a back button
//   if (selectedForm) {
//     const renderForm = () => {
//        
//     };

//     return (
//       <div className="min-h-screen bg-gray-100 p-6">
//         <button
//           onClick={() => setSelectedForm(null)}
//           className="mb-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
//         >
//           ← back
//         </button>
//         {renderForm()}
//       </div>
//     );
//   }

//   // Initial form selection UI
//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold text-center text-yellow-800 mb-8">
//         Finance Particulars
//       </h1>

//       <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Gold Loan */}
//         <div
//           className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer"
//           onClick={() => setSelectedForm("gold")}
//         >
//           <h2 className="text-xl font-semibold text-yellow-600 mb-2">Gold Loan</h2>
//           <p className="text-gray-700 mb-4">தங்கக் கடன்</p>
//           <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">
//             தொடங்கு
//           </button>
//         </div>

//         {/* Crops Loan */}
//         <div
//           className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer"
//           onClick={() => setSelectedForm("crops")}
//         >
//           <h2 className="text-xl font-semibold text-green-600 mb-2">Crops Loan</h2>
//           <p className="text-gray-700 mb-4">பயிர் கடன்</p>
//           <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
//             தொடங்கு
//           </button>
//         </div>

//         {/* Animal Loan */}
//         <div
//           className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer"
//           onClick={() => setSelectedForm("animal")}
//         >
//           <h2 className="text-xl font-semibold text-blue-600 mb-2">Animal Loan</h2>
//           <p className="text-gray-700 mb-4">விலங்கு சார்ந்த</p>
//           <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
//             தொடங்கு
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FinanceParticulars;
"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
 import GoldForm from "@/components/pages/Financeparticulars/gold-page";
 import CropsForm from "@/components/pages/Financeparticulars/crops-page";
 import AnimalForm from "@/components/pages/Financeparticulars/animals-page";

// Mock components for the forms (replace with your actual components)





const FinanceParticulars: React.FC = () => {
  const [selectedForm, setSelectedForm] = useState<"gold" | "crops" | "animal" | null>(null)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    hover: {
      scale: 1.05,
      y: -10,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
  }

  const iconVariants = {
    hover: {
      rotate: [0, -10, 10, -10, 0],
      scale: 1.2,
      transition: {
        duration: 0.5,
      },
    },
  }

  if (selectedForm) {
    const renderForm = () => {
      switch (selectedForm) {
        case "gold":
          return <GoldForm />
        case "crops":
          return <CropsForm />
        case "animal":
          return <AnimalForm />
        default:
          return null
      }
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-500 to-blue-600 p-6">
        <motion.button
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedForm(null)}
          className="mb-6 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 flex items-center gap-2"
        >
          <span className="text-xl">←</span>
          Back to Options
        </motion.button>
        <div className="max-w-4xl mx-auto">{renderForm()}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-emerald-700 to-amber-600 p-6">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-amber-400/30 to-emerald-400/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-teal-400/30 to-blue-400/30 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <h1 className="text-5xl font-bold text-center bg-gradient-to-r from-amber-300 via-emerald-300 to-blue-300 bg-clip-text text-transparent mb-4">
          Finance Particulars
        </h1>
        <p className="text-center text-white/80 text-lg mb-12 max-w-2xl mx-auto">
          Choose your loan type and start your financial journey with us
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10"
      >
        {/* Gold Loan Card */}
        <motion.div
          variants={cardVariants}
          whileHover="hover"
          className="group cursor-pointer"
          onClick={() => setSelectedForm("gold")}
        >
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl p-8 shadow-2xl hover:shadow-yellow-500/25 transition-all duration-500 relative overflow-hidden">
            {/* Animated background pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

   <motion.div 
  variants={iconVariants} 
  whileHover="hover" 
  className="relative w-16 h-16 mx-auto mb-6"
>
  {/* Coin Circle */}
  <div className="w-full h-full rounded-full bg-yellow-400 flex items-center justify-center text-3xl font-bold text-white">
    $
  </div>
</motion.div>



            <h2 className="text-2xl font-bold text-white mb-3 text-center">Gold Loan</h2>
            <p className="text-yellow-100 mb-6 text-center font-medium">தங்கக் கடன்</p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 shadow-lg"
            >
              தொடங்கு (Start Now)
            </motion.button>

            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full" />
            <div className="absolute bottom-4 left-4 w-6 h-6 bg-white/10 rounded-full" />
          </div>
        </motion.div>

        {/* Crops Loan Card */}
        <motion.div
          variants={cardVariants}
          whileHover="hover"
          className="group cursor-pointer"
          onClick={() => setSelectedForm("crops")}
        >
          <div className="bg-gradient-to-br from-green-400 to-emerald-600 rounded-3xl p-8 shadow-2xl hover:shadow-green-500/25 transition-all duration-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-300/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <motion.div variants={iconVariants} whileHover="hover" className="text-6xl mb-6 text-center">
              🌾
            </motion.div>

            <h2 className="text-2xl font-bold text-white mb-3 text-center">Crops Loan</h2>
            <p className="text-green-100 mb-6 text-center font-medium">பயிர் கடன்</p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 shadow-lg"
            >
              தொடங்கு (Start Now)
            </motion.button>

            <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full" />
            <div className="absolute bottom-4 left-4 w-6 h-6 bg-white/10 rounded-full" />
          </div>
        </motion.div>

        {/* Animal Loan Card */}
        <motion.div
          variants={cardVariants}
          whileHover="hover"
          className="group cursor-pointer"
          onClick={() => setSelectedForm("animal")}
        >
          <div className="bg-gradient-to-br from-blue-400 to-indigo-600 rounded-3xl p-8 shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-300/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <motion.div variants={iconVariants} whileHover="hover" className="text-6xl mb-6 text-center">
              🐄
            </motion.div>

            <h2 className="text-2xl font-bold text-white mb-3 text-center">Animal Loan</h2>
            <p className="text-blue-100 mb-6 text-center font-medium">விலங்கு சார்ந்த</p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 shadow-lg"
            >
              தொடங்கு (Start Now)
            </motion.button>

            <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full" />
            <div className="absolute bottom-4 left-4 w-6 h-6 bg-white/10 rounded-full" />
          </div>
        </motion.div>
      </motion.div>

      {/* Floating action elements */}
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-4 rounded-full shadow-2xl cursor-pointer z-20"
      >
        <div className="text-2xl">💰</div>
      </motion.div>
    </div>
  )
}

export default FinanceParticulars
