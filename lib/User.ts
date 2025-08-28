// export interface User {
//   பெயர்: string;
//   தகபெயர்: string;
//   கைபேசி_எண்: string;
//   ஆதார்_எண்: string;
//   பிறந்த_தேதி: string;
//   வ_எண்: string;
//   உ_எண்: string;
//   முகவரி: string;
//   கிராமம்: string;
//   வட்டம்: string;
//   பங்குத்_தொகை: number;
//   sdccb_sb_கணக்கு_எண்: string;
//   society_sb_கணக்கு_எண்: string;
//   pan_அட்டை_எண்: string;
//   ரேஷன்_அட்டை_வகை: string;
//   வாக்காளர்_அட்டை_எண்: string;
//   மொத்த_நிலம்: number;

//   நிலம்1_சர்வே_எண்: string;
//   நிலம்1_ac: number;
//   நிலம்2_சர்வே_எண்: string;
//   நிலம்2_ac: number;
//   நிலம்3_சர்வே_எண்: string;
//   நிலம்3_ac: number;
//   நிலம்4_சர்வே_எண்: string;
//   நிலம்4_ac: number;
//   நிலம்5_சர்வே_எண்: string;
//   நிலம்5_ac: number;
//   நிலம்6_சர்வே_எண்: string;
//   நிலம்6_ac: number;
//   நிலம்7_சர்வே_எண்: string;
//   நிலம்7_ac: number;
//   நிலம்8_சர்வே_எண்: string;
//   நிலம்8_ac: number;
//   நிலம்9_சர்வே_எண்: string;
//   நிலம்9_ac: number;
//   நிலம்10_சர்வே_எண்: string;
//   நிலம்10_ac: number;
//   நிலம்11_சர்வே_எண்: string;
//   நிலம்11_ac: number;
//   நிலம்12_சர்வே_எண்: string;
//   நிலம்12_ac: number;
//   நிலம்13_சர்வே_எண்: string;
//   நிலம்13_ac: number;
//   நிலம்14_சர்வே_எண்: string;
//   நிலம்14_ac: number;
//   நிலம்15_சர்வே_எண்: string;
//   நிலம்15_ac: number;
//   நிலம்16_சர்வே_எண்: string;
//   நிலம்16_ac: number;
//   நிலம்17_சர்வே_எண்: string;
//   நிலம்17_ac: number;
//   நிலம்18_சர்வே_எண்: string;
//   நிலம்18_ac: number;
//   நிலம்19_சர்வே_எண்: string;
//   நிலம்19_ac: number;
//   நிலம்20_சர்வே_எண்: string;
//   நிலம்20_ac: number;

//   vao_சான்றிதழ்_தேதி: string;
// }
export interface User {
  பெயர்: string;
  தகபெயர்: string;
  கைபேசி_எண்: string;
  ஆதார்_எண்: string;
  பிறந்த_தேதி: string;
  வ_எண்: string;
  உ_எண்: string;
  முகவரி: string;
  கிராமம்: string;
  வட்டம்: string;
  பங்குத்_தொகை: number;
  dccb_sb_கணக்கு_எண்: string;
  society_sb_கணக்கு_எண்: string;
  pan_அட்டை_எண்: string;
  ரேஷன்_அட்டை_வகை: string;
  வாக்காளர்_அட்டை_எண்: string;
  மொத்த_நிலம்: number;

  // 20 நில விவரங்கள்
  நிலம்1_சர்வே_எண்: string; நிலம்1_ac: number;
  நிலம்2_சர்வே_எண்: string; நிலம்2_ac: number;
  நிலம்3_சர்வே_எண்: string; நிலம்3_ac: number;
  நிலம்4_சர்வே_எண்: string; நிலம்4_ac: number;
  நிலம்5_சர்வே_எண்: string; நிலம்5_ac: number;
  நிலம்6_சர்வே_எண்: string; நிலம்6_ac: number;
  நிலம்7_சர்வே_எண்: string; நிலம்7_ac: number;
  நிலம்8_சர்வே_எண்: string; நிலம்8_ac: number;
  நிலம்9_சர்வே_எண்: string; நிலம்9_ac: number;
  நிலம்10_சர்வே_எண்: string; நிலம்10_ac: number;
  நிலம்11_சர்வே_எண்: string; நிலம்11_ac: number;
  நிலம்12_சர்வே_எண்: string; நிலம்12_ac: number;
  நிலம்13_சர்வே_எண்: string; நிலம்13_ac: number;
  நிலம்14_சர்வே_எண்: string; நிலம்14_ac: number;
  நிலம்15_சர்வே_எண்: string; நிலம்15_ac: number;
  நிலம்16_சர்வே_எண்: string; நிலம்16_ac: number;
  நிலம்17_சர்வே_எண்: string; நிலம்17_ac: number;
  நிலம்18_சர்வே_எண்: string; நிலம்18_ac: number;
  நிலம்19_சர்வே_எண்: string; நிலம்19_ac: number;
  நிலம்20_சர்வே_எண்: string; நிலம்20_ac: number;

  vao_சான்றிதழ்_தேதி: string;

  // ✅ Financial fields from user_financial_details
  ஜாமீன்_பெயர்?: string;
  ஜாமீன்_ஆதார்_எண்?: string;
  தனி_SB_சரிசெய்த_தொகை?: number;
}
