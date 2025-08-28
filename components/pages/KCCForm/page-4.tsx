"use client"
import { numberToTamilWords } from "@/utils/tamil-numbers";
import { useEffect, useState } from "react"

interface CropBreakdown {
  cents: number
  motham: number
  rokkam: number
  uram_1: number
  uram_2: number
  vithai: number
  thozhu_uram: number
  poochi_marundhu: number
  perCentRate: {
    motham: number
    rokkam: number
    uram_1: number
    uram_2: number
    vithai: number
    thozhu_uram: number
    poochi_marundhu: number
  }
}

interface CropDetails {
  motham: number
  rokkam: number
  uram_1: number
  uram_2: number
  vithai: number
  crop_code: number
  thozhu_uram: number
  name_of_crop: string
  poochi_marundhu: number
}

interface SelectedCrop {
  crop: CropDetails
  acres: number
  breakdown: CropBreakdown
  eligibleAmount: number
  cropName: string
}

interface LandParcel {
  acres: number
  hectares: number
  landNumber: number
  surveyNumber: string
}

interface FriendDetails {
  detailedInfo?: {
    ஆதார்_எண்?: string
    கைபேசி_எண்?: string
    [key: string]: any
  }
  [key: string]: any
}

interface UserInformation {
  ஆதார்_எண்?: string
  கைபேசி_எண்?: string
  sdccb_kcc_கணக்கு_எண்?: string
  sdccb_sb_கணக்கு_எண்?: string
  society_sb_கணக்கு_எண்?: string
  pan_அட்டை_எண்?: string
  ரேஷன்_அட்டை_எண்?: string
  வாக்காளர்_அட்டை_எண்?: string
  பங்குத்_தொகை?: string
  [key: string]: any
}

interface UserData {
  userInformation: UserInformation
  selectedCrops: SelectedCrop[]
  landParcels: LandParcel[]
  friendDetails: FriendDetails
  amount?: number
  date?: string
  [key: string]: any
}

interface Page4Props {
  data?: any
}

export default function Page4({ data }: Page4Props) {
  const [userData, setUserData] = useState<UserData | null>(null)

  useEffect(() => {
    const storedData = localStorage.getItem("kcc_userjson")
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData)
        const memberData = parsedData.kccData?.members?.[0] || parsedData.userjson || parsedData
        setUserData(memberData)
      } catch (error) {
        console.error("Error parsing localStorage data:", error)
      }
    }
  }, [])

  if (!userData) {
    return <div className="p-4" style={{ fontFamily: "marudham", fontSize: "14px" }}>Loading...</div>
  }
  const rows: { survey: string; acres: string }[] = [];

if (userData?.userInformation) {
  for (let i = 1; i <= 20; i++) {
    const survey = userData.userInformation[`நிலம்${i}_சர்வே_எண்`];
    const acres = userData.userInformation[`நிலம்${i}_ac`];

    if (survey && acres) {
      rows.push({ survey: String(survey), acres: String(acres) });
    }
  }
}

const surveyList = rows.map(r => r.survey).join(", ");

  const userInfo = userData.userInformation || {}
  const selectedCrops = userData.selectedCrops || []
  const landParcels = userData.landParcels || []
  const friendDetails = userData.friendDetails || {}
