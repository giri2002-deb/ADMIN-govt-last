"use client"

import { useRef, useState, useEffect, useMemo } from "react"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"

// Types
interface CropBreakdown {
  cents?: number
  motham?: number
  rokkam?: number
  uram_1?: number
  uram_2?: number
  vithai?: number
  thozhu_uram?: number
  poochi_marundhu?: number
}

interface SelectedCrop {
  cropName: string
  acres?: number
  eligibleAmount?: number
  breakdown?: CropBreakdown
}

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

interface Member {
  id: string
  serialNo?: string
  memberName: string
  category?: string
  landArea?: number
  farmerType?: string
  classification?: string
  aadhaarNo?: string
  accountNo?: string
  amount: number
  date?: string
  formSections?: Record<string, boolean>
  goldDetails?: any
  friendDetails?: any
  ownProperty?: any
  selectedCrops?: SelectedCrop[]
  userInformation?: UserInformation
}

interface SummaryRow {
  cropName: string
  count: number
  acres: number
  rokkam: number
  uram: number
  motham: number
}
const pdf = new jsPDF({
  orientation: "landscape",
  unit: "px",
  format: "legal",   // ✅ instead of "a4"
})


const ROWS_PER_PAGE = 20
export default function KccRegister() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [tableData, setTableData] = useState<Member[]>([])
  const [totalRokkam, setTotalRokkam] = useState<number>(0)
  const [totalUram, setTotalUram] = useState<number>(0)
  const [totalMotham, setTotalMotham] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    document.title = "KCC Data Register"
    const metaDescription =
      (document.querySelector('meta[name="description"]') as HTMLMetaElement) || document.createElement("meta")
    metaDescription.setAttribute("name", "description")
    metaDescription.setAttribute("content", "KCC data register with per-page printing and crop-wise summary.")
    document.head.appendChild(metaDescription)
  }, [])
