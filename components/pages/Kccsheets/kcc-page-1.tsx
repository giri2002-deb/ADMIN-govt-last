
"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import { calculateKCCTotals } from "@/utils/kcc-utils"
import { getAmountInTamilWords } from "@/utils/tamil-numbers"

export interface KCCMember {
  id: string
  serialNo: string
  memberName: string
  category:
   string
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
  documents?: {
    pan: any
    ration: any
    aadhaar: any
    userPhoto: any
    friendPhoto: any
  }
  formSections?: {
    documents: boolean
    friendImage: boolean
    goldDetails: boolean
    landDetails: boolean
    loanDetails: boolean
  }
  friendDetails?: {
    uNumber: any
    acre: string
    name: string
    phone: string
    address: string
    hasData: boolean
  }
  goldDetails?: {
    items: Array<any>
    hasGold: boolean
    totalItems: number
    totalValue: number
    goldSummary: any
  }
  landParcels?: Array<any>
  ownProperty?: {
    value: number
    description: string
    hasProperty: boolean
    hasPropertyData: boolean
    mortgageDetails: any
  }
}

interface KCCData {
  members: EnhancedKCCMember[]
  cropDetails: {
    cropName: string
    extent: number
    expenses: {
      thozhu_uram?: number
      uram_1?: number
      uram_2?: number
      poochi_marundhu?: number
      vithai?: number
    }
    total: number
    cropsWithAmounts?: string
  }
  financial: {
    transitAccount: number
    loanComponents: any
    total: number
  }
  friendDetails: any
  goldDetails: any
  ownProperty: any
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

  const [resolutionNumber, setResolutionNumber] = useState<string>(data.settings.resolutionNumber || "151")

  useEffect(() => {
    try {
      const saved = localStorage.getItem("kcc_resolutionNumber")
      if (saved) setResolutionNumber(saved)
    } catch {}
  }, [])

  useEffect(() => {
    try {
      if (resolutionNumber) localStorage.setItem("kcc_resolutionNumber", resolutionNumber)
    } catch {}
  }, [resolutionNumber])

