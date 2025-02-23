"use client"

import { useState } from "react"
import { Building2, Mail, Phone, Users, Clock, Send } from "lucide-react"
import { toast } from "@/components/ui/sonner"

export default function ContactAboutPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log(formData)
    toast.success("Message sent!", {
      description: "We'll get back to you soon.",
      style: { backgroundColor: "rgb(34 197 94)", color: "white", border: "none" },
      duration: 3000,
    })
    setFormData({ name: "", email: "", message: "" }) // Reset form
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* About Us Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-2 text-3xl font-bold text-gray-900">About Us</h2>
            <p className="text-gray-600">Get to know our company and our mission</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-gray-50 p-6 text-center">
              <div className="mb-4 flex justify-center">
                <Users className="h-10 w-10 text-blue-500" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Our Team</h3>
              <p className="text-gray-600">
                A dedicated group of professionals working together to deliver excellence.
              </p>
            </div>

            <div className="rounded-lg bg-gray-50 p-6 text-center">
              <div className="mb-4 flex justify-center">
                <Building2 className="h-10 w-10 text-blue-500" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Our Mission</h3>
              <p className="text-gray-600">To provide innovative solutions that empower businesses and individuals.</p>
            </div>

            <div className="rounded-lg bg-gray-50 p-6 text-center">
              <div className="mb-4 flex justify-center">
                <Clock className="h-10 w-10 text-blue-500" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Our History</h3>
              <p className="text-gray-600">
                Over 10 years of experience in delivering quality services to our clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-2 text-3xl font-bold text-gray-900">Contact Us</h2>
            <p className="text-gray-600">Get in touch with us for any questions or concerns</p>
          </div>

          <div className="grid gap-8 md:grid-cols-[1fr_1.5fr]">
            {/* Contact Information */}
            <div className="space-y-8 rounded-lg bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900">Contact Information</h3>

              <div className="flex items-start space-x-3">
                <Mail className="mt-1 h-5 w-5 text-blue-500" />
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <p className="text-gray-600">contact@company.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="mt-1 h-5 w-5 text-blue-500" />
                <div>
                  <p className="font-medium text-gray-900">Phone</p>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Building2 className="mt-1 h-5 w-5 text-blue-500" />
                <div>
                  <p className="font-medium text-gray-900">Office</p>
                  <p className="text-gray-600">
                    123 Business Street
                    <br />
                    New York, NY 10001
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-6 rounded-lg bg-white p-6 shadow-sm">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-900">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-900">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Your message"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center space-x-2 rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <Send className="h-4 w-4" />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

