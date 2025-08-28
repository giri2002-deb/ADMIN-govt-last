
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { generatePDF } from "../../../lib/generate-pdf"

interface Member {
  id: string
  serialNo: string
  memberName: string
  fatherName: string
  category: string
  landArea: number
  farmerType: string
  classification: string
  aadhaarNo: string
  accountNo: string
  phoneNo: string
  amount: number
  date: string
  formSections?: {
    documents: boolean
    friendImage: boolean
    goldDetails: boolean
    landDetails: boolean
    loanDetails: boolean
    ownProperty: boolean
    friendDetails: boolean
    userInformation: boolean
  }
  friendDetails?: {
    name: string
    uNumber: string
    fatherName: string
    address: string
    phone: string
    surveyNumber: string
    aadhaarNumber: string
    acre: string
    hasData: boolean
    hasImage: boolean
    imageUrl: string | null
    summary?: {
      isComplete: boolean
      totalFields: number
      filledFields: number
      hasDocuments: boolean
      hasAllRequired: boolean
    }
    detailedInfo?: {
      உ_எண்: string
      பெயர்: string
      படம்_URL: string | null
      ஏக்கர்: string
      முகவரி: string
      தகபெயர்: string
      ஆதார்_எண்: string
      சர்வே_எண்: string
      கைபேசி_எண்: string
    }
  }
  goldDetails?: {
    items: any[]
    hasGold: boolean
    totalItems: number
    totalValue: number
    goldSummary: {
      totalCount: number
      totalTypes: number
      goldRateUsed: number
      highestValue: number
      averageWeight: number
      netWeightCalculation: string
      totalNetAmountSummary: number
      totalNetWeightSummary: number
    }
    marketValue: number
    totalWeight: number
    totalNetAmount: number
    totalNetWeight: number
    goldItemsDetails: any[]
  }
  ownProperty?: {
    value: number
    description: string
    hasProperty: boolean
    hasPropertyData: boolean
    mortgageDetails: {
      a: string
      ca: string
      extent: string
      village: string
      irrigation: string
      mortgageReg: string
      surveyNumber: string
      guidanceValue: number
      mortgageAmount: number
      hasMortgageData: boolean
      registrarOffice: string
    }
    propertySummary: {
      totalValue: number
      guidanceValue: number
      mortgageValue: number
      hasDescription: boolean
      hasMortgageDetails: boolean
    }
  }
  documents?: {
    pan: {
      file: null
      preview: string
      uploaded: boolean
    }
    ration: {
      file: null
      preview: string
      uploaded: boolean
    }
    aadhaar: {
      file: null
      preview: string
      uploaded: boolean
    }
    userPhoto: {
      file: null
      preview: string
      uploaded: boolean
    }
    friendPhoto: {
      url: string
      file: null
      preview: string
      uploaded: boolean
    }
    documentsSummary: {
      totalRequired: number
      totalUploaded: number
      completionRate: number
    }
  }
  landParcels?: Array<{
    acres: number
    hectares: number
    landNumber: number
    surveyNumber: string
  }>
  selectedCrops?: Array<{
    crop: {
      motham: number
      rokkam: number
      uram_1: number
      uram_2: number
      vithai: number
      crop_code: number
      thozhu_uram: number
      name_of_crop: string
      poochi_marundhu: number
    }
    acres: number
    eligibleAmount: number
    breakdown: Record<string, any>
    cropName: string
  }>
  userInformation?: {
    pan_file: null
    checkboxes: {
      kcc: boolean
      jewel: boolean
      kccah: boolean
      tractor: boolean
    }
    user_photo: null
    pan_preview: string
    ration_file: null
    aadhaar_file: null
    friend_photo: null
    ஜாதி: string
    உ_எண்: string
    ration_preview: string
    aadhaar_preview: string
    பெயர்: string
    principle_amount: string
    user_photo_preview: string
    முகவரி: string
    வட்டம்: string
    நிலம்1_ac: string
    நிலம்2_ac: string
    நிலம்3_ac: string
    நிலம்4_ac: string
    நிலம்5_ac: string
    நிலம்6_ac: string
    நிலம்7_ac: string
    நிலம்8_ac: string
    நிலம்9_ac: string
    friend_photo_preview: string
    நிலம்10_ac: string
    நிலம்11_ac: string
    நிலம்12_ac: string
    நிலம்13_ac: string
    நிலம்14_ac: string
    நிலம்15_ac: string
    நிலம்16_ac: string
    நிலம்17_ac: string
    நிலம்18_ac: string
    நிலம்19_ac: string
    நிலம்1_heh: string
    நிலம்20_ac: string
    நிலம்2_heh: string
    நிலம்3_heh: string
    நிலம்4_heh: string
    நிலம்5_heh: string
    நிலம்6_heh: string
    நிலம்7_heh: string
    நிலம்8_heh: string
    நிலம்9_heh: string
    கிராமம்: string
    தகபெயர்: string
    நிலம்10_heh: string
    நிலம்11_heh: string
    நிலம்12_heh: string
    நிலம்13_heh: string
    நிலம்14_heh: string
    நிலம்15_heh: string
    நிலம்16_heh: string
    நிலம்17_heh: string
    நிலம்18_heh: string
    நிலம்19_heh: string
    நிலம்20_heh: string
    ஆதார்_எண்: string
    கைபேசி_எண்: string
    pan_அட்டை_எண்: string
    மொத்த_நிலம்: string
    பங்குத்_தொகை: string
    sdccb_sb_கணக்கு_எண்: string
    sdccb_kcc_கணக்கு_எண்: string
    society_sb_கணக்கு_எண்: string
    ரேஷன்_அட்டை_எண்: string
    ரேஷன்_அட்டை_வகை: string
    நிலம்1_சர்வே_எண்: string
    நிலம்2_சர்வே_எண்: string
    நிலம்3_சர்வே_எண்: string
    நிலம்4_சர்வே_எண்: string
    நிலம்5_சர்வே_எண்: string
    நிலம்6_சர்வே_எண்: string
    நிலம்7_சர்வே_எண்: string
    நிலம்8_சர்வே_எண்: string
    நிலம்9_சர்வே_எண்: string
    நிலம்10_சர்வே_எண்: string
    நிலம்11_சர்வே_எண்: string
    நிலம்12_சர்வே_எண்: string
    நிலம்13_சர்வே_எண்: string
    நிலம்14_சர்வே_எண்: string
    நிலம்15_சர்வே_எண்: string
    நிலம்16_சர்வே_எண்: string
    நிலம்17_சர்வே_எண்: string
    நிலம்18_சர்வே_எண்: string
    நிலம்19_சர்வே_எண்: string
    நிலம்20_சர்வே_எண்: string
    வாக்காளர்_அட்டை_எண்: string
  }
}

interface ApiResponse {
  exportDate: string
  totalRecords: number
  totalAmount: number
  totalLand: number
  summary: {
    totalMembers: number
    totalAmount: number
    totalLand: number
    farmerTypeBreakdown: {
      MF: number
      SF: number
      OF: number
    }
    classificationBreakdown: {
      SC: number
      ST: number
      Others: number
    }
  }
  kccData: {
    members: Member[]
    financial: {
      transitAccount: number
      loanComponents: {
        seeds: number
        fertilizer: number
        pesticide: number
        insurance: number
        others: number
      }
      total: number
    }
    cropDetails: {
      cropName: string
      extent: number
      expenses: {
        cash: number
        seeds: number
        pesticide: number
        fertilizer: number
        others: number
        insurance: number
      }
      total: number
      cropsWithAmounts: string
    }
    settings: {
      organizationName: string
      address: string
      date: string
      meetingDetails: string
      accountNumber: string
    }
  }
  organizationInfo: {
    organizationName: string
    address: string
    date: string
    meetingDetails: string
    accountNumber: string
  }
}