  const getMemberCropsWithDetails = (member: EnhancedKCCMember) => {
    if (!member.selectedCrops || member.selectedCrops.length === 0) {
      return [
        {
          ...member,
          cropName: member.category || "Unknown",
          acres: member.landArea || 0,
          eligibleAmount: member.amount || 0,
          cropExpenses: {
            thozhu_uram: 0,
            uram_1: 0,
            uram_2: 0,
            poochi_marundhu: 0,
            vithai: 0,
            rokkam: 0,
          },
        },
      ]
    }

    return member.selectedCrops.map((crop) => ({
      ...member,
      cropName: crop.crop.name_of_crop || crop.crop.name || "Unknown Crop",
      acres: crop.acres,
      eligibleAmount: crop.eligibleAmount || 0,
      cropExpenses: {
        thozhu_uram: crop.breakdown?.thozhu_uram || 0,
        uram_1: crop.breakdown?.uram_1 || 0,
        uram_2: crop.breakdown?.uram_2 || 0,
        poochi_marundhu: crop.breakdown?.poochi_marundhu || 0,
        vithai: crop.breakdown?.vithai || 0,
        rokkam: crop.breakdown?.rokkam || 0,
      },
    }))
  }

const getCropSummaries = () => {
  const cropMap = new Map<
    string,
    {
      count: number
      totalExtent: number
      totalAmount: number
      expenses: {
        thozhu_uram: number
        uram: number
        poochi_marundhu: number
        vithai: number
        rokkam: number
      }
    }
  >()

  membersToRender.forEach((member) => {
    const firstCrop = member.selectedCrops?.[0]
    if (firstCrop) {
      const cropName = firstCrop.crop.name_of_crop || firstCrop.crop.name || "Unknown Crop"
      const current = cropMap.get(cropName) || {
        count: 0,
        totalExtent: 0,
        totalAmount: 0,
        expenses: {
          thozhu_uram: 0,
          uram: 0,
          poochi_marundhu: 0,
          vithai: 0,
          rokkam: 0,
        },
      }

      localStorage.setItem("memberslength", membersToRender.length.toString())

      // Calculate member's total from crop breakdown
      const memberCropTotal =
        member.selectedCrops?.reduce((s, crop) => {
          const b = crop.breakdown || {}
          return (
            s +
            ((b.thozhu_uram || 0) +
              (b.uram_1 || 0) +
              (b.uram_2 || 0) +
              (b.rokkam || 0) +
              (b.poochi_marundhu || 0) +
              (b.vithai || 0))
          )
        }, 0) || 0

      cropMap.set(cropName, {
        count: current.count + 1,
        totalExtent: current.totalExtent + firstCrop.acres,
        totalAmount: current.totalAmount + memberCropTotal,
        expenses: {
          thozhu_uram: current.expenses.thozhu_uram + (firstCrop.breakdown?.thozhu_uram || 0),
          uram: current.expenses.uram + ((firstCrop.breakdown?.uram_1 || 0) + (firstCrop.breakdown?.uram_2 || 0)),
          poochi_marundhu: current.expenses.poochi_marundhu + (firstCrop.breakdown?.poochi_marundhu || 0),
          vithai: current.expenses.vithai + (firstCrop.breakdown?.vithai || 0),
          rokkam: current.expenses.rokkam + (firstCrop.breakdown?.rokkam || 0),
        },
      })
    }

    member.selectedCrops?.forEach((crop, index) => {
      if (index === 0) return

      const cropName = crop.crop.name_of_crop || crop.crop.name || "Unknown Crop"
      const current = cropMap.get(cropName) || {
        count: 0,
        totalExtent: 0,
        totalAmount: 0,
        expenses: {
          thozhu_uram: 0,
          uram: 0,
          poochi_marundhu: 0,
          vithai: 0,
          rokkam: 0,
        },
      }

      cropMap.set(cropName, {
        count: current.count,
        totalExtent: current.totalExtent + crop.acres,
        totalAmount: current.totalAmount,
        expenses: {
          thozhu_uram: current.expenses.thozhu_uram + (crop.breakdown?.thozhu_uram || 0),
          uram: current.expenses.uram + ((crop.breakdown?.uram_1 || 0) + (crop.breakdown?.uram_2 || 0)),
          poochi_marundhu: current.expenses.poochi_marundhu + (crop.breakdown?.poochi_marundhu || 0),
          vithai: current.expenses.vithai + (crop.breakdown?.vithai || 0),
          rokkam: current.expenses.rokkam + (crop.breakdown?.rokkam || 0),
        },
      })
    })
  })

  return Array.from(cropMap.entries()).map(([name, data]) => ({
    name,
    count: data.count,
    totalExtent: data.totalExtent,
    totalAmount: data.totalAmount,
    expenses: data.expenses,
     totalRokkam:data.expenses.rokkam 
  }))
}


  const cropSummaries = getCropSummaries()

  // Use consistent total calculation based on crop breakdown
  const grandTotal = membersToRender.reduce((sum, member) => {
    const memberCropTotal =
      member.selectedCrops?.reduce((s, crop) => {
        const b = crop.breakdown || {}
        return (
          s +
          ((b.thozhu_uram || 0) +
            (b.uram_1 || 0) +
            
            (b.rokkam || 0) +
            (b.poochi_marundhu || 0) +
            (b.vithai || 0))
        )
      }, 0) || 0
    return sum + memberCropTotal
  }, 0)

  const totalLandArea = membersToRender.reduce((sum, member) => {
    return sum + (member.selectedCrops?.reduce((cropSum, crop) => cropSum + crop.acres, 0) || 0)
  }, 0)

  const totalThozhuUram = membersToRender.reduce((sum, member) => {
    return sum + (member.selectedCrops?.reduce((cropSum, crop) => cropSum + (crop.breakdown?.thozhu_uram || 0), 0) || 0)
  }, 0)

  const totalUram = membersToRender.reduce((sum, member) => {
    return (
      sum +
      (member.selectedCrops?.reduce(
        (cropSum, crop) => cropSum + ((crop.breakdown?.uram_1 || 0) + (crop.breakdown?.uram_2 || 0)),
        0,
      ) || 0)
    )
  }, 0)

