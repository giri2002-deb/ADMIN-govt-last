
// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Plus, Edit, Trash2, Save, X } from "lucide-react";

// interface Loan {
//   id: number;
//   கடன்_வகை: string;
//   ரொக்கம்: number;
//   விதை: number;
//   மொத்தம்: number;
//   திட்ட_அளவு: string;
// }

// type LoanField = keyof Omit<Loan, "id">;

// const fields: LoanField[] = ["கடன்_வகை", "ரொக்கம்", "விதை", "மொத்தம்", "திட்ட_அளவு"];

// export default function AnimalsPage() {
//   const [loans, setLoans] = useState<Loan[]>([]);
//   const [editingId, setEditingId] = useState<number | null>(null);
//   const [editForm, setEditForm] = useState<Partial<Loan>>({});
//   const [newLoan, setNewLoan] = useState<Omit<Loan, "id">>({
//     கடன்_வகை: "",
//     ரொக்கம்: 0,
//     விதை: 0,
//     மொத்தம்: 0,
//     திட்ட_அளவு: "",
//   });
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     fetchLoans();
//   }, []);

//   const fetchLoans = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const res = await axios.get("http://localhost:5000/api/animal"); // ✅ updated
//       setLoans(Array.isArray(res.data) ? res.data : []);
//     } catch (err) {
//       console.error("Error fetching loans:", err);
//       setError("Failed to fetch loans. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleEdit = (loan: Loan) => {
//     setEditingId(loan.id);
//     setEditForm({ ...loan });
//   };

//   const handleSave = async () => {
//     if (!editingId) return;
//     setIsLoading(true);
//     setError(null);
//     try {
//       const { data } = await axios.put(
//         `http://localhost:5000/api/animal/${editingId}`, // ✅ updated
//         editForm
//       );
//       setLoans((prev) =>
//         prev.map((loan) => (loan.id === editingId ? data : loan))
//       );
//       setEditingId(null);
//       setEditForm({});
//     } catch (err) {
//       console.error("Error updating loan:", err);
//       setError("Failed to update loan. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     setEditingId(null);
//     setEditForm({});
//   };

//   const handleDelete = async (id: number) => {
//     if (!window.confirm("நிச்சயமாக நீக்க விரும்புகிறீர்களா?")) return;
//     setIsLoading(true);
//     setError(null);
//     try {
//       await axios.delete(`http://localhost:5000/api/animal/${id}`); // ✅ updated
//       setLoans((prev) => prev.filter((loan) => loan.id !== id));
//     } catch (err) {
//       console.error("Error deleting loan:", err);
//       setError("Failed to delete loan. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleAddLoan = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const { data } = await axios.post("http://localhost:5000/api/animal", newLoan); // ✅ updated
//       setLoans((prev) => [...prev, data]);
//       setNewLoan({
//         கடன்_வகை: "",
//         ரொக்கம்: 0,
//         விதை: 0,
//         மொத்தம்: 0,
//         திட்ட_அளவு: "",
//       });
//       setShowAddForm(false);
//     } catch (err) {
//       console.error("Error adding loan:", err);
//       setError("Failed to add loan. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     field: keyof Loan
//   ) => {
//     const value = e.target.value;
//     setEditForm((prev) => ({
//       ...prev,
//       [field]: ["ரொக்கம்", "விதை", "மொத்தம்"].includes(field)
//         ? Number(value)
//         : value,
//     }));
//   };

//   const handleNewLoanChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     field: LoanField
//   ) => {
//     const value = e.target.value;
//     setNewLoan((prev) => ({
//       ...prev,
//       [field]: ["ரொக்கம்", "விதை", "மொத்தம்"].includes(field)
//         ? Number(value) || 0
//         : value,
//     }));
//   };

//   return (
//     <div className="space-y-6 p-4">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">விலங்கு கடன்</h1>
//           <p className="text-gray-600 mt-1">கடன் விவரங்களை நிர்வகிக்கவும்</p>
//         </div>
//         <Button
//           onClick={() => setShowAddForm(true)}
//           className="bg-blue-600 text-white"
//           disabled={isLoading}
//         >
//           <Plus className="h-4 w-4 mr-2" /> புதிய கடன்
//         </Button>
//       </div>

//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//           {error}
//         </div>
//       )}

