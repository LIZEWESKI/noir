import React from 'react'
import { Head , Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { LoginForm } from "@/Components/Auth/LoginForm"

const Login = () => {
  return (
    <>
        <Head title="Login"/>
        <div className="flex min-h-svh flex-col items-center justify-center gap-6  rounded-sm md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
            <LoginForm />
        </div>
        </div>
    </>
  )
}

Login.layout = (page) => <GuestLayout children={page} />;
export default Login;