  const totalRokkam = membersToRender.reduce((sum, member) => {
    return sum + (member.selectedCrops?.reduce((cropSum, crop) => cropSum + (crop.breakdown?.rokkam || 0), 0) || 0)
  }, 0)
localStorage.setItem("totalRokkam", totalRokkam.toString());
  const totalPoochiMarundhu = membersToRender.reduce((sum, member) => {
    return (
      sum + (member.selectedCrops?.reduce((cropSum, crop) => cropSum + (crop.breakdown?.poochi_marundhu || 0), 0) || 0)
    )
  }, 0)

  const totalVithai = membersToRender.reduce((sum, member) => {
    return sum + (member.selectedCrops?.reduce((cropSum, crop) => cropSum + (crop.breakdown?.vithai || 0), 0) || 0)
  }, 0)

  // This should now match grandTotal
  const grandCropMotham = grandTotal
const a=getAmountInTamilWords(grandTotal);
localStorage.setItem("grandCropMothamInTamil", a);
localStorage.setItem("grandCropMotham", grandTotal.toString());

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

  const tableRows = membersToRender.flatMap((member, memberIndex) => {
    const cropsWithDetails = getMemberCropsWithDetails(member)
    const showSubtotal = (member.selectedCrops?.length || 0) > 1

    const perCropRows = cropsWithDetails.map((cropDetails, cropIndex) => {
      const isFirstCrop = cropIndex === 0
      const cropTotal =
        (cropDetails.cropExpenses.thozhu_uram || 0) +
        (cropDetails.cropExpenses.uram_1 || 0) +
       
        (cropDetails.cropExpenses.rokkam || 0) +
        (cropDetails.cropExpenses.poochi_marundhu || 0) +
        (cropDetails.cropExpenses.vithai || 0)

      return (
        <tr key={`${member.id}-${cropIndex}`} className="border-b border-purple-600 hover:bg-gray-50">
          <td className="border border-purple-600 p-2 text-center align-top text-xs">
            {isFirstCrop ? member.serialNo : ""}
          </td>
          <td className="border border-purple-600 p-2 text-center align-top text-xs">
            {isFirstCrop ? (
              <EditableCell
                value={selectedUsers[memberIndex]?.serialNo || member.serialNo}
                type="text"
                onEdit={(val) => onMemberEdit(memberIndex, "serialNo", val)}
              />
            ) : (
              ""
            )}
          </td>
          <td className="border border-purple-600 p-2 align-top text-xs">
            {isFirstCrop ? (
              <EditableCell value={member.memberName} onEdit={(val) => onMemberEdit(memberIndex, "memberName", val)} />
            ) : (
              ""
            )}
          </td>
          <td className="border border-purple-600 p-2 text-center align-top text-xs">{cropDetails.cropName}</td>
          <td className="border border-purple-600 p-2 text-center align-top text-xs">{cropDetails.acres.toFixed(2)}</td>
          <td className="border border-purple-600 p-2 text-right align-top text-xs">
           {cropDetails.cropExpenses.rokkam.toLocaleString("en-IN")}
          </td>
          <td className="border border-purple-600 p-2 text-right align-top text-xs">
            {cropDetails.cropExpenses.thozhu_uram.toLocaleString("en-IN")}
          </td>
          <td className="border border-purple-600 p-2 text-right align-top text-xs">
            { cropDetails.cropExpenses.uram_1.toLocaleString("en-IN")}
          </td>
          <td className="border border-purple-600 p-2 text-right align-top text-xs">
            {cropDetails.cropExpenses.poochi_marundhu.toLocaleString("en-IN")}
          </td>
          <td className="border border-purple-600 p-2 text-right align-top text-xs">
            {cropDetails.cropExpenses.vithai.toLocaleString("en-IN")}
          </td>
          <td className="border border-purple-600 p-2 text-right align-top font-medium text-xs">
            {cropTotal.toLocaleString("en-IN")}
          </td>
          <td className="border border-purple-600 p-2 text-center align-top text-xs">
            {isFirstCrop ? (
              <>
                {member.friendDetails?.hasData ? member.friendDetails.uNumber : ""}
                {member.goldDetails?.hasGold ? "jl" : ""}
                {member.ownProperty?.hasPropertyData ? "op" : ""}

              </>
            ) : (
              ""
            )}
          </td>
          <td className="border border-purple-600 p-2 align-top text-xs">
            {isFirstCrop ? (
              <>
                {member.friendDetails?.hasData ? member.friendDetails.name : ""}
                {member.goldDetails?.hasGold ? "jl" : ""}
                {member.ownProperty?.hasPropertyData ? "op" : ""}
              </> 
            ) : (
              ""
            )}
          </td>
          {isEditing && isFirstCrop && (
            <td className="border border-purple-600 p-2 text-center align-top print:hidden">
              <Button
                onClick={() => onDeleteMember(memberIndex)}
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-red-600 hover:bg-red-100"
                aria-label={`Delete member ${member.memberName}`}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </td>
          )}
        </tr>
      )
    })

    // Rest of the subtotal logic remains the same...
    const memberTotals = cropsWithDetails.reduce(
      (acc, c) => {
        const uram = (c.cropExpenses?.uram_1 || 0) + (c.cropExpenses?.uram_2 || 0)
        const cropTotal =
          (c.cropExpenses?.thozhu_uram || 0) +
          (c.cropExpenses?.thozhu_uram)+
          (c.cropExpenses?.rokkam || 0) +
          (c.cropExpenses?.poochi_marundhu || 0) +
          (c.cropExpenses?.vithai || 0)
        return {
          acres: acc.acres + (c.acres || 0),
          thozhu: acc.uram+(c.cropExpenses?.thozhu_uram || 0),
          uram: acc.uram+(c.cropExpenses?.thozhu_uram || 0),
          rokkam: acc.rokkam + (c.cropExpenses?.rokkam || 0),
          poochi: acc.poochi + (c.cropExpenses?.poochi_marundhu || 0),
          vithai: acc.vithai + (c.cropExpenses?.vithai || 0),
          total: acc.total + cropTotal,
        }
      },
      { acres: 0, thozhu: 0, uram: 0, rokkam: 0, poochi: 0, vithai: 0, total: 0 },
    )

    const subtotalRow = (
      <tr key={`${member.id}-subtotal`} className="bg-gray-100 font-medium">
        <td className="border border-purple-600 p-2 text-center align-top"></td>
        <td className="border border-purple-600 p-2 text-center align-top"></td>
        <td className="border border-purple-600 p-2 align-top text-red-600 text-xs">மொத்தம்</td>
        <td className="border border-purple-600 p-2 text-center align-top"></td>
        <td className="border border-purple-600 p-2 text-center align-top font-semibold text-xs">
          {memberTotals.acres.toFixed(2)}
        </td>
        <td className="border border-purple-600 p-2 text-right align-top font-semibold text-xs">
          {memberTotals.rokkam.toLocaleString("en-IN")}
          
        </td>
        <td className="border border-purple-600 p-2 text-right align-top font-semibold text-xs">
          {memberTotals.uram.toLocaleString("en-IN")}
        </td>
        <td className="border border-purple-600 p-2 text-right align-top font-semibold text-xs">
          {memberTotals.uram.toLocaleString("en-IN")}
        </td>
        <td className="border border-purple-600 p-2 text-right align-top font-semibold text-xs">
          {memberTotals.poochi.toLocaleString("en-IN")}
        </td>
        <td className="border border-purple-600 p-2 text-right align-top font-semibold text-xs">
          {memberTotals.vithai.toLocaleString("en-IN")}
        </td>
        <td className="border border-purple-600 p-2 text-right align-top font-semibold text-xs">
          {memberTotals.total.toLocaleString("en-IN")}
        </td>
        <td className="border border-purple-600 p-2 text-center align-top"></td>
        <td className="border border-purple-600 p-2 align-top"></td>
        {isEditing && <td className="border border-purple-600 p-2 text-center align-top print:hidden"></td>}
      </tr>
    )

    return showSubtotal ? [...perCropRows, subtotalRow] : perCropRows
  })

