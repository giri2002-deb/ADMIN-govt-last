"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface Page1Props {
  data?: any;
}

export default function Page1({ data }: Page1Props = {}) {
  const [userData, setUserData] = useState<any>({});
   const userData1 = JSON.parse(localStorage.getItem("kccah_userjson") || "{}").userjson?.userInformation || {};
  const rows: { survey: string; acres: string }[] = [];
  

  // Gather land details from user info, max 20 entries
  for (let i = 1; i <= 20; i++) {
    const survey = userData1[`நிலம்${i}_சர்வே_எண்`];
    const acres = userData1[`நிலம்${i}_ac`];
    if (survey && acres) {
      rows.push({ survey, acres });
    }
  }
 const totalAcres = rows.filter((row) => row.acres)
    .reduce((sum, row) => sum + parseFloat(row.acres || "0"), 0)
    .toFixed(2);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("kccah_userjson");
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          setUserData(parsedData.userjson || {});
        } catch (e) {
          console.error("Error parsing user data:", e);
        }
      }
    }
  }, []);
 const formSections = userData.metadata?.formSections || {};
  let loanTypeText = "நபர் ஜாமீன்"; // default
  if (formSections.goldDetails) {
    loanTypeText = "நகை அடமானம்";
  } else if (formSections.friendDetails) {
    loanTypeText = "நபர் பிணையம்";
  } else if (formSections.ownProperty) {
    loanTypeText = "நில அடமானம்";
  }
  return (
    <div
      className="p-6 h-full flex flex-col pdf-page bg-white"
      style={{ fontFamily: "'Marudam', serif", fontSize: "14px" }}
    >
      {/* Header */}
      <div className="text-center mb-4">
        <p className="text-sm mb-2">S.1374 மகுடஞ்சாவடி தொடக்க வேளாண்மை கூட்டுறவு கடன் சங்கம் வரை..</p>
        <h1 className="text-base font-bold leading-tight">
          கே.சி.சி. நடைமுறை மூலதனக் கடன் விண்ணப்பம்
        </h1>
      </div>

      {/* Main Content Section */}
      <div className="mb-4 flex justify-between">
        {/* Left Side - Applicant and Co-applicant */}
        <div className="flex-1 mr-6">
          <div className="flex">
            {/* Applicant Details */}
            <div className="flex-1 mr-8">
               <p>
              <strong>கடன் வகை:</strong> {loanTypeText}
            </p>
            <br></br>
              <div className="mb-4 flex justify-between">
                      <div className="flex-1 mr-6">
                        <div className="mb-3">
                          <p className="font-bold mb-1">அனுப்புநர் :</p>
                          <div className="ml-4 space-y-2">
                {/* உறுப்பினர் */}
                <div className="flex items-start">
                  <span className="font-medium w-24">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;உறுப்பினர்</span>
                  <span className="mx-4">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</span>
                  <span className="flex-1  border-gray-400 pb-0">
                    {userData?.userInformation?.["உ_எண்"] }
                  </span>
                </div>
              
                {/* பெயர் */}
                <div className="flex items-start">
                  <span className="font-medium w-24">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;பெயர்</span>
                  <span className="mx-4">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</span>
                  <span className="flex-1">
                    {userData?.userInformation?.["பெயர்"]}
                  </span>
                </div>
              
                {/* தகபெயர் + கன்விபாளைப்பங்கம் */}
                <div className="flex items-start">
                  <span className="font-medium w-24">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;தகபெயர் </span>
                  <span className="mx-4">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : </span>
                  <div className="flex-1 space-y-1">
                    <div>{userData?.userInformation?.["தகபெயர்"] || "காசியாளைப்பங்கம்"}</div>
                  
                  </div>
                </div>
              
                {/* முகவரி */}
                <div className="flex items-start">
                  <span className="font-medium w-24">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;முகவரி</span>
                  <span className="mx-4">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</span>
                  <span className="flex-1">
                    {userData?.userInformation?.["முகவரி"] || "கூ.முரள் 9789519045"}
                  </span>
                </div>
              </div>
              
                        </div>
                      </div>
              
                      <div className="flex-none">
                        <div 
                          className="border-2 border-black p-1 bg-gray-100 flex items-center justify-center" 
                          style={{ width: "100px", height: "120px" }}
                        >
                          <Image
                            src={userData?.userInformation?.user_photo_preview || "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"}
                            alt="Applicant Photo"
                            width={90}
                            height={110}
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
            </div>
              
            {/* Co-applicant Details */}
            <div className="flex-1">
              <br></br>
              <br></br>
               <div className="mb-4 flex justify-between">
                      <div className="flex-1 mr-6">
                        <div className="mb-3">
                          <p className="font-bold mb-1">பிணைதாரர் :</p>
                          <div className="ml-4 space-y-2">
                {/* உறுப்பினர் */}
                <div className="flex items-start">
                  <span className="font-medium w-24">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;உறுப்பினர்</span>
                  <span className="mx-4">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</span>
                  <span className="flex-1  border-gray-400 pb-0">
                    {userData?.friendDetails?.uNumber }
                  </span>
                </div>
              
                {/* பெயர் */}
                <div className="flex items-start">
                  <span className="font-medium w-24">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;பெயர்</span>
                  <span className="mx-4">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</span>
                  <span className="flex-1">
                    {userData?.friendDetails?.name}
                  </span>
                </div>
              
                {/* தகபெயர் + கன்விபாளைப்பங்கம் */}
                <div className="flex items-start">
                  <span className="font-medium w-24">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;தகபெயர்</span>
                  <span className="mx-4"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </span>
                  <div className="flex-1 space-y-1">
                    <div>{userData?.friendDetails?.fatherName}</div>
                  
                  </div>
                </div>
              
                {/* முகவரி */}
                <div className="flex items-start">
                  <span className="font-medium w-24">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;முகவரி</span>
                  <span className="mx-4">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</span>
                  <span className="flex-1">
                    {userData?.friendDetails?.address}
                  </span>
                </div>
              </div>
              
                        </div>
                      </div>
              
                      <div className="flex-none">
                        <div 
                          className="border-2 border-black p-1 bg-gray-100 flex items-center justify-center" 
                          style={{ width: "100px", height: "120px" }}
                        >
                          <Image
                            src={userData?.userInformation?.user_photo_preview || "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"}
                            alt="Applicant Photo"
                            width={90}
                            height={110}
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
            </div>
          </div>
        </div>

        {/* Right Side - Photos */}
      
      </div>

      {/* Greeting */}
      <div className="mb-4">
        <p className="font-bold">அய்யா,</p>
        <div className="ml-8 leading-relaxed">
          <p>எனக்கு கீழ்க்கண்டவாறு சொந்தம் குத்தகை நிலம் உள்ளது.</p>
        </div>
      </div>

      {/* Land Details Table */}
   <div className="mb-4">
  <table
    className="w-full border-collapse border border-black"
    style={{ fontSize: "12px" }}
  >
    <thead>
      {/* First row of headers */}
      <tr>
        <th className="border border-black font-bold text-center p-1">
          சர்வே எண்
        </th>
        <th className="border border-black font-bold text-center p-1">
          * பாசன விபரம்
        </th>
        <th className="border border-black font-bold text-center p-1">
          பரப்பு<br />ஏ சே
        </th>
        <th className="border border-black font-bold text-center p-1">
          சர்வே எண்
        </th>
        <th className="border border-black font-bold text-center p-1">
          * பாசன விபரம்
        </th>
        <th className="border border-black font-bold text-center p-1">
          பரப்பு<br />ஏ சே
        </th>
        <th className="border border-black font-bold text-center p-1">
          மொத்தம்<br />ஏ சே
        </th>
        <th
          rowSpan={2}
          className="border border-black font-bold text-center align-middle p-1"
          style={{ width: "70px" }}
        >
          குறிப்பு
        </th>
      </tr>
    </thead>

    <tbody>
      {rows.map((item, idx) => (
        <tr key={idx} style={{ height: 28 }}>
          <td className="border border-black text-center p-1">
            {item.survey}
          </td>
          <td className="border border-black text-center p-1"></td>
          <td className="border border-black text-center p-1">
            {item.acres}
          </td>
          <td className="border border-black text-center p-1"></td>
          <td className="border border-black text-center p-1"></td>
          <td className="border border-black text-center p-1"></td>
          <td className="border border-black text-center p-1">
            {item.acres}
          </td>
          <td className="border border-black text-center p-1"></td>
        </tr>
      ))}

      {/* Total row */}
      <tr
        className="font-bold"
        style={{ height: 28, backgroundColor: "white" }}
      >
        <td colSpan={2} className="border border-black text-center p-1">
          மொத்தம்
        </td>
        <td className="border border-black text-center p-1">
          {totalAcres}
        </td>
        <td colSpan={2} className="border border-black"></td>
        <td className="border border-black"></td>
        <td className="border border-black text-center p-1">
          {totalAcres}
        </td>
        <td className="border border-black"></td>
      </tr>
    </tbody>
  </table>

</div>
<br></br>

      {/* Loan Details Table */}
      <div className="mb-4">
        <p className="text-center font-bold mb-2">நடைமுறை மூலதன கடன் திட்ட அலகுக்கான கடன் விபரம் (Per Unit)</p>
    <br></br>    <table className="w-full border-collapse border border-black text-sm">
          <thead>
            <tr className="border border-black">
              <th className="border border-black p-1 text-center">கடன் வகை</th>
              <th className="border border-black p-1 text-center">திட்ட<br/>அலகு</th>
              <th className="border border-black p-1 text-center">கடன்<br/>கோரும்<br/>அலகு</th>
              <th className="border border-black p-1 text-center">மூல<br/>பொருட்கள்</th>
              <th className="border border-black p-1 text-center">இதர<br /> செலவுகள்</th>
              <th className="border border-black p-1 text-center">மொத்த நடைமுறை<br/>மூலதன கடன்</th>
              <th className="border border-black p-1 text-center">குறிப்பு</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border border-black">
              <td className="border border-black p-1 text-center">{userData?.loanDetails?.kccahBreakdown?.loanName || "N/A"}</td>
              <td className="border border-black p-1 text-center">{userData?.loanDetails?.kccahBreakdown?.planText || "N/A"}</td>
              <td className="border border-black p-1 text-center">{userData?.loanDetails?.kccahBreakdown?.planText || "N/A"}</td>
              <td className="border border-black p-1 text-center">{userData?.loanDetails?.kccahBreakdown?.perUnit?.["ரொக்கம்"] || "N/A"}</td>
              <td className="border border-black p-1 text-center">{userData?.loanDetails?.kccahBreakdown?.perUnit?.["விதை"] || "N/A"}</td>
              <td className="border border-black p-1 text-center font-bold">{userData?.loanDetails?.kccahBreakdown?.perUnit?.["மொத்தம்"] || "N/A"}</td>
              <td className="border border-black p-1 text-center"></td>
            </tr>
            <tr className="border border-black">
              <td className="border border-black p-1 text-center h-8"></td>
              <td className="border border-black p-1 text-center"></td>
              <td className="border border-black p-1 text-center"></td>
              <td className="border border-black p-1 text-center"></td>
              <td className="border border-black p-1 text-center"></td>
              <td className="border border-black p-1 text-center"></td>
              <td className="border border-black p-1 text-center"></td>
            </tr>
            <tr className="border border-black font-bold">
              <td className="border border-black p-1 text-center">மொத்தம்</td>
              <td className="border border-black p-1 text-center"></td>
              <td className="border border-black p-1 text-center"></td>
              <td className="border border-black p-1 text-center">{userData?.loanDetails?.kccahBreakdown?.perUnit?.["ரொக்கம்"] || "N/A"}</td>
              <td className="border border-black p-1 text-center">{userData?.loanDetails?.kccahBreakdown?.perUnit?.["விதை"] || "N/A"}</td>
              <td className="border border-black p-1 text-center">{userData?.loanDetails?.kccahBreakdown?.perUnit?.["மொத்தம்"] || "N/A"}</td>
              <td className="border border-black p-1 text-center"></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Notes */}
      <div className="mb-4 text-sm ju">
        <p className="mb-2">
          <span className="font-bold">1</span> &nbsp;&nbsp; &nbsp;நான் எனக்கு தேவையான மூலப்பொருட்களை வெளிமார்க்கெட்டில் வாங்க உள்ளதால் மேற்படி தொகையை ரொக்கமாக வழங்க கேட்டுக்கொள்கிறேன்.
        </p>
        <p>
          <span className="font-bold">2</span> &nbsp;&nbsp; &nbsp;தமிழ்நாடு கூட்டுறவு சட்டம் பிரிவு எண் 41 மற்றும் அதன் கீழ் ஏற்படுத்தப்பட்ட விதி எண் 68 ல் தெரிவித்துள்ளபடி படிவம் 26 ஐ இத்துடன் இணைத்துள்ளேன்.
        </p>
      </div>
