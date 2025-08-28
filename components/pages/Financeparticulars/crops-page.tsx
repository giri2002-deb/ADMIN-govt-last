
// // "use client"

// // import { useState, useEffect } from "react"
// // import axios from "axios"
// // import { Button } from "@/components/ui/button"
// // import { Input } from "@/components/ui/input"
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// // import {
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableHead,
// //   TableHeader,
// //   TableRow
// // } from "@/components/ui/table"
// // import { Plus, Edit, Trash2, Save, X } from "lucide-react"

// // interface TamilCrop {
// //   id: number
// //   வரிசை: number
// //   கடன்_வகை: string
// //   ரொக்கம்: number
// //   தொழில்: number
// //   உரம்: number
// //   உரம்_உப: number
// //   பூச்சி_மருந்து: number
// //   விதை: number
// //   மொத்தம்: number
// //   திட்ட_அளவு: string
// // }

// // export default function CropsPage() {
// //   const [crops, setCrops] = useState<TamilCrop[]>([])
// //   const [editingId, setEditingId] = useState<number | null>(null)
// //   const [editForm, setEditForm] = useState<Partial<TamilCrop>>({})
// //   const [newCrop, setNewCrop] = useState<Partial<TamilCrop>>({})
// //   const [showAddForm, setShowAddForm] = useState(false)

// //   useEffect(() => {
// //     fetchCrops()
// //   }, [])

// //   const fetchCrops = async () => {
// //     try {
// //       const res = await axios.get("http://localhost:5000/api/crops")
// //       setCrops(res.data)
// //     } catch (error) {
// //       console.error("Fetch error:", error)
// //     }
// //   }

// //   const handleEdit = (crop: TamilCrop) => {
// //     setEditingId(crop.id)
// //     const { வரிசை, ...rest } = crop // exclude 'வரிசை' from editing
// //     setEditForm({ ...rest })
// //   }

// //   const handleSave = async () => {
// //     try {
// //       if (editingId) {
// //         const filteredEditForm = Object.fromEntries(
// //           Object.entries(editForm).filter(([_, val]) => val !== undefined)
// //         )
// //         await axios.put(`http://localhost:5000/api/crops/${editingId}`, filteredEditForm)
// //         setEditingId(null)
// //         setEditForm({})
// //         fetchCrops()
// //       }
// //     } catch (error) {
// //       console.error("Save error:", error)
// //     }
// //   }

// //   const handleDelete = async (id: number) => {
// //     try {
// //       await axios.delete(`http://localhost:5000/api/crops/${id}`)
// //       fetchCrops()
// //     } catch (error) {
// //       console.error("Delete error:", error)
// //     }
// //   }

// //   const handleAddCrop = async () => {
// //     try {
// //       const nextVarisai = crops.length + 1
// //       const newRecord = {
// //         ...newCrop,
// //         வரிசை: nextVarisai
// //       }

// //       const res = await axios.post("http://localhost:5000/api/crops", newRecord)
// //       setCrops([...crops, res.data])
// //       setNewCrop({})
// //       setShowAddForm(false)
// //     } catch (error) {
// //       console.error("Add error:", error)
// //     }
// //   }

// //   const renderInput = (
// //     field: keyof TamilCrop,
// //     value: any,
// //     onChange: (key: keyof TamilCrop, val: any) => void
// //   ) => (
// //     <Input
// //       type={typeof value === "string" ? "text" : "number"}
// //       value={value ?? ""}
// //       onChange={(e) =>
// //         onChange(field, typeof value === "string" ? e.target.value : Number(e.target.value))
// //       }
// //     />
// //   )

// //   const fields: (keyof TamilCrop)[] = [
// //     "கடன்_வகை",
// //     "ரொக்கம்",
// //     "தொழில்",
// //     "உரம்",
// //     "உரம்_உப",
// //     "பூச்சி_மருந்து",
// //     "விதை",
// //     "மொத்தம்",
// //     "திட்ட_அளவு"
// //   ]

