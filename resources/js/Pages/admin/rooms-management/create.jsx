import { useEffect, useState } from "react"
import AppLayout from "@/layouts/app-layout"
import { Head, useForm } from "@inertiajs/react"
import { Upload, X, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { roomStatuses,bedTypes, roomTypes } from "@/components/rooms-management/rooms-data"
const breadcrumbs= [
    {
      title: 'Rooms Management',
      href: '/admin/rooms-management',
    },
    {
      title: 'Create Room',
      href: '/admin/rooms-management/create',
    },
];

export default function Create({features}) {

  const defaultRoom = {
    name: "",
    room_number: "",
    type: "",
    price: "",
    status: "",
    image_path: "",
    size: "",
    guests: 1,
    bathrooms: 1,
    bed: "",
    description: "",
    features: [],
  }
  const { data, setData, post, processing, errors } = useForm(defaultRoom)
  const [imagePreview, setImagePreview] = useState(data.image_path || null)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("clicked?")
    post(route('admin.rooms_management.store'))
  }
  console.log(errors)
  console.log(data)
  const toggleFeature = (feature) => {
    const isSelected = data.features.some((f) => f === feature)
    if (isSelected) {
      setData({...data,features: data.features.filter((f) => f !== feature)})
    } else {
      if (data.features.length < 3) setData({...data,features: [...data.features, feature]})
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setData((prev) => ({
        ...prev,
        image_path: file,
      }))
    }
    const previewUrl = URL.createObjectURL(file)
    setImagePreview(previewUrl)
  }


  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Room"/>
      <div className="min-h-screen ">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-8">
            {/* Main Information Section */}
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-1">Main Information</h2>
                <p className="text-sm text-muted-foreground">Essential details about the room</p>
              </div>

              <Card className="border shadow-sm bg-card">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">
                        Room Name <span className="text-destructive">*</span> 
                      </Label>
                      <Input
                        id="name"
                        value={data.name}
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                        placeholder="Ocean View Suite"
                        className={`h-11 ${errors.name ? "border-destructive focus-visible:ring-destructive" : "focus-visible:ring-primary"}`}
                      />
                      {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="type" className="text-sm font-medium">
                        Room Category <span className="text-destructive">*</span>
                      </Label>
                      <Select value={data.type} onValueChange={(value) => setData({ ...data, type: value })}>
                        <SelectTrigger className={`h-11 ${errors.type ? "border-destructive" : "focus:ring-primary"}`}>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {roomTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.type && <p className="text-xs text-destructive">{errors.type}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="room_number" className="text-sm font-medium">
                        Room Number <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="room_number"
                        value={data.room_number}
                        onChange={(e) => setData({ ...data, room_number: e.target.value })}
                        placeholder="101"
                        className={`h-11 ${errors.room_number ? "border-destructive focus-visible:ring-destructive" : "focus-visible:ring-primary"}`}
                      />
                      {errors.room_number && <p className="text-xs text-destructive">{errors.room_number}</p>}
                    </div>
                  </div>

                  <div className="mt-6">
                    <Label htmlFor="description" className="text-sm font-medium">
                      Description <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="description"
                      value={data.description}
                      onChange={(e) => setData({ ...data, description: e.target.value })}
                      placeholder="Describe the room amenities and unique features..."
                      rows={3}
                      className={`mt-2 resize-none bg-background ${errors.room_number ? "border-destructive focus-visible:ring-destructive" : "focus-visible:ring-primary"}`}
                    />
                    {errors.description && <p className="text-xs text-destructive mt-2">{errors.description}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <div className="space-y-2">
                      <Label htmlFor="price" className="text-sm font-medium">
                        Price per Night <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="price"
                        type="number"
                        value={data.price}
                        onChange={(e) => setData({ ...data, price: Number.parseFloat(e.target.value) })}
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        className={`h-11 ${errors.price ? "border-destructive focus-visible:ring-destructive" : "focus-visible:ring-primary"}`}
                      />
                      {errors.price && <p className="text-xs text-destructive">{errors.price}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bed" className="text-sm font-medium">
                        Bed Type <span className="text-destructive">*</span>
                      </Label>
                      <Select value={data.bed} onValueChange={(value) => setData({ ...data, bed: value })}>
                        <SelectTrigger className={`h-11 ${errors.bed ? "border-destructive" : "focus:ring-primary"}`}>
                          <SelectValue placeholder="Select bed type" />
                        </SelectTrigger>
                        <SelectContent>
                          {bedTypes.map((bed) => (
                            <SelectItem key={bed} value={bed}>
                              {bed}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.bed && <p className="text-xs text-destructive">{errors.bed}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="status" className="text-sm font-medium">
                        Status <span className="text-destructive">*</span>
                      </Label>
                      <Select value={data.status} onValueChange={(value) => setData({ ...data, status: value })}>
                        <SelectTrigger className="h-11 focus:ring-primary">
                          <SelectValue placeholder="Select room status"/>
                        </SelectTrigger>
                        <SelectContent>
                          {roomStatuses.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.status && <p className="text-xs text-destructive">{errors.status}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <div className="space-y-2">
                      <Label htmlFor="size" className="text-sm font-medium">
                        Size (sq ft) <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="size"
                        type="text"
                        value={data.size}
                        onChange={(e) => setData({ ...data, size: e.target.value})}
                        placeholder="e.g., 45 m²"
                        className={`h-11 ${errors.size ? "border-destructive focus-visible:ring-destructive" : "focus-visible:ring-primary"}`}
                      />
                      {errors.size && <p className="text-xs text-destructive">{errors.size}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="guests" className="text-sm font-medium">
                        Max Guests <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="guests"
                        type="number"
                        value={data.guests}
                        onChange={(e) => setData({ ...data, guests: Number.parseInt(e.target.value) })}
                        placeholder="0"
                        min="1"
                        max="5"
                        className={`h-11 ${errors.guests ? "border-destructive focus-visible:ring-destructive" : "focus-visible:ring-primary"}`}
                      />
                      {errors.guests && <p className="text-xs text-destructive">{errors.guests}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bathrooms" className="text-sm font-medium">
                        Bathrooms <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="bathrooms"
                        type="number"
                        value={data.bathrooms}
                        onChange={(e) => setData({ ...data, bathrooms: Number.parseInt(e.target.value) })}
                        placeholder="0"
                        min="1"
                        max="5"
                        className={`h-11 ${errors.bathrooms ? "border-destructive focus-visible:ring-destructive" : "focus-visible:ring-primary"}`}
                      />
                      {errors.bathrooms && <p className="text-xs text-destructive">{errors.bathrooms}</p>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Features & Media Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Features */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-1">Room Features</h2>
                  <p className="text-sm text-muted-foreground">Select up to 3 key features</p>
                </div>

                <Card className="border shadow-sm bg-card">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Info className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">
                        {data.features.length}/3 features selected
                      </span>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      {features.map((feature) => {
                        const isSelected = data.features.some((f) => f === feature)
                        const isDisabled = !isSelected && data.features.length >= 3

                        return (
                          <Button
                            key={feature}
                            type="button"
                            variant={isSelected ? "default" : "outline"}
                            size="sm"
                            disabled={isDisabled}
                            onClick={() => toggleFeature(feature)}
                            className={`justify-center h-9 ${
                              isSelected
                                ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                                : "hover:bg-primary/10 hover:border-primary/50"
                            }`}
                          >
                            {feature}
                          </Button>
                        )
                      })}
                    </div>
                    {errors.features && <p className="text-xs text-destructive mt-2">{errors.features}</p>}

                    {data.features.length >= 3 && (
                      <p className="text-xs text-muted-foreground mt-3 p-2 bg-muted/50 rounded-md">
                        Maximum features reached. Remove a feature to add another.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Image Upload */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-1">Room Image</h2>
                  <p className="text-sm text-muted-foreground">Upload a high-quality image</p>
                </div>

                <Card className={`shadow-sm bg-card ${errors.image_path ? "border-destructive": "border"}`}>
                  <CardContent className="p-6">
                    {!imagePreview ? (
                      <Label htmlFor="image" className="cursor-pointer block">
                        <div className="border-2 border-dashed border-primary/20 rounded-lg p-8 text-center hover:border-primary/40 hover:bg-primary/5 transition-all duration-200">
                          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Upload className="h-6 w-6 text-primary" />
                          </div>
                          <p className="text-sm font-medium text-foreground mb-1">Upload Room Image</p>
                          <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
                        </div>
                        <Input id="image" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                      </Label>
                    ) : (
                      <div className="space-y-4">
                        <div className="relative group">
                          <img
                            src={imagePreview}
                            alt="Room preview"
                            className="w-full h-48 object-cover rounded-lg border"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2 h-8 w-8 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={
                              () => {
                                setData((prev) => ({ ...prev, image_path: ""}))
                                setImagePreview(null)
                              }
                            }
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <Label htmlFor="image" className="cursor-pointer mt-4 ">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="w-full bg-transparent mt-2 pointer-events-none"
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Replace Image
                          </Button>
                          <Input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </Label>
                      </div>
                    )}
                    {errors.image_path && <p className="text-xs text-destructive">{errors.image_path}</p>}
                  </CardContent>
                </Card>
                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="destructive" onClick={() => window.history.back()}>
                    Cancel
                  </Button>
                  <Button 
                  type="submit"
                  disabled={processing}
                  >
                    Create Room
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  )
}
