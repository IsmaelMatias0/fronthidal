"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, X, Loader2, CheckCircle } from "lucide-react"
import Image from "next/image"

const mediosOptions = ["Redes sociales", "Recomendación", "Google", "Publicidad", "Otro"]

type FormFields = {
  empresa: string
  telefonoEmpresa: string
  contacto: string
  telefonoContacto: string
  email: string
  medio: string
}

type FormErrors = Partial<Record<keyof FormFields, string>>

const emptyForm: FormFields = {
  empresa: "", telefonoEmpresa: "",
  contacto: "", telefonoContacto: "", email: "", medio: "",
}



function validate(form: FormFields): FormErrors {
  const errors: FormErrors = {}
  if (!form.empresa.trim()) errors.empresa = "Este campo es obligatorio"
  if (!form.telefonoEmpresa.trim()) errors.telefonoEmpresa = "Este campo es obligatorio"
  if (!form.contacto.trim()) errors.contacto = "Este campo es obligatorio"
  if (!form.telefonoContacto.trim()) errors.telefonoContacto = "Este campo es obligatorio"
  if (!form.email.trim()) errors.email = "Este campo es obligatorio"
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Email inválido"
  if (!form.medio) errors.medio = "Selecciona una opción"
  return errors
}

export function HeroSection() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState<FormFields>(emptyForm)
  const [errors, setErrors] = useState<FormErrors>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    // Limpiar error del campo al escribir
    if (errors[name as keyof FormFields]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

const handleSubmit = async () => {
  const newErrors = validate(form)
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors)
    return
  }
  setLoading(true)
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    const data = await res.json()
    console.log("Respuesta API:", data) // <-- abre DevTools → Console
    if (data.ok) setSent(true)
  } catch (error) {
    console.error("Error fetch:", error)
  } finally {
    setLoading(false)
  }
}
  const handleClose = () => {
    setOpen(false)
    setTimeout(() => { setSent(false); setForm(emptyForm); setErrors({}) }, 300)
  }

  return (
    <>
      <section id="inicio" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        <Image src="/images/hero2-bg.jpg" alt="Oficina moderna de tecnologia" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-primary/80 to-primary/90" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex flex-col items-center gap-8 py-8">
            <span className="inline-flex items-center rounded-full border border-white/40 bg-white/20 backdrop-blur-md px-5 py-2 text-sm font-medium text-white shadow-lg">
              Innovación Tecnológica para tu Empresa
            </span>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl text-balance drop-shadow-lg">
              <span className="text-white">Transformamos ideas en</span><br />
              <span className="text-white">soluciones digitales</span>
            </h1>
            <p className="max-w-2xl text-lg sm:text-xl text-white leading-relaxed text-pretty drop-shadow-md">
              Desarrollamos sistemas de facturación electrónica para empresas, agilizando la facturación y garantizando el cumplimiento de la Ley 32-23 de la DGII.
            </p>
            <div className="flex justify-center mt-2">
              <Button onClick={() => setOpen(true)} size="lg" className="group bg-white text-primary font-semibold hover:bg-white/90 shadow-lg text-base px-10">
                Solicitud de Facturación Electrónica
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />
          <div className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-2xl p-8 max-h-[90vh] overflow-y-auto">
            <button onClick={handleClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
              <X className="h-5 w-5" />
            </button>

            {sent ? (
              <div className="flex flex-col items-center gap-4 py-8 text-center">
                <CheckCircle className="h-16 w-16 text-primary" />
                <h3 className="text-2xl font-bold">¡Solicitud enviada!</h3>
                <p className="text-muted-foreground">Nos pondremos en contacto contigo a la brevedad.</p>
                <Button onClick={handleClose} className="mt-4">Cerrar</Button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-1">Solicitud de Facturación Electrónica</h2>
                <p className="text-sm text-muted-foreground mb-6">Todos los campos son obligatorios.</p>

                <div className="grid gap-5 sm:grid-cols-2">

                  {/* Empresa */}
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="empresa">Empresa (Razón social)</Label>
                    <Input id="empresa" name="empresa" value={form.empresa} onChange={handleChange}
                      className={errors.empresa ? "border-destructive focus-visible:ring-destructive" : ""} />
                    {errors.empresa && <span className="text-xs text-destructive">{errors.empresa}</span>}
                  </div>

                  {/* Teléfono empresa */}
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="telefonoEmpresa">Teléfono de la empresa</Label>
                    <Input id="telefonoEmpresa" name="telefonoEmpresa" value={form.telefonoEmpresa} onChange={handleChange}
                      className={errors.telefonoEmpresa ? "border-destructive focus-visible:ring-destructive" : ""} />
                    {errors.telefonoEmpresa && <span className="text-xs text-destructive">{errors.telefonoEmpresa}</span>}
                  </div>

                  {/* Nombre contacto */}
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="contacto">Nombre del contacto</Label>
                    <Input id="contacto" name="contacto" value={form.contacto} onChange={handleChange}
                      className={errors.contacto ? "border-destructive focus-visible:ring-destructive" : ""} />
                    {errors.contacto && <span className="text-xs text-destructive">{errors.contacto}</span>}
                  </div>

                  {/* Teléfono contacto */}
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="telefonoContacto">Teléfono de contacto</Label>
                    <Input id="telefonoContacto" name="telefonoContacto" value={form.telefonoContacto} onChange={handleChange}
                      className={errors.telefonoContacto ? "border-destructive focus-visible:ring-destructive" : ""} />
                    {errors.telefonoContacto && <span className="text-xs text-destructive">{errors.telefonoContacto}</span>}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" value={form.email} onChange={handleChange}
                      className={errors.email ? "border-destructive focus-visible:ring-destructive" : ""} />
                    {errors.email && <span className="text-xs text-destructive">{errors.email}</span>}
                  </div>

                  {/* Medio */}
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="medio">¿Por qué medio te enteraste?</Label>
                    <select
                      id="medio" name="medio" value={form.medio} onChange={handleChange}
                      className={`flex h-10 w-full rounded-md border px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${errors.medio ? "border-destructive focus-visible:ring-destructive" : "border-input bg-background"
                        }`}
                    >
                      <option value="">Seleccione...</option>
                      {mediosOptions.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                    {errors.medio && <span className="text-xs text-destructive">{errors.medio}</span>}
                  </div>

                </div>

                <Button onClick={handleSubmit} disabled={loading} className="w-full mt-6" size="lg">
                  {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando...</> : "Enviar Solicitud"}
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}