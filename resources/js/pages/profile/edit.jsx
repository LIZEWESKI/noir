import React from 'react'
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { Head, usePage , router} from "@inertiajs/react"
const Edit = ({children}) => {
  const {url} = usePage();
  const { flash, errors } = usePage().props;
  flash.success && toast.success(flash.success, {
    descriptionClassName: "text-white/90", 
    duration: 3000,
    position: "top-center",
    style: {
      backgroundColor: "hsl(var(--primary))",
      color: "#fff",
    }
  })
  errors.error && toast.error(errors.error, {
    descriptionClassName: "text-white/90", 
    duration: 3000,
    position: "top-center",
    style: {
      backgroundColor: "hsl(var(--destructive))",
      color: "#fff",
    }
  })
  const sidebarItems = [
    { id: "profile", 
      label: "Profile", 
      link: "profile.edit", 
      url: "/profile" 
    },
    { 
      id: "password", 
      label: "Password", 
      link: "profile.edit.password",  
      url: "/profile/password"
    },
    { 
      id: "reservations",
      label: "Reservations & Payments",
      link: "profile.reservations",
      url: "/profile/reservations"
    },
  ]
  return (
    <>
    <Head title="Profile"/>
    <div className='space-y-6 py-4'>
      <div className='border-b pb-2'>
        <h2 className="text-2xl font-extrabold   ">
          Profile
        </h2>
        <p className="leading-7 text-muted-foreground">
          Manage your account settings.
        </p>
      </div>
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <nav className="-mx-4 lg:w-1/5 p-4 overflow-x-auto">
            <div className='flex min-w-max space-x-1 md:flex-col md:space-x-0 md:space-y-1'>
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => router.visit(route(item.link))}
                  className={`rounded-lg px-4 py-2 text-left text-sm font-medium transition-colors text-primary bg-background hover:bg-muted ${url ==  item.url && "bg-muted"}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
          <main className="space-y-6 flex-1 lg:max-w-2xl">
            {children}
            <Toaster />
          </main>
        </div>
    </div>
    </>
  )
}
export default Edit