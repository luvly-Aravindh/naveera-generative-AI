import { motion } from 'framer-motion'

export default function TopBar() {
  return (
<motion.div
  initial={{ opacity: 0, y: -16 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="sm:px-3 px-1 py-1 sm:py-3 sm:px-4"
  style={{
    background: "linear-gradient(90deg, #010C44 0%, #02155f 100%)",
    boxShadow: "0 6px 24px rgba(1,12,68,0.35)",
  }}
>
<div
  className="cx flex flex-col items-center justify-center gap-3 px-3 py-2 sm:py-3 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2 sm:px-6"
>
  <span className="f-body text-center text-xs sm:text-base text-white/80 leading-snug">
    Trusted by AI-First Startups, SaaS Companies &amp; Engineering Teams
    Shipping Generative AI to Production
  </span>

  <span
    className="f-display text-center text-[10px] font-bold tracking-[0.14em] uppercase whitespace-nowrap"
    style={{
      color: "#010C44",
      background: "linear-gradient(180deg, #FEC800 0%, #EE6B00 100%)",
      padding: "5px 16px",
      borderRadius: "999px",
      border: "1px solid rgba(255,255,255,0.18)",
      boxShadow: `
        0 0 0 1px rgba(254,200,0,0.15),
        0 8px 20px rgba(238,107,0,0.28),
        inset 0 1px 0 rgba(255,255,255,0.35)
      `,
    }}
  >
    ⚡ Limited Tech Strategy Calls Filling Fast
  </span>
</div>
</motion.div>
  )
}
