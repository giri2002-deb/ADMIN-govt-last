"use client"

import type { ComponentType } from "react"
import React from "react"
import { createRoot } from "react-dom/client"

// Add this function at the top of the file
function preprocessElementForPDF(element: HTMLElement) {
  // Force standard colors on the element before PDF generation
  element.style.backgroundColor = "white"
  element.style.color = "black"

  // Apply specific color overrides
  const blueElements = element.querySelectorAll('.text-blue-600, [class*="text-blue"]')
  blueElements.forEach((el) => {
    ;(el as HTMLElement).style.color = "rgb(37, 99, 235)"
  })

  const redElements = element.querySelectorAll('.text-red-600, [class*="text-red"]')
  redElements.forEach((el) => {
    ;(el as HTMLElement).style.color = "rgb(220, 38, 38)"
  })

  const purpleElements = element.querySelectorAll('.text-purple-800, [class*="text-purple"]')
  purpleElements.forEach((el) => {
    ;(el as HTMLElement).style.color = "rgb(107, 33, 168)"
  })

  const purpleBorders = element.querySelectorAll('.border-purple-600, [class*="border-purple"]')
  purpleBorders.forEach((el) => {
    ;(el as HTMLElement).style.borderColor = "rgb(147, 51, 234)"
  })

  const redBorders = element.querySelectorAll('.border-red-600, [class*="border-red"]')
  redBorders.forEach((el) => {
    ;(el as HTMLElement).style.borderColor = "rgb(220, 38, 38)"
  })

  const grayBgs = element.querySelectorAll('.bg-gray-50, [class*="bg-gray-50"]')
  grayBgs.forEach((el) => {
    ;(el as HTMLElement).style.backgroundColor = "rgb(249, 250, 251)"
  })

  const gradients = element.querySelectorAll('.bg-gradient-to-r, [class*="bg-gradient"]')
  gradients.forEach((el) => {
    ;(el as HTMLElement).style.background =
      "linear-gradient(to right, rgb(251, 146, 60), rgb(34, 197, 94), rgb(59, 130, 246))"
  })
}

