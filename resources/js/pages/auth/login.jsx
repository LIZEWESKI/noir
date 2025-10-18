import React, {useEffect} from 'react'
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { Head, usePage} from '@inertiajs/react';
import Layout from '@/layouts/layout';
import { LoginForm } from "../../components/login-form"
import { DemoAccounts } from '@/components/demo/demo-accounts';
const Login = ({demo_accounts}) => {
  
  const {flash, status} = usePage().props;
  useEffect(() => {
    status && toast.success(status, {
      descriptionClassName: "text-white/90", 
      duration: 5000,
      position: "top-center",
      style: {
        backgroundColor: "hsl(var(--primary))",
        color: "#fff",
      },
    })
  }, [status]);
  useEffect(() => {
    flash?.error && toast.error(flash.error, {
      descriptionClassName: "text-white/90", 
      duration: 9000,
      position: "top-center",
      style: {
        backgroundColor: "hsl(var(--destructive))",
        color: "#fff",
      },
    })
  }, [flash]);

  return (
    <>
      <Head title="Login"/>
      <div className="flex min-h-svh flex-col items-center justify-center gap-8 p-6 md:p-10 relative">
        <LoginForm />
        <DemoAccounts demoAccounts={demo_accounts} />
      </div>
      <Toaster />
    </>
  )
}

Login.layout = (page) => <Layout children={page} />;
export default Login;
