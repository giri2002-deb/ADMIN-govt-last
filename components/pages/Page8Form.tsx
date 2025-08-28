"use client"

import { useEffect, useState } from "react"

// Exact data from the loan disbursement statement image
const LOAN_DISBURSEMENT_DATA = {
  document: {
    type: "loan-disbursement-statement",
    title: "கடன் வழங்குதல்",
    subtitle: "S.331 இடங்களாலை PACCS Ltd",
    date: "ஜூன்-2025",
  },
  table: {
    headers: [
      "வ. எண்",
      "கடன் விபரம்",
      "ஆணை இயற்றி",
      "நடப்பு மாதம்",
      "நடப்பு மாதம் முடிய",
      "ஆதிக்கு",
      "இருப்பு",
      "வட்டி வசூல்",
      "LOAN ISSUED TO NEW",
      "LOAN ISSUED TO SC",
    ],
    subHeaders: [
      "",
      "",
      "எண்ணிக்கை",
      "கணக்கு",
      "எண்ணிக்கை",
      "கணக்கியது",
      "எண்ணிக்கை",
      "கணக்கியது",
      "ஆதிக்கு",
      "இருப்பு",
      "வட்டி வசூல்",
      "Members During Month",
      "கணக்கு",
      "Members Upto Month",
      "கணக்கு",
    ],
    rows: [
      {
        sno: "1",
        loanType: "Kissan cash credit",
        opening: "250.00",
        currentMonth: "40.00",
        currentMonthEnd: "-",
        disbursed: "55.00",
        collected: "13.32",
        balance: "-",
        interest: "(41.68)",
        newMembersMonth: "-",
        newMembersAmount: "-",
        newMembersUpto: "-",
        scMembersMonth: "-",
        scMembersAmount: "-",
      },
      {
        sno: "2",
        loanType: "KCC AH WCL",
        opening: "65.00",
        currentMonth: "10.00",
        currentMonthEnd: "-",
        disbursed: "20.00",
        collected: "25.56",
        balance: "5.56",
        interest: "-",
        newMembersMonth: "-",
        newMembersAmount: "-",
        newMembersUpto: "-",
        scMembersMonth: "-",
        scMembersAmount: "-",
      },
      {
        sno: "3",
        loanType: "Drip & Minor Irrigation",
        opening: "-",
        currentMonth: "-",
        currentMonthEnd: "-",
        disbursed: "-",
        collected: "-",
        balance: "-",
        interest: "-",
        newMembersMonth: "-",
        newMembersAmount: "-",
        newMembersUpto: "-",
        scMembersMonth: "-",
        scMembersAmount: "-",
      },
      {
        sno: "4",
        loanType: "J.L.G",
        opening: "-",
        currentMonth: "-",
        currentMonthEnd: "-",
        disbursed: "-",
        collected: "-",
        balance: "-",
        interest: "-",
        newMembersMonth: "-",
        newMembersAmount: "-",
        newMembersUpto: "-",
        scMembersMonth: "-",
        scMembersAmount: "-",
      },
      {
        sno: "5",
        loanType: "M.T Normal",
        opening: "21.00",
        currentMonth: "-",
        currentMonthEnd: "-",
        disbursed: "-",
        collected: "-",
        balance: "-",
        interest: "-",
        newMembersMonth: "-",
        newMembersAmount: "-",
        newMembersUpto: "-",
        scMembersMonth: "-",
        scMembersAmount: "-",
      },
      {
        sno: "6",
        loanType: "Jewel Loan",
        opening: "680.00",
        currentMonth: "80.00",
        currentMonthEnd: "66.53",
        disbursed: "220.00",
        collected: "143.67",
        balance: "-",
        interest: "(76.33)",
        newMembersMonth: "-",
        newMembersAmount: "-",
        newMembersUpto: "-",
        scMembersMonth: "-",
        scMembersAmount: "-",
      },
      {
        sno: "7",
        loanType: "N.F.S. Loan",
        opening: "2.00",
        currentMonth: "-",
        currentMonthEnd: "-",
        disbursed: "-",
        collected: "-",
        balance: "-",
        interest: "-",
        newMembersMonth: "-",
        newMembersAmount: "-",
        newMembersUpto: "-",
        scMembersMonth: "-",
        scMembersAmount: "-",
      },
      {
        sno: "8",
        loanType: "Consumer Loan",
        opening: "-",
        currentMonth: "-",
        currentMonthEnd: "-",
        disbursed: "-",
        collected: "-",
        balance: "-",
        interest: "-",
        newMembersMonth: "-",
        newMembersAmount: "-",
        newMembersUpto: "-",
        scMembersMonth: "-",
        scMembersAmount: "-",
      },
      {
        sno: "9",
        loanType: "Micro Credit Women",
        opening: "-",
        currentMonth: "-",
        currentMonthEnd: "-",
        disbursed: "-",
        collected: "-",
        balance: "-",
        interest: "-",
        newMembersMonth: "-",
        newMembersAmount: "-",
        newMembersUpto: "-",
        scMembersMonth: "-",
        scMembersAmount: "-",
      },
      {
        sno: "10",
        loanType: "Mortgage Loan (H)",
        opening: "1.00",
        currentMonth: "-",
        currentMonthEnd: "-",
        disbursed: "-",
        collected: "-",
        balance: "-",
        interest: "-",
        newMembersMonth: "-",
        newMembersAmount: "-",
        newMembersUpto: "-",
        scMembersMonth: "-",
        scMembersAmount: "-",
      },
      {
        sno: "11",
        loanType: "House Construct",
        opening: "2.00",
        currentMonth: "-",
        currentMonthEnd: "-",
        disbursed: "-",
        collected: "-",
        balance: "-",
        interest: "-",
        newMembersMonth: "-",
        newMembersAmount: "-",
        newMembersUpto: "-",
        scMembersMonth: "-",
        scMembersAmount: "-",
      },
      {
        sno: "12",
        loanType: "S.H.G. Economic",
        opening: "-",
        currentMonth: "-",
        currentMonthEnd: "-",
        disbursed: "-",
        collected: "-",
        balance: "-",
        interest: "-",
        newMembersMonth: "-",
        newMembersAmount: "-",
        newMembersUpto: "-",
        scMembersMonth: "-",
        scMembersAmount: "-",
      },
      {
        sno: "13",
        loanType: "S.H.G. Revolving",
        opening: "-",
        currentMonth: "-",
        currentMonthEnd: "-",
        disbursed: "-",
        collected: "-",
        balance: "-",
        interest: "-",
        newMembersMonth: "-",
        newMembersAmount: "-",
        newMembersUpto: "-",
        scMembersMonth: "-",
        scMembersAmount: "-",
      },
      {
        sno: "14",
        loanType: "S.H.G. Savings",
        opening: "60.00",
        currentMonth: "-",
        currentMonthEnd: "-",
        disbursed: "10.00",
        collected: "-",
        balance: "-",
        interest: "(10.00)",
        newMembersMonth: "-",
        newMembersAmount: "-",
        newMembersUpto: "-",
        scMembersMonth: "-",
        scMembersAmount: "-",
      },
      {
        sno: "15",
        loanType: "Meternity Loan",
        opening: "-",
        currentMonth: "-",
        currentMonthEnd: "-",
        disbursed: "-",
        collected: "-",
        balance: "-",
        interest: "-",
        newMembersMonth: "-",
        newMembersAmount: "-",
        newMembersUpto: "-",
        scMembersMonth: "-",
        scMembersAmount: "-",
      },
      {
        sno: "16",
        loanType: "Tabcedco",
        opening: "2.00",
        currentMonth: "-",
        currentMonthEnd: "-",
        disbursed: "1.00",
        collected: "-",
        balance: "-",
        interest: "(1.00)",
        newMembersMonth: "-",
        newMembersAmount: "-",
        newMembersUpto: "-",
        scMembersMonth: "-",
        scMembersAmount: "-",
      },
      {
        sno: "17",
        loanType: "Tamco",
        opening: "1.00",
        currentMonth: "-",
        currentMonthEnd: "-",
        disbursed: "-",
        collected: "-",
        balance: "-",
        interest: "-",
        newMembersMonth: "-",
        newMembersAmount: "-",
        newMembersUpto: "-",
        scMembersMonth: "-",
        scMembersAmount: "-",
      },
      {
        sno: "18",
        loanType: "Thadco",
        opening: "1.00",
        currentMonth: "-",
        currentMonthEnd: "-",
        disbursed: "1.00",
        collected: "-",
        balance: "-",
        interest: "(1.00)",
        newMembersMonth: "-",
        newMembersAmount: "-",
        newMembersUpto: "-",
        scMembersMonth: "-",
        scMembersAmount: "-",
      },
      {
        sno: "19",
        loanType: "Produce Loan",
        opening: "-",
        currentMonth: "-",
        currentMonthEnd: "-",
        disbursed: "-",
        collected: "-",
        balance: "-",
        interest: "-",
        newMembersMonth: "-",
        newMembersAmount: "-",
        newMembersUpto: "-",
        scMembersMonth: "-",
        scMembersAmount: "-",
      },
      {
        sno: "20",
        loanType: "Salary Loan",
        opening: "-",
        currentMonth: "-",
        currentMonthEnd: "-",
        disbursed: "-",
        collected: "-",
        balance: "-",
        interest: "-",
        newMembersMonth: "-",
        newMembersAmount: "-",
        newMembersUpto: "-",
        scMembersMonth: "-",
        scMembersAmount: "-",
      },
      {
        sno: "21",
        loanType: "K.V.P / N.S.C Loan",
        opening: "-",
        currentMonth: "-",
        currentMonthEnd: "-",
        disbursed: "-",
        collected: "-",
        balance: "-",
        interest: "-",
        newMembersMonth: "-",
        newMembersAmount: "-",
        newMembersUpto: "-",
        scMembersMonth: "-",
        scMembersAmount: "-",
      },
      {
        sno: "22",
        loanType: "Share Capital Loan",
        opening: "-",
        currentMonth: "-",
        currentMonthEnd: "-",
        disbursed: "-",
        collected: "-",
        balance: "-",
        interest: "-",
        newMembersMonth: "-",
        newMembersAmount: "-",
        newMembersUpto: "-",
        scMembersMonth: "-",
        scMembersAmount: "-",
      },
      {
        sno: "23",
        loanType: "Deposit Loan",
        opening: "-",
        currentMonth: "-",
        currentMonthEnd: ".68",
        disbursed: "-",
        collected: "2.55",
        balance: "2.55",
        interest: "-",
        newMembersMonth: "-",
        newMembersAmount: "-",
        newMembersUpto: "-",
        scMembersMonth: "-",
        scMembersAmount: "-",
      },
      {
        sno: "24",
        loanType: "SHG PLF Loan",
        opening: "-",
        currentMonth: "-",
        currentMonthEnd: "-",
        disbursed: "-",
        collected: "-",
        balance: "-",
        interest: "-",
        newMembersMonth: "-",
        newMembersAmount: "-",
        newMembersUpto: "-",
        scMembersMonth: "-",
        scMembersAmount: "-",
      },
      {
        sno: "25",
        loanType: "MTC Loan",
        opening: "-",
        currentMonth: "-",
        currentMonthEnd: "-",
        disbursed: "-",
        collected: "-",
        balance: "-",
        interest: "-",
        newMembersMonth: "-",
        newMembersAmount: "-",
        newMembersUpto: "-",
        scMembersMonth: "-",
        scMembersAmount: "-",
      },
      {
        sno: "26",
        loanType: "S.H.G (Tabcedco)",
        opening: "-",
        currentMonth: "-",
        currentMonthEnd: "-",
        disbursed: "-",
        collected: "-",
        balance: "-",
        interest: "-",
        newMembersMonth: "-",
        newMembersAmount: "-",
        newMembersUpto: "-",
        scMembersMonth: "-",
        scMembersAmount: "-",
      },
      {
        sno: "27",
        loanType: "Differently Abled Person",
        opening: "2.00",
        currentMonth: "-",
        currentMonthEnd: "-",
        disbursed: "-",
        collected: "-",
        balance: "-",
        interest: "-",
        newMembersMonth: "-",
        newMembersAmount: "-",
        newMembersUpto: "-",
        scMembersMonth: "-",
        scMembersAmount: "-",
      },
      {
        sno: "28",
        loanType: "COVIT-19 SHG LOAN",
        opening: "-",
        currentMonth: "-",
        currentMonthEnd: "-",
        disbursed: "-",
        collected: "-",
        balance: "-",
        interest: "-",
        newMembersMonth: "-",
        newMembersAmount: "-",
        newMembersUpto: "-",
        scMembersMonth: "-",
        scMembersAmount: "-",
      },
    ],
    total: {
      opening: "1087.00",
      currentMonth: "130.00",
      currentMonthEnd: "67.21",
      disbursed: "307.00",
      collected: "185.10",
      balance: "8.11",
      interest: "(130.0)",
      newMembersMonth: "-",
      newMembersAmount: "-",
      newMembersUpto: "-",
      scMembersMonth: "-",
      scMembersAmount: "-",
    },
  },
}