  return (
    <div className="w-[1000px] h-[2000px] bg-white p-6 mx-auto" style={{ fontSize: "11px" }}>
      {/* Header Section - Matching the image exactly */}
      <div className="flex justify-between items-start mb-4">
        <div className="text-blue-600 font-bold text-sm">கூட்டுறவே!</div>
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-400 via-green-500 to-blue-500 rounded-full flex items-center justify-center mb-2">
            <div className="text-white text-2xl">🤝</div>
          </div>
        </div>
        <div className="text-blue-600 font-bold text-sm">நாட்டுயர்வு!!</div>
      </div>

      {/* Organization Details */}
      <div className="text-center mb-4">
        <h1 className="text-base font-bold mb-2">S.1374 மகுடஞ்சாவடி தொடக்க வேளாண்மை கூட்டுறவு கடன்</h1>
        <h1 className="text-base font-bold mb-2">சங்கம் வரை.,</h1>
        <h3 className="text-sm font-semibold text-blue-600 mb-2"></h3>
        <h3 className="text-sm font-semibold text-blue-600 mb-2">
         மகுடஞ்சாவடிஅஞ்சல், சங்ககிரி வட்டம், சேலம் மாவட்டம் - 637103
        </h3>
        <div className="border-b-2 border-red-600 mb-2" />
        <p className="text-xs mb-1">2025ம் வருடம் ஜூலை மாதம் ந் தேதி கூடிய S.1374 மகுடஞ்சாவடி தொடக்க</p>
        <p className="text-xs mb-1">வேளாண்மை கூட்டுறவு கடன் சங்க செயலாட்சியர் நடவடிக்கைகள்.</p>
        <p className="text-xs text-blue-600 mt-2">
         முன்னிலை: திருமதி.இரா.பிரியவதனி, கூட்டுறவு சார்பதிவாளர்/ செயலாட்சியர் அவர்கள்.
        </p>
      </div>

      {/* Two Column Section */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-left">
          <div className="font-bold text-red-600 mb-2 text-sm">பொருள்: {resolutionNumber}</div>
          <div className="text-xs leading-tight">
            S.1374 மகுடஞ்சாவடி தொடக்க வேளாண்மை கூட்டுறவு கடன் சங்கம் கீழ்க்கண்ட சங்க உறுப்பினர்களுக்கு விவசாய காசுக்கடன் திட்டத்தின் கீழ் கடன் அனுமதித்தல் தொடர்பாக.
          </div>
        </div>
        <div className="text-left">
          <div className="font-bold text-red-600 mb-2 text-sm">
            தீர்மானம்:{" "}
            {isEditing ? (
              <input
                type="text"
                value={resolutionNumber}
                onChange={(e) => {
                  const val = (e.target as HTMLInputElement).value
                  setResolutionNumber(val)
                  onSettingsEdit && onSettingsEdit("resolutionNumber", val)
                }}
                className="w-16 p-1 border rounded text-center"
              />
            ) : (
              resolutionNumber
            )}
          </div>
          <div className="text-xs leading-tight">
          S.1374 மகுடஞ்சாவடி தொடக்க வேளாண்மைக் கூட்டுறவு கடன் சங்கத்தின் கீழ்க்கண்ட உறுப்பினர்களுக்கு விவசாய காசுக் கடன் திட்டத்தின் கீழ் விவசாய காசுக்கடன் அனுமதிக்கலாமாகத் தீர்மானிக்கப் பட்டது.
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="mb-4 print:hidden">
          <Button onClick={onAddMember} variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            உறுப்பினர் சேர்க்க ({data.members.length} மொத்தம்)
          </Button>
        </div>
      )}