interface LoanFormData {
  uEnn: string
  name: string
  fatherHusbandName: string
  address: string
  loanNo: string
  approvedLoanAmount: string
  approvedDate: string
  interestRate: string
  defaultInterest: string
  repaymentDate: string
  resolutionNo: string
  aadhaarNo: string
  familyCardNo: string
  panNo: string
  mobileNo: string
  savingsAccountNo: string
  totalArea: string
  farmerCategory: string
  secretary: string
  guarantorUEnn: string
  guarantorName: string
  guarantorAddress: string
  guarantorDate: string
  organizationName: string
  tableRows: Array<{
    slNo: string
    cropName: string
    extentLand: string
    cash: string
    seedRawMaterials: string
    fertilizer: string
    microNutrients: string
    pesticide: string
    othersInsurance: string
    total: string
    date: string
    description: string
    credit: string
    disbursement: string
    balance: string
    noOfDays: string
    product: string
    interestDue: string
    interestReceived: string
    initial: string
  }>
  userPhotoUrl?: string | null
  friendPhotoUrl?: string | null
}

const parseCrops = (category: string) => {
  if (!category) return { mainCrop: "", crops: [], count: 0 }

  const crops = category.split(", ").map((crop) => {
    const match = crop.match(/^(.+?)\s*$$([\d.]+)ac$$\s*-\s*₹([\d,]+)$/)
    if (match) {
      return {
        name: match[1].trim(),
        area: match[2].trim(),
        amount: match[3].trim().replace(/,/g, ""),
      }
    }
    return { name: crop.trim(), area: "", amount: "" }
  })

  return {
    mainCrop: crops[0]?.name || category.split(" ")[0] || "",
    crops: crops,
    count: crops.length,
  }
}

const calculateRepaymentDate = (approvalDate: string) => {
  const date = new Date(approvalDate)
  date.setFullYear(date.getFullYear() + 1)
  return date.toLocaleDateString("en-GB")
}

