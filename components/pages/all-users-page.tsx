
// // "use client"

// // import { useEffect, useState } from "react";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import {
// //   Card,
// //   CardContent,
// //   CardHeader,
// //   CardTitle,
// // } from "@/components/ui/card";
// // import {
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableHead,
// //   TableHeader,
// //   TableRow,
// // } from "@/components/ui/table";
// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from "@/components/ui/select";
// // import { Search, Download } from "lucide-react";
// // import * as XLSX from "xlsx";
// // import { User } from "../../lib/User";

// // export function AllUsersPage() {
// //   const [users, setUsers] = useState<User[]>([]);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [selectedMonth, setSelectedMonth] = useState("all");

// //   useEffect(() => {
// //     const fetchUsers = async () => {
// //       try {
// //         const res = await fetch("http://localhost:5000/api/users");
// //         if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
// //         const data = await res.json();
// //         setUsers(data);
// //       } catch (err) {
// //         console.error("❌ Failed to fetch users:", err);
// //       }
// //     };
// //     fetchUsers();
// //   }, []);

// //   const filteredUsers = users.filter((user) => {
// //     const lowerSearch = searchTerm.toLowerCase();
// //     const matchesSearch =
// //       user.பெயர்?.toLowerCase().includes(lowerSearch) ||
// //       user.தகபெயர்?.toLowerCase().includes(lowerSearch) ||
// //       user.முகவரி?.toLowerCase().includes(lowerSearch) ||
// //       user.கிராமம்?.toLowerCase().includes(lowerSearch) ||
// //       user.வட்டம்?.toLowerCase().includes(lowerSearch) ||
// //       user.கைபேசி_எண்?.toString().includes(lowerSearch) ||
// //       user.ஆதார்_எண்?.toString().includes(lowerSearch) ||
// //       user.வ_எண்?.toLowerCase().includes(lowerSearch) ||
// //       user.உ_எண்?.toLowerCase().includes(lowerSearch) ||
// //       user.vao_சான்றிதழ்_தேதி?.toString().includes(lowerSearch) ||
// //       user.பிறந்த_தேதி?.toString().includes(lowerSearch) ||
// //       user.வாக்காளர்_அட்டை_எண்?.toLowerCase().includes(lowerSearch) ||
// //       user.pan_அட்டை_எண்?.toLowerCase().includes(lowerSearch) ||
// //       user.dccb_sb_கணக்கு_எண்?.toLowerCase().includes(lowerSearch) ||

// //       user.ஜாமீன்_பெயர்?.toLowerCase().includes(lowerSearch) ||
// //       user.ஜாமீன்_ஆதார்_எண்?.toLowerCase().includes(lowerSearch) ||
     
// //       user.தனி_SB_சரிசெய்த_தொகை?.toString().includes(lowerSearch);

// //     const dobMonth = new Date(user.பிறந்த_தேதி).toLocaleString("default", {
// //       month: "long",
// //     });
// //     const matchesMonth =
// //       selectedMonth === "all" ||
// //       dobMonth.toLowerCase() === selectedMonth.toLowerCase();

// //     return matchesSearch && matchesMonth;
// //   });

// //   const exportToExcel = () => {
// //     const cleanedData = filteredUsers.map((user) => ({
// //       ...user,
// //       கைபேசி_எண்: `'${user.கைபேசி_எண்}'`,
// //       ஆதார்_எண்: `'${user.ஆதார்_எண்}'`,
// //       dccb_sb_கணக்கு_எண்: `'${user.dccb_sb_கணக்கு_எண்}'`,
    
// //       society_sb_கணக்கு_எண்: `'${user.society_sb_கணக்கு_எண்}'`,
// //       தனி_SB_சரிசெய்த_தொகை: user.தனி_SB_சரிசெய்த_தொகை,
// //       வாக்காளர்_அட்டை_எண்: `'${user.வாக்காளர்_அட்டை_எண்}'`,
// //       vao_சான்றிதழ்_தேதி: new Date(user.vao_சான்றிதழ்_தேதி).toLocaleDateString("en-GB"),
// //       பிறந்த_தேதி: new Date(user.பிறந்த_தேதி).toLocaleDateString("en-GB"),
// //     }));

// //     const worksheet = XLSX.utils.json_to_sheet(cleanedData);
// //     const workbook = XLSX.utils.book_new();
// //     XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
// //     XLSX.writeFile(workbook, "users.xlsx");
// //   };

// //   return (
// //     <div className="space-y-6">
// //       <div className="flex items-center justify-between">
// //         <div>
// //           <h1 className="text-3xl font-bold text-gray-900">All Users</h1>
// //           <p className="text-gray-600 mt-2">Manage and view all registered users</p>
// //         </div>
// //         <Button
// //           onClick={exportToExcel}
// //           variant="outline"
// //           className="border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent"
// //         >
// //           <Download className="h-4 w-4 mr-2" /> Export
// //         </Button>
// //       </div>

// //       <Card className="border-0 shadow-md">
// //         <CardHeader>
// //           <CardTitle className="text-lg font-semibold text-gray-900">
// //             User Management
// //           </CardTitle>
// //         </CardHeader>
// //         <CardContent>
// //           <div className="flex flex-col sm:flex-row gap-4 mb-6">
// //             <div className="relative flex-1">
// //               <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
// //               <Input
// //                 placeholder="Search users..."
// //                 value={searchTerm}
// //                 onChange={(e) => setSearchTerm(e.target.value)}
// //                 className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
// //               />
// //             </div>
// //             <Select value={selectedMonth} onValueChange={setSelectedMonth}>
// //               <SelectTrigger className="w-full sm:w-48 border-gray-200 focus:border-blue-500 focus:ring-blue-500">
// //                 <SelectValue placeholder="Filter by month" />
// //               </SelectTrigger>
// //               <SelectContent>
// //                 <SelectItem value="all">All Months</SelectItem>
// //                 {[
// //                   "January", "February", "March", "April", "May", "June",
// //                   "July", "August", "September", "October", "November", "December",
// //                 ].map((month) => (
// //                   <SelectItem key={month} value={month.toLowerCase()}>
// //                     {month}
// //                   </SelectItem>
// //                 ))}
// //               </SelectContent>
// //             </Select>
// //           </div>