const select= userData.loanDetails.selectedCrops ||[]
const totals1 = select.reduce(
  (acc, item) => {
    acc.acres += item.acres || 0;
    acc.rokkam += item.breakdown?.rokkam || 0;
    acc.vithai += item.breakdown?.vithai || 0;
    acc.thozhu_uram += item.breakdown?.thozhu_uram || 0;
    acc.poochi_marundhu += item.breakdown?.poochi_marundhu || 0;
    acc.uram += (item.breakdown?.uram_1 || 0) + (item.breakdown?.uram_2 || 0);
    acc.motham += item.breakdown?.motham || 0;
    return acc;
  },
  { acres: 0, rokkam: 0, vithai: 0, thozhu_uram: 0, poochi_marundhu: 0, uram: 0, motham: 0 }
);

  const formatNumber = (num: string | number) => {
    if (!num) return ""
    return num.toString().replace(/(\d{4})(?=\d)/g, "$1 ")
  }

  const calculateTotals = () => {
    return selectedCrops.reduce(
      (
        totals: {
          vithai: number
          poochi_marundhu: number
          uram_1: number
          uram_2: number
          thozhu_uram: number
          rokkam: number
          motham: number
          acres: number
        },
        crop: SelectedCrop,
      ) => {
        const breakdown = crop.breakdown || {}
        totals.vithai += Math.round(breakdown.vithai || 0)
        totals.poochi_marundhu += Math.round(breakdown.poochi_marundhu || 0)
        totals.uram_1 += Math.round(breakdown.uram_1 || 0)
        totals.uram_2 += Math.round(breakdown.uram_2 || 0)
        totals.thozhu_uram += Math.round(breakdown.thozhu_uram || 0)
        totals.rokkam += Math.round(breakdown.rokkam || 0)
        totals.motham += Math.round(breakdown.motham || 0)
        totals.acres += crop.acres || 0
        return totals
      },
      {
        vithai: 0,
        poochi_marundhu: 0,
        uram_1: 0,
        uram_2: 0,
        thozhu_uram: 0,
        rokkam: 0,
        motham: 0,
        acres: 0,
      },
    )
  }

  const totals = calculateTotals()
  const totalUram = totals.uram_1 + totals.uram_2
