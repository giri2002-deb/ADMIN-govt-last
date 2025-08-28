interface Page7Props {
  data: any
}

export default function Page7({ data }: Page7Props) {
  const userData = JSON.parse(localStorage.getItem("kcc_userjson") || "{}").userjson;

  return (
    <div
      className="p-6 h-full pdf-page"
      style={{
        fontFamily: "Marudham, serif",
        fontSize: "14px",
        lineHeight: "1.8rem",
      }}
    >
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="font-bold">
          S.1374 மகுடஞ்சாவடி தொடக்க வேளாண்மை கூட்டுறவு கடன் சங்கம் வரை
        </h1>
        <div className="border border-black p-2 mt-4 inline-block">
          <h2 className="font-bold">உறுப்பினர் உறுதி மொழி சான்று</h2>
        </div>
      </div>

      {/* Application Details */}
      <div className="mb-6">
        <p>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; { `உ.எண் ${userData?.userInformation?.["உ_எண்"] || "உ_எண்"} பெயர்: ${userData?.userInformation?.["பெயர்"] || "பெயர்"} ஆகிய நான் பயிர் கடன் தொகை ரூ.${userData?.loanDetails?.totalEligibleAmount}/- 
          விண்ணப்பித்துள்ளேன். இதில் உரமாக அனுமதிக்கப்படும் தொகை ரூ. 7590 /-ல் தொழு
          உரத்திற்கு 50 சதவீத தொகைக்கு உட்பட்டு 5.3790 கேட்டுக்கொள்கிறேன். 
          ரொக்கமாக அனுமதிக்குமாறு`}
        </p>
      </div>

      <div className="text-right mb-8">
        <p>இப்படிக்கு&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
        <br />
        <p>உறுப்பினர் கைகையாப்பம்</p>
      </div>

      {/* Society Details */}
      <div className="border border-black p-4 mb-6">
        <h3 className="text-center font-bold mb-4">சங்க உறுப்பினர் கொடுக்கும் சான்றிதழ்</h3>
      </div>

      <div className="space-y-2 mb-6">
        <div className="flex">
          <span className="w-4">1</span>
          <span className="font-bold w-32">சங்கத்தின் பெயர்</span>
          <span className="mr-4">:</span>
          <span>S.1374 மகுடஞ்சாவடி தொடக்க வேளாண்மை கூட்டுறவு கடன் சங்கம் வரை.</span>
        </div>
        <div className="flex">
          <span className="w-4">2</span>
          <span className="font-bold w-32">உ. எண்</span>
          <span className="mr-4">:</span>
          <span>{userData?.userInformation?.["உ_எண்"]} </span>
        </div>
        <div className="flex">
          <span className="w-4">3</span>
          <span className="font-bold w-32">பெயர்</span>
          <span className="mr-4">:</span>
          <span>{userData?.userInformation?.["பெயர்"]}</span>
        </div>
        <div className="flex">
          <span className="w-4">4</span>
          <span className="font-bold w-32">கடன் எண்</span>
          <span className="mr-4">:</span>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/KCC</span>
        </div>
        <div className="flex">
          <span className="w-4">5</span>
          <span className="font-bold w-32">கடன் பட்டுவாடா தேதி</span>
          <span className="mr-4">:</span>
          <span>&nbsp;&nbsp;&nbsp;-07-2025</span>
        </div>
        <div className="flex">
          <span className="w-4">6</span>
          <span className="font-bold w-32">கடன் தொகை ரூ.</span>
          <span className="mr-4">:</span>
          <span>{userData?.loanDetails?.totalEligibleAmount}</span>
        </div>
        <div className="flex">
          <span className="w-4">7</span>
          <span className="font-bold w-32">கடன் வேளரிய காரியம்</span>
          <span className="mr-4">:</span>
          <span>{userData?.loanDetails?.selectedCrops[0]?.crop?.name_of_crop}</span>
        </div>
        <div className="flex">
          <span className="w-4">8</span>
          <span className="font-bold w-32">கடனின் வாய்தா</span>
          <span className="mr-4">:</span>
          <span>&nbsp;&nbsp;&nbsp;-07-2026</span>
        </div>
      </div>

      <div className="text-justify mb-6">
        <p>
         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; மேலே தெரிவித்த விபரப்படி பட்டுவாடா பெற்ற கடன் தொகையை கோரிய காரியத்திற்கே பயன்படுத்தினேன் என்று உறுதி கூறுகிறேன்.
        </p>
      </div>

      <div className="mb-4">
        {/* Date Left */}
        <div className="flex justify-between">
          <p>
            <strong>தேதி:</strong>
          </p>
        </div>

        <br />

        {/* Signatures Right */}
        <div className="flex flex-col items-end">
          <p>
            <strong>கடன்தாரர் கைகையாப்பம்</strong>
          </p>
          <br />
          <br />
          <br />
          <p>
            <strong>செயலாளர்&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong>
          </p>
        </div>
      </div>
    </div>
  )
}
