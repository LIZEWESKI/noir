import React, {useEffect, useState} from 'react'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Upload, Check } from "lucide-react"
import { roomStatuses, roomTypes, bedTypes } from './rooms-data';
import { useForm } from "@inertiajs/react"
const RoomModal = ({ room, isOpen, onClose, features }) => {

  const defaultRoom = {
    name: "Rick's Single Room",
    room_number: "404",
    type: "Single",
    price: "149.32",
    status: "Available",
    image_path: "",
    size: "80 m²",
    guests: 1,
    bathrooms: 1,
    bed: "1 King Bed",
    description: "This is Rick's Single Room, This is room isn't a casual one! cause this room is where the Science HAPPEND",
    features: [],
  }
  const { data, setData, post,put, processing, errors } = useForm(defaultRoom)
  function handleSubmit(e) {
      e.preventDefault();

      if (!data.image_path || data.image_path === "") {
        delete data.image_path;
      }

      if(data.id) {
        put(route('admin.rooms_management.update',data.id), data)
        onClose();
      }else {
        post(route('admin.rooms_management.store'),{
          onSuccess: () => {
            onClose()
          }}
        )
      }
  }

  const [selectedFile, setSelectedFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(room?.image_path || "")

  useEffect(() => {
    if (!isOpen) {
      setData(defaultRoom);
      setSelectedFile(null);
      setImagePreview(null);
      return;
    }
    if (room && isOpen) {
      const editedFeature = room.features.map(f => f.name)
      setData({
        ...defaultRoom,
        ...room,
        features: editedFeature,
        image_path: null,
      })
    } else {
      setData(defaultRoom);
    }
  }, [room, isOpen]);

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)

      const previewUrl = URL.createObjectURL(file)
      setImagePreview(previewUrl)

      setData({ ...data, image_path: file })
    }
  }

  const toggleFeature = (feature) => {
    const isSelected = data.features.some((f) => f === feature)
    if (isSelected) {
      setData({
        ...data,
        features: data.features.filter((f) => f !== feature),
      })
    } else {
      if (data.features.length < 3) {
        setData({
          ...data,
          features: [...data.features, feature],
        })
      }
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h2 className="text-xl font-semibold">{room ? "Edit Room" : "Add New Room"}</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Room Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  required
                />
                {errors.name && <p className="text-sm text-destructive font-medium">{errors.name}</p>}
              </div>

              <div>
                <Label htmlFor="room_number">Room Number</Label>
                <Input
                  id="room_number"
                  type="text"
                  value={data.room_number}
                  onChange={(e) => setData({ ...data, room_number: e.target.value })}
                  required
                />
                {errors.room_number && <p className="text-sm text-destructive font-medium">{errors.room_number}</p>}
              </div>

              <div>
                <Label htmlFor="type">Type</Label>
                <Select value={data.type} onValueChange={(value) => setData({ ...data, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {roomTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.type && <p className="text-sm text-destructive font-medium">{errors.type}</p>}
              </div>

              <div>
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={data.price}
                  onChange={(e) => setData({ ...data, price: Number.parseFloat(e.target.value) })}
                  required
                />
                {errors.price && <p className="text-sm text-destructive font-medium">{errors.price}</p>}
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={data.status} onValueChange={(value) => setData({ ...data, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {roomStatuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.status && <p className="text-sm text-destructive font-medium">{errors.status}</p>}
              </div>

              <div>
                <Label htmlFor="size">Size</Label>
                <Input
                  id="size"
                  type="text"
                  value={data.size}
                  onChange={(e) => setData({ ...data, size: e.target.value })}
                  placeholder="e.g., 45 m²"
                  required
                />
                {errors.size && <p className="text-sm text-destructive font-medium">{errors.size}</p>}
              </div>

              <div>
                <Label htmlFor="guests">Guests</Label>
                <Input
                  id="guests"
                  type="number"
                  min="1"
                  value={data.guests}
                  onChange={(e) => setData({ ...data, guests: Number.parseInt(e.target.value) })}
                  required
                />
                {errors.guests && <p className="text-sm text-destructive font-medium">{errors.guests}</p>}
              </div>

              <div>
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input
                  id="bathrooms"
                  type="number"
                  min="1"
                  value={data.bathrooms}
                  onChange={(e) => setData({ ...data, bathrooms: Number.parseInt(e.target.value) })}
                  required
                />
                {errors.bathrooms && <p className="text-sm text-destructive font-medium">{errors.bathrooms}</p>}
              </div>

              <div>
                <Label htmlFor="bed">Bed Type</Label>
                <Select value={data.bed} onValueChange={(value) => setData({ ...data, bed: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {bedTypes.map((bed) => (
                      <SelectItem key={bed} value={bed}>
                        {bed}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.bed && <p className="text-sm text-destructive font-medium">{errors.bed}</p>}
              </div>
            </div>

            <div>
              <Label htmlFor="image">Room Image</Label>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Input id="image" type="file" accept="image/*" onChange={handleFileChange} className="flex-1" />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById("image").click()}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Browse
                    </Button>
                </div>
                {errors.image_path && <p className="text-sm text-destructive font-medium">{errors.image_path}</p>}
              </div>
                {imagePreview && (
                  <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-border">
                    <img
                      src={imagePreview}
                      alt="Room preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                {selectedFile && <p className="text-sm text-muted-foreground">Selected: {selectedFile.name}</p>}
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={data.description}
                onChange={(e) => setData({ ...data, description: e.target.value })}
                rows={3}
                required
              />
              {errors.description && <p className="text-sm text-destructive font-medium">{errors.description}</p>}
            </div>

            <div>
              <Label>
                Features
                <span className="text-sm text-muted-foreground ml-2">({data.features.length}/3 selected)</span>
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
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
                      className="justify-start"
                    >
                      {isSelected && <Check className="h-3 w-3 mr-2" />}
                      {feature}
                    </Button>
                  )
                })}
              </div>
              {errors.features && <p className="text-sm text-destructive font-medium">{errors.features}</p>}
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
              type="submit"
              disabled={processing}
              >
                {room ? "Update Room" : "Create Room"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
export default RoomModal