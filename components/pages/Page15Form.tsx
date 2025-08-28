"use client"

import { Card, CardContent } from "@/components/ui/card"

export default function Page15Form() {
  const loanData = [
    {
      id: 1,
      type: "ST - KCC",
      col1: "280.00",
      col2: "249.01",
      col3: "-",
      col4: "13.32",
      col5: "18.94",
      col6: "18.94",
      col7: "243.39",
      col8: "249.04",
      col9: "8.15",
      col10: "5.65",
      col11: "-",
      col12: "-",
    },
    {
      id: 2,
      type: "ST - KCC AH WCL",
      col1: "89.00",
      col2: "61.56",
      col3: "-",
      col4: "25.56",
      col5: "1.80",
      col6: "1.80",
      col7: "85.32",
      col8: "86.40",
      col9: "-",
      col10: "1.02",
      col11: "-",
      col12: "-",
    },
    {
      id: 3,
      type: "ST - JLG Agri",
      col1: "-",
      col2: "-",
      col3: "-",
      col4: "-",
      col5: "-",
      col6: "-",
      col7: "-",
      col8: "-",
      col9: "-",
      col10: "-",
      col11: "-",
      col12: "-",
    },
    {
      id: 4,
      type: "JL CC",
      col1: "120.00",
      col2: "113.96",
      col3: "0.96",
      col4: "1.76",
      col5: "-",
      col6: "-",
      col7: "115.72",
      col8: "661.10",
      col9: "12.75",
      col10: "545.38",
      col11: "-",
      col12: "-",
    },
    {
      id: 5,
      type: "PDS CC",
      col1: "-",
      col2: "-",
      col3: "-",
      col4: "-",
      col5: "-",
      col6: "-",
      col7: "-",
      col8: "3.96",
      col9: "0.59",
      col10: "3.96",
      col11: "-",
      col12: "-",
    },
    {
      id: 6,
      type: "NON PDS CC",
      col1: "-",
      col2: "-",
      col3: "-",
      col4: "-",
      col5: "-",
      col6: "-",
      col7: "-",
      col8: "4.11",
      col9: "0.41",
      col10: "4.11",
      col11: "-",
      col12: "-",
    },
    {
      id: 7,
      type: "MT LOAN",
      col1: "-",
      col2: "13.02",
      col3: "-",
      col4: "-",
      col5: "1.71",
      col6: "1.71",
      col7: "11.31",
      col8: "-",
      col9: "-",
      col10: "-",
      col11: "-",
      col12: "-",
    },
    {
      id: 8,
      type: "JLG MT",
      col1: "-",
      col2: "-",
      col3: "-",
      col4: "-",
      col5: "-",
      col6: "-",
      col7: "-",
      col8: "-",
      col9: "-",
      col10: "-",
      col11: "-",
      col12: "-",
    },
    {
      id: 9,
      type: "SHG",
      col1: "-",
      col2: "48.35",
      col3: "-",
      col4: "-",
      col5: "6.27",
      col6: "32.32",
      col7: "16.03",
      col8: "-",
      col9: "-",
      col10: "-",
      col11: "-",
      col12: "-",
    },
    {
      id: 10,
      type: "MTC Loan",
      col1: "-",
      col2: "-",
      col3: "-",
      col4: "-",
      col5: "-",
      col6: "-",
      col7: "-",
      col8: "-",
      col9: "-",
      col10: "-",
      col11: "-",
      col12: "-",
    },
    {
      id: 11,
      type: "Handicapit Loan",
      col1: "-",
      col2: "2.32",
      col3: "-",
      col4: "-",
      col5: "0.48",
      col6: "0.48",
      col7: "1.84",
      col8: "-",
      col9: "-",
      col10: "-",
      col11: "-",
      col12: "-",
    },
    {
      id: 12,
      type: "Produce Loan",
      col1: "-",
      col2: "-",
      col3: "-",
      col4: "-",
      col5: "-",
      col6: "-",
      col7: "-",
      col8: "-",
      col9: "-",
      col10: "-",
      col11: "-",
      col12: "-",
    },
    {
      id: 13,
      type: "Non Form Sectors",
      col1: "-",
      col2: "-",
      col3: "-",
      col4: "-",
      col5: "-",
      col6: "-",
      col7: "-",
      col8: "-",
      col9: "-",
      col10: "-",
      col11: "-",
      col12: "-",
    },
    {
      id: 14,
      type: "Tabcedco",
      col1: "-",
      col2: "-",
      col3: "-",
      col4: "-",
      col5: "-",
      col6: "-",
      col7: "-",
      col8: "-",
      col9: "-",
      col10: "-",
      col11: "-",
      col12: "-",
    },
    {
      id: 15,
      type: "Tamco",
      col1: "-",
      col2: "-",
      col3: "-",
      col4: "-",
      col5: "-",
      col6: "-",
      col7: "-",
      col8: "-",
      col9: "-",
      col10: "-",
      col11: "-",
      col12: "-",
    },
    {
      id: 16,
      type: "Thadco",
      col1: "-",
      col2: "-",
      col3: "-",
      col4: "-",
      col5: "-",
      col6: "-",
      col7: "-",
      col8: "-",
      col9: "-",
      col10: "-",
      col11: "-",
      col12: "-",
    },
    {
      id: 17,
      type: "Agro Loan",
      col1: "-",
      col2: "-",
      col3: "-",
      col4: "-",
      col5: "-",
      col6: "-",
      col7: "-",
      col8: "-",
      col9: "-",
      col10: "-",
      col11: "-",
      col12: "-",
    },
    {
      id: 18,
      type: "MSC Loan",
      col1: "-",
      col2: "-",
      col3: "-",
      col4: "-",
      col5: "-",
      col6: "-",
      col7: "-",
      col8: "-",
      col9: "-",
      col10: "-",
      col11: "-",
      col12: "-",
    },
    {
      id: 19,
      type: "Blacked Loan",
      col1: "-",
      col2: "-",
      col3: "-",
      col4: "-",
      col5: "-",
      col6: "-",
      col7: "-",
      col8: "-",
      col9: "-",
      col10: "-",
      col11: "-",
      col12: "-",
    },
    {
      id: 20,
      type: "Other Loan",
      col1: "-",
      col2: "-",
      col3: "-",
      col4: "-",
      col5: "-",
      col6: "-",
      col7: "-",
      col8: "-",
      col9: "-",
      col10: "-",
      col11: "-",
      col12: "-",
    },
  ]

  const totalRow = {
    type: "Total",
    col1: "489.00",
    col2: "488.22",
    col3: "0.96",
    col4: "40.64",
    col5: "29.20",
    col6: "55.25",
    col7: "473.61",
    col8: "1004.61",
    col9: "21.91",
    col10: "560.18",
    col11: "-",
    col12: "-",
  }

  return (
    <div className="w-full bg-white" style={{ minHeight: "210mm", width: "297mm", margin: "0 auto" }}>
      <Card className="w-full h-full">
        <CardContent className="p-4">
          {/* Header */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm font-medium">ஆதார குறைவு</div>
              <div className="text-center">
                <h1 className="text-lg font-bold">S.331.இடங்கணராலை PACCS Ltd</h1>
              </div>
              <div className="text-sm font-medium">ஜூலை-2025</div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-black text-xs">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-black p-1 text-center font-medium w-8">வ.எண்</th>
                  <th className="border border-black p-1 text-center font-medium w-32">விபரம்</th>
                  <th className="border border-black p-1 text-center font-medium w-16">கடன் சீக்கிரம் கணக்கு வரவு</th>
                  <th className="border border-black p-1 text-center font-medium w-16">கடன் கணக்கு இருப்பு</th>
                  <th className="border border-black p-1 text-center font-medium w-16">மீட்டு மாதம் இருப்பு</th>
                  <th className="border border-black p-1 text-center font-medium w-16">வ.பய மாதம் வரவு இருப்பு</th>
                  <th className="border border-black p-1 text-center font-medium w-16">டெபாசிட் வரவு கணக்கு இருப்பு</th>
                  <th className="border border-black p-1 text-center font-medium w-16">வ.பய மாதம் வரவு இருப்பு</th>
                  <th className="border border-black p-1 text-center font-medium w-16">மீட்டு வரவு கணக்கு இருப்பு</th>
                  <th className="border border-black p-1 text-center font-medium w-16">கடன் வரவு கணக்கு இருப்பு</th>
                  <th className="border border-black p-1 text-center font-medium w-16">கடன் வரவு கணக்கு இருப்பு</th>
                  <th className="border border-black p-1 text-center font-medium w-16">கடன் வரவு கணக்கு இருப்பு</th>
                  <th className="border border-black p-1 text-center font-medium w-16">கடன் வரவு கணக்கு இருப்பு</th>
                </tr>
              </thead>
              <tbody>
                {loanData.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="border border-black p-1 text-center">{row.id}</td>
                    <td className="border border-black p-1 text-left">{row.type}</td>
                    <td className="border border-black p-1 text-right">{row.col1}</td>
                    <td className="border border-black p-1 text-right">{row.col2}</td>
                    <td className="border border-black p-1 text-right">{row.col3}</td>
                    <td className="border border-black p-1 text-right">{row.col4}</td>
                    <td className="border border-black p-1 text-right">{row.col5}</td>
                    <td className="border border-black p-1 text-right">{row.col6}</td>
                    <td className="border border-black p-1 text-right">{row.col7}</td>
                    <td className="border border-black p-1 text-right">{row.col8}</td>
                    <td className="border border-black p-1 text-right">{row.col9}</td>
                    <td className="border border-black p-1 text-right">{row.col10}</td>
                    <td className="border border-black p-1 text-right">{row.col11}</td>
                    <td className="border border-black p-1 text-right">{row.col12}</td>
                  </tr>
                ))}
                {/* Total Row */}
                <tr className="bg-gray-100 font-bold">
                  <td className="border border-black p-1 text-center"></td>
                  <td className="border border-black p-1 text-center font-bold">{totalRow.type}</td>
                  <td className="border border-black p-1 text-right font-bold">{totalRow.col1}</td>
                  <td className="border border-black p-1 text-right font-bold">{totalRow.col2}</td>
                  <td className="border border-black p-1 text-right font-bold">{totalRow.col3}</td>
                  <td className="border border-black p-1 text-right font-bold">{totalRow.col4}</td>
                  <td className="border border-black p-1 text-right font-bold">{totalRow.col5}</td>
                  <td className="border border-black p-1 text-right font-bold">{totalRow.col6}</td>
                  <td className="border border-black p-1 text-right font-bold">{totalRow.col7}</td>
                  <td className="border border-black p-1 text-right font-bold">{totalRow.col8}</td>
                  <td className="border border-black p-1 text-right font-bold">{totalRow.col9}</td>
                  <td className="border border-black p-1 text-right font-bold">{totalRow.col10}</td>
                  <td className="border border-black p-1 text-right font-bold">{totalRow.col11}</td>
                  <td className="border border-black p-1 text-right font-bold">{totalRow.col12}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
