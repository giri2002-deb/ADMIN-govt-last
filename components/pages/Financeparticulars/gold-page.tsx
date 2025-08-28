
// "use client"

// import { useEffect, useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"
// import { Edit, Check, X, Trash2 } from "lucide-react"

// interface ResolutionItem {
//   id: number
//   currentYear: number
//   currentMonth: number
//   resolutionDate: number
//   resuNo: number
//   marketValue: number
// }

// export default function GoldPage() {
//   const [dataState, setDataState] = useState<ResolutionItem[]>([])
//   const [editingId, setEditingId] = useState<number | null>(null)
//   const [editForm, setEditForm] = useState<Partial<ResolutionItem>>({})
//   const [newItem, setNewItem] = useState<Partial<ResolutionItem>>(() => {
//     const now = new Date()
//     return {
//       currentYear: now.getFullYear(),
//       currentMonth: now.getMonth() + 1,
//     }
//   })

//   const API_URL = "http://localhost:5000/api/gold"

//   // Load from backend on mount
//   useEffect(() => {
//     fetch(API_URL)
//       .then((res) => res.json())
//       .then(setDataState)
//       .catch(console.error)
//   }, [])

//   const handleEdit = (item: ResolutionItem) => {
//     setEditingId(item.id)
//     setEditForm({ ...item })
//   }

//   const handleSaveRow = async () => {
//     if (editingId != null) {
//       try {
//         const res = await fetch(`${API_URL}/${editingId}`, {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(editForm),
//         })
//         if (!res.ok) throw new Error("Failed to update record")
//         const updated = await res.json()
//         setDataState((prev) =>
//           prev.map((item) => (item.id === editingId ? updated : item))
//         )
//         setEditingId(null)
//         setEditForm({})
//       } catch (error) {
//         console.error("Update failed", error)
//       }
//     }
//   }

//   const handleCancelEdit = () => {
//     setEditingId(null)
//     setEditForm({})
//   }

//   const handleAdd = async () => {
//     if (
//       newItem.resolutionDate != null &&
//       newItem.resuNo != null &&
//       newItem.marketValue != null
//     ) {
//       const now = new Date()
//       const item = {
//         currentYear: newItem.currentYear || now.getFullYear(),
//         currentMonth: newItem.currentMonth || now.getMonth() + 1,
//         resolutionDate: newItem.resolutionDate,
//         resuNo: newItem.resuNo,
//         marketValue: newItem.marketValue,
//       }

//       try {
//         const res = await fetch(API_URL, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(item),
//         })
//         if (!res.ok) throw new Error("Failed to add record")
//         const newEntry = await res.json()
//         setDataState((prev) => [...prev, newEntry])
//         setNewItem({
//           currentYear: now.getFullYear(),
//           currentMonth: now.getMonth() + 1,
//           resolutionDate: undefined,
//           resuNo: undefined,
//           marketValue: undefined,
//         })
//       } catch (error) {
//         console.error("Add failed", error)
//       }
//     }
//   }

//   const handleDelete = async (id: number) => {
//     try {
//       const res = await fetch(`${API_URL}/${id}`, {
//         method: "DELETE",
//       })
//       if (!res.ok) throw new Error("Failed to delete record")
//       setDataState((prev) => prev.filter((item) => item.id !== id))
//     } catch (error) {
//       console.error("Delete failed", error)
//     }
//   }

//   return (
//     <div className="space-y-6 p-4">
//       {/* Header */}
//       <div className="text-center">
//         <h1 className="text-3xl font-bold text-gray-900">தங்க மதிப்பு தீர்மான பதிவு</h1>
//         <p className="text-gray-600 mt-2">தங்க தீர்மான மதிப்பீடுகளை நிர்வகிக்கவும்</p>
//       </div>

//       {/* Add New Item Card */}
//       <Card className="border-0 shadow-md">
//         <CardHeader>
//           <CardTitle className="text-lg">புதிய பதிவை சேர்க்கவும்</CardTitle>
//         </CardHeader>
//         <CardContent className="grid grid-cols-1 md:grid-cols-6 gap-4">
//           <Input
//             type="number"
//             value={newItem.currentYear || ""}
//             disabled
//             className="bg-gray-100"
//           />
//           <Input
//             type="number"
//             value={newItem.currentMonth || ""}
//             disabled
//             className="bg-gray-100"
//           />
//           <Input
//             placeholder="தீர்மான தேதி"
//             type="number"
//             value={newItem.resolutionDate || ""}
//             onChange={(e) =>
//               setNewItem({ ...newItem, resolutionDate: Number(e.target.value) })
//             }
//           />
//           <Input
//             placeholder="தீர்மான எண்"
//             type="number"
//             value={newItem.resuNo || ""}
//             onChange={(e) =>
//               setNewItem({ ...newItem, resuNo: Number(e.target.value) })
//             }
//           />
//           <Input
//             placeholder="மார்க்கெட் மதிப்பு"
//             type="number"
//             value={newItem.marketValue || ""}
//             onChange={(e) =>
//               setNewItem({ ...newItem, marketValue: Number(e.target.value) })
//             }
//           />
//           <Button
//             onClick={handleAdd}
//             className="bg-green-600 hover:bg-green-700 text-white h-10"
//           >
//             சேர்
//           </Button>
//         </CardContent>
//       </Card>

