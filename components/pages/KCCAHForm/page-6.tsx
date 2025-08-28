"use client"
import { numberToTamilWords } from "@/utils/tamil-numbers";
import { useEffect, useState } from "react"

interface Page6Props {
  data?: any
}

export default function Page6({ data }: Page6Props) {
  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    // Mock data for demonstration
     const mockData = JSON.parse(localStorage.getItem("kccah_userjson") || "{}").userjson;

    setUserData(mockData);
  }, [])

  if (!userData) {
    return <div className="p-4" style={{ fontFamily: "marudham", fontSize: "14px" }}>Loading...</div>
  }

  return (
    <div
      className="pdf-page bg-white"
      style={{
        width: "210mm",
        minHeight: "297mm",
        padding: "20mm",
        fontSize: "14px",
        lineHeight: "1.6",
        fontFamily: "marudham",
        color: "black",
        margin: "0 auto"
      }}
    >
      {/* Header with underline */}
      <div className="mb-6" style={{ fontFamily: "marudham", fontSize: "14px" }}>
        <h2 className="font-bold text-left mb-4" style={{ 
          fontFamily: "marudham", 
          fontSize: "14px",
         
        }}>
         &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; S.1374 மகுடஞ்சாவடி தொடக்க வேளாண்மை கூட்டுறவு கடன் சங்கம்
        </h2>
        
        <div className="text-center mb-4" style={{ fontFamily: "marudham", fontSize: "14px" }}>
          <div className="font-bold" style={{ fontFamily: "marudham", fontSize: "14px" }}>வரை.</div>
        </div>
        
        <div className="text-center mb-6" style={{ fontFamily: "marudham", fontSize: "14px" }}>
          <div className="font-bold" style={{ fontFamily: "marudham", fontSize: "14px" }}>உறுப்பினரின் உறுதிமொழிச் சான்று</div>
        </div>
      </div>

      {/* Main content paragraph */}
      <div className="mb-8" style={{ fontFamily: "marudham", fontSize: "14px" }}>
        <p className="text-justify leading-relaxed" style={{ 
          fontFamily: "marudham", 
          fontSize: "14px", 
          lineHeight: "1.8",
          textAlign: "justify"
        }}>
         { `உறுப்பினர் எண் ${userData?.userInformation?.["உ_எண்"] } பெயர் ${userData?.userInformation?.["பெயர்"]} ஆகிய நான் முலதனக்கடன்
          தொகை ரூ.${userData?.loanDetails?.kccahBreakdown?.total?.["மொத்தம்"] || "N/A"} விண்ணப்பித்துள்ளேன். இதில் முலப்பொருள் வாங்க
          மற்றும் இதர செலவுகளுக்கு அனுமதிக்கப்படும் தொகை இரண்டும்
          சேர்த்து பொருக்கமாக அனுமதிக்குமாறு கேட்டுக் கொள்கிறேன்.`}
        </p>
      </div>

      {/* Details list */}
      <div className="mb-8" style={{ fontFamily: "marudham", fontSize: "14px" }}>
        <div className="space-y-3">
          <div className="flex" style={{ fontFamily: "marudham", fontSize: "14px" }}>
            <span className="w-8">1</span>
            <span className="w-32">உறுப்பினர் எண்</span>
            <span className="w-8">:</span>
            <span className="font-bold">{userData?.userInformation?.["உ_எண்"] }</span>
          </div>
          
          <div className="flex" style={{ fontFamily: "marudham", fontSize: "14px" }}>
            <span className="w-8">2</span>
            <span className="w-32">பெயர்</span>
            <span className="w-8">:</span>
            <span className="font-bold">{userData?.userInformation?.["பெயர்"]}</span>
          </div>
          
          <div className="flex" style={{ fontFamily: "marudham", fontSize: "14px" }}>
            <span className="w-8">3</span>
            <span className="w-32">கடன் எண்</span>
            <span className="w-8">:</span>
            <span></span>
          </div>
          
          <div className="flex" style={{ fontFamily: "marudham", fontSize: "14px" }}>
            <span className="w-8">4</span>
            <span className="w-32">கடன் பட்டுவாடா தேதி</span>
            <span className="w-8">:</span>
            <span className="font-bold"></span>
          </div>
          
          <div className="flex" style={{ fontFamily: "marudham", fontSize: "14px" }}>
            <span className="w-8">5</span>
            <span className="w-32">தொகை.</span>
            <span className="w-8">:</span>
            <span className="font-bold">₹ {userData?.loanDetails?.kccahBreakdown?.total?.["மொத்தம்"] || "N/A"}</span>
          </div>
          
          <div className="flex" style={{ fontFamily: "marudham", fontSize: "14px" }}>
            <span className="w-8">6</span>
            <span className="w-32">கடன் நோக்கிய காரியம்</span>
            <span className="w-8">:</span>
            <span className="font-bold">{userData?.loanDetails?.kccahBreakdown?.loanName || "N/A"}</span>
          </div>
          
          <div className="flex" style={{ fontFamily: "marudham", fontSize: "14px" }}>
            <span className="w-8">7</span>
            <span className="w-32">கடனின் வாய்ப்பு</span>
            <span className="w-8">:</span>
            <span>ஒரு ஆண்டு</span>
          </div>
        </div>
      </div>

      {/* Bottom paragraph */}
      <div className="mb-12" style={{ fontFamily: "marudham", fontSize: "14px" }}>
        <p className="text-justify leading-relaxed" style={{ 
          fontFamily: "marudham", 
          fontSize: "14px", 
          lineHeight: "1.8",
          textAlign: "justify"
        }}>
          மேலே தெரிவித்த விவரப்படி பட்டுவாடா பெற்று கடன் தொகையை நோக்கிய
          காரியத்திற்கே பயன்படுத்தினேன் என்று உறுதிகொடுகிறேன்
        </p>
      </div>

      {/* Signature section */}
      <div className="text-right mt-16" style={{ fontFamily: "marudham", fontSize: "14px" }}>
        <div className="font-bold" style={{ fontFamily: "marudham", fontSize: "14px" }}>
          கடன்தாரர் கையொப்பம்
        </div>
      </div>
    </div>
  )
}