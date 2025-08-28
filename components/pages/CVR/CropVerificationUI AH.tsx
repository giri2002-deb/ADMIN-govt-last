"use client"

import { useState, useRef, useEffect } from "react"
import { Download, Plus, Trash2, Loader2 } from "lucide-react"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"

interface TableRow {
  slNo: string
  mNo: string
  name: string
  creditLimit: string
  surveyNo1: string
  extentA1: string
  extentC1: string
  loanDisbursed: string
  surveyNo2: string
  extentA2: string
  extentC2: string
  crop: string
  cropCount: number
  allCrops: string[]
  cash: string
  kind: string
  verificationDate: string
  verifiedCrop: string
  verifiedCash: string
  verifiedKind: string
  landVerifiedDate: string
  staffInitial: string
  supervisorInitial: string
  amDate: string
  amInitial: string
  eoDate: string
  eoInitial: string
}

interface Member {
  id: string
  serialNo: string
  memberName: string
  category: string
  landArea: number
  farmerType: string
  classification: string
  aadhaarNo: string
  accountNo: string
  amount: number
  date: string
  formSections: any
  goldDetails: any
  friendDetails: any
  ownProperty: any
  selectedCrops: any[]
  userInformation: any
   selectedKccahLoan?: {
    id: number;
    breakdown: {
      total: {
        விதை: number;
        மொத்தம்: number;
        ரொக்கம்: number;
      };
      perUnit: {
        விதை: number;
        ரொக்கம்: number;
      };
    };
    dynamicPlan: string;
    dynamicTotal: number;
    dynamicUnits: number;
    விதை: number;
    dynamicrokkam: number;
    மொத்தம்: number;
    ரொக்கம்: number;
    கடன்_வகை: string;
    திட்ட_அளவு: string;
  };
  kccahBreakdown?: {
    total: {
      விதை: number;
      மொத்தம்: number;
      ரொக்கம்: number;
    };
    units: number;
    loanId: number;
    perUnit: {
      விதை: number;
      ரொக்கம்: number;
    };
    loanName: string;
    planText: string;
  };
  principleAmount?: number;
  totalEligibleAmount?: number;

}

interface ApiResponse {
  exportDate: string
  totalRecords: number
  totalAmount: number
  totalLand: number
  summary: any
  kccData: {
    members: Member[]
    settings: {
      organizationName: string
      address: string
      date: string
      meetingDetails: string
      accountNumber: string
    }
  }
  organizationInfo: {
    organizationName: string
    address: string
    date: string
    meetingDetails: string
    accountNumber: string
  }
}

const ITEMS_PER_PAGE = 20



