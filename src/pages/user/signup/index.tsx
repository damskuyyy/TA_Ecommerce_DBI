import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Head from "next/head"
import { signIn } from "next-auth/react"
import { FormEvent, useState } from "react"
import axios from "axios"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/router"
import { cn } from "@/lib/utils"
import { Shell } from "lucide-react"
import Combobox from "@/components/ui/combobox"


export default function Signup() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const { push } = useRouter()
  const { toast } = useToast()
  const [load, setLoad] = useState(false)
  const [dialCode, setDialCode] = useState('')

  const handlesignupGoogle = async () => {
    try {
      await signIn('google', { redirect: false, callbackUrl: '/' })
    } catch (error) {
      console.log(error)
    }
  }

  const handleSignup = async (e: FormEvent) => {
    setLoad(true)
    e.preventDefault()
    const body = {
      name: firstName + ' ' + lastName,
      email,
      password,
      phone: (dialCode + phone)
    }
    if (!firstName || !lastName || !email || !password || !confirmPassword || !phone) {
      toast({
        className: cn(
          'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
        ),
        title: 'Uh oh! Something went wrong.',
        description: 'All field is required!!!',
        variant: 'destructive',
      })
      setLoad(false)
    } else {
      try {
        if (password === confirmPassword) {
          await axios.post('/api/user/post', body)
          setLoad(true)
          toast({
            className: cn(
              'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
            ),
            title: 'Success!',
            description: 'The user has been succesfully registered. You will redirect to login page!',
            variant: 'default'
          })
          setTimeout(() => {
            push('/user/login')
            setLoad(false)
          }, 1500)
        } else {
          toast({
            className: cn(
              'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
            ),
            title: 'Uh oh! Something went wrong.',
            description: 'Please make the password and confirm password the same!',
            variant: 'destructive',
          })
          setLoad(false)
        }
      } catch (error) {
        setLoad(false)
        console.log(error)
        toast({
          className: cn(
            'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
          ),
          title: 'Uh oh! Something went wrong.',
          description: 'Error while fetching',
          variant: 'destructive'
        })
      }
    }
  }

  return (
    <>
      <Head>
        <title>DBIX | Signup</title>
      </Head>
      <div className="w-full h-screen flex justify-center items-center relative lg:px-0 px-6">
        <Card className="mx-auto max-w-lg w-full">
          <CardHeader>
            <CardTitle className="text-xl">Sign Up</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup} className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input id="first-name" placeholder="Max" onChange={(e) => { setFirstName(e.target.value) }} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input id="last-name" placeholder="Robinson" onChange={(e) => { setLastName(e.target.value) }} />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="dbix@example.com"
                  onChange={(e) => { setEmail(e.target.value) }}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Phone Number</Label>
                <div className="flex items-center gap-1">
                  <Combobox dialCode={phone} setDialCode={setPhone} />
                  <Input
                    id="numb"
                    type="tel"
                    placeholder="896xxxx"
                    onChange={(e) => { setPhone(e.target.value) }}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" onChange={(e) => { setPassword(e.target.value) }} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Confirm Password</Label>
                <Input id="password" type="password" onChange={(e) => { setConfirmPassword(e.target.value) }} />
              </div>
              <Button type="submit" disabled={load} className="w-full flex items-center gap-2">
                {load ? (
                  <>
                    <Shell size={24} strokeWidth={2} className="animate-spin" />
                    Loading...
                  </>
                ) : 'Create an accoount!'}
              </Button>
              <Button variant="outline" type="button" className="w-full" onClick={handlesignupGoogle}>
                Sign up with Google
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/user/login" className="underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>

      </div>
    </>
  )
}