// //           <div className="rounded-lg border border-gray-200 overflow-x-auto">
// //             <Table>
// //               <TableHeader>
// //                 <TableRow className="bg-gray-50">
// //                   <TableHead>பெயர்</TableHead>
// //                   <TableHead>தகபெயர்</TableHead>
// //                   <TableHead>கைபேசி எண்</TableHead>
// //                   <TableHead>ஆதார் எண்</TableHead>
// //                   <TableHead>பிறந்த தேதி</TableHead>
// //                   <TableHead>வ எண்</TableHead>
// //                   <TableHead>உ எண்</TableHead>
// //                   <TableHead>முகவரி</TableHead>
// //                   <TableHead>கிராமம்</TableHead>
// //                   <TableHead>வட்டம்</TableHead>
// //                   <TableHead>பங்குத் தொகை</TableHead>
// //                   <TableHead>DCCB SB கணக்கு</TableHead>
// //                   <TableHead>Society SB</TableHead>
// //                   <TableHead>PAN</TableHead>
// //                   <TableHead>ரேஷன் வகை</TableHead>
// //                   <TableHead>வாக்காளர் அட்டை</TableHead>
// //                   <TableHead>மொத்த நிலம்</TableHead>
// //                   <TableHead>ஜாமீன் பெயர்</TableHead>
// //                   <TableHead>ஜாமீன் ஆதார்</TableHead>
// //                   <TableHead>ஜாமீன் DCCB கணக்கு</TableHead>
// //                   <TableHead>தனி SB தொகை</TableHead>
// //                 </TableRow>
// //               </TableHeader>
// //               <TableBody>
// //                 {filteredUsers.map((user, i) => (
// //                   <TableRow key={i}>
// //                     <TableCell>{user.பெயர்}</TableCell>
// //                     <TableCell>{user.தகபெயர்}</TableCell>
// //                     <TableCell>{user.கைபேசி_எண்}</TableCell>
// //                     <TableCell>{user.ஆதார்_எண்}</TableCell>
// //                     <TableCell>{user.பிறந்த_தேதி}</TableCell>
// //                     <TableCell>{user.வ_எண்}</TableCell>
// //                     <TableCell>{user.உ_எண்}</TableCell>
// //                     <TableCell>{user.முகவரி}</TableCell>
// //                     <TableCell>{user.கிராமம்}</TableCell>
// //                     <TableCell>{user.வட்டம்}</TableCell>
// //                     <TableCell>{user.பங்குத்_தொகை}</TableCell>
// //                     <TableCell>{user.dccb_sb_கணக்கு_எண்}</TableCell>
// //                     <TableCell>{user.society_sb_கணக்கு_எண்}</TableCell>
// //                     <TableCell>{user.pan_அட்டை_எண்}</TableCell>
// //                     <TableCell>{user.ரேஷன்_அட்டை_வகை}</TableCell>
// //                     <TableCell>{user.வாக்காளர்_அட்டை_எண்}</TableCell>
// //                     <TableCell>{user.மொத்த_நிலம்}</TableCell>
// //                     <TableCell>{user.ஜாமீன்_பெயர் || "-"}</TableCell>
// //                     <TableCell>{user.ஜாமீன்_ஆதார்_எண் || "-"}</TableCell>
                    
// //                     <TableCell>{user.தனி_SB_சரிசெய்த_தொகை ?? "-"}</TableCell>
// //                   </TableRow>
// //                 ))}
// //               </TableBody>
// //             </Table>

// //             {filteredUsers.length === 0 && (
// //               <p className="text-center text-sm text-gray-500 py-4">
// //                 No matching users found.
// //               </p>
// //             )}
// //           </div>
// //         </CardContent>
// //       </Card>
// //     </div>
// //   );
// // }
// "use client"

// import { useEffect, useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Search, Download, Database } from "lucide-react"
// import * as XLSX from "xlsx"

// interface User {
//   வ_எண்?: number
//   உ_எண்?: string
//   பெயர்?: string
//   பிறந்த_தேதி?: string
//   கடன்_வகை?: string
//   தகபெயர்?: string
//   கைபேசி_எண்?: string
//   ஆதார்_எண்?: string
//   முகவரி?: string
//   கிராமம்?: string
//   வட்டம்?: string
//   பங்குத்_தொகை?: number
//   dccb_sb_கணக்கு_எண்?: string
//   society_sb_கணக்கு_எண்?: string
//   pan_அட்டை_எண்?: string
//   ரேஷன்_அட்டை_வகை?: string
//   வாக்காளர்_அட்டை_எண்?: string
//   மொத்த_நிலம்?: string
//   ஜாமீன்_பெயர்?: string
//   ஜாமீன்_ஆதார்_எண்?: string
//   ஜாமீன்_DCCB_கணக்கு?: string
//   தனி_SB_சரிசெய்த_தொகை?: number
//   கடன்_தொகை?: number
//   vao_சான்றிதழ்_தேதி?: string
//   created_at?: string
//   நகை_விவரங்கள்?: string
//   அடமான_நிலம்_விவரங்கள்?: string
// }

// interface RawUserData {
//   id?: string
//   உ_எண்?: string
//   பெயர்?: string
//   ஆதார்_எண்?: string
//   userjson?: any
//   created_at?: string
// }

