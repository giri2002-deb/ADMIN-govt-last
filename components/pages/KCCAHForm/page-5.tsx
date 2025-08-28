interface Page5Props {
  data: any
}

export default function Page5({ data }: Page5Props) {
  const userData = JSON.parse(localStorage.getItem("kccah_userjson") || "{}").userjson;
  const today = new Date();
  const year = today.getFullYear();
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



  return (
    <div
 
  className="w-[794px] h-[1123px] mx-auto bg-white relative"
  style={{
    fontFamily: "'Marudham', Tamil, 'Noto Sans Tamil', serif",
    fontSize: "14px",       // ✅ uniform font size
    lineHeight: "1.6",      // ✅ proper spacing
    color: "#000000",
    textAlign: "justify",   // ✅ correct alignment
  }}
>
  {/* all your page content here */}


      {/* Page Number */}
      <div className="text-center mb-4">
        <h2 className="font-bold">-2-</h2>
      </div>

      {/* Main Content */}
      <div className="text-justify space-y-4">
        <p className="mb-8 text-justify">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;மேலும் இந்த ஒப்பந்த பத்திரம் 1983 ஆம் ஆண்டின் தமிழ்நாடு கூட்டுறவுச் சங்கங்களின் சட்டம் (1983 ஆம் ஆண்டின் தமிழ்நாட்டுச் சட்டம் எண்.30) பிரிவு 41-ன் கீழ் குறிப்பிடப்பட்டுள்ள எல்லா நிபந்தனைகளையும் உள்ளடக்கியதாகக் கருதப்படும் எனவும், எல்லா நிபந்தனைகளுக்கும் உட்பட்டதெனவும் ஒப்புக்கொண்டு மேற்குறிப்பிட்ட கடன்தாரர்கள் இதன் வாயிலாக உறுதியளிக்றேன் / றோம்.
        </p>
        <p className="mb-8 text-justify">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;சட்டம் விதிகள் மற்றும் சங்கத் துணைவிதிகளின் நிபந்தனைகளுக்கு
          உட்பட்டு நடந்துகொண்டும். கடன்தாரர் / கள் செலுத்த வேண்டிய முழுத்தொகையும் உரிய வகையில் 
          திருப்பிச்செலுத்தியும் வந்தால் எழுதப்பட்ட உரிமை செயலற்றதாகிவிடும் என்பதும், இல்லாவிட்டால் 
          முழு அதிகாரத்துடன் கட்டாய நடைமுறையில் இருந்துவரும் என்பதும் மேற்படி எழுதப்பட்ட உரிமையின் 
          நிபந்தனைகள் என்ற வகையில் அமையும்.
        </p>
      </div>

      {/* Declaration Section */}
      <div className="border border-black p-4 mt-8 mb-6">
        <h3 className="text-center font-bold mb-4">இணைப்பு</h3>
      </div>

      {/* Personal Details */}
      <div className="space-y-2 mb-6">
        <div className="flex">
          <span className="font-bold w-24">கிராமம்</span>
          <span className="mr-4">:</span>
          <span>{userData?.userInformation?.["கிராமம்"]}</span>
        </div>
        <div className="flex">
          <span className="font-bold w-24">வட்டம்</span>
          <span className="mr-4">:</span>
          <span>{userData?.userInformation?.["வட்டம்"]}</span>
        </div>
        <div className="flex">
          <span className="font-bold w-24">மாவட்டம்</span>
          <span className="mr-4">:</span>
          <span>சேலம்</span>
        </div>
<div className="flex items-start">
  <span className="font-bold w-24">சர்வே எண்</span>
  <span className="mr-2">:</span>
  <div className="flex flex-col">
   {surveyList}
  </div>
</div>


        <div className="flex">
          <span className="font-bold w-24">எல்லைகள்</span>
          <span className="mr-4">:</span>
        </div>
        <div className="flex">
          <span className="font-bold w-24">பரப்பளவு</span>
          <span className="mr-4">:</span>
          <span>{userData?.calculatedFields?.totalLandArea
  ? Number(userData.calculatedFields.totalLandArea).toFixed(2)
  : "0.00"}
</span>
        </div>
      </div>

      <div className="text-center mb-8">
        <p>இதன் சாட்சியாக {year} ஆம் வருடம் ஜூலை மாதம்  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; நாளில்</p>
        <p>நான்/ நாங்கள் கையெழுத்திட்டுள்ளேன்/ளோம்.</p>
      </div>

      <br />
      <br />
      <br />

      {/* Signature Section */}
      <div className="mb-2 px-4 text-right">
        <h3 className="font-bold">கடன்தாரர் கைகையாப்பம்</h3>
        <br />
        <br />
      </div>

      {/* Witness Details */}
      <div className="mb-8">
        <p className="font-bold mb-4">சாட்சிகள் :-</p>
        <div className="space-y-4">
          <div>
            <p>
              <strong>1.</strong>  &nbsp;&nbsp;&nbsp;&nbsp;பெயர் :
            </p><br></br>
            <p className="ml-4"> &nbsp;&nbsp;&nbsp;&nbsp;முகவரி :</p>
            <br />
            <p className="ml-4"> &nbsp;&nbsp;&nbsp;&nbsp;தொழில் :</p>
            <br></br>
            <br></br>
            <div className="mb-2 px-4 text-right">
              <h2 className="font-bold">முதல் சாட்சியின் கைகையாழுத்து</h2>
              <br />
              <br />
            </div>
          </div>

          <div>
            <p>
              <strong>2.</strong> &nbsp;&nbsp;&nbsp;&nbsp; பெயர் :
            </p><br></br>
            <p className="ml-4"> &nbsp;&nbsp;&nbsp;&nbsp;முகவரி :</p>
            <br />
            <p className="ml-4"> &nbsp;&nbsp;&nbsp;&nbsp;தொழில் :</p>
            <br></br>
            <br></br>
            <div className="mb-2 px-4 text-right">
              <h2 className="font-bold">இரண்டாவது சாட்சியின் கைகையாழுத்து</h2>
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
