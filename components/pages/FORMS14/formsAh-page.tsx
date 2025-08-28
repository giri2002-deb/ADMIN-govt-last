"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Download } from "lucide-react"
import { generatePDF } from "../../../lib/pdf-generator1"
import { formData as initialFormData } from "../../data/form-data"
import Page1 from "@/components/pages/KCCAHForm/page-1"
import Page2 from "@/components/pages/KCCAHForm/page-2"
import Page3 from "@/components/pages/KCCAHForm/page-3"
import Page4 from "@/components/pages/KCCAHForm/page-4"
import Page5 from "@/components/pages/KCCAHForm/page-5"
import Page6 from "@/components/pages/KCCAHForm/page-6"
import Page7 from "@/components/pages/KCCAHForm/page-7"
import Page8 from "@/components/pages/KCCAHForm/page-8"
import Page9 from "@/components/pages/KCCAHForm/page-9"
import Page10 from "@/components/pages/KCCAHForm/page-10"
import Page11 from "@/components/pages/KCCAHForm/page-11"
import StaticImagePage from "@/components/pages/static-image-page"
import PanCardPage from "@/components/pages/KCCAHForm/pan-card-page"
import RationCardPage from "@/components/pages/KCCAHForm/ration-card-page"
import AadharCardPage from "@/components/pages/KCCAHForm/aadhar-card-page"
import voter from "@/components/pages/KCCAHForm/voter"

const pages = [
  { component: Page1, title: "பயிர்கடன் வேண்டிய உறுப்பினர் கடன் விண்ணப்பம்" },
  { component: Page2, title: "KCC விண்ணப்ப படிவம்" },
  { component: Page3, title: "நிலை அடிமானமாக இருந்தால் விபரம்" },
  { component: Page4, title: "அனுவலக உபயோகத்திற்கு" },
  { component: Page5, title: "பிடிவம் எண் - 26" },
  { component: Page6, title: "இணைப்பு" },
  { component: Page7, title: "சங்க உறுப்பினர் கொடுக்கும் சான்றிதழ்" },
 
  // {
  //   component: StaticImagePage,
  //   title: "கூடுதல் ஆவணம் 1",
  //   props: {
  //     imageUrl:
  //       "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kcc%20file%20model_page-0007.jpg-I4QBq60HgAxEfsPVpQscyCV5gj4BNi.jpeg",
  //   },
  // },
  { component: PanCardPage, title: "PAN கார்டு", props: {} },
  { component: RationCardPage, title: "ரேஷன் கார்டு", props: {} },
  { component: AadharCardPage, title: "ஆதார் கார்டு", props: {} },
   { component: voter, title: "voter", props: {} },
]

export default function FormsAHPage() {
  const [currentPage, setCurrentPage] = useState(0)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [uNumber, setUNumber] = useState("")
  const [formDataState, setFormDataState] = useState(initialFormData)

  // Load from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("kccah_userjson")
      if (stored) {
        setFormDataState(JSON.parse(stored))
      }
    } catch (err) {
      console.warn("Invalid stored user data. Resetting...")
      localStorage.removeItem("kccah_userjson")
    }
  }, [])

  // Navigation
  const nextPage = () => currentPage < pages.length - 1 && setCurrentPage(currentPage + 1)
  const prevPage = () => currentPage > 0 && setCurrentPage(currentPage - 1)

const handleSearchUserData = async () => {
  const trimmedUNumber = uNumber.trim();
  if (!trimmedUNumber) {
    alert("உ_எண் உள்ளிடவும்");
    return;
  }
const API_URL = process.env.NEXT_PUBLIC_API_URL;
  try {
    const res = await fetch(`${API_URL}/api/user-data-kccah/${trimmedUNumber}`);
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "பயனர் கிடைக்கவில்லை");
    }

    const userData = await res.json();
    
    // Check if user has KCC loan type
    if (userData.loantype && userData.loantype !== "KCCAH") {
      alert("இந்த உ_எண் NO in KCCAH ");
      return;
    }
    
    setFormDataState(userData);
    localStorage.setItem("kccah_userjson", JSON.stringify(userData));
    console.log(localStorage.kccah_userjson)
    alert("✅ KCCAH கடன் பயனர் தகவல் பெறப்பட்டது");
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching user data:", error);
      alert(error.message || "பயனர் தரவுகளை பெற முடியவில்லை");
    } else {
      console.error("Unknown error fetching user data:", error);
      alert("தற்சமயம் தவறான நிலை ஏற்பட்டது");
    }
  }
};



  const handleClearData = () => {
    setFormDataState(initialFormData)
    localStorage.removeItem("kccah_userjson")
    alert("தகவல் அழிக்கப்பட்டது")
  }

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true)
    try {
      await generatePDF(pages, formDataState)
    } catch (error) {
      console.error("PDF generation failed:", error)
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const CurrentPageComponent = pages[currentPage].component
  const pageProps = pages[currentPage].props || {}

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">KCCAH விண்ணப்ப படிவம்</h1>
              <p className="text-gray-600">
                பக்கம் {currentPage + 1} / {pages.length} - {pages[currentPage].title}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="உ_எண் உள்ளிடவும்"
                value={uNumber}
                onChange={(e) => setUNumber(e.target.value)}
                className="border rounded px-2 py-1 text-sm w-40"
              />
              <Button
                onClick={handleSearchUserData}
                className="bg-blue-600 hover:bg-blue-700 text-white"
                size="sm"
              >
                தேடு
              </Button>

              <Button onClick={prevPage} disabled={currentPage === 0} variant="outline" size="sm">
                <ChevronLeft className="w-4 h-4 mr-1" />
                முந்தைய
              </Button>
              <Button
                onClick={nextPage}
                disabled={currentPage === pages.length - 1}
                variant="outline"
                size="sm"
              >
                அடுத்த
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>

              {currentPage === pages.length - 1 && (
                <Button
                  onClick={handleDownloadPDF}
                  disabled={isGeneratingPDF}
                  className="bg-green-600 hover:bg-green-700"
                  size="sm"
                >
                  <Download className="w-4 h-4 mr-1" />
                  {isGeneratingPDF ? "உருவாக்குகிறது..." : "PDF பதிவிறக்கம்"}
                </Button>
              )}

              <Button onClick={handleClearData} variant="outline" size="sm" className="ml-2">
                அழி (Clear)
              </Button>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="bg-white rounded-lg shadow-lg ">
          <div
            id={`page-${currentPage}`}
            className="w-[816px] h-[2500px] mx-auto bg-white relative mx-auto bg-white relative "
            style={{
              fontFamily: "Tamil, 'Noto Sans Tamil', serif",
              fontSize: "12px",
              lineHeight: "1.4",
              color: "#000000",
            }}
          >
            <CurrentPageComponent data={formDataState}  />
          </div>
        </div>

        {/* Page Navigation */}
        <div className="flex justify-center mt-6 gap-2">
          {pages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                index === currentPage
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
