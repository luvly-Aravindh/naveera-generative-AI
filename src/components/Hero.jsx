import { motion } from 'framer-motion'
import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle, Shield, Clock, Zap } from 'lucide-react'
import { CtaBtn, UrgencyRow, FV } from './shared.jsx'
import Logoimage from '../assets/logo.png'
import LoadingBar from '../components/LoadingBar.jsx'

const TRUST_PILLS = [
  { icon: Shield,       text:'100% IP Ownership'   },
  { icon: Clock,        text:'Ship in 11 Weeks'     },
  { icon: Zap,          text:'No Vendor Lock-In'    },
  { icon: CheckCircle,  text:'200+ CTOs Deployed'   },
]

const METRICS = [
  { value: 15, suffix: "+", label: "Years in IT Services" },
  { value: 400, suffix: "+", label: "Experts Deployed" },
  { value: 6, prefix: "<", suffix: "%", label: "Team Attrition Rate" },
  { value: 7, suffix: "yr+", label: "Avg SME Tenure" },
  { value: 100, suffix: "%", label: "IP to Client" },
];

function Counter({ value, prefix = "", suffix = "", duration = 1800 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, duration]);

  return (
    <span>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

function DashPanel() {
  const bars = [22,44,35,58,48,72,56,88,66,100]
  const stats = [
    { l:'Models in Prod', v:'14',    badge:'Active',      good:true  },
    { l:'Avg Latency',    v:'142ms', badge:'Optimized',   good:false },
    { l:'Weekly Reqs',    v:'2.4M',  badge:'Growing',     good:true  },
    { l:'AI Accuracy',    v:'97.3%', badge:'Improving',   good:true  },
  ]
  return (
    <div className="relative w-full max-w-[440px]"
         style={{ background:'rgba(255,255,255,0.06)', backdropFilter:'blur(20px)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:20, padding:'28px', boxShadow:'0 32px 100px rgba(0,0,0,0.5)' }}>
      {/* Scan shimmer */}
      <div className="absolute left-0 right-0 h-px pointer-events-none"
           style={{ background:'linear-gradient(90deg,transparent,rgba(254,200,0,0.6),transparent)', animation:'shimmer 3s linear infinite', backgroundSize:'200% 100%', top:0 }} />

      {/* Window chrome */}
      <div className="flex items-center gap-2 mb-5">
        {['#EF4444','#FBBF24','#22C55E'].map(c => <span key={c} className="w-3 h-3 rounded-full" style={{ background:c+90 }} />)}
        <span className="f-mono text-[10px] text-white/30 ml-auto">ai-ops · prod</span>
      </div>

      {/* Bar chart */}
  <div className="flex items-end gap-1.5 h-16 mb-5">
  {bars.map((h, i) => (
    <motion.div
      key={i}
      animate={{
        height: [`${h * 0.5}%`, `${h}%`, `${h * 0.7}%`, `${h}%`],
      }}
      transition={{
        duration: 1.8,
        repeat: Infinity,
        repeatType: "mirror",
        delay: i * 0.1,
        ease: "easeInOut",
      }}
      className="flex-1 rounded-t"
      style={{
        background:
          i >= 7
            ? "linear-gradient(180deg,#FEC800,#EE6B00)"
            : "rgba(255,255,255,0.12)",
      }}
    />
  ))}
</div>

      {/* Stat grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {stats.map((s,i) => (
          <div key={i} className="rounded-xl p-3"
               style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)' }}>
            <p className="f-mono text-[9px] text-white/38 mb-1.5 uppercase tracking-wider">{s.l}</p>
            <p className="f-display font-extrabold text-white text-xl leading-none mb-1.5">{s.v}</p>
            <span className={`text-[9px] f-display font-bold px-2 py-0.5 rounded-full ${s.good?'text-emerald-400 bg-emerald-400/12':'text-yellow bg-yellow/12'}`}>
              {s.good?'↑':'↓'} {s.badge}
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 flex items-center justify-between" style={{ borderTop:'1px solid rgba(255,255,255,0.08)' }}>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400" style={{ boxShadow:'0 0 8px #22C55E' }} />
          <span className="f-mono text-[9px] text-white/80">All systems operational</span>
        </div>
        <span className="f-mono text-[9px] text-white/80">Updated 2s ago</span>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden"
      style={{ background:'linear-gradient(160deg,#000830 0%,#010C44 45%,#021466 100%)', paddingTop:'clamp(12px,9vw,15px)', paddingBottom:'clamp(80px,10vw,50px)' }}>

      {/* BG layers */}
      <div className="absolute inset-0 line-grid-dk pointer-events-none" />
      <div className="absolute inset-0 dot-grid pointer-events-none opacity-40" />
      <div className="absolute -top-36 right-[6%] w-[560px] h-[560px] rounded-full pointer-events-none"
           style={{ background:'radial-gradient(circle,rgba(238,107,0,0.15) 0%,transparent 65%)' }} />
      <div className="absolute bottom-0 left-[4%] w-72 h-72 rounded-full pointer-events-none"
           style={{ background:'radial-gradient(circle,rgba(254,200,0,0.07) 0%,transparent 65%)' }} />
      {/* Accent dots */}
      {[[18,76,0],[42,88,0.6],[66,80,1.3]].map(([t,l,d],i)=>(
        <div key={i} className="absolute w-1.5 h-1.5 rounded-full hidden xl:block"
             style={{ top:`${t}%`, left:`${l}%`, background:'rgba(254,200,0,0.55)', animation:`pulseRing 2.2s ${d}s ease-in-out infinite` }} />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
{/* Header row */}
<div className="relative flex flex-col items-center gap-4 sm:gap-5 mb-4 sm:mb-8 mt-2  lg:min-h-[64px] lg:flex-row lg:justify-center lg:gap-0">
  {/* Left side logo */}
  <div className="flex items-center lg:absolute lg:left-0">
    <img
      src={Logoimage}
      alt="Logo"
      className="h-14 w-auto sm:h-14 lg:h-20"
    />
  </div>

  {/* Center attention badge */}
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="flex w-full justify-center"
  >
    <div
      className="inline-flex max-w-full items-center justify-center gap-2 rounded-full border px-4 py-2 text-center sm:px-5"
      style={{
        background: "rgba(254,200,0,0.08)",
        borderColor: "rgba(254,200,0,0.25)",
      }}
    >
      <span className="urg-dot" />

      <span className="f-display text-[14px] font-bold leading-snug text-yellow/90 tracking-[0.08em] uppercase sm:text-[13px] lg:text-[15px]">
        Attention: US Tech Leaders Your Generative AI Rollout Is Stalling
      </span>
    </div>
  </motion.div>
</div>

{/* Hero Grid */}
<div className="grid lg:grid-cols-2 gap-4 sm:gap-8 xl:gap-4 items-start">

  {/* FULL WIDTH HEADING */}
  <div className="lg:col-span-2">
    <motion.h1
      initial={{ opacity: 0, y: 48 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="f-display font-black text-white text-center lg:text-left"
      style={{
        fontSize: "clamp(34px,4.8vw,74px)",
        lineHeight: "1",
        letterSpacing: "-0.04em",
        maxWidth: "100%",
      }}
    >
      <span className="block">
        Your Generative AI Is Still In A Demo.
      </span>

      <span className="block text-grad-brand mt-2">
        Get It Into Production.
      </span>
    </motion.h1>
  </div>

  {/* LEFT CONTENT */}
  <div className="w-full">
    <motion.p
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.32 }}
      className="text-[15px] t-lead text-white/65 mb-4 max-w-auto font-light text-center lg:text-left"
    >
      Most engineering teams have already done the hard part. What slows them
      down is execution fragmented vendors, integration debt, and builds that
      never leave staging.
    </motion.p>

    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.45 }}
      className="text-[15px] text-white/60 mb-4 sm:mb-9 max-w-auto leading-relaxed text-center lg:text-left"
    >
      Naveera partners with US engineering teams to take AI from prototype to
      production. We own the full stack model, data, integration, and deployment.
    </motion.p>

    {/* Buttons */}
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.58 }}
      className="mb-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center"
    >
      <CtaBtn
        onClick={() =>
          document.getElementById("contact")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
        size="lg"
        className="w-full justify-center sm:w-auto"
      >
        Book Your Tech Strategy Call <ArrowRight size={17} />
      </CtaBtn>

    
    </motion.div>

    {/* Loading GIF */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.75 }}
      className="flex justify-center lg:justify-start"
    >
    <LoadingBar />
    </motion.div>

            {/* Metrics bar */}
 <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="mt-16 overflow-hidden rounded-3xl"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(254,200,0,0.18)",
        backdropFilter: "blur(20px)",
        boxShadow: `
          0 20px 50px rgba(1,12,68,0.35),
          inset 0 1px 0 rgba(255,255,255,0.08)
        `,
        transform: "perspective(1200px) rotateX(2deg)",
      }}
    >
      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-5">
        {METRICS.map((metric, i) => (
          <motion.div
            key={i}
            whileHover={{
              y: -8,
              scale: 1.03,
            }}
            transition={{ duration: 0.25 }}
            className="px-3 py-6 text-center sm:px-4 sm:py-7"
            style={{
              borderRight:
                i < METRICS.length - 1
                  ? "1px solid rgba(255,255,255,0.06)"
                  : "none",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
            }}
          >
            <p
              className="f-display font-black leading-none mb-2"
              style={{
                fontSize: "clamp(22px,2.8vw,30px)",
                background:
                  "linear-gradient(180deg, #FEC800 0%, #EE6B00 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 6px 18px rgba(238,107,0,0.25)",
              }}
            >
              <Counter
                value={metric.value}
                prefix={metric.prefix}
                suffix={metric.suffix}
              />
            </p>

            <p className="f-body text-[10px] text-white/55 leading-snug">
              {metric.label}
            </p>
          </motion.div>
        ))}
      </div>

      <div
        className="py-3 text-center"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          background:
            "linear-gradient(90deg, rgba(1,12,68,0.7), rgba(238,107,0,0.08))",
        }}
      >
        <p className="f-display text-[9px] font-bold text-white/45 tracking-[0.18em] uppercase">
          Trusted By US Companies Shipping Generative AI Systems In Production
        </p>
      </div>
    </motion.div>
  </div>

  {/* RIGHT DIAGRAM */}
  <div className="relative flex items-center justify-center lg:justify-end mt-10 lg:mt-10">
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(circle,rgba(238,107,0,0.1) 0%,transparent 65%)",
      }}
    />

    <motion.div
      initial={{ opacity: 0, x: 60, scale: 0.92 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 w-full max-w-[440px]"
    >
      <DashPanel />
    </motion.div>

    {/* Floating Card 1 */}
    <motion.div
      initial={{ opacity: 0, y: -16, x: 16 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 0.7, delay: 1.2 }}
      className="absolute sm:-top-12 -top-4 -right-4 lg:-right-8 z-20 hidden sm:block"
      style={{ animation: "float-a 5s ease-in-out infinite" }}
    >
      <div
        className="bg-white rounded-[14px] px-4 py-3 flex items-center gap-3"
        style={{
          boxShadow: "0 12px 40px rgba(1,12,68,0.22)",
          border: "1px solid rgba(1,12,68,0.08)",
        }}
      >
        <div
          className="w-9 h-9 rounded-[10px] flex items-center justify-center"
          style={{ background: "linear-gradient(135deg,#FEC800,#EE6B00)" }}
        >
          <Zap size={15} color="white" />
        </div>
        <div>
          <p className="f-display font-extrabold text-navy text-[15px] leading-none">
            11 Weeks
          </p>
          <p className="f-body text-[11px] text-muted mt-0.5">
            Avg. to Production
          </p>
        </div>
      </div>
    </motion.div>

    {/* Floating Card 2 */}
    <motion.div
      initial={{ opacity: 0, y: 16, x: -16 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 0.7, delay: 1.38 }}
      className="absolute bottom-5 -left-12 lg:left-6 z-20 hidden sm:block"
      style={{ animation: "float-b 6.5s ease-in-out infinite" }}
    >
      <div
        className="bg-white rounded-[14px] px-4 py-3 flex items-center gap-3"
        style={{
          boxShadow: "0 12px 40px rgba(1,12,68,0.22)",
          border: "1px solid rgba(1,12,68,0.08)",
        }}
      >
        <div
          className="w-9 h-9 rounded-[10px] flex items-center justify-center"
          style={{ background: "linear-gradient(135deg,#010C44,#021466)" }}
        >
          <Shield size={15} color="#FEC800" />
        </div>
        <div>
          <p className="f-display font-extrabold text-navy text-[15px] leading-none">
            100% IP
          </p>
          <p className="f-body text-[11px] text-muted mt-0.5">
            Owned by Your Team
          </p>
        </div>
      </div>
    </motion.div>
  </div>
</div>

      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
           style={{ background:'linear-gradient(to bottom,transparent,rgba(248,250,252,0.12))' }} />

      <style>{`
        @keyframes float-a { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-14px) rotate(1.5deg)} }
        @keyframes float-b { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes pulseRing { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(1.65)} }
        @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
      `}</style>
    </section>
  )
}
