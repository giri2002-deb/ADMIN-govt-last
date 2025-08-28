
"use client"

import { useState } from "react"

export default function KCCPage2({ data }: { data?: any }) {
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
      {/* ====== HEADER FROM IMAGE ====== */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-blue-600 font-bold text-sm">கூட்டுறவே!</span>
        <span className="text-blue-600 font-bold text-sm">நாட்டுயர்வு!!</span>
      </div>

      <div className="flex flex-col items-center text-center">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-400 via-green-500 to-blue-500 rounded-full flex items-center justify-center">
            <div className="text-white text-lg">🤝</div>
          </div>
        </div>

        <h1 className="font-bold text-sm mb-1">
          S.1374 <span className="font-bold">S.1374 மகுடஞ்சாவடி தொடக்க வேளாண்மை கூட்டுறவு கடன்
சங்கம் வரை.,</span>
        </h1>
        <h2 className="text-blue-600 font-bold text-sm mb-1">மகுடஞ்சாவடிஅஞ்சல், சங்ககிரி வட்டம், சேலம் மாவட்டம் - 637103</h2>
        <div className="border-b-2 border-red-600 w-full my-1"></div>

        <p className="mt-1 text-xs leading-tight">
         2025ம் வருடம் ஜூலை மாதம் ந் தேதி கூடிய S.1374 மகுடஞ்சாவடி தொடக்க வேளாண்மை கூட்டுறவு கடன் சங்க செயலாட்சியர் நடவடிக்கைகள்.
        </p>
        <p className="font-bold text-purple-800 mt-1 text-xs">
         முன்னிலை: திருமதி.இரா.பிரியவதனி, கூட்டுறவு சார்பதிவாளர்/ செயலாட்சியர் அவர்கள்.
        </p>
      </div>
      <br></br>
<br></br>
      {/* ====== TWO COLUMN TAMIL TEXT ====== */}
      <div className="grid grid-cols-2 gap-2 my-3">
        <div className="border-r-2 border-purple-600 pr-2">
          <h2 className="text-red-600 font-bold mb-1 text-xs">பொருள்: {saved}</h2>
          <p className="text-justify leading-tight text-xs">
            {`நமது சங்க தீ.எண்.${saved},நாள்:${"\u00A0\u00A0\u00A0" }
.7.2025ன்   படி சேங்க்ஷன் செய்யப்பட்ட கடன் 
தொகை ரூ.${saved} (${tamilword}) ${member} உறுப்பினர்களுக்கு 
விவசாயக் காசுக்கடனாக (KCC) அனுமதிக்கப்பட்டது.
 சேலம் மாவட்ட மத்திய கூட்டுறவு வங்கி 
 மகுடஞ்சாவடி கிளையை கோருதல் தொடர்பாக.`}
          </p>
        </div>

        <div className="pl-2">
          <h2 className="text-red-600 font-bold mb-1 text-xs">தீர்மானம்:{saved}</h2>
          <p className="text-justify leading-tight text-xs">
            {`நமது சங்க தீ.எண்.${saved},நாள்: ${"\u00A0\u00A0\u00A0"} .7.2025ன் படி
சேங்க்ஷன் செய்யப்பட்ட 
 கடன் தொகை ரூ.${grandCropMothamValue} (${tamilword} மட்டும்)
 ${member}  உறுப்பினர்களுக்கு விவசாய காசுக்கடன் (KCC) திட்டத்தில் கீழ்க்கண்டவாறு 
 உறுப்பினர்களுக்கு பயிர்க்கடன் வழங்க சங்கத்திற்கு 
 அனுமதிக்கப்பட்ட காசுக்கடன் மனு.எண்.441/2025-2026/S நாள்:25.04.2025ன்படி

அனுமதிக்கப்பட்ட கடன் தொகை ரூ.20400000.00 
இருந்து கீழ்க்கண்ட விபரப்படி வழங்குமாறு 
சேலம் மாவட்ட மத்திய கூட்டுறவு 
வங்கி மகுடஞ்சாவடி கிளைமேலாளர் 
அவர்களை கேட்டுக்கொள்ளலாமாக தீர்மானிக்கப் பட்டது.`}
          </p>
        </div>
      </div>
<br></br>
<br></br>
      {/* ====== TABLE ====== */}
      <table className="w-full border-2 border-purple-600 border-collapse text-xs mb-3">
        <tbody>
          {[
            {
              label: "சங்கத்தின் KCC Transit கணக்கு எண்: 716417262 மூலமாக வரவு வைக்க",
              value: grandCropMothamValue,
            },
            {
              label:
                "ரொக்கம், தொழு உரம், மற்றும் விதைப்புகுதி சங்க உறுப்பினர்களின் தனி சேமிப்பு கணக்குக்கு (இணையப்பில் உள்ளவரு) மூலமாக :",
              value: totalRokkamValue,
            },
            {
              label: "உறப்புகுதி சங்கத்தின் உற காசக்கடன் கணக்கு எண் 218053478 க்கு மூலமாக :",
              value: uram,
            },
            {
              label: "பயிர் இன்சுரன்ஸ் பிரீமியம் DCCB Crop Insurance Scheme No 711248151 –க்கு மூலமாக",
              value: "-",
            },
          ].map((row, idx) => (
            <tr key={idx}>
              <td className="border-2 border-purple-600 p-1 text-xs">{row.label}</td>
              <td className="border-2 border-purple-600 p-1 w-12 text-blue-700 font-bold text-center text-xs">₹</td>
              <td className="border-2 border-purple-600 p-1 w-32 font-bold text-right text-xs">{row.value}</td>
            </tr>
          ))}

          <tr>
            <td className="border-2 border-purple-600 p-1 font-bold text-red-600 text-right text-xs">மொத்தம்</td>
            <td className="border-2 border-purple-600 p-1 w-12 text-red-600 font-bold text-center text-xs">₹.</td>
            <td className="border-2 border-purple-600 p-1 w-32 text-red-600 font-bold text-right text-xs">
              {grandCropMothamValue}
            </td>
          </tr>
        </tbody>
      </table>

      {/* ====== FOOTER ====== */}
       <div className="flex justify-between mt-8">
        <div className="text-left">
          <div className="mb-16 text-xs">செயலாளர்</div>
        </div>
        <div className="text-right">
          <div className="mb-8 text-xs">செயலாட்சியர்</div>
          
        </div>
        
        
        
      </div>
      <div className="text-center">
          <div className="mb-16 text-xs">சர்க நேற்பார்வையாளர்</div>
        </div>
    </div>
  )
}
