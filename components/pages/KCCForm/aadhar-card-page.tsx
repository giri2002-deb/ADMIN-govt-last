// import Image from "next/image"

// interface AadharCardPageProps {
//   data?: any
// }

// export default function AadharCardPage({ data }: AadharCardPageProps) {
//   return (
//     <div className="w-full h-full bg-white p-8 pdf-page">
//       {/* Header */}
//       <div className="text-center mb-8">
//         <h1 className="text-xl font-bold text-blue-900 mb-2">भारत सरकार</h1>
//         <h2 className="text-lg font-bold text-blue-900 mb-2">GOVERNMENT OF INDIA</h2>
//         <h3 className="text-md font-bold text-orange-600">आधार</h3>
//         <h4 className="text-sm font-bold text-orange-600">AADHAAR</h4>
//       </div>

//       {/* Aadhaar Card Container */}
//       <div className="max-w-md mx-auto bg-gradient-to-r from-blue-50 to-orange-50 border-2 border-blue-900 rounded-lg p-6 shadow-lg">
//         {/* Card Header */}
//         <div className="flex justify-between items-center mb-4">
//           <div className="text-xs text-blue-900 font-semibold">
//             <p>भारत सरकार</p>
//             <p>GOVERNMENT OF INDIA</p>
//           </div>
//           <div className="w-16 h-12 bg-gradient-to-r from-orange-500 to-green-500 flex items-center justify-center rounded">
//             <span className="text-white font-bold text-xs">आधार</span>
//           </div>
//         </div>

//         {/* Photo and Details Section */}
//         <div className="flex gap-4 mb-4">
//           {/* Photo */}
//           <div className="w-20 h-24 border border-gray-400 bg-gray-100 flex items-center justify-center">
//             <Image
//               src={data?.applicantPhoto || "/placeholder.svg?height=96&width=80&text=Photo"}
//               alt="Aadhaar Photo"
//               width={80}
//               height={96}
//               className="object-cover"
//             />
//           </div>

//           {/* Details */}
//           <div className="flex-1 text-xs">
//             <div className="mb-2">
//               <p className="font-semibold text-blue-900">Name / नाम</p>
//               <p className="font-bold">{data?.name || "VARUTHARAJ"}</p>
//             </div>
//             <div className="mb-2">
//               <p className="font-semibold text-blue-900">Date of Birth / जन्म तिथि</p>
//               <p className="font-bold">01/01/1975</p>
//             </div>
//             <div className="mb-2">
//               <p className="font-semibold text-blue-900">Gender / लिंग</p>
//               <p className="font-bold">MALE / पुरुष</p>
//             </div>
//           </div>
//         </div>

//         {/* Address */}
//         <div className="mb-4 text-xs">
//           <p className="font-semibold text-blue-900 mb-1">Address / पता:</p>
//           <p className="font-bold text-xs">
//             {data?.address || "S/O KANTHASAMI, THARAN KADU"}
//             <br />
//             KOODALUR, SANKAGIRI TALUK
//             <br />
//             SALEM DISTRICT, TAMIL NADU
//             <br />
//             PIN: 637103
//           </p>
//         </div>

//         {/* Aadhaar Number */}
//         <div className="text-center mb-4">
//           <p className="font-semibold text-blue-900 text-xs">Aadhaar Number / आधार संख्या</p>
//           <p className="text-xl font-bold text-black tracking-wider bg-white px-4 py-2 rounded border">
//             {data?.aadharNumber || "XXXX XXXX 3840"}
//           </p>
//         </div>

//         {/* QR Code and Footer */}
//         <div className="flex justify-between items-end">
//           <div className="w-16 h-16 border border-gray-400 bg-gray-100 flex items-center justify-center">
//             <div className="w-12 h-12 bg-black opacity-20 flex items-center justify-center text-xs">QR</div>
//           </div>
//           <div className="text-right text-xs text-blue-900">
//             <p>www.uidai.gov.in</p>
//             <p className="font-semibold">Help: 1947</p>
//           </div>
//         </div>

//         {/* Security Features */}
//         <div className="mt-2 text-center">
//           <p className="text-xs text-gray-600">
//             <span className="font-semibold">Issue Date:</span> 15/03/2023
//           </p>
//         </div>
//       </div>

//       {/* Footer Information */}
//       <div className="text-center mt-8 text-sm text-gray-600">
//         <p className="font-bold mb-2">ஆதார் கார்டு நகல்</p>
//         <p>இந்த ஆவணம் கடன் விண்ணப்பத்துடன் இணைக்கப்பட்டுள்ளது</p>
//         <p className="text-xs mt-2">Document attached with loan application</p>
//       </div>
//     </div>
//   )
// }
import { useEffect, useState } from "react"

export default function AadharCardPage() {
  const [panPreview, setPanPreview] = useState<string | null>(null)


 useEffect(() => {
  const raw = localStorage.getItem("kcc_userjson");
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      const previewUrl = parsed?.userjson?.documents?.aadhaar?.preview;

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
