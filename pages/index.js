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
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";
import { FAQS_DATA } from "@/data/content";

export default function SinglePageHome({ clientImages }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // JSON-LD Structured Data for Organization & Services
  const structuredOrgData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Makerspace Masters",
    url: "https://makerspacemasters.com",
    logo: "https://makerspacemasters.com/images/common/mainLogo.svg",
    description:
      "Complete turnkey innovation and STEM lab setup for schools and universities across India. NEP 2020 aligned with teacher training and 18+ fabrication disciplines.",
    sameAs: [
      "https://www.linkedin.com/company/makerspace-masters",
      "https://www.youtube.com/@makerspacemasters",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-1800-547-7600",
      contactType: "customer service",
      availableLanguage: ["English", "Hindi"],
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
      addressRegion: "Delhi",
      addressLocality: "New Delhi",
    },
  };

  // JSON-LD Structured Data for FAQs (Google Rich Snippets)
  const structuredFaqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS_DATA.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>Makerspace Masters | Turnkey Innovation & STEM Labs for Schools & Colleges</title>
        <meta
          name="description"
          content="Transform your school with world-class turnkey makerspace labs. Grade 1-12 hands-on STEM, Robotics, AI, 3D Printing, Woodworking & Pottery. NEP 2020 aligned with teacher enablement. Book a free demo."
        />
        <meta
          name="keywords"
          content="makerspace lab setup, STEM lab setup for schools, ATL lab setup, robotics lab for schools, NEP 2020 experiential learning, 3D printing lab, carpentry lab, AI lab for schools, school innovation hub"
        />
        <meta name="author" content="Makerspace Masters India" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href="https://makerspacemasters.com/" />

        {/* Open Graph / Facebook / LinkedIn */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Makerspace Masters" />
        <meta property="og:url" content="https://makerspacemasters.com/" />
        <meta
          property="og:title"
          content="Makerspace Masters | Turnkey Innovation & STEM Labs for Schools & Colleges"
        />
        <meta
          property="og:description"
          content="Turnkey makerspace lab setup for K-12 schools and universities. Hands-on Robotics, 3D Fabrication, AI, Woodworking & Pottery with certified teacher training."
        />
        <meta property="og:image" content="https://makerspacemasters.com/images/makerspace/master.webp" />
        <meta property="og:image:alt" content="Makerspace Masters Innovation Labs" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@makerspacemasters" />
        <meta
          name="twitter:title"
          content="Makerspace Masters | Turnkey Innovation & STEM Labs for Schools"
        />
        <meta
          name="twitter:description"
          content="Turnkey makerspace lab setup for K-12 schools and universities. Hands-on Robotics, 3D Fabrication, AI, Woodworking & Pottery with certified teacher training."
        />
        <meta name="twitter:image" content="https://makerspacemasters.com/images/makerspace/master.webp" />

        {/* JSON-LD Schema Microdata for Google Search Rich Results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredOrgData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredFaqData) }}
        />
      </Head>

      <div className="min-h-screen flex flex-col bg-white text-neutral-900 font-['Work_Sans',sans-serif]">
        {/* Navigation Bar */}
        <Navbar onOpenModal={openModal} />

        {/* Main Single Page Sections */}
        <main className="flex-1">
          {/* 1. Hero Section with Background & Consultation Form */}
          <HeroSection onOpenModal={openModal} />

          {/* 2. Key Impact Stats & Dynamic Statements */}
          <StatsSection />

          {/* 3. Divisions: One Mission, Three Ways to Build It */}
          <MissionSection onOpenModal={openModal} />

          {/* 4. Client Logos Continuous Marquee */}
          <ClientLogos images={clientImages} />

          {/* 5. 18+ Innovation Modules & Specializations */}
          <ModulesSection />

          {/* 6. Testimonials from Educators & Leaders */}
          <TestimonialsSection />

          {/* 7. FAQ Accordion */}
          <FaqSection onOpenModal={openModal} />
        </main>

        {/* Global Footer with Big CTA */}
        <Footer onOpenModal={openModal} />

        {/* Consultation Modal */}
        <ContactModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </>
  );
}

// Server-Side Rendering (SSR)
export async function getServerSideProps({ res }) {
  // Set optimal cache headers for search engines and CDN
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=300"
  );

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
    console.error("Error reading client images during SSR:", error);
  }

  return {
    props: {
      clientImages,
    },
  };
}
