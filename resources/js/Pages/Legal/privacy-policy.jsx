import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Layout from "@/layouts/Layout"
import { ArrowLeft, Printer } from "lucide-react"
import { Link } from "@inertiajs/react"

const PrivacyPolicy = () => {
  const lastUpdated = "March 12, 2025"
  return (
    <div className="py-8 md:py-16">
      <div className="container px-4 md:px-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10 space-y-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-4 -ml-3">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Privacy Policy</h1>
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">Last updated: {lastUpdated}</p>
            <Button variant="outline" size="sm" onClick={() => window.print()}>
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Introduction */}
        <section className="mb-10">
          <p className="text-muted-foreground mb-6">
            At Noir Hotel, we are committed to protecting your privacy and ensuring the security of your personal
            information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when
            you visit our website, make reservations, or use our services.
          </p>
          <p className="text-muted-foreground">
            Please read this Privacy Policy carefully. By accessing or using our services, you acknowledge that you have
            read, understood, and agree to be bound by all the terms of this Privacy Policy.
          </p>
        </section>

        {/* Privacy Policy Sections */}
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                <strong>1.1 Personal Information</strong>: We may collect personal information that you provide directly
                to us, including but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name, email address, postal address, and phone number</li>
                <li>Date of birth and nationality</li>
                <li>Payment information and billing address</li>
                <li>Reservation details and preferences</li>
                <li>Passport or ID information (for check-in purposes)</li>
                <li>Feedback and correspondence</li>
              </ul>
              <p>
                <strong>1.2 Automatically Collected Information</strong>: When you visit our website or use our online
                services, we may automatically collect certain information, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>IP address and device information</li>
                <li>Browser type and operating system</li>
                <li>Pages viewed and time spent on our website</li>
                <li>Referral source and search terms</li>
                <li>Location information</li>
              </ul>
              <p>
                <strong>1.3 Cookies and Similar Technologies</strong>: We use cookies and similar tracking technologies
                to collect information about your browsing activities and to remember your preferences.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>We may use the information we collect for various purposes, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Processing and confirming your reservations</li>
                <li>Providing and improving our services</li>
                <li>Communicating with you about your stay</li>
                <li>Sending promotional offers and marketing communications (with your consent)</li>
                <li>Responding to your inquiries and requests</li>
                <li>Complying with legal obligations</li>
                <li>Analyzing usage patterns to enhance user experience</li>
                <li>Protecting our rights, property, and safety</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Information Sharing and Disclosure</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>We may share your information with:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Service Providers</strong>: Third-party vendors who perform services on our behalf, such as
                  payment processing, data analysis, email delivery, and customer service.
                </li>
                <li>
                  <strong>Business Partners</strong>: Companies with whom we partner to offer certain products,
                  services, or promotions.
                </li>
                <li>
                  <strong>Legal Requirements</strong>: When required by law, court order, or governmental authority.
                </li>
                <li>
                  <strong>Business Transfers</strong>: In connection with a merger, acquisition, or sale of all or a
                  portion of our assets.
                </li>
              </ul>
              <p>
                We do not sell your personal information to third parties for their marketing purposes without your
                explicit consent.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We implement appropriate technical and organizational measures to protect the security of your personal
                information. However, please be aware that no method of transmission over the Internet or electronic
                storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Your Rights and Choices</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Accessing, correcting, or deleting your personal information</li>
                <li>Withdrawing your consent at any time</li>
                <li>Objecting to processing of your personal information</li>
                <li>Requesting restriction of processing of your personal information</li>
                <li>Requesting transfer of your personal information</li>
                <li>Opting out of marketing communications</li>
              </ul>
              <p>
                To exercise these rights, please contact us using the information provided in the "Contact Us" section
                below.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. International Data Transfers</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Your personal information may be transferred to, and processed in, countries other than the country in
                which you reside. These countries may have data protection laws that are different from the laws of your
                country.
              </p>
              <p>
                When we transfer your personal information to other countries, we will take appropriate measures to
                ensure that your personal information receives an adequate level of protection in the countries to which
                it is transferred.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Children's Privacy</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Our services are not directed to individuals under the age of 16. We do not knowingly collect personal
                information from children. If we become aware that we have collected personal information from a child
                without parental consent, we will take steps to delete that information.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Changes to This Privacy Policy</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We may update this Privacy Policy from time to time. The updated version will be indicated by an updated
                "Last Updated" date. We encourage you to review this Privacy Policy periodically to stay informed about
                how we are protecting your information.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                If you have any questions or concerns about this Privacy Policy or our privacy practices, please contact
                us at:
              </p>
              <p>
                Noir Hotel
                <br />
                73120 Courchevel 1850, France
                <br />
                Email: privacy@noirhotel.com
                <br />
                Phone: +41 22 345 67 88
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

PrivacyPolicy.layout = (page) => <Layout children={page} />
export default PrivacyPolicy