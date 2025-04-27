"use client";
import React from "react";
import Image from "next/image";

interface AnalistaInfoSectionProps {
  className?: string;
}

export default function AnalistaInfoSection({ className }: AnalistaInfoSectionProps) {
  return (
    <section
      id="analista" 
     
      className={`py-16 bg-primary dark:bg-primary-dark ${className || ""}`}
      style={{ marginTop: "-1px" }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-12">
          {/* Contenido principal */}
          <div className="w-full md:w-1/2 text-primary-foreground dark:text-primary-dark-foreground text-center md:text-left mx-auto max-w-2xl">
            <h2 className="text-4xl font-bold mb-6 text-primary">
              Información sobre la Carrera
            </h2>
            <p className="text-lg mb-8 leading-relaxed text-muted-foreground">
              La carrera de Analista en Sistemas te capacita para desarrollar soluciones 
              software, analizar requerimientos y gestionar sistemas informáticos 
              en diversos contextos organizacionales.
            </p>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-center justify-center md:justify-start space-x-3">
                <span className="text-accent dark:text-accent-foreground text-xl ">🕒</span>
                <span>Duración: 3 años</span>
              </li>
              <li className="flex items-center justify-center md:justify-start space-x-3">
                <span className="text-accent dark:text-accent-foreground text-xl">📍</span>
                <span>Modalidad: Presencial</span>
              </li>
              <li className="flex items-center justify-center md:justify-start space-x-3">
                <span className="text-accent dark:text-accent-foreground text-xl">💻</span>
                <span>Enfoque en desarrollo de software</span>
              </li>
            </ul>
          </div>

          {/* Contenedor de imagen cuadrada */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative w-full aspect-square max-w-md rounded-xl overflow-hidden shadow-2xl border-4 border-white/10 bg-white/10">
              <Image
                src="/analista-career-image.png"  // Cambiar por imagen de Analista
                alt="Estudiantes trabajando en desarrollo de software"
                fill
                className="object-cover object-center"
                quality={100}
                priority
              />
              <div className="absolute inset-0 bg-primary/30 dark:bg-primary-dark/30 mix-blend-multiply" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}