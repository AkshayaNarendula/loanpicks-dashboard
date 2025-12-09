"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();

  // Hide navbar on home, login, signup
  const hideNavbarRoutes = ["/", "/login", "/signup"];

  if (hideNavbarRoutes.includes(pathname)) {
    return null; // Don't render navbar
  }

  return <Navbar />;
}
