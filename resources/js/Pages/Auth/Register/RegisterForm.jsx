import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import InputField from "@/components/Form/InputField"
import AppLogo from "@/components/AppLogo"
import { useForm, Link } from '@inertiajs/react'
export function RegisterForm({className,...props}) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      })
    const formFields = [
      { label: "Username", placeholder: "Darth Noir", name: "name", type: "text", value: data.name, },
      { label: "Email",placeholder: "noir@darth.com", name: "email", type: "email", value: data.email,  },
      { label: "Password", name: "password", type: "password", value: data.password, },
      { label: "Confirm Password", name: "password_confirmation", type: "password", value: data.password_confirmation}
    ];
    function handleRegister(e) {
        e.preventDefault();
        post("register");
    }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
        <CardTitle className="text-xl flex items-center justify-center gap-1 rounded-md">
            <AppLogo />
            <h1 className='text-extrabold'>Noir.</h1>
        </CardTitle>
          <CardDescription>
            Sign up with your Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister}>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
              <Button type="button" variant="outline" className="w-full" onClick={() => window.location.href = '/auth/redirect'}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Sign up  with Google
                </Button>
              </div>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <div className="grid gap-6">
              {formFields.map((field,index) => (
              <InputField
              key={index}
              label={field.label}
              name={field.name}
              value={field.value}
              type={field.type}
              error={errors[field.name]}
              setData={setData}
              placeholder={field.placeholder || field.label}
              />
              ))}
                <Button type="submit" variant="outline" className="w-full px-8 border-[1px] border-success" disabled={processing}>
                  Sign up
                </Button>
              </div>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href={route("login")} className="underline underline-offset-4">
                  Log in
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <Link href="terms-of-service">Terms of Service</Link>{" "}
        and <Link href="privacy-policy">Privacy Policy</Link>.
      </div>
    </div>
  )
}
