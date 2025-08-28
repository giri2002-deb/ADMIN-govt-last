import React from "react";
interface CropVerificationTableProps {
  data: any;
  currentPage?: number;
  totalPages?: number;
  startIndex?: number;
  endIndex?: number;
}

const CropVerificationTable: React.FC<CropVerificationTableProps> = ({
  data,
  currentPage = 1,
  totalPages = 1,
  startIndex = 0,
  endIndex = data.tableData.length,
}) => {
  const { tableData, formData, totals } = data
  const currentPageData = tableData.slice(startIndex, endIndex)


  return (
    <div 
      style={{
        fontFamily: "'Tamil', serif",
        fontSize: "24px", // Larger font for better readability in high-res PDF
        width: "4000px",
        height: "5000px",
        background: "white",
        padding: "40px", // More padding for better layout
        margin: "0 auto",
        overflow: "hidden"
      }}
    >
      {currentPage === 1 && (
        <div className="text-center mb-4 py-2" style={{ fontFamily: "'Tamil', serif", fontSize: "32px" }}>
          <h1 className="text-xl font-bold">CROP VERIFICATION REGISTER</h1>
        </div>
      )}

      {currentPage === 1 && (
        <div className="flex justify-between items-center mb-4 px-2" style={{ fontFamily: "'Tamil', serif", fontSize: "24px" }}>
          <div className="flex items-center gap-6">
            <span>
              Month: <span className="font-semibold">{formData.month}</span>
            </span>
            <span>
            Name of the Society: <span className="font-semibold"> &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;  &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;  &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;{formData.societyName}</span>
            </span>
          </div>
          <div>
            <span>
              Date of Disbursement: <span className="font-semibold">{formData.disbursementDate}</span>
            </span>
          </div>
        </div>
      )}

      {currentPage > 1 && (
        <div className="text-center mb-4 py-2" style={{ fontFamily: "'Tamil', serif", fontSize: "24px" }}>
          <h2 className="text-lg font-bold">Page {currentPage}</h2>
        </div>
      )}

      <div style={{ overflowX: "visible", fontFamily: "'Tamil', serif", fontSize: "24px" }}>
        <table className="border-2 border-black w-full border-collapse" style={{ tableLayout: "fixed", fontFamily: "'Tamil', serif", fontSize: "24px" }}>
        {currentPage === 1 && (
    <thead>
      <tr>
        <th rowSpan={3} className="border border-black p-4" style={{ width: "120px" }}>Sl. No</th>
        <th rowSpan={3} className="border border-black p-4" style={{ width: "200px" }}>M. No</th>
        <th rowSpan={3} className="border border-black p-4" style={{ width: "300px" }}>Name</th>
        <th colSpan={7} className="border border-black p-4">Particulars of Land</th>
        <th colSpan={2} rowSpan={2} className="border border-black p-4">Details of Disbursement</th>
        <th rowSpan={3} className="border border-black p-4" style={{ width: "200px" }}>Date of Verification</th>
        <th colSpan={2} rowSpan={2} className="border border-black p-4">Land Verified</th>
        <th rowSpan={3} className="border border-black p-4" style={{ width: "250px" }}>Age of Crop</th>
        <th rowSpan={3} className="border border-black p-4" style={{ width: "200px" }}>Initial of Staff</th>
        <th rowSpan={3} className="border border-black p-4" style={{ width: "200px" }}>Initial of Supervisor</th>
        <th colSpan={2} rowSpan={2} className="border border-black p-4">A.M / A.O / CSR (P)</th>
        <th colSpan={2} rowSpan={2} className="border border-black p-4">Executive Officer</th>
      </tr>
      <tr>
        <th colSpan={3} className="border border-black p-4">As per Annual Credit Limit Application</th>
        <th colSpan={4} className="border border-black p-4">As per Disbursement Statement</th>
      </tr>
      <tr>
        <th className="border border-black p-4" style={{ width: "250px" }}>Credit Limit</th>
        <th className="border border-black p-4" style={{ width: "300px" }}>Survey No</th>
        <th className="border border-black p-4" style={{ width: "200px" }}>Extent</th>
        <th className="border border-black p-4" style={{ width: "250px" }}>Loan Disbursed</th>
        <th className="border border-black p-4" style={{ width: "300px" }}>Survey No</th>
        <th className="border border-black p-4" style={{ width: "200px" }}>Extent</th>
        <th className="border border-black p-4" style={{ width: "800px" }}>Crop</th>
        <th className="border border-black p-4" style={{ width: "200px" }}>Cash</th>
        <th className="border border-black p-4" style={{ width: "200px" }}>Kind</th>
        <th className="border border-black p-4" style={{ width: "300px" }}>Survey No</th>
        <th className="border border-black p-4" style={{ width: "200px" }}>Extent</th>
        <th className="border border-black p-4" style={{ width: "200px" }}>Date</th>
        <th className="border border-black p-4" style={{ width: "200px" }}>Initial</th>
        <th className="border border-black p-4" style={{ width: "200px" }}>Date</th>
        <th className="border border-black p-4" style={{ width: "200px" }}>Initial</th>
      </tr>
      <tr>
        <td className="border border-black p-3">(1)</td>
        <td className="border border-black p-3">(2)</td>
        <td className="border border-black p-3">(3)</td>
        <td className="border border-black p-3">(4)</td>
        <td className="border border-black p-3">(5)</td>
        <td className="border border-black p-3">(6)</td>
        <td className="border border-black p-3">(7)</td>
        <td className="border border-black p-3">(8)</td>
        <td className="border border-black p-3">(9)</td>
        <td className="border border-black p-3">(10)</td>
        <td className="border border-black p-3">(11)</td>
        <td className="border border-black p-3">(12)</td>
        <td className="border border-black p-3">(13)</td>
        <td className="border border-black p-3">(14)</td>
        <td className="border border-black p-3">(15)</td>
        <td className="border border-black p-3">(16)</td>
        <td className="border border-black p-3">(17)</td>
        <td className="border border-black p-3">(18)</td>
        <td className="border border-black p-3">(19)</td>
        <td className="border border-black p-3">(20)</td>
        <td className="border border-black p-3">(21)</td>
        <td className="border border-black p-3">(22)</td>
      </tr>
    </thead>
  )}

  {/* From page 2 onwards → Only numbering row */}
  {currentPage > 1 && (
    <thead>
      <tr>
        <td className="border border-black p-3">(1)</td>
        <td className="border border-black p-3">(2)</td>
        <td className="border border-black p-3">(3)</td>
        <td className="border border-black p-3">(4)</td>
        <td className="border border-black p-3">(5)</td>
        <td className="border border-black p-3">(6)</td>
        <td className="border border-black p-3">(7)</td>
        <td className="border border-black p-3">(8)</td>
        <td className="border border-black p-3">(9)</td>
        <td className="border border-black p-3">(10)</td>
        <td className="border border-black p-3">(11)</td>
        <td className="border border-black p-3">(12)</td>
        <td className="border border-black p-3">(13)</td>
        <td className="border border-black p-3">(14)</td>
        <td className="border border-black p-3">(15)</td>
        <td className="border border-black p-3">(16)</td>
        <td className="border border-black p-3">(17)</td>
        <td className="border border-black p-3">(18)</td>
        <td className="border border-black p-3">(19)</td>
        <td className="border border-black p-3">(20)</td>
        <td className="border border-black p-3">(21)</td>
        <td className="border border-black p-3">(22)</td>
      </tr>
    </thead>
  )}

          <tbody style={{ fontFamily: "'Tamil', serif", fontSize: "24px" }}>
            {currentPageData.map((row: any, index: number) => {
              const actualIndex = startIndex + index
              const isEmptySlNo = row.slNo === ""

              return (
                <tr key={actualIndex} className="text-center" style={{ fontFamily: "'Tamil', serif", fontSize: "24px" }}>
                  <td className={`border border-black p-4 ${isEmptySlNo ? "border-t-0" : ""}`} style={{ fontFamily: "'Tamil', serif", fontSize: "24px" }}>{row.slNo}</td>
                  <td className={`border border-black p-4 ${isEmptySlNo ? "border-t-0" : ""}`} style={{ fontFamily: "'Tamil', serif", fontSize: "24px" }}>{row.mNo}</td>
                  <td className={`border border-black p-4 text-left ${isEmptySlNo ? "border-t-0" : ""}`} style={{ fontFamily: "'Tamil', serif", fontSize: "24px" }}>
                    {row.name}
                  </td>
                  <td className="border border-black p-4" style={{ fontFamily: "'Tamil', serif", fontSize: "24px" }}>{row.creditLimit}</td>
                  <td className={`border border-black p-4 text-left text-xs ${isEmptySlNo ? "border-t-0" : ""}`} style={{ fontFamily: "'Tamil', serif", fontSize: "20px" }}>
                    {row.surveyNo1}
                  </td>
                  <td className={`border border-black p-4 ${isEmptySlNo ? "border-t-0" : ""}`} style={{ fontFamily: "'Tamil', serif", fontSize: "24px" }}>{row.extentA1}</td>
                  <td className="border border-black p-4" style={{ fontFamily: "'Tamil', serif", fontSize: "24px" }}>{row.loanDisbursed}</td>
                  <td className="border border-black p-4 text-left text-xs" style={{ fontFamily: "'Tamil', serif", fontSize: "20px" }}>{row.surveyNo2}</td>
                  <td className="border border-black p-4" style={{ fontFamily: "'Tamil', serif", fontSize: "24px" }}>{row.extentA2}</td>
                  <td className="border border-black p-4 text-left min-w-[800px]" style={{ fontFamily: "'Tamil', serif", fontSize: "24px" }}>
                    <div className="text-xl font-semibold">
                      {row.crop}
                    </div>
                  </td>
                  <td className="border border-black p-4" style={{ fontFamily: "'Tamil', serif", fontSize: "24px" }}>{row.cash}</td>
                  <td className="border border-black p-4" style={{ fontFamily: "'Tamil', serif", fontSize: "24px" }}>{row.kind}</td>
                  <td className="border border-black p-4" style={{ fontFamily: "'Tamil', serif", fontSize: "24px" }}>{row.verificationDate}</td>
                  <td className="border border-black p-4 text-left text-xs" style={{ fontFamily: "'Tamil', serif", fontSize: "20px" }}></td>
                  <td className="border border-black p-4" style={{ fontFamily: "'Tamil', serif", fontSize: "24px" }}></td>
                  <td className="border border-black p-4" style={{ fontFamily: "'Tamil', serif", fontSize: "24px" }}>{row.extentC2}</td>
                  <td className="border border-black p-4" style={{ fontFamily: "'Tamil', serif", fontSize: "24px" }}></td>
                  <td className="border border-black p-4" style={{ fontFamily: "'Tamil', serif", fontSize: "24px" }}>{row.staffInitial}</td>
                  <td className="border border-black p-4" style={{ fontFamily: "'Tamil', serif", fontSize: "24px" }}>{row.supervisorInitial}</td>
                  <td className="border border-black p-4" style={{ fontFamily: "'Tamil', serif", fontSize: "24px" }}>{row.amDate}</td>
                  <td className="border border-black p-4" style={{ fontFamily: "'Tamil', serif", fontSize: "24px" }}>{row.amInitial}</td>
                  <td className="border border-black p-4" style={{ fontFamily: "'Tamil', serif", fontSize: "24px" }}>{row.eoDate}</td>
                </tr>
              )
            })}

            {currentPage === totalPages && (
              <tr className="font-bold bg-gray-50" style={{ fontFamily: "'Tamil', serif", fontSize: "24px" }}>
                <td className="border border-black p-4" colSpan={3} style={{ fontFamily: "'Tamil', serif", fontSize: "24px" }}>
                  Total
                </td>
                <td className="border border-black p-4" style={{ fontFamily: "'Tamil', serif", fontSize: "24px" }}>{totals.totalCreditLimit.toLocaleString()}</td>
                <td className="border border-black p-4" colSpan={2} style={{ fontFamily: "'Tamil', serif", fontSize: "24px" }}></td>
                <td className="border border-black p-4" style={{ fontFamily: "'Tamil', serif", fontSize: "24px" }}>{totals.totalLoanDisbursed.toLocaleString()}</td>
                <td className="border border-black p-4" colSpan={2} style={{ fontFamily: "'Tamil', serif", fontSize: "24px" }}></td>
                <td className="border border-black p-4" style={{ fontFamily: "'Tamil', serif", fontSize: "24px" }}>
                  <div className="text-center">
                    <div>Total Crops: {totals.totalCrops}</div>
                  </div>
                </td>
                <td className="border border-black p-4" style={{ fontFamily: "'Tamil', serif", fontSize: "24px" }}>{totals.totalCash.toLocaleString()}</td>
                <td className="border border-black p-4" style={{ fontFamily: "'Tamil', serif", fontSize: "24px" }}>{totals.totalKind.toLocaleString()}</td>
                <td className="border border-black p-4" colSpan={10} style={{ fontFamily: "'Tamil', serif", fontSize: "24px" }}></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CropVerificationTable;