// const mapUserToKCCMember = (userData: RawUserData, index: number): User => {
//   const userJson = userData.userjson || {}
//   const userInfo = userJson.userInformation || {}
//   const friendInfo = userJson.friendDetails?.detailedInfo || {}
//   const loanDetails = userJson.loanDetails || {}
//   const calculatedFields = userJson.calculatedFields || {}
//   const landDetails = userJson.landDetails || {}
//   const goldDetails = userJson.goldDetails || {}
//   const ownProperty = userJson.ownProperty || {}

//   // Extract loan type from checkboxes
//   let loanType = "KCC" // Default
//   if (userInfo.checkboxes) {
//     if (userInfo.checkboxes.kccah) loanType = "KCCAH"
//     else if (userInfo.checkboxes.kcc) loanType = "KCC"
//     else if (userInfo.checkboxes.jewel) loanType = "JEWEL"
//     else if (userInfo.checkboxes.tractor) loanType = "TRACTOR"
//   }

//   // Extract land details
//   const landParcels = landDetails.landParcels || []
//   const totalLand = landDetails.totalLandArea ? `${landDetails.totalLandArea} ஏக்கர்` : ""

//   // Jewel details (only if goldDetails is true in metadata)
//   let jewelDetails = ""
//   if (userJson.metadata?.formSections?.goldDetails && goldDetails.items?.length > 0) {
//     jewelDetails = `நகை வகை: ${goldDetails.items.length}, மொத்த மதிப்பு: ₹${goldDetails.totalValue?.toLocaleString('en-IN') || 0}`
//   }

//   // Land mortgage details (only if ownProperty is true in metadata)
//   let landMortgageDetails = ""
//   if (userJson.metadata?.formSections?.ownProperty && ownProperty.hasMortgageData) {
//     landMortgageDetails = `அடமான தொகை: ₹${ownProperty.mortgageDetails.mortgageAmount?.toLocaleString('en-IN') || 0}`
//   }

//   return {
//     வ_எண்: index + 1,
//     உ_எண்: userData.உ_எண் || userInfo.உ_எண் || userData.id || "",
//     பெயர்: userData.பெயர் || userInfo.பெயர் || "",
//     பிறந்த_தேதி: userInfo.பிறந்த_தேதி || "",
//     கடன்_வகை: loanType,
//     தகபெயர்: userInfo.தகபெயர் || "",
//     கைபேசி_எண்: userInfo.கைபேசி_எண் || "",
//     ஆதார்_எண்: userData.ஆதார்_எண் || userInfo.ஆதார்_எண் || "",
//     முகவரி: userInfo.முகவரி || "",
//     கிராமம்: userInfo.கிராமம் || "",
//     வட்டம்: userInfo.வட்டம் || "",
//     பங்குத்_தொகை: Number(userInfo.பங்குத்_தொகை) || 0,
//     dccb_sb_கணக்கு_எண்: userInfo.sdccb_sb_கணக்கு_எண் || "",
//     society_sb_கணக்கு_எண்: userInfo.society_sb_கணக்கு_எண் || "",
//     pan_அட்டை_எண்: userInfo.pan_அட்டை_எண் || "",
//     ரேஷன்_அட்டை_வகை: userInfo.ரேஷன்_அட்டை_வகை || "",
//     வாக்காளர்_அட்டை_எண்: userInfo.வாக்காளர்_அட்டை_எண் || "",
//     மொத்த_நிலம்: totalLand,
//     ஜாமீன்_பெயர்: friendInfo.பெயர் || "",
//     ஜாமீன்_ஆதார்_எண்: friendInfo.ஆதார்_எண் || "",
//     ஜாமீன்_DCCB_கணக்கு: friendInfo.உ_எண் || "",
//     தனி_SB_சரிசெய்த_தொகை: 0, // Default value, update if available
//     கடன்_தொகை: calculatedFields.totalEligibleAmount || loanDetails.totalEligibleAmount || 0,
//     vao_சான்றிதழ்_தேதி: "", // Default value, update if available
//     created_at: userData.created_at || new Date().toISOString(),
//     நகை_விவரங்கள்: jewelDetails,
//     அடமான_நிலம்_விவரங்கள்: landMortgageDetails
//   }
// }

// export default function AllUsersPage() {
//   const [users, setUsers] = useState<User[]>([])
//   const [rawUserData, setRawUserData] = useState<RawUserData[]>([])
//   const [isLoading, setIsLoading] = useState(false)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [selectedMonth, setSelectedMonth] = useState("all")

//   const fetchPreviewData = async () => {
//     setIsLoading(true)

//     try {
//       console.log("Attempting to fetch from API...")
//       const response = await fetch("http://localhost:5000/get-all-users")

//       if (!response.ok) {
//         throw new Error(`Server error ${response.status}`)
//       }

//       const data = await response.json()

//       if (!data.success || !Array.isArray(data.users)) {
//         throw new Error("Unexpected server data format")
//       }

//       console.log("Successfully fetched from API")
//       setRawUserData(data.users)

//       const mappedUsers = data.users
//         .map((userData: RawUserData, index: number) => mapUserToKCCMember(userData, index))
//         .sort((a: any, b: any) => {
//           const dateA = new Date(a.created_at || 0).getTime()
//           const dateB = new Date(b.created_at || 0).getTime()
//           return dateB - dateA
//         })
//         .map((user: any, index: any) => ({
//           ...user,
//           வ_எண்: index + 1,
//         }))

//       setUsers(mappedUsers)
//     } catch (error) {
//       console.error("Error fetching data:", error)
//       setUsers([])
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchPreviewData()
//   }, [])

