import { Mail, Globe, Github, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Layout from "@/Layouts/Layout"
import { Head } from "@inertiajs/react"
const About = () => {
  return (
    <>
      <Head title="About us"/>
      <div className="container self-center space-y-6 max-w-6xl py-12 md:py-10 lg:py-14">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-7xl ">About Us</h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Your premier hotel booking and management platform designed to make reservations seamless and efficient.
          </p>
        </div>
        <Card className="border-success border-[1px]">
          <CardHeader>
            <CardTitle className="text-2xl">Welcome to Noir</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            <p>
              Whether you're a traveler searching for the perfect stay or a hotel owner looking to streamline operations,
              Noir provides a modern, user-friendly experience to simplify hotel management.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-primary/5">
          <CardHeader>
            <CardTitle className="text-2xl">Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            <p>
              At Noir, we aim to revolutionize the hospitality industry by leveraging technology to enhance customer
              convenience, hotel efficiency, and overall satisfaction. Our platform ensures smooth booking processes,
              real-time availability updates, and secure payment handling—all in one place.
            </p>
          </CardContent>
        </Card>

        <Card className="border-success border-[1px]">
          <CardHeader>
            <CardTitle className="text-2xl">Why Choose Noir?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Effortless Reservations – Instantly book rooms with an intuitive interface.",
                "Real-Time Availability – Stay updated with live room status.",
                "Secure Transactions – Safe and reliable online payments.",
                "Customer-Centric – Personalized experiences for every guest.",
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-primary/5">
          <CardHeader>
            <CardTitle className="text-2xl">Get in Touch</CardTitle>
            <CardDescription>We'd love to hear from you! Connect with us on:</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 ">
            <Button variant="outline" className="justify-start space-x-2" asChild>
              <a href="mailto:support@noir.com" target="_blank" rel="noopener noreferrer">
              <Mail className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" className="justify-start space-x-2" asChild>
              <a href="https://noir.com/" target="_blank" rel="noopener noreferrer">
              <Globe className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" className="justify-start space-x-2" asChild>
              <a href="https://github.com/lizeweski" target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" />
              </a>
            </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
About.layout = page => <Layout children={page}/>
export default About

