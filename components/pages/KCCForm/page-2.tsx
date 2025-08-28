import Image from "next/image";

interface LoanApplicationFormProps {
  data?: any;
}

export default function LoanApplicationForm({ data }: LoanApplicationFormProps) {
  const userData = JSON.parse(localStorage.getItem("kcc_userjson") || "{}").userjson;
  const userData1 = JSON.parse(localStorage.getItem("kcc_userjson") || "{}").userjson?.userInformation || {};
  const rows: { survey: string; acres: string }[] = [];

  // Gather land details from user info, max 20 entries
  for (let i = 1; i <= 20; i++) {
    const survey = userData1[`நிலம்${i}_சர்வே_எண்`];
    const acres = userData1[`நிலம்${i}_ac`];
    if (survey && acres) {
      rows.push({ survey, acres });
    }
  }

  // Ensure at least 5 rows for consistent table height
  while (rows.length < 5) {
    rows.push({ survey: "", acres: "" });
  }

  // Calculate total acres, sum only valid acres
  const totalAcres = rows
    .filter((row) => row.acres)
    .reduce((sum, row) => sum + parseFloat(row.acres || "0"), 0)
    .toFixed(2);

  // Determine loan type text based on formSections flags
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
      className="bg-white text-black overflow-hidden"
      style={{
        width: " 816px", // A4 width approx. in px
        height: "2000px", // A4 height approx. in px
        fontSize: "14px",
        lineHeight: 1.3,
        fontFamily: "'Marutham', sans-serif",
        padding: "16px",
      }}
    >
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="font-bold" style={{ fontSize: "18px", lineHeight: 1.2, marginBottom: 4 }}>
          S.1374 மகுடஞ்சாவடி தொடக்க வேளாண்மை கூட்டுறவு கடன் சங்கம் வரை..
        </h1>
        <p style={{ marginBottom: 2 }}>
          மகுடஞ்சாவடிஅஞ்சல், சங்ககிரி வட்டம். சேலம் மாவட்டம் 637103
        </p>
        <p className="font-semibold">
          உழவர் கடன் அட்டை திட்டத்தின் (Kissan Credit Card) கீழ் பயிர் கடன் விண்ணப்பம்
        </p>
      </div>
<br></br>
      {/* Application Info */}
      <div className="grid grid-cols-12 gap-2 mb-4">
        {/* Left side */}
        <div className="col-span-8">
          <div className="grid grid-cols-2 gap-x-4 mb-2">
            <p>
              <strong>கடன் வகை:</strong> {loanTypeText}
            </p>
            <p>
              <strong>கடன்தாரர் வகை:</strong> {userData.calculatedFields?.farmerType}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-4 mb-2">
            <p>
              <strong>அனுப்பதல்:</strong>
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-4 mb-2">
            <p>
              <strong>உ. எண்:</strong> {userData?.userInformation?.["உ_எண்"]}
            </p>
          </div>
          <p className="mb-2">
            <strong>பெயர்:</strong> {userData?.userInformation?.["பெயர்"]}
          </p>
          <p className="mb-2">
            <strong>த/க/பெ:</strong> {userData?.userInformation?.["தகபெயர்"]}
          </p>
          <p className="mb-2">
            <strong>முகவரி:</strong> {userData?.userInformation?.["முகவரி"]}
          </p>
          <p>
            <strong>கைபேசி எண்:</strong> {userData?.userInformation?.["கைபேசி_எண்"]}
          </p>
        </div>

        {/* Right side - Photo and official info */}
        <div className="col-span-4 text-right">
          <p>
            <strong>நாள்:&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong>
          </p>
          <p>
            <strong>பெறுநர்: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong>
          </p>
          <p className="font-semibold" style={{ marginBottom: 2 }}>
            செயலாட்சியர் / செயலாளர்&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </p>
          <p style={{ marginBottom: 4 }}>
            S.1374 மகுடஞ்சாவடி தொடக்க வேளாண்மை கூட்டுறவு 
            <br />கடன் சங்கம் வரை..&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </p>
          <div className="inline-block border border-black">
            <Image
              src={userData?.userInformation?.user_photo_preview || "/placeholder.svg"}
              alt="Applicant Photo"
              width={80}
              height={80}
              className="object-cover"
            />&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
        </div>
      </div>
<br></br>
      {/* Application Letter */}
      <div className="mb-4">
        <p className="mb-2">
          <strong>அய்யா,</strong>
        </p>
        <p className="text-justify" style={{ lineHeight: 1.3 }}>
          &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; எனக்கு கீழ்க்கண்ட விபரப்படி சொந்தமாக/ குத்தகையாக நிலம் உள்ளது. எனவே எனக்கு பயிர் சாகுபடி
          செய்வதற்காக உழவர் கடன் அட்டை திட்டத்தின் கீழ் நபர் ஜாமீன்/ அடமானத்தின் பேரில் கடன் அனுமதிக்குமாறு
          கேட்டுக் கொள்கிறேன்.
        </p>
      </div>

      {/* Land Details Table */}
      <div className="mb-4">
        <table className="w-full border-collapse border border-black" style={{ fontSize: "12px" }}>
          <thead>
            <tr>
              <th colSpan={3} className="border border-black font-bold text-center p-1">
                சொந்த நிலம்
              </th>
              <th colSpan={3} className="border border-black font-bold text-center p-1">
                குத்தகை நிலம்
              </th>
              <th
                rowSpan={2}
                className="border border-black font-bold text-center align-middle p-1"
                style={{ width: "50px" }}
              >
                மொத்தம்
              </th>
              <th colSpan={2} className="border border-black font-bold text-center p-1">
                சாகுபடி பரப்பு
              </th>
            </tr>
            <tr>
              <th className="border border-black font-bold text-center p-1">
                சர்வே எண்
              </th>
              <th className="border border-black font-bold text-center p-1">
                பாசன விபரம்
              </th>
              <th className="border border-black font-bold text-center p-1">
                பரப்பு<br />ஏ சே
              </th>
              <th className="border border-black font-bold text-center p-1">
                சர்வே எண்
              </th>
              <th className="border border-black font-bold text-center p-1">
                பாசன விபரம்
              </th>
              <th className="border border-black font-bold text-center p-1">
                பரப்பு<br />ஏ சே
              </th>
              <th className="border border-black font-bold text-center p-1">
                சர்வே எண்
              </th>
              <th className="border border-black font-bold text-center p-1">
                பரப்பு<br />ஏ சே
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.slice(0, ).map((item, idx) => (
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
                <td className="border border-black text-center p-1"></td>
              </tr>
            ))}
            <tr className="font-bold" style={{ height: 28, backgroundColor: "white" }}>
              <td colSpan={2} className="border border-black text-center p-1">
                மொத்தம்
              </td>
              <td className="border border-black text-center p-1">
                {totalAcres}
              </td>
              <td colSpan={3} className="border border-black"></td>
              <td className="border border-black text-center p-1">
                {totalAcres}
              </td>
              <td colSpan={2} className="border border-black"></td>
            </tr>
          </tbody>
        </table>
        <p style={{ fontSize: "11px", marginTop: 4, lineHeight: 1.2 }}>
          * பாசன விவரம் என்பதற்கு நஞ்சை, மானாவாரி, கிணறு, ஆறு பாசன விபரத்தை குறிப்பிட வேண்டும்.
        </p>
      </div>

      <hr className="border-t border-black my-2" />

      {/* Guarantor Details Section */}
      <div className="mb-4">
        <h3 className="font-bold text-center underline mb-2">
          நபர் பிணையம் அடிப்படையாக பிணையதாரர் விபரம்
        </h3>

        <div className="border border-black">
          <div className="flex">
            {/* Personal Info (50%) */}
            <div className="w-1/2 border-r border-black">
              <table className="w-full h-full">
                <tbody>
                  <tr className="border-b border-black">
                    <td className="font-semibold  align-top p-1">உ._எண் :</td>
                    <td className="font-bold p">{userData.friendDetails.detailedInfo?.["உ_எண்"]}</td>
                  </tr>
                  <tr className="border-b border-black">
                    <td className="font-semibold align-top p-1">பெயர்:</td>
                    <td className="font-bold p-1">{userData.friendDetails.detailedInfo?.["பெயர்"]}</td>
                  </tr>
                  <tr className="border-b border-black">
                    <td className="font-semibold align-top p-1">த/க/பெ:</td>
                    <td className="align-top p-1" style={{ lineHeight: 1.2 }}>
                    {userData.friendDetails.detailedInfo?.["தகபெயர்"]}
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td className="font-semibold align-top p-1">முகவரி:</td>
                    <td className="p-1">
                        {userData.friendDetails.detailedInfo?.["முகவரி"]}
                        {userData.friendDetails.detailedInfo?.["கைபேசி_எண்"]}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Photo (20%) */}
            <div className="border p-4 mt inline-block">
                 <Image
              src={userData?.documents?.friendPhoto?.preview|| "/placeholder.svg"}
              alt="Applicant Photo"
              width={120}
              height={120}
              className="border"
            />
          </div>

            {/* Survey Details (30%) */}
            <div className="flex-1" style={{ fontSize: "11px" }}>
              <table className="w-full h-full border-collapse">
                <thead>
                  <tr>
                    <th className="border border-black p-1">சர்வே எண்</th>
                    <th className="border border-black p-1">பாசன விபரம்</th>
                    <th className="border border-black p-1">பரப்பு<br />ஏ செ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="align-top border border-black p-1" style={{ lineHeight: 1.1 }}>
                    {userData.friendDetails.detailedInfo?.["சர்வே_எண்"]}
                    </td>
                    <td className="align-top text-center border border-black p-1">
                    </td>
                    <td className="align-top text-center font-bold border border-black p-1">
                      {userData?.friendDetails?.detailedInfo?.["ஏக்கர்"]}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Mortgage Land Details */}
      <div className="mb-4">
        {/* First Table */}
        <div className="bg-white border-1 border-black">
          <h2 className="font-bold text-black text-center">
            நில அடமானமாக இருந்தால் விபரம்
            <div className="border-b border-black mx-auto mt-0.5" style={{ width: 250 }}></div>
          </h2>
          <br />

          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-black p-1 font-medium text-left bg-white w-2/5">
                  நிலம் இருக்கும் <br />கிராமத்தின் பெயர்
                </th>
                <th className="border border-black p-1 font-medium text-left bg-white w-1/5">{userData.ownProperty?.mortgageDetails?.village}</th>
                <th className="border border-black p-1 font-medium text-center bg-white w-1/5">
                  சர்வே எண்
                </th>
                <th className="border border-black p-1 font-medium text-center bg-white w-1/5">
                  பாசன விபரம்
                </th>
                <th className="border border-black p-1 font-medium text-center bg-white w-1/5">
                  பரப்பு<br />ஏ&nbsp;&nbsp;செ
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-black p-1 bg-white align-top">
                  பதிவு அலுவலகம்
                </td>
                <td className="border border-black p-1 bg-white">{userData.ownProperty?.mortgageDetails?.surveyNumber}</td>
                <td className="border border-black p-1 bg-white">{userData.ownProperty?.mortgageDetails?.mortgageReg}</td>
                <td className="border border-black p-1 bg-white">{userData.ownProperty?.mortgageDetails?.irrigation}</td>
                <td className="border border-black p-1 bg-white">{userData.ownProperty?.mortgageDetails?.ca}</td>
              </tr>
              <tr>
                <td className="border border-black p-1 bg-white">
                  அடமான பதிவு எண்/ தேதி
                </td>
                <td className="border border-black p-1 bg-white">{userData.ownProperty?.mortgageDetails?.mortgageReg}</td>
                <td className="border border-black p-1 bg-white"></td>
                <td className="border border-black p-1 bg-white"></td>
                <td className="border border-black p-1 bg-white"></td>
              </tr>
              <tr>
                <td className="border border-black p-1 bg-white">
                  வழிகாட்டி மதிப்பு
                </td>
                <td className="border border-black p-1 bg-white">{userData.ownProperty?.mortgageDetails?.guidanceValue}</td>
                <td className="border border-black p-1 bg-white"></td>
                <td className="border border-black p-1 bg-white"></td>
                <td className="border border-black p-1 bg-white"></td>
              </tr>
              <tr>
                <td className="border border-black p-1 bg-white">
                  அடவுத் தொகை
                </td>
                <td className="border border-black p-1 bg-white">{userData.ownProperty?.mortgageDetails?.mortgageAmount}</td>
                <td className="border border-black p-1 bg-white"></td>
                <td className="border border-black p-1 bg-white"></td>
                <td className="border border-black p-1 bg-white"></td>
              </tr>
            </tbody>
          </table>

          {/* Second Table */}
          <br />
          <h2 className="font-bold text-black text-center">
            ஒப்பந்த சாகுபடி (Tieup) அடிப்படை யாக இருந்தால் விபரம்
            <div className="border-b border-black mx-auto mt-0.5" style={{ width: 390 }}></div>
          </h2>
        </div>
        <br />

        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border border-black p-1 font-medium text-left bg-white w-1/3">
                ஒப்பந்த நிறுவனத்தின் பெயர்
              </th>
              <th className="border border-black p-1 font-medium text-left bg-white w-1/3"></th>
              <th className="border border-black p-1 font-medium text-center bg-white w-1/3">
                பதிவு<br />தேதி
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black p-1 bg-white">
                உறுப்பினர் எண்
              </td>
              <td className="border border-black p-1 bg-white"></td>
              <td className="border border-black p-1 bg-white"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}