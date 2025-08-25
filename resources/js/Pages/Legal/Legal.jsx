import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { FileText, Shield, ArrowRight } from "lucide-react"
import { Link } from "@inertiajs/react"
import Layout from "@/layouts/layout"

const Legal = () =>  {
  return (
    <div className="py-8 md:py-16">
      <div className="container px-4 md:px-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 space-y-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">Legal Information</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Important information about your rights and our policies at Noir Hotel
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Terms of Service Card */}
          <Card className="group hover:shadow-md transition-shadow flex flex-col flex-grow">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-success" />
              </div>
              <CardTitle className="text-2xl">Terms of Service</CardTitle>
              <CardDescription>
                The rules and guidelines for using our services and staying at Noir Hotel
              </CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground flex-grow">
              <p>
                Our Terms of Service outline the rules and regulations for booking rooms, cancellation policies,
                check-in/check-out procedures, and other important information regarding your stay at Noir Hotel.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/terms-of-service" className="w-full">
                <Button className="w-full group-hover:bg-primary/90 transition-colors">
                  Read Terms of Service
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Privacy Policy Card */}
          <Card className="group hover:shadow-md transition-shadow flex flex-col flex-grow">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-success" />
              </div>
              <CardTitle className="text-2xl">Privacy Policy</CardTitle>
              <CardDescription>How we collect, use, and protect your personal information</CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground flex-grow">
              <p>
                Our Privacy Policy explains how we collect and process your personal data, your rights regarding your
                information, and the measures we take to ensure your data is protected during and after your stay.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/privacy-policy" className="w-full">
                <Button className="w-full group-hover:bg-primary/90 transition-colors">
                  Read Privacy Policy
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        <Separator className="my-16" />

        {/* Additional Legal Information */}
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold">Additional Legal Information</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-medium mb-2">Cookie Policy</h3>
              <p className="text-muted-foreground">
                Our website uses cookies to enhance your browsing experience. By using our website, you consent to our
                use of cookies in accordance with our Cookie Policy.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-2">Accessibility Statement</h3>
              <p className="text-muted-foreground">
                Noir Hotel is committed to ensuring digital accessibility for people with disabilities. We are
                continually improving the user experience for everyone and applying the relevant accessibility
                standards.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-2">Copyright Notice</h3>
              <p className="text-muted-foreground">
                All content on this website, including text, graphics, logos, images, and software, is the property of
                Noir Hotel and is protected by international copyright laws.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-16 p-8 bg-muted rounded-xl">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-semibold">Have Questions?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              If you have any questions about our legal policies or need further clarification, our team is here to
              help.
            </p>
            <Link href="/contact">
              <Button variant="outline" className="mt-4">
                Contact Our Legal Team
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
Legal.layout = (page) => <Layout children={page} />
export default Legal