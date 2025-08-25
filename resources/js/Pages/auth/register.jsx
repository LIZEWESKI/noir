import React from 'react'
import { Head , Link } from '@inertiajs/react';
import Layout from '@/layouts/layout';
import { RegisterForm } from '@/components/register-form';

const Register = () => {
  return (
    <>
        <Head title="Sign up"/>
        <div className="flex min-h-svh flex-col items-center justify-center gap-6  rounded-sm md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
            <RegisterForm />
        </div>
        </div>
    </>
  )
}

Register.layout = (page) => <Layout children={page} />;
export default Register;
