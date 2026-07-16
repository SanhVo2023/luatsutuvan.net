'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Phone, Menu, X, Scale, MessageCircle } from 'lucide-react'
import { NAV_LINKS, PHONE_DISPLAY, PHONE_TEL, ZALO_URL, SITE } from '@/config/site'

/**
 * Site header — deliberately calm and uncrowded. One wordmark, one nav row, one
 * primary call CTA. The old build stacked a navy urgency strip + a two-line logo
 * + 5 nav links + a pulsing CTA into 100px of height, which read as cluttered;
 * the urgency messaging now lives in the hero and the floating call button.
 */
export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-[rgba(26,35,50,0.08)] bg-white/90 shadow-[0_4px_24px_-16px_rgba(26,35,50,0.4)] backdrop-blur-md'
          : 'border-b border-transparent bg-white/70 backdrop-blur-sm'
      }`}
    >
      <div className="container-x flex h-[4.5rem] items-center justify-between gap-3 sm:gap-6">
        {/* logo */}
        <Link href="/" className="group flex items-center gap-3" aria-label={SITE.name}>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-trust text-white shadow-[var(--shadow-trust)] transition-transform duration-300 group-hover:-translate-y-0.5">
            <Scale className="h-5 w-5" strokeWidth={2.1} />
          </span>
          <span className="leading-tight">
            <span className="block whitespace-nowrap text-[1.05rem] font-extrabold tracking-tight text-navy sm:text-[1.18rem]">
              Luật Sư <span className="text-trust">Tư Vấn</span>
            </span>
            <span className="block whitespace-nowrap text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-steel sm:text-[0.68rem]">
              Hệ thống Apolo Lawyers
            </span>
          </span>
        </Link>

        {/* desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="relative text-[0.95rem] font-semibold text-navy/75 transition-colors hover:text-trust after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-trust after:transition-all after:duration-300 after:content-[''] hover:after:w-full"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* desktop CTA — one calm primary */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={ZALO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(26,35,50,0.12)] text-confidence transition-colors hover:border-confidence hover:bg-confidence-50"
            aria-label="Nhắn tin Zalo"
          >
            <MessageCircle className="h-5 w-5" />
          </a>
          <a
            href={`tel:${PHONE_TEL}`}
            className="inline-flex items-center gap-2.5 rounded-full bg-trust px-5 py-2.5 text-[0.98rem] font-bold text-white shadow-[var(--shadow-trust)] transition-all hover:-translate-y-0.5 hover:bg-trust-600"
          >
            <Phone className="h-4 w-4" strokeWidth={2.4} />
            <span className="leading-none">
              <span className="block text-[0.62rem] font-semibold uppercase tracking-wider text-white/75">
                Gọi tư vấn ngay
              </span>
              <span className="block tracking-tight">{PHONE_DISPLAY}</span>
            </span>
          </a>
        </div>

        {/* mobile toggles — shrink-0 + icon-only call pill below 420px so the
            menu button never gets pushed past the viewport edge at 390px. */}
        <div className="flex shrink-0 items-center gap-1.5 min-[420px]:gap-2 lg:hidden">
          <a
            href={`tel:${PHONE_TEL}`}
            className="inline-flex h-11 w-11 items-center justify-center gap-2 rounded-full bg-trust text-sm font-bold text-white shadow-[var(--shadow-trust)] min-[420px]:w-auto min-[420px]:px-4"
            aria-label={`Gọi ngay ${PHONE_DISPLAY}`}
          >
            <Phone className="h-4.5 w-4.5 shrink-0" strokeWidth={2.4} />
            <span className="hidden min-[420px]:inline">Gọi</span>
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[rgba(26,35,50,0.12)] text-navy transition-colors hover:bg-surface"
            aria-label="Mở menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* mobile menu */}
      <div
        className={`overflow-hidden border-t border-[rgba(26,35,50,0.08)] bg-white transition-[max-height,opacity] duration-300 lg:hidden ${
          open ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="container-x flex flex-col py-4">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-[rgba(26,35,50,0.06)] py-3.5 text-[1.05rem] font-semibold text-navy transition-colors hover:text-trust"
            >
              {l.label}
            </Link>
          ))}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <Link
              href="/gui-cau-hoi"
              onClick={() => setOpen(false)}
              className="btn btn-primary"
            >
              Gửi câu hỏi
            </Link>
            <a
              href={ZALO_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="btn btn-secondary"
            >
              <MessageCircle className="h-4.5 w-4.5" /> Zalo
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
