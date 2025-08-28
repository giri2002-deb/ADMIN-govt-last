"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {numberToTamilWords} from "../../../utils/tamil-numbers"
interface Page1Props {
  data?: any;
}

export default function Page1({ data }: Page1Props = {}) {
  const [userData, setUserData] = useState<any>({});

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
  const amount=userData?.loanDetails?.kccahBreakdown?.total?.["மொத்தம்"];
  const tamil= numberToTamilWords(amount)
console.log(userData)
  return (
    <div className="p-8 h-full flex flex-col pdf-page" style={{ fontFamily: "'Marudam', serif", fontSize: "14px" }}>
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-base font-bold leading-tight"style={{ color: "red" }}>
          கே.சி.சி. நடைமுறை மூலதன் மூலதனக் கடன் வேண்டி உறுப்பினர் கடன் விண்ணப்பம்
        </h1>
        <br></br>
        <p className="text-right mt-1 font-bold">தேதி :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
      </div>
      <br></br>
      {/* Applicant Details Section */}
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
      <div>{userData?.userInformation?.["தகபெயர்"] || ""}</div>
    
    </div>
  </div>

  {/* முகவரி */}
  <div className="flex items-start">
    <span className="font-medium w-24">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;முகவரி</span>
    <span className="mx-4">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</span>
    <span className="flex-1">
      {userData?.userInformation?.["முகவரி"] || ""}
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
  <div className="mb-8">
        <p className="mb-2">
          <strong>பெறுநர் :-</strong>
        </p>
        <div className="ml-8">
          <p>செயலாட்சியர்/செயலாளர்,</p>
          <p>எஸ்.1374 மகுடஞ்சாவடி தொடக்க வேளாண்மை</p>
          <p>கூட்டுறவு கடன் சங்கம் லிட்..,</p>
          <p>சேலம் மாவட்டம் 637103.</p>
        </div>
      </div>
      {/* Recipient Section */}
      

      {/* Subject */}
      <div className="mb-4 text-left">
  <p className="font-bold">அய்யா,</p>
  <p className="text-sm leading-relaxed mt-2">
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  பொருள் : உறுப்பினர் சுய உறுதிமொழி சமர்பித்து நடைமுறை மூலதனக்கடன் கோருவது
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; சம்பந்தமாக
  </p>
</div>


      <div className="text-center mb-4">
        <p className="font-bold">********</p>
      </div>

      {/* Main Letter Content */}
      <div className="mb-6 text-justify leading-relaxed" style={{ fontSize: "14px" }}>
        <p className="mb-3">
         &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;{`நான் சேலம் மாவட்டம் ${userData?.userInformation?.["கிராமம்"] || "கிராமம்"} கிராமத்தில்
           வசித்து வருகிறேன். எனக்கு ${userData?.userInformation?.["கிராமம்"] || "கிராமம்"}கிராமத்தில்
         ${Number(userData?.calculatedFields?.totalLandArea || 0).toFixed(2)}
      ஏக்கர் நிலம் உள்ளது.
            இதற்கு உண்டான
             கிராம நிர்வாக அலுவலர் சான்று கொடுத்துள்ளேன்.
             
             நான் விவசாயம் மற்றும் ஆடு, கறவைமாடு வளர்த்தல்
              போன்ற தொழில் செய்து வருகிறேன். தற்போது எனக்கு 
              K.C.C மூலதன கடனாக ${userData?.loanDetails?.kccahBreakdown?.loanName || "N/A"}
  திட்ட அலகுக்கு ₹. ${userData?.loanDetails?.kccahBreakdown?.total?.["மொத்தம்"] || "N/A"}
               (ரூபாய் ${tamil}) கடனாக வழங்குமாறு கேட்டுக்கொள்கிறேன்.`}
        </p>
<br></br>
        <div className="text-right mt-8 mb-6">
          <p className="font-bold">உறுப்பினர் கையொப்பம்</p>
        </div>
      </div>

      {/* Secretary Section */}
      <div className="">
        <div className="text-center mb-3">
          <p className="font-bold text-base">செயலாளர் சான்று</p>
        </div>

        <div className="text-justify leading-relaxed" style={{ fontSize: "14px" }}>
          <p>
         &nbsp;&nbsp;&nbsp; &nbsp;{`மேற்படி உறுப்பினர் எண் ${userData?.userInformation?.["உ_எண்"] } பெயர் 
          ${userData?.userInformation?.["பெயர்"]} என்பவருக்கு சொந்தமாக
           ${userData?.userInformation?.["கிராமம்"] || "கிராமம்"}கிராமத்தில்  ${Number(userData?.calculatedFields?.totalLandArea || 0).toFixed(2)} ஏக்கர் நிலம்
            உள்ளது என கிராம நிர்வாக அலுவலர்
             சான்று கொடுத்துள்ளார். இவர் விவசாயம்
              மற்றும் ஆடு. கறவைமாடு வளர்த்தல் 
              போன்ற தொழில் செய்து வருகிறார். எனவே
               இவருக்கு K.C.C மூலதன கடனாக ${userData?.loanDetails?.kccahBreakdown?.loanName || "N/A"} 
               திட்ட அலகுக்கு, அனுமதிக்கப்பட்ட கடன் அளவிற்குட்பட்டு 
               ரூ. ${userData?.loanDetails?.kccahBreakdown?.total?.["மொத்தம்"] || "N/A"} (ரூபாய் ${tamil}) நடைமுறை
                மூலதனக்கடனாக வழங்க பரிந்துரை செய்கிறேன்.`}
          </p>
        </div>

        <div className="text-right mt-8">
          <p className="font-bold text-base">செயலாளர்</p>
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