//   const filteredUsers = users.filter((user) => {
//     const lowerSearch = searchTerm.toLowerCase()
//     const matchesSearch =
//       user.பெயர்?.toLowerCase().includes(lowerSearch) ||
//       user.தகபெயர்?.toLowerCase().includes(lowerSearch) ||
//       user.முகவரி?.toLowerCase().includes(lowerSearch) ||
//       user.கிராமம்?.toLowerCase().includes(lowerSearch) ||
//       user.வட்டம்?.toLowerCase().includes(lowerSearch) ||
//       user.கைபேசி_எண்?.toString().includes(lowerSearch) ||
//       user.ஆதார்_எண்?.toString().includes(lowerSearch) ||
//       user.உ_எண்?.toLowerCase().includes(lowerSearch) ||
//       user.கடன்_வகை?.toLowerCase().includes(lowerSearch) ||
//       user.vao_சான்றிதழ்_தேதி?.toString().includes(lowerSearch) ||
//       user.பிறந்த_தேதி?.toString().includes(lowerSearch) ||
//       user.வாக்காளர்_அட்டை_எண்?.toLowerCase().includes(lowerSearch) ||
//       user.pan_அட்டை_எண்?.toLowerCase().includes(lowerSearch) ||
//       user.dccb_sb_கணக்கு_எண்?.toLowerCase().includes(lowerSearch) ||
//       user.society_sb_கணக்கு_எண்?.toLowerCase().includes(lowerSearch) ||
//       user.ஜாமீன்_பெயர்?.toLowerCase().includes(lowerSearch) ||
//       user.ஜாமீன்_ஆதார்_எண்?.toLowerCase().includes(lowerSearch) ||
//       user.ஜாமீன்_DCCB_கணக்கு?.toLowerCase().includes(lowerSearch) ||
//       user.ரேஷன்_அட்டை_வகை?.toLowerCase().includes(lowerSearch) ||
//       user.மொத்த_நிலம்?.toLowerCase().includes(lowerSearch) ||
//       user.தனி_SB_சரிசெய்த_தொகை?.toString().includes(lowerSearch) ||
//       user.கடன்_தொகை?.toString().includes(lowerSearch) ||
//       user.பங்குத்_தொகை?.toString().includes(lowerSearch) ||
//       user.வ_எண்?.toString().includes(lowerSearch) ||
//       user.நகை_விவரங்கள்?.toLowerCase().includes(lowerSearch) ||
//       user.அடமான_நிலம்_விவரங்கள்?.toLowerCase().includes(lowerSearch)

//     const createdMonth = user.created_at
//       ? new Date(user.created_at).toLocaleString("default", {
//           month: "long",
//         })
//       : ""
//     const matchesMonth = selectedMonth === "all" || createdMonth.toLowerCase() === selectedMonth.toLowerCase()

//     return matchesSearch && matchesMonth
//   })

//   const exportToExcel = () => {
//     const cleanedData = filteredUsers.map((user) => ({
//       "வ எண்": user.வ_எண்,
//       "உ எண்": user.உ_எண்,
//       பெயர்: user.பெயர்,
//       "பிறந்த தேதி": user.பிறந்த_தேதி ? new Date(user.பிறந்த_தேதி).toLocaleDateString("en-GB") : "",
//       "கடன் வகை": user.கடன்_வகை,
//       தகபெயர்: user.தகபெயர்,
//       "கைபேசி எண்": `'${user.கைபேசி_எண்}'`,
//       "ஆதார் எண்": `'${user.ஆதார்_எண்}'`,
//       முகவரி: user.முகவரி,
//       கிராமம்: user.கிராமம்,
//       வட்டம்: user.வட்டம்,
//       "பங்குத் தொகை": user.பங்குத்_தொகை,
//       "DCCB SB கணக்கு": `'${user.dccb_sb_கணக்கு_எண்}'`,
//       "Society SB": `'${user.society_sb_கணக்கு_எண்}'`,
//       PAN: user.pan_அட்டை_எண்,
//       "ரேஷன் வகை": user.ரேஷன்_அட்டை_வகை,
//       "வாக்காளர் அட்டை": `'${user.வாக்காளர்_அட்டை_எண்}'`,
//       "மொத்த நிலம்": user.மொத்த_நிலம்,
//       "ஜாமீன் பெயர்": user.ஜாமீன்_பெயர்,
//       "ஜாமீன் ஆதார்": user.ஜாமீன்_ஆதார்_எண்,
//       "ஜாமீன் DCCB கணக்கு": user.ஜாமீன்_DCCB_கணக்கு,
//       "தனி SB தொகை": user.தனி_SB_சரிசெய்த_தொகை,
//       "கடன் தொகை": user.கடன்_தொகை,
//       "நகை விவரங்கள்": user.நகை_விவரங்கள் || "-",
//       "அடமான நிலம் விவரங்கள்": user.அடமான_நிலம்_விவரங்கள் || "-",
//       "VAO சான்றிதழ் தேதி": user.vao_சான்றிதழ்_தேதி ? new Date(user.vao_சான்றிதழ்_தேதி).toLocaleDateString("en-GB") : "",
//       "Created Date": user.created_at ? new Date(user.created_at).toLocaleDateString("en-GB") : "",
//     }))

//     const worksheet = XLSX.utils.json_to_sheet(cleanedData)
//     const workbook = XLSX.utils.book_new()
//     XLSX.utils.book_append_sheet(workbook, worksheet, "All Users Details")

//     const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" })
//     const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })

//     const url = URL.createObjectURL(blob)
//     const link = document.createElement("a")
//     link.href = url
//     link.download = `users_export_${new Date().toISOString().split("T")[0]}.xlsx`
//     document.body.appendChild(link)
//     link.click()
//     document.body.removeChild(link)
//     URL.revokeObjectURL(url)
//   }

