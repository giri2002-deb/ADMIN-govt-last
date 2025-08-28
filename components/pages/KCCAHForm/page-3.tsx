
"use client"

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

interface TamilAgriculturalFormProps {
  data?: any
}

export default function Page3({ data }: TamilAgriculturalFormProps) {
  const [userData, setUserData] = useState<UserData | null>(null)

  useEffect(() => {
    const storedData = localStorage.getItem("kccah_userjson")
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
    return <div className="p-4" style={{ fontSize: "14px", fontFamily: "'Marutham', serif" }}>Loading...</div>
  }

  const userInfo = userData.userInformation || {}
  const selectedCrops = userData.selectedCrops || []
  const landParcels = userData.landParcels || []
  const friendDetails = userData.friendDetails || {}

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

  return (
    <div
      className="bg-white text-black overflow-hidden"
      style={{
        width: "816px",
        height: "1344px",
        fontSize: "16px",
        lineHeight: 1.5,
        fontFamily: "Arial, sans-serif",
        padding: "16px",
       
      }}
    >
      {/* Header */}
      <div className="text-center mb-4" style={{ fontSize: "14px", fontFamily: "'Marutham', serif" }}>
        <h2 className="font-bold" style={{ fontSize: "14px", fontFamily: "'Marutham', serif" }}>அலுவலக உபயோகத்திற்கு</h2>
      </div>

      {/* First Table - User Information */}
      <table className="w-full border-collapse border-2 border-gray-400 mb-4" style={{ fontSize: "14px", fontFamily: "'Marutham', serif" }}>
        <tbody style={{ fontSize: "14px", fontFamily: "'Marutham', serif" }}>
          <tr style={{ fontSize: "14px", fontFamily: "'Marutham', serif" }}>
            <td className="border border-gray-400 p-2 font-bold bg-white" style={{ width: "25%", fontSize: "14px", fontFamily: "'Marutham', serif" }}>
              கடன்தாரர் ஆதார் எண்
            </td>
            <td className="border border-gray-400 p-2 bg-white" style={{ width: "25%", fontSize: "14px", fontFamily: "'Marutham', serif" }}>
              {formatNumber(userInfo["ஆதார்_எண்"] || "")}
            </td>
            <td className="border border-gray-400 p-2 font-bold bg-white" style={{ width: "25%", fontSize: "14px", fontFamily: "'Marutham', serif" }}>
              பிணைதாரர் ஆதார் எண்
            </td>
            <td className="border border-gray-400 p-2 bg-white" style={{ width: "25%", fontSize: "14px", fontFamily: "'Marutham', serif" }}>
              {formatNumber(friendDetails?.detailedInfo?.["ஆதார்_எண்"] || "")}
            </td>
          </tr>
          <tr style={{ fontSize: "14px", fontFamily: "'Marutham', serif" }}>
            <td className="border border-gray-400 p-2 font-bold bg-white" style={{ fontSize: "14px", fontFamily: "'Marutham', serif" }}>கடன்தாரர் கைபேசி எண்</td>
            <td className="border border-gray-400 p-2 bg-white" style={{ fontSize: "14px", fontFamily: "'Marutham', serif" }}>
              {formatNumber(userInfo["கைபேசி_எண்"] || "")}
            </td>
            <td className="border border-gray-400 p-2 font-bold bg-white" style={{ fontSize: "14px", fontFamily: "'Marutham', serif" }}>பிணைதாரர் கைபேசி எண்</td>
            <td className="border border-gray-400 p-2 bg-white" style={{ fontSize: "14px", fontFamily: "'Marutham', serif" }}>
              {formatNumber(friendDetails?.detailedInfo?.["கைபேசி_எண்"] || "")}
            </td>
          </tr>
          <tr style={{ fontSize: "14px", fontFamily: "'Marutham', serif" }}>
            <td className="border border-gray-400 p-2 font-bold bg-white" style={{ fontSize: "14px", fontFamily: "'Marutham', serif" }}>கடன்தாரர் ம.வங்கி KCC SB எண்</td>
            <td className="border border-gray-400 p-2 bg-white" style={{ fontSize: "14px", fontFamily: "'Marutham', serif" }}>{userInfo["sdccb_kcc_கணக்கு_எண்"] || ""}</td>
            <td className="border border-gray-400 p-2 font-bold bg-white" style={{ fontSize: "14px", fontFamily: "'Marutham', serif" }}>VAO சான்று காலாவதி தேதி</td>
            <td className="border border-gray-400 p-2 bg-white" style={{ fontSize: "14px", fontFamily: "'Marutham', serif" }}></td>
          </tr>
          <tr style={{ fontSize: "14px", fontFamily: "'Marutham', serif" }}>
            <td className="border border-gray-400 p-2 font-bold bg-white" style={{ fontSize: "14px", fontFamily: "'Marutham', serif" }}>கடன்தாரர் ம.வங்கி SB எண்</td>
            <td className="border border-gray-400 p-2 bg-white" style={{ fontSize: "14px", fontFamily: "'Marutham', serif" }}>{userInfo["sdccb_sb_கணக்கு_எண்"] || ""}</td>
            <td className="border border-gray-400 p-2 font-bold bg-white" style={{ fontSize: "14px", fontFamily: "'Marutham', serif" }}>பங்குத்தொகை நிலுவை</td>
            <td className="border border-gray-400 p-2 bg-white" style={{ fontSize: "14px", fontFamily: "'Marutham', serif" }}>₹ {userInfo["பங்குத்_தொகை"] || ""}</td>
          </tr>
          <tr style={{ fontSize: "14px", fontFamily: "'Marutham', serif" }}>
            <td className="border border-gray-400 p-2 font-bold bg-white" style={{ fontSize: "14px", fontFamily: "'Marutham', serif" }}>கடன்தாரர் சங்க SB எண்</td>
            <td className="border border-gray-400 p-2 bg-white" style={{ fontSize: "14px", fontFamily: "'Marutham', serif" }}>{userInfo["society_sb_கணக்கு_எண்"] || ""}</td>
            <td className="border border-gray-400 p-2 font-bold bg-white" style={{ fontSize: "14px", fontFamily: "'Marutham', serif" }}>வாக்காளர் அட்டை எண்</td>
            <td className="border border-gray-400 p-2 bg-white" style={{ fontSize: "14px", fontFamily: "'Marutham', serif" }}>{userInfo["வாக்காளர்_அட்டை_எண்"] || ""}</td>
          </tr>
          <tr style={{ fontSize: "14px", fontFamily: "'Marutham', serif" }}>
            <td className="border border-gray-400 p-2 font-bold bg-white" style={{ fontSize: "14px", fontFamily: "'Marutham', serif" }}>கடன்தாரர் PAN எண்</td>
            <td className="border border-gray-400 p-2 bg-white" style={{ fontSize: "14px", fontFamily: "'Marutham', serif" }}>{userInfo["pan_அட்டை_எண்"] || ""}</td>
            <td className="border border-gray-400 p-2 bg-white" style={{ fontSize: "14px", fontFamily: "'Marutham', serif" }}></td>
            <td className="border border-gray-400 p-2 bg-white" style={{ fontSize: "14px", fontFamily: "'Marutham', serif" }}></td>
          </tr>
          <tr style={{ fontSize: "14px", fontFamily: "'Marutham', serif" }}>
            <td className="border border-gray-400 p-2 font-bold bg-white" style={{ fontSize: "14px", fontFamily: "'Marutham', serif" }}>கடன்தாரர் குடும்ப அட்டை எண்</td>
            <td className="border border-gray-400 p-2 bg-white" style={{ fontSize: "14px", fontFamily: "'Marutham', serif" }}>{userInfo["ரேஷன்_அட்டை_எண்"] || ""}</td>
            <td className="border border-gray-400 p-2 bg-white" style={{ fontSize: "14px", fontFamily: "'Marutham', serif" }}></td>
            <td className="border border-gray-400 p-2 bg-white" style={{ fontSize: "14px", fontFamily: "'Marutham', serif" }}></td>
          </tr>
        </tbody>
      </table>
      <br></br>
       <div className="text-right mt-8">
          <p className="font-bold text-base">கடன்தாரர் கையொப்பம்</p>
        </div>
<br></br>
      {/* Crop Details Section */}
        <div className="">
        <div className="text-center mb-3">
          <p className="font-bold text-base">செயலாட்சியர் மற்றும் செயலாளர் உறுதி மொழி</p>
        </div>

        <div className="text-justify leading-relaxed" style={{ fontSize: "14px" }}>
          <p>
         &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{`மேற்கண்டவாறு கடன் கோரும் உறுப்பினரால்
          கொடுக்கப்பட்ட விபரங்கள் அனைத்தும் சரியானவை
           என்றும் அவர் கோருகிறபடி ரூ.${userData?.loanDetails?.kccahBreakdown?.total?.["மொத்தம்"] || "N/A"} விவசாய நடைமுறை மூலதனக்கடன் 
         திட்டம் மூலம் கடன் அனுமதிக்கலாம் என சான்று செய்கிறோம்`}
          </p>
          <br></br>
        </div>
         <div className="flex justify-between mt-6">
  <p className="font-bold text-base">செயலாளர்</p>
  <p className="font-bold text-base">செயலாட்சியர்</p>
</div>
<br></br>

      </div>
         <div className="">
        <div className="text-center mb-3">
          <p className="font-bold text-base">மேற்பார்வையாளர் சான்று</p>
        </div>

        <div className="text-justify leading-relaxed" style={{ fontSize: "14px" }}>
          <p>
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{`மேற்கண்டவாறு கடன் கோரும் உறுப்பினரால் 
        கொடுக்கப்பட்ட விபரங்கள் அனைத்தும் சரியானவை 
        என்றும் அவர் கோருகிறபடி ரூ.${userData?.loanDetails?.kccahBreakdown?.total?.["மொத்தம்"] || "N/A"} விவசாய நடைமுறை மூலதனக்கடன் திட்டம் மூலம் 
        கடன் அனுமதிக்க தெரிவு செய்ய அனுமதிக்கப்படுகிறது.`}
          </p>
          <br></br>
        </div>
         <div className="flex justify-between mt-6">
  <p className="font-bold text-base"></p>
  <p className="font-bold text-base">மேற்பார்வையாளர்</p>
</div>

      </div>
      <br></br>
       <div className="">
        <div className="text-center mb-3">
          <p className="font-bold text-base">அலுவலக உபயோகத்திற்கு</p>
        </div>

        <div className="text-justify leading-relaxed" style={{ fontSize: "14px" }}>
          <p>
       &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{`சங்க தீர்மானம் எண் 135 தேதி 27.5.2025ன்படி உ.எண் 
        ${userData?.userInformation?.["உ_எண்"] } ${userData?.userInformation?.["பெயர்"]} அவர்களுக்கு 
        கீழ்கண்டவாறு விவசாய கடன் அட்டை 
        திட்டத்தின் கீழ் காசுக்கடன் அனுமதிக்கப்படுகிறது.`}
          </p>
          <br></br>
        </div>
   

      </div>

<div className="mb-4">
  <div className="text-center mb-3">
          <p className="font-bold text-base">கடன் தொகை</p>
        </div>
  <table className="w-full border-collapse border border-black text-sm">
    <thead>
      <tr>
        <th className="border border-black p-1 text-center">கடன் வகை</th>
        <th className="border border-black p-1 text-center">மூல பொருட்கள்</th>
        <th className="border border-black p-1 text-center">இதர செலவுகள்</th>
        <th className="border border-black p-1 text-center">மொத்த நடைமுறை<br />மூலதன கடன்</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="border border-black p-1 text-center">
          {userData?.loanDetails?.kccahBreakdown?.loanName }
        </td>
        <td className="border border-black p-1 text-center">
          {userData?.loanDetails?.kccahBreakdown?.perUnit?.["ரொக்கம்"] }
        </td>
        <td className="border border-black p-1 text-center">
          {userData?.loanDetails?.kccahBreakdown?.perUnit?.["விதை"] }
        </td>
        <td className="border border-black p-1 text-center font-bold">
          {userData?.loanDetails?.kccahBreakdown?.perUnit?.["மொத்தம்"] }
        </td>
      </tr>
      <tr className="font-bold">
        <td className="border border-black p-1 text-center">மொத்தம்</td>
        <td className="border border-black p-1 text-center">
          {userData?.loanDetails?.kccahBreakdown?.perUnit?.["ரொக்கம்"] }
        </td>
        <td className="border border-black p-1 text-center">
          {userData?.loanDetails?.kccahBreakdown?.perUnit?.["விதை"] }
        </td>
        <td className="border border-black p-1 text-center font-bold">
          {userData?.loanDetails?.kccahBreakdown?.perUnit?.["மொத்தம்"] }
        </td>
      </tr>
    </tbody>
  </table>
<br></br>
<br></br>
  {/* Footer sign section */}
  <div className="flex justify-between mt-4 text-sm font-bold">
    <p></p>
    <p>செயலாளர்</p>
  </div>
</div>


    
    </div>
  )
}