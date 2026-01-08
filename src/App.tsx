import type { FormEvent } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import {
  ArrowRight,
  Briefcase,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Moon,
  Phone,
  Send,
  Sparkles,
  Star,
  SunMedium,
  User,
  X,
} from 'lucide-react'
import { AnimatePresence, easeInOut, motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import clsx from 'clsx'
import {
  achievements,
  certifications,
  education,
  profile,
  projects,
  skills,
  stats,
  type Project,
} from './data/content'

const heroImage = '/profile.jpg' // Change to '/profile.jpg' once you add your photo
const fallbackImage = '/profile-placeholder.svg' // Use SVG placeholder as fallback

// Inline SVG placeholder to avoid external fetch issues while editing
const placeholderSvg = `
<svg width="640" height="800" viewBox="0 0 640 800" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#2563EB" stop-opacity="0.9" />
      <stop offset="100%" stop-color="#0EA5E9" stop-opacity="0.9" />
    </linearGradient>
  </defs>
  <rect width="640" height="800" rx="48" fill="#0f172a"/>
  <circle cx="320" cy="260" r="140" fill="url(#grad)" />
  <circle cx="280" cy="240" r="30" fill="#0f172a" />
  <circle cx="360" cy="240" r="30" fill="#0f172a" />
  <path d="M240 330C260 360 290 380 320 380C350 380 380 360 400 330" stroke="#0f172a" stroke-width="20" stroke-linecap="round"/>
  <rect x="140" y="420" width="360" height="260" rx="120" fill="url(#grad)" opacity="0.9"/>
  <path d="M200 660C220 610 270 580 320 580C370 580 420 610 440 660" stroke="#0f172a" stroke-width="24" stroke-linecap="round" opacity="0.4"/>
</svg>
`

type Theme = 'light' | 'dark'

function useTheme(): { theme: Theme; toggleTheme: () => void } {
  const preferred = useMemo<Theme>(() => {
    if (typeof window === 'undefined') return 'dark'
    const saved = localStorage.getItem('theme') as Theme | null
    if (saved) return saved
    return window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark'
  }, [])

  const [theme, setTheme] = useState<Theme>(preferred)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    root.classList.toggle('light', theme === 'light')
    localStorage.setItem('theme', theme)
  }, [theme])

  return {
    theme,
    toggleTheme: () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark')),
  }
}

type ContactStatus = 'idle' | 'sending' | 'success' | 'error'

const sectionMotion = {
  initial: { opacity: 0, translateY: 32 },
  whileInView: { opacity: 1, translateY: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.7, ease: easeInOut },
}



