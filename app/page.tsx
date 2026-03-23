"use client"
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LandingSections from "@/components/LandingSections";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <LandingSections />
    </>
  )
}