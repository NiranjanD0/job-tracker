"use client"
import Navbar from "@/components/navbar";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";


export default function Home() {
  const { data: session } = useSession()
  if(!session){
    return(
      <div className="flex flex-col h-screen justify-center items-center">
        <div>You Are Not Logged In, Click Below To Go Login</div>
        <button className="border p-2">
          <Link href="/auth">Click Me</Link>
        </button>
      </div>
    )
  }else{
    return (
      <>
      <div className="flex flex-col h-screen justify-center items-center">
        Congrats, ur logged in.
        You are {session.user?.name}
        <button className="border p-2" onClick={()=> signOut()}>LogOut?</button>
      </div>
      </>
    );
  }
}