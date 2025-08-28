// import type { KCCData } from '@/types/kcc-types';
// import { calculateKCCTotals, calculateCropTotals } from '@/utils/kcc-utils';

// interface KCCPage4Props {
//   data: KCCData;
//   isEditing: boolean;
// }

// export function KCCPage4({ data, isEditing }: KCCPage4Props) {
//   const totals = calculateKCCTotals(data.members);
//  console.log(data)
//   // Calculate amounts for each farmer type and classification
//   const farmerTypeAmounts = {
//     MF: data.members.filter((m) => m.farmerType === "MF").reduce((sum, m) => sum + m.amount, 0),
//     SF: data.members.filter((m) => m.farmerType === "SF").reduce((sum, m) => sum + m.amount, 0),
//     OF: data.members.filter((m) => m.farmerType === "OF").reduce((sum, m) => sum + m.amount, 0),
//   };

//   const classificationAmounts = {
//     SC: data.members.filter((m) => m.classification === "SC").reduce((sum, m) => sum + m.amount, 0),
//     ST: data.members.filter((m) => m.classification === "ST").reduce((sum, m) => sum + m.amount, 0),
//     BC: data.members.filter((m) => m.classification === "BC").reduce((sum, m) => sum + m.amount, 0),
//     Others: data.members.filter((m) => m.classification === "Others").reduce((sum, m) => sum + m.amount, 0),
//   };

//   const cropTotals = calculateCropTotals(data.members);

//   // Calculate total extent for each crop
//   const cropExtents: Record<string, number> = {};
//   data.members.forEach((member) => {
//     if (member.selectedCrops?.cropName && member.selectedCrops?.extent) {
//       const cropName = member.selectedCrops.cropName;
//       if (!cropExtents[cropName]) {
//         cropExtents[cropName] = 0;
//       }
//       cropExtents[cropName] += member.selectedCrops.extent;
//     }
//   });

//   // Calculate total extent across all crops
//   const totalExtent = Object.values(cropExtents).reduce((sum, extent) => sum + extent, 0);

//   // Format numbers with Indian numbering system (with commas)
//   const formatIndianNumber = (num: number) => {
//     return num.toLocaleString('en-IN');
//   };

//   // Calculate overall totals for multiple crops
//   const overallCash = Object.values(cropTotals).reduce((sum, crop) => sum + crop.cash, 0);
  
//   const overallSeeds = Object.values(cropTotals).reduce((sum, crop) => sum + crop.seeds, 0);
//   const overallPesticide = Object.values(cropTotals).reduce((sum, crop) => sum + crop.pesticide, 0);
//   const overallFertilizer = Object.values(cropTotals).reduce((sum, crop) => sum + crop.fertilizer, 0);
//   const overallOthers = Object.values(cropTotals).reduce((sum, crop) => sum + crop.others, 0);
//   const overallInsurance = Object.values(cropTotals).reduce((sum, crop) => sum + crop.insurance, 0);
//   const overallTotal = Object.values(cropTotals).reduce((sum, crop) => sum + crop.total, 0);

//   return (
//     <div className="w-full h-full bg-white p-6" style={{ fontSize: "12px", fontFamily: "serif" }}>
//       {/* Header */}
//       <div className="text-center mb-6">
//         <h1 className="text-base font-bold mb-2">S.1374 மருது ஞ்சாவடி தொடர்க்க வேளாண்மை கூட்டுறவு கடன்</h1>
//         <h2 className="text-sm font-bold mb-2 mb-4"> சங்கம் வரை.,</h2>
//         <h3 className="text-sm font-bold underline mb-4">CROP LOAN DISBURSEMENT DETAILS</h3>
//       </div>