function CropVerificationAHUI() {
  const tableRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [useMockData, setUseMockData] = useState(false)
 const [numberValue, setNumberValue] = useState(1)

  // Load from localStorage on mount
  useEffect(() => {
    const savedValue = localStorage.getItem("myNumber")
    if (savedValue) {
      setNumberValue(Number(savedValue))
    }
  }, [])

  const ITEMS_PER_PAGE = Number(numberValue)
  const [formData, setFormData] = useState({
    month: "May-24",
    societyName: "S.331, இடங்கணசாலை தொடக்க வேளாண்மை கூட்டுறு கடன் சங்கம் வனை.,",
    disbursementDate: "15-05-2024",
  })

  const [tableData, setTableData] = useState<TableRow[]>([])

  const extractSurveyNumbers = (userInfo: any) => {
    const surveyNumbers: string[] = []
    for (let i = 1; i <= 20; i++) {
      const surveyKey = `நிலம்${i}_சர்வே_எண்`
      if (userInfo[surveyKey] && userInfo[surveyKey].trim()) {
        surveyNumbers.push(userInfo[surveyKey])
      }
    }
    return surveyNumbers.join(", ")
  }

  const calculateTotalExtent = (userInfo: any) => {
    let totalAc = 0
    for (let i = 1; i <= 20; i++) {
      const acKey = `நிலம்${i}_ac`
      if (userInfo[acKey] && userInfo[acKey].trim()) {
        totalAc += Number.parseFloat(userInfo[acKey]) || 0
      }
    }
    return totalAc.toFixed(2)
  }

  const calculateCropAmounts = (selectedCrops: any[]) => {
    if (!selectedCrops || selectedCrops.length === 0) return { total: 0, breakdown: "" }

    const amounts = selectedCrops.map((crop) => crop.eligibleAmount || 0)
    const total = amounts.reduce((sum, amount) => sum + amount, 0)
    const breakdown = amounts.join(" + ")

    return { total, breakdown }
  }

  const getCropNamesWithDivider = (selectedCrops: any[]) => {
    if (!selectedCrops || selectedCrops.length === 0) return { names: "", count: 0 }

    const cropNames = selectedCrops.map((crop) => crop.cropName || "")
    const names = cropNames.join(" | ")

    return { names, count: cropNames.length }
  }

  const getTotalCentsWithDivider = (selectedCrops: any[]) => {
    if (!selectedCrops || selectedCrops.length === 0) return ""

    const cents = selectedCrops.map((crop) => crop.breakdown?.cents || 0)
    return cents.join(" + ")
  }
const API_URL = process.env.NEXT_PUBLIC_API_URL;
 useEffect(() => {
  async function fetchData() {
    setLoading(true)
    setError(null)
    try {
      console.log("Fetching data from API...")
      const response = await fetch(`${API_URL}/api/kccahdata`)

      if (!response.ok) {
        throw new Error(`API not available: ${response.statusText}`)
      }

      const jsonData: ApiResponse = await response.json()
      console.log("Successfully fetched data from API")
      processData(jsonData)
    } catch (err: any) {
      console.warn("API fetch failed, using mock data:", err.message)
      setUseMockData(true)
      // You should also set some mock data here if the API fails
      // For example:
    
    } finally {
      setLoading(false)
    }
  }

  fetchData() // This line was missing - you need to actually call the function
}, []) // Empty dependency array means this runs once on mount
function processData(jsonData: ApiResponse) {
  if (jsonData.organizationInfo) {
    setFormData({
      month: new Date().toLocaleDateString("en-GB", { month: "short", year: "2-digit" }),
      societyName: jsonData.organizationInfo.organizationName || formData.societyName,
      disbursementDate: new Date().toLocaleDateString("en-GB"),
    });
  }

  const membersMapped: TableRow[] = [];
  let slNoCounter = 1;

  jsonData.kccData.members.forEach((member) => {
    const surveyNumbers = extractSurveyNumbers(member.userInformation);
    const totalExtent = calculateTotalExtent(member.userInformation);

    // Process KCCAH loan data if available
    const kccahLoan = member.selectedKccahLoan;
    const kccahBreakdown = member.kccahBreakdown;
    const hasKccahLoan = kccahLoan || kccahBreakdown;

    if (hasKccahLoan) {
      // Determine loan details from either selectedKccahLoan or kccahBreakdown
      const loanType = kccahLoan?.கடன்_வகை || kccahBreakdown?.loanName || "";
      const totalAmount = kccahLoan?.மொத்தம் || kccahBreakdown?.total?.மொத்தம் || 0;
      const cashAmount = kccahLoan?.ரொக்கம் || kccahBreakdown?.total?.ரொக்கம் || 0;
      const kindAmount = kccahLoan?.விதை || kccahBreakdown?.total?.விதை || 0;

      membersMapped.push({
        slNo: slNoCounter.toString(),
        mNo: member.userInformation?.உ_எண் || member.id.substring(0, 6),
        name: member.memberName,
        creditLimit: totalAmount.toString(),
        surveyNo1: surveyNumbers,
        extentA1: totalExtent,
        extentC1: "",
        loanDisbursed: totalAmount.toString(),
        surveyNo2: surveyNumbers,
        extentA2: "1.00", // Default value for KCCAH loans
        extentC2: "",
        crop: loanType,
        cropCount: 1,
        allCrops: [loanType],
        cash:totalAmount.toString() ,
        kind: " ",
        verificationDate: " ",
        verifiedCrop: loanType,
        verifiedCash: cashAmount.toString(),
        verifiedKind: " ",
        landVerifiedDate: " ",
        staffInitial: " ",
        supervisorInitial: " ",
        amDate: " ",
        amInitial: " ",
        eoDate: " ",
        eoInitial: " "
      });
      slNoCounter++;
    } else {
      // If no KCCAH loan, add basic member info
      membersMapped.push({
        slNo: slNoCounter.toString(),
        mNo: member.userInformation?.உ_எண் || member.id.substring(0, 6),
        name: member.memberName,
        creditLimit: "0",
        surveyNo1: surveyNumbers,
        extentA1: totalExtent,
        extentC1: "",
        loanDisbursed: "0",
        surveyNo2: surveyNumbers,
        extentA2: "1.00",
        extentC2: "",
        crop: "",
        cropCount: 0,
        allCrops: [],
        cash: "",
        kind: "",
        verificationDate: " ",
        verifiedCrop: "",
        verifiedCash: "",
        verifiedKind: "",
        landVerifiedDate: "",
        staffInitial: " ",
        supervisorInitial: " ",
        amDate: " ",
        amInitial: " ",
        eoDate: " ",
        eoInitial: " "
      });
      slNoCounter++;
    }
  });

  setTableData(membersMapped);
}


  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleTableChange = (index: number, field: keyof TableRow, value: string) => {
    setTableData((prev) => prev.map((row, i) => (i === index ? { ...row, [field]: value } : row)))
  }

  const addRow = () => {
    const newRow: TableRow = {
      slNo: (tableData.length + 1).toString(),
      mNo: "",
      name: "",
      creditLimit: "",
      surveyNo1: "",
      extentA1: "",
      extentC1: "",
      loanDisbursed: "",
      surveyNo2: "",
      extentA2: "",
      extentC2: "",
      crop: "",
      cropCount: 0,
      allCrops: [],
      cash: "",
      kind: "",
      verificationDate: "",
      verifiedCrop: "",
      verifiedCash: "",
      verifiedKind: "",
      landVerifiedDate: "",
      staffInitial: "",
      supervisorInitial: "",
      amDate: "",
      amInitial: "",
      eoDate: "",
      eoInitial: "",
    }
    setTableData((prev) => [...prev, newRow])
  }

  const removeRow = (index: number) => {
    setTableData((prev) =>
      prev
        .filter((_, i) => i !== index)
        .map((row, i) => ({
          ...row,
          slNo: (i + 1).toString(),
        })),
    )
  }

  const calculateTotals = () => {
    const totalCreditLimit = tableData.reduce((sum, row) => sum + (Number.parseFloat(row.creditLimit) || 0), 0)
    const totalLoanDisbursed = tableData.reduce((sum, row) => sum + (Number.parseFloat(row.loanDisbursed) || 0), 0)
    const totalExtentA1 = tableData.reduce((sum, row) => sum + (Number.parseFloat(row.extentA1) || 0), 0)
    const totalCash = tableData.reduce((sum, row) => sum + (Number.parseFloat(row.cash) || 0), 0)
    
    const totalCrops = tableData.reduce((sum, row) => sum + row.cropCount, 0)

    return {
      totalCreditLimit,
      totalLoanDisbursed,
      totalExtentA1,
      totalCash,
      
      totalCrops,
    }
  }

  const totalPages = Math.ceil(tableData.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentPageData = tableData.slice(startIndex, endIndex)

const downloadPDF = async () => {
  if (!tableRef.current) return
  try {
    const editSection = document.querySelector(".edit-section") as HTMLElement
    const controlsSection = document.querySelector(".controls-section") as HTMLElement
    const paginationSection = document.querySelector(".pagination-section") as HTMLElement

    if (editSection) editSection.style.display = "none"
    if (controlsSection) controlsSection.style.display = "none"
    if (paginationSection) paginationSection.style.display = "none"

    // ✅ Use Legal paper size
    const pdf = new jsPDF("l", "mm", "legal")
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()

    for (let page = 1; page <= totalPages; page++) {
      setCurrentPage(page)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      window.scrollTo(0, 0)
      await new Promise((resolve) => setTimeout(resolve, 500))

      const canvas = await html2canvas(tableRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        scrollX: 0,
        scrollY: 0,
        width: tableRef.current.scrollWidth,
        height: tableRef.current.scrollHeight,
      })

      const imgData = canvas.toDataURL("image/png", 1.0)

      // ✅ No margin: start from (0,0)
      const imgWidth = pageWidth
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      const x = 0
      const y = 0

      if (page > 1) pdf.addPage()
      pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight)
    }

    if (editSection) editSection.style.display = "block"
    if (controlsSection) controlsSection.style.display = "flex"
    if (paginationSection) paginationSection.style.display = "flex"

    pdf.save(`crop-verification-register-${new Date().toISOString().split("T")[0]}.pdf`)
  } catch (error) {
    console.error("Error generating PDF:", error)
    alert("PDF generation failed. Please try again.")
  }
}


  const totals = calculateTotals()

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading crop verification data...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">Error loading data: {error}</div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-full overflow-x-auto">
        {useMockData && (
          <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 rounded">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> Using mock data because API server is not available. To use real data, ensure your
              API server is running at http://localhost:5000/api/kccdata
            </p>
          </div>
        )}

        <div className="mb-4 flex justify-between items-center controls-section">
  {/* Left side buttons */}
  <div className="flex gap-2 items-center">
    <button
      onClick={addRow}
      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      <Plus size={16} />
      Add Row
    </button>
    <button
      onClick={downloadPDF}
      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
    >
      <Download size={16} />
      Download PDF
    </button>

    {/* Rows per page input */}
    <div className="flex items-center gap-2 ml-4">
      <label htmlFor="rows-per-page" className="text-sm font-medium text-gray-700">
        Rows per page:
      </label>
      <input
        id="rows-per-page"
        type="number"
        className="w-20 border border-gray-300 rounded p-1"
        value={numberValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setNumberValue(Number(e.target.value))
        }
        min={1}
      />
    </div>
  </div>

  
