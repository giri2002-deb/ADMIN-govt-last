"use client"

import type { ComponentType } from "react"
import React from "react"
import { createRoot } from "react-dom/client"

export async function generatePDF(
  pages: Array<{ component: ComponentType<any>; props?: Record<string, any> }>,
  data: Record<string, any>,
  options: { autoDownload?: boolean; filename?: string; landscape?: boolean } = {},
) {
  const { autoDownload = false, filename, landscape = true } = options

  try {
    const [{ jsPDF }, html2canvas] = await Promise.all([import("jspdf"), import("html2canvas").then((m) => m.default)])

    const pageWidth = 2000
    const pageHeight =1500

    const pdf = new jsPDF({
      orientation: landscape ? "l" : "p",
      unit: "px",
      format: [pageWidth, pageHeight],
      compress: true,
    })

    // Create a temporary container for rendering
    const mount = document.createElement("div")
    mount.id = "pdf-generation-container"
    mount.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: ${pageWidth}px;
      height: ${pageHeight}px;
      background: white;
      z-index: 9999;
      overflow: hidden;
      font-family: 'Noto Sans Tamil', Tamil, serif;
      font-size: 11px;
      line-height: 1.3;
      visibility: visible;
      opacity: 1;
    `
    document.body.appendChild(mount)

    // Add font CSS before rendering
    const fontCSS = document.createElement("style")
    fontCSS.setAttribute("data-pdf-fonts", "yes")
    fontCSS.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@400;700&display=swap');
      #pdf-generation-container * {
        font-family: 'Noto Sans Tamil', Tamil, serif !important;
      }
    `
    document.head.appendChild(fontCSS)

    // Add loading indicator
    const loadingDiv = document.createElement("div")
    loadingDiv.innerHTML = "PDF தயாரிக்கப்படுகிறது... பக்கம் 0/" + pages.length
    loadingDiv.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0,0,0,0.9);
      color: white;
      padding: 30px 40px;
      border-radius: 10px;
      z-index: 10000;
      font-family: 'Noto Sans Tamil', Tamil, serif;
      font-size: 16px;
      font-weight: bold;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    `
    document.body.appendChild(loadingDiv)

    // Ensure fonts are loaded before first render
    if (document.fonts && document.fonts.ready) await document.fonts.ready

    for (let i = 0; i < pages.length; i++) {
      const { component: Page, props = {} } = pages[i]

      loadingDiv.innerHTML = `PDF தயாரிக்கப்படுகிறது... பக்கம் ${i + 1}/${pages.length}`

      mount.innerHTML = ""

      const pageWrapper = document.createElement("div")
      pageWrapper.style.cssText = `
        width: ${pageWidth}px;
        height: ${pageHeight}px;
        background: white;
        position: relative;
        font-family: 'Noto Sans Tamil', Tamil, serif;
        font-size: 11px;
        line-height: 1.3;
        overflow: hidden;
        color: #000000;
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      `
      mount.appendChild(pageWrapper)

      // Render the React component
      const root = createRoot(pageWrapper)
      root.render(React.createElement(Page, props))

      // Wait for component to render completely
      await new Promise((resolve) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setTimeout(resolve, 2000)
            })
          })
        })
      })

      // Wait for images to load
      const images = pageWrapper.querySelectorAll("img")
      if (images.length > 0) {
        await Promise.all(
          Array.from(images).map((img) => {
            if (img.complete && img.naturalWidth > 0) return Promise.resolve()
            return new Promise((resolve) => {
              const timeout = setTimeout(() => resolve(undefined), 5000)
              img.onload = img.onerror = () => {
                clearTimeout(timeout)
                resolve(undefined)
              }
            })
          })
        )
      }

      // Enhanced table header styling with better support for rowspan/colspan
      const allTables = pageWrapper.querySelectorAll("table")
      allTables.forEach(table => {
        table.style.tableLayout = "fixed"
        table.style.width = "100%"
        table.style.borderCollapse = "separate"
        table.style.borderSpacing = "0"
        table.style.border = "2px solid #000000"
        
        // Style all table headers (th elements)
        const ths = table.querySelectorAll("th")
        ths.forEach(th => {
          th.style.backgroundColor = "#f3f4f6 !important"
          th.style.fontWeight = "bold !important"
          th.style.border = "2px solid #000000 !important"
          th.style.padding = "8px !important"
          th.style.textAlign = "center !important"
          th.style.verticalAlign = "middle !important"
          th.style.fontSize = "14px !important"
          th.style.fontFamily = "'Noto Sans Tamil', Tamil, serif !important"
          th.style.wordBreak = "keep-all !important"
          th.style.whiteSpace = "8px !important"
          th.style.lineHeight = "1.2 !important"
          th.style.color = "#000000 !important"
          th.style.display = "table-cell !important"
          
          // Ensure header text is visible
          if (!th.textContent || th.textContent.trim() === "") {
            th.innerHTML = "&nbsp;"
          }
          
          // Force specific styling for complex headers
          if (th.hasAttribute('rowspan') || th.hasAttribute('colspan')) {
            th.style.position = "relative"
            th.style.zIndex = "1"
            th.style.backgroundColor = "#f3f4f6"
            th.style.borderWidth = "1px"
            th.style.borderStyle = "solid"
            th.style.borderColor = "#000000"
          }
        })
        
        // Style table body cells
        const tds = table.querySelectorAll("td")
        tds.forEach(td => {
          td.style.border = "1px solid #000000 !important"
          td.style.padding = "8px !important"
          td.style.fontSize = "14px !important"
          td.style.fontFamily = "'Noto Sans Tamil', Tamil, serif !important"
          td.style.color = "#000000 !important"
        })
      })

      // Additional wait for styling to apply
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Wait for fonts (again) for each page
      if (document.fonts && document.fonts.ready) await document.fonts.ready

      const canvas = await html2canvas(pageWrapper, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        width: pageWidth,
        height: pageHeight,
        scrollX: 0,
        scrollY: 0,
        windowWidth: pageWidth,
        windowHeight: pageHeight,
        logging: false,
        imageTimeout: 10000,
        removeContainer: true,
        ignoreElements: (element) => element.tagName === "SCRIPT" || element.tagName === "STYLE",
        onclone: (clonedDoc, element) => {
          // Enhanced table header fix in cloned document
          const tables = element.querySelectorAll("table")
          tables.forEach(table => {
            table.style.tableLayout = 'fixed'
            table.style.width = '100%'
            table.style.borderCollapse = 'separate'
            table.style.borderSpacing = '0'
            table.style.border = '2px solid #000000'
            
            const headers = table.querySelectorAll('th')
            headers.forEach((th) => {
              // Apply comprehensive header styling
              th.style.setProperty('background-color', '#f3f4f6', 'important')
              th.style.setProperty('font-weight', 'bold', 'important')
              th.style.setProperty('border', '1px solid #000000', 'important')
              th.style.setProperty('padding', '6px', 'important')
              th.style.setProperty('text-align', 'center', 'important')
              th.style.setProperty('vertical-align', 'middle', 'important')
              th.style.setProperty('font-size', '11px', 'important')
              th.style.setProperty('font-family', "'Noto Sans Tamil', Tamil, serif", 'important')
              th.style.setProperty('word-break', 'keep-all', 'important')
              th.style.setProperty('white-space', 'normal', 'important')
              th.style.setProperty('line-height', '1.2', 'important')
              th.style.setProperty('color', '#000000', 'important')
              th.style.setProperty('display', 'table-cell', 'important')
              
              // Special handling for complex headers
              if (th.hasAttribute('rowspan') || th.hasAttribute('colspan')) {
                th.style.setProperty('position', 'relative', 'important')
                th.style.setProperty('z-index', '1', 'important')
                th.style.setProperty('border-width', '2px', 'important')
                th.style.setProperty('border-style', 'solid', 'important')
                th.style.setProperty('border-color', '#000000', 'important')
              }
              
              // Ensure header text
              if (!th.textContent || th.textContent.trim() === '') {
                th.innerHTML = '&nbsp;'
              }
            })
            
            const tds = table.querySelectorAll('td')
            tds.forEach((td) => {
              td.style.setProperty('border', '1px solid #000000', 'important')
              td.style.setProperty('padding', '8px', 'important')
              td.style.setProperty('font-size', '14px', 'important')
              td.style.setProperty('font-family', "'Noto Sans Tamil', Tamil, serif", 'important')
              td.style.setProperty('color', '#000000', 'important')
            })
          })
          
          // Inject comprehensive styling
          const style = document.createElement("style")
          style.textContent = `
            @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@400;700&display=swap');
            * { 
              font-family: 'Noto Sans Tamil', Tamil, serif !important;
              color: #000 !important;
            }
            table {
              border-collapse: separate !important;
              border-spacing: 0 !important;
              width: 100% !important;
              table-layout: fixed !important;
              page-break-inside: avoid !important;
              border: 2px solid #000000 !important;
            }
            th {
              background-color: #f3f4f6 !important;
              font-weight: bold !important;
              text-align: center !important;
              border: 2px solid #000000 !important;
              padding: 6px !important;
              font-size: 11px !important;
              line-height: 1.2 !important;
              vertical-align: middle !important;
              word-break: keep-all !important;
              white-space: normal !important;
              color: #000000 !important;
              display: table-cell !important;
            }
            th[rowspan], th[colspan] {
              background-color: #f3f4f6 !important;
              border-width: 2px !important;
              border-style: solid !important;
              border-color: #000000 !important;
              position: relative !important;
              z-index: 1 !important;
            }
            td {
              border: 1px solid #000000 !important;
              padding: 4px !important;
              font-size: 10px !important;
              line-height: 1.2 !important;
              page-break-inside: avoid !important;
              color: #000000 !important;
            }
            thead th {
              background-color: #f3f4f6 !important;
              font-weight: bold !important;
              border: 2px solid #000000 !important;
            }
            tbody td {
              border: 1px solid #000000 !important;
            }
          `
          clonedDoc.head.appendChild(style)
          
          // Add font link
          const link = document.createElement("link")
          link.href = "https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@400;700&display=swap"
          link.rel = "stylesheet"
          clonedDoc.head.appendChild(link)
        }
      })

      if (canvas.width === 0 || canvas.height === 0) throw new Error(`Page ${i + 1} rendered with zero dimensions`)
      const imgData = canvas.toDataURL("image/jpeg", 0.95)

      if (imgData === "data:,") throw new Error(`Page ${i + 1} generated empty image data`)
      if (i !== 0) pdf.addPage([pageWidth, pageHeight])
      pdf.addImage(imgData, "JPEG", 0, 0, pageWidth, pageHeight, `page-${i + 1}`, "FAST")
      root.unmount()
      if (i < pages.length - 1) await new Promise((resolve) => setTimeout(resolve, 500))
    }

    document.body.removeChild(mount)
    document.body.removeChild(loadingDiv)
    document.head.removeChild(fontCSS)

    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, "-")
    const defaultFilename = `KCC-Loan-Ledger-${timestamp}.pdf`
    const finalFilename = filename || defaultFilename

    const pdfOutput = pdf.output("datauristring")
    if (autoDownload) pdf.save(finalFilename)

    return {
      dataUri: pdfOutput,
      filename: finalFilename,
      pageCount: pages.length,
      pdf: pdf,
    }
  } catch (error) {
    console.error("PDF generation failed:", error)
    const existingMount = document.querySelector("#pdf-generation-container")
    const existingLoading = document.querySelector('[style*="z-index: 10000"]')
    const existingCSS = document.querySelector("style[data-pdf-fonts]")
    if (existingMount) document.body.removeChild(existingMount)
    if (existingLoading) document.body.removeChild(existingLoading)
    if (existingCSS) document.head.removeChild(existingCSS)
    alert("PDF உருவாக்குவதில் பிழை ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்.")
    throw error
  }
}