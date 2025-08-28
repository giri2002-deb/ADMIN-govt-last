"use client"

import { useEffect, useState } from "react"

// Exact data from the KCC statement image
const KCC_DATA = {
  document: {
    type: "kcc-statement",
    title: "KCC",
    subtitle: "S.331 இடங்களாலை PACCS Ltd",
    date: "தமிழ்-2025",
  },
  table: {
    headers: {
      sno: "வ. எண்",
      st_kcc: "ST KCC",
      section1: "இன்ன மாதம் முடிய வழங்கியது",
      section2: "நடப்பு மாதம் வழங்கியது",
      section3: "நடப்பு மாதம் முடிய வழங்கியது",
    },
    subheaders: {
      section1: ["எண்", "பாப்பு", "வட்டிக்கு", "பெருகும்", "பெருகும்"],
      section2: ["எண்", "பாப்பு", "வட்டிக்கு", "பெருகும்", "பெருகும்"],
      section3: ["எண்", "பாப்பு", "வட்டிக்கு", "பெருகும்", "பெருகும்"],
    },
    rows: [
      {
        sno: "1",
        category: "இலல்",
        st_kcc: 1,
        section1: { num: 1.25, amount1: 0.43, amount2: 0.03, amount3: 0.46 },
        section2: { num: "-", amount1: "-", amount2: "-", amount3: "-" },
        section3: { num: 1, amount1: 1.25, amount2: 0.43, amount3: 0.03, amount4: 0.46 },
      },
      {
        sno: "2",
        category: "பருத்தி",
        st_kcc: 2,
        section1: { num: 3.7, amount1: 1.4, amount2: 0.04, amount3: 1.44 },
        section2: { num: "-", amount1: "-", amount2: "-", amount3: "-" },
        section3: { num: 2, amount1: 3.7, amount2: 1.4, amount3: 0.04, amount4: 1.44 },
      },
      {
        sno: "3",
        category: "கடலை",
        st_kcc: 3,
        section1: { num: 3.59, amount1: 0.84, amount2: 0.03, amount3: 0.87 },
        section2: { num: "-", amount1: "-", amount2: "-", amount3: "-" },
        section3: { num: 3, amount1: 3.59, amount2: 0.84, amount3: 0.03, amount4: 0.87 },
      },
      {
        sno: "4",
        category: "குச்சி",
        st_kcc: 5,
        section1: { num: 5.86, amount1: 2.58, amount2: 0.16, amount3: 2.74 },
        section2: { num: "-", amount1: "-", amount2: "-", amount3: "-" },
        section3: { num: 5, amount1: 5.86, amount2: 2.58, amount3: 0.16, amount4: 2.74 },
      },
      {
        sno: "5",
        category: "கருப்பு",
        st_kcc: 1,
        section1: { num: 1.8, amount1: 1.05, amount2: 0.09, amount3: 1.14 },
        section2: { num: "-", amount1: "-", amount2: "-", amount3: "-" },
        section3: { num: 1, amount1: 1.8, amount2: 1.05, amount3: 0.09, amount4: 1.14 },
      },
      {
        sno: "6",
        category: "வாரைய",
        st_kcc: 2,
        section1: { num: 1.91, amount1: 1.31, amount2: 0.06, amount3: 1.37 },
        section2: { num: "-", amount1: "-", amount2: "-", amount3: "-" },
        section3: { num: 2, amount1: 1.91, amount2: 1.31, amount3: 0.06, amount4: 1.37 },
      },
      {
        sno: "7",
        category: "மஞ்சள்",
        st_kcc: 2,
        section1: { num: 1.38, amount1: 1.07, amount2: 0.06, amount3: 1.13 },
        section2: { num: "-", amount1: "-", amount2: "-", amount3: "-" },
        section3: { num: 2, amount1: 1.38, amount2: 1.07, amount3: 0.06, amount4: 1.13 },
      },
      {
        sno: "8",
        category: "சேசாம்",
        st_kcc: 1,
        section1: { num: 0.52, amount1: 0.09, amount2: 0.01, amount3: 0.1 },
        section2: { num: "-", amount1: "-", amount2: "-", amount3: "-" },
        section3: { num: 1, amount1: 0.52, amount2: 0.09, amount3: 0.01, amount4: 0.1 },
      },
      {
        sno: "9",
        category: "மல்பரி",
        st_kcc: "-",
        section1: { num: "-", amount1: "-", amount2: "-", amount3: "-" },
        section2: { num: "-", amount1: "-", amount2: "-", amount3: "-" },
        section3: { num: "-", amount1: "-", amount2: "-", amount3: "-", amount4: "-" },
      },
      {
        sno: "10",
        category: "காய்கறிகள்",
        st_kcc: "-",
        section1: { num: "-", amount1: "-", amount2: "-", amount3: "-" },
        section2: { num: "-", amount1: "-", amount2: "-", amount3: "-" },
        section3: { num: "-", amount1: "-", amount2: "-", amount3: "-", amount4: "-" },
      },
      {
        sno: "11",
        category: "இலங்காய்",
        st_kcc: "-",
        section1: { num: "-", amount1: "-", amount2: "-", amount3: "-" },
        section2: { num: "-", amount1: "-", amount2: "-", amount3: "-" },
        section3: { num: "-", amount1: "-", amount2: "-", amount3: "-", amount4: "-" },
      },
      {
        sno: "12",
        category: "இதர பயிர்கள்",
        st_kcc: 8,
        section1: { num: 11.94, amount1: 3.95, amount2: 0.12, amount3: 4.07 },
        section2: { num: "-", amount1: "-", amount2: "-", amount3: "-" },
        section3: { num: 8, amount1: 11.94, amount2: 3.95, amount3: 0.12, amount4: 4.07 },
      },
    ],
    total: {
      st_kcc: 25,
      section1: { num: 31.95, amount1: 12.72, amount2: 0.6, amount3: 13.32 },
      section2: { num: "-", amount1: "-", amount2: "-", amount3: "-" },
      section3: { num: 25, amount1: 31.95, amount2: 12.72, amount3: 0.6, amount4: 13.32 },
    },
    members: 25,
  },
}

