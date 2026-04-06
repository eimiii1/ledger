'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useState } from 'react'

export default function Login() {
    const [emailAddress, setEmailAddress] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState(null)
    const [error, setError] = useState(null)

    return (
        <div className='flex flex-col justify-start items-center mt-10 p-5 h-screen w-screen'>
            <header className='flex flex-col justify-center items-center p-10 gap-2'>
                <h1 className='flex flex-col text-center'>
                    <span className='text-[#5f4bd2] text-4xl font-bold'>Hello,</span>
                    <span className='font-medium text-3xl'>Welcome back</span>
                </h1>
            </header>
            <div className='flex flex-col gap-8 w-screen p-10'>
                <div className='flex flex-col gap-2'>
                    <Label>Email</Label>
                    <Input
                        className='bg-transparent border-t-0 border-r-0 border-l-0 rounded-none p-1 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:border-trasparent'
                        placeholder='e.g. eimii@example.com'
                        value={emailAddress}
                        onChange={e => setEmailAddress(e.target.value)}
                        required
                        type='email'
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <Label>Password</Label>
                    <Input
                        className='bg-transparent border-t-0 border-r-0 border-l-0 rounded-none p-1 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:border-trasparent'
                        placeholder='e.g. ••••••••'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        type='password'
                    />
                </div>
            </div>
            <Button variant='link'>
                <Link href='/forgot-password'>Forgot Password?</Link>
            </Button>
            <div className='w-screen p-10 pb-20'>
                <Button
                    className='w-full p-6 font-bold'
                    style={{ background: 'linear-gradient(to right, #5f4bd2, #4b3c9f)' }}
                    type='button'
                >LOG IN</Button>
            </div>
            <footer>
                New to Ledger? <Link href='/register' className='text-[#5f4bd2] font-bold'>Sign Up</Link>
            </footer>
        </div>
    )
}