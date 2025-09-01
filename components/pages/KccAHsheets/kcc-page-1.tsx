import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import { calculateKCCTotals } from "@/utils/kcc-utils"
import { getAmountInTamilWords } from "@/utils/tamil-numbers"

export interface KCCMember {
  id: string
  serialNo: string
  memberName: string
  category: string
  landArea: number
  farmerType: "MF" | "SF" | "OF"
  classification: "SC" | "ST" | "BC" | "Others" | "ALL"
  aadhaarNo: string
  accountNo: string
  amount: number
  date: string
  fatherName?: string
  phoneNo?: string
}

interface EnhancedKCCMember extends KCCMember {
  selectedCrops?: Array<{
    crop: {
      name_of_crop?: string
      name?: string
      crop_code?: number

      motham?: number
      poochi_marundhu?: number
      rokkam?: number
      thozhu_uram?: number
      uram_1?: number
      uram_2?: number
      vithai?: number
    }
    acres: number
    eligibleAmount: number
    breakdown?: {
      cents?: number
      motham?: number
      rokkam?: number
      uram_1?: number
      uram_2?: number
      vithai?: number
      thozhu_uram?: number
      poochi_marundhu?: number
      perCentRate?: Record<string, number>
    }
  }>
  selectedKccahLoan?: {
    id: number
    breakdown?: {
      total?: {
        விதை?: number
        மொத்தம்?: number
        ரொக்கம்?: number
      }
      perUnit?: {
        விதை?: number
        ரொக்கம்?: number
      }
    }
    dynamicPlan?: string
    dynamicTotal?: number
    dynamicUnits?: number
    விதை?: number
    dynamicrokkam?: number
    மொத்தம்?: number
    ரொக்கம்?: number
    கடன்_வகை?: string
    திட்ட_அளவு?: string
  }
  principleAmount?: number
  totalEligibleAmount?: number
  documents?: {
    pan: any
    ration: any
    aadhaar: any
    userPhoto: any
    friendPhoto: any
  }
  guarantorSerial?: string
  guarantorName?: string
}

interface KCCData {
  members: EnhancedKCCMember[]
  settings: {
    organizationName: string
    address: string
    date: string
    meetingDetails: string
    accountNumber: string
    resolutionNumber: string
  }
}

interface KCCPage1Props {
  data: KCCData
  selectedUsers?: EnhancedKCCMember[]
  isEditing: boolean
  onMemberEdit: (index: number, field: keyof EnhancedKCCMember, value: any) => void
  onSettingsEdit?: (field: keyof KCCData["settings"], value: any) => void
  onAddMember: () => void
  onDeleteMember: (index: number) => void
}


