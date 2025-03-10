import React, { useRef } from 'react'
import { useForm , usePage, router} from '@inertiajs/react'
import Edit from './Edit'
import Layout from '@/Layouts/Layout'
import InputField  from "@/components/Form/InputField"
import { Button } from '@/Components/ui/button'

const UpdateProfileForm = () => {
  const {user} = usePage().props.auth;
  const { data, setData, post, processing, errors } = useForm({
    name : user?.name,
    profile_picture : undefined,
  })
  const fileInputRef = useRef(null);
  const formFields = [
    { label: "Username", placeholder: "Darth Noir", name: "name", type: "text", value: data.name, description: "This is your public display name. It can be your real name or pseudonym."},
    { label: "Profile Picture", name: "profile_picture", type: "file", description: "PNG, JPG and WEBP are allowed as profile picture.", ref :fileInputRef},
  ];
  function updateProfile(e) {
    e.preventDefault();
    post("/profile", {
      onSuccess: () => {
        router.visit(route('profile.edit'), { replace: true });
        fileInputRef.current ? fileInputRef.current.value = '' : '';
      }})
  }
  return (
    <>
        <div className='border-b pb-2'>
          <h3 className="text-lg font-semibold">Profile Information</h3>
          <p className="leading-7 text-muted-foreground">
          Update your account's profile information and email address.
          </p>
        </div>
        <form className='space-y-6 flex flex-col' encType="multipart/form-data" onSubmit={updateProfile}>
          {formFields.map((field,index) => (
            <InputField
            key={index}
            label={field.label}
            name={field.name}
            value={field.value}
            type={field.type}
            description={field.description}
            error={errors[field.name]}
            inputRef={field.ref || null}
            setData={setData}
            placeholder={field.placeholder || field.label}
          />
          ))}
          <div>
            <Button type="submit" className="mt-auto bg-success text-white" disabled={processing}>Update profile</Button>
          </div>
        </form>
    </>
  )
}
UpdateProfileForm.layout = (page) => (
  <Layout>
    <Edit children={page}/>
  </Layout>
);
export default UpdateProfileForm