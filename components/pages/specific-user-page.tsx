"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Trash2,
  Plus,
  Calculator,
  AlertTriangle,
  CheckCircle,
  User,
  FileText,
  Leaf,
  Coins,
  Search,
  UserPlus,
  Edit,
  Loader2,
  X,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import axios from "axios"

type LandDetailKeys = `நிலம்${number}_சர்வே_எண்` | `நிலம்${number}_heh` | `நிலம்${number}_ac`
type FarmerType = "OF" | "SF" | "MF"

type PerCentRate = {
  rokkam: number
  thozhu_uram: number
  uram_1: number
  uram_2: number
  poochi_marundhu: number
  vithai: number
  motham: number
}

type CropBreakdown = {
  rokkam: number
  thozhu_uram: number
  uram_1: number
  uram_2: number
  poochi_marundhu: number
  vithai: number
  motham: number
  cents: number // acres * 100 (1 acre = 100 cents)
  perCentRate: PerCentRate // per-acre rate / 100
}

type SelectedCrop = {
  crop: any
  acres: number
  eligibleAmount: number
  breakdown?: CropBreakdown
    surveyNumber?: string  
}

// ✅ Gold Item structure with நிகர எடை and கலவு
type GoldItem = {
  type: string
  weight: number
  count: number
  netWeight: number // நிகர எடை
  alloy: string // கலவு
  netAmount: number // நிகர எடை × gold rate
}

type FormDataType = {
  உ_எண்: string
  பெயர்: string
  தகபெயர்: string
  முகவரி: string
  கிராமம்: string
  வட்டம்: string
  ஜாதி: string
  பங்குத்_தொகை: string
  ஆதார்_எண்: string
  கைபேசி_எண்: string
  sdccb_kcc_கணக்கு_எண்: string
  sdccb_sb_கணக்கு_எண்: string
  society_sb_கணக்கு_எண்: string
  pan_அட்டை_எண்: string
  ரேஷன்_அட்டை_வகை: string
  ரேஷன்_அட்டை_எண்: string
  வாக்காளர்_அட்டை_எண்: string
  மொத்த_நிலம்: string
  principle_amount: string
  // ✅ NEW: Date of Birth
  பிறந்த_தேதி: string
  guarantee_type: "friend" | "gold" | "property" | ""
  checkboxes: {
    kcc: boolean
    kccah: boolean
    tractor: boolean
    jewel: boolean
  }
  aadhaar_file: File | null
  aadhaar_preview: string | null
  ration_file: File | null
  ration_preview: string | null
  pan_file: File | null
  pan_preview: string | null
  voter_file: File | null
  voter_preview: string | null
  user_photo: File | null
  user_photo_preview: string | null
  friend_photo: File | null
  friend_photo_preview: string | null
  surveyNumbers: string[]
} & {
  [key in LandDetailKeys]: string
}

// User Information Component
interface UserInformationProps {
  formData: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleUserPhotoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  shareAmountError: string;
  farmerType: string;
  getExpectedShareAmount: () => number;
  onSearchUser: () => void;
  isSearching: boolean;
  userFound: boolean | null;
  onClearForm: () => void;
  notify: (title: string, message: string, variant: 'default' | 'destructive' | 'success') => void;
}

