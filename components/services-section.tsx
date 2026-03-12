import { Pill, Wrench, ShoppingBag, Utensils, ShoppingCart, Dice5, DollarSign, School, GraduationCap } from "lucide-react"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"

const services = [
  { icon: Pill, title: "Farmacias" },
  { icon: Wrench, title: "Ferreterías" },
  { icon: ShoppingBag, title: "Tiendas" },
  { icon: Utensils, title: "Restaurantes" },
  { icon: ShoppingCart, title: "Supermercados" },
  { icon: Dice5, title: "Bancas" },
  { icon: DollarSign, title: "Financieras" },
  { icon: School, title: "Colegios" },
  { icon: GraduationCap, title: "Institutos" },
]

export function ServicesSection() {
  return (
    <section id="servicios" className="relative py-24 overflow-hidden">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/8 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Para quienes ofrecemos nuestros servicios
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            Nuestros Servicios
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            Ofrecemos soluciones especializadas para diversas industrias, impulsando la eficiencia y el crecimiento de tu negocio.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card
              key={service.title}
              className="group bg-card/50 border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 flex flex-col items-center justify-center p-6"
            >
              <CardHeader className="flex flex-col items-center p-0">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-sm">
                  <service.icon className="h-8 w-8" />
                </div>
                <CardTitle className="text-xl font-bold text-center">{service.title}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
