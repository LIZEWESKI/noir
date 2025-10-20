import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, User, Eye, EyeOff } from "lucide-react"
import AppLayout from "@/layouts/app-layout"
import { Head, router, useForm } from "@inertiajs/react"

const breadcrumbs= [
  {
    title: 'Dashboard',
    href: '/admin/dashboard',
  },
  {
    title: 'Guests Management',
    href: '/admin/guests-management',
  },
  {
    title: 'Create Guest',
    href: '/admin/guests-management/create',
  },
];

export default function CreateGuest() {
const { data, setData, post, processing, errors } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "",
    profile_picture_path: null,
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)


  const handleInputChange = (field, value) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    post('/admin/guests-management')
  }

  const handleCancel = () => {
    router.visit("/admin/guests-management")
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Create Guest" />
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <p className="text-muted-foreground mt-2">Add a new guest to the system</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* General Information */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-medium mb-6 text-foreground">General Information</h2>

                {/* Profile Picture */}
                <div className="flex flex-col items-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-muted border-2 border-dashed border-border flex items-center justify-center mb-4">
                    {data.profile_picture_path ? (
                      <img
                        src={URL.createObjectURL(data.profile_picture_path)}
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-8 h-8 text-muted-foreground" />
                    )}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById("profile-upload").click()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Photo
                  </Button>
                  <input
                    id="profile-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleInputChange("profile_picture_path", e.target.files[0])}
                  />
                  {errors.profile_picture_path && <p className="text-xs text-destructive">{errors.profile_picture_path}</p>}
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    Upload a profile picture for the guest (optional)
                  </p>
                </div>

                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name <span className="text-destructive">*</span></Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter full name"
                    value={data.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                  {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}

                  <p className="text-xs text-muted-foreground">Enter the guest's full name as it appears on their ID</p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-medium mb-6 text-foreground">Contact Information</h2>

                {/* Email */}
                <div className="space-y-2 mb-6">
                  <Label htmlFor="email">Email Address <span className="text-destructive">*</span></Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="guest@example.com"
                    value={data.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                  {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                  <p className="text-xs text-muted-foreground">This email will be used for login and communication</p>
                </div>

                <div className="space-y-2 mb-6">
                  <Label htmlFor="password">Password <span className="text-destructive">*</span></Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      value={data.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
                  <p className="text-xs text-muted-foreground">Create a secure password (minimum 8 characters)</p>
                </div>
              </CardContent>
            </Card>

            {/* Parameters & Security */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-medium mb-6 text-foreground">Security & Settings</h2>

                <div className="space-y-2 mb-6">
                  <Label htmlFor="password_confirmation">Confirm Password <span className="text-destructive">*</span></Label>
                  <div className="relative">
                    <Input
                      id="password_confirmation"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      value={data.password_confirmation}
                      onChange={(e) => handleInputChange("password_confirmation", e.target.value)}
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  {errors.password_confirmation && <p className="text-xs text-destructive">{errors.password_confirmation}</p>}
                  <p className="text-xs text-muted-foreground">Re-enter your new password to confirm</p>
                </div>

                {/* Role */}
                <div className="space-y-2">
                  <Label htmlFor="role">User Role</Label>
                  <Select value={data.role} onValueChange={(value) => handleInputChange("role", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">Guest</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="receptionist">Receptionist</SelectItem>
                      <SelectItem value="accountant">Accountant</SelectItem>
                      <SelectItem value="housekeeping">Housekeeping</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.role && <p className="text-xs text-destructive">{errors.role}</p>}
                  <p className="text-xs text-muted-foreground">Select the access level for this user account</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <Button type="button" variant="outline" onClick={handleCancel} className="px-8 bg-transparent">
              Cancel
            </Button>
            <Button 
                disabled={processing}
                type="submit" 
                className="px-8 bg-primary hover:bg-primary/90"
            >
              Create Guest
            </Button>
          </div>
        </form>
      </div>
    </div>
    </AppLayout>
  )
}
