import type { ComponentType } from "react"
import React from "react";
import { createRoot } from "react-dom/client"

export async function generatePDF(
  pages: Array<{ component: ComponentType<any>; props?: Record<string, any> }>,
  data: Record<string, any>,
) {
  try {
    // Dynamically import the heavy libraries only when needed
    const [{ jsPDF }, html2canvas] = await Promise.all([
      import("jspdf"), 
      import("html2canvas").then((m) => m.default)
    ])

    // Large format: 4000px wide × 5000px tall for high quality
    const pageWidth = 4000
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
      font-size: 30px;
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
            setTimeout(resolve, 500) // Additional delay for complex content
          })
        })
      })

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
          // Ensure fonts are loaded in cloned document
          const style = clonedDoc.createElement("style")
          style.textContent = `
            * { 
              font-family: Tamil, serif !important; 
              box-sizing: border-box;
            }
            body { 
              margin: 0; 
              padding: 0; 
              background: white;
            }
          `
          clonedDoc.head.appendChild(style)
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