//       {showAddForm && (
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-lg">புதிய கடன் பதிவு</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
//               {fields.map((field) => (
//                 <Input
//                   key={field}
//                   placeholder={field}
//                   type={["ரொக்கம்", "விதை", "மொத்தம்"].includes(field) ? "number" : "text"}
//                   value={newLoan[field]}
//                   onChange={(e) => handleNewLoanChange(e, field)}
//                 />
//               ))}
//               <div className="flex gap-2 col-span-full">
//                 <Button
//                   onClick={handleAddLoan}
//                   className="bg-green-600 text-white"
//                   disabled={isLoading}
//                 >
//                   <Save className="h-4 w-4 mr-1" /> சேமி
//                 </Button>
//                 <Button
//                   variant="outline"
//                   onClick={() => setShowAddForm(false)}
//                   disabled={isLoading}
//                 >
//                   <X className="h-4 w-4 mr-1" /> ரத்து செய்
//                 </Button>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       <Card>
//         <CardHeader>
//           <CardTitle className="text-lg">கடன் விவரங்கள்</CardTitle>
//         </CardHeader>
//         <CardContent>
//           {isLoading && !showAddForm ? (
//             <div className="flex justify-center items-center p-8">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <Table>
//                 <TableHeader>
//                   <TableRow className="bg-gray-50">
//                     <TableHead>ID</TableHead>
//                     {fields.map((field) => (
//                       <TableHead key={field}>{field}</TableHead>
//                     ))}
//                     <TableHead>நடவடிக்கைகள்</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {loans.length > 0 ? (
//                     loans.map((loan) => (
//                       <TableRow key={loan.id}>
//                         <TableCell>{loan.id}</TableCell>
//                         {fields.map((field) => (
//                           <TableCell key={field}>
//                             {editingId === loan.id ? (
//                               <Input
//                                 type={["ரொக்கம்", "விதை", "மொத்தம்"].includes(field) ? "number" : "text"}
//                                 value={(editForm[field] as any) ?? ""}
//                                 onChange={(e) => handleInputChange(e, field)}
//                               />
//                             ) : (
//                               (loan[field] as any)
//                             )}
//                           </TableCell>
//                         ))}
//                         <TableCell>
//                           {editingId === loan.id ? (
//                             <div className="flex gap-2">
//                               <Button
//                                 size="sm"
//                                 onClick={handleSave}
//                                 className="bg-blue-600 text-white"
//                                 disabled={isLoading}
//                               >
//                                 <Save className="h-4 w-4" />
//                               </Button>
//                               <Button
//                                 size="sm"
//                                 variant="outline"
//                                 onClick={handleCancel}
//                                 disabled={isLoading}
//                               >
//                                 <X className="h-4 w-4" />
//                               </Button>
//                             </div>
//                           ) : (
//                             <div className="flex gap-2">
//                               <Button
//                                 size="sm"
//                                 variant="ghost"
//                                 onClick={() => handleEdit(loan)}
//                                 className="text-blue-600"
//                                 disabled={isLoading}
//                               >
//                                 <Edit className="h-4 w-4" />
//                               </Button>
//                               <Button
//                                 size="sm"
//                                 variant="ghost"
//                                 onClick={() => handleDelete(loan.id)}
//                                 className="text-red-600"
//                                 disabled={isLoading}
//                               >
//                                 <Trash2 className="h-4 w-4" />
//                               </Button>
//                             </div>
//                           )}
//                         </TableCell>
//                       </TableRow>
//                     ))
//                   ) : (
//                     <TableRow>
//                       <TableCell colSpan={fields.length + 2} className="text-center py-8">
//                         No loans found
//                       </TableCell>
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
"use client"

import type React from "react"

import { useEffect, useState } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2, Save, X } from "lucide-react"

interface Loan {
  id: number
  கடன்_வகை: string
  ரொக்கம்: number
  விதை: number
  மொத்தம்: number
  திட்ட_அளவு: string
}

type LoanField = keyof Omit<Loan, "id">

const fields: LoanField[] = ["கடன்_வகை", "ரொக்கம்", "விதை", "மொத்தம்", "திட்ட_அளவு"]

