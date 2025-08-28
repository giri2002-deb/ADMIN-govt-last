"use client"

import { useEffect, useState } from "react"

// Exact data from the loan balance statement image with precise header structure
const LOAN_BALANCE_DATA = {
  document: {
    type: "loan-balance-statement",
    title: "கடன் வருகல்",
    subtitle: "S.331 இடங்களாலை PACCS Ltd",
    date: "ஜூன்-2025",
  },
  table: {
    headers: {
      main: [
        "வ. எண்",
        "கடன் விபரம்",
        "31.03.2025ல் தவணை தவறிய கடன்",
        "நடப்பு மாதம் முடிய கடன்பு",
        "மொத்தம்",
        "31.03.2025ல் தவணை தவறிய கடன்பு வருகல்",
        "நடப்பு மாதம் முடிய",
        "நடப்பு இருப்பு கடன்பு தவணை தவறிய",
      ],
      sub: [
        "",
        "",
        "தவணை தவறிய கடன்",
        "நடப்பு மாதம் முடிய கடன்பு",
        "மொத்தம்",
        "31.03.2025ல் தவணை தவறிய கடன்பு வருகல்",
        "நடப்பு மாதம் முடிய",
        "நடப்பு இருப்பு கடன்பு தவணை தவறிய",
      ],
    },
    rows: [
      {
        sno: "1",
        loanType: "Kissan cash credit",
        opening: "5.91",
        currentMonth: "23.56",
        total: "29.47",
        collections: "",
        currentEnd: "21.32",
        currentEndDup: "21.32",
        outstanding: "8.15",
      },
      {
        sno: "2",
        loanType: "KCC AH WCL",
        opening: "-",
        currentMonth: "3.60",
        total: "3.60",
        collections: "",
        currentEnd: "2.16",
        currentEndDup: "2.16",
        outstanding: "1.44",
      },
      {
        sno: "3",
        loanType: "Drip & Minor Irrigation",
        opening: "0.21",
        currentMonth: "-",
        total: "0.21",
        collections: "",
        currentEnd: "-",
        currentEndDup: "-",
        outstanding: "0.21",
      },
      {
        sno: "4",
        loanType: "J.L.G",
        opening: "-",
        currentMonth: "-",
        total: "-",
        collections: "",
        currentEnd: "-",
        currentEndDup: "-",
        outstanding: "-",
      },
      {
        sno: "5",
        loanType: "M.T Normal",
        opening: "-",
        currentMonth: "-",
        total: "-",
        collections: "",
        currentEnd: "-",
        currentEndDup: "-",
        outstanding: "-",
      },
      {
        sno: "6",
        loanType: "Jewel Loan",
        opening: "14.51",
        currentMonth: "11.07",
        total: "25.58",
        collections: "",
        currentEnd: "6.04",
        currentEndDup: "6.04",
        outstanding: "19.54",
      },
      {
        sno: "7",
        loanType: "N.F.S. Loan",
        opening: "2.03",
        currentMonth: "165.63",
        total: "167.66",
        collections: "",
        currentEnd: "154.91",
        currentEndDup: "154.91",
        outstanding: "12.75",
      },
      {
        sno: "8",
        loanType: "Consumer Loan",
        opening: "0.53",
        currentMonth: "-",
        total: "0.53",
        collections: "",
        currentEnd: "-",
        currentEndDup: "-",
        outstanding: "0.53",
      },
      {
        sno: "9",
        loanType: "Micro Credit Women",
        opening: "0.10",
        currentMonth: "-",
        total: "0.10",
        collections: "",
        currentEnd: "-",
        currentEndDup: "-",
        outstanding: "0.10",
      },
      {
        sno: "10",
        loanType: "Mortgage Loan (H)",
        opening: "-",
        currentMonth: "-",
        total: "-",
        collections: "",
        currentEnd: "-",
        currentEndDup: "-",
        outstanding: "-",
      },
      {
        sno: "11",
        loanType: "House Construct",
        opening: "-",
        currentMonth: "-",
        total: "-",
        collections: "",
        currentEnd: "-",
        currentEndDup: "-",
        outstanding: "-",
      },
      {
        sno: "12",
        loanType: "S.H.G. Economic",
        opening: "-",
        currentMonth: "-",
        total: "-",
        collections: "",
        currentEnd: "-",
        currentEndDup: "-",
        outstanding: "-",
      },
      {
        sno: "13",
        loanType: "S.H.G. Revolving",
        opening: "-",
        currentMonth: "-",
        total: "-",
        collections: "",
        currentEnd: "-",
        currentEndDup: "-",
        outstanding: "-",
      },
      {
        sno: "14",
        loanType: "S.H.G. Savings",
        opening: "-",
        currentMonth: "12.98",
        total: "12.98",
        collections: "",
        currentEnd: "12.92",
        currentEndDup: "12.92",
        outstanding: "0.06",
      },
      {
        sno: "15",
        loanType: "Meternity Loan",
        opening: "-",
        currentMonth: "-",
        total: "-",
        collections: "",
        currentEnd: "-",
        currentEndDup: "-",
        outstanding: "-",
      },
      {
        sno: "16",
        loanType: "Tabcedco",
        opening: "-",
        currentMonth: "0.79",
        total: "0.79",
        collections: "",
        currentEnd: "-",
        currentEndDup: "-",
        outstanding: "0.79",
      },
      {
        sno: "17",
        loanType: "Tamco",
        opening: "-",
        currentMonth: "-",
        total: "-",
        collections: "",
        currentEnd: "-",
        currentEndDup: "-",
        outstanding: "-",
      },
      {
        sno: "18",
        loanType: "Thadco",
        opening: "-",
        currentMonth: "-",
        total: "-",
        collections: "",
        currentEnd: "-",
        currentEndDup: "-",
        outstanding: "-",
      },
      {
        sno: "19",
        loanType: "Produce Loan",
        opening: "-",
        currentMonth: "-",
        total: "-",
        collections: "",
        currentEnd: "-",
        currentEndDup: "-",
        outstanding: "-",
      },
      {
        sno: "20",
        loanType: "Salary Loan",
        opening: "-",
        currentMonth: "-",
        total: "-",
        collections: "",
        currentEnd: "-",
        currentEndDup: "-",
        outstanding: "-",
      },
      {
        sno: "21",
        loanType: "K.V.P / N.S.C Loan",
        opening: "-",
        currentMonth: "-",
        total: "-",
        collections: "",
        currentEnd: "-",
        currentEndDup: "-",
        outstanding: "-",
      },
      {
        sno: "22",
        loanType: "Share Capital Loan",
        opening: "-",
        currentMonth: "-",
        total: "-",
        collections: "",
        currentEnd: "-",
        currentEndDup: "-",
        outstanding: "-",
      },
      {
        sno: "23",
        loanType: "Deposit Loan",
        opening: "-",
        currentMonth: "1.35",
        total: "1.35",
        collections: "",
        currentEnd: "1.35",
        currentEndDup: "1.35",
        outstanding: "-",
      },
      {
        sno: "24",
        loanType: "SHG PLF Loan",
        opening: "-",
        currentMonth: "-",
        total: "-",
        collections: "",
        currentEnd: "-",
        currentEndDup: "-",
        outstanding: "-",
      },
      {
        sno: "25",
        loanType: "MTC Loan",
        opening: "-",
        currentMonth: "0.70",
        total: "0.70",
        collections: "",
        currentEnd: "0.70",
        currentEndDup: "0.70",
        outstanding: "-",
      },
      {
        sno: "26",
        loanType: "S.H.G.(Tabcedco)",
        opening: "-",
        currentMonth: "-",
        total: "-",
        collections: "",
        currentEnd: "-",
        currentEndDup: "-",
        outstanding: "-",
      },
      {
        sno: "27",
        loanType: "Differently Abled Person",
        opening: "1.09",
        currentMonth: "(0.83)",
        total: "0.26",
        collections: "",
        currentEnd: "0.26",
        currentEndDup: "0.26",
        outstanding: "-",
      },
      {
        sno: "28",
        loanType: "COVIT-19 SHG LOAN",
        opening: "-",
        currentMonth: "-",
        total: "-",
        collections: "",
        currentEnd: "-",
        currentEndDup: "-",
        outstanding: "-",
      },
    ],
    total: {
      opening: "24.38",
      currentMonth: "218.85",
      total: "243.23",
      collections: "-",
      currentEnd: "199.66",
      currentEndDup: "199.66",
      outstanding: "43.57",
    },
  },
}

