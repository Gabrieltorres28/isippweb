"use client";
import React from "react";
import Image from "next/image";

interface SeguridadInfoSectionProps {
  className?: string;
  id?: string;
}

export default function SeguridadInfoSection({ className, id }: SeguridadInfoSectionProps) {
  return (
    <section
      id={id ?? "carrera"}
      className={`py-16 scroll-mt-24 section-gradient-1 ${className || ""}`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-12">
          {/* Contenido principal */}
          <div className="w-full md:w-1/2 text-center md:text-left mx-auto max-w-2xl text-gray-900 dark:text-white">
            <h2 className="text-4xl font-bold mb-6 text-primary dark:text-primary-foreground">
              Técnico Superior en Higiene y Seguridad Laboral
            </h2>
            <p className="text-lg mb-8 leading-relaxed text-gray-700 dark:text-gray-200">
              La carrera te capacita para identificar, evaluar y controlar riesgos laborales, 
              implementando medidas preventivas para garantizar entornos de trabajo seguros 
              y saludables conforme a la legislación vigente.
            </p>
            <ul className="space-y-4 text-gray-700 dark:text-gray-200">
              <li className="flex items-center justify-center md:justify-start space-x-3">
                <span className="text-primary dark:text-primary-foreground text-xl">🕒</span>
                <span>Duración: 3 años</span>
              </li>
              <li className="flex items-center justify-center md:justify-start space-x-3">
                <span className="text-primary dark:text-primary-foreground text-xl">📍</span>
                <span>Modalidad: Presencial</span>
              </li>
              <li className="flex items-center justify-center md:justify-start space-x-3">
                <span className="text-primary dark:text-primary-foreground text-xl">🔍</span>
                <span>Enfoque: Prevención de riesgos y condiciones de trabajo</span>
              </li>
            </ul>
          </div>

          {/* Contenedor de imagen cuadrada */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative w-full aspect-square max-w-md rounded-xl overflow-hidden shadow-2xl border border-white/30 bg-white/80 dark:bg-white/5">
              <Image
                src="/tecseg.png" // Cambiar por imagen adecuada
                alt="Técnico evaluando riesgos laborales"
                fill
                className="object-cover object-center"
                quality={100}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/12 via-transparent to-primary/5 dark:from-white/10 dark:via-transparent dark:to-white/5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