<br></br>
      {/* Additional Tables */}
      <div className="mb-4">
        <table className="w-full border-collapse border border-black text-xs">
          <thead>
            <tr className="border border-black">
              <th className="border border-black p-1 text-center" colSpan={5}>முன்கடன் நிலுவை விபரம்</th>
              <th className="border border-black p-1 text-center" colSpan={1}>பங்குத் தொகை</th>
              <th className="border border-black p-1 text-center" colSpan={2}>திருப்பி செலுத்தியது</th>
            </tr>
            <tr className="border border-black">
              <th className="border border-black p-1 text-center">க. எண்</th>
              <th className="border border-black p-1 text-center">வழங்கிய தேதி</th>
              <th className="border border-black p-1 text-center">தொகை</th>
              <th className="border border-black p-1 text-center">வாய்தா</th>
              <th className="border border-black p-1 text-center">நிலுவை</th>
              <th className="border border-black p-1 text-center">செலுத்திய பாக்கி</th>
              <th className="border border-black p-1 text-center">கடன் எண்</th>
              <th className="border border-black p-1 text-center">தேதி</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(3)].map((_, i) => (
              <tr key={i} className="border border-black">
                <td className="border border-black p-1 text-center h-6"></td>
                <td className="border border-black p-1 text-center"></td>
                <td className="border border-black p-1 text-center"></td>
                <td className="border border-black p-1 text-center"></td>
                <td className="border border-black p-1 text-center"></td>
                <td className="border border-black p-1 text-center"></td>
                <td className="border border-black p-1 text-center"></td>
                <td className="border border-black p-1 text-center"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-4">
        <p className="text-center font-bold mb-2">ஏற்கனவே ஜாமீன் நின்ற விவரம்</p>
        <table className="w-full border-collapse border border-black text-xs">
          <thead>
            <tr className="border border-black">
              <th className="border border-black p-1 text-center">உ. எண்</th>
              <th className="border border-black p-1 text-center">தேதி</th>
              <th className="border border-black p-1 text-center">க. எண்</th>
              <th className="border border-black p-1 text-center">கடன் தொகை</th>
              <th className="border border-black p-1 text-center">வாய்தா</th>
              <th className="border border-black p-1 text-center">நிலுவை</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(2)].map((_, i) => (
              <tr key={i} className="border border-black">
                <td className="border border-black p-1 text-center h-6"></td>
                <td className="border border-black p-1 text-center"></td>
                <td className="border border-black p-1 text-center"></td>
                <td className="border border-black p-1 text-center"></td>
                <td className="border border-black p-1 text-center"></td>
                <td className="border border-black p-1 text-center"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
<br />
      {/* Footer Signatures */}
      <div className="flex justify-between mt-8">
        <div className="text-center">
          <p className="font-bold">பிணைதாரர் கையொப்பம்</p>
        </div>
        <div className="text-center">
          <p className="font-bold">கடன்தாரர் கையொப்பம்</p>
        </div>
      </div>

      <style jsx global>{`
        @font-face {
          font-family: "Marudam";
          src: url("/fonts/Marudam-Regular.ttf") format("truetype");
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }

        body {
          font-family: "Marudam", serif;
        }
        
        .pdf-page {
          width: 210mm;
          min-height: 297mm;
          margin: 0 auto;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          background: white;
        }

        @media print {
          .pdf-page {
            box-shadow: none;
            margin: 0;
          }
        }
      `}</style>
    </div>
  );
}