//       {/* Data Table Card */}
//       <Card className="border-0 shadow-md">
//         <CardHeader>
//           <CardTitle className="text-lg font-semibold">தீர்மான பட்டியல்</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="rounded-lg border border-gray-200 overflow-x-auto">
//             <Table>
//               <TableHeader>
//                 <TableRow className="bg-yellow-50">
//                   <TableHead className="min-w-[100px]">ஆண்டு</TableHead>
//                   <TableHead className="min-w-[100px]">மாதம்</TableHead>
//                   <TableHead className="min-w-[120px]">தேதி</TableHead>
//                   <TableHead className="min-w-[150px]">தீர்மான எண்</TableHead>
//                   <TableHead className="min-w-[150px]">மதிப்பு</TableHead>
//                   <TableHead className="min-w-[150px]">நடவடிக்கைகள்</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {Array.isArray(dataState)
//     ? dataState.map((item) => (
//                   <TableRow
//                     key={item.id}
//                     className={`transition-colors ${
//                       editingId === item.id
//                         ? "bg-blue-50 border-l-4 border-l-blue-500"
//                         : "hover:bg-yellow-50"
//                     }`}
//                   >
//                     <TableCell>
//                       {editingId === item.id ? (
//                         <Input
//                           type="number"
//                           value={editForm.currentYear ?? item.currentYear}
//                           onChange={(e) =>
//                             setEditForm({
//                               ...editForm,
//                               currentYear: Number(e.target.value),
//                             })
//                           }
//                         />
//                       ) : (
//                         <span>{item.currentYear}</span>
//                       )}
//                     </TableCell>
//                     <TableCell>
//                       {editingId === item.id ? (
//                         <Input
//                           type="number"
//                           value={editForm.currentMonth ?? item.currentMonth}
//                           onChange={(e) =>
//                             setEditForm({
//                               ...editForm,
//                               currentMonth: Number(e.target.value),
//                             })
//                           }
//                         />
//                       ) : (
//                         <span>{item.currentMonth}</span>
//                       )}
//                     </TableCell>
//                     <TableCell>
//                       {editingId === item.id ? (
//                         <Input
//                           type="number"
//                           value={editForm.resolutionDate ?? item.resolutionDate}
//                           onChange={(e) =>
//                             setEditForm({
//                               ...editForm,
//                               resolutionDate: Number(e.target.value),
//                             })
//                           }
//                         />
//                       ) : (
//                         <span>{item.resolutionDate}</span>
//                       )}
//                     </TableCell>
//                     <TableCell>
//                       {editingId === item.id ? (
//                         <Input
//                           type="number"
//                           value={editForm.resuNo ?? item.resuNo}
//                           onChange={(e) =>
//                             setEditForm({
//                               ...editForm,
//                               resuNo: Number(e.target.value),
//                             })
//                           }
//                         />
//                       ) : (
//                         <span>{item.resuNo}</span>
//                       )}
//                     </TableCell>
//                     <TableCell>
//                       {editingId === item.id ? (
//                         <Input
//                           type="number"
//                           value={editForm.marketValue ?? item.marketValue}
//                           onChange={(e) =>
//                             setEditForm({
//                               ...editForm,
//                               marketValue: Number(e.target.value),
//                             })
//                           }
//                         />
//                       ) : (
//                         <span>{item.marketValue}</span>
//                       )}
//                     </TableCell>
//                     <TableCell>
//                       {editingId === item.id ? (
//                         <div className="flex gap-2">
//                           <Button
//                             size="sm"
//                             onClick={handleSaveRow}
//                             className="bg-green-600 hover:bg-green-700 text-white"
//                           >
//                             <Check className="h-4 w-4" />
//                           </Button>
//                           <Button
//                             size="sm"
//                             variant="outline"
//                             onClick={handleCancelEdit}
//                           >
//                             <X className="h-4 w-4" />
//                           </Button>
//                         </div>
//                       ) : (
//                         <div className="flex gap-2">
//                           <Button
//                             size="sm"
//                             variant="ghost"
//                             onClick={() => handleEdit(item)}
//                             className="text-blue-600 hover:text-blue-700"
//                           >
//                             <Edit className="h-4 w-4" />
//                           </Button>
//                           <Button
//                             size="sm"
//                             variant="ghost"
//                             onClick={() => handleDelete(item.id)}
//                             className="text-red-600 hover:text-red-700"
//                           >
//                             <Trash2 className="h-4 w-4" />
//                           </Button>
//                         </div>
//                       )}
//                     </TableCell>
//                   </TableRow>
//                 )):null}
//               </TableBody>
//             </Table>
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
import { Edit, Check, X, Trash2 } from "lucide-react"

