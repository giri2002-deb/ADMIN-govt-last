"use client"

import { useEffect, useState } from "react"

// Exact data from the JLG statement image
const JLG_DATA = {
  document: {
    type: "jlg-statement",
    title: "JLG",
    subtitle: "S.331 இடங்களாலை PACCS Ltd",
    date: "தமிழ்-2025",
  },
  table: {
    headers: {
      sno: "வ. எண்",
      jlg: "JLG",
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
        jlg: "-",
        section1: { num: "-", amount1: "-", amount2: "-", amount3: "-" },
        section2: { num: "-", amount1: "-", amount2: "-", amount3: "-" },
        section3: { num: "-", amount1: "-", amount2: "-", amount3: "-", amount4: "-" },
      },
      {
        sno: "2",
        category: "பருத்தி",
        jlg: "-",
        section1: { num: "-", amount1: "-", amount2: "-", amount3: "-" },
        section2: { num: "-", amount1: "-", amount2: "-", amount3: "-" },
        section3: { num: "-", amount1: "-", amount2: "-", amount3: "-", amount4: "-" },
      },
      {
        sno: "3",
        category: "கடலை",
        jlg: "-",
        section1: { num: "-", amount1: "-", amount2: "-", amount3: "-" },
        section2: { num: "-", amount1: "-", amount2: "-", amount3: "-" },
        section3: { num: "-", amount1: "-", amount2: "-", amount3: "-", amount4: "-" },
      },
      {
        sno: "4",
        category: "குச்சி",
        jlg: "-",
        section1: { num: "-", amount1: "-", amount2: "-", amount3: "-" },
        section2: { num: "-", amount1: "-", amount2: "-", amount3: "-" },
        section3: { num: "-", amount1: "-", amount2: "-", amount3: "-", amount4: "-" },
      },
      {
        sno: "5",
        category: "கருப்பு",
        jlg: "-",
        section1: { num: "-", amount1: "-", amount2: "-", amount3: "-" },
        section2: { num: "-", amount1: "-", amount2: "-", amount3: "-" },
        section3: { num: "-", amount1: "-", amount2: "-", amount3: "-", amount4: "-" },
      },
      {
        sno: "6",
        category: "வாரைய",
        jlg: "-",
        section1: { num: "-", amount1: "-", amount2: "-", amount3: "-" },
        section2: { num: "-", amount1: "-", amount2: "-", amount3: "-" },
        section3: { num: "-", amount1: "-", amount2: "-", amount3: "-", amount4: "-" },
      },
      {
        sno: "7",
        category: "மஞ்சள்",
        jlg: "-",
        section1: { num: "-", amount1: "-", amount2: "-", amount3: "-" },
        section2: { num: "-", amount1: "-", amount2: "-", amount3: "-" },
        section3: { num: "-", amount1: "-", amount2: "-", amount3: "-", amount4: "-" },
      },
      {
        sno: "8",
        category: "சேசாம்",
        jlg: "-",
        section1: { num: "-", amount1: "-", amount2: "-", amount3: "-" },
        section2: { num: "-", amount1: "-", amount2: "-", amount3: "-" },
        section3: { num: "-", amount1: "-", amount2: "-", amount3: "-", amount4: "-" },
      },
      {
        sno: "9",
        category: "மல்பரி",
        jlg: "-",
        section1: { num: "-", amount1: "-", amount2: "-", amount3: "-" },
        section2: { num: "-", amount1: "-", amount2: "-", amount3: "-" },
        section3: { num: "-", amount1: "-", amount2: "-", amount3: "-", amount4: "-" },
      },
      {
        sno: "10",
        category: "காய்கறிகள்",
        jlg: "-",
        section1: { num: "-", amount1: "-", amount2: "-", amount3: "-" },
        section2: { num: "-", amount1: "-", amount2: "-", amount3: "-" },
        section3: { num: "-", amount1: "-", amount2: "-", amount3: "-", amount4: "-" },
      },
      {
        sno: "11",
        category: "இலங்காய்",
        jlg: "-",
        section1: { num: "-", amount1: "-", amount2: "-", amount3: "-" },
        section2: { num: "-", amount1: "-", amount2: "-", amount3: "-" },
        section3: { num: "-", amount1: "-", amount2: "-", amount3: "-", amount4: "-" },
      },
      {
        sno: "12",
        category: "இதர பயிர்கள்",
        jlg: "-",
        section1: { num: "-", amount1: "-", amount2: "-", amount3: "-" },
        section2: { num: "-", amount1: "-", amount2: "-", amount3: "-" },
        section3: { num: "-", amount1: "-", amount2: "-", amount3: "-", amount4: "-" },
      },
    ],
    total: {
      jlg: "-",
      section1: { num: "-", amount1: "-", amount2: "-", amount3: "-" },
      section2: { num: "-", amount1: "-", amount2: "-", amount3: "-" },
      section3: { num: "-", amount1: "-", amount2: "-", amount3: "-", amount4: "-" },
    },
    members: "-",
  },
}

type Page6FormProps = {
  data?: any
  onDataChange?: (data: any) => void
}

export default function Page6Form({ data, onDataChange }: Page6FormProps) {
  const [tableData, setTableData] = useState<any>(null)

  useEffect(() => {
    setTableData(JLG_DATA)
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
        <div className="text-xl font-semibold text-gray-600">Loading JLG Statement...</div>
      </div>
    )
  }

  return (
    <div className="w-full bg-white p-4">
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
                JLG
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
                  {formatValue(row.jlg)}
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
                {tableData.table.total.jlg}
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
                As Per Mem Loans JLG
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
  )
}
