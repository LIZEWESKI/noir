import React, {useEffect} from 'react'
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { Head, usePage} from '@inertiajs/react';
import Layout from '@/layouts/layout';
import { LoginForm } from "../../components/login-form"
const Login = () => {
  const {flash, status} = usePage().props;
  useEffect(() => {
    status && toast.success(status, {
      descriptionClassName: "text-white/90", 
      duration: 5000,
      position: "top-center",
      style: {
        backgroundColor: "var(--success)",
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
        backgroundColor: "var(--danger)",
        color: "#fff",
      },
    })
  }, [flash]);
  return (
    <>
        <Head title="Login"/>
        <div className="flex min-h-svh flex-col items-center justify-center gap-6  rounded-sm md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
            <LoginForm />
        </div>
        </div>
        <Toaster />
    </>
  )
}

Login.layout = (page) => <Layout children={page} />;
export default Login;