// //   return (
// //     <div className="space-y-6">
// //       <div className="flex items-center justify-between">
// //         <div>
// //           <h1 className="text-3xl font-bold text-gray-900">பயிர் பட்டியல்</h1>
// //           <p className="text-gray-600 mt-1">பயிர் விவரங்களை நிர்வகிக்கவும்</p>
// //         </div>
// //         <Button onClick={() => setShowAddForm(true)} className="bg-green-600 text-white">
// //           <Plus className="h-4 w-4 mr-2" /> புதிய பதிவு
// //         </Button>
// //       </div>

// //       {showAddForm && (
// //         <Card>
// //           <CardHeader><CardTitle>புதிய பதிவு</CardTitle></CardHeader>
// //           <CardContent className="grid grid-cols-2 md:grid-cols-5 gap-4">
// //             <Input
// //               disabled
// //               value={`வரிசை: ${crops.length + 1}`}
// //               className="text-gray-500"
// //             />
// //             {fields.map((field) => (
// //               <Input
// //                 key={field}
// //                 placeholder={field}
// //                 type={typeof newCrop[field] === "string" ? "text" : "number"}
// //                 value={newCrop[field] ?? ""}
// //                 onChange={(e) =>
// //                   setNewCrop({
// //                     ...newCrop,
// //                     [field]: typeof newCrop[field] === "string"
// //                       ? e.target.value
// //                       : Number(e.target.value)
// //                   })
// //                 }
// //               />
// //             ))}
// //             <div className="col-span-2 flex gap-2">
// //               <Button onClick={handleAddCrop} className="bg-blue-600 text-white">
// //                 <Save className="h-4 w-4 mr-2" /> சேமிக்கவும்
// //               </Button>
// //               <Button variant="outline" onClick={() => setShowAddForm(false)}>
// //                 <X className="h-4 w-4 mr-2" /> ரத்து
// //               </Button>
// //             </div>
// //           </CardContent>
// //         </Card>
// //       )}

// //       <Card>
// //         <CardHeader><CardTitle>பதிவுகள்</CardTitle></CardHeader>
// //         <CardContent>
// //           <Table>
// //             <TableHeader>
// //               <TableRow>
// //                 <TableHead>வரிசை</TableHead>
// //                 {fields.map((field) => (
// //                   <TableHead key={field}>{field}</TableHead>
// //                 ))}
// //                 <TableHead>செயல்கள்</TableHead>
// //               </TableRow>
// //             </TableHeader>
// //             <TableBody>
// //               {crops.map((crop) => (
// //                 <TableRow key={crop.id}>
// //                   <TableCell>{crop.வரிசை}</TableCell>
// //                   {fields.map((field) => (
// //                     <TableCell key={field}>
// //                       {editingId === crop.id
// //                         ? renderInput(field, editForm[field], (key, val) =>
// //                             setEditForm({ ...editForm, [key]: val })
// //                           )
// //                         : crop[field]}
// //                     </TableCell>
// //                   ))}
// //                   <TableCell>
// //                     {editingId === crop.id ? (
// //                       <div className="flex gap-2">
// //                         <Button size="sm" onClick={handleSave} className="bg-blue-600 text-white">
// //                           <Save className="h-4 w-4" />
// //                         </Button>
// //                         <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>
// //                           <X className="h-4 w-4" />
// //                         </Button>
// //                       </div>
// //                     ) : (
// //                       <div className="flex gap-2">
// //                         <Button
// //                           size="sm"
// //                           variant="ghost"
// //                           onClick={() => handleEdit(crop)}
// //                           className="text-blue-600"
// //                         >
// //                           <Edit className="h-4 w-4" />
// //                         </Button>
// //                         <Button
// //                           size="sm"
// //                           variant="ghost"
// //                           onClick={() => handleDelete(crop.id)}
// //                           className="text-red-600"
// //                         >
// //                           <Trash2 className="h-4 w-4" />
// //                         </Button>
// //                       </div>
// //                     )}
// //                   </TableCell>
// //                 </TableRow>
// //               ))}
// //             </TableBody>
// //           </Table>
// //         </CardContent>
// //       </Card>
// //     </div>
// //   )
// // }
// "use client"

