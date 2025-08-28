"use client"

import { Card, CardContent } from "@/components/ui/card"

export default function Page13Form() {
  const tableData = [
    {
      id: 1,
      name: "யூரியா",
      col1: "0.045",
      col2: "–",
      col3: "6.075",
      col4: "6.120",
      col5: "1.035",
      col6: "4.770",
      col7: "1.350",
      col8: "–",
    },
    {
      id: 2,
      name: "டி.ஏ.பி",
      col1: "0.050",
      col2: "–",
      col3: "5.000",
      col4: "5.050",
      col5: "0.500",
      col6: "0.650",
      col7: "4.400",
      col8: "–",
    },
    {
      id: 3,
      name: "பொட்டாஷ்",
      col1: "1.400",
      col2: "–",
      col3: "–",
      col4: "1.400",
      col5: "0.025",
      col6: "0.525",
      col7: "0.875",
      col8: "–",
    },
    {
      id: 4,
      name: "17:17:17",
      col1: "3.800",
      col2: "–",
      col3: "–",
      col4: "3.800",
      col5: "0.005",
      col6: "1.055",
      col7: "2.745",
      col8: "–",
    },
    {
      id: 5,
      name: "10:26:26",
      col1: "2.550",
      col2: "–",
      col3: "–",
      col4: "2.550",
      col5: "0.020",
      col6: "1.370",
      col7: "1.180",
      col8: "–",
    },
    {
      id: 6,
      name: "20:20",
      col1: "5.600",
      col2: "–",
      col3: "–",
      col4: "5.600",
      col5: "0.020",
      col6: "2.320",
      col7: "3.280",
      col8: "–",
    },
    {
      id: 7,
      name: "இதர உரம் 1",
      col1: "1.126",
      col2: "–",
      col3: "1.000",
      col4: "2.126",
      col5: "0.008",
      col6: "0.318",
      col7: "1.808",
      col8: "–",
    },
    {
      id: 8,
      name: "இதர உரம் 2",
      col1: "0.057",
      col2: "–",
      col3: "–",
      col4: "0.057",
      col5: "–",
      col6: "0.034",
      col7: "0.023",
      col8: "–",
    },
  ]

  const totalRow = {
    name: "மொத்தம்",
    col1: "14.628",
    col2: "–",
    col3: "12.075",
    col4: "26.703",
    col5: "1.613",
    col6: "11.042",
    col7: "15.661",
    col8: "–",
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 bg-white" style={{ minHeight: "210mm", width: "297mm" }}>
      <Card className="w-full">
        <CardContent className="p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-lg font-bold mb-2">S.331.இடங்கணராலை PACCS Ltd</h1>
            <div className="text-sm mb-2">
              <p>பொருள்: உர விநியோகம் விபரம் இதர்விக்கல் இதாட்டிபாக.</p>
              <p>பார்வை: சங்கத்தின் சரக துணைவளர்ச்சிவாளர் அவர்களின் நக.க.எண் 1541/2012 ஆர (1) நாள்: 19-11-2012</p>
              <p>உரம் கொள்முதல் விற்பனை மற்றும் இலவை விபரம்</p>
            </div>
            <div className="text-right text-sm mb-4">
              <p>மாதம்: ஜூலை-2025</p>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-black text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-black p-2 text-center font-medium">வ. எண்</th>
                  <th className="border border-black p-2 text-center font-medium">விபரம்</th>
                  <th className="border border-black p-2 text-center font-medium">ஆரம்ப இருப்பு</th>
                  <th className="border border-black p-2 text-center font-medium">கொள்முதல்</th>
                  <th className="border border-black p-2 text-center font-medium">நா.பய மாதம் முடிய கொள்முதல்</th>
                  <th className="border border-black p-2 text-center font-medium">மொத்தம்</th>
                  <th className="border border-black p-2 text-center font-medium">விற்பனை</th>
                  <th className="border border-black p-2 text-center font-medium">வ.பய மாதம் முடிய விற்பனை</th>
                  <th className="border border-black p-2 text-center font-medium">இறுதி இருப்பு</th>
                  <th className="border border-black p-2 text-center font-medium">இலவை</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row) => (
                  <tr key={row.id}>
                    <td className="border border-black p-2 text-center">{row.id}</td>
                    <td className="border border-black p-2 text-left">{row.name}</td>
                    <td className="border border-black p-2 text-right">{row.col1}</td>
                    <td className="border border-black p-2 text-center">{row.col2}</td>
                    <td className="border border-black p-2 text-right">{row.col3}</td>
                    <td className="border border-black p-2 text-right">{row.col4}</td>
                    <td className="border border-black p-2 text-right">{row.col5}</td>
                    <td className="border border-black p-2 text-right">{row.col6}</td>
                    <td className="border border-black p-2 text-right">{row.col7}</td>
                    <td className="border border-black p-2 text-center">{row.col8}</td>
                  </tr>
                ))}
                {/* Total Row */}
                <tr className="bg-gray-50 font-medium">
                  <td className="border border-black p-2 text-center"></td>
                  <td className="border border-black p-2 text-left">{totalRow.name}</td>
                  <td className="border border-black p-2 text-right">{totalRow.col1}</td>
                  <td className="border border-black p-2 text-center">{totalRow.col2}</td>
                  <td className="border border-black p-2 text-right">{totalRow.col3}</td>
                  <td className="border border-black p-2 text-right">{totalRow.col4}</td>
                  <td className="border border-black p-2 text-right">{totalRow.col5}</td>
                  <td className="border border-black p-2 text-right">{totalRow.col6}</td>
                  <td className="border border-black p-2 text-right">{totalRow.col7}</td>
                  <td className="border border-black p-2 text-center">{totalRow.col8}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="text-right mt-8">
            <p className="text-sm">செயலாளர்</p>
            <p className="text-sm">S.331.இடங்கணராலை PACCS Ltd</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