//   return (
//     <div className="space-y-6 p-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Tamil User Management System</h1>
//           <p className="text-gray-600 mt-2">Manage and view all registered users with loan details</p>
//         </div>
//         <Button
//           onClick={exportToExcel}
//           variant="outline"
//           className="border-green-200 text-green-600 hover:bg-green-50 bg-transparent"
//         >
//           <Download className="h-4 w-4 mr-2" /> Export All Details
//         </Button>
//       </div>

//       <Card className="border-0 shadow-md">
//         <CardHeader>
//           <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//             <Database className="h-5 w-5" />
//             User Management {isLoading && "(Loading...)"}
//             <span className="text-sm font-normal text-gray-500">
//               ({filteredUsers.length} users - sorted by newest first)
//             </span>
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="flex flex-col sm:flex-row gap-4 mb-6">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
//               <Input
//                 placeholder="Search by any field (name, phone, aadhar, address, loan type, etc.)..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
//               />
//             </div>
//             <Select value={selectedMonth} onValueChange={setSelectedMonth}>
//               <SelectTrigger className="w-full sm:w-48 border-gray-200 focus:border-blue-500 focus:ring-blue-500">
//                 <SelectValue placeholder="Filter by created month" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Months</SelectItem>
//                 {[
//                   "January",
//                   "February",
//                   "March",
//                   "April",
//                   "May",
//                   "June",
//                   "July",
//                   "August",
//                   "September",
//                   "October",
//                   "November",
//                   "December",
//                 ].map((month) => (
//                   <SelectItem key={month} value={month.toLowerCase()}>
//                     {month}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="rounded-lg border border-gray-200 overflow-x-auto">
//             <Table>
//               <TableHeader>
//                 <TableRow className="bg-gray-50">
//                   <TableHead className="font-semibold bg-blue-50">வ எண்</TableHead>
//                   <TableHead className="font-semibold">உ எண்</TableHead>
//                   <TableHead className="font-semibold">பெயர்</TableHead>
//                   <TableHead className="font-semibold">பிறந்த தேதி</TableHead>
//                   <TableHead className="font-semibold bg-orange-50">கடன் வகை</TableHead>
//                   <TableHead>தகபெயர்</TableHead>
//                   <TableHead>கைபேசி எண்</TableHead>
//                   <TableHead>ஆதார் எண்</TableHead>
//                   <TableHead>முகவரி</TableHead>
//                   <TableHead>கிராமம்</TableHead>
//                   <TableHead>வட்டம்</TableHead>
//                   <TableHead>பங்குத் தொகை</TableHead>
//                   <TableHead>DCCB SB கணக்கு</TableHead>
//                   <TableHead>Society SB</TableHead>
//                   <TableHead>PAN</TableHead>
//                   <TableHead>ரேஷன் வகை</TableHead>
//                   <TableHead>வாக்காளர் அட்டை</TableHead>
//                   <TableHead>மொத்த நிலம்</TableHead>
//                   <TableHead>ஜாமீன் பெயர்</TableHead>
//                   <TableHead>ஜாமீன் ஆதார்</TableHead>
//                   <TableHead>ஜாமீன் DCCB கணக்கு</TableHead>
//                   <TableHead>தனி SB தொகை</TableHead>
//                   <TableHead className="bg-green-50 font-semibold text-green-700">கடன் தொகை</TableHead>
//                   <TableHead>நகை விவரங்கள்</TableHead>
//                   <TableHead>அடமான நிலம்</TableHead>
//                   <TableHead className="bg-blue-50 font-semibold">Created Date</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredUsers.map((user, i) => (
//                   <TableRow key={i} className="hover:bg-gray-50">
//                     <TableCell className="font-medium bg-blue-50 text-blue-700">{user.வ_எண்}</TableCell>
//                     <TableCell className="font-medium">{user.உ_எண்}</TableCell>
//                     <TableCell className="font-medium">{user.பெயர்}</TableCell>
//                     <TableCell className="font-medium">{user.பிறந்த_தேதி}</TableCell>
//                     <TableCell className="font-medium bg-orange-50 text-orange-700">{user.கடன்_வகை}</TableCell>
//                     <TableCell>{user.தகபெயர்}</TableCell>
//                     <TableCell>{user.கைபேசி_எண்}</TableCell>
//                     <TableCell>{user.ஆதார்_எண்}</TableCell>
//                     <TableCell>{user.முகவரி}</TableCell>
//                     <TableCell>{user.கிராமம்}</TableCell>
//                     <TableCell>{user.வட்டம்}</TableCell>
//                     <TableCell>{user.பங்குத்_தொகை}</TableCell>
//                     <TableCell>{user.dccb_sb_கணக்கு_எண்}</TableCell>
//                     <TableCell>{user.society_sb_கணக்கு_எண்}</TableCell>
//                     <TableCell>{user.pan_அட்டை_எண்}</TableCell>
//                     <TableCell>{user.ரேஷன்_அட்டை_வகை}</TableCell>
//                     <TableCell>{user.வாக்காளர்_அட்டை_எண்}</TableCell>
//                     <TableCell>{user.மொத்த_நிலம்}</TableCell>
//                     <TableCell>{user.ஜாமீன்_பெயர் || "-"}</TableCell>
//                     <TableCell>{user.ஜாமீன்_ஆதார்_எண் || "-"}</TableCell>
//                     <TableCell>{user.ஜாமீன்_DCCB_கணக்கு || "-"}</TableCell>
//                     <TableCell>{user.தனி_SB_சரிசெய்த_தொகை ?? "-"}</TableCell>
//                     <TableCell className="bg-green-50 font-semibold text-green-700">
//                       ₹{user.கடன்_தொகை?.toLocaleString("en-IN") || "0"}
//                     </TableCell>
//                     <TableCell>{user.நகை_விவரங்கள் || "-"}</TableCell>
//                     <TableCell>{user.அடமான_நிலம்_விவரங்கள் || "-"}</TableCell>
//                     <TableCell className="bg-blue-50 text-sm">
//                       {user.created_at ? new Date(user.created_at).toLocaleDateString("en-IN") : "-"}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>

