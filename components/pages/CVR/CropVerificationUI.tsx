import { useState, useRef, useEffect } from "react"
import { Download, Plus, Trash2, Loader2, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { generatePDF } from "@/utils/pdfGenerator"
import CropVerificationTable from "./CropVerificationTable"

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

function CropVerificationUI() {
  const tableRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [useMockData, setUseMockData] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    month: "May-24",
    societyName: "S.331, இடங்கணசாலை தொடக்க வேளாண்மை கூட்டுறு கடன் சங்கம் வனை.,",
    disbursementDate: "15-05-2024",
  })

  const [tableData, setTableData] = useState<TableRow[]>([])
  const [numberValue, setNumberValue] = useState(1)

  // Load from localStorage on mount
  useEffect(() => {
    const savedValue = localStorage.getItem("myNumber")
    if (savedValue) {
      setNumberValue(Number(savedValue))
    }
  }, [])

  const ITEMS_PER_PAGE = Number(numberValue)

  // Save to localStorage whenever numberValue changes
  useEffect(() => {
    localStorage.setItem("myNumber", numberValue.toString())
  }, [numberValue])

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
const API_URL = process.env.NEXT_PUBLIC_API_URL;
  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      setError(null)
      try {
        console.log("Fetching data from API...")
        const response = await fetch(`${API_URL}/api/kccdata`)

        if (!response.ok) {
          throw new Error(`API not available: ${response.statusText}`)
        }

        const jsonData: ApiResponse = await response.json()
        console.log("Successfully fetched data from API")
        processData(jsonData)
      } catch (err: any) {
        console.warn("API fetch failed, using mock data:", err.message)
        setUseMockData(true)
        createMockData()
      } finally {
        setLoading(false)
      }
    }

    function createMockData() {
      const mockTableData: TableRow[] = []
      for (let i = 1; i <= 10; i++) {
        mockTableData.push({
          slNo: i.toString(),
          mNo: `M${1000 + i}`,
          name: `Member ${i}`,
          creditLimit: (50000 + i * 1000).toString(),
          surveyNo1: `Survey-${i}/1, Survey-${i}/2`,
          extentA1: (2.5 + i * 0.1).toFixed(2),
          extentC1: "",
          loanDisbursed: (45000 + i * 1000).toString(),
          surveyNo2: `Survey-${i}/1`,
          extentA2: (1.2 + i * 0.05).toFixed(2),
          extentC2: "",
          crop: `Crop ${i % 3 === 0 ? 'Paddy' : i % 2 === 0 ? 'Sugarcane' : 'Cotton'}`,
          cropCount: 1,
          allCrops: [`Crop ${i % 3 === 0 ? 'Paddy' : i % 2 === 0 ? 'Sugarcane' : 'Cotton'}`],
          cash: (42000 + i * 950).toString(),
          kind: " ",
          verificationDate: " ",
          verifiedCrop: " ",
          verifiedCash: "",
          verifiedKind: " ",
          landVerifiedDate: " ",
          staffInitial: " ",
          supervisorInitial: " ",
          amDate: " ",
          amInitial: " ",
          eoDate: " ",
          eoInitial: " ",
        })
      }
      setTableData(mockTableData)
    }

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

        // If user has no crops, create a default empty row
        if (!member.selectedCrops || member.selectedCrops.length === 0) {
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
            extentA2: "0",
            extentC2: "",
            crop: "",
            cropCount: 0,
            allCrops: [],
            cash: "0",
            kind: " ",
            verificationDate: " ",
            verifiedCrop: " ",
            verifiedCash: "",
            verifiedKind: " ",
            landVerifiedDate: " ",
            staffInitial: " ",
            supervisorInitial: " ",
            amDate: " ",
            amInitial: " ",
            eoDate: " ",
            eoInitial: " ",
          });
          slNoCounter++;
          return;
        }

        // If user has crops (single or multiple)
        member.selectedCrops.forEach((crop, cropIndex) => {
          const isFirstCrop = cropIndex === 0;

          membersMapped.push({
            slNo: isFirstCrop ? slNoCounter.toString() : "",
            mNo: isFirstCrop ? member.userInformation?.உ_எண் || member.id.substring(0, 6) : "",
            name: isFirstCrop ? member.memberName : "",
            creditLimit: crop.eligibleAmount?.toString() || "0",
            surveyNo1: isFirstCrop ? surveyNumbers : "",
            extentA1: isFirstCrop ? totalExtent : "",
            extentC1: "",
            loanDisbursed: crop.eligibleAmount?.toString() || "0",
            surveyNo2: surveyNumbers,
            extentA2: crop.breakdown?.cents?.toString() || "0",
            extentC2: "",
            crop: crop.cropName || "",
            cropCount: member.selectedCrops.length,
            allCrops: member.selectedCrops.map(c => c.cropName || ""),
            cash: Math.floor((crop.eligibleAmount || 0) * 0.95).toString(),
            kind: " ",
            verificationDate: " ",
            verifiedCrop: " ",
            verifiedCash: "",
            verifiedKind: " ",
            landVerifiedDate: " ",
            staffInitial: " ",
            supervisorInitial: " ",
            amDate: " ",
            amInitial: " ",
            eoDate: " ",
            eoInitial: " ",
          });
        });

        slNoCounter++;
      });

      setTableData(membersMapped);
    }

    fetchData()
  }, [])

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
    toast({
      title: "Row Added",
      description: "New row has been added to the table",
    })
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
    toast({
      title: "Row Removed",
      description: "Row has been removed from the table",
    })
  }

  const calculateTotals = () => {
    const totalCreditLimit = tableData.reduce((sum, row) => sum + (Number.parseFloat(row.creditLimit) || 0), 0)
    const totalLoanDisbursed = tableData.reduce((sum, row) => sum + (Number.parseFloat(row.loanDisbursed) || 0), 0)
    const totalExtentA1 = tableData.reduce((sum, row) => sum + (Number.parseFloat(row.extentA1) || 0), 0)
    const totalCash = tableData.reduce((sum, row) => sum + (Number.parseFloat(row.cash) || 0), 0)
    const totalKind = tableData.reduce((sum, row) => sum + (Number.parseFloat(row.kind) || 0), 0)
    const totalCrops = tableData.reduce((sum, row) => sum + row.cropCount, 0)

    return {
      totalCreditLimit,
      totalLoanDisbursed,
      totalExtentA1,
      totalCash,
      totalKind,
      totalCrops,
    }
  }

  const totalPages = Math.ceil(tableData.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentPageData = tableData.slice(startIndex, endIndex)

const handleGeneratePDF = async () => {
  try {
    toast({
      title: "Generating PDF",
      description: "Please wait while we generate your PDF...",
    })

    const totals = calculateTotals()
    const pages: any[] = []

    for (let page = 1; page <= totalPages; page++) {
      const pageStartIndex = (page - 1) * ITEMS_PER_PAGE
      const pageEndIndex = pageStartIndex + ITEMS_PER_PAGE

      pages.push({
        component: CropVerificationTable,
        props: {
          currentPage: page,
          totalPages: totalPages,
          startIndex: pageStartIndex,  // ✅ pass per-page slice
          endIndex: pageEndIndex       // ✅ pass per-page slice
        }
      })
    }

    // Just pass the full dataset once
    const data = {
      tableData,
      formData,
      totals,
    }

    await generatePDF(pages, data)

    toast({
      title: "PDF Generated Successfully!",
      description: "Your crop verification register has been downloaded.",
    })
  } catch (error) {
    console.error("PDF generation failed:", error)
    toast({
      title: "PDF Generation Failed",
      description: "There was an error generating the PDF. Please try again.",
      variant: "destructive",
    })
  }
}



  const totals = calculateTotals()

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8">
          <div className="flex items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <div>
              <h3 className="font-semibold text-lg">Loading Crop Verification Data</h3>
              <p className="text-muted-foreground">Please wait while we fetch your data...</p>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 max-w-md">
          <div className="text-center">
            <div className="text-destructive mb-4 text-lg font-semibold">Error Loading Data</div>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button
              onClick={() => window.location.reload()}
              variant="default"
            >
              Retry
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-subtle p-6">
      <div className="max-w-full mx-auto">
        {useMockData && (
          <Card className="mb-6 border-warning bg-warning/10">
            <CardContent className="p-4">
              <p className="text-sm text-warning-foreground">
                <strong>Note:</strong> Using mock data because API server is not available. To use real data, ensure your
                API server is running at http://localhost:5000/api/kccdata
              </p>
            </CardContent>
          </Card>
        )}

        {/* Header Controls */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Crop Verification Register
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 justify-between items-center">
              <div className="flex gap-2">
                <Button
                  onClick={addRow}
                  variant="default"
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Row
                </Button>
                <Button
                  onClick={handleGeneratePDF}
                  variant="success"
                  size="sm"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Generate PDF
                </Button>
              </div>
              
              <div className="flex items-center gap-2">
                <Label htmlFor="rows-per-page" className="text-sm font-medium">
                  Rows per page:
                </Label>
                <Input
                  id="rows-per-page"
                  type="number"
                  className="w-20"
                  value={numberValue}
                  onChange={(e) => setNumberValue(Number(e.target.value))}
                  min="1"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pagination */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex justify-center items-center gap-4">
              <Button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                variant="outline"
                size="sm"
              >
                Previous
              </Button>
              <span className="text-sm font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                variant="outline"
                size="sm"
              >
                Next
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Form Inputs */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Form Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="month">Month</Label>
                <Input
                  id="month"
                  type="text"
                  value={formData.month}
                  onChange={(e) => handleFormChange("month", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="society">Name of the Society</Label>
                
              <Input
                  id="society"
                  type="text"
                  value={formData.societyName}
                  onChange={(e) => handleFormChange("societyName", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="disbursement">Date of Disbursement</Label>
                <Input
                  id="disbursement"
                  type="text"
                  value={formData.disbursementDate}
                  onChange={(e) => handleFormChange("disbursementDate", e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Table Display */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div ref={tableRef} className="overflow-x-auto">
              <CropVerificationTable 
                data={{
                  tableData: currentPageData,
                  formData,
                  totals,
                  startIndex,
                  endIndex
                }}
                currentPage={currentPage}
                totalPages={totalPages}
              />
            </div>
          </CardContent>
        </Card>

        {/* Edit Table Data */}
        <Card>
          <CardHeader>
            <CardTitle>Edit Table Data</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-border">
                <thead>
                  <tr className="bg-muted">
                    <th className="border border-border p-2 text-left">Sl No</th>
                    <th className="border border-border p-2 text-left">M. No</th>
                    <th className="border border-border p-2 text-left">Name</th>
                    <th className="border border-border p-2 text-left">Credit Limit</th>
                    <th className="border border-border p-2 text-left">Survey No 1</th>
                    <th className="border border-border p-2 text-left">Extent A1</th>
                    <th className="border border-border p-2 text-left">Loan Disbursed</th>
                    <th className="border border-border p-2 text-left">Survey No 2</th>
                    <th className="border border-border p-2 text-left">Extent A2</th>
                    <th className="border border-border p-2 text-left">Crop</th>
                    <th className="border border-border p-2 text-left">Cash</th>
                    <th className="border border-border p-2 text-left">Kind</th>
                    <th className="border border-border p-2 text-left">Verification Date</th>
                    <th className="border border-border p-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, index) => (
                    <tr key={index} className="hover:bg-muted/50">
                      <td className="border border-border p-1">
                        <Input
                          type="text"
                          value={row.slNo}
                          onChange={(e) => handleTableChange(index, "slNo", e.target.value)}
                          className="border-none bg-transparent text-xs"
                        />
                      </td>
                      <td className="border border-border p-1">
                        <Input
                          type="text"
                          value={row.mNo}
                          onChange={(e) => handleTableChange(index, "mNo", e.target.value)}
                          className="border-none bg-transparent text-xs"
                        />
                      </td>
                      <td className="border border-border p-1">
                        <Input
                          type="text"
                          value={row.name}
                          onChange={(e) => handleTableChange(index, "name", e.target.value)}
                          className="border-none bg-transparent text-xs"
                        />
                      </td>
                      <td className="border border-border p-1">
                        <Input
                          type="text"
                          value={row.creditLimit}
                          onChange={(e) => handleTableChange(index, "creditLimit", e.target.value)}
                          className="border-none bg-transparent text-xs"
                        />
                      </td>
                      <td className="border border-border p-1">
                        <Input
                          type="text"
                          value={row.surveyNo1}
                          onChange={(e) => handleTableChange(index, "surveyNo1", e.target.value)}
                          className="border-none bg-transparent text-xs"
                        />
                      </td>
                      <td className="border border-border p-1">
                        <Input
                          type="text"
                          value={row.extentA1}
                          onChange={(e) => handleTableChange(index, "extentA1", e.target.value)}
                          className="border-none bg-transparent text-xs"
                        />
                      </td>
                      <td className="border border-border p-1">
                        <Input
                          type="text"
                          value={row.loanDisbursed}
                          onChange={(e) => handleTableChange(index, "loanDisbursed", e.target.value)}
                          className="border-none bg-transparent text-xs"
                        />
                      </td>
                      <td className="border border-border p-1">
                        <Input
                          type="text"
                          value={row.surveyNo2}
                          onChange={(e) => handleTableChange(index, "surveyNo2", e.target.value)}
                          className="border-none bg-transparent text-xs"
                        />
                      </td>
                      <td className="border border-border p-1">
                        <Input
                          type="text"
                          value={row.extentA2}
                          onChange={(e) => handleTableChange(index, "extentA2", e.target.value)}
                          className="border-none bg-transparent text-xs"
                        />
                      </td>
                      <td className="border border-border p-1">
                        <Input
                          type="text"
                          value={row.crop}
                          onChange={(e) => handleTableChange(index, "crop", e.target.value)}
                          className="border-none bg-transparent text-xs"
                        />
                      </td>
                      <td className="border border-border p-1">
                        <Input
                          type="text"
                          value={row.cash}
                          onChange={(e) => handleTableChange(index, "cash", e.target.value)}
                          className="border-none bg-transparent text-xs"
                        />
                      </td>
                      <td className="border border-border p-1">
                        <Input
                          type="text"
                          value={row.kind}
                          onChange={(e) => handleTableChange(index, "kind", e.target.value)}
                          className="border-none bg-transparent text-xs"
                        />
                      </td>
                      <td className="border border-border p-1">
                        <Input
                          type="text"
                          value={row.verificationDate}
                          onChange={(e) => handleTableChange(index, "verificationDate", e.target.value)}
                          className="border-none bg-transparent text-xs"
                        />
                      </td>
                      <td className="border border-border p-1 text-center">
                        <Button 
                          onClick={() => removeRow(index)} 
                          variant="destructive"
                          size="sm"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

}

export default CropVerificationUI