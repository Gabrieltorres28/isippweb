"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type FormData = {
  name: string
  email: string
  career: string
  message: string
}

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<FormData>()

  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_2cud1ij"
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "templatej6mhjm"
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "I-Z7Tyxj1k_O9tC8P"
  const toEmail = process.env.NEXT_PUBLIC_CONTACT_TO || "info@isipp1206.edu.ar"
  const emailApi = "https://api.emailjs.com/api/v1.0/email/send"

  const careerValue = watch("career")

  const handleCareerChange = (value: string) => {
    setValue("career", value, { shouldValidate: true })
  }

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    setError(null)

    try {
      const subject = `[Consulta] ${data.career} – ${data.name}`

      const resp = await fetch(emailApi, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: {
            from_name: data.name,
            from_email: data.email,
            reply_to: data.email,
            career: data.career,
            message: data.message,
            subject,
            to_email: toEmail,
          },
        }),
      })

      if (!resp.ok) {
        const msg = await resp.text()
        throw new Error(msg || "No se pudo enviar el mensaje.")
      }

      setIsSubmitted(true)
      reset()
      setTimeout(() => setIsSubmitted(false), 5000)
    } catch (err) {
      console.error("Error enviando contacto:", err)
      setError(
        err instanceof Error
          ? err.message
          : "Hubo un problema al enviar tu mensaje. Por favor intenta nuevamente."
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-lg border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700">
      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-8 text-center"
        >
          <CheckCircle className="mb-4 h-16 w-16 text-green-500" />
          <h3 className="text-xl font-semibold">¡Mensaje enviado!</h3>
          <p className="mt-2 text-muted-foreground">Nos pondremos en contacto contigo a la brevedad.</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre completo</Label>
            <Input
              id="name"
              placeholder="Ingresa tu nombre"
              {...register("name", { required: "Este campo es obligatorio" })}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              {...register("email", {
                required: "Este campo es obligatorio",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Dirección de correo inválida",
                },
              })}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="career">Carrera de interés</Label>
            <Select onValueChange={handleCareerChange} value={careerValue}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una carrera" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Analista de Sistemas">Analista de Sistemas</SelectItem>
                <SelectItem value="Tec. en Seguridad e Higiene">Tec. en Seguridad e Higiene</SelectItem>
                <SelectItem value="Tec. en Redes">Tec. en Redes</SelectItem>
              </SelectContent>
            </Select>
            <input type="hidden" {...register("career", { required: "Por favor selecciona una carrera" })} />
            {errors.career && <p className="text-sm text-red-500">{errors.career.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Mensaje</Label>
            <Textarea
              id="message"
              placeholder="Escribe tu consulta aquí..."
              {...register("message", { required: "Este campo es obligatorio" })}
              className={`min-h-[100px] ${errors.message ? "border-red-500" : ""}`}
            />
            {errors.message && <p className="text-sm text-red-500">{errors.message.message}</p>}
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-3 dark:bg-red-900/20">
              <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
            </div>
          )}

          <Button type="submit" className="w-full bg-primary text-white hover:bg-primary/90" disabled={isLoading}>
            {isLoading ? "Enviando..." : "Enviar mensaje"}
          </Button>
        </form>
      )}
    </div>
  )
}