// import { useState, useEffect } from "react"
// import axios from "axios"
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
// import { Plus, Edit, Trash2, Save, X } from "lucide-react"

// interface Crop {
//   crop_code: number
//   name_of_crop: string
//   rokkam: number
//   thozhu_uram: number
//   uram_1: number
//   uram_2: number
//   poochi_marundhu: number
//   vithai: number
//   motham: number
// }

// export default function CropsPage() {
//   const [crops, setCrops] = useState<Crop[]>([])
//   const [editingCode, setEditingCode] = useState<number | null>(null)
//   const [editForm, setEditForm] = useState<Partial<Crop>>({})
//   const [newCrop, setNewCrop] = useState<Partial<Crop>>({})
//   const [showAddForm, setShowAddForm] = useState(false)

//   useEffect(() => {
//     fetchCrops()
//   }, [])

//   const fetchCrops = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/crops")
//       const data = Array.isArray(res.data) ? res.data : [res.data] // Ensure always array
//       setCrops(data)
//     } catch (error) {
//       console.error("Fetch error:", error)
//     }
//   }

//   const handleEdit = (crop: Crop) => {
//     setEditingCode(crop.crop_code)
//     setEditForm({ ...crop })
//   }

//   const handleSave = async () => {
//     if (editingCode === null) return

//     try {
//       const updated = {
//         ...editForm,
//         crop_code: editingCode,
//         motham: calculateTotal(editForm),
//       }
//       await axios.put(`http://localhost:5000/api/crops/${editingCode}`, updated)
//       setEditingCode(null)
//       setEditForm({})
//       fetchCrops()
//     } catch (error) {
//       console.error("Save error:", error)
//     }
//   }

//   const handleDelete = async (id: number) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/crops/${id}`)
//       fetchCrops()
//     } catch (error) {
//       console.error("Delete error:", error)
//     }
//   }

//   const handleAddCrop = async () => {
//     try {
//       const nextCode = crops.length > 0 ? Math.max(...crops.map(c => c.crop_code)) + 1 : 1
//       const fullCrop: Crop = {
//         crop_code: nextCode,
//         name_of_crop: newCrop.name_of_crop ?? "",
//         rokkam: Number(newCrop.rokkam) || 0,
//         thozhu_uram: Number(newCrop.thozhu_uram) || 0,
//         uram_1: Number(newCrop.uram_1) || 0,
//         uram_2: Number(newCrop.uram_2) || 0,
//         poochi_marundhu: Number(newCrop.poochi_marundhu) || 0,
//         vithai: Number(newCrop.vithai) || 0,
//         motham: calculateTotal(newCrop),
//       }

//       const res = await axios.post("http://localhost:5000/api/crops", fullCrop)
//       setCrops([...crops, res.data])
//       setNewCrop({})
//       setShowAddForm(false)
//     } catch (error) {
//       console.error("Add error:", error)
//     }
//   }

//   const calculateTotal = (crop: Partial<Crop>): number => {
//     return (
//       (Number(crop.rokkam) || 0) +
//       (Number(crop.thozhu_uram) || 0) +
//       (Number(crop.uram_1) || 0) +
//       (Number(crop.uram_2) || 0) +
//       (Number(crop.poochi_marundhu) || 0) +
//       (Number(crop.vithai) || 0)
//     )
//   }

//   const renderInput = (
//     field: keyof Crop,
//     value: any,
//     onChange: (key: keyof Crop, val: any) => void
//   ) => (
//     <Input
//       type={typeof value === "string" ? "text" : "number"}
//       value={value ?? ""}
//       onChange={(e) =>
//         onChange(field, typeof value === "string" ? e.target.value : Number(e.target.value))
//       }
//     />
//   )

//   const fields: (keyof Crop)[] = [
//     "name_of_crop",
//     "rokkam",
//     "thozhu_uram",
//     "uram_1",
//     "uram_2",
//     "poochi_marundhu",
//     "vithai",
//     "motham"
//   ]

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">பயிர் பட்டியல்</h1>
//           <p className="text-gray-600 mt-1">பயிர் விவரங்களை நிர்வகிக்கவும்</p>
//         </div>
//         <Button onClick={() => setShowAddForm(true)} className="bg-green-600 text-white">
//           <Plus className="h-4 w-4 mr-2" /> புதிய பதிவு
//         </Button>
//       </div>

