"use client"
import KCCBreakdownTable from "./KCCBreakdownTable"

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
export default function KCCPage3({ members }: KCCBreakdownTableProps) {
  const a=localStorage.getItem("kcc_resolutionNumber1")
  const b=localStorage.getItem("kccahmotham")
  const c=localStorage.getItem("kccahtamil")
   const d=localStorage.getItem("kccahmembers")
  return (
    <div className="w-full min-h-screen bg-white p-6 font-serif text-[12px] leading-snug">
      {/* Header Paragraphs */}
      <div className="mb-4 space-y-2 text-justify">
        <p className="text-center font-bold">சரக மேற்பார்வையாளர் பரிந்துரை</p>
        <p>
         &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; இக்கடன் விண்ணப்பத்தில் கடன் கோரும் உறுப்பினர்களின் நில உடமை பற்றிய ஆவணங்கள் சாரிபார்க்கப்பட்டது சரியாக உள்ளது.
        </p>
        <p>
           &nbsp; &nbsp; &nbsp; &nbsp;உறுப்பினர்கள் கோரும் கடன் தொகைக்கு ஏற்ப 
           பங்கு தொகை வசூல் செய்யப்பட்டுள்ளது.
        </p>
        <p>
         &nbsp; &nbsp; &nbsp; &nbsp;தனிநபர் பெறும் உச்ச கடன் அளவிற்கு உட்பட்டு பட்டுவாடா கோரப்பட்டுள்ளது.
        </p>
        <p>
         எனவே சங்க தீர்மான எண்:135&136 
         நாள் 2025ம் ஆண்டு மே மாதம் 27ந்
          தேதியின்படி கோரியுள்ளவாறு கீழே 
          கண்ட விபரப்படி முஜரா மூலம் பட்டுவாடா செய்ய பரிந்துரை செய்கிறேன்.
        </p>
      </div>

      {/* Table */}
       <div className="mb-4">
             <KCCBreakdownTable members={members}  />
           </div>

      {/* Footer Notes */}
      <div className="mt-2 text-justify text-xs space-y-1">
        
        <p>
         உறுப்பினர்களின் நடைமுறை மூலதனக்கடன் கே.சி.சி. நடப்பு கணக்கு எண்:716417262 முஜரா மூலம் பட்டுவாடா தொகை:{b}
        </p>
      </div>
     

      {/* Signature Section */}
      <div className="mt-10 space-y-8 text-xs">
        <div className="text-right font-bold">சரக மேற்பார்வையாளர்</div>
<br></br>
<br></br>
        <div>
          <p className="text-center font-bold">வட்டார கள மேலாளர் பரிந்துரை</p><br></br>
 <br></br>        <p className="text-justify" style={{ textIndent: "40px" }}>
  {`சரக மேற்பார்வையாளர் அவர்களின் 
  பாரிந்துரையின் அடிப்படையில் S.1374 
  மகுடஞ்சாவடி தொடக்க வேளாண்மை கூட்டுறவு கடன் சங்க 
  தீ.எண் 135&136 நாள்: 2025ம் ஆண்டு மாதம் 27ந் தேதியின்படி 
  K.C.C நடைமுறை மூலதன கடன் திட்டத்தின் கீழ்
  ரூ.${b} (${c}) 
  சங்கத்திற்கு முஜரா மூலம் பட்டுவாடா செய்து கொடுக்க பரிந்துரை செய்கிறேன்.`}
</p>

        </div>
        <br></br>
<div className="text-right font-bold mt-6">
  <p>கள மேலாளர்&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
  <p>சங்ககிரி வட்டார அலுவலகம்.</p>
</div>

      </div>
    </div>
  )
}
