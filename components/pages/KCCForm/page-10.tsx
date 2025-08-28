interface Page10Props {
  data: any
}

export default function Page10({ data }: Page10Props) {
  const userData = JSON.parse(localStorage.getItem("kcc_userjson") || "{}").userjson;

  return (
    <div
      className="p-6 h-full pdf-page"
      style={{
        fontFamily: "Marudham, serif",
        fontSize: "14px",
        lineHeight: "1.6",
      }}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-lg font-bold">சுய உறுதி மொழி கடிதம்</h1>
      </div>

      {/* Main Content */}
      <div className="text-justify space-y-6 leading-relaxed">
        <p>
          &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {`சேலம் மாவட்டம்,${userData?.userInformation?.["வட்டம்"]} வட்டம், 
       ${userData?.userInformation?.["கிராமம்"]}  கிராமத்தில், 
       ${userData?.userInformation?.["முகவரி"]}  வசிக்கும் மெ.நெ : ${userData?.userInformation?.["உ_எண்"]} 
        திரு/திருமதி.${userData?.userInformation?.["பெயர்"]}
        
        த/பெ. ${userData?.userInformation?.["தகபெயர்"]} பயிர்கடன் பெற்றுள்ள நான் பிற 
        வங்கிகளில் பயிர்கடன் 
        
      எதுவும் பெறவில்லை எனவும், பிற வங்கிகளில் விவசாயக் கடன் பெற்றுள்ளதாக 
      பின்னர் அறியவரும் நிலையில், அதனால் 7% வட்டி மானியம் கிடைப்பதில் ஏதேனும்
       இடர்பாடு ஏற்பட்டு அரசிடமிருந்து மானியமாக வர வேண்டிய வட்டித் தொகை மீளப்பெறாத
        சூழ்நிலை ஏற்படின் அதற்கான தொகைக்கு முழு பொறுப்பேற்று வங்கிக்கு திருப்பி 
        செலுத்திவிடுகிறேன் நானே முழு பொறுப்பு ஏற்கிறேன். இவ்வுறுதியினை மீறும் பட்சத்தில்
         சங்கம் எடுக்கும் சட்டப்பூர்வ நடவடிக்கைகளுக்கு கட்டுப்படுகிறேன் என இதன் மூலம்
          உறுதி அளிக்கிறேன்`}
        </p>
      </div>

      {/* Footer */}
      <div className="text-right mt-16">
        <p>
          <strong>கடன்தாரர் கைகையாப்பம்.</strong>
        </p>
      </div>
    </div>
  );
}