type Page5FormProps = {
  data?: any
  onDataChange?: (data: any) => void
}

export default function Page5Form({ data, onDataChange }: Page5FormProps) {
  const [tableData, setTableData] = useState<any>(null)

  useEffect(() => {
    setTableData(KCC_DATA)
  }, [])

  const formatValue = (value: number | string): string => {
    if (value === "-" || value === "" || value === null || value === undefined) return "-"
    if (typeof value === "number") {
      return value.toFixed(2)
    }
    return value.toString()
  }

  const renderDataCell = (value: number | string, isAmount = false, width = "w-16") => {
    const formattedValue = formatValue(value)
    return (
      <td
        className={`border border-gray-700 px-1 py-1 text-center text-xs ${isAmount ? "text-right" : ""} ${width} print:text-[10px]`}
      >
        {formattedValue}
      </td>
    )
  }

  if (!tableData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-xl font-semibold text-gray-600">Loading KCC Statement...</div>
      </div>
    )
  }

  return (
    <div className="w-full bg-white print:bg-white">
      {/* A4 Landscape Container - 297mm x 210mm */}
     <div className=" w-[1100px] h-[794px] mx-auto bg-white p-6 text-sm font-[Noto Sans Tamil] print:p-0 print:m-0 overflow-hidden">

        {/* Header optimized for A4 landscape */}
        <div className="mb-3 text-center border-b border-gray-400 pb-2 print:mb-2">
          <div className="flex justify-between items-center">
            <div className="flex-1 text-left">
              <span className="text-lg font-bold print:text-base">{tableData.document.title}</span>
            </div>
            <div className="flex-1 text-center">
              <span className="text-lg font-bold print:text-base">{tableData.document.subtitle}</span>
            </div>
            <div className="flex-1 text-right">
              <div className="text-sm print:text-xs">{tableData.document.date}</div>
            </div>
          </div>
      </div>

        {/* Table optimized for A4 landscape */}
        <div className="w-full">
          <table className="w-full border-collapse border-2 border-gray-700 text-xs print:text-[10px]">
            <thead>
              {/* Main Headers */}
              <tr className="bg-gray-200 print:bg-gray-100">
                <th
                  rowSpan={2}
                  className="border border-gray-700 px-1 py-1 text-center font-bold text-xs print:text-[10px] w-8"
                >
                  வ. எண்
                </th>
                <th
                  rowSpan={2}
                  className="border border-gray-700 px-1 py-1 text-center font-bold text-xs print:text-[10px] w-24"
                >
                  ST KCC
                </th>
                <th
                  colSpan={4}
                  className="border border-gray-700 px-1 py-1 text-center font-bold text-xs print:text-[10px]"
                >
                  இன்ன மாதம் முடிய வழங்கியது
                </th>
                <th
                  colSpan={4}
                  className="border border-gray-700 px-1 py-1 text-center font-bold text-xs print:text-[10px]"
                >
                  நடப்பு மாதம் வழங்கியது
                </th>
                <th
                  colSpan={5}
                  className="border border-gray-700 px-1 py-1 text-center font-bold text-xs print:text-[10px]"
                >
                  நடப்பு மாதம் முடிய வழங்கியது
                </th>
              </tr>
              {/* Sub Headers */}
              <tr className="bg-gray-100 print:bg-gray-50">
                <th className="border border-gray-700 px-1 py-1 text-center font-semibold text-xs print:text-[9px] w-12">
                  எண்
                </th>
                <th className="border border-gray-700 px-1 py-1 text-center font-semibold text-xs print:text-[9px] w-14">
                  பாப்பு
                </th>
                <th className="border border-gray-700 px-1 py-1 text-center font-semibold text-xs print:text-[9px] w-14">
                  வட்டிக்கு
                </th>
                <th className="border border-gray-700 px-1 py-1 text-center font-semibold text-xs print:text-[9px] w-14">
                  பெருகும்
                </th>
                <th className="border border-gray-700 px-1 py-1 text-center font-semibold text-xs print:text-[9px] w-12">
                  எண்
                </th>
                <th className="border border-gray-700 px-1 py-1 text-center font-semibold text-xs print:text-[9px] w-14">
                  பாப்பு
                </th>
                <th className="border border-gray-700 px-1 py-1 text-center font-semibold text-xs print:text-[9px] w-14">
                  வட்டிக்கு
                </th>
                <th className="border border-gray-700 px-1 py-1 text-center font-semibold text-xs print:text-[9px] w-14">
                  பெருகும்
                </th>
                <th className="border border-gray-700 px-1 py-1 text-center font-semibold text-xs print:text-[9px] w-12">
                  எண்
                </th>
                <th className="border border-gray-700 px-1 py-1 text-center font-semibold text-xs print:text-[9px] w-14">
                  பாப்பு
                </th>
                <th className="border border-gray-700 px-1 py-1 text-center font-semibold text-xs print:text-[9px] w-14">
                  வட்டிக்கு
                </th>
                <th className="border border-gray-700 px-1 py-1 text-center font-semibold text-xs print:text-[9px] w-14">
                  பெருகும்
                </th>
                <th className="border border-gray-700 px-1 py-1 text-center font-semibold text-xs print:text-[9px] w-14">
                  பெருகும்
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.table.rows.map((row: any) => (
                <tr key={row.sno} className="bg-white hover:bg-gray-50 print:hover:bg-white">
                  <td className="border border-gray-700 px-1 py-1 text-center text-xs font-medium w-8 print:text-[10px]">
                    {row.sno}
                  </td>
                  <td className="border border-gray-700 px-1 py-1 text-left text-xs font-medium w-24 print:text-[10px]">
                    {row.category}
                  </td>
                  <td className="border border-gray-700 px-1 py-1 text-center text-xs w-12 print:text-[10px]">
                    {formatValue(row.st_kcc)}
                  </td>
                  {renderDataCell(row.section1.num, true, "w-14")}
                  {renderDataCell(row.section1.amount1, true, "w-14")}
                  {renderDataCell(row.section1.amount2, true, "w-14")}
                  {renderDataCell(row.section1.amount3, true, "w-14")}
                  {renderDataCell(row.section2.num, false, "w-12")}
                  {renderDataCell(row.section2.amount1, true, "w-14")}
                  {renderDataCell(row.section2.amount2, true, "w-14")}
                  {renderDataCell(row.section2.amount3, true, "w-14")}
                  {renderDataCell(row.section3.num, false, "w-12")}
                  {renderDataCell(row.section3.amount1, true, "w-14")}
                  {renderDataCell(row.section3.amount2, true, "w-14")}
                  {renderDataCell(row.section3.amount3, true, "w-14")}
                  {renderDataCell(row.section3.amount4, true, "w-14")}
                </tr>
              ))}
              {/* Total Row */}
              <tr className="bg-gray-200 font-bold border-t-2 border-gray-800 print:bg-gray-100">
                <td className="border border-gray-700 px-1 py-1 text-center text-xs font-bold w-8 print:text-[10px]"></td>
                <td className="border border-gray-700 px-1 py-1 text-left text-xs font-bold w-24 print:text-[10px]">
                  Total
                </td>
                <td className="border border-gray-700 px-1 py-1 text-center text-xs font-bold w-12 print:text-[10px]">
                  {tableData.table.total.st_kcc}
                </td>
                {renderDataCell(tableData.table.total.section1.num, true, "w-14")}
                {renderDataCell(tableData.table.total.section1.amount1, true, "w-14")}
                {renderDataCell(tableData.table.total.section1.amount2, true, "w-14")}
                {renderDataCell(tableData.table.total.section1.amount3, true, "w-14")}
                {renderDataCell(tableData.table.total.section2.num, false, "w-12")}
                {renderDataCell(tableData.table.total.section2.amount1, true, "w-14")}
                {renderDataCell(tableData.table.total.section2.amount2, true, "w-14")}
                {renderDataCell(tableData.table.total.section2.amount3, true, "w-14")}
                {renderDataCell(tableData.table.total.section3.num, false, "w-12")}
                {renderDataCell(tableData.table.total.section3.amount1, true, "w-14")}
                {renderDataCell(tableData.table.total.section3.amount2, true, "w-14")}
                {renderDataCell(tableData.table.total.section3.amount3, true, "w-14")}
                {renderDataCell(tableData.table.total.section3.amount4, true, "w-14")}
              </tr>
              {/* Members Row */}
              <tr className="bg-gray-100 print:bg-gray-50">
                <td
                  colSpan={2}
                  className="border border-gray-700 px-1 py-1 text-left text-xs font-medium print:text-[10px]"
                >
                  As Per Mem Loans KCC
                </td>
                <td className="border border-gray-700 px-1 py-1 text-center text-xs font-bold print:text-[10px]">
                  {tableData.table.members}
                </td>
                <td
                  colSpan={4}
                  className="border border-gray-700 px-1 py-1 text-center text-xs font-bold print:text-[10px]"
                >
                  {formatValue(tableData.table.total.section1.amount3)}
                </td>
                <td colSpan={4} className="border border-gray-700 px-1 py-1 text-center text-xs print:text-[10px]"></td>
                <td className="border border-gray-700 px-1 py-1 text-center text-xs font-bold print:text-[10px]">
                  {tableData.table.members}
                </td>
                <td
                  colSpan={4}
                  className="border border-gray-700 px-1 py-1 text-center text-xs font-bold print:text-[10px]"
                >
                  {formatValue(tableData.table.total.section3.amount4)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4 landscape;
            margin: 0.5in;
          }
          
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          
          .print\\:text-\\[10px\\] {
            font-size: 10px !important;
          }
          
          .print\\:text-\\[9px\\] {
            font-size: 9px !important;
          }
          
          .print\\:text-base {
            font-size: 14px !important;
          }
          
          .print\\:text-xs {
            font-size: 11px !important;
          }
          
          .print\\:mb-2 {
            margin-bottom: 8px !important;
          }
          
          .print\\:p-3 {
            padding: 12px !important;
          }
          
          .print\\:max-w-none {
            max-width: none !important;
          }
          
          .print\\:min-h-none {
            min-height: auto !important;
          }
          
          .print\\:bg-white {
            background-color: white !important;
          }
          
          .print\\:bg-gray-100 {
            background-color: #f3f4f6 !important;
          }
          
          .print\\:bg-gray-50 {
            background-color: #f9fafb !important;
          }
          
          .print\\:hover\\:bg-white:hover {
            background-color: white !important;
          }
        }
      `}</style>
    </div>
  )
}
