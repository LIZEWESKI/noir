import React from 'react'
import { Head} from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import { LoginForm } from "./LoginForm"

const Index = () => {
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

Index.layout = (page) => <Layout children={page} />;
export default Index;
