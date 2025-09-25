'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Send,
  Zap,
  Users,
  CheckSquare,
  Mail,
  Phone,
  Instagram,
  Facebook,
  Linkedin as LinkedinIcon,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import logoBg from '../../Assests/srv.svg';
import logo2 from '../../Assests/newlogo.png';
import webStrategy from '../../Assests/WebsiteStrategy.png';
import cyb from '../../Assests/cyb.png';
import digitalMarketing from '../../Assests/DigitalSupport.png';
import mobileBg from '../../Assests/new.jpeg';
import selected from '../../Assests/selected.png';
import nonselected from '../../Assests/nonselected.png';
import header from '../../Assests/HEADER.png';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [language, setLanguage] = useState<'EN' | 'FR'>('EN');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showQuote, setShowQuote] = useState(false);
  const [showWA, setShowWA] = useState(false);

  const t = {
    EN: {
      nav: { home: 'Home', about: 'About Us', services: 'Services', blog: 'Blog', contact: 'Contact Us' },
      buttons: { instantQuotation: 'Instant Quotation', callNow: 'Call Now – Emergency Line', sendMessage: 'Send Message', joinNow: 'JOIN NOW' },
      hero: {
        title: "Let's Build Something",
        titleHighlight: 'Exceptional',
        subtitle:
          "At BIM Africa, we partner with established businesses to elevate their digital presence through:",
        footerText:
          'With teams in Mauritius and Luxembourg, we deliver seamless solutions with a global perspective.',
      },
      services: {
        website: { title: 'Premium Website Development', description: "Bespoke websites that reflect your brand's authority and ambition." },
        cyber: { title: 'Cybersecurity & Threat Management', description: 'Enterprise-grade protection to safeguard your reputation and assets.' },
        digital: { title: 'Digital Support Outsourcing', description: 'Flexible, high-level support designed to scale with your operations.' },
      },
      contact: {
        formTitle: 'Send Us a Message',
        formSubtitle: "Fill out the form below and we'll get back to you within 24 hours",
        emergencyTitle: 'Need Immediate Help?',
        emergencySubtitle:
          'For critical issues like downtime, security breaches, or payment errors, reach us instantly.',
        excellenceTitle: 'Excellence You Can Rely On',
        fields: {
          name: 'Name *',
          namePlaceholder: 'Your full name',
          email: 'Email *',
          emailPlaceholder: 'your.email@example.com',
          phone: 'Phone',
          phonePlaceholder: 'Enter your Number',
          message: 'How can we help you?',
          messagePlaceholder: 'Tell us about your project, questions, or how we can help...',
        },
      },
      excellence: {
        expert: { title: 'Expert Team', description: 'International professionals with 10+ years of combined experience' },
        support: { title: '24/7 Support', description: 'Always available when you need us most' },
        results: { title: 'Proven Results', description: 'Trusted by businesses in Mauritius & Luxembourg & beyond' },
      },
      contactInfo: {
        title: 'Contact Information',
        email: 'Email',
        phone: 'Phone',
        offices: 'Offices',
        officesLocation: 'Mauritius & Luxembourg',
        businessHours: 'Business Hours',
        businessHoursTime: 'Weekdays: 9 AM – 5 PM  Weekends: Closed',
      },
      footer: {
        quickLinks: 'QUICK LINKS',
        support: 'SUPPORT',
        referralProgram: 'REFERRAL PROGRAM',
        referralText:
          'Know someone who needs elite digital solutions? Refer them — and earn through our tiered incentive program, Simple to join. Profitable to share.',
        copyright: 'Copyright © 2025 BIM. All Rights Reserved.',
        location: 'Mauritius & Luxembourg',
        privacyPolicy: 'Privacy Policy',
        termsConditions: 'Terms of Service',
        termsUse: 'Terms of Use',
      },
    },
    FR: {
      nav: { home: 'Accueil', about: 'À Propos', services: 'Services', blog: 'Blog', contact: 'Contactez-nous' },
      buttons: { instantQuotation: 'Devis Instantané', callNow: "Appelez Maintenant – Ligne d'Urgence", sendMessage: 'Envoyer le Message', joinNow: 'REJOINDRE' },
      hero: {
        title: 'Construisons Quelque Chose',
        titleHighlight: "d'Exceptionnel",
        subtitle:
          'Chez BIM Africa, nous nous associons avec des entreprises établies pour élever leur présence numérique grâce à :',
        footerText:
          'Avec des équipes à Maurice et au Luxembourg, nous offrons des solutions transparentes avec une perspective mondiale.',
      },
      services: {
        website: { title: 'Développement de Sites Web Premium', description: "Sites web sur mesure qui reflètent l'autorité et l'ambition de votre marque." },
        cyber: { title: 'Cybersécurité et Gestion des Menaces', description: 'Protection de niveau entreprise pour sauvegarder votre réputation et vos actifs.' },
        digital: { title: 'Externalisation du Support Numérique', description: 'Support flexible et de haut niveau conçu pour évoluer avec vos opérations.' },
      },
      contact: {
        formTitle: 'Envoyez-nous un Message',
        formSubtitle: 'Remplissez le formulaire ci-dessous et nous vous répondrons dans les 24 heures',
        emergencyTitle: "Besoin d'Assistance Immédiate ?",
        emergencySubtitle:
          'Pour les questions urgentes, appelez-nous directement ou planifiez une consultation gratuite.',
        excellenceTitle: 'Excellence sur Laquelle Vous Pouvez Compter',
        fields: {
          name: 'Nom *',
          namePlaceholder: 'Votre nom complet',
          email: 'E-mail *',
          emailPlaceholder: 'votre.email@exemple.com',
          phone: 'Téléphone',
          phonePlaceholder: 'Enter your Number',
          message: 'Comment pouvons-nous vous aider ?',
          messagePlaceholder: 'Parlez-nous de votre projet, vos questions, ou comment nous pouvons vous aider...',
        },
      },
      excellence: {
        expert: { title: "Équipe d'Experts", description: "Professionnels internationaux avec plus de 10 ans d'expérience combinée" },
        support: { title: 'Support 24/7', description: 'Toujours disponible quand vous en avez le plus besoin' },
        results: { title: 'Résultats Prouvés', description: 'Approuvé par des entreprises à Maurice, au Luxembourg et au-delà' },
      },
      contactInfo: {
        title: 'Informations de Contact',
        email: 'E-mail',
        phone: 'Téléphone',
        offices: 'Bureaux',
        officesLocation: 'Maurice et Luxembourg',
        businessHours: "Heures d'Ouverture",
        businessHoursTime: 'Lundi – Vendredi : 9h00 – 18h00\nSamedi – Dimanche : Fermé',
      },
      footer: {
        quickLinks: 'LIENS RAPIDES',
        support: 'SUPPORT',
        referralProgram: 'PROGRAMME DE PARRAINAGE',
        referralText:
          "Vous connaissez quelqu'un qui a besoin de solutions numériques d'élite ? Recommandez-le — et gagnez grâce à notre programme d'incitation à plusieurs niveaux. Simple à rejoindre. Rentable à partager.",
        copyright: 'Copyright © 2025 BIM. Tous Droits Réservés.',
        location: 'Maurice, Luxembourg',
        privacyPolicy: 'Politique de Confidentialité',
        termsConditions: 'Termes et Conditions',
        termsUse: 'Conditions d’Utilisation',
      },
    },
  }[language];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 15);
      setFormData(p => ({ ...p, phone: digitsOnly }));
    } else {
      setFormData(p => ({ ...p, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setShowQuote(false);

    try {
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
      if (!emailOk) {
        alert(language === 'EN' ? 'Please enter a valid email address.' : 'Veuillez saisir une adresse e-mail valide.');
        return;
      }
      const phoneLen = formData.phone.replace(/\D/g, '').length;
      if (phoneLen && (phoneLen < 9 || phoneLen > 15)) {
        alert(language === 'EN' ? 'Phone number must be 9–15 digits.' : 'Le numéro de téléphone doit comporter 9–15 chiffres.');
        return;
      }

      const fd = new FormData();
      fd.append('name', formData.name);
      fd.append('email', formData.email);
      fd.append('phone', formData.phone);
      fd.append('message', formData.message);
      fd.append('_cc', 'info@bim.africa');
      fd.append('_captcha', 'false');
      fd.append('_template', 'table');
      fd.append('_subject', 'New Contact Us From');

      await fetch('https://formsubmit.co/info@bim.africa', { method: 'POST', body: fd });

      setShowQuote(true);
      setTimeout(() => setShowQuote(false), 5000);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // framer variants
  const backdropVariants = { hidden: { opacity: 0 }, visible: { opacity: 0.55 }, exit: { opacity: 0 } };
  const panelVariants = {
    hidden: { opacity: 0, y: -30, rotateX: 14, transformOrigin: 'top center', scale: 0.995 },
    visible: { opacity: 1, y: 0, rotateX: 0, scale: 1, transition: { duration: 0.3, ease: [0.22, 0.8, 0.2, 1] } },
    exit: { opacity: 0, y: -28, rotateX: 12, scale: 0.995, transition: { duration: 0.22, ease: 'easeInOut' } },
  };
  const listContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.05, delayChildren: 0.06 } } };
  const listItem = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.22, ease: 'easeOut' } } };

  const navigationItems = [
    { name: t.nav.home, href: '/' },
    { name: t.nav.about, href: '#' },
    { name: t.nav.services, href: '/' },
    { name: t.nav.blog, href: '#' },
    { name: t.nav.contact, href: '/contactus' },
  ];

  return (
    <div
      className="min-h-screen text-white"
      style={{
        backgroundImage: `url(${logoBg.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* MOBILE OVERLAY MENU */}
      <AnimatePresence>
        {mobileOpen && (
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
                style={{ backgroundImage: `url(${mobileBg.src})`, minHeight: '100svh', height: '100vh' }}
              >
                <div className="flex flex-col min-h-full pt-1 pb-6 relative">
                  <div className="flex items-center justify-between pl-4 pr-4">
                    <Image src={logo2} alt="Logo" className="object-contain" width={80} height={40} priority />
                    <motion.button
                      onClick={() => setMobileOpen(false)}
                      className="text-white hover:text-red-500 p-2"
                      aria-label="Close menu"
                      whileTap={{ scale: 0.92, rotate: 6 }}
                    >
                      <X size={32} />
                    </motion.button>
                  </div>

                  <motion.nav className="flex-1 flex flex-col justify-start px-8 gap-y-3 mt-6 overflow-auto" variants={listContainer} initial="hidden" animate="visible">
                    {navigationItems.map((item, idx) => (
                      <motion.div key={idx} className="flex items-center w-full max-w-full py-3" variants={listItem}>
                        <Link href={item.href} onClick={() => setMobileOpen(false)} className="flex-1 text-left text-lg font-medium text-white hover:text-red-300">
                          {item.name}
                        </Link>

                        <div className="w-6 h-6 ml-4 flex-shrink-0 relative">
                          <Image src={item.href === '/contactus' ? selected : nonselected} alt="" fill className="object-contain" />
                        </div>
                      </motion.div>
                    ))}
                  </motion.nav>

                  <div className="fixed left-0 right-0 bottom-8 px-6" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 1rem) + 0.75rem)' }}>
                    <a href="https://quotation.bim.africa/" target="_blank" rel="noopener noreferrer" className="block w-full">
                      <motion.button whileTap={{ scale: 0.98 }} className="w-full bg-[#ff1f00] hover:bg-red-600 text-white py-4 rounded-full text-lg font-medium">
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

      {/* HEADER */}
      <header className="bg-black/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between">
          <Link href="/">
            <Image src={logo2} alt="BIM" width={110} height={44} priority className="w-20 sm:w-24 md:w-28 lg:w-[110px] h-auto" />
          </Link>

          <nav className="hidden md:flex items-center space-x-6 lg:space-x-16 relative">
            <Link href="/" className="wave-link relative font-medium text-white text-base">
              {t.nav.home}
              <svg className="link__graphic link__graphic--slide" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">
                <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46 c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0" fill="none" stroke="#FFF" strokeWidth="2" />
              </svg>
            </Link>
            <a href="#" className="wave-link relative font-medium text-white text-base">
              {t.nav.about}
              <svg className="link__graphic link__graphic--slide" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">
                <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46 c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0" fill="none" stroke="#FFF" strokeWidth="2" />
              </svg>
            </a>
            <Link href="/" className="wave-link relative font-medium text-white text-base">
              {t.nav.services}
              <svg className="link__graphic link__graphic--slide" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">
                <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46 c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0" fill="none" stroke="#FFF" strokeWidth="2" />
              </svg>
            </Link>
            <a href="#" className="wave-link relative font-medium text-white text-base">
              {t.nav.blog}
              <svg className="link__graphic link__graphic--slide" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">
                <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46 c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0" fill="none" stroke="#FFF" strokeWidth="2" />
              </svg>
            </a>
            <Link href="/contactus" className="wave-link relative font-medium text-red-500 text-base">
              {t.nav.contact}
              <svg className="link__graphic link__graphic--slide" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">
                <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46 c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0" fill="none" stroke="#FF1F00" strokeWidth="2" />
              </svg>
            </Link>
          </nav>

          <div className="flex items-center space-x-2 md:space-x-4">
            <a href="https://quotation.bim.africa/" target="_blank" rel="noopener noreferrer" className="inline-block">
              <button className="text-red-500 border border-red-500 px-4 py-2 sm:px-6 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap hover:bg-red-500 hover:text-white">
                {t.buttons.instantQuotation}
              </button>
            </a>

            <button onClick={() => setLanguage(language === 'EN' ? 'FR' : 'EN')} className="bg-white rounded-full p-1 sm:p-2 flex items-center space-x-1">
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-red-500 flex items-center justify-center">
                <span className="text-white text-xs font-bold">+</span>
              </div>
              <span className="text-black text-xs sm:text-sm font-medium px-1 sm:px-2">{language === 'EN' ? 'FR' : 'ENG'}</span>
            </button>

            <button onClick={() => setMobileOpen(o => !o)} className="md:hidden text-white" aria-label="Toggle menu">
              {mobileOpen ? (
                <X size={28} />
              ) : (
                <Image src={header} alt="menu" className="w-10 h-auto" priority />
              )}
            </button>
          </div>
        </div>

        <style>{`
          a.wave-link{position:relative;padding:6px 0;background:transparent;border:0;white-space:nowrap;overflow:hidden}
          .link__graphic{position:absolute;top:0;left:0;pointer-events:none;fill:none;stroke-width:1px}
          .link__graphic--slide{top:-3px;stroke-width:2px;transition:transform .7s cubic-bezier(0,.25,.5,1)}
          a.wave-link:hover .link__graphic--slide{transform:translate3d(-66.6%,0,0)}
        `}</style>
      </header>

      {/* HERO */}
      <section className="px-4 sm:px-8 py-10 sm:py-16 md:py-20 max-w-7xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium mb-6 sm:mb-8 leading-tight">
          {t.hero.title} <span className="text-red-600">{t.hero.titleHighlight}</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl mb-12 sm:mb-16 text-gray-300 max-w-4xl mx-auto px-4">{t.hero.subtitle}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 px-4">
          <div className="text-center p-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 relative">
              <Image src={webStrategy} alt="Website strategy" fill className="object-contain" />
            </div>
            <h3 className="text-xl sm:text-2xl font-medium mb-3 sm:mb-4">{t.services.website.title}</h3>
            <p className="text-white leading-relaxed text-sm sm:text-base">{t.services.website.description}</p>
          </div>

          <div className="text-center p-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 relative">
              <Image src={cyb} alt="Cybersecurity" fill className="object-contain" />
            </div>
            <h3 className="text-xl sm:text-2xl font-medium mb-3 sm:mb-4">{t.services.cyber.title}</h3>
            <p className="text-white leading-relaxed text-sm sm:text-base">{t.services.cyber.description}</p>
          </div>

          <div className="text-center p-4 sm:col-span-2 md:col-span-1">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 relative">
              <Image src={digitalMarketing} alt="Digital outsourcing" fill className="object-contain" />
            </div>
            <h3 className="text-xl sm:text-2xl font-medium mb-3 sm:mb-4">{t.services.digital.title}</h3>
            <p className="text-white leading-relaxed text-sm sm:text-base">{t.services.digital.description}</p>
          </div>
        </div>

        <p className="text-base sm:text-lg md:text-xl text-white max-w-4xl mx-auto px-4">{t.hero.footerText}</p>
      </section>

      {/* CONTACT + EMERGENCY */}
      <section className="px-4 sm:px-8 py-12 sm:py-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <div className="bg-gradient-to-br from-red-900/30 to-red-800/20 rounded-2xl p-6 sm:p-8 border border-red-600/30">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-red-900 to-red-700 rounded-full flex items-center justify-center mb-4 sm:mb-6 mx-auto">
              <Send className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-medium mb-3 sm:mb-4">{t.contact.formTitle}</h2>
            <p className="text-white mb-6 sm:mb-8 text-sm sm:text-base">{t.contact.formSubtitle}</p>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">{t.contact.fields.name}</label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={t.contact.fields.namePlaceholder}
                  className="w-full px-4 py-3 bg-black/30 border border-gray-600 rounded-lg focus:outline-none focus:border-red-500 placeholder-gray-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">{t.contact.fields.email}</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={t.contact.fields.emailPlaceholder}
                  className="w-full px-4 py-3 bg-black/30 border border-gray-600 rounded-lg focus:outline-none focus:border-red-500 placeholder-gray-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">{t.contact.fields.phone}</label>
                <input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder={t.contact.fields.phonePlaceholder}
                  className="w-full px-4 py-3 bg-black/30 border border-gray-600 rounded-lg focus:outline-none focus:border-red-500 placeholder-gray-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">{t.contact.fields.message}</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={t.contact.fields.messagePlaceholder}
                  className="w-full px-4 py-3 bg-black/30 border border-gray-600 rounded-lg focus:outline-none focus:border-red-500 placeholder-gray-500 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`group relative w-full overflow-hidden text-white font-semibold px-6 py-3 rounded-lg transition-transform transform hover:scale-105 active:scale-95 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                style={{ background: 'linear-gradient(90deg,#b91c1c,#ef4444)' }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10">
                    <Send className="w-4 h-4" />
                  </span>
                  <span>{isSubmitting ? (language === 'EN' ? 'Sending...' : 'Envoi...') : t.buttons.sendMessage}</span>
                </span>
              </button>

              {showQuote && (
                <p className="text-green-400 text-sm mt-2">
                  {language === 'EN'
                    ? "Thanks! Your message has been sent — we'll get back to you shortly."
                    : 'Merci ! Votre message a été envoyé — nous vous répondrons très bientôt.'}
                </p>
              )}
            </form>
          </div>

          {/* EMERGENCY */}
          <div className="space-y-6 sm:space-y-8 text-center">
            <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-6 sm:p-8">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-800/50 rounded-full flex items-center justify-center mb-4 sm:mb-6 mx-auto">
                <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-medium mb-3 sm:mb-4">{t.contact.emergencyTitle}</h2>
              <p className="text-white mb-6 sm:mb-8 text-sm sm:text-base">{t.contact.emergencySubtitle}</p>

              <div className="flex flex-col gap-4">
                <button
                  className="w-full bg-white text-red-600 font-semibold px-6 py-3 rounded-lg hover:shadow-lg transition"
                  onClick={() => (typeof window !== 'undefined' ? (window.location.href = 'tel:+23054514176') : null)}
                >
                  <span className="inline-flex items-center gap-3">
                    <Phone className="w-5 h-5" />
                    {t.buttons.callNow}
                  </span>
                </button>

                <a
                  href="https://wa.me/352661784276"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white text-red-600 font-semibold px-6 py-3 rounded-lg hover:shadow-lg transition inline-flex items-center justify-center gap-3"
                  title="WhatsApp Us – Priority Chat"
                >
                  <svg viewBox="0 0 32 32" className="w-5 h-5" aria-hidden="true">
                    <path fill="currentColor" d="M16 3C9.37 3 4 8.37 4 15c0 2.14.55 4.15 1.52 5.92L4 29l8.3-1.44C14 28.45 15.96 29 18 29c6.63 0 12-5.37 12-12S24.63 3 18 3h-2z" />
                    <path fill="#FFF" d="M24.27 19.43c-.33-.16-1.96-.96-2.27-1.07-.31-.12-.54-.16-.76.16-.23.33-.88 1.07-1.08 1.29-.2.23-.4.26-.74.09-.33-.16-1.4-.52-2.66-1.65-.98-.87-1.64-1.95-1.84-2.28-.19-.33-.02-.5.14-.67.15-.15.33-.4.49-.6.16-.2.21-.33.33-.55.11-.23.06-.41-.03-.57-.09-.16-.76-1.83-1.04-2.5-.28-.67-.55-.58-.76-.59-.2-.01-.41-.01-.63-.01-.22 0-.58.08-.89.41-.31.33-1.17 1.15-1.17 2.82 0 1.67 1.2 3.29 1.37 3.52.17.23 2.36 3.6 5.7 5.01.8.35 1.43.55 1.92.7.81.26 1.55.22 2.13.13.65-.1 1.96-.8 2.24-1.57.28-.77.28-1.43.19-1.57-.1-.14-.3-.22-.63-.38z" />
                  </svg>
                  WhatsApp Us – Priority Chat
                </a>
              </div>
            </div>

            {/* Excellence */}
            <div className="bg-black/40 rounded-2xl p-6 sm:p-8 border h-auto lg:h-[478px] border-gray-700">
              <h2 className="text-2xl sm:text-3xl font-medium mb-6 sm:mb-8">{t.contact.excellenceTitle}</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4 text-left">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-1">{t.excellence.expert.title}</h3>
                    <p className="text-gray-300 text-sm sm:text-base">{t.excellence.expert.description}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 text-left">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-1">{t.excellence.support.title}</h3>
                    <p className="text-gray-300 text-sm sm:text-base">{t.excellence.support.description}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 text-left">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-1">{t.excellence.results.title}</h3>
                    <p className="text-gray-300 text-sm sm:text-base">{t.excellence.results.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT INFO CARDS */}
      <section className="px-4 sm:px-8 py-12 sm:py-16 max-w-7xl mx-auto bg-black rounded-3xl mb-12 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16 text-white">{t.contactInfo.title}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Email */}
          <button
            onClick={() => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=sales@bim.africa', '_blank')}
            className="text-left cursor-pointer flex items-center gap-4 p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10 backdrop-blur-sm shadow-lg hover:shadow-xl transition"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-full flex items-center justify-center border border-red-500/20">
              <Mail className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <h3 className="text-white text-base font-medium mb-1">{t.contactInfo.email}</h3>
              <p className="text-gray-300 text-sm">info@bim.africa</p>
              <p className="text-gray-300 text-sm">sales@bim.africa</p>
            </div>
          </button>

          {/* Phone with WhatsApp chooser */}
          <div className="relative flex items-center gap-4 p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10 backdrop-blur-sm shadow-lg hover:shadow-xl transition">
            <button
              type="button"
              onClick={() => setShowWA(s => !s)}
              aria-haspopup="true"
              aria-expanded={showWA}
              aria-label="Open WhatsApp numbers"
              className="w-12 h-12 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-full flex items-center justify-center border border-red-500/20"
            >
              <svg viewBox="0 0 32 32" className="w-7 h-7 text-red-700" aria-hidden="true">
                <path fill="currentColor" d="M16 3C9.37 3 4 8.37 4 15c0 2.14.55 4.15 1.52 5.92L4 29l8.3-1.44C14 28.45 15.96 29 18 29c6.63 0 12-5.37 12-12S24.63 3 18 3h-2z" />
                <path fill="#FFF" d="M24.27 19.43c-.33-.16-1.96-.96-2.27-1.07-.31-.12-.54-.16-.76.16-.23.33-.88 1.07-1.08 1.29-.2.23-.4.26-.74.09-.33-.16-1.4-.52-2.66-1.65-.98-.87-1.64-1.95-1.84-2.28-.19-.33-.02-.5.14-.67.15-.15.33-.4.49-.6.16-.2.21-.33.33-.55.11-.23.06-.41-.03-.57-.09-.16-.76-1.83-1.04-2.5-.28-.67-.55-.58-.76-.59-.2-.01-.41-.01-.63-.01-.22 0-.58.08-.89.41-.31.33-1.17 1.15-1.17 2.82 0 1.67 1.2 3.29 1.37 3.52.17.23 2.36 3.6 5.7 5.01.8.35 1.43.55 1.92.7.81.26 1.55.22 2.13.13.65-.1 1.96-.8 2.24-1.57.28-.77.28-1.43.19-1.57-.1-.14-.3-.22-.63-.38z" />
              </svg>
            </button>
            <div>
              <h3 className="text-white text-base font-medium mb-1">{t.contactInfo.phone}</h3>
              <p className="text-gray-300 text-sm">MU: +230 5451 4176</p>
              <p className="text-gray-300 text-sm">LU: +352 661 784 276</p>
            </div>

            {showWA && (
              <div className="absolute left-0 top-full mt-2 w-72 z-[70] rounded-xl border border-white/10 bg-black/80 backdrop-blur-md shadow-2xl overflow-hidden">
                <div className="px-4 py-3 text-white/90 text-sm font-medium border-b border-white/10">Open WhatsApp</div>

                <button
                  type="button"
                  onClick={() => {
                    const url = 'https://wa.me/23054514176';
                    const newWin = window.open(url, '_blank', 'noopener,noreferrer');
                    if (!newWin) window.location.href = url;
                    setShowWA(false);
                  }}
                  className="w-full text-left px-4 py-3 text-white/90 hover:bg-white/10 transition flex items-center gap-2"
                >
                  <svg viewBox="0 0 32 32" className="w-6 h-6 text-red-700" aria-hidden="true">
                    <path fill="currentColor" d="M16 3C9.37 3 4 8.37 4 15c0 2.14.55 4.15 1.52 5.92L4 29l8.3-1.44C14 28.45 15.96 29 18 29c6.63 0 12-5.37 12-12S24.63 3 18 3h-2z" />
                    <path fill="white" d="M24.27 19.43c-.33-.16-1.96-.96-2.27-1.07-.31-.12-.54-.16-.76.16-.23.33-.88 1.07-1.08 1.29-.2.23-.4.26-.74.09-.33-.16-1.4-.52-2.66-1.65-.98-.87-1.64-1.95-1.84-2.28-.19-.33-.02-.5.14-.67.15-.15.33-.4.49-.6.16-.2.21-.33.33-.55.11-.23.06-.41-.03-.57-.09-.16-.76-1.83-1.04-2.5-.28-.67-.55-.58-.76-.59-.2-.01-.41-.01-.63-.01-.22 0-.58.08-.89.41-.31.33-1.17 1.15-1.17 2.82 0 1.67 1.2 3.29 1.37 3.52.17.23 2.36 3.6 5.7 5.01.8.35 1.43.55 1.92.7.81.26 1.55.22 2.13.13.65-.1 1.96-.8 2.24-1.57.28-.77.28-1.43.19-1.57-.1-.14-.3-.22-.63-.38z" />
                  </svg>
                  <span className="font-medium">MU (Mauritius)</span>
                  <span className="ml-auto text-gray-300 text-sm">+230 5451 4176</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const url = 'https://wa.me/352661784276';
                    const newWin = window.open(url, '_blank', 'noopener,noreferrer');
                    if (!newWin) window.location.href = url;
                    setShowWA(false);
                  }}
                  className="w-full text-left px-4 py-3 text-white/90 hover:bg-white/10 transition flex items-center gap-2"
                >
                  <svg viewBox="0 0 32 32" className="w-6 h-6 text-red-700" aria-hidden="true">
                    <path fill="currentColor" d="M16 3C9.37 3 4 8.37 4 15c0 2.14.55 4.15 1.52 5.92L4 29l8.3-1.44C14 28.45 15.96 29 18 29c6.63 0 12-5.37 12-12S24.63 3 18 3h-2z" />
                    <path fill="white" d="M24.27 19.43c-.33-.16-1.96-.96-2.27-1.07-.31-.12-.54-.16-.76.16-.23.33-.88 1.07-1.08 1.29-.2.23-.4.26-.74.09-.33-.16-1.4-.52-2.66-1.65-.98-.87-1.64-1.95-1.84-2.28-.19-.33-.02-.5.14-.67.15-.15.33-.4.49-.6.16-.2.21-.33.33-.55.11-.23.06-.41-.03-.57-.09-.16-.76-1.83-1.04-2.5-.28-.67-.55-.58-.76-.59-.2-.01-.41-.01-.63-.01-.22 0-.58.08-.89.41-.31.33-1.17 1.15-1.17 2.82 0 1.67 1.2 3.29 1.37 3.52.17.23 2.36 3.6 5.7 5.01.8.35 1.43.55 1.92.7.81.26 1.55.22 2.13.13.65-.1 1.96-.8 2.24-1.57.28-.77.28-1.43.19-1.57-.1-.14-.3-.22-.63-.38z" />
                  </svg>
                  <span className="font-medium">LU (Luxembourg)</span>
                  <span className="ml-auto text-gray-300 text-sm">+352 661 784 276</span>
                </button>

                <div className="px-4 py-2 text-right">
                  <button type="button" onClick={() => setShowWA(false)} className="text-xs text-gray-300 hover:text-white transition">
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Offices */}
          <div className="flex items-center gap-4 p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10 backdrop-blur-sm shadow-lg hover:shadow-xl transition">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-full flex items-center justify-center border border-red-500/20">
              <span className="text-red-400 text-xl">🏢</span>
            </div>
            <div>
              <h3 className="text-white text-base font-medium mb-1">{t.contactInfo.offices}</h3>
              <p className="text-gray-300 text-sm">{t.contactInfo.officesLocation}</p>
            </div>
          </div>

          {/* Hours */}
          <div className="flex items-center gap-4 p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10 backdrop-blur-sm shadow-lg hover:shadow-xl transition">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-full flex items-center justify-center border border-red-500/20">
              <span className="text-red-400 text-xl">🕒</span>
            </div>
            <div>
              <h3 className="text-white text-base font-medium mb-1">{t.contactInfo.businessHours}</h3>
              <p className="text-gray-300 text-sm whitespace-pre-line">{t.contactInfo.businessHoursTime}</p>
            </div>
          </div>
        </div>

        {showWA && <div className="fixed inset-0 z-[60]" onClick={() => setShowWA(false)} aria-hidden="true" />}
      </section>

      {/* FOOTER */}
      <footer className="bg-black py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Mobile */}
          <div className="block sm:hidden">
            <div className="grid grid-cols-2 gap-8 mb-8 text-center">
              <div>
                <h3 className="text-[#ff1f00] text-sm font-bold uppercase mb-4">{t.footer.quickLinks}</h3>
                <div className="space-y-2">
                  <Link href="/" className="block text-white text-sm">{t.nav.home}</Link>
                  <a href="#" className="block text-white text-sm">{t.nav.about}</a>
                  <Link href="/" className="block text-white text-sm">{t.nav.services}</Link>
                  <a href="#" className="block text-white text-sm">{t.nav.blog}</a>
                </div>
              </div>
              <div>
                <h3 className="text-[#ff1f00] text-sm font-bold uppercase mb-4">{t.footer.support}</h3>
                <div className="space-y-2">
                  <Link href="/contactus" className="block text-white text-sm">{t.nav.contact}</Link>
                  <a href="#" className="block text-white text-sm">{t.footer.privacyPolicy}</a>
                  <a href="#" className="block text-white text-sm">{t.footer.termsConditions}</a>
                </div>
              </div>
            </div>

            <div className="text-center mb-8">
              <Image src={logo2} alt="BIM Logo" className="mx-auto mb-4" width={192} height={60} />
              <p className="text-white text-sm mb-1">{t.footer.copyright}</p>
              <p className="text-white text-sm">{t.footer.location}</p>
            </div>

            <div className="text-center text-white text-xs border-top pt-6">
              <a href="#" className="hover:text-[#ff1f00]">{t.footer.privacyPolicy}</a>
              <span className="mx-2">|</span>
              <a href="#" className="hover:text-[#ff1f00]">{t.footer.termsUse}</a>
            </div>
          </div>

          {/* Desktop */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
            <div className="text-left">
              <Image src={logo2} alt="BIM" width={500} height={120} className="w-48 sm:w-64 lg:w-80 xl:w-[500px] h-auto" />
              <p className="text-white text-xs sm:text-sm mt-3">{t.footer.copyright}</p>
              <p className="text-white text-xs sm:text-sm">{t.footer.location}</p>
            </div>

            <div className="text-left">
              <h3 className="text-[#ff1f00] text-sm sm:text-base lg:text-lg uppercase">{t.footer.quickLinks}</h3>
              <div className="space-y-2 mt-4">
                <Link href="/" className="block text-white text-sm lg:text-base">{t.nav.home}</Link>
                <a href="#" className="block text-white text-sm lg:text-base">{t.nav.about}</a>
                <Link href="/" className="block text-white text-sm lg:text-base">{t.nav.services}</Link>
                <a href="#" className="block text-white text-sm lg:text-base">{t.nav.blog}</a>
              </div>
            </div>

            <div className="text-left">
              <h3 className="text-[#ff1f00] text-sm sm:text-base lg:text-lg uppercase">{t.footer.support}</h3>
              <div className="space-y-2 mt-4">
                <Link href="/contactus" className="block text-white text-sm lg:text-base">{t.nav.contact}</Link>
                <a href="#" className="block text-white text-sm lg:text-base">{t.footer.privacyPolicy}</a>
                <a href="#" className="block text-white text-sm lg:text-base">{t.footer.termsConditions}</a>
              </div>
            </div>

            <div className="text-left">
              <h3 className="text-[#ff1f00] text-sm sm:text-base lg:text-lg uppercase">{t.footer.referralProgram}</h3>
              <p className="text-white text-xs sm:text-sm mt-4">{t.footer.referralText}</p>

              <div className="flex items-center gap-3 sm:gap-4 mt-6">
                <a
                  href="https://wa.me/352661784276?text=Hi%2C%20I%20want%20to%20join%20your%20referal%20program"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Join referral program on WhatsApp (Luxembourg)"
                >
                  <button className="bg-[#333333] border border-transparent hover:border-[#ff1f00] text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-full font-medium whitespace-nowrap text-xs sm:text-sm lg:text-base">
                    {t.buttons.joinNow}
                  </button>
                </a>

                <div className="flex space-x-2">
                  <a href="https://www.instagram.com/bimafrica" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-[#ff1f00] rounded-full flex items-center justify-center hover:bg-[#e61c00] transition">
                      <Instagram size={16} className="text-white sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                    </div>
                  </a>
                  <a href="https://www.facebook.com/share/17Kr1c4mkp/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-[#ff1f00] rounded-full flex items-center justify-center hover:bg-[#e61c00] transition">
                      <Facebook size={16} className="text-white sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                    </div>
                  </a>
                  <a href="https://www.linkedin.com/company/bimafrica/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-[#ff1f00] rounded-full flex items-center justify-center hover:bg-[#e61c00] transition">
                      <LinkedinIcon size={16} className="text-white sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden sm:block border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-white text-xs sm:text-sm">
            <a href="#" className="hover:text-white">{t.footer.privacyPolicy}</a> |{' '}
            <a href="#" className="hover:text-white">{t.footer.termsUse}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
