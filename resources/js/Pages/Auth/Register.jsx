import React from 'react'
import { Head , Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { RegisterForm } from '@/Components/Auth/RegisterForm';

const Register = () => {
  return (
    <>
        <Head title="Signup"/>
        <div className="flex min-h-svh flex-col items-center justify-center gap-6  rounded-sm md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
            <RegisterForm />
        </div>
        </div>
    </>
  )
}

Register.layout = (page) => <GuestLayout children={page} />;
export default Register;