      {/* Main Table */}
      <div className="border-2 border-purple-600 mb-4">
        <table className="w-full text-xs border-collapse table-fixed">
          <thead>
    <tr style={{ backgroundColor: "#f9fafb" }}>
      <th
        rowSpan={2}
        style={{
          border: "1px solid #9333ea",
          padding: "4px",
          width: "60px",
          textAlign: "center",
          verticalAlign: "middle",
          fontSize: "0.75rem",
        }}
      >
        வ.<br />எண்
      </th>
     
      <th
        rowSpan={2}
        style={{
          border: "1px solid #9333ea",
          padding: "4px",
          width: "60px",
          textAlign: "center",
          verticalAlign: "middle",
          fontSize: "0.75rem",
        }}
      >
        உ.<br />எண்
      </th>
      <th
        rowSpan={2}
        style={{
          border: "1px solid #9333ea",
          padding: "4px",
          width: "100px",
          textAlign: "center",
          verticalAlign: "middle",
          fontSize: "0.75rem",
        }}
      >
        பெயர்
      </th>
      <th
        rowSpan={2}
        style={{
          border: "1px solid #9333ea",
          padding: "4px",
          width: "80px",
          textAlign: "center",
          verticalAlign: "middle",
          fontSize: "0.75rem",
        }}
      >
        பயிரின்<br />பெயர்
      </th>
      <th
        rowSpan={2}
        style={{
          border: "1px solid #9333ea",
          padding: "4px",
          width: "60px",
          textAlign: "center",
          verticalAlign: "middle",
          fontSize: "0.75rem",
        }}
      >
        பரப்பு<br />ஏ.செ
      </th>
      <th
        colSpan={6}
        style={{
          border: "1px solid #9333ea",
          padding: "4px",
          textAlign: "center",
          fontSize: "0.75rem",
          backgroundColor: "#f3f4f6",
        }}
      >
        கோரும் கடன் தொகை
      </th>
      <th
        colSpan={2}
        style={{
          border: "1px solid #9333ea",
          padding: "4px",
          textAlign: "center",
          fontSize: "0.75rem",
          backgroundColor: "#f3f4f6",
        }}
      >
        ஆதாரம்
      </th>
      {isEditing && (
        <th
          rowSpan={2}
          style={{
            border: "1px solid #9333ea",
            padding: "4px",
            width: "50px",
            textAlign: "center",
            verticalAlign: "middle",
            fontSize: "0.75rem",
          }}
        >
          செயல்
        </th>
      )}
    </tr>

