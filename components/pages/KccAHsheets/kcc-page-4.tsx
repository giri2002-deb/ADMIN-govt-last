import type { KCCData } from "@/types/kcc-types"
import { calculateKCCTotals } from "@/utils/kcc-utils"

interface KCCPage4Props {
  data: KCCData
  selectedUsers?: any[]
  isEditing: boolean
  onMemberEdit?: (member: any) => void
  onSettingsEdit?: () => void
  onAddMember?: () => void
  onDeleteMember?: (memberId: string) => void
}

interface CropGroup {
  cropName: string
  extent: number
  total: number
  expenses: {
    cash: number
    seeds: number
    pesticide: number
    fertilizer: number
    others: number
    insurance: number
  }
  userCount: number
}

/** Minimal shape used from each member for KCCAH aggregation */
interface MemberKCCAHLoan {
  id: number
  dynamicPlan?: string
  dynamicUnits?: number
  cashPerUnit?: number
  seedPerUnit?: number
  breakdown?: {
    perUnit?: { ரொக்கம்?: number; விதை?: number; மொத்தம்?: number }
    total?: { ரொக்கம்?: number; விதை?: number; மொத்தம்?: number }
  }
  கடன்_வகை?: string               // e.g., "சிறிய பால் பண்ணை"
  திட்ட_அளவு?: string             // e.g., "1+1"
  ரொக்கம்?: number
  விதை?: number
  மொத்தம்?: number
}

interface KCCAHGroup {
  loanName: string               // கடன்_வகை
  plan?: string                  // திட்ட_அளவு or dynamicPlan
  totalUnits: number
  totals: { ரொக்கம்: number; விதை: number; மொத்தம்: number }
  perUnit: { ரொக்கம்: number; விதை: number; மொத்தம்: number } | null
  memberCount: number
}

