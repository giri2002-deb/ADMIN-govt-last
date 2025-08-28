// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Eye, EyeOff, Lock, Mail } from "lucide-react"

// interface LoginPageProps {
//   onLogin: () => void
// }

// export function LoginPage({ onLogin }: LoginPageProps) {
//   const [showPassword, setShowPassword] = useState(false)
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     onLogin()
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-4">
//       <Card className="w-full max-w-md shadow-xl border-0">
//         <CardHeader className="space-y-1 text-center">
//           <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
//             <Lock className="h-8 w-8 text-white" />
//           </div>
//           <CardTitle className="text-2xl font-bold text-gray-900">Welcome Back</CardTitle>
//           <CardDescription className="text-gray-600">Sign in to your admin account</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="email" className="text-sm font-medium text-gray-700">
//                 Email
//               </Label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="admin@example.com"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
//                   required
//                 />
//               </div>
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="password" className="text-sm font-medium text-gray-700">
//                 Password
//               </Label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
//                 <Input
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="pl-10 pr-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
//                   required
//                 />
//                 <Button
//                   type="button"
//                   variant="ghost"
//                   size="icon"
//                   className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? (
//                     <EyeOff className="h-4 w-4 text-gray-400" />
//                   ) : (
//                     <Eye className="h-4 w-4 text-gray-400" />
//                   )}
//                 </Button>
//               </div>
//             </div>
//             <Button
//               type="submit"
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
//             >
//               Sign In
//             </Button>
//           </form>
//           <div className="mt-6 text-center">
//             <a href="#" className="text-sm text-blue-600 hover:text-blue-700 hover:underline">
//               Forgot your password?
//             </a>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }
