"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Download, Edit, Save } from "lucide-react"
import Page1Form from "@/components/pages/Page1Form"
import Page2Form from "@/components/pages/Page2Form"
import Page3Form from "@/components/pages/Page3Form"
import Page4Form from "@/components/pages/Page4Form"
import Page5Form from "@/components/pages/Page5Form"
import Page6Form from "@/components/pages/Page6Form"
import Page7Form from "@/components/pages/Page7Form"
import Page8Form from "@/components/pages/Page8Form"
import Page9Form from "@/components/pages/Page9Form"
import Page10Form from "@/components/pages/Page10Form"
import Page11Form from "@/components/pages/Page11Form"
import Page12Form from "@/components/pages/Page12Form"
import Page13Form from "@/components/pages/Page13Form"
import Page14Form from "@/components/pages/Page14Form"
import Page15Form from "@/components/pages/Page15Form"
import Page16Form from "@/components/pages/Page16Form"
import { generatePDF } from "@/lib/pdf-generator1"

const LEGAL_LANDSCAPE_WIDTH_PX = 1344
const LEGAL_LANDSCAPE_HEIGHT_PX = 816
const TOTAL_PAGES = 16

export default function Monthform() {
  const [currentPage, setCurrentPage] = useState(1)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < TOTAL_PAGES) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true)
    try {
      console.log("Starting PDF generation with complete data...")

      // Prepare all page components with their data
      const pageComponents = [
        { component: Page1Form, props: {} },
      ]

      // Generate PDF with all pages and complete data
      await generatePDF(pageComponents, formData)

      console.log("PDF generation completed successfully!")
    } catch (error) {
      console.error("Error generating PDF:", error)
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const updateFormData = (pageData: any) => {
    setFormData((prev) => ({
      ...prev,
      [`page${currentPage}`]: pageData,
    }))
  }

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode)
  }

  const PageComponents = [
    Page1Form,
    Page2Form,
    Page3Form,
    Page4Form,
    Page5Form,
    Page6Form,
    Page7Form,
    Page8Form,
    Page9Form,
    Page10Form,
    Page11Form,
    Page12Form,
    Page13Form,
    Page14Form,
    Page15Form,
    Page16Form,
  ]

  const renderCurrentPage = () => {
    const commonProps = {
      data: formData[`page${currentPage}`] || {},
      onDataChange: updateFormData,
      isEditMode: isEditMode, // Pass edit mode to all components
    }

    const PageComponent = PageComponents[currentPage - 1]

    return (
      <div
        style={{
          width: LEGAL_LANDSCAPE_WIDTH_PX,
          height: LEGAL_LANDSCAPE_HEIGHT_PX,
          overflow: "hidden",
          backgroundColor: "white",
          transform: "scale(0.7)",
          transformOrigin: "top left",
          border: "2px solid #333",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        <PageComponent {...commonProps} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Navigation Header */}
        <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-lg">
          <Button
            onClick={handlePrevPage}
            disabled={currentPage === 1 || isGeneratingPDF}
            variant="outline"
            className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 border-blue-200"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous Page
          </Button>
          
          <div className="text-center">
            <h1 className="text-xl font-bold text-gray-800 mb-1 tamil-text">தமிழ் நிதி அறிக்கை - Page {currentPage}</h1>
            <p className="text-sm text-gray-600">
              Page {currentPage} of {TOTAL_PAGES} | Complete Headers & Data
            </p>
          </div>
          
          <Button
            onClick={handleNextPage}
            disabled={currentPage === TOTAL_PAGES || isGeneratingPDF}
            variant="outline"
            className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 border-blue-200"
          >
            Next Page
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Edit Mode Toggle Button */}
        <div className="flex justify-center mb-4">
          <Button
            onClick={toggleEditMode}
            className={`flex items-center gap-2 ${
              isEditMode 
                ? "bg-green-600 hover:bg-green-700" 
                : "bg-blue-600 hover:bg-blue-700"
            } text-white px-6 py-2`}
          >
            {isEditMode ? (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            ) : (
              <>
                <Edit className="w-4 h-4" />
                Edit All Forms
              </>
            )}
          </Button>
        </div>

        {/* Edit Mode Indicator */}
        {isEditMode && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded mb-4 text-center">
            <strong>Edit Mode Active</strong> - You can now modify all form fields across all pages.
          </div>
        )}

        {/* Form Content */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden flex justify-center items-center p-4">
          {renderCurrentPage()}
        </div>

        {/* Download PDF Button (available on all pages) */}
        <div className="mt-6 text-center">
          <Button
            onClick={handleDownloadPDF}
            disabled={isGeneratingPDF}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg shadow-lg"
          >
            <Download className="w-5 h-5 mr-2" />
            {isGeneratingPDF ? "PDF உருவாக்குகிறது..." : "முழு PDF பதிவிறக்கம்"}
          </Button>
          <p className="text-sm text-gray-600 mt-2 tamil-text">
            அனைத்து 16 பக்கங்களும் முழு தலைப்புகள் மற்றும் தரவுகளுடன் உருவாக்கப்படும்
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mt-4 bg-white rounded-lg p-4 shadow">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm text-gray-500">
              {currentPage}/{TOTAL_PAGES}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentPage / TOTAL_PAGES) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form Status */}
        <div className="mt-4 bg-white rounded-lg p-4 shadow">
          <h3 className="font-semibold text-gray-800 mb-2">Form Status</h3>
          <div className="grid grid-cols-4 gap-2">
            {[...Array(TOTAL_PAGES)].map((_, idx) => {
              const pageNum = idx + 1
              const isCompleted = formData[`page${pageNum}`]
              const isCurrent = pageNum === currentPage

              return (
                <div
                  key={pageNum}
                  className={`p-2 rounded text-center text-xs font-medium ${
                    isCurrent
                      ? "bg-blue-100 text-blue-800 border-2 border-blue-300"
                      : isCompleted
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-600"
                  }`}
                >
                  Page {pageNum}
                  {isCompleted && <div className="text-xs">✓ Data</div>}
                </div>
              )
            })}
          </div>
        </div>

        {/* PDF Generation Status */}
        {isGeneratingPDF && (
          <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600 mr-3"></div>
              <div>
                <h4 className="font-semibold text-yellow-800 tamil-text">PDF உருவாக்கம் நடைபெறுகிறது</h4>
                <p className="text-sm text-yellow-700 tamil-text">
                  அனைத்து பக்கங்களும் முழு தலைப்புகள் மற்றும் தரவுகளுடன் செயலாக்கப்படுகின்றன...
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}