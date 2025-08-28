// type Page10FormProps = {
//   data?: any
//   onDataChange?: (data: any) => void
// }

// export default function Page10Form({ data, onDataChange }: Page10FormProps) {
//   return (
//     <div className="w-full bg-white p-4 font-sans">
//       {/* Header Section */}
//       <div className="mb-6">
//         <div className="flex justify-between items-start mb-4">
//           <div className="flex-1">
//             <div className="text-sm font-semibold mb-2">OUTSTANDING AND PROFITABILITY STATEMENT FOR THE MONTH OF</div>
//             <div className="flex items-center gap-2">
//               <span className="text-sm font-medium">Name of the Society:</span>
//               <span className="text-sm font-bold">S.331,Edanganasalai PACCS Ltd</span>
//             </div>
//           </div>
//           <div className="text-center flex-1">
//             <div className="text-xl font-bold">FORM T</div>
//             <div className="text-lg font-semibold mt-1">JUNE-2025</div>
//           </div>
//           <div className="flex-1 text-right">
//             <div className="text-sm">(Rs in Lakhs)</div>
//           </div>
//         </div>
//       </div>

//       {/* Main Table */}
//       <div className="border-2 border-black mb-6">
//         <table className="w-full border-collapse">
//           <thead>
//             <tr>
//               <th className="border border-black p-2 w-16 text-sm font-semibold align-middle">S.No</th>
//               <th className="border border-black p-2 w-32 text-sm font-semibold">
//                 <div className="transform -rotate-90 whitespace-nowrap h-20 flex items-center justify-center">
//                   Name of the Society
//                 </div>
//               </th>
//               <th className="border border-black p-2 text-center" colSpan={5}>
//                 <div className="text-sm font-semibold mb-3">Income generated during the month</div>
//                 <div className="grid grid-cols-5 gap-0 text-xs">
//                   <div className="border-r border-black p-2 font-medium">
//                     Interest
//                     <br />
//                     (credit
//                     <br />
//                     Business)
//                   </div>
//                   <div className="border-r border-black p-2 font-medium">
//                     Trading
//                     <br />
//                     (Non credit
//                     <br />
//                     business)
//                   </div>
//                   <div className="border-r border-black p-2 font-medium">
//                     Other
//                     <br />
//                     if any
//                   </div>
//                   <div className="border-r border-black p-2 font-medium">Total</div>
//                   <div className="p-2 font-medium">
//                     Income
//                     <br />
//                     Interest
//                     <br />
//                     earned up
//                     <br />
//                     to the
//                     <br />
//                     month From
//                     <br />
//                     30.06.2025
//                   </div>
//                 </div>
//               </th>
//               <th className="border border-black p-2 text-center" colSpan={4}>
//                 <div className="text-sm font-semibold mb-3">Expenditure during the Month</div>
//                 <div className="grid grid-cols-4 gap-0 text-xs">
//                   <div className="border-r border-black p-2 font-medium">
//                     Interest
//                     <br />
//                     Paid
//                   </div>
//                   <div className="border-r border-black p-2 font-medium">E & C</div>
//                   <div className="border-r border-black p-2 font-medium">
//                     Other
//                     <br />
//                     if any
//                   </div>
//                   <div className="p-2 font-medium">Total</div>
//                 </div>
//               </th>
//               <th className="border border-black p-2 text-xs font-medium w-24">
//                 Expenditure
//                 <br />
//                 incurred
//                 <br />
//                 upto the
//                 <br />
//                 month From
//                 <br />
//                 30.06.2025
//               </th>
//               <th className="border border-black p-2 text-xs font-medium w-24">
//                 Tentative
//                 <br />
//                 P&L
//                 <br />
//                 during the
//                 <br />
//                 month
//               </th>
//               <th className="border border-black p-2 text-xs font-medium w-24">
//                 Tentative
//                 <br />
//                 P&L upto
//                 <br />
//                 the month
//                 <br />
//                 from
//                 <br />
//                 30.06.2025
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td className="border border-black p-3 text-center text-sm font-medium">1</td>
//               <td className="border border-black p-2 text-center">
//                 <div className="transform -rotate-90 whitespace-nowrap text-sm font-medium h-16 flex items-center justify-center">
//                   S.331,Edanganasalai
//                 </div>
//               </td>
//               <td className="border border-black p-3 text-center text-sm">9.27</td>
//               <td className="border border-black p-3 text-center text-sm">0.20</td>
//               <td className="border border-black p-3 text-center text-sm">1.62</td>
//               <td className="border border-black p-3 text-center text-sm">11.09</td>
//               <td className="border border-black p-3 text-center text-sm">33.61</td>
//               <td className="border border-black p-3 text-center text-sm">5.91</td>
//               <td className="border border-black p-3 text-center text-sm">0.52</td>
//               <td className="border border-black p-3 text-center text-sm">0.45</td>
//               <td className="border border-black p-3 text-center text-sm">6.88</td>
//               <td className="border border-black p-3 text-center text-sm">41.90</td>
//               <td className="border border-black p-3 text-center text-sm">4.21</td>
//               <td className="border border-black p-3 text-center text-sm">(8.32)</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       {/* Secretary Section */}
//       <div className="text-right mb-6">
//         <div className="text-sm font-semibold">SECRETARY</div>
//         <div className="text-sm font-medium">S.331,Edanganasalai PACCS Ltd</div>
//       </div>

