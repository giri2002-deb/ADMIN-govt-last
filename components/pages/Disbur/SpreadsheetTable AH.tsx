"use client"

import { useRef, useState, useEffect, useMemo } from "react"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"

// Types
interface UserCheckboxes {
  kcc: boolean
  jewel: boolean
  kccah: boolean
  tractor: boolean
}

interface UserInformation {
  pan_file: string | null
  checkboxes: UserCheckboxes
  user_photo: string | null
  pan_preview: string | null
  ration_file: string | null
  aadhaar_file: string | null
  friend_photo: string | null
  ஜாதி: string
  உ_எண்: string
  ration_preview: string | null
  aadhaar_preview: string | null
  பெயர்: string
  principle_amount: string
  user_photo_preview: string | null
  முகவரி: string
  வட்டம்: string
  [key: string]: any
}

interface SelectedKccahLoan {
  id: number
  breakdown: {
    total: {
      விதை: number
      மொத்தம்: number
      ரொக்கம்: number
    }
    perUnit: {
      விதை: number
      ரொக்கம்: number
    }
  }
  dynamicPlan: string
  dynamicTotal: number
  dynamicUnits: number
  விதை: number
  dynamicrokkam: number
  மொத்தம்: number
  ரொக்கம்: number
  கடன்_வகை: string
  திட்ட_அளவு: string
}

interface LoanDetails {
  type: string
  shareAmount: number
  selectedKccahLoan?: SelectedKccahLoan
  principleAmount: number
  totalEligibleAmount: number
}

interface Member {
  id: string
  serialNo?: string
  memberName: string
  category?: string
  aadhaarNo?: string
  accountNo?: string
  amount: number
  date?: string
  formSections?: Record<string, boolean>
  goldDetails?: any
  friendDetails?: any
  ownProperty?: any
  userInformation?: UserInformation
  loanDetails?: LoanDetails
  landArea?: number // Added land area field
}

interface SummaryRow {
  loanType: string
  count: number
  rokkam: number
  motham: number
  landArea: number // Added land area to summary
}

const ROWS_PER_PAGE = 30
export default function KccRegister() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [tableData, setTableData] = useState<Member[]>([])
  const [totalRokkam, setTotalRokkam] = useState<number>(0)
  const [totalMotham, setTotalMotham] = useState<number>(0)
  const [totalLandArea, setTotalLandArea] = useState<number>(0) // Added total land area
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    document.title = "KCC Data Register"
    const metaDescription =
      (document.querySelector('meta[name="description"]') as HTMLMetaElement) || document.createElement("meta")
    metaDescription.setAttribute("name", "description")
    metaDescription.setAttribute("content", "KCC data register with per-page printing and loan-wise summary.")
    document.head.appendChild(metaDescription)
  }, [])
