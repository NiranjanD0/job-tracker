"use server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function addJobAction(prevState: any, formData: FormData) {
    const session = await auth()
    if (!session?.user?.id) {
        return { error: "Unauthorized" }
    }

    const company = formData.get("company") as string
    const role = formData.get("role") as string
    const location = formData.get("location") as string
    const jobPostDate = formData.get("jobPostDate") as string
    const applyBy = formData.get("applyBy") as string
    const jobLink = formData.get("jobLink") as string
    const jobId = formData.get("jobId") as string
    const cvVersion = formData.get("cvVersion") as string
    const status = formData.get("status") as string || "Saved"
    const appliedOn = formData.get("appliedOn") as string
    const type = formData.get("type") as string
    const referralInfo = formData.get("referralInfo") as string
    const packageDetails = formData.get("package") as string
    const interviewDate = formData.get("interviewDate") as string

    try {
        await prisma.job.create({
            data: {
                userId: session.user.id,
                company: company || undefined,
                role: role || undefined,
                location: location || undefined,
                jobPostDate: jobPostDate ? new Date(jobPostDate) : undefined,
                applyBy: applyBy ? new Date(applyBy) : undefined,
                jobLink: jobLink || undefined,
                jobId: jobId || undefined,
                cvVersion: cvVersion || undefined,
                status,
                appliedOn: appliedOn ? new Date(appliedOn) : undefined,
                type: type || undefined,
                referralInfo: referralInfo || undefined,
                package: packageDetails || undefined,
                interviewDate: interviewDate ? new Date(interviewDate) : undefined,
            }
        })

        revalidatePath("/dashboard")
        return { success: true }
    } catch (e) {
        console.error("[add-job]", e)
        return { error: "Failed to add job" }
    }
}

export async function deleteJobAction(jobId: string) {
    const session = await auth()
    if (!session?.user?.id) return { error: "Unauthorized" }

    try {
        await prisma.job.delete({
            where: { id: jobId, userId: session.user.id }
        })
        revalidatePath("/dashboard")
        return { success: true }
    } catch (e) {
        console.error("[delete-job]", e)
        return { error: "Failed to delete job" }
    }
}

export async function editJobAction(prevState: any, formData: FormData) {
    const session = await auth()
    if (!session?.user?.id) return { error: "Unauthorized" }

    const id = formData.get("id") as string
    if (!id) return { error: "No Job ID provided" }

    const company = formData.get("company") as string
    const role = formData.get("role") as string
    const location = formData.get("location") as string
    const jobPostDate = formData.get("jobPostDate") as string
    const applyBy = formData.get("applyBy") as string
    const jobLink = formData.get("jobLink") as string
    const jobId = formData.get("jobId") as string
    const cvVersion = formData.get("cvVersion") as string
    const status = formData.get("status") as string || "Saved"
    const appliedOn = formData.get("appliedOn") as string
    const type = formData.get("type") as string
    const referralInfo = formData.get("referralInfo") as string
    const packageDetails = formData.get("package") as string
    const interviewDate = formData.get("interviewDate") as string

    try {
        await prisma.job.update({
            where: { id, userId: session.user.id },
            data: {
                company: company || null,
                role: role || null,
                location: location || null,
                jobPostDate: jobPostDate ? new Date(jobPostDate) : null,
                applyBy: applyBy ? new Date(applyBy) : null,
                jobLink: jobLink || null,
                jobId: jobId || null,
                cvVersion: cvVersion || null,
                status,
                appliedOn: appliedOn ? new Date(appliedOn) : null,
                type: type || null,
                referralInfo: referralInfo || null,
                package: packageDetails || null,
                interviewDate: interviewDate ? new Date(interviewDate) : null,
            }
        })

        revalidatePath("/dashboard")
        return { success: true }
    } catch (e) {
        console.error("[edit-job]", e)
        return { error: "Failed to edit job" }
    }
}