//       {/* Tamil Section */}
//       <div className="border-2 border-black">
//         <div className="bg-gray-100 p-3 text-center">
//           <div className="text-base font-bold">சிற்றுந்து சாதகவார் செலவிலம்</div>
//         </div>
//         <table className="w-full border-collapse">
//           <thead>
//             <tr>
//               <th className="border border-black p-2 text-sm font-semibold w-16">க. எண்</th>
//               <th className="border border-black p-2 text-sm font-semibold w-64">விபரம்</th>
//               <th className="border border-black p-2 text-sm font-semibold w-24">
//                 உ.வை. முதல்
//                 <br />
//                 வருமானம்
//               </th>
//               <th className="border border-black p-2 text-center" colSpan={2}>
//                 <div className="text-sm font-semibold mb-2">சிற்றுந்து செலவிலம்</div>
//                 <div className="grid grid-cols-2 gap-0">
//                   <div className="border-r border-black p-1 text-xs">வரவு</div>
//                   <div className="p-1 text-xs">செலவு</div>
//                 </div>
//               </th>
//               <th className="border border-black p-2 text-center" colSpan={2}>
//                 <div className="text-sm font-semibold mb-2">சாதகவார் செலவிலம்</div>
//                 <div className="grid grid-cols-2 gap-0">
//                   <div className="border-r border-black p-1 text-xs">வரவு</div>
//                   <div className="p-1 text-xs">செலவு</div>
//                 </div>
//               </th>
//               <th className="border border-black p-2 text-center" colSpan={2}>
//                 <div className="text-sm font-semibold mb-2">
//                   சிற்றுந்து சாதகவார்
//                   <br />
//                   செலவிலத்தல்
//                 </div>
//                 <div className="grid grid-cols-2 gap-0">
//                   <div className="border-r border-black p-1 text-xs">உ.வை வரவு</div>
//                   <div className="p-1 text-xs">உ.வை செலவு</div>
//                 </div>
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td className="border border-black p-2 text-center text-sm">1</td>
//               <td className="border border-black p-2 text-sm">31.03.2025ல் முடிவான்-த் ஆண்டிற்கு</td>
//               <td className="border border-black p-2 text-center text-sm">1156.47</td>
//               <td className="border border-black p-2 text-center text-sm">31.73</td>
//               <td className="border border-black p-2 text-center text-sm">2.74</td>
//               <td className="border border-black p-2 text-center text-sm">4.65</td>
//               <td className="border border-black p-2 text-center text-sm">0.40</td>
//               <td className="border border-black p-2 text-center text-sm">36.38</td>
//               <td className="border border-black p-2 text-center text-sm">3.15</td>
//             </tr>
//             <tr>
//               <td className="border border-black p-2 text-center text-sm">2</td>
//               <td className="border border-black p-2 text-sm">கடந்த ஆண்டு இதுவரை</td>
//               <td className="border border-black p-2 text-center text-sm">1156.74</td>
//               <td className="border border-black p-2 text-center text-sm">18.77</td>
//               <td className="border border-black p-2 text-center text-sm">6.49</td>
//               <td className="border border-black p-2 text-center text-sm">1.40</td>
//               <td className="border border-black p-2 text-center text-sm">0.48</td>
//               <td className="border border-black p-2 text-center text-sm">20.17</td>
//               <td className="border border-black p-2 text-center text-sm">6.97</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }
"use client"

