import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import Image from "next/image"

const clients = [
  {
    name: "MegaPlax, S.R.L",
    description: "Mega Plax, S.R.L es una empresa dedicada a la producción de bolsas y empaques plásticos.",
    logo: "/images/megaplax_logo.png",
    website: "https://www.megaplax.com.do/",
  },
  {
    name: "Ameri-Parts",
    description: "Es una empresa dedicada a la venta y distribución de repuestos nuevos y para vehículos americanos.",
    logo: "/images/ameriparts-logo.png",
    website: "https://ameriparts.com/",
  },
  {
    name: "Enestar",
    description: "Es una empresa dedicada a la solución de problemas energéticos a través del diseño e instalación de proyectos fotovoltaicos y de refrigeración.",
    logo: "/images/enestar-logo.png",
    website: "https://www.enestar.com.do/",
  },
  {
    name: "La Rodali",
    description: "Es una empresa que ofrece una gran variedad de productos y un servicio personalizado.",
    logo: "/images/LRodali-Logo.png",
    website: "https://larodali.com/?v=7ea614f5f4f9",
  },
  {
    name: "Papelería Progreso, S.R.L.",
    description: "Importadores de muebles, equipo para oficinas, escolares y papelería en general.",
    logo: "/images/pelprogreso-logo.png",
    website: "https://papeleriaelprogreso.com.do/",
  },
  {
    name: "GADEXP, S.R.L.",
    description: "Es una agencia de aduanas que realiza gestiones aduanales. Representantes autorizados de UPS y DHL.",
    logo: "/images/gadexp-logo.png",
    website: "https://gadexp.com/",
  },
]

export function ClientsSection() {
  return (
    <section id="clientes" className="relative py-24 overflow-hidden" style={{ background: "linear-gradient(135deg, oklch(0.95 0.03 250 / 0.6) 0%, oklch(0.97 0.01 250 / 0.3) 100%)" }}>
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-20 -right-20 h-80 w-80 rounded-full bg-primary/8 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Confian en nosotros
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            Nuestros Clientes
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            Hemos tenido el privilegio de trabajar con empresas increibles
            que confían en nuestras soluciones tecnológicas.
          </p>
        </div>

        {/* Clients Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {clients.map((client) => (
            <a
              key={client.name}
              href={client.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <Card className="h-full bg-card/50 border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Client Logo */}
                    <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white p-2 shadow-sm group-hover:shadow-md transition-shadow">
                      <Image
                        src={client.logo}
                        alt={`${client.name} logo`}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {client.name}
                        </h3>
                        <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed text-justify">
                        {client.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
