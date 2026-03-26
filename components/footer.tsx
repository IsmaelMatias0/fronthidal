import { Mail, Phone, Clock, MapPin, Instagram } from "lucide-react"
import Link from "next/link"

const contactInfo = [
  {
    icon: Mail,
    label: "Correo electrónico",
    value: "hidalsoft@gmail.com",
    href: "mailto: hidalsoft@gmail.com",
  },
  {
    icon: Phone,
    label: "Teléfono",
    value: "+1 (809) 241-6609",
    href: "tel:+18092416609",
  },
  {
    icon: Clock,
    label: "Horario de atención",
    value: "Lunes a Viernes, 8:00 AM - 5:00 PM \n\nSábados, 8:00 AM - 12:00 PM",
    href: null,
  },
  {
    icon: MapPin,
    label: "Dirección",
    value: "Módulo A094, Bella Terra Mall, Santiago, República Dominicana",
    href: "https://www.google.com/maps/place/HIDALSOFT/@19.458095,-70.6870619,17z/data=!3m1!4b1!4m6!3m5!1s0x8eb1c589ac7ed707:0x7962613e922c532d!8m2!3d19.45809!4d-70.684487!16s%2Fg%2F12qh8zh84?entry=ttu&g_ep=EgoyMDI2MDMxMC4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@hidalsoftsrl",
    href: "https://www.instagram.com/hidalsoftsrl?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  },
]

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#servicios", label: "Servicios" },
  { href: "#clientes", label: "Clientes" },
  { href: "#contacto", label: "Contacto" },
]

export function Footer() {
  return (
    <footer id="contacto" className="bg-card border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Information */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-bold text-primary">HIDALSOFT</span>
            </Link>
            <p className="text-muted-foreground mb-8 max-w-md leading-relaxed">
              Transformamos ideas en soluciones digitales. Somos tu socio
              estratégico en tecnología para impulsar el crecimiento de tu empresa.
            </p>

            <div className="grid gap-6 sm:grid-cols-2">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-foreground">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Google Maps Embed */}
          <div className="rounded-lg overflow-hidden border border-border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3764.123!2d-70.6870619!3d19.458095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eb1c589ac7ed707:0x7962613e922c532d!2sHIDALSOFT!5e0!3m2!1ses!2sdo!4v1"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicacion de Hidalsoft"
              className="grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {new Date().getFullYear()} HIDALSOFT. Todos los derechos reservados.
          </p>
          <nav className="flex flex-wrap justify-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