    {/* Second row for sub-headers */}
    <tr>
      
      <th style={{ border: "1px solid #9333ea", padding: "4px", fontSize: "0.75rem", textAlign: "center" }}>ரொக்கம்</th>
      <th style={{ border: "1px solid #9333ea", padding: "4px", fontSize: "0.75rem", textAlign: "center" }}>தொழு உரம்</th>
      <th style={{ border: "1px solid #9333ea", padding: "4px", fontSize: "0.75rem", textAlign: "center" }}>உரம்</th>
      <th style={{ border: "1px solid #9333ea", padding: "4px", fontSize: "0.75rem", textAlign: "center" }}>பூச்சி மருந்து</th>
      <th style={{ border: "1px solid #9333ea", padding: "4px", fontSize: "0.75rem", textAlign: "center" }}>விதை</th>
      <th style={{ border: "1px solid #9333ea", padding: "4px", fontSize: "0.75rem", textAlign: "center" }}>மொத்தம்</th>
      <th style={{ border: "1px solid #9333ea", padding: "4px", fontSize: "0.75rem", textAlign: "center" }}>உ.<br />எண்</th>
      <th style={{ border: "1px solid #9333ea", padding: "4px", fontSize: "0.75rem", textAlign: "center" }}>பெயர்</th>
    </tr>
  </thead>
          <tbody>
            {tableRows}
            {/* Total Row */}
            <tr className="bg-red-50 font-bold border-2 border-red-600">
              <td colSpan={2} className="border border-purple-600 p-2 text-center text-red-600 align-middle text-xs">
                மொத்தம்
              </td>
              <td className="border border-purple-600 p-2 text-center text-red-600 align-middle text-xs">
                {membersToRender.length}
              </td>
              <td className="border border-purple-600 p-2 text-center text-red-600 align-middle text-xs"></td>
              <td className="border border-purple-600 p-2 text-center text-red-600 align-middle font-bold text-xs">
                {totalLandArea.toFixed(2)}
              </td>
              <td className="border border-purple-600 p-2 text-right text-red-600 align-middle font-bold text-xs">
               
                   {totalRokkam.toLocaleString("en-IN")}
              </td>
              <td className="border border-purple-600 p-2 text-right text-red-600 align-middle font-bold text-xs">
               {totalThozhuUram.toLocaleString("en-IN")}
              </td>
              <td className="border border-purple-600 p-2 text-right text-red-600 align-middle font-bold text-xs">
                {totalThozhuUram.toLocaleString("en-IN")}
              </td>
              <td className="border border-purple-600 p-2 text-right text-red-600 align-middle font-bold text-xs">
                {totalPoochiMarundhu.toLocaleString("en-IN")}
              </td>
              <td className="border border-purple-600 p-2 text-right text-red-600 align-middle font-bold text-xs">
                {totalVithai.toLocaleString("en-IN")}
              </td>
              <td className="border border-purple-600 p-2 text-right text-red-600 align-middle font-bold text-xs">
                {grandCropMotham.toLocaleString("en-IN")}
              </td>
              <td colSpan={isEditing ? 3 : 2} className="p-2"></td>
            </tr>
          </tbody>
        </table>
      </div>
  <div className="font-bold text-left text-red-600 text-sm inline-block">
    ₹ ({getAmountInTamilWords(grandTotal)})
  </div>
      {/* Amount Summary */}
     <div className="text-center mb-4 p-2">
  
