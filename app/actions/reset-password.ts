"use server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function resetPasswordAction(prevState: any, formData: FormData) {
    const token = formData.get("token") as string
    const password = formData.get("password") as string

    if (!token || !password) {
        return { error: "Missing token or password." }
    }

    try {
        const resetToken = await prisma.resetToken.findUnique({
            where: { token }
        })

        if (!resetToken) {
            return { error: "Invalid or expired reset token." }
        }

        if (resetToken.expires < new Date()) {
            return { error: "Reset token has expired." }
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        // Update user password
        await prisma.user.update({
            where: { email: resetToken.email },
            data: { password: hashedPassword }
        })

        // Delete the token so it can't be used again
        await prisma.resetToken.delete({
            where: { id: resetToken.id }
        })

        return { success: true }
    } catch (e) {
        console.error("[reset-password]", e)
        return { error: "Failed to reset password." }
    }
}
