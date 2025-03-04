import { CalendarCheck, BadgeDollarSign, Hotel, HeadphonesIcon, MapPin } from "lucide-react"

export default function WhyChooseSection() {
  const features = [
    {
      icon: <CalendarCheck className="h-12 w-12 mb-5 text-primary stroke-[0.7px]" />,
      title: "Effortless Booking",
      description: "Simple & fast reservation system.",
    },
    {
      icon: <BadgeDollarSign className="h-12 w-12 mb-5 text-primary stroke-[0.7px]" />,
      title: "Best Price Guarantee",
      description: "Get exclusive offers on direct bookings.",
    },
    {
      icon: <Hotel className="h-12 w-12 mb-5 text-primary stroke-[0.7px]" />,
      title: "Unmatched Comfort & Style",
      description: "Elegant rooms & premium amenities.",
    },
    {
      icon: <HeadphonesIcon className="h-12 w-12 mb-5 text-primary stroke-[0.7px]" />,
      title: "24/7 Concierge Service",
      description: "Personalized assistance anytime.",
    },
    {
      icon: <MapPin className="h-12 w-12 mb-5 text-primary stroke-[0.7px]" />,
      title: "Prime Location",
      description: "Stay close to key attractions & business hubs.",
    },
  ]

  return (
    <div className=" px-4 md:px-6">
    {/* Section Header */}
    <div className="text-center space-y-4 mb-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 font-roboto">
        Why Choose Noir?
        </h2>
        <p className="text-xl text-muted-foreground max-w-[700px] mx-auto">
        Experience luxury and convenience in every stay
        </p>
    </div>

    {/* Features Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 ">
        {features.map((feature, index) => (
        <div
            key={index}
            className={`
            group p-6 rounded-xl border bg-background/50 border-primary/20 backdrop-blur-sm
            hover:bg-background hover:shadow-lg transition-all duration-300
            ${index === features.length - 1 && features.length % 3 === 1 ? "lg:col-span-3 lg:max-w-xl lg:mx-auto" : ""}
            
            `}
        >
            {/* Icon with hover effect */}
            <div className="transition-transform duration-300 group-hover:scale-110">{feature.icon}</div>

            {/* Content */}
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
        </div>
        ))}
    </div>
    </div>
  )
}

