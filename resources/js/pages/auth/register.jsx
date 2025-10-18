import React from 'react'
import { Head } from '@inertiajs/react';
import Layout from '@/layouts/layout';
import { RegisterForm } from '@/components/register-form';
import { DemoAccounts } from '@/components/demo/demo-accounts';
import { useMediaQuery } from 'react-responsive';
import { Separator } from '@/components/ui/separator';
const Register = ({demo_accounts}) => {
  const isMobile = useMediaQuery({query:'(max-width: 1034px)'});
  return (
    <>
        <Head title="Sign up"/>
        <div className="flex min-h-svh flex-col items-center justify-center gap-8 p-6 md:p-10 relative">
          <RegisterForm />
          <DemoAccounts 
            demoAccounts={demo_accounts} 
            isMobile={isMobile} 
            isAbsolute
          />
          {isMobile && 
            <>
              <Separator />
              <DemoAccounts demoAccounts={demo_accounts} isMobile={!isMobile} />
            </>
          }
        </div>
    </>
  )
}

Register.layout = (page) => <Layout children={page} />;
export default Register;
