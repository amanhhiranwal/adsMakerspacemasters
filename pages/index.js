import { useState } from "react";
import Head from "next/head";
import fs from "fs";
import path from "path";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import MissionSection from "@/components/MissionSection";
import ClientLogos from "@/components/ClientLogos";
import ModulesSection from "@/components/ModulesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FaqSection from "@/components/FaqSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";

export default function SinglePageHome({ clientImages }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Head>
        <title>Makerspace Masters | Premium Innovation Labs & Learning Spaces</title>
        <meta
          name="description"
          content="Complete lab setup for schools, Colleges & Institutions. STEM, Robotics, AI, Composite & Innovation Labs. NEP 2020 aligned. Free demo."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://makerspacemasters.com/" />
        <meta property="og:title" content="Makerspace Masters | Premium Innovation Labs" />
        <meta
          property="og:description"
          content="Transforming schools with world-class hands-on makerspace labs, robotics, 3D printing, AI, and teacher enablement."
        />
        <meta property="og:image" content="/images/common/mainLogo.svg" />
        <meta property="og:url" content="https://makerspacemasters.com/" />
      </Head>

      <div className="min-h-screen flex flex-col bg-white text-neutral-900 font-['Work_Sans',sans-serif]">
        {/* Navigation Bar with Smooth Scrolling Anchor Links */}
        <Navbar onOpenModal={openModal} />

        {/* Main Single Page Sections */}
        <main className="flex-1">
          {/* 1. Hero Section with master webp background */}
          <HeroSection onOpenModal={openModal} />

          {/* 2. Key Impact Stats & Animated Vision */}
          <StatsSection />

          {/* 3. Divisions: One Mission, Three Ways to Build It */}
          <MissionSection onOpenModal={openModal} />

          {/* 4. Client Logos Continuous Marquee */}
          <ClientLogos images={clientImages} />

          {/* 5. 18+ Innovation Modules & Specializations */}
          <ModulesSection onOpenModal={openModal} />

          {/* 6. Testimonials from Educators & Leaders */}
          <TestimonialsSection />

          {/* 7. FAQ Accordion */}
          <FaqSection onOpenModal={openModal} />

          {/* 8. On-Page Full 3-Step Consultation Contact Form */}
          <ContactSection />
        </main>

        {/* Global Footer with Big CTA */}
        <Footer onOpenModal={openModal} />

        {/* 3-Step Consultation Stepper Modal (Popup version) */}
        <ContactModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </>
  );
}

export async function getStaticProps() {
  let clientImages = [];
  try {
    const clientDir = path.join(process.cwd(), "public", "images", "client");
    if (fs.existsSync(clientDir)) {
      const files = fs.readdirSync(clientDir);
      clientImages = files.filter((file) =>
        /\.(jpg|jpeg|png|webp|svg)$/i.test(file)
      );
    }
  } catch (error) {
    console.error("Error reading client images:", error);
  }

  return {
    props: {
      clientImages,
    },
  };
}
