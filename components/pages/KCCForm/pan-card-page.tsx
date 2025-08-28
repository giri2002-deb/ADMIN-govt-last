// import Image from "next/image"

// interface PanCardPageProps {
//   data?: any
// }

// export default function PanCardPage({ data }: PanCardPageProps) {
//   return (
//     <div className="w-full h-full bg-white p-8 pdf-page">
//       {/* Header */}
//       <div className="text-center mb-8">
//         <h1 className="text-xl font-bold text-blue-800 mb-2">INCOME TAX DEPARTMENT</h1>
//         <h2 className="text-lg font-bold text-blue-800 mb-4">GOVERNMENT OF INDIA</h2>
//         <h3 className="text-md font-bold text-red-600">PERMANENT ACCOUNT NUMBER CARD</h3>
//       </div>

//       {/* PAN Card Container */}
//       <div className="max-w-md mx-auto bg-gradient-to-r from-blue-100 to-blue-200 border-2 border-blue-800 rounded-lg p-6 shadow-lg">
//         {/* Card Header */}
//         <div className="flex justify-between items-center mb-4">
//           <div className="text-xs text-blue-800 font-semibold">
//             <p>INCOME TAX DEPARTMENT</p>
//             <p>GOVT. OF INDIA</p>
//           </div>
//           <div className="w-16 h-12 bg-orange-500 flex items-center justify-center rounded">
//             <span className="text-white font-bold text-xs">भारत</span>
//           </div>
//         </div>

//         {/* Photo and Details Section */}
//         <div className="flex gap-4 mb-4">
//           {/* Photo */}
//           <div className="w-20 h-24 border border-gray-400 bg-gray-100 flex items-center justify-center">
//             <Image
//               src={data?.applicantPhoto || "/placeholder.svg?height=96&width=80&text=Photo"}
//               alt="PAN Card Photo"
//               width={80}
//               height={96}
//               className="object-cover"
//             />
//           </div>

//           {/* Details */}
//           <div className="flex-1 text-xs">
//             <div className="mb-2">
//               <p className="font-semibold text-blue-800">Name</p>
//               <p className="font-bold">{data?.name || "VARUTHARAJ"}</p>
//             </div>
//             <div className="mb-2">
//               <p className="font-semibold text-blue-800">Father's Name</p>
//               <p className="font-bold">{data?.fatherName || "KANTHASAMI"}</p>
//             </div>
//             <div className="mb-2">
//               <p className="font-semibold text-blue-800">Date of Birth</p>
//               <p className="font-bold">01/01/1975</p>
//             </div>
//           </div>
//         </div>

//         {/* PAN Number */}
//         <div className="text-center mb-4">
//           <p className="font-semibold text-blue-800 text-xs">Permanent Account Number</p>
//           <p className="text-2xl font-bold text-black tracking-wider bg-white px-4 py-2 rounded border">ABCPV1234D</p>
//         </div>

//         {/* Signature */}
//         <div className="flex justify-between items-end">
//           <div className="text-xs">
//             <p className="font-semibold text-blue-800">Signature</p>
//             <div className="w-20 h-8 border-b border-gray-400 mt-1"></div>
//           </div>
//           <div className="text-right text-xs text-blue-800">
//             <p>www.incometaxindia.gov.in</p>
//           </div>
//         </div>
//       </div>

//       {/* Footer Information */}
//       <div className="text-center mt-8 text-sm text-gray-600">
//         <p className="font-bold mb-2">PAN கார்டு நகல்</p>
//         <p>இந்த ஆவணம் கடன் விண்ணப்பத்துடன் இணைக்கப்பட்டுள்ளது</p>
//         <p className="text-xs mt-2">Document attached with loan application</p>
//       </div>
//     </div>
//   )
// }
import { useEffect, useState } from "react"

export default function PanPreviewSection() {
  const [panPreview, setPanPreview] = useState<string | null>(null)


 useEffect(() => {
  const raw = localStorage.getItem("kcc_userjson");
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      const previewUrl = parsed?.userjson?.documents?.pan?.preview;

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
