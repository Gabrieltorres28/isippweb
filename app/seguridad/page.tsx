"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Header } from "@/components/header";
import SocialBubble from "@/components/SocialBubble";
import SeguridadInfoSection from "@/components/sections/seguridad/SeguridadInfoSection";
import SeguridadRequisitosVision from "@/components/sections/seguridad/requisitos-vision";
import SeguridadScheduleFragment from "@/components/sections/seguridad/SeguridadScheduleFragment";
import CorrelativasVisual from "@/components/correlativas/CorrelativasVisual";
import { Footer } from "@/components/footer";

export default function SeguridadPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <motion.div
      key="main-content"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-background text-foreground font-inter"
    >
      {/* Sección Hero (imagen de fondo) */}
      <section
        id="inicio"
        ref={heroRef}
        className="relative h-screen w-full overflow-hidden"
      >
        <motion.div 
          className="absolute inset-0 z-0 glow-border"
          style={{ y, scale, transformOrigin: "center" }}
        >
          <Image
            src="/seguridad_e_higiene_hero_section.jpeg" // Cambiar por imagen adecuada de higiene y seguridad
            alt="Técnico en Higiene y Seguridad"
            fill
            priority
            quality={100}
            className="object-cover object-center card-content-transition"
            sizes="100vw"
          />
          {/* Gradiente ajustado para transición suave */}
          <div className="absolute inset-0 hero-overlay" />
        </motion.div>

        {/* Contenido sobre la imagen */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
          <Header />
          <SocialBubble />
          <h1 className="text-5xl font-bold text-center font-playfair glow-text animate-pulse-intense">
            Técnico en Higiene y Seguridad Laboral
          </h1>
        </div>
      </section>

      {/* Secciones siguientes */}
      <SeguridadInfoSection id="carrera" className="section-gradient-1 scroll-mt-24" />
      <SeguridadRequisitosVision id="requisitos" className="section-gradient-2 scroll-mt-24" />
      <SeguridadScheduleFragment id="horarios" className="scroll-mt-24" />
      <CorrelativasVisual 
        carreraId="higiene" 
        className="perspective-1000 scroll-mt-24" 
      />
      <Footer />
    </motion.div>
  );
}
