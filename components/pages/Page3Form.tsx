"use client"

import { useEffect, useState } from "react"

// Exact data from the overdue analysis image
const OVERDUE_DATA = {
  document: {
    type: "overdue-analysis",
    title: "5) உறுப்பினர்களின் கடன்கள் கணக்கு விவரம்:",
    subtitle: "S.331 இடங்களாலை PACCS Ltd தமிழ்-2025",
    date: "2025",
  },
  table: {
    headers: {
      below_6_months: "Below 6 Months",
      six_36_months: "6 - 36 Month",
      three_4_years: "3 to 4 Years",
      four_6_years: "4 to 6 Years",
      six_10_years: "6 to 10 Years",
      above_10_years: "Above 10 Years",
      total_overdue: "Total Overdue",
    },
    rows: [
      {
        sno: "1",
        account: "Kissan cash credit",
        below_6_months: { no: 13, amount: 8.15 },
        six_36_months: { no: "-", amount: "-" },
        three_4_years: { no: "-", amount: "-" },
        four_6_years: { no: "-", amount: "-" },
        six_10_years: { no: "-", amount: "-" },
        above_10_years: { no: "-", amount: "-" },
        total_overdue: { no: 13, amount: 8.15 },
      },
      {
        sno: "2",
        account: "KCC AH WCL",
        below_6_months: { no: 3, amount: 1.44 },
        six_36_months: { no: "-", amount: "-" },
        three_4_years: { no: "-", amount: "-" },
        four_6_years: { no: "-", amount: "-" },
        six_10_years: { no: "-", amount: "-" },
        above_10_years: { no: "-", amount: "-" },
        total_overdue: { no: 3, amount: 1.44 },
      },
      {
        sno: "3",
        account: "Drip & Minor Irrigation",
        below_6_months: { no: 1, amount: 0.21 },
        six_36_months: { no: "-", amount: "-" },
        three_4_years: { no: "-", amount: "-" },
        four_6_years: { no: "-", amount: "-" },
        six_10_years: { no: "-", amount: "-" },
        above_10_years: { no: "-", amount: "-" },
        total_overdue: { no: 1, amount: 0.21 },
      },
      {
        sno: "4",
        account: "J.L.G",
        below_6_months: { no: "-", amount: "-" },
        six_36_months: { no: "-", amount: "-" },
        three_4_years: { no: "-", amount: "-" },
        four_6_years: { no: "-", amount: "-" },
        six_10_years: { no: "-", amount: "-" },
        above_10_years: { no: "-", amount: "-" },
        total_overdue: { no: "-", amount: "-" },
      },
      {
        sno: "5",
        account: "M.T Normal",
        below_6_months: { no: 58, amount: 19.54 },
        six_36_months: { no: "-", amount: "-" },
        three_4_years: { no: "-", amount: "-" },
        four_6_years: { no: "-", amount: "-" },
        six_10_years: { no: "-", amount: "-" },
        above_10_years: { no: "-", amount: "-" },
        total_overdue: { no: 58, amount: 19.54 },
      },
      {
        sno: "6",
        account: "Jewel Loan",
        below_6_months: { no: 19, amount: 12.75 },
        six_36_months: { no: "-", amount: "-" },
        three_4_years: { no: "-", amount: "-" },
        four_6_years: { no: "-", amount: "-" },
        six_10_years: { no: "-", amount: "-" },
        above_10_years: { no: "-", amount: "-" },
        total_overdue: { no: 19, amount: 12.75 },
      },
      {
        sno: "7",
        account: "N.F.S. Loan",
        below_6_months: { no: 3, amount: 0.53 },
        six_36_months: { no: "-", amount: "-" },
        three_4_years: { no: "-", amount: "-" },
        four_6_years: { no: "-", amount: "-" },
        six_10_years: { no: "-", amount: "-" },
        above_10_years: { no: "-", amount: "-" },
        total_overdue: { no: 3, amount: 0.53 },
      },
      {
        sno: "8",
        account: "Consumer Loan",
        below_6_months: { no: 1, amount: 0.1 },
        six_36_months: { no: "-", amount: "-" },
        three_4_years: { no: "-", amount: "-" },
        four_6_years: { no: "-", amount: "-" },
        six_10_years: { no: "-", amount: "-" },
        above_10_years: { no: "-", amount: "-" },
        total_overdue: { no: 1, amount: 0.1 },
      },
      {
        sno: "9",
        account: "Micro Credit Women",
        below_6_months: { no: "-", amount: "-" },
        six_36_months: { no: "-", amount: "-" },
        three_4_years: { no: "-", amount: "-" },
        four_6_years: { no: "-", amount: "-" },
        six_10_years: { no: "-", amount: "-" },
        above_10_years: { no: "-", amount: "-" },
        total_overdue: { no: "-", amount: "-" },
      },
      {
        sno: "10",
        account: "Mortgage Loan (H)",
        below_6_months: { no: "-", amount: "-" },
        six_36_months: { no: "-", amount: "-" },
        three_4_years: { no: "-", amount: "-" },
        four_6_years: { no: "-", amount: "-" },
        six_10_years: { no: "-", amount: "-" },
        above_10_years: { no: "-", amount: "-" },
        total_overdue: { no: "-", amount: "-" },
      },
      {
        sno: "11",
        account: "House Construct",
        below_6_months: { no: "-", amount: "-" },
        six_36_months: { no: "-", amount: "-" },
        three_4_years: { no: "-", amount: "-" },
        four_6_years: { no: "-", amount: "-" },
        six_10_years: { no: "-", amount: "-" },
        above_10_years: { no: "-", amount: "-" },
        total_overdue: { no: "-", amount: "-" },
      },
      {
        sno: "12",
        account: "S.H.G. Economic",
        below_6_months: { no: "-", amount: "-" },
        six_36_months: { no: "-", amount: "-" },
        three_4_years: { no: "-", amount: "-" },
        four_6_years: { no: "-", amount: "-" },
        six_10_years: { no: "-", amount: "-" },
        above_10_years: { no: "-", amount: "-" },
        total_overdue: { no: "-", amount: "-" },
      },
      {
        sno: "13",
        account: "S.H.G. Revolving",
        below_6_months: { no: "-", amount: "-" },
        six_36_months: { no: "-", amount: "-" },
        three_4_years: { no: "-", amount: "-" },
        four_6_years: { no: "-", amount: "-" },
        six_10_years: { no: "-", amount: "-" },
        above_10_years: { no: "-", amount: "-" },
        total_overdue: { no: "-", amount: "-" },
      },
      {
        sno: "14",
        account: "S.H.G. Savings",
        below_6_months: { no: 3, amount: 0.06 },
        six_36_months: { no: "-", amount: "-" },
        three_4_years: { no: "-", amount: "-" },
        four_6_years: { no: "-", amount: "-" },
        six_10_years: { no: "-", amount: "-" },
        above_10_years: { no: "-", amount: "-" },
        total_overdue: { no: 3, amount: 0.06 },
      },
      {
        sno: "15",
        account: "Meternity Loan",
        below_6_months: { no: "-", amount: "-" },
        six_36_months: { no: "-", amount: "-" },
        three_4_years: { no: "-", amount: "-" },
        four_6_years: { no: "-", amount: "-" },
        six_10_years: { no: "-", amount: "-" },
        above_10_years: { no: "-", amount: "-" },
        total_overdue: { no: "-", amount: "-" },
      },
      {
        sno: "16",
        account: "Tabcedco",
        below_6_months: { no: 2, amount: 0.79 },
        six_36_months: { no: "-", amount: "-" },
        three_4_years: { no: "-", amount: "-" },
        four_6_years: { no: "-", amount: "-" },
        six_10_years: { no: "-", amount: "-" },
        above_10_years: { no: "-", amount: "-" },
        total_overdue: { no: 2, amount: 0.79 },
      },
      {
        sno: "17",
        account: "Tamco",
        below_6_months: { no: "-", amount: "-" },
        six_36_months: { no: "-", amount: "-" },
        three_4_years: { no: "-", amount: "-" },
        four_6_years: { no: "-", amount: "-" },
        six_10_years: { no: "-", amount: "-" },
        above_10_years: { no: "-", amount: "-" },
        total_overdue: { no: "-", amount: "-" },
      },
      {
        sno: "18",
        account: "Thadco",
        below_6_months: { no: "-", amount: "-" },
        six_36_months: { no: "-", amount: "-" },
        three_4_years: { no: "-", amount: "-" },
        four_6_years: { no: "-", amount: "-" },
        six_10_years: { no: "-", amount: "-" },
        above_10_years: { no: "-", amount: "-" },
        total_overdue: { no: "-", amount: "-" },
      },
      {
        sno: "19",
        account: "Produce Loan",
        below_6_months: { no: "-", amount: "-" },
        six_36_months: { no: "-", amount: "-" },
        three_4_years: { no: "-", amount: "-" },
        four_6_years: { no: "-", amount: "-" },
        six_10_years: { no: "-", amount: "-" },
        above_10_years: { no: "-", amount: "-" },
        total_overdue: { no: "-", amount: "-" },
      },
      {
        sno: "20",
        account: "Salary Loan",
        below_6_months: { no: "-", amount: "-" },
        six_36_months: { no: "-", amount: "-" },
        three_4_years: { no: "-", amount: "-" },
        four_6_years: { no: "-", amount: "-" },
        six_10_years: { no: "-", amount: "-" },
        above_10_years: { no: "-", amount: "-" },
        total_overdue: { no: "-", amount: "-" },
      },
      {
        sno: "21",
        account: "K.V.P / N.S.C Loan",
        below_6_months: { no: "-", amount: "-" },
        six_36_months: { no: "-", amount: "-" },
        three_4_years: { no: "-", amount: "-" },
        four_6_years: { no: "-", amount: "-" },
        six_10_years: { no: "-", amount: "-" },
        above_10_years: { no: "-", amount: "-" },
        total_overdue: { no: "-", amount: "-" },
      },
      {
        sno: "22",
        account: "Share Capital Loan",
        below_6_months: { no: "-", amount: "-" },
        six_36_months: { no: "-", amount: "-" },
        three_4_years: { no: "-", amount: "-" },
        four_6_years: { no: "-", amount: "-" },
        six_10_years: { no: "-", amount: "-" },
        above_10_years: { no: "-", amount: "-" },
        total_overdue: { no: "-", amount: "-" },
      },
      {
        sno: "23",
        account: "Deposit Loan",
        below_6_months: { no: "-", amount: "-" },
        six_36_months: { no: "-", amount: "-" },
        three_4_years: { no: "-", amount: "-" },
        four_6_years: { no: "-", amount: "-" },
        six_10_years: { no: "-", amount: "-" },
        above_10_years: { no: "-", amount: "-" },
        total_overdue: { no: "-", amount: "-" },
      },
      {
        sno: "24",
        account: "SHG PLF Loan",
        below_6_months: { no: "-", amount: "-" },
        six_36_months: { no: "-", amount: "-" },
        three_4_years: { no: "-", amount: "-" },
        four_6_years: { no: "-", amount: "-" },
        six_10_years: { no: "-", amount: "-" },
        above_10_years: { no: "-", amount: "-" },
        total_overdue: { no: "-", amount: "-" },
      },
      {
        sno: "25",
        account: "MTC Loan",
        below_6_months: { no: "-", amount: "-" },
        six_36_months: { no: "-", amount: "-" },
        three_4_years: { no: "-", amount: "-" },
        four_6_years: { no: "-", amount: "-" },
        six_10_years: { no: "-", amount: "-" },
        above_10_years: { no: "-", amount: "-" },
        total_overdue: { no: "-", amount: "-" },
      },
      {
        sno: "26",
        account: "S.H.G (Tabcedco)",
        below_6_months: { no: "-", amount: "-" },
        six_36_months: { no: "-", amount: "-" },
        three_4_years: { no: "-", amount: "-" },
        four_6_years: { no: "-", amount: "-" },
        six_10_years: { no: "-", amount: "-" },
        above_10_years: { no: "-", amount: "-" },
        total_overdue: { no: "-", amount: "-" },
      },
      {
        sno: "27",
        account: "Differently Abled Person",
        below_6_months: { no: "-", amount: "-" },
        six_36_months: { no: "-", amount: "-" },
        three_4_years: { no: "-", amount: "-" },
        four_6_years: { no: "-", amount: "-" },
        six_10_years: { no: "-", amount: "-" },
        above_10_years: { no: "-", amount: "-" },
        total_overdue: { no: "-", amount: "-" },
      },
      {
        sno: "28",
        account: "COVID-19 SHG LOAN",
        below_6_months: { no: "-", amount: "-" },
        six_36_months: { no: "-", amount: "-" },
        three_4_years: { no: "-", amount: "-" },
        four_6_years: { no: "-", amount: "-" },
        six_10_years: { no: "-", amount: "-" },
        above_10_years: { no: "-", amount: "-" },
        total_overdue: { no: "-", amount: "-" },
      },
    ],
    total: {
      below_6_months: { no: 103, amount: 43.57 },
      six_36_months: { no: "-", amount: "-" },
      three_4_years: { no: "-", amount: "-" },
      four_6_years: { no: "-", amount: "-" },
      six_10_years: { no: "-", amount: "-" },
      above_10_years: { no: "-", amount: "-" },
      total_overdue: { no: 103, amount: 43.57 },
    },
  },
}

