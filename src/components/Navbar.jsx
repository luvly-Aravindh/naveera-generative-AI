import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CtaBtn } from './shared.jsx'

const LINKS = ['Services','Results','Process','FAQ']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', fn, { passive:true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const go = id => {
    setOpen(false)
    document.querySelector(id)?.scrollIntoView({ behavior:'smooth', block:'start' })
  }

  return (
    <motion.nav initial={{ y:-72, opacity:0 }} animate={{ y:0, opacity:1 }}
      transition={{ duration:0.8, ease:[0.22,1,0.36,1] }}
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(248,250,252,0.97)' : '#F8FAFC',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: '1px solid rgba(15,23,42,0.08)',
        boxShadow: scrolled ? '0 2px 20px rgba(15,23,42,0.06)' : 'none',
      }}>
      <div className="cx flex items-center justify-between h-[68px] gap-6">

        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-9 h-9 rounded-[10px] flex items-center justify-center"
               style={{ background:'linear-gradient(135deg,#FEC800,#EE6B00)', boxShadow:'0 4px 14px rgba(238,107,0,0.38)' }}>
            <span className="f-display font-black text-white text-base leading-none">N</span>
          </div>
          <div>
            <p className="f-display font-extrabold text-navy text-[18px] leading-none tracking-tight">Naveera</p>
            <p className="f-body text-[9px] text-muted tracking-[0.2em] uppercase mt-0.5 hidden sm:block">Technology LLC</p>
          </div>
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-7 flex-1 justify-center">
          {LINKS.map(l => (
            <button key={l} onClick={() => go(`#${l.toLowerCase()}`)} className="nav-link">
              {l}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <button className="btn btn-outline hidden sm:inline-flex text-[13px] px-4 py-2.5">
            Log In
          </button>
          <CtaBtn size="sm" className="text-[13px] px-5 py-2.5">
            Book Strategy Call
          </CtaBtn>
          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)}
            className="lg:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg"
            style={{ background:'rgba(1,12,68,0.06)', border:'1px solid rgba(1,12,68,0.1)' }}>
            <span className={`block w-[18px] h-0.5 bg-navy transition-all duration-200 ${open?'rotate-45 translate-y-2':''}`} />
            <span className={`block w-[18px] h-0.5 bg-navy transition-all duration-200 ${open?'opacity-0':''}`} />
            <span className={`block w-[18px] h-0.5 bg-navy transition-all duration-200 ${open?'-rotate-45 -translate-y-2':''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }}
            exit={{ opacity:0, height:0 }} transition={{ duration:0.22 }}
            className="lg:hidden overflow-hidden border-t" style={{ borderColor:'rgba(15,23,42,0.08)' }}>
            <div className="cx py-4 flex flex-col gap-1">
              {LINKS.map(l => (
                <button key={l} onClick={() => go(`#${l.toLowerCase()}`)}
                  className="text-left py-3 f-display text-sm font-semibold text-navy/70 hover:text-navy border-b border-navy/5 last:border-0 transition-colors">
                  {l}
                </button>
              ))}
              <CtaBtn className="mt-3 w-full">Book Strategy Call</CtaBtn>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
