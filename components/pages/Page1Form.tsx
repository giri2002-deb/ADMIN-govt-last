"use client"

import { useEffect, useState } from "react"

// All data and interfaces in one component
const UI_DATA = {
  document: {
    type: "financial-statement",
    title: "தொடக்க வேளாண்மை கூட்டுறவு கடன் சங்கத்தின் செயல்பாடுகள் குறித்த மாதத்திற்கு முன்னேற்றம் அறிக்கை",
    subtitle: "தொடக்க வேளாண்மை கூட்டுறவு கடன் சங்கத்தின் செயல் S.331,இடங்களாலை PACCS Ltd",
    date: "01.04.2025",
  },
  table: {
    sections: [
      {
        title: "SHARES",
        type: "section-header",
        rows: [
          {
            id: "a",
            label: "a) S.C Members",
            data: {
              opening: { num: 38, amount: 0.09 },
              collection_during: { num: "-", amount: "-" },
              collection_upto: { num: "-", amount: "-" },
              refunded_during: { num: "-", amount: "-" },
              refunded_upto: { num: "-", amount: "-" },
              balance: { num: 38, amount: 0.09 },
            },
          },
          {
            id: "b",
            label: "b) S.T Members",
            data: {
              opening: { num: "-", amount: "-" },
              collection_during: { num: "-", amount: "-" },
              collection_upto: { num: "-", amount: "-" },
              refunded_during: { num: "-", amount: "-" },
              refunded_upto: { num: "-", amount: "-" },
              balance: { num: "-", amount: "-" },
            },
          },
          {
            id: "c",
            label: "c) Others",
            data: {
              opening: { num: 7008, amount: 50.4 },
              collection_during: { num: "-", amount: 0.03 },
              collection_upto: { num: "-", amount: 0.1 },
              refunded_during: { num: "-", amount: 0.05 },
              refunded_upto: { num: "-", amount: "-" },
              balance: { num: "-", amount: 50.4 },
            },
          },
          {
            id: "d",
            label: "d) Sub Total",
            data: {
              opening: { num: 7046, amount: 50.49 },
              collection_during: { num: "-", amount: 0.03 },
              collection_upto: { num: "-", amount: 0.1 },
              refunded_during: { num: "-", amount: 0.05 },
              refunded_upto: { num: "-", amount: 0.03 },
              balance: { num: 7046, amount: 50.51 },
            },
          },
          {
            id: "e",
            label: "e) Govt Shares",
            data: {
              opening: { num: 1, amount: 1.32 },
              collection_during: { num: "-", amount: "-" },
              collection_upto: { num: "-", amount: "-" },
              refunded_during: { num: "-", amount: "-" },
              refunded_upto: { num: "-", amount: "-" },
              balance: { num: 1, amount: 1.32 },
            },
          },
          {
            id: "total",
            label: "Total (d+e)",
            data: {
              opening: { num: 7047, amount: 51.81 },
              collection_during: { num: "-", amount: 0.03 },
              collection_upto: { num: "-", amount: 0.1 },
              refunded_during: { num: "-", amount: 0.05 },
              refunded_upto: { num: "-", amount: 0.05 },
              balance: { num: 7047, amount: 51.86 },
            },
            isTotal: true,
          },
        ],
      },
      {
        title: "DEPOSITS",
        type: "section-header",
        rows: [
          {
            id: "1",
            label: "Savings Deposits",
            data: {
              opening: { num: 2902, amount: 83.94 },
              collection_during: { num: "-", amount: 63.38 },
              collection_upto: { num: 1, amount: 159.33 },
              refunded_during: { num: 1, amount: 68.61 },
              refunded_upto: { num: "-", amount: 176.72 },
              balance: { num: 2902, amount: 66.55 },
            },
          },
          {
            id: "2",
            label: "Fixed Deposit",
            data: {
              opening: { num: 315, amount: 487.5 },
              collection_during: { num: 17, amount: 49.24 },
              collection_upto: { num: 63, amount: 117.19 },
              refunded_during: { num: 13, amount: 28.65 },
              refunded_upto: { num: 57, amount: 83.7 },
              balance: { num: 321, amount: 520.99 },
            },
          },
          {
            id: "3",
            label: "Recurring Deposit",
            data: {
              opening: { num: "-", amount: "-" },
              collection_during: { num: "-", amount: "-" },
              collection_upto: { num: "-", amount: "-" },
              refunded_during: { num: "-", amount: "-" },
              refunded_upto: { num: "-", amount: "-" },
              balance: { num: "-", amount: "-" },
            },
          },
          {
            id: "4",
            label: "Matured Deposit",
            data: {
              opening: { num: 15, amount: 18.74 },
              collection_during: { num: "-", amount: "-" },
              collection_upto: { num: "-", amount: "-" },
              refunded_during: { num: 2, amount: 6.36 },
              refunded_upto: { num: "-", amount: "-" },
              balance: { num: 13, amount: 12.38 },
            },
          },
          {
            id: "5",
            label: "Thrift Deposit",
            data: {
              opening: { num: "-", amount: 2.1 },
              collection_during: { num: "-", amount: "-" },
              collection_upto: { num: "-", amount: "-" },
              refunded_during: { num: "-", amount: "-" },
              refunded_upto: { num: "-", amount: "-" },
              balance: { num: "-", amount: 2.1 },
            },
          },
          {
            id: "6",
            label: "Subsidy Deposit",
            data: {
              opening: { num: "-", amount: "-" },
              collection_during: { num: "-", amount: "-" },
              collection_upto: { num: "-", amount: "-" },
              refunded_during: { num: "-", amount: "-" },
              refunded_upto: { num: "-", amount: "-" },
              balance: { num: "-", amount: "-" },
            },
          },
          {
            id: "7",
            label: "Locker Deposit",
            data: {
              opening: { num: "-", amount: "-" },
              collection_during: { num: "-", amount: "-" },
              collection_upto: { num: "-", amount: "-" },
              refunded_during: { num: "-", amount: "-" },
              refunded_upto: { num: "-", amount: "-" },
              balance: { num: "-", amount: "-" },
            },
          },
          {
            id: "8",
            label: "Emp Security Deposit",
            data: {
              opening: { num: 15, amount: 0.53 },
              collection_during: { num: "-", amount: "-" },
              collection_upto: { num: "-", amount: "-" },
              refunded_during: { num: "-", amount: "-" },
              refunded_upto: { num: "-", amount: "-" },
              balance: { num: 15, amount: 0.53 },
            },
          },
          {
            id: "9",
            label: "Emp E.P.F",
            data: {
              opening: { num: 9, amount: 42.79 },
              collection_during: { num: "-", amount: "-" },
              collection_upto: { num: "-", amount: 6.12 },
              refunded_during: { num: "-", amount: 1.03 },
              refunded_upto: { num: "-", amount: 1.03 },
              balance: { num: 9, amount: 47.88 },
            },
          },
          {
            id: "deposit-total",
            label: "DEPOSIT TOTAL",
            data: {
              opening: { num: 3256, amount: 635.6 },
              collection_during: { num: 17, amount: 112.62 },
              collection_upto: { num: 64, amount: 282.64 },
              refunded_during: { num: 15, amount: 104.86 },
              refunded_upto: { num: 59, amount: 267.81 },
              balance: { num: 3261, amount: 650.43 },
            },
            isTotal: true,
          },
        ],
      },
    ],
  },
}

