"use client"

import { useEffect, useState } from "react"
import { getAmountInTamilWords } from "@/utils/tamil-numbers"

interface MemberData {
  id: string
  serialNo: string
  memberName: string
  fatherName: string
  loanType: string
  amount: number
  selectedKccahLoan?: {
    கடன்_வகை: string
    விதை: number
    ரொக்கம்: number
    மொத்தம்: number
    dynamicUnits?: number
    திட்ட_அளவு?: string
    dynamicTotal?: number
  }
}

interface BreakdownRow {
  serialNo: number
  loanType: string
  members: number
  units: number
  otherExpenses: number
  rawMaterials: number
  totalAmount: number
  rowTotal: number
}

interface KCCBreakdownTableProps {
  members?: MemberData[] | null
}

export default function KCCBreakdownTable({ members }: KCCBreakdownTableProps) {
  const [breakdownData, setBreakdownData] = useState<BreakdownRow[]>([])
  const [totals, setTotals] = useState({
    members: 0,
    units: 0,
    otherExpenses: 0,
    rawMaterials: 0,
    totalAmount: 0,
    rowTotal: 0
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    
    if (!members || members.length === 0) {
      setBreakdownData([])
      setTotals({
        members: 0,
        units: 0,
        otherExpenses: 0,
        rawMaterials: 0,
        totalAmount: 0,
        rowTotal: 0
      })
      setIsLoading(false)
      return
    }

    try {
      // Group members by loan type
      const groupedByLoanType: Record<string, BreakdownRow> = {}
      
      members.forEach((member) => {
        const loanType = member.selectedKccahLoan?.கடன்_வகை || member.loanType || "சிறிய பால் பண்ணை"
        const otherExpenses = member.selectedKccahLoan?.விதை || 0
        const rawMaterials = member.selectedKccahLoan?.ரொக்கம் || 0
        const totalAmount = member.selectedKccahLoan?.மொத்தம் || member.selectedKccahLoan?.dynamicTotal || member.amount || 0
        const units = member.selectedKccahLoan?.dynamicUnits || 1
        
        if (!groupedByLoanType[loanType]) {
          groupedByLoanType[loanType] = {
            serialNo: Object.keys(groupedByLoanType).length + 1,
            loanType,
            members: 0,
            units: 0,
            otherExpenses: 0,
            rawMaterials: 0,
            totalAmount: 0,
            rowTotal: 0
          }
        }
        
        groupedByLoanType[loanType].members += 1
        groupedByLoanType[loanType].units += units
        groupedByLoanType[loanType].otherExpenses += otherExpenses * units
        groupedByLoanType[loanType].rawMaterials += rawMaterials * units
        groupedByLoanType[loanType].totalAmount += totalAmount * units
        groupedByLoanType[loanType].rowTotal += (otherExpenses + rawMaterials + totalAmount) * units
      })
      
      const rows = Object.values(groupedByLoanType)
      setBreakdownData(rows)

      const calculatedTotals = rows.reduce((acc, row) => ({
        members: acc.members + row.members,
        units: acc.units + row.units,
        otherExpenses: acc.otherExpenses + row.otherExpenses,
        rawMaterials: acc.rawMaterials + row.rawMaterials,
        totalAmount: acc.totalAmount + row.totalAmount,
        rowTotal: acc.rowTotal + row.rowTotal
      }), {
        members: 0,
        units: 0,
        otherExpenses: 0,
        rawMaterials: 0,
        totalAmount: 0,
        rowTotal: 0
      })

      setTotals(calculatedTotals)
    } catch (error) {
      console.error("Error processing member data:", error)
      setBreakdownData([])
    } finally {
      setIsLoading(false)
    }
  }, [members])

  if (isLoading) {
    return (
      <div className="my-6 p-4 bg-white rounded shadow">
        <div className="text-center p-8 text-gray-500">
          <div className="animate-pulse">Loading breakdown data...</div>
        </div>
      </div>
    )
  }

  if (!members || members.length === 0) {
    return (
      <div className="my-6 p-4 bg-white rounded shadow">
        <div className="text-center p-4 text-gray-500">No member data available</div>
      </div>
    )
  }

  return (
    <div className="my-6 p-4 bg-white ">
      <h3 className="text-lg font-bold mb-4 text-center">தொகுப்பு</h3>
      
      {breakdownData.length === 0 ? (
        <div className="text-center p-4 text-gray-500">No breakdown data available</div>
      ) : (
        <>
          <table className="w-full border border-black border-collapse text-xs">
            <thead>
              <tr>
                <th className="border border-black p-2 text-center">வ. எண்</th>
                <th className="border border-black p-2 text-center">கே.சி.சி நடைமுறை முல தன கடன் வகை</th>
                <th className="border border-black p-2 text-center">நபர்கள்</th>
                <th className="border border-black p-2 text-center">திட்ட அலகு</th>
                <th className="border border-black p-2 text-center">இதர செலவுகள்</th>
                <th className="border border-black p-2 text-center">மூல பொருட்கள்</th>
                <th className="border border-black p-2 text-center">மொத்த நடைமுறை கடன் தொகை</th>
              </tr>
            </thead>
            <tbody>
              {breakdownData.map((row) => (
                <tr key={row.serialNo}>
                  <td className="border border-black p-2 text-center">{row.serialNo}</td>
                  <td className="border border-black p-2">{row.loanType}</td>
                  <td className="border border-black p-2 text-center">{row.members}</td>
                  <td className="border border-black p-2 text-center">{row.units}</td>
                  <td className="border border-black p-2 text-right">₹{row.otherExpenses.toLocaleString('en-IN')}</td>
                  <td className="border border-black p-2 text-right">₹{row.rawMaterials.toLocaleString('en-IN')}</td>
                  <td className="border border-black p-2 text-right">₹{row.totalAmount.toLocaleString('en-IN')}</td>
                </tr>
              ))}
              <tr>
                <td className="border border-black p-2 text-center font-bold text-red-600" colSpan={2}>மொத்தம்</td>
                <td className="border border-black p-2 text-center font-bold text-red-600">{totals.members}</td>
                <td className="border border-black p-2 text-center font-bold text-red-600">{totals.units}</td>
                <td className="border border-black p-2 text-right font-bold text-red-600">₹{totals.otherExpenses.toLocaleString('en-IN')}</td>
                <td className="border border-black p-2 text-right font-bold text-red-600">₹{totals.rawMaterials.toLocaleString('en-IN')}</td>
                <td className="border border-black p-2 text-right font-bold text-red-600">₹{totals.totalAmount.toLocaleString('en-IN')}</td>
              </tr>
            </tbody>
          </table>

          <div className="mt-4 p-3 ">
            <div className="text-lg font-bold text-blue-800 text-left">
              மொத்த கடன் தொகை: ₹{totals.totalAmount.toLocaleString('en-IN')}
            </div>
            <div className="font-bold text-red-600 text-sm text-left mt-2">
              ( {getAmountInTamilWords(totals.totalAmount)} )
            </div>
          </div>
        </>
      )}
    </div>
  )
}