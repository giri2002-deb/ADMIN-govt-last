"use client"
import KCCBreakdownTable from './KCCBreakdownTable'
interface MemberData {
  id: string
  serialNo: string
  memberName: string
  fatherName: string
  loanType: string
  amount: number
  selectedKccahLoan?: {
    கடன்_வகை: string
    விதை: number
    ரொக்கம்: number
    மொத்தம்: number
    dynamicUnits?: number
    திட்ட_அளவு?: string
    dynamicTotal?: number
  }
}

interface BreakdownRow {
  serialNo: number
  loanType: string
  members: number
  units: number
  otherExpenses: number
  rawMaterials: number
  totalAmount: number
  rowTotal: number
}

interface KCCBreakdownTableProps {
  members?: MemberData[] | null
}
export default function KCCDocumentDemo({ members }: KCCBreakdownTableProps) {
  
  const a=localStorage.getItem("kcc_resolutionNumber1")
  const b=localStorage.getItem("kccahmotham")
  const c=localStorage.getItem("kccahtamil")
   const d=localStorage.getItem("kccahmembers")
  return (
    <div className="w-full min-h-screen bg-white p-6 font-serif text-[12px] leading-snug">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-blue-700 font-bold text-sm">கூட்டுறவே!</span>
        <span className="text-blue-700 font-bold text-sm">நாட்டுயர்வு!!</span>
      </div>

      {/* Logo + Title */}
      <div className="flex flex-col items-center text-center mb-4">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mb-2 
                        bg-gradient-to-r from-yellow-400 via-green-400 to-blue-500">
          <span className="text-3xl">🤝</span>
        </div>

        <h1 className="font-bold text-sm mb-1">
          S.1374 மகுடஞ்சாவடி தொடக்க வேளாண்மை கூட்டுறவு கடன் சங்கம் <br></br>வரை.,
        </h1>
        <h2 className="text-blue-700 font-bold text-sm mb-2">
          மகுடஞ்சாவடி அஞ்சல், சங்ககிரி வட்டம், சேலம் மாவட்டம் - 637103
        </h2>

        <div className="w-full h-0.5 bg-red-600 mb-2"></div>

        <p className="text-xs mb-1">
          2025ம் வருடம் மே மாதம் 27ம் தேதி கூடிய S.1374 மகுடஞ்சாவடி தொடக்க வேளாண்மை கூட்டுறவு கடன் சங்க செயலாட்சியர் நடவடிக்கைகள்.
        </p>
        <p className="font-bold text-purple-700 text-xs">
          முன்னிலை: திருமதி.ராா.பிரியவதனி, கூட்டுறவு சார்பதிவாளர்/ செயலாட்சியர் அவர்கள்.
        </p>
      </div>

      {/* Two Column Box */}
      <div className="grid grid-cols-2 gap-2 border-2 border-purple-700 p-2 mb-4">
        {/* Left */}
        <div className="pr-2">
          <h3 className="font-bold text-center mb-2">பொருள்: {a}</h3>
         <p className="text-justify">{`நமது சங்க தீ.எண். ${a}.நாள்:
படி 27.5.2025 சேங்க்ஷன் செய்யப்பட்ட 
கடன் தொகை 
ரூ.${b} ( ${c} ) உறுப்பினர்களுக்கு 
விவசாய திட்டத்தின் கீழ் (கே.சி.சி) மூலதனக் அனுமதித்து 
மத்திய வங்கி கடன் கிளையில் பட்டுவாடா கோருதல் தொடர்பாக`}</p>
        </div>

        {/* Right */}
        <div className="pl-2 border-l-2 border-purple-700">
          <h3 className="font-bold text-center mb-2">தீர்மானம்: {a}</h3>
          <p className="text-justify">
            {`நமது சங்க தீ.எண். ${a},
            
            நாள்: 27.5.2025-ன் படி 
            
            சேங்க்ஷன் செய்யப்பட்ட 
            கடன் தொகைரூ.${b}
  ( ${c} ) ${d}
             
             
             உறுப்பினர்களுக்கு விவசாய காசுக்கடன் (KCC) திட்டத்தில் கீழ்க்கண்டவாறு
             
             
          உறுப்பினர்களுக்கு KCC நடைமுறை மூலதனக்கடன் வழங்க சங்கத்திற்கு அனுமதிக்கப் பட்ட காசுக்கடன் மனு .441/2023-2024/S: 31.03.2023 அனுமதிக்கப்பட்ட கடன் தொகை ரூ.10000000.00ல் 1977-2013. (2) 5 24.12.2021 5 இருந்து, நமது சங்க விவசாய உறுப்பினர்களுக்கு சேலம் மாவட்ட மத்திய கூட்டுறவு வங்கி ந.க. நடைமுறைகளின்படி அனுமதிக்கலாமாகவும், மூலதனக் கடனாக அனுமதிக்கப்பட்ட தொகையை சங்க (கே.சி.சி) கணக்கு எண்: 7164172625 முஜரா வழங்குமாறும், மேலும் மூலம் பட்டுவாடா அத்தொகையை சேலம் இணைப்பில் உள்ள சங்க உறுப்பினர்களின் சேமிப்பு கணக்கிற்கு வரவு வைக்குமாறும் மாவட்ட மத்திய கூட்டுறவு வங்கி மகுடஞ்சாவடி கிளை மேலாளர் அவர்களுக்கு சங்ககிரி வட்டார அலுவலக மேலாளர் 
             
             
             மூலம் கேட்டுக் கொள்ளலாமாகத் தீர்மானிக்கப்பட்டது.`}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="mb-4">
       <KCCBreakdownTable members={members} />
      </div>

      {/* Footer Notes */}
    <br>
    </br>
<br></br>
      {/* Signatures */}
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
