"use client"

import { Card, CardContent } from "@/components/ui/card"

export default function Page16Form() {
  const loanData = [
    {
      id: 1,
      details: "ST (SAO) KCC",
      no: "440",
      principal: "249.04",
      interest: "12.02",
      penalInterest: "",
      otherCharges: "",
      total: "261.06",
    },
    {
      id: null,
      details: "ST - KCC AH WCL",
      no: "164",
      principal: "86.40",
      interest: "3.57",
      penalInterest: "",
      otherCharges: "",
      total: "89.97",
    },
    {
      id: null,
      details: "(ST (SAO) Total",
      no: "604",
      principal: "335.44",
      interest: "15.60",
      penalInterest: "",
      otherCharges: "",
      total: "351.04",
    },
    {
      id: 2,
      details: "ST Resheduled",
      no: "",
      principal: "",
      interest: "",
      penalInterest: "",
      otherCharges: "",
      total: "",
    },
    {
      id: 3,
      details: "MT (Agri)",
      no: "75",
      principal: "31.03",
      interest: "(0.73)",
      penalInterest: "",
      otherCharges: "",
      total: "30.30",
    },
    {
      id: 4,
      details: "MTC/ MTCR",
      no: "",
      principal: "",
      interest: "",
      penalInterest: "",
      otherCharges: "",
      total: "",
    },
    {
      id: 5,
      details: "MT Resheduled",
      no: "",
      principal: "",
      interest: "",
      penalInterest: "",
      otherCharges: "",
      total: "",
    },
    {
      id: 6,
      details: "NFS Loan",
      no: "3",
      principal: "0.53",
      interest: "0.05",
      penalInterest: "",
      otherCharges: "",
      total: "0.58",
    },
    {
      id: 7,
      details: "Jewel Loans",
      no: "871",
      principal: "661.10",
      interest: "48.25",
      penalInterest: "",
      otherCharges: "",
      total: "709.35",
    },
    {
      id: 8,
      details: "House Constrution Loans",
      no: "",
      principal: "",
      interest: "",
      penalInterest: "",
      otherCharges: "",
      total: "",
    },
    {
      id: 9,
      details: "Housing Mortagage Loans",
      no: "",
      principal: "",
      interest: "",
      penalInterest: "",
      otherCharges: "",
      total: "",
    },
    {
      id: 10,
      details: "SHG",
      no: "16",
      principal: "17.08",
      interest: "0.45",
      penalInterest: "",
      otherCharges: "",
      total: "17.53",
    },
    {
      id: 11,
      details: "Professional Loans",
      no: "",
      principal: "",
      interest: "",
      penalInterest: "",
      otherCharges: "",
      total: "",
    },
    {
      id: 12,
      details: "Petty Traders Loans",
      no: "",
      principal: "",
      interest: "",
      penalInterest: "",
      otherCharges: "",
      total: "",
    },
    {
      id: 13,
      details: "Women Entreneurs",
      no: "",
      principal: "",
      interest: "",
      penalInterest: "",
      otherCharges: "",
      total: "",
    },
    {
      id: 14,
      details: "Working Women",
      no: "",
      principal: "",
      interest: "",
      penalInterest: "",
      otherCharges: "",
      total: "",
    },
    {
      id: 15,
      details: "Revamped Micro Credit",
      no: "",
      principal: "",
      interest: "",
      penalInterest: "",
      otherCharges: "",
      total: "",
    },
    {
      id: 16,
      details: "Meternity Loan",
      no: "",
      principal: "",
      interest: "",
      penalInterest: "",
      otherCharges: "",
      total: "",
    },
    {
      id: 17,
      details: "Education Loan",
      no: "",
      principal: "",
      interest: "",
      penalInterest: "",
      otherCharges: "",
      total: "",
    },
    {
      id: 18,
      details: "Differently Abled Person",
      no: "11",
      principal: "2.57",
      interest: "(0.07)",
      penalInterest: "",
      otherCharges: "",
      total: "2.50",
    },
    {
      id: 19,
      details: "SGSY",
      no: "",
      principal: "",
      interest: "",
      penalInterest: "",
      otherCharges: "",
      total: "",
    },
    {
      id: 20,
      details: "TABCEDCO",
      no: "2",
      principal: "0.79",
      interest: "0.07",
      penalInterest: "",
      otherCharges: "",
      total: "0.86",
    },
    {
      id: 21,
      details: "TAMCO",
      no: "",
      principal: "",
      interest: "",
      penalInterest: "",
      otherCharges: "",
      total: "",
    },
    {
      id: 22,
      details: "THADCO",
      no: "",
      principal: "",
      interest: "",
      penalInterest: "",
      otherCharges: "",
      total: "",
    },
    {
      id: 23,
      details: "Consumer Loan",
      no: "1",
      principal: "0.10",
      interest: "0.01",
      penalInterest: "",
      otherCharges: "",
      total: "0.11",
    },
    {
      id: 24,
      details: "Pensioners Loan",
      no: "",
      principal: "",
      interest: "",
      penalInterest: "",
      otherCharges: "",
      total: "",
    },
    {
      id: 25,
      details: "Salary Loan",
      no: "",
      principal: "",
      interest: "",
      penalInterest: "",
      otherCharges: "",
      total: "",
    },
    {
      id: 26,
      details: "Other Loans",
      no: "18",
      principal: "7.87",
      interest: "0.23",
      penalInterest: "",
      otherCharges: "",
      total: "8.10",
    },
    {
      id: 27,
      details: "Total Loans",
      no: "1601",
      principal: "1056.51",
      interest: "63.87",
      penalInterest: "",
      otherCharges: "",
      total: "1120.38",
    },
    {
      id: 28,
      details: "Overdue More than 6 Months",
      no: "",
      principal: "",
      interest: "",
      penalInterest: "",
      otherCharges: "",
      total: "",
    },
    {
      id: 29,
      details: "Cover Under Legal Action",
      no: "17",
      principal: "1.14",
      interest: "",
      penalInterest: "",
      otherCharges: "",
      total: "1.14",
    },
    {
      id: 30,
      details: "Amount Not Coverd",
      no: "(17)",
      principal: "(1.14)",
      interest: "",
      penalInterest: "",
      otherCharges: "",
      total: "(1.14)",
    },
  ]

  return (
    <div className="w-full bg-white" style={{ minHeight: "210mm", width: "297mm", margin: "0 auto" }}>
      <Card className="w-full h-full">
        <CardContent className="p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-xl font-bold text-center mb-4">Annexure - V</h1>
            <div className="flex">
              <div className="w-1/3">
                <p className="font-semibold">Name of the PACCS:</p>
              </div>
              <div className="w-2/3">
                <p>S.331.Edanganasalai PACCS Ltd</p>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-black text-sm">
              <thead>
                <tr>
                  <th rowSpan={2} className="border border-black p-2 text-center font-medium w-12">
                    Sl. No
                  </th>
                  <th rowSpan={2} className="border border-black p-2 text-center font-medium w-48">
                    Details
                  </th>
                  <th rowSpan={2} className="border border-black p-2 text-center font-medium w-16">
                    No
                  </th>
                  <th colSpan={5} className="border border-black p-2 text-center font-medium">
                    AT PACS LEVEL (PACCS TO Members)
                  </th>
                </tr>
                <tr>
                  <th className="border border-black p-2 text-center font-medium w-24">Principal</th>
                  <th className="border border-black p-2 text-center font-medium w-24">Interest</th>
                  <th className="border border-black p-2 text-center font-medium w-24">Penal Interest</th>
                  <th className="border border-black p-2 text-center font-medium w-24">Other Charges</th>
                  <th className="border border-black p-2 text-center font-medium w-24">Total</th>
                </tr>
              </thead>
              <tbody>
                {loanData.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-black p-2 text-center">{row.id}</td>
                    <td className="border border-black p-2 text-left">{row.details}</td>
                    <td className="border border-black p-2 text-center">{row.no}</td>
                    <td className="border border-black p-2 text-right">{row.principal}</td>
                    <td className="border border-black p-2 text-right">{row.interest}</td>
                    <td className="border border-black p-2 text-center">{row.penalInterest}</td>
                    <td className="border border-black p-2 text-center">{row.otherCharges}</td>
                    <td className="border border-black p-2 text-right">{row.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
