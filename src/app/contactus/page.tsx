'use client';
import React, { useState } from "react";
import type { StaticImageData } from "next/image";

const srcOf = (img: string | StaticImageData): string => (typeof img === "string" ? img : img.src);

import {
  Laptop,
  Shield,
  Heart,
  Send,
  Zap,
  Users,
  Clock,
  CheckSquare,
  Mail,
  Phone,
  Building,
  Clock3,
  Instagram,
  Facebook,
  Linkedin as Linked,
  Linkedin as LinkedinIcon,
  X,
} from "lucide-react";
import logo2 from "../../Assests/newlogo.png";
import logo from "../../Assests/srv.svg";
import webStrategy from "../../Assests/WebsiteStrategy.png";
import cyb from "../../Assests/cyb.png";
import digitalMarketing from "../../Assests/DigitalSupport.png";
import { useRouter } from "next/navigation";
import mobile from "../../Assests/new.jpeg";
import selected from "../../Assests/selected.png";
import nonselected from "../../Assests/nonselected.png";
import header from "../../Assests/HEADER.png";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // <-- ADDED mobile state (only new line)
  const [mobileOpen, setMobileOpen] = useState(false);

  // ADD LANGUAGE STATE - This is for English/French switching
  const [language, setLanguage] = useState("EN");

  // email submit states (ADDED)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showQuote, setShowQuote] = useState(false);

  // keep compatibility with existing usage of showMobileNav / setShowMobileNav
  const showMobileNav = mobileOpen;
  const setShowMobileNav = setMobileOpen;

  const router = useRouter();

  // UPDATED: sanitize phone input (digits only, max 15)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, "").slice(0, 15);
      setFormData(prev => ({ ...prev, phone: digitsOnly }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // REPLACED: async FormSubmit handler with validation + timed success hide
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setShowQuote(false);

    try {
      // Basic validations
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
      if (!emailOk) {
        window.alert(language === "EN" ? "Please enter a valid email address (must contain @)." : "Veuillez saisir une adresse e-mail valide (doit contenir @).");
        return;
      }

      const phoneLen = formData.phone.replace(/\D/g, "").length;
      if (phoneLen < 9 || phoneLen > 15) {
        window.alert(language === "EN"
          ? "Phone number must be 9 to 15 digits."
          : "Le numéro de téléphone doit comporter entre 9 et 15 chiffres.");
        return;
      }

      const fd = new FormData();
      fd.append("name", formData.name);
      fd.append("email", formData.email);
      fd.append("phone", formData.phone);
      fd.append("message", formData.message);

      // Admin-only delivery:
      // Main recipient is the endpoint email (info@bim.africa)
      // CC goes to info@bim.africa
      fd.append("_cc", "info@bim.africa");

      fd.append("_captcha", "false");
      fd.append("_template", "table");
      fd.append("_subject", "New Contact Us From"); // SUBJECT

      // Optional redirect after success:
      // fd.append("_next", "https://yourdomain.com/thank-you");

      await fetch("https://formsubmit.co/info@bim.africa", {
        method: "POST",
        body: fd,
      });

      setShowQuote(true);

      // Hide success message after 5s
      setTimeout(() => setShowQuote(false), 5000);

      // Optional: clear the form
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error("Error sending quote:", err);
      window.alert("Failed to send message. Please try again or check the console.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // LANGUAGE CONTENT OBJECTS - Added for translation
  const content = {
    EN: {
      nav: {
        home: "Home",
        about: "About Us",
        services: "Services",
        blog: "Blog",
        contact: "Contact Us"
      },
      buttons: {
        instantQuotation: "Instant Quotation",
        callNow: "Call Now – Emergency Line",
        sendMessage: "Send Message",
        joinNow: "JOIN NOW"
      },
      hero: {
        title: "Let's Build Something",
        titleHighlight: "Exceptional",
        subtitle: "At BIM Africa, we partner with established businesses to elevate their digital presence through:",
        footerText: "With teams in Mauritius and Luxembourg, we deliver seamless solutions with a global perspective."
      },
      services: {
        website: {
          title: "Premium Website Development",
          description: "Bespoke websites that reflect your brand's authority and ambition."
        },
        cyber: {
          title: "Cybersecurity & Threat Management",
          description: "Enterprise-grade protection to safeguard your reputation and assets."
        },
        digital: {
          title: "Digital Support Outsourcing",
          description: "Flexible, high-level support designed to scale with your operations."
        }
      },
      contact: {
        formTitle: "Send Us a Message",
        formSubtitle: "Fill out the form below and we'll get back to you within 24 hours",
        // UPDATED TEXTS BELOW
        emergencyTitle: "Need Immediate Help?",
        emergencySubtitle: "For critical issues like downtime, security breaches, or payment errors, reach us instantly.",
        excellenceTitle: "Excellence You Can Rely On",
        fields: {
          name: "Name *",
          namePlaceholder: "Your full name",
          email: "Email *",
          emailPlaceholder: "your.email@example.com",
          phone: "Phone",
          phonePlaceholder: "Enter your Number",
          message: "How can we help you?",
          messagePlaceholder: "Tell us about your project, questions, or how we can help..."
        }
      },
      excellence: {
        expert: {
          title: "Expert Team",
          description: "International professionals with 10+ years of combined experience"
        },
        support: {
          title: "24/7 Support",
          description: "Always available when you need us most"
        },
        results: {
          title: "Proven Results",
          description: "Trusted by businesses in Mauritius & Luxembourg & beyond"
        }
      },
      contactInfo: {
        title: "Contact Information",
        email: "Email",
        phone: "Phone",
        offices: "Offices",
        officesLocation: "Mauritius & Luxembourg",
        businessHours: "Business Hours",
       businessHoursTime: "Weekdays: 9 AM – 5 PM  Weekends: Closed",


      },
      footer: {
        quickLinks: "QUICK LINKS",
        support: "SUPPORT",
        referralProgram: "REFERRAL PROGRAM",
        referralText: "Know someone who needs elite digital solutions? Refer them — and earn through our tiered incentive program, Simple to join. Profitable to share.",
        copyright: "Copyright © 2025 BIM. All Rights Reserved.",
        location: "Mauritius & Luxembourg",
        // ADDED KEYS
        privacyPolicy: "Privacy Policy",
        termsConditions: "Terms of Service",
        termsUse: "Terms of Use",
      }
    },
    FR: {
      nav: {
        home: "Accueil",
        about: "À Propos",
        services: "Services",
        blog: "Blog",
        contact: "Contactez-nous"
      },
      buttons: {
        instantQuotation: "Devis Instantané",
        callNow: "Appelez Maintenant – Ligne d'Urgence",
        sendMessage: "Envoyer le Message",
        joinNow: "REJOINDRE"
      },
      hero: {
        title: "Construisons Quelque Chose",
        titleHighlight: "d'Exceptionnel",
        subtitle: "Chez BIM Africa, nous nous associons avec des entreprises établies pour élever leur présence numérique grâce à :",
        footerText: "Avec des équipes à Maurice et au Luxembourg, nous offrons des solutions transparentes avec une perspective mondiale."
      },
      services: {
        website: {
          title: "Développement de Sites Web Premium",
          description: "Sites web sur mesure qui reflètent l'autorité et l'ambition de votre marque."
        },
        cyber: {
          title: "Cybersécurité et Gestion des Menaces",
          description: "Protection de niveau entreprise pour sauvegarder votre réputation et vos actifs."
        },
        digital: {
          title: "Externalisation du Support Numérique",
          description: "Support flexible et de haut niveau conçu pour évoluer avec vos opérations."
        }
      },
      contact: {
        formTitle: "Envoyez-nous un Message",
        formSubtitle: "Remplissez le formulaire ci-dessous et nous vous répondrons dans les 24 heures",
        emergencyTitle: "Besoin d'Assistance Immédiate ?",
        emergencySubtitle: "Pour les questions urgentes, appelez-nous directement ou planifiez une consultation gratuite.",
        excellenceTitle: "Excellence sur Laquelle Vous Pouvez Compter",
        fields: {
          name: "Nom *",
          namePlaceholder: "Votre nom complet",
          email: "E-mail *",
          emailPlaceholder: "votre.email@exemple.com",
          phone: "Téléphone",
          phonePlaceholder: "Enter your Number",
          message: "Comment pouvons-nous vous aider ?",
          messagePlaceholder: "Parlez-nous de votre projet, vos questions, ou comment nous pouvons vous aider..."
        }
      },
      excellence: {
        expert: {
          title: "Équipe d'Experts",
          description: "Professionnels internationaux avec plus de 10 ans d'expérience combinée"
        },
        support: {
          title: "Support 24/7",
          description: "Toujours disponible quand vous en avez le plus besoin"
        },
        results: {
          title: "Résultats Prouvés",
          description: "Approuvé par des entreprises à Maurice, au Luxembourg et au-delà"
        }
      },
      contactInfo: {
        title: "Informations de Contact",
        email: "E-mail",
        phone: "Téléphone",
        offices: "Bureaux",
        officesLocation: "Maurice et Luxembourg",
        businessHours: "Heures d'Ouverture",
        businessHoursTime: "Lundi – Vendredi : 9h00 – 18h00\nSamedi – Dimanche : Fermé"
      },
      footer: {
        quickLinks: "LIENS RAPIDES",
        support: "SUPPORT",
        referralProgram: "PROGRAMME DE PARRAINAGE",
        referralText: "Vous connaissez quelqu'un qui a besoin de solutions numériques d'élite ? Recommandez-le — et gagnez grâce à notre programme d'incitation à plusieurs niveaux. Simple à rejoindre. Rentable à partager.",
        copyright: "Copyright © 2025 BIM. Tous Droits Réservés.",
        location: "Maurice, Luxembourg",
        // ADDED KEYS
        privacyPolicy: "Politique de Confidentialité",
        termsConditions: "Termes et Conditions",
        termsUse: "Conditions d’Utilisation",
      }
    }
  };

  // GET CURRENT LANGUAGE CONTENT
  const t = content[language as keyof typeof content];

  // Minimal navigationItems used in mobile menu (updated with translations)
  const navigationItems = [
    { name: t.nav.home, href: "#", active: false },
    { name: t.nav.about, href: "#", active: false },
    { name: t.nav.services, href: "/", active: false },
    { name: t.nav.blog, href: "#", active: false },
    { name: t.nav.contact, href: "#", active: true },
  ];

  // Simple framer-motion variants to avoid runtime errors
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.55 },
    exit: { opacity: 0 },
  };

  const panelVariants = {
    hidden: { opacity: 0, y: -30, rotateX: 14, transformOrigin: "top center", scale: 0.995 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: { duration: 0.3, ease: [0.22, 0.8, 0.2, 1] }, // main 0.3s
    },
    exit: {
      opacity: 0,
      y: -28,
      rotateX: 12,
      scale: 0.995,
      transition: { duration: 0.22, ease: "easeInOut" },
    },
  };

  const listContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.05, delayChildren: 0.06 } },
  };

  const listItem = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.22, ease: "easeOut" } },
  };

  /* ====================== ADDED: WhatsApp chooser state + helper ====================== */
  const [showWA, setShowWA] = useState(false);

  const openWhatsApp = (raw: string) => {
    const digits = raw.replace(/\D/g, ""); // keep only numbers
    const url = `https://wa.me/${digits}`;
    window.location.href = url; // ensure mobile opens WhatsApp directly
  };
  /* =================================================================================== */

  return (
    <div
      className="min-h-screen text-white"
      style={{
        backgroundImage: `url(${logo.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <AnimatePresence>
        {showMobileNav && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-[95] md:hidden bg-black"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            />

            <motion.aside
              key="panel"
              className="fixed inset-0 z-[100] md:hidden"
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div
                className="bg-cover bg-center relative"
                style={{
                  backgroundImage: `url(${mobile.src})`,
                  minHeight: "100svh",
                  height: "100vh",
                }}
              >
                <div className="flex flex-col min-h-full pt-1 pb-6" style={{ position: "relative" }}>
                  <div className="flex items-center justify-between pl-4 pr-4">
                    <img src={logo2.src} className="w-[5rem] object-contain" alt="Logo" />

                    <motion.button
                      onClick={() => setShowMobileNav(false)}
                      className="text-white hover:text-red-500 p-2"
                      aria-label="Close menu"
                      whileTap={{ scale: 0.92, rotate: 6 }}
                    >
                      <X size={32} className="block" />
                    </motion.button>
                  </div>

                  <motion.nav
                    className="flex-1 flex flex-col justify-start px-8 gap-y-3 mt-6 overflow-auto"
                    variants={listContainer}
                    initial="hidden"
                    animate="visible"
                  >
                    {navigationItems.map((item, idx) => (
                      <motion.div key={idx} className="flex items-center w-full max-w-full py-3" variants={listItem}>
                        <a
                          href={item.href}
                          onClick={() => setShowMobileNav(false)}
                          className={`flex-1 text-left text-lg font-medium transition-colors ${item.active ? "text-red-500" : "text-white hover:text-red-300"
                            }`}
                        >
                          {item.name}
                        </a>

                        <motion.img
                          src={item.active ? selected.src : nonselected.src}
                          alt=""
                          className="w-6 h-6 ml-4 flex-shrink-0"
                          initial={{ scale: 0.9, opacity: 0.6 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.18 }}
                        />
                      </motion.div>
                    ))}
                  </motion.nav>

                  <div
                    className="fixed left-0 right-0 bottom-8 px-6"
                    style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 1rem) + 0.75rem)", pointerEvents: "auto" }}
                  >
                    <a href="https://quotation.bim.africa/" target="_blank" rel="noopener noreferrer" className="block w-full">
                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-[#ff1f00] hover:bg-red-600 text-white py-4 rounded-full text-lg font-medium inline-block text-center transition-colors"
                      >
                        {t.buttons.instantQuotation}
                      </motion.button>
                    </a>
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Header - MOBILE RESPONSIVENESS ADDED */}
      <header className="bg-black/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between">
          <img src={logo2.src} className="w-20 sm:w-24 md:w-28 lg:w-[110px]" alt="logo" />

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-16 relative">
            <a href="#" className="wave-link relative font-medium text-white text-base">
              {t.nav.home}
              <svg className="link__graphic link__graphic--slide" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">
                <path
                  d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46
             c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"
                  fill="none"
                  stroke="#FFF"
                  strokeWidth="2"
                />
              </svg>
            </a>

            <a href="#" className="wave-link relative font-medium text-white text-base">
              {t.nav.about}
              <svg className="link__graphic link__graphic--slide" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">
                <path
                  d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46
             c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"
                  fill="none"
                  stroke="#FFF"
                  strokeWidth="2"
                />
              </svg>
            </a>

            <a href="/" className="wave-link relative font-medium text-white text-base">
              {t.nav.services}
              <svg className="link__graphic link__graphic--slide" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">
                <path
                  d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46
             c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"
                  fill="none"
                  stroke="#FFF"
                  strokeWidth="2"
                />
              </svg>
            </a>

            <a href="#" className="wave-link relative font-medium text-white text-base">
              {t.nav.blog}
              <svg className="link__graphic link__graphic--slide" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">
                <path
                  d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46
             c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"
                  fill="none"
                  stroke="#FFF"
                  strokeWidth="2"
                />
              </svg>
            </a>

            <a href="/contactus" className="wave-link relative font-medium text-red-500 text-base">
              {t.nav.contact}
              <svg className="link__graphic link__graphic--slide" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">
                <path
                  d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46
             c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"
                  fill="none"
                  stroke="#FF1F00"
                  strokeWidth="2"
                />
              </svg>
            </a>
          </nav>

          {/* Right side buttons - MOBILE RESPONSIVENESS ADDED */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <a href="https://quotation.bim.africa/" target="_blank" rel="noopener noreferrer" className="inline-block">
              <button className="text-red-500 border border-red-500 px-4 py-2 sm:px-6 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap hover:bg-red-500 hover:text-white">
                {t.buttons.instantQuotation}
              </button>
            </a>
            {/* LANGUAGE SWITCH BUTTON - Added functionality */}
            <button
              onClick={() => setLanguage(language === "EN" ? "FR" : "EN")}
              className="bg-white rounded-full p-1 sm:p-2 flex items-center space-x-1"
            >
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-red-500 flex items-center justify-center">
                <span className="text-white text-xs font-bold">+</span>
              </div>
              <span className="text-black text-xs sm:text-sm font-medium px-1 sm:px-2">{language === "EN" ? "FR" : "ENG"}</span>
            </button>

            {/* Hamburger toggle (mobile) - MOBILE RESPONSIVENESS ADDED */}
            <button
              onClick={() => setShowMobileNav(!showMobileNav)}
              className="md:hidden text-white"
              aria-label="Toggle menu"
            >
              {showMobileNav ? (
                // Close icon (X)
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    d="M6 6L18 18M6 18L18 6"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                // Menu logo (image)
                <img
                  src={header.src}
                  alt="menu"
                  className="w-10 sm:w-15"
                />
              )}
            </button>
          </div>
        </div>

        {/* Simple Mobile Nav (drops down) - MOBILE RESPONSIVENESS ADDED */}
        {mobileOpen && (
          <nav className="md:hidden bg-black/95 backdrop-blur-sm border-t border-gray-800">
            <ul className="flex flex-col p-4 sm:p-6 space-y-3 sm:space-y-4">
              <li>
                <a href="#" onClick={() => setMobileOpen(false)} className="block text-white text-base sm:text-lg font-medium py-2">
                  {t.nav.home}
                </a>
              </li>
              <li>
                <a href="#" onClick={() => setMobileOpen(false)} className="block text-white text-base sm:text-lg font-medium py-2">
                  {t.nav.about}
                </a>
              </li>
              <li>
                <a href="/" onClick={() => setMobileOpen(false)} className="block text-white text-base sm:text-lg font-medium py-2">
                  {t.nav.services}
                </a>
              </li>
              <li>
                <a href="#" onClick={() => setMobileOpen(false)} className="block text-white text-base sm:text-lg font-medium py-2">
                  {t.nav.blog}
                </a>
              </li>
              <li>
                <a href="#" onClick={() => setMobileOpen(false)} className="block text-red-500 text-base sm:text-lg font-medium py-2">
                  {t.nav.contact}
                </a>
              </li>

              <li className="pt-2">
                <a href="https://quotation.bim.africa/" target="_blank" rel="noopener noreferrer" className="block">
                  <button className="w-full bg-[#ff1f00] hover:bg-red-600 text-white py-3 rounded-full text-base sm:text-lg font-medium">{t.buttons.instantQuotation}</button>
                </a>
              </li>
            </ul>
          </nav>
        )}

        <style>{`
    a.wave-link {
      cursor: pointer;
      position: relative;
      padding: 6px 0;
      background: transparent;
      border: 0;
      white-space: nowrap;
      overflow: hidden;
    }
    .link__graphic {
      position: absolute;
      top: 0;
      left: 0;
      pointer-events: none;
      fill: none;
      stroke-width: 1px;
    }
    .link__graphic--slide {
      top: -3px,
      stroke-width: 2px;
      transition: transform 0.7s;
      transition-timing-function: cubic-bezier(0, 0.25, 0.5, 1);
    }
    a.wave-link:hover .link__graphic--slide {
      transform: translate3d(-66.6%, 0, 0);
    }
  `}</style>
      </header>

      {/* Hero Section - MOBILE RESPONSIVENESS ADDED */}
      <section className="px-4 sm:px-8 py-10 sm:py-16 md:py-20 max-w-7xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium mb-6 sm:mb-8 leading-tight">
          {t.hero.title} <span className="text-red-600">{t.hero.titleHighlight}</span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl mb-12 sm:mb-16 text-gray-300 max-w-4xl mx-auto px-4">{t.hero.subtitle}</p>

        {/* Service Cards - MOBILE RESPONSIVENESS ADDED */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 px-4">
          {/* Premium Website Development */}
          <div className="text-center p-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <img src={webStrategy.src} className="w-16 sm:w-20 lg:w-[100px]" alt="logo" />
            </div>
            <h3 className="text-xl sm:text-2xl font-medium mb-3 sm:mb-4">{t.services.website.title}</h3>
            <p className="text-white leading-relaxed text-sm sm:text-base">{t.services.website.description}</p>
          </div>

          {/* Cybersecurity & Threat Management */}
          <div className="text-center p-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <img src={cyb.src} className="w-16 sm:w-20 lg:w-[100px]" alt="" />
            </div>
            <h3 className="text-xl sm:text-2xl font-medium mb-3 sm:mb-4">{t.services.cyber.title}</h3>
            <p className="text-white leading-relaxed text-sm sm:text-base">{t.services.cyber.description}</p>
          </div>

          {/* Digital Support Outsourcing */}
          <div className="text-center p-4 sm:col-span-2 md:col-span-1">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <img src={digitalMarketing.src} className="w-16 sm:w-20 lg:w-[100px]" alt="" />
            </div>
            <h3 className="text-xl sm:text-2xl font-medium mb-3 sm:mb-4">{t.services.digital.title}</h3>
            <p className="text-white leading-relaxed text-sm sm:text-base">{t.services.digital.description}</p>
          </div>
        </div>

        <p className="text-base sm:text-lg md:text-xl text-white max-w-4xl mx-auto px-4">{t.hero.footerText}</p>
      </section>

      {/* Contact Form and Emergency Section - MOBILE RESPONSIVENESS ADDED */}
      <section className="px-4 sm:px-8 py-12 sm:py-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Contact Form */}
          <div className="bg-gradient-to-br from-red-900/30 to-red-800/20 rounded-2xl p-6 sm:p-8 border border-red-600/30">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-red-900 to-red-700 rounded-full flex items-center justify-center mb-4 sm:mb-6 transform transition duration-300 ease-out hover:scale-125 hover:-translate-y-1 hover:shadow-lg mx-auto">
              <Send className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-medium mb-3 sm:mb-4">{t.contact.formTitle}</h2>
            <p className="text-white mb-6 sm:mb-8 text-sm sm:text-base">{t.contact.formSubtitle}</p>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  {t.contact.fields.name}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={t.contact.fields.namePlaceholder}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/30 border border-gray-600 rounded-lg focus:outline-none focus:border-red-500 transition-colors placeholder-gray-500 text-sm sm:text-base"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  {t.contact.fields.email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={t.contact.fields.emailPlaceholder}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/30 border border-gray-600 rounded-lg focus:outline-none focus:border-red-500 transition-colors placeholder-gray-500 text-sm sm:text-base"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  {t.contact.fields.phone}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder={t.contact.fields.phonePlaceholder}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/30 border border-gray-600 rounded-lg focus:outline-none focus:border-red-500 transition-colors placeholder-gray-500 text-sm sm:text-base"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  {t.contact.fields.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder={t.contact.fields.messagePlaceholder}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/30 border border-gray-600 rounded-lg focus:outline-none focus:border-red-500 transition-colors placeholder-gray-500 resize-none text-sm sm:text-base"
                />
              </div>

              {/* Submit button (updated to disable during submit) */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`group relative w-full overflow-hidden text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base ${isSubmitting ? "opacity-75 cursor-not-allowed" : ""}`}
                style={{ background: "linear-gradient(90deg,#b91c1c,#ef4444)" }}
              >
                {/* animated sheen that slides across on hover */}
                <span
                  aria-hidden
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out pointer-events-none"
                  style={{
                    background: "linear-gradient(90deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0.12) 100%)",
                    mixBlendMode: "overlay",
                  }}
                />

                {/* subtle glowing ring behind (fades in) */}
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-lg bg-white/5 opacity-0 group-hover:opacity-40 transition-opacity duration-400 pointer-events-none"
                  style={{ filter: "blur(14px)" }}
                />

                {/* content (icon + text) */}
                <span className="relative z-10 flex items-center gap-2 sm:gap-3">
                  <span className="flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/10 group-hover:bg-white/20 transform transition duration-300 group-hover:scale-110">
                    <Send className="w-3 h-3 sm:w-4 sm:h-4 text-white transform transition duration-300 group-hover:rotate-12" />
                  </span>
                  <span className="transform transition-colors duration-200">
                    {isSubmitting ? (language === "EN" ? "Sending..." : "Envoi...") : t.buttons.sendMessage}
                  </span>
                </span>
              </button>

              {/* Optional success note (auto hides after 5s) */}
              {showQuote && (
                <p className="text-green-400 text-sm mt-2">
                  {language === "EN"
                    ? "Thanks! Your message has been sent — we'll get back to you shortly."
                    : "Merci ! Votre message a été envoyé — nous vous répondrons très bientôt."}
                </p>
              )}

              {/* Add this style block once (put near top of your JSX return if you prefer) */}
              <style>{`
  /* make the sheen feel smoother on hover out as well */
  .group:hover .absolute { transition-timing-function: cubic-bezier(.2,.8,.2,1); }
`}</style>
            </form>
          </div>

          {/* Emergency Assistance - MOBILE RESPONSIVENESS ADDED */}
<div className="space-y-6 sm:space-y-8 text-center">
  <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-6 sm:p-8">
    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-800/50 rounded-full flex items-center justify-center mb-4 sm:mb-6 mx-auto">
      <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
    </div>

    <h2 className="text-2xl sm:text-3xl font-medium mb-3 sm:mb-4">
      {t.contact.emergencyTitle}
    </h2>
    <p className="text-white mb-6 sm:mb-8 text-sm sm:text-base">
      {t.contact.emergencySubtitle}
    </p>

    {/* ▼▼ CALL + WHATSAPP BUTTONS ▼▼ */}
    <div className="flex flex-col gap-3 sm:gap-4">
      {/* CALL NOW (with icon) */}
      <button
        className="group relative w-full sm:flex-1 overflow-hidden text-red-600 font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
        style={{ background: "linear-gradient(90deg,#ffffff,#f3f4f6)" }}
        onClick={() => { window.location.href = 'tel:+23054514176'; }}
      >
        {/* animated sheen */}
        <span
          aria-hidden
          className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.6) 100%)",
            mixBlendMode: "overlay",
          }}
        />
        {/* glowing ring */}
        <span
          aria-hidden
          className="absolute inset-0 rounded-lg bg-red-200/40 opacity-0 group-hover:opacity-40 transition-opacity duration-400 pointer-events-none"
          style={{ filter: "blur(14px)" }}
        />
        {/* content */}
        <span className="relative z-10 flex items-center gap-2 sm:gap-3">
          <span className="flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-red-100/40 group-hover:bg-red-200/60 transform transition duration-300 group-hover:scale-110">
            <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-red-600 transform transition duration-300 group-hover:-rotate-12" />
          </span>
          <span>{t.buttons.callNow}</span>
        </span>
      </button>

      {/* WHATSAPP (separate line, with icon + text) */}
      <a
        href="https://wa.me/352661784276"
        target="_blank"
        rel="noopener noreferrer"
        title="WhatsApp Us – Priority Chat"
        aria-label="WhatsApp Us – Priority Chat"
        className="group relative w-full sm:flex-1 overflow-hidden text-red-600 font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
        style={{ background: "linear-gradient(90deg,#ffffff,#f3f4f6)" }}
      >
        {/* animated sheen */}
        <span
          aria-hidden
          className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.6) 100%)",
            mixBlendMode: "overlay",
          }}
        />
        {/* glowing ring */}
        <span
          aria-hidden
          className="absolute inset-0 rounded-lg bg-red-200/40 opacity-0 group-hover:opacity-40 transition-opacity duration-400 pointer-events-none"
          style={{ filter: "blur(14px)" }}
        />
        {/* content */}
        <span className="relative z-10 flex items-center gap-2 sm:gap-3">
          <span className="flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-red-100/40 group-hover:bg-red-200/60 transform transition duration-300 group-hover:scale-110">
            {/* WhatsApp SVG (red themed) */}
            <svg
              viewBox="0 0 32 32"
              className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 transform transition duration-300 group-hover:-rotate-12"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M16 3C9.37 3 4 8.37 4 15c0 2.14.55 4.15 1.52 5.92L4 29l8.3-1.44C14 28.45 15.96 29 18 29c6.63 0 12-5.37 12-12S24.63 3 18 3h-2z"
              />
              <path
                fill="white"
                d="M24.27 19.43c-.33-.16-1.96-.96-2.27-1.07-.31-.12-.54-.16-.76.16-.23.33-.88 1.07-1.08 1.29-.2.23-.4.26-.74.09-.33-.16-1.4-.52-2.66-1.65-.98-.87-1.64-1.95-1.84-2.28-.19-.33-.02-.5.14-.67.15-.15.33-.4.49-.6.16-.2.21-.33.33-.55.11-.23.06-.41-.03-.57-.09-.16-.76-1.83-1.04-2.5-.28-.67-.55-.58-.76-.59-.2-.01-.41-.01-.63-.01-.22 0-.58.08-.89.41-.31.33-1.17 1.15-1.17 2.82 0 1.67 1.2 3.29 1.37 3.52.17.23 2.36 3.6 5.7 5.01.8.35 1.43.55 1.92.7.81.26 1.55.22 2.13.13.65-.1 1.96-.8 2.24-1.57.28-.77.28-1.43.19-1.57-.1-.14-.3-.22-.63-.38z"
              />
            </svg>
          </span>
          <span className="transform transition-colors duration-200">
            WhatsApp Us – Priority Chat
          </span>
        </span>
      </a>
    </div>
    {/* ▲▲ END CHANGE ▲▲ */}
  

    {/* ▲▲ END BUTTONS ▲▲ */}
  </div>

  {/* Excellence Section - MOBILE RESPONSIVENESS ADDED */}
  <div className="bg-black/40 rounded-2xl p-6 sm:p-8 border h-auto lg:h-[478px] border-gray-700">
    <h2 className="text-2xl sm:text-3xl font-medium mb-6 sm:mb-8">
      {t.contact.excellenceTitle}
    </h2>
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center flex-shrink-0">
          <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <div className="text-left">
          <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">
            {t.excellence.expert.title}
          </h3>
          <p className="text-gray-300 text-sm sm:text-base">
            {t.excellence.expert.description}
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3 sm:gap-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center flex-shrink-0">
          <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <div className="text-left">
          <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">
            {t.excellence.support.title}
          </h3>
          <p className="text-gray-300 text-sm sm:text-base">
            {t.excellence.support.description}
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3 sm:gap-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center flex-shrink-0">
          <CheckSquare className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <div className="text-left">
          <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">
            {t.excellence.results.title}
          </h3>
          <p className="text-gray-300 text-sm sm:text-base">
            {t.excellence.results.description}
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

        </div>
      </section>

      {/* Contact Information - MOBILE RESPONSIVENESS ADDED */}
      <section className="px-4 sm:px-8 py-12 sm:py-16 max-w-7xl mx-auto bg-black rounded-3xl mb-12 sm:mb-16 mx-4 sm:mx-8 lg:mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16 text-white">{t.contactInfo.title}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Email */}
          <div
            onClick={() => window.open("https://mail.google.com/mail/?view=cm&fs=1&to=sales@bim.africa", "_blank")}
            className="cursor-pointer flex items-center space-x-3 sm:space-x-4 p-4 sm:p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-full flex items-center justify-center flex-shrink-0 border border-red-500/20">
              <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
            </div>
            <div className="min-h-[3rem] flex flex-col justify-center">
              <h3 className="text-white mb-1 sm:mb-2 text-sm sm:text-base font-medium">{t.contactInfo.email}</h3>
              <p className="text-gray-300 text-xs sm:text-sm">info@bim.africa</p>
              <p className="text-gray-300 text-xs sm:text-sm">sales@bim.africa</p>
            </div>
          </div>

          {/* Phone (click icon to toggle WhatsApp options) */}
          <div className="relative flex items-center space-x-3 sm:space-x-4 p-4 sm:p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            {/* Icon button — toggles WhatsApp options */}
           <button
  type="button"
  onClick={() => setShowWA((s) => !s)}
  aria-haspopup="true"
  aria-expanded={showWA}
  aria-label="Open WhatsApp numbers"
  className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-full flex items-center justify-center flex-shrink-0 border border-red-500/20 focus:outline-none focus:ring-2 focus:ring-red-500/40"
>
  {/* WhatsApp logo (inline SVG) */}
  <svg
  viewBox="0 0 32 32"
  className="w-8 h-8 text-red-700"   // 👈 size yahan control hoga
  aria-hidden="true"
>
  <path
    fill="currentColor"
    d="M16 3C9.37 3 4 8.37 4 15c0 2.14.55 4.15 1.52 5.92L4 29l8.3-1.44C14 28.45 15.96 29 18 29c6.63 0 12-5.37 12-12S24.63 3 18 3h-2z"
  />
  <path
    fill="#FFF"
    d="M24.27 19.43c-.33-.16-1.96-.96-2.27-1.07-.31-.12-.54-.16-.76.16-.23.33-.88 1.07-1.08 1.29-.2.23-.4.26-.74.09-.33-.16-1.4-.52-2.66-1.65-.98-.87-1.64-1.95-1.84-2.28-.19-.33-.02-.5.14-.67.15-.15.33-.4.49-.6.16-.2.21-.33.33-.55.11-.23.06-.41-.03-.57-.09-.16-.76-1.83-1.04-2.5-.28-.67-.55-.58-.76-.59-.2-.01-.41-.01-.63-.01-.22 0-.58.08-.89.41-.31.33-1.17 1.15-1.17 2.82 0 1.67 1.2 3.29 1.37 3.52.17.23 2.36 3.6 5.7 5.01.8.35 1.43.55 1.92.7.81.26 1.55.22 2.13.13.65-.1 1.96-.8 2.24-1.57.28-.77.28-1.43.19-1.57-.1-.14-.3-.22-.63-.38z"
  />
</svg>

</button>

{/* Static text (unchanged) */}
<div className="min-h-[3rem] flex flex-col justify-center">
  <h3 className="text-white mb-1 sm:mb-2 text-sm sm:text-base font-medium">
    {t.contactInfo.phone}
  </h3>
  <p className="text-gray-300 text-xs sm:text-sm">MU: +230 5451 4176</p>
  <p className="text-gray-300 text-xs sm:text-sm">LU: +352 661 784 276</p>
</div>

{/* WhatsApp chooser dropdown */}
{showWA && (
  <div className="absolute left-0 top-full mt-2 w-72 z-[70] rounded-xl border border-white/10 bg-black/80 backdrop-blur-md shadow-2xl overflow-hidden">
    <div className="px-4 py-3 text-white/90 text-sm font-medium border-b border-white/10">
      Open WhatsApp
    </div>

    {/* Mauritius */}
    <button
      type="button"
      onClick={() => {
        const url = "https://wa.me/23054514176"; // ✅ correct format
        const newWin = window.open(url, "_blank", "noopener,noreferrer");
        if (!newWin) window.location.href = url;
        setShowWA(false);
      }}
      className="w-full text-left px-4 py-3 text-white/90 hover:bg-white/10 transition flex items-center gap-2"
    >
      {/* Red WhatsApp icon */}
      <svg
        viewBox="0 0 32 32"
        className="w-8 h-8 text-red-700"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M16 3C9.37 3 4 8.37 4 15c0 2.14.55 4.15 1.52 5.92L4 29l8.3-1.44C14 28.45 15.96 29 18 29c6.63 0 12-5.37 12-12S24.63 3 18 3h-2z"
        />
        <path
          fill="white"
          d="M24.27 19.43c-.33-.16-1.96-.96-2.27-1.07-.31-.12-.54-.16-.76.16-.23.33-.88 1.07-1.08 1.29-.2.23-.4.26-.74.09-.33-.16-1.4-.52-2.66-1.65-.98-.87-1.64-1.95-1.84-2.28-.19-.33-.02-.5.14-.67.15-.15.33-.4.49-.6.16-.2.21-.33.33-.55.11-.23.06-.41-.03-.57-.09-.16-.76-1.83-1.04-2.5-.28-.67-.55-.58-.76-.59-.2-.01-.41-.01-.63-.01-.22 0-.58.08-.89.41-.31.33-1.17 1.15-1.17 2.82 0 1.67 1.2 3.29 1.37 3.52.17.23 2.36 3.6 5.7 5.01.8.35 1.43.55 1.92.7.81.26 1.55.22 2.13.13.65-.1 1.96-.8 2.24-1.57.28-.77.28-1.43.19-1.57-.1-.14-.3-.22-.63-.38z"
        />
      </svg>
      <span className="font-medium">MU (Mauritius)</span>
      <span className="ml-auto text-gray-300 text-sm">+230 5451 4176</span>
    </button>

    {/* Luxembourg */}
    <button
      type="button"
      onClick={() => {
        const url = "https://wa.me/352661784276"; // ✅ correct format
        const newWin = window.open(url, "_blank", "noopener,noreferrer");
        if (!newWin) window.location.href = url;
        setShowWA(false);
      }}
      className="w-full text-left px-4 py-3 text-white/90 hover:bg-white/10 transition flex items-center gap-2"
    >
      {/* Red WhatsApp icon */}
      <svg
        viewBox="0 0 32 32"
        className="w-8 h-8 text-red-700"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M16 3C9.37 3 4 8.37 4 15c0 2.14.55 4.15 1.52 5.92L4 29l8.3-1.44C14 28.45 15.96 29 18 29c6.63 0 12-5.37 12-12S24.63 3 18 3h-2z"
        />
        <path
          fill="white"
          d="M24.27 19.43c-.33-.16-1.96-.96-2.27-1.07-.31-.12-.54-.16-.76.16-.23.33-.88 1.07-1.08 1.29-.2.23-.4.26-.74.09-.33-.16-1.4-.52-2.66-1.65-.98-.87-1.64-1.95-1.84-2.28-.19-.33-.02-.5.14-.67.15-.15.33-.4.49-.6.16-.2.21-.33.33-.55.11-.23.06-.41-.03-.57-.09-.16-.76-1.83-1.04-2.5-.28-.67-.55-.58-.76-.59-.2-.01-.41-.01-.63-.01-.22 0-.58.08-.89.41-.31.33-1.17 1.15-1.17 2.82 0 1.67 1.2 3.29 1.37 3.52.17.23 2.36 3.6 5.7 5.01.8.35 1.43.55 1.92.7.81.26 1.55.22 2.13.13.65-.1 1.96-.8 2.24-1.57.28-.77.28-1.43.19-1.57-.1-.14-.3-.22-.63-.38z"
        />
      </svg>
      <span className="font-medium">LU (Luxembourg)</span>
      <span className="ml-auto text-gray-300 text-sm">+352 661 784 276</span>
    </button>

    {/* Close hint row */}
    <div className="px-4 py-2 text-right">
      <button
        type="button"
        onClick={() => setShowWA(false)}
        className="text-xs text-gray-300 hover:text-white transition"
      >
        Close
      </button>
    </div>
  </div>
)}


          </div>

          {/* Offices */}
          <div className="flex items-center space-x-3 sm:space-x-4 p-4 sm:p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-full flex items-center justify-center flex-shrink-0 border border-red-500/20">
              <span className="text-red-400 text-lg sm:text-xl">🏢</span>
            </div>
            <div className="min-h-[3rem] flex flex-col justify-center">
              <h3 className="text-white mb-1 sm:mb-2 text-sm sm:text-base font-medium">{t.contactInfo.offices}</h3>
              <p className="text-gray-300 text-xs sm:text-sm">{t.contactInfo.officesLocation}</p>
            </div>
          </div>

          {/* Business Hours */}
          <div className="flex items-center space-x-3 sm:space-x-4 p-4 sm:p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-full flex items-center justify-center flex-shrink-0 border border-red-500/20">
              <span className="text-red-400 text-lg sm:text-xl">🕒</span>
            </div>
            <div className="min-h-[3rem] flex flex-col justify-center">
              <h3 className="text-white mb-1 sm:mb-2 text-sm sm:text-base font-medium">{t.contactInfo.businessHours}</h3>
              <p className="text-gray-300 text-xs sm:text-sm whitespace-pre-line">
                {t.contactInfo.businessHoursTime}
              </p>
            </div>
          </div>
        </div>

        {/* Outside-click overlay (only while chooser is open). Keeps layout untouched. */}
        {showWA && (
          <div
            className="fixed inset-0 z-[60]"
            onClick={() => setShowWA(false)}
            aria-hidden="true"
          />
        )}
      </section>

      {/* Footer - MOBILE RESPONSIVENESS (old design applied) */}
      <footer className="bg-black py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Mobile Layout */}
          <div className="block sm:hidden">
            {/* Quick Links & Support */}
            <div className="grid grid-cols-2 gap-8 mb-8 text-center">
              <div>
                <h3 className="text-[#ff1f00] text-sm font-bold uppercase mb-4">
                  {t.footer.quickLinks}
                </h3>
                <div className="space-y-2">
                  <a href="#" className="block text-white text-sm">{t.nav.home}</a>
                  <a href="#" className="block text-white text-sm">{t.nav.about}</a>
                  <a href="/" className="block text-white text-sm">{t.nav.services}</a>
                  <a href="#" className="block text-white text-sm">{t.nav.blog}</a>
                </div>
              </div>

              <div>
                <h3 className="text-[#ff1f00] text-sm font-bold uppercase mb-4">
                  {t.footer.support}
                </h3>
                <div className="space-y-2">
                  <a href="/contactus" className="block text-white text-sm">{t.nav.contact}</a>
                  <a href="#" className="block text-white text-sm">{t.footer.privacyPolicy}</a>
                  <a href="#" className="block text-white text-sm">{t.footer.termsConditions}</a>
                </div>
              </div>
            </div>

            {/* Referral + Socials */}
            <div className="mb-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1 pr-4">
                  <h3 className="text-[#ff1f00] text-sm font-bold uppercase mb-3">
                    {t.footer.referralProgram}
                  </h3>
                  <p className="text-white text-xs leading-relaxed">
                    {t.footer.referralText}
                  </p>
                </div>

                <div className="flex flex-col items-end space-y-4">
                 <a
  href="https://wa.me/352661784276?text=Hi%2C%20I%20want%20to%20join%20your%20referal%20program"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Join referral program on WhatsApp (Luxembourg)"
>
  <button className="bg-[#333333] border border-transparent hover:border-[#ff1f00] text-white px-6 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap">
    {t.buttons.joinNow}
  </button>
</a>


                  <div className="flex space-x-3">
                    <a href="https://www.instagram.com/bimafrica" target="_blank" rel="noopener noreferrer">
                      <div className="w-10 h-10 bg-[#ff1f00] rounded-full flex items-center justify-center hover:bg-[#e61c00] transition">
                        <Instagram size={20} className="text-white" />
                      </div>
                    </a>
                    <a href="https://www.facebook.com/share/17Kr1c4mkp/" target="_blank" rel="noopener noreferrer">
                      <div className="w-10 h-10 bg-[#ff1f00] rounded-full flex items-center justify-center hover:bg-[#e61c00] transition">
                        <Facebook size={20} className="text-white" />
                      </div>
                    </a>
                    <a href="https://www.linkedin.com/company/bimafrica/" target="_blank" rel="noopener noreferrer">
                      <div className="w-10 h-10 bg-[#ff1f00] rounded-full flex items-center justify-center">
                        <Linked size={20} className="text-white" />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Logo + Info */}
            <div className="text-center mb-8">
              <img src={logo2.src} className="w-48 mx-auto mb-4" alt="BIM Logo" />
              <p className="text-white text-sm mb-1">{t.footer.copyright}</p>
              <p className="text-white text-sm">{t.footer.location}</p>
            </div>

            {/* Bottom Links */}
            <div className="text-center text-white text-xs border-t border-gray-800 pt-6">
              <a href="#" className="hover:text-[#ff1f00]">{t.footer.privacyPolicy}</a>
              <span className="mx-2">|</span>
              <a href="#" className="hover:text-[#ff1f00]">{t.footer.termsUse}</a>
              
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
            <div className="text-left">
              <div className="text-[#ff1f00] font-black text-3xl sm:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                <img src={logo2.src} className="w-48 sm:w-64 lg:w-80 xl:w-[500px]" alt="" />
              </div>
              <p className="text-white text-xs sm:text-sm mt-3 sm:mt-4">{t.footer.copyright}</p>
              <p className="text-white text-xs sm:text-sm">{t.footer.location}</p>
            </div>

            <div className="text-left">
              <h3 className="text-[#ff1f00] text-sm sm:text-base lg:text-lg uppercase">{t.footer.quickLinks}</h3>
              <div className="space-y-1 sm:space-y-2 lg:space-y-3 mt-3 sm:mt-4">
                <a href="#" className="block text-white hover:text-white text-xs sm:text-sm lg:text-base">
                  {t.nav.home}
                </a>
                <a href="#" className="block text-white hover:text-white text-xs sm:text-sm lg:text-base">
                  {t.nav.about}
                </a>
                <a href="/" className="block text-white hover:text-white text-xs sm:text-sm lg:text-base">
                  {t.nav.services}
                </a>
                <a href="#" className="block text-white hover:text-white text-xs sm:text-sm lg:text-base">
                  {t.nav.blog}
                </a>
              </div>
            </div>

            <div className="text-left">
              <h3 className="text-[#ff1f00] text-sm sm:text-base lg:text-lg uppercase">{t.footer.support}</h3>
              <div className="space-y-1 sm:space-y-2 lg:space-y-3 mt-3 sm:mt-4">
                <a href="/contactus" className="block text-white hover:text-white text-xs sm:text-sm lg:text-base">
                  {t.nav.contact}
                </a>
                <a href="#" className="block text-white hover:text-white text-xs sm:text-sm lg:text-base">
                  {t.footer.privacyPolicy}
                </a>
                <a href="#" className="block text-white hover:text-white text-xs sm:text-sm lg:text-base">
                  {t.footer.termsConditions}
                </a>
              </div>
            </div>

            <div className="text-left">
              <h3 className="text-[#ff1f00] text-sm sm:text-base lg:text-lg uppercase">{t.footer.referralProgram}</h3>
              <p className="text-white text-xs sm:text-sm mt-3 sm:mt-4">
                {t.footer.referralText}
              </p>

              {/* Button and Social Icons on Same Line */}
              <div className="flex items-center gap-3 sm:gap-4 mt-4 sm:mt-6">
                <a
  href="https://wa.me/352661784276?text=Hi%2C%20I%20want%20to%20join%20your%20referal%20program"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Join referral program on WhatsApp (Luxembourg)"
>
  <button className="bg-[#333333] border border-transparent hover:border-[#ff1f00] text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 rounded-full font-medium whitespace-nowrap text-xs sm:text-sm lg:text-base">
    {t.buttons.joinNow}
  </button>
</a>


                <div className="flex space-x-1 sm:space-x-2">
                  <a href="https://www.instagram.com/bimafrica?igsh=dnpmYXQzNTV2eHE4" target="_blank" rel="noopener noreferrer">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-[#ff1f00] rounded-full flex items-center justify-center hover:bg-[#e61c00] transition">
                      <Instagram size={12} className="text-white sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                    </div>
                  </a>
                  <a href="https://www.facebook.com/share/17Kr1c4mkp/" target="_blank" rel="noopener noreferrer">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-[#ff1f00] rounded-full flex items-center justify-center hover:bg-[#e61c00] transition">
                      <Facebook size={12} className="text-white sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                    </div>
                  </a>
                  <a href="https://www.linkedin.com/company/bimafrica/" target="_blank" rel="noopener noreferrer">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-[#ff1f00] rounded-full flex items-center justify-center">
                      <LinkedinIcon size={12} className="text-white sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden sm:block border-t border-gray-800 mt-6 sm:mt-8 lg:mt-12 pt-4 sm:pt-6 lg:pt-8 text-center text-white text-xs sm:text-sm">
            <a href="#" className="hover:text-white">
              {t.footer.privacyPolicy}
            </a>{" "}
            |{" "}
            <a href="#" className="hover:text-white">
              {t.footer.termsUse}
            </a>{" "}
          
          </div>
        </div>
      </footer>
    </div>
  );
}
