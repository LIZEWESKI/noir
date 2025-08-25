import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Layout from "@/layouts/layout"
import { ArrowLeft, Printer } from "lucide-react"
import { Link } from "@inertiajs/react"

const TermsOfService = () => {
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
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Terms of Service</h1>
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
            Welcome to Noir Hotel. These Terms of Service govern your use of our website, services, and accommodations.
            By accessing or using our services, you agree to be bound by these Terms.
          </p>
          <p className="text-muted-foreground">
            Please read these Terms carefully before making a reservation or using our services. If you do not agree
            with any part of these Terms, you may not use our services.
          </p>
        </section>

        {/* Terms Sections */}
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Definitions</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                <strong>"Hotel"</strong> refers to Noir Hotel, its premises, facilities, and services.
              </p>
              <p>
                <strong>"Guest"</strong> refers to any individual who books, stays at, or uses the services of the
                Hotel.
              </p>
              <p>
                <strong>"Reservation"</strong> refers to the booking of rooms or services at the Hotel.
              </p>
              <p>
                <strong>"Website"</strong> refers to the official website of Noir Hotel.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Reservations and Cancellations</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                <strong>2.1 Reservation Policy</strong>: All reservations are subject to availability and require a
                valid credit card to secure the booking.
              </p>
              <p>
                <strong>2.2 Guaranteed Reservations</strong>: Reservations guaranteed with a credit card will be held
                for the first night of the stay. Failure to arrive on the scheduled check-in date will result in a
                charge equal to one night's stay.
              </p>
              <p>
                <strong>2.3 Cancellation Policy</strong>: Cancellations must be made at least 48 hours prior to the
                scheduled check-in date to avoid a cancellation fee. Cancellations made within 48 hours of the check-in
                date will incur a charge equal to one night's stay.
              </p>
              <p>
                <strong>2.4 No-Show Policy</strong>: Guests who fail to arrive on their scheduled check-in date without
                prior notice will be charged for one night's stay.
              </p>
              <p>
                <strong>2.5 Early Departure</strong>: Guests who check out before their scheduled departure date may be
                subject to an early departure fee.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Check-In and Check-Out</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                <strong>3.1 Check-In Time</strong>: Standard check-in time is 3:00 PM. Early check-in may be available
                upon request but is not guaranteed.
              </p>
              <p>
                <strong>3.2 Check-Out Time</strong>: Standard check-out time is 11:00 AM. Late check-out may be
                available upon request and may incur additional charges.
              </p>
              <p>
                <strong>3.3 Identification</strong>: Guests are required to present a valid government-issued photo ID
                and credit card at check-in.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Room Rates and Charges</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                <strong>4.1 Room Rates</strong>: All room rates are quoted in the local currency and are subject to
                applicable taxes and fees.
              </p>
              <p>
                <strong>4.2 Rate Changes</strong>: Room rates are subject to change without notice, but confirmed
                reservations will be honored at the rate quoted at the time of booking.
              </p>
              <p>
                <strong>4.3 Additional Charges</strong>: Guests are responsible for all charges incurred during their
                stay, including room service, minibar, and other incidental charges.
              </p>
              <p>
                <strong>4.4 Damage to Property</strong>: Guests will be held responsible for any damage to Hotel
                property caused by them or their guests.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Hotel Policies</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                <strong>5.1 Smoking Policy</strong>: Noir Hotel is a non-smoking establishment. Smoking is prohibited in
                all indoor areas, including guest rooms. A cleaning fee will be charged for violations of this policy.
              </p>
              <p>
                <strong>5.2 Pet Policy</strong>: Pets are not allowed, with the exception of service animals as defined
                by applicable law.
              </p>
              <p>
                <strong>5.3 Noise Policy</strong>: Guests are expected to respect the comfort of other guests by
                maintaining reasonable noise levels at all times.
              </p>
              <p>
                <strong>5.4 Visitor Policy</strong>: Non-registered guests are not permitted in guest rooms after 10:00
                PM.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Limitation of Liability</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                <strong>6.1 Personal Property</strong>: The Hotel is not responsible for the loss, theft, or damage to
                personal property left in guest rooms or on Hotel premises.
              </p>
              <p>
                <strong>6.2 Safe Deposit Boxes</strong>: Safe deposit boxes are available for the storage of valuables.
                The Hotel's liability for items placed in safe deposit boxes is limited by law.
              </p>
              <p>
                <strong>6.3 Injury or Illness</strong>: The Hotel is not responsible for injuries or illnesses occurring
                on Hotel premises, except in cases of gross negligence by the Hotel.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Modifications to Terms of Service</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Noir Hotel reserves the right to modify these Terms of Service at any time without prior notice. The
                most current version will be posted on our website.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Governing Law</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                These Terms of Service shall be governed by and construed in accordance with the laws of the
                jurisdiction in which the Hotel is located, without regard to its conflict of law provisions.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Contact Information</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>If you have any questions about these Terms of Service, please contact us at:</p>
              <p>
                Noir Hotel
                <br />
                73120 Courchevel 1850, France
                <br />
                Email: legal@noirhotel.com
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

TermsOfService.layout = (page) => <Layout children={page} />
export default TermsOfService;