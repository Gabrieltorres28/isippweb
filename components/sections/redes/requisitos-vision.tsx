"use client";
import React from "react";
import InfoCard from "@/components/InfoCardTemp";

interface RedesExtraInfoSectionProps {
  className?: string;
  id?: string;
}

export default function RedesExtraInfoSection({ className, id }: RedesExtraInfoSectionProps) {
  return (
    <section id={id} className={`py-16 scroll-mt-24 section-gradient-2 text-foreground ${className || ""}`}>
      <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-8">

        <InfoCard
          title="Requisitos"
          icon="📋"
          items={[
            "✔ Educación Secundaria completa",
            "✔ Manejo básico de computadoras y conectividad a internet",
          ]}
        />

        <InfoCard
          title="¿Cómo vas a cursar?"
          icon="📚"
          items={[
            "📌 <strong>Modalidad presencial</strong> ",
            "📌 <strong>Material didáctico</strong> ",
            "📌 <strong>Acompañamiento docente</strong> ",
          ]}
        >
          💻 Aprendé con apoyo constante.
        </InfoCard>

        <InfoCard
          title="¿Por qué elegir esta carrera?"
          icon="🎯"
          items={[
            "📈 <strong>Alta demanda laboral:</strong> el sector tecnológico está en auge",
            "✅ <strong>Competencia profesional:</strong> conocimientos aplicables"
          ]}
        />

        <InfoCard
          title="Funciones Clave"
          icon="🌟"
          items={[
            "🛠 Configuración de redes y dispositivos",
            "🔐 Seguridad informática y protocolos",
            "📡 Soporte técnico y resolución de problemas",
            "🧰 Mantenimiento de infraestructura digital",
          ]}
        />

        <InfoCard
          title="Ámbitos de Trabajo"
          icon="🏢"
        >
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Podés desempeñarte en empresas de telecomunicaciones, áreas de IT, instituciones educativas,
            organismos públicos o como técnico independiente.
          </p>
        </InfoCard>

      </div>
    </section>
  );
}
