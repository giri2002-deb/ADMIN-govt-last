interface Page9Props {
  data: any;
}

export default function Page9({ data }: Page9Props) {
  const userData = JSON.parse(localStorage.getItem("kcc_userjson") || "{}").userjson;

  return (
    <div
      className="p-10 pdf-page"
      style={{
        fontFamily: "Marudham, serif",
        fontSize: "14px",
        lineHeight: "1.9rem",
      }}
    >
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="font-bold" style={{ fontSize: "14px" }}>
          பயிர் காப்பீடு திட்டம் - விலக்கு கோரும் சுய உறுதிமொழி கடிதம்
        </h1>
      </div>

      {/* Application Details */}
      <div className="mb-6">
        <p className="mb-2 font-medium" style={{ fontSize: "14px" }}>அனுப்புதல்:</p>
        <div className="ml-10 space-y-1">
          <p>உ.எண்: {userData?.userInformation?.["உ_எண்"]}</p>
          <p>{userData?.userInformation?.["பெயர்"]}</p>
          <p>த/க : {userData?.userInformation?.["தகபெயர்"]}</p>
          <p>தாரன் காடு</p>
          <p>{userData?.userInformation?.["கிராமம்"]}</p>
        </div>
      </div>

      {/* Recipient */}
      <div className="mb-6">
        <p className="mb-2 font-medium" style={{ fontSize: "14px" }}>பெறுதல்:</p>
        <div className="ml-10 space-y-1">
          <p>செயலாட்சியர் / செயலாளர்</p>
          <p>S.1374 மகுடஞ்சாவடி தொடக்க வேளாண்மை கூட்டுறவு கடன் சங்கம்</p>
          <p>வரை..</p>
          <p>மகுடஞ்சாவடி அஞ்சல்</p>
          <p>சங்ககிரி வட்டம்</p>
          <p>சேலம் மாவட்டம் - 637103</p>
        </div>
      </div>

      {/* Letter Content */}
      <div className="mb-8 leading-relaxed text-justify">
        <p className="mb-4 font-semibold">அய்யா,</p>

        <p className="mb-4 pl-10 text-justify leading-relaxed">
          பொருள்: புதுப்பிக்கப்பட்ட பிரதம மந்திரி பயிர் காப்பீடு திட்டம் சுய விருப்பத்தின்
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          பேரில் பயிர் காப்பீட்டில் இருந்து விலக்கு கோரும் உறுதிமொழி கடிதம்
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          அளித்தல் தொடர்பாக.
        </p>

        <p className="mb-4 pl-10">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; நான் தங்களது சங்கத்தில் 1-7-2025ந்தேதியில்
          பயிர் கடன் பெறுவதற்காக விண்ணப்பித்துள்ளேன். எனது நில உடைமை ஆவணத்தின்படி
          கூடலூர் வருவாய் கிராமத்திற்கு குச்சி -இ பயிருக்கு பயிர் காப்பீடு தெரிவு செய்யப்பட்டுள்ளது.
        </p>

        <p className="mb-4 pl-10">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ஆனால் புதுப்பிக்கப்பட்ட பிரதம மந்திரி பயிர்
          காப்பீடு திட்டத்தின்படி எனது சுய விருப்பத்தின் பேரில் எனக்கு பயிர் காப்பீட்டில்
          இருந்து தற்போது விலக்களிக்கும்படி கோருகிறேன். இதனால் பயிர் காப்பீட்ற்கான
          இழப்பீட்டு தொகையை என்னால் கோர இயலாது என்பதை நன்கு அறிவேன்..
        </p>
      </div>

      {/* Signature */}
      <div className="text-right pr-6 mt-10">
        <p className="font-medium">உறுப்பினர் கையொப்பம்</p>
      </div>
    </div>
  );
}
