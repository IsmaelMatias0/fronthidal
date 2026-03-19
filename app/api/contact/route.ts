import { NextResponse } from "next/server"

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbycxoUq1vpxJz7F1rAh6mzcaTgeHCuXEFPI_xm_zSueLM2U0vIb1F-uxo_PKm_NXrr69g/exec"

export async function POST(req: Request) {
  const body = await req.json()

  try {
    const res = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      redirect: "follow",
    })

    const text = await res.text()
    console.log("Script response:", text)

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}