"use client"

import { useEffect, useState } from "react"

// Exact data from the image
const UI_DATA = {
  document: {
    type: "loan-statement",
    title: "உறுப்பினர்களின் கடன்கள்:",
    subtitle: "S.331 இடங்களாலை PACCS Ltd தமிழ்-2025",
    date: "01.04.2025",
  },
  table: {
    headers: {
      opening: "OPENING",
      issues: "ISSUES",
      collection: "COLLECTION",
      balance: "BALANCE",
      overdue: "OVERDUE",
    },
    rows: [
      {
        sno: "1",
        account: "Kissan cash credit",
        opening: { no: 452, amount: 257.04 },
        issues_during: { no: "-", amount: "-" },
        issues_upto: { no: 25, amount: 13.32 },
        collection_during: { no: 32, amount: 17.92 },
        collection_upto: { no: 37, amount: 21.32 },
        balance: { no: 440, amount: 249.04 },
        overdue: { no: 13, amount: 8.15 },
      },
      {
        sno: "2",
        account: "KCC AH WCL",
        opening: { no: 114, amount: 63.0 },
        issues_during: { no: "-", amount: "-" },
        issues_upto: { no: 53, amount: 25.56 },
        collection_during: { no: 3, amount: 2.16 },
        collection_upto: { no: 3, amount: 2.16 },
        balance: { no: 164, amount: 86.4 },
        overdue: { no: 3, amount: 1.44 },
      },
      {
        sno: "3",
        account: "Drip & Micro Irrigation",
        opening: { no: 1, amount: 0.21 },
        issues_during: { no: "-", amount: "-" },
        issues_upto: { no: "-", amount: "-" },
        collection_during: { no: "-", amount: "-" },
        collection_upto: { no: "-", amount: "-" },
        balance: { no: 1, amount: 0.21 },
        overdue: { no: 1, amount: 0.21 },
      },
      {
        sno: "4",
        account: "J.L.G",
        opening: { no: "-", amount: "-" },
        issues_during: { no: "-", amount: "-" },
        issues_upto: { no: "-", amount: "-" },
        collection_during: { no: "-", amount: "-" },
        collection_upto: { no: "-", amount: "-" },
        balance: { no: "-", amount: "-" },
        overdue: { no: "-", amount: "-" },
      },
      {
        sno: "5",
        account: "M.T Normal",
        opening: { no: 85, amount: 37.07 },
        issues_during: { no: "-", amount: "-" },
        issues_upto: { no: "-", amount: "-" },
        collection_during: { no: 3, amount: 2.47 },
        collection_upto: { no: 10, amount: 6.04 },
        balance: { no: 75, amount: 31.03 },
        overdue: { no: 58, amount: 19.54 },
      },
      {
        sno: "6",
        account: "Jewel Loan (H)",
        opening: { no: 926, amount: 672.34 },
        issues_during: { no: 89, amount: 66.53 },
        issues_upto: { no: 175, amount: 143.67 },
        collection_during: { no: 103, amount: 67.48 },
        collection_upto: { no: 230, amount: 154.91 },
        balance: { no: 871, amount: 661.1 },
        overdue: { no: 15, amount: 12.75 },
      },
      {
        sno: "7",
        account: "N.F.S. Loan",
        opening: { no: 3, amount: 0.53 },
        issues_during: { no: "-", amount: "-" },
        issues_upto: { no: "-", amount: "-" },
        collection_during: { no: "-", amount: "-" },
        collection_upto: { no: "-", amount: "-" },
        balance: { no: 3, amount: 0.53 },
        overdue: { no: 3, amount: 0.53 },
      },
      {
        sno: "8",
        account: "Consumer Loan",
        opening: { no: 1, amount: 0.1 },
        issues_during: { no: "-", amount: "-" },
        issues_upto: { no: "-", amount: "-" },
        collection_during: { no: "-", amount: "-" },
        collection_upto: { no: "-", amount: "-" },
        balance: { no: 1, amount: 0.1 },
        overdue: { no: 1, amount: 0.1 },
      },
      {
        sno: "9",
        account: "Micro Credit Women",
        opening: { no: "-", amount: "-" },
        issues_during: { no: "-", amount: "-" },
        issues_upto: { no: "-", amount: "-" },
        collection_during: { no: "-", amount: "-" },
        collection_upto: { no: "-", amount: "-" },
        balance: { no: "-", amount: "-" },
        overdue: { no: "-", amount: "-" },
      },
      {
        sno: "10",
        account: "Mortgage Loan (H)",
        opening: { no: "-", amount: "-" },
        issues_during: { no: "-", amount: "-" },
        issues_upto: { no: "-", amount: "-" },
        collection_during: { no: "-", amount: "-" },
        collection_upto: { no: "-", amount: "-" },
        balance: { no: "-", amount: "-" },
        overdue: { no: "-", amount: "-" },
      },
      {
        sno: "11",
        account: "House Construct",
        opening: { no: "-", amount: "-" },
        issues_during: { no: "-", amount: "-" },
        issues_upto: { no: "-", amount: "-" },
        collection_during: { no: "-", amount: "-" },
        collection_upto: { no: "-", amount: "-" },
        balance: { no: "-", amount: "-" },
        overdue: { no: "-", amount: "-" },
      },
      {
        sno: "12",
        account: "S.H.G. Economic",
        opening: { no: "-", amount: "-" },
        issues_during: { no: "-", amount: "-" },
        issues_upto: { no: "-", amount: "-" },
        collection_during: { no: "-", amount: "-" },
        collection_upto: { no: "-", amount: "-" },
        balance: { no: "-", amount: "-" },
        overdue: { no: "-", amount: "-" },
      },
      {
        sno: "13",
        account: "S.H.G. Revolving",
        opening: { no: "-", amount: "-" },
        issues_during: { no: "-", amount: "-" },
        issues_upto: { no: "-", amount: "-" },
        collection_during: { no: "-", amount: "-" },
        collection_upto: { no: "-", amount: "-" },
        balance: { no: "-", amount: "-" },
        overdue: { no: "-", amount: "-" },
      },
      {
        sno: "14",
        account: "S.H.G. Savings",
        opening: { no: 16, amount: 30.0 },
        issues_during: { no: "-", amount: "-" },
        issues_upto: { no: "-", amount: "-" },
        collection_during: { no: "-", amount: 4.53 },
        collection_upto: { no: "-", amount: 12.92 },
        balance: { no: 16, amount: 17.08 },
        overdue: { no: 3, amount: 0.06 },
      },
      {
        sno: "15",
        account: "Meternity Loan",
        opening: { no: "-", amount: "-" },
        issues_during: { no: "-", amount: "-" },
        issues_upto: { no: "-", amount: "-" },
        collection_during: { no: "-", amount: "-" },
        collection_upto: { no: "-", amount: "-" },
        balance: { no: "-", amount: "-" },
        overdue: { no: "-", amount: "-" },
      },
      {
        sno: "16",
        account: "Tabcedco",
        opening: { no: 2, amount: 0.79 },
        issues_during: { no: "-", amount: "-" },
        issues_upto: { no: "-", amount: "-" },
        collection_during: { no: "-", amount: "-" },
        collection_upto: { no: "-", amount: "-" },
        balance: { no: 2, amount: 0.79 },
        overdue: { no: 2, amount: 0.79 },
      },
      {
        sno: "17",
        account: "Tamco",
        opening: { no: "-", amount: "-" },
        issues_during: { no: "-", amount: "-" },
        issues_upto: { no: "-", amount: "-" },
        collection_during: { no: "-", amount: "-" },
        collection_upto: { no: "-", amount: "-" },
        balance: { no: "-", amount: "-" },
        overdue: { no: "-", amount: "-" },
      },
      {
        sno: "18",
        account: "Thadco",
        opening: { no: "-", amount: "-" },
        issues_during: { no: "-", amount: "-" },
        issues_upto: { no: "-", amount: "-" },
        collection_during: { no: "-", amount: "-" },
        collection_upto: { no: "-", amount: "-" },
        balance: { no: "-", amount: "-" },
        overdue: { no: "-", amount: "-" },
      },
      {
        sno: "19",
        account: "Produce Loan",
        opening: { no: "-", amount: "-" },
        issues_during: { no: "-", amount: "-" },
        issues_upto: { no: "-", amount: "-" },
        collection_during: { no: "-", amount: "-" },
        collection_upto: { no: "-", amount: "-" },
        balance: { no: "-", amount: "-" },
        overdue: { no: "-", amount: "-" },
      },
      {
        sno: "20",
        account: "Salary Loan",
        opening: { no: "-", amount: "-" },
        issues_during: { no: "-", amount: "-" },
        issues_upto: { no: "-", amount: "-" },
        collection_during: { no: "-", amount: "-" },
        collection_upto: { no: "-", amount: "-" },
        balance: { no: "-", amount: "-" },
        overdue: { no: "-", amount: "-" },
      },
      {
        sno: "21",
        account: "K.V.P / N.S.C Loan",
        opening: { no: "-", amount: "-" },
        issues_during: { no: "-", amount: "-" },
        issues_upto: { no: "-", amount: "-" },
        collection_during: { no: "-", amount: "-" },
        collection_upto: { no: "-", amount: "-" },
        balance: { no: "-", amount: "-" },
        overdue: { no: "-", amount: "-" },
      },
      {
        sno: "22",
        account: "Share Capital Loan",
        opening: { no: "-", amount: "-" },
        issues_during: { no: "-", amount: "-" },
        issues_upto: { no: "-", amount: "-" },
        collection_during: { no: "-", amount: "-" },
        collection_upto: { no: "-", amount: "-" },
        balance: { no: "-", amount: "-" },
        overdue: { no: "-", amount: "-" },
      },
      {
        sno: "23",
        account: "Deposit Loan",
        opening: { no: 13, amount: 6.46 },
        issues_during: { no: 1, amount: 0.68 },
        issues_upto: { no: 7, amount: 2.55 },
        collection_during: { no: 1, amount: 0.7 },
        collection_upto: { no: 3, amount: 1.35 },
        balance: { no: 17, amount: 7.66 },
        overdue: { no: "-", amount: "-" },
      },
      {
        sno: "24",
        account: "SHG PLF Loan",
        opening: { no: "-", amount: "-" },
        issues_during: { no: "-", amount: "-" },
        issues_upto: { no: "-", amount: "-" },
        collection_during: { no: "-", amount: "-" },
        collection_upto: { no: "-", amount: "-" },
        balance: { no: "-", amount: "-" },
        overdue: { no: "-", amount: "-" },
      },
      {
        sno: "25",
        account: "MTC Loan",
        opening: { no: 1, amount: 0.7 },
        issues_during: { no: "-", amount: "-" },
        issues_upto: { no: "-", amount: "-" },
        collection_during: { no: 1, amount: 0.7 },
        collection_upto: { no: 1, amount: 0.7 },
        balance: { no: "-", amount: "-" },
        overdue: { no: "-", amount: "-" },
      },
      {
        sno: "26",
        account: "S.H.G (Tabcedco)",
        opening: { no: "-", amount: "-" },
        issues_during: { no: "-", amount: "-" },
        issues_upto: { no: "-", amount: "-" },
        collection_during: { no: "-", amount: "-" },
        collection_upto: { no: "-", amount: "-" },
        balance: { no: "-", amount: "-" },
        overdue: { no: "-", amount: "-" },
      },
      {
        sno: "27",
        account: "Differently Abled Person",
        opening: { no: 11, amount: 2.83 },
        issues_during: { no: "-", amount: "-" },
        issues_upto: { no: "-", amount: "-" },
        collection_during: { no: "-", amount: 0.06 },
        collection_upto: { no: "-", amount: 0.26 },
        balance: { no: 11, amount: 2.57 },
        overdue: { no: "-", amount: "-" },
      },
      {
        sno: "28",
        account: "COVID-19 SHG LOAN",
        opening: { no: "-", amount: "-" },
        issues_during: { no: "-", amount: "-" },
        issues_upto: { no: "-", amount: "-" },
        collection_during: { no: "-", amount: "-" },
        collection_upto: { no: "-", amount: "-" },
        balance: { no: "-", amount: "-" },
        overdue: { no: "-", amount: "-" },
      },
    ],
    total: {
      opening: { no: 1625, amount: 1071.07 },
      issues_during: { no: 90, amount: 67.21 },
      issues_upto: { no: 260, amount: 185.1 },
      collection_during: { no: 143, amount: 96.02 },
      collection_upto: { no: 284, amount: 199.66 },
      balance: { no: 1601, amount: 1056.51 },
      overdue: { no: 103, amount: 43.57 },
    },
  },
}