export function KCCPage1({
  data,
  selectedUsers = [],
  isEditing,
  onMemberEdit,
  onSettingsEdit,
  onAddMember,
  onDeleteMember,
}: KCCPage1Props) {
  const membersToRender = data.members
  const totals = calculateKCCTotals(membersToRender as any)

  const [resolutionNumber1, setResolutionNumber1] = useState<string>(data.settings.resolutionNumber || "135")
useEffect(() => {
  if (membersToRender && membersToRender.length > 0) {
    // Pick only loan details
    const loanDetails = membersToRender.map((member) => ({
      id: member.id,
      memberName: member.memberName,
      serialNo: member.serialNo,
      loan: member.selectedKccahLoan || {}
    }));

    localStorage.setItem("kccAHSystemData", JSON.stringify(loanDetails));
    console.log("Saved Loan Details:", loanDetails);
  }
}, [membersToRender]);


console.log(localStorage.getItem("KccAHSystemData"))
  useEffect(() => {
    try {
      const saved = localStorage.getItem("kcc_resolutionNumber1")
      if (saved) setResolutionNumber1(saved)
    } catch {}
  }, [])

  useEffect(() => {
    try {
      if (resolutionNumber1) localStorage.setItem("kcc_resolutionNumber1", resolutionNumber1)
    } catch {}
  }, [resolutionNumber1])

  const EditableCell = ({
    value,
    onEdit,
    type = "text",
  }: {
    value: any
    onEdit: (val: any) => void
    type?: string
  }) => {
    if (!isEditing) return <span>{value}</span>

    return (
      <input
        type={type}
        value={value}
        onChange={(e) =>
          onEdit(
            type === "number" ? Number((e.target as HTMLInputElement).value) : (e.target as HTMLInputElement).value,
          )
        }
        className="w-full p-1 text-xs border rounded"
      />
    )
  }

  // Calculate totals
  const totalVithai = membersToRender.reduce((sum, member) => sum + (member.selectedKccahLoan?.breakdown?.total?.விதை || 0), 0)
  const totalRokkam = membersToRender.reduce((sum, member) => sum + (member.selectedKccahLoan?.breakdown?.total?.ரொக்கம் || 0), 0)
  const totalMotham = membersToRender.reduce((sum, member) => sum + (member.selectedKccahLoan?.breakdown?.total?.மொத்தம் || 0), 0)
localStorage.setItem("kccahmotham", totalMotham.toString())
localStorage.setItem("kccahtamil",getAmountInTamilWords(totalMotham))
localStorage.setItem("kccahmembers",(membersToRender.length).toString())
 useEffect(() => {
    
    console.log("ogs"+membersToRender[0])
  }, [selectedUsers])
  return (
    <div className="w-[950px] h-[2000px] bg-white p-6 mx-auto text-black" style={{ fontSize: "12px", fontFamily: "Arial, sans-serif" }}>
      {/* Header Section */}
      <div className="flex justify-between items-start mb-4">
        <div className="text-blue-600 font-bold text-sm">கூட்டுறவே!</div>
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 relative mb-2">
            <div className="w-full h-full rounded-full bg-gradient-to-r from-orange-500 via-white to-green-600 flex items-center justify-center border-2 border-gray-300">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                <div className="text-lg">🤝</div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-blue-600 font-bold text-sm">நாட்டுயர்வு!!</div>
      </div>

      {/* Title Section */}
      <div className="text-center mb-4">
        <h1 className="font-bold text-sm mb-2">
        S.1374 மகுடஞ்சாவடி தொடக்க வேளாண்மை கூட்டுறவு கடன் சங்கம்
        <h1>வரை.,</h1>
        </h1>
        
        

        <h2 className="text-blue-600 font-bold text-sm mb-2">
        மகுடஞ்சாவடிஅஞ்சல், சங்ககிரி வட்டம், சேலம் மாவட்டம் - 637103
        </h2>
        <div className="border-b-2 border-red-600 mb-2"></div>
        <p className="text-xs mb-2" style={{ lineHeight: "1.4" }}>
         2025ம் வருடம் மே மாதம் 27ந் தேதி கூடிய S.1374 மகுடஞ்சாவடி தொடக்க வேளாண்மை கூட்டுறவு கடன் சங்க செயலாட்சியர் நடவடிக்கைகள்.
        </p>
        <p className="text-xs mb-4" style={{ lineHeight: "1.4" }}>
         முன்னிலை: திருமதி.இரா.பிரியவதனி, கூட்டுறவு சார்பதிவாளர்/ செயலாட்சியர் அவர்கள்.
        </p>
      </div>

      {/* Resolution Section */}
      <div className="flex mb-4">
        <div className="w-1/2 pr-2">
          <div className="border border-black p-3 text-xs">
            <div className="flex items-center mb-2">
              <span className="font-bold">பொருள் {resolutionNumber1}</span>
            </div>
            <p style={{ lineHeight: "1.4" }}>
             நமது சங்க உறுப்பினர்களுக்கு விவசாய கடன் திட்டத்தின் கீழ் (கே.சி.சி) மூலதனக் கடன் அனுமதிப்பது தொடர்பாக.
             <br></br>
             <br></br>
             <br></br></p>
          </div>
        </div>
        <div className="w-1/2 pl-2">
          <div className="border border-black p-3 text-xs">
           <div className="font-bold text-red-600 mb-2 text-sm">
            தீர்மானம்:{" "}
            {isEditing ? (
              <input
                type="text"
                value={resolutionNumber1}
                onChange={(e) => {
                  const val = (e.target as HTMLInputElement).value
                  setResolutionNumber1(val)
                  onSettingsEdit && onSettingsEdit("resolutionNumber", val)
                }}
                className="w-16 p-1 border rounded text-center"
              />
            ) : (
              resolutionNumber1
            )}
          </div>
            <p style={{ lineHeight: "1.4" }}>
              நமது சங்க உறுப்பினர்களுக்கு கே.சி.சி கடன் திட்டத்தின் கீழ் கால்நடை பராமரிப்பிற்கு நடைமுறை மூலதனக்கடன் கீழ்க்கண்ட விவரப்படி கடன் அனுமதிக்கலாமாகத் தீர்மானிக்கப்பட்டது.
              </p>
              <br></br>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="border border-black mb-4">
  <table className="w-full border-collapse text-xs">
    <thead>
      <tr>
        <th
          rowSpan={2}
          className="border border-black p-1 text-center"
          style={{ width: "30px" }}
        >
          வ.<br />எண்
        </th>
        <th
          rowSpan={2}
          className="border border-black p-1 text-center"
          style={{ width: "30px" }}
        >
          உ.<br />எண்
        </th>
        <th
          rowSpan={2}
          className="border border-black p-1 text-center"
          style={{ width: "140px" }}
        >
          கடன்தாரர் பெயர்
        </th>
        <th
          rowSpan={2}
          className="border border-black p-1 text-center"
          style={{ width: "90px" }}
        >
          கடன் வகை
        </th>
        <th
          rowSpan={2}
          className="border border-black p-1 text-center"
          style={{ width: "60px" }}
        >
          திட்ட<br />அலகு
        </th>
        <th
          rowSpan={2}
          className="border border-black p-1 text-center"
          style={{ width: "80px" }}
        >
          கடன் கோரும்<br />அலகு
        </th>
        <th
          rowSpan={2}
          className="border border-black p-1 text-center"
          style={{ width: "90px" }}
        >
          இதர<br />செலவுகள்<br />
        </th>
        <th
          rowSpan={2}
          className="border border-black p-1 text-center"
          style={{ width: "90px" }}
        >
          மூல<br />பொருட்கள்<br />
        </th>
        <th
          rowSpan={2}
          className="border border-black p-1 text-center"
          style={{ width: "120px" }}
        >
          மொத்த நடைமுறை<br />மூலதன<br />தொகை
        </th>
        <th
          rowSpan={2}
          className="border border-black p-1 text-center"
          style={{ width: "140px" }}
        >
          பிணையதாரர்<br />உ.எண்&nbsp;&nbsp;&nbsp;&nbsp;பெயர்
        </th>
        {isEditing && (
          <th className="border border-black p-1 text-center print:hidden" style={{ width: "40px" }}>
            செயல்
          </th>
        )}
      </tr>
    </thead>

    <tbody>
      {membersToRender.map((member, index) => {
        const loan = member.selectedKccahLoan || {} as EnhancedKCCMember["selectedKccahLoan"];
      
        return (
          <tr key={member.id}>
            <td className="border border-black p-1 text-center">{index + 1}</td>
            <td className="border border-black p-1 text-center">{selectedUsers[index]?.serialNo || member.serialNo}</td>
            <td className="border border-black p-1">{member.memberName}</td>
            <td className="border border-black p-1 text-center">{loan?.கடன்_வகை || member.category}</td>
            <td className="border border-black p-1 text-center">{loan?.திட்ட_அளவு || "—"}</td>
            <td className="border border-black p-1 text-center">{loan?.dynamicUnits || 0}</td>
            <td className="border border-black p-1 text-right">{(( loan?.விதை || 0) * (loan?.dynamicUnits || 0)).toLocaleString()}
</td>
            <td className="border border-black p-1 text-right">{((loan?.ரொக்கம் || 0) * (loan?.dynamicUnits || 0)).toLocaleString()}</td>
            <td className="border border-black p-1 text-right">{((loan?.மொத்தம் || 0) * (loan?.dynamicUnits || 0)).toLocaleString()}</td>
            <td className="border border-purple-600 p-2 text-center align-top text-xs">
            { (
              <>
                {member.friendDetails?.hasData ? member.friendDetails.uNumber : ""}
                {member.goldDetails?.hasGold ? "jl" : ""}
                {member.ownProperty?.hasPropertyData ? "op" : ""}
              </>
            ) 
            }&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                { (
              
              <>
                {member.friendDetails?.hasData ? member.friendDetails.name : ""}
                {member.goldDetails?.hasGold ? "jl" : ""}
                {member.ownProperty?.hasPropertyData ? "op" : ""}
              </> 
            
            ) 
            }
          </td>
            {isEditing && (
              <td className="border border-black p-1 text-center print:hidden">
                <Button
                  onClick={() => onDeleteMember(index)}
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-red-600 hover:bg-red-100"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </td>
            )}
          </tr>
        );
      })}

      {/* Totals Row */}
      <tr className="bg-red-100">
        <td colSpan={6} className="border border-black p-1 text-center font-bold text-red-600">
          ஆக மொத்தம்
        </td>
        <td className="border border-black p-1 text-right font-bold text-red-600">
          {totalVithai.toLocaleString()}
        </td>
        <td className="border border-black p-1 text-right font-bold text-red-600">
          {totalRokkam.toLocaleString()}
        </td>
        <td className="border border-black p-1 text-right font-bold text-red-600">
          {totalMotham.toLocaleString()}
        </td>
        <td className="border border-black p-1"></td>
        {isEditing && <td className="border border-black p-1 print:hidden"></td>}
      </tr>
    </tbody>
  </table>
</div>
 <p className="font-bold text-blue-600 text-lg">₹ {totalMotham.toLocaleString()}.00</p>
 <div className="font-bold text-left text-red-600 text-sm inline-block">
    ₹ ({getAmountInTamilWords(totalMotham)})
  </div>
      {/* Total Amount */}
      
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