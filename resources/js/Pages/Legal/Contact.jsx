import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Mail, Phone, MapPin, Clock, CheckCircle2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Link } from "@inertiajs/react"
import Layout from "@/layouts/layout"

const Contact = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
    subject: "",
    message: "",
    preferredContact: "email",
  })

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    error: false,
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name, value) => {
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate form
    if (!formState.name || !formState.email || !formState.inquiryType || !formState.message) {
      setFormStatus({
        submitted: true,
        success: false,
        error: true,
        message: "Please fill in all required fields.",
      })
      setIsSubmitting(false)
      return
    }

    // Simulate API call
    try {
      // In a real app, you would send the form data to your API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setFormStatus({
        submitted: true,
        success: true,
        error: false,
        message: "Your message has been sent successfully. Our legal team will contact you shortly.",
      })

      // Reset form
      setFormState({
        name: "",
        email: "",
        phone: "",
        inquiryType: "",
        subject: "",
        message: "",
        preferredContact: "email",
      })
    } catch (error) {
      setFormStatus({
        submitted: true,
        success: false,
        error: true,
        message: "There was an error sending your message. Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="py-8 md:py-16">
      <div className="container px-4 md:px-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10 space-y-4">
          <Link href="/legal">
            <Button variant="ghost" size="sm" className="mb-4 -ml-3">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Legal Information
            </Button>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold  ">Contact Our Legal Team</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Have questions about our terms, privacy policy, or other legal matters? Our team is here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and our legal team will get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {formStatus.submitted && (
                  <Alert
                    className={`mb-6 ${formStatus.success ? "bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300" : "bg-destructive/10"}`}
                    variant={formStatus.success ? "default" : "destructive"}
                  >
                    {formStatus.success ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                    <AlertTitle>{formStatus.success ? "Success" : "Error"}</AlertTitle>
                    <AlertDescription>{formStatus.message}</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        Full Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email Address <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                        placeholder="Enter your email address"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formState.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="inquiryType">
                        Inquiry Type <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={formState.inquiryType}
                        onValueChange={(value) => handleSelectChange("inquiryType", value)}
                        required
                      >
                        <SelectTrigger id="inquiryType">
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="terms">Terms of Service Question</SelectItem>
                          <SelectItem value="privacy">Privacy Policy Question</SelectItem>
                          <SelectItem value="data">Data Request</SelectItem>
                          <SelectItem value="complaint">Complaint</SelectItem>
                          <SelectItem value="other">Other Legal Matter</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      placeholder="Enter the subject of your message"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">
                      Message <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="Please provide details about your inquiry"
                      rows={5}
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Preferred Contact Method</Label>
                    <RadioGroup
                      defaultValue={formState.preferredContact}
                      onValueChange={(value) => handleSelectChange("preferredContact", value)}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="email" id="contact-email" />
                        <Label htmlFor="contact-email" className="font-normal">
                          Email
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="phone" id="contact-phone" />
                        <Label htmlFor="contact-phone" className="font-normal">
                          Phone
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    By submitting this form, you agree to our{" "}
                    <Link href="/privacy-policy" className="underline hover:text-primary">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  Our legal team is available to assist you with any questions or concerns.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 mt-0.5 text-primary" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <a
                      href="mailto:legal@noirhotel.com"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      legal@noirhotel.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 mt-0.5 text-primary" />
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <a href="tel:+41223456789" className="text-muted-foreground hover:text-primary transition-colors">
                      +41 22 345 67 89
                    </a>
                    <p className="text-sm text-muted-foreground">Monday to Friday, 9am to 5pm CET</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 mt-0.5 text-primary" />
                  <div>
                    <h3 className="font-medium">Address</h3>
                    <p className="text-muted-foreground">
                      Noir Hotel
                      <br />
                      73120 Courchevel 1850
                      <br />
                      France
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 mt-0.5 text-primary" />
                  <div>
                    <h3 className="font-medium">Response Time</h3>
                    <p className="text-muted-foreground">We aim to respond to all inquiries within 2 business days.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>When to Contact Us</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 mt-0.5 text-primary shrink-0" />
                    <span>Questions about our Terms of Service or Privacy Policy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 mt-0.5 text-primary shrink-0" />
                    <span>Requests for personal data access, correction, or deletion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 mt-0.5 text-primary shrink-0" />
                    <span>Legal concerns related to your stay or reservation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 mt-0.5 text-primary shrink-0" />
                    <span>Reporting potential violations of our policies</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator className="my-16" />

        {/* FAQ Section */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
            <p className="text-muted-foreground mt-2">Find quick answers to common legal questions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How can I request my personal data?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  You can request access to your personal data by contacting our legal team through this form. Please
                  select "Data Request" as your inquiry type and provide your booking details for faster processing.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What is your cancellation policy?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our standard cancellation policy allows for free cancellation up to 48 hours before check-in. For
                  detailed information, please refer to our{" "}
                  <Link href="/terms-of-service" className="underline hover:text-primary">
                    Terms of Service
                  </Link>
                  .
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How do you protect my payment information?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We use industry-standard encryption and security measures to protect your payment information. For
                  more details on how we handle sensitive data, please see our{" "}
                  <Link href="/privacy-policy" className="underline hover:text-primary">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I get a copy of my invoice?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes, you can request a copy of your invoice by contacting our reception desk or through this form.
                  Please include your booking reference number in your message.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

Contact.layout = (page) => <Layout children={page} />
export default Contact