const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const fetchMemberData = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_URL}/api/kccahdata`)
      if (!response.ok) throw new Error(`Failed to fetch data: ${response.statusText}`)

      const jsonData = await response.json()
      let members: Member[] = jsonData?.kccData?.members?.map(processMemberData) ?? []
      if (!Array.isArray(members) || members.length === 0) {
        members = generateSampleMembers(20)
      }

      const { totalR, totalM, totalL } = calculateTotals(members)

      setTableData(members)
      setTotalRokkam(Math.round(totalR))
      setTotalMotham(Math.round(totalM))
      setTotalLandArea(totalL) // Set total land area
    } catch (err: any) {
      console.log("Using sample data due to API unavailability")
      const members = generateSampleMembers(20)
      const { totalR, totalM, totalL } = calculateTotals(members)
      setTableData(members)
      setTotalRokkam(Math.round(totalR))
      setTotalMotham(Math.round(totalM))
      setTotalLandArea(totalL) // Set total land area
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMemberData()
  }, [])
   
  const pages = useMemo(() => chunkMembers(tableData, ROWS_PER_PAGE), [tableData])
  const loanSummary = useMemo(() => buildLoanSummary(tableData), [tableData])

  const formatNumber = (n?: number) => {
  if (n == null) return "0";
  return Math.trunc(n).toLocaleString();
};



const handleDownloadPDF = async () => {
  if (!containerRef.current) {
    alert("Container not found")
    return
  }

  if (!tableData || tableData.length === 0) {
    alert("No data available to generate PDF")
    return
  }

  const pagesEls = Array.from(
    containerRef.current.querySelectorAll<HTMLDivElement>(".pdf-page")
  )

  
  if (pagesEls.length === 0) {
    alert("No pages found to generate PDF")
    return
  }

  // 🔹 Capture the <Header /> component
  const headerEl = document.querySelector("#pdf-header") as HTMLElement
  let headerImgData: string | null = null
  let headerCanvas: HTMLCanvasElement | null = null

  if (headerEl) {
    headerCanvas = await html2canvas(headerEl, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    })
    headerImgData = headerCanvas.toDataURL("image/png", 1.0)
  }

  // ✅ Legal sheet landscape
  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "px",
    format: "legal",
  })

  const pdfWidth = pdf.internal.pageSize.getWidth()
  const pdfHeight = pdf.internal.pageSize.getHeight()

  for (let i = 0; i < pagesEls.length; i++) {
    const page = pagesEls[i]

    if (!page || page.children.length === 0) {
      console.warn(`Page ${i} is empty, skipping`)
      continue
    }

    try {
      const canvas = await html2canvas(page, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        width: page.scrollWidth,
        height: page.scrollHeight,
      })

      if (i > 0) pdf.addPage()

      let yOffset = 0 // top margin

      // ✅ Add Header (centered at top)
      if (headerImgData && headerCanvas) {
        const headerWidth = pdfWidth * 0.6
        const headerHeight =
          (headerCanvas.height * headerWidth) / headerCanvas.width
        const headerX = (pdfWidth - headerWidth) / 2
        pdf.addImage(
          headerImgData,
          "PNG",
          headerX,
          yOffset,
          headerWidth,
          headerHeight
        )

        yOffset += headerHeight + 0
      }

      // ✅ Add Page Content (center horizontally & vertically)
      const imgData = canvas.toDataURL("image/png", 1.0)
      const canvasAspectRatio = canvas.width / canvas.height

      let imgWidth = pdfWidth * 0.95
      let imgHeight = imgWidth / canvasAspectRatio

      // scale down if too tall
      if (imgHeight > pdfHeight - yOffset - 20) {
        imgHeight = pdfHeight - yOffset - 20
        imgWidth = imgHeight * canvasAspectRatio
      }

      const x = (pdfWidth - imgWidth) / 2
      const y = yOffset + (pdfHeight - yOffset - imgHeight) / 2

      pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight)
    } catch (error) {
      console.error("Error generating PDF page:", error)
      alert(`Error generating PDF page ${i + 1}: ${error}`)
    }
  }

  pdf.save("kcc-data-register.pdf")
}
  if (loading) return <div className="p-6 text-center">Loading data...</div>
  if (error) return <div className="p-6 text-center text-red-600">Error: {error}</div>

  return (
    <div className="min-h-screen bg-white flex flex-col ">
      <div className="w-full max-w-[2500px] px-4 py-6" ref={containerRef}>
        <div className="mb-6 print:hidden flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Data loaded: {tableData.length} members, {pages.length} pages
          </div>
          <Button onClick={handleDownloadPDF} className="gap-2">
            <Download size={1} /> Download PDF
          </Button>
        </div>

        {tableData.length === 0 && !loading && (
          <div className="text-center p-8 text-gray-500">
            No data available. Sample data should have been generated.
          </div>
        )}

        {pages.map((members, pageIdx) => (
          <section
            key={pageIdx}
            className="pdf-page bg-white p-4 rounded-md shadow-sm mb-6 break-after-page"
            style={{ backgroundColor: "#ffffff", minHeight: "400px" }}
          >
            {pageIdx === 0 && <Header />}

            <DataTable members={members} formatNumber={formatNumber} pageIndex={pageIdx} />

            {pageIdx === pages.length - 1 && (
              <div className="mt-4">
                <SummaryTable
                  loanSummary={loanSummary}
                  formatNumber={formatNumber}
                  totalRokkam={totalRokkam}
                  totalMotham={totalMotham}
                  totalLandArea={totalLandArea}
                />
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  )
}

function Header({ subtitle }: { subtitle?: string }) {
  return (
    <div className="w-[1800px] mx-auto text-center mb-8">
      {/* Center heading */}
      <h1 className="text-xl font-bold mb-4 text-center">
        S.1374 மக்குட்டுசாவடி தொடர்பு வேளாண்மை கூட்டுறவு கடன் சங்கம் வரை.
      </h1>

      {/* Subtitle left, Date right */}
      <div className="flex justify-between text-sm mb-2">
        <span className="text-left">
          {subtitle ?? "விவசாய கடன் அட்டட பட்டவாடா பதிவு வேடு"}
        </span>
        <span className="text-right">
          பட்டவாடா தேதி : {new Date().toLocaleDateString("ta-IN")}
        </span>
      </div>
    </div>
  )
}


function DataTable({
  members,
  formatNumber,
  pageIndex,
}: {
  members: Member[]
  formatNumber: (n?: number) => string
  pageIndex: number
}) {
  const startingSerialNo = pageIndex * ROWS_PER_PAGE + 1

  return (
    <table
      className="w-2500 border-collapse text-sm"
      style={{
        border: "2px solid #000000",
        color: "#000000",
        backgroundColor: "#ffffff",
      }}
    >
      <thead>
        {pageIndex === 0 ? (
          <>
            <tr>
              <th rowSpan={2} className="p-2" style={{ border: "1px solid #000000", width: "10%" }}>
                வ.<br />எண்
              </th>
              <th colSpan={2} className="p-2" style={{ border: "1px solid #000000", width: "25%" }}>
                கடன்காரர்
              </th>
              <th rowSpan={2} className="p-2" style={{ border: "1px solid #000000", width: "15%" }}>
                வி.க.அ.<br />எண்
              </th>
              <th rowSpan={2} className="p-2" style={{ border: "1px solid #000000", width: "13%" }}>
                வங்கி தேதி
              </th>
              <th rowSpan={2} className="p-2" style={{ border: "1px solid #000000", width: "30%" }}>
                கடன் வகை
              </th>
              <th rowSpan={2} className="p-2" style={{ border: "1px solid #000000", width: "20%" }}>
                ரொக்கம்
              </th>
              <th rowSpan={2} className="p-2" style={{ border: "1px solid #000000", width: "20%" }}>
                மொத்தம்
              </th>
              <th colSpan={2} className="p-2" style={{ border: "1px solid #000000", width: "30%" }}>
                ஜாமீன்காரர்
              </th>
              <th colSpan={2} className="p-2" style={{ border: "1px solid #000000", width: "10%" }}>
                கையொப்பம்
              </th>
            </tr>
            <tr>
              <th className="p-10" style={{ border: "1px solid #000000", width: "5%" }}>உ. எண்</th>
              <th className="p-10" style={{ border: "1px solid #000000", width: "15%" }}>பெயர்</th>
              <th className="p-10" style={{ border: "1px solid #000000", width: "5%" }}>உ. எண்</th>
              <th className="p-10" style={{ border: "1px solid #000000", width: "10%" }}>பெயர்</th>
              <th className="p-10" style={{ border: "1px solid #000000", width: "5%" }}>கடன்காரர்</th>
              <th className="p-10" style={{ border: "1px solid #000000", width: "5%" }}>ஜாமீன்காரர்</th>
            </tr>
            <tr>
              <th className="p-2" style={{ border: "1px solid #000000" }}>(1)</th>
              <th className="p-2" style={{ border: "1px solid #000000" }}>(2)</th>
              <th className="p-2" style={{ border: "1px solid #000000" }}>(3)</th>
              <th className="p-2" style={{ border: "1px solid #000000" }}>(4)</th>
              <th className="p-2" style={{ border: "1px solid #000000" }}>(5)</th>
              <th className="p-2" style={{ border: "1px solid #000000" }}>(6)</th>
              <th className="p-2" style={{ border: "1px solid #000000" }}>(7)</th>
              <th className="p-2" style={{ border: "1px solid #000000" }}>(8)</th>
              <th className="p-2" style={{ border: "1px solid #000000" }}>(9)</th>
              <th className="p-2" style={{ border: "1px solid #000000" }}>(10)</th>
              <th className="p-2" style={{ border: "1px solid #000000" }}>(11)</th>
              <th className="p-2" style={{ border: "1px solid #000000" }}>(12)</th>
            </tr>
          </>
        ) : (
          <>
            <tr>
              <th className="p-6" rowSpan={2} style={{ border: "1px solid #000000", width: "8%" }}>(1)</th>
              <th className="p-6" style={{ border: "1px solid #000000", width: "5%" }}>(2)</th>
              <th className="p-6" style={{ border: "1px solid #000000", width: "15%" }}>(3)</th>
              <th className="p-6" rowSpan={4} style={{ border: "1px solid #000000", width: "15%" }}>(4)</th>
              <th className="p-6" rowSpan={2} style={{ border: "1px solid #000000", width: "13%" }}>(5)</th>
              <th className="p-6" rowSpan={2} style={{ border: "1px solid #000000", width: "30%" }}>(6)</th>
              <th className="p-6" rowSpan={2} style={{ border: "1px solid #000000", width: "20%" }}>(7)</th>
              <th className="p-6" rowSpan={2} style={{ border: "1px solid #000000", width: "20%" }}>(8)</th>
              <th className="p-6" style={{ border: "1px solid #000000", width: "5%" }}>(9)</th>
              <th className="p-6" style={{ border: "1px solid #000000", width: "10%" }}>(10)</th>
              <th className="p-6" style={{ border: "1px solid #000000", width: "20%" }}>(11)</th>
              <th className="p-6" style={{ border: "1px solid #000000", width: "10%" }}>(12)</th>
            </tr>
          </>
        )}
      </thead>

      <tbody>
        {members.map((member, idx) => {
          const isKccahLoan = member.loanDetails?.selectedKccahLoan
          
          let loanType = "-"
          let rokkam = 0
          let motham = 0

          if (isKccahLoan) {
            const loan = member.loanDetails.selectedKccahLoan
            loanType = loan.கடன்_வகை || "KCCAH Loan"
            rokkam = loan.ரொக்கம் || loan.dynamicrokkam || 0
            motham = loan.மொத்தம் || loan.dynamicTotal || 0
          } else {
            loanType = "Regular Loan"
            rokkam = member.amount || 0
            motham = member.amount || 0
          }

          return (
            <tr key={member.id}>
              <td className="p-2 text-center" style={{ border: "1px solid #000000" }}>
                {startingSerialNo + idx}
              </td>
              <td className="p-2 text-center" style={{ border: "1px solid #000000" }}>
                {member.userInformation?.உ_எண் || member.serialNo || "-"}
              </td>
              <td className="p-2" style={{ border: "1px solid #000000" }}>
                {member.userInformation?.பெயர் || member.memberName}
              </td>
              <td className="p-2 text-center" style={{ border: "1px solid #000000" }}>
                {member.userInformation?.ஆதார்_எண் || member.aadhaarNo || "-"}
              </td>
              <td className="p-2 text-center" style={{ border: "1px solid #000000" }}>
                {member.date || "-"}
              </td>
              <td className="p-2" style={{ border: "1px solid #000000" }}>
                {loanType}
              </td>
              <td className="p-2 text-center" style={{ border: "1px solid #000000" }}>
                {formatNumber(rokkam)}
              </td>
              <td className="p-2 text-center" style={{ border: "1px solid #000000" }}>
                {formatNumber(motham)}
              </td>
              <td className="p-2 text-center" style={{ border: "1px solid #000000" }}>
                {member.friendDetails?.hasData
                  ? member.friendDetails.uNumber
                  : member.goldDetails?.hasGold
                  ? "JL"
                  : member.ownProperty?.hasProperty
                  ? "OP"
                  : "--"}
              </td>
              <td className="p-2 text-center" style={{ border: "1px solid #000000" }}>
                {member.friendDetails
                  ? member.friendDetails.name
                  : member.goldDetails?.hasGold
                  ? "நகை அடமானம்"
                  : member.ownProperty
                  ? "சொந்த சொத்து"
                  : "--"}
              </td>
              <td className="p-2" style={{ border: "1px solid #000000" }}>{"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}</td>
              <td className="p-2" style={{ border: "1px solid #000000" }}>{"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}
</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

function SummaryTable({
  loanSummary,
  formatNumber,
  totalRokkam,
  totalMotham,
  totalLandArea,
}: {
  loanSummary: { rows: SummaryRow[]; totalCount: number }
  formatNumber: (n?: number) => string
  totalRokkam: number
  totalMotham: number
  totalLandArea: number
}) {
  return (
    <table
      className="w-full border-collapse text-sm"
      style={{ border: "2px solid #000000", color: "#000000", backgroundColor: "#ffffff" }}
    >
      <thead>
        <tr>
          <th className="p-2" style={{ border: "1px solid #000000" }}>
            வ. எண்
          </th>
          <th className="p-2" style={{ border: "1px solid #000000" }}>
            கடன் வகை
          </th>
          <th className="p-2" style={{ border: "1px solid #000000" }}>
            எண்ணிக்கை
          </th>
          <th className="p-2" style={{ border: "1px solid #000000" }}>
            பரப்பு (ஏக்கர்)
          </th>
          <th className="p-2" style={{ border: "1px solid #000000" }}>
            ரொக்கம்
          </th>
          <th className="p-2" style={{ border: "1px solid #000000" }}>
            மொத்தம்
          </th>
        </tr>
      </thead>
      <tbody>
        {loanSummary.rows.map((row, i) => (
          <tr key={row.loanType}>
            <td className="p-2 text-center" style={{ border: "1px solid #000000" }}>
              {i + 1}
            </td>
            <td className="p-2" style={{ border: "1px solid #000000" }}>
              {row.loanType}
            </td>
            
            <td className="p-2 text-center" style={{ border: "1px solid #000000" }}>
              {row.count}
            </td>
            <td className="p-2 text-center" style={{ border: "1px solid #000000" }}>
              {row.landArea}
            </td>
            <td className="p-2 text-center" style={{ border: "1px solid #000000" }}>
              {formatNumber(row.rokkam)}
            </td>
            <td className="p-2 text-center" style={{ border: "1px solid #000000" }}>
              {formatNumber(row.motham)}
            </td>
          </tr>
        ))}
        <tr>
          <td className="p-2 text-center font-bold" colSpan={2} style={{ border: "1px solid #000000" }}>
            மொத்தம்
          </td>
          <td className="p-2 text-center font-bold" style={{ border: "1px solid #000000" }}>
            {loanSummary.totalCount}
          </td>
          <td className="p-2 text-center font-bold" style={{ border: "1px solid #000000" }}>
              {totalLandArea != null
    ? (Math.trunc(totalLandArea * 100) / 100).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : "0.00"}
          </td>
          <td className="p-2 text-center font-bold" style={{ border: "1px solid #000000" }}>
            {formatNumber(totalRokkam)}
          </td>
          <td className="p-2 text-center font-bold" style={{ border: "1px solid #000000" }}>
            {formatNumber(totalMotham)}
          </td>
        </tr>
      </tbody>
    </table>
  )
}

function processMemberData(member: any): Member {
  // Calculate land area from land parcels
  let landArea = 0;
  if (member.landParcels && Array.isArray(member.landParcels)) {
    landArea = member.landParcels.reduce((total: number, parcel: any) => {
      return total + (parcel.acres || 0);
    }, 0);
  }

  return {
    id: member.id,
    serialNo: member.serialNo,
    memberName: member.memberName,
    category: member.category,
    aadhaarNo: member.aadhaarNo,
    accountNo: member.accountNo,
    amount: member.amount,
    date: member.date,
    formSections: member.formSections,
    goldDetails: member.goldDetails,
    friendDetails: member.friendDetails,
    ownProperty: member.ownProperty,
    loanDetails: member.loanDetails,
    landArea: landArea, // Add land area
    userInformation: member.userInformation
      ? {
          ...member.userInformation,
          பெயர்: member.userInformation.பெயர் || member.memberName,
          உ_எண்: member.userInformation.உ_எண் || member.serialNo,
          ஆதார்_எண்: member.userInformation.ஆதார்_எண் || member.aadhaarNo,
        }
      : undefined,
  }
}

function calculateTotals(members: Member[]) {
  return members.reduce(
    (totals, member) => {
      if (member.loanDetails?.selectedKccahLoan) {
        const loan = member.loanDetails.selectedKccahLoan
        totals.totalR += loan.ரொக்கம் || loan.dynamicrokkam || 0
        totals.totalM += loan.மொத்தம் || loan.dynamicTotal || 0
      } else {
        totals.totalR += member.amount || 0
        totals.totalM += member.amount || 0
      }
      
      // Add land area to total
      totals.totalL += member.landArea || 0
      
      return totals
    },
    { totalR: 0, totalU: 0, totalM: 0, totalL: 0 }
  )
}

function chunkMembers(arr: Member[], size: number): Member[][] {
  const chunks: Member[][] = []
  for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size))
  return chunks.length ? chunks : [[]]
}

function buildLoanSummary(members: Member[]) {
  const map = new Map<string, SummaryRow>()
  let totalCount = 0

  members.forEach((m) => {
    let loanType = "-"
    let mRokkam = 0
    let mMotham = 0
    let mLandArea = m.landArea || 0

    if (m.loanDetails?.selectedKccahLoan) {
      const loan = m.loanDetails.selectedKccahLoan
      loanType = loan.கடன்_வகை || "KCCAH Loan"
      mRokkam = loan.ரொக்கம் || loan.dynamicrokkam || 0
      mMotham = loan.மொத்தம் || loan.dynamicTotal || 0
    } else {
      loanType = "Regular Loan"
      mRokkam = m.amount || 0
      mMotham = m.amount || 0
    }

    if (!map.has(loanType)) {
      map.set(loanType, { 
        loanType, 
        count: 0, 
        rokkam: 0, 
        motham: 0,
        landArea: 0
      })
    }
    
    const row = map.get(loanType)!
    row.count += 1
    row.rokkam += mRokkam
    row.motham += mMotham
    row.landArea += mLandArea

    totalCount += 1
  })

  const rows = Array.from(map.values()).sort((a, b) => b.motham - a.motham)

  return { rows, totalCount }
}

function generateSampleMembers(count: number): Member[] {
  const loanTypes = ["சிறிய பால் பண்ணை", "கோழி பண்ணை", "ஆடு மேய்ப்பு"]
  const today = new Date().toLocaleDateString("ta-IN")
  const members: Member[] = []
  
  for (let i = 1; i <= count; i++) {
    const isKccahLoan = i % 3 === 0
    
    const m: Member = {
      id: `sample-${i}`,
      serialNo: `${4000 + i}`,
      memberName: `மாதிரி ${i}`,
      amount: isKccahLoan ? 0 : 30000 + i * 1500,
      date: today,
      landArea: 1 + (i * 0.5), // Add sample land area
      userInformation: {
        pan_file: null,
        checkboxes: { kcc: false, jewel: false, kccah: false, tractor: false },
        user_photo: null,
        pan_preview: null,
        ration_file: null,
        aadhaar_file: null,
        friend_photo: null,
        ஜாதி: "",
        உ_எண்: `${3900 + i}`,
        ration_preview: null,
        aadhaar_preview: null,
        பெயர்: `மாதிரி ${i}`,
        principle_amount: isKccahLoan ? "37800" : "30000",
        user_photo_preview: null,
        முகவரி: "",
        வட்டம்: "",
      } as any,
    }

    if (isKccahLoan) {
      const loanType = loanTypes[i % loanTypes.length]
      m.loanDetails = {
        type: "KCCAH",
        shareAmount: 0,
        principleAmount: 37800,
        totalEligibleAmount: 0,
        selectedKccahLoan: {
          id: 1,
          breakdown: {
            total: {
              விதை: 12916,
              மொத்தம்: 37800,
              ரொக்கம்: 24884
            },
            perUnit: {
              விதை: 12916,
              ரொக்கம்: 24884
            }
          },
          dynamicPlan: "1+1",
          dynamicTotal: 37800,
          dynamicUnits: 1,
          விதை: 12916,
          dynamicrokkam: 24884,
          மொத்தம்: 37800,
          ரொக்கம்: 24884,
          கடன்_வகை: loanType,
          திட்ட_அளவு: "1+1"
        }
      }
    }

    const type = i % 3
    if (type === 0) {
      ;(m as any).friendDetails = { ["உ_எண்"]: `${5000 + i}`, ["பெயர்"]: `ஜாமீன் ${i}` }
    } else if (type === 1) {
      ;(m as any).goldDetails = { type: "jl" }
    } else {
      ;(m as any).ownProperty = { type: "op" }
    }

    members.push(m)
  }
  return members
}