function SectionHeader({
  icon: Icon,
  eyebrow,
  title,
  description,
}: {
  icon?: React.ElementType
  eyebrow: string
  title: string
  description?: string
}) {
  return (
    <motion.div {...sectionMotion} className="mb-8 md:mb-12">
      <div className="inline-flex items-center gap-2 rounded-full bg-primary-600/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary-400 ring-1 ring-primary-500/20">
        {Icon && <Icon size={14} />}
        <span>{eyebrow}</span>
      </div>
      <h2 className="mt-4 text-3xl font-bold text-slate-50 sm:text-4xl lg:text-5xl">{title}</h2>
      {description && (
        <p className="mt-3 max-w-3xl text-base text-slate-400 sm:text-lg">{description}</p>
      )}
    </motion.div>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-2xl border border-slate-800/60 bg-gradient-to-br from-slate-900/90 to-slate-900/60 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-primary-500/40 hover:shadow-glow sm:p-8"
    >
      {/* Gradient overlay on hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 to-transparent" />
      </div>

      <div className="relative z-10">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary-400">
              {project.period}
            </p>
            <h3 className="mt-2 text-xl font-bold text-slate-50 sm:text-2xl">{project.title}</h3>
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary-500/10 px-3 py-1.5 text-xs font-semibold text-primary-300 ring-1 ring-primary-500/30">
            <Briefcase size={12} />
            Project
          </div>
        </div>

        <p className="mb-5 text-sm leading-relaxed text-slate-300 sm:text-base">{project.summary}</p>

        <ul className="mb-5 space-y-2.5">
          {project.highlights.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
              <Star className="mt-0.5 shrink-0 text-primary-400" size={16} fill="currentColor" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mb-6 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center rounded-lg border border-slate-700/60 bg-slate-800/40 px-3 py-1.5 text-xs font-medium text-slate-200"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary-600/30 transition-all hover:bg-primary-500 hover:shadow-primary-500/40"
            >
              View Live <ExternalLink size={16} />
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/60 px-5 py-2.5 text-sm font-semibold text-slate-200 transition-all hover:border-slate-600 hover:bg-slate-700/80"
            >
              View Code <Github size={16} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function ContactForm() {
  const formRef = useRef<HTMLFormElement | null>(null)
  const [status, setStatus] = useState<ContactStatus>('idle')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!formRef.current) return
    setStatus('sending')
    try {
      await emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formRef.current, {
        publicKey: 'YOUR_PUBLIC_KEY',
      })
      setStatus('success')
      formRef.current.reset()
      setTimeout(() => setStatus('idle'), 5000)
    } catch (error) {
      console.error('EmailJS error', error)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
      <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-200">
        <p className="font-semibold">⚙️ Setup EmailJS</p>
        <p className="mt-1 text-xs text-amber-300/80">
          Add your service ID, template ID, and public key in src/App.tsx (ContactForm component)
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">Your Name</label>
          <input
            name="user_name"
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-3 text-sm text-slate-50 placeholder-slate-500 outline-none ring-primary-600/30 transition focus:border-primary-600 focus:ring-4"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">Email Address</label>
          <input
            name="user_email"
            type="email"
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-3 text-sm text-slate-50 placeholder-slate-500 outline-none ring-primary-600/30 transition focus:border-primary-600 focus:ring-4"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">Your Message</label>
        <textarea
          name="message"
          required
          rows={6}
          className="w-full rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-3 text-sm text-slate-50 placeholder-slate-500 outline-none ring-primary-600/30 transition focus:border-primary-600 focus:ring-4"
          placeholder="Tell me about the role or opportunity..."
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={status === 'sending'}
          className={clsx(
            'inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-600/30 transition-all hover:bg-primary-500',
            status === 'sending' && 'cursor-not-allowed opacity-60'
          )}
        >
          {status === 'sending' ? 'Sending...' : 'Send Message'} <Send size={16} />
        </button>

        {status === 'success' && (
          <p className="text-sm font-medium text-emerald-400">✓ Message sent successfully!</p>
        )}
        {status === 'error' && (
          <p className="text-sm font-medium text-red-400">✗ Failed. Check EmailJS setup.</p>
        )}
      </div>
    </form>
  )
}

function App() {
  const { theme, toggleTheme } = useTheme()
  const [imageSrc, setImageSrc] = useState(heroImage)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#resume', label: 'Resume' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-slate-950">
        {/* Fixed Navigation */}
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="fixed left-0 right-0 top-0 z-50 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-xl"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between md:h-20">
              {/* Logo */}
              <a href="#hero" className="flex items-center gap-3 group">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary-600 to-primary-700 text-base font-bold text-white shadow-lg shadow-primary-600/30 transition-all group-hover:scale-105 group-hover:shadow-primary-600/50">
                  PE
                </div>
                <span className="hidden text-lg font-bold text-slate-50 sm:block">{profile.name}</span>
              </a>

              {/* Desktop Navigation */}
              <div className="hidden items-center gap-8 md:flex">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-slate-300 transition-colors hover:text-primary-400"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* Right Actions */}
              <div className="flex items-center gap-3">
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hidden items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-2 text-sm font-semibold text-slate-200 transition-all hover:border-slate-600 hover:bg-slate-700/80 sm:inline-flex"
                >
                  <Linkedin size={16} /> LinkedIn
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="hidden items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-2 text-sm font-semibold text-slate-200 transition-all hover:border-slate-600 hover:bg-slate-700/80 sm:inline-flex"
                >
                  <Github size={16} /> GitHub
                </a>
                <button
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 bg-slate-800/60 text-slate-200 transition-all hover:border-slate-600 hover:bg-slate-700/80"
                >
                  {theme === 'dark' ? <SunMedium size={18} /> : <Moon size={18} />}
                </button>
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label="Toggle menu"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 bg-slate-800/60 text-slate-200 transition-all hover:border-slate-600 hover:bg-slate-700/80 md:hidden"
                >
                  {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-slate-800/60 bg-slate-900/95 backdrop-blur-xl md:hidden"
              >
                <div className="space-y-1 px-4 py-4">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block rounded-lg px-4 py-3 text-base font-medium text-slate-300 transition-colors hover:bg-slate-800/60 hover:text-primary-400"
                    >
                      {link.label}
                    </a>
                  ))}
                  <div className="flex gap-2 pt-2">
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-3 text-sm font-semibold text-slate-200"
                    >
                      <Linkedin size={16} /> LinkedIn
                    </a>
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-3 text-sm font-semibold text-slate-200"
                    >
                      <Github size={16} /> GitHub
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>

        {/* Main Content */}
        <main className="relative pt-16 md:pt-20">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
            {/* Hero Section */}
            <section id="hero" className="mb-20 lg:mb-32">
              <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                {/* Left Column - Content */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="flex flex-col justify-center"
                >
                  <div className="inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-primary-600/20 to-cyan-600/20 px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary-300 ring-1 ring-primary-500/30">
                    <Sparkles size={14} className="animate-pulse" />
                    Available for Opportunities
                  </div>

                  <h1 className="mt-6 bg-gradient-to-br from-slate-50 via-slate-200 to-slate-400 bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl lg:text-6xl xl:text-7xl">
                    {profile.name}
                  </h1>

                  <p className="mt-4 text-xl font-semibold text-primary-400 sm:text-2xl">
                    {profile.title}
                  </p>

                  <p className="mt-5 text-lg leading-relaxed text-slate-300 sm:text-xl">
                    {profile.headline}
                  </p>

                  <p className="mt-4 leading-relaxed text-slate-400">
                    {profile.summary}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <a
                      href="#projects"
                      className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary-600/30 transition-all hover:bg-primary-500 hover:shadow-primary-500/40 sm:px-8"
                    >
                      View Projects <ArrowRight size={18} />
                    </a>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/60 px-6 py-3.5 text-base font-semibold text-slate-200 transition-all hover:border-slate-600 hover:bg-slate-700/80 sm:px-8"
                    >
                      Contact Me <Mail size={18} />
                    </a>
                  </div>

                  {/* Stats */}
                  <div className="mt-10 grid grid-cols-3 gap-4">
                    {stats.map((stat, i) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        className="rounded-xl border border-slate-800/60 bg-slate-900/60 p-4 text-center backdrop-blur-sm"
                      >
                        <div className="text-xl font-bold text-primary-400 sm:text-2xl">{stat.value}</div>
                        <p className="mt-1 text-xs text-slate-400 sm:text-sm">{stat.label}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Contact Info */}
                  <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-400">
                    <span className="inline-flex items-center gap-2 rounded-lg bg-slate-800/40 px-3 py-2">
                      <MapPin size={16} className="text-primary-400" /> {profile.location}
                    </span>
                    <a
                      href={`tel:${profile.phone}`}
                      className="inline-flex items-center gap-2 rounded-lg bg-slate-800/40 px-3 py-2 transition-colors hover:bg-slate-700/60"
                    >
                      <Phone size={16} className="text-primary-400" /> {profile.phone}
                    </a>
                    <a
                      href={`mailto:${profile.email}`}
                      className="inline-flex items-center gap-2 rounded-lg bg-slate-800/40 px-3 py-2 transition-colors hover:bg-slate-700/60"
                    >
                      <Mail size={16} className="text-primary-400" /> {profile.email}
                    </a>
                  </div>
                </motion.div>

                {/* Right Column - Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative flex items-center justify-center"
                >
                  <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-full lg:max-w-lg">
                    {/* Gradient Border */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        {/* Soft glowing rotated halo */}
                        <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-indigo-500 via-primary-500 to-cyan-400 opacity-60 filter blur-2xl transform rotate-12" />
                        {/* Subtle outer bloom */}
                        <div className="absolute -inset-8 rounded-full bg-gradient-to-br from-primary-700 to-cyan-500 opacity-20 filter blur-3xl" />

                        {/* Main gradient ring */}
                        <div className="relative rounded-full p-1 bg-gradient-to-br from-primary-600 via-primary-500 to-cyan-500 shadow-2xl">
                          <div className="rounded-full bg-gradient-to-b from-slate-900/95 to-slate-800 p-6 flex items-center justify-center">
                            {imageSrc && imageSrc.includes('placeholder') ? (
                              <div className="max-h-full max-w-full flex items-center justify-center" dangerouslySetInnerHTML={{ __html: placeholderSvg }} />
                            ) : (
                              <img
                                src={imageSrc}
                                alt={profile.name}
                                onError={() => setImageSrc(fallbackImage)}
                                className="max-h-full max-w-full object-contain object-top rounded-full"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Decorative Elements removed to keep focus on the profile ring */}
                </motion.div>
              </div>
            </section>

            {/* About Section */}
            <section id="about" className="scroll-mt-20 mb-20 lg:mb-32">
              <SectionHeader
                icon={User}
                eyebrow="About Me"
                title="Who I Am"
                description="Learn more about my background, passion, and goals in software development."
              />

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="overflow-hidden rounded-2xl border border-slate-800/60 bg-gradient-to-br from-slate-900/90 to-slate-900/60 p-6 backdrop-blur-xl sm:p-8"
              >
                <div className="space-y-4 text-base leading-relaxed text-slate-300">
                  {profile.about.split('\n\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href={profile.resumeUrl}
                    download
                    className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-600/30 transition-all hover:bg-primary-500 hover:shadow-primary-500/40"
                  >
                    <Download size={18} /> Download Resume
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/60 px-6 py-3 text-sm font-semibold text-slate-200 transition-all hover:border-slate-600 hover:bg-slate-700/80"
                  >
                    <Mail size={18} /> Get In Touch
                  </a>
                </div>
              </motion.div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="scroll-mt-20 mb-20 lg:mb-32">
              <SectionHeader
                eyebrow="Skills"
                title="Technical Expertise"
                description="Technologies and tools I use to build modern applications."
              />

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {skills.map((group, i) => (
                  <motion.div
                    key={group.title}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="group relative overflow-hidden rounded-2xl border border-slate-800/60 bg-gradient-to-br from-slate-900/90 to-slate-900/60 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary-500/40 hover:shadow-glow"
                  >
                    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 to-transparent" />
                    </div>

                    <div className="relative z-10">
                      <h3 className="mb-4 text-lg font-bold text-slate-50">{group.title}</h3>
                      <div className="flex flex-wrap gap-2">
                        {group.items.map((item) => (
                          <span
                            key={item}
                            className="inline-flex items-center rounded-lg border border-slate-700/60 bg-slate-800/40 px-2.5 py-1 text-xs font-medium text-slate-200"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

          <section id="projects" className="scroll-mt-20 mb-20 lg:mb-32">
            <SectionHeader
              icon={Briefcase}
              eyebrow="Portfolio"
              title="Featured Projects"
              description="Real-world applications demonstrating full-stack development and problem-solving skills."
            />
            <div className="grid gap-5 md:grid-cols-2">
              {projects.map((project, index) => (
                <ProjectCard key={project.title} project={project} index={index} />
              ))}
            </div>
          </section>

          {/* Resume Section - Combined Education, Certifications, and Achievements */}
          <section id="resume" className="scroll-mt-20 mb-20 lg:mb-32">
            <SectionHeader
              icon={Download}
              eyebrow="Resume"
              title="Education & Achievements"
              description="My academic background, certifications, and accomplishments."
            />

            {/* Download Resume Button */}
            <div className="mb-8 flex justify-center">
              <a
                href={profile.resumeUrl}
                download
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary-600 to-primary-500 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-primary-600/30 transition-all hover:scale-105 hover:shadow-primary-500/50"
              >
                <Download size={20} /> Download Full Resume
              </a>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Education Card */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="overflow-hidden rounded-2xl border border-slate-800/60 bg-gradient-to-br from-slate-900/90 to-slate-900/60 p-6 backdrop-blur-xl sm:p-8"
              >
                <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-slate-50">
                  <div className="rounded-lg bg-primary-600/20 p-2">
                    <Download size={20} className="text-primary-400" />
                  </div>
                  Education
                </h3>
                <div className="space-y-6">
                  {education.map((item, i) => (
                    <div
                      key={item.school}
                      className={clsx(
                        'pb-6',
                        i !== education.length - 1 && 'border-b border-slate-800/60'
                      )}
                    >
                      <p className="text-xs font-semibold uppercase tracking-widest text-primary-400">
                        {item.period}
                      </p>
                      <h4 className="mt-2 text-base font-bold text-slate-50 sm:text-lg">{item.school}</h4>
                      <p className="mt-1 text-sm text-slate-300">{item.credential}</p>
                      <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1.5 text-sm font-semibold text-emerald-300 ring-1 ring-emerald-500/30">
                        <Star size={14} fill="currentColor" />
                        {item.detail}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Certifications & Achievements Card */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="overflow-hidden rounded-2xl border border-slate-800/60 bg-gradient-to-br from-slate-900/90 to-slate-900/60 p-6 backdrop-blur-xl sm:p-8"
              >
                <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-slate-50">
                  <div className="rounded-lg bg-cyan-600/20 p-2">
                    <Star size={20} className="text-cyan-400" fill="currentColor" />
                  </div>
                  Certifications & Awards
                </h3>

                <div className="mb-6">
                  <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
                    Certifications
                  </h4>
                  <ul className="space-y-3">
                    {certifications.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm text-slate-300"
                      >
                        <Star className="mt-0.5 shrink-0 text-primary-400" size={16} fill="currentColor" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
                    Achievements
                  </h4>
                  <ul className="space-y-3">
                    {achievements.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm text-slate-300"
                      >
                        <Star className="mt-0.5 shrink-0 text-cyan-400" size={16} fill="currentColor" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </section>

          <section id="contact" className="scroll-mt-20">
            <SectionHeader
              icon={Mail}
              eyebrow="Get In Touch"
              title="Let's Connect"
              description="Interested in working together? Drop me a message and let's discuss opportunities!"
            />
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Contact Info Card */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="overflow-hidden rounded-2xl border border-slate-800/60 bg-gradient-to-br from-slate-900/90 to-slate-900/60 p-6 backdrop-blur-xl sm:p-8"
              >
                <h3 className="mb-4 text-xl font-bold text-slate-50">Let's Work Together</h3>
                <p className="mb-6 leading-relaxed text-slate-300">
                  I'm actively seeking internships and entry-level positions where I can contribute my skills and grow as a software engineer. Let's connect and explore opportunities!
                </p>

                <div className="mb-6 flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-300">
                    ✓ Available for Work
                  </span>
                  <span className="inline-flex items-center rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-300">
                    ✓ Quick Learner
                  </span>
                  <span className="inline-flex items-center rounded-lg border border-purple-500/30 bg-purple-500/10 px-3 py-1.5 text-xs font-semibold text-purple-300">
                    ✓ Team Player
                  </span>
                </div>

                <div className="space-y-3">
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex items-center gap-3 rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-3 text-sm font-medium text-slate-200 transition-all hover:border-primary-500 hover:bg-slate-700/80"
                  >
                    <Mail size={18} className="text-primary-400" />
                    <span className="truncate">{profile.email}</span>
                  </a>
                  <a
                    href={`tel:${profile.phone}`}
                    className="flex items-center gap-3 rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-3 text-sm font-medium text-slate-200 transition-all hover:border-primary-500 hover:bg-slate-700/80"
                  >
                    <Phone size={18} className="text-primary-400" />
                    <span>{profile.phone}</span>
                  </a>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-3 text-sm font-medium text-slate-200 transition-all hover:border-primary-500 hover:bg-slate-700/80"
                  >
                    <Linkedin size={18} className="text-primary-400" />
                    <span>LinkedIn Profile</span>
                  </a>
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-3 text-sm font-medium text-slate-200 transition-all hover:border-primary-500 hover:bg-slate-700/80"
                  >
                    <Github size={18} className="text-primary-400" />
                    <span>GitHub Profile</span>
                  </a>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="overflow-hidden rounded-2xl border border-slate-800/60 bg-gradient-to-br from-slate-900/90 to-slate-900/60 p-6 backdrop-blur-xl sm:p-8"
              >
                <ContactForm />
              </motion.div>
            </div>
          </section>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-800/60 bg-slate-950/60 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Sparkles size={16} className="text-primary-400" />
                <span>{profile.availability}</span>
              </div>
              <div className="flex gap-4">
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-400 transition-colors hover:text-primary-400"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-400 transition-colors hover:text-primary-400"
                  aria-label="GitHub"
                >
                  <Github size={20} />
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-slate-400 transition-colors hover:text-primary-400"
                  aria-label="Email"
                >
                  <Mail size={20} />
                </a>
              </div>
              <a
                href="#hero"
                className="flex items-center gap-2 text-sm font-medium text-primary-400 transition-colors hover:text-primary-300"
              >
                Back to top <ArrowRight size={14} />
              </a>
            </div>
            <p className="mt-6 text-center text-xs text-slate-500">
              © {new Date().getFullYear()} {profile.name}. Built with React, TypeScript, Tailwind CSS, and Framer Motion.
            </p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
