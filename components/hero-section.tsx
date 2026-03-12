import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
    >
      {/* Background image */}
      <Image
        src="/images/hero2-bg.jpg"
        alt="Oficina moderna de tecnologia"
        fill
        className="object-cover"
        priority
      />

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-primary/80 to-primary/90" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex flex-col items-center gap-8 py-8">
          <span className="inline-flex items-center rounded-full border border-white/40 bg-white/20 backdrop-blur-md px-5 py-2 text-sm font-medium text-white shadow-lg">
            Innovación Tecnológica para tu Empresa
          </span>

          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl text-balance drop-shadow-lg">
            <span className="text-white">Transformamos ideas en</span>
            <br />
            <span className="text-white">soluciones digitales</span>
          </h1>

          <p className="max-w-2xl text-lg sm:text-xl text-white leading-relaxed text-pretty drop-shadow-md">
Desarrollamos sistemas de facturación electrónica para empresas, agilizando la facturación y garantizando el cumplimiento de la Ley 32-23 de la DGII.
          </p>
          <div className="flex justify-center mt-2">
            <Button asChild size="lg" className="group bg-white text-primary font-semibold hover:bg-white/90 shadow-lg text-base px-10">
              <Link href="#contacto">
                Contáctanos
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
