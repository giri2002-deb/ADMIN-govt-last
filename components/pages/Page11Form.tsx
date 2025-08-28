
"use client"

import { useState } from "react"

interface TableData {
  serialNo: number
  loanType: string
  loanRequirement: string
  price: string
  loanAmount: string
  interestRate: string
  totalAmount: string
  subsidy: string
  netAmount: string
  processingFee: string
  insurance: string
  totalDeduction: string
  finalAmount: string
  balance: string
}

interface Table3Data {
  serialNo: number
  loanType: string
  col1: string
  col2: string
  col3: string
  col4: string
  col5: string
  col6: string
  col7: string
  col8: string
  col9: string
  col10: string
  col11: string
  total: string
}

interface ReportData {
  header: {
    title: string
    code: string
    date: string
  }
  tables: {
    table1: {
      title: string
      data: TableData[]
    }
    table2: {
      title: string
      data: TableData[]
    }
    table3: {
      title: string
      data: Table3Data[]
    }
  }
  footer: {
    designation: string
    organization: string
  }
}

export default function TamilLoanReport() {
  const [reportData, setReportData] = useState<ReportData>(
    {
      header: {
        title: "S.331.இடங்கனாசலை PACCS Ltd",
        code: "ந.க.எண்801/96/ஏ 9",
        date: "ஏப்ரல்-2025",
      },
      tables: {
        table1: {
          title: "(1) இதர்க்க வேளாண்ணிமை கூட்டுறவு கடன் சங்க நன்க கர்க்கடன் கர்ப்பு அறிக்கை:",
          data: [
            {
              serialNo: 1,
              loanType: "JL CC",
              loanRequirement: "120.00",
              price: "662.05",
              loanAmount: "66.53",
              interestRate: "67.48",
              totalAmount: "661.10",
              subsidy: "-",
              netAmount: "661.10",
              processingFee: "114.76",
              insurance: "0.96",
              totalDeduction: "-",
              finalAmount: "115.72",
              balance: "545.38",
            },
          ],
        },
        table2: {
          title: "(1) இதர்க்க வேளாண்ணிமை கூட்டுறவு கடன் சங்க நன்க நன்க கர்க்கடன் பேரில் பயிர்க்கள் கர்ப்பு அறிக்கை:",
          data: [
            {
              serialNo: 1,
              loanType: "ST - KCC AH WCL",
              loanRequirement: "89.00",
              price: "86.56",
              loanAmount: "-",
              interestRate: "2.16",
              totalAmount: "86.40",
              subsidy: "-",
              netAmount: "86.40",
              processingFee: "87.12",
              insurance: "-",
              totalDeduction: "1.80",
              finalAmount: "85.32",
              balance: "1.08",
            },
          ],
        },
        table3: {
          title: "(1) இதர்க்க வேளாண்ணிமை கூட்டுறவு கடன் சங்க PDS & NON PDS கர்ப்பு அறிக்கை:",
          data: [
            {
              serialNo: 1,
              loanType: "PDS CC",
              col1: "-",
              col2: "3.72",
              col3: "2.30",
              col4: "2.06",
              col5: "3.96",
              col6: "0.40",
              col7: "3.56",
              col8: "-",
              col9: "-",
              col10: "-",
              col11: "-",
              total: "3.56",
            },
            {
              serialNo: 2,
              loanType: "NON PDS CC",
              col1: "-",
              col2: "4.52",
              col3: "-",
              col4: "0.41",
              col5: "4.11",
              col6: "0.62",
              col7: "3.50",
              col8: "-",
              col9: "-",
              col10: "-",
              col11: "-",
              total: "3.50",
            },
          ],
        },
      },
      footer: {
        designation: "SECRETARY",
        organization: "S.331.இடங்கனாசலை PACCS Ltd",
      },
    }
  )

  const updateTableData = (tableKey: string, rowIndex: number, field: string, value: string) => {
    const newData = {
      ...reportData,
      tables: {
        ...reportData.tables,
        [tableKey]: {
          ...reportData.tables[tableKey as keyof typeof reportData.tables],
          data: reportData.tables[tableKey as keyof typeof reportData.tables].data.map((row: any, index: number) =>
            index === rowIndex ? { ...row, [field]: value } : row
          ),
        },
      },
    }

    setReportData(newData)
  }

  const updateHeaderData = (field: string, value: string) => {
    const newData = {
      ...reportData,
      header: {
        ...reportData.header,
        [field]: value,
      },
    }

    setReportData(newData)
  }

  const updateFooterData = (field: string, value: string) => {
    const newData = {
      ...reportData,
      footer: {
        ...reportData.footer,
        [field]: value,
      },
    }

    setReportData(newData)
  }

  const addRow = (tableKey: string) => {
    const newData = { ...reportData }
    const table = newData.tables[tableKey as keyof typeof newData.tables]
    
    if (tableKey === 'table3') {
      const newRow = {
        serialNo: table.data.length + 1,
        loanType: "",
        col1: "-",
        col2: "",
        col3: "",
        col4: "",
        col5: "",
        col6: "",
        col7: "",
        col8: "-",
        col9: "-",
        col10: "-",
        col11: "-",
        total: "",
      }
      ;(table.data as Table3Data[]).push(newRow)
    } else {
      const newRow = {
        serialNo: table.data.length + 1,
        loanType: "",
        loanRequirement: "",
        price: "",
        loanAmount: "",
        interestRate: "",
        totalAmount: "",
        subsidy: "-",
        netAmount: "",
        processingFee: "",
        insurance: "",
        totalDeduction: "",
        finalAmount: "",
        balance: "",
      }
      ;(table.data as TableData[]).push(newRow)
    }

    setReportData(newData)
  }

  return (
    <div className="w-[1123px] h-auto mx-auto bg-white border-2 border-black p-3 text-xs font-mono">
      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <input
            type="text"
            value={reportData.header.title}
            onChange={(e) => updateHeaderData("title", e.target.value)}
            className="text-sm font-bold bg-transparent border-none outline-none w-full"
          />
          <input
            type="text"
            value={reportData.header.code}
            onChange={(e) => updateHeaderData("code", e.target.value)}
            className="text-xs bg-transparent border-none outline-none w-full"
          />
        </div>
        <div className="text-right flex-1">
          <input
            type="text"
            value={reportData.header.date}
            onChange={(e) => updateHeaderData("date", e.target.value)}
            className="font-bold text-sm bg-transparent border-none outline-none text-right w-full"
          />
        </div>
      </div>

      {/* Table 1 */}
      <div className="mb-2">
        <div className="flex justify-between items-center mb-1">
          <h2 className="text-xs font-bold">{reportData.tables.table1.title}</h2>
          <button
            onClick={() => addRow("table1")}
            className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 print:hidden"
          >
            Add Row
          </button>
        </div>
        <div className="border-2 border-black">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-black p-1 text-[9px] font-bold w-8">வ.<br/>எண்</th>
                <th className="border border-black p-1 text-[9px] font-bold w-20">கர்க்க கடன் விபரம்</th>
                <th className="border border-black p-1 text-[9px] font-bold w-16">கர்க்க கடன்<br/>அளவு</th>
                <th className="border border-black p-1 text-[9px] font-bold w-16">இதர்ய திறனாள</th>
                <th className="border border-black p-1 text-[9px] font-bold w-12">கடன்<br/>வட்டி கடன்</th>
                <th className="border border-black p-1 text-[9px] font-bold w-12">கடன் அளவு</th>
                <th className="border border-black p-1 text-[9px] font-bold w-16">மொத்த இறுதிய<br/>திறனாள</th>
                <th className="border border-black p-1 text-[9px] font-bold w-16">மானிய கடன்<br/>திறனாள</th>
                <th className="border border-black p-1 text-[9px] font-bold w-16">கர்ப்பு திறல்<br/>உதவி</th>
                <th className="border border-black p-1 text-[9px] font-bold w-12">கர்க்க கடன்<br/>விலை</th>
                <th className="border border-black p-1 text-[9px] font-bold w-12">கர்க்க கடன்<br/>விலை</th>
                <th className="border border-black p-1 text-[9px] font-bold w-16">மொத்த இறுதிய<br/>திறனாள</th>
                <th className="border border-black p-1 text-[9px] font-bold w-12">கர்ப்பு<br/>அதிகம்</th>
                <th className="border border-black p-1 text-[9px] font-bold w-12">or<br/>திறனாள</th>
              </tr>
            </thead>
            <tbody>
              {reportData.tables.table1.data.map((row, index) => (
                <tr key={index}>
                  <td className="border border-black p-1 text-center font-bold">{row.serialNo}</td>
                  <td className="border border-black p-1">
                    <input
                      type="text"
                      value={row.loanType}
                      onChange={(e) => updateTableData("table1", index, "loanType", e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-center text-xs"
                    />
                  </td>
                  <td className="border border-black p-1">
                    <input
                      type="text"
                      value={row.loanRequirement}
                      onChange={(e) => updateTableData("table1", index, "loanRequirement", e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-center text-xs"
                    />
                  </td>
                  <td className="border border-black p-1">
                    <input
                      type="text"
                      value={row.price}
                      onChange={(e) => updateTableData("table1", index, "price", e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-center text-xs"
                    />
                  </td>
                  <td className="border border-black p-1">
                    <input
                      type="text"
                      value={row.loanAmount}
                      onChange={(e) => updateTableData("table1", index, "loanAmount", e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-center text-xs"
                    />
                  </td>
                  <td className="border border-black p-1">
                    <input
                      type="text"
                      value={row.interestRate}
                      onChange={(e) => updateTableData("table1", index, "interestRate", e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-center text-xs"
                    />
                  </td>
                  <td className="border border-black p-1">
                    <input
                      type="text"
                      value={row.totalAmount}
                      onChange={(e) => updateTableData("table1", index, "totalAmount", e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-center text-xs"
                    />
                  </td>
                  <td className="border border-black p-1">
                    <input
                      type="text"
                      value={row.subsidy}
                      onChange={(e) => updateTableData("table1", index, "subsidy", e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-center text-xs"
                    />
                  </td>
                  <td className="border border-black p-1">
                    <input
                      type="text"
                      value={row.netAmount}
                      onChange={(e) => updateTableData("table1", index, "netAmount", e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-center text-xs"
                    />
                  </td>
                  <td className="border border-black p-1">
                    <input
                      type="text"
                      value={row.processingFee}
                      onChange={(e) => updateTableData("table1", index, "processingFee", e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-center text-xs"
                    />
                  </td>
                  <td className="border border-black p-1">
                    <input
                      type="text"
                      value={row.insurance}
                      onChange={(e) => updateTableData("table1", index, "insurance", e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-center text-xs"
                    />
                  </td>
                  <td className="border border-black p-1">
                    <input
                      type="text"
                      value={row.totalDeduction}
                      onChange={(e) => updateTableData("table1", index, "totalDeduction", e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-center text-xs"
                    />
                  </td>
                  <td className="border border-black p-1">
                    <input
                      type="text"
                      value={row.finalAmount}
                      onChange={(e) => updateTableData("table1", index, "finalAmount", e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-center text-xs"
                    />
                  </td>
                  <td className="border border-black p-1">
                    <input
                      type="text"
                      value={row.balance}
                      onChange={(e) => updateTableData("table1", index, "balance", e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-center text-xs"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Table 2 */}
      <div className="mb-2">
        <div className="flex justify-between items-center mb-1">
          <h2 className="text-xs font-bold">{reportData.tables.table2.title}</h2>
          <button
            onClick={() => addRow("table2")}
            className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 print:hidden"
          >
            Add Row
          </button>
        </div>
        <div className="border-2 border-black">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-black p-1 text-[9px] font-bold w-8">வ.<br/>எண்</th>
                <th className="border border-black p-1 text-[9px] font-bold w-20">கர்க்க கடன் விபரம்</th>
                <th className="border border-black p-1 text-[9px] font-bold w-16">கர்க்க கடன்<br/>அளவு</th>
                <th className="border border-black p-1 text-[9px] font-bold w-16">இதர்ய திறனாள</th>
                <th className="border border-black p-1 text-[9px] font-bold w-12">கடன்<br/>வட்டி கடன்</th>
                <th className="border border-black p-1 text-[9px] font-bold w-12">கடன் அளவு</th>
                <th className="border border-black p-1 text-[9px] font-bold w-16">மொத்த இறுதிய<br/>திறனாள</th>
                <th className="border border-black p-1 text-[9px] font-bold w-16">மானிய கடன்<br/>திறனாள</th>
                <th className="border border-black p-1 text-[9px] font-bold w-16">கர்ப்பு திறல்<br/>உதவி</th>
                <th className="border border-black p-1 text-[9px] font-bold w-12">கர்க்க கடன்<br/>விலை</th>
                <th className="border border-black p-1 text-[9px] font-bold w-12">கர்க்க கடன்<br/>விலை</th>
                <th className="border border-black p-1 text-[9px] font-bold w-16">மொத்த இறுதிய<br/>திறனாள</th>
                <th className="border border-black p-1 text-[9px] font-bold w-12">கர்ப்பு<br/>அதிகம்</th>
                <th className="border border-black p-1 text-[9px] font-bold w-12">or<br/>திறனாள</th>
              </tr>
            </thead>
            <tbody>
              {reportData.tables.table2.data.map((row, index) => (
                <tr key={index}>
                  <td className="border border-black p-1 text-center font-bold">{row.serialNo}</td>
                  <td className="border border-black p-1">
                    <input
                      type="text"
                      value={row.loanType}
                      onChange={(e) => updateTableData("table2", index, "loanType", e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-center text-xs"
                    />
                  </td>
                  <td className="border border-black p-1">
                    <input
                      type="text"
                      value={row.loanRequirement}
                      onChange={(e) => updateTableData("table2", index, "loanRequirement", e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-center text-xs"
                    />
                  </td>
                  <td className="border border-black p-1">
                    <input
                      type="text"
                      value={row.price}
                      onChange={(e) => updateTableData("table2", index, "price", e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-center text-xs"
                    />
                  </td>
                  <td className="border border-black p-1">
                    <input
                      type="text"
                      value={row.loanAmount}
                      onChange={(e) => updateTableData("table2", index, "loanAmount", e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-center text-xs"
                    />
                  </td>
                  <td className="border border-black p-1">
                    <input
                      type="text"
                      value={row.interestRate}
                      onChange={(e) => updateTableData("table2", index, "interestRate", e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-center text-xs"
                    />
                  </td>
                  <td className="border border-black p-1">
                    <input
                      type="text"
                      value={row.totalAmount}
                      onChange={(e) => updateTableData("table2", index, "totalAmount", e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-center text-xs"
                    />
                  </td>
                  <td className="border border-black p-1">
                    <input
                      type="text"
                      value={row.subsidy}
                      onChange={(e) => updateTableData("table2", index, "subsidy", e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-center text-xs"
                    />
                  </td>
                  <td className="border border-black p-1">
                    <input
                      type="text"
                      value={row.netAmount}
                      onChange={(e) => updateTableData("table2", index, "netAmount", e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-center text-xs"
                    />
                  </td>
                  <td className="border border-black p-1">
                    <input
                      type="text"
                      value={row.processingFee}
                      onChange={(e) => updateTableData("table2", index, "processingFee", e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-center text-xs"
                    />
                  </td>
                  <td className="border border-black p-1">
                    <input
                      type="text"
                      value={row.insurance}
                      onChange={(e) => updateTableData("table2", index, "insurance", e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-center text-xs"
                    />
                  </td>
                  <td className="border border-black p-1">
                    <input
                      type="text"
                      value={row.totalDeduction}
                      onChange={(e) => updateTableData("table2", index, "totalDeduction", e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-center text-xs"
                    />
                  </td>
                  <td className="border border-black p-1">
                    <input
                      type="text"
                      value={row.finalAmount}
                      onChange={(e) => updateTableData("table2", index, "finalAmount", e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-center text-xs"
                    />
                  </td>
                  <td className="border border-black p-1">
                    <input
                      type="text"
                      value={row.balance}
                      onChange={(e) => updateTableData("table2", index, "balance", e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-center text-xs"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Table 3 */}
      <div className="mb-2">
        <div className="flex justify-between items-center mb-1">
          <h2 className="text-xs font-bold">{reportData.tables.table3.title}</h2>
          <button
            onClick={() => addRow("table3")}
            className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 print:hidden"
          >
            Add Row
          </button>
        </div>
        <div className="border-2 border-black">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-black p-1 text-[9px] font-bold w-8">வ.<br/>எண்</th>
                <th className="border border-black p-1 text-[9px] font-bold w-20">கர்க்க கடன் விபரம்</th>
                <th className="border border-black p-1 text-[9px] font-bold w-12">கர்க்க கடன்<br/>அளவு</th>
                <th className="border border-black p-1 text-[9px] font-bold w-12">இதர்ய திறனாள</th>
                <th className="border border-black p-1 text-[9px] font-bold w-12">செலவுகள்</th>
                <th className="border border-black p-1 text-[9px] font-bold w-12">விற்பனை</th>
                <th className="border border-black p-1 text-[9px] font-bold w-16">மொத்த இறுதிய<br/>திறனாள</th>
                <th className="border border-black p-1 text-[9px] font-bold w-20">விற்பனை PDS-<br/>10% NON-PDS-<br/>15%</th>
                <th className="border border-black p-1 text-[9px] font-bold w-16">கர்ப்பு திறல்<br/>உதவி</th>
                <th className="border border-black p-1 text-[9px] font-bold w-12">ஆதாய<br/>திறனாள</th>
                <th className="border border-black p-1 text-[9px] font-bold w-12">கர்க்க கடன்<br/>விலை</th>
                <th className="border border-black p-1 text-[9px] font-bold w-12">கர்க்க கடன்<br/>விலை</th>
                <th className="border border-black p-1 text-[9px] font-bold w-16">மொத்த இறுதிய<br/>திறனாள</th>
                <th className="border border-black p-1 text-[9px] font-bold w-12">கர்ப்பு<br/>அதிகம்</th>
                <th className="border border-black p-1 text-[9px] font-bold w-12">or<br/>திறனாள</th>
              </tr>
            </thead>
            <tbody>
              {reportData.tables.table3.data.map((row, index) => (
                <tr key={index}>
                  <td className="border border-black p-1 text-center font-bold">{row.serialNo}</td>
                  <td className="border border-black p-1">
                    <input
                      type="text"
                      value={row.loanType}
                      onChange={(e) => updateTableData("table3", index, "loanType", e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-center text-xs"
                    />
                  </td>
                  <td className="border border-black p-1">
                    <input
                      type="text"
                      value={row.col1}
                      onChange={(e) => updateTableData("table3", index, "col1", e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-center text-xs"
                    />
                  </td>
                  <td className="border border-black p-1">
                    <input
                      type="text"
                      value={row.col2}
                      onChange={(e) => updateTableData("table3", index, "col2", e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-center text-xs"
                    />
                  </td>
                  <td className="border border-black p-1">
                    <input
                      type="text"
                      value={row.col3}
                      onChange={(e) => updateTableData("table3", index, "col3", e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-center text-xs"
                    />
                  </td>
                  <td className="border border-black p-1">
                    <input
                      type="text"
                      value={row.col4}
                      onChange={(e) => updateTableData("table3", index, "col4", e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-center text-xs"
                    />
                  </td>
                  <td className="border border-black p-1">
                    <input
                      type="text"
                      value={row.col5}
                      onChange={(e) => updateTableData("table3", index, "col5", e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-center text-xs"
                    />
                  </td>
                  <td className="border border-black p-1">
                    <input
                      type="text"
                      value={row.col6}
                      onChange={(e) => updateTableData("table3", index, "col6", e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-center text-xs"
                    />
                  </td>
                  <td className="border border-black p-1">
                    <input
                      type="text"
                      value={row.col7}
                      onChange={(e) => updateTableData("table3", index, "col7", e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-center text-xs"
                    />
                  </td>
                  <td className="border border-black p-1">
                    <input
                      type="text"
                      value={row.col8}
                      onChange={(e) => updateTableData("table3", index, "col8", e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-center text-xs"
                    />
                  </td>
                  <td className="border border-black p-1">
                    <input
                      type="text"
                      value={row.col9}
                      onChange={(e) => updateTableData("table3", index, "col9", e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-center text-xs"
                    />
                  </td>
                  <td className="border border-black p-1">
                    <input
                      type="text"
                      value={row.col10}
                      onChange={(e) => updateTableData("table3", index, "col10", e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-center text-xs"
                    />
                  </td>
                  <td className="border border-black p-1">
                    <input
                      type="text"
                      value={row.col11}
                      onChange={(e) => updateTableData("table3", index, "col11", e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-center text-xs"
                    />
                  </td>
                  <td className="border border-black p-1">
                    <input
                      type="text"
                      value={row.total}
                      onChange={(e) => updateTableData("table3", index, "total", e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-center text-xs"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="text-right mt-4 space-y-1">
        <input
          type="text"
          value={reportData.footer.designation}
          onChange={(e) => updateFooterData("designation", e.target.value)}
          className="font-bold text-sm bg-transparent border-none outline-none text-right w-full"
        />
        <input
          type="text"
          value={reportData.footer.organization}
          onChange={(e) => updateFooterData("organization", e.target.value)}
          className="font-bold text-sm bg-transparent border-none outline-none text-right w-full"
        />
      </div>

      {/* Print Buttons */}
   
    </div>
  )
}
