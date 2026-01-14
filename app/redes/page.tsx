"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Header } from "@/components/header";
import SocialBubble from "@/components/SocialBubble";
import RedesInfoSection from "@/components/sections/redes/RedesInfoSection";
import RedesRequisitosVision from "@/components/sections/redes/requisitos-vision";
import RedesScheduleFragment from "@/components/sections/redes/RedesScheduleFragment";
import CorrelativasVisual from "@/components/correlativas/CorrelativasVisual";
import { Footer } from "@/components/footer";

export default function RedesPage() {
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
      className="bg-background text-foreground font-inter" // Aplicando estilos base
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
            src="/pararede.png"
            alt="ISIPP Building"
            fill
            priority
            quality={100}
            className="object-cover object-center card-content-transition"
            sizes="100vw"
          />
          <div className="absolute inset-0 hero-overlay" />
        </motion.div>

        {/* Contenido sobre la imagen */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
          <Header />
          <SocialBubble />
          <h1 className="text-5xl font-bold text-center font-playfair glow-text animate-pulse-intense"> {/* Aplicando estilos personalizados */}
            Redes y Comunicación
          </h1>
        </div>
      </section>

      {/* Secciones siguientes (pegadas sin espacio) */}
      <RedesInfoSection id="carrera" className="section-gradient-1 scroll-mt-24" />
      <RedesRequisitosVision id="requisitos" className="section-gradient-2 scroll-mt-24" />
      <RedesScheduleFragment id="horarios" className="scroll-mt-24" />
      <CorrelativasVisual 
        carreraId="redes" 
        className="perspective-1000 scroll-mt-24"
      /> {/* Efecto 3D */}
      <Footer  /> {/* Usando variables de color */}
    </motion.div>
  );
}