const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const fetchMemberData = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_URL }/api/kccdata`)
      if (!response.ok) throw new Error(`Failed to fetch data: ${response.statusText}`)

      const jsonData = await response.json()
      let members: Member[] = jsonData?.kccData?.members?.map(processMemberData) ?? []
      if (!Array.isArray(members) || members.length === 0) {
        members = generateSampleMembers(20)
      }

      const { totalR, totalU, totalM } = calculateTotals(members)

      setTableData(members)
      setTotalRokkam(Math.round(totalR))
      setTotalUram(Math.round(totalU))
      setTotalMotham(Math.round(totalM))
    } catch (err: any) {
      console.log("Using sample data due to API unavailability")
      const members = generateSampleMembers(20)
      const { totalR, totalU, totalM } = calculateTotals(members)
      setTableData(members)
      setTotalRokkam(Math.round(totalR))
      setTotalUram(Math.round(totalU))
      setTotalMotham(Math.round(totalM))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMemberData()
    console.log(fetchMemberData())
  }, [])
   
  const pages = useMemo(() => chunkMembers(tableData, ROWS_PER_PAGE), [tableData])
  const cropSummary = useMemo(() => buildCropSummary(tableData), [tableData])

  const formatNumber = (n?: number) => (n ?? 0).toLocaleString(undefined, { maximumFractionDigits: 0 })
  const formatAcres = (n?: number) => (n ?? 0).toFixed(2)
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

  console.log("Table data length:", tableData.length)
  console.log("Pages length:", pages.length)

  return (
    <div className="min-h-screen bg-white flex flex-col ">
      <div className="w-full max-w-[1000px] px-4 py-6" ref={containerRef}>
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
                  cropSummary={cropSummary}
                  formatNumber={formatNumber}
                  formatAcres={formatAcres}
                  totalRokkam={totalRokkam}
                  totalUram={totalUram}
                  totalMotham={totalMotham}
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
            {/* ✅ First Page Header (normal spacing) */}
            <tr>
              <th rowSpan={2} className="p-10" style={{ border: "1px solid #000000", width: "10%" }}>
                வ.<br />எண்
              </th>
              <th colSpan={2} className="p-10" style={{ border: "1px solid #000000", width: "25%" }}>
                கடன்காரர்
              </th>
              <th rowSpan={2} className="p-10" style={{ border: "1px solid #000000", width: "15%" }}>
                வி.க.அ.<br />எண்
              </th>
              <th rowSpan={2} className="p-10" style={{ border: "1px solid #000000", width: "13%" }}>
                வங்கி தேதி
              </th>
              <th rowSpan={2} className="p-10" style={{ border: "1px solid #000000", width: "30%" }}>
                காரியம்
              </th>
              <th rowSpan={2} className="p-10" style={{ border: "1px solid #000000", width: "20%" }}>
                ரொக்கம்
              </th>
              <th rowSpan={2} className="p-10" style={{ border: "1px solid #000000", width: "15%" }}>
                உரம்
              </th>
              <th rowSpan={2} className="p-10" style={{ border: "1px solid #000000", width: "20%" }}>
                மொத்தம்
              </th>
              <th rowSpan={2} className="p-10" style={{ border: "1px solid #000000", width: "8%" }}>
                மொத்த தொகை
              </th>
              <th colSpan={2} className="p-10" style={{ border: "1px solid #000000", width: "30%" }}>
                ஜாமீன்காரர்
              </th>
              <th colSpan={2} className="p-10" style={{ border: "1px solid #000000", width: "10%" }}>
                கையொப்பம்
              </th>
            </tr>
            <tr>
              <th className="p-2" style={{ border: "1px solid #000000", width: "5%" }}>உ. எண்</th>
              <th className="p-2" style={{ border: "1px solid #000000", width: "15%" }}>பெயர்</th>
              <th className="p-2" style={{ border: "1px solid #000000", width: "5%" }}>உ. எண்</th>
              <th className="p-2" style={{ border: "1px solid #000000", width: "10%" }}>பெயர்</th>
              <th className="p-2" style={{ border: "1px solid #000000", width: "5%" }}>கடன்காரர்</th>
              <th className="p-2" style={{ border: "1px solid #000000", width: "5%" }}>ஜாமீன்காரர்</th>
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
              <th className="p-2" style={{ border: "1px solid #000000" }}>(13)</th>
              <th className="p-2" style={{ border: "1px solid #000000" }}>(14)</th>
            </tr>
          </>
        ) : (
          <>
            {/* ✅ Other Pages Header (more spacing for 1,2,3) */}
            <tr>
  <th className="p-6" rowSpan={2} style={{ border: "1px solid #000000", width: "8%" }}>(1)</th>
  <th className="p-6" style={{ border: "1px solid #000000", width: "5%" }}>(2)</th>
  <th className="p-6" style={{ border: "1px solid #000000", width: "15%" }}>(3)</th>
  <th className="p-6" rowSpan={4} style={{ border: "1px solid #000000", width: "15%" }}>(4)</th>
  <th className="p-6" rowSpan={2} style={{ border: "1px solid #000000", width: "13%" }}>(5)</th>
  <th className="p-6" rowSpan={2} style={{ border: "1px solid #000000", width: "30%" }}>(6)</th>
  <th className="p-6" rowSpan={2} style={{ border: "1px solid #000000", width: "20%" }}>(7)</th>
  <th className="p-6" rowSpan={2} style={{ border: "1px solid #000000", width: "15%" }}>(8)</th>
  <th className="p-6" rowSpan={2} style={{ border: "1px solid #000000", width: "20%" }}>(9)</th>
  <th className="p-6" rowSpan={2} style={{ border: "1px solid #000000", width: "8%" }}>(10)</th>
  <th className="p-6" style={{ border: "1px solid #000000", width: "5%" }}>(11)</th>
  <th className="p-6" style={{ border: "1px solid #000000", width: "10%" }}>(12)</th>
  <th className="p-6" style={{ border: "1px solid #000000", width: "20%" }}>(13)</th>
  <th className="p-6" style={{ border: "1px solid #000000", width: "10%" }}>(14)</th>
</tr>

          </>
        )}
      </thead>

      <tbody>
{members.map((member, idx) => {
  // Get crops or use default if none
  const crops = member.selectedCrops?.length
    ? member.selectedCrops
    : [{ cropName: "-", breakdown: { rokkam: member.amount, motham: member.amount } }]

  // Calculate total amount across all crops
  const totalAmount = crops.reduce((sum, cr) => sum + (cr.eligibleAmount ?? cr.breakdown?.motham ?? 0), 0)

  return (
    <>
      {/* First row with member info and first crop */}
      <tr key={`${member.id}-0`}>
        <td className="p-2 text-center" style={{ border: "1px solid #000000" }} rowSpan={crops.length}>
          {startingSerialNo + idx}
        </td>
        <td className="p-2 text-center" style={{ border: "1px solid #000000" }} rowSpan={crops.length}>
          {member.userInformation?.உ_எண் || member.serialNo || "-"}
        </td>
        <td className="p-2" style={{ border: "1px solid #000000" }} rowSpan={crops.length}>
          {member.userInformation?.பெயர் || member.memberName}
        </td>
        <td className="p-2 text-center" style={{ border: "1px solid #000000" }} rowSpan={crops.length}>
          {member.userInformation?.ஆதார்_எண் || member.aadhaarNo || "-"}
        </td>
        <td className="p-2 text-center" style={{ border: "1px solid #000000" }} rowSpan={crops.length}>
          {member.date || "-"}
        </td>
        <td className="p-2" style={{ border: "1px solid #000000" }}>
          {crops[0].cropName}
        </td>
        <td className="p-2 text-center" style={{ border: "1px solid #000000" }}>
          {formatNumber(
            (crops[0].breakdown?.rokkam ?? 0) + 
            (crops[0].breakdown?.vithai ?? 0) + 
            (crops[0].breakdown?.poochi_marundhu ?? 0)
          )}
        </td>
        <td className="p-2 text-center" style={{ border: "1px solid #000000" }}>
          {formatNumber((crops[0].breakdown?.uram_2 || 0))}
        </td>
        <td className="p-2 text-center" style={{ border: "1px solid #000000" }}>
          {formatNumber(crops[0].breakdown?.motham ?? crops[0].eligibleAmount)}
        </td>
        <td className="p-2 text-center" style={{ border: "1px solid #000000" }} rowSpan={crops.length}>
          {formatNumber(totalAmount)}
        </td>
        <td className="p-2 text-center" style={{ border: "1px solid #000000" }} rowSpan={crops.length}>
          {member.friendDetails?.hasData
            ? member.friendDetails.uNumber
            : member.goldDetails?.hasGold
            ? "JL"
            : member.ownProperty?.hasProperty
            ? "OP"
            : "--"}
        </td>
        <td className="p-2 text-center" style={{ border: "1px solid #000000" }} rowSpan={crops.length}>
           {member.friendDetails?.hasData
            ? member.friendDetails.uNumber
            : member.goldDetails?.hasGold
            ? "JL"
            : member.ownProperty?.hasProperty
            ? "OP"
            : "--"}
        </td>
        <td className="p-2" style={{ border: "1px solid #000000" }} rowSpan={crops.length}>
          {"\u00A0".repeat(50)}
        </td>
        <td className="p-2" style={{ border: "1px solid #000000" }} rowSpan={crops.length}>
          {"\u00A0".repeat(50)}
        </td>
      </tr>
      
      {/* Additional rows for additional crops */}
      {crops.slice(1).map((crop, cropIdx) => (
        <tr key={`${member.id}-${cropIdx+1}`}>
          <td className="p-2" style={{ border: "1px solid #000000" }}>
            {crop.cropName}
          </td>
          <td className="p-2 text-center" style={{ border: "1px solid #000000" }}>
            {formatNumber(
              (crop.breakdown?.rokkam ?? 0) + 
              (crop.breakdown?.vithai ?? 0) + 
              (crop.breakdown?.poochi_marundhu ?? 0)
            )}
          </td>
          <td className="p-2 text-center" style={{ border: "1px solid #000000" }}>
            {formatNumber((crop.breakdown?.uram_2 || 0))}
          </td>
          <td className="p-2 text-center" style={{ border: "1px solid #000000" }}>
            {formatNumber(crop.breakdown?.motham ?? crop.eligibleAmount)}
          </td>
        </tr>
      ))}
    </>
  )
})}
      </tbody>
    </table>
  )
}

function getFriendUEN(member: Member): string {
  const fd: any = member.friendDetails
  if (!fd) return "--"
  return fd.uNumber ?? fd.u_no ?? fd.uNo ?? fd.serialNo ?? fd["உஎண்"] ?? fd?.userInformation?.["உ_எண்"] ?? "--"
}

function getFriendName(member: Member): string {
  const fd: any = member.friendDetails
  if (!fd) return "--"
  return fd["பெயர்"] ?? fd.name ?? fd.memberName ?? fd?.userInformation?.["பெயர்"] ?? "--"
}

function SummaryTable({
  cropSummary,
  formatNumber,
  formatAcres,
  totalRokkam,
  totalUram,
  totalMotham,
}: {
  cropSummary: { rows: SummaryRow[]; totalCount: number; totalAcres: number }
  formatNumber: (n?: number) => string
  formatAcres: (n?: number) => string
  totalRokkam: number
  totalUram: number
  totalMotham: number
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
            விபரம்
          </th>
          <th className="p-2" style={{ border: "1px solid #000000" }}>
            எண்ணிக்கை
          </th>
          <th className="p-2" style={{ border: "1px solid #000000" }}>
            பரப்பு
          </th>
          <th className="p-2" style={{ border: "1px solid #000000" }}>
            ரொக்கம்
          </th>
          <th className="p-2" style={{ border: "1px solid #000000" }}>
            உரம்
          </th>
          <th className="p-2" style={{ border: "1px solid #000000" }}>
            மொத்தம்
          </th>
        </tr>
      </thead>
      <tbody>
        {cropSummary.rows.map((row, i) => (
          <tr key={row.cropName}>
            <td className="p-2 text-center" style={{ border: "1px solid #000000" }}>
              {i + 1}
            </td>
            <td className="p-2" style={{ border: "1px solid #000000" }}>
              {row.cropName}
            </td>
            <td className="p-2 text-center" style={{ border: "1px solid #000000" }}>
              {row.count}
            </td>
            <td className="p-2 text-center" style={{ border: "1px solid #000000" }}>
              {formatAcres(row.acres)}
            </td>
            <td className="p-2 text-center" style={{ border: "1px solid #000000" }}>
              {formatNumber(row.rokkam)}
            </td>
            <td className="p-2 text-center" style={{ border: "1px solid #000000" }}>
              {formatNumber(row.uram)}
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
            {cropSummary.totalCount}
          </td>
          <td className="p-2 text-center font-bold" style={{ border: "1px solid #000000" }}>
            {formatAcres(cropSummary.totalAcres)}
          </td>
          <td className="p-2 text-center font-bold" style={{ border: "1px solid #000000" }}>
            {formatNumber(totalRokkam)}
          </td>
          <td className="p-2 text-center font-bold" style={{ border: "1px solid #000000" }}>
            {formatNumber(totalUram)}
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
  return {
    id: member.id,
    serialNo: member.serialNo,
    memberName: member.memberName,
    category: member.category,
    landArea: member.landArea,
    farmerType: member.farmerType,
    classification: member.classification,
    aadhaarNo: member.aadhaarNo,
    accountNo: member.accountNo,
    amount: member.amount,
    date: member.date,
    formSections: member.formSections,
    goldDetails: member.goldDetails,
    friendDetails: member.friendDetails,
    ownProperty: member.ownProperty,
    userInformation: member.userInformation
      ? {
          ...member.userInformation,
          பெயர்: member.userInformation.பெயர் || member.memberName,
          உ_எண்: member.userInformation.உ_எண் || member.serialNo,
          ஆதார்_எண்: member.userInformation.ஆதார்_எண் || member.aadhaarNo,
        }
      : undefined,
    selectedCrops: member.selectedCrops?.map(processCropData),
  }
}

function processCropData(crop: any): SelectedCrop {
  return {
    cropName: crop.cropName || crop.crop?.name_of_crop || "",
    acres: crop.acres,
    eligibleAmount: crop.eligibleAmount ?? crop.breakdown?.motham,
    breakdown: crop.breakdown || undefined,
  }
}

function calculateTotals(members: Member[]) {
  return members.reduce(
    (totals, member) => {
      if (member.selectedCrops?.length) {
        member.selectedCrops.forEach((crop) => {
          const b = crop.breakdown || {}
          const uram = (b.uram_1 || 0) + (b.uram_2 || 0) + (b.thozhu_uram || 0)
          totals.totalR += b.rokkam || 0
          totals.totalU += uram
          totals.totalM += b.motham || crop.eligibleAmount || 0
        })
      } else {
        totals.totalR += member.amount || 0
        totals.totalM += member.amount || 0
      }
      return totals
    },
    { totalR: 0, totalU: 0, totalM: 0 },
  )
}

function chunkMembers(arr: Member[], size: number): Member[][] {
  const chunks: Member[][] = []
  for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size))
  return chunks.length ? chunks : [[]]
}

function buildCropSummary(members: Member[]) {
  const map = new Map<string, SummaryRow>()
  let totalCount = 0
  let totalAcres = 0

  members.forEach((m) => {
    const firstCrop = m.selectedCrops?.[0]
    const name = firstCrop?.cropName || "-"

    let mRokkam = 0
    let mUram = 0
    let mMotham = 0

    if (m.selectedCrops?.length) {
      m.selectedCrops.forEach((c) => {
        const b = c.breakdown || {}
        const uram = (b.uram_1 || 0) + (b.uram_2 || 0) + (b.thozhu_uram || 0)
        mRokkam += b.rokkam || 0
        mUram += uram
        mMotham += b.motham || c.eligibleAmount || 0
      })
    } else {
      mRokkam += m.amount || 0
      mMotham += m.amount || 0
    }

    if (!map.has(name)) {
      map.set(name, { cropName: name, count: 0, acres: 0, rokkam: 0, uram: 0, motham: 0 })
    }
    const row = map.get(name)!
    row.count += 1
    row.acres += firstCrop?.acres || 0
    row.rokkam += mRokkam
    row.uram += mUram
    row.motham += mMotham

    totalCount += 1
    totalAcres += firstCrop?.acres || 0
  })

  const rows = Array.from(map.values()).sort((a, b) => b.motham - a.motham)

  return { rows, totalCount, totalAcres }
}

function generateSampleMembers(count: number): Member[] {
  const cropNames = ["குச்சி-ஈ", "பருத்தி-BT", "தென்னை (உ)", "கடலை-மா", "பாகு"]
  const today = new Date().toLocaleDateString("ta-IN")
  const members: Member[] = []
  for (let i = 1; i <= count; i++) {
    const rokkam = 30000 + i * 1500
    const uram1 = Math.round(rokkam * 0.06)
    const uram2 = Math.round(rokkam * 0.02)
    const motham = rokkam + uram1 + uram2

    const m: Member = {
      id: `sample-${i}`,
      serialNo: `${4000 + i}`,
      memberName: `மாதிரி ${i}`,
      amount: motham,
      date: today,
      selectedCrops: [
        {
          cropName: cropNames[i % cropNames.length],
          acres: Number((1 + (i % 5) * 0.5).toFixed(2)),
          eligibleAmount: motham,
          breakdown: {
            rokkam,
            uram_1: uram1,
            uram_2: uram2,
            motham,
          },
        },
      ],
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
        principle_amount: String(motham),
        user_photo_preview: null,
        முகவரி: "",
        வட்டம்: "",
      } as any,
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
