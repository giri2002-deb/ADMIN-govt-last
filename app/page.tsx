"use client";

import { AdminDashboard } from "@/components/admin-dashboard";
import { BrowserRouter } from "react-router-dom";

export default function Page() {
  return (
    <BrowserRouter>
      <AdminDashboard />
    </BrowserRouter>
  );
}

