


"use client"

import { useState, useRef, useEffect } from "react"
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input'; // Adjust the import path based on your project structure
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Download, Edit3, X, Filter, RefreshCw, Database, Plus, Eye, Server } from "lucide-react"
import type { KCCData, KCCMember, FilterOptions } from "@/types/kcc-types"
import { filterKCCMembers, calculateKCCTotals } from "@/utils/kcc-utils"
import { KCCPage1 } from "../pages/Kccsheets/kcc-page-1"
import KCCPage2 from "../pages/Kccsheets/kcc-page-2"
import KCCPage3 from "../pages/Kccsheets/kcc-page-3"
import { KCCPage4 } from "../pages/Kccsheets/kcc-page-4"
import { KCCPage5 } from "../pages/Kccsheets/Kcc-page-5"
import LoanReport from "./LoanReport"

interface RawUser {
  id: number | string
  created_at?: string
  userjson: any
}

interface ExtendedKCCMember extends KCCMember {
  formSections?: Record<string, boolean>
  goldDetails?: any
  friendDetails?: any
  ownProperty?: any
  documents?: any
  landParcels?: any[]
  selectedCrops?: any[]
  fatherName?: string
  phoneNo?: string
  userInformation?: any
}

function mapUserToKCCMember(user: RawUser): ExtendedKCCMember {
  const userJson = user.userjson || user
  const userInfo = userJson?.userInformation || {}
  const loanDetails = userJson?.loanDetails || {}
  const landDetails = userJson?.landDetails || {}
  const calculatedFields = userJson?.calculatedFields || {}

  const addressComponents = [userInfo["முகவரி"], userInfo["கிராமம்"], userInfo["வட்டம்"], "சேலம் மாவட்டம்"].filter(Boolean)
  const fullAddress = addressComponents.join(", ")

  let category = "Unknown"
  if (Array.isArray(loanDetails.selectedCrops) && loanDetails.selectedCrops.length > 0) {
    category = loanDetails.selectedCrops
      .map((item: any) => {
        if (item?.crop?.name_of_crop) {
          const cropName = item.crop.name_of_crop
          const acres = item.acres || 0
          const amount = item.eligibleAmount || 0
          return `${cropName} (${acres}ac) - ₹${amount.toLocaleString("en-IN")}`
        }
        return "Unknown"
      })
      .join(", ")
  }
   
  const selectedCrops = Array.isArray(loanDetails.selectedCrops)
    ? loanDetails.selectedCrops.map((item: any) => ({
        ...item,
        breakdown: item.breakdown || {},
        eligibleAmount: item.eligibleAmount || 0,
        cropName: item.crop?.name_of_crop || "Unknown Crop",
        acres: item.acres || 0,
      }))
    : []

  return {
    id: String(user.id || userInfo.உ_எண் || Date.now()),
    serialNo: userInfo["உ_எண்"] || userInfo.uNumber || "",
    memberName: userInfo["பெயர்"] || userInfo.name || "பெயர் இல்லை",
    fatherName: userInfo["தகபெயர்"] || "",
    category,
    landArea: calculatedFields.totalLandArea || Number(landDetails.totalLandArea) || Number(userInfo["மொத்த_நிலம்"]) || 0,
    farmerType: landDetails.farmerType || calculatedFields.farmerType || "MF",
    classification: userInfo["ஜாதி"] || userInfo.classification || "Others",
    aadhaarNo: userInfo["ஆதார்_எண்"] || userInfo.aadhaarNumber || "",
    accountNo: userInfo["sdccb_kcc_கணக்கு_எண்"] || userInfo.accountNo || "",
    phoneNo: userInfo["கைபேசி_எண்"] || "",
    amount: calculatedFields.totalEligibleAmount || Number(loanDetails.totalEligibleAmount) || Number(userInfo.principle_amount) || 0,
    date: user.created_at ? user.created_at.split("T")[0] : new Date().toISOString().split("T")[0],
    formSections: userJson?.metadata?.formSections,
    goldDetails: userJson?.goldDetails,
    friendDetails: userJson?.friendDetails,
    ownProperty: userJson?.ownProperty,
    documents: userJson?.documents,
    landParcels: landDetails.landParcels || [],
    selectedCrops,
    userInformation: userJson.userInformation // Include complete user information
  }
}
export default function MainKCCSystemUpdated() {
  const [showLoanReport, setShowLoanReport] = useState(false);

  if (showLoanReport) {
    return (<LoanReport />); // 👈 show LoanReport when Back button clicked
  }

  const printRef = useRef<HTMLDivElement>(null)
  const [kccDate, setKccDate] = useState("2025-08-27");
  

useEffect(() => {
  const savedDate = localStorage.getItem("kccdate");
  if (savedDate) {
    setKccDate(savedDate);
  }
}, []);

  // State variables
  const [isEditing, setIsEditing] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showMainPage, setShowMainPage] = useState(true)
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])
  const [samplePreviewData, setSamplePreviewData] = useState<ExtendedKCCMember[]>([])
  const [rawUserData, setRawUserData] = useState<RawUser[]>([])

  const [filters, setFilters] = useState<FilterOptions>({
    searchTerm: "",
    dateRange: { start: "", end: "" },
    farmerType: "ALL",
    classification: "ALL",
  })

  const [originalData, setOriginalData] = useState<KCCData>({
    members: [],
    financial: {
      transitAccount: 840000,
      loanComponents: {
        seeds: 794000,
        fertilizer: 46000,
        pesticide: 0,
        insurance: 0,
        others: 0,
      },
      total: 840000,
    },
    cropDetails: {
      cropName: "பருத்தி-BT ரகம்",
      extent: 3.42,
      expenses: {
        cash: 117558,
        seeds: 4104,
        pesticide: 5814,
        fertilizer: 3900,
        others: 3624,
        insurance: 0,
      },
      total: 135000,
    },
    settings: {
      organizationName: "S.1374 மருது ஞ்சாவடி தொடர்க்க வேளாண்மை கூட்டுறவு கடன் சங்கம்",
      address: "மருது ஞ்சாவடிஅஞ்சல், சங்கப்பிரி வட்டம், சேலம் மாவட்டம் - 637103",
      date: "2025ம் வருடம் ஜூலை மாதம் நே தேதி",
      meetingDetails: "S.1374 மருது ஞ்சாவடி தொடர்க்க வேளாண்மை கூட்டுறவு கடன் சங்கம் செயலாளர் நடத்திய கூட்டம்",
      accountNumber: "716417262",
    },
    goldDetails: {
      items: [],
      hasGold: false,
      totalItems: 0,
      totalValue: 0,
      goldSummary: { totalCount: 0, totalTypes: 0, highestValue: 0, averageWeight: 0 },
      marketValue: 6000,
      totalWeight: 0,
      goldItemsDetails: [],
    },
    friendDetails: {
      acre: "",
      name: "",
      phone: "",
      address: "",
      hasData: false,
      summary: null,
      uNumber: "",
      hasImage: false,
      imageUrl: "",
      fatherName: "",
      surveyNumber: "",
      aadhaarNumber: "",
      detailedInfo: {},
    },
    ownProperty: {
      value: 0,
      description: "",
      hasProperty: false,
      hasPropertyData: false,
      mortgageDetails: {
        a: "",
        ca: "",
        extent: "",
        village: "",
        irrigation: "",
        mortgageReg: "",
        surveyNumber: "",
        guidanceValue: 0,
        mortgageAmount: 0,
        hasMortgageData: false,
        registrarOffice: "",
      },
      propertySummary: {
        totalValue: 0,
        guidanceValue: 0,
        mortgageValue: 0,
        hasDescription: false,
        hasMortgageDetails: false,
      },
    },
  })

  const [filteredData, setFilteredData] = useState<KCCData>(originalData)

  useEffect(() => {
    if (originalData.members.length === 0) {
      const sampleMembers = [
        {
          id: "1",
          serialNo: "001",
          memberName: "முருகன் கே",
          fatherName: "கண்ணன்",
          category: "பருத்தி-BT ரகம்",
          landArea: 2.5,
          farmerType: "MF",
          classification: "SC",
          aadhaarNo: "1234 5678 9012",
          accountNo: "123 456 789",
          phoneNo: "9876543210",
          amount: 125000,
          date: "2025-01-11",
          selectedCrops: [
            {
              crop: { name_of_crop: "பருத்தி-BT ரகம்" },
              acres: 2.5,
              eligibleAmount: 125000,
              breakdown: {
                thozhu_uram: 15000,
                uram_1: 25000,
                uram_2: 20000,
                rokkam: 45000,
                poochi_marundhu: 12000,
                vithai: 8000,
              },
            },
          ],
          userInformation: {
            pan_file: null,
            checkboxes: { kcc: true, jewel: false, kccah: false, tractor: false },
            user_photo: null,
            pan_preview: null,
            ration_file: null,
            aadhaar_file: null,
            friend_photo: null,
            ஜாதி: "SC",
            உ_எண்: "001",
            ration_preview: null,
            aadhaar_preview: null,
            பெயர்: "முருகன் கே",
            principle_amount: "125000",
            user_photo_preview: null,
            முகவரி: "மருது ஞ்சாவடி",
            வட்டம்: "சங்கப்பிரி",
            நிலம்1_ac: "2.5",
            கிராமம்: "மருது ஞ்சாவடி",
            தகபெயர்: "கண்ணன்",
            ஆதார்_எண்: "1234 5678 9012",
            கைபேசி_எண்: "9876543210",
            sdccb_kcc_கணக்கு_எண்: "123 456 789",
            மொத்த_நிலம்: "2.5",
            நிலம்1_சர்வே_எண்: "123"
          }
        },
        // Add more sample members as needed
      ]
      // setOriginalData((prev) => ({
      //   ...prev,
      //   members: sampleMembers,
      //   settings: {
      //     ...prev.settings,
      //     resolutionNumber: "152",
      //   },
      // }))
    }
  }, [])
