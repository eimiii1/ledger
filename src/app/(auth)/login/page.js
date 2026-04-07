'use client'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertCircleIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Login() {
    const [emailAddress, setEmailAddress] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState(null)
    const [error, setError] = useState(null)

    const router = useRouter()

    const handleLogin = async () => {
        try {
            const response = await fetch('api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email_address: emailAddress,
                    password
                })
            })

            if (!response.ok) {
                const error = await response.json()
                setError(error.message)
                return
            }

            const data = await response.json()
            setMessage(data.message)
            setEmailAddress('')
            setPassword('')
            setError(null)
            router.push('/dashboard')
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div className='h-screen  w-screen flex flex-row-reverse p-5'>
            <div className='flex flex-col justify-start lg:justify-center flex-1 items-center lg:p-18'>
                <header className='flex flex-col justify-center items-center p-10 gap-2'>
                    <h1 className='text-4xl font-semibold w-full text-center'>Sign in to your account</h1>
                    <p className='text-sm text-[#5f4bd2] font-semibold'>Welcome back. Your finances await.</p>
                </header>

                {error ? (
                    <Alert variant='destructive' className='max-w-md border-0'>
                        <HugeiconsIcon icon={AlertCircleIcon} />
                        <AlertTitle>Login failed</AlertTitle>
                        <AlertDescription>
                            <span
                                className='flex flex-col'
                            >
                                • {error}
                            </span>
                        </AlertDescription>
                    </Alert>
                ) : null}

                <div className='flex flex-col gap-4 w-full p-4'>
                    <div className='flex flex-col gap-2'>
                        <Label>Email</Label>
                        <Input
                            className='bg-transparent rounded-sm p-5 focus-visible:ring-[#5f4bd2] focus-visible:ring-[1.5px]'
                            value={emailAddress}
                            onChange={e => setEmailAddress(e.target.value)}
                            required
                            type='email'
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className='flex justify-between'>
                            <Label>Password</Label>
                            <Label>
                                <Link
                                    href='/forgot-password'
                                    className='text-[#5f4bd2] font-semibold'
                                >Forgot Password?</Link>
                            </Label>
                        </div>
                        <Input
                            className='bg-transparent rounded-sm p-5 focus-visible:ring-[#5f4bd2] focus-visible:ring-[1.5px]'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            type='password'
                        />
                    </div>
                    <Button
                        className='w-full p-6 font-bold rounded-sm'
                        style={{ background: 'linear-gradient(to right, #5f4bd2, #4b3c9f)' }}
                        type='button'
                        onClick={handleLogin}
                    >LOG IN</Button>
                </div>
                <footer>
                    <span className='font-medium opacity-60'>New to Ledger?</span> {' '}
                    <Link href='/register' className='text-[#5f4bd2] font-bold'>Create an account</Link>
                </footer>
            </div>
            <div className='hidden lg:flex flex-3 justify-center items-center relative'>
                <Image
                src='/auth/ledger_login_illustration.svg'
                alt=''
                fill
                className='object-contain'
                />
            </div>
        </div>
    )
}