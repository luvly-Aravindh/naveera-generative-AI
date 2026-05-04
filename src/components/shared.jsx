import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

/* ── Framer variants ─────────────────────────────────────── */
export const FV = {
  up:    { hidden:{ opacity:0, y:32 },    show:{ opacity:1, y:0,    transition:{ duration:0.7, ease:[0.22,1,0.36,1] } } },
  left:  { hidden:{ opacity:0, x:36 },    show:{ opacity:1, x:0,    transition:{ duration:0.7, ease:[0.22,1,0.36,1] } } },
  right: { hidden:{ opacity:0, x:-36 },   show:{ opacity:1, x:0,    transition:{ duration:0.7, ease:[0.22,1,0.36,1] } } },
  scale: { hidden:{ opacity:0, scale:.93 },show:{ opacity:1, scale:1, transition:{ duration:0.65,ease:[0.34,1.56,0.64,1] } } },
  fade:  { hidden:{ opacity:0 },           show:{ opacity:1,          transition:{ duration:0.5 } } },
  stagger:(d=0.1)=>({ hidden:{}, show:{ transition:{ staggerChildren:d } } }),
}

/* ── Scroll reveal wrapper ───────────────────────────────── */
export function Reveal({ children, variant='up', delay=0, className='' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once:true, margin:'-72px' })
  return (
    <motion.div ref={ref} variants={FV[variant]}
      initial="hidden" animate={inView ? 'show' : 'hidden'}
      transition={{ delay }}
      className={className}>
      {children}
    </motion.div>
  )
}

/* ── Stagger container ───────────────────────────────────── */
export function StaggerReveal({ children, delay=0.1, className='' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once:true, margin:'-72px' })
  return (
    <motion.div ref={ref} variants={FV.stagger(delay)}
      initial="hidden" animate={inView ? 'show' : 'hidden'}
      className={className}>
      {children}
    </motion.div>
  )
}

/* ── Animated counter ────────────────────────────────────── */
export function Counter({ end, suffix='', prefix='', duration=2200 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once:true, margin:'-60px' })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    const startTime = Date.now()
    const tick = () => {
      const elapsed = Date.now() - startTime
      const t = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setVal(Math.round(eased * end))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, end, duration])

  return <span ref={ref}>{prefix}{val}{suffix}</span>
}

/* ── Urgency dot ─────────────────────────────────────────── */
export function UrgDot() {
  return <span className="urg-dot inline-block" />
}

/* ── Urgency bar ─────────────────────────────────────────── */
export function UrgencyRow({ text, className='' }) {
  return (
    <div className={`flex items-center justify-center gap-2 mt-2 ${className}`}>
      <UrgDot />
      <span className="f-display text-xs font-semibold text-muted">{text}</span>
    </div>
  )
}

/* ── Full-width urgency banner ───────────────────────────── */
export function UrgBanner({ text }) {
  return (
    <div className="py-3 px-4"
         style={{ background:'linear-gradient(135deg,rgba(238,107,0,0.07),rgba(254,200,0,0.05))', borderTop:'1px solid rgba(238,107,0,0.14)', borderBottom:'1px solid rgba(238,107,0,0.14)' }}>
      <div className="cx flex items-center justify-center gap-2 flex-wrap">
        <UrgDot />
        <p className="f-display text-xs font-bold text-orange tracking-wide text-center">{text}</p>
      </div>
    </div>
  )
}

/* ── Section heading ─────────────────────────────────────── */
export function SH({ chip, h2, accent, sub, center=true, light=false, className='' }) {
  return (
    <div className={`${center?'text-center':'text-left'} ${className}`}>
      {chip && (
        <div className={`mb-4 ${center?'flex justify-center':''}`}>
          <span className={`chip ${light?'chip-navy':''}`}>{chip}</span>
        </div>
      )}
      <h2 className={`f-display font-extrabold t-h2 mb-4 ${light?'text-white':'text-navy'}`}>
        {h2}
        {accent && <><br /><span className="text-grad-brand">{accent}</span></>}
      </h2>
      {sub && <p className={`t-lead max-w-2xl ${center?'mx-auto':''} ${light?'text-white/60':'text-body'}`}>{sub}</p>}
    </div>
  )
}

/* ── Primary CTA button ──────────────────────────────────── */
export function CtaBtn({ children, size='md', className='', onClick, type='button' }) {
  const sz = size==='lg' ? 'btn-primary-lg' : size==='sm' ? 'btn-primary-sm' : ''
  return (
    <motion.button type={type} onClick={onClick}
      whileHover={{ scale:1.03, y:-2 }} whileTap={{ scale:0.97, y:0 }}
      className={`btn btn-primary ${sz} ${className}`}>
      {children}
    </motion.button>
  )
}
