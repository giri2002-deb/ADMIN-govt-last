
// "use client"

// import type { KCCData } from "@/types/kcc-types"
// import { calculateKCCTotals } from "@/utils/kcc-utils"
// export interface KCCMember {
//   id: string
//   serialNo: string
//   memberName: string
//   category: string
//   landArea: number
//   farmerType: "MF" | "SF" | "OF"
//   classification: "SC" | "ST" | "BC" | "Others" | "ALL"
//   aadhaarNo: string
//   accountNo: string
//   amount: number
//   date: string
//   fatherName?: string
//   phoneNo?: string
// }

// interface EnhancedKCCMember extends KCCMember {
//   selectedCrops?: Array<{
//     crop: {
//       name_of_crop?: string
//       name?: string
//       crop_code?: number
//       motham?: number
//       poochi_marundhu?: number
//       rokkam?: number
//       thozhu_uram?: number
//       uram_1?: number
//       uram_2?: number
//       vithai?: number
//     }
//     acres: number
//     eligibleAmount: number
//     breakdown?: {
//       cents?: number
//       motham?: number
//       rokkam?: number
//       uram_1?: number
//       uram_2?: number
//       vithai?: number
//       thozhu_uram?: number
//       poochi_marundhu?: number
//       perCentRate?: Record<string, number>
//     }
//   }>
//   documents?: {
//     pan: any
//     ration: any
//     aadhaar: any
//     userPhoto: any
//     friendPhoto: any
//   }
//   formSections?: {
//     documents: boolean
//     friendImage: boolean
//     goldDetails: boolean
//     landDetails: boolean
//     loanDetails: boolean
//   }
//   friendDetails?: {
//     acre: string
//     name: string
//     phone: string
//     address: string
//     hasData: boolean
//   }
//   goldDetails?: {
//     items: Array<any>
//     hasGold: boolean
//     totalItems: number
//     totalValue: number
//     goldSummary: any
//   }
//   landParcels?: Array<any>
//   ownProperty?: {
//     value: number
//     description: string
//     hasProperty: boolean
//     hasPropertyData: boolean
//     mortgageDetails: any
//   }
// }
// interface KCCPage5Props {
//   data: KCCData
//   isEditing: boolean
//    selectedUsers?: EnhancedKCCMember[]
// }

// export function KCCPage5({ data, isEditing, selectedUsers = [] }: KCCPage5Props) {
//   const totals = calculateKCCTotals(data.members)

//   return (
//     <div className="w-full h-full bg-white p-4" style={{ fontSize: "12px" }}>
//       {/* Header */}
//       <div className="text-center mb-4">
//         <h1 className="text-base font-bold mb-2">S.1374 மகுடஞ்சாவடி தொடக்க வேளாண்மை கூட்டுறவு கடன் சங்கம் வரை.,</h1>
//       </div>

//       {/* Member Summary Table */}
//       <div className="border border-black mb-4 overflow-hidden">
//         <table className="w-full text-xs border-collapse">
//           <thead>
//             <tr className="border-b border-black bg-gray-50">
//               <th className="border-r border-black p-1 text-xs">வ.எண்</th>
//               <th className="border-r border-black p-1 text-xs">உ.எண்</th>
//               <th className="border-r border-black p-1 text-xs">பெயர்</th>
//               <th className="border-r border-black p-1 text-xs">Total Land</th>
//               <th className="border-r border-black p-1 text-xs">SF/MF/OF</th>
//               <th className="border-r border-black p-1 text-xs">Classification</th>
//               <th className="border-r border-black p-1 text-xs">AADHAR No</th>
//               <th className="border-r border-black p-1 text-xs">DCCB SB A/c No</th>
//               <th className="p-1 text-xs">Ind SB A/c Adj Amt</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.members.map((member, index) => (
//               <tr key={member.id} className="border-b border-black">
//                 <td className="border-r border-black p-1 text-center text-xs">{index + 1}</td>
//                 <td className="border-r border-black p-1 text-center text-xs">{selectedUsers[index].serialNo }</td>
//                 <td className="border-r border-black p-1 text-xs">{member.memberName}</td>
//                 <td className="border-r border-black p-1 text-center text-xs">{member.landArea.toFixed(2)}</td>
//                 <td className="border-r border-black p-1 text-center text-xs">{member.farmerType}</td>
//                 <td className="border-r border-black p-1 text-center text-xs">{member.classification}</td>
//                 <td className="border-r border-black p-1 text-xs">{member.aadhaarNo}</td>
//                 <td className="border-r border-black p-1 text-xs">{member.accountNo}</td>
//                 <td className="p-1 text-right text-xs">₹{member.amount.toLocaleString()}</td>
//               </tr>
//             ))}

