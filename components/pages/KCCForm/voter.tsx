import { useEffect, useState } from "react"

export default function voter() {
  const [panPreview, setPanPreview] = useState<string | null>(null)


 useEffect(() => {
  const raw = localStorage.getItem("kcc_userjson");
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      const previewUrl = parsed?.userjson?.documents?.voter?.preview;

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
          voter preview image not available.
        </div>
      )}
    </div>
  )
}