</div>


        <div className="mb-4 flex justify-center items-center gap-4 pagination-section">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>

        <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4 controls-section">
          <div>
            <label className="block text-sm font-medium mb-1">Month:</label>
            <input
              type="text"
              value={formData.month}
              onChange={(e) => handleFormChange("month", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Name of the Society:</label>
            <input
              type="text"
              value={formData.societyName}
              onChange={(e) => handleFormChange("societyName", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Date of Disbursement:</label>
            <input
              type="text"
              value={formData.disbursementDate}
              onChange={(e) => handleFormChange("disbursementDate", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div
          ref={tableRef}
          className="bg-white"
          style={{
            fontSize: "14px",
            width: "fit-content",
            minWidth: "1600px",
            padding: "20px",
            margin: "0 auto",
          }}
        >
          {currentPage === 1 && (
            <div className="text-center mb-4 py-2">
              <h1 className="text-xl font-bold">CROP VERIFICATION REGISTER</h1>
            </div>
          )}
          
{currentPage === 1 && (
  <div className="flex justify-between items-center mb-4 px-2">
    {/* Left Section */}
     <span>
        Month: <span className="font-semibold">{formData.month}</span>
      </span>
    <div className="flex flex-1 justify-center items-center space-x-20">
     
      <span>
        Name of the Society: <span className="font-semibold">{formData.societyName}</span>
      </span>
    </div>

    {/* Right Section */}
    <div className="flex-none">
      <span>
        Date of Disbursement:{" "}
        <span className="font-semibold">{formData.disbursementDate}</span>
      </span>
    </div>
  </div>
)}


          {currentPage > 1 && (
            <div className="text-center mb-4 py-2">
              <h2 className="text-lg font-bold">Page {currentPage}</h2>
            </div>
          )}

          <div style={{ overflowX: "visible" }}>
            <table className="border-2 border-black w-full border-collapse" style={{ tableLayout: "fixed" }}>
              {currentPage === 1 && (
                <thead>
                  <tr>
                    <th rowSpan={3} className="border border-black p-2" style={{ width: "40px" }}>
                      Sl. No
                    </th>
                    <th rowSpan={3} className="border border-black p-2" style={{ width: "80px" }}>
                      M. No
                    </th>
                    <th rowSpan={3} className="border border-black p-2" style={{ width: "120px" }}>
                      Name
                    </th>
                    <th colSpan={7} className="border border-black p-2">
                      Particulars of Land
                    </th>
                    <th colSpan={2} rowSpan={2} className="border border-black p-2">
                      Details of Disbursement
                    </th>
                    <th rowSpan={3} className="border border-black p-2" style={{ width: "80px" }}>
                      Date of Verifi<br></br>cation
                    </th>
                    <th colSpan={2} rowSpan={2} className="border border-black p-2">
                      Land Verified
                    </th>
                    <th rowSpan={3} className="border border-black p-2" style={{ width: "100px" }}>
                      Age of Crop at the time of Verification
                    </th>
                    <th rowSpan={3} className="border border-black p-2" style={{ width: "80px" }}>
                      Initial of the Staff
                    </th>
                    <th rowSpan={3} className="border border-black p-2" style={{ width: "80px" }}>
                      Initial of the Supervisor
                    </th>
                    <th colSpan={2} rowSpan={2} className="border border-black p-2">
                      A.M / A.O / CSR (P)
                    </th>
                    <th rowSpan={2} colSpan={2} className="border border-black p-2">
                      Executive Officer
                    </th>
                  </tr>
                  <tr>
                    <th colSpan={3} className="border border-black p-2">
                      As per Annual Credit Limit Application
                    </th>
                    <th colSpan={4} className="border border-black p-2">
                      As per Disbursement Statement
                    </th>
                  </tr>
                  <tr>
                    <th className="border border-black p-2" style={{ width: "100px" }}>
                      Credit Limit Allowed Crop Amount
                    </th>
                    <th className="border border-black p-2" style={{ width: "120px" }}>
                      Survey Number
                    </th>
                    <th className="border border-black p-2" style={{ width: "80px" }}>
                      Extent<br></br> A C
                    </th>
                    <th className="border border-black p-2" style={{ width: "100px" }}>
                      Loan Disbur<br></br>sed
                    </th>
                    <th className="border border-black p-2" style={{ width: "120px" }}>
                      Survey Number
                    </th>
                    <th className="border border-black p-2" style={{ width: "80px" }}>
                      Extent<br></br> A C
                    </th>
                    <th className="border border-black p-2" style={{ width: "200px" }}>
                      Crop
                    </th>
                    <th className="border border-black p-2" style={{ width: "80px" }}>
                      Cash
                    </th>
                    <th className="border border-black p-2" style={{ width: "80px" }}>
                      Kind
                    </th>
                    <th className="border border-black p-2" style={{ width: "120px" }}>
                      Survey Number
                    </th>
                    <th className="border border-black p-2" style={{ width: "80px" }}>
                      Extent<br></br> A C
                    </th>
                    <th className="border border-black p-2" style={{ width: "80px" }}>
                      Date
                    </th>
                    <th className="border border-black p-2" style={{ width: "80px" }}>
                      Initial
                    </th>
                    <th className="border border-black p-2" style={{ width: "80px" }}>
                      Date
                    </th>
                    <th className="border border-black p-2" style={{ width: "80px" }}>
                      Initial
                    </th>
                  </tr>
                  <tr className="text-center text-xs">
                    <td className="border border-black p-1">(1)</td>
                    <td className="border border-black p-1">(2)</td>
                    <td className="border border-black p-1">(3)</td>
                    <td className="border border-black p-1">(4)</td>
                    <td className="border border-black p-1">(5)</td>
                    <td className="border border-black p-1">(6)</td>
                    <td className="border border-black p-1">(7)</td>
                    <td className="border border-black p-1">(8)</td>
                    <td className="border border-black p-1">(9)</td>
                    <td className="border border-black p-1">(10)</td>
                    <td className="border border-black p-1">(11)</td>
                    <td className="border border-black p-1">(12)</td>
                    <td className="border border-black p-1">(13)</td>
                    <td className="border border-black p-1">(14)</td>
                    <td className="border border-black p-1">(15)</td>
                    <td className="border border-black p-1">(16)</td>
                    <td className="border border-black p-1">(17)</td>
                    <td className="border border-black p-1">(18)</td>
                    <td className="border border-black p-1">(19)</td>
                    <td className="border border-black p-1">(20)</td>
                    <td className="border border-black p-1">(21)</td>
                    <td className="border border-black p-1">(22)</td>
                  </tr>
                </thead>
              )}

              <tbody>
                {currentPageData.map((row, index) => {
                  const actualIndex = startIndex + index
                  const isEmptySlNo = row.slNo === ""

                  return (
                    <tr key={actualIndex} className="text-center">
                      <td className={`border border-black p-2 ${isEmptySlNo ? "border-t-0" : ""}`}>{row.slNo}</td>
                      <td className={`border border-black p-2 ${isEmptySlNo ? "border-t-0" : ""}`}>{row.mNo}</td>
                      <td className={`border border-black p-2 text-left ${isEmptySlNo ? "border-t-0" : ""}`}>
                        {row.name}
                      </td>
                      <td className="border border-black p-2">{row.creditLimit}</td>
                      <td className={`border border-black p-2 text-left text-xs ${isEmptySlNo ? "border-t-0" : ""}`}>
                        {row.surveyNo1}
                      </td>
                      <td className={`border border-black p-2 ${isEmptySlNo ? "border-t-0" : ""}`}>{row.extentA1}</td>
                      <td className="border border-black p-2">{row.loanDisbursed}</td>
                      <td className="border border-black p-2 text-left text-xs">{row.surveyNo2}</td>
                      <td className="border border-black p-2 ">{row.extentA2}</td>
                     <td className="border border-black p-2 text-left">
  <div className="text-xs">
    <div className="font-semibold text-[10px]">{row.crop}</div>
  </div>
</td>
                      <td className="border border-black p-2">{row.cash}</td>
                      <td className="border border-black p-2">{row.kind}</td>
                      <td className="border border-black p-2">{row.verificationDate}</td>
                      <td className="border border-black p-2 text-left text-xs"></td>
                      <td className="border border-black p-2"></td>
                      <td className="border border-black p-2">{row.extentC2}</td>
                      <td className="border border-black p-2"></td>
                      <td className="border border-black p-2">{row.staffInitial}</td>
                      <td className="border border-black p-2">{row.supervisorInitial}</td>
                      <td className="border border-black p-2">{row.amDate}</td>
                      <td className="border border-black p-2">{row.amInitial}</td>
                      <td className="border border-black p-2">{row.eoDate}</td>
                    </tr>
                  )
                })}

                {currentPage === totalPages && (
                  <tr className="font-bold bg-gray-50">
                    <td className="border border-black p-2" colSpan={3}>
                      Total
                    </td>
                    <td className="border border-black p-2">{totals.totalCreditLimit.toLocaleString()}</td>
                    <td className="border border-black p-2" colSpan={2}></td>
                    <td className="border border-black p-2">{totals.totalLoanDisbursed.toLocaleString()}</td>
                    <td className="border border-black p-2" colSpan={2}></td>
                    <td className="border border-black p-2">
                      <div className="text-center">
                        <div>Total : {totals.totalCrops}</div>
                      </div>
                    </td>
                    <td className="border border-black p-2">{totals.totalCash.toLocaleString()}</td>
                    <td className="border border-black p-2"></td>
                    <td className="border border-black p-2" colSpan={10}></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 edit-section">
          <h2 className="text-lg font-bold mb-4">Edit Table Data</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2">Sl No</th>
                  <th className="border border-gray-300 p-2">M. No</th>
                  <th className="border border-gray-300 p-2">Name</th>
                  <th className="border border-gray-300 p-2">Credit Limit</th>
                  <th className="border border-gray-300 p-2">Survey No 1</th>
                  <th className="border border-gray-300 p-2">Extent A1</th>
                  <th className="border border-gray-300 p-2">Loan Disbursed</th>
                  <th className="border border-gray-300 p-2">Survey No 2</th>
                  <th className="border border-gray-300 p-2">Extent A2</th>
                  <th className="border border-gray-300 p-2">Crop</th>
                  <th className="border border-gray-300 p-2">Crop Count</th>
                  <th className="border border-gray-300 p-2">All Crops</th>
                  <th className="border border-gray-300 p-2">Cash</th>
                  <th className="border border-gray-300 p-2">Kind</th>
                  <th className="border border-gray-300 p-2">Verification Date</th>
                  <th className="border border-gray-300 p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-1">
                      <input
                        type="text"
                        value={row.slNo}
                        onChange={(e) => handleTableChange(index, "slNo", e.target.value)}
                        className="w-full px-2 py-1 text-xs border-none focus:outline-none"
                      />
                    </td>
                    <td className="border border-gray-300 p-1">
                      <input
                        type="text"
                        value={row.mNo}
                        onChange={(e) => handleTableChange(index, "mNo", e.target.value)}
                        className="w-full px-2 py-1 text-xs border-none focus:outline-none"
                      />
                    </td>
                    <td className="border border-gray-300 p-1">
                      <input
                        type="text"
                        value={row.name}
                        onChange={(e) => handleTableChange(index, "name", e.target.value)}
                        className="w-full px-2 py-1 text-xs border-none focus:outline-none"
                      />
                    </td>
                    <td className="border border-gray-300 p-1">
                      <input
                        type="text"
                        value={row.creditLimit}
                        onChange={(e) => handleTableChange(index, "creditLimit", e.target.value)}
                        className="w-full px-2 py-1 text-xs border-none focus:outline-none"
                      />
                    </td>
                    <td className="border border-gray-300 p-1">
                      <input
                        type="text"
                        value={row.surveyNo1}
                        onChange={(e) => handleTableChange(index, "surveyNo1", e.target.value)}
                        className="w-full px-2 py-1 text-xs border-none focus:outline-none"
                      />
                    </td>
                    <td className="border border-gray-300 p-1">
                      <input
                        type="text"
                        value={row.extentA1}
                        onChange={(e) => handleTableChange(index, "extentA1", e.target.value)}
                        className="w-full px-2 py-1 text-xs border-none focus:outline-none"
                      />
                    </td>
                    <td className="border border-gray-300 p-1">
                      <input
                        type="text"
                        value={row.loanDisbursed}
                        onChange={(e) => handleTableChange(index, "loanDisbursed", e.target.value)}
                        className="w-full px-2 py-1 text-xs border-none focus:outline-none"
                      />
                    </td>
                    <td className="border border-gray-300 p-1">
                      <input
                        type="text"
                        value={row.surveyNo2}
                        onChange={(e) => handleTableChange(index, "surveyNo2", e.target.value)}
                        className="w-full px-2 py-1 text-xs border-none focus:outline-none"
                      />
                    </td>
                    <td className="border border-gray-300 p-1">
                      <input
                        type="text"
                        value={row.extentA2}
                        onChange={(e) => handleTableChange(index, "extentA2", e.target.value)}
                        className="w-full px-2 py-1 text-xs border-none focus:outline-none"
                      />
                    </td>
                    <td className="border border-gray-300 p-1">
                      <input
                        type="text"
                        value={row.crop}
                        onChange={(e) => handleTableChange(index, "crop", e.target.value)}
                        className="w-full px-2 py-1 text-xs border-none focus:outline-none"
                      />
                    </td>
                    <td className="border border-gray-300 p-1 text-center">
                      <span className="text-sm font-semibold">{row.cropCount}</span>
                    </td>
                    <td className="border border-gray-300 p-1">
                      <div className="text-xs">
                        {row.allCrops.map((crop, idx) => (
                          <div key={idx}>{crop}</div>
                        ))}
                      </div>
                    </td>
                    <td className="border border-gray-300 p-1">
                      <input
                        type="text"
                        value={row.cash}
                        onChange={(e) => handleTableChange(index, "cash", e.target.value)}
                        className="w-full px-2 py-1 text-xs border-none focus:outline-none"
                      />
                    </td>
                    <td className="border border-gray-300 p-1">
                      <input
                        type="text"
                        value={row.kind}
                        onChange={(e) => handleTableChange(index, "kind", e.target.value)}
                        className="w-full px-2 py-1 text-xs border-none focus:outline-none"
                      />
                    </td>
                    <td className="border border-gray-300 p-1">
                      <input
                        type="text"
                        value={row.verificationDate}
                        onChange={(e) => handleTableChange(index, "verificationDate", e.target.value)}
                        className="w-full px-2 py-1 text-xs border-none focus:outline-none"
                      />
                    </td>
                    <td className="border border-gray-300 p-1 text-center">
                      <button onClick={() => removeRow(index)} className="text-red-600 hover:text-red-800">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CropVerificationAHUI
