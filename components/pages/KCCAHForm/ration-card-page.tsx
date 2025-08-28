// import Image from "next/image"

// interface RationCardPageProps {
//   data?: any
// }

// export default function RationCardPage({ data }: RationCardPageProps) {
//   return (
//     <div className="w-full h-full bg-white p-8 pdf-page">
//       {/* Header */}
//       <div className="text-center mb-8">
//         <h1 className="text-xl font-bold text-green-800 mb-2">தமிழ்நாடு அரசு</h1>
//         <h2 className="text-lg font-bold text-green-800 mb-2">GOVERNMENT OF TAMIL NADU</h2>
//         <h3 className="text-md font-bold text-red-600">உணவு மற்றும் நுகர்வோர் பாதுகாப்பு துறை</h3>
//         <h4 className="text-sm font-bold text-red-600">FOOD AND CONSUMER PROTECTION DEPARTMENT</h4>
//       </div>

//       {/* Ration Card Container */}
//       <div className="max-w-lg mx-auto bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-800 rounded-lg p-6 shadow-lg">
//         {/* Card Header */}
//         <div className="text-center mb-4">
//           <h3 className="text-lg font-bold text-green-800">ரேஷன் கார்டு</h3>
//           <h4 className="text-md font-bold text-green-800">RATION CARD</h4>
//         </div>

//         {/* Card Details */}
//         <div className="grid grid-cols-2 gap-4 mb-4">
//           {/* Left Side - Details */}
//           <div className="text-sm">
//             <div className="mb-3">
//               <p className="font-semibold text-green-800">Card No. / கார்டு எண்:</p>
//               <p className="font-bold text-lg">{data?.rationCardNumber || "TN1234567890"}</p>
//             </div>

//             <div className="mb-3">
//               <p className="font-semibold text-green-800">Head of Family / குடும்பத் தலைவர்:</p>
//               <p className="font-bold">{data?.name || "வருதராஜ்"}</p>
//             </div>

//             <div className="mb-3">
//               <p className="font-semibold text-green-800">Address / முகவரி:</p>
//               <p className="font-bold text-xs">
//                 {data?.address || "தாரன் காடு, கூடலூர்"}
//                 <br />
//                 சங்ககிரி வட்டம், சேலம் மாவட்டம்
//                 <br />
//                 தமிழ்நாடு - 637103
//               </p>
//             </div>

//             <div className="mb-3">
//               <p className="font-semibold text-green-800">Card Type / கார்டு வகை:</p>
//               <p className="font-bold text-blue-600">BPL (Below Poverty Line)</p>
//             </div>
//           </div>

//           {/* Right Side - Photo */}
//           <div className="flex flex-col items-center">
//             <div className="w-24 h-28 border-2 border-gray-400 bg-gray-100 flex items-center justify-center mb-2">
//               <Image
//                 src={data?.applicantPhoto || "/placeholder.svg?height=112&width=96&text=Photo"}
//                 alt="Ration Card Photo"
//                 width={96}
//                 height={112}
//                 className="object-cover"
//               />
//             </div>
//             <p className="text-xs text-center font-semibold">குடும்பத் தலைவர்</p>
//           </div>
//         </div>

//         {/* Family Members Table */}
//         <div className="mb-4">
//           <h4 className="font-bold text-green-800 mb-2 text-sm">Family Members / குடும்ப உறுப்பினர்கள்:</h4>
//           <table className="w-full border border-gray-400 text-xs">
//             <thead className="bg-green-200">
//               <tr>
//                 <th className="border border-gray-400 p-1">S.No</th>
//                 <th className="border border-gray-400 p-1">Name / பெயர்</th>
//                 <th className="border border-gray-400 p-1">Age / வயது</th>
//                 <th className="border border-gray-400 p-1">Relation / உறவு</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td className="border border-gray-400 p-1 text-center">1</td>
//                 <td className="border border-gray-400 p-1">{data?.name || "வருதராஜ்"}</td>
//                 <td className="border border-gray-400 p-1 text-center">48</td>
//                 <td className="border border-gray-400 p-1">தலைவர்</td>
//               </tr>
//               <tr>
//                 <td className="border border-gray-400 p-1 text-center">2</td>
//                 <td className="border border-gray-400 p-1">லக்ஷ்மி</td>
//                 <td className="border border-gray-400 p-1 text-center">42</td>
//                 <td className="border border-gray-400 p-1">மனைவி</td>
//               </tr>
//               <tr>
//                 <td className="border border-gray-400 p-1 text-center">3</td>
//                 <td className="border border-gray-400 p-1">ராஜேஷ்</td>
//                 <td className="border border-gray-400 p-1 text-center">20</td>
//                 <td className="border border-gray-400 p-1">மகன்</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>

//         {/* Footer */}
//         <div className="flex justify-between items-center text-xs">
//           <div>
//             <p className="font-semibold text-green-800">Issue Date:</p>
//             <p>01/04/2023</p>
//           </div>
//           <div className="text-right">
//             <p className="font-semibold text-green-800">Valid Until:</p>
//             <p>31/03/2026</p>
//           </div>
//         </div>
//       </div>

//       {/* Footer Information */}
//       <div className="text-center mt-8 text-sm text-gray-600">
//         <p className="font-bold mb-2">ரேஷன் கார்டு நகல்</p>
//         <p>இந்த ஆவணம் கடன் விண்ணப்பத்துடன் இணைக்கப்பட்டுள்ளது</p>
//         <p className="text-xs mt-2">Document attached with loan application</p>
//       </div>
//     </div>
//   )
// }
import { useEffect, useState } from "react"

export default function RationCardPageProps() {
  const [panPreview, setPanPreview] = useState<string | null>(null)


 useEffect(() => {
  const raw = localStorage.getItem("kccah_userjson");
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      const previewUrl = parsed?.userjson?.documents?.ration?.preview;

      console.log("PAN Preview URL:", previewUrl); // <== should log full backend URL
      if (previewUrl) setPanPreview(previewUrl);
    } catch (err) {
      console.error("Failed to parse kcc_userjson:", err);
    }
  }
}, []);


  return (
    <div className="w-full h-full bg-white p-8 pdf-page">
     

      {panPreview ? (
        <div className="flex justify-center mt-4">
          <img
            src={panPreview}
            alt="PAN Preview"
            className="border border-gray-300 shadow-md max-w-full h-auto"
          />
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-10">
          PAN preview image not available.
        </div>
      )}
    </div>
  )
}