// Interfaces
interface DataCell {
  num: number | string
  amount: number | string
}

interface RowData {
  opening: DataCell
  collection_during: DataCell
  collection_upto: DataCell
  refunded_during: DataCell
  refunded_upto: DataCell
  balance: DataCell
}

interface TableRow {
  id: string
  label: string
  data: RowData
  isTotal?: boolean
}

interface TableSection {
  title: string
  type: string
  rows: TableRow[]
}

type Page1FormProps = {
  data?: any
  onDataChange?: (data: any) => void
}

export default function Page1Form({ data, onDataChange }: Page1FormProps) {
  const [tableData, setTableData] = useState<any>(null)

  useEffect(() => {
    setTableData(UI_DATA)
  }, [])

  if (!tableData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-xl font-semibold text-gray-600">Loading Financial Statement...</div>
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

  const renderDataCell = (value: number | string, isAmount = false) => {
    const formattedValue = formatValue(value)
    return (
      <td className={`border border-gray-600 px-1 py-1 text-center text-xs ${isAmount ? "text-right" : ""} w-12`}>
        {formattedValue}
      </td>
    )
  }

  const renderRow = (row: TableRow) => {
    const rowClass = row.isTotal ? "bg-gray-100 font-bold border-t-2 border-gray-800" : "bg-white hover:bg-gray-50"

    return (
      <tr key={row.id} className={rowClass}>
        <td className="border border-gray-600 px-1 py-1 text-center text-xs font-medium w-8">
          {row.id === "total" || row.id === "deposit-total" ? "" : row.id}
        </td>
        <td className="border border-gray-600 px-2 py-1 text-left text-xs font-medium w-40">{row.label}</td>
        {renderDataCell(row.data.opening.num)}
        {renderDataCell(row.data.opening.amount, true)}
        {renderDataCell(row.data.collection_during.num)}
        {renderDataCell(row.data.collection_during.amount, true)}
        {renderDataCell(row.data.collection_upto.num)}
        {renderDataCell(row.data.collection_upto.amount, true)}
        {renderDataCell(row.data.refunded_during.num)}
        {renderDataCell(row.data.refunded_during.amount, true)}
        {renderDataCell(row.data.refunded_upto.num)}
        {renderDataCell(row.data.refunded_upto.amount, true)}
        {renderDataCell(row.data.balance.num)}
        {renderDataCell(row.data.balance.amount, true)}
      </tr>
    )
  }

  const renderSection = (section: TableSection) => (
    <tbody key={section.title}>
      <tr>
        <td colSpan={13} className="border border-gray-600 px-2 py-1 text-left font-bold text-xs bg-gray-200">
          ({section.title === "SHARES" ? "A" : "B"}) {section.title}
        </td>
      </tr>
      {section.rows.map((row) => renderRow(row))}
    </tbody>
  )

  return (
    <div className="w-full bg-white p-2">
      {/* Header Section */}
      <div className="mb-4 text-center">
        <h1 className="text-sm font-bold mb-1 text-gray-800 leading-tight">{tableData.document.title}</h1>
        <h2 className="text-xs font-semibold mb-2 text-gray-700">{tableData.document.subtitle}</h2>
        <div className="flex justify-between items-center text-xs mb-2">
          <span className="text-gray-600">முன்னேற்றம் மற்றும் பணிகள் செய்கை மாதம் வரை</span>
          <span className="font-medium text-gray-800">₹ (ரூபாய் ஆயிரத்தில்)</span>
        </div>
      </div>

      {/* Table Section - Compact Design */}
      <div className="w-full">
        <table className="w-full border-collapse border-2 border-gray-600 text-xs">
          <thead>
            {/* Main Headers */}
            <tr className="bg-gray-300">
              <th rowSpan={2} className="border border-gray-600 px-1 py-2 text-center font-bold text-xs w-8">
                S.NO
              </th>
              <th rowSpan={2} className="border border-gray-600 px-2 py-2 text-center font-bold text-xs w-40">
                HEAD OF ACCOUNT
              </th>
              <th colSpan={2} className="border border-gray-600 px-1 py-2 text-center font-bold text-xs">
                OPENING
                <br />
                01.04.2025
              </th>
              <th colSpan={4} className="border border-gray-600 px-1 py-2 text-center font-bold text-xs">
                COLLECTION
              </th>
              <th colSpan={4} className="border border-gray-600 px-1 py-2 text-center font-bold text-xs">
                REFUNDED
              </th>
              <th colSpan={2} className="border border-gray-600 px-1 py-2 text-center font-bold text-xs">
                BALANCE
              </th>
            </tr>
            {/* Sub Headers */}
            <tr className="bg-gray-200">
              <th className="border border-gray-600 px-1 py-1 text-center font-semibold text-xs w-12">Num</th>
              <th className="border border-gray-600 px-1 py-1 text-center font-semibold text-xs w-12">Amount</th>
              <th className="border border-gray-600 px-1 py-1 text-center font-semibold text-xs w-12">Num</th>
              <th className="border border-gray-600 px-1 py-1 text-center font-semibold text-xs w-12">Amount</th>
              <th className="border border-gray-600 px-1 py-1 text-center font-semibold text-xs w-12">Num</th>
              <th className="border border-gray-600 px-1 py-1 text-center font-semibold text-xs w-12">Amount</th>
              <th className="border border-gray-600 px-1 py-1 text-center font-semibold text-xs w-12">Num</th>
              <th className="border border-gray-600 px-1 py-1 text-center font-semibold text-xs w-12">Amount</th>
              <th className="border border-gray-600 px-1 py-1 text-center font-semibold text-xs w-12">Num</th>
              <th className="border border-gray-600 px-1 py-1 text-center font-semibold text-xs w-12">Amount</th>
              <th className="border border-gray-600 px-1 py-1 text-center font-semibold text-xs w-12">Num</th>
              <th className="border border-gray-600 px-1 py-1 text-center font-semibold text-xs w-12">Amount</th>
            </tr>
          </thead>
          {tableData.table.sections.map((section: TableSection) => renderSection(section))}
        </table>
      </div>
    </div>
  )
}
