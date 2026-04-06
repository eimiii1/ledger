import { NextResponse } from "next/server";
import { z } from 'zod'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from "@/lib/models/User";
import { connectDB } from "@/lib/database";

const registerSchema = z.object({
    name: z.string().min(1, 'Name field cannot be empty'),
    email_address: z.string().email('Invalid email address'),
    password: z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must contain uppercase, lowercase, number and special character')
})

export async function POST(request) {
    try {
        await connectDB()
        const body = await request.json()
        console.log(body)
        const result = registerSchema.safeParse(body)
        if (!result.success) {
            return NextResponse.json(
                { message: result.error.issues[0].message },
                { status: 400 }
            )
        }

        // * if input validated -> process registration and create a token for instant login
        const hashedPassword = await bcrypt.hash(result.data.password, 10)

        const user = await User.create({
            name: result.data.name,
            email_address: result.data.email_address,
            password: hashedPassword
        })

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
        const response = NextResponse.json(
            { message: 'Registration successful!', userId: user._id },
            { status: 201 }
        )

        response.cookies.set('token', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return response
    } catch (err) {
        if (err.code === 11000) {
            return NextResponse.json(
                { message: `Email address already exists!` },
                { status: 409 }
            )
        }

        return NextResponse.json(
            { message: `Registration error: ${err.message}` },
            { status: 500 }
        )
    }
}