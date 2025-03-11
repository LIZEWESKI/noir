import React, {useEffect} from 'react'
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { Head, usePage} from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import { LoginForm } from "./LoginForm"
const Index = () => {
  const {status} = usePage().props;
  useEffect(() => {
    status && toast.success(status, {
      descriptionClassName: "text-white/90", 
      duration: 5000,
      position: "top-center",
    })
  }, [status]);
  return (
    <>
        <Head title="Login"/>
        <div className="flex min-h-svh flex-col items-center justify-center gap-6  rounded-sm md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
            <LoginForm />
        </div>
        </div>
        <Toaster  
          toastOptions={{
            style: {
              backgroundColor: "var(--success)",
              color: "#fff",
            }
        }}/>
    </>
  )
}

Index.layout = (page) => <Layout children={page} />;
export default Index;