//             {filteredUsers.length === 0 && (
//               <p className="text-center text-sm text-gray-500 py-8">
//                 {isLoading ? "Loading users..." : "No matching users found."}
//               </p>
//             )}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }
"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download, Database } from "lucide-react"
import * as XLSX from "xlsx"

interface User {
  வ_எண்?: number
  உ_எண்?: string
  பெயர்?: string
  பிறந்த_தேதி?: string
  கடன்_வகை?: string
  தகபெயர்?: string
  கைபேசி_எண்?: string
  ஆதார்_எண்?: string
  முகவரி?: string
  கிராமம்?: string
  வட்டம்?: string
  பங்குத்_தொகை?: number
  dccb_sb_கணக்கு_எண்?: string
  society_sb_கணக்கு_எண்?: string
  pan_அட்டை_எண்?: string
  ரேஷன்_அட்டை_வகை?: string
  வாக்காளர்_அட்டை_எண்?: string
  மொத்த_நிலம்?: string
  ஜாமீன்_பெயர்?: string
  ஜாமீன்_ஆதார்_எண்?: string
  ஜாமீன்_DCCB_கணக்கு?: string
  தனி_SB_சரிசெய்த_தொகை?: number
  கடன்_தொகை?: number
  vao_சான்றிதழ்_தேதி?: string
  created_at?: string
  நகை?: string
  நிலம்?: string
}

interface RawUserData {
  id?: string
  உ_எண்?: string
  பெயர்?: string
  ஆதார்_எண்?: string
  userjson?: any
  created_at?: string
}

const mapUserToKCCMember = (userData: RawUserData, index: number): User => {
  const userJson = userData.userjson || {}
  const userInfo = userJson.userInformation || {}
  const friendInfo = userJson.friendDetails?.detailedInfo || {}
  const loanDetails = userJson.loanDetails || {}
  const calculatedFields = userJson.calculatedFields || {}
  const landDetails = userJson.landDetails || {}
  const goldDetails = userJson.goldDetails || {}
  const ownProperty = userJson.ownProperty || {}

  // Extract loan type from checkboxes
  let loanType = "KCC" // Default
  if (userInfo.checkboxes) {
    if (userInfo.checkboxes.kccah) loanType = "KCCAH"
    else if (userInfo.checkboxes.kcc) loanType = "KCC"
    else if (userInfo.checkboxes.jewel) loanType = "JEWEL"
    else if (userInfo.checkboxes.tractor) loanType = "TRACTOR"
  }

  // Extract land details
  const landParcels = landDetails.landParcels || []
  const totalLand = landDetails.totalLandArea ? `${landDetails.totalLandArea} ஏக்கர்` : ""

  const user: User = {
    வ_எண்: index + 1,
    உ_எண்: userData.உ_எண் || userInfo.உ_எண் || userData.id || "",
    பெயர்: userData.பெயர் || userInfo.பெயர் || "",
    பிறந்த_தேதி: userInfo.பிறந்த_தேதி || "",
    கடன்_வகை: loanType,
    தகபெயர்: userInfo.தகபெயர் || "",
    கைபேசி_எண்: userInfo.கைபேசி_எண் || "",
    ஆதார்_எண்: userData.ஆதார்_எண் || userInfo.ஆதார்_எண் || "",
    முகவரி: userInfo.முகவரி || "",
    கிராமம்: userInfo.கிராமம் || "",
    வட்டம்: userInfo.வட்டம் || "",
    பங்குத்_தொகை: Number(userInfo.பங்குத்_தொகை) || 0,
    dccb_sb_கணக்கு_எண்: userInfo.sdccb_sb_கணக்கு_எண் || "",
    society_sb_கணக்கு_எண்: userInfo.society_sb_கணக்கு_எண் || "",
    pan_அட்டை_எண்: userInfo.pan_அட்டை_எண் || "",
    ரேஷன்_அட்டை_வகை: userInfo.ரேஷன்_அட்டை_வகை || "",
    வாக்காளர்_அட்டை_எண்: userInfo.வாக்காளர்_அட்டை_எண் || "",
    மொத்த_நிலம்: totalLand,
    ஜாமீன்_பெயர்: friendInfo.பெயர் || "",
    ஜாமீன்_ஆதார்_எண்: friendInfo.ஆதார்_எண் || "",
    ஜாமீன்_DCCB_கணக்கு: friendInfo.உ_எண் || "",
    தனி_SB_சரிசெய்த_தொகை: 0,
    கடன்_தொகை: calculatedFields.totalEligibleAmount || loanDetails.totalEligibleAmount || 0,
    vao_சான்றிதழ்_தேதி: "",
    created_at: userData.created_at || new Date().toISOString()
  }

  // Only add jewel indicator if goldDetails is true in metadata
  if (userJson.metadata?.formSections?.goldDetails) {
    user.நகை = "JL"
  }

  // Only add land mortgage indicator if ownProperty is true in metadata
  if (userJson.metadata?.formSections?.ownProperty) {
    user.நிலம் = "OP"
  }

  return user
}

