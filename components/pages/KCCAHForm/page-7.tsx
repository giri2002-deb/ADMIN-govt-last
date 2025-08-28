import React from "react";
import {numberToTamilWords} from "../../../utils/tamil-numbers"
interface Page7Props {
  data: any;
}

export default function Page7({ data }: Page7Props) {
  const userData = JSON.parse(
    localStorage.getItem("kccah_userjson") || "{}"
  ).userjson;
const amount=userData?.loanDetails?.kccahBreakdown?.total?.["மொத்தம்"];
  const tamil= numberToTamilWords(amount)
  const userData1 =
  JSON.parse(localStorage.getItem("kccah_userjson") || "{}").userjson?.userInformation || {};

const rows: { survey: string; acres: string }[] = [];
const surveyNumbers: string[] = []; // store all survey numbers

// Gather land details from user info, max 20 entries
for (let i = 1; i <= 20; i++) {
  const survey = userData1[`நிலம்${i}_சர்வே_எண்`];
  const acres = userData1[`நிலம்${i}_ac`];

  if (survey && acres) {
    rows.push({ survey, acres });
    surveyNumbers.push(String(survey)); // store only survey as string
  }
}

// Final single string with commas
const allSurveyNumbers = surveyNumbers.join(", ");
  return (
  <div
      className="pdf-page bg-white"
      style={{
        width: "210mm",
        minHeight: "297mm",
        padding: "20mm",
        fontSize: "14px",
        lineHeight: "1.6",
        fontFamily: "marudham",
        color: "black",
        margin: "0 auto"
      }}
    >
      {/* Title */}
      <div className="text-center mb-4">
        <h1 className="font-bold text-base underline">
          நடைமுறை மூலதன கடன் பத்திரம்
        </h1>
      </div>

      {/* Paragraphs */}
      <div className="text-justify space-y-4">
             <div className="mb-12" style={{ fontFamily: "marudham", fontSize: "14px" }}>
        <p className="text-justify leading-relaxed" style={{ 
          fontFamily: "marudham", 
          fontSize: "14px", 
          lineHeight: "1.8",
          textAlign: "justify"
        }}>
         {`2025 ஆம் வருடம் மே மாதம்  ம் தேதி சேலம் 
         மாவட்டம் சங்ககிரி வட்டம் மகுடஞ்சாவடி கிராமத்தில்
          நிறுவப்பட்டிருக்கும் S.1374 மகுடஞ்சாவடி தொடக்க வேளாண்மை
          
          கூட்டுறவு கடன் சங்க செயலாளர் /செயலாட்சியர் அவர்களுக்கு, 
           ${userData?.userInformation?.["கிராமம்"] || ""} கிராமத்தில் வசிக்கும் 
           விவசாய தொழில் ${userData?.userInformation?.["தகபெயர்"] || ""} மகனும் / மனைவியும் 
          மேற்படி சங்கத்தின் உ.எண்   ${userData?.userInformation?.["உ_எண்"] }  ${userData?.userInformation?.["பெயர்"]} 
          1. ${userData?.userInformation?.["கிராமம்"] || ""} கிராமம்  ${userData?.userInformation?.["முகவரி"] || ""}
           விவசாயம் தொழில் ${userData?.friendDetails?.fatherName} மகனும் / மனைவியும் மேற்படி 
          சங்கத்தின் உ.எண் ${userData?.friendDetails?.uNumber }  ${userData?.friendDetails?.name} 2, ஆகிய நாங்கள்
          இருவரும் ஒருமித்த எழுதிக் கொடுத்த பிணை ${userData?.loanDetails?.kccahBreakdown?.loanName || "N/A"} (1+1) கடன் பத்திரம்.`}
        </p>
      </div>
       <div className="mb-12" style={{ fontFamily: "marudham", fontSize: "14px" }}>
        <p className="text-justify leading-relaxed" style={{ 
          fontFamily: "marudham", 
          fontSize: "14px", 
          lineHeight: "1.8",
          textAlign: "justify"
        }}>
        {`2 எங்களில் 1 இலக்கமிட்டவர்
         நாளது தேதியில் மேற்படி சங்கத்தின் செயலாட்சியர்/செயலாளர்
          முன்னிலையில், ரூ.${userData?.loanDetails?.kccahBreakdown?.total?.["மொத்தம்"] || "N/A"} (ரூபாய் ${tamil})
         ${userData?.loanDetails?.kccahBreakdown?.loanName || "N/A"} (1+1) பராமரிக்க மேற்படி கடன் தொகையை 
          பெற்றுக் கொண்டார். இந்தத் தொகை ரூ.${userData?.loanDetails?.kccahBreakdown?.total?.["மொத்தம்"] || "N/A"} (ரூபாய் ${tamil})
          க்கும் ஆண்டு 1-க்கு 100-க்கு ரூ 7 சதவீதம் கூடும் வட்டியையும், அசலையும் 
          2026 ஆம் வருடம் மே மாதம் தேதிக்குள் கொடுத்து கடனை முழுவதும் கெடுவு 
          தேதிக்குள் தீர்த்து விடுகிறோம். அப்படி கெடுவுக்குள் செலுத்தத்தவறினால்
           உடனே எங்கள் கடன் கணக்கை முடிவு கட்டி அப்படி முடிவு கட்டினதால் ஏற்படும்
            மொத்தத் தொகைக்கு கணக்கு முடிவு கட்டின தேதி முதல் கடன் தொகை
             வசூலாகும் தேதி வரையில் வருடம் 1-க்கு 100-க்கு ரூ.1 சதவீதம் வட்டி 
             சேர்த்து அசல், வட்டி செலவு முதலியவைகளையும் எங்களாலும் எங்கள் 
             சொத்துக்களாலும் பங்கு வீதமில்லாமல் எங்கள் யாதொருவரிடமிருந்தாவது 
        அல்லது எல்லோரிடத்திலிருந்தாவது சட்டப்படி வசூல் செய்து கொள்ளலாம்.`}
        </p>
      </div>
        <div className="mb-12" style={{ fontFamily: "marudham", fontSize: "14px" }}>
        <p className="text-justify leading-relaxed" style={{ 
          fontFamily: "marudham", 
          fontSize: "14px", 
          lineHeight: "1.8",
          textAlign: "justify"
        }}>
       {`3. எங்களில் 1 இலக்கமிட்டவர் இந்த 
       பத்திரத்தின் ஆதாரத்தின் பேரில் பெற்றிருக்கும் கடன் தொகை ரூ.${userData?.loanDetails?.kccahBreakdown?.total?.["மொத்தம்"] || "N/A"}ஐ 
       ${userData?.loanDetails?.kccahBreakdown?.loanName || "N/A"}  (1+1) பராமரிக்க
        எங்களில் 1 இலக்கமிட் டவர் செலவு செய்வார் `}
        </p>
      </div>
        <div className="mb-12" style={{ fontFamily: "marudham", fontSize: "14px" }}>
        <p className="text-justify leading-relaxed" style={{ 
          fontFamily: "marudham", 
          fontSize: "14px", 
          lineHeight: "1.8",
          textAlign: "justify"
        }}>
       4 நாங்கள் மேற்படி சங்கத்தில் இப்போதிருக்கும் விதிகளுக்கும் இனி ஏற்படும் விதிகளுக்கும் கட்டுப்பட்டவர்கள்.
        </p>
      </div>
       <div className="mb-12" style={{ fontFamily: "marudham", fontSize: "14px" }}>
        <p className="text-justify leading-relaxed" style={{ 
          fontFamily: "marudham", 
          fontSize: "14px", 
          lineHeight: "1.8",
          textAlign: "justify"
        }}>
      5 நாங்கள் மேற்படி சங்கத்தில் வாங்கிய கடன் தொகைக்கு இந்தியன் ரிசர்வ் வங்கி அவ்வப்போது நிர்ணயிக்கும் வட்டி விகிதத்தையே வட்டியாக செலுத்த ஒப்புக்கொள்கிறோம்.
        </p>
      </div>
      </div>

      {/* Table */}
      <div className="border border-black mt-6 mb-6">
        <div className="text-center font-bold border-b border-black py-1">
         பயிர் சாகுபடி செய்யும் நிலத்தின் விபரம்
        </div>
        <table className="w-full text-center text-xs">
          <thead>
            <tr>
              <th className="border border-black p-1">சர்வே எண்</th>
              <th className="border border-black p-1">பரப்பு</th>
              <th className="border border-black p-1">விபரம்</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black p-1">{allSurveyNumbers}</td>
              <td className="border border-black p-1">{userData?.calculatedFields?.totalLandArea !== undefined 
  ? Number(userData?.calculatedFields?.totalLandArea).toFixed(2) 
  : ""}
</td>
              <td className="border border-black p-1">{userData?.loanDetails?.kccahBreakdown?.loanName || "N/A"}</td>
            </tr>
          </tbody>
        </table>
      </div>
<br></br>
      {/* Signatures */}
   <div className="flex justify-between mt-8">
  {/* Left side - Witnesses */}
  <div className="text-left space-y-2">
    <p>சாட்சி:</p>
    <p>1.</p><br></br>
    <p>2.</p><br></br>
    <p>எழுதியவர் :</p><br></br>
  </div>

  {/* Right side - Signatures */}
  <div className="text-right space-y-10">
    <br></br>
    <div>
      <br></br>
      <p className="font-bold text-center">({userData?.userInformation?.["பெயர்"]})</p>
      <p className="font-bold">கடன்தாரர் கையொப்பம்</p>
    </div>
    <div>
      <br></br>
      <br></br>
      <p className="font-bold text-center">({userData?.friendDetails?.name})</p>
      <p className="font-bold">பிணைத்தாரர் கையொப்பம்</p>
    </div>
  </div>
</div>

    </div>
  );
}