//       {/* Loan Disbursement Summary */}
//       <div className="mb-6">
//         <table className="border-2 border-black border-collapse mb-4">
//           <tbody>
//             <tr>
//               <td className="border border-black p-2 font-semibold" style={{ width: "200px" }}>
//                 Number of Farmer
//               </td>
//               <td className="border border-black p-2 text-center" style={{ width: "60px" }}>
//                 No :
//               </td>
//               <td className="border border-black p-2 text-center font-bold" style={{ width: "100px" }}>
//                 {totals.totalMembers}
//               </td>
//             </tr>
//             <tr>
//               <td className="border border-black p-2 font-semibold">Of which New Members</td>
//               <td className="border border-black p-2 text-center">No :</td>
//               <td className="border border-black p-2 text-center">-</td>
//             </tr>
//             <tr>
//               <td className="border border-black p-2 font-semibold">Amount</td>
//               <td className="border border-black p-2 text-center">:</td>
//               <td className="border border-black p-2 text-center font-bold">
//                 {formatIndianNumber(totals.totalAmount)}.00
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       {/* Category of Farmers */}
//       <div className="mb-6">
//         <h4 className="font-bold mb-2">CATEGORY OF FARMERS:</h4>
//         <table className="w-full border-2 border-black border-collapse">
//           <thead>
//             <tr>
//               <th className="border border-black p-2 text-center font-bold">Farmer Type</th>
//               <th className="border border-black p-2 text-center font-bold">No</th>
//               <th className="border border-black p-2 text-center font-bold">Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td className="border border-black p-2 text-center">OF</td>
//               <td className="border border-black p-2 text-center">{totals.farmerTypeBreakdown.OF || "-"}</td>
//               <td className="border border-black p-2 text-center">
//                 {farmerTypeAmounts.OF > 0 ? formatIndianNumber(farmerTypeAmounts.OF) + ".00" : "-"}
//               </td>
//             </tr>
//             <tr>
//               <td className="border border-black p-2 text-center">SF</td>
//               <td className="border border-black p-2 text-center">{totals.farmerTypeBreakdown.SF || "-"}</td>
//               <td className="border border-black p-2 text-center">
//                 {farmerTypeAmounts.SF > 0 ? formatIndianNumber(farmerTypeAmounts.SF) + ".00" : "-"}
//               </td>
//             </tr>
//             <tr>
//               <td className="border border-black p-2 text-center font-bold">MF</td>
//               <td className="border border-black p-2 text-center font-bold">{totals.farmerTypeBreakdown.MF}</td>
//               <td className="border border-black p-2 text-center font-bold">
//                 {formatIndianNumber(farmerTypeAmounts.MF)}.00
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       {/* Classification of Farmers */}
//       <div className="mb-6">
//         <h4 className="font-bold mb-2">CLASSIFICATION OF FARMERS</h4>
//         <table className="w-full border-2 border-black border-collapse">
//           <thead>
//             <tr>
//               <th className="border border-black p-2 text-center font-bold">Farmer Type</th>
//               <th className="border border-black p-2 text-center font-bold">No</th>
//               <th className="border border-black p-2 text-center font-bold">Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td className="border border-black p-2 text-center">SC</td>
//               <td className="border border-black p-2 text-center">{totals.classificationBreakdown.SC || "-"}</td>
//               <td className="border border-black p-2 text-center">
//                 {classificationAmounts.SC > 0 ? formatIndianNumber(classificationAmounts.SC) + ".00" : "-"}
//               </td>
//             </tr>
//             <tr>
//               <td className="border border-black p-2 text-center">ST</td>
//               <td className="border border-black p-2 text-center">{totals.classificationBreakdown.ST || "-"}</td>
//               <td className="border border-black p-2 text-center">
//                 {classificationAmounts.ST > 0 ? formatIndianNumber(classificationAmounts.ST) + ".00" : "-"}
//               </td>
//             </tr>
//             <tr>
//               <td className="border border-black p-2 text-center font-bold">Others</td>
//               <td className="border border-black p-2 text-center font-bold">
//                 {(totals.classificationBreakdown.Others + totals.classificationBreakdown.BC) || 0}
//               </td>
//               <td className="border border-black p-2 text-center font-bold">
//                 {formatIndianNumber(classificationAmounts.Others + classificationAmounts.BC)}.00
//               </td>
//             </tr>
//             <tr className="bg-gray-100">
//               <td className="border border-black p-2 text-center font-bold">Total</td>
//               <td className="border border-black p-2 text-center font-bold">{totals.totalMembers}</td>
//               <td className="border border-black p-2 text-center font-bold">
//                 {formatIndianNumber(totals.totalAmount)}.00
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       {/* Crop Details */}
//       <div className="mb-6">
//         {Object.keys(cropTotals).length === 0 ? (
//           <div className="text-center text-red-500 font-bold py-4 border-2 border-gray-300">
//             No crop data available.
//           </div>
//         ) : (
//           <>
//             {Object.entries(cropTotals).map(([cropName, breakdown], index) => (
//               <div key={cropName} className="mb-6">
//                 <div className="mb-4">
//                   <span className="font-bold">NAME OF THE CROP: </span>
//                   <span className="font-bold">{cropName}</span>
//                 </div>