const UserInformation: React.FC<UserInformationProps> = ({
  formData,
  handleChange,
  handleUserPhotoChange,
  shareAmountError,
  farmerType,
  getExpectedShareAmount,
  onSearchUser,
  isSearching,
  userFound,
  onClearForm,
  notify,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  
  useEffect(() => {
    if (userFound === true) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 2000);
    }
  }, [userFound]);

  // Validate field based on type
  const validateField = (key: string, value: string) => {
    if (!value?.trim() && key !== "ஜாதி") return "இந்த புலம் தேவையானது";
    
    switch(key) {
      
      case "பெயர்":
      case "தகபெயர்":
      case "கிராமம்":
      case "வட்டம்":
      case "ஜாதி":
        if (value && !/^[\p{L}\s]+$/u.test(value)) return "தமிழ் அல்லது ஆங்கில எழுத்துக்கள் மட்டுமே அனுமதிக்கப்படுகின்றன";
        break;
      case "ஆதார்_எண்":
        if (!/^\d{12}$/.test(value)) return "சரியான 12-இலக்க ஆதார் எண்ணை உள்ளிடவும்";
        break;
      case "கைபேசி_எண்":
        if (!/^\d{10}$/.test(value)) return "சரியான 10-இலக்க தொலைபேசி எண்ணை உள்ளிடவும்";
        break;
      case "பங்குத்_தொகை":
        if (!/^\d+(\.\d{1,2})?$/.test(value)) return "செல்லுபடியாகும் எண் மதிப்பை உள்ளிடவும்";
        break;
      case "sdccb_kcc_கணக்கு_எண்":
      case "sdccb_sb_கணக்கு_எண்":
      case "pan_அட்டை_எண்":
        if (value && !/^\d+$/.test(value)) return "எண் மதிப்புகள் மட்டுமே அனுமதிக்கப்படுகின்றன";
        break;
    }
    
    return "";
  };

  // Validate required fields
  const validateFields = () => {
    const errors: Record<string, string> = {};
    const requiredFields = [
      "உ_எண்", "பெயர்", "தகபெயர்", "முகவரி", "கிராமம்", "வட்டம்", 
      "ஆதார்_எண்", "கைபேசி_எண்", "பிறந்த_தேதி", "பங்குத்_தொகை"
    ];

    requiredFields.forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) errors[field] = error;
    });

    // Validate optional fields if they have values
    const optionalFields = ["ஜாதி", "sdccb_kcc_கணக்கு_எண்", "sdccb_sb_கணக்கு_எண்", "pan_அட்டை_எண்"];
    optionalFields.forEach(field => {
      if (formData[field]) {
        const error = validateField(field, formData[field]);
        if (error) errors[field] = error;
      }
    });

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle input change with validation and max length enforcement
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Enforce max length for specific fields
    let processedValue = value;
    if (name === "ஆதார்_எண்") {
      processedValue = value.replace(/\D/g, '').slice(0, 12); // Only numbers, max 12 digits
    } else if (name === "கைபேசி_எண்") {
      processedValue = value.replace(/\D/g, '').slice(0, 10); // Only numbers, max 10 digits
    } else if (name === "உ_எண்" || name === "sdccb_kcc_கணக்கு_எண்" || 
               name === "sdccb_sb_கணக்கு_எண்" || name === "pan_அட்டை_எண்") {
      processedValue = value.replace(/\D/g, ''); // Only numbers
    }
    
    // Create a synthetic event with the processed value
    const syntheticEvent = {
      ...e,
      target: {
        ...e.target,
        value: processedValue,
        name: name
      }
    };
    
    handleChange(syntheticEvent);
    
    // Validate field on change
    const error = validateField(name, processedValue);
    setFieldErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  // Handle search with validation - only validate U Number
  const handleSearchWithValidation = () => {
    // Validate only U Number field
    const uNumberError = validateField("உ_எண்", formData.உ_எண் || "");
    
    if (uNumberError) {
      setFieldErrors({...fieldErrors, உ_எண்: uNumberError});
      notify("பிழை", "சரியான உ எண்ணை உள்ளிடவும்", "destructive");
      return;
    }
    
    if (!formData.உ_எண்?.trim()) {
      setFieldErrors({...fieldErrors, உ_எண்: "உ எண் தேவையானது"});
      notify("பிழை", "உ எண் தேவையானது", "destructive");
      return;
    }
    
    // Clear any previous U Number error
    setFieldErrors(prev => {
      const newErrors = {...prev};
      delete newErrors.உ_எண்;
      return newErrors;
    });
    
    // Proceed with search
    onSearchUser();
  };

  const userDetailFields = [
    { key: "உ_எண்", label: "உ எண்", type: "text", required: true, pattern: "[0-9]{6,12}", title: "6-12 இலக்க எண்", maxLength: 12 },
    { key: "பெயர்", label: "பெயர்", type: "text", required: true, pattern: "[\\p{L} ]*", title: "தமிழ் அல்லது ஆங்கில எழுத்துக்கள் மட்டுமே", maxLength: null },
    { key: "தகபெயர்", label: "தகபெயர்", type: "text", required: true, pattern: "[\\p{L} ]*", title: "தமிழ் அல்லது ஆங்கில எழுத்துக்கள் மட்டுமே", maxLength: null },
    { key: "முகவரி", label: "முகவரி", type: "textarea", required: true, maxLength: null },
    { key: "கிராமம்", label: "கிராமம்", type: "text", required: true, pattern: "[\\p{L} ]*", title: "தமிழ் அல்லது ஆங்கில எழுத்துக்கள் மட்டுமே", maxLength: null },
    { key: "வட்டம்", label: "வட்டம்", type: "text", required: true, pattern: "[\\p{L} ]*", title: "தமிழ் அல்லது ஆங்கில எழுத்துக்கள் மட்டுமே", maxLength: null },
    { key: "ஜாதி", label: "ஜாதி", type: "text", required: false, pattern: "[\\p{L} ]*", title: "தமிழ் அல்லது ஆங்கில எழுத்துக்கள் மட்டுமே", maxLength: null },
    { key: "பிறந்த_தேதி", label: "பிறந்த தேதி", type: "date", required: true, maxLength: null },
    { key: "பங்குத்_தொகை", label: "பங்குத் தொகை", type: "number", required: true, min: "0", step: "0.01", maxLength: null },
    { key: "ஆதார்_எண்", label: "ஆதார் எண்", type: "text", required: true, pattern: "[0-9]{12}", title: "12-இலக்க எண்", maxLength: 12 },
    { key: "கைபேசி_எண்", label: "கைபேசி எண்", type: "text", required: true, pattern: "[0-9]{10}", title: "10-இலக்க எண்", maxLength: 10 },
    { key: "sdccb_kcc_கணக்கு_எண்", label: "SDCCB KCC கணக்கு எண்", type: "text", required: false, pattern: "[0-9]*", title: "எண் மதிப்புகள் மட்டுமே", maxLength: null },
    { key: "sdccb_sb_கணக்கு_எண்", label: "SDCCB SB கணக்கு எண்", type: "text", required: false, pattern: "[0-9]*", title: "எண் மதிப்புகள் மட்டுமே", maxLength: null },
    { key: "society_sb_கணக்கு_எண்", label: "Society SB கணக்கு எண்", type: "text", required: false, maxLength: null },
    { key: "pan_அட்டை_எண்", label: "PAN அட்டை எண்", type: "text", required: false, pattern: "[0-9]*", title: "எண் மதிப்புகள் மட்டுமே", maxLength: null },
    { key: "ரேஷன்_அட்டை_வகை", label: "ரேஷன் அட்டை வகை", type: "text", required: false, maxLength: null },
    { key: "ரேஷன்_அட்டை_எண்", label: "ரேஷன் அட்டை எண்", type: "text", required: false, maxLength: null },
    { key: "வாக்காளர்_அட்டை_எண்", label: "வாக்காளர் அட்டை எண்", type: "text", required: false, maxLength: null },
  ];

  return (
    <Card
      className={`border-2 border-primary/20 shadow-lg transition-all duration-500 ${
        isAnimating ? "ring-4 ring-primary/50 shadow-2xl" : ""
      }`}
    >
      <CardHeader className="bg-primary text-primary-foreground">
        <CardTitle className="text-xl flex items-center gap-2">
          <User className="h-6 w-6" />
          பயனர் தகவல்கள் (User Information)
          {isAnimating && (
            <div className="ml-auto flex items-center gap-2 text-sm">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading...
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-6 text-center">
          <label className="block mb-3 font-semibold text-foreground">பயனர் படம் (User Photo) *</label>
          <Input
            type="file"
            accept="image/*"
            onChange={handleUserPhotoChange}
            className="mx-auto w-full md:w-1/2 mb-4"
            required
          />
          {!formData.user_photo_preview && (
            <div className="text-sm text-red-600 mt-2">பயனர் படம் தேவையானது</div>
          )}
          {formData.user_photo_preview && (
            <img
              src={formData.user_photo_preview || "/placeholder.svg?height=160&width=160&query=user%20photo%20preview"}
              alt="User Photo Preview"
              className="mt-4 h-40 w-40 mx-auto rounded-full shadow-lg border-4 border-primary object-cover"
            />
          )}
          {formData.பிறந்த_தேதி && (
            <div className="mt-3 text-sm text-muted-foreground">
              {"பிறந்த தேதி (DOB): "}
              <span className="font-semibold text-foreground">{formData.பிறந்த_தேதி}</span>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userDetailFields.map((field, index) => (
            <div
              key={field.key}
              className={`${field.type === "textarea" ? "md:col-span-2 lg:col-span-3" : ""} ${isAnimating ? "animate-pulse" : ""}`}
            >
              <label className="block mb-2 font-semibold text-foreground">
                {field.label} {field.required && <span className="text-red-600">*</span>}
              </label>
              
              {field.key === "உ_எண்" ? (
                <div className="flex gap-2">
                  <Input
                    type="text"
                    name={field.key}
                    value={formData[field.key] || ""}
                    onChange={handleInputChange}
                    className={`border-primary/20 focus:border-primary flex-1 ${
                      fieldErrors[field.key] ? "border-red-500" : ""
                    }`}
                    placeholder="உ எண் உள்ளிடவும்"
                    required={field.required}
                    pattern={field.pattern}
                    title={field.title}
                    inputMode={field.pattern === "[0-9]*" ? "numeric" : "text"}
                    maxLength={field.maxLength}
                  />
                  <Button
                    type="button"
                    onClick={handleSearchWithValidation}
                    disabled={!formData[field.key]?.trim() || isSearching}
                    className="px-4 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  >
                    {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                  </Button>
                  {formData[field.key]?.trim() && (
                    <Button
                      type="button"
                      onClick={() => {
                        onClearForm();
                        setFieldErrors({});
                        notify("அழிக்கப்பட்டது", "படிவம் சுத்தமாக்கப்பட்டது", "success");
                      }}
                      variant="destructive"
                      className="px-4"
                    >
                      Clear
                    </Button>
                  )}
                </div>
              ) : field.type === "textarea" ? (
                <Textarea
                  name={field.key}
                  value={formData[field.key] || ""}
                  onChange={handleInputChange}
                  className={`min-h-[100px] border-primary/20 focus:border-primary transition-all duration-300 ${
                    isAnimating && index < 5 ? "bg-green-50 border-green-300" : ""
                  } ${fieldErrors[field.key] ? "border-red-500" : ""}`}
                  required={field.required}
                  maxLength={field.maxLength}
                />
              ) : field.type === "date" ? (
                <Input
                  type="date"
                  name={field.key}
                  value={formData[field.key] || ""}
                  onChange={handleInputChange}
                  className={`border-primary/20 focus:border-primary ${
                    fieldErrors[field.key] ? "border-red-500" : ""
                  }`}
                  required={field.required}
                  maxLength={field.maxLength}
                />
              ) : (
                <Input
                  type={field.type}
                  name={field.key}
                  value={formData[field.key] || ""}
                  onChange={handleInputChange}
                  min={field.min}
                  step={field.step}
                  pattern={field.pattern}
                  title={field.title}
                  inputMode={field.pattern === "[0-9]*" ? "numeric" : "text"}
                  maxLength={field.maxLength}
                  className={`border-primary/20 focus:border-primary transition-all duration-300 ${
                    isAnimating && index < 8 ? "bg-green-50 border-green-300" : ""
                  } ${fieldErrors[field.key] ? "border-red-500" : ""}`}
                  required={field.required}
                />
              )}
              
              {fieldErrors[field.key] && (
                <div className="mt-1 text-sm text-red-600">{fieldErrors[field.key]}</div>
              )}
              
              {field.key === "உ_எண்" && userFound !== null && (
                <div className="mt-2">
                  {userFound ? (
                    <Alert className="border-green-500 bg-green-50">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-700">
                        பயனர் கண்டுபிடிக்கப்பட்டார்! தகவல்கள் நிரப்பப்பட்டுள்ளன.
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <Alert className="border-yellow-500 bg-yellow-50">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <AlertDescription className="text-yellow-700">
                        பயனர் கண்டுபிடிக்கப்படவில்லை. புதிய பயனராக பதிவு செய்யப்படும்.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              )}
              
              {field.key === "பங்குத்_தொகை" && (
                <div className="mt-2 p-3 bg-muted/50 rounded-lg border border-primary/20">
                  <div className="text-sm text-muted-foreground mb-1">
                    Farmer Type: <span className="font-semibold text-foreground">{farmerType}</span> | Required:{" "}
                    <span className="font-semibold text-foreground">
                      {getExpectedShareAmount().toFixed(2) === "0.00"
                        ? "Enter Principle Amount"
                        : `${getExpectedShareAmount().toFixed(2)} (${farmerType === "SF" ? "10%" : "5%"})`}
                    </span>
                  </div>
                  {shareAmountError && (
                    <Alert className="mt-2 border-yellow-500 bg-yellow-50">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <AlertDescription className="text-yellow-700">{shareAmountError}</AlertDescription>
                    </Alert>
                  )}
                  {!shareAmountError && formData.பங்குத்_தொகை && formData.principle_amount && (
                    <Alert className="mt-2 border-green-500 bg-green-50">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-700">
                        Share amount is correct for {farmerType} farmer type ({getExpectedShareAmount().toFixed(2)})
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Overall validation summary */}
        {Object.keys(fieldErrors).length > 0 && (
          <Alert variant="destructive" className="mt-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              தேவையான அனைத்து புலங்களையும் நிரப்பவும். பிழைகளை சரிசெய்து மீண்டும் முயற்சிக்கவும்.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};
// Land Details Component
const LandDetails: React.FC<{
  formData: FormDataType
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  visibleLandIndex: number
  totalLandArea: number
  farmerType: FarmerType
}> = ({ formData, handleChange, visibleLandIndex, totalLandArea, farmerType }) => {
  return (
    <Card className="border-2 border-primary/20 shadow-lg">
      <CardHeader className="bg-secondary">
        <CardTitle className="text-xl flex items-center gap-2 text-secondary-foreground">
          <Calculator className="h-6 w-6" />
          நில விவரங்கள் (Land Details)
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full border-2 border-primary/20 text-sm rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-primary/10">
                <th className="border border-primary/20 px-4 py-3 font-semibold text-foreground">நிலம் எண்</th>
                <th className="border border-primary/20 px-4 py-3 font-semibold text-foreground">சர்வே எண்</th>
                <th className="border border-primary/20 px-4 py-3 font-semibold text-foreground">HEH</th>
                <th className="border border-primary/20 px-4 py-3 font-semibold text-foreground">AC</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: visibleLandIndex }, (_, i) => i + 1).map((n) => {
                const surveyKey = `நிலம்${n}_சர்வே_எண்` as LandDetailKeys
                const hehKey = `நிலம்${n}_heh` as LandDetailKeys
                const acKey = `நிலம்${n}_ac` as LandDetailKeys
                return (
                  <tr key={n} className="hover:bg-muted/50 transition-colors">
                    <td className="border border-primary/20 px-4 py-3 font-medium text-center">நிலம் {n}</td>
                    <td className="border border-primary/20 px-4 py-2">
                      <Input
                        name={surveyKey}
                        value={formData[surveyKey]}
                        onChange={handleChange}
                        className="border-primary/20 focus:border-primary"
                      />
                    </td>
                    <td className="border border-primary/20 px-4 py-2">
                      <Input
                        type="number"
                        step="0.001"
                        min="0"
                        name={hehKey}
                        value={formData[hehKey]}
                        onChange={handleChange}
                        placeholder="Hectares"
                        className="border-primary/20 focus:border-primary"
                      />
                    </td>
                    <td className="border border-primary/20 px-4 py-2">
                      <Input
                        type="number"
                        step="0.001"
                        min="0"
                        name={acKey}
                        value={formData[acKey]}
                        onChange={handleChange}
                        placeholder="Acres"
                        className="border-primary/20 focus:border-primary"
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-6 p-4 bg-secondary/50 rounded-lg border-2 border-primary/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="text-xl font-bold text-foreground">மொத்த நிலம்: {totalLandArea.toFixed(3)} ஏக்கர்</div>
            <Badge variant="secondary" className="text-lg px-4 py-2 bg-accent text-accent-foreground">
              {farmerType === "MF" && "Marginal Farmer (0-2.5 acres)"}
              {farmerType === "SF" && "Small Farmer (2.5-5 acres)"}
              {farmerType === "OF" && "Other Farmer (>5 acres)"}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
var a ;
// Crop Details Component
const CropDetails: React.FC<{
  selectedCrops: SelectedCrop[]
  setSelectedCrops: React.Dispatch<React.SetStateAction<SelectedCrop[]>>
  cropData: any[]
  totalLandArea: number
  totalSelectedAcres: number
  totalEligibleAmount: number
  formData: FormDataType
  eligibilityError: string
  notify: (title: string, description?: string, variant?: "default" | "destructive" | "success" | "info") => void
}> = ({
  selectedCrops,
  setSelectedCrops,
  cropData,
  totalLandArea,
  totalSelectedAcres,
  totalEligibleAmount,
  formData,
  eligibilityError,
  notify,
}) => {
  // Helper to compute cents
  const toCents = (acres: number) => Math.max(0, Math.round(acres * 100))

  // ✅ Scaled breakdown by acres (1 acre = 100 cents; all values are per-acre)
  const computeBreakdown = (crop: any, acres: number): CropBreakdown => {
    const factor = Math.max(0, acres)
    const perCentRate: PerCentRate = {
      rokkam: (crop.rokkam || 0) / 100,
      thozhu_uram: (crop.thozhu_uram || 0) / 100,
      uram_1: (crop.uram_1 || 0) / 100,
      uram_2: (crop.uram_2 || 0) / 100,
      poochi_marundhu: (crop.poochi_marundhu || 0) / 100,
      vithai: (crop.vithai || 0) / 100,
      motham: (crop.motham || 0) / 100,
    }
    return {
      rokkam: (crop.rokkam || 0) * factor,
      thozhu_uram: (crop.thozhu_uram || 0) * factor,
      uram_1: (crop.uram_1 || 0) * factor,
      uram_2: (crop.uram_2 || 0) * factor,
      poochi_marundhu: (crop.poochi_marundhu || 0) * factor,
      vithai: (crop.vithai || 0) * factor,
      motham: (crop.motham || 0) * factor,
      cents: Math.max(0, Math.round(factor * 100)),
      perCentRate,
    }
  }

  const addCrop = (cropId: string) => {
    const crop = cropData.find((c) => c.crop_code.toString() === cropId)
    if (crop && selectedCrops.length < 5) {
      const defaultAcres = 0.5
      const newCrop: SelectedCrop = {
        crop,
        acres: defaultAcres,
        eligibleAmount: defaultAcres * crop.motham,
        breakdown: computeBreakdown(crop, defaultAcres),
        surveyNumber: "",
      }
      setSelectedCrops([...selectedCrops, newCrop])
      notify("பயிர் சேர்க்கப்பட்டது", crop.name_of_crop, "success")
    }
  }

  const removeCrop = (index: number) => {
    notify("பயிர் நீக்கப்பட்டது", selectedCrops[index]?.crop?.name_of_crop || "", "info")
    setSelectedCrops(selectedCrops.filter((_, i) => i !== index))
  }

  const updateCropAcres = (index: number, acres: number) => {
    const updated = [...selectedCrops]
    const maxAllowed = totalLandArea - (totalSelectedAcres - updated[index].acres)
    const clamped = Math.max(0, Math.min(acres, maxAllowed))

    if (acres > maxAllowed) {
      notify(
        "எச்சரிக்கை",
        `Maximum ${maxAllowed.toFixed(3)} acres allowed (Total land: ${totalLandArea} acres)`,
        "destructive",
      )
    }

    updated[index].acres = clamped
    updated[index].eligibleAmount = clamped * (updated[index].crop?.motham || 0)
    updated[index].breakdown = computeBreakdown(updated[index].crop, clamped)
    setSelectedCrops(updated)
  }

  const updateCropSurveyNumber = (index: number, surveyNumber: string) => {
    const updated = [...selectedCrops]
    updated[index].surveyNumber = surveyNumber
    setSelectedCrops(updated)
  }

  const availableSurveyNumbers = getSurveyNumbersFromLandDetails(formData)

  return (
    <Card className="border-2 border-primary/20 shadow-lg">
      <CardHeader className="bg-green-50">
        <CardTitle className="text-xl flex items-center gap-2 text-green-700">
          <Leaf className="h-6 w-6" />
          பயிர் விவரங்கள் (Crop Details)
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>மொத்த நிலம்:</strong> {totalLandArea} ஏக்கர் |<strong> பயன்படுத்தப்பட்டது:</strong>{" "}
            {totalSelectedAcres.toFixed(3)} ஏக்கர் |<strong> மீதம்:</strong>{" "}
            {(totalLandArea - totalSelectedAcres).toFixed(3)} ஏக்கர்
          </p>
        </div>

        <div className="mb-6">
          <label className="block font-semibold mb-3 text-foreground">பயிர் தேர்வு (Select Crop)</label>
          <div className="flex gap-4">
            <Select onValueChange={addCrop}>
              <SelectTrigger className="max-w-md border-primary/20 focus:border-primary">
                <SelectValue placeholder="பயிர் தேர்ந்தெடுக்கவும்" />
              </SelectTrigger>
              <SelectContent>
                {cropData.map((crop) => (
                  <SelectItem key={crop.crop_code} value={crop.crop_code.toString()}>
                    {crop.name_of_crop} - ₹{crop.motham}/acre
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              type="button"
              onClick={() => {
                addCrop("1")
                notify("பயிர் சேர்க்கப்பட்டது", "Default crop added", "success")
              }}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Crop
            </Button>
          </div>
        </div>

        {selectedCrops.length > 0 && (
          <div className="space-y-4">
            {selectedCrops.map((selectedCrop, index) => (
              <div key={index} className="border-2 border-green-200 rounded-lg p-4 mb-4 bg-green-50">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-semibold text-green-700">{selectedCrop.crop.name_of_crop}</h4>
                  <Button variant="destructive" size="sm" onClick={() => removeCrop(index)} className="h-8 w-8 p-0">
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">ஏக்கர் (Acres)</label>
                    <Input
                      type="number"
                      step="0.001"
                      min="0"
                      max={totalLandArea}
                      value={selectedCrop.acres}
                      onChange={(e) => updateCropAcres(index, Number.parseFloat(e.target.value) || 0)}
                      className="border-green-300 focus:border-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">சர்வே எண் (Survey Number)</label>
                    <Select
                      value={selectedCrop.surveyNumber || ""}
                      onValueChange={(value) => updateCropSurveyNumber(index, value)}
                    >
                      <SelectTrigger className="border-green-300 focus:border-green-500">
                        <SelectValue placeholder="சர்வே எண் தேர்ந்தெடுக்கவும்" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableSurveyNumbers.length > 0 ? (
                          availableSurveyNumbers.map((surveyNum, idx) => (
                            <SelectItem key={idx} value={surveyNum}>
                              சர்வே எண்: {surveyNum}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="no-survey" disabled>
                            முதலில் நில விவரங்களில் சர்வே எண் உள்ளிடவும்
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    {selectedCrop.surveyNumber && (
                      <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-sm">
                        <p className="text-blue-700">
                          <strong>தேர்ந்தெடுக்கப்பட்ட சர்வே எண்:</strong> {selectedCrop.surveyNumber}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 p-4 rounded-lg border-2 border-primary/20 bg-muted/30">
                  <div className="font-semibold mb-3 text-foreground">பயிர் செலவு விவரம் (Per-crop cost breakdown)</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(() => {
                      const b = selectedCrop.breakdown
                      return (
                        <div className="p-3 rounded border bg-background">
                          <div className="font-semibold text-foreground">{selectedCrop.crop.name_of_crop}</div>
                          <div className="text-xs text-muted-foreground mb-2">
                            {selectedCrop.acres.toFixed(3)} ஏக்கர் (
                            {selectedCrop.breakdown?.cents ?? Math.round(selectedCrop.acres * 100)} சென்ட்)
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              ரொக்கம்: <span className="font-semibold">₹{(b?.rokkam ?? 0).toFixed(2)}</span>
                            </div>
                            <div>
                              தொழு உரம்: <span className="font-semibold">₹{(b?.thozhu_uram ?? 0).toFixed(2)}</span>
                            </div>
                            <div>
                              உரம் 1: <span className="font-semibold">₹{(b?.uram_1 ?? 0).toFixed(2)}</span>
                            </div>
                            <div>
                              உரம் 2: <span className="font-semibold">₹{(b?.uram_2 ?? 0).toFixed(2)}</span>
                            </div>
                            <div>
                              பூச்சி மருந்து:{" "}
                              <span className="font-semibold">₹{(b?.poochi_marundhu ?? 0).toFixed(2)}</span>
                            </div>
                            <div>
                              வித்தை: <span className="font-semibold">₹{(b?.vithai ?? 0).toFixed(2)}</span>
                            </div>
                            <div className="col-span-2">
                              மொத்தம்: <span className="font-bold">₹{(b?.motham ?? 0).toFixed(2)}</span>
                            </div>
                            <div className="col-span-2 text-[11px] text-muted-foreground">
                              {"குறிப்பு: "} 1 ஏக்கர் = 100 சென்ட். {"சென்ட்-அடிப்படையில் கணக்கு: "} (ஒரு ஏக்கருக்கான விகிதங்கள் ×
                              ஏக்கர்).
                            </div>
                            <div className="col-span-2 text-[11px] text-muted-foreground">
                              {"பர் சென்ட் விகிதம்: "}
                              {"ரொக்கம் ₹"}
                              {(b?.perCentRate.rokkam ?? 0).toFixed(2)}, {"உரம்1 ₹"}
                              {(b?.perCentRate.uram_1 ?? 0).toFixed(2)}, {"உரம்2 ₹"}
                              {(b?.perCentRate.uram_2 ?? 0).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      )
                    })()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-secondary/50 p-4 rounded-lg border-2 border-primary/20">
            <div className="text-lg font-semibold text-foreground">Total Selected Acres</div>
            <div className="text-2xl font-bold text-foreground">{totalSelectedAcres.toFixed(3)}</div>
            <div className="text-sm text-muted-foreground">
              Available: {(totalLandArea - totalSelectedAcres).toFixed(3)} acres
            </div>
          </div>

          <div className="bg-secondary/50 p-4 rounded-lg border-2 border-primary/20">
            <div className="text-lg font-semibold text-foreground">Total Eligible Amount</div>
            <div className="text-2xl font-bold text-foreground">₹{totalEligibleAmount.toFixed(2)}</div>
            <div className="text-sm text-muted-foreground">Based on selected crops</div>
          </div>

          <div className="bg-secondary/50 p-4 rounded-lg border-2 border-primary/20">
            <div className="text-lg font-semibold text-foreground">Principle Amount</div>
            <div className="text-2xl font-bold text-foreground">
              ₹{totalEligibleAmount.toFixed(2)}
            </div>
            <div className="text-sm text-muted-foreground">Loan amount</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const LoanTypes: React.FC<{
  formData: FormDataType
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}> = ({ formData, setFormData, handleChange }) => {
  return (
    <Card className="border-2 border-primary/20 shadow-lg">
      <CardHeader className="bg-accent">
        <CardTitle className="text-xl flex items-center gap-2 text-accent-foreground">
          <Coins className="h-6 w-6" />
          கடன் வகைகள் (Loan Types)
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* KCC */}
          <label className="flex items-center gap-3 p-4 border-2 border-primary/20 rounded-lg hover:bg-primary/10 cursor-pointer transition-colors">
            <input
              type="radio"
              name="kccGroup"
              checked={formData.checkboxes.kcc}
              onChange={() => {
                const updatedFormData = {
                  ...formData,
                  checkboxes: { kcc: true, kccah: false, tractor: false, jewel: false },
                  principle_amount: "100000",
                }
                setFormData(updatedFormData)
                localStorage.setItem("selectedLoanType", "kcc")
                localStorage.setItem("principle_amount", "100000")
              }}
              className="text-primary"
            />
            <span className="font-medium">KCC</span>
          </label>
          {/* KCCAH */}
          <label className="flex items-center gap-3 p-4 border-2 border-primary/20 rounded-lg hover:bg-primary/10 cursor-pointer transition-colors">
            <input
              type="radio"
              name="kccGroup"
              checked={formData.checkboxes.kccah}
              onChange={() => {
                const updatedFormData = {
                  ...formData,
                  checkboxes: { kcc: false, kccah: true, tractor: false, jewel: false },
                  principle_amount: "0",
                }
                setFormData(updatedFormData)
                localStorage.setItem("selectedLoanType", "kccah")
                localStorage.setItem("principle_amount", "0")
              }}
              className="text-primary"
            />
            <span className="font-medium">KCCAH</span>
          </label>
        </div>
       
      </CardContent>
    </Card>
  )
}


// Friend Details Component
// types.ts
export interface FriendDetails {
  uNumber: string;
  name: string;
  fatherName: string;
  phone: string;
  aadhaarNumber: string;
  surveyNumber: string;
  acre: string;
  address: string;
  imageUrl?: string;
}

interface FriendDetailsProps {
  friendData: {
    uNumber: string;
    name: string;
    fatherName: string;
    phone: string;
    aadhaarNumber: string;
    surveyNumber: string;
    acre: string;
    address: string;
    imageUrl: string;
  };
  setFriendData: React.Dispatch<React.SetStateAction<{
    uNumber: string;
    name: string;
    fatherName: string;
    phone: string;
    aadhaarNumber: string;
    surveyNumber: string;
    acre: string;
    address: string;
    imageUrl: string;
  }>>;
  formData: any; // or use a proper type
  handleFriendImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchFriend?: (uNumber: string) => Promise<boolean>;
  notify?: (title: string, description?: string, kind?: string) => void;
}

const FriendDetails: React.FC<FriendDetailsProps> = ({
  friendData,
  setFriendData,
  formData,
  handleFriendImageChange,
  onSearchFriend,
  notify,
}) => {
  const [isSearching, setIsSearching] = useState(false);

  const handleInputChange = (field: keyof FriendDetails, value: string) => {
    setFriendData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearch = async () => {
    if (!friendData.uNumber?.trim() || !onSearchFriend) return;
    
    try {
      setIsSearching(true);
      const result = await onSearchFriend(friendData.uNumber);
      
      if (result) {
        setFriendData(prev => ({
          ...prev,
          ...result,
          // Add cache busting parameter to force image reload
          imageUrl: result.imageUrl ? `${result.imageUrl}?t=${Date.now()}` : prev.imageUrl
        }));
        notify?.("Success", "Friend details loaded", "success");
      } else {
        notify?.("Error", "Friend not found", "warning");
      }
    } catch (error) {
      notify?.("Error", "Failed to search friend", "error");
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleClear = () => {
    setFriendData({
      uNumber: "",
      name: "",
      fatherName: "",
      phone: "",
      aadhaarNumber: "",
      surveyNumber: "",
      acre: "",
      address: "",
      imageUrl: ""
    });
    notify?.("Cleared", "Friend form reset", "info");
  };

  // Get the image source - prioritize friendData.imageUrl, fallback to formData
  const imageSource = friendData.imageUrl || formData?.friend_photo_preview || '';

  return (
    <Card className="border-2 border-primary/20 shadow-lg">
      <CardHeader className="bg-blue-50">
        <CardTitle className="text-xl text-blue-700">Friend Guarantee Details</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block font-semibold mb-1 text-foreground">U Number</label>
            <div className="flex gap-2">
              <Input
                value={friendData.uNumber}
                onChange={(e) => handleInputChange("uNumber", e.target.value)}
                placeholder="Enter U Number"
                className="border-primary/20 focus:border-primary flex-1"
              />
              <Button
                type="button"
                onClick={handleSearch}
                disabled={!friendData.uNumber?.trim() || isSearching}
                className="px-4 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
              >
                {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              </Button>
              {friendData.uNumber?.trim() && (
                <Button
                  type="button"
                  onClick={handleClear}
                  variant="destructive"
                  className="px-3"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-foreground">Name</label>
            <Input
              value={friendData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter name"
              className="border-primary/20 focus:border-primary"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1 text-foreground">Father's Name</label>
            <Input
              value={friendData.fatherName}
              onChange={(e) => handleInputChange("fatherName", e.target.value)}
              placeholder="Enter father's name"
              className="border-primary/20 focus:border-primary"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1 text-foreground">Phone Number</label>
            <Input
              value={friendData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="Enter phone number"
              className="border-primary/20 focus:border-primary"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1 text-foreground">Aadhaar Number</label>
            <Input
              value={friendData.aadhaarNumber}
              onChange={(e) => handleInputChange("aadhaarNumber", e.target.value)}
              placeholder="Enter Aadhaar number"
              className="border-primary/20 focus:border-primary"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1 text-foreground">Survey Number</label>
            <Input
              value={friendData.surveyNumber}
              onChange={(e) => handleInputChange("surveyNumber", e.target.value)}
              placeholder="Enter survey number"
              className="border-primary/20 focus:border-primary"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1 text-foreground">Acre</label>
            <Input
              type="number"
              step="0.001"
              min="0"
              value={friendData.acre}
              onChange={(e) => handleInputChange("acre", e.target.value)}
              placeholder="Enter acre"
              className="border-primary/20 focus:border-primary"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block font-semibold mb-1 text-foreground">Address</label>
            <Textarea
              value={friendData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              placeholder="Enter address"
              className="min-h-[80px] border-primary/20 focus:border-primary"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block font-semibold mb-1 text-foreground">Photo</label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleFriendImageChange}
              className="border-primary/20 focus:border-primary"
            />
            {imageSource && (
              <div className="mt-2">
                <img
                  src={imageSource}
                  alt="Friend preview"
                  className="h-32 w-32 object-cover rounded border"
                  onError={(e) => {
                    // Handle broken images by hiding them
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// ✅ Gold Details Component
type GoldDetailsProps = {
  goldItems: GoldItem[]
  setGoldItems: React.Dispatch<React.SetStateAction<GoldItem[]>>
  goldData: { marketValue: number }[]
  notify: (title: string, description?: string, variant?: "default" | "destructive" | "success" | "info") => void
}
const GoldDetails: React.FC<GoldDetailsProps> = ({ goldItems, setGoldItems, goldData, notify }) => {
  const [goldType, setGoldType] = useState("")
  const [goldWeight, setGoldWeight] = useState("")
  const [goldCount, setGoldCount] = useState(1)
  const [netWeight, setNetWeight] = useState("")
  const [alloy, setAlloy] = useState("")
  const goldRate = goldData[0]?.marketValue || 6000

  const calculateNetAmount = (netWeightValue: number): number => {
    return netWeightValue * goldRate
  }

  const handleAddGoldItem = () => {
    if (!goldType || !goldWeight || goldCount < 1) return
    const netWeightValue = Number.parseFloat(netWeight) || 0
    const netAmount = calculateNetAmount(netWeightValue)
    const newItems: GoldItem[] = [
      ...goldItems,
      {
        type: goldType,
        weight: Number.parseFloat(goldWeight),
        count: goldCount,
        netWeight: netWeightValue,
        alloy: alloy,
        netAmount: netAmount,
      },
    ]
    setGoldItems(newItems)
    setGoldType("")
    setGoldWeight("")
    setGoldCount(1)
    setNetWeight("")
    setAlloy("")
    notify("தங்க பொருள் சேர்க்கப்பட்டது", goldType, "success")
  }

  const handleRemoveGoldItem = (index: number) => {
    notify("தங்க பொருள் நீக்கப்பட்டது", goldItems[index]?.type || "", "info")
    const newItems = goldItems.filter((_, i) => i !== index)
    setGoldItems(newItems)
  }

  const totalWeight = goldItems.reduce((sum, item) => sum + item.weight * item.count, 0)
  const totalValue = totalWeight * goldRate
  const totalNetWeight = goldItems.reduce((sum, item) => sum + item.netWeight, 0)
  const totalNetAmount = goldItems.reduce((sum, item) => sum + item.netAmount, 0)

  return (
    <Card className="border-2 border-primary/20 shadow-lg">
      <CardHeader className="bg-yellow-50">
        <CardTitle className="text-xl text-yellow-700">2. தங்க விவரங்கள் (Gold Details)</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block mb-1 font-medium text-foreground">தங்க வகை (Type)</label>
            <Input
              type="text"
              value={goldType}
              onChange={(e) => setGoldType(e.target.value)}
              placeholder="உதா: சங்கிலி, மோதிரம், காதணி"
              className="border-primary/20 focus:border-primary"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-foreground">எடை (Weight in grams)</label>
            <Input
              type="number"
              min="0"
              step="0.1"
              value={goldWeight}
              onChange={(e) => setGoldWeight(e.target.value)}
              placeholder="எடையை உள்ளிடவும்"
              className="border-primary/20 focus:border-primary"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-foreground">எண்ணிக்கை (Count)</label>
            <Input
              type="number"
              min="1"
              value={goldCount}
              onChange={(e) => setGoldCount(Number.parseInt(e.target.value) || 1)}
              placeholder="எண்ணிக்கை"
              className="border-primary/20 focus:border-primary"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-foreground">நிகர எடை (Net Weight in grams)</label>
            <Input
              type="number"
              min="0"
              step="0.1"
              value={netWeight}
              onChange={(e) => setNetWeight(e.target.value)}
              placeholder="நிகர எடையை உள்ளிடவும்"
              className="border-primary/20 focus:border-primary"
            />
            {netWeight && (
              <div className="mt-1 text-xs text-green-600 font-medium">
                {"நிகர தொகை: "}₹{calculateNetAmount(Number.parseFloat(netWeight)).toFixed(2)}
              </div>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium text-foreground">கலவு (Alloy/Mix)</label>
            <Input
              type="text"
              value={alloy}
              onChange={(e) => setAlloy(e.target.value)}
              placeholder="கலவு விவரம் உள்ளிடவும்"
              className="border-primary/20 focus:border-primary"
            />
          </div>
        </div>

        <Button
          onClick={handleAddGoldItem}
          className="bg-yellow-600 hover:bg-yellow-700 text-white"
          disabled={!goldType || !goldWeight || goldCount < 1}
        >
          ➕ Add Gold Item
        </Button>

        <div className="overflow-x-auto mt-4">
          <table className="min-w-full border-2 border-primary/20 text-sm rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-primary/10">
                <th className="px-4 py-2 border font-semibold">வகை (Type)</th>
                <th className="px-4 py-2 border font-semibold">எண் (Count)</th>
                <th className="px-4 py-2 border font-semibold">எடை (Per Item)</th>
                <th className="px-4 py-2 border font-semibold">மொத்த எடை (Total Weight)</th>
                <th className="px-4 py-2 border font-semibold">நிகர எடை (Net Weight)</th>
                <th className="px-4 py-2 border font-semibold">கலவு (Alloy)</th>
                <th className="px-4 py-2 border font-semibold">மதிப்பு (Value)</th>
                <th className="px-4 py-2 border font-semibold">நிகர தொகை (Net Amount)</th>
                <th className="px-4 py-2 border font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {goldItems.map((item, index) => {
                const itemWeight = item.weight * item.count
                const itemValue = itemWeight * goldRate
                return (
                  <tr key={index} className="hover:bg-muted/50">
                    <td className="px-4 py-2 border font-medium">{item.type}</td>
                    <td className="px-4 py-2 border text-center">{item.count}</td>
                    <td className="px-4 py-2 border text-center">{item.weight}g</td>
                    <td className="px-4 py-2 border text-center font-semibold">{itemWeight.toFixed(2)}g</td>
                    <td className="px-4 py-2 border text-center font-semibold text-green-700">
                      {item.netWeight.toFixed(2)}g
                    </td>
                    <td className="px-4 py-2 border text-center">{item.alloy || "-"}</td>
                    <td className="px-4 py-2 border text-center font-bold text-yellow-700">₹{itemValue.toFixed(2)}</td>
                    <td className="px-4 py-2 border text-center font-bold text-green-700">
                      ₹{item.netAmount.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => handleRemoveGoldItem(index)}
                        className="h-6 w-6 p-0"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </td>
                  </tr>
                )
              })}
              {goldItems.length > 0 && (
                <tr className="bg-yellow-100 font-bold">
                  <td colSpan={3} className="px-4 py-2 border text-right text-yellow-800">
                    மொத்தம் (Total)
                  </td>
                  <td className="px-4 py-2 border text-center text-yellow-800">{totalWeight.toFixed(2)}g</td>
                  <td className="px-4 py-2 border text-center text-green-800">{totalNetWeight.toFixed(2)}g</td>
                  <td className="px-4 py-2 border text-center">-</td>
                  <td className="px-4 py-2 border text-center text-yellow-800">₹{totalValue.toFixed(2)}</td>
                  <td className="px-4 py-2 border text-center text-green-800">₹{totalNetAmount.toFixed(2)}</td>
                  <td className="px-4 py-2 border"></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {goldItems.length > 0 && (
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border-2 border-yellow-200">
            <h3 className="text-lg font-semibold text-yellow-800 mb-3">தங்க விவரங்கள் சுருக்கம் (Gold Summary)</h3>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 text-center">
              <div className="bg-yellow-100 p-3 rounded">
                <div className="text-2xl font-bold text-yellow-700">{goldItems.length}</div>
                <div className="text-sm text-yellow-600">பொருட்கள் (Items)</div>
              </div>
              <div className="bg-yellow-100 p-3 rounded">
                <div className="text-2xl font-bold text-yellow-700">
                  {goldItems.reduce((sum, item) => sum + item.count, 0)}
                </div>
                <div className="text-sm text-yellow-600">மொத்த எண்ணிக்கை (Total Count)</div>
              </div>
              <div className="bg-yellow-100 p-3 rounded">
                <div className="text-2xl font-bold text-yellow-700">{totalWeight.toFixed(2)}g</div>
                <div className="text-sm text-yellow-600">மொத்த எடை (Total Weight)</div>
              </div>
              <div className="bg-green-100 p-3 rounded">
                <div className="text-2xl font-bold text-green-700">{totalNetWeight.toFixed(2)}g</div>
                <div className="text-sm text-green-600">மொத்த நிகர எடை (Total Net Weight)</div>
              </div>
              <div className="bg-yellow-100 p-3 rounded">
                <div className="text-2xl font-bold text-yellow-700">₹{totalValue.toFixed(2)}</div>
                <div className="text-sm text-yellow-600">மொத்த மதிப்பு (Total Value)</div>
              </div>
              <div className="bg-green-100 p-3 rounded">
                <div className="text-2xl font-bold text-green-700">₹{totalNetAmount.toFixed(2)}</div>
                <div className="text-sm text-green-600">மொத்த நிகர தொகை (Total Net Amount)</div>
              </div>
            </div>
            <div className="mt-3 text-center text-sm text-yellow-700">
              <strong>தற்போதைய தங்க விலை:</strong> ₹{goldRate}/gram
            </div>
            <div className="mt-2 text-center text-sm text-green-700">
              <strong>நிகர எடை கணக்கீடு:</strong> நிகர எடை × தங்க விலை = நிகர தொகை
            </div>
          </div>
        )}
        {goldItems.length === 0 && (
          <div className="text-center py-8 text-muted-foreground bg-yellow-50 rounded-lg">
            <p className="text-lg">தங்க பொருட்கள் எதுவும் சேர்க்கப்படவில்லை</p>
            <p className="text-sm mt-2">மேலே உள்ள படிவத்தைப் பயன்படுத்தி தங்க பொருட்களைச் சேர்க்கவும்</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Own Property Component
type OwnPropertyProps = {
  propertyData: {
    description: string
    value: string
    village: string
    surveyNumber: string
    irrigation: string
    extent: string
    a: string
    ca: string
    registrarOffice: string
    mortgageReg: string
    guidanceValue: string
    mortgageAmount: string
  }
  setPropertyData: React.Dispatch<
    React.SetStateAction<{
      description: string
      value: string
      village: string
      surveyNumber: string
      irrigation: string
      extent: string
      a: string
      ca: string
      registrarOffice: string
      mortgageReg: string
      guidanceValue: string
      mortgageAmount: string
    }>
  >
}
const OwnProperty: React.FC<OwnPropertyProps> = ({ propertyData, setPropertyData }) => {
  const handleInputChange = (field: string, value: string) => {
    setPropertyData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Function to clear all form data
  const handleClearForm = () => {
    setPropertyData({
      description: "",
      value: "",
      village: "",
      surveyNumber: "",
      irrigation: "",
      extent: "",
      a: "",
      ca: "",
      registrarOffice: "",
      mortgageReg: "",
      guidanceValue: "",
      mortgageAmount: "",
    })
  }

  return (
    <Card className="border-2 border-primary/20 shadow-lg">
      <CardHeader className="bg-purple-50 flex flex-row items-center justify-between">
        <CardTitle className="text-xl text-purple-700">3. சொத்து விவரங்கள் (Own Property Details)</CardTitle>
        <Button 
          variant="outline" 
          onClick={handleClearForm}
          className="text-red-600 border-red-300 hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          அனைத்தையும் நீக்கு (Clear All)
        </Button>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-2 text-foreground">சொத்து விவரம் (Property Description)</label>
            <Textarea
              value={propertyData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="சொத்து விவரம் உள்ளிடவும் (உதா: வீடு, நிலம், கடை)"
              className="min-h-[100px] border-primary/20 focus:border-primary"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2 text-foreground">சொத்து மதிப்பு (Property Value ₹)</label>
            <Input
              type="number"
              min="0"
              step="0.01"
              value={propertyData.value}
              onChange={(e) => handleInputChange("value", e.target.value)}
              placeholder="சொத்து மதிப்பு உள்ளிடவும்"
              className="border-primary/20 focus:border-primary"
            />
          </div>
        </div>

        {(propertyData.description || propertyData.value) && (
          <div className="p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
            <h4 className="text-lg font-semibold text-purple-800 mb-2">சொத்து சுருக்கம் (Property Summary)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {propertyData.description && (
                <div>
                  <strong className="text-purple-700">சொத்து விவரம்:</strong>
                  <p className="text-purple-900 mt-1">{propertyData.description}</p>
                </div>
              )}
              {propertyData.value && (
                <div>
                  <strong className="text-purple-700">மொத்த சொத்து மதிப்பு:</strong>
                  <p className="text-2xl font-bold text-purple-900 mt-1">
                    ₹{Number.parseFloat(propertyData.value || "0").toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="border-2 border-dashed border-purple-300 p-4 rounded-lg space-y-4">
          <h3 className="text-lg font-semibold text-purple-700">நில அடமானம் விவரங்கள் (Land Mortgage Details)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1 text-foreground">கிராமம் (Village)</label>
              <Input
                placeholder="கிராமம் உள்ளிடவும்"
                value={propertyData.village}
                onChange={(e) => handleInputChange("village", e.target.value)}
                className="border-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-foreground">சர்வே எண் (Survey Number)</label>
              <Input
                placeholder="சர்வே எண் உள்ளிடவும்"
                value={propertyData.surveyNumber}
                onChange={(e) => handleInputChange("surveyNumber", e.target.value)}
                className="border-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-foreground">பாசன விவரம் (Irrigation Details)</label>
              <Input
                placeholder="பாசன விவரம் உள்ளிடவும்"
                value={propertyData.irrigation}
                onChange={(e) => handleInputChange("irrigation", e.target.value)}
                className="border-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-foreground">புறப்பு (Extent)</label>
              <Input
                placeholder="புறப்பு உள்ளிடவும்"
                value={propertyData.extent}
                onChange={(e) => handleInputChange("extent", e.target.value)}
                className="border-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-foreground">ஏ (Acres)</label>
              <Input
                placeholder="ஏக்கர் உள்ளிடவும்"
                value={propertyData.a}
                onChange={(e) => handleInputChange("a", e.target.value)}
                className="border-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-foreground">சே (Cents)</label>
              <Input
                placeholder="சென்ட் உள்ளிடவும்"
                value={propertyData.ca}
                onChange={(e) => handleInputChange("ca", e.target.value)}
                className="border-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-foreground">பதிவு அலுவலகம் (Registrar Office)</label>
              <Input
                placeholder="பதிவு அலுவலகம் உள்ளிடவும்"
                value={propertyData.registrarOffice}
                onChange={(e) => handleInputChange("registrarOffice", e.target.value)}
                className="border-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-foreground">
                அடமான பதிவு எண் / தேதி (Mortgage Reg No/Date)
              </label>
              <Input
                placeholder="அடமான பதிவு எண் / தேதி உள்ளிடவும்"
                value={propertyData.mortgageReg}
                onChange={(e) => handleInputChange("mortgageReg", e.target.value)}
                className="border-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-foreground">வழிகாட்டி மதிப்பு (Guidance Value ₹)</label>
              <Input
                type="number"
                min="0"
                step="0.01"
                placeholder="வழிகாட்டி மதிப்பு உள்ளிடவும்"
                value={propertyData.guidanceValue}
                onChange={(e) => handleInputChange("guidanceValue", e.target.value)}
                className="border-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-foreground">அடவுத் தொகை (Mortgage Amount ₹)</label>
              <Input
                type="number"
                min="0"
                step="0.01"
                placeholder="அடவுத் தொகை உள்ளிடவும்"
                value={propertyData.mortgageAmount}
                onChange={(e) => handleInputChange("mortgageAmount", e.target.value)}
                className="border-primary/20 focus:border-primary"
              />
            </div>
          </div>

          {(propertyData.village ||
            propertyData.surveyNumber ||
            propertyData.guidanceValue ||
            propertyData.mortgageAmount) && (
            <div className="mt-4 p-3 bg-purple-100 rounded border border-purple-300">
              <h5 className="font-semibold text-purple-800 mb-2">அடமான விவரங்கள் சுருக்கம் (Mortgage Summary)</h5>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {propertyData.village && (
                  <div>
                    <strong>கிராமம்:</strong> {propertyData.village}
                  </div>
                )}
                {propertyData.surveyNumber && (
                  <div>
                    <strong>சர்வே எண்:</strong> {propertyData.surveyNumber}
                  </div>
                )}
                {propertyData.guidanceValue && (
                  <div>
                    <strong>வழிகாட்டி மதிப்பு:</strong> ₹{Number.parseFloat(propertyData.guidanceValue).toLocaleString()}
                  </div>
                )}
                {propertyData.mortgageAmount && (
                  <div>
                    <strong>அடவுத் தொகை:</strong> ₹{Number.parseFloat(propertyData.mortgageAmount).toLocaleString()}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Document Upload Component
const DocumentUpload: React.FC<{
  formData: FormDataType
  handleAadhaarChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleRationChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handlePanChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleVoterDocumentChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}> = ({ formData, handleAadhaarChange, handleRationChange, handlePanChange, handleVoterDocumentChange }) => {
  return (
    <Card className="border-2 border-primary/20 shadow-lg">
      <CardHeader className="bg-secondary">
        <CardTitle className="text-xl flex items-center gap-2 text-secondary-foreground">
          <FileText className="h-6 w-6" />
          ஆவணங்கள் (Documents) <span className="text-red-500">*</span>
        </CardTitle>
        <p className="text-sm text-secondary-foreground/80">
          அனைத்து ஆவணங்களும் பதிவேற்றம் கட்டாயம் (All documents are required)
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block font-semibold mb-2 text-foreground">
              ஆதார் அட்டை (Upload Aadhaar) <span className="text-red-500">*</span>
            </label>
            <Input
              type="file"
              accept="image/*,.pdf"
              onChange={handleAadhaarChange}
              className="border-primary/20 focus:border-primary"
              required
            />
            {formData.aadhaar_preview && (
              <img
                src={formData.aadhaar_preview || "/placeholder.svg?height=128&width=220&query=aadhaar%20preview"}
                alt="Aadhaar Preview"
                className="mt-2 h-32 w-full rounded shadow border-2 border-primary object-cover"
              />
            )}
            {!formData.aadhaar_preview && (
              <p className="text-xs text-red-500 mt-1">ஆதார் அட்டை பதிவேற்றம் கட்டாயம் (Aadhaar card is required)</p>
            )}
          </div>
          <div>
            <label className="block font-semibold mb-2 text-foreground">
              ரேஷன் அட்டை (Upload Ration Card) <span className="text-red-500">*</span>
            </label>
            <Input
              type="file"
              accept="image/*,.pdf"
              onChange={handleRationChange}
              className="border-primary/20 focus:border-primary"
              required
            />
            {formData.ration_preview && (
              <img
                src={formData.ration_preview || "/placeholder.svg?height=128&width=220&query=ration%20card%20preview"}
                alt="Ration Card Preview"
                className="mt-2 h-32 w-full rounded shadow border-2 border-primary object-cover"
              />
            )}
            {!formData.ration_preview && (
              <p className="text-xs text-red-500 mt-1">ரேஷன் அட்டை பதிவேற்றம் கட்டாயம் (Ration card is required)</p>
            )}
          </div>
          <div>
            <label className="block font-semibold mb-2 text-foreground">
              PAN அட்டை (Upload PAN Card) <span className="text-red-500">*</span>
            </label>
            <Input
              type="file"
              accept="image/*,.pdf"
              onChange={handlePanChange}
              className="border-primary/20 focus:border-primary"
              required
            />
            {formData.pan_preview && (
              <img
                src={formData.pan_preview || "/placeholder.svg?height=128&width=220&query=pan%20card%20preview"}
                alt="PAN Card Preview"
                className="mt-2 h-32 w-full rounded shadow border-2 border-primary object-cover"
              />
            )}
            {!formData.pan_preview && (
              <p className="text-xs text-red-500 mt-1">PAN அட்டை பதிவேற்றம் கட்டாயம் (PAN card is required)</p>
            )}
          </div>
          <div>
            <label className="block font-semibold mb-2 text-foreground">
              வாக்காளர் அட்டை (Upload Voter ID) <span className="text-red-500">*</span>
            </label>
             <Input
              type="file"
              accept="image/*,.pdf"
              onChange={handleVoterDocumentChange}
              className="border-primary/20 focus:border-primary"
              required
            />
            {formData.voter_preview && (
              <img
                src={formData.voter_preview || "/placeholder.svg?height=128&width=220&query=pan%20card%20preview"}
                alt="PAN Card Preview"
                className="mt-2 h-32 w-full rounded shadow border-2 border-primary object-cover"
              />
            )}
            {!formData.voter_preview && (
              <p className="text-xs text-red-500 mt-1">வாக்காளர் அட்டை பதிவேற்றம் கட்டாயம் (Voter ID is required)</p>
            )}
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">ஆவணங்கள் முன்னோட்டம் (Documents Preview)</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
            <div>
              <div className="font-medium">ஆதார் அட்டை</div>
              <div className={`text-xs ${formData.aadhaar_preview ? "text-green-600" : "text-red-600"}`}>
                {formData.aadhaar_preview ? "✅ பதிவேற்றப்பட்டது" : "❌ பதிவேற்றப்படவில்லை"}
              </div>
            </div>
            <div>
              <div className="font-medium">ரேஷன் அட்டை</div>
              <div className={`text-xs ${formData.ration_preview ? "text-green-600" : "text-red-600"}`}>
                {formData.ration_preview ? "✅ பதிவேற்றப்பட்டது" : "❌ பதிவேற்றப்படவில்லை"}
              </div>
            </div>
            <div>
              <div className="font-medium">PAN அட்டை</div>
              <div className={`text-xs ${formData.pan_preview ? "text-green-600" : "text-red-600"}`}>
                {formData.pan_preview ? "✅ பதிவேற்றப்பட்டது" : "❌ பதிவேற்றப்படவில்லை"}
              </div>
            </div>
            <div>
              <div className="font-medium">வாக்காளர் அட்டை</div>
              <div className={`text-xs ${formData.voter_preview ? "text-green-600" : "text-red-600"}`}>
                {formData.voter_preview ? "✅ பதிவேற்றப்பட்டது" : "❌ பதிவேற்றப்படவில்லை"}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Main Component
export default function FarmerRegistrationForm() {
  //---
const [friendData, setFriendData] = useState<FriendData>({
  uNumber: "",
  name: "",
  fatherName: "",
  phone: "",
  aadhaarNumber: "",
  surveyNumber: "",
  acre: "",
  address: "",
  imageUrl: null // Initialize as null
});

// 3. Update the photo upload handler

const handleFriendImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFriendData(prev => ({
        ...prev,
        imageUrl: reader.result as string
      }));
    };
    reader.readAsDataURL(file);
  }
};
// 4. Update your preview rendering logic
{friendData.imageUrl && (
  <div className="mt-2">
    <img
      src={friendData.imageUrl}
      alt="Friend Preview"
      className="h-32 w-32 rounded object-cover"
      onError={(e) => {
        // Handle broken images
        (e.target as HTMLImageElement).style.display = 'none';
      }}
    />
  </div>
)}

// 5. When searching for a friend, handle the image properly
const searchFriendByUNumber = async (uNumber: string) => {
  try {
    const response = await axios.post(`${API_URL}/get-user-by-id`, {
      userId: uNumber,
    });

    if (response.data?.userjson?.userInformation) {
      const info = response.data.userjson.userInformation;
      const info1 = response.data.userjson.calculatedFields.totalLandArea;
      console.log("info1"+info1)
      setFriendData({
        uNumber: info?.உ_எண் || "",
        name: info?.பெயர் || "",
        fatherName: info?.தகபெயர் || "",
        phone: info?.கைபேசி_எண் || "",
        aadhaarNumber: info?.ஆதார்_எண் || "",
        surveyNumber: Array.from({ length: 20 }, (_, i) => info?.[`நிலம்${i + 1}_சர்வே_எண்`])
          .filter(num => num && num.trim() !== "")
          .join(", "),
        acre: info1 ? Number(info1).toFixed(2) : "",

        address: info?.முகவரி || "",
        imageUrl: info?.user_photo_preview || null // Handle null case
      });
      
      return true;
    }
    return false;
  } catch (error) {
    console.error("Friend search failed:", error);
    return false;
  }
};

// 🔹 backend search fn


  //
  const { toast } = useToast()
  const [inlineNotice, setInlineNotice] = useState<{
    title: string
    description?: string
    variant?: "default" | "destructive" | "success" | "info"
  } | null>(null)
  function notify(
    title: string,
    description?: string,
    kind: "default" | "destructive" | "success" | "info" = "default",
  ) {
    try {
      const toastVariant: "default" | "destructive" | undefined = kind === "destructive" ? "destructive" : "default"
      toast({ title, description, variant: toastVariant })
    } catch {}
    // Keep richer kinds for our inline notice UI
    setInlineNotice({ title, description, variant: kind })
  }
  useEffect(() => {
    if (!inlineNotice) return
    const t = setTimeout(() => setInlineNotice(null), 3000)
    return () => clearTimeout(t)
  }, [inlineNotice])

  // Crop data
async function fetchCropData() {
  const cropData: any[] = [];
  try {
    const res = await axios.get(`${API_URL}/api/crops`);
    if (Array.isArray(res.data)) {
      cropData.push(...res.data);
    } else if (res.data && Array.isArray(res.data.crops)) {
      cropData.push(...res.data.crops);
    } else {
      cropData.push(res.data);
    }
    return cropData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}
  const [cropData, setCropData] = useState<any[]>([]);
useEffect(() => {
    const loadData = async () => {
      const data = await fetchCropData();
      setCropData(data);
    };
    loadData();
  }, []);

  // KCCAH data
async function fetchkccahData() {
  const kccahData: any[] = [];
  try {
    const res = await axios.get(`${API_URL}/api/animal`);
    if (Array.isArray(res.data)) {
     kccahData.push(...res.data);
    } else if (res.data && Array.isArray(res.data.crops)) {
      kccahData.push(...res.data.crops);
    } else {
      kccahData.push(res.data);
    }
    return kccahData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}
  const [kccahData, setkccahData] = useState<any[]>([]);
useEffect(() => {
    const loadData = async () => {
      const data = await fetchkccahData();
      setkccahData(data);
    };
    loadData();
  }, []);

  // Gold data
async function fetchgoldData () {
  const goldData: any[] = [];
  try {
    const res = await axios.get(`${API_URL}/api/gold`);
    if (Array.isArray(res.data)) {
     goldData.push(...res.data);
    } else if (res.data && Array.isArray(res.data.crops)) {
      goldData.push(...res.data.crops);
    } else {
     goldData.push(res.data);
    }
    return goldData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}
  const [goldData, setgoldData] = useState<any[]>([]);
useEffect(() => {
    const loadData = async () => {
      const data = await fetchgoldData();
      setgoldData(data);
    };
    loadData();
  }, []);

  // State
  const [selectedCrops, setSelectedCrops] = useState<SelectedCrop[]>([])
  const [selectedKccahLoan, setSelectedKccahLoan] = useState<any>(null)
  const [eligibilityError, setEligibilityError] = useState<string>("")
  const [shareAmountError, setShareAmountError] = useState<string>("")
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [userFound, setUserFound] = useState<boolean | null>(null)
  const [showSubmitOptions, setShowSubmitOptions] = useState<boolean>(false)
  const [showCookiesPanel, setShowCookiesPanel] = useState<boolean>(false)
  const [cookiesMessage, setCookiesMessage] = useState<string>("")
  const [cookiesType, setCookiesType] = useState<"success" | "error" | "info">("info")

  const [goldItems, setGoldItems] = useState<GoldItem[]>([])
  const [propertyData, setPropertyData] = useState({
    description: "",
    value: "",
    village: "",
    surveyNumber: "",
    irrigation: "",
    extent: "",
    a: "",
    ca: "",
    registrarOffice: "",
    mortgageReg: "",
    guidanceValue: "",
    mortgageAmount: "",
  })
  const [formData, setFormData] = useState<FormDataType>({
    உ_எண்: "",
    பெயர்: "",
    தகபெயர்: "",
    முகவரி: "",
    கிராமம்: "",
    வட்டம்: "",
    ஜாதி: "",
    பங்குத்_தொகை: "",
    ஆதார்_எண்: "",
    கைபேசி_எண்: "",
    sdccb_kcc_கணக்கு_எண்: "",
    sdccb_sb_கணக்கு_எண்: "",
    society_sb_கணக்கு_எண்: "",
    pan_அட்டை_எண்: "",
    ரேஷன்_அட்டை_வகை: "",
    ரேஷன்_அட்டை_எண்: "",
    வாக்காளர்_அட்டை_எண்: "",
    மொத்த_நிலம்: "",
    principle_amount: "",
    // ✅ NEW
    பிறந்த_தேதி: "",
    guarantee_type: "",
    checkboxes: {
      kcc: false,
      kccah: false,
      tractor: false,
      jewel: false,
    },
    aadhaar_file: null,
    aadhaar_preview: null,
    ration_file: null,
    ration_preview: null,
    pan_file: null,
    pan_preview: null,
    voter_file: null,
    voter_preview: null,
    user_photo: null,
    user_photo_preview: null,
    friend_photo: null,
    friend_photo_preview: null,
    ...Object.fromEntries(
      Array.from({ length: 20 }, (_, i) => i + 1).flatMap((n) => [
        [`நிலம்${n}_சர்வே_எண்`, ""],
        [`நிலம்${n}_heh`, ""],
        [`நிலம்${n}_ac`, ""],
      ]),
    ),
  })
  const [visibleLandIndex, setVisibleLandIndex] = useState(1)

  const surveyNumbers = Array.from({ length: 20 }, (_, i) => {
    const surveyKey = `நிலம்${i + 1}_சர்வே_எண்` as LandDetailKeys
    const surveyValue = (formData[surveyKey] as string) || ""
    return surveyValue.trim()
  }).filter(Boolean)
   const handleSearchFriend = async (uNumber: string) => {
  try {
    const response = await axios.post(`${API_URL}/get-user-by-id`, {
      userId: uNumber,
    });

    if (response.data?.userjson?.userInformation) {
      const friendInfo = response.data.userjson.userInformation;

      return {
        uNumber: friendInfo?.உ_எண் || "",
        name: friendInfo?.பெயர் || "",
        fatherName: friendInfo?.தகபெயர் || "",
        phone: friendInfo?.கைபேசி_எண் || "",
        aadhaarNumber: friendInfo?.ஆதார்_எண் || "",
        surveyNumber: friendInfo?.சர்வே_எண் || "",
        acre: friendInfo?.ஏக்கர் || "",
        address: friendInfo?.முகவரி || "",
        imageUrl:
          response.data.userjson?.documents?.friendPhoto?.url ||
          response.data.userjson?.documents?.friendPhoto?.preview ||
          "",
      };
    }
    return null;
  } catch (error) {
    console.error("Friend search failed:", error);
    return null;
  }
};
  // Utils
  const hehToAcres = (heh: number): number => heh * 2.471
  const acresToHeh = (acres: number): number => acres / 2.471

  // Aggregations
  const totalLandArea = Array.from({ length: 20 }, (_, i) => {
    const acKey = `நிலம்${i + 1}_ac` as LandDetailKeys
    return Number.parseFloat((formData[acKey] as string) || "0") || 0
  }).reduce((acc, val) => acc + val, 0)

  const totalSelectedAcres = selectedCrops.reduce((acc, crop) => acc + crop.acres, 0)
  const totalEligibleAmount = selectedCrops.reduce((acc, crop) => acc + crop.eligibleAmount, 0)

  // Farmer type
  let farmerType: FarmerType = "MF"
  if (totalLandArea > 5) {
    farmerType = "OF"
  } else if (totalLandArea > 2.5) {
    farmerType = "SF"
  }

  const getExpectedShareAmount = (): number => {
    const principleAmount = totalEligibleAmount || 0
    if (farmerType === "SF") return principleAmount * 0.1
    return principleAmount * 0.05
  }

  // Clear form
  const clearForm = () => {
    setFormData({
      உ_எண்: "",
      பெயர்: "",
      தகபெயர்: "",
      முகவரி: "",
      கிராமம்: "",
      வட்டம்: "",
      ஜாதி: "",
      பங்குத்_தொகை: "",
      ஆதார்_எண்: "",
      கைபேசி_எண்: "",
      sdccb_kcc_கணக்கு_எண்: "",
      sdccb_sb_கணக்கு_எண்: "",
      society_sb_கணக்கு_எண்: "",
      pan_அட்டை_எண்: "",
      ரேஷன்_அட்டை_வகை: "",
      ரேஷன்_அட்டை_எண்: "",
      வாக்காளர்_அட்டை_எண்: "",
      மொத்த_நிலம்: "",
      principle_amount: "",
      பிறந்த_தேதி: "",
      guarantee_type: "",
      checkboxes: {
        kcc: false,
        kccah: false,
        tractor: false,
        jewel: false,
      },
      aadhaar_file: null,
      aadhaar_preview: null,
      ration_file: null,
      ration_preview: null,
      pan_file: null,
      pan_preview: null,
      voter_file: null,
      voter_preview: null,
      user_photo: null,
      user_photo_preview: null,
      friend_photo: null,
      friend_photo_preview: null,
      ...Object.fromEntries(
        Array.from({ length: 20 }, (_, i) => i + 1).flatMap((n) => [
          [`நிலம்${n}_சர்வே_எண்`, ""],
          [`நிலம்${n}_heh`, ""],
          [`நிலம்${n}_ac`, ""],
        ]),
      ),
    })
    setSelectedCrops([])
    setSelectedKccahLoan(null)
    setFriendData({
      uNumber: "",
      name: "",
      fatherName: "",
      address: "",
      phone: "",
      surveyNumber: "",
      acre: "",
      aadhaarNumber: "",
    })
    setGoldItems([])
    setPropertyData({
      description: "",
      value: "",
      village: "",
      surveyNumber: "",
      irrigation: "",
      extent: "",
      a: "",
      ca: "",
      registrarOffice: "",
      mortgageReg: "",
      guidanceValue: "",
      mortgageAmount: "",
    })
    setUserFound(null)
    setShowSubmitOptions(false)
    setVisibleLandIndex(1)
    setShowCookiesPanel(false)
    localStorage.removeItem("உ_எண்")
    localStorage.removeItem("பெயர்")
    localStorage.removeItem("ஆதார்_எண்")
    notify("படிவம் அழிக்கப்பட்டது", "அனைத்து தகவல்களும் அழிக்கப்பட்டுள்ளன", "success")
  }


// Friend image upload handler

  // ✅ Compute breakdown helper (shared with search restore)
  const computeBreakdown = (crop: any, acres: number) => {
    const factor = Math.max(0, acres)
    const perCentRate: PerCentRate = {
      rokkam: (crop.rokkam || 0) / 100,
      thozhu_uram: (crop.thozhu_uram || 0) / 100,
      uram_1: (crop.uram_1 || 0) / 100,
      uram_2: (crop.uram_2 || 0) / 100,
      poochi_marundhu: (crop.poochi_marundhu || 0) / 100,
      vithai: (crop.vithai || 0) / 100,
      motham: (crop.motham || 0) / 100,
    }
    return {
      rokkam: (crop.rokkam || 0) * factor,
      thozhu_uram: (crop.thozhu_uram || 0) * factor,
      uram_1: (crop.uram_1 || 0) * factor,
      uram_2: (crop.uram_2 || 0) * factor,
      poochi_marundhu: (crop.poochi_marundhu || 0) * factor,
      vithai: (crop.vithai || 0) * factor,
      motham: (crop.motham || 0) * factor,
      cents: Math.max(0, Math.round(factor * 100)),
      perCentRate,
    } as CropBreakdown
  }

  // Search user
const searchUser = async () => {
    if (!formData.உ_எண்?.trim()) {
      notify("பிழை", "உ எண் உள்ளிடவும்", "destructive")
      return
    }
    setIsSearching(true)
    setUserFound(null)
    setShowCookiesPanel(false)
    notify("தேடல் தொடங்கப்பட்டது", "பயனர் தகவல்களை தேடுகிறோம்...", "info")

    try {
      const response = await axios.post(`${API_URL}/get-user-by-id`, {
        userId: formData.உ_எண்.trim(),
      })
      if (response.data?.userjson) {
        const existingUserData = response.data.userjson

        const basicUserInfo = {
          உ_எண்: existingUserData.userInformation?.உ_எண் || "",
          பெயர்: existingUserData.userInformation?.பெயர் || "",
          தகபெயர்: existingUserData.userInformation?.தகபெயர் || "",
          முகவரி: existingUserData.userInformation?.முகவரி || "",
          கிராமம்: existingUserData.userInformation?.கிராமம் || "",
          வட்டம்: existingUserData.userInformation?.வட்டம் || "",
          ஜாதி: existingUserData.userInformation?.ஜாதி || "",
          ஆதார்_எண்: existingUserData.userInformation?.ஆதார்_எண் || "",
          கைபேசி_எண்: existingUserData.userInformation?.கைபேசி_எண் || "",
          sdccb_kcc_கணக்கு_எண்: existingUserData.userInformation?.sdccb_kcc_கணக்கு_எண் || "",
          sdccb_sb_கணக்கு_எண்: existingUserData.userInformation?.sdccb_sb_கணக்கு_எண் || "",
          society_sb_கணக்கு_எண்: existingUserData.userInformation?.society_sb_கணக்கு_எண் || "",
          pan_அட்டை_எண்: existingUserData.userInformation?.pan_அட்டை_எண் || "",
          ரேஷன்_அட்டை_வகை: existingUserData.userInformation?.ரேஷன்_அட்டை_வகை || "",
          ரேஷன்_அட்டை_எண்: existingUserData.userInformation?.ரேஷன்_அட்டை_எண் || "",
          வாக்காளர்_அட்டை_எண்: existingUserData.userInformation?.வாக்காளர்_அட்டை_எண் || "",
          பங்குத்_தொகை: existingUserData.userInformation?.பங்குத்_தொகை || "",
          principle_amount: existingUserData.userInformation?.principle_amount || "",
          பிறந்த_தேதி: existingUserData.userInformation?.பிறந்த_தேதி || "",
          guarantee_type: existingUserData.userInformation?.guarantee_type || "",
          checkboxes: existingUserData.userInformation?.checkboxes || {
            kcc: false,
            kccah: false,
            tractor: false,
            jewel: false,
          },
        }
        setFormData((prev) => ({ ...prev, ...basicUserInfo }))

        // land details
        if (existingUserData.landDetails?.landParcels) {
          existingUserData.landDetails.landParcels.forEach((parcel: any) => {
            if (parcel.landNumber <= 20) {
              const surveyKey = `நிலம்${parcel.landNumber}_சர்வே_எண்` as keyof FormDataType
              const hehKey = `நிலம்${parcel.landNumber}_heh` as keyof FormDataType
              const acKey = `நிலம்${parcel.landNumber}_ac` as keyof FormDataType
              setFormData((prev) => ({
                ...prev,
                [surveyKey]: parcel.surveyNumber || "",
                [hehKey]: parcel.hectares?.toString() || "",
                [acKey]: parcel.acres?.toString() || "",
              }))
            }
          })
        }

        // crops - with survey number autofill
        if (existingUserData.loanDetails?.selectedCrops && Array.isArray(existingUserData.loanDetails.selectedCrops)) {
          const cropsToRestore = existingUserData.loanDetails.selectedCrops
            .map((savedCrop: any) => {
              const matchingCrop = cropData.find(
                (crop) =>
                  crop.crop_code === savedCrop.crop?.crop_code || crop.name_of_crop === savedCrop.crop?.name_of_crop,
              )
              if (matchingCrop) {
                const acres = savedCrop.acres || 0
                const breakdown: CropBreakdown =
                  savedCrop.breakdown && typeof savedCrop.breakdown === "object"
                    ? savedCrop.breakdown
                    : computeBreakdown(matchingCrop, acres)
                
                return {
                  crop: matchingCrop,
                  acres,
                  eligibleAmount: savedCrop.eligibleAmount || acres * (matchingCrop.motham || 0),
                  breakdown,
                  surveyNumber: savedCrop.surveyNumber || ""
                } as SelectedCrop
              }
              return null
            })
            .filter(Boolean) as SelectedCrop[]
          setSelectedCrops(cropsToRestore)
        }

        // Rest of your existing code remains the same...
        // KCCAH
        if (existingUserData.loanDetails?.selectedKccahLoan) {
          setSelectedKccahLoan(existingUserData.loanDetails.selectedKccahLoan)
        }

        // friend details
        if (existingUserData.friendDetails) {
          const friendDetailsData = {
            uNumber: existingUserData.friendDetails.uNumber || existingUserData.friendDetails.detailedInfo?.உ_எண் || "",
            name: existingUserData.friendDetails.name || existingUserData.friendDetails.detailedInfo?.பெயர் || "",
            fatherName:
              existingUserData.friendDetails.fatherName || existingUserData.friendDetails.detailedInfo?.தகபெயர் || "",
            address:
              existingUserData.friendDetails.address || existingUserData.friendDetails.detailedInfo?.முகவரி || "",
            phone: existingUserData.friendDetails.phone || existingUserData.friendDetails.detailedInfo?.கைபேசி_எண் || "",
            surveyNumber:
              existingUserData.friendDetails.surveyNumber || existingUserData.friendDetails.detailedInfo?.சர்வே_எண் || "",
            acre: existingUserData.friendDetails.acre || existingUserData.friendDetails.detailedInfo?.ஏக்கர் || "",
            aadhaarNumber: existingUserData.friendDetails.detailedInfo?.ஆதார்_எண் || "",
          }
          setFriendData(friendDetailsData)
          const friendImageUrl =
            existingUserData.friendDetails.imageUrl ||
            existingUserData.documents?.friendPhoto?.preview ||
            existingUserData.documents?.friendPhoto?.url
          if (friendImageUrl) {
            setFormData((prev) => ({
              ...prev,
              friend_photo_preview: friendImageUrl,
            }))
          }
        }

        // gold details
        if (existingUserData.goldDetails) {
          if (existingUserData.goldDetails.items && Array.isArray(existingUserData.goldDetails.items)) {
            const goldItemsFromData = existingUserData.goldDetails.items.map((item: any) => ({
              type: item.type || "தங்கம்",
              weight: item.weight || 0,
              count: item.count || 1,
              netWeight: item.netWeight || 0,
              alloy: item.alloy || "",
              netAmount: item.netAmount || 0,
            }))
            setGoldItems(goldItemsFromData)
          } else if (
            existingUserData.goldDetails.goldItemsDetails &&
            Array.isArray(existingUserData.goldDetails.goldItemsDetails)
          ) {
            const goldItemsFromDetails = existingUserData.goldDetails.goldItemsDetails.map((item: any) => ({
              type: item.type || "தங்கம்",
              weight: item.weight || 0,
              count: item.count || 1,
              netWeight: item.netWeight || 0,
              alloy: item.alloy || "",
              netAmount: item.netAmount || 0,
            }))
            setGoldItems(goldItemsFromDetails)
          } else if (existingUserData.goldDetails.totalWeight > 0) {
            setGoldItems([
              {
                type: "தங்கம்",
                weight: existingUserData.goldDetails.totalWeight,
                count: 1,
                netWeight: 0,
                alloy: "",
                netAmount: 0,
              },
            ])
          }
        }

        // property
        if (existingUserData.ownProperty) {
          setPropertyData((prev) => ({
            ...prev,
            surveyNumbers: existingUserData.loanDetails?.cropsBreakdown?.map((c: any) => c.surveyNumber) || [],
            description: existingUserData.ownProperty.description || "",
            value: existingUserData.ownProperty.value?.toString() || "",
            village: existingUserData.ownProperty.mortgageDetails?.village || "",
            surveyNumber: existingUserData.ownProperty.mortgageDetails?.surveyNumber || "",
            irrigation: existingUserData.ownProperty.mortgageDetails?.irrigation || "",
            extent: existingUserData.ownProperty.mortgageDetails?.extent || "",
            a: existingUserData.ownProperty.mortgageDetails?.a || "",
            ca: existingUserData.ownProperty.mortgageDetails?.ca || "",
            registrarOffice: existingUserData.ownProperty.mortgageDetails?.registrarOffice || "",
            mortgageReg: existingUserData.ownProperty.mortgageDetails?.mortgageReg || "",
            guidanceValue: existingUserData.ownProperty.mortgageDetails?.guidanceValue?.toString() || "",
            mortgageAmount: existingUserData.ownProperty.mortgageDetails?.mortgageAmount?.toString() || "",
          }))
        }

        // docs
        if (existingUserData.documents) {
          setFormData((prev) => ({
            ...prev,
            aadhaar_preview:
              existingUserData.documents.aadhaar?.preview ||
              existingUserData.documents.aadhaar?.url ||
              existingUserData.userInformation?.aadhaar_preview ||
              null,
            ration_preview:
              existingUserData.documents.ration?.preview ||
              existingUserData.documents.ration?.url ||
              existingUserData.userInformation?.ration_preview ||
              null,
            pan_preview:
              existingUserData.documents.pan?.preview ||
              existingUserData.documents.pan?.url ||
              existingUserData.userInformation?.pan_preview ||
              null,
            voter_preview:
              existingUserData.documents.voter?.preview ||
              existingUserData.documents.voter?.url ||
              existingUserData.userInformation?.voter_preview ||
              null,
            user_photo_preview:
              existingUserData.documents.userPhoto?.preview ||
              existingUserData.documents.userPhoto?.url ||
              existingUserData.userInformation?.user_photo_preview ||
              null,
            friend_photo_preview:
              existingUserData.documents.friendPhoto?.preview ||
              existingUserData.documents.friendPhoto?.url ||
              existingUserData.userInformation?.friend_photo_preview ||
              null,
          }))
        }

        setUserFound(true)
        setShowSubmitOptions(true)
        setCookiesMessage(
          `பயனர் கண்டுபிடிக்கப்பட்டார்! பெயர்: ${basicUserInfo.பெயர் || "N/A"} - அனைத்து பிரிவுகளும் நிரப்பப்பட்டுள்ளன`,
        )
        setCookiesType("success")
        setShowCookiesPanel(true)
        notify("பயனர் கண்டுபிடிக்கப்பட்டார்", "அனைத்து தகவல்களும் நிரப்பப்பட்டுள்ளன!", "success")
      } else {
        setUserFound(false)
        setShowSubmitOptions(true)
        setCookiesMessage(`பயனர் கண்டுபிடிக்கப்படவில்லை. உ எண்: ${formData.உ_எண்}`)
        setCookiesType("error")
        setShowCookiesPanel(true)
        notify("பயனர் கண்டுபிடிக்கப்படவில்லை", "புதிய பயனராக பதிவு செய்யப்படும்", "info")
      }
    } catch (error) {
      setUserFound(false)
      setShowSubmitOptions(true)
      setCookiesMessage(`பிழை: தகவலை பெற முடியவில்லை`)
      setCookiesType("error")
      setShowCookiesPanel(true) 
      notify("பிழை", "தகவலை பெற முடியவில்லை", "destructive")
      console.error("Error fetching user data:", error)
    } finally {
      setIsSearching(false)
    }
  }


// Update the friend image upload handler:

  // handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (name === "உ_எண்") {
      if (!value.trim()) {
        clearForm()
        return
      }
      setUserFound(null)
      setShowSubmitOptions(false)
      setShowCookiesPanel(false)
    }

    if (name === "guarantee_type") {
      setFormData((prev) => ({
        ...prev,
        guarantee_type: value as "friend" | "gold" | "property" | "",
      }))
      return
    }

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked
      if (["kcc", "kccah", "tractor", "jewel"].includes(name)) {
        setFormData((prev) => ({
          ...prev,
          checkboxes: {
            kcc: false,
            kccah: false,
            tractor: false,
            jewel: false,
            [name]: checked,
          } as any,
        }))
        if (name === "kcc" && checked) {
          setFormData((prev) => ({ ...prev, principle_amount: "100000" }))
        } else if (name === "kccah" && checked) {
          setFormData((prev) => ({ ...prev, principle_amount: "50000" }))
          setSelectedKccahLoan(null)
        }
      } else {
        setFormData((prev) => ({
          ...prev,
          checkboxes: { ...prev.checkboxes, [name]: checked } as any,
        }))
      }
    } else {
      setFormData((prev) => {
        const updated: any = { ...prev, [name]: value }
        // HEH -> AC
        const hehMatch = name.match(/நிலம்(\d+)_heh/)
        if (hehMatch && value) {
          const index = Number.parseInt(hehMatch[1], 10)
          const acKey = `நிலம்${index}_ac` as keyof typeof updated
          const hehValue = Number.parseFloat(value)
          if (!isNaN(hehValue)) {
            updated[acKey] = hehToAcres(hehValue).toFixed(3)
          }
        }
        // AC -> HEH
        const acMatch = name.match(/நிலம்(\d+)_ac/)
        if (acMatch && value) {
          const index = Number.parseInt(acMatch[1], 10)
          const hehKey = `நிலம்${index}_heh` as keyof typeof updated
          const acValue = Number.parseFloat(value)
          if (!isNaN(acValue)) {
            updated[hehKey] = acresToHeh(acValue).toFixed(3)
          }
        }
        // Reveal next row
        const match = name.match(/நிலம்(\d+)_/)
        if (match) {
          const index = Number.parseInt(match[1], 10)
          const surveyKey = `நிலம்${index}_சர்வே_எண்` as keyof typeof updated
          const hehKey = `நிலம்${index}_heh` as keyof typeof updated
          const acKey = `நிலம்${index}_ac` as keyof typeof updated
          const surveyVal = (updated[surveyKey] as unknown as string) || ""
          const hehVal = (updated[hehKey] as unknown as string) || ""
          const acVal = (updated[acKey] as unknown as string) || ""
          const allFilled = surveyVal.trim() !== "" && hehVal.trim() !== "" && acVal.trim() !== ""
          if (allFilled && index === visibleLandIndex && index < 20) {
            setVisibleLandIndex(index + 1)
          }
        }
        return updated
      })
      if (name === "உ_எண்" && value) localStorage.setItem("உ_எண்", value)
      if (name === "பெயர்" && value) localStorage.setItem("பெயர்", value)
      if (name === "ஆதார்_எண்" && value) localStorage.setItem("ஆதார்_எண்", value)
    }
  }

  // File uploads
  // Prefer a global override or NEXT_PUBLIC var when available (for deployments), else fallback to localhost.
  // Note: NEXT_PUBLIC_* vars only work if set at build time; globalThis.BACKEND_URL can be set at runtime in the browser console for testing.
  const BACKEND_URL =
    (typeof globalThis !== "undefined" && (globalThis as any).BACKEND_URL) ||
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    "http://localhost:5000"
  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    fileField: keyof FormDataType,
    previewField: keyof FormDataType,
    docType: string,
  ) => {
    const file = e.target.files?.[0] ?? null
    if (!file) return
    setFormData((prev) => ({
      ...prev,
      [fileField]: file,
      [previewField]: URL.createObjectURL(file),
    }))
    const formDataUpload = new FormData()
    formDataUpload.append("file", file)
    try {
      const res = await fetch(`${BACKEND_URL}/api/upload/${docType}`, {
        method: "POST",
        body: formDataUpload,
      })
      if (!res.ok) {
        throw new Error(`Upload failed with status ${res.status}`)
      }
      const data = await res.json()
      if (data.path) {
        setFormData((prev) => ({
          ...prev,
          [previewField]: `${BACKEND_URL}${data.path}`,
        }))
      }
    } catch (error) {
      console.error(`${docType} upload failed`, error)
    }
  }
  const handleAadhaarChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleFileChange(e, "aadhaar_file", "aadhaar_preview", "aadhaar")
  const handleRationChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleFileChange(e, "ration_file", "ration_preview", "ration")
  const handlePanChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleFileChange(e, "pan_file", "pan_preview", "pan")
  const handleUserPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleFileChange(e, "user_photo", "user_photo_preview", "userPhoto")
  const handleVoterDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) =>
  handleFileChange(e, "voter", "voter_preview", "voterPhoto")
const handleFriendPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) =>
  handleFileChange(e, "friend_photo", "friend_photo_preview", "friendPhoto")


 

  // effects
  useEffect(() => {
    const principleAmount = Number.parseFloat(formData.principle_amount) || 0
    if ((formData.checkboxes.kcc || formData.checkboxes.kccah) && totalEligibleAmount > 0 && principleAmount > 0) {
      if (totalEligibleAmount > principleAmount) {
        setEligibilityError(
          `Eligible amount (₹${totalEligibleAmount.toFixed(2)}) exceeds principle amount (₹${principleAmount.toFixed(2)})`,
        )
      } else {
        setEligibilityError("")
      }
    } else {
      setEligibilityError("")
    }
  }, [totalEligibleAmount, formData.principle_amount, formData.checkboxes.kcc, formData.checkboxes.kccah])

  useEffect(() => {
    const principleAmount = Number.parseFloat(formData.principle_amount) || 0
    const shareAmount = Number.parseFloat(formData.பங்குத்_தொகை) || 0
    if (principleAmount > 0 && shareAmount > 0) {
      const expectedAmount = getExpectedShareAmount()
      const percentage = farmerType === "SF" ? "10%" : "5%"
      if (shareAmount > expectedAmount) {
        setShareAmountError(`Share amount is higher than expected ${percentage} (₹${expectedAmount.toFixed(2)})`)
      } else if (shareAmount < expectedAmount) {
        setShareAmountError(`Share amount is lower than required ${percentage} (₹${expectedAmount.toFixed(2)})`)
      } else {
        setShareAmountError("")
      }
    } else {
      setShareAmountError("")
    }
  }, [formData.principle_amount, formData.பங்குத்_தொகை, farmerType])

  // submit
  async function pingBackend() {
    try {
      const res = await fetch(`${BACKEND_URL}/health`)
      if (!res.ok) return false
      const j = await res.json().catch(() => ({}))
      return !!j
    } catch {
      return false
    }
  }

  function handleSubmit(e: React.FormEvent, isUpdate = false) {
    e.preventDefault()
    ;
    e.preventDefault();
  
  const requiredFields = [
    "உ_எண்", "பெயர்", "தகபெயர்", "முகவரி", "கிராமம்", "வட்டம்", 
    "ஆதார்_எண்", "கைபேசி_எண்", "பிறந்த_தேதி", "பங்குத்_தொகை"
  ]
  
  const errors: Record<string, string> = {}
  requiredFields.forEach(field => {
    if (!formData[field]?.trim()) {
      errors[field] = "இந்த புலம் தேவையானது"
    }
  })
  
  // Validate phone number format
  if (formData.கைபேசி_எண் && !/^\d{10}$/.test(formData.கைபேசி_எண்)) {
    errors.கைபேசி_எண் = "செல்லுபடியாகும் 10-இலக்க தொலைபேசி எண்ணை உள்ளிடவும்"
  }

  // Validate Aadhaar number format
  if (formData.ஆதார்_எண் && !/^\d{12}$/.test(formData.ஆதார்_எண்)) {
    errors.ஆதார்_எண் = "செல்லுபடியாகும் 12-இலக்க ஆதார் எண்ணை உள்ளிடவும்"
  }
  
  // Check if user photo is uploaded
  if (!formData.user_photo_preview) {
    errors.user_photo = "பயனர் படம் தேவையானது"
  }
  
  // Check if required documents are uploaded
  const requiredDocuments = [
    { key: "aadhaar_preview", name: "ஆதார் அட்டை" },
    { key: "ration_preview", name: "ரேஷன் அட்டை" },
    { key: "pan_preview", name: "PAN அட்டை" },
    { key: "voter_preview", name: "வாக்காளர் அட்டை" }
  ]
  
  requiredDocuments.forEach(doc => {
    if (!formData[doc.key]) {
      errors[doc.key] = `${doc.name} பதிவேற்றம் தேவையானது`
    }
  })
  
  if (Object.keys(errors).length > 0) {
    const errorList = Object.entries(errors)
      .map(([field, msg]) => {
        // Map field keys to readable names
        const fieldNames: Record<string, string> = {
          "உ_எண்": "உறுப்பினர் எண்",
          "பெயர்": "பெயர்",
          "தகபெயர்": "தந்தை பெயர்",
          "முகவரி": "முகவரி",
          "கிராமம்": "கிராமம்",
          "வட்டம்": "வட்டம்",
          "ஆதார்_எண்": "ஆதார் எண்",
          "கைபேசி_எண்": "கைபேசி எண்",
          "பிறந்த_தேதி": "பிறந்த தேதி",
          "பங்குத்_தொகை": "பங்குத் தொகை",
          "user_photo": "பயனர் படம்",
          "aadhaar_preview": "ஆதார் அட்டை",
          "ration_preview": "ரேஷன் அட்டை",
          "pan_preview": "PAN அட்டை",
          "voter_preview": "வாக்காளர் அட்டை"
        }
        
        return `${fieldNames[field] || field}: ${msg}`
      })
      .join("\n")
    
    notify("பிழை", `பிழைகள்:\n${errorList}`, "destructive")
    return
  }
  
    
    
    
    (async () => {
      const ok = await pingBackend()
      if (!ok) {
        notify("Backend not reachable", `Could not reach ${BACKEND_URL}. Check server and BACKEND_URL.`, "destructive")
      }

      notify(
        isUpdate ? "புதுப்பிப்பு தொடங்கப்பட்டது" : "பதிவு தொடங்கப்பட்டது",
        isUpdate ? "தகவல்களை புதுப்பிக்கிறோம்..." : "தகவல்களை சமர்ப்பிக்கிறோம்...",
        "info",
      )

      if (totalSelectedAcres > totalLandArea) {
        notify(
          "Validation Error",
          `Selected crop acres (${totalSelectedAcres.toFixed(3)}) cannot exceed total land area (${totalLandArea.toFixed(3)})`,
          "destructive",
        )
        return
      }
    
      // if (shareAmountError) {
      //   notify("Share Amount Error", "Please resolve share amount error before submitting", "destructive")
      //   return
      // }

      const userId = localStorage.getItem("உ_எண்") || formData.உ_எண்
      const userName = localStorage.getItem("பெயர்") || formData.பெயர்
      const aadhaar = localStorage.getItem("ஆதார்_எண்") || formData.ஆதார்_எண்
      const selectedLoanType = formData.checkboxes.kcc ? "KCC" : formData.checkboxes.kccah ? "KCCAH" : "Other"

      const goldRate = goldData[0]?.marketValue || 6000
      const totalGoldWeight = goldItems.reduce((sum, item) => sum + item.weight * item.count, 0)
      const totalGoldValue = totalGoldWeight * goldRate
      const totalNetWeight = goldItems.reduce((sum, item) => sum + item.netWeight, 0)
      const totalNetAmount = goldItems.reduce((sum, item) => sum + item.netAmount, 0)

      const completeFormData = {
        userInformation: formData,
        landDetails: {
          totalLandArea,
          farmerType,
          landParcels: Array.from({ length: 20 }, (_, i) => {
            const surveyKey = `நிலம்${i + 1}_சர்வே_எண்` as LandDetailKeys
            const hehKey = `நிலம்${i + 1}_heh` as LandDetailKeys
            const acKey = `நிலம்${i + 1}_ac` as LandDetailKeys
            const survey = formData[surveyKey] as string
            const heh = formData[hehKey] as string
            const ac = formData[acKey] as string
            if (survey || heh || ac) {
              return {
                landNumber: i + 1,
                surveyNumber: survey,
                hectares: Number.parseFloat(heh) || 0,
                acres: Number.parseFloat(ac) || 0,
              }
            }
            return null
          }).filter(Boolean),
        },
        loanDetails: {
          type: formData.checkboxes.kcc ? "KCC" : formData.checkboxes.kccah ? "KCCAH" : "Other",
          principleAmount: Number.parseFloat(formData.principle_amount) || 0,
          shareAmount: Number.parseFloat(formData.பங்குத்_தொகை) || 0,
          selectedKccahLoan,
          selectedCrops,
          totalEligibleAmount,
          cropsBreakdown: selectedCrops.map((c, i) => ({
            index: i + 1,
            crop_code: c.crop?.crop_code,
            name_of_crop: c.crop?.name_of_crop,
            acres: c.acres,
            surveyNumber: c.surveyNumber || "",  
            cents: c.breakdown?.cents ?? Math.round((c.acres || 0) * 100),
            breakdown: c.breakdown,
          })),
          kccahBreakdown: selectedKccahLoan
            ? {
                loanId: selectedKccahLoan.id,
                loanName: selectedKccahLoan.கடன்_வகை,
                planText: selectedKccahLoan.dynamicPlan ?? selectedKccahLoan.திட்ட_அளவு,
                units: selectedKccahLoan.dynamicUnits ?? parsePlanUnits(selectedKccahLoan.திட்ட_அளவு || ""),
                perUnit: selectedKccahLoan.breakdown?.perUnit ?? {
                  ரொக்கம்: selectedKccahLoan.ரொக்கம்,
                  விதை: selectedKccahLoan.விதை,
                },
                total: selectedKccahLoan.breakdown?.total ?? {
                  ரொக்கம்: selectedKccahLoan.ரொக்கம்,
                  விதை:
                    (selectedKccahLoan.விதை || 0) *
                    (selectedKccahLoan.dynamicUnits ?? parsePlanUnits(selectedKccahLoan.திட்ட_அளவு || "")),
                  மொத்தம்:
                    selectedKccahLoan.ரொக்கம் +
                    (selectedKccahLoan.விதை || 0) *
                      (selectedKccahLoan.dynamicUnits ?? parsePlanUnits(selectedKccahLoan.திட்ட_அளவு || "")),
                },
              }
            : null,
        },
       // In your handleSubmit function, update the friendDetails part to use friendData:
friendDetails: {
  uNumber: friendData.uNumber,
  name: friendData.name,
  fatherName: friendData.fatherName,
  address: friendData.address,
  phone: friendData.phone,
  surveyNumber: friendData.surveyNumber,
  acre: friendData.acre,
  aadhaarNumber: friendData.aadhaarNumber,
  hasImage: !!formData.friend_photo_preview,
  hasData: !!(friendData.name || friendData.phone || friendData.address || friendData.uNumber),
  imageUrl: formData.friend_photo_preview || null,
  detailedInfo: {
    உ_எண்: friendData.uNumber,
    பெயர்: friendData.name,
    தகபெயர்: friendData.fatherName,
    முகவரி: friendData.address,
    கைபேசி_எண்: friendData.phone,
    சர்வே_எண்: friendData.surveyNumber,
    ஏக்கர்: friendData.acre,
    ஆதார்_எண்: friendData.aadhaarNumber,
    படம்_URL: formData.friend_photo_preview || null,
  }
},
        goldDetails: {
          items: goldItems,
          totalItems: goldItems.length,
          totalWeight: totalGoldWeight,
          totalNetWeight: totalNetWeight,
          marketValue: goldRate,
          totalValue: totalGoldValue,
          totalNetAmount: totalNetAmount,
          hasGold: goldItems.length > 0,
          goldItemsDetails: goldItems.map((item, index) => ({
            itemNumber: index + 1,
            type: item.type,
            weight: item.weight,
            count: item.count,
            totalWeight: item.weight * item.count,
            value: item.weight * item.count * goldRate,
            netWeight: item.netWeight,
            alloy: item.alloy,
            netAmount: item.netAmount,
          })),
          goldSummary: {
            totalTypes: goldItems.length,
            totalCount: goldItems.reduce((sum, item) => sum + item.count, 0),
            averageWeight:
              goldItems.length > 0 ? goldItems.reduce((sum, item) => sum + item.weight, 0) / goldItems.length : 0,
            highestValue:
              goldItems.length > 0 ? Math.max(...goldItems.map((item) => item.weight * item.count * goldRate)) : 0,
            totalNetWeightSummary: totalNetWeight,
            totalNetAmountSummary: totalNetAmount,
            netWeightCalculation: `நிகர எடை × தங்க விலை = நிகர தொகை`,
            goldRateUsed: goldRate,
          },
        },
        ownProperty: {
          description: propertyData.description,
          value: Number.parseFloat(propertyData.value) || 0,
          hasProperty: !!(propertyData.description || propertyData.value),
          hasPropertyData: !!(
            propertyData.description ||
            propertyData.value ||
            propertyData.village ||
            propertyData.surveyNumber ||
            propertyData.guidanceValue ||
            propertyData.mortgageAmount
          ),
          mortgageDetails: {
            village: propertyData.village,
            surveyNumber: propertyData.surveyNumber,
            irrigation: propertyData.irrigation,
            extent: propertyData.extent,
            a: propertyData.a,
            ca: propertyData.ca,
            registrarOffice: propertyData.registrarOffice,
            mortgageReg: propertyData.mortgageReg,
            guidanceValue: Number.parseFloat(propertyData.guidanceValue) || 0,
            mortgageAmount: Number.parseFloat(propertyData.mortgageAmount) || 0,
            hasMortgageData: !!(
              propertyData.village ||
              propertyData.surveyNumber ||
              propertyData.irrigation ||
              propertyData.extent ||
              propertyData.a ||
              propertyData.ca ||
              propertyData.registrarOffice ||
              propertyData.mortgageReg ||
              propertyData.guidanceValue ||
              propertyData.mortgageAmount
            ),
          },
          propertySummary: {
            totalValue: Number.parseFloat(propertyData.value) || 0,
            mortgageValue: Number.parseFloat(propertyData.mortgageAmount) || 0,
            guidanceValue: Number.parseFloat(propertyData.guidanceValue) || 0,
            hasDescription: !!propertyData.description,
            hasMortgageDetails: !!(propertyData.village || propertyData.surveyNumber),
          },
        },
        documents: {
          aadhaar: {
            file: formData.aadhaar_file,
            preview: formData.aadhaar_preview,
            uploaded: !!formData.aadhaar_preview,
          },
          ration: { file: formData.ration_file, preview: formData.ration_preview, uploaded: !!formData.ration_preview },
          pan: { file: formData.pan_file, preview: formData.pan_preview, uploaded: !!formData.pan_preview },
          voter: { file: formData.voter_file, preview: formData.voter_preview, uploaded: !!formData.voter_preview },
          userPhoto: {
            file: formData.user_photo,
            preview: formData.user_photo_preview,
            uploaded: !!formData.user_photo_preview,
          },
          friendPhoto: {
            file: formData.friend_photo,
            preview: formData.friend_photo_preview,
            uploaded: !!formData.friend_photo_preview,
            url: formData.friend_photo_preview,
          },
          documentsSummary: {
            totalUploaded: [
              formData.aadhaar_preview,
              formData.ration_preview,
              formData.pan_preview,
              formData.voter_preview,
              formData.user_photo_preview,
              formData.friend_photo_preview,
            ].filter(Boolean).length,
            totalRequired: 6,
            completionRate:
              ([
                formData.aadhaar_preview,
                formData.ration_preview,
                formData.pan_preview,
                formData.voter_preview,
                formData.user_photo_preview,
                formData.friend_photo_preview,
              ].filter(Boolean).length /
                6) *
              100,
          },
        },
        calculatedFields: {
          totalLandArea,
          totalSelectedAcres,
          totalEligibleAmount,
          farmerType,
          expectedShareAmount: getExpectedShareAmount(),
          totalGoldValue,
          totalGoldNetAmount: totalNetAmount,
          totalPropertyValue: Number.parseFloat(propertyData.value) || 0,
          combinedAssetValue: totalGoldValue + (Number.parseFloat(propertyData.value) || 0),
          combinedNetAssetValue: totalNetAmount + (Number.parseFloat(propertyData.value) || 0),
        },
        metadata: {
          submissionDate: new Date().toISOString(),
          isUpdate,
          version: "2.5",
          formSections: {
            userInformation: true,
            landDetails: totalLandArea > 0,
            loanDetails: !!(formData.checkboxes.kcc || formData.checkboxes.kccah),
            friendDetails: !!(friendData.name || friendData.phone || friendData.address || friendData.uNumber),
            goldDetails: goldItems.length > 0,
            ownProperty: !!(propertyData.description || propertyData.value),
            documents: !!(
              formData.aadhaar_preview ||
              formData.ration_preview ||
              formData.pan_preview ||
              formData.voter_preview
            ),
            friendImage: !!formData.friend_photo_preview,
          },
          validationStatus: {
            isValid: !(totalSelectedAcres > totalLandArea || eligibilityError || shareAmountError),
            errors: [
              totalSelectedAcres > totalLandArea ? "Land area exceeded" : null,
              eligibilityError ? "Eligibility error" : null,
              shareAmountError ? "Share amount error" : null,
            ].filter(Boolean),
            completionPercentage: Math.round(
              (Object.values({
                userInformation: true,
                landDetails: totalLandArea > 0,
                loanDetails: !!(formData.checkboxes.kcc || formData.checkboxes.kccah),
                friendDetails: !!(friendData.name || friendData.phone || friendData.address || friendData.uNumber),
                goldDetails: goldItems.length > 0,
                ownProperty: !!(propertyData.description || propertyData.value),
                documents: !!(
                  formData.aadhaar_preview ||
                  formData.ration_preview ||
                  formData.pan_preview ||
                  formData.voter_preview
                ),
              }).filter(Boolean).length /
                7) *
                100,
            ),
          },
        },
      }

      const basePayload = {
        உ_எண்: userId,
        பெயர்: userName,
        ஆதார்_எண்: aadhaar,
        userjson: completeFormData,
        loantype: selectedLoanType,
        isUpdate,
      }

      // Decide endpoint:
      // - If we know the user already exists (userFound === true), always UPDATE
      // - Otherwise, CREATE
      const endpoint = userFound || isUpdate ? `${BACKEND_URL}/submit-user-data` : `${BACKEND_URL}/submit-user-data`
      try {
        const response = await axios.post(endpoint, basePayload)
        notify(
          userFound || isUpdate ? "புதுப்பிப்பு வெற்றிகரமானது!" : "பதிவு வெற்றிகரமானது!",
          userFound || isUpdate
            ? "Registration has been updated successfully!"
            : "Registration has been submitted successfully!",
          "success",
        )
        console.log("📋 Submitted Data:", response.data)
      } catch (error: any) {
        const status = error?.response?.status
        const statusText = error?.response?.statusText
        const data = error?.response?.data
        console.error("❌ Submission Error:", { status, statusText, data })
        notify(
          "பதிவில் பிழை!",
          `Request failed${status ? ` (HTTP ${status})` : ""}. ${status === 404 ? "Not found for update. Try create if needed." : "See console for details."}`,
          "destructive",
        )
      }
    })()
  }

  // Cookies Panel
  const CookiesPanel = () => {
    if (!showCookiesPanel) return null
    const handleButtonClick = (buttonName: string) => {
      notify("பொத்தான் அழுத்தப்பட்டது", `${buttonName} பொத்தான் அழுத்தப்பட்டது`, "info")
    }
    return (
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 animate-in slide-in-from-left duration-500">
        <Card
          className={`w-96 shadow-2xl border-2 ${
            cookiesType === "success"
              ? "border-green-500 bg-green-50"
              : cookiesType === "error"
                ? "border-red-500 bg-red-50"
                : "border-blue-500 bg-blue-50"
          }`}
        >
          <CardHeader
            className={`pb-3 ${cookiesType === "success" ? "bg-green-100" : cookiesType === "error" ? "bg-red-100" : "bg-blue-100"}`}
          >
            <CardTitle
              className={`text-lg flex items-center justify-between ${
                cookiesType === "success"
                  ? "text-green-800"
                  : cookiesType === "error"
                    ? "text-red-800"
                    : "text-blue-800"
              }`}
            >
              <div className="flex items-center gap-2">
                {cookiesType === "success" && <CheckCircle className="h-5 w-5" />}
                {cookiesType === "error" && <AlertTriangle className="h-5 w-5" />}
                {cookiesType === "info" && <User className="h-5 w-5" />}
                தேடல் முடிவு
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setShowCookiesPanel(false)
                  handleButtonClick("மூடு")
                }}
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div
              className={`text-sm font-medium mb-4 ${
                cookiesType === "success"
                  ? "text-green-700"
                  : cookiesType === "error"
                    ? "text-red-700"
                    : "text-blue-700"
              }`}
            >
              {cookiesMessage}
            </div>
            <div className="flex flex-col gap-2 mb-4">
              <div
                className={`text-xs px-2 py-1 rounded ${
                  cookiesType === "success"
                    ? "bg-green-200 text-green-800"
                    : cookiesType === "error"
                      ? "bg-red-200 text-red-800"
                      : "bg-blue-200 text-blue-800"
                }`}
              >
                {cookiesType === "success" && "✅ User Add - பயனர் கிடைத்தார்"}
                {cookiesType === "error" && "❌ User Not Add - பயனர் இல்லை"}
                {cookiesType === "info" && "ℹ️ தகவல்"}
              </div>
              <div className="text-xs text-gray-600">நேரம்: {new Date().toLocaleTimeString("ta-IN")}</div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-xs font-semibold text-gray-700 mb-2">படிவம் சமர்ப்பிப்பு (Form Submission):</div>
              <div className="grid grid-cols-1 gap-2">
                {userFound ? (
                  <>
                    <Button
                      size="sm"
                      onClick={(e) => {
                        handleSubmit(e, true)
                        handleButtonClick("புதுப்பிக்கவும்")
                      }}
                      className="text-xs bg-blue-600 hover:bg-blue-700 text-white justify-start"
                      disabled={totalSelectedAcres > totalLandArea || !!eligibilityError || !!shareAmountError}
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      புதுப்பிக்கவும் (Update Loan)
                    </Button>
                    <Button
                      size="sm"
                      onClick={(e) => {
                        handleSubmit(e, false)
                        handleButtonClick("புதிய கடன்")
                      }}
                      className="text-xs bg-green-600 hover:bg-green-700 text-white justify-start"
                      disabled={totalSelectedAcres > totalLandArea || !!eligibilityError || !!shareAmountError}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      புதிய கடன் (New Loan)
                    </Button>
                  </>
                ) : (
                  <Button
                    size="sm"
                    onClick={(e) => {
                      handleSubmit(e, false)
                      handleButtonClick("சமர்ப்பிக்கவும்")
                    }}
                    className="text-xs bg-primary hover:bg-primary/90 text-primary-foreground justify-start"
                    disabled={totalSelectedAcres > totalLandArea}
                  >
                    <UserPlus className="h-3 w-3 mr-1" />
                    சமர்ப்பிக்கவும் (Submit Registration)
                  </Button>
                )}
                <Button
                  size="sm"
                  onClick={(e) => {
                    handleSubmit(e, false)
                    handleButtonClick("சமர்ப்பிக்கவும் (புதிய பதிவு)")
                  }}
                  className="text-xs bg-purple-600 hover:bg-purple-700 text-white justify-start"
                  disabled={totalSelectedAcres > totalLandArea }
                >
                  <UserPlus className="h-3 w-3 mr-1" />
                  சமர்ப்பிக்கவும் (Submit Registration)
                </Button>
                {cookiesType === "error" && (
                  <Button
                    size="sm"
                    onClick={() => {
                      searchUser()
                      handleButtonClick("மீண்டும் தேடு")
                    }}
                    disabled={isSearching}
                    className="text-xs bg-orange-600 hover:bg-orange-700 text-white justify-start"
                  >
                    {isSearching ? (
                      <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                    ) : (
                      <Search className="h-3 w-3 mr-1" />
                    )}
                    மீண்டும் தேடு (Search Again)
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    clearForm()
                    handleButtonClick("அழிக்கவும்")
                  }}
                  className="text-xs justify-start"
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  அழிக்கவும் (Clear Form)
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const parsePlanUnits = (plan: string): number => {
    if (!plan) return 1
    const nums = plan.match(/\d+/g)
    if (!nums) return 1
    return nums.map((n) => Number.parseInt(n, 10)).reduce((a, b) => a + b, 0)
  }
  

  return (
    <div className="min-h-screen bg-background p-4">
      <CookiesPanel />
      <form
        className="max-w-7xl mx-auto space-y-8"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            const tag = (e.target as HTMLElement)?.tagName?.toLowerCase()
            if (tag !== "textarea") e.preventDefault()
          }
        }}
      >
        <Card className="border-2 border-primary shadow-lg">
          <CardHeader className="text-center bg-primary text-primary-foreground">
            <CardTitle className="text-3xl font-bold">விவசாயி பதிவு படிவம் (Farmer Registration Form)</CardTitle>
          </CardHeader>
        </Card>

        <UserInformation
          formData={formData}
          handleChange={handleChange as any}
          handleUserPhotoChange={handleUserPhotoChange}
          shareAmountError={shareAmountError}
          farmerType={farmerType}
          getExpectedShareAmount={getExpectedShareAmount}
          onSearchUser={searchUser}
          isSearching={isSearching}
          userFound={userFound}
          onClearForm={clearForm}
          notify={notify}
        />

        <LandDetails
          formData={formData}
          handleChange={handleChange as any}
          visibleLandIndex={visibleLandIndex}
          totalLandArea={totalLandArea}
          farmerType={farmerType}
        />

        <LoanTypes formData={formData} setFormData={setFormData} handleChange={handleChange as any} />

        {/* KCC */}
        {formData.checkboxes.kcc && (
          <>
            <CropDetails
              selectedCrops={selectedCrops}
              setSelectedCrops={setSelectedCrops}
              cropData={cropData}
              totalLandArea={totalLandArea}
              totalSelectedAcres={totalSelectedAcres}
              totalEligibleAmount={totalEligibleAmount}
              formData={formData}
              eligibilityError={eligibilityError}
              notify={notify}
              surveyNumbers={surveyNumbers}
            />
            {selectedCrops.length > 0 && (
              <>
                <Card className="border-2 border-primary shadow-lg">
                  <CardHeader className="bg-primary text-primary-foreground">
                    <CardTitle className="text-xl font-bold">பிணையம் வகை (Guarantee Type)</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex flex-col space-y-3">
                        <label className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="guarantee_type"
                            value="friend"
                            checked={formData.guarantee_type === "friend"}
                            onChange={handleChange}
                            className="w-4 h-4 text-primary"
                          />
                          <span className="text-lg font-medium">நபர் பிணையம் (Friend Guarantee)</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="guarantee_type"
                            value="gold"
                            checked={formData.guarantee_type === "gold"}
                            onChange={handleChange}
                            className="w-4 h-4 text-primary"
                          />
                          <span className="text-lg font-medium">தங்க விவரங்கள் (Gold Details)</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="guarantee_type"
                            value="property"
                            checked={formData.guarantee_type === "property"}
                            onChange={handleChange}
                            className="w-4 h-4 text-primary"
                          />
                          <span className="text-lg font-medium">சொத்து விவரங்கள் (Own Property Details)</span>
                        </label>
                      </div>
                    </div>
                  </CardContent>
                </Card>

            {formData.guarantee_type === "friend" && (
  <FriendDetails
    friendData={friendData}  // Changed from friendDetails to friendData
    setFriendData={setFriendData}
    formData={formData}
    handleFriendImageChange={handleFriendPhotoChange}
    onSearchFriend={searchFriendByUNumber}
    notify={notify}
  />

                )}
                {formData.guarantee_type === "gold" && (
                  <GoldDetails goldItems={goldItems} setGoldItems={setGoldItems} goldData={goldData} notify={notify} />
                )}
                {formData.guarantee_type === "property" && (
                  <OwnProperty propertyData={propertyData} setPropertyData={setPropertyData} />
                )}
              </>
            )}
          </>
        )}

        {/* KCCAH */}
        {formData.checkboxes.kccah && (
  <>
    <Card className="border-2 border-primary/20 shadow-lg">
      <CardHeader className="bg-orange-50">
        <CardTitle className="text-xl text-orange-700">KCCAH கடன் வகை (KCCAH Loan Type)</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-6">
          <label className="block font-semibold mb-3 text-foreground">கடன் வகை தேர்வு (Select Loan Type)</label>
          <Select
            onValueChange={(value) => {
              const selected = kccahData.find((loan) => loan.id.toString() === value)
              if (selected) {
                const units = parsePlanUnits(selected.திட்ட_அளவு)
                // FIX: Calculate both cash and seed components per unit
                const cashPerUnit = selected.ரொக்கம்
                const seedPerUnit = selected.விதை
                const totalAmount = (cashPerUnit + seedPerUnit) * units
               
                setSelectedKccahLoan({
                  ...selected,
                  dynamicPlan: selected.திட்ட_அளவு,
                  cashPerUnit: cashPerUnit,  // Store per unit values
                  seedPerUnit: seedPerUnit,
                  dynamicUnits: units,
                  dynamicTotal: totalAmount,
                  breakdown: {
                    perUnit: { 
                      ரொக்கம்: cashPerUnit, 
                      விதை: seedPerUnit,
                      மொத்தம்: cashPerUnit + seedPerUnit
                    },
                    total: { 
                      ரொக்கம்: cashPerUnit * units, 
                      விதை: seedPerUnit * units, 
                      மொத்தம்: totalAmount 
                    },
                  },
                })
                setFormData((prev) => ({ ...prev, principle_amount: totalAmount.toString() }))
                notify("KCCAH தேர்வு", `${selected.கடன்_வகை} - Units: ${units}`, "info")
              }
            }}
          >
            <SelectTrigger className="max-w-md border-primary/20">
              <SelectValue placeholder="கடன் வகையை தேர்ந்தெடுக்கவும்" />
            </SelectTrigger>
            <SelectContent>
              {kccahData.map((loan) => (
                <SelectItem key={loan.id} value={loan.id.toString()}>
                  {loan.கடன்_வகை} - ₹{loan.மொத்தம்.toLocaleString()} ({loan.திட்ட_அளவு})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedKccahLoan && (
          <div className="p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
            <h3 className="text-lg font-semibold text-orange-800 mb-3">தேர்ந்தெடுக்கப்பட்ட கடன் விவரங்கள்</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-sm text-orange-600">கடன் வகை</div>
                <div className="font-semibold text-orange-800">{selectedKccahLoan.கடன்_வகை}</div>
              </div>
              <div>
                <div className="text-sm text-orange-600">ரொக்கம்/அலகு</div>
                <div className="font-semibold text-orange-800">₹{selectedKccahLoan.cashPerUnit.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-orange-600">விதை/அலகு</div>
                <div className="font-semibold text-orange-800">₹{selectedKccahLoan.seedPerUnit.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-orange-600">மொத்தம்/அலகு</div>
                <div className="font-semibold text-orange-700">
                  ₹{(selectedKccahLoan.cashPerUnit + selectedKccahLoan.seedPerUnit).toLocaleString()}
                </div>
              </div>
            </div>
            
            {/* Unit input field */}
            <div className="mt-4">
              <label className="text-sm text-orange-600">திட்ட அளவு (Units)</label>
              <Input
                type="number"
                min={1}
                className="mt-1 max-w-sm"
                value={selectedKccahLoan.dynamicUnits}
                onChange={(e) => {
                  const newUnits = parseInt(e.target.value) || 1
                  const cashPerUnit = selectedKccahLoan.cashPerUnit
                  const seedPerUnit = selectedKccahLoan.seedPerUnit
                  const newTotal = (cashPerUnit + seedPerUnit) * newUnits
                  
                  const updatedLoan = {
                    ...selectedKccahLoan,
                    dynamicUnits: newUnits,
                    dynamicTotal: newTotal,
                    breakdown: {
                      perUnit: { 
                        ரொக்கம்: cashPerUnit, 
                        விதை: seedPerUnit,
                        மொத்தம்: cashPerUnit + seedPerUnit
                      },
                      total: {
                        ரொக்கம்: cashPerUnit * newUnits,
                        விதை: seedPerUnit * newUnits,
                        மொத்தம்: newTotal,
                      },
                    },
                  }
                  setSelectedKccahLoan(updatedLoan)
                  setFormData((prev) => ({ ...prev, principle_amount: newTotal.toString() }))
                  notify(
                    "திட்ட அளவு மாற்றப்பட்டது",
                    `Units: ${newUnits}, Total: ₹${newTotal.toLocaleString()}`,
                    "info",
                  )
                }}
              />
            </div>
            
            {selectedKccahLoan?.breakdown && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="p-3 rounded border bg-white">
                  <div className="font-semibold mb-2">Per-Unit (அலகுக்கு)</div>
                  <div>ரொக்கம்: ₹{selectedKccahLoan.breakdown.perUnit.ரொக்கம்.toLocaleString()}</div>
                  <div>விதை: ₹{selectedKccahLoan.breakdown.perUnit.விதை.toLocaleString()}</div>
                  <div>மொத்தம்: ₹{selectedKccahLoan.breakdown.perUnit.மொத்தம்.toLocaleString()}</div>
                </div>
                <div className="p-3 rounded border bg-white">
                  <div className="font-semibold mb-2">Total (Units: {selectedKccahLoan.dynamicUnits})</div>
                  <div>ரொக்கம்: ₹{selectedKccahLoan.breakdown.total.ரொக்கம்.toLocaleString()}</div>
                  <div>விதை: ₹{selectedKccahLoan.breakdown.total.விதை.toLocaleString()}</div>
                  <div className="font-bold">
                    மொத்தம்: ₹{selectedKccahLoan.breakdown.total.மொத்தம்.toLocaleString()}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-secondary/50 p-4 rounded-lg border-2 border-primary/20">
            <div className="text-lg font-semibold text-foreground">Total Eligible Amount</div>
            <div className="text-2xl font-bold text-foreground">
              ₹{selectedKccahLoan?.breakdown?.total?.மொத்தம்
                ? selectedKccahLoan.breakdown.total.மொத்தம்.toLocaleString()
                : "0"}
            </div>
            <div className="text-sm text-muted-foreground">Based on selected KCCAH</div>
          </div>

          <div className="bg-secondary/50 p-4 rounded-lg border-2 border-primary/20">
            <div className="text-lg font-semibold text-foreground">Principle Amount</div>
            <div className="text-2xl font-bold text-foreground">
              {selectedKccahLoan?.breakdown?.total?.மொத்தம்
                ? `₹${selectedKccahLoan.breakdown.total.மொத்தம்.toLocaleString()}`
                : "Not selected"}
            </div>
            <div className="text-sm text-muted-foreground">Loan amount</div>
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Rest of your code remains the same */}
    {selectedKccahLoan && (
      <>
        <Card className="border-2 border-primary shadow-lg">
          <CardHeader className="bg-primary text-primary-foreground">
            <CardTitle className="text-xl font-bold">பிணையம் வகை (Guarantee Type)</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex flex-col space-y-3">
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="guarantee_type"
                    value="friend"
                    checked={formData.guarantee_type === "friend"}
                    onChange={handleChange}
                    className="w-4 h-4 text-primary"
                  />
                  <span className="text-lg font-medium">நபர் பிணையம் (Friend Guarantee)</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="guarantee_type"
                    value="gold"
                    checked={formData.guarantee_type === "gold"}
                    onChange={handleChange}
                    className="w-4 h-4 text-primary"
                  />
                  <span className="text-lg font-medium">தங்க விவரங்கள் (Gold Details)</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="guarantee_type"
                    value="property"
                    checked={formData.guarantee_type === "property"}
                    onChange={handleChange}
                    className="w-4 h-4 text-primary"
                  />
                  <span className="text-lg font-medium">சொத்து விவரங்கள் (Own Property Details)</span>
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

    {formData.guarantee_type === "friend" && (
  <FriendDetails
    friendData={friendData}  // Changed from friendDetails to friendData
    setFriendData={setFriendData}
    formData={formData}
    handleFriendImageChange={handleFriendPhotoChange}
    onSearchFriend={searchFriendByUNumber}
    notify={notify}
  />

                )}
        {formData.guarantee_type === "gold" && (
          <GoldDetails goldItems={goldItems} setGoldItems={setGoldItems} goldData={goldData} notify={notify} />
        )}
        {formData.guarantee_type === "property" && (
          <OwnProperty propertyData={propertyData} setPropertyData={setPropertyData} />
        )}
      </>
    )}
  </>
)}
        <DocumentUpload
          formData={formData}
          handleAadhaarChange={handleAadhaarChange}
          handleRationChange={handleRationChange}
          handlePanChange={handlePanChange}
          handleVoterDocumentChange={handleVoterDocumentChange}
        />

        <Card className="border-2 border-primary shadow-lg">
          <CardContent className="p-6 text-center">
            <Button
              type="button"
              size="lg"
              onClick={(e) => handleSubmit(e, userFound ? true : false)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3"
             
            >
          
              <UserPlus className="h-5 w-5 mr-2" />
              சமர்ப்பிக்கவும் (Submit Registration)
            </Button>
            {userFound && (
              <div className="flex gap-4 justify-center mt-4">
                <Button
                  type="button"
                  onClick={(e) => handleSubmit(e, true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                
                  //disabled={totalSelectedAcres > totalLandArea || !!eligibilityError || !!shareAmountError}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  புதுப்பிக்கவும் (Update)
                </Button>
              
              </div>
            )}
          </CardContent>
        </Card>
        {inlineNotice && (
          <div
            className={`fixed bottom-4 right-4 z-50 px-4 py-3 rounded shadow-lg border
  ${
    inlineNotice.variant === "success"
      ? "bg-green-50 border-green-300 text-green-800"
      : inlineNotice.variant === "destructive"
        ? "bg-red-50 border-red-300 text-red-800"
        : inlineNotice.variant === "info"
          ? "bg-blue-50 border-blue-300 text-blue-800"
          : "bg-gray-50 border-gray-300 text-gray-800"
  }`}
          >
            <div className="font-semibold">{inlineNotice.title}</div>
            {inlineNotice.description && <div className="text-sm">{inlineNotice.description}</div>}
          </div>
        )}
      </form>
    </div>
  )
}
function getSurveyNumbersFromLandDetails(formData: FormDataType): string[] {
  // Collect all survey numbers from the formData (keys: நிலம்{n}_சர்வே_எண்)
  return Array.from({ length: 20 }, (_, i) => {
    const key = `நிலம்${i + 1}_சர்வே_எண்` as keyof FormDataType
    const value = (formData[key] as string) || ""
    return value.trim()
  }).filter(Boolean)
}

