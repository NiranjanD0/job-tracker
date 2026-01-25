import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const body = await req.json().catch(() => null)
        const email = typeof body?.email === "string" ? body.email.trim() : ""

        // Always return success (avoid account enumeration).
        if (!email) {
            return NextResponse.json({ ok: true }, { status: 200 })
        }

        // TODO: Integrate with your real user DB + email provider.
        // For now, just log the request server-side.
        console.log("[forgot-password] request", { email })

        return NextResponse.json({ ok: true }, { status: 200 })
    } catch {
        // Still return 200 to avoid leaking details.
        return NextResponse.json({ ok: true }, { status: 200 })
    }
}
