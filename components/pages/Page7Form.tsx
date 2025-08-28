"use client"

import { useEffect, useState } from "react"

// Complete data from the comprehensive financial statement
const COMPREHENSIVE_DATA = {
  document: {
    type: "comprehensive-financial-statement",
    title: "உழவர் பயிர்ச்சி மறுக்கு இகள்முடல் விதியோகம் & இருப்பு விபரம்",
    subtitle: "S.331 இடங்களாலை PACCS Ltd",
    date: "ஜூன்-2025",
  },
  mainTable: {
    headers: [
      "வ. எண்",
      "விபரம்",
      "ஆணை இயற்றி",
      "ஆய்வு இருப்பு",
      "இசைவுரம்",
      "நடப்பு மாதம் முடிய",
      "விற்பனை",
      "மொத்த இருப்பு",
      "நடப்பு இருப்பு இருப்பு",
    ],
    subHeaders: [
      "",
      "",
      "அளவு",
      "கிலோக்கு",
      "அளவு",
      "கிலோக்கு",
      "அளவு",
      "கிலோக்கு",
      "அளவு",
      "கிலோக்கு",
      "அளவு",
      "கிலோக்கு",
      "மதிப்பு",
      "கிலோக்கு",
      "அளவு",
      "கிலோக்கு",
    ],
    rows: [
      {
        sno: "1",
        item: "யூரியா",
        opening: { qty: "", rate: "", amount: ".045" },
        purchase: { qty: "", rate: ".050", amount: "0.01" },
        sales: { qty: "", rate: "", amount: "" },
        currentStock: { qty: "6.075", rate: "0.36", amount: "1.035" },
        totalStock: { qty: "0.06", rate: "4.770", amount: "0.28" },
        balance: { qty: "1.350", rate: "0.08", amount: "" },
      },
      {
        sno: "2",
        item: "டி.ஏ.பி",
        opening: { qty: "", rate: "", amount: ".050" },
        purchase: { qty: "", rate: "0.01", amount: "" },
        sales: { qty: "", rate: "", amount: "" },
        currentStock: { qty: "5.000", rate: "1.35", amount: ".500" },
        totalStock: { qty: "0.14", rate: "650", amount: "0.18" },
        balance: { qty: "4.400", rate: "1.18", amount: "" },
      },
      {
        sno: "3",
        item: "பொட்டாஷ்",
        opening: { qty: "", rate: "", amount: "1.400" },
        purchase: { qty: "", rate: "0.46", amount: "" },
        sales: { qty: "", rate: "", amount: "" },
        currentStock: { qty: "", rate: "", amount: ".025" },
        totalStock: { qty: "0.08", rate: "525", amount: "0.25" },
        balance: { qty: "875", rate: "0.21", amount: "" },
      },
      {
        sno: "4",
        item: "17:17:17",
        opening: { qty: "", rate: "", amount: "3.800" },
        purchase: { qty: "", rate: "1.10", amount: "" },
        sales: { qty: "", rate: "", amount: "" },
        currentStock: { qty: "", rate: "", amount: ".005" },
        totalStock: { qty: "0.01", rate: "1.055", amount: "0.31" },
        balance: { qty: "2.745", rate: "0.79", amount: "" },
      },
      {
        sno: "5",
        item: "10:26:26",
        opening: { qty: "", rate: "", amount: "2.550" },
        purchase: { qty: "", rate: "0.74", amount: "" },
        sales: { qty: "", rate: "", amount: "" },
        currentStock: { qty: "", rate: "", amount: ".020" },
        totalStock: { qty: "0.06", rate: "1.370", amount: "0.45" },
        balance: { qty: "1.180", rate: "0.29", amount: "" },
      },
      {
        sno: "6",
        item: "20:20",
        opening: { qty: "", rate: "", amount: "5.600" },
        purchase: { qty: "", rate: "1.47", amount: "" },
        sales: { qty: "", rate: "", amount: "" },
        currentStock: { qty: "", rate: "", amount: ".020" },
        totalStock: { qty: "0.05", rate: "2.320", amount: "0.56" },
        balance: { qty: "3.280", rate: "0.81", amount: "" },
      },
      {
        sno: "7",
        item: "இதர உரம் 1",
        opening: { qty: "", rate: "", amount: "1.126" },
        purchase: { qty: "", rate: "0.39", amount: "" },
        sales: { qty: "", rate: "", amount: "" },
        currentStock: { qty: "1.000", rate: "0.46", amount: ".008" },
        totalStock: { qty: "0.01", rate: "318", amount: "0.13" },
        balance: { qty: "1.808", rate: "0.67", amount: "" },
      },
      {
        sno: "8",
        item: "இதர உரம் 2",
        opening: { qty: "", rate: "", amount: ".057" },
        purchase: { qty: "", rate: "0.13", amount: "" },
        sales: { qty: "", rate: "", amount: "" },
        currentStock: { qty: "", rate: "", amount: "" },
        totalStock: { qty: "", rate: "034", amount: "0.04" },
        balance: { qty: "023", rate: "0.09", amount: "" },
      },
    ],
    total: {
      opening: { amount: "14.628" },
      purchase: { amount: "4.29" },
      sales: { amount: "" },
      currentStock: { amount: "12.075" },
      totalStock: { amount: "2.17" },
      balance: { amount: "1.613" },
      final: { amount: "0.41" },
      grandTotal: { amount: "11.042" },
      lastColumn: { amount: "2.35" },
      veryLast: { amount: "15.661" },
      ultimate: { amount: "4.11" },
    },
  },
  serviceCenter: {
    title: "அகில் கிளினிக், வேளாண் & பொது சேவை மையம்",
    eGovernance: '"E" Governance Certificate',
    sections: [
      {
        title: "நடப்பு மாதம்",
        subTitle: "நடப்பு மாதம் முடிய",
        headers: ["Earned Income", "Expenditure", "Earned Income", "Expenditure"],
      },
    ],
    rows: [
      {
        sno: "1",
        service: "வேளாண் சேவை மையம்",
        data: { col1: "", col2: "", col3: "", col4: "", col5: "", col6: "", col7: "" },
      },
      {
        sno: "2",
        service: "அகில் கிளினிக்",
        data: { col1: "", col2: "", col3: "", col4: "", col5: "", col6: "68", col7: "4440" },
      },
      {
        sno: "3",
        service: "பொது சேவை மையம்",
        data: { col1: "4440", col2: "", col3: "", col4: "", col5: "4440", col6: "", col7: "" },
      },
    ],
    total: {
      data: { col1: "4440", col2: "", col3: "", col4: "", col5: "4440", col6: "68", col7: "4440" },
    },
  },
  yearlyData: {
    title: "வங்கி இறுதி கணக்கை அறிக்கை விபரம்",
    headers: ["வ. எண்", "ஆண்டு", "கணக்கு நிலை கணக்கு", "கணக்கு நட்டம்", "வகுப்பு", "கணக்கை நிலை பெறுபேறு எனது"],
    subHeaders: ["", "", "இலாபம்", "நட்டம்", "", "இலாபம்", "நட்டம்", "கணக்கு"],
    rows: [
      { sno: "1", year: "2020-2021", profit: "15.00", loss: "", grade: "A", balance1: "", balance2: "", account: "" },
      { sno: "2", year: "2021-2022", profit: "4.63", loss: "", grade: "A", balance1: "", balance2: "", account: "" },
      { sno: "3", year: "2022-2023", profit: "3.21", loss: "", grade: "A", balance1: "", balance2: "", account: "" },
      { sno: "4", year: "2023-2024", profit: "14.36", loss: "", grade: "B", balance1: "", balance2: "", account: "" },
      { sno: "5", year: "2024-2025", profit: "", loss: "", grade: "", balance1: "", balance2: "", account: "" },
      { sno: "6", year: "2024-2025", profit: "3.14", loss: "", grade: "", balance1: "3.14", balance2: "", account: "" },
    ],
  },
  mscData: {
    title: "MSC Income & Expenditure",
    headers: ["During Month", "Upto Month"],
    subHeaders: ["Income", "Expenses", "Income", "Expenses"],
    data: {
      duringMonth: { income: "", expenses: "" },
      uptoMonth: { income: "", expenses: "" },
    },
  },
}

