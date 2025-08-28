"use client"

import { Card, CardContent } from "@/components/ui/card"

export default function Component() {
  const certificateColumns = [
    "Sl.No",
    "சங்கத்தின் பெயர்",
    "Community certificate",
    "Income Certificate",
    "First Graduate Certificate",
    "Deserted Women Certificate",
    "Agricultural Income",
    "Official Income",
    "Family Migration Certificate",
    "Unemployment",
    "Widow Certificate",
    "Education Allowance etc",
    "Inter caste Marriage Certificate",
    "Legal Heir Certificate",
    "Other Backward Classes",
    "OBC Certificate",
    "Scheduled Caste Certificate",
    "Small/Marginal Farmer Certificate",
    "Solvency Certificate",
    "Old Age Certificate",
    "Income under Pawn",
    "Broker Act",
    "Patta Transfer",
    "Gift Deed Protection",
    "Survey Settlement",
    "Other Certificate in Revenue Department",
    "Other Certificate in Other Department",
    "நடப்பு மாதம் செயல்பாடு",
    "சென்ற மாதம் முடிய செயல்பாடு",
    "மொத்தம்",
    "கடந்த ஆண்டு இதே மாதம்",
    "கடந்த ஆண்டு மொத்தம்",
    "கடந்த ஆண்டு மொத்தம்",
  ]

  const trackingData = [
    {
      slNo: "1",
      orgName: "S.331.இடங்கணராலை PACCS Ltd",
      data: [
        "80",
        "20",
        "21",
        "27",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "12",
        "",
        "",
        "4440",
        "68",
      ],
      description: "சென்ற மாதம் முடிய செயல்பாடு",
    },
    {
      slNo: "",
      orgName: "S.331.இடங்கணராலை PACCS Ltd",
      data: [
        "80",
        "20",
        "21",
        "27",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "12",
        "",
        "",
        "4440",
        "68",
      ],
      description: "நடப்பு மாதம் முடிய செயல்பாடு",
    },
  ]

  return (
    <div className="w-full bg-white" style={{ minHeight: "210mm", width: "297mm", margin: "0 auto" }}>
      <Card className="w-full h-full">
        <CardContent className="p-4">
          {/* Header */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm font-medium">
                <h1 className="text-lg font-bold">S.331.இடங்கணராலை PACCS Ltd</h1>
              </div>
              <div className="text-center">
                <p className="text-sm">பொது நேரவை மையம் செயல்பாடுகள்</p>
                <p className="text-sm">மாதம்:</p>
              </div>
              <div className="text-sm font-medium">
                <p>ஜூலை-2025</p>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-black text-xs">
              <thead>
                <tr className="bg-gray-50">
                  {certificateColumns.map((column, index) => (
                    <th
                      key={index}
                      className="border border-black p-1 text-center font-medium"
                      style={{
                        writingMode:
                          index > 1 && index < certificateColumns.length - 6 ? "vertical-rl" : "horizontal-tb",
                        textOrientation: index > 1 && index < certificateColumns.length - 6 ? "mixed" : "unset",
                        minWidth: index > 1 && index < certificateColumns.length - 6 ? "20px" : "auto",
                        width:
                          index === 0
                            ? "40px"
                            : index === 1
                              ? "120px"
                              : index >= certificateColumns.length - 6
                                ? "60px"
                                : "20px",
                      }}
                    >
                      <span className="text-xs leading-tight">{column}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {trackingData.map((row, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-gray-50">
                    <td className="border border-black p-1 text-center">{row.slNo}</td>
                    <td className="border border-black p-1 text-left text-xs">{row.orgName}</td>
                    {row.data.map((cell, cellIndex) => (
                      <td key={cellIndex} className="border border-black p-1 text-center text-xs">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
                {/* Description rows */}
                <tr>
                  <td
                    colSpan={certificateColumns.length}
                    className="border border-black p-2 text-center font-medium bg-gray-100"
                  >
                    சென்ற மாதம் முடிய செயல்பாடு
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={certificateColumns.length}
                    className="border border-black p-2 text-center font-medium bg-gray-100"
                  >
                    நடப்பு மாதம் முடிய செயல்பாடு
                  </td>
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