export async function generatePDF(
  pages: Array<{ component: ComponentType<any>; props?: Record<string, any> }>,
  data: Record<string, any>,
) {
  try {
    // Dynamically import the heavy libraries only when needed
    const [{ jsPDF }, html2canvas] = await Promise.all([import("jspdf"), import("html2canvas").then((m) => m.default)])

    // A4 portrait in pixels (72 dpi ≈ 794 × 1123 px)
    const pageWidth = 1000
    const pageHeight = 5000

    const pdf = new jsPDF({
      orientation: "p",
      unit: "px",
      format: [pageWidth, pageHeight],
      compress: true,
    })

    // Create a visible container for better rendering
    const mount = document.createElement("div")
    mount.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: ${pageWidth}px;
      height: ${pageHeight}px;
      background: white;
      z-index: 9999;
      overflow: hidden;
      font-family: Tamil, serif;
      font-size: 12px;
      line-height: 1.4;
    `
    document.body.appendChild(mount)

    // Add loading indicator
    const loadingDiv = document.createElement("div")
    loadingDiv.innerHTML = "PDF உருவாக்குகிறது... பக்கம் 0/" + pages.length
    loadingDiv.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0,0,0,0.8);
      color: white;
      padding: 20px;
      border-radius: 8px;
      z-index: 10000;
      font-family: Tamil, serif;
    `
    document.body.appendChild(loadingDiv)

    for (let i = 0; i < pages.length; i++) {
      const { component: Page, props = {} } = pages[i]

      // Update loading indicator
      loadingDiv.innerHTML = `PDF உருவாக்குகிறது... பக்கம் ${i + 1}/${pages.length}`

      // Clear previous content
      mount.innerHTML = ""

      // Create a wrapper div with proper styling
      const pageWrapper = document.createElement("div")
      pageWrapper.style.cssText = `
        width: ${pageWidth}px;
        height: ${pageHeight}px;
        background: white;
        position: relative;
        font-family: Tamil, serif;
        font-size: 12px;
        line-height: 1.4;
        overflow: hidden;
        padding: 20px;
        box-sizing: border-box;
      `
      mount.appendChild(pageWrapper)

      // Render the page into the wrapper
      const root = createRoot(pageWrapper)
      root.render(React.createElement(Page, { data, ...props }))

      // Wait for rendering to complete
      await new Promise((resolve) => {
        // Wait for multiple animation frames to ensure complete rendering
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setTimeout(resolve, 800) // Additional delay for complex content
          })
        })
      })

      // Add this line right before the html2canvas call:
      preprocessElementForPDF(pageWrapper)

      // Capture the rendered page with better options
      const canvas = await html2canvas(pageWrapper, {
        scale: 1.5, // Good balance between quality and performance
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        width: pageWidth,
        height: pageHeight,
        scrollX: 0,
        scrollY: 0,
        windowWidth: pageWidth,
        windowHeight: pageHeight,
        onclone: (clonedDoc) => {
          // Ensure fonts and styles are loaded in cloned document
          const style = clonedDoc.createElement("style")
          style.textContent = `
    * {
      font-family: Tamil, serif !important;
      box-sizing: border-box;
    }
    body {
      margin: 0;
      padding: 0;
      background: white !important;
    }
    table {
      table-layout: fixed !important;
      border-collapse: collapse !important;
    }
    th, td {
      border: 1px solid #9333ea !important;
      padding: 8px !important;
      word-wrap: break-word !important;
      overflow-wrap: break-word !important;
    }
    
    /* Force standard RGB colors to replace OKLCH */
    .text-blue-600, [class*="text-blue"] {
      color: #2563eb !important;
    }
    .text-red-600, [class*="text-red"] {
      color: #dc2626 !important;
    }
    .text-purple-800, [class*="text-purple"] {
      color: #6b21a8 !important;
    }
    .text-green-600, [class*="text-green"] {
      color: #16a34a !important;
    }
    .text-orange-400, [class*="text-orange"] {
      color: #fb923c !important;
    }
    .text-yellow-600, [class*="text-yellow"] {
      color: #ca8a04 !important;
    }
    
    /* Border colors */
    .border-purple-600, [class*="border-purple"] {
      border-color: #9333ea !important;
    }
    .border-red-600, [class*="border-red"] {
      border-color: #dc2626 !important;
    }
    .border-blue-600, [class*="border-blue"] {
      border-color: #2563eb !important;
    }
    
    /* Background colors */
    .bg-gray-50, [class*="bg-gray-50"] {
      background-color: #f9fafb !important;
    }
    .bg-gray-100, [class*="bg-gray-100"] {
      background-color: #f3f4f6 !important;
    }
    .bg-red-50, [class*="bg-red-50"] {
      background-color: #fef2f2 !important;
    }
    .bg-blue-50, [class*="bg-blue-50"] {
      background-color: #eff6ff !important;
    }
    .bg-green-50, [class*="bg-green-50"] {
      background-color: #f0fdf4 !important;
    }
    .bg-yellow-50, [class*="bg-yellow-50"] {
      background-color: #fefce8 !important;
    }
    .bg-purple-50, [class*="bg-purple-50"] {
      background-color: #faf5ff !important;
    }
    
    /* Gradient backgrounds - convert to solid colors */
    .bg-gradient-to-r, [class*="bg-gradient"] {
      background: linear-gradient(to right, #fb923c, #16a34a, #2563eb) !important;
    }
    
    /* Remove any OKLCH color references */
    [style*="oklch"], [class*="oklch"] {
      color: #000000 !important;
      background-color: transparent !important;
      border-color: #000000 !important;
    }
    
    /* Ensure all elements have standard colors */
    div, span, p, h1, h2, h3, h4, h5, h5, h6, td, th, table {
      color: inherit !important;
    }
    
    /* Force specific element colors */
    .pdf-page * {
      color: #000000 !important;
    }
    .pdf-page .text-blue-600 {
      color: #2563eb !important;
    }
    .pdf-page .text-red-600 {
      color: #dc2626 !important;
    }
    .pdf-page .text-purple-800 {
      color: #6b21a8 !important;
    }
  `
          clonedDoc.head.appendChild(style)

          // Force replace any remaining OKLCH colors in inline styles
          const allElements = clonedDoc.querySelectorAll("*")
          allElements.forEach((element) => {
            const htmlElement = element as HTMLElement
            if (htmlElement.style) {
              // Replace OKLCH colors with RGB equivalents
              const style = htmlElement.style.cssText
              if (style.includes("oklch")) {
                // Common OKLCH to RGB conversions
                const newStyle = style
                  .replace(/oklch$$[^)]+$$/g, "#000000") // Default to black for any OKLCH
                  .replace(/color:\s*oklch$$[^)]+$$/g, "color: #000000")
                  .replace(/background-color:\s*oklch$$[^)]+$$/g, "background-color: transparent")
                  .replace(/border-color:\s*oklch$$[^)]+$$/g, "border-color: #000000")

                htmlElement.style.cssText = newStyle
              }
            }
          })
        },
      })

      if (canvas.width === 0 || canvas.height === 0) {
        throw new Error(`Page ${i + 1} rendered with zero dimensions`)
      }

      const imgData = canvas.toDataURL("image/png", 0.95)

      // Verify image data is not empty
      if (imgData === "data:,") {
        throw new Error(`Page ${i + 1} generated empty image data`)
      }

      // Add to PDF
      if (i !== 0) {
        pdf.addPage([pageWidth, pageHeight])
      }

      pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight, undefined, "FAST")

      // Clean up React tree before next iteration
      root.unmount()

      // Small delay between pages
      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    // Remove temporary elements
    document.body.removeChild(mount)
    document.body.removeChild(loadingDiv)

    // Save the file with timestamp
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, "-")
    pdf.save(`KCC-Form-${timestamp}.pdf`)

    console.log("PDF generated successfully!")
  } catch (error) {
    console.error("PDF generation failed:", error)

    // Clean up any remaining elements
    const existingMount = document.querySelector('[style*="z-index: 9999"]')
    const existingLoading = document.querySelector('[style*="z-index: 10000"]')
    if (existingMount) document.body.removeChild(existingMount)
    if (existingLoading) document.body.removeChild(existingLoading)

    // Show user-friendly error
    alert("PDF உருவாக்குவதில் பிழை ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்.")
    throw error
  }
}