type Page9FormProps = {
  data?: any
  onDataChange?: (data: any) => void
}

export default function Page9Form({ data, onDataChange }: Page9FormProps) {
  const [tableData, setTableData] = useState<any>(null)

  useEffect(() => {
    setTableData(LOAN_BALANCE_DATA)
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
        <div className="text-xl font-semibold text-gray-600">Loading Loan Balance Statement...</div>
      </div>
    )
  }

  return (
    <div className="w-full bg-white p-2 print:p-1">
      {/* Exact Header as shown in image */}
      <div className="mb-2 border-b-2 border-gray-700 pb-1 print:mb-1">
        <div className="flex justify-between items-start">
          <div className="flex-1 text-left">
            <span className="text-sm font-bold print:text-xs border border-gray-700 px-2 py-1">
              {tableData.document.subtitle}
            </span>
          </div>
          <div className="flex-1 text-center">
            <span className="text-lg font-bold print:text-sm">{tableData.document.title}</span>
          </div>
          <div className="flex-1 text-right">
            <div className="text-sm print:text-xs">{tableData.document.date}</div>
          </div>
        </div>
      </div>

      {/* Main Table with exact structure */}
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse border-2 border-gray-700 text-xs print:text-[8px]">
          <thead>
            {/* Main Headers Row */}
            <tr className="bg-gray-200 print:bg-gray-100">
              <th
                rowSpan={2}
                className="border border-gray-700 px-1 py-1 text-center font-bold text-xs print:text-[8px] w-8"
              >
                வ. எண்
              </th>
              <th
                rowSpan={2}
                className="border border-gray-700 px-1 py-1 text-center font-bold text-xs print:text-[8px] w-32"
              >
                கடன் விபரம்
              </th>
              <th className="border border-gray-700 px-1 py-1 text-center font-bold text-xs print:text-[8px] w-16">
                31.03.2025ல்
              </th>
              <th className="border border-gray-700 px-1 py-1 text-center font-bold text-xs print:text-[8px] w-16">
                நடப்பு மாதம்
              </th>
              <th
                rowSpan={2}
                className="border border-gray-700 px-1 py-1 text-center font-bold text-xs print:text-[8px] w-16"
              >
                மொத்தம்
              </th>
              <th className="border border-gray-700 px-1 py-1 text-center font-bold text-xs print:text-[8px] w-20">
                31.03.2025ல் தவணை
              </th>
              <th className="border border-gray-700 px-1 py-1 text-center font-bold text-xs print:text-[8px] w-16">
                நடப்பு மாதம்
              </th>
              <th className="border border-gray-700 px-1 py-1 text-center font-bold text-xs print:text-[8px] w-20">
                நடப்பு இருப்பு
              </th>
            </tr>
            {/* Sub Headers Row */}
            <tr className="bg-gray-100 print:bg-gray-50">
              <th className="border border-gray-700 px-1 py-1 text-center font-semibold text-xs print:text-[8px] w-16">
                தவணை தவறிய
              </th>
              <th className="border border-gray-700 px-1 py-1 text-center font-semibold text-xs print:text-[8px] w-16">
                முடிய கடன்பு
              </th>
              <th className="border border-gray-700 px-1 py-1 text-center font-semibold text-xs print:text-[8px] w-20">
                தவறிய கடன்பு வருகல்
              </th>
              <th className="border border-gray-700 px-1 py-1 text-center font-semibold text-xs print:text-[8px] w-16">
                முடிய
              </th>
              <th className="border border-gray-700 px-1 py-1 text-center font-semibold text-xs print:text-[8px] w-20">
                கடன்பு தவணை தவறிய
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.table.rows.map((row: any) => (
              <tr key={row.sno} className="bg-white hover:bg-gray-50 print:hover:bg-white">
                <td className="border border-gray-700 px-1 py-1 text-center text-xs font-medium w-8 print:text-[8px]">
                  {row.sno}
                </td>
                <td className="border border-gray-700 px-1 py-1 text-left text-xs font-medium w-32 print:text-[8px]">
                  {row.loanType}
                </td>
                {renderCell(row.opening, "text-right", "w-16")}
                {renderCell(row.currentMonth, "text-right", "w-16")}
                {renderCell(row.total, "text-right", "w-16")}
                {renderCell(row.collections, "text-center", "w-20")}
                {renderCell(row.currentEnd, "text-right", "w-16")}
                {renderCell(row.currentEndDup, "text-right", "w-16")}
                {renderCell(row.outstanding, "text-right", "w-20")}
              </tr>
            ))}
            {/* Total Row */}
            <tr className="bg-gray-200 font-bold border-t-2 border-gray-800 print:bg-gray-100">
              <td className="border border-gray-700 px-1 py-1 text-center text-xs font-bold w-8 print:text-[8px]"></td>
              <td className="border border-gray-700 px-1 py-1 text-left text-xs font-bold w-32 print:text-[8px]">
                Total
              </td>
              <td className="border border-gray-700 px-1 py-1 text-right text-xs font-bold w-16 print:text-[8px]">
                {tableData.table.total.opening}
              </td>
              <td className="border border-gray-700 px-1 py-1 text-right text-xs font-bold w-16 print:text-[8px]">
                {tableData.table.total.currentMonth}
              </td>
              <td className="border border-gray-700 px-1 py-1 text-right text-xs font-bold w-16 print:text-[8px]">
                {tableData.table.total.total}
              </td>
              <td className="border border-gray-700 px-1 py-1 text-center text-xs font-bold w-20 print:text-[8px]">
                {tableData.table.total.collections}
              </td>
              <td className="border border-gray-700 px-1 py-1 text-right text-xs font-bold w-16 print:text-[8px]">
                {tableData.table.total.currentEnd}
              </td>
              <td className="border border-gray-700 px-1 py-1 text-right text-xs font-bold w-16 print:text-[8px]">
                {tableData.table.total.currentEndDup}
              </td>
              <td className="border border-gray-700 px-1 py-1 text-right text-xs font-bold w-20 print:text-[8px]">
                {tableData.table.total.outstanding}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
