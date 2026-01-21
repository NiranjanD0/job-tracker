"use client"
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";


export default function Home() {
  const { data: session } = useSession()
  return (
    <>
      <Navbar />
      <Hero />
    </>
  )
}