//       {showAddForm && (
//         <Card>
//           <CardHeader><CardTitle>புதிய பதிவு</CardTitle></CardHeader>
//           <CardContent className="grid grid-cols-2 md:grid-cols-5 gap-4">
//             <Input
//               disabled
//               value={`பயிர் குறியீடு: ${crops.length + 1}`}
//               className="text-gray-500"
//             />
//             {fields.map((field) => (
//               <Input
//                 key={field}
//                 placeholder={field}
//                 type={typeof newCrop[field] === "string" ? "text" : "number"}
//                 value={newCrop[field] ?? ""}
//                 onChange={(e) =>
//                   setNewCrop({
//                     ...newCrop,
//                     [field]: typeof newCrop[field] === "string"
//                       ? e.target.value
//                       : Number(e.target.value),
//                   })
//                 }
//               />
//             ))}
//             <div className="col-span-2 flex gap-2">
//               <Button onClick={handleAddCrop} className="bg-blue-600 text-white">
//                 <Save className="h-4 w-4 mr-2" /> சேமிக்கவும்
//               </Button>
//               <Button variant="outline" onClick={() => setShowAddForm(false)}>
//                 <X className="h-4 w-4 mr-2" /> ரத்து
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       <Card>
//         <CardHeader><CardTitle>பதிவுகள்</CardTitle></CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>பயிர் குறியீடு</TableHead>
//                 {fields.map((field) => (
//                   <TableHead key={field}>{field}</TableHead>
//                 ))}
//                 <TableHead>செயல்கள்</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {crops.map((crop) => (
//                 <TableRow key={crop.crop_code}>
//                   <TableCell>{crop.crop_code}</TableCell>
//                   {fields.map((field) => (
//                     <TableCell key={field}>
//                       {editingCode === crop.crop_code
//                         ? renderInput(field, editForm[field], (key, val) =>
//                             setEditForm({ ...editForm, [key]: val })
//                           )
//                         : crop[field]}
//                     </TableCell>
//                   ))}
//                   <TableCell>
//                     {editingCode === crop.crop_code ? (
//                       <div className="flex gap-2">
//                         <Button size="sm" onClick={handleSave} className="bg-blue-600 text-white">
//                           <Save className="h-4 w-4" />
//                         </Button>
//                         <Button size="sm" variant="outline" onClick={() => setEditingCode(null)}>
//                           <X className="h-4 w-4" />
//                         </Button>
//                       </div>
//                     ) : (
//                       <div className="flex gap-2">
//                         <Button
//                           size="sm"
//                           variant="ghost"
//                           onClick={() => handleEdit(crop)}
//                           className="text-blue-600"
//                         >
//                           <Edit className="h-4 w-4" />
//                         </Button>
//                         <Button
//                           size="sm"
//                           variant="ghost"
//                           onClick={() => handleDelete(crop.crop_code)}
//                           className="text-red-600"
//                         >
//                           <Trash2 className="h-4 w-4" />
//                         </Button>
//                       </div>
//                     )}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }
"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2, Save, X } from "lucide-react"

interface Crop {
  crop_code: number
  name_of_crop: string
  rokkam: number
  thozhu_uram: number
  uram_1: number
  uram_2: number
  poochi_marundhu: number
  vithai: number
  motham: number
}