const API_URL = process.env.NEXT_PUBLIC_API_URL;
 const fetchPreviewData= async () => {
  setIsLoading(true);
  try {
    // Add loantype=KCC parameter to only get KCC users
    const response = await fetch(`${API_URL}/get-all-users?loantype=kcc`);
    
    if (!response.ok) throw new Error(`Server error ${response.status}`);

    const data = await response.json();
    if (!data.success || !Array.isArray(data.users)) {
      throw new Error("Unexpected server data format");
    }
    
    console.log("All KCC Users:", data.users);
    localStorage.setItem("kccUsers", JSON.stringify(data.users));
    console.log( "KCC Data:", data);
    setRawUserData(data.users);
    const mappedUsers = data.users.map(mapUserToKCCMember);
    setSamplePreviewData(mappedUsers);
  } catch (error) {
    console.error("Fetch failed:", error);
    alert(`Could not fetch data: ${error instanceof Error ? error.message : "Unknown error"}`);
    setSamplePreviewData([]);
    setRawUserData([]);
  } finally {
    setIsLoading(false);
  }
};

  const getSelectedUserDetails = () => {
    const selectedRawUsers = rawUserData.filter((user) => selectedMembers.includes(String(user.id || Date.now())))

    const aggregatedDetails = {
      cropDetails: {
        selectedCrops: [] as any[],
        totalEligibleAmount: 0,
        cropName: "",
        extent: 0,
        expenses: {
          cash: 0,
          seeds: 0,
          pesticide: 0,
          fertilizer: 0,
          others: 0,
          insurance: 0,
        },
        total: 0,
        cropsWithAmounts: "",
      },
      friendDetails: null as any,
      goldDetails: {
        items: [] as any[],
        hasGold: false,
        totalItems: 0,
        totalValue: 0,
        goldSummary: {
          totalCount: 0,
          totalTypes: 0,
          highestValue: 0,
          averageWeight: 0,
        },
        marketValue: 6000,
        totalWeight: 0,
        goldItemsDetails: [] as any[],
      },
      ownProperty: null as any,
      userInformation: {} as any,
      landDetails: {} as any,
      documents: {} as any,
    }

    selectedRawUsers.forEach((user) => {
      const userJson = user.userjson || user

      if (!aggregatedDetails.userInformation.name && userJson.userInformation) {
        aggregatedDetails.userInformation = {
          ...userJson.userInformation,
          fullAddress: [
            userJson.userInformation["முகவரி"],
            userJson.userInformation["கிராமம்"],
            userJson.userInformation["வட்டம்"],
            "சேலம் மாவட்டம்",
          ]
            .filter(Boolean)
            .join(", "),
          pan_file: userJson.userInformation.pan_file,
          checkboxes: userJson.userInformation.checkboxes || {},
          user_photo: userJson.userInformation.user_photo,
          pan_preview: userJson.userInformation.pan_preview,
          ration_file: userJson.userInformation.ration_file,
          aadhaar_file: userJson.userInformation.aadhaar_file,
          friend_photo: userJson.userInformation.friend_photo,
          ration_preview: userJson.userInformation.ration_preview,
          aadhaar_preview: userJson.userInformation.aadhaar_preview,
          user_photo_preview: userJson.userInformation.user_photo_preview,
          friend_photo_preview: userJson.userInformation.friend_photo_preview,
          formSections: userJson.metadata?.formSections
        }
      }

      if (userJson.landDetails) {
        aggregatedDetails.landDetails = {
          ...userJson.landDetails,
          parcels: userJson.landDetails.landParcels || [],
        }
      }

      if (userJson.documents) {
        aggregatedDetails.documents = {
          ...userJson.documents,
          summary: userJson.documents.documentsSummary || {},
        }
      }

      if (userJson?.loanDetails?.selectedCrops && Array.isArray(userJson.loanDetails.selectedCrops)) {
        aggregatedDetails.cropDetails.selectedCrops.push(...userJson.loanDetails.selectedCrops)
        aggregatedDetails.cropDetails.totalEligibleAmount += userJson.loanDetails.totalEligibleAmount || 0

        const cropAmounts = userJson.loanDetails.selectedCrops
          .map((crop: any) => {
            const cropName = crop.crop?.name_of_crop || "Unknown Crop"
            const acres = crop.acres || 0
            const amount = crop.eligibleAmount || 0
            return `${cropName} (${acres}ac) - ₹${amount.toLocaleString("en-IN")}`
          })
          .join(", ")

        if (!aggregatedDetails.cropDetails.cropsWithAmounts) {
          aggregatedDetails.cropDetails.cropsWithAmounts = cropAmounts
        } else {
          aggregatedDetails.cropDetails.cropsWithAmounts += ", " + cropAmounts
        }

        userJson.loanDetails.selectedCrops.forEach((cropItem: any) => {
          if (cropItem.acres) {
            aggregatedDetails.cropDetails.extent += Number(cropItem.acres) || 0
          }

          const breakdown = cropItem.breakdown || {}
          aggregatedDetails.cropDetails.expenses.cash += Number(breakdown.rokkam) || 0
          aggregatedDetails.cropDetails.expenses.seeds += Number(breakdown.vithai) || 0
          aggregatedDetails.cropDetails.expenses.pesticide += Number(breakdown.poochi_marundhu) || 0
          aggregatedDetails.cropDetails.expenses.fertilizer += Number(breakdown.uram_1) || 0
          aggregatedDetails.cropDetails.expenses.fertilizer += Number(breakdown.uram_2) || 0
          aggregatedDetails.cropDetails.expenses.fertilizer += Number(breakdown.thozhu_uram) || 0

          if (!aggregatedDetails.cropDetails.cropName && cropItem.crop?.name_of_crop) {
            aggregatedDetails.cropDetails.cropName = cropItem.crop.name_of_crop
          }
        })
      }

      if (!aggregatedDetails.friendDetails && userJson?.friendDetails?.hasData) {
        const fd = userJson.friendDetails
        aggregatedDetails.friendDetails = {
          ...fd,
          hasData: true,
          name: fd.name || fd.detailedInfo?.பெயர் || "",
          phone: fd.phone || fd.detailedInfo?.கைபேசி_எண் || "",
          address: fd.address || fd.detailedInfo?.முகவரி || "",
          uNumber: fd.uNumber || fd.detailedInfo?.உ_எண் || "",
          fatherName: fd.fatherName || fd.detailedInfo?.தகபேயர் || "",
          surveyNumber: fd.surveyNumber || fd.detailedInfo?.சர்வே_எண் || "",
          aadhaarNumber: fd.aadhaarNumber || fd.detailedInfo?.ஆதார்_எண் || "",
          acre: fd.acre || fd.detailedInfo?.எக்கர் || "",
          hasImage: fd.hasImage || false,
          imageUrl: fd.imageUrl || fd.detailedInfo?.படம்_URL || "",
        }
      }

      if (userJson?.goldDetails) {
        if (!aggregatedDetails.goldDetails) {
          aggregatedDetails.goldDetails = {
            items: [],
            hasGold: false,
            totalItems: 0,
            totalValue: 0,
            goldSummary: {
              totalCount: 0,
              totalTypes: 0,
              highestValue: 0,
              averageWeight: 0,
            },
            marketValue: userJson.goldDetails.marketValue || 6000,
            totalWeight: 0,
            goldItemsDetails: [],
          }
        }

        if (userJson.goldDetails.hasGold && userJson.goldDetails.items?.length > 0) {
          aggregatedDetails.goldDetails.hasGold = true
          aggregatedDetails.goldDetails.items.push(...userJson.goldDetails.items)
          aggregatedDetails.goldDetails.totalItems += userJson.goldDetails.totalItems || 0
          aggregatedDetails.goldDetails.totalValue += userJson.goldDetails.totalValue || 0
          aggregatedDetails.goldDetails.totalWeight += userJson.goldDetails.totalWeight || 0

          if (userJson.goldDetails.goldItemsDetails?.length > 0) {
            aggregatedDetails.goldDetails.goldItemsDetails.push(...userJson.goldDetails.goldItemsDetails)
          }
        }
      }

      if (!aggregatedDetails.ownProperty && userJson?.ownProperty?.hasPropertyData) {
        const ownProp = userJson.ownProperty
        aggregatedDetails.ownProperty = {
          ...ownProp,
          hasProperty: ownProp.hasProperty || false,
          hasPropertyData: true,
          value: Number(ownProp.value) || 0,
          description: ownProp.description || "",
          mortgageDetails: {
            hasMortgageData: ownProp.mortgageDetails?.hasMortgageData || false,
            mortgageAmount: Number(ownProp.mortgageDetails?.mortgageAmount) || 0,
            guidanceValue: Number(ownProp.mortgageDetails?.guidanceValue) || 0,
            village: ownProp.mortgageDetails?.village || "",
            surveyNumber: ownProp.mortgageDetails?.surveyNumber || "",
            extent: ownProp.mortgageDetails?.extent || "",
            irrigation: ownProp.mortgageDetails?.irrigation || "",
            mortgageReg: ownProp.mortgageDetails?.mortgageReg || "",
            registrarOffice: ownProp.mortgageDetails?.registrarOffice || "",
            a: ownProp.mortgageDetails?.a || "",
            ca: ownProp.mortgageDetails?.ca || "",
          },
          propertySummary: {
            totalValue: Number(ownProp.propertySummary?.totalValue) || 0,
            guidanceValue: Number(ownProp.propertySummary?.guidanceValue) || 0,
            mortgageValue: Number(ownProp.propertySummary?.mortgageValue) || 0,
            hasDescription: !!ownProp.description,
            hasMortgageDetails: ownProp.mortgageDetails?.hasMortgageData || false,
          },
        }
      }
    })

    aggregatedDetails.cropDetails.total = Object.values(aggregatedDetails.cropDetails.expenses).reduce(
      (sum, val) => sum + val,
      0,
    )

    if (aggregatedDetails.goldDetails?.items?.length > 0) {
      const items = aggregatedDetails.goldDetails.items
      aggregatedDetails.goldDetails.goldSummary = {
        totalCount: items.length,
        totalTypes: new Set(items.map((item) => item.type || item.name)).size,
        highestValue: Math.max(...items.map((item) => Number(item.value) || 0)),
        averageWeight: items.reduce((sum, item) => sum + (Number(item.weight) || 0), 0) / items.length || 0,
      }
    }

    return aggregatedDetails
  }

  const addSelectedMembersToForm = () => {
    const membersToAdd = samplePreviewData.filter((member) => selectedMembers.includes(member.id))
    const existingIds = new Set(originalData.members.map((m) => m.id))
    const uniqueMembersToAdd = membersToAdd.filter((member) => !existingIds.has(member.id))

    if (uniqueMembersToAdd.length === 0) {
      alert("All selected members are already in the form.")
      return
    }

    const updatedMembers = [...originalData.members, ...uniqueMembersToAdd].map((member, idx) => ({
      ...member,
      serialNo: (idx + 1).toString(),
    }))

    const selectedDetails = getSelectedUserDetails()

    const updatedData = {
      ...originalData,
      members: updatedMembers,
      cropDetails:
        selectedDetails.cropDetails.selectedCrops.length > 0
          ? {
              ...originalData.cropDetails,
              cropName: selectedDetails.cropDetails.cropName || originalData.cropDetails.cropName,
              extent: selectedDetails.cropDetails.extent || originalData.cropDetails.extent,
              expenses: selectedDetails.cropDetails.expenses,
              total: selectedDetails.cropDetails.total,
              cropsWithAmounts: selectedDetails.cropDetails.cropsWithAmounts,
            }
          : originalData.cropDetails,
      goldDetails: selectedDetails.goldDetails || originalData.goldDetails,
      friendDetails: selectedDetails.friendDetails || originalData.friendDetails,
      ownProperty: selectedDetails.ownProperty || originalData.ownProperty,
    }

    setOriginalData(updatedData)
    setSelectedMembers([])
    alert(`${uniqueMembersToAdd.length} new members added successfully with detailed info!`)
  }

  const handleCheckboxChange = (memberId: string, checked: boolean) => {
    setSelectedMembers((prev) => (checked ? [...prev, memberId] : prev.filter((id) => id !== memberId)))
  }

  const addNewMember = () => {
    const newMember: ExtendedKCCMember = {
      id: Date.now().toString(),
      serialNo: (originalData.members.length + 1).toString(),
      memberName: "புதிய உறுப்பினர்",
      fatherName: "தகப்பர் பெயர்",
      category: "கரும்பு",
      landArea: 1.0,
      farmerType: "MF",
      classification: "Others",
      aadhaarNo: "0000 0000 0000",
      accountNo: "000 000 000",
      phoneNo: "0000000000",
      amount: 50000,
      date: new Date().toISOString().split("T")[0],
      userInformation: {
        pan_file: null,
        checkboxes: { kcc: false, jewel: false, kccah: false, tractor: false },
        user_photo: null,
        pan_preview: null,
        ration_file: null,
        aadhaar_file: null,
        friend_photo: null,
        ஜாதி: "",
        உ_எண்: "",
        ration_preview: null,
        aadhaar_preview: null,
        பெயர்: "புதிய உறுப்பினர்",
        principle_amount: "50000",
        user_photo_preview: null,
        முகவரி: "",
        வட்டம்: "",
        நிலம்1_ac: "",
        கிராமம்: "",
        தகபெயர்: "தகப்பர் பெயர்",
        ஆதார்_எண்: "0000 0000 0000",
        கைபேசி_எண்: "0000000000",
        sdccb_kcc_கணக்கு_எண்: "000 000 000",
        மொத்த_நிலம்: "1.0",
        நிலம்1_சர்வே_எண்: ""
      }
    }
    setOriginalData({
      ...originalData,
      members: [...originalData.members, newMember],
    })
  }

  const deleteMember = (index: number) => {
    const newData = { ...originalData }
    newData.members = newData.members
      .filter((_, i) => i !== index)
      .map((member, idx) => ({
        ...member,
        serialNo: (idx + 1).toString(),
      }))
    setOriginalData(newData)
  }

  const handleMemberEdit = (index: number, field: keyof ExtendedKCCMember, value: any) => {
    const newData = { ...originalData }
    newData.members[index] = { ...newData.members[index], [field]: value }
    setOriginalData(newData)
  }

  const resetFilters = () => {
    setFilters({
      searchTerm: "",
      dateRange: { start: "", end: "" },
      farmerType: "ALL",
      classification: "ALL",
    })
  }

  useEffect(() => {
    const filteredMembers = filterKCCMembers(originalData.members, filters)
    setFilteredData({ ...originalData, members: filteredMembers })
  }, [filters, originalData])

  useEffect(() => {
    const savedData = localStorage.getItem("kccSystemData")
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        setOriginalData(parsedData)
      } catch (e) {
        console.error("Failed loading data:", e)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("kccSystemData", JSON.stringify(originalData))
  }, [originalData])

  const downloadPDF = async () => {
    setIsLoading(true)
    try {
      const { generatePDF } = await import("../../utils/pdf-generator")

      const pages = [
        {
          component: KCCPage1,
          props: {
            data: filteredData,
            selectedUsers: samplePreviewData.filter((member) => selectedMembers.includes(member.id)),
            isEditing: false,
            onMemberEdit: () => {},
            onAddMember: () => {},
            onDeleteMember: () => {},
            ...getSelectedUserDetails(),
          },
        },
        { component: KCCPage2, props: { data: filteredData } },
        { component: KCCPage3, props: { data: filteredData } },
        { component: KCCPage4, props: { data: filteredData, isEditing: false } },
        { component: KCCPage5, props: { data: filteredData, isEditing: false } },
      ]

      await generatePDF(pages, filteredData)

      alert(`PDF generated successfully with ${pages.length} pages!`)
      console.log("PDF generation completed successfully")
    } catch (error) {
      console.error("PDF generation error:", error)
      alert(`Failed to generate PDF: ${error instanceof Error ? error.message : "Unknown error"}. Please try again.`)
    } finally {
      setIsLoading(false)
    }
  }

  const exportDataToServer = async () => {
    const selectedDetails = getSelectedUserDetails();
    
    const exportObj = {
      exportDate: new Date().toISOString(),
      // totalRecords: filteredData.members.length,
      // totalAmount: calculateKCCTotals(filteredData.members).totalAmount,
      // totalLand: calculateKCCTotals(filteredData.members).totalLand,
      // summary: calculateKCCTotals(filteredData.members),
      kccData: filteredData,
      // selectedUserDetails: selectedDetails,
      // organizationInfo: filteredData.settings,
      // userInformation: selectedDetails.userInformation || {},
      // rawUserData: rawUserData.filter(user => selectedMembers.includes(String(user.id))),
      // metadata: {
      //   formSections: selectedDetails.userInformation?.formSections,
      //   checkboxes: selectedDetails.userInformation?.checkboxes,
      //   documents: selectedDetails.documents
      // }
    };

    try {
      const response = await fetch(`${API_URL}/api/Kccdata`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(exportObj),
      });

      if (!response.ok) {
        throw new Error(`Server error ${response.status} ${response.statusText}`);
      }

      const savedRecord = await response.json();
      console.log("Export data saved:", savedRecord);
      alert("Export data successfully saved to server.");
    } catch (error) {
      console.error("Export failed:", error);
      alert(`Failed to export data: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };

  // Render the data table for server preview with selection checkboxes
const [searchTerm, setSearchTerm] = useState("");
// Filter data based on search term

const filteredData1 = samplePreviewData.filter(member => {
  if (!member.serialNo) return false;
  
  // Convert both to string for comparison
  const serialNoStr = member.serialNo.toString();
  const searchTermStr = searchTerm.toString();
  
  return serialNoStr.toLowerCase().includes(searchTermStr.toLowerCase());
});

const renderDataTable = () => (
  <Card>
    <CardHeader>
      <CardTitle>Server Data Preview - Select Members to Add</CardTitle>
      <div className="flex items-center mt-4">
        <Search className="w-5 h-5 mr-2 text-gray-500" />
        <Input
          placeholder="Search by உ_எண்..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
    </CardHeader>
    <CardContent>
      {isLoading ? (
        <div className="flex items-center justify-center p-8">
          <RefreshCw className="w-6 h-6 animate-spin mr-2" />
          <span>Loading data from server...</span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 p-2">
                  <Checkbox
                    onCheckedChange={(checked) =>
                      setSelectedMembers(checked ? filteredData1.map((m) => m.id) : [])
                    }
                    checked={filteredData1.length > 0 && selectedMembers.length === filteredData1.length}
                  />
                </th>
                <th className="border border-gray-300 p-2">உ_எண்</th>
                <th className="border border-gray-300 p-2">உறுப்பினர் விவரங்கள்</th>
                <th className="border border-gray-300 p-2">பயிர் வகை</th>
                <th className="border border-gray-300 p-2">நிலம் பரப்பு (Ac)</th>
                <th className="border border-gray-300 p-2">வகை</th>
                <th className="border border-gray-300 p-2">வகைப்பாடு</th>
                <th className="border border-gray-300 p-2">தொகை விவரம்</th>
                <th className="border border-gray-300 p-2">தங்கம்</th>
                <th className="border border-gray-300 p-2">சொத்து</th>
                <th className="border border-gray-300 p-2">நண்பர்</th>
                <th className="border border-gray-300 p-2">ஆதார் எண்</th>
                <th className="border border-gray-300 p-2">கணக்கு எண்</th>
              </tr>
            </thead>
            <tbody>
              {filteredData1.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-2 text-center">
                    <Checkbox
                      checked={selectedMembers.includes(member.id)}
                      onCheckedChange={(checked) => handleCheckboxChange(member.id, checked as boolean)}
                    />
                  </td>
                  <td className="border border-gray-300 p-2 text-center">{member.serialNo || "--"}</td>
                  <td className="border border-gray-300 p-2">
                    <div className="flex flex-col">
                      <span className="font-medium">{member.memberName}</span>
                      {member.fatherName && <span className="text-xs text-gray-600">தகப்பர்: {member.fatherName}</span>}
                      {member.phoneNo && <span className="text-xs text-gray-600">☎ {member.phoneNo}</span>}
                    </div>
                  </td>
                  <td className="border border-gray-300 p-2">{member.category}</td>
                  <td className="border border-gray-300 p-2 text-center">{member.landArea.toFixed(3)}</td>
                  <td className="border border-gray-300 p-2 text-center">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        member.farmerType === "MF"
                          ? "bg-blue-100"
                          : member.farmerType === "SF"
                            ? "bg-green-100"
                            : "bg-orange-100"
                      }`}
                    >
                      {member.farmerType}
                    </span>
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        member.classification === "SC"
                          ? "bg-purple-100"
                          : member.classification === "ST"
                            ? "bg-red-100"
                            : member.classification === "Others"
                              ? "bg-yellow-100"
                              : "bg-gray-100"
                      }`}
                    >
                      {member.classification}
                    </span>
                  </td>
                  <td className="border border-gray-300 p-2">₹{member.amount.toLocaleString("en-IN")}</td>
                  <td className="border border-gray-300 p-2 text-xs">
                    {member.goldDetails?.hasGold ? (
                      <div className="bg-yellow-50 p-1 rounded">
                        <div className="font-semibold text-yellow-800">
                          Items: {member.goldDetails.totalItems || 0}
                        </div>
                        <div className="text-yellow-700">
                          ₹{(member.goldDetails.totalValue || 0).toLocaleString("en-IN")}
                        </div>
                        {member.goldDetails.totalWeight > 0 && (
                          <div className="text-yellow-600">{member.goldDetails.totalWeight}g</div>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-500">No Gold</span>
                    )}
                  </td>
                  <td className="border border-gray-300 p-2 text-xs">
                    {member.ownProperty?.hasPropertyData ? (
                      <div className="bg-blue-50 p-1 rounded">
                        <div className="font-semibold text-blue-800">
                          Value: ₹{(member.ownProperty.value || 0).toLocaleString("en-IN")}
                        </div>
                        {member.ownProperty.mortgageDetails?.hasMortgageData && (
                          <div className="text-blue-700">
                            Mortgage: ₹
                            {(member.ownProperty.mortgageDetails.mortgageAmount || 0).toLocaleString("en-IN")}
                          </div>
                        )}
                        {member.ownProperty.description && (
                          <div className="text-blue-600 truncate" title={member.ownProperty.description}>
                            {member.ownProperty.description.substring(0, 20)}...
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-500">No Property</span>
                    )}
                  </td>
                  <td className="border border-gray-300 p-2 text-xs">
                    {member.friendDetails?.hasData ? (
                      <div className="bg-green-50 p-1 rounded">
                        <div className="font-semibold text-green-800">{member.friendDetails.name || "Name N/A"}</div>
                        <div className="text-green-700">ID: {member.friendDetails.uNumber || "N/A"}</div>
                        {member.friendDetails.phone && (
                          <div className="text-green-600">📞 {member.friendDetails.phone}</div>
                        )}
                        {member.friendDetails.acre && (
                          <div className="text-green-600">🌾 {member.friendDetails.acre} acres</div>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-500">No Friend</span>
                    )}
                  </td>
                  <td className="border border-gray-300 p-2">{member.aadhaarNo || "--"}</td>
                  <td className="border border-gray-300 p-2">{member.accountNo || "--"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredData.length === 0 && !isLoading && (
            <div className="text-center p-8 text-gray-500">
              {searchTerm ? `No results found for "${searchTerm}"` : 'No data available. Click "Refresh Data" to fetch from server.'}
            </div>
          )}
        </div>
      )}
    </CardContent>
  </Card>
);
  // Calculate summary totals with helper function
  const totals = calculateKCCTotals(filteredData.members)

  // Render filter controls UI
  const renderFilterControls = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-100 rounded">
      <div>
        <label className="block text-sm font-medium mb-1">Search</label>
        <input
          type="text"
          value={filters.searchTerm}
          onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="Search members..."
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Farmer Type</label>
        <select
          value={filters.farmerType}
          onChange={(e) => setFilters({ ...filters, farmerType: e.target.value as any })}
          className="w-full p-2 border rounded"
        >
          <option value="ALL">All Types</option>
          <option value="MF">Marginal Farmer</option>
          <option value="SF">Small Farmer</option>
          <option value="OF">Other Farmer</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Classification</label>
        <select
          value={filters.classification}
          onChange={(e) => setFilters({ ...filters, classification: e.target.value as any })}
          className="w-full p-2 border rounded"
        >
          <option value="ALL">All</option>
          <option value="SC">SC</option>
          <option value="ST">ST</option>
          <option value="BC">BC</option>
          <option value="Others">Others</option>
        </select>
      </div>
      <div className="flex items-end">
        <Button onClick={resetFilters} variant="outline" className="w-full bg-transparent">
          Reset Filters
        </Button>
      </div>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto p-4 bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {showMainPage ? "Tamil KCC Data Selection" : "KCC Document Management"}
        </h1>
        <p className="text-gray-600">
          {showMainPage
            ? "Select members from server data to add to KCC form"
            : "Complete KCC document system with dynamic data"}
        </p>
      </div>

      {showMainPage ? (
        <>
          {/* Server Data Management */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="w-5 h-5" /> Server Data Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-4 flex-wrap">
                <Button onClick={fetchPreviewData} variant="outline" size="sm" disabled={isLoading}>
                  <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                  {isLoading ? "Fetching..." : "Refresh Data"}
                </Button>
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={addSelectedMembersToForm}
                  disabled={selectedMembers.length === 0}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Selected to Form ({selectedMembers.length})
                </Button>
                <Button onClick={() => setShowMainPage(false)} variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  View KCC Form ({originalData.members.length} members)
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Data Table */}
          {renderDataTable()}
        </>
      ) : (
        <>
          {/* Control Panel */}
          <Card className="mb-6">
  <CardHeader>
    <CardTitle className="flex items-center gap-2">
      <Filter className="w-5 h-5" /> Control Panel
    </CardTitle>
  </CardHeader>
  <CardContent>
    <div className="flex gap-2 mb-4 flex-wrap">
      <Button onClick={() => setShowMainPage(true)} variant="outline">
        <Database className="w-4 h-4 mr-2" /> Back to Data Selection
      </Button>
      <Button onClick={() => setIsEditing(!isEditing)} variant={isEditing ? "destructive" : "default"}>
        {isEditing ? <X className="w-4 h-4 mr-2downloadPDF" /> : <Edit3 className="w-4 h-4 mr-2" />}
        {isEditing ? "Stop Editing" : "Edit Mode"}
      </Button>
      <Button onClick={() => setShowFilters(!showFilters)} variant="outline">
        <Filter className="w-4 h-4 mr-2" /> {showFilters ? "Hide Filters" : "Show Filters"}
      </Button>
      <Button
        onClick={downloadPDF}
        variant="default"
        disabled={isLoading}
        className="bg-green-600 hover:bg-green-700"
      >
        <Download className="w-4 h-4 mr-2" />
        {isLoading ? "Generating PDF..." : "Download PDF (5 Pages)"}
      </Button>
      <Button onClick={exportDataToServer} variant="outline" className="bg-blue-50 hover:bg-blue-100">
        <Download className="w-4 h-4 mr-2" /> Export JSON ({filteredData.members.length})
      </Button>
    </div>
    
    {/* Date Input Field */}
    <div className="mb-4 flex items-center gap-2">
      <label htmlFor="kccDate" className="text-sm font-medium">KCC Date:</label>
      <input
        id="kccDate"
        type="date"
        defaultValue="2025-08-27"
        onChange={(e) => {
          localStorage.setItem("kccdate", e.target.value);
        }}
        className="border rounded p-1"
      />
      <Button 
        onClick={() => {
          const dateInput = document.getElementById('kccDate');
          if (dateInput) {
            localStorage.setItem("kccdate", dateInput.value);
          }
        }}
        variant="outline"
        size="sm"
      >
        Save Date
      </Button>
    </div>
    
    {showFilters && renderFilterControls()}
    <div className="flex gap-4 text-sm mt-4 flex-wrap">
      <div className="bg-blue-50 px-3 py-1 rounded">
        <span className="font-semibold">Total Records: {originalData.members.length}</span>
      </div>
      <div className="bg-green-50 px-3 py-1 rounded">
        <span className="font-semibold">Filtered: {filteredData.members.length}</span>
      </div>
      <div className="bg-purple-50 px-3 py-1 rounded">
        <span className="font-semibold">Total Amount: ₹{totals.totalAmount.toLocaleString("en-IN")}</span>
      </div>
      <div className="bg-orange-50 px-3 py-1 rounded">
        <span className="font-semibold">Total Land: {totals.totalLand.toFixed(2)} acres</span>
      </div>
    </div>
  </CardContent>
</Card>

          {/* KCC Pages form rendering with proper A4 sizing */}
          <div ref={printRef} className="bg-white">
            {/* Page 1 */}
            <div
              className="pdf-page"
              style={{
                width: "794px",
                minHeight: " 1123px",
                padding: "20mm",
                margin: "0 auto",
                backgroundColor: "white",
                pageBreakAfter: "always",
              }}
            >
              <KCCPage1
                data={filteredData}
                selectedUsers={
                  selectedMembers.length > 0
                    ? samplePreviewData.filter((member) => selectedMembers.includes(member.id))
                    : samplePreviewData
                }
                isEditing={isEditing}
                onMemberEdit={handleMemberEdit}
                onAddMember={addNewMember}
                onDeleteMember={deleteMember}
                {...getSelectedUserDetails()}
              />
            </div>
<br>
</br>
<br></br><br>
</br>      <br>
</br>
<br></br><br>
</br>          {/* Page 2 */}
            <div
              className="pdf-page"
              style={{
                width: "210mm",
                minHeight: "297mm",
                padding: "20mm",
                margin: "0 auto",
                backgroundColor: "white",
                pageBreakAfter: "always",
              }}
            >
              <KCCPage2 data={filteredData} />
            </div>

            {/* Page 3 */}
            <div
              className="pdf-page"
              style={{
                width: "210mm",
                minHeight: "297mm",
                padding: "20mm",
                margin: "0 auto",
                backgroundColor: "white",
                pageBreakAfter: "always",
              }}
            >
              <KCCPage3 data={filteredData}
               />
            </div>
<br>
</br>
<br></br><br>
</br>      <br>
</br>
<br></br><br>
</br>  
            {/* Page 4 */}
            <div
              className="pdf-page"
              style={{
                width: "210mm",
                minHeight: "297mm",
                padding: "20mm",
                margin: "0 auto",
                backgroundColor: "white",
              }}
            >
              <KCCPage4  
              data={filteredData}
                selectedUsers={
                  selectedMembers.length > 0
                    ? samplePreviewData.filter((member) => selectedMembers.includes(member.id))
                    : samplePreviewData
                }
                isEditing={isEditing}
                onMemberEdit={handleMemberEdit}
                onAddMember={addNewMember}
                onDeleteMember={deleteMember}
                {...getSelectedUserDetails()}
              />
              <br>
</br>
    <div
              className="pdf-page"
              style={{
                width: "210mm",
                minHeight: "297mm",
                padding: "20mm",
                margin: "0 auto",
                backgroundColor: "white",
              }}
            ></div>
             {/* <KCCPage5 data={filteredData} isEditing={isEditing} /> */}
              <KCCPage5
                data={filteredData}
                selectedUsers={
                  selectedMembers.length > 0
                    ? samplePreviewData.filter((member) => selectedMembers.includes(member.id))
                    : samplePreviewData
                }
                isEditing={isEditing}
                onMemberEdit={handleMemberEdit}
                onAddMember={addNewMember}
                onDeleteMember={deleteMember}
                {...getSelectedUserDetails()}
              />
            </div>
          </div>
        </>
      )}
    </div>
  )
}
