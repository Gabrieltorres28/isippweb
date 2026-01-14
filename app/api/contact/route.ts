import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

const requiredEnv = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS"]

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

    const missing = requiredEnv.filter((k) => !process.env[k])
    if (missing.length) {
      console.error("[contact] Faltan variables:", missing.join(", "))
      return NextResponse.json(
        { error: "Servicio de correo no configurado. Contacta al administrador." },
        { status: 500 }
      )
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const to = process.env.CONTACT_TO || "info@isipp1206.edu.ar"
    const subject = `[Consulta web] ${career} – ${name}`

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to,
      replyTo: email,
      subject,
      text: `
Nombre: ${name}
Email: ${email}
Carrera: ${career}

Mensaje:
${message}
`,
      html: `
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Carrera:</strong> ${career}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("[contact] Error enviando mensaje", error)
    return NextResponse.json({ error: "No pudimos enviar el mensaje" }, { status: 500 })
  }
}
