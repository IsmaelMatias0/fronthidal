import { NextResponse } from "next/server"
import { getPool } from "@/lib/db"
import { Resend } from "resend"

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbycxoUq1vpxJz7F1rAh6mzcaTgeHCuXEFPI_xm_zSueLM2U0vIb1F-uxo_PKm_NXrr69g/exec"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const body = await req.json()

  try {
    // 1. SQL Server + 2. Email — en paralelo para mayor velocidad
    const pool = await getPool()

    const dbPromise = pool
      .request()
      .input("empresa", body.empresa)
      .input("telefono_empresa", body.telefonoEmpresa)
      .input("contacto", body.contacto)
      .input("telefono_contacto", body.telefonoContacto)
      .input("email", body.email)
      .input("medio", body.medio)
      .query(
        `INSERT INTO solicitudes_facturacion
           (empresa, telefono_empresa, contacto, telefono_contacto, email, medio)
         VALUES
           (@empresa, @telefono_empresa, @contacto, @telefono_contacto, @email, @medio)`
      )

    const emailPromise = resend.emails.send({
      from: "Solicitudes Hidalsoft <onboarding@resend.dev>",
      to: "hidalsoft@gmail.com",
      subject: `Nueva solicitud de facturación - ${body.empresa}`,
      html: `
        <h2>Nueva Solicitud de Facturación Electrónica</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px;font-family:Arial,sans-serif;">
          <tr style="background:#f4f4f4;">
            <td style="padding:10px;font-weight:bold;border:1px solid #ddd;">Empresa</td>
            <td style="padding:10px;border:1px solid #ddd;">${body.empresa}</td>
          </tr>
          <tr>
            <td style="padding:10px;font-weight:bold;border:1px solid #ddd;">Teléfono Empresa</td>
            <td style="padding:10px;border:1px solid #ddd;">${body.telefonoEmpresa}</td>
          </tr>
          <tr style="background:#f4f4f4;">
            <td style="padding:10px;font-weight:bold;border:1px solid #ddd;">Contacto</td>
            <td style="padding:10px;border:1px solid #ddd;">${body.contacto}</td>
          </tr>
          <tr>
            <td style="padding:10px;font-weight:bold;border:1px solid #ddd;">Teléfono Contacto</td>
            <td style="padding:10px;border:1px solid #ddd;">${body.telefonoContacto}</td>
          </tr>
          <tr style="background:#f4f4f4;">
            <td style="padding:10px;font-weight:bold;border:1px solid #ddd;">Email</td>
            <td style="padding:10px;border:1px solid #ddd;">${body.email}</td>
          </tr>
          <tr>
            <td style="padding:10px;font-weight:bold;border:1px solid #ddd;">Medio</td>
            <td style="padding:10px;border:1px solid #ddd;">${body.medio}</td>
          </tr>
        </table>
      `,
    })

    await Promise.all([dbPromise, emailPromise])
    console.log("Registro guardado y correo enviado")

    // 3. Enviar al Google Apps Script (fire-and-forget)
    fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      redirect: "follow",
    }).catch((err) => console.error("Error enviando a Google Script:", err))

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Error en /api/contact:", error)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}