export default function CropsPage() {
  const [crops, setCrops] = useState<Crop[]>([])
  const [editingCode, setEditingCode] = useState<number | null>(null)
  const [editForm, setEditForm] = useState<Partial<Crop>>({})
  const [newCrop, setNewCrop] = useState<Record<string, string>>({
    name_of_crop: "",
    rokkam: "",
    thozhu_uram: "",
    uram_1: "",
    uram_2: "",
    poochi_marundhu: "",
    vithai: "",
  })
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    fetchCrops()
  }, [])
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const fetchCrops = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/crops`)
      const data = Array.isArray(res.data) ? res.data : [res.data]
      setCrops(data)
    } catch (error) {
      console.error("Fetch error:", error)
    }
  }

  const handleEdit = (crop: Crop) => {
    setEditingCode(crop.crop_code)
    setEditForm({
      crop_code: crop.crop_code,
      name_of_crop: crop.name_of_crop,
      rokkam: crop.rokkam === 0 ? "" : crop.rokkam.toString(),
      thozhu_uram: crop.thozhu_uram === 0 ? "" : crop.thozhu_uram.toString(),
      uram_1: crop.uram_1 === 0 ? "" : crop.uram_1.toString(),
      uram_2: crop.uram_2 === 0 ? "" : crop.uram_2.toString(),
      poochi_marundhu: crop.poochi_marundhu === 0 ? "" : crop.poochi_marundhu.toString(),
      vithai: crop.vithai === 0 ? "" : crop.vithai.toString(),
      motham: crop.motham,
    })
  }

  const handleSave = async () => {
    if (editingCode === null) return

    try {
      const updatedForm = {
        crop_code: editingCode,
        name_of_crop: editForm.name_of_crop || "",
        rokkam: Number(editForm.rokkam) || 0,
        thozhu_uram: Number(editForm.thozhu_uram) || 0,
        uram_1: Number(editForm.uram_1) || 0,
        uram_2: Number(editForm.uram_2) || 0,
        poochi_marundhu: Number(editForm.poochi_marundhu) || 0,
        vithai: Number(editForm.vithai) || 0,
        motham: calculateTotal(editForm),
      }

      await axios.put(`${API_URL}/api/crops/${editingCode}`, updatedForm)
      setEditingCode(null)
      setEditForm({})
      fetchCrops()
    } catch (error) {
      console.error("Save error:", error)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/api/crops/${id}`)
      fetchCrops()
    } catch (error) {
      console.error("Delete error:", error)
    }
  }

  const handleAddCrop = async () => {
    try {
      const nextCode = crops.length > 0 ? Math.max(...crops.map((c) => c.crop_code)) + 1 : 1
      const fullCrop: Crop = {
        crop_code: nextCode,
        name_of_crop: newCrop.name_of_crop || "",
        rokkam: Number(newCrop.rokkam) || 0,
        thozhu_uram: Number(newCrop.thozhu_uram) || 0,
        uram_1: Number(newCrop.uram_1) || 0,
        uram_2: Number(newCrop.uram_2) || 0,
        poochi_marundhu: Number(newCrop.poochi_marundhu) || 0,
        vithai: Number(newCrop.vithai) || 0,
        motham: calculateTotal(newCrop),
      }

      const res = await axios.post(`${API_URL}/api/crops`, fullCrop)
      setCrops([...crops, res.data])
      setNewCrop({
        name_of_crop: "",
        rokkam: "",
        thozhu_uram: "",
        uram_1: "",
        uram_2: "",
        poochi_marundhu: "",
        vithai: "",
      })
      setShowAddForm(false)
    } catch (error) {
      console.error("Add error:", error)
    }
  }

  const calculateTotal = (crop: any): number => {
    return (
      (Number(crop.rokkam) || 0) +
      (Number(crop.thozhu_uram) || 0) +
      (Number(crop.uram_1) || 0) +
      (Number(crop.uram_2) || 0) +
      (Number(crop.poochi_marundhu) || 0) +
      (Number(crop.vithai) || 0)
    )
  }

  const renderInput = (
    field: keyof Crop,
    value: any,
    onChange: (key: keyof Crop, val: any) => void,
    isEditing = false,
  ) => {
    if (field === "motham") {
      const currentTotal = isEditing ? calculateTotal(editForm) : value
      return <span className="text-sm font-semibold text-blue-600">{currentTotal}</span>
    }

    return (
      <Input
        type={field === "name_of_crop" ? "text" : "number"}
        value={value === "" || value === null || value === undefined ? "" : value}
        onChange={(e) => {
          const newValue = e.target.value
          onChange(field, newValue)
        }}
        className={`${field === "name_of_crop" ? "w-32 min-w-32" : "w-20 min-w-20"} text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
        step="any"
      />
    )
  }

  const fields: (keyof Crop)[] = [
    "name_of_crop",
    "rokkam",
    "thozhu_uram",
    "uram_1",
    "uram_2",
    "poochi_marundhu",
    "vithai",
    "motham",
  ]

  const fieldLabels: Record<keyof Crop, string> = {
    crop_code: "பயிர் குறியீடு",
    name_of_crop: "பயிர் பெயர்",
    rokkam: "ரொக்கம்",
    thozhu_uram: "தொழில்",
    uram_1: "உரம் 1",
    uram_2: "உரம் 2",
    poochi_marundhu: "பூச்சி மருந்து",
    vithai: "விதை",
    motham: "மொத்தம்",
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">பயிர் பட்டியல்</h1>
          <p className="text-gray-600 mt-1">பயிர் விவரங்களை நிர்வகிக்கவும்</p>
        </div>
        <Button onClick={() => setShowAddForm(true)} className="bg-green-600 hover:bg-green-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          புதிய பதிவு
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>புதிய பதிவு</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-4">
              <Input
                disabled
                value={`பயிர் குறியீடு: ${crops.length > 0 ? Math.max(...crops.map((c) => c.crop_code)) + 1 : 1}`}
                className="text-gray-500"
              />
              {fields.map((field) => (
                <div key={field} className="space-y-1">
                  <label className="text-xs text-gray-600">{fieldLabels[field]}</label>
                  {field === "motham" ? (
                    <Input disabled value={calculateTotal(newCrop)} className="text-gray-500" />
                  ) : (
                    <Input
                      placeholder={fieldLabels[field]}
                      type={field === "name_of_crop" ? "text" : "number"}
                      value={newCrop[field] || ""}
                      onChange={(e) =>
                        setNewCrop({
                          ...newCrop,
                          [field]: e.target.value,
                        })
                      }
                      className={`w-full ${field !== "name_of_crop" ? "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" : ""}`}
                      step="any"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddCrop} className="bg-blue-600 hover:bg-blue-700 text-white">
                <Save className="h-4 w-4 mr-2" />
                சேமிக்கவும்
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                <X className="h-4 w-4 mr-2" />
                ரத்து
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>பதிவுகள்</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-24 text-center">பயிர் குறியீடு</TableHead>
                  <TableHead className="w-36 text-center">பயிர் பெயர்</TableHead>
                  <TableHead className="w-24 text-center">ரொக்கம்</TableHead>
                  <TableHead className="w-24 text-center">தொழில்</TableHead>
                  <TableHead className="w-24 text-center">உரம் 1</TableHead>
                  <TableHead className="w-24 text-center">உரம் 2</TableHead>
                  <TableHead className="w-28 text-center">பூச்சி மருந்து</TableHead>
                  <TableHead className="w-24 text-center">விதை</TableHead>
                  <TableHead className="w-24 text-center">மொத்தம்</TableHead>
                  <TableHead className="w-24 text-center">செயல்கள்</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {crops.map((crop) => (
                  <TableRow key={crop.crop_code}>
                    <TableCell className="font-medium text-center">{crop.crop_code}</TableCell>
                    {fields.map((field) => (
                      <TableCell key={field} className="text-center">
                        {editingCode === crop.crop_code ? (
                          <div className="flex justify-center items-center min-h-[40px]">
                            {renderInput(
                              field,
                              editForm[field] !== undefined ? editForm[field] : crop[field],
                              (key, val) => {
                                const updatedForm = { ...editForm, [key]: val }
                                setEditForm(updatedForm)
                              },
                              true,
                            )}
                          </div>
                        ) : (
                          <span className={field === "motham" ? "font-semibold text-blue-600" : ""}>{crop[field]}</span>
                        )}
                      </TableCell>
                    ))}
                    <TableCell className="text-center">
                      {editingCode === crop.crop_code ? (
                        <div className="flex gap-1 justify-center">
                          <Button size="sm" onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white">
                            <Save className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setEditingCode(null)}>
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex gap-1 justify-center">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEdit(crop)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(crop.crop_code)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