import { Card, CardContent } from "@/components/ui/card"

export default function Component() {
  const profitabilityData = {
    societyName: "S.331.Edanganasalai PACCS Ltd",
    month: "JUNE-2025",
    currency: "(Rs in Lakhs)",
    incomeData: {
      interest: "9.27",
      trading: "0.20",
      other: "1.62",
      total: "11.09",
    },
    expenditureData: {
      incomeEarnedUpTo: "33.61",
      interestPaid: "5.91",
      eAndC: "0.52",
      otherIfAny: "0.45",
      total: "6.88",
      expenditureIncurred: "41.98",
      tentativePLDuringMonth: "4.21",
      tentativePLUptoMonth: "(8.32)",
    },
  }

  const tamilTableData = [
    {
      slNo: "1",
      date: "31.03.2025",
      description: "முடிவான்-நிதி இயல்புறுது",
      col1: "1156.47",
      col2: "31.73",
      col3: "2.74",
      col4: "4.65",
      col5: "0.40",
      col6: "36.38",
      col7: "3.15",
    },
    {
      slNo: "2",
      date: "",
      description: "நடப்பு சக இதர்பல்",
      col1: "1156.74",
      col2: "18.77",
      col3: "6.49",
      col4: "1.40",
      col5: "0.48",
      col6: "20.17",
      col7: "6.97",
    },
  ]

  return (
    <div className="w-full bg-white" style={{ minHeight: "210mm", width: "297mm", margin: "0 auto" }}>
      <Card className="w-full h-full">
        <CardContent className="p-4">
          {/* Header Section */}
          <div className="mb-6">
            <div className="flex justify-between items-start mb-4">
              <div className="text-sm">
                <p className="font-bold">OUT STANDING AND PROFITABILITY STATEMENT FOR THE MONTH OF</p>
                <p className="font-semibold">Name of the Society: {profitabilityData.societyName}</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold">FORMT</p>
              </div>
              <div className="text-right">
                <p className="font-bold">{profitabilityData.month}</p>
                <p className="text-sm">{profitabilityData.currency}</p>
              </div>
            </div>
          </div>

          {/* Main Profitability Table */}
          <div className="mb-8">
            <table className="w-full border-collapse border border-black text-sm">
              <thead>
                <tr>
                  <th className="border border-black p-2 text-center font-medium w-16">S.No</th>
                  <th className="border border-black p-2 text-center font-medium w-32">Name of the PACCS</th>
                  <th colSpan={4} className="border border-black p-2 text-center font-medium">
                    Income generated during the month
                  </th>
                  <th className="border border-black p-2 text-center font-medium w-24">
                    Income Interest earned up to the month From 30.06.2025
                  </th>
                  <th colSpan={4} className="border border-black p-2 text-center font-medium">
                    Expenditure during the Month
                  </th>
                  <th className="border border-black p-2 text-center font-medium w-24">
                    Expenditure incurred upto the month From 30.06.2025
                  </th>
                  <th className="border border-black p-2 text-center font-medium w-24">
                    Tentative P&L during the month
                  </th>
                  <th className="border border-black p-2 text-center font-medium w-24">
                    Tentative P&L upto the month from 30.06.2025
                  </th>
                </tr>
                <tr>
                  <th className="border border-black p-1"></th>
                  <th className="border border-black p-1"></th>
                  <th className="border border-black p-1 text-center text-xs">Interest (credit Business)</th>
                  <th className="border border-black p-1 text-center text-xs">Trading (Non credit business)</th>
                  <th className="border border-black p-1 text-center text-xs">Other if any</th>
                  <th className="border border-black p-1 text-center text-xs">Total</th>
                  <th className="border border-black p-1"></th>
                  <th className="border border-black p-1 text-center text-xs">Interest Paid</th>
                  <th className="border border-black p-1 text-center text-xs">E & C</th>
                  <th className="border border-black p-1 text-center text-xs">Other if any</th>
                  <th className="border border-black p-1 text-center text-xs">Total</th>
                  <th className="border border-black p-1"></th>
                  <th className="border border-black p-1"></th>
                  <th className="border border-black p-1"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-black p-2 text-center">1</td>
                  <td className="border border-black p-2 text-left">S.331.Edanganasalai</td>
                  <td className="border border-black p-2 text-right">{profitabilityData.incomeData.interest}</td>
                  <td className="border border-black p-2 text-right">{profitabilityData.incomeData.trading}</td>
                  <td className="border border-black p-2 text-right">{profitabilityData.incomeData.other}</td>
                  <td className="border border-black p-2 text-right">{profitabilityData.incomeData.total}</td>
                  <td className="border border-black p-2 text-right">
                    {profitabilityData.expenditureData.incomeEarnedUpTo}
                  </td>
                  <td className="border border-black p-2 text-right">
                    {profitabilityData.expenditureData.interestPaid}
                  </td>
                  <td className="border border-black p-2 text-right">{profitabilityData.expenditureData.eAndC}</td>
                  <td className="border border-black p-2 text-right">{profitabilityData.expenditureData.otherIfAny}</td>
                  <td className="border border-black p-2 text-right">{profitabilityData.expenditureData.total}</td>
                  <td className="border border-black p-2 text-right">
                    {profitabilityData.expenditureData.expenditureIncurred}
                  </td>
                  <td className="border border-black p-2 text-right">
                    {profitabilityData.expenditureData.tentativePLDuringMonth}
                  </td>
                  <td className="border border-black p-2 text-right">
                    {profitabilityData.expenditureData.tentativePLUptoMonth}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Secretary Signature */}
          <div className="text-right mb-8">
            <p className="text-sm font-bold">SECRETARY</p>
            <p className="text-sm font-bold">S.331.Edanganasalai PACCS Ltd</p>
          </div>

          {/* Tamil Table Section */}
          <div className="mb-4">
            <h3 className="text-sm font-bold mb-2">சீப்பத்தி சாதகவார் செலவினம்</h3>
            <table className="w-full border-collapse border border-black text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-black p-2 text-center font-medium w-12">வ.எண்</th>
                  <th className="border border-black p-2 text-center font-medium w-32">விபரம்</th>
                  <th className="border border-black p-2 text-center font-medium w-20">உ.வ. முதல் முதலும்</th>
                  <th colSpan={2} className="border border-black p-2 text-center font-medium">
                    சீப்பத்தி செலவினம்
                  </th>
                  <th colSpan={2} className="border border-black p-2 text-center font-medium">
                    சாதகவார் செலவினம்
                  </th>
                  <th colSpan={2} className="border border-black p-2 text-center font-medium">
                    சீப்பத்தி சாதகவார் செலவினத்தல்
                  </th>
                </tr>
                <tr className="bg-gray-50">
                  <th className="border border-black p-1"></th>
                  <th className="border border-black p-1"></th>
                  <th className="border border-black p-1"></th>
                  <th className="border border-black p-1 text-center text-xs">சாலம</th>
                  <th className="border border-black p-1 text-center text-xs">கதலம</th>
                  <th className="border border-black p-1 text-center text-xs">சாலம</th>
                  <th className="border border-black p-1 text-center text-xs">கதலம</th>
                  <th className="border border-black p-1 text-center text-xs">உ.வ.வ சாலம</th>
                  <th className="border border-black p-1 text-center text-xs">உ.வ.வ கதலம</th>
                </tr>
              </thead>
              <tbody>
                {tamilTableData.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-black p-2 text-center">{row.slNo}</td>
                    <td className="border border-black p-2 text-left">
                      {row.date} {row.description}
                    </td>
                    <td className="border border-black p-2 text-right">{row.col1}</td>
                    <td className="border border-black p-2 text-right">{row.col2}</td>
                    <td className="border border-black p-2 text-right">{row.col3}</td>
                    <td className="border border-black p-2 text-right">{row.col4}</td>
                    <td className="border border-black p-2 text-right">{row.col5}</td>
                    <td className="border border-black p-2 text-right">{row.col6}</td>
                    <td className="border border-black p-2 text-right">{row.col7}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

