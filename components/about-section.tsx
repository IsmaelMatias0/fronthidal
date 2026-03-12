import { Target, Eye, Heart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const aboutItems = [
  {
    icon: Target,
    title: "Misión",
    description:
      "Proveer servicios de desarrollo y consultoría de software mediante el uso eficiente de tecnologías de información con el propósito de incrementar las ventajas competitivas de los clientes.",
  },
  {
    icon: Eye,
    title: "Visión",
    description:
      "Convertinos en empresa líder en el area de sistemas administrativos y operativos, adaptándonos a las necesidades de nuestros clientes, tanto a nivel nacional como internacional.",
  },
  {
    icon: Heart,
    title: "Valores",
    description:
      "Respeto\nConfianza\nHonestidad\nAutenticidad\nResponsabilidad",
  },
]

export function AboutSection() {
  return (
    <section id="nosotros" className="relative py-24 overflow-hidden" style={{ background: "linear-gradient(135deg, oklch(0.95 0.03 250 / 0.6) 0%, oklch(0.97 0.01 250 / 0.3) 100%)" }}>
      {/* Decorative blob */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-72 w-full max-w-2xl rounded-full bg-primary/8 blur-3xl" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Quienes Somos
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            Nosotros
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            Somos una empresa dedicada al desarrollo de sistemas financieros que ayudan a agilizar los procesos empresariales y a garantizar información precisa y confiable.
            En Hidalsoft ofrecemos soluciones de software de alta calidad e integración, utilizando tecnología avanzada cliente/servidor, dirigidas a empresas comerciales, de servicios y manufactureras.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {aboutItems.map((item) => (
            <Card
              key={item.title}
              className="bg-card/50 border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader className="flex flex-col items-center text-center">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <item.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground leading-relaxed text-center whitespace-pre-line">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