type Page8FormProps = {
  data?: any
  onDataChange?: (data: any) => void
}

export default function Page8Form({ data, onDataChange }: Page8FormProps) {
  const [tableData, setTableData] = useState<any>(null)

  useEffect(() => {
    setTableData(LOAN_DISBURSEMENT_DATA)
  }, [])

  const formatValue = (value: number | string): string => {
    if (value === "-" || value === "" || value === null || value === undefined) return "-"
    if (typeof value === "number") {
      return value.toFixed(2)
    }
    return value.toString()
  }

  const renderCell = (value: number | string, className = "text-center", width = "w-16") => {
    const formattedValue = formatValue(value)
    return (
      <td className={`border border-gray-700 px-1 py-1 text-xs ${className} ${width} print:text-[8px]`}>
        {formattedValue}
      </td>
    )
  }

  if (!tableData) {
  return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-xl font-semibold text-gray-600">Loading Loan Disbursement Statement...</div>
      </div>
    )
  }

  return (
    <div className="w-full bg-white p-2 print:p-1">
      {/* Header */}
      <div className="mb-2 text-center border-b border-gray-400 pb-1 print:mb-1">
        <div className="flex justify-between items-center">
          <div className="flex-1 text-left">
            <span className="text-sm font-bold print:text-xs">{tableData.document.subtitle}</span>
          </div>
          <div className="flex-1 text-center">
            <span className="text-lg font-bold print:text-sm">{tableData.document.title}</span>
          </div>
          <div className="flex-1 text-right">
            <div className="text-sm print:text-xs">{tableData.document.date}</div>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse border-2 border-gray-700 text-xs print:text-[8px]">
          <thead>
            {/* Main Headers */}
            <tr className="bg-gray-200 print:bg-gray-100">
              <th
                rowSpan={2}
                className="border border-gray-700 px-1 py-1 text-center font-bold text-xs print:text-[8px] w-6"
              >
                வ. எண்
              </th>
              <th
                rowSpan={2}
                className="border border-gray-700 px-1 py-1 text-center font-bold text-xs print:text-[8px] w-28"
              >
                கடன் விபரம்
              </th>
              <th
                colSpan={2}
                className="border border-gray-700 px-1 py-1 text-center font-bold text-xs print:text-[8px]"
              >
                ஆணை இயற்றி
              </th>
              <th
                colSpan={2}
                className="border border-gray-700 px-1 py-1 text-center font-bold text-xs print:text-[8px]"
              >
                நடப்பு மாதம்
              </th>
              <th
                colSpan={2}
                className="border border-gray-700 px-1 py-1 text-center font-bold text-xs print:text-[8px]"
              >
                நடப்பு மாதம் முடிய
              </th>
              <th
                rowSpan={2}
                className="border border-gray-700 px-1 py-1 text-center font-bold text-xs print:text-[8px] w-12"
              >
                வட்டி வசூல்
              </th>
              <th
                colSpan={2}
                className="border border-gray-700 px-1 py-1 text-center font-bold text-xs print:text-[8px]"
              >
                LOAN ISSUED TO NEW
              </th>
              <th
                colSpan={2}
                className="border border-gray-700 px-1 py-1 text-center font-bold text-xs print:text-[8px]"
              >
                LOAN ISSUED TO SC
              </th>
            </tr>
            {/* Sub Headers */}
            <tr className="bg-gray-100 print:bg-gray-50">
              <th className="border border-gray-700 px-1 py-1 text-center font-semibold text-xs print:text-[8px] w-12">
                எண்ணிக்கை
              </th>
              <th className="border border-gray-700 px-1 py-1 text-center font-semibold text-xs print:text-[8px] w-12">
                கணக்கு
              </th>
              <th className="border border-gray-700 px-1 py-1 text-center font-semibold text-xs print:text-[8px] w-12">
                எண்ணிக்கை
              </th>
              <th className="border border-gray-700 px-1 py-1 text-center font-semibold text-xs print:text-[8px] w-12">
                கணக்கியது
              </th>
              <th className="border border-gray-700 px-1 py-1 text-center font-semibold text-xs print:text-[8px] w-12">
                எண்ணிக்கை
              </th>
              <th className="border border-gray-700 px-1 py-1 text-center font-semibold text-xs print:text-[8px] w-12">
                கணக்கியது
              </th>
              <th className="border border-gray-700 px-1 py-1 text-center font-semibold text-xs print:text-[8px] w-12">
                Members During Month
              </th>
              <th className="border border-gray-700 px-1 py-1 text-center font-semibold text-xs print:text-[8px] w-12">
                கணக்கு
              </th>
              <th className="border border-gray-700 px-1 py-1 text-center font-semibold text-xs print:text-[8px] w-12">
                Members Upto Month
              </th>
              <th className="border border-gray-700 px-1 py-1 text-center font-semibold text-xs print:text-[8px] w-12">
                கணக்கு
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.table.rows.map((row: any) => (
              <tr key={row.sno} className="bg-white hover:bg-gray-50 print:hover:bg-white">
                <td className="border border-gray-700 px-1 py-1 text-center text-xs font-medium w-6 print:text-[8px]">
                  {row.sno}
                </td>
                <td className="border border-gray-700 px-1 py-1 text-left text-xs font-medium w-28 print:text-[8px]">
                  {row.loanType}
                </td>
                {renderCell(row.opening, "text-right", "w-12")}
                {renderCell(row.currentMonth, "text-right", "w-12")}
                {renderCell(row.currentMonthEnd, "text-right", "w-12")}
                {renderCell(row.disbursed, "text-right", "w-12")}
                {renderCell(row.collected, "text-right", "w-12")}
                {renderCell(row.balance, "text-right", "w-12")}
                {renderCell(row.interest, "text-right", "w-12")}
                {renderCell(row.newMembersMonth, "text-center", "w-12")}
                {renderCell(row.newMembersAmount, "text-right", "w-12")}
                {renderCell(row.newMembersUpto, "text-center", "w-12")}
                {renderCell(row.scMembersAmount, "text-right", "w-12")}
              </tr>
            ))}
            {/* Total Row */}
            <tr className="bg-gray-200 font-bold border-t-2 border-gray-800 print:bg-gray-100">
              <td className="border border-gray-700 px-1 py-1 text-center text-xs font-bold w-6 print:text-[8px]"></td>
              <td className="border border-gray-700 px-1 py-1 text-left text-xs font-bold w-28 print:text-[8px]">
                Total
              </td>
              <td className="border border-gray-700 px-1 py-1 text-right text-xs font-bold w-12 print:text-[8px]">
                {tableData.table.total.opening}
              </td>
              <td className="border border-gray-700 px-1 py-1 text-right text-xs font-bold w-12 print:text-[8px]">
                {tableData.table.total.currentMonth}
              </td>
              <td className="border border-gray-700 px-1 py-1 text-right text-xs font-bold w-12 print:text-[8px]">
                {tableData.table.total.currentMonthEnd}
              </td>
              <td className="border border-gray-700 px-1 py-1 text-right text-xs font-bold w-12 print:text-[8px]">
                {tableData.table.total.disbursed}
              </td>
              <td className="border border-gray-700 px-1 py-1 text-right text-xs font-bold w-12 print:text-[8px]">
                {tableData.table.total.collected}
              </td>
              <td className="border border-gray-700 px-1 py-1 text-right text-xs font-bold w-12 print:text-[8px]">
                {tableData.table.total.balance}
              </td>
              <td className="border border-gray-700 px-1 py-1 text-right text-xs font-bold w-12 print:text-[8px]">
                {tableData.table.total.interest}
              </td>
              <td className="border border-gray-700 px-1 py-1 text-center text-xs font-bold w-12 print:text-[8px]">
                {tableData.table.total.newMembersMonth}
              </td>
              <td className="border border-gray-700 px-1 py-1 text-right text-xs font-bold w-12 print:text-[8px]">
                {tableData.table.total.newMembersAmount}
              </td>
              <td className="border border-gray-700 px-1 py-1 text-center text-xs font-bold w-12 print:text-[8px]">
                {tableData.table.total.newMembersUpto}
              </td>
              <td className="border border-gray-700 px-1 py-1 text-right text-xs font-bold w-12 print:text-[8px]">
                {tableData.table.total.scMembersAmount}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