type Page7FormProps = {
  data?: any
  onDataChange?: (data: any) => void
}

export default function Page7Form({ data, onDataChange }: Page7FormProps) {
  const [tableData, setTableData] = useState<any>(null)

  useEffect(() => {
    setTableData(COMPREHENSIVE_DATA)
  }, [])

  const formatValue = (value: number | string): string => {
    if (value === "-" || value === "" || value === null || value === undefined) return ""
    if (typeof value === "number") {
      return value.toFixed(2)
    }
    return value.toString()
  }

  const renderCell = (value: number | string, className = "text-center") => {
    const formattedValue = formatValue(value)
    return (
      <td className={`border border-gray-700 px-1 py-1 text-xs ${className} print:text-[9px]`}>{formattedValue}</td>
    )
  }

  if (!tableData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-xl font-semibold text-gray-600">Loading Financial Statement...</div>
      </div>
    )
  }

  return (
    <div className="w-full bg-white p-3 print:p-2">
      {/* Header */}
      <div className="mb-3 text-center border-b border-gray-400 pb-2 print:mb-2">
        <div className="flex justify-between items-center">
          <div className="flex-1"></div>
          <div className="flex-1 text-center">
            <div className="text-sm font-bold print:text-xs mb-1">{tableData.document.title}</div>
            <div className="text-lg font-bold print:text-base">{tableData.document.subtitle}</div>
          </div>
          <div className="flex-1 text-right">
            <div className="text-sm print:text-xs">{tableData.document.date}</div>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="mb-4">
        <table className="w-full border-collapse border-2 border-gray-700 text-xs print:text-[9px]">
          <thead>
            <tr className="bg-gray-200 print:bg-gray-100">
              <th rowSpan={2} className="border border-gray-700 px-1 py-1 text-center font-bold w-8">
                வ. எண்
              </th>
              <th rowSpan={2} className="border border-gray-700 px-1 py-1 text-center font-bold w-20">
                விபரம்
              </th>
              <th colSpan={2} className="border border-gray-700 px-1 py-1 text-center font-bold">
                ஆணை இயற்றி
              </th>
              <th colSpan={2} className="border border-gray-700 px-1 py-1 text-center font-bold">
                ஆய்வு இருப்பு
              </th>
              <th colSpan={2} className="border border-gray-700 px-1 py-1 text-center font-bold">
                இசைவுரம்
              </th>
              <th colSpan={2} className="border border-gray-700 px-1 py-1 text-center font-bold">
                நடப்பு மாதம் முடிய
              </th>
              <th colSpan={2} className="border border-gray-700 px-1 py-1 text-center font-bold">
                விற்பனை
              </th>
              <th colSpan={2} className="border border-gray-700 px-1 py-1 text-center font-bold">
                மொத்த இருப்பு
              </th>
              <th colSpan={2} className="border border-gray-700 px-1 py-1 text-center font-bold">
                நடப்பு இருப்பு இருப்பு
              </th>
            </tr>
            <tr className="bg-gray-100 print:bg-gray-50">
              <th className="border border-gray-700 px-1 py-1 text-center font-semibold">அளவு</th>
              <th className="border border-gray-700 px-1 py-1 text-center font-semibold">கிலோக்கு</th>
              <th className="border border-gray-700 px-1 py-1 text-center font-semibold">அளவு</th>
              <th className="border border-gray-700 px-1 py-1 text-center font-semibold">கிலோக்கு</th>
              <th className="border border-gray-700 px-1 py-1 text-center font-semibold">அளவு</th>
              <th className="border border-gray-700 px-1 py-1 text-center font-semibold">கிலோக்கு</th>
              <th className="border border-gray-700 px-1 py-1 text-center font-semibold">அளவு</th>
              <th className="border border-gray-700 px-1 py-1 text-center font-semibold">கிலோக்கு</th>
              <th className="border border-gray-700 px-1 py-1 text-center font-semibold">அளவு</th>
              <th className="border border-gray-700 px-1 py-1 text-center font-semibold">கிலோக்கு</th>
              <th className="border border-gray-700 px-1 py-1 text-center font-semibold">மதிப்பு</th>
              <th className="border border-gray-700 px-1 py-1 text-center font-semibold">கிலோக்கு</th>
              <th className="border border-gray-700 px-1 py-1 text-center font-semibold">அளவு</th>
              <th className="border border-gray-700 px-1 py-1 text-center font-semibold">கிலோக்கு</th>
            </tr>
          </thead>
          <tbody>
            {tableData.mainTable.rows.map((row: any) => (
              <tr key={row.sno} className="bg-white hover:bg-gray-50 print:hover:bg-white">
                <td className="border border-gray-700 px-1 py-1 text-center text-xs font-medium w-8 print:text-[9px]">
                  {row.sno}
                </td>
                <td className="border border-gray-700 px-1 py-1 text-left text-xs font-medium w-20 print:text-[9px]">
                  {row.item}
                </td>
                {renderCell(row.opening.qty)}
                {renderCell(row.opening.rate)}
                {renderCell(row.opening.amount)}
                {renderCell(row.purchase.rate)}
                {renderCell(row.purchase.amount)}
                {renderCell(row.sales.qty)}
                {renderCell(row.sales.rate)}
                {renderCell(row.currentStock.qty)}
                {renderCell(row.currentStock.rate)}
                {renderCell(row.currentStock.amount)}
                {renderCell(row.totalStock.qty)}
                {renderCell(row.totalStock.rate)}
                {renderCell(row.totalStock.amount)}
                {renderCell(row.balance.qty)}
                {renderCell(row.balance.rate)}
              </tr>
            ))}
            {/* Total Row */}
            <tr className="bg-gray-200 font-bold border-t-2 border-gray-800 print:bg-gray-100">
              <td className="border border-gray-700 px-1 py-1 text-center text-xs font-bold print:text-[9px]"></td>
              <td className="border border-gray-700 px-1 py-1 text-left text-xs font-bold print:text-[9px]">மொத்தம்</td>
              <td className="border border-gray-700 px-1 py-1 text-center text-xs font-bold print:text-[9px]">-</td>
              <td className="border border-gray-700 px-1 py-1 text-center text-xs font-bold print:text-[9px]">-</td>
              <td className="border border-gray-700 px-1 py-1 text-center text-xs font-bold print:text-[9px]">
                {tableData.mainTable.total.opening.amount}
              </td>
              <td className="border border-gray-700 px-1 py-1 text-center text-xs font-bold print:text-[9px]">
                {tableData.mainTable.total.purchase.amount}
              </td>
              <td className="border border-gray-700 px-1 py-1 text-center text-xs font-bold print:text-[9px]">-</td>
              <td className="border border-gray-700 px-1 py-1 text-center text-xs font-bold print:text-[9px]">-</td>
              <td className="border border-gray-700 px-1 py-1 text-center text-xs font-bold print:text-[9px]">
                {tableData.mainTable.total.currentStock.amount}
              </td>
              <td className="border border-gray-700 px-1 py-1 text-center text-xs font-bold print:text-[9px]">
                {tableData.mainTable.total.totalStock.amount}
              </td>
              <td className="border border-gray-700 px-1 py-1 text-center text-xs font-bold print:text-[9px]">
                {tableData.mainTable.total.balance.amount}
              </td>
              <td className="border border-gray-700 px-1 py-1 text-center text-xs font-bold print:text-[9px]">
                {tableData.mainTable.total.final.amount}
              </td>
              <td className="border border-gray-700 px-1 py-1 text-center text-xs font-bold print:text-[9px]">
                {tableData.mainTable.total.grandTotal.amount}
              </td>
              <td className="border border-gray-700 px-1 py-1 text-center text-xs font-bold print:text-[9px]">
                {tableData.mainTable.total.lastColumn.amount}
              </td>
              <td className="border border-gray-700 px-1 py-1 text-center text-xs font-bold print:text-[9px]">
                {tableData.mainTable.total.veryLast.amount}
              </td>
              <td className="border border-gray-700 px-1 py-1 text-center text-xs font-bold print:text-[9px]">
                {tableData.mainTable.total.ultimate.amount}
              </td>
            </tr>
          </tbody>
        </table>
        </div>

      {/* Service Center Section */}
      <div className="mb-4 flex gap-4">
        <div className="flex-1">
          <div className="text-sm font-bold mb-2 print:text-xs">{tableData.serviceCenter.title}</div>
          <table className="w-full border-collapse border border-gray-700 text-xs print:text-[9px]">
            <thead>
              <tr className="bg-gray-200 print:bg-gray-100">
                <th className="border border-gray-700 px-1 py-1 text-center font-bold">வ. எண்</th>
                <th className="border border-gray-700 px-1 py-1 text-center font-bold">விபரம்</th>
                <th colSpan={2} className="border border-gray-700 px-1 py-1 text-center font-bold">
                  நடப்பு மாதம்
                </th>
                <th colSpan={2} className="border border-gray-700 px-1 py-1 text-center font-bold">
                  நடப்பு மாதம் முடிய
                </th>
                <th className="border border-gray-700 px-1 py-1 text-center font-bold">சான்றிதழ்</th>
                <th className="border border-gray-700 px-1 py-1 text-center font-bold">விபரம்</th>
              </tr>
            </thead>
            <tbody>
              {tableData.serviceCenter.rows.map((row: any) => (
                <tr key={row.sno} className="bg-white">
                  <td className="border border-gray-700 px-1 py-1 text-center text-xs print:text-[9px]">{row.sno}</td>
                  <td className="border border-gray-700 px-1 py-1 text-left text-xs print:text-[9px]">{row.service}</td>
                  <td className="border border-gray-700 px-1 py-1 text-center text-xs print:text-[9px]">
                    {row.data.col1}
                  </td>
                  <td className="border border-gray-700 px-1 py-1 text-center text-xs print:text-[9px]">
                    {row.data.col2}
                  </td>
                  <td className="border border-gray-700 px-1 py-1 text-center text-xs print:text-[9px]">
                    {row.data.col3}
                  </td>
                  <td className="border border-gray-700 px-1 py-1 text-center text-xs print:text-[9px]">
                    {row.data.col4}
                  </td>
                  <td className="border border-gray-700 px-1 py-1 text-center text-xs print:text-[9px]">
                    {row.data.col6}
                  </td>
                  <td className="border border-gray-700 px-1 py-1 text-center text-xs print:text-[9px]">
                    {row.data.col7}
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-200 font-bold print:bg-gray-100">
                <td className="border border-gray-700 px-1 py-1 text-center text-xs font-bold print:text-[9px]"></td>
                <td className="border border-gray-700 px-1 py-1 text-left text-xs font-bold print:text-[9px]">மொத்தம்</td>
                <td className="border border-gray-700 px-1 py-1 text-center text-xs font-bold print:text-[9px]">
                  {tableData.serviceCenter.total.data.col1}
                </td>
                <td className="border border-gray-700 px-1 py-1 text-center text-xs font-bold print:text-[9px]">
                  {tableData.serviceCenter.total.data.col2}
                </td>
                <td className="border border-gray-700 px-1 py-1 text-center text-xs font-bold print:text-[9px]">
                  {tableData.serviceCenter.total.data.col3}
                </td>
                <td className="border border-gray-700 px-1 py-1 text-center text-xs font-bold print:text-[9px]">
                  {tableData.serviceCenter.total.data.col4}
                </td>
                <td className="border border-gray-700 px-1 py-1 text-center text-xs font-bold print:text-[9px]">
                  {tableData.serviceCenter.total.data.col6}
                </td>
                <td className="border border-gray-700 px-1 py-1 text-center text-xs font-bold print:text-[9px]">
                  {tableData.serviceCenter.total.data.col7}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="text-xs mt-1 print:text-[9px]">{tableData.serviceCenter.eGovernance}</div>
        </div>

        {/* MSC Section */}
        <div className="w-64">
          <div className="text-sm font-bold mb-2 print:text-xs">{tableData.mscData.title}</div>
          <table className="w-full border-collapse border border-gray-700 text-xs print:text-[9px]">
            <thead>
              <tr className="bg-gray-200 print:bg-gray-100">
                <th colSpan={2} className="border border-gray-700 px-1 py-1 text-center font-bold">
                  During Month
                </th>
                <th colSpan={2} className="border border-gray-700 px-1 py-1 text-center font-bold">
                  Upto Month
                </th>
              </tr>
              <tr className="bg-gray-100 print:bg-gray-50">
                <th className="border border-gray-700 px-1 py-1 text-center font-semibold">Income</th>
                <th className="border border-gray-700 px-1 py-1 text-center font-semibold">Expenses</th>
                <th className="border border-gray-700 px-1 py-1 text-center font-semibold">Income</th>
                <th className="border border-gray-700 px-1 py-1 text-center font-semibold">Expenses</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white">
                <td className="border border-gray-700 px-1 py-1 text-center text-xs print:text-[9px]"></td>
                <td className="border border-gray-700 px-1 py-1 text-center text-xs print:text-[9px]"></td>
                <td className="border border-gray-700 px-1 py-1 text-center text-xs print:text-[9px]"></td>
                <td className="border border-gray-700 px-1 py-1 text-center text-xs print:text-[9px]"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Yearly Data Section */}
      <div className="mb-4">
        <div className="text-sm font-bold mb-2 print:text-xs">{tableData.yearlyData.title}</div>
        <table className="w-full border-collapse border border-gray-700 text-xs print:text-[9px]">
          <thead>
            <tr className="bg-gray-200 print:bg-gray-100">
              <th className="border border-gray-700 px-1 py-1 text-center font-bold">வ. எண்</th>
              <th className="border border-gray-700 px-1 py-1 text-center font-bold">ஆண்டு</th>
              <th colSpan={2} className="border border-gray-700 px-1 py-1 text-center font-bold">
                கணக்கு நிலை கணக்கு
              </th>
              <th className="border border-gray-700 px-1 py-1 text-center font-bold">வகுப்பு</th>
              <th colSpan={3} className="border border-gray-700 px-1 py-1 text-center font-bold">
                கணக்கை நிலை பெறுபேறு எனது
              </th>
            </tr>
            <tr className="bg-gray-100 print:bg-gray-50">
              <th className="border border-gray-700 px-1 py-1 text-center font-semibold"></th>
              <th className="border border-gray-700 px-1 py-1 text-center font-semibold"></th>
              <th className="border border-gray-700 px-1 py-1 text-center font-semibold">இலாபம்</th>
              <th className="border border-gray-700 px-1 py-1 text-center font-semibold">நட்டம்</th>
              <th className="border border-gray-700 px-1 py-1 text-center font-semibold"></th>
              <th className="border border-gray-700 px-1 py-1 text-center font-semibold">இலாபம்</th>
              <th className="border border-gray-700 px-1 py-1 text-center font-semibold">நட்டம்</th>
              <th className="border border-gray-700 px-1 py-1 text-center font-semibold">கணக்கு</th>
            </tr>
          </thead>
          <tbody>
            {tableData.yearlyData.rows.map((row: any) => (
              <tr key={row.sno} className="bg-white">
                <td className="border border-gray-700 px-1 py-1 text-center text-xs print:text-[9px]">{row.sno}</td>
                <td className="border border-gray-700 px-1 py-1 text-center text-xs print:text-[9px]">{row.year}</td>
                <td className="border border-gray-700 px-1 py-1 text-center text-xs print:text-[9px]">{row.profit}</td>
                <td className="border border-gray-700 px-1 py-1 text-center text-xs print:text-[9px]">{row.loss}</td>
                <td className="border border-gray-700 px-1 py-1 text-center text-xs print:text-[9px]">{row.grade}</td>
                <td className="border border-gray-700 px-1 py-1 text-center text-xs print:text-[9px]">
                  {row.balance1}
                </td>
                <td className="border border-gray-700 px-1 py-1 text-center text-xs print:text-[9px]">
                  {row.balance2}
                </td>
                <td className="border border-gray-700 px-1 py-1 text-center text-xs print:text-[9px]">{row.account}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
