import React, {useEffect, useState} from 'react'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Upload, Check } from "lucide-react"
import { roomStatuses, roomTypes } from './rooms-data';
const RoomModal = ({ room, isOpen, onClose, onSave, features }) => {
  const defaultRoom = {
    name: "",
    room_number: "",
    type: "Standard",
    price: "",
    status: "available",
    image_path: "",
    size: "",
    guests: 1,
    bathrooms: 1,
    bed: "1 Queen Bed",
    description: "",
    features: [],
  }
  const [formData, setFormData] = useState(room || defaultRoom)
  const bedTypes = ["1 Single Bed", "1 King Bed", "1 Queen Bed", "2 King Beds", "2 King Beds, 1 Single Bed","1 King Bed, 2 Single Beds","1 Queen Bed, 1 Sofa Bed","1 King Bed, 1 Sofa Bed"]

  const [selectedFile, setSelectedFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(room?.image_path || "")

  useEffect(() => {
  if (room) {
    setFormData(room);
  } else {
    setFormData(defaultRoom);
  }
  if(!isOpen) {
    setSelectedFile(null)
    setImagePreview(null)
  }
}, [room, isOpen]);
  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)

      const previewUrl = URL.createObjectURL(file)
      setImagePreview(previewUrl)

      setFormData({ ...formData, image_path: file.name })
    }
  }

  const toggleFeature = (feature) => {
    const isSelected = formData.features.some((f) => f.id === feature.id)
    if (isSelected) {
      setFormData({
        ...formData,
        features: formData.features.filter((f) => f.id !== feature.id),
      })
    } else {
      if (formData.features.length < 3) {
        setFormData({
          ...formData,
          features: [...formData.features, feature],
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Room Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="room_number">Room Number</Label>
                <Input
                  id="room_number"
                  type="text"
                  value={formData.room_number}
                  onChange={(e) => setFormData({ ...formData, room_number: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="type">Type</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
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
              </div>

              <div>
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number.parseFloat(e.target.value) })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
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
              </div>

              <div>
                <Label htmlFor="size">Size</Label>
                <Input
                  id="size"
                  type="text"
                  value={formData.size}
                  onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                  placeholder="e.g., 45 m²"
                  required
                />
              </div>

              <div>
                <Label htmlFor="guests">Guests</Label>
                <Input
                  id="guests"
                  type="number"
                  min="1"
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: Number.parseInt(e.target.value) })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input
                  id="bathrooms"
                  type="number"
                  min="1"
                  value={formData.bathrooms}
                  onChange={(e) => setFormData({ ...formData, bathrooms: Number.parseInt(e.target.value) })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="bed">Bed Type</Label>
                <Select value={formData.bed} onValueChange={(value) => setFormData({ ...formData, bed: value })}>
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
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                required
              />
            </div>

            <div>
              <Label>
                Features
                <span className="text-sm text-muted-foreground ml-2">({formData.features.length}/3 selected)</span>
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {features.map((feature) => {
                  const isSelected = formData.features.some((f) => f.id === feature.id)
                  const isDisabled = !isSelected && formData.features.length >= 3
                  return (
                    <Button
                      key={feature.id}
                      type="button"
                      variant={isSelected ? "default" : "outline"}
                      size="sm"
                      disabled={isDisabled}
                      onClick={() => toggleFeature(feature)}
                      className="justify-start"
                    >
                      {isSelected && <Check className="h-3 w-3 mr-2" />}
                      {feature.name}
                    </Button>
                  )
                })}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">{room ? "Update Room" : "Create Room"}</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
export default RoomModal