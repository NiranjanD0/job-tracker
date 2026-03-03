"use server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { signIn } from "@/lib/auth"
import { AuthError } from "next-auth"

export async function signupAction(prevState: any, formData: FormData) {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!email || !password || !name) {
        return { error: "Missing required fields" }
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            return { error: "Email already in use" }
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })

        return { success: true }
    } catch (e) {
        console.error(e)
        return { error: "Something went wrong" }
    }
}

export async function loginAction(prevState: any, formData: FormData) {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!email || !password) {
        return { error: "Missing required fields" }
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: "/dashboard",
        })
        return { success: true }
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials." }
                default:
                    return { error: "Something went wrong." }
            }
        }
        throw error // Rethrow to allow redirect to happen
    }
}
