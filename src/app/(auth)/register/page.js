'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { HugeiconsIcon } from '@hugeicons/react'
import { AlertCircleIcon } from '@hugeicons/core-free-icons'
import Link from 'next/link'

export default function Register() {
    const [name, setName] = useState('')
    const [emailAddress, setEmailAddress] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState(null)
    const [error, setError] = useState(null)

    const router = useRouter()

    const handleRegister = async () => {
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
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
            setName('')
            setEmailAddress('')
            setPassword('')
            setError(null)
            router.push('/profile')
        } catch (err) {
            alert(err.message)
            setError(err.message)
        }
    }

    return (
        <div
            className='flex flex-col justify-start items-center p-5 h-screen w-screen'
        >
            <header className='flex flex-col justify-center items-center p-10 gap-2'>
                <h1 className='font-semibold text-4xl w-full text-center'>Create your account</h1>
                <p className='text-[#5f4bd2] text-sm font-semibold'>Join Ledger. Manage Smarter.</p>
            </header>

            {error ? (
                <Alert variant='destructive' className='max-w-md border-0'>
                    <HugeiconsIcon icon={AlertCircleIcon} />
                    <AlertTitle>Registration failed</AlertTitle>
                    <AlertDescription>
                        <span
                            className='flex flex-col'
                        >
                            • {error}
                        </span>
                    </AlertDescription>
                </Alert>
            ) : null}

            <div className='flex flex-col gap-4 w-screen p-10'>
                <div className='flex flex-col gap-2'>
                    <Label>Name</Label>
                    <Input
                        className='bg-transparent rounded-sm p-5 focus-visible:ring-[#5f4bd2] focus-visible:ring-[1.5px]'
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                        type='text'
                    />
                </div>
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
                    <Label>Password</Label>
                    <Input
                        className='bg-transparent rounded-sm p-5 focus-visible:ring-[#5f4bd2] focus-visible:ring-[1.5px]'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        type='password'
                    />
                </div>
            </div>
            <div className='w-[60vw] text-center text-sm'>
                By signing up you are agreeing to our{' '}
                <span className='text-[#5f4bd2] font-semibold'>Terms & Conditions</span>
                {' '}and{' '}
                <span className='text-[#5f4bd2] font-semibold'>Privacy Policy</span>
            </div>
            <div className='w-screen p-10 pb-20'>
                <Button
                    className='w-full p-6 font-bold rounded-sm'
                    style={{ background: 'linear-gradient(to right, #4b3c9f, #5f4bd2)' }}
                    type='button'
                    onClick={handleRegister}
                >SIGN UP</Button>
            </div>
            <footer>
                <span className='font-medium opacity-60'>Already a member? </span> {' '}
                <Link href='/login' className='text-[#5f4bd2] font-bold'>Login</Link>
            </footer>
        </div>
    )
}