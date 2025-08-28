"use client"

import { useEffect, useState } from "react"

// Exact data from the loan recovery action analysis image
const RECOVERY_DATA = {
  document: {
    type: "recovery-analysis",
    title: "6) உறுப்பினர்களின் கடன்கள் தவணை தவறிய கடன்கள் மீது சட்டப்படி நடவடிக்கைகள்:",
    subtitle: "S.331 இடங்களாலை PACCS Ltd தமிழ்-2025",
    date: "2025",
  },
  table: {
    headers: {
      no_action_loans: "No Action Loans",
      notice_issued: "Notice Issued",
      arc_filed: "A.R.C Filed",
      decrees_on_hand: "Decrees on hand",
      ep_filed: "E.P Filed",
      ep_over_3_yrs: "E.P Over 3 Yrs",
      total_overdue: "Total Overdue",
    },
    rows: [
      {
        sno: "1",
        account: "Kissan cash credit",
        no_action_loans: { no: "-", amount: "-" },
        notice_issued: { no: 13, amount: 8.15 },
        arc_filed: { no: "-", amount: "-" },
        decrees_on_hand: { no: "-", amount: "-" },
        ep_filed: { no: "-", amount: "-" },
        ep_over_3_yrs: { no: "-", amount: "-" },
        total_overdue: { no: 13, amount: 8.15 },
      },
      {
        sno: "2",
        account: "KCC AH WCL",
        no_action_loans: { no: "-", amount: "-" },
        notice_issued: { no: 3, amount: 1.44 },
        arc_filed: { no: "-", amount: "-" },
        decrees_on_hand: { no: "-", amount: "-" },
        ep_filed: { no: "-", amount: "-" },
        ep_over_3_yrs: { no: "-", amount: "-" },
        total_overdue: { no: 3, amount: 1.44 },
      },
      {
        sno: "3",
        account: "Drip & Minor Irrigation",
        no_action_loans: { no: "-", amount: "-" },
        notice_issued: { no: 1, amount: 0.21 },
        arc_filed: { no: "-", amount: "-" },
        decrees_on_hand: { no: "-", amount: "-" },
        ep_filed: { no: "-", amount: "-" },
        ep_over_3_yrs: { no: "-", amount: "-" },
        total_overdue: { no: 1, amount: 0.21 },
      },
      {
        sno: "4",
        account: "J.L.G",
        no_action_loans: { no: "-", amount: "-" },
        notice_issued: { no: "-", amount: "-" },
        arc_filed: { no: "-", amount: "-" },
        decrees_on_hand: { no: "-", amount: "-" },
        ep_filed: { no: "-", amount: "-" },
        ep_over_3_yrs: { no: "-", amount: "-" },
        total_overdue: { no: "-", amount: "-" },
      },
      {
        sno: "5",
        account: "M.T Normal",
        no_action_loans: { no: "(1)", amount: "(1.48)" },
        notice_issued: { no: 46, amount: 20.51 },
        arc_filed: { no: "-", amount: "-" },
        decrees_on_hand: { no: "-", amount: "-" },
        ep_filed: { no: "-", amount: "-" },
        ep_over_3_yrs: { no: 13, amount: 0.51 },
        total_overdue: { no: 58, amount: 19.54 },
      },
      {
        sno: "6",
        account: "Jewel Loan",
        no_action_loans: { no: 11, amount: 4.39 },
        notice_issued: { no: 8, amount: 8.36 },
        arc_filed: { no: "-", amount: "-" },
        decrees_on_hand: { no: "-", amount: "-" },
        ep_filed: { no: "-", amount: "-" },
        ep_over_3_yrs: { no: "-", amount: "-" },
        total_overdue: { no: 19, amount: 12.75 },
      },
      {
        sno: "7",
        account: "N.F.S. Loan",
        no_action_loans: { no: "-", amount: "-" },
        notice_issued: { no: "-", amount: "-" },
        arc_filed: { no: "-", amount: "-" },
        decrees_on_hand: { no: "-", amount: "-" },
        ep_filed: { no: "-", amount: "-" },
        ep_over_3_yrs: { no: 3, amount: 0.53 },
        total_overdue: { no: 3, amount: 0.53 },
      },
      {
        sno: "8",
        account: "Consumer Loan",
        no_action_loans: { no: "-", amount: "-" },
        notice_issued: { no: "-", amount: "-" },
        arc_filed: { no: "-", amount: "-" },
        decrees_on_hand: { no: "-", amount: "-" },
        ep_filed: { no: "-", amount: "-" },
        ep_over_3_yrs: { no: 1, amount: 0.1 },
        total_overdue: { no: 1, amount: 0.1 },
      },
      {
        sno: "9",
        account: "Micro Credit Women",
        no_action_loans: { no: "-", amount: "-" },
        notice_issued: { no: "-", amount: "-" },
        arc_filed: { no: "-", amount: "-" },
        decrees_on_hand: { no: "-", amount: "-" },
        ep_filed: { no: "-", amount: "-" },
        ep_over_3_yrs: { no: "-", amount: "-" },
        total_overdue: { no: "-", amount: "-" },
      },
      {
        sno: "10",
        account: "Mortgage Loan (H)",
        no_action_loans: { no: "-", amount: "-" },
        notice_issued: { no: "-", amount: "-" },
        arc_filed: { no: "-", amount: "-" },
        decrees_on_hand: { no: "-", amount: "-" },
        ep_filed: { no: "-", amount: "-" },
        ep_over_3_yrs: { no: "-", amount: "-" },
        total_overdue: { no: "-", amount: "-" },
      },
      {
        sno: "11",
        account: "House Construct",
        no_action_loans: { no: "-", amount: "-" },
        notice_issued: { no: "-", amount: "-" },
        arc_filed: { no: "-", amount: "-" },
        decrees_on_hand: { no: "-", amount: "-" },
        ep_filed: { no: "-", amount: "-" },
        ep_over_3_yrs: { no: "-", amount: "-" },
        total_overdue: { no: "-", amount: "-" },
      },
      {
        sno: "12",
        account: "S.H.G. Economic",
        no_action_loans: { no: "-", amount: "-" },
        notice_issued: { no: "-", amount: "-" },
        arc_filed: { no: "-", amount: "-" },
        decrees_on_hand: { no: "-", amount: "-" },
        ep_filed: { no: "-", amount: "-" },
        ep_over_3_yrs: { no: "-", amount: "-" },
        total_overdue: { no: "-", amount: "-" },
      },
      {
        sno: "13",
        account: "S.H.G. Revolving",
        no_action_loans: { no: "-", amount: "-" },
        notice_issued: { no: "-", amount: "-" },
        arc_filed: { no: "-", amount: "-" },
        decrees_on_hand: { no: "-", amount: "-" },
        ep_filed: { no: "-", amount: "-" },
        ep_over_3_yrs: { no: "-", amount: "-" },
        total_overdue: { no: 3, amount: 0.06 },
      },
      {
        sno: "14",
        account: "S.H.G. Savings",
        no_action_loans: { no: "-", amount: "-" },
        notice_issued: { no: 3, amount: 0.06 },
        arc_filed: { no: "-", amount: "-" },
        decrees_on_hand: { no: "-", amount: "-" },
        ep_filed: { no: "-", amount: "-" },
        ep_over_3_yrs: { no: "-", amount: "-" },
        total_overdue: { no: "-", amount: "-" },
      },
      {
        sno: "15",
        account: "Meternity Loan",
        no_action_loans: { no: "-", amount: "-" },
        notice_issued: { no: "-", amount: "-" },
        arc_filed: { no: "-", amount: "-" },
        decrees_on_hand: { no: "-", amount: "-" },
        ep_filed: { no: "-", amount: "-" },
        ep_over_3_yrs: { no: "-", amount: "-" },
        total_overdue: { no: 2, amount: 0.79 },
      },
      {
        sno: "16",
        account: "Tabcedco",
        no_action_loans: { no: "-", amount: "-" },
        notice_issued: { no: 2, amount: 0.79 },
        arc_filed: { no: "-", amount: "-" },
        decrees_on_hand: { no: "-", amount: "-" },
        ep_filed: { no: "-", amount: "-" },
        ep_over_3_yrs: { no: "-", amount: "-" },
        total_overdue: { no: "-", amount: "-" },
      },
      {
        sno: "17",
        account: "Tamco",
        no_action_loans: { no: "-", amount: "-" },
        notice_issued: { no: "-", amount: "-" },
        arc_filed: { no: "-", amount: "-" },
        decrees_on_hand: { no: "-", amount: "-" },
        ep_filed: { no: "-", amount: "-" },
        ep_over_3_yrs: { no: "-", amount: "-" },
        total_overdue: { no: "-", amount: "-" },
      },
      {
        sno: "18",
        account: "Thadco",
        no_action_loans: { no: "-", amount: "-" },
        notice_issued: { no: "-", amount: "-" },
        arc_filed: { no: "-", amount: "-" },
        decrees_on_hand: { no: "-", amount: "-" },
        ep_filed: { no: "-", amount: "-" },
        ep_over_3_yrs: { no: "-", amount: "-" },
        total_overdue: { no: "-", amount: "-" },
      },
      {
        sno: "19",
        account: "Produce Loan",
        no_action_loans: { no: "-", amount: "-" },
        notice_issued: { no: "-", amount: "-" },
        arc_filed: { no: "-", amount: "-" },
        decrees_on_hand: { no: "-", amount: "-" },
        ep_filed: { no: "-", amount: "-" },
        ep_over_3_yrs: { no: "-", amount: "-" },
        total_overdue: { no: "-", amount: "-" },
      },
      {
        sno: "20",
        account: "Salary Loan",
        no_action_loans: { no: "-", amount: "-" },
        notice_issued: { no: "-", amount: "-" },
        arc_filed: { no: "-", amount: "-" },
        decrees_on_hand: { no: "-", amount: "-" },
        ep_filed: { no: "-", amount: "-" },
        ep_over_3_yrs: { no: "-", amount: "-" },
        total_overdue: { no: "-", amount: "-" },
      },
      {
        sno: "21",
        account: "K.V.P / N.S.C Loan",
        no_action_loans: { no: "-", amount: "-" },
        notice_issued: { no: "-", amount: "-" },
        arc_filed: { no: "-", amount: "-" },
        decrees_on_hand: { no: "-", amount: "-" },
        ep_filed: { no: "-", amount: "-" },
        ep_over_3_yrs: { no: "-", amount: "-" },
        total_overdue: { no: "-", amount: "-" },
      },
      {
        sno: "22",
        account: "Share Capital Loan",
        no_action_loans: { no: "-", amount: "-" },
        notice_issued: { no: "-", amount: "-" },
        arc_filed: { no: "-", amount: "-" },
        decrees_on_hand: { no: "-", amount: "-" },
        ep_filed: { no: "-", amount: "-" },
        ep_over_3_yrs: { no: "-", amount: "-" },
        total_overdue: { no: "-", amount: "-" },
      },
      {
        sno: "23",
        account: "Deposit Loan",
        no_action_loans: { no: "-", amount: "-" },
        notice_issued: { no: "-", amount: "-" },
        arc_filed: { no: "-", amount: "-" },
        decrees_on_hand: { no: "-", amount: "-" },
        ep_filed: { no: "-", amount: "-" },
        ep_over_3_yrs: { no: "-", amount: "-" },
        total_overdue: { no: "-", amount: "-" },
      },
      {
        sno: "24",
        account: "SHG PLF Loan",
        no_action_loans: { no: "(1)", amount: "(0.70)" },
        notice_issued: { no: 1, amount: 0.7 },
        arc_filed: { no: "-", amount: "-" },
        decrees_on_hand: { no: "-", amount: "-" },
        ep_filed: { no: "-", amount: "-" },
        ep_over_3_yrs: { no: "-", amount: "-" },
        total_overdue: { no: "-", amount: "-" },
      },
      {
        sno: "25",
        account: "MTC Loan",
        no_action_loans: { no: "-", amount: "-" },
        notice_issued: { no: "-", amount: "-" },
        arc_filed: { no: "-", amount: "-" },
        decrees_on_hand: { no: "-", amount: "-" },
        ep_filed: { no: "-", amount: "-" },
        ep_over_3_yrs: { no: "-", amount: "-" },
        total_overdue: { no: "-", amount: "-" },
      },
      {
        sno: "26",
        account: "S.H.G (Tabcedco)",
        no_action_loans: { no: "-", amount: "-" },
        notice_issued: { no: "-", amount: "-" },
        arc_filed: { no: "-", amount: "-" },
        decrees_on_hand: { no: "-", amount: "-" },
        ep_filed: { no: "-", amount: "-" },
        ep_over_3_yrs: { no: "-", amount: "-" },
        total_overdue: { no: "-", amount: "-" },
      },
      {
        sno: "27",
        account: "Differently Abled Person",
        no_action_loans: { no: "-", amount: "-" },
        notice_issued: { no: "-", amount: "-" },
        arc_filed: { no: "-", amount: "-" },
        decrees_on_hand: { no: "-", amount: "-" },
        ep_filed: { no: "-", amount: "-" },
        ep_over_3_yrs: { no: "-", amount: "-" },
        total_overdue: { no: "-", amount: "-" },
      },
      {
        sno: "28",
        account: "COVID-19 SHG LOAN",
        no_action_loans: { no: "-", amount: "-" },
        notice_issued: { no: "-", amount: "-" },
        arc_filed: { no: "-", amount: "-" },
        decrees_on_hand: { no: "-", amount: "-" },
        ep_filed: { no: "-", amount: "-" },
        ep_over_3_yrs: { no: 17, amount: 1.14 },
        total_overdue: { no: 103, amount: 43.57 },
      },
    ],
    total: {
      no_action_loans: { no: 9, amount: 2.21 },
      notice_issued: { no: 77, amount: 40.22 },
      arc_filed: { no: "-", amount: "-" },
      decrees_on_hand: { no: "-", amount: "-" },
      ep_filed: { no: "-", amount: "-" },
      ep_over_3_yrs: { no: "-", amount: "-" },
      total_overdue: { no: "-", amount: "-" },
    },
  },
}

