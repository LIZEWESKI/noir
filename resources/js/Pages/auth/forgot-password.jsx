import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail } from "lucide-react"
import { Link, useForm, usePage } from "@inertiajs/react"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import Layout from "@/layouts/Layout"
import { useEffect } from "react"

const ForgotPAssword = () => {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    })
    const {status} = usePage().props;
    useEffect(()=> {
        status && toast.success(status, {
          descriptionClassName: "text-white/90", 
          duration: 3000,
          position: "top-center",
          style: {
            backgroundColor: "var(--success)",
            color: "#fff",
          }
        })
    },[status])
    function handleResetPassowrd(e) {
        e.preventDefault();
        post('/forgot-password')
    }
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md">
            <CardHeader>
            <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Mail className="h-6 w-6 text-primary" />
                </div>
            </div>
            <CardTitle className="text-center text-2xl">Forgot Password</CardTitle>
            <CardDescription className="text-center">
                Enter your email address and we'll send you a link to reset your password.
            </CardDescription>
            </CardHeader>
            <CardContent>
                <form className="space-y-6" onSubmit={handleResetPassowrd}>
                    <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                        id="email" 
                        type="email" 
                        value={data.email} 
                        onChange={(e) => setData('email',e.target.value)}
                        placeholder="Enter your email address" 
                        required 
                    />
                    {errors.email && <p className="text-sm text-danger font-medium ">{errors.email}</p>}
                    </div>
                    <Button type="submit" className="w-full" disabled={processing}>
                        Send Reset Link
                    </Button>
                </form>
            </CardContent>
            <CardFooter className="flex justify-center">
                <p className="text-sm text-muted-foreground">
                    Remember your password?{" "}
                    <Link href="/login" className="text-primary hover:underline">
                    Back to login
                    </Link>
                </p>
            </CardFooter>
        </Card>
        <Toaster />
    </div>
  )
}


ForgotPAssword.layout = (page) => <Layout children={page} />
export default ForgotPAssword