const LoanLedgerPDFPage = ({ formData }: { formData: LoanFormData }) => {
  return (
    <div className="p-12 bg-white min-h-[2500px] min-w-[1800px] text-black font-serif text-[10px] leading-tight" 
         style={{ width: "1123px", minHeight: "2500px", overflow: "visible" }}>
      
      {/* Header Section */}
      <div className="flex flex-col items-center mb-4">
        <h1 className="text-lg font-bold mb-2 text-center">{formData.organizationName}</h1>
      </div>

      {/* Top Details Section */}
      <div className="grid grid-cols-3 gap-x-4 gap-y-1 mb-4 relative">
        {/* Row 1 */}
        <div className="flex items-baseline">
  <span className="w-[120px] text-[24px]">உ.எண்:</span>
  <span className="font-bold text-[24px]">{formData.uEnn}</span>
</div>

        <div className="flex items-baseline">
          <span className="w-[45px]">கடன் எண்:</span>
          <span className="font-bold text-sm">{formData.loanNo}</span>
        </div>
        <div className="flex items-baseline">
          <span className="w-[80px]">ஆதார் எண்:</span>
          <span className="font-bold text-sm">{formData.aadhaarNo}</span>
        </div>

        {/* Row 2 */}
        <div className="flex items-baseline">
          <span className="w-[60px]">பெயர்:</span>
          <span className="font-bold text-sm">{formData.name}</span>
        </div>
        <div className="flex items-baseline">
          <span className="w-[120px]">அனுமதிக்கப்பட்ட கடன் தொகை:</span>
          <span className="font-bold text-sm">{formData.approvedLoanAmount}</span>
        </div>
        <div className="flex items-baseline">
          <span className="w-[80px]">குடும்ப அட்டை எண்:</span>
          <span className="font-bold text-sm">{formData.familyCardNo}</span>
        </div>

        {/* Row 3 */}
        <div className="flex items-baseline">
          <span className="w-[60px]">த/த/ பெயர்:</span>
          <span className="font-bold text-sm">{formData.fatherHusbandName}</span>
        </div>
        <div className="flex items-baseline">
          <span className="w-[120px]">அனுமதிக்கப்பட்ட தேதி:</span>
          <span className="font-bold text-sm">{formData.approvedDate}</span>
        </div>
        <div className="flex items-baseline">
          <span className="w-[80px]">PAN NO :</span>
          <span className="font-bold text-sm">{formData.panNo}</span>
        </div>

        {/* Row 4 */}
        <div className="flex items-baseline">
          <span className="w-[60px] font-">முகவரி:</span>
          <span className="font-bold text-sm">{formData.address}</span>
        </div>
        <div className="flex items-baseline">
          <span className="w-[120px]">வட்டி விகிதம்:</span>
          <span className="font-bold text-sm">{formData.interestRate}</span>
        </div>
        <div className="flex items-baseline">
          <span className="w-[80px]">மொபைல் எண்:</span>
          <span className="font-bold text-sm">{formData.mobileNo}</span>
        </div>

        {/* Row 5 */}
        <div className="col-span-1"></div>
        <div className="flex items-baseline">
          <span className="w-[120px]">தவணை தவறிய வட்டி:</span>
          <span className="font-bold text-sm">{formData.defaultInterest}</span>
        </div>
        <div className="flex items-baseline">
          <span className="w-[80px]">சேமிப்பு கணக்கு எண்:</span>
          <span className="font-bold text-sm">{formData.savingsAccountNo}</span>
        </div>

        {/* Row 6 */}
        <div className="flex items-baseline">
          <span className="w-[60px]">பிணைதாரர்:</span>
          <span className="font-bold text-sm"></span>
        </div>
        <div className="flex items-baseline">
          <span className="w-[120px]">திருப்பி செலுத்தும் தேதி:</span>
          <span className="font-bold text-sm">{formData.repaymentDate}</span>
        </div>
        <div className="flex items-baseline">
          <span className="w-[80px]">மொத்த பரப்பு:</span>
          <span className="font-bold text-sm">{formData.totalArea}</span>
        </div>

        {/* Row 7 */}
        <div className="flex items-baseline">
          <span className="w-[60px]">உ.எண்:</span>
          <span className="font-bold text-sm">{formData.guarantorUEnn}</span>
        </div>
        <div className="flex items-baseline">
          <span className="w-[120px]">தீர்மான எண்:</span>
          <span className="font-bold text-sm">{formData.resolutionNo}</span>
        </div>
        <div className="col-span-1 flex justify-end items-start">
          <span className="font-bold text-sm mr-0.5">1</span>
        </div>

        {/* Row 8 */}
        <div className="flex items-baseline">
          <span className="w-[60px]">பெயர்:</span>
          <span className="font-bold text-sm">{formData.guarantorName}</span>
        </div>
        <div className="flex items-baseline">
          <span className="w-[120px]">நாள்:</span>
          <span className="font-bold text-sm">{formData.guarantorDate}</span>
        </div>
        <div className="col-span-1"></div>

        {/* Row 9 */}
        <div className="flex items-baseline">
          <span className="w-[60px]">முகவரி:</span>
          <span className="font-bold text-sm">{formData.guarantorAddress}</span>
        </div>
        <div className="col-span-2"></div>

        {/* Images */}
        {(formData.userPhotoUrl || formData.friendPhotoUrl) && (
          <div className="absolute top-0 right-0 flex items-start gap-2">
            {formData.userPhotoUrl && (
              <div className="flex flex-col items-center">
                <div className="text-[8px] mb-1">படம்</div>
                <img
                  src={formData.userPhotoUrl}
                  alt="User Photo"
                  className="w-16 h-20 border border-black object-cover"
                />
              </div>
            )}
            {formData.friendPhotoUrl && (
              <div className="flex flex-col items-center">
                <div className="text-[8px] mb-1">நண்பர் படம்</div>
                <img
                  src={formData.friendPhotoUrl}
                  alt="Friend Photo"
                  className="w-16 h-20 border border-black object-cover"
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Principal Borrower / Surity Section */}
      <div className="flex justify-around mt-4 mb-4">
        <div className="flex flex-col items-center w-1/3">
          <div className="border-b border-black w-full mb-1"></div>
          <span className="font-bold text-sm">PRINCIPAL BORROWER</span>
        </div>
        <div className="flex flex-col items-center w-1/3">
          <div className="border-b border-black w-full mb-1"></div>
          <span className="font-bold text-sm">SURITY</span>
        </div>
      </div>

      {/* Loan Disbursement Details Table */}
      <div className="text-center font-bold text-lg mb-4 mt-2">
        கடன் வழங்கிய விபரம்
      </div>
      
      <div className="border-[1px] border-black">
        <table className="w-full border-collapse">
          <thead>
            <tr style={{ backgroundColor: "#f3f4f6" }}>
              <th rowSpan={2} className="border-2 border-black p-2 text-[11px] font-bold text-center align-middle w-12">
                Sl. No
              </th>
              <th rowSpan={2} className="border-2 border-black p-2 text-[11px] font-bold text-center align-middle w-32">
                Name of the Crop
              </th>
              <th rowSpan={2} className="border-2 border-black p-2 text-[11px] font-bold text-center align-middle w-24">
                Extent of Land Ac Cent
              </th>
              <th colSpan={6} className="border-2 border-black p-2 text-[11px] font-bold text-center">
                Expense Categories
              </th>
              <th rowSpan={2} className="border-2 border-black p-2 text-[11px] font-bold text-center align-middle w-20">
                Total
              </th>
              <th colSpan={5} className="border-2 border-black p-2 text-[11px] font-bold text-center">
                Account Details
              </th>
              <th rowSpan={2} className="border-2 border-black p-2 text-[11px] font-bold text-center align-middle w-16">
                No of Days
              </th>
              <th rowSpan={2} className="border-2 border-black p-2 text-[11px] font-bold text-center align-middle w-20">
                Product
              </th>
              <th colSpan={2} className="border-2 border-black p-2 text-[11px] font-bold text-center">
                Interest
              </th>
              <th rowSpan={2} className="border-2 border-black p-2 text-[11px] font-bold text-center align-middle w-16">
                Initial
              </th>
            </tr>
            <tr style={{ backgroundColor: "#f3f4f6" }}>
              <th className="border-2 border-black p-2 text-[11px] font-bold text-center w-16">Cash</th>
              <th className="border-2 border-black p-2 text-[11px] font-bold text-center w-20">Seed/ Raw Materials</th>
              <th className="border-2 border-black p-2 text-[11px] font-bold text-center w-18">Fertilizer</th>
              <th className="border-2 border-black p-2 text-[11px] font-bold text-center w-18">Micro Nutrients</th>
              <th className="border-2 border-black p-2 text-[11px] font-bold text-center w-18">Pesticide</th>
              <th className="border-2 border-black p-2 text-[11px] font-bold text-center w-20">Others/ Insurance</th>
              <th className="border-2 border-black p-2 text-[11px] font-bold text-center w-16">தேதி</th>
              <th className="border-2 border-black p-2 text-[11px] font-bold text-center w-18">விபரம்</th>
              <th className="border-2 border-black p-2 text-[11px] font-bold text-center w-16">வரவு</th>
              <th className="border-2 border-black p-2 text-[11px] font-bold text-center w-18">பட்டுவாடா</th>
              <th className="border-2 border-black p-2 text-[11px] font-bold text-center w-16">நிலுவை</th>
              <th className="border-2 border-black p-2 text-[11px] font-bold text-center w-16">Due</th>
              <th className="border-2 border-black p-2 text-[11px] font-bold text-center w-18">Received</th>
            </tr>
          </thead>
         
<tbody>
  {formData.tableRows.map((row, rowIndex) => (
    <tr key={rowIndex}>
      <td className="border border-black p-1 text-center text-[10px]">{row.slNo}</td>
      <td className="border border-black p-1 text-left text-[10px]">{row.cropName}</td>
      <td className="border border-black p-1 text-center text-[10px]">{row.extentLand}</td>
      <td className="border border-black p-1 text-right text-[10px]">{row.cash}</td>
      <td className="border border-black p-1 text-right text-[10px]">{row.seedRawMaterials}</td>
      <td className="border border-black p-1 text-right text-[10px]">{row.fertilizer}</td>
      <td className="border border-black p-1 text-right text-[10px]">{row.microNutrients}</td>
      <td className="border border-black p-1 text-right text-[10px]">{row.pesticide}</td>
      <td className="border border-black p-1 text-right text-[10px]">{row.othersInsurance}</td>
      <td className="border border-black p-1 text-right font-bold text-[10px]">{row.total}</td>
      <td className="border border-black p-1 text-center text-[10px]">{row.date}</td>
      
      {rowIndex === 0 && (
        <td className="border border-black p-1 text-left text-[10px]">Adj to SD in SDCCB</td>
      )}
      {rowIndex !== 0 && (
        <td className="border border-black p-1 text-left text-[10px]">{row.description}</td>
      )}

      <td className="border border-black p-1 text-right text-[10px]">{row.credit}</td>
      <td className="border border-black p-1 text-right text-[10px]">{row.disbursement}</td>
      <td className="border border-black p-1 text-right text-[10px]">{row.balance}</td>
      <td className="border border-black p-1 text-right text-[10px]">{row.noOfDays}</td>
      <td className="border border-black p-1 text-right text-[10px]">{row.product}</td>
      <td className="border border-black p-1 text-right text-[10px]">{row.interestDue}</td>
      <td className="border border-black p-1 text-right text-[10px]">{row.interestReceived}</td>
      <td className="border border-black p-1 text-right text-[10px]">{row.initial}</td>
    </tr>
  ))}
  {/* Total Row */}
  <tr>
    <td colSpan={2} className="border border-black p-1 text-center font-bold text-[10px]">
      மொத்தம்
    </td>
    <td className="border border-black p-1 text-center font-bold text-[10px]">
      {formData.tableRows.reduce((sum, row) => sum + (Number(row.extentLand) || 0), 0)}
    </td>
    <td className="border border-black p-1 text-right font-bold text-[10px]">
      {formData.tableRows.reduce((sum, row) => sum + (Number(row.cash) || 0), 0)}
    </td>
    <td className="border border-black p-1 text-right font-bold text-[10px]">
      {formData.tableRows.reduce((sum, row) => sum + (Number(row.seedRawMaterials) || 0), 0)}
    </td>
    <td className="border border-black p-1 text-right font-bold text-[10px]">
    
    </td>
    <td className="border border-black p-1 text-right font-bold text-[10px]">
     
    </td>
    <td className="border border-black p-1 text-right font-bold text-[10px]">
      
    </td>
    <td className="border border-black p-1 text-right font-bold text-[10px]">
      
    </td>
    <td className="border border-black p-1 text-right font-bold text-[10px]">
      {formData.tableRows.reduce((sum, row) => sum + (Number(row.total) || 0), 0)}
    </td>
    <td className="border border-black p-1"></td>
    <td className="border border-black p-1"></td>
    <td className="border border-black p-1 text-right font-bold text-[10px]">
      
    </td>
    <td className="border border-black p-1 text-right font-bold text-[10px]">
      {formData.tableRows.reduce((sum, row) => sum + (Number(row.disbursement) || 0), 0)}
    </td>
    <td className="border border-black p-1 text-right font-bold text-[10px]">
      {formData.tableRows.reduce((sum, row) => sum + (Number(row.balance) || 0), 0)}
    </td>
    <td className="border border-black p-1 text-right font-bold text-[10px]">
   
    </td>
    <td className="border border-black p-1 text-right font-bold text-[10px]">
      
    </td>
    <td className="border border-black p-1 text-right font-bold text-[10px]">
     
    </td>
    <td className="border border-black p-1 text-right font-bold text-[10px]">
    
    </td>
    <td className="border border-black p-1 text-right font-bold text-[10px]">
 
    </td>
  </tr>
</tbody>


        </table>
      </div>
    </div>
  )
}

export function LoanledgerAH() {
  const [formsData, setFormsData] = useState<LoanFormData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isPdfMode, setIsPdfMode] = useState(false)
  const [pdfData, setPdfData] = useState<{ dataUri: string; filename: string } | null>(null)
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)


const processApiData = (jsonData: any) => {
  try {
    const mappedForms: LoanFormData[] = jsonData.kccData.members.map((member: any, index: number) => {
      // Use selectedKccahLoan.கடன்_வகை for crop name instead of member.category
      const loanType = member.selectedKccahLoan?.கடன்_வகை || member.category || "";
      
      const approvalDate = member.date ? new Date(member.date).toLocaleDateString("en-GB") : ""
   

      const friendDetails = member.friendDetails
      const hasValidFriendDetails = friendDetails?.hasData && friendDetails?.summary?.isComplete
      const landInAcres = member.landArea ? member.landArea.toFixed(2) : "" // Keep as acres

// Then use landInAcres everywhere instead of landInHectares
      // If friendDetails is not available but we have userInformation with guarantee data
      const hasGuarantorInfo = member.userInformation?.guarantee_type
        const land=member.landArea
      // Get friend/guarantor details
      const guarantorUEnn = hasValidFriendDetails ? friendDetails.uNumber || friendDetails.detailedInfo?.உ_எண் || "" : 
                           (hasGuarantorInfo ? member.userInformation?.உ_எண் || "" : "")

      const guarantorName = hasValidFriendDetails ? friendDetails.name || friendDetails.detailedInfo?.பெயர் || "" : 
                           (hasGuarantorInfo ? member.userInformation?.பெயர் || "" : "")

      const guarantorAddress = hasValidFriendDetails ? friendDetails.address || friendDetails.detailedInfo?.முகவரி || "" : 
                              (hasGuarantorInfo ? member.userInformation?.முகவரி || "" : "")

      // Create crop rows using selectedCrops breakdown values
      const cropRows = member.selectedCrops?.map((crop: any, cropIndex: number) => {
        const breakdown = crop.breakdown || {}
        
        return {
          slNo: (cropIndex + 1).toString(),
          cropName: loanType, // Use the loan type from selectedKccahLoan
          extentLand: landInAcres,
          cash: breakdown.motham ? breakdown.motham.toString() : "0",
          seedRawMaterials: breakdown.rokkam ? breakdown.rokkam.toString() : "0",
          fertilizer: breakdown.uram_1 ? breakdown.uram_1.toString() : "0",
          microNutrients: breakdown.uram_2 ? breakdown.uram_2.toString() : "0",
          pesticide: breakdown.poochi_marundhu ? breakdown.poochi_marundhu.toString() : "0",
          othersInsurance: breakdown.vithai ? breakdown.vithai.toString() : "0",
          total: crop.eligibleAmount ? crop.eligibleAmount.toString() : "0",
          date: approvalDate,
          description: "ADJ TO SD in SDDCB",
          credit: "0",
          disbursement: crop.eligibleAmount ? crop.eligibleAmount.toString() : "0",
          balance: crop.eligibleAmount ? crop.eligibleAmount.toString() : "0",
          noOfDays: "0",
          product: "0",
          interestDue: "0",
          interestReceived: "0",
          initial: "0",
        }
      }) || []

      // If no selectedCrops, create a single row with the loan type
      if (cropRows.length === 0) {
        cropRows.push({
          slNo: "1",
          cropName: loanType, // Use the loan type from selectedKccahLoan
          extentLand: landInAcres,
          cash: member.amount ? Math.floor(member.amount * 0.62).toString() : "145863",
          seedRawMaterials: member.amount ? Math.floor(member.amount * 0.38).toString() : "89400",
          fertilizer: "",
          microNutrients: "",
          pesticide: "",
          othersInsurance: " ",
          total: member.amount ? member.amount.toString() : "235266",
          date: approvalDate,
          description: "ADJ TO SD in SDDCB",
          credit: " ",
          disbursement: member.amount ? member.amount.toString() : "235266",
          balance: member.amount ? member.amount.toString() : "235266",
          noOfDays: "",
          product: "",
          interestDue: "",
          interestReceived: "",
          initial: "",
        })
      }

      const emptyRows = Array(Math.max(0, 6 - cropRows.length)).fill({
        slNo: "",
        cropName: "",
        extentLand: "",
        cash: "",
        seedRawMaterials: "",
        fertilizer: "",
        microNutrients: "",
        pesticide: "",
        othersInsurance: "",
        total: "",
        date: "",
        description: "",
        credit: "",
        disbursement: "",
        balance: "",
        noOfDays: "",
        product: "",
        interestDue: "",
        interestReceived: "",
        initial: "",
      })

      const userPhotoUrl =
        member.documents?.userPhoto?.preview ||
        member.userInformation?.user_photo_preview ||
        member.userInformation?.aadhaar_preview ||
        null

      const friendPhotoUrl =
        member.documents?.friendPhoto?.preview ||
        member.friendDetails?.imageUrl ||
        member.userInformation?.friend_photo_preview ||
        null

      return {
        uEnn: member.userInformation?.உ_எண் || member.accountNo || "",
        name: member.userInformation?.பெயர் || member.memberName || "",
        fatherHusbandName: member.userInformation?.தகபெயர் || member.fatherName || "",
        address: member.userInformation?.முகவரி || "",
        loanNo: member.userInformation?.sdccb_kcc_கணக்கு_எண் || "",
        approvedLoanAmount: member.amount ? member.amount.toString() : "",
        approvedDate: approvalDate,
        interestRate: member.userInformation?.principle_amount ? "7%" : "",
        defaultInterest: member.userInformation?.பங்குத்_தொகை || "",
        repaymentDate: member.date ? calculateRepaymentDate(member.date) : "",
        resolutionNo: member.userInformation?.வாக்காளர்_அட்டை_எண் || "",
        aadhaarNo: member.userInformation?.ஆதார்_எண் || member.aadhaarNo || "",
        familyCardNo: member.userInformation?.ரேஷன்_அட்டை_எண் || "",
        panNo: member.userInformation?.pan_அட்டை_எண் || "",
        mobileNo: member.userInformation?.கைபேசி_எண் || member.phoneNo || "",
        savingsAccountNo: member.userInformation?.sdccb_sb_கணக்கு_எண் || member.userInformation?.society_sb_கணக்கு_எண் || "",
        totalArea: landInAcres,
        farmerCategory: member.farmerType || member.userInformation?.ஜாதி || "",
        secretary: member.userInformation?.கிராமம் || "",
        guarantorUEnn: guarantorUEnn,
        guarantorName: guarantorName,
        guarantorAddress: guarantorAddress,
        guarantorDate: approvalDate,
        organizationName: jsonData.organizationInfo?.organizationName || jsonData.kccData?.settings?.organizationName || "",
        tableRows: [...cropRows, ...emptyRows],
        userPhotoUrl,
        friendPhotoUrl,
      }
    })

    setFormsData(mappedForms)
  } catch (processError: any) {
    console.error("Error processing API data:", processError)
    setError(`Data processing error: ${processError.message}`)
  } finally {
    setLoading(false)
  }
}
const API_URL = process.env.NEXT_PUBLIC_API_URL;
  async function fetchData() {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`${API_URL}/api/kccahdata`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Cache-Control": "no-cache",
        },
        mode: "cors",
        credentials: "omit",
      })

      if (!response.ok) {
        throw new Error(`API returned error ${response.status}: ${response.statusText}`)
      }

      const jsonData: ApiResponse = await response.json()

      if (!jsonData?.kccData?.members?.length) {
        throw new Error("Invalid API response structure")
      }

      processApiData(jsonData)
    } catch (err: any) {
      console.error("API fetch failed, using fallback data:", err.message)
   
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleInputChange = (formIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormsData((prev) => prev.map((form, index) => (index === formIndex ? { ...form, [name]: value } : form)))
  }

  const handleTableRowChange = (formIndex: number, rowIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormsData((prev) =>
      prev.map((form, index) => {
        if (index !== formIndex) return form

        const newTableRows = [...form.tableRows]
        newTableRows[rowIndex] = { ...newTableRows[rowIndex], [name]: value }

        if (name === "cash" || name === "seedRawMaterials") {
          const cash = Number.parseFloat(newTableRows[rowIndex].cash || "0")
          const seed = Number.parseFloat(newTableRows[rowIndex].seedRawMaterials || "0")
          newTableRows[rowIndex].total = (cash + seed).toString()
        }

        return { ...form, tableRows: newTableRows }
      }),
    )
  }

  const calculateGrandTotal = (formIndex: number, column: string) => {
    return formsData[formIndex]?.tableRows
      .reduce((sum, row) => sum + Number.parseFloat(row[column as keyof typeof row] || "0"),"")
      .toString() || "0"
  }

 
  const handleDownloadPdf = async () => {
    if (pdfData) {
      const link = document.createElement("a")
      link.href = pdfData.dataUri
      link.download = pdfData.filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } else {
      if (!formsData || formsData.length === 0) {
        alert("No data available to generate PDF")
        return
      }

      try {
        setIsGeneratingPdf(true)
        const pages = formsData.map((formData, index) => ({
          component: LoanLedgerPDFPage,
          props: {
            formData: formData,
            pageNumber: index + 1,
            totalPages: formsData.length,
          },
        }))

        await generatePDF(pages, { totalForms: formsData.length }, { autoDownload: true })
      } catch (error) {
        console.error("Error generating PDF:", error)
        alert("Error generating PDF. Please try again.")
      } finally {
        setIsGeneratingPdf(false)
      }
    }
  }

  const handleClosePdf = () => {
    setPdfData(null)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg">Loading loan data from API...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="text-center max-w-4xl">
          <h2 className="text-2xl font-bold text-red-600 mb-4">API Connection Failed</h2>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <h3 className="font-bold text-red-800 mb-2">Error Details:</h3>
            <pre className="text-sm text-red-800 whitespace-pre-wrap text-left bg-red-100 p-3 rounded">{error}</pre>
          </div>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => window.location.reload()} className="bg-blue-600 hover:bg-blue-700">
              Retry Connection
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (formsData.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-600 mb-2">No Data Available</h2>
          <p className="text-gray-500">No member data found in the API response.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">KCC Loan Ledger</h1>

      <div className="flex gap-4 mb-4">
       
        <Button onClick={handleDownloadPdf} disabled={isGeneratingPdf || isPdfMode} variant="outline">
          {isGeneratingPdf ? "Generating PDF..." : "Download PDF"}
        </Button>
        {pdfData && (
          <Button onClick={handleClosePdf} variant="secondary">
            Close PDF View
          </Button>
        )}
      </div>

      {pdfData && (
        <div className="mb-6 border rounded-lg overflow-hidden">
          <div className="bg-gray-100 p-3 border-b flex justify-between items-center">
            <h3 className="font-semibold">PDF Preview: {pdfData.filename}</h3>
            <Button onClick={handleClosePdf} size="sm" variant="ghost">
              ✕
            </Button>
          </div>
          <div className="h-[800px]">
            <iframe src={pdfData.dataUri} className="w-full h-full border-0" title="PDF Preview" />
          </div>
        </div>
      )}

      {!pdfData && (
        <div className="min-h-screen bg-gray-50 p-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center p-4" style={{ backgroundColor: "#f9fafb" }}>
              <div className="mb-6 text-center">
                <h1 className="text-3xl font-bold mb-2">Loan Ledger Collection</h1>
                <p className="text-gray-600 mb-4">Total Forms: {formsData.length}</p>
              </div>

              <div id="loan-forms-container" className="space-y-8">
                {formsData.map((formData, formIndex) => (
                  <div
                    key={formIndex}
                    id={`loan-form-${formIndex}`}
                    className="p-8 bg-white text-black font-serif text-[10px] leading-tight min-h-[210mm] w-[297mm] shadow-lg"
                    style={{ pageBreakAfter: "always" }}
                  >
                    {/* Header Section */}
                    <div className="flex flex-col items-center mb-4">
                      <h1 className="text-lg font-bold mb-2 text-center">{formData.organizationName}</h1>
                    </div>

                    {/* Top Details Section */}
                    <div className="grid grid-cols-3 gap-x-4 gap-y-1 mb-4 relative">
                      {/* Row 1 */}
                      <div className="flex items-baseline">
                        <span className="w-[60px]">உ.எண்:</span>
                        <input
                          type="text"
                          name="uEnn"
                          value={formData.uEnn}
                          onChange={(e) => handleInputChange(formIndex, e)}
                          className="font-bold text-sm border-none bg-transparent focus:outline-none p-0 w-full"
                        />
                      </div>
                      <div className="flex items-baseline">
                        <span className="w-[45px]">கடன் எண்:</span>
                        <input
                          type="text"
                          name="loanNo"
                          value={formData.loanNo}
                          onChange={(e) => handleInputChange(formIndex, e)}
                          className="font-bold text-sm border-none bg-transparent focus:outline-none p-0 w-full"
                        />
                      </div>
                      <div className="flex items-baseline">
                        <span className="w-[80px]">ஆதார் எண்:</span>
                        <input
                          type="text"
                          name="aadhaarNo"
                          value={formData.aadhaarNo}
                          onChange={(e) => handleInputChange(formIndex, e)}
                          className="font-bold text-sm border-none bg-transparent focus:outline-none p-0 w-full"
                        />
                      </div>

                      {/* Row 2 */}
                      <div className="flex items-baseline">
                        <span className="w-[60px]">பெயர்:</span>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange(formIndex, e)}
                          className="font-bold text-sm border-none bg-transparent focus:outline-none p-0 w-full"
                        />
                      </div>
                      <div className="flex items-baseline">
                        <span className="w-[120px]">அனுமதிக்கப்பட்ட கடன் தொகை:</span>
                        <input
                          type="text"
                          name="approvedLoanAmount"
                          value={formData.approvedLoanAmount}
                          onChange={(e) => handleInputChange(formIndex, e)}
                          className="font-bold text-sm border-none bg-transparent focus:outline-none p-0 w-full"
                        />
                      </div>
                      <div className="flex items-baseline">
                        <span className="w-[80px]">குடும்ப அட்டை எண்:</span>
                        <input
                          type="text"
                          name="familyCardNo"
                          value={formData.familyCardNo}
                          onChange={(e) => handleInputChange(formIndex, e)}
                          className="font-bold text-sm border-none bg-transparent focus:outline-none p-0 w-full"
                        />
                      </div>

                      {/* Row 3 */}
                      <div className="flex items-baseline">
                        <span className="w-[60px]">த/த/ பெயர்:</span>
                        <input
                          type="text"
                          name="fatherHusbandName"
                          value={formData.fatherHusbandName}
                          onChange={(e) => handleInputChange(formIndex, e)}
                          className="font-bold text-sm border-none bg-transparent focus:outline-none p-0 w-full"
                        />
                      </div>
                      <div className="flex items-baseline">
                        <span className="w-[120px]">அனுமதிக்கப்பட்ட தேதி:</span>
                        <input
                          type="text"
                          name="approvedDate"
                          value={formData.approvedDate}
                          onChange={(e) => handleInputChange(formIndex, e)}
                          className="font-bold text-sm border-none bg-transparent focus:outline-none p-0 w-full"
                        />
                      </div>
                      <div className="flex items-baseline">
                        <span className="w-[80px]">PAN NO :</span>
                        <input
                          type="text"
                          name="panNo"
                          value={formData.panNo}
                          onChange={(e) => handleInputChange(formIndex, e)}
                          className="font-bold text-sm border-none bg-transparent focus:outline-none p-0 w-full"
                        />
                      </div>

                      {/* Row 4 */}
                      <div className="flex items-baseline">
                        <span className="w-[60px]">முகவரி:</span>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={(e) => handleInputChange(formIndex, e)}
                          className="font-bold text-sm border-none bg-transparent focus:outline-none p-0 w-full"
                        />
                      </div>
                      <div className="flex items-baseline">
                        <span className="w-[120px]">வட்டி விகிதம்:</span>
                        <input
                          type="text"
                          name="interestRate"
                          value={formData.interestRate}
                          onChange={(e) => handleInputChange(formIndex, e)}
                          className="font-bold text-sm border-none bg-transparent focus:outline-none p-0 w-full"
                        />
                      </div>
                      <div className="flex items-baseline">
                        <span className="w-[80px]">மொபைல் எண்:</span>
                        <input
                          type="text"
                          name="mobileNo"
                          value={formData.mobileNo}
                          onChange={(e) => handleInputChange(formIndex, e)}
                          className="font-bold text-sm border-none bg-transparent focus:outline-none p-0 w-full"
                        />
                      </div>

                      {/* Row 5 */}
                      <div className="col-span-1"></div>
                      <div className="flex items-baseline">
                        <span className="w-[120px]">தவணை தவறிய வட்டி:</span>
                        <input
                          type="text"
                          name="defaultInterest"
                          value={formData.defaultInterest}
                          onChange={(e) => handleInputChange(formIndex, e)}
                          className="font-bold text-sm border-none bg-transparent focus:outline-none p-0 w-full"
                        />
                      </div>
                      <div className="flex items-baseline">
                        <span className="w-[80px]">சேமிப்பு கணக்கு எண்:</span>
                        <input
                          type="text"
                          name="savingsAccountNo"
                          value={formData.savingsAccountNo}
                          onChange={(e) => handleInputChange(formIndex, e)}
                          className="font-bold text-sm border-none bg-transparent focus:outline-none p-0 w-full"
                        />
                      </div>

                      {/* Row 6 */}
                      <div className="flex items-baseline">
                        <span className="w-[60px]">பிணைதாரர்:</span>
                        <span className="font-bold text-sm"></span>
                      </div>
                      <div className="flex items-baseline">
                        <span className="w-[120px]">திருப்பி செலுத்தும் தேதி:</span>
                        <input
                          type="text"
                          name="repaymentDate"
                          value={formData.repaymentDate}
                          onChange={(e) => handleInputChange(formIndex, e)}
                          className="font-bold text-sm border-none bg-transparent focus:outline-none p-0 w-full"
                        />
                      </div>
                      <div className="flex items-baseline">
                        <span className="w-[80px]">மொத்த பரப்பு:</span>
                        <input
                          type="text"
                          name="totalArea"
                          value={formData.totalArea}
                          onChange={(e) => handleInputChange(formIndex, e)}
                          className="font-bold text-sm border-none bg-transparent focus:outline-none p-0 w-full"
                        />
                      </div>

                      {/* Row 7 */}
                      <div className="flex items-baseline">
                        <span className="w-[60px]">உ.எண்:</span>
                        <input
                          type="text"
                          name="guarantorUEnn"
                          value={formData.guarantorUEnn}
                          onChange={(e) => handleInputChange(formIndex, e)}
                          className="font-bold text-sm border-none bg-transparent focus:outline-none p-0 w-full"
                        />
                      </div>
                      <div className="flex items-baseline">
                        <span className="w-[120px]">தீர்மான எண்:</span>
                        <input
                          type="text"
                          name="resolutionNo"
                          value={formData.resolutionNo}
                          onChange={(e) => handleInputChange(formIndex, e)}
                          className="font-bold text-sm border-none bg-transparent focus:outline-none p-0 w-full"
                        />
                      </div>
                      <div className="col-span-1 flex justify-end items-start">
                        <span className="font-bold text-sm mr-0.5">{formIndex + 1}</span>
                      </div>

                      {/* Row 8 */}
                      <div className="flex items-baseline">
                        <span className="w-[60px]">பெயர்:</span>
                        <input
                          type="text"
                          name="guarantorName"
                          value={formData.guarantorName}
                          onChange={(e) => handleInputChange(formIndex, e)}
                          className="font-bold text-sm border-none bg-transparent focus:outline-none p-0 w-full"
                        />
                      </div>
                      <div className="flex items-baseline">
                        <span className="w-[120px]">நாள்:</span>
                        <input
                          type="text"
                          name="guarantorDate"
                          value={formData.guarantorDate}
                          onChange={(e) => handleInputChange(formIndex, e)}
                          className="font-bold text-sm border-none bg-transparent focus:outline-none p-0 w-full"
                        />
                      </div>
                      <div className="col-span-1"></div>

                      {/* Row 9 */}
                      <div className="flex items-baseline">
                        <span className="w-[60px]">முகவரி:</span>
                        <input
                          type="text"
                          name="guarantorAddress"
                          value={formData.guarantorAddress}
                          onChange={(e) => handleInputChange(formIndex, e)}
                          className="font-bold text-sm border-none bg-transparent focus:outline-none p-0 w-full"
                        />
                      </div>
                      <div className="col-span-2"></div>

                      {/* Images */}
                      {(formData.userPhotoUrl || formData.friendPhotoUrl) && (
                        <div className="absolute top-0 right-0 flex items-start gap-2">
                          {formData.userPhotoUrl && (
                            <div className="flex flex-col items-center">
                              <div className="text-[8px] mb-1">படம்</div>
                              <img
                                src={formData.userPhotoUrl}
                                alt="User Photo"
                                className="w-16 h-20 border border-black object-cover"
                              />
                            </div>
                          )}
                          {formData.friendPhotoUrl && (
                            <div className="flex flex-col items-center">
                              <div className="text-[8px] mb-1">நண்பர் படம்</div>
                              <img
                                src={formData.friendPhotoUrl}
                                alt="Friend Photo"
                                className="w-16 h-20 border border-black object-cover"
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Principal Borrower / Surity Section */}
                    <div className="flex justify-around mt-4 mb-4">
                      <div className="flex flex-col items-center w-1/3">
                        <div className="border-b border-black w-full mb-1"></div>
                        <span className="font-bold text-sm">PRINCIPAL BORROWER</span>
                      </div>
                      <div className="flex flex-col items-center w-1/3">
                        <div className="border-b border-black w-full mb-1"></div>
                        <span className="font-bold text-sm">SURITY</span>
                      </div>
                    </div>

                    {/* Loan Disbursement Details Table */}
                    <div className="text-center font-bold text-lg mb-4 mt-2">
                      கடன் வழங்கிய விபரம்
                    </div>
                    
                    <div className="border-[1px] border-black">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr style={{ backgroundColor: "#f3f4f6" }}>
                            <th rowSpan={2} className="border-2 border-black p-2 text-[11px] font-bold text-center align-middle w-12">
                              Sl. No
                            </th>
                            <th rowSpan={2} className="border-2 border-black p-2 text-[11px] font-bold text-center align-middle w-32">
                              Name of the Crop
                            </th>
                            <th rowSpan={2} className="border-2 border-black p-2 text-[11px] font-bold text-center align-middle w-24">
                              Extent of Land Ac Cent
                            </th>
                            <th colSpan={6} className="border-2 border-black p-2 text-[11px] font-bold text-center">
                              Expense Categories
                            </th>
                            <th rowSpan={2} className="border-2 border-black p-2 text-[11px] font-bold text-center align-middle w-20">
                              Total
                            </th>
                            <th colSpan={5} className="border-2 border-black p-2 text-[11px] font-bold text-center">
                              Account Details
                            </th>
                            <th rowSpan={2} className="border-2 border-black p-2 text-[11px] font-bold text-center align-middle w-16">
                              No of Days
                            </th>
                            <th rowSpan={2} className="border-2 border-black p-2 text-[11px] font-bold text-center align-middle w-20">
                              Product
                            </th>
                            <th colSpan={2} className="border-2 border-black p-2 text-[11px] font-bold text-center">
                              Interest
                            </th>
                            <th rowSpan={2} className="border-2 border-black p-2 text-[11px] font-bold text-center align-middle w-16">
                              Initial
                            </th>
                          </tr>
                          <tr style={{ backgroundColor: "#f3f4f6" }}>
                            <th className="border-2 border-black p-2 text-[11px] font-bold text-center w-16">Cash</th>
                            <th className="border-2 border-black p-2 text-[11px] font-bold text-center w-20">Seed/ Raw Materials</th>
                            <th className="border-2 border-black p-2 text-[11px] font-bold text-center w-18">Fertilizer</th>
                            <th className="border-2 border-black p-2 text-[11px] font-bold text-center w-18">Micro Nutrients</th>
                            <th className="border-2 border-black p-2 text-[11px] font-bold text-center w-18">Pesticide</th>
                            <th className="border-2 border-black p-2 text-[11px] font-bold text-center w-20">Others/ Insurance</th>
                            <th className="border-2 border-black p-2 text-[11px] font-bold text-center w-16">தேதி</th>
                            <th className="border-2 border-black p-2 text-[11px] font-bold text-center w-18">விபரம்</th>
                            <th className="border-2 border-black p-2 text-[11px] font-bold text-center w-16">வரவு</th>
                            <th className="border-2 border-black p-2 text-[11px] font-bold text-center w-18">பட்டுவாடா</th>
                            <th className="border-2 border-black p-2 text-[11px] font-bold text-center w-16">நிலுவை</th>
                            <th className="border-2 border-black p-2 text-[11px] font-bold text-center w-16">Due</th>
                            <th className="border-2 border-black p-2 text-[11px] font-bold text-center w-18">Received</th>
                          </tr>
                        </thead>
                        <tbody>
                          {formData.tableRows.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                              <td className="border border-black p-1 text-center">
                                <input
                                  type="text"
                                  name="slNo"
                                  value={row.slNo}
                                  onChange={(e) => handleTableRowChange(formIndex, rowIndex, e)}
                                  className="w-full border-none bg-transparent focus:outline-none p-0 text-center text-[10px]"
                                />
                              </td>
                              <td className="border border-black p-1 text-left">
                                <input
                                  type="text"
                                  name="cropName"
                                  value={row.cropName}
                                  onChange={(e) => handleTableRowChange(formIndex, rowIndex, e)}
                                  className="w-full border-none bg-transparent focus:outline-none p-0 text-left text-[10px]"
                                />
                              </td>
                              <td className="border border-black p-1 text-center">
                                {/* <input
                                  type="text"
                                  name="extentLand"
                                  value={row.extentLand}
                                  onChange={(e) => handleTableRowChange(formIndex, rowIndex, e)}
                                  className="w-full border-none bg-transparent focus:outline-none p-0 text-center text-[10px]"
                                /> */}
                              </td>
                              <td className="border border-black p-1 text-right">
                                <input
                                  type="text"
                                  name="cash"
                                  value={row.cash}
                                  onChange={(e) => handleTableRowChange(formIndex, rowIndex, e)}
                                  className="w-full border-none bg-transparent focus:outline-none p-0 text-right text-[10px]"
                                />
                              </td>
                              <td className="border border-black p-1 text-right">
                                <input
                                  type="text"
                                  name="seedRawMaterials"
                                  value={row.seedRawMaterials}
                                  onChange={(e) => handleTableRowChange(formIndex, rowIndex, e)}
                                  className="w-full border-none bg-transparent focus:outline-none p-0 text-right text-[10px]"
                                />
                              </td>
                              <td className="border border-black p-1 text-right">
                                <input
                                  type="text"
                                  name="fertilizer"
                                  value={row.fertilizer}
                                  onChange={(e) => handleTableRowChange(formIndex, rowIndex, e)}
                                  className="w-full border-none bg-transparent focus:outline-none p-0 text-right text-[10px]"
                                />
                              </td>
                              <td className="border border-black p-1 text-right">
                                <input
                                  type="text"
                                  name="microNutrients"
                                  value={row.microNutrients}
                                  onChange={(e) => handleTableRowChange(formIndex, rowIndex, e)}
                                  className="w-full border-none bg-transparent focus:outline-none p-0 text-right text-[10px]"
                                />
                              </td>
                              <td className="border border-black p-1 text-right">
                                <input
                                  type="text"
                                  name="pesticide"
                                  value={row.pesticide}
                                  onChange={(e) => handleTableRowChange(formIndex, rowIndex, e)}
                                  className="w-full border-none bg-transparent focus:outline-none p-0 text-right text-[10px]"
                                />
                              </td>
                              <td className="border border-black p-1 text-right">
                                <input
                                  type="text"
                                  name="othersInsurance"
                                  value={row.othersInsurance}
                                  onChange={(e) => handleTableRowChange(formIndex, rowIndex, e)}
                                  className="w-full border-none bg-transparent focus:outline-none p-0 text-right text-[10px]"
                                />
                              </td>
                              <td className="border border-black p-1 text-right font-bold">
                                <input
                                  type="text"
                                  name="total"
                                  value={row.total}
                                  readOnly
                                  className="w-full border-none bg-transparent focus:outline-none p-0 text-right font-bold text-[10px]"
                                />
                              </td>
                              <td className="border border-black p-1 text-center">
                                <input
                                  type="text"
                                  name="date"
                                  value={row.date}
                                  onChange={(e) => handleTableRowChange(formIndex, rowIndex, e)}
                                  className="w-full border-none bg-transparent focus:outline-none p-0 text-center text-[10px]"
                                />
                              </td>
                              <td className="border border-black p-1 text-left">
                                <input
                                  type="text"
                                  name="description"
                                  value={row.description}
                                  onChange={(e) => handleTableRowChange(formIndex, rowIndex, e)}
                                  className="w-full border-none bg-transparent focus:outline-none p-0 text-left text-[10px]"
                                />
                              </td>
                              <td className="border border-black p-1 text-right">
                                <input
                                  type="text"
                                  name="credit"
                                  value={row.credit}
                                  onChange={(e) => handleTableRowChange(formIndex, rowIndex, e)}
                                  className="w-full border-none bg-transparent focus:outline-none p-0 text-right text-[10px]"
                                />
                              </td>
                              <td className="border border-black p-1 text-right">
                                <input
                                  type="text"
                                  name="disbursement"
                                  value={row.disbursement}
                                  onChange={(e) => handleTableRowChange(formIndex, rowIndex, e)}
                                  className="w-full border-none bg-transparent focus:outline-none p-0 text-right text-[10px]"
                                />
                              </td>
                              <td className="border border-black p-1 text-right">
                                <input
                                  type="text"
                                  name="balance"
                                  value={row.balance}
                                  onChange={(e) => handleTableRowChange(formIndex, rowIndex, e)}
                                  className="w-full border-none bg-transparent focus:outline-none p-0 text-right text-[10px]"
                                />
                              </td>
                              <td className="border border-black p-1 text-right">
                                <input
                                  type="text"
                                  name="noOfDays"
                                  value={row.noOfDays}
                                  onChange={(e) => handleTableRowChange(formIndex, rowIndex, e)}
                                  className="w-full border-none bg-transparent focus:outline-none p-0 text-right text-[10px]"
                                />
                              </td>
                              <td className="border border-black p-1 text-right">
                                <input
                                  type="text"
                                  name="product"
                                  value={row.product}
                                  onChange={(e) => handleTableRowChange(formIndex, rowIndex, e)}
                                  className="w-full border-none bg-transparent focus:outline-none p-0 text-right text-[10px]"
                                />
                              </td>
                              <td className="border border-black p-1 text-right">
                                <input
                                  type="text"
                                  name="interestDue"
                                  value={row.interestDue}
                                  onChange={(e) => handleTableRowChange(formIndex, rowIndex, e)}
                                  className="w-full border-none bg-transparent focus:outline-none p-0 text-right text-[10px]"
                                />
                              </td>
                              <td className="border border-black p-1 text-right">
                                <input
                                  type="text"
                                  name="interestReceived"
                                  value={row.interestReceived}
                                  onChange={(e) => handleTableRowChange(formIndex, rowIndex, e)}
                                  className="w-full border-none bg-transparent focus:outline-none p-0 text-right text-[10px]"
                                />
                              </td>
                              <td className="border border-black p-1 text-right">
                                <input
                                  type="text"
                                  name="initial"
                                  value={row.initial}
                                  onChange={(e) => handleTableRowChange(formIndex, rowIndex, e)}
                                  className="w-full border-none bg-transparent focus:outline-none p-0 text-right text-[10px]"
                                />
                              </td>
                            </tr>
                          ))}
                          {/* Total Row */}
                          <tr>
                            <td colSpan={2} className="border border-black p-1 text-center font-bold text-[10px]">
                              மொத்தம்
                            </td>
                            <td className="border border-black p-1 text-center font-bold text-[10px]">
                              {calculateGrandTotal(formIndex, "extentLand")}
                            </td>
                            <td className="border border-black p-1 text-right font-bold text-[10px]">
                              {calculateGrandTotal(formIndex, "cash")}
                            </td>
                            <td className="border border-black p-1 text-right font-bold text-[10px]">
                              {calculateGrandTotal(formIndex, "seedRawMaterials")}
                            </td>
                            <td className="border border-black p-1 text-right font-bold text-[10px]">
                         
                            </td>
                            <td className="border border-black p-1 text-right font-bold text-[10px]">
                             
                            </td>
                            <td className="border border-black p-1 text-right font-bold text-[10px]">
                              
                            </td>
                            <td className="border border-black p-1 text-right font-bold text-[10px]">
                          
                            </td>
                            <td className="border border-black p-1 text-right font-bold text-[10px]">
                              {calculateGrandTotal(formIndex, "total")}
                            </td>
                            <td className="border border-black p-1"></td>
                            <td className="border border-black p-1"></td>
                            <td className="border border-black p-1 text-right font-bold text-[10px]">
                              
                            </td>
                            <td className="border border-black p-1 text-right font-bold text-[10px]">
                              {calculateGrandTotal(formIndex, "disbursement")}
                            </td>
                            <td className="border border-black p-1 text-right font-bold text-[10px]">
                              {calculateGrandTotal(formIndex, "balance")}
                            </td>
                            <td className="border border-black p-1 text-right font-bold text-[10px]">
                             
                            </td>
                            <td className="border border-black p-1 text-right font-bold text-[10px]">
                             
                            </td>
                            <td className="border border-black p-1 text-right font-bold text-[10px]">
                              {calculateGrandTotal(formIndex, "interestDue")}
                            </td>
                            <td className="border border-black p-1 text-right font-bold text-[10px]">
                              {calculateGrandTotal(formIndex, "interestReceived")}
                            </td>
                            <td className="border border-black p-1 text-right font-bold text-[10px]">
                              {calculateGrandTotal(formIndex, "initial")}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}