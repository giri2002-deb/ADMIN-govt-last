
import React, { useRef, useState, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Plus, Download, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Define the Slip type
type Slip = {
  id: string;
  date: string;
  number: string;
  code: string;
  name: string;
  phone: string;
  account: string;
  amount: string;
  selected: boolean;
};

type SlipField = keyof Omit<Slip, 'id' | 'selected'>;

export default function TamilReceiptBuilder() {
  const { toast } = useToast();

  // State for API data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Convert JSON data to slips format
  const convertJsonToSlips = (jsonData: any): Slip[] => {
    if (!jsonData.kccData?.members) return [];
    
    return jsonData.kccData.members.map((member: any, index: number) => ({
      id: member.id || `slip-${index + 1}`,
      date: member.date ? new Date(member.date).toLocaleDateString('en-GB').replace(/\//g, '.') : "21.7.2025",
      number: member.friendDetails?.uNumber || member.serialNo || `60${30 + index}`,
      code: member.classification || "22",
      name: member.memberName || `உறுப்பினர் ${index + 1}`,
      phone: member.friendDetails?.phone || member.aadhaarNo || "7743570210",
      account: member.accountNo || `733 808 39${index}`,
      amount: member.amount ? member.amount.toFixed(2) : "0.00",
      selected: true,
    }));
  };

  // Initialize slips - will be populated by API
  const [slips, setSlips] = useState<Slip[]>([]);
console.log(slips)
  const [currentPage, setCurrentPage] = useState(0);
  const slipsPerPage = 4;

  const slipRef = useRef<HTMLDivElement>(null);
const API_URL = process.env.NEXT_PUBLIC_API_URL;
  // Fetch data from API
  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`${API_URL}/api/kccahdata`)
        if (!response.ok) throw new Error(`Failed to fetch data: ${response.statusText}`)
        const jsonData = await response.json()

        const newSlips = convertJsonToSlips(jsonData);
        setSlips(newSlips);
        setCurrentPage(0);
        
        toast({
          title: "API தரவு ஏற்றப்பட்டது",
          description: `${newSlips.length} ஸ்லிப்கள் API இலிருந்து ஏற்றப்பட்டது.`,
        });
      } catch (err: any) {
        setError(err.message || "Unknown error")
        toast({
          title: "API பிழை",
          description: "API இலிருந்து தரவு பெறுவதில் பிழை ஏற்பட்டது.",
          variant: "destructive",
        });
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Add new slip
  const addSlip = () => {
    const newSlip: Slip = {
      id: `slip-${Date.now()}`,
      date: "21.7.2025",
      number: `60${Math.floor(Math.random() * 100)}`,
      code: "22",
      name: "புதிய உறுப்பினர்",
      phone: "7743570210",
      account: "733 808 390",
      amount: "29455.00",
      selected: true,
    };
    setSlips([...slips, newSlip]);
    toast({
      title: "புதிய ஸ்லிப் சேர்க்கப்பட்டது",
      description: "புதிய ரசீது ஸ்லிப் வெற்றிகரமாக சேர்க்கப்பட்டது.",
    });
  };

  // Remove slip
  const removeSlip = (id: string) => {
    if (slips.length > 1) {
      setSlips(slips.filter(slip => slip.id !== id));
      toast({
        title: "ஸ்லிப் நீக்கப்பட்டது",
        description: "ரசீது ஸ்லிப் வெற்றிகரமாக நீக்கப்பட்டது.",
      });
    }
  };

  // Update slip field
  const updateSlip = (id: string, key: SlipField, value: string) => {
    const updatedSlips = slips.map(slip =>
      slip.id === id ? { ...slip, [key]: value } : slip
    );
    setSlips(updatedSlips);
  };

  // Toggle slip selection
  const toggleSlipSelection = (id: string) => {
    const updatedSlips = slips.map(slip =>
      slip.id === id ? { ...slip, selected: !slip.selected } : slip
    );
    setSlips(updatedSlips);
  };

  // Select all or none
  const toggleSelectAll = () => {
    const allSelected = slips.every(slip => slip.selected);
    const updatedSlips = slips.map(slip => ({ ...slip, selected: !allSelected }));
    setSlips(updatedSlips);
  };

  // PDF generation function - generates all pages
  const handleDownload = async () => {
    const selectedSlips = slips.filter(slip => slip.selected);
    
    if (selectedSlips.length === 0) {
      toast({
        title: "பிழை",
        description: "PDF பதிவிறக்க குறைந்தது ஒரு ஸ்லிப்பை தேர்ந்தெடுக்கவும்.",
        variant: "destructive",
      });
      return;
    }

    const element = slipRef.current;
    if (!element) return;
 
    try {
      // Calculate total pages needed
      const totalPages = Math.ceil(selectedSlips.length / slipsPerPage);
      const pdf = new jsPDF("l", "mm", "a4");
      
      // Store current page to restore later
      const originalPage = currentPage;
      
      for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
        // Set current page to capture
        setCurrentPage(pageIndex);
        
        // Wait for state update and re-render
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Capture current page
        const canvas = await html2canvas(element, { 
          scale: 2,
          useCORS: true,
          allowTaint: true 
        });
        
        const imgData = canvas.toDataURL("image/png");
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        // Add new page if not first page
        if (pageIndex > 0) {
          pdf.addPage();
        }
        
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      }
      
      // Restore original page
      setCurrentPage(originalPage);
      
      pdf.save("Tamil-Receipt-Slips.pdf");
      
      toast({
        title: "வெற்றி!",
        description: `${selectedSlips.length} ஸ்லிப்கள் ${totalPages} பக்கங்களில் PDF ஆக பதிவிறக்கப்பட்டது.`,
      });
    } catch (error) {
      toast({
        title: "பிழை",
        description: "PDF உருவாக்குவதில் பிழை ஏற்பட்டது.",
        variant: "destructive",
      });
    }
  };

  const selectedSlips = slips.filter(slip => slip.selected);
  const totalPages = Math.ceil(selectedSlips.length / slipsPerPage);
  const currentSlips = selectedSlips.slice(currentPage * slipsPerPage, (currentPage + 1) * slipsPerPage);

  // Load JSON data function (you can replace this with actual JSON import)
  const loadJsonData = (jsonData: any) => {
    const newSlips = convertJsonToSlips(jsonData);
    setSlips(newSlips);
    setCurrentPage(0);
    toast({
      title: "JSON தரவு ஏற்றப்பட்டது",
      description: `${newSlips.length} ஸ்லிப்கள் JSON இலிருந்து ஏற்றப்பட்டது.`,
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-receipt-primary text-2xl font-bold">
              தமிழ் ரசீது ஸ்லிப் உருவாக்கி
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Controls */}
      <Card>
  <CardContent className="pt-6">
    <div className="flex flex-wrap gap-4 items-center justify-between">
      <div className="flex gap-4 items-center">
        <Button
          onClick={addSlip}
          variant="default"
          className="bg-black text-white hover:bg-black/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          புதிய ஸ்லிப் சேர்க்க
        </Button>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="select-all"
            checked={slips.length > 0 && slips.every(slip => slip.selected)}
            onCheckedChange={toggleSelectAll}
          />
          <Label htmlFor="select-all" className="text-sm font-medium">
            அனைத்தையும் தேர்ந்தெடு ({slips.length})
          </Label>
        </div>
      </div>

      <div className="flex gap-2 items-center">
        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              variant="outline"
              size="sm"
              className="bg-black text-white hover:bg-black/90"
            >
              முந்தைய
            </Button>
            <span className="text-sm">
              பக்கம் {currentPage + 1} / {totalPages}
            </span>
            <Button
              onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
              disabled={currentPage === totalPages - 1}
              variant="outline"
              size="sm"
              className="bg-black text-white hover:bg-black/90"
            >
              அடுத்த
            </Button>
          </div>
        )}

        <Button
          onClick={handleDownload}
          variant="default"
          className="bg-black text-white hover:bg-black/90"
          disabled={selectedSlips.length === 0}
        >
          <Download className="w-4 h-4 mr-2" />
          PDF பதிவிறக்கு ({selectedSlips.length})
        </Button>
      </div>
    </div>
  </CardContent>
</Card>

        {/* Slip Editor */}
        <Card>
          <CardHeader>
            <CardTitle>ஸ்லிப் விவரங்களை திருத்தவும்</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {slips.map((slip, index) => (
              <div key={slip.id} className="p-4 border rounded-lg bg-card space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      checked={slip.selected}
                      onCheckedChange={() => toggleSlipSelection(slip.id)}
                    />
                    <Label className="font-semibold">ஸ்லிப் #{index + 1}</Label>
                  </div>
                  <Button
                    onClick={() => removeSlip(slip.id)}
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    disabled={slips.length <= 1}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor={`date-${slip.id}`}>தேதி</Label>
                    <Input
                      id={`date-${slip.id}`}
                      value={slip.date}
                      onChange={(e) => updateSlip(slip.id, 'date', e.target.value)}
                      placeholder="21.7.2025"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`number-${slip.id}`}>உ. எண்</Label>
                    <Input
                      id={`number-${slip.id}`}
                      value={slip.number}
                      onChange={(e) => updateSlip(slip.id, 'number', e.target.value)}
                      placeholder="6030"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`code-${slip.id}`}>குறியீடு</Label>
                    <Input
                      id={`code-${slip.id}`}
                      value={slip.code}
                      onChange={(e) => updateSlip(slip.id, 'code', e.target.value)}
                      placeholder="22"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`phone-${slip.id}`}>தொலைபேசி</Label>
                    <Input
                      id={`phone-${slip.id}`}
                      value={slip.phone}
                      onChange={(e) => updateSlip(slip.id, 'phone', e.target.value)}
                      placeholder="7743570210"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`name-${slip.id}`}>பெயர்</Label>
                    <Input
                      id={`name-${slip.id}`}
                      value={slip.name}
                      onChange={(e) => updateSlip(slip.id, 'name', e.target.value)}
                      placeholder="நடேசன்"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`account-${slip.id}`}>கணக்கு எண்</Label>
                    <Input
                      id={`account-${slip.id}`}
                      value={slip.account}
                      onChange={(e) => updateSlip(slip.id, 'account', e.target.value)}
                      placeholder="733 808 390"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`amount-${slip.id}`}>தொகை</Label>
                    <Input
                      id={`amount-${slip.id}`}
                      value={slip.amount}
                      onChange={(e) => updateSlip(slip.id, 'amount', e.target.value)}
                      placeholder="29455.00"
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* A4 Landscape Preview */}
        <Card>
          <CardHeader>
            <CardTitle>முன்னோட்டம்</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-auto">
              <div
                ref={slipRef}
                className="mx-auto bg-receipt-bg border-2 border-receipt-border"
                style={{
                  width: '1123px', // A4 landscape width
                  height: '794px',  // A4 landscape height
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gridTemplateRows: '1fr 1fr',
                  gap: '8px',
                  padding: '16px'
                }}
              >
                {currentSlips.map((slip, index) => (
                  <div
                    key={slip.id}
                    className="border-2 border-receipt-border bg-receipt-bg p-3 text-xs space-y-2"
                  >
                   <div className="flex justify-between items-center font-bold text-receipt-border">
  <div className="flex-1 text-center">
    S.331, இடங்கனசாலை தொழில்கள் கூட்டுறவு கடன் சங்கம் வரை.
    </div>
  </div>
   <br></br>
                      <br></br>
                       
  <div className="text-right whitespace-nowrap">
    Dt: {slip.date}
  </div>


                      <br></br>
                      <br></br>
                    <table className="w-full border border-receipt-border text-xs">
                      <tbody>
                        <tr>
                          <td className="border border-receipt-border p-1 bg-receipt-accent font-medium">உ. எண்</td>
                          <td className="border border-receipt-border p-1">{slip.number}</td>
                          <td className="border border-receipt-border p-1">{index+1}</td>
                        </tr>
                        <tr>
                          <td className="border border-receipt-border p-1 bg-receipt-accent font-medium">பெயர்</td>
                          <td className="border border-receipt-border p-1 font-bold">{slip.name}</td>
                          <td className="border border-receipt-border p-1">{slip.phone}</td>
                        </tr>
                        <tr>
                          <td className="border border-receipt-border p-1 bg-receipt-accent font-medium">DCCB A/C No</td>
                          <td className="border border-receipt-border p-1 font-bold">{slip.account}</td>
                          <td className="border border-receipt-border p-1"></td>
                        </tr>
                        <tr>
                          <td className="border border-receipt-border p-1 bg-receipt-accent font-medium">ரொக்க புகுதி</td>
                          <td className="border border-receipt-border p-1">₹.</td>
                          <td className="border border-receipt-border p-1 font-bold text-right text-receipt-primary">
                            {slip.amount}
                          </td>
                        </tr>
                      </tbody>
                    </table>
<br></br>
<br></br>
<br></br>
                   <div className="flex justify-between items-end mt-4">
  <div className="text-[10px]">உறுப்பினர் கையொ.</div>
  <div className="text-center">
    <div className="text-[10px] font-medium">
     
      செயலாளர்
    </div>
    <div className="text-[10px] font-medium">
    
      S.331, இடங்கனசாலை PACCS Ltd.
    </div>
    <div className="text-[8px] text-receipt-primary font-bold">
      brayhs®
    </div>
  </div>
</div>

                  </div>
                ))}
                
                {/* Fill empty slots if less than 4 current slips */}
                {Array.from({ length: Math.max(0, 4 - currentSlips.length) }).map((_, index) => (
                  <div
                    key={`empty-${index}`}
                    className="border-2 border-dashed border-muted bg-muted/20 flex items-center justify-center text-muted-foreground"
                  >
                    <div className="text-center">
                      <div className="text-sm">வெற்று ஸ்லிப்</div>
                      <div className="text-xs">மேலும் ஸ்லிப்கள் தேர்ந்தெடுக்கவும்</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}