import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import crypto from "crypto"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
    try {
        const body = await req.json().catch(() => null)
        const email = typeof body?.email === "string" ? body.email.trim() : ""

        // Always return success (avoid account enumeration).
        if (!email) {
            return NextResponse.json({ ok: true }, { status: 200 })
        }

        const user = await prisma.user.findUnique({ where: { email } })
        if (!user) {
            return NextResponse.json({ ok: true }, { status: 200 })
        }

        const token = crypto.randomBytes(32).toString("hex")
        const expires = new Date(Date.now() + 30 * 60 * 1000) // 30 minutes

        await prisma.resetToken.create({
            data: { email, token, expires }
        })

        const resetLink = `https://jobtracker.niranjan.lol/reset-password?token=${token}`

        await resend.emails.send({
            from: "noreply@jobtracker.niranjan.lol",
            to: email,
            subject: "Reset your Job Tracker password",
            html: `<p>Click the link below to reset your password. It expires in 30 minutes.</p><p><a href="${resetLink}">Reset Password</a></p>`
        })

        return NextResponse.json({ ok: true }, { status: 200 })
    } catch (e) {
        console.error("[forgot-password]", e)
        return NextResponse.json({ ok: true }, { status: 200 })
    }
}