type Page2FormProps = {
  data?: any;
  onDataChange?: (data: any) => void;
};

export default function Page2Form({ data, onDataChange }: Page2FormProps) {
  const [tableData, setTableData] = useState<any>(null)

  useEffect(() => {
    setTableData(UI_DATA)
  }, [])

  if (!tableData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-xl font-semibold text-gray-600">Loading Loan Statement...</div>
      </div>
    )
  }

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

  return (
    <div className="w-full bg-white p-1 text-[10px]">
      {/* Header Section */}
      <div className="text-center mb-1">
        <div className="flex justify-between items-center">
          <span className="text-xs">2) {tableData.document.title}</span>
          <span className="text-sm font-bold">{tableData.document.subtitle}</span>
          <span className="text-xs">₹ (ரூபாய் ஆயிரத்தில்)</span>
        </div>
      </div>

      {/* Table Section */}
      <div className="w-full">
        <table className="w-full border-collapse border-2 border-gray-600 text-[10px]">
          <thead>
            {/* Row 1: Main Headers */}
            <tr className="bg-gray-200">
              <th rowSpan={3} className="border border-gray-600 px-0.5 py-0 text-center font-bold w-6">
                S.
                <br />
                NO
              </th>
              <th rowSpan={3} className="border border-gray-600 px-1 py-0 text-center font-bold w-32">
                HEAD OF ACCOUNT
              </th>
              <th colSpan={2} rowSpan={2} className="border border-gray-600 px-0.5 py-0 text-center font-bold">
                OPENING
                <br />
                01.04.2025
              </th>
              <th colSpan={4} className="border border-gray-600 px-0.5 py-0 text-center font-bold">
                ISSUES
              </th>
              <th colSpan={4} className="border border-gray-600 px-0.5 py-0 text-center font-bold">
                COLLECTION
              </th>
              <th colSpan={2} rowSpan={2} className="border border-gray-600 px-0.5 py-0 text-center font-bold">
                BALANCE
              </th>
              <th colSpan={2} rowSpan={2} className="border border-gray-600 px-0.5 py-0 text-center font-bold">
                OVERDUE
              </th>
            </tr>
            {/* Row 2: Sub-headers for Issues and Collection */}
            <tr className="bg-gray-100">
              <th colSpan={2} className="border border-gray-600 px-0.5 py-0 text-center font-semibold">
                During Month
              </th>
              <th colSpan={2} className="border border-gray-600 px-0.5 py-0 text-center font-semibold">
                Up to Month
              </th>
              <th colSpan={2} className="border border-gray-600 px-0.5 py-0 text-center font-semibold">
                During Month
              </th>
              <th colSpan={2} className="border border-gray-600 px-0.5 py-0 text-center font-semibold">
                Up to Month
              </th>
            </tr>
            {/* Row 3: Value type headers (No, Amount) */}
            <tr className="bg-gray-100">
              {/* Opening */}
              <th className="border border-gray-600 px-0.5 py-0 text-center font-semibold w-8">No</th>
              <th className="border border-gray-600 px-0.5 py-0 text-center font-semibold w-12">Amount</th>
              {/* Issues -> During Month */}
              <th className="border border-gray-600 px-0.5 py-0 text-center font-semibold w-8">No</th>
              <th className="border border-gray-600 px-0.5 py-0 text-center font-semibold w-12">Amount</th>
              {/* Issues -> Up to Month */}
              <th className="border border-gray-600 px-0.5 py-0 text-center font-semibold w-8">No</th>
              <th className="border border-gray-600 px-0.5 py-0 text-center font-semibold w-12">Amount</th>
              {/* Collection -> During Month */}
              <th className="border border-gray-600 px-0.5 py-0 text-center font-semibold w-8">No</th>
              <th className="border border-gray-600 px-0.5 py-0 text-center font-semibold w-12">Amount</th>
              {/* Collection -> Up to Month */}
              <th className="border border-gray-600 px-0.5 py-0 text-center font-semibold w-8">No</th>
              <th className="border border-gray-600 px-0.5 py-0 text-center font-semibold w-12">Amount</th>
              {/* Balance */}
              <th className="border border-gray-600 px-0.5 py-0 text-center font-semibold w-8">No</th>
              <th className="border border-gray-600 px-0.5 py-0 text-center font-semibold w-12">Amount</th>
              {/* Overdue */}
              <th className="border border-gray-600 px-0.5 py-0 text-center font-semibold w-8">No</th>
              <th className="border border-gray-600 px-0.5 py-0 text-center font-semibold w-12">Amount</th>
            </tr>
          </thead>
          <tbody>
            {tableData.table.rows.map((row: any) => (
              <tr key={row.sno} className="bg-white hover:bg-gray-50">
                <td className="border border-gray-600 px-0.5 py-0 text-center font-medium w-6">{row.sno}</td>
                <td className="border border-gray-600 px-1 py-0 text-left font-medium w-32">{row.account}</td>
                {renderDataCell(row.opening.no, false, "w-8")}
                {renderDataCell(row.opening.amount, true, "w-12")}
                {renderDataCell(row.issues_during.no, false, "w-8")}
                {renderDataCell(row.issues_during.amount, true, "w-12")}
                {renderDataCell(row.issues_upto.no, false, "w-8")}
                {renderDataCell(row.issues_upto.amount, true, "w-12")}
                {renderDataCell(row.collection_during.no, false, "w-8")}
                {renderDataCell(row.collection_during.amount, true, "w-12")}
                {renderDataCell(row.collection_upto.no, false, "w-8")}
                {renderDataCell(row.collection_upto.amount, true, "w-12")}
                {renderDataCell(row.balance.no, false, "w-8")}
                {renderDataCell(row.balance.amount, true, "w-12")}
                {renderDataCell(row.overdue.no, false, "w-8")}
                {renderDataCell(row.overdue.amount, true, "w-12")}
              </tr>
            ))}
            {/* Total Row */}
            <tr className="bg-gray-100 font-bold border-t-2 border-gray-800">
              <td className="border border-gray-600 px-0.5 py-0 text-center font-bold w-6"></td>
              <td className="border border-gray-600 px-1 py-0 text-left font-bold w-32">Total</td>
              {renderDataCell(tableData.table.total.opening.no, false, "w-8")}
              {renderDataCell(tableData.table.total.opening.amount, true, "w-12")}
              {renderDataCell(tableData.table.total.issues_during.no, false, "w-8")}
              {renderDataCell(tableData.table.total.issues_during.amount, true, "w-12")}
              {renderDataCell(tableData.table.total.issues_upto.no, false, "w-8")}
              {renderDataCell(tableData.table.total.issues_upto.amount, true, "w-12")}
              {renderDataCell(tableData.table.total.collection_during.no, false, "w-8")}
              {renderDataCell(tableData.table.total.collection_during.amount, true, "w-12")}
              {renderDataCell(tableData.table.total.collection_upto.no, false, "w-8")}
              {renderDataCell(tableData.table.total.collection_upto.amount, true, "w-12")}
              {renderDataCell(tableData.table.total.balance.no, false, "w-8")}
              {renderDataCell(tableData.table.total.balance.amount, true, "w-12")}
              {renderDataCell(tableData.table.total.overdue.no, false, "w-8")}
              {renderDataCell(tableData.table.total.overdue.amount, true, "w-12")}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