export function KCCPage4({ data, selectedUsers = [], isEditing }: KCCPage4Props) {
  const membersToUse = (selectedUsers && selectedUsers.length > 0) ? selectedUsers : data.members
  const totals = calculateKCCTotals(membersToUse)

  // === Derived summaries (respect selectedUsers if present) ===
  const farmerTypeAmounts = {
    MF: membersToUse.filter((m: any) => m.farmerType === "MF").reduce((s: number, m: any) => s + (m.amount || 0), 0),
    SF: membersToUse.filter((m: any) => m.farmerType === "SF").reduce((s: number, m: any) => s + (m.amount || 0), 0),
    OF: membersToUse.filter((m: any) => m.farmerType === "OF").reduce((s: number, m: any) => s + (m.amount || 0), 0),
  }

  const classificationAmounts = {
    SC: membersToUse.filter((m: any) => m.classification === "SC").reduce((s: number, m: any) => s + (m.amount || 0), 0),
    ST: membersToUse.filter((m: any) => m.classification === "ST").reduce((s: number, m: any) => s + (m.amount || 0), 0),
    BC: membersToUse.filter((m: any) => m.classification === "BC").reduce((s: number, m: any) => s + (m.amount || 0), 0),
    Others: membersToUse.filter((m: any) => m.classification === "Others").reduce((s: number, m: any) => s + (m.amount || 0), 0),
  }

  // === Crop (non-KCCAH) aggregation ===
  const extractCropData = (): CropGroup[] => {
    const cropMap: Record<string, CropGroup> = {}

    membersToUse.forEach((member: any) => {
      // Only consider NON-KCCAH members here
      if (member?.loanDetails?.type === "KCCAH") return

      // Get the total land area for this member from various possible locations
      let memberLandArea = 0;
      
      // Try direct property first
      if (member.landArea) {
        memberLandArea = parseFloat(member.landArea) || 0;
      } 
      // Try userInformation.மொத்த_நிலம் (total land in Tamil)
      else if (member.userInformation && member.userInformation.மொத்த_நிலம்) {
        memberLandArea = parseFloat(member.userInformation.மொத்த_நிலம்) || 0;
      }
      // Try calculating from individual land parcels
      else if (member.userInformation) {
        // Sum up all land parcels (nilam1_ac, nilam2_ac, etc.)
        for (let i = 1; i <= 20; i++) {
          const parcelKey = `நிலம்${i}_ac`;
          if (member.userInformation[parcelKey]) {
            memberLandArea += parseFloat(member.userInformation[parcelKey]) || 0;
          }
        }
      }
      // Fallback to landParcels array if available
      else if (member.landParcels && Array.isArray(member.landParcels)) {
        memberLandArea = member.landParcels.reduce((sum: number, parcel: any) => {
          return sum + (parseFloat(parcel.acre) || 0);
        }, 0);
      }

      if (member?.selectedCrops && Array.isArray(member.selectedCrops)) {
        member.selectedCrops.forEach((cropItem: any) => {
          const cropName = cropItem?.crop?.name_of_crop || cropItem?.cropName || "Unknown Crop"

          if (!cropMap[cropName]) {
            cropMap[cropName] = {
              cropName,
              extent: 0,
              total: 0,
              expenses: {
                cash: 0,
                seeds: 0,
                pesticide: 0,
                fertilizer: 0,
                others: 0,
                insurance: 0,
              },
              userCount: 0,
            }
          }

          // Sums - use the member's total land area
          cropMap[cropName].extent += memberLandArea
          cropMap[cropName].total += cropItem?.eligibleAmount || 0
          cropMap[cropName].userCount += 1

          // Expense breakdown
          if (cropItem?.breakdown) {
            const b = cropItem.breakdown
            cropMap[cropName].expenses.cash += b.rokkam || b.motham || 0
            cropMap[cropName].expenses.seeds += b.vithai || 0
            cropMap[cropName].expenses.pesticide += b.poochi_marundhu || 0
            cropMap[cropName].expenses.fertilizer += (b.uram_1 || 0) + (b.uram_2 || 0) + (b.thozhu_uram || 0)
            cropMap[cropName].expenses.others += b.others || 0
            cropMap[cropName].expenses.insurance += b.insurance || 0
          }
        })
      }
    })

    return Object.values(cropMap)
  }

  // === KCCAH (dairy) aggregation - per member ===
  const extractKCCAHGroups = (): { groups: KCCAHGroup[]; grand: { ரொக்கம்: number; விதை: number; மொத்தம்: number; units: number; members: number } } => {
    const groupsMap: Record<string, KCCAHGroup> = {}
    const grand = { ரொக்கம்: 0, விதை: 0, மொத்தம்: 0, units: 0, members: 0 }

    membersToUse.forEach((member: any) => {
      if (member?.loanDetails?.type !== "KCCAH") return

      const loan: MemberKCCAHLoan | undefined = member?.selectedKccahLoan
      if (!loan) return

      const loanName = loan.கடன்_வகை || "DAIRY FARM LOAN"
      const plan = loan.திட்ட_அளவு || loan.dynamicPlan
      const units = loan.dynamicUnits || 0

      const tCash = (loan.breakdown?.total?.ரொக்கம் ?? loan.ரொக்கம் ?? 0) as number
      const tSeed = (loan.breakdown?.total?.விதை ?? loan.விதை ?? 0) as number
      const tTotal = (loan.breakdown?.total?.மொத்தம் ?? loan.மொத்தம் ?? (tCash + tSeed)) as number

      const perUnit = loan.breakdown?.perUnit
        ? {
            ரொக்கம்: loan.breakdown.perUnit.ரொக்கம் ?? loan.cashPerUnit ?? 0,
            விதை: loan.breakdown.perUnit.விதை ?? loan.seedPerUnit ?? 0,
            மொத்தம்: loan.breakdown.perUnit.மொத்தம் ?? ((loan.cashPerUnit ?? 0) + (loan.seedPerUnit ?? 0)),
          }
        : (loan.cashPerUnit || loan.seedPerUnit)
        ? {
            ரொக்கம்: loan.cashPerUnit ?? 0,
            விதை: loan.seedPerUnit ?? 0,
            மொத்தம்: (loan.cashPerUnit ?? 0) + (loan.seedPerUnit ?? 0),
          }
        : null

      if (!groupsMap[loanName]) {
        groupsMap[loanName] = {
          loanName,
          plan,
          totalUnits: 0,
          totals: { ரொக்கம்: 0, விதை: 0, மொத்தம்: 0 },
          perUnit,
          memberCount: 0,
        }
      }

      const g = groupsMap[loanName]
      g.totalUnits += units
      g.totals.ரொக்கம் += tCash
      g.totals.விதை += tSeed
      g.totals.மொத்தம் += tTotal
      g.memberCount += 1
      // Preserve first non-null perUnit if group already had one; else set it
      if (!g.perUnit && perUnit) g.perUnit = perUnit

      // Grand totals
      grand.ரொக்கம் += tCash
      grand.விதை += tSeed
      grand.மொத்தம் += tTotal
      grand.units += units
      grand.members += 1
    })

    return { groups: Object.values(groupsMap), grand }
  }

  const cropGroups = extractCropData()
  const hasCropData = cropGroups.length > 0

  const { groups: kccahGroups, grand: kccahGrand } = extractKCCAHGroups()
  const hasKCCAH = kccahGroups.length > 0

  return (
    <div className="w-full h-full bg-white p-6" style={{ fontSize: "12px", fontFamily: "serif" }}>
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-base font-bold mb-2">S.1374 மருது ஞ்சாவடி தொடர்க்க வேளாண்மை கூட்டுறவு கடன்</h1>
        <h2 className="text-sm font-bold mb-4">சங்கம் வரை.,</h2>
        <h3 className="text-sm font-bold underline mb-4">
          {hasKCCAH ? "DAIRY FARM LOAN DISBURSEMENT DETAILS" : "CROP LOAN DISBURSEMENT DETAILS"}
        </h3>
      </div>

      {/* Loan Disbursement Summary */}
      <div className="mb-6">
        <table className="border-2 border-black border-collapse mb-4">
          <tbody>
            <tr>
              <td className="border border-black p-2 font-semibold" style={{ width: "200px" }}>
                Number of Farmer
              </td>
              <td className="border border-black p-2 text-center" style={{ width: "60px" }}>No :</td>
              <td className="border border-black p-2 text-center font-bold" style={{ width: "100px" }}>
                {totals.totalMembers}
              </td>
            </tr>
            <tr>
              <td className="border border-black p-2 font-semibold">Of which New Members</td>
              <td className="border border-black p-2 text-center">No :</td>
              <td className="border border-black p-2 text-center">-</td>
            </tr>
            <tr>
              <td className="border border-black p-2 font-semibold">Amount</td>
              <td className="border border-black p-2 text-center">:</td>
              <td className="border border-black p-2 text-center">-</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Category of Farmers */}
      <div className="mb-6">
        <h4 className="font-bold mb-2">CATEGORY OF FARMERS:</h4>
        <table className="w-full border-2 border-black border-collapse">
          <thead>
            <tr>
              <th className="border border-black p-2 text-center font-bold">Farmer Type</th>
              <th className="border border-black p-2 text-center font-bold">No</th>
              <th className="border border-black p-2 text-center font-bold">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black p-2 text-center">OF</td>
              <td className="border border-black p-2 text-center">{totals.farmerTypeBreakdown.OF || "-"}</td>
              <td className="border border-black p-2 text-center">
                {farmerTypeAmounts.OF > 0 ? farmerTypeAmounts.OF.toLocaleString() + ".00" : "-"}
              </td>
            </tr>
            <tr>
              <td className="border border-black p-2 text-center">SF</td>
              <td className="border border-black p-2 text-center">{totals.farmerTypeBreakdown.SF || "-"}</td>
              <td className="border border-black p-2 text-center">
                {farmerTypeAmounts.SF > 0 ? farmerTypeAmounts.SF.toLocaleString() + ".00" : "-"}
              </td>
            </tr>
            <tr>
              <td className="border border-black p-2 text-center font-bold">MF</td>
              <td className="border border-black p-2 text-center font-bold">{totals.farmerTypeBreakdown.MF}</td>
              <td className="border border-black p-2 text-center font-bold">
                {farmerTypeAmounts.MF.toLocaleString()}.00
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Classification of Farmers */}
      <div className="mb-6">
        <h4 className="font-bold mb-2">CLASSIFICATION OF FARMERS</h4>
        <table className="w-full border-2 border-black border-collapse">
          <thead>
            <tr>
              <th className="border border-black p-2 text-center font-bold">Farmer Type</th>
              <th className="border border-black p-2 text-center font-bold">No</th>
              <th className="border border-black p-2 text-center font-bold">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black p-2 text-center">SC</td>
              <td className="border border-black p-2 text-center">{totals.classificationBreakdown.SC || "-"}</td>
              <td className="border border-black p-2 text-center">
                {classificationAmounts.SC > 0 ? classificationAmounts.SC.toLocaleString() + ".00" : "-"}
              </td>
            </tr>
            <tr>
              <td className="border border-black p-2 text-center">ST</td>
              <td className="border border-black p-2 text-center">{totals.classificationBreakdown.ST || "-"}</td>
              <td className="border border-black p-2 text-center">
                {classificationAmounts.ST > 0 ? classificationAmounts.ST.toLocaleString() + ".00" : "-"}
              </td>
            </tr>
            <tr>
              <td className="border border-black p-2 text-center font-bold">Others</td>
              <td className="border border-black p-2 text-center font-bold">
                {totals.classificationBreakdown.Others || totals.classificationBreakdown.BC || 0}
              </td>
              <td className="border border-black p-2 text-center font-bold">
                {(classificationAmounts.Others + classificationAmounts.BC).toLocaleString()}.00
              </td>
            </tr>
            <tr className="bg-gray-100">
              <td className="border border-black p-2 text-center font-bold">Total</td>
              <td className="border border-black p-2 text-center font-bold">{totals.totalMembers}</td>
              <td className="border border-black p-2 text-center font-bold">
                {totals.totalAmount.toLocaleString()}.00
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* === Dairy (KCCAH) Section - per member loanDetails.type === */}
      {hasKCCAH && (
        <div className="mb-6">
          {kccahGroups.map((g, idx) => (
            <div key={idx} className="mb-6 border-2 border-gray-300 p-4">
              <div className="mb-2 font-bold">CROP/LOAN NAME: {g.loanName}</div>
              {g.plan && <div className="mb-2">PLAN: {g.plan}</div>}
              <div className="mb-2">TOTAL UNITS: {g.totalUnits}</div>
              <div className="mb-2">TOTAL MEMBERS: {g.memberCount}</div>

              <div className="grid grid-cols-2 gap-8 mt-4">
                <div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-bold">இதர செலவுகள்</span><span>:</span>
                      <span className="font-bold">{g.totals.ரொக்கம்.toLocaleString()}.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">மூல பொருட்கள்</span><span>:</span>
                      <span className="font-bold">{g.totals.விதை.toLocaleString()}.00</span>
                    </div>
                    <div className="border-t-2 border-black pt-2 mt-4">
                      <div className="flex justify-between">
                        <span className="font-bold">TOTAL </span><span>:</span>
                        <span className="font-bold underline">{g.totals.மொத்தம்.toLocaleString()}.00</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  {/* Empty right column for KCCAH */}
                </div>
              </div>
            </div>
          ))}

          {/* Aggregated Total for All KCCAH Members */}
          <div className="mt-6 p-4 border-2 border-black bg-gray-100">
            <div className="font-bold underline mb-2">TOTAL (ALL KCCAH MEMBERS)</div>
            <div className="flex justify-between"><span>ALL UNITS</span><span>{kccahGrand.units}</span></div>
            <div className="flex justify-between"><span>ALL MEMBERS</span><span>{kccahGrand.members}</span></div>
            <div className="flex justify-between"><span>ALL CASH</span><span>{kccahGrand.ரொக்கம்.toLocaleString()}.00</span></div>
            <div className="flex justify-between"><span>ALL SEEDS/ANIMALS</span><span>{kccahGrand.விதை.toLocaleString()}.00</span></div>
            <div className="flex justify-between font-bold border-t mt-2 pt-2">
              <span>GRAND TOTAL</span><span>{kccahGrand.மொத்தம்.toLocaleString()}.00</span>
            </div>
          </div>
        </div>
      )}

      {/* === Crop (non-KCCAH) Section === */}
      {!hasKCCAH && !hasCropData && (
        <div className="text-center text-red-500 font-bold py-4 border-2 border-gray-300">
          No crop data available.
        </div>
      )}

      {hasCropData && !hasKCCAH && (
        <div className="mb-6">
          <h4 className="font-bold mb-4 underline">CROP DETAILS:</h4>

          {cropGroups.map((cropData, index) => (
            <div key={index} className="mb-6">
              <div className="mb-4">
                <span className="font-bold">CROP: {cropData.cropName}</span>
                <span className="ml-4 font-bold">Total Plantings: {cropData.userCount}</span>
              </div>

              <div className="mb-2">
                <span className="font-bold">NAME OF THE CROP: {cropData.cropName}</span>
              </div>

              <div className="grid grid-cols-2 gap-8">
                {/* Left Column - Expenses */}
                <div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-bold">CASH</span><span>:</span>
                      <span className="font-bold">{cropData.expenses.cash.toLocaleString()}.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">SEEDS</span><span>:</span>
                      <span className="font-bold">{cropData.expenses.seeds.toLocaleString()}.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">PESTICIDE</span><span>:</span>
                      <span className="font-bold">{cropData.expenses.pesticide.toLocaleString()}.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">FERTILIZER</span><span>:</span>
                      <span className="font-bold">{cropData.expenses.fertilizer.toLocaleString()}.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">தொழுவு உரம்</span><span>:</span>
                      <span className="font-bold">{cropData.expenses.others.toLocaleString()}.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">INSURANCE</span><span>:</span>
                      <span className="font-bold">
                        {cropData.expenses.insurance > 0 ? cropData.expenses.insurance.toLocaleString() + ".00" : "-"}
                      </span>
                    </div>
                    <div className="border-t-2 border-black pt-2 mt-4">
                      <div className="flex justify-between">
                        <span className="font-bold">Total for {cropData.cropName}</span><span>:</span>
                        <span className="font-bold underline">{cropData.total.toLocaleString()}.00</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Extent */}
                <div className="flex justify-center items-start pt-8">
                  <div>
                    <span className="font-bold">Extent (Area) :</span>
                    <span className="ml-2">{(cropData.extent || 0).toFixed(2)} acres</span>
                  </div>
                </div>
              </div>

              {index < cropGroups.length - 1 && <hr className="my-6 border-t-2 border-gray-300" />}
            </div>
          ))}
        </div>
      )}

      {/* Footer Signatures */}
      <div className="flex justify-between mt-16">
        <div className="text-left">
          <div className="font-bold">SUPERVISER</div>
        </div>
        <div className="text-right">
          <div className="font-bold">SECRETARY</div>
        </div>
      </div>
    </div>
  )
}