type Page3FormProps = {
  data?: any
  onDataChange?: (data: any) => void
}

export default function Page3Form({ data, onDataChange }: Page3FormProps) {
  const [tableData, setTableData] = useState<any>(null)

  useEffect(() => {
    setTableData(OVERDUE_DATA)
  }, [])

  const formatValue = (value: number | string): string => {
    if (value === "-" || value === "" || value === null || value === undefined) return "-"
    if (typeof value === "number") {
      return value.toFixed(2)
    }
    return value.toString()
  }

  const renderDataCell = (value: number | string, isAmount = false, width = "w-12") => {
    const formattedValue = formatValue(value)
    return (
      <td className={`border border-gray-600 px-0.5 py-0 text-center text-xs ${isAmount ? "text-right" : ""} ${width}`}>
        {formattedValue}
      </td>
    )
  }

  if (!tableData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-xl font-semibold text-gray-600">Loading Overdue Analysis...</div>
      </div>
    )
  }

  return (
    <div className="w-full bg-white p-1 text-[10px]">
      {/* Header Section */}
      <div className="text-center mb-1">
        <div className="flex justify-between items-center">
          <span className="text-sm">{tableData.document.title}</span>
          <span className="text-lg font-bold">{tableData.document.subtitle}</span>
          <span className="text-sm">₹ (ரூபாய் ஆயிரத்தில்)</span>
        </div>
      </div>

      {/* Table Section */}
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse border-2 border-gray-600 text-[10px]">
          <thead>
            {/* Main Headers */}
            <tr className="bg-gray-200">
              <th rowSpan={2} className="border border-gray-600 px-0.5 py-0 text-center font-bold w-10">
                S. No
              </th>
              <th rowSpan={2} className="border border-gray-600 px-1 py-0 text-center font-bold w-32">
                Head of Account
              </th>
              <th colSpan={2} className="border border-gray-600 px-0.5 py-0 text-center font-bold">
                Below 6 Months
              </th>
              <th colSpan={2} className="border border-gray-600 px-0.5 py-0 text-center font-bold">
                6 - 36 Month
              </th>
              <th colSpan={2} className="border border-gray-600 px-0.5 py-0 text-center font-bold">
                3 to 4 Years
              </th>
              <th colSpan={2} className="border border-gray-600 px-0.5 py-0 text-center font-bold">
                4 to 6 Years
              </th>
              <th colSpan={2} className="border border-gray-600 px-0.5 py-0 text-center font-bold">
                6 to 10 Years
              </th>
              <th colSpan={2} className="border border-gray-600 px-0.5 py-0 text-center font-bold">
                Above 10 Years
              </th>
              <th colSpan={2} className="border border-gray-600 px-0.5 py-0 text-center font-bold">
                Total Overdue
              </th>
            </tr>
            {/* Sub Headers */}
            <tr className="bg-gray-100">
              <th className="border border-gray-600 px-0.5 py-0 text-center font-semibold w-8">No</th>
              <th className="border border-gray-600 px-0.5 py-0 text-center font-semibold w-12">Amount</th>
              <th className="border border-gray-600 px-0.5 py-0 text-center font-semibold w-8">No</th>
              <th className="border border-gray-600 px-0.5 py-0 text-center font-semibold w-12">Amount</th>
              <th className="border border-gray-600 px-0.5 py-0 text-center font-semibold w-8">No</th>
              <th className="border border-gray-600 px-0.5 py-0 text-center font-semibold w-12">Amount</th>
              <th className="border border-gray-600 px-0.5 py-0 text-center font-semibold w-8">No</th>
              <th className="border border-gray-600 px-0.5 py-0 text-center font-semibold w-12">Amount</th>
              <th className="border border-gray-600 px-0.5 py-0 text-center font-semibold w-8">No</th>
              <th className="border border-gray-600 px-0.5 py-0 text-center font-semibold w-12">Amount</th>
              <th className="border border-gray-600 px-0.5 py-0 text-center font-semibold w-8">No</th>
              <th className="border border-gray-600 px-0.5 py-0 text-center font-semibold w-12">Amount</th>
              <th className="border border-gray-600 px-0.5 py-0 text-center font-semibold w-8">No</th>
              <th className="border border-gray-600 px-0.5 py-0 text-center font-semibold w-12">Amount</th>
            </tr>
          </thead>
          <tbody>
            {tableData.table.rows.map((row: any) => (
              <tr key={row.sno} className="bg-white hover:bg-gray-50">
                <td className="border border-gray-600 px-0.5 py-0 text-center font-medium w-10">{row.sno}</td>
                <td className="border border-gray-600 px-1 py-0 text-left font-medium w-32">{row.account}</td>
                {renderDataCell(row.below_6_months.no, false, "w-8")}
                {renderDataCell(row.below_6_months.amount, true, "w-12")}
                {renderDataCell(row.six_36_months.no, false, "w-8")}
                {renderDataCell(row.six_36_months.amount, true, "w-12")}
                {renderDataCell(row.three_4_years.no, false, "w-8")}
                {renderDataCell(row.three_4_years.amount, true, "w-12")}
                {renderDataCell(row.four_6_years.no, false, "w-8")}
                {renderDataCell(row.four_6_years.amount, true, "w-12")}
                {renderDataCell(row.six_10_years.no, false, "w-8")}
                {renderDataCell(row.six_10_years.amount, true, "w-12")}
                {renderDataCell(row.above_10_years.no, false, "w-8")}
                {renderDataCell(row.above_10_years.amount, true, "w-12")}
                {renderDataCell(row.total_overdue.no, false, "w-8")}
                {renderDataCell(row.total_overdue.amount, true, "w-12")}
              </tr>
            ))}
            {/* Total Row */}
            <tr className="bg-gray-100 font-bold border-t-2 border-gray-800">
              <td className="border border-gray-600 px-0.5 py-0 text-center font-bold w-10"></td>
              <td className="border border-gray-600 px-1 py-0 text-left font-bold w-32">TOTAL</td>
              {renderDataCell(tableData.table.total.below_6_months.no, false, "w-8")}
              {renderDataCell(tableData.table.total.below_6_months.amount, true, "w-12")}
              {renderDataCell(tableData.table.total.six_36_months.no, false, "w-8")}
              {renderDataCell(tableData.table.total.six_36_months.amount, true, "w-12")}
              {renderDataCell(tableData.table.total.three_4_years.no, false, "w-8")}
              {renderDataCell(tableData.table.total.three_4_years.amount, true, "w-12")}
              {renderDataCell(tableData.table.total.four_6_years.no, false, "w-8")}
              {renderDataCell(tableData.table.total.four_6_years.amount, true, "w-12")}
              {renderDataCell(tableData.table.total.six_10_years.no, false, "w-8")}
              {renderDataCell(tableData.table.total.six_10_years.amount, true, "w-12")}
              {renderDataCell(tableData.table.total.above_10_years.no, false, "w-8")}
              {renderDataCell(tableData.table.total.above_10_years.amount, true, "w-12")}
              {renderDataCell(tableData.table.total.total_overdue.no, false, "w-8")}
              {renderDataCell(tableData.table.total.total_overdue.amount, true, "w-12")}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