//                 <div className="grid grid-cols-2 gap-8">
//                   {/* Left Column - Expenses */}
//                   <div>
//                     <div className="space-y-2">
//                       <div className="flex justify-between">
//                         <span className="font-bold">CASH</span>
//                         <span>:</span>
//                         <span className="font-bold">{formatIndianNumber(breakdown?.cash || 0)}.00</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="font-bold">SEEDS</span>
//                         <span>:</span>
//                         <span className="font-bold">{formatIndianNumber(breakdown?.seeds || 0)}.00</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="font-bold">PESTICIDE</span>
//                         <span>:</span>
//                         <span className="font-bold">{formatIndianNumber(breakdown?.pesticide || 0)}.00</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="font-bold">FERTILIZER</span>
//                         <span>:</span>
//                         <span className="font-bold">{formatIndianNumber(breakdown?.fertilizer || 0)}.00</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="font-bold">தொழுவு உரம்</span>
//                         <span>:</span>
//                         <span className="font-bold">{formatIndianNumber(breakdown?.others || 0)}.00</span> {/* Fixed this line */}
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="font-bold">INSURANCE</span>
//                         <span>:</span>
//                         <span className="font-bold">
//                           {breakdown?.insurance && breakdown.insurance > 0
//                             ? formatIndianNumber(breakdown.insurance) + ".00"
//                             : "-"}
//                         </span>
//                       </div>
//                       <div className="border-t-2 border-black pt-2 mt-4">
//                         <div className="flex justify-between">
//                           <span className="font-bold">Total</span>
//                           <span>:</span>
//                           <span className="font-bold underline">
//                             {formatIndianNumber(breakdown?.total || 0)}.00
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Right Column - Extent */}
//                   <div className="flex justify-center items-start pt-8">
//                     <div>
//                       <span className="font-bold">Extent (Area) :</span>
//                       <span className="ml-2">
//                         {(cropExtents[cropName] ?? 0).toFixed(2)} acres
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {index < Object.entries(cropTotals).length - 1 && (
//                   <hr className="my-6 border-t-2 border-gray-300" />
//                 )}
//               </div>
//             ))}

//             {Object.keys(cropTotals).length > 1 && (
//               <div className="mt-8 p-4 bg-gray-50 border-2 border-gray-300">
//                 <h4 className="font-bold mb-4 text-center">OVERALL CROP TOTALS</h4>

//                 <div className="grid grid-cols-2 gap-8">
//                   <div>
//                     <div className="space-y-2">
//                       <div className="flex justify-between">
//                         <span className="font-bold">TOTAL CASH</span>
//                         <span>:</span>
//                         <span className="font-bold">{formatIndianNumber(overallCash || 0)}.00</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="font-bold">TOTAL SEEDS</span>
//                         <span>:</span>
//                         <span className="font-bold">{formatIndianNumber(overallSeeds || 0)}.00</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="font-bold">TOTAL PESTICIDE</span>
//                         <span>:</span>
//                         <span className="font-bold">{formatIndianNumber(overallPesticide || 0)}.00</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="font-bold">TOTAL FERTILIZER</span>
//                         <span>:</span>
//                         <span className="font-bold">{formatIndianNumber(overallFertilizer || 0)}.00</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="font-bold">TOTAL தொழுவு உரம்</span>
//                         <span>:</span>
//                         <span className="font-bold">{formatIndianNumber(overallOthers || 0)}.00</span> {/* Fixed this line */}
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="font-bold">TOTAL INSURANCE</span>
//                         <span>:</span>
//                         <span className="font-bold">
//                           {overallInsurance > 0 ? formatIndianNumber(overallInsurance) + ".00" : "-"}
//                         </span>
//                       </div>
//                       <div className="border-t-2 border-black pt-2 mt-4">
//                         <div className="flex justify-between">
//                           <span className="font-bold">GRAND TOTAL</span>
//                           <span>:</span>
//                           <span className="font-bold underline text-lg">
//                             {formatIndianNumber(overallTotal || 0)}.00
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="flex justify-center items-start pt-8">
//                     <div>
//                       <span className="font-bold">Total Extent (Area) :</span>
//                       <span className="ml-2">{(totalExtent ?? 0).toFixed(2)} acres</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </div>

//       {/* Footer Signatures */}
//       <div className="flex justify-between mt-16">
//         <div className="text-left">
//           <div className="font-bold">SUPERVISER</div>
//         </div>
//         <div className="text-right">
//           <div className="font-bold">SECRETARY</div>
//         </div>
//       </div>
//     </div>
//   );
// }
import type { KCCData, EnhancedKCCMember } from '@/types/kcc-types';
import { calculateKCCTotals } from '@/utils/kcc-utils';

interface KCCPage4Props {
  data: KCCData
  isEditing: boolean
  selectedUsers?: EnhancedKCCMember[]
  onMemberEdit?: (memberId: string) => void
  onSettingsEdit?: () => void
  onAddMember?: () => void
  onDeleteMember?: (memberId: string) => void
}

interface CropExpense {
  cash: number
  seeds: number
  pesticide: number
  fertilizer: number
  others: number
  insurance: number
}

interface CropGroup {
  cropName: string
  extent: number
  total: number
  expenses: CropExpense
  userCount: number
}

export function KCCPage4({ data, isEditing, selectedUsers, onMemberEdit, onAddMember, onDeleteMember }: KCCPage4Props) {
  // Use selectedUsers if provided, otherwise use data.members
  const membersToUse = selectedUsers && selectedUsers.length > 0 ? selectedUsers : data.members;
  
  // Calculate totals using the utility function with the appropriate members
  const totals = calculateKCCTotals(membersToUse);

  // Calculate amounts for each farmer type and classification
  const farmerTypeAmounts = {
    MF: membersToUse.filter((m) => m.farmerType === "MF").reduce((sum, m) => sum + m.amount, 0),
    SF: membersToUse.filter((m) => m.farmerType === "SF").reduce((sum, m) => sum + m.amount, 0),
    OF: membersToUse.filter((m) => m.farmerType === "OF").reduce((sum, m) => sum + m.amount, 0),
  };

  const classificationAmounts = {
    SC: membersToUse.filter((m) => m.classification === "SC").reduce((sum, m) => sum + m.amount, 0),
    ST: membersToUse.filter((m) => m.classification === "ST").reduce((sum, m) => sum + m.amount, 0),
    BC: membersToUse.filter((m) => m.classification === "BC").reduce((sum, m) => sum + m.amount, 0),
    Others: membersToUse.filter((m) => m.classification === "Others").reduce((sum, m) => sum + m.amount, 0),
  };

  // Extract crop data from all members
  const extractCropData = (): CropGroup[] => {
    const cropMap: Record<string, CropGroup> = {};
    
    // Process all members to extract crop information
    membersToUse.forEach(member => {
      if (member.selectedCrops && Array.isArray(member.selectedCrops)) {
        member.selectedCrops.forEach((cropItem: any) => {
          const cropName = cropItem.crop?.name_of_crop || cropItem.cropName || "Unknown Crop";
          
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
                insurance: 0
              },
              userCount: 0
            };
          }
          
          // Add to totals
          cropMap[cropName].extent += cropItem.acres || 0;
          cropMap[cropName].total += cropItem.eligibleAmount || 0;
          cropMap[cropName].userCount += 1;
          
          // Calculate expenses from breakdown
          if (cropItem.breakdown) {
            cropMap[cropName].expenses.cash += cropItem.breakdown.rokkam || cropItem.breakdown.motham || 0;
            cropMap[cropName].expenses.seeds += cropItem.breakdown.vithai || 0;
            cropMap[cropName].expenses.pesticide += cropItem.breakdown.poochi_marundhu || 0;
            cropMap[cropName].expenses.fertilizer += 
              (cropItem.breakdown.uram_1 || 0) + 
              (cropItem.breakdown.uram_2 || 0) + 
              (cropItem.breakdown.thozhu_uram || 0);
            cropMap[cropName].expenses.others += cropItem.breakdown.others || 0;
            cropMap[cropName].expenses.insurance += cropItem.breakdown.insurance || 0;
          }
        });
      }
    });
    
    return Object.values(cropMap);
  };

  const cropGroups = extractCropData();
  const hasCropData = cropGroups.length > 0;

  // Calculate overall totals for all crops
  const overallCash = hasCropData ? cropGroups.reduce((sum, crop) => sum + crop.expenses.cash, 0) : 0;
  const overallSeeds = hasCropData ? cropGroups.reduce((sum, crop) => sum + crop.expenses.seeds, 0) : 0;
  const overallPesticide = hasCropData ? cropGroups.reduce((sum, crop) => sum + crop.expenses.pesticide, 0) : 0;
  const overallFertilizer = hasCropData ? cropGroups.reduce((sum, crop) => sum + crop.expenses.fertilizer, 0) : 0;
  const overallOthers = hasCropData ? cropGroups.reduce((sum, crop) => sum + crop.expenses.others, 0) : 0;
  const overallInsurance = hasCropData ? cropGroups.reduce((sum, crop) => sum + crop.expenses.insurance, 0) : 0;
  const overallTotal = hasCropData ? cropGroups.reduce((sum, crop) => sum + crop.total, 0) : 0;
  const overallExtent = hasCropData ? cropGroups.reduce((sum, crop) => sum + crop.extent, 0) : 0;

  // Format numbers with Indian numbering system (with commas)
  const formatIndianNumber = (num: number) => {
    return num.toLocaleString('en-IN');
  };

  return (
    <div className="w-full h-full bg-white p-6" style={{ fontSize: "14px", fontFamily: "serif" }}>
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-base font-bold mb-2">S.1374 மருது ஞ்சாவடி தொடர்க்க வேளாண்மை கூட்டுறவு கடன்</h1>
        <h2 className="text-sm font-bold mb-2 mb-4"> சங்கம் வரை.,</h2>
        <h3 className="text-sm font-bold underline mb-4">CROP LOAN DISBURSEMENT DETAILS</h3>
      </div>

      {/* Loan Disbursement Summary */}
      <div className="mb-6">
        <table className="border-2 border-black border-collapse mb-4">
          <tbody>
            <tr>
              <td className="border border-black p-2 font-semibold" style={{ width: "200px" }}>
                Number of Farmer
              </td>
              <td className="border border-black p-2 text-center" style={{ width: "60px" }}>
                No :
              </td>
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
              <td className="border border-black p-2 text-center font-bold">
                {formatIndianNumber(totals.totalAmount)}.00
              </td>
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
                {farmerTypeAmounts.OF > 0 ? formatIndianNumber(farmerTypeAmounts.OF) + ".00" : "-"}
              </td>
            </tr>
            <tr>
              <td className="border border-black p-2 text-center">SF</td>
              <td className="border border-black p-2 text-center">{totals.farmerTypeBreakdown.SF || "-"}</td>
              <td className="border border-black p-2 text-center">
                {farmerTypeAmounts.SF > 0 ? formatIndianNumber(farmerTypeAmounts.SF) + ".00" : "-"}
              </td>
            </tr>
            <tr>
              <td className="border border-black p-2 text-center font-bold">MF</td>
              <td className="border border-black p-2 text-center font-bold">{totals.farmerTypeBreakdown.MF}</td>
              <td className="border border-black p-2 text-center font-bold">
                {formatIndianNumber(farmerTypeAmounts.MF)}.00
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
                {classificationAmounts.SC > 0 ? formatIndianNumber(classificationAmounts.SC) + ".00" : "-"}
              </td>
            </tr>
            <tr>
              <td className="border border-black p-2 text-center">ST</td>
              <td className="border border-black p-2 text-center">{totals.classificationBreakdown.ST || "-"}</td>
              <td className="border border-black p-2 text-center">
                {classificationAmounts.ST > 0 ? formatIndianNumber(classificationAmounts.ST) + ".00" : "-"}
              </td>
            </tr>
            <tr>
              <td className="border border-black p-2 text-center font-bold">Others</td>
              <td className="border border-black p-2 text-center font-bold">
                {(totals.classificationBreakdown.Others + totals.classificationBreakdown.BC) || 0}
              </td>
              <td className="border border-black p-2 text-center font-bold">
                {formatIndianNumber(classificationAmounts.Others + classificationAmounts.BC)}.00
              </td>
            </tr>
            <tr className="bg-gray-100">
              <td className="border border-black p-2 text-center font-bold">Total</td>
              <td className="border border-black p-2 text-center font-bold">{totals.totalMembers}</td>
              <td className="border border-black p-2 text-center font-bold">
                {formatIndianNumber(totals.totalAmount)}.00
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Crop Details */}
      <div className="mb-6">
        {!hasCropData ? (
          <div className="text-center text-red-500 font-bold py-4 border-2 border-gray-300">
            No crop data available.
          </div>
        ) : (
          <>
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
                        <span className="font-bold">CASH</span>
                        <span>:</span>
                        <span className="font-bold">{formatIndianNumber(cropData.expenses.cash || 0)}.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-bold">SEEDS</span>
                        <span>:</span>
                        <span className="font-bold">{formatIndianNumber(cropData.expenses.seeds || 0)}.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-bold">PESTICIDE</span>
                        <span>:</span>
                        <span className="font-bold">{formatIndianNumber(cropData.expenses.pesticide || 0)}.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-bold">FERTILIZER</span>
                        <span>:</span>
                        <span className="font-bold">{formatIndianNumber(cropData.expenses.fertilizer || 0)}.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-bold">தொழுவு உரம்</span>
                        <span>:</span>
                        <span className="font-bold">{formatIndianNumber(cropData.expenses.others || 0)}.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-bold">INSURANCE</span>
                        <span>:</span>
                        <span className="font-bold">
                          {cropData.expenses.insurance && cropData.expenses.insurance > 0
                            ? formatIndianNumber(cropData.expenses.insurance) + ".00"
                            : "-"}
                        </span>
                      </div>
                      <div className="border-t-2 border-black pt-2 mt-4">
                        <div className="flex justify-between">
                          <span className="font-bold">Total for {cropData.cropName}</span>
                          <span>:</span>
                          <span className="font-bold underline">
                            {formatIndianNumber(cropData.total || 0)}.00
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Extent */}
                  <div className="flex justify-center items-start pt-8">
                    <div>
                      <span className="font-bold">Extent (Area) :</span>
                      <span className="ml-2">
                        {(cropData.extent || 0).toFixed(2)} acres
                      </span>
                    </div>
                  </div>
                </div>

                {index < cropGroups.length - 1 && (
                  <hr className="my-6 border-t-2 border-gray-300" />
                )}
              </div>
            ))}

            {/* Overall Crop Totals */}
            {cropGroups.length > 1 && (
              <div className="mt-8 p-4 bg-gray-50 border-2 border-gray-300">
                <h4 className="font-bold mb-4 text-center">OVERALL CROP TOTALS</h4>

                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-bold">TOTAL CASH</span>
                        <span>:</span>
                        <span className="font-bold">{formatIndianNumber(overallCash || 0)}.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-bold">TOTAL SEEDS</span>
                        <span>:</span>
                        <span className="font-bold">{formatIndianNumber(overallSeeds || 0)}.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-bold">TOTAL PESTICIDE</span>
                        <span>:</span>
                        <span className="font-bold">{formatIndianNumber(overallPesticide || 0)}.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-bold">TOTAL FERTILIZER</span>
                        <span>:</span>
                        <span className="font-bold">{formatIndianNumber(overallFertilizer || 0)}.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-bold">TOTAL தொழுவு உரம்</span>
                        <span>:</span>
                        <span className="font-bold">{formatIndianNumber(overallOthers || 0)}.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-bold">TOTAL INSURANCE</span>
                        <span>:</span>
                        <span className="font-bold">
                          {overallInsurance > 0 ? formatIndianNumber(overallInsurance) + ".00" : "-"}
                        </span>
                      </div>
                      <div className="border-t-2 border-black pt-2 mt-4">
                        <div className="flex justify-between">
                          <span className="font-bold">GRAND TOTAL</span>
                          <span>:</span>
                          <span className="font-bold underline text-lg">
                            {formatIndianNumber(overallTotal || 0)}.00
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center items-start pt-8">
                    <div>
                      <span className="font-bold">Total Extent (Area) :</span>
                      <span className="ml-2">{(overallExtent || 0).toFixed(2)} acres</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

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
  );
}