export default function AllUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [rawUserData, setRawUserData] = useState<RawUserData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMonth, setSelectedMonth] = useState("all")
 const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const fetchPreviewData = async () => {
    setIsLoading(true)

    try {
      console.log("Attempting to fetch from API...")
      const response = await fetch(`${API_URL}/get-all-users`)

      if (!response.ok) {
        throw new Error(`Server error ${response.status}`)
      }

      const data = await response.json()

      if (!data.success || !Array.isArray(data.users)) {
        throw new Error("Unexpected server data format")
      }

      console.log("Successfully fetched from API")
      setRawUserData(data.users)

      const mappedUsers = data.users
        .map((userData: RawUserData, index: number) => mapUserToKCCMember(userData, index))
        .sort((a: any, b: any) => {
          const dateA = new Date(a.created_at || 0).getTime()
          const dateB = new Date(b.created_at || 0).getTime()
          return dateB - dateA
        })
        .map((user: any, index: any) => ({
          ...user,
          வ_எண்: index + 1,
        }))

      setUsers(mappedUsers)
    } catch (error) {
      console.error("Error fetching data:", error)
      setUsers([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPreviewData()
  }, [])

  const filteredUsers = users.filter((user) => {
    const lowerSearch = searchTerm.toLowerCase()
    const matchesSearch =
      user.பெயர்?.toLowerCase().includes(lowerSearch) ||
      user.தகபெயர்?.toLowerCase().includes(lowerSearch) ||
      user.முகவரி?.toLowerCase().includes(lowerSearch) ||
      user.கிராமம்?.toLowerCase().includes(lowerSearch) ||
      user.வட்டம்?.toLowerCase().includes(lowerSearch) ||
      user.கைபேசி_எண்?.toString().includes(lowerSearch) ||
      user.ஆதார்_எண்?.toString().includes(lowerSearch) ||
      user.உ_எண்?.toLowerCase().includes(lowerSearch) ||
      user.கடன்_வகை?.toLowerCase().includes(lowerSearch) ||
      user.vao_சான்றிதழ்_தேதி?.toString().includes(lowerSearch) ||
      user.பிறந்த_தேதி?.toString().includes(lowerSearch) ||
      user.வாக்காளர்_அட்டை_எண்?.toLowerCase().includes(lowerSearch) ||
      user.pan_அட்டை_எண்?.toLowerCase().includes(lowerSearch) ||
      user.dccb_sb_கணக்கு_எண்?.toLowerCase().includes(lowerSearch) ||
      user.society_sb_கணக்கு_எண்?.toLowerCase().includes(lowerSearch) ||
      user.ஜாமீன்_பெயர்?.toLowerCase().includes(lowerSearch) ||
      user.ஜாமீன்_ஆதார்_எண்?.toLowerCase().includes(lowerSearch) ||
      user.ஜாமீன்_DCCB_கணக்கு?.toLowerCase().includes(lowerSearch) ||
      user.ரேஷன்_அட்டை_வகை?.toLowerCase().includes(lowerSearch) ||
      user.மொத்த_நிலம்?.toLowerCase().includes(lowerSearch) ||
      user.தனி_SB_சரிசெய்த_தொகை?.toString().includes(lowerSearch) ||
      user.கடன்_தொகை?.toString().includes(lowerSearch) ||
      user.பங்குத்_தொகை?.toString().includes(lowerSearch) ||
      user.வ_எண்?.toString().includes(lowerSearch) ||
      (user.நகை && user.நகை.toLowerCase().includes(lowerSearch)) ||
      (user.நிலம் && user.நிலம்.toLowerCase().includes(lowerSearch))

    const createdMonth = user.created_at
      ? new Date(user.created_at).toLocaleString("default", {
          month: "long",
        })
      : ""
    const matchesMonth = selectedMonth === "all" || createdMonth.toLowerCase() === selectedMonth.toLowerCase()

    return matchesSearch && matchesMonth
  })

  const exportToExcel = () => {
    const cleanedData = filteredUsers.map((user) => {
      const baseData = {
        "வ எண்": user.வ_எண்,
        "உ எண்": user.உ_எண்,
        பெயர்: user.பெயர்,
        "பிறந்த தேதி": user.பிறந்த_தேதி ? new Date(user.பிறந்த_தேதி).toLocaleDateString("en-GB") : "",
        "கடன் வகை": user.கடன்_வகை,
        தகபெயர்: user.தகபெயர்,
        "கைபேசி எண்": `'${user.கைபேசி_எண்}'`,
        "ஆதார் எண்": `'${user.ஆதார்_எண்}'`,
        முகவரி: user.முகவரி,
        கிராமம்: user.கிராமம்,
        வட்டம்: user.வட்டம்,
        "பங்குத் தொகை": user.பங்குத்_தொகை,
        "DCCB SB கணக்கு": `'${user.dccb_sb_கணக்கு_எண்}'`,
        "Society SB": `'${user.society_sb_கணக்கு_எண்}'`,
        PAN: user.pan_அட்டை_எண்,
        "ரேஷன் வகை": user.ரேஷன்_அட்டை_வகை,
        "வாக்காளர் அட்டை": `'${user.வாக்காளர்_அட்டை_எண்}'`,
        "மொத்த நிலம்": user.மொத்த_நிலம்,
        "ஜாமீன் பெயர்": user.ஜாமீன்_பெயர்,
        "ஜாமீன் ஆதார்": user.ஜாமீன்_ஆதார்_எண்,
        "ஜாமீன் DCCB கணக்கு": user.ஜாமீன்_DCCB_கணக்கு,
        "தனி SB தொகை": user.தனி_SB_சரிசெய்த_தொகை,
        "கடன் தொகை": user.கடன்_தொகை,
        "VAO சான்றிதழ் தேதி": user.vao_சான்றிதழ்_தேதி ? new Date(user.vao_சான்றிதழ்_தேதி).toLocaleDateString("en-GB") : "",
        "Created Date": user.created_at ? new Date(user.created_at).toLocaleDateString("en-GB") : "",
      }

      // Only add these fields if they exist
      if (user.நகை !== undefined) {
        baseData["நகை"] = user.நகை
      }
      if (user.நிலம் !== undefined) {
        baseData["நிலம்"] = user.நிலம்
      }

      return baseData
    })

    const worksheet = XLSX.utils.json_to_sheet(cleanedData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "All Users Details")

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" })
    const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })

    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `users_export_${new Date().toISOString().split("T")[0]}.xlsx`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  // Check if any user has jewel or land mortgage details to show columns
  const showJewelDetails = users.some(user => user.நகை !== undefined)
  const showLandMortgageDetails = users.some(user => user.நிலம் !== undefined)

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tamil User Management System</h1>
          <p className="text-gray-600 mt-2">Manage and view all registered users with loan details</p>
        </div>
        <Button
          onClick={exportToExcel}
          variant="outline"
          className="border-green-200 text-green-600 hover:bg-green-50 bg-transparent"
        >
          <Download className="h-4 w-4 mr-2" /> Export All Details
        </Button>
      </div>

      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Database className="h-5 w-5" />
            User Management {isLoading && "(Loading...)"}
            <span className="text-sm font-normal text-gray-500">
              ({filteredUsers.length} users - sorted by newest first)
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search by any field (name, phone, aadhar, address, loan type, etc.)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-full sm:w-48 border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                <SelectValue placeholder="Filter by created month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Months</SelectItem>
                {[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ].map((month) => (
                  <SelectItem key={month} value={month.toLowerCase()}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-lg border border-gray-200 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold bg-blue-50">வ எண்</TableHead>
                  <TableHead className="font-semibold">உ எண்</TableHead>
                  <TableHead className="font-semibold">பெயர்</TableHead>
                  <TableHead className="font-semibold">பிறந்த தேதி</TableHead>
                  <TableHead className="font-semibold bg-orange-50">கடன் வகை</TableHead>
                  <TableHead>தகபெயர்</TableHead>
                  <TableHead>கைபேசி எண்</TableHead>
                  <TableHead>ஆதார் எண்</TableHead>
                  <TableHead>முகவரி</TableHead>
                  <TableHead>கிராமம்</TableHead>
                  <TableHead>வட்டம்</TableHead>
                  <TableHead>பங்குத் தொகை</TableHead>
                  <TableHead>DCCB SB கணக்கு</TableHead>
                  <TableHead>Society SB</TableHead>
                  <TableHead>PAN</TableHead>
                  <TableHead>ரேஷன் வகை</TableHead>
                  <TableHead>வாக்காளர் அட்டை</TableHead>
                  <TableHead>மொத்த நிலம்</TableHead>
                  <TableHead>ஜாமீன் பெயர்</TableHead>
                  <TableHead>ஜாமீன் ஆதார்</TableHead>
                  <TableHead>ஜாமீன் DCCB கணக்கு</TableHead>
                  <TableHead>தனி SB தொகை</TableHead>
                  <TableHead className="bg-green-50 font-semibold text-green-700">கடன் தொகை</TableHead>
                  {showJewelDetails && <TableHead>நகை</TableHead>}
                  {showLandMortgageDetails && <TableHead>நிலம்</TableHead>}
                  <TableHead className="bg-blue-50 font-semibold">Created Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user, i) => (
                  <TableRow key={i} className="hover:bg-gray-50">
                    <TableCell className="font-medium bg-blue-50 text-blue-700">{user.வ_எண்}</TableCell>
                    <TableCell className="font-medium">{user.உ_எண்}</TableCell>
                    <TableCell className="font-medium">{user.பெயர்}</TableCell>
                    <TableCell className="font-medium">{user.பிறந்த_தேதி}</TableCell>
                    <TableCell className="font-medium bg-orange-50 text-orange-700">{user.கடன்_வகை}</TableCell>
                    <TableCell>{user.தகபெயர்}</TableCell>
                    <TableCell>{user.கைபேசி_எண்}</TableCell>
                    <TableCell>{user.ஆதார்_எண்}</TableCell>
                    <TableCell>{user.முகவரி}</TableCell>
                    <TableCell>{user.கிராமம்}</TableCell>
                    <TableCell>{user.வட்டம்}</TableCell>
                    <TableCell>{user.பங்குத்_தொகை}</TableCell>
                    <TableCell>{user.dccb_sb_கணக்கு_எண்}</TableCell>
                    <TableCell>{user.society_sb_கணக்கு_எண்}</TableCell>
                    <TableCell>{user.pan_அட்டை_எண்}</TableCell>
                    <TableCell>{user.ரேஷன்_அட்டை_வகை}</TableCell>
                    <TableCell>{user.வாக்காளர்_அட்டை_எண்}</TableCell>
                    <TableCell>{user.மொத்த_நிலம்}</TableCell>
                    <TableCell>{user.ஜாமீன்_பெயர் || "-"}</TableCell>
                    <TableCell>{user.ஜாமீன்_ஆதார்_எண் || "-"}</TableCell>
                    <TableCell>{user.ஜாமீன்_DCCB_கணக்கு || "-"}</TableCell>
                    <TableCell>{user.தனி_SB_சரிசெய்த_தொகை ?? "-"}</TableCell>
                    <TableCell className="bg-green-50 font-semibold text-green-700">
                      ₹{user.கடன்_தொகை?.toLocaleString("en-IN") || "0"}
                    </TableCell>
                    {showJewelDetails && <TableCell>{user.நகை || "-"}</TableCell>}
                    {showLandMortgageDetails && <TableCell>{user.நிலம் || "-"}</TableCell>}
                    <TableCell className="bg-blue-50 text-sm">
                      {user.created_at ? new Date(user.created_at).toLocaleDateString("en-IN") : "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredUsers.length === 0 && (
              <p className="text-center text-sm text-gray-500 py-8">
                {isLoading ? "Loading users..." : "No matching users found."}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}