export default function AnimalsPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [loans, setLoans] = useState<Loan[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState<Partial<Loan>>({})
  const [newLoan, setNewLoan] = useState<Omit<Loan, "id">>({
    கடன்_வகை: "",
    ரொக்கம்: 0,
    விதை: 0,
    மொத்தம்: 0,
    திட்ட_அளவு: "",
  })
  const [showAddForm, setShowAddForm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchLoans()
  }, [])

  const fetchLoans = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await axios.get(`${API_URL}/api/animal`) // ✅ updated
      setLoans(Array.isArray(res.data) ? res.data : [])
    } catch (err) {
      console.error("Error fetching loans:", err)
      setError("Failed to fetch loans. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (loan: Loan) => {
    setEditingId(loan.id)
    const editFormData = { ...loan }
    // Set zero values to empty string for number fields
    if (editFormData.ரொக்கம் === 0) editFormData.ரொக்கம் = "" as any
    if (editFormData.விதை === 0) editFormData.விதை = "" as any
    if (editFormData.மொத்தம் === 0) editFormData.மொத்தம் = "" as any
    setEditForm(editFormData)
  }

  const handleSave = async () => {
    if (!editingId) return
    setIsLoading(true)
    setError(null)
    try {
      const saveData = { ...editForm }
      if (saveData.ரொக்கம் === "") saveData.ரொக்கம் = 0
      if (saveData.விதை === "") saveData.விதை = 0
      if (saveData.மொத்தம் === "") saveData.மொத்தம் = 0

      const { data } = await axios.put(`${API_URL}/api/animal/${editingId}`, saveData)
      setLoans((prev) => prev.map((loan) => (loan.id === editingId ? data : loan)))
      setEditingId(null)
      setEditForm({})
    } catch (err) {
      console.error("Error updating loan:", err)
      setError("Failed to update loan. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditForm({})
  }

  const handleDelete = async (id: number) => {
    if (!window.confirm("நிச்சயமாக நீக்க விரும்புகிறீர்களா?")) return
    setIsLoading(true)
    setError(null)
    try {
      await axios.delete(`${API_URL}/api/animal/${id}`) // ✅ updated
      setLoans((prev) => prev.filter((loan) => loan.id !== id))
    } catch (err) {
      console.error("Error deleting loan:", err)
      setError("Failed to delete loan. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddLoan = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const { data } = await axios.post(`${API_URL}/api/animal`, newLoan) // ✅ updated
      setLoans((prev) => [...prev, data])
      setNewLoan({
        கடன்_வகை: "",
        ரொக்கம்: 0,
        விதை: 0,
        மொத்தம்: 0,
        திட்ட_அளவு: "",
      })
      setShowAddForm(false)
    } catch (err) {
      console.error("Error adding loan:", err)
      setError("Failed to add loan. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Loan) => {
    const value = e.target.value
    setEditForm((prev) => ({
      ...prev,
      [field]: ["ரொக்கம்", "விதை", "மொத்தம்"].includes(field) ? (value === "" ? "" : Number(value)) : value,
    }))
  }

  const handleNewLoanChange = (e: React.ChangeEvent<HTMLInputElement>, field: LoanField) => {
    const value = e.target.value
    setNewLoan((prev) => ({
      ...prev,
      [field]: ["ரொக்கம்", "விதை", "மொத்தம்"].includes(field) ? Number(value) || 0 : value,
    }))
  }

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">விலங்கு கடன்</h1>
          <p className="text-gray-600 mt-1">கடன் விவரங்களை நிர்வகிக்கவும்</p>
        </div>
        <Button onClick={() => setShowAddForm(true)} className="bg-blue-600 text-white" disabled={isLoading}>
          <Plus className="h-4 w-4 mr-2" /> புதிய கடன்
        </Button>
      </div>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">புதிய கடன் பதிவு</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {fields.map((field) => (
                <Input
                  key={field}
                  placeholder={field}
                  type={["ரொக்கம்", "விதை", "மொத்தம்"].includes(field) ? "number" : "text"}
                  value={newLoan[field]}
                  onChange={(e) => handleNewLoanChange(e, field)}
                />
              ))}
              <div className="flex gap-2 col-span-full">
                <Button onClick={handleAddLoan} className="bg-green-600 text-white" disabled={isLoading}>
                  <Save className="h-4 w-4 mr-1" /> சேமி
                </Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)} disabled={isLoading}>
                  <X className="h-4 w-4 mr-1" /> ரத்து செய்
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">கடன் விவரங்கள்</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && !showAddForm ? (
            <div className="flex justify-center items-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead>ID</TableHead>
                    {fields.map((field) => (
                      <TableHead key={field}>{field}</TableHead>
                    ))}
                    <TableHead>நடவடிக்கைகள்</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loans.length > 0 ? (
                    loans.map((loan) => (
                      <TableRow key={loan.id}>
                        <TableCell>{loan.id}</TableCell>
                        {fields.map((field) => (
                          <TableCell key={field}>
                            {editingId === loan.id ? (
                              <Input
                                type={["ரொக்கம்", "விதை", "மொத்தம்"].includes(field) ? "number" : "text"}
                                value={(editForm[field] as any) ?? ""}
                                onChange={(e) => handleInputChange(e, field)}
                              />
                            ) : (
                              (loan[field] as any)
                            )}
                          </TableCell>
                        ))}
                        <TableCell>
                          {editingId === loan.id ? (
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={handleSave}
                                className="bg-blue-600 text-white"
                                disabled={isLoading}
                              >
                                <Save className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline" onClick={handleCancel} disabled={isLoading}>
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleEdit(loan)}
                                className="text-blue-600"
                                disabled={isLoading}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDelete(loan.id)}
                                className="text-red-600"
                                disabled={isLoading}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={fields.length + 2} className="text-center py-8">
                        No loans found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
