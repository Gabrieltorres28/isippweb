import { NextResponse } from "next/server"

const EMAILJS_ENDPOINT = "https://api.emailjs.com/api/v1.0/email/send"

// Fallbacks listos para usar si no hay variables de entorno cargadas
const DEFAULT_SERVICE_ID = "service_2cud1ij"
const DEFAULT_TEMPLATE_ID = "templatej6mhjm"
const DEFAULT_PUBLIC_KEY = "I-Z7Tyxj1k_O9tC8P"
const DEFAULT_TO = "info@isipp1206.edu.ar"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, career, message } = body || {}

    if (!name || !email || !career || !message) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios: nombre, email, carrera y mensaje" },
        { status: 400 }
      )
    }

    const serviceId = process.env.EMAILJS_SERVICE_ID || DEFAULT_SERVICE_ID
    const templateId = process.env.EMAILJS_TEMPLATE_ID || DEFAULT_TEMPLATE_ID
    const publicKey = process.env.EMAILJS_PUBLIC_KEY || DEFAULT_PUBLIC_KEY
    const privateKey = process.env.EMAILJS_PRIVATE_KEY
    const toEmail = process.env.CONTACT_TO || DEFAULT_TO

    const subject = `[Consulta web] ${career} – ${name}`

    const payload: Record<string, unknown> = {
      service_id: serviceId,
      template_id: templateId,
      template_params: {
        from_name: name,
        from_email: email,
        career,
        message,
        subject,
        to_email: toEmail,
      },
    }

    if (privateKey) {
      payload["accessToken"] = privateKey
    } else {
      payload["user_id"] = publicKey
    }

    const resp = await fetch(EMAILJS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        origin: req.headers.get("origin") || "http://localhost",
      },
      body: JSON.stringify(payload),
    })

    if (!resp.ok) {
      const text = await resp.text()
      console.error("[contact] EmailJS error", resp.status, text)
      throw new Error(text || "No se pudo enviar el mensaje.")
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("[contact] Error enviando mensaje", error)
    return NextResponse.json(
      { error: "No pudimos enviar el mensaje. Intenta nuevamente o escribe a info@isipp1206.edu.ar" },
      { status: 500 }
    )
  }
}
