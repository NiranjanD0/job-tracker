import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

// Vercel CRON job handler
export async function GET(req: Request) {
    if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    try {
        const tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)
        tomorrow.setHours(0, 0, 0, 0)

        const dayAfterTomorrow = new Date(tomorrow)
        dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1)

        const jobs = await prisma.job.findMany({
            where: {
                interviewDate: {
                    gte: tomorrow,
                    lt: dayAfterTomorrow
                },
                reminderSent: false,
                status: {
                    not: "Rejected"
                }
            },
            include: { user: true }
        })

        for (const job of jobs) {
            if (!job.user.email) continue

            const companyName = job.company || "a company"
            const roleName = job.role || "a position"

            await resend.emails.send({
                from: "noreply@jobtracker.niranjan.lol",
                to: job.user.email,
                subject: `Interview Reminder – ${job.company || "Upcoming Interview"}`,
                html: `
                    <h2>Interview Reminder</h2>
                    <p>You have an interview scheduled tomorrow for the <strong>${roleName}</strong> role at <strong>${companyName}</strong>.</p>
                    <p>Log in to your dashboard to review any details.</p>
                    <p><br/><a href="https://jobtracker.niranjan.lol/dashboard">View your dashboard</a></p>
                `
            })

            await prisma.job.update({
                where: { id: job.id },
                data: { reminderSent: true }
            })
        }

        return NextResponse.json({ ok: true, sentCount: jobs.length })
    } catch (error) {
        console.error("[cron-reminders]", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}
