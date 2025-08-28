"use client"
import { useEffect, useState } from "react"

interface TamilAgriculturalFormProps {
  data?: any
}

export function Page3({ data }: TamilAgriculturalFormProps) {
  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    const storedData = localStorage.getItem("kcc_userjson")
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData)
        console.log("Parsed localStorage data:", parsedData)
        setUserData(parsedData.userjson || parsedData)
      } catch (error) {
        console.error("Error parsing localStorage data:", error)
      }
    }
  }, [])

  const sampleCropsData = [
    {
      crop: { name_of_crop: "கரும்பு நடவு (TI)" },
      acres: 0.7,
      breakdown: {
        cents: 70,
        motham: 47600,
        rokkam: 31247.999999999996,
        uram_1: 3919.9999999999995,
        uram_2: 7839.999999999999,
        vithai: 7279.999999999999,
        thozhu_uram: 3919.9999999999995,
        poochi_marundhu: 1232,
      },
      eligibleAmount: 47600,
    },
    {
      crop: { name_of_crop: "நெல் (இ)" },
      acres: 0.8,
      breakdown: {
        cents: 80,
        motham: 54400,
        rokkam: 35712,
        uram_1: 4480,
        uram_2: 8960,
        vithai: 8320,
        thozhu_uram: 4480,
        poochi_marundhu: 1408,
      },
      eligibleAmount: 54400,
    },
  ]

  const sampleGoldData = [
    {
      type: "குச்சி - இ.",
      count: "98",
      weight: "1.38",
      netWeight: "5520",
      marketValue: "7590",
      loanValue: "6000",
      appraiserSignature: "",
      cropLoanAmount: "47600",
    },
  ]

  const cropsData = userData?.loanDetails?.selectedCrops || userData?.selectedCrops || sampleCropsData
  const goldData = userData?.goldDetails?.items || userData?.goldDetails || sampleGoldData

  const totals = cropsData.reduce(
    (acc: any, crop: any) => {
      return {
        acres: acc.acres + (crop.acres || 0),
        motham: acc.motham + (crop.breakdown?.motham || 0),
        rokkam: acc.rokkam + (crop.breakdown?.rokkam || 0),
        uram_1: acc.uram_1 + (crop.breakdown?.uram_1 || 0),
        uram_2: acc.uram_2 + (crop.breakdown?.uram_2 || 0),
        vithai: acc.vithai + (crop.breakdown?.vithai || 0),
        thozhu_uram: acc.thozhu_uram + (crop.breakdown?.thozhu_uram || 0),
        poochi_marundhu: acc.poochi_marundhu + (crop.breakdown?.poochi_marundhu || 0),
        eligibleAmount: acc.eligibleAmount + (crop.eligibleAmount || 0),
      }
    },
    {
      acres: 0,
      motham: 0,
      rokkam: 0,
      uram_1: 0,
      uram_2: 0,
      vithai: 0,
      thozhu_uram: 0,
      poochi_marundhu: 0,
      eligibleAmount: 0,
    },
  )

  const getSurveyNumbers = () => {
    if (!userData?.userInformation) return ""

    const surveyNumbers = []
    for (let i = 1; i <= 20; i++) {
      const surveyNum = userData.userInformation[`நிலம்${i}_சர்வே_எண்`]
      if (surveyNum && surveyNum.trim() !== "") {
        surveyNumbers.push(surveyNum.trim())
      }
    }
    return surveyNumbers.join(", ")
  }

  return (
    <div
      className="bg-white text-black"
      style={{
        width: "794px",
        height: "1500px",
        padding: "20px",
        boxSizing: "border-box",
        fontSize: "14px",
        lineHeight: "1.4",
        fontFamily: "'Marudhar', 'Arial', sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Gold Details Section */}
      <div style={{ marginBottom: "12px" }}>
        <div
          style={{
            border: "1px solid black",
            padding: "6px",
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: "6px",
            fontSize: "14px",
          }}
        >
          நகை அடமானமாக இருந்தால் விபரம்
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "6px",
            fontSize: "14px",
          }}
        >
          <div>கடன் தேதியில் ஒரு கிராமிற்கு மார்கெட் மதிப்பு.</div>
          <div>கடன் தேதியில் ஒரு கிராமிற்கு கடன் வழங்கும் மதிப்பு.</div>
        </div>

        {/* Gold Table */}
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "12px", fontSize: "12px" }}>
          <thead>
            <tr>
              <th
                rowSpan={3}
                style={{
                  border: "1px solid black",
                  padding: "4px",
                  textAlign: "center",
                  width: "12%",
                }}
              >
                நகை விபரம்
              </th>
              <th
                rowSpan={3}
                style={{
                  border: "1px solid black",
                  padding: "4px",
                  textAlign: "center",
                  width: "8%",
                }}
              >
                எண்ணிக்கை
              </th>
              <th
                rowSpan={3}
                style={{
                  border: "1px solid black",
                  padding: "4px",
                  textAlign: "center",
                  width: "10%",
                }}
              >
                மொத்த எடை
              </th>
              <th
                rowSpan={3}
                style={{
                  border: "1px solid black",
                  padding: "4px",
                  textAlign: "center",
                  width: "10%",
                }}
              >
                நிகர எடை
              </th>
              <th
                colSpan={4}
                style={{
                  border: "1px solid black",
                  padding: "4px",
                  textAlign: "center",
                }}
              >
                நகை மதிப்பிடாளர் குறிப்பு
              </th>
            </tr>
            <tr>
              <th
                rowSpan={2}
                style={{
                  border: "1px solid black",
                  padding: "4px",
                  textAlign: "center",
                  width: "12%",
                }}
              >
                மார்கெட் மதிப்பு
              </th>
              <th
                rowSpan={2}
                style={{
                  border: "1px solid black",
                  padding: "4px",
                  textAlign: "center",
                  width: "12%",
                }}
              >
                கடன் வழங்கும் மதிப்பு
              </th>
              <th
                rowSpan={2}
                style={{
                  border: "1px solid black",
                  padding: "4px",
                  textAlign: "center",
                  width: "12%",
                }}
              >
                நகை மதிப்பாளர் கையொப்பம்
              </th>
              <th
                rowSpan={2}
                style={{
                  border: "1px solid black",
                  padding: "4px",
                  textAlign: "center",
                  width: "14%",
                }}
              >
                சாகுபடி செய்யும் பயிர் கடன் அளவுப்படி வழங்கும் கடன் தொகை
              </th>
            </tr>
            <tr></tr>
          </thead>
          <tbody>
            {goldData.map((item: any, index: number) => (
              <tr key={index}>
                <td style={{ border: "1px solid black", padding: "4px" }}>{item.type}</td>
                <td style={{ border: "1px solid black", padding: "4px", textAlign: "center" }}>
                  {item.count}
                </td>
                <td style={{ border: "1px solid black", padding: "4px", textAlign: "center" }}>
                  {item.weight}
                </td>
                <td style={{ border: "1px solid black", padding: "4px", textAlign: "center" }}>
                  {item.netWeight}
                </td>
                <td style={{ border: "1px solid black", padding: "4px", textAlign: "center" }}>
                  {item.marketValue || ""}
                </td>
                <td style={{ border: "1px solid black", padding: "4px", textAlign: "center" }}>
                  {item.loanValue || ""}
                </td>
                <td style={{ border: "1px solid black", padding: "4px" }}>{item.appraiserSignature || ""}</td>
                <td style={{ border: "1px solid black", padding: "4px", textAlign: "center" }}>
                  {item.cropLoanAmount || ""}
                </td>
              </tr>
            ))}
            {/* Fill empty rows */}
            {[...Array(Math.max(0, 3 - goldData.length))].map((_, i) => (
              <tr key={`empty-${i}`}>
                {Array.from({ length: 8 }).map((_, j) => (
                  <td
                    key={j}
                    style={{
                      border: "1px solid black",
                      padding: "4px",
                      height: "24px",
                    }}
                  ></td>
                ))}
              </tr>
            ))}
            {/* Totals row */}
            <tr>
              <td
                style={{
                  border: "1px solid black",
                  padding: "4px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                மொத்தம்
              </td>
              <td style={{ border: "1px solid black", padding: "4px", textAlign: "center" }}>
                {goldData.reduce((sum: number, item: any) => sum + (Number.parseInt(item.count) || 0), 0)}
              </td>
              <td style={{ border: "1px solid black", padding: "4px", textAlign: "center" }}>
                {goldData.reduce((sum: number, item: any) => sum + (Number.parseFloat(item.weight) || 0), 0).toFixed(2)}
              </td>
              <td style={{ border: "1px solid black", padding: "4px", textAlign: "center" }}>
                {goldData.reduce((sum: number, item: any) => sum + (Number.parseInt(item.netWeight) || 0), 0)}
              </td>
              <td style={{ border: "1px solid black", padding: "4px", textAlign: "center" }}>
                {goldData.reduce((sum: number, item: any) => sum + (Number.parseInt(item.marketValue) || 0), 0)}
              </td>
              <td style={{ border: "1px solid black", padding: "4px", textAlign: "center" }}>
                {goldData.reduce((sum: number, item: any) => sum + (Number.parseInt(item.loanValue) || 0), 0)}
              </td>
              <td style={{ border: "1px solid black", padding: "4px" }}></td>
              <td style={{ border: "1px solid black", padding: "4px", textAlign: "center" }}>
                {goldData.reduce((sum: number, item: any) => sum + (Number.parseInt(item.cropLoanAmount) || 0), 0)}
              </td>
            </tr>
            <tr>
              <th
                colSpan={8}
                style={{
                  border: "1px solid black",
                  padding: "6px",
                  textAlign: "center",
                }}
              >
    *சாகுபடி செய்யும் பயிர்க்கடன் அளவுப்படி வழங்கும் தொகைக்கு ஈடாக நகை மதிப்பு இருக்க வேண்டும்.
              </th>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Legal Text Sections */}
      <div style={{ marginBottom: "12px", lineHeight: "1.5",  textAlign: "justify" }}>
        இத்துடன் நான் ஈடாகக் கொடுத்திருக்கும் நிலம்/ நகைகள் எனக்குத் தனிமையில் பாத்தியப்பட்டது. மேற்படி சொத்துக்களை இக்கடனுக்கு ஈடாகக் கொடுக்க எனக்கு பாத்தியமுண்டு. இந்த நகைகளை தாங்கள் மாவட்ட மத்தியக் கூட்டுறவு வங்கியில் மறு ஈடு வைக்க இதன் மூலம் ஒப்புதல் அளிக்கிறேன்.
      </div>

      <div style={{ marginBottom: "12px", lineHeight: "1.5", textAlign: "justify"}}>
       நான் வாங்கும் இக் கடனை உரிய கெடு தேதிக்குள் திருப்பி செலுத்தாதபட்சத்தில் சங்கத்தின் உபவிதிகளின்படி இக்கடனுக்கு ஈடு வழங்கியுள்ள நிலம்/ நகையை ஏலம் போட்டு ஏலத்தில் கிடைத்த தொகையை கடனுக்கு வரவு வைத்துக்கொள்ளவும். அத்தொகை கடனுக்கு போதவில்லை என்றால் மீதமுள்ள தொகையை நான் செலுத்தவும். அவ்வாறு செலுத்தவில்லை எனில் என் மீது உரிய சட்டப்பூர்வ நடவடிக்கை எடுக்க இதன் மூலம் ஒப்புதல் அளிக்கிறேன்.
      </div>

      <div style={{ marginBottom: "12px", lineHeight: "1.5",textAlign: "justify" }}>
        இந்த கடனுக்கு ஈடு வழங்கியுள்ள கீழ்க்கண்ட சொத்துக்கள் மூலமும் சங்கத்தாருக்கு யாதொரு நஷ்டமும் குறைவும். கெடுதலும் ஏற்படாமல் பாதுகாத்து கொடுக்கவும். இதன் மூலம் ஒப்புக்கொள்கிறேன். மேலும் கடன் பெறும்போது ஈடுகாட்டும் நிலம்/ நக மதிப்பு குறைந்தால் அக்குறைவு மதிப்புக்கான கடன் தொகையை திருப்பி செலுத்தவும் அல்லது கூடுதல் நிலம்/நகையை ஈடு கொடுக்கவும் இதன் மூலம் ஒப்புதல் அளிக்கிறேன்.
      </div>

      <div style={{ marginBottom: "16px", lineHeight: "1.5",textAlign: "justify" }}>
       நான் வாங்கும் கடனை மேற்படி பத்திரத்தில் காணப்படும் நிபந்தனைகளுக்கும் அதில் காணப்படாததும் இப்போதுள்ள சங்க விதிகளிலும், உபவிதிகளிலும், இனி ஏற்படும் உபவிதிகளிலும் உள்ள நிபந்தனைகளுக்கும். இந்த விண்ணப்பத்தில் உள்ள ஷரத்துகளுக்கும் நானும், எனது வாரிசுகளும் என் பிரதிநிதிகளும் கட்டுப்பட்டவர்கள் என உறுதி கூறுகிறேன்.
      </div>

      {/* Crop Details Section */}
      <div
        style={{
          border: "1px solid black",
          padding: "6px",
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: "6px",
        }}
      >
        கடன் வேளாண்மை விபரம்
      </div>

      {/* Crop Details Table */}
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "12px", fontSize: "12px" }}>
        <thead>
          <tr>
            <th
              rowSpan={2}
              style={{
                border: "1px solid black",
                padding: "4px",
                textAlign: "center",
                width: "20%",
              }}
            >
              சாகுபடி செய்யும் பயிரின் பெயர்
            </th>
            <th
              rowSpan={2}
              style={{
                border: "1px solid black",
                padding: "4px",
                textAlign: "center",
                width: "15%",
              }}
            >
              சர்வே எண்
            </th>
            <th
              colSpan={2}
              style={{
                border: "1px solid black",
                padding: "4px",
                textAlign: "center",
              }}
            >
              பயிரிட உள்ள
            </th>
            <th
              rowSpan={2}
              style={{
                border: "1px solid black",
                padding: "4px",
                textAlign: "center",
                width: "10%",
              }}
            >
              விதை
            </th>
            <th
              rowSpan={2}
              style={{
                border: "1px solid black",
                padding: "4px",
                textAlign: "center",
                width: "10%",
              }}
            >
              உரம்
            </th>
            <th
              rowSpan={2}
              style={{
                border: "1px solid black",
                padding: "4px",
                textAlign: "center",
                width: "10%",
              }}
            >
              பூச்சி மருந்து
            </th>
            <th
              rowSpan={2}
              style={{
                border: "1px solid black",
                padding: "4px",
                textAlign: "center",
                width: "10%",
              }}
            >
              ரொக்கம்
            </th>
            <th
              rowSpan={2}
              style={{
                border: "1px solid black",
                padding: "4px",
                textAlign: "center",
                width: "10%",
              }}
            >
              மொத்தம்
            </th>
          </tr>
          <tr>
            <th
              style={{
                border: "1px solid black",
                padding: "4px",
                textAlign: "center",
                width: "7.5%",
              }}
            >
              ஏக்கர்
            </th>
            <th
              style={{
                border: "1px solid black",
                padding: "4px",
                textAlign: "center",
                width: "7.5%",
              }}
            >
              சென்ட்
            </th>
          </tr>
        </thead>
        <tbody>
          {cropsData.map((crop: any, index: number) => (
            <tr key={index}>
              <td style={{ border: "1px solid black", padding: "4px" }}>
                {crop.crop?.name_of_crop || crop.name_of_crop || "N/A"}
              </td>
              {index === 0 && (
                <td
                  rowSpan={Math.max(cropsData.length, 4)}
                  style={{
                    border: "1px solid black",
                    padding: "6px",
                    textAlign: "center",
                    verticalAlign: "middle",
                    wordWrap: "break-word",
                    lineHeight: "1.3",
                  }}
                >
                  {getSurveyNumbers()}
                </td>
              )}
              <td style={{ border: "1px solid black", padding: "4px", textAlign: "center" }}>
                {crop.acres || ""}
              </td>
              <td style={{ border: "1px solid black", padding: "4px", textAlign: "center" }}>
                {crop.breakdown?.cents || ""}
              </td>
              <td style={{ border: "1px solid black", padding: "4px", textAlign: "center" }}>
                {Math.round(crop.breakdown?.vithai || 0)}
              </td>
              <td style={{ border: "1px solid black", padding: "4px", textAlign: "center" }}>
                {Math.round((crop.breakdown?.uram_1 || 0) + (crop.breakdown?.uram_2 || 0))}
              </td>
              <td style={{ border: "1px solid black", padding: "4px", textAlign: "center" }}>
                {Math.round(crop.breakdown?.poochi_marundhu || 0)}
              </td>
              <td style={{ border: "1px solid black", padding: "4px", textAlign: "center" }}>
                {Math.round(crop.breakdown?.rokkam || 0)}
              </td>
              <td style={{ border: "1px solid black", padding: "4px", textAlign: "center" }}>
                {Math.round(crop.eligibleAmount || 0)}
              </td>
            </tr>
          ))}
          {[...Array(Math.max(0, 4 - cropsData.length))].map((_, i) => (
            <tr key={`empty-crop-${i}`}>
              <td style={{ border: "1px solid black", padding: "4px", height: "22px" }}></td>
              <td style={{ border: "1px solid black", padding: "4px", height: "22px" }}></td>
              <td style={{ border: "1px solid black", padding: "4px", height: "22px" }}></td>
              <td style={{ border: "1px solid black", padding: "4px", height: "22px" }}></td>
              <td style={{ border: "1px solid black", padding: "4px", height: "22px" }}></td>
              <td style={{ border: "1px solid black", padding: "4px", height: "22px" }}></td>
              <td style={{ border: "1px solid black", padding: "4px", height: "22px" }}></td>
              <td style={{ border: "1px solid black", padding: "4px", height: "22px" }}></td>
            </tr>
          ))}
          <tr>
            <td
              style={{
                border: "1px solid black",
                padding: "4px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              மொத்தம்
            </td>
            <td style={{ border: "1px solid black", padding: "4px", textAlign: "center" }}>
              
            </td>
            <td style={{ border: "1px solid black", padding: "4px", textAlign: "center" }}>
              {totals.acres.toFixed(2)}
            </td>
            <td style={{ border: "1px solid black", padding: "4px", textAlign: "center" }}>
              {(totals.acres * 100).toFixed(0)}
            </td>
            <td style={{ border: "1px solid black", padding: "4px", textAlign: "center" }}>
              {Math.round(totals.vithai)}
            </td>
            <td style={{ border: "1px solid black", padding: "4px", textAlign: "center" }}>
              {Math.round(totals.uram_1 + totals.uram_2)}
            </td>
            <td style={{ border: "1px solid black", padding: "4px", textAlign: "center" }}>
              {Math.round(totals.poochi_marundhu)}
            </td>
            <td style={{ border: "1px solid black", padding: "4px", textAlign: "center" }}>
              {Math.round(totals.rokkam)}
            </td>
            <td style={{ border: "1px solid black", padding: "4px", textAlign: "center" }}>
              {Math.round(totals.eligibleAmount)}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Footer Notes */}
      <div style={{ lineHeight: "1.5", marginBottom: "6px",textAlign :"justify"}}>
        1. நான் எனக்கு தேவையான விதைப்பகுதியை வெளிமார்க்கெட்டில் வாங்க உள்ளதால் விதைப் பகுதியை ரொக்கமாக வழங்க கோருகிறேன்.
      </div>

      <div style={{ lineHeight: "1.5", marginBottom: "6px",textAlign :"justify" }}>
        2. நான் பயிரிடும் பயிருக்கு தொழு உரம் தேவையாக இருப்பதால் வெளிமார்க்கெட்டில் வாங்க உர பகுதியில் 50% தொகையை ரொக்கமாக வழங்குமாறு
        கேட்டுக்கொள்கிறேன்.
      </div>

      <div style={{ lineHeight: "1.5", marginBottom: "6px",textAlign :"justify" }}>
        3. பூச்சி மருந்து வெளிமார்க்கெட்டில் வாங்க உள்ளதால் 100% ரொக்கமாக வழங்கக் கோருகிறேன்.
      </div>

      <div style={{ lineHeight: "1.5", marginBottom: "6px",textAlign :"justify" }}>
        4. அடமான கடனாக இருந்தால் தமிழ்நாடு கூட்டுறவு சட்டம் பிரிவு 41 மற்றும் அதன் கீழ் ஏற்படுத்தப்பட்ட விதி எண் 68ல் தெரிவித்துள்ளபடி படிவம்
        26-ஐ இத்துடன் இணைத்துள்ளேன்.
      </div>

      <div style={{ lineHeight: "1.5", marginBottom: "6px",textAlign :"justify" }}>
        5. கடனுக்கு தேவைப்படும் உறுப்பினர் பிரிமியத்தையும் செலுத்த சம்மதிக்கிறேன். பங்குத்தொகையையும், பயிர்காப்பீடு இருந்தால் அதற்கான
        பிரிமியத்தையும் செலுத்த சம்மதிக்கிறேன்.
      </div>

      <div style={{ lineHeight: "1.5", marginBottom: "16px",textAlign :"justify" }}>
        6. பயிர் கடன் பெற்று மூன்று மாதங்களில் பயிர் சாகுபடி செய்த நிலத்தின் நிழற்படம் (தேதியுடன்) எடுத்து கொடுக்க சம்மதிக்கிறேன்.
      </div>
<br></br>
<br></br>
        <br></br>
<br></br><br></br>
<br></br>
      {/* Footer Signatures */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontWeight: "bold",
          marginTop: "auto",
        }}
      >

        <span>பிணையதாரர் கையொப்பம்</span>
        <span>கடன்தாரர் கையொப்பம்</span>
      </div>
    </div>
  )
}