type Page4FormProps = {
  data?: any
  onDataChange?: (data: any) => void
}

export default function Page4Form({ data, onDataChange }: Page4FormProps) {
  const [tableData, setTableData] = useState<any>(null)

  useEffect(() => {
    setTableData(RECOVERY_DATA)
  }, [])

  const formatValue = (value: number | string): string => {
    if (value === "-" || value === "" || value === null || value === undefined) return "-"
    if (typeof value === "string" && (value.includes("(") || value.includes(")"))) {
      return value // Return parentheses values as-is
    }
    if (typeof value === "number") {
      return value.toFixed(2)
    }
    return value.toString()
  }

  const renderDataCell = (value: number | string, isAmount = false, width = "w-12") => {
    const formattedValue = formatValue(value)
    return (
      <td className={`border border-gray-600 px-1 py-0 text-center text-xs ${isAmount ? "text-right" : ""} ${width}`}>
        {formattedValue}
      </td>
    )
  }

  if (!tableData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-xl font-semibold text-gray-600">Loading Recovery Analysis...</div>
      </div>
    )
  }

  return (
    <div className="w-full bg-white p-2">
      {/* Header Section */}
      <div className="mb-4 text-center">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm">{tableData.document.title}</span>
          <span className="text-lg font-bold">{tableData.document.subtitle}</span>
          <span className="text-sm">₹ (ரூபாய் ஆயிரத்தில்)</span>
        </div>
      </div>

      {/* Table Section */}
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse border-2 border-gray-600 text-xs">
          <thead>
            {/* Main Headers */}
            <tr className="bg-gray-200">
              <th rowSpan={2} className="border border-gray-600 px-1 py-0 text-center font-bold text-xs w-12">
                S. No
              </th>
              <th rowSpan={2} className="border border-gray-600 px-2 py-0 text-center font-bold text-xs w-48">
                Head of Account
              </th>
              <th colSpan={2} className="border border-gray-600 px-1 py-0 text-center font-bold text-xs">
                No Action Loans
              </th>
              <th colSpan={2} className="border border-gray-600 px-1 py-0 text-center font-bold text-xs">
                Notice Issued
              </th>
              <th colSpan={2} className="border border-gray-600 px-1 py-0 text-center font-bold text-xs">
                A.R.C Filed
              </th>
              <th colSpan={2} className="border border-gray-600 px-1 py-0 text-center font-bold text-xs">
                Decrees on hand
              </th>
              <th colSpan={2} className="border border-gray-600 px-1 py-0 text-center font-bold text-xs">
                E.P Filed
              </th>
              <th colSpan={2} className="border border-gray-600 px-1 py-0 text-center font-bold text-xs">
                E.P Over 3 Yrs
              </th>
              <th colSpan={2} className="border border-gray-600 px-1 py-0 text-center font-bold text-xs">
                Total Overdue
              </th>
            </tr>
            {/* Sub Headers */}
            <tr className="bg-gray-100">
              <th className="border border-gray-600 px-1 py-0 text-center font-semibold text-xs w-12">No</th>
              <th className="border border-gray-600 px-1 py-0 text-center font-semibold text-xs w-16">Amount</th>
              <th className="border border-gray-600 px-1 py-0 text-center font-semibold text-xs w-12">No</th>
              <th className="border border-gray-600 px-1 py-0 text-center font-semibold text-xs w-16">Amount</th>
              <th className="border border-gray-600 px-1 py-0 text-center font-semibold text-xs w-12">No</th>
              <th className="border border-gray-600 px-1 py-0 text-center font-semibold text-xs w-16">Amount</th>
              <th className="border border-gray-600 px-1 py-0 text-center font-semibold text-xs w-12">No</th>
              <th className="border border-gray-600 px-1 py-0 text-center font-semibold text-xs w-16">Amount</th>
              <th className="border border-gray-600 px-1 py-0 text-center font-semibold text-xs w-12">No</th>
              <th className="border border-gray-600 px-1 py-0 text-center font-semibold text-xs w-16">Amount</th>
              <th className="border border-gray-600 px-1 py-0 text-center font-semibold text-xs w-12">No</th>
              <th className="border border-gray-600 px-1 py-0 text-center font-semibold text-xs w-16">Amount</th>
              <th className="border border-gray-600 px-1 py-0 text-center font-semibold text-xs w-12">No</th>
              <th className="border border-gray-600 px-1 py-0 text-center font-semibold text-xs w-16">Amount</th>
            </tr>
          </thead>
          <tbody>
            {tableData.table.rows.map((row: any) => (
              <tr key={row.sno} className="bg-white hover:bg-gray-50">
                <td className="border border-gray-600 px-1 py-0 text-center text-xs font-medium w-12">{row.sno}</td>
                <td className="border border-gray-600 px-2 py-0 text-left text-xs font-medium w-48">{row.account}</td>
                {renderDataCell(row.no_action_loans.no, false, "w-12")}
                {renderDataCell(row.no_action_loans.amount, true, "w-16")}
                {renderDataCell(row.notice_issued.no, false, "w-12")}
                {renderDataCell(row.notice_issued.amount, true, "w-16")}
                {renderDataCell(row.arc_filed.no, false, "w-12")}
                {renderDataCell(row.arc_filed.amount, true, "w-16")}
                {renderDataCell(row.decrees_on_hand.no, false, "w-12")}
                {renderDataCell(row.decrees_on_hand.amount, true, "w-16")}
                {renderDataCell(row.ep_filed.no, false, "w-12")}
                {renderDataCell(row.ep_filed.amount, true, "w-16")}
                {renderDataCell(row.ep_over_3_yrs.no, false, "w-12")}
                {renderDataCell(row.ep_over_3_yrs.amount, true, "w-16")}
                {renderDataCell(row.total_overdue.no, false, "w-12")}
                {renderDataCell(row.total_overdue.amount, true, "w-16")}
              </tr>
            ))}
            {/* Total Row */}
            <tr className="bg-gray-100 font-bold border-t-2 border-gray-800">
              <td className="border border-gray-600 px-1 py-0 text-center text-xs font-bold w-12"></td>
              <td className="border border-gray-600 px-2 py-0 text-left text-xs font-bold w-48">TOTAL</td>
              {renderDataCell(tableData.table.total.no_action_loans.no, false, "w-12")}
              {renderDataCell(tableData.table.total.no_action_loans.amount, true, "w-16")}
              {renderDataCell(tableData.table.total.notice_issued.no, false, "w-12")}
              {renderDataCell(tableData.table.total.notice_issued.amount, true, "w-16")}
              {renderDataCell(tableData.table.total.arc_filed.no, false, "w-12")}
              {renderDataCell(tableData.table.total.arc_filed.amount, true, "w-16")}
              {renderDataCell(tableData.table.total.decrees_on_hand.no, false, "w-12")}
              {renderDataCell(tableData.table.total.decrees_on_hand.amount, true, "w-16")}
              {renderDataCell(tableData.table.total.ep_filed.no, false, "w-12")}
              {renderDataCell(tableData.table.total.ep_filed.amount, true, "w-16")}
              {renderDataCell(tableData.table.total.ep_over_3_yrs.no, false, "w-12")}
              {renderDataCell(tableData.table.total.ep_over_3_yrs.amount, true, "w-16")}
              {renderDataCell(tableData.table.total.total_overdue.no, false, "w-12")}
              {renderDataCell(tableData.table.total.total_overdue.amount, true, "w-16")}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
