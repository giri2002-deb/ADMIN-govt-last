import Image from "next/image";
import { useEffect, useState } from "react";

interface Page1Props {
  data: any;
}

export default function Page1({ data }: Page1Props) {
  const [userData, setUserData] = useState<any>({});
  console.log(userData)
  
  useEffect(() => {
    // Using useEffect to handle localStorage since it's client-side only
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("kcc_userjson");
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

  return (
    <div className="p-8 h-full flex flex-col pdf-page" style={{ fontFamily: "'Marudam', serif", fontSize: "14px" }}>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-lg font-bold mb-4" style={{ color: "red" }}>
          பயிர்கடன் வேண்டிய உறுப்பினர் கடன் விண்ணப்பம்
        </h1>
      </div>

      {/* Applicant Details */}
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <p className="mb-2">
              <strong>அனுப்பதல்:</strong>
            </p>
            <div className="ml-8">
              <p>{userData?.userInformation?.["பெயர்"] || "பெயர்"}</p>
              <p>த/க.பெ.: {userData?.userInformation?.["தகபெயர்"] || "தகபெயர்"}</p>
              <p>{userData?.userInformation?.["முகவரி"] || "முகவரி"}</p>
              <p>மகுடஞ்சாவடி.</p>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <div className="border border-black p-2 mb-4">
              <Image
                src={userData?.userInformation?.user_photo_preview || "/placeholder.svg"}
                alt="Applicant Photo"
                width={100}
                height={120}
                className="border object-contain"
              />
            </div>
            <p>
              <strong>பெ.பெ:</strong> {userData?.userInformation?.["உ_எண்"] || "உ_எண்"}
            </p>
            <p>
              <strong>ஆதார் எண்:</strong>{" "}
              {userData?.userInformation?.["ஆதார்_எண்"]?.replace(/(\d{4})(\d{4})(\d{4})/, "$1 $2 $3") || "ஆதார் எண்"}
            </p>
          </div>
        </div>
      </div>

      {/* Recipient Details */}
      <div className="mb-8">
        <p className="mb-2">
          <strong>பெறுதல்:-</strong>
        </p>
        <div className="ml-8">
          <p>செயலாட்சியர்/செயலாளர்,</p>
          <p>எஸ்.1374 மகுடஞ்சாவடி தொடக்க வேளாண்மை</p>
          <p>கூட்டுறவு கடன் சங்கம் லிட்..,</p>
          <p>சேலம் மாவட்டம் 637103.</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mb-8 text-justify leading-relaxed">
        <p className="mb-4">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  {`நான் ${userData?.userInformation?.["கிராமம்"] || "கிராமம்"} கிராமத்தில் வசித்து வருகிறேன்.  
எனக்கு மேற்படி கிராமத்தில்  ${Number(userData?.calculatedFields?.totalLandArea || 0).toFixed(2)}
ஏக்கர் நிலம் உள்ளது. இதில் பயிர் செய்ய கிணறு மற்றும் சொட்டுநீர் பாசன வசதி/மானாவரி  உள்ளது.
என்னுடைய நிலத்தில் பயிர் செய்ய போதிய பாசன வசதி உள்ளது.
எனவே ${userData?.userInformation?.["கிராமம்"] || "கிராமம்"} கிராம நிர்வாக அலுவலர் ${userData?.loanDetails?.selectedCrops[0]?.crop?.name_of_crop} , பயிர்க்கு சான்று வழங்கியுள்ளார். 
முதல் போகம் அறுவடை செய்து விட்டேன். நான்
தற்போது  பயிர் செய்ய ${Number(userData?.calculatedFields?.totalLandArea || 0).toFixed(2)}
 ஏக்கர் தயார் செய்து வைத்துள்ளேன். 
எனவே பயிர்கடன் வழங்க வேண்டுமாய் கேட்டுக்கொள்கிறேன்.`}
        </p>
      </div>

      {/* Signature Section */}
      <div className="mt-6">
        <div className="text-right mb-1">
          <p>
            <strong>உறுப்பினர் கைகையாப்பம்</strong>
          </p>
        </div>
        <br />
        <br />
        <div className="text-center">
          <strong>செயலாளர் சான்று</strong>
        </div>

        <div className="flex justify-between mt-4">
          <div className="text-justify leading-relaxed">
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {`மேற்கண்ட உஎண் ${userData?.userInformation?.["உ_எண்"] || "உ_எண்"} பெயர்
               ${userData?.userInformation?.["பெயர்"] || "பெயர்"} என்பவர் அவருக்கு
                சொந்தமாக உள்ள  ${Number(userData?.calculatedFields?.totalLandArea || 0).toFixed(2)}
                 ஏக்கர் நிலத்தில் 
                ${userData?.loanDetails?.selectedCrops[0]?.crop?.name_of_crop}. 
                 பயிர் செய்ய உழவு செய்து தயார் நிலையில் வைத்துள்ளார். 
                 மேற்படி நிலத்தை நேரில் பார்வையிடப்பட்டது.
                 எனவே இவருக்கு பயிர்க்கடன் வழங்க பரிந்துரை செய்கிறேன்.`}
            </p>
          </div>
        </div>

        <div className="text-right mt-8">
          <p>
            <strong>செயலாளர்</strong>
          </p>
        </div>

        <div className="mt-8 text-justify leading-relaxed">
          <p className="text-center mt-8">
            <strong>அலுவலக குறிப்பு</strong>
          </p>
          <br></br>
          <p>

           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {` திரு/திருமதி. சந்திரசேகரன் என்பவருடைய கடன்மனு 
           சங்கத்தில் பரிசீலினை செய்யப்பட்டது. சங்க செயலளார் 
           பரிந்துரைப்படி கோரிக்கையை ஏற்று தீர்மானம் நிறைவேற்றப்பட்டு 
           ரூ. ${userData?.loanDetails?.totalEligibleAmount} பயிர் கடன் அனுமதிக்கப்படுகிறது`}
          </p>
        </div>

        <div className="flex justify-between mt-8">
          <p>
            <strong>செயலாளர்</strong>
          </p>
          <p>
            <strong>செயலாட்சியர்</strong>
          </p>
        </div>
      </div>

      <style jsx global>{`
        @font-face {
          font-family: 'Marudam';
          src: url('/fonts/Marudam-Regular.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
        
        body {
          font-family: 'Marudam', serif;
        }
      `}</style>
    </div>
  );
}