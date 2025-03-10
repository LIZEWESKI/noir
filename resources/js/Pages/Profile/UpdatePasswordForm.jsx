import React from 'react'
import { useForm , router} from '@inertiajs/react'
import Layout from '@/Layouts/Layout'
import Edit from './Edit'
import InputField from '@/Components/Form/InputField'
import { Button } from '@/Components/ui/button'
const UpdatePasswordForm = () => {
    const { data, setData, put, processing, errors, reset} = useForm({
        current_password : "",
        password: "",
        password_confirmation : "",
    })
    const formFields = [
        { label: "Current Password", name: "current_password", type: "password", value: data.current_password, description: "Enter your current password to verify your identity."},
        { label: "New Password", name: "password", type: "password", value: data.password, description: "Choose a new password. Make sure it’s secure and unique." },
        { label: "Confirm Password", name: "password_confirmation", type: "password", value: data.password_confirmation, description: "Re-enter your new password to confirm."},
      ];
    function UpdatePassword(e) {
        e.preventDefault();
        put("/password", {
            onSuccess: () => {
                reset(),
                router.visit(route('profile.edit'), { replace: true })
            }
          });
    }
  return (
    <>
        <div className='border-b pb-2'>
            <h3 className="text-lg font-semibold">Update Password</h3>
            <p className="leading-7 text-muted-foreground">
            Ensure your account is using a long, random password to stay secure.
            </p>
        </div>
        <form className='space-y-6 flex flex-col'onSubmit={UpdatePassword}>
            {formFields.map((field,index) => (
            <InputField
            key={index}
            label={field.label}
            name={field.name}
            value={field.value}
            type={field.type}
            description={field.description}
            error={errors[field.name]}
            setData={setData}
            placeholder={field.placeholder || field.label}
            />
            ))}
            <div>
                <Button type="submit" className="mt-auto bg-success text-white" disabled={processing}>Save</Button>
            </div>
        </form>
    </>
  )
}
UpdatePasswordForm.layout = (page) => (
  <Layout>
    <Edit children={page}/>
  </Layout>
);
export default UpdatePasswordForm