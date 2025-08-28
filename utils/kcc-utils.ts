import type { KCCMember, FilterOptions} from "@/types/kcc-types"

export function filterKCCMembers(members: KCCMember[], filters: FilterOptions): KCCMember[] {
  return members.filter((member) => {
    // Search term filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase()
      const matchesSearch =
        member.memberName.toLowerCase().includes(searchLower) ||
        member.category.toLowerCase().includes(searchLower) ||
        member.aadhaarNo.includes(searchLower) ||
        member.accountNo.includes(searchLower) ||
        member.serialNo.includes(searchLower)

      if (!matchesSearch) return false
    }

    // Farmer type filter
    if (filters.farmerType !== "ALL" && member.farmerType !== filters.farmerType) {
      return false
    }

    // Classification filter
    if (filters.classification !== "ALL" && member.classification !== filters.classification) {
      return false
    }

    // Date range filter
    if (filters.dateRange.start && member.date < filters.dateRange.start) {
      return false
    }
    if (filters.dateRange.end && member.date > filters.dateRange.end) {
      return false
    }

    return true
  })
}

export function calculateKCCTotals(members: KCCMember[]): KCCTotals {
  const totals: KCCTotals = {
    totalMembers: members.length,
    totalAmount: 0,
    totalLand: 0,
    farmerTypeBreakdown: {
      MF: 0,
      SF: 0,
      OF: 0,
    },
    classificationBreakdown: {
      SC: 0,
      ST: 0,
      Others: 0,
    },
  }

  members.forEach((member) => {
    // Calculate totals
    totals.totalAmount += member.amount || 0
    totals.totalLand += member.landArea || 0

    // Count farmer types
    if (member.farmerType === "MF") totals.farmerTypeBreakdown.MF++
    else if (member.farmerType === "SF") totals.farmerTypeBreakdown.SF++
    else if (member.farmerType === "OF") totals.farmerTypeBreakdown.OF++

    // Count classifications
    if (member.classification === "SC") totals.classificationBreakdown.SC++
    else if (member.classification === "ST") totals.classificationBreakdown.ST++
    else totals.classificationBreakdown.Others++
  })

  return totals
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatLandArea(area: number): string {
  return `${area.toFixed(2)} acres`
}

export function getFarmerTypeLabel(type: string): string {
  switch (type) {
    case "MF":
      return "Marginal Farmer"
    case "SF":
      return "Small Farmer"
    case "OF":
      return "Other Farmer"
    default:
      return "Unknown"
  }
}

export function getClassificationLabel(classification: string): string {
  switch (classification) {
    case "SC":
      return "Scheduled Caste"
    case "ST":
      return "Scheduled Tribe"
    case "Others":
      return "Others"
    default:
      return "Unknown"
  }
}

export function validateKCCMember(member: Partial<KCCMember>): string[] {
  const errors: string[] = []

  if (!member.memberName || member.memberName.trim() === "") {
    errors.push("Member name is required")
  }

  if (!member.aadhaarNo || member.aadhaarNo.length < 12) {
    errors.push("Valid Aadhaar number is required")
  }

  if (!member.accountNo || member.accountNo.trim() === "") {
    errors.push("Account number is required")
  }

  if (!member.amount || member.amount <= 0) {
    errors.push("Amount must be greater than 0")
  }

  if (!member.landArea || member.landArea <= 0) {
    errors.push("Land area must be greater than 0")
  }

  return errors
}

export function generateSerialNumbers(members: KCCMember[]): KCCMember[] {
  return members.map((member, index) => ({
    ...member,
    serialNo: (index + 1).toString(),
  }))
}

export function sortMembersByName(members: KCCMember[]): KCCMember[] {
  return [...members].sort((a, b) => a.memberName.localeCompare(b.memberName))
}

export function sortMembersByAmount(members: KCCMember[], ascending = false): KCCMember[] {
  return [...members].sort((a, b) => {
    return ascending ? a.amount - b.amount : b.amount - a.amount
  })
}

export function groupMembersByFarmerType(members: KCCMember[]): Record<string, KCCMember[]> {
  return members.reduce(
    (groups, member) => {
      const type = member.farmerType || "Unknown"
      if (!groups[type]) {
        groups[type] = []
      }
      groups[type].push(member)
      return groups
    },
    {} as Record<string, KCCMember[]>,
  )
}

export function groupMembersByClassification(members: KCCMember[]): Record<string, KCCMember[]> {
  return members.reduce(
    (groups, member) => {
      const classification = member.classification || "Unknown"
      if (!groups[classification]) {
        groups[classification] = []
      }
      groups[classification].push(member)
      return groups
    },
    {} as Record<string, KCCMember[]>,
  )
}
interface Member {
  farmerType: string
  classification: string
  amount: number
  selectedcrops?: {
    breakdown?: {
      cash?: number
      seeds?: number
      pesticide?: number
      fertilizer?: number
      others?: number
      insurance?: number
    }
    cropName?: string
    extent?: number
  }
}
interface CropBreakdown {
  cash: number
  seeds: number
  pesticide: number
  fertilizer: number
  others: number
  insurance: number
  total: number
  userCount: number
}
 interface CropTotals {
  [cropName: string]: CropBreakdown
}

export function calculateKCCTotals1(members: Member[]): KCCTotals {
  const totals: KCCTotals = {
    totalMembers: members.length,
    totalAmount: 0,
    farmerTypeBreakdown: {
      MF: 0,
      SF: 0,
      OF: 0,
    },
    classificationBreakdown: {
      SC: 0,
      ST: 0,
      BC: 0,
      Others: 0,
    },
  }

  members.forEach((member) => {
    // Add to total amount
    totals.totalAmount += member.amount || 0

    // Count farmer types
    if (member.farmerType === "MF") totals.farmerTypeBreakdown.MF++
    else if (member.farmerType === "SF") totals.farmerTypeBreakdown.SF++
    else if (member.farmerType === "OF") totals.farmerTypeBreakdown.OF++

    // Count classifications
    if (member.classification === "SC") totals.classificationBreakdown.SC++
    else if (member.classification === "ST") totals.classificationBreakdown.ST++
    else if (member.classification === "BC") totals.classificationBreakdown.BC++
    else if (member.classification === "Others") totals.classificationBreakdown.Others++
  })

  return totals
}



export function calculateCropTotals(members: Member[]): CropTotals {
  const cropTotals: CropTotals = {}

  members.forEach((member) => {
    const cropName = member.selectedcrops?.cropName
    if (!cropName || !member.selectedcrops?.breakdown) return

    const breakdown = member.selectedcrops.breakdown

    if (!cropTotals[cropName]) {
      cropTotals[cropName] = {
        cash: 0,
        seeds: 0,
        pesticide: 0,
        fertilizer: 0,
        others: 0,
        insurance: 0,
        total: 0,
        userCount: 0,
      }
    }

    // Add breakdown amounts
    cropTotals[cropName].cash += breakdown.cash || 0
    cropTotals[cropName].seeds += breakdown.seeds || 0
    cropTotals[cropName].pesticide += breakdown.pesticide || 0
    cropTotals[cropName].fertilizer += breakdown.fertilizer || 0
    cropTotals[cropName].others += breakdown.others || 0
    cropTotals[cropName].insurance += breakdown.insurance || 0
    cropTotals[cropName].userCount += 1

    // Calculate total
    cropTotals[cropName].total =
      cropTotals[cropName].cash +
      cropTotals[cropName].seeds +
      cropTotals[cropName].pesticide +
      cropTotals[cropName].fertilizer +
      cropTotals[cropName].others +
      cropTotals[cropName].insurance
  })

  return cropTotals
}
// interface Member {
//   farmerType: string
//   classification: string
//   amount: number
//   selectedcrops?: {
//     breakdown?: {
//       cash?: number
//       seeds?: number
//       pesticide?: number
//       fertilizer?: number
//       others?: number
//       insurance?: number
//     }
//     cropName?: string
//     extent?: number
//   }
// }

// interface KCCTotals {
//   totalMembers: number
//   totalAmount: number
//   farmerTypeBreakdown: {
//     MF: number
//     SF: number
//     OF: number
//   }
//   classificationBreakdown: {
//     SC: number
//     ST: number
//     BC: number
//     Others: number
//   }
// }

// interface CropBreakdown {
//   cash: number
//   seeds: number
//   pesticide: number
//   fertilizer: number
//   others: number
//   insurance: number
//   total: number
//   userCount: number
// }

// interface CropTotals {
//   [cropName: string]: CropBreakdown
// }

// export function calculateKCCTotals(members: Member[]): KCCTotals {
//   const totals: KCCTotals = {
//     totalMembers: members.length,
//     totalAmount: 0,
//     farmerTypeBreakdown: {
//       MF: 0,
//       SF: 0,
//       OF: 0,
//     },
//     classificationBreakdown: {
//       SC: 0,
//       ST: 0,
//       BC: 0,
//       Others: 0,
//     },
//   }

//   members.forEach((member) => {
//     // Add to total amount
//     totals.totalAmount += member.amount || 0

//     // Count farmer types
//     if (member.farmerType === "MF") totals.farmerTypeBreakdown.MF++
//     else if (member.farmerType === "SF") totals.farmerTypeBreakdown.SF++
//     else if (member.farmerType === "OF") totals.farmerTypeBreakdown.OF++

//     // Count classifications
//     if (member.classification === "SC") totals.classificationBreakdown.SC++
//     else if (member.classification === "ST") totals.classificationBreakdown.ST++
//     else if (member.classification === "BC") totals.classificationBreakdown.BC++
//     else if (member.classification === "Others") totals.classificationBreakdown.Others++
//   })

//   return totals
// }

// export function calculateCropTotals(members: Member[]): CropTotals {
//   const cropTotals: CropTotals = {}

//   members.forEach((member) => {
//     const cropName = member.selectedcrops?.cropName
//     if (!cropName || !member.selectedcrops?.breakdown) return

//     const breakdown = member.selectedcrops.breakdown

//     if (!cropTotals[cropName]) {
//       cropTotals[cropName] = {
//         cash: 0,
//         seeds: 0,
//         pesticide: 0,
//         fertilizer: 0,
//         others: 0,
//         insurance: 0,
//         total: 0,
//         userCount: 0,
//       }
//     }

//     // Add breakdown amounts
//     cropTotals[cropName].cash += breakdown.cash || 0
//     cropTotals[cropName].seeds += breakdown.seeds || 0
//     cropTotals[cropName].pesticide += breakdown.pesticide || 0
//     cropTotals[cropName].fertilizer += breakdown.fertilizer || 0
//     cropTotals[cropName].others += breakdown.others || 0
//     cropTotals[cropName].insurance += breakdown.insurance || 0
//     cropTotals[cropName].userCount += 1

//     // Calculate total
//     cropTotals[cropName].total =
//       cropTotals[cropName].cash +
//       cropTotals[cropName].seeds +
//       cropTotals[cropName].pesticide +
//       cropTotals[cropName].fertilizer +
//       cropTotals[cropName].others +
//       cropTotals[cropName].insurance
//   })

//   return cropTotals
// }

// export type { CropTotals, CropBreakdown }