//             {/* Total Row */}
//             <tr className="bg-red-50 font-bold border-2 border-red-600">
//               <td colSpan={2} className="border-r border-black p-1 text-center text-red-600 text-xs">
//                 மொத்தம்
//               </td>
//               <td className="border-r border-black p-1 text-center text-red-600 text-xs">{totals.totalMembers}</td>
//               <td className="border-r border-black p-1 text-center text-red-600 text-xs font-bold">
//                 {totals.totalLand.toFixed(2)}
//               </td>
//               <td className="border-r border-black p-1 text-center text-red-600 text-xs">Total</td>
//               <td colSpan={3} className="border-r border-black p-1 text-right text-red-600 font-bold text-xs">
//                 ₹{totals.totalAmount.toLocaleString()}
//               </td>
//               <td className="p-1"></td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       {/* Summary Statistics */}
//       <div className="mb-4">
//         <table className="w-full border border-black text-xs">
//           <tbody>
//             <tr className="border-b border-black">
//               <td className="border-r border-black p-1 font-semibold text-xs">MF</td>
//               <td className="p-1 text-center text-xs">{totals.farmerTypeBreakdown.MF}</td>
//             </tr>
//             <tr className="border-b border-black">
//               <td className="border-r border-black p-1 font-semibold text-xs">SF</td>
//               <td className="p-1 text-center text-xs">{totals.farmerTypeBreakdown.SF}</td>
//             </tr>
//             <tr className="border-b border-black">
//               <td className="border-r border-black p-1 font-semibold text-xs">OF</td>
//               <td className="p-1 text-center text-xs">{totals.farmerTypeBreakdown.OF}</td>
//             </tr>
//             <tr className="bg-gray-100 font-bold">
//               <td className="border-r border-black p-1 text-xs">Total</td>
//               <td className="p-1 text-center text-xs">{totals.totalMembers}</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }

"use client"

import type { KCCData } from "@/types/kcc-types"
import { calculateKCCTotals } from "@/utils/kcc-utils"

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

interface KCCPage5Props {
  data: KCCData
  isEditing: boolean
  selectedUsers?: EnhancedKCCMember[] // Made optional
}

export function KCCPage5({ data, isEditing, selectedUsers = [] }: KCCPage5Props) {
  const totals = calculateKCCTotals(data.members)

  // Safe serial number access - falls back to member.serialNo if selectedUsers not available
  const getSerialNo = (index: number) => {
    return selectedUsers[index]?.serialNo || data.members[index]?.serialNo || ""
  }

  return (
    <div className="w-full h-full bg-white p-4" style={{ fontSize: "12px" }}>
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-base font-bold mb-2">S.1374 மருது ஞ்சாவடி தொடர்க்க வேளாண்மை கூட்டுறவு கடன் சங்கம் வலை..</h1>
      </div>

      {/* Member Summary Table */}
      <div className="border border-black mb-4 overflow-hidden">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="border-b border-black bg-gray-50">
              <th className="border-r border-black p-1 text-xs">வ.எண்</th>
              <th className="border-r border-black p-1 text-xs">உ.எண்</th>
              <th className="border-r border-black p-1 text-xs">பெயர்</th>
              <th className="border-r border-black p-1 text-xs">Total Land</th>
              <th className="border-r border-black p-1 text-xs">SF/MF/OF</th>
              <th className="border-r border-black p-1 text-xs">Classification</th>
              <th className="border-r border-black p-1 text-xs">AADHAR No</th>
              <th className="border-r border-black p-1 text-xs">DCCB SB A/c No</th>
              <th className="p-1 text-xs">Ind SB A/c Adj Amt</th>
            </tr>
          </thead>
          <tbody>
            {data.members.map((member, index) => (
              <tr key={member.id} className="border-b border-black">
                <td className="border-r border-black p-1 text-center text-xs">{index + 1}</td>
                <td className="border-r border-black p-1 text-center text-xs">
                  {getSerialNo(index)}
                </td>
                <td className="border-r border-black p-1 text-xs">{member.memberName}</td>
                <td className="border-r border-black p-1 text-center text-xs">{member.landArea.toFixed(2)}</td>
                <td className="border-r border-black p-1 text-center text-xs">{member.farmerType}</td>
                <td className="border-r border-black p-1 text-center text-xs">{member.classification}</td>
                <td className="border-r border-black p-1 text-xs">{member.aadhaarNo}</td>
                <td className="border-r border-black p-1 text-xs">{member.accountNo}</td>
                <td className="p-1 text-right text-xs">₹{member.amount.toLocaleString()}</td>
              </tr>
            ))}

            {/* Total Row */}
            <tr className="bg-red-50 font-bold border-2 border-red-600">
              <td colSpan={2} className="border-r border-black p-1 text-center text-red-600 text-xs">
                மொத்தம்
              </td>
              <td className="border-r border-black p-1 text-center text-red-600 text-xs">{totals.totalMembers}</td>
              <td className="border-r border-black p-1 text-center text-red-600 text-xs font-bold">
                {totals.totalLand.toFixed(2)}
              </td>
              <td className="border-r border-black p-1 text-center text-red-600 text-xs">Total</td>
              <td colSpan={4} className="border-r border-black p-1 text-right text-red-600 font-bold text-xs">
                ₹{totals.totalAmount.toLocaleString()}
              </td>
             
            </tr>
          </tbody>
        </table>
      </div>

      {/* Summary Statistics */}
      <div className="mb-4">
        <table className="w-full border border-black text-xs">
          <tbody>
            <tr className="border-b border-black">
              <td className="border-r border-black p-1 font-semibold text-xs">MF</td>
              <td className="p-1 text-center text-xs">{totals.farmerTypeBreakdown.MF}</td>
            </tr>
            <tr className="border-b border-black">
              <td className="border-r border-black p-1 font-semibold text-xs">SF</td>
              <td className="p-1 text-center text-xs">{totals.farmerTypeBreakdown.SF}</td>
            </tr>
            <tr className="border-b border-black">
              <td className="border-r border-black p-1 font-semibold text-xs">OF</td>
              <td className="p-1 text-center text-xs">{totals.farmerTypeBreakdown.OF}</td>
            </tr>
            <tr className="bg-gray-100 font-bold">
              <td className="border-r border-black p-1 text-xs">Total</td>
              <td className="p-1 text-center text-xs">{totals.totalMembers}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}