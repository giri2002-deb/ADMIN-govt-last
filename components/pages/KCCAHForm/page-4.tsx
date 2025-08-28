import { numberToTamilWords } from "@/utils/tamil-numbers";
interface Page4Props {
  data: any;
}

export default function Page4({ data }: Page4Props) {
  const userData =
    JSON.parse(localStorage.getItem("kccah_userjson") || "{}").userjson;
// Example: userData?.userInformation?.["பிறந்த_தேதி"] = "2002-07-08"
const amount=userData?.loanDetails?.kccahBreakdown?.total?.["மொத்தம்"];
const rounded = Math.round(amount);  
const tamil=numberToTamilWords(rounded)
const dobString = userData?.userInformation?.["பிறந்த_தேதி"]; 
let age: number | null = null;

if (dobString) {
  const dob = new Date(dobString);
  const today = new Date();

  age = today.getFullYear() - dob.getFullYear();

  const hasBirthdayPassed =
    today.getMonth() > dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());

  if (!hasBirthdayPassed) {
    age--;
  }
}

  return (
    <div
      className="p-6 h-full pdf-page"
      style={{ fontFamily: "Maradham, sans-serif", fontSize: "14px", lineHeight: "1.7" }}
    >
      {/* Header */}
      <div className="text-center mb-6">
        <div className="border border-black p-2 inline-block">
          <h2 className="font-bold">பிடிவம் எண் - 26</h2>
        </div>
        <p className="mt-2">(த.நா.கூ.ச.விதிகள் 1988-ல் விதி எண் 68ஐக் காண்க.)</p>
      </div>

      {/* Main Content */}
      <div className="text-justify space-y-4 leading-relaxed">
        <p className="text-justify">
         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; பெரும்பான்மை உறுப்பினர்களை விவசாயிகளாகக் கொண்ட ஒரு கூட்டுறவுச்
          சங்கத்தின் <br />
          உறுப்பினருக்கு அச்சங்கம் வழங்கக் கூடிய எந்தக்கடன் தொடர்பாகவும் அந்த
          உறுப்பினருக்குச் சொந்தமான நிலம் அல்லது அசையாச் சொத்தின்மீது
          சங்கத்திற்கு உரிமையினை உருவாக்குவதற்காக தமிழ்நாடு கூட்டுறவு
          சங்கங்களின் சட்டம் 1983 (1983 ஆம் ஆண்டின் தமிழ்நாட்டுச் சட்டம் எண்.30)
          பிரிவு 41-ன் உட்பிரிவு (1)-ன் கீழ் அளிக்கப்பட வேண்டிய உறுதிமொழிப்படிவம்.
        </p>


        <p className="mb-8 text-justify">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {`${userData?.userInformation?.["பெயர்"]} என்பவரின் மகன் / மகள் / மனைவி ஆகிய 
          ${age} வயதுடைய ${userData?.userInformation?.["கிராமம்"] || "கிராமம்"} கிராமம் ${userData?.userInformation?.["முகவரி"] || "கூ.முரள் 9789519045"} முகவரியில் 
          வசித்து வரும் ${userData?.userInformation?.["உ_எண்"] }  ${userData?.userInformation?.["பெயர்"]}
           (${userData?.userInformation?.["ஆதார்_எண்"] } ஆகிய நான் / நாங்கள் 
          (இனி கடன்தாரர் / தாரர்கள் என்று குறிப்பிடப்படும். அவ்வாறு 
          அனுமதிக்கப்படும் வாசகமானது என் / எங்களின் வாரிசுதாரர்கள். 
          பின்னுரிமையாளர்கள். நிறைவேற்றுநர்கள், சட்டப்பூர்வப் பிரதிநிதிகள், 
          நிர்வாகிகள் ஒப்படைக்கப்படுவார்கள் ஆகியவர்ளையும் உள்ளடக்கும்) 
          S.1374 மகுடஞ்சாவடி தொடக்க வேளாண்மை கூட்டுறவு கடன் சங்கத்தின் 
          (வரையறுக்கப்பட்டது / படாதது) உறுப்பினராக / உறுப்பினர்களாகச் சேர 
          அனுமதிக்கப்பட்டு. சங்கத்திலிருந்து கடன் வாங்க விரும்புவதால், தமிழ்நாடு 
          கூட்டுறவுச் சங்கங்களின் சட்டம் 1983 (1983 ஆம் ஆண்டின் தமிழ்நாட்டுச் சட்டம் 30) பி
          ரிவு 41 இன் கீழ் தேவைப்படும் வகையில் சங்கம் எனக்கு / எங்களுக்கு வழங்கக்கூடிய
           கடன்களையும். பின்னாளில் வழங்கக்கூடிய СТОМАНТ முன் பணங்களையும் உரிய 
           தவணைகளில் திருப்பிச் செலுத்துவதற்காக ரூ. ${userData?.loanDetails?.kccahBreakdown?.total?.["மொத்தம்"] || "N/A"} (ரூபாய் ${tamil} )
            அவ்வாறான கடன் மற்றும் முன்பணத்தொகைகளுக்கான வட்டியுடன் உச்ச அளவிற்கு இதன் 
            வாயிலாக உறுதியளித்து இதன் இணைப்பில் மேலும் முழுமையாக விவரிக்கப்பட்டுள்ள
           சொத்தின்மீது சங்கத்திற்கு உரிமை உருவாக்கியுள்ளோம் என இதன் வாயிலாக`}
        </p>

        <p className="mb-8 text-justify">
         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; மேற்குறிப்பிட்ட கடன்தாரர் / கடன்தாரர்கள் உரிமை உருவாக்கப்பட்ட சொத்தின் மீது எங்களுக்கு முறையான உரிமை உள்ளதெனவும், மேலும் இதனால் பின்னிகழப்போகும் சட்டப்படியான நடவடிக்கைகள் அனைத்திற்கும் எங்களைக் கட்டுப்படுத்தும் என்றும் இதனால் உறுதியளிக்கிறோம். சொத்துரிமையில் குறைபாடு அல்லது வேறுவகை காரணமாக எந்த நட்டம் அல்லது அழிவு நேரிட்டாலும் அதனை ஈடு செய்யப் பொறுப்பேற்றுக் கொள்கிறேன்/றோம்.
        </p>
         <p className="mb-8 text-justify">
         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; இதனால் உருவாக்கப்பட்ட உரிமை தவிர வேறு வில்லங்கம் ஏதும் சங்கத்திற்கு உரிமையளிக்கப்பட்ட சொத்தின் மீது இல்லை என்று மேற்குறிப்பிட்ட கடன்தாரர் /தாரர்கள் மேலும் உறுதி அளிக்கிறேன் / றோம். மேலும் மேற்குறிப்பிட்ட கடன்தாரர் /தாரர்கள் சங்கத்திலிருந்து பெற்றுள்ள கடன் / கடன்கள் முபமையாகச் செலுத்தித் தீர்க்கப்படும் வரை மேற்குறிப்பிட்ட சொத்தினை விற்பனை / அடமானம் / தானம் அல்லது வேறுவகையில் வேறு யாருக்கும் மாற்ற மாட்டேன் / மாட்டோம் என்று பொறுப்பேற்றுக் கொள்கிறேன் / றோம்.
        </p>
      </div>
    </div>
  );
}
