
"use client"

import { useState } from "react"

export default function KCCPage3({ data }: { data?: any }) {
  const [formData] = useState({
    transitAmount: data?.transitAmount || "8,40,000.00",
    kccDeposit: data?.kccDeposit || "7,94,000.00",
    otherLoan: data?.otherLoan || "46,000.00",
    cropInsurance: data?.cropInsurance || "-",
    total: data?.total || "8,40,000.00",
  })
  const member=localStorage.getItem("memberslength")
 
  const grandCropMothamValue = localStorage.getItem("grandCropMotham");
const totalRokkamValue = localStorage.getItem("totalRokkam");
 const saved = localStorage.getItem("kcc_resolutionNumber");
const uram = Number(grandCropMothamValue) - Number(totalRokkamValue);

 const tamilword=localStorage.getItem("grandCropMothamInTamil")

  return (
    <div className="w-full h-full bg-white p-4 font-serif" style={{ fontSize: "12px" }}>
      {/* ===== TITLE ===== */}
      <h1 className="text-center font-bold text-base mb-3">சரக மேற்பார்வையாளர் பரிந்துரை</h1>

      {/* ===== PARAGRAPH ===== */}
      <p className="text-justify leading-tight mb-4 text-xs">
        {`S.1374 மகுடஞ்சாவடி தொடக்க வேளாண்மை கூட்டுறவு 
        கடன் சங்க தீ.எண் ${saved} நாள்: 2025ம் ஆண்டு ஜூலை ${"\u00A0\u00A0\u00A0" } 
        மாதம் ந் தேதியின்படி சங்கம் கோரியுள்ள உறுப்பினர்களுக்கு
         விவசாய காசுக்கடன் அட்டை (KCC) திட்டத்தின் மூலம் பயிர் 
         கடன் வழங்க சங்கத்தின் பேரில் உள்ள விவசாய காசுக்கடன் 
         அட்டை திட்ட காசுக்கடனாக ரூ.${grandCropMothamValue}-(${tamilword})
         சங்கத்தின் KCC Transit கணக்கு எண்: 716417262க்கு முஜரா மூலம் வரவு வைத்து பின்பு KCC Transit 
         கணக்கில் உள்ள தொகையினை பற்று செய்து கீழ்க்கண்ட விபரப்படி வழங்க சேலம் மாவட்ட மத்திய 
         கூட்டுறவு வங்கி மகுடஞ்சாவடி கிளை மேலாளர் அவர்களுக்கு சங்ககிரி வட்டார அலுவலகம் மூலம் பரிந்துரை செய்கிறேன்.`}
      </p>

      {/* ===== TABLE ===== */}
      <table className="w-full border-2 border-purple-600 border-collapse mb-4 text-xs">
        <tbody>
          {/* Row 1 */}
          <tr>
            <td className="border-2 border-purple-600 p-2 font-bold text-xs">
              சங்கத்தின் KCC Transit கணக்கு எண்: 716417262
முஜரா மூலம் வரவு வைக்க
            </td>
            <td className="border-2 border-purple-600 p-2 w-32 text-blue-700 font-bold text-right text-xs">
              ₹.{grandCropMothamValue}
            </td>
          </tr>

          {/* Row 2 */}
          <tr>
            <td className="border-2 border-purple-600 p-2 text-xs">
              ரொக்கம், தொழு உரம், மற்றும் விதைப்பகுதி சங்கத்தின் உறுப்பினர்களின் தனி சேமிப்பு கணக்குக்கு (இணைப்பில் உள்ளவாறு) முஜரா மூலமாக:
            </td>
            <td className="border-2 border-purple-600 p-2 w-32 text-right font-bold text-xs">
              ₹. {totalRokkamValue}
            </td>
          </tr>

          {/* Row 3 */}
          <tr>
            <td className="border-2 border-purple-600 p-2 text-xs">
           உரப்பகுதி சங்கத்தின் உர காசுக்கடன் கணக்கு எண் 218053478 க்கு முஜரா மூலமாக :
            </td>
            <td className="border-2 border-purple-600 p-2 w-32 text-right font-bold text-xs">₹. {uram}</td>
          </tr>

          {/* Row 4 */}
          <tr>
            <td className="border-2 border-purple-600 p-2 text-xs">
            பயிர் இன்சுரன்ஸ் பிரிமியம் DCCB Crop Insurance Scheme No 711248151 -க்கு முஜரா மூலமாக
</td>
               <td className="border-2 border-purple-600 p-2 w-32 text-right font-bold text-xs">₹.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
           
          </tr>

          {/* Total Row */}
          <tr>
            <td className="border-2 border-purple-600 p-2 text-right font-bold text-red-600 text-xs">மொத்தம்</td>
            <td className="border-2 border-purple-600 p-2 w-32 text-right font-bold text-red-600 text-xs">
              ₹ {grandCropMothamValue}
            </td>
          </tr>
        </tbody>
      </table>

      {/* ===== SIGNATURE ===== */}
      <div className="text-right font-bold mb-6 text-xs">சரக மேற்பார்வையாளர் </div>

      {/* ===== SECOND HEADING ===== */}
      <h2 className="text-center font-bold text-base mb-3">களமேலாளர் பரிந்துரை</h2>

      {/* ===== SECOND PARAGRAPH ===== */}
      <p className="text-justify leading-tight text-xs">
        {`S.1374 மகுடஞ்சாவடி தொடக்க வேளாண்மை 
        கூட்டுறவு கடன் சங்க தீ.எண் 151&152 நாள்: 2025ம் 
        ஆண்டு ஜூலை மாதம் ${"\u00A0\u00A0\u00A0" } ந் தேதியின்படி சங்கம்
         கோரிய தொகை ரூ.${grandCropMothamValue}-(${tamilword})
          சரக மேற்பார்வையாளர் பரிந்துரைப்படி பயிர் 
          கடன் தொகையினை சங்கத்தின் KCC Transit 
          கணக்கு எண்: 716417262க்கு முஜரா மூலம் 
          வரவு வைத்து பின்பு KCC Transit கணக்கில் 
          உள்ள தொகையினை பற்று செய்து மேற்கண்ட 
          விபரப்படி முஜரா மூலம் இணைப்பில் உள்ள 
          சங்க உறுப்பினர்களின் கணக்கிற்கு
         வரவு வைக்க அனுமதிக்கப்படுகிறது.`}
        </p>
       

      {/* ===== FINAL SIGNATURE ===== */}
   
    </div>
  )
}