const amount=userData?.loanDetails?.totalEligibleAmount;
const rounded = Math.round(amount);  
const tamil=numberToTamilWords(rounded)
  return (
    <div
      className="pdf-page bg-white"
      style={{
        width: "210mm",
        height: "1500px",
        padding: "8mm",
        fontSize: "14px",
        lineHeight: "1.3",
        fontFamily: "marudham",
        color: "black",
      }}
    >
      {/* Header */}
      <div className="text-center mb-4" style={{ fontFamily: "marudham", fontSize: "14px" }}>
        <h2 className="font-bold" style={{ fontFamily: "marudham", fontSize: "14px" }}>அலுவலக உபயோகத்திற்கு</h2>
      </div>

      {/* First Table - User Information */}
      <table className="w-full border-collapse border-2 border-black-400 mb-4" style={{ fontFamily: "marudham", fontSize: "14px" }}>
        <tbody>
          <tr>
            <td className="border border-black-400 p-2 font-bold bg-white" style={{ width: "25%", fontFamily: "marudham", fontSize: "14px" }}>
              கடன்தாரர் ஆதார் எண்
            </td>
            <td className="border border-gray-400 p-2 bg-white" style={{ width: "25%", fontFamily: "marudham", fontSize: "14px" }}>
              {formatNumber(userInfo["ஆதார்_எண்"] || "6017 6799 3840")}
            </td>
            <td className="border border-gray-400 p-2 font-bold bg-white" style={{ width: "25%", fontFamily: "marudham", fontSize: "14px" }}>
              பிணைதாரர் ஆதார் எண்
            </td>
            <td className="border border-gray-400 p-2 bg-white" style={{ width: "25%", fontFamily: "marudham", fontSize: "14px" }}>
              {formatNumber(friendDetails?.detailedInfo?.["ஆதார்_எண்"] || "3752 9410 3596")}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-400 p-2 font-bold bg-white" style={{ fontFamily: "marudham", fontSize: "14px" }}>கடன்தாரர் கைபேசி எண்</td>
            <td className="border border-gray-400 p-2 bg-white" style={{ fontFamily: "marudham", fontSize: "14px" }}>
              {formatNumber(userInfo["கைபேசி_எண்"] || "98 94 75 53 10")}
            </td>
            <td className="border border-gray-400 p-2 font-bold bg-white" style={{ fontFamily: "marudham", fontSize: "14px" }}>பிணைதாரர் கைபேசி எண்</td>
            <td className="border border-gray-400 p-2 bg-white" style={{ fontFamily: "marudham", fontSize: "14px" }}>
              {formatNumber(friendDetails?.detailedInfo?.["கைபேசி_எண்"] || "99 65 62 11 35")}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-400 p-2 font-bold bg-white" style={{ fontFamily: "marudham", fontSize: "14px" }}>கடன்தாரர் ம.வங்கி KCC SB எண்</td>
            <td className="border border-gray-400 p-2 bg-white" style={{ fontFamily: "marudham", fontSize: "14px" }}>{userInfo["sdccb_kcc_கணக்கு_எண்"] || "733 074 366"}</td>
            <td className="border border-gray-400 p-2 font-bold bg-white" style={{ fontFamily: "marudham", fontSize: "14px" }}>VAO சான்று காலாவதி தேதி</td>
            <td className="border border-gray-400 p-2 bg-white" style={{ fontFamily: "marudham", fontSize: "14px" }}>29-05-2026</td>
          </tr>
          <tr>
            <td className="border border-gray-400 p-2 font-bold bg-white" style={{ fontFamily: "marudham", fontSize: "14px" }}>கடன்தாரர் ம.வங்கி SB எண்</td>
            <td className="border border-gray-400 p-2 bg-white" style={{ fontFamily: "marudham", fontSize: "14px" }}>{userInfo["sdccb_sb_கணக்கு_எண்"] || ""}</td>
            <td className="border border-gray-400 p-2 font-bold bg-white" style={{ fontFamily: "marudham", fontSize: "14px" }}>பங்குத்தொகை நிலுவை</td>
            <td className="border border-gray-400 p-2 bg-white" style={{ fontFamily: "marudham", fontSize: "14px" }}>₹ {userInfo["பங்குத்_தொகை"] || "100.00"}</td>
          </tr>
          <tr>
            <td className="border border-gray-400 p-2 font-bold bg-white" style={{ fontFamily: "marudham", fontSize: "14px" }}>கடன்தாரர் சங்க SB எண்</td>
            <td className="border border-gray-400 p-2 bg-white" style={{ fontFamily: "marudham", fontSize: "14px" }}>{userInfo["society_sb_கணக்கு_எண்"] || ""}</td>
            <td className="border border-gray-400 p-2 font-bold bg-white" style={{ fontFamily: "marudham", fontSize: "14px" }}>வாக்காளர் அட்டை எண்</td>
            <td className="border border-gray-400 p-2 bg-white" style={{ fontFamily: "marudham", fontSize: "14px" }}>{userInfo["வாக்காளர்_அட்டை_எண்"] || "0"}</td>
          </tr>
          <tr>
            <td className="border border-gray-400 p-2 font-bold bg-white" style={{ fontFamily: "marudham", fontSize: "14px" }}>கடன்தாரர் PAN எண்</td>
            <td className="border border-gray-400 p-2 bg-white" style={{ fontFamily: "marudham", fontSize: "14px" }}>{userInfo["pan_அட்டை_எண்"] || "0"}</td>
            <td className="border border-gray-400 p-2 font-bold bg-white" style={{ fontFamily: "marudham", fontSize: "14px" }}></td>
            <td className="border border-gray-400 p-2 bg-white" style={{ fontFamily: "marudham", fontSize: "14px" }}></td>
          </tr>
          <tr>
            <td className="border border-gray-400 p-2 font-bold bg-white" style={{ fontFamily: "marudham", fontSize: "14px" }}>கடன்தாரர் குடும்ப அட்டை எண்</td>
            <td className="border border-gray-400 p-2 bg-white" style={{ fontFamily: "marudham", fontSize: "14px" }}>PHH {userInfo["ரேஷன்_அட்டை_எண்"] || "333575995872"}</td>
            <td className="border border-gray-400 p-2 font-bold bg-white" style={{ fontFamily: "marudham", fontSize: "14px" }}></td>
            <td className="border border-gray-400 p-2 bg-white" style={{ fontFamily: "marudham", fontSize: "14px" }}></td>
          </tr>
        </tbody>
      </table>
       
      
      {/* Crop Details Section */}
<div className="mb-3" style={{ fontFamily: "marudham", fontSize: "14px" }}>
  <p className="font-bold mb-2" style={{ fontFamily: "marudham", fontSize: "14px" }}>
    சாகுபடி செய்யும் பயிரின் பெயர்: {userData?.loanDetails?.selectedCrops[0]?.crop?.name_of_crop}
  </p>
  <p className="mb-2 text-justify" style={{ fontFamily: "marudham", fontSize: "14px" }}>
    பயிர் கடன் அளவு விகிதப்படி (Ratio) மேற்படி பயிருக்கு ஏக்கர் ஒன்றுக்கு அனுமதிக்கப்படும் தொகை
  </p>

  {/* Table UI */}

<div className="border border-black">
  <table
    className="w-full border-collapse text-center"
    style={{ fontFamily: "marudham", fontSize: "14px" }}
  >
    <thead>
      <tr>
        <th className="border border-black p-2">ரொக்கம்</th>
        <th className="border border-black p-2">உரம்</th>
        <th className="border border-black p-2">பூச்சி மருந்து</th>
        <th className="border border-black p-2">விலை</th>
        <th className="border border-black p-2">மொத்தம்</th>
        <th className="border border-black p-2">தவணைக்காலம்</th>
        <th className="border border-black p-2">பயிர் பெயர்</th>
      </tr>
    </thead>
    <tbody>
      {select.map((item, index) => (
        <tr key={index}>
          {/* breakdown values */}
          <td className="border border-black p-2">{item.breakdown?.rokkam || 0}</td>
          <td className="border border-black p-2">
            {(item.breakdown?.uram_1 || 0) + (item.breakdown?.uram_2 || 0)}
          </td>
          <td className="border border-black p-2">{item.breakdown?.poochi_marundhu || 0}</td>
          <td className="border border-black p-2">{item.breakdown?.vithai || 0}</td>
          <td className="border border-black p-2">{item.breakdown?.motham || 0}</td>

          {/* rowspan example: only first row spans 3 rows */}
          {index === 0 && (
            <td
              rowSpan={select.length}
              className="border border-black text-center align-middle"
            >
              ஒரு வருடம்
            </td>
          )}

          {/* crop name */}
          <td className="border border-black p-2">{item.crop?.name_of_crop}</td>
        </tr>
      ))}
    </tbody>
  </table>
  
</div>
<table
  className="w-full border-collapse border-1 border-black text-center"
  style={{ fontFamily: "marudham", fontSize: "14px" }}
>
 <thead>
  {/* Header Row 1 */}
  <tr>
    <th colSpan={2} className="border border-black text-center p-1">
      கடன் அனுமதிக்கப்படும்
    </th>
    <th colSpan={4} className="border border-black text-center p-1">
      ரொக்க பகுதி
    </th>
    <th colSpan={2} className="border border-black text-center p-1">
      பொருள் பகுதி
    </th>
    <th rowSpan={2} className="border border-black text-center p-1 w-20">
      மொத்த கடன் தொகை
    </th>
  </tr>

  {/* Header Row 2 */}
  <tr>
    {/* கடன் அனுமதிக்கப்படும் */}
    <th className="border border-black text-center p-1">சர்வே எண்</th>
    <th className="border border-black text-center p-1">
      பரப்பு <br /> ஏ செ
    </th>

    {/* ரொக்க பகுதி */}
    <th className="border border-black text-center p-1">ரொக்கம்</th>
    <th className="border border-black text-center p-1">
      விதை <br /> ரொக்கம் <br /> 100%
    </th>
    <th className="border border-black text-center p-1">
      தொழு <br /> உரம் <br /> 50%
    </th>
    <th className="border border-black text-center p-1">
      பூச்சி <br /> மருந்து <br /> 100%
    </th>

    {/* பொருள் பகுதி */}
    <th className="border border-black text-center p-1">
      உரம் <br /> 100% / 50%
    </th>
    <th className="border border-black text-center p-1">மொத்தம்</th>
  </tr>
</thead>

  <tbody>
    {select.map((item, index) => {
      const rokkamTotal =
        (item.breakdown?.rokkam || 0) +
        (item.breakdown?.vithai || 0) +
        (item.breakdown?.thozhu_uram || 0) +
        (item.breakdown?.poochi_marundhu || 0);

      const porulTotal =
        (item.breakdown?.uram_1 || 0)+(item.breakdown?.vithai || 0)+ (item.breakdown?.thozhu_uram || 0)+(item.breakdown?.poochi_marundhu || 0);

      const overallTotal = rokkamTotal + porulTotal + (item.breakdown?.motham || 0);

      return (
        <tr key={index}>
          {/* Survey Number → Only this column full center align */}
           {index === 0 && (
            <td
              rowSpan={select.length}
              className="border border-black text-center align-middle"
            >
             {surveyList}
            </td>
          )}

          {/* Other columns normal */}
          <td className="border border-black text-center p-1">{item.acres}</td>
          <td className="border border-black text-center p-1">{item.breakdown?.rokkam || 0}</td>
          <td className="border border-black text-center p-1">{item.breakdown?.vithai || 0}</td>
          <td className="border border-black text-center p-1">{item.breakdown?.thozhu_uram || 0}</td>
          <td className="border border-black text-center p-1">{item.breakdown?.poochi_marundhu || 0}</td>
          <td className="border border-black text-center p-1">{item.breakdown?.thozhu_uram || 0}</td>
          <td className="border border-black text-center p-1">{porulTotal}</td>
          <td className="border border-black text-center p-1">{item.breakdown?.motham || 0}</td>
       
        </tr>
      );
    })}

    {/* மொத்தம் Row */}
    <tr>
      <td className="border border-black text-center font-bold p-1" style={{ verticalAlign: "middle" }}>மொத்தம்</td>
      <td className="border border-black text-center font-bold p-1">{totals1.acres}</td>
      <td className="border border-black text-center font-bold p-1">{totals1.rokkam}</td>
      <td className="border border-black text-center font-bold p-1">{totals1.vithai}</td>
      <td className="border border-black text-center font-bold p-1">{totals1.thozhu_uram}</td>
      <td className="border border-black text-center font-bold p-1">{totals1.poochi_marundhu}</td>
       <td className="border border-black text-center font-bold p-1">{totals1.thozhu_uram}</td>
      <td className="border border-black text-center font-bold p-1">
          {(totals1.thozhu_uram || 0) +
      (totals1.vithai || 0) +
      (totals1.thozhu_uram || 0) +
      (totals1.poochi_marundhu || 0)}
      </td>
      
      <td className="border border-black text-center font-bold p-1">{totals1.motham}</td>
    
    </tr>
  </tbody>
</table>
</div>

    






      {/* Recommendations Section */}
      <div className="mb-4" style={{ fontFamily: "marudham", fontSize: "14px" }}>
       <h3
  className="font-bold text-center mb-2"
  style={{ fontFamily: "marudham", fontSize: "14px" }}
>
  சங்க அலுவலர்கள் பரிந்துரை
</h3>
<br />

        <p className="text-justify mb-3" style={{ fontSize: "14px", lineHeight: "1.4", fontFamily: "marudham" }}>
       &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{ `மேலே குறிப்பிடப்பட்டுள்ள விண்ணப்பத்துடன் 
        இணைத்து பெறப்பட்ட ஆவணங்களை பரிசீலனை 
        செய்ததில் அனைத்தும் மத்திய கூட்டுறவு வங்கி தெரிவிக்கும் 
        கடன் நடைமுறைகளுக்குட்பட்டு உள்ளது. மேலும், பயிர் சாகுபடி
         செய்ய விண்ணப்பதாரர் நிலத்தை தயார் நிலையில் வைத்துள்ளதால் மேற்படி 
         உறுப்பினருக்கு ₹.${amount} (${tamil} மட்டும்) கே.சி.சி. பயிர்க் கடன்
         திட்டத்தின் கீழ் கடன் அனுமதிக்க செயலாட்சியர் அவர்களுக்கு பரிந்துரைக்கப்படுகிறது.`}
        </p>
      </div>
<br></br>
      {/* Signature Section */}
      <div className="mt-8" style={{ fontFamily: "marudham", fontSize: "14px" }}>
        <div className="flex justify-between items-end">
          <div className="text-center">
            <div className="mb-8 bold " style={{ fontFamily: "marudham", fontSize: "14px" }}>எழுத்தர்</div>
          </div>
          <div className="text-center">
            <div className="mb-8" style={{ fontFamily: "marudham", fontSize: "14px" }}>உதவி செயலாளர்</div>
          </div>
          <div className="text-center">
            <div className="mb-2" style={{ fontFamily: "marudham", fontSize: "14px" }}>செயலாளர்</div>
            <div style={{ fontSize: "14px", fontFamily: "marudham" }}>(சங்க முத்திரை)</div>
          </div>
        </div>
      </div>

      {/* Final Section */}
      <div className="mt-6 border-t-2 border-gray-400 pt-3" style={{ fontFamily: "marudham", fontSize: "14px" }}>
        <h3 className="font-bold text-center mb-2" style={{ fontFamily: "marudham", fontSize: "14px" }}>செயலாட்சியர் அனுமதி உத்தரவு</h3>
        <p className="text-justify mb-3" style={{ fontSize: "14px", fontFamily: "marudham" }}>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{`சங்க செயலாளர் மற்றும் பணியாளர்களின்
           பரிந்துரையின் பேரில் மேற்படி உறுப்பினருக்கு
            ₹.${amount} (${tamil} மட்டும்) 
          கே.சி.சி.பயிர்க் கடன் திட்டத்தின் கீழ் கடன் அனுமதிக்கப்படுகிறது.`}
        </p>
      </div>
<br></br>
<br></br>
      {/* Bottom Details */}
      <div className="mt-4" style={{ fontFamily: "marudham", fontSize: "14px" }}>
        <div className="flex justify-between">
          <div>
            <div style={{ fontFamily: "marudham", fontSize: "14px" }}>கடன் அனுமதி நாள்: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{userData.date ? new Date(userData.date).toLocaleDateString("ta-IN") : "-07-2025"}</div>
            <div style={{ fontFamily: "marudham", fontSize: "14px" }}>
              சங்கத் தீர்மான எண்: 151, மற்றும் நாள்:{" "}
             &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {userData.date ? new Date(userData.date).toLocaleDateString("ta-IN") : "-7-2025"}
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold" style={{ fontFamily: "marudham", fontSize: "14px" }}>செயலாட்சியர்</div>
            <div style={{ fontFamily: "marudham", fontSize: "14px" }}>(சங்க முத்திரை)</div>
          </div>
        </div>
      </div>
<br></br>
<br></br>      {/* Final Section */}
      <div className="mt-4 border-t border-gray-400 pt-2" style={{ fontFamily: "marudham", fontSize: "14px" }}><br></br>
        <h3 className="font-bold text-center mb-2" style={{ fontFamily: "marudham", fontSize: "14px" }}>சரக மேற்பார்வையாளர் பரிந்துரை</h3>
        <p className="text-justify" style={{ fontSize: "14px", fontFamily: "marudham" }}><br></br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`மேற்கண்ட உறுப்பினருக்கு உழவர் கடன் அட்டை திட்டத்தின் கீழ் ${userData?.loanDetails?.selectedCrops[0]?.crop?.name_of_crop} பயிர் சாகுபடிக்கு ₹.${amount} கடன்
          அனுமதிக்க மத்தியக் கூட்டுறவு
           வங்கிக்கு பரிந்துரை செய்யப்படுகிறது.`}
        </p>
      </div>
<br></br>
 <br></br>     {/* Bottom Signature */}
      <div className="mt-6 text-right" style={{ fontFamily: "marudham", fontSize: "14px" }}>
        <div className="font-bold" style={{ fontFamily: "marudham", fontSize: "14px" }}>சரக மேற்பார்வையாளர்</div>
      </div>
    </div>
  )
}