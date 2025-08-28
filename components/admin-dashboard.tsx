


import { useState } from "react"
import {
  LayoutDashboard,
  Users,
  User,
  FileText,
  Receipt,
  Wheat,
  Coins,
  PawPrint,
  Upload,
  Bell,
  Search,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { DashboardPage } from "./pages/dashboard-page"
import  AllUsersPage  from "./pages/all-users-page"
import  SpecificUserPage  from "./pages/specific-user-page"
import   FORMS14  from "./pages/FORM14"
import Slips from "./pages/Slipsform"

import  FinanceParticulars  from "./pages/finance"
import  LoanReport  from "./pages/LoanReport"
import CropVerificationUI from "./pages/CVR/CropVerificationUI"
import Disburr from "./pages/Disburre"
import Loanledgerform from "./pages/Loanledgerform"
import Monthform from "./pages/Monthform"
import CVR from "./pages/CVR"
const navigationItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "all-users", label: "All Users", icon: Users },
  { id: "specific-user", label: "Specific User", icon: User },
  { id: "forms", label: "Forms", icon: FileText },
  { id: "slips", label: "Slips", icon: Receipt },
  
  { id: "ther", label: "THER", icon: Upload },
  { id: "cvr", label: "CVR", icon: Upload },
  { id: "disbursement", label: "DISBUR", icon: Upload },
   { id: "loanledger", label: "Loanledger", icon: Upload },
    { id: "month", label: "Month", icon: Upload },
    {id:"finance particulars", label:"finance particulars", icon: Coins},
]

export function AdminDashboard() {
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentPage("login")
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "dashboard": return <DashboardPage />
      case "all-users": return <AllUsersPage />
      case "specific-user": return <SpecificUserPage />
      case "forms": return <FORMS14 />
      case "slips": return <Slips />
      case "finance particulars": return <FinanceParticulars />
      case "ther": return <LoanReport />
      case "cvr": return <CVR />
      case "disbursement": return <Disburr />
       case "loanledger": return <Loanledgerform />
         case "month": return <Monthform />
      default: return <DashboardPage />
    }
  }

  if (!isLoggedIn) {
    return <div className="flex items-center justify-center h-screen text-xl font-bold">Please login...</div>
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-blue-50 border-r border-blue-100 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static`}
      >
        {/* Fixed Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b bg-white">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-blue-600 text-white font-bold">A</div>
            <span className="font-semibold text-blue-900">Admin Panel</span>
          </div>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Scrollable Navigation */}
        <div className="h-[calc(100vh-4rem)] overflow-y-auto">
          <nav className="px-4 py-6 space-y-2">
            {navigationItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => {
                  setCurrentPage(id)
                  setSidebarOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  currentPage === id
                    ? "bg-white text-blue-900 shadow-sm"
                    : "text-blue-700 hover:bg-white hover:text-blue-900"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-0">
        {/* Top Navigation */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search..."
                className="w-64 pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-blue-600 hover:bg-blue-50">
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 p-0 text-xs">3</Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="p-3 border-b">
                  <h4 className="font-semibold">Notifications</h4>
                </div>
                <div className="p-3">
                  <p className="text-sm text-gray-600">New user registration</p>
                  <p className="text-xs text-gray-400">2 minutes ago</p>
                </div>
                <div className="p-3">
                  <p className="text-sm text-gray-600">Form submission received</p>
                  <p className="text-xs text-gray-400">1 hour ago</p>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 hover:bg-blue-50">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-blue-600 text-white">AD</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-gray-700 hidden sm:block">Admin</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-auto p-6 bg-gray-50">
          {renderCurrentPage()}
        </main>
      </div>
    </div>
  )
}