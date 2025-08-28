"use client"

import { Card, CardContent } from "@/components/ui/card"

export default function Page12Form() {
  const loanData = [
    {
      id: 1,
      type: "Kissan cash credit",
      col1: "250.00",
      col2: "55.00",
      col3: "13.32",
      col4: "29.56",
      col5: "21.32",
      col6: "2.24",
      col7: "249.04",
      col8: "15.00",
    },
    {
      id: 2,
      type: "KCC AH WCL",
      col1: "65.00",
      col2: "20.00",
      col3: "25.56",
      col4: "3.60",
      col5: "2.16",
      col6: "1.44",
      col7: "86.40",
      col8: "10.00",
    },
    {
      id: 3,
      type: "Drip & Minor Irrigation",
      col1: "-",
      col2: "-",
      col3: "-",
      col4: "-",
      col5: "-",
      col6: "-",
      col7: "0.21",
      col8: "-",
    },
    { id: 4, type: "J.L.G", col1: "-", col2: "-", col3: "-", col4: "-", col5: "-", col6: "-", col7: "-", col8: "-" },
    {
      id: 5,
      type: "M.T Normal",
      col1: "21.00",
      col2: "-",
      col3: "-",
      col4: "11.07",
      col5: "6.04",
      col6: "5.03",
      col7: "31.03",
      col8: "-",
    },
    {
      id: 6,
      type: "Jewel Loan",
      col1: "680.00",
      col2: "220.00",
      col3: "143.67",
      col4: "165.63",
      col5: "154.91",
      col6: "10.72",
      col7: "661.10",
      col8: "50.00",
    },
    {
      id: 7,
      type: "N.F.S. Loan",
      col1: "2.00",
      col2: "-",
      col3: "-",
      col4: "-",
      col5: "-",
      col6: "-",
      col7: "0.53",
      col8: "-",
    },
    {
      id: 8,
      type: "Consumer Loan",
      col1: "-",
      col2: "-",
      col3: "-",
      col4: "-",
      col5: "-",
      col6: "-",
      col7: "0.10",
      col8: "-",
    },
    {
      id: 9,
      type: "Micro Credit Women",
      col1: "-",
      col2: "-",
      col3: "-",
      col4: "-",
      col5: "-",
      col6: "-",
      col7: "-",
      col8: "-",
    },
    {
      id: 10,
      type: "Mortgage Loan (H)",
      col1: "1.00",
      col2: "-",
      col3: "-",
      col4: "-",
      col5: "-",
      col6: "-",
      col7: "-",
      col8: "-",
    },
    {
      id: 11,
      type: "House Construct",
      col1: "2.00",
      col2: "-",
      col3: "-",
      col4: "-",
      col5: "-",
      col6: "-",
      col7: "-",
      col8: "-",
    },
    {
      id: 12,
      type: "S.H.G. Economic",
      col1: "-",
      col2: "-",
      col3: "-",
      col4: "-",
      col5: "-",
      col6: "-",
      col7: "-",
      col8: "-",
    },
    {
      id: 13,
      type: "S.H.G. Revolving",
      col1: "-",
      col2: "-",
      col3: "-",
      col4: "-",
      col5: "-",
      col6: "-",
      col7: "-",
      col8: "-",
    },
    {
      id: 14,
      type: "S.H.G. Savings",
      col1: "60.00",
      col2: "10.00",
      col3: "-",
      col4: "12.98",
      col5: "12.92",
      col6: "0.06",
      col7: "17.08",
      col8: "-",
    },
    {
      id: 15,
      type: "Meternity Loan",
      col1: "-",
      col2: "-",
      col3: "-",
      col4: "-",
      col5: "-",
      col6: "-",
      col7: "-",
      col8: "-",
    },
    {
      id: 16,
      type: "Tabcedco",
      col1: "2.00",
      col2: "1.00",
      col3: "-",
      col4: "0.79",
      col5: "-",
      col6: "0.79",
      col7: "0.79",
      col8: "-",
    },
    {
      id: 17,
      type: "Tamco",
      col1: "1.00",
      col2: "-",
      col3: "-",
      col4: "-",
      col5: "-",
      col6: "-",
      col7: "-",
      col8: "-",
    },
    {
      id: 18,
      type: "Thadco",
      col1: "1.00",
      col2: "1.00",
      col3: "-",
      col4: "-",
      col5: "-",
      col6: "-",
      col7: "-",
      col8: "-",
    },
    {
      id: 19,
      type: "Produce Loan",
      col1: "-",
      col2: "-",
      col3: "-",
      col4: "-",
      col5: "-",
      col6: "-",
      col7: "-",
      col8: "-",
    },
    {
      id: 20,
      type: "Salary Loan",
      col1: "-",
      col2: "-",
      col3: "-",
      col4: "-",
      col5: "-",
      col6: "-",
      col7: "-",
      col8: "-",
    },
    {
      id: 21,
      type: "K.V.P / N.S.C Loan",
      col1: "-",
      col2: "-",
      col3: "-",
      col4: "-",
      col5: "-",
      col6: "-",
      col7: "-",
      col8: "-",
    },
    {
      id: 22,
      type: "Share Capital Loan",
      col1: "-",
      col2: "-",
      col3: "-",
      col4: "-",
      col5: "-",
      col6: "-",
      col7: "-",
      col8: "-",
    },
    {
      id: 23,
      type: "Deposit Loan",
      col1: "-",
      col2: "-",
      col3: "2.55",
      col4: "1.35",
      col5: "1.35",
      col6: "-",
      col7: "7.66",
      col8: "-",
    },
    {
      id: 24,
      type: "SHG P.L.F Loan",
      col1: "-",
      col2: "-",
      col3: "-",
      col4: "-",
      col5: "-",
      col6: "-",
      col7: "-",
      col8: "-",
    },
    {
      id: 25,
      type: "MTC Loan",
      col1: "-",
      col2: "-",
      col3: "-",
      col4: "0.70",
      col5: "0.70",
      col6: "-",
      col7: "-",
      col8: "-",
    },
    {
      id: 26,
      type: "S.H.G.(Tabcedco)",
      col1: "-",
      col2: "-",
      col3: "-",
      col4: "-",
      col5: "-",
      col6: "-",
      col7: "-",
      col8: "-",
    },
    {
      id: 27,
      type: "Differently Abled Person",
      col1: "2.00",
      col2: "-",
      col3: "-",
      col4: "(0.83)",
      col5: "0.26",
      col6: "(1.09)",
      col7: "2.57",
      col8: "-",
    },
    {
      id: 28,
      type: "COVIT-19 SHG LOAN",
      col1: "-",
      col2: "-",
      col3: "-",
      col4: "-",
      col5: "-",
      col6: "-",
      col7: "-",
      col8: "-",
    },
  ]

  const totalRow = {
    type: "Total",
    col1: "1087.00",
    col2: "307.00",
    col3: "185.10",
    col4: "218.85",
    col5: "199.66",
    col6: "19.19",
    col7: "1056.51",
    col8: "75.00",
  }

  return (
    <div className="w-full bg-white" style={{ minHeight: "210mm", width: "297mm", margin: "0 auto" }}>
      <Card className="w-full h-full">
        <CardContent className="p-4">
          {/* Header */}
          <div className="mb-4">
            <div className="flex justify-between items-start mb-2">
              <div className="text-xs">
                <p>சீலம் மாவட்ட மத்திய கூட்டுறவு வங்கி லி.</p>
                <p>2024-2025 கடன் விநியோகிய கேட்டு வகுப்பு இலவை விபரம்</p>
              </div>
              <div className="text-center">
                <h1 className="text-sm font-bold">S.331.இடங்கணராலை PACCS Ltd</h1>
              </div>
              <div className="text-xs text-right">
                <p>மாதம்-2025</p>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-black text-xs">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-black p-1 text-center font-medium w-8">வ.எண்</th>
                  <th className="border border-black p-1 text-center font-medium w-48">கடன் விபரம்</th>
                  <th className="border border-black p-1 text-center font-medium w-16">ஆலம்ப கற்பிது</th>
                  <th className="border border-black p-1 text-center font-medium w-20" colSpan={2}>
                    வ.பய மாதம் முடிய
                  </th>
                  <th className="border border-black p-1 text-center font-medium w-20" colSpan={2}>
                    வ.பய மாதம் முடிய
                  </th>
                  <th className="border border-black p-1 text-center font-medium w-16">மாத இறுதி கல வ</th>
                  <th className="border border-black p-1 text-center font-medium w-16">கடன் இல கல்ப</th>
                </tr>
                <tr className="bg-gray-50">
                  <th className="border border-black p-1"></th>
                  <th className="border border-black p-1"></th>
                  <th className="border border-black p-1 text-center text-xs">கற்பிது</th>
                  <th className="border border-black p-1 text-center text-xs">வ.மாதம்</th>
                  <th className="border border-black p-1 text-center text-xs">மொத்தம்</th>
                  <th className="border border-black p-1 text-center text-xs">வ.மாதம்</th>
                  <th className="border border-black p-1 text-center text-xs">இலவை</th>
                  <th className="border border-black p-1 text-center text-xs">இருப்பு</th>
                  <th className="border border-black p-1 text-center text-xs">கல்ப</th>
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
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
