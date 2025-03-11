import React from 'react'
import Layout from "@/Layouts/Layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, KeyRound } from "lucide-react"
import { Link , useForm } from "@inertiajs/react"
const Index = ({email,token}) => {
  const { data, setData, post, processing, errors } = useForm({
    email: email,
    token: token,
    password: '',
    password_confirmation: '',
  })
  function handleSubmit(e){
      e.preventDefault()
      post('/reset-password');
  }
  return (
  <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <KeyRound className="h-6 w-6 text-primary" />
          </div>
        </div>
        <CardTitle className="text-center text-2xl">Reset Your Password</CardTitle>
        <CardDescription className="text-center">Please enter a new password for your account.</CardDescription>
      </CardHeader>
      <CardContent>
        {errors.token && (
          <Alert  className="mb-6 text-danger border-danger">
              <AlertCircle className="h-4 w-4 stroke-danger"/>
              <AlertTitle>Error</AlertTitle>
              <AlertDescription >{errors.token}</AlertDescription>
          </Alert>
        )}
        {errors.email && (
          <Alert  className="mb-6 text-danger border-danger">
              <AlertCircle className="h-4 w-4 stroke-danger"/>
              <AlertTitle>Error</AlertTitle>
              <AlertDescription >{errors.email}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <Input
              id="password"
              type="password"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              autoComplete="current-password"
              placeholder="Enter your new password"
              required
            />
            <p className="text-xs text-muted-foreground">
            Choose a new password. Make sure it’s secure and unique.
            </p>
            {errors.password && <p className="text-sm text-danger font-medium">{errors.password}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={data.password_confirmation}
              onChange={(e) => setData('password_confirmation', e.target.value)}
              autoComplete="new-password"
              placeholder="Confirm your new password"
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={processing}>
            {processing ? "Resetting Password..." : "Reset Password"}
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
  </div>
  )
}
Index.layout = (page) => <Layout children={page} />
export default Index