interface ResolutionItem {
  id: number
  currentYear: number
  currentMonth: number
  resolutionDate: number
  resuNo: number
  marketValue: number
}

const mockData: ResolutionItem[] = [
  {
    id: 1,
    currentYear: 2024,
    currentMonth: 12,
    resolutionDate: 15,
    resuNo: 101,
    marketValue: 75000,
  },
  {
    id: 2,
    currentYear: 2024,
    currentMonth: 11,
    resolutionDate: 20,
    resuNo: 102,
    marketValue: 73500,
  },
]

export default function GoldPage() {
  const [dataState, setDataState] = useState<ResolutionItem[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState<Partial<ResolutionItem>>({})
  const [newItem, setNewItem] = useState<Partial<ResolutionItem>>(() => {
    const now = new Date()
    return {
      currentYear: now.getFullYear(),
      currentMonth: now.getMonth() + 1,
    }
  })
  const [isBackendAvailable, setIsBackendAvailable] = useState(false)
const API_URL1 = process.env.NEXT_PUBLIC_API_URL;
  const API_URL = `${API_URL1}/api/gold`

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (res.ok) {
          setIsBackendAvailable(true)
          return res.json()
        }
        throw new Error("Backend not available")
      })
      .then(setDataState)
      .catch(() => {
        console.log("Backend not available, using mock data")
        setIsBackendAvailable(false)
        setDataState(mockData)
      })
  }, [])

  const handleEdit = (item: ResolutionItem) => {
    setEditingId(item.id)
    setEditForm({ ...item })
  }

  const handleSaveRow = async () => {
    if (editingId != null) {
      if (isBackendAvailable) {
        try {
          const res = await fetch(`${API_URL}/${editingId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editForm),
          })
          if (!res.ok) throw new Error("Failed to update record")
          const updated = await res.json()
          setDataState((prev) => prev.map((item) => (item.id === editingId ? updated : item)))
        } catch (error) {
          console.error("Update failed", error)
        }
      } else {
        setDataState((prev) =>
          prev.map((item) => (item.id === editingId ? ({ ...item, ...editForm } as ResolutionItem) : item)),
        )
      }
      setEditingId(null)
      setEditForm({})
    }
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditForm({})
  }

  const handleAdd = async () => {
    if (newItem.resolutionDate != null && newItem.resuNo != null && newItem.marketValue != null) {
      const now = new Date()
      const item = {
        currentYear: newItem.currentYear || now.getFullYear(),
        currentMonth: newItem.currentMonth || now.getMonth() + 1,
        resolutionDate: newItem.resolutionDate,
        resuNo: newItem.resuNo,
        marketValue: newItem.marketValue,
      }

      if (isBackendAvailable) {
        try {
          const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item),
          })
          if (!res.ok) throw new Error("Failed to add record")
          const newEntry = await res.json()
          setDataState((prev) => [...prev, newEntry])
        } catch (error) {
          console.error("Add failed", error)
        }
      } else {
        const newEntry = { ...item, id: Math.max(...dataState.map((d) => d.id), 0) + 1 } as ResolutionItem
        setDataState((prev) => [...prev, newEntry])
      }

      setNewItem({
        currentYear: now.getFullYear(),
        currentMonth: now.getMonth() + 1,
        resolutionDate: undefined,
        resuNo: undefined,
        marketValue: undefined,
      })
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm("இந்த பதிவை நிச்சயமாக நீக்க விரும்புகிறீர்களா?")) {
      if (isBackendAvailable) {
        try {
          const res = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
          })
          if (!res.ok) throw new Error("Failed to delete record")
          setDataState((prev) => prev.filter((item) => item.id !== id))
        } catch (error) {
          console.error("Delete failed", error)
        }
      } else {
        setDataState((prev) => prev.filter((item) => item.id !== id))
      }
    }
  }

  const handleNumberChange = (value: string, field: keyof ResolutionItem, isEdit = false) => {
    const numValue = value === "" ? undefined : Number(value)
    if (isEdit) {
      setEditForm({ ...editForm, [field]: numValue })
    } else {
      setNewItem({ ...newItem, [field]: numValue })
    }
  }

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">தங்க மதிப்பு தீர்மான பதிவு</h1>
        <p className="text-gray-600 mt-2">தங்க தீர்மான மதிப்பீடுகளை நிர்வகிக்கவும்</p>
        {!isBackendAvailable && (
          <div className="mt-2 p-2 bg-yellow-100 border border-yellow-300 rounded-md">
            <p className="text-sm text-yellow-800">டெமோ மோட்: பேக்எண்ட் சர்வர் கிடைக்கவில்லை. மாற்றங்கள் தற்காலிகமாக சேமிக்கப்படும்.</p>
          </div>
        )}
      </div>

      {/* Add New Item Card */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">புதிய பதிவை சேர்க்கவும்</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <Input type="number" value={newItem.currentYear || ""} disabled className="bg-gray-100" />
          <Input type="number" value={newItem.currentMonth || ""} disabled className="bg-gray-100" />
          <Input
            placeholder="தீர்மான தேதி"
            type="number"
            value={newItem.resolutionDate ?? ""}
            onChange={(e) => handleNumberChange(e.target.value, "resolutionDate")}
          />
          <Input
            placeholder="தீர்மான எண்"
            type="number"
            value={newItem.resuNo ?? ""}
            onChange={(e) => handleNumberChange(e.target.value, "resuNo")}
          />
          <Input
            placeholder="மார்க்கெட் மதிப்பு"
            type="number"
            value={newItem.marketValue ?? ""}
            onChange={(e) => handleNumberChange(e.target.value, "marketValue")}
          />
          <Button onClick={handleAdd} className="bg-green-600 hover:bg-green-700 text-white h-10">
            சேர்
          </Button>
        </CardContent>
      </Card>

      {/* Data Table Card */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">தீர்மான பட்டியல்</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-gray-200 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-yellow-50">
                  <TableHead className="min-w-[100px]">ஆண்டு</TableHead>
                  <TableHead className="min-w-[100px]">மாதம்</TableHead>
                  <TableHead className="min-w-[120px]">தேதி</TableHead>
                  <TableHead className="min-w-[150px]">தீர்மான எண்</TableHead>
                  <TableHead className="min-w-[150px]">மதிப்பு</TableHead>
                  <TableHead className="min-w-[150px]">நடவடிக்கைகள்</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.isArray(dataState)
                  ? dataState.map((item) => (
                      <TableRow
                        key={item.id}
                        className={`transition-colors ${
                          editingId === item.id ? "bg-blue-50 border-l-4 border-l-blue-500" : "hover:bg-yellow-50"
                        }`}
                      >
                        <TableCell>
                          {editingId === item.id ? (
                            <Input
                              type="number"
                              value={editForm.currentYear ?? ""}
                              onChange={(e) => handleNumberChange(e.target.value, "currentYear", true)}
                            />
                          ) : (
                            <span>{item.currentYear}</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {editingId === item.id ? (
                            <Input
                              type="number"
                              value={editForm.currentMonth ?? ""}
                              onChange={(e) => handleNumberChange(e.target.value, "currentMonth", true)}
                            />
                          ) : (
                            <span>{item.currentMonth}</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {editingId === item.id ? (
                            <Input
                              type="number"
                              value={editForm.resolutionDate ?? ""}
                              onChange={(e) => handleNumberChange(e.target.value, "resolutionDate", true)}
                            />
                          ) : (
                            <span>{item.resolutionDate}</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {editingId === item.id ? (
                            <Input
                              type="number"
                              value={editForm.resuNo ?? ""}
                              onChange={(e) => handleNumberChange(e.target.value, "resuNo", true)}
                            />
                          ) : (
                            <span>{item.resuNo}</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {editingId === item.id ? (
                            <Input
                              type="number"
                              value={editForm.marketValue ?? ""}
                              onChange={(e) => handleNumberChange(e.target.value, "marketValue", true)}
                            />
                          ) : (
                            <span>{item.marketValue}</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {editingId === item.id ? (
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={handleSaveRow}
                                className="bg-green-600 hover:bg-green-700 text-white"
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleEdit(item)}
                                className="text-blue-600 hover:text-blue-700"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDelete(item.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  : null}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