  <div className="text-xs mt-1">பயிர்வாரி தொகுப்பு</div>
</div>


      {/* Crop Summary Table */}
      <div className="border-2 border-purple-600 mb-4">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-purple-600 bg-gray-50">
              <th className="border border-purple-600 p-1 text-xs">பயிர் பெயர்</th>
              <th className="border border-purple-600 p-1 text-center text-xs">எண்ணிக்கை</th>
              <th className="border border-purple-600 p-1 text-right text-xs">பரப்பு</th>
              <th className="border border-purple-600 p-1 text-right text-xs">ரொக்கம்</th>
              <th className="border border-purple-600 p-1 text-right text-xs">தொழு உரம்</th>
              <th className="border border-purple-600 p-1 text-right text-xs">உரம்</th>
              <th className="border border-purple-600 p-1 text-right text-xs">பூச்சி மருந்து</th>
              <th className="border border-purple-600 p-1 text-right text-xs">விதை</th>
              <th className="border border-purple-600 p-1 text-right text-xs">மொத்தம்</th>
            </tr>
          </thead>
          <tbody>
            {cropSummaries.map((crop, index) => (
              <tr key={index} className="border-b border-purple-600">
                <td className="border border-purple-600 p-1 text-xs">{crop.name}</td>
                <td className="border border-purple-600 p-1 text-center text-xs">{crop.count}</td>
                <td className="border border-purple-600 p-1 text-right text-xs">{crop.totalExtent.toFixed(2)}</td>
                 
                <td className="border border-purple-600 p-1 text-right text-xs">
                  {crop.expenses.rokkam?.toLocaleString("en-IN")}
                </td>
                <td className="border border-purple-600 p-1 text-right text-xs">
                  {crop.expenses.thozhu_uram.toLocaleString("en-IN")}
                </td>
                <td className="border border-purple-600 p-1 text-right text-xs">
                  {crop.expenses.thozhu_uram.toLocaleString("en-IN")}
                </td>
                <td className="border border-purple-600 p-1 text-right text-xs">
                  {crop.expenses.poochi_marundhu.toLocaleString("en-IN")}
                </td>
                <td className="border border-purple-600 p-1 text-right text-xs">
                  {crop.expenses.vithai.toLocaleString("en-IN")}
                </td>
                <td className="border border-purple-600 p-1 text-right font-medium text-xs">
                  {crop.totalAmount.toLocaleString("en-IN")}
                </td>
              </tr>
            ))}
            <tr className="bg-red-50 font-bold border-2 border-red-600">
              <td className="border border-purple-600 p-1 text-red-600 text-xs">மொத்தம்</td>
              <td className="border border-purple-600 p-1 text-center text-red-600 text-xs">
                {membersToRender.length}
              </td>
              <td className="border border-purple-600 p-1 text-right text-red-600 text-xs">
                {totalLandArea.toFixed(2)}
              </td>
              <td className="border border-purple-600 p-1 text-right text-red-600 text-xs">
                {totalRokkam.toLocaleString("en-IN")}
              </td>
              <td className="border border-purple-600 p-1 text-right text-red-600 text-xs">
                {totalThozhuUram.toLocaleString("en-IN")}
              </td>
              <td className="border border-purple-600 p-1 text-right text-red-600 text-xs">
                {totalThozhuUram.toLocaleString("en-IN")}
              </td>
              <td className="border border-purple-600 p-1 text-right text-red-600 text-xs">
                {totalPoochiMarundhu.toLocaleString("en-IN")}
              </td>
              <td className="border border-purple-600 p-1 text-right text-red-600 text-xs">
                {totalVithai.toLocaleString("en-IN")}
              </td>
              <td className="border border-purple-600 p-1 text-right text-red-600 text-xs">
                {grandTotal.toLocaleString("en-IN")}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer Signatures */}
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