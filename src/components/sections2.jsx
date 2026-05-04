import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Target, FileText, TrendingUp, Shield, X, CheckCircle, ArrowRight, ChevronDown, Lock, Clock, Sparkles, Star, Twitter, Linkedin, Github, Mail } from 'lucide-react'
import { CtaBtn, SH, Reveal, Counter, UrgBanner, UrgencyRow, FV } from './shared.jsx'
import goodFirms from "../assets/GoodFirms (1).png";
import rightFirms from "../assets/rightfirms (1).png";
import selectedFirms from "../assets/SelectedFirms (1).png";
import LoadingBar from '../components/LoadingBar.jsx'

/* ═══════════════════════════════════════════════════════════
   PROCESS
═══════════════════════════════════════════════════════════ */
const STEPS = [
  { n:'01', icon:Target,     title:'Tech Strategy Call',          body:'You speak directly with a senior AI engineer, not a sales rep. We review your current AI work, your target use cases, and exactly where your last build or vendor engagement stalled.' },
  { n:'02', icon:FileText,   title:'Scoped Proposal',             body:'Within five business days, we send a fixed-scope proposal with specific AI deliverables, a realistic deployment timeline, and a defined cost range. No vague roadmaps.' },
  { n:'03', icon:TrendingUp, title:'Milestone-Based Execution',   body:'Work runs in defined milestones, each with a deliverable, a review point, and a payment trigger. You always know what is being built, completed, and what comes next.' },
  { n:'04', icon:Shield,     title:'Deployment & IP Transfer',    body:'AI features are deployed into your product and workflows, not handed off as a repository. Full IP transfer. Post-launch support by the same engineers who built the system.' },
]

export function Process() {
  const lineRef = useRef(null)
  const lineInView = useInView(lineRef, { once:true, margin:'-60px' })
  const stepsRef = useRef(null)
  const stepsInView = useInView(stepsRef, { once:true, margin:'-60px' })

  return (
    <section id="process" className="sp" style={{ background:'#F8FAFC' }}>
      <div className="cx">
        <Reveal className="sh mb-16">
          <SH chip="How It Works" h2="How Naveera Ships Generative AI" accent="for Your Team" />
        </Reveal>

        <div ref={stepsRef} className="relative">
          {/* Connector line */}
          <div ref={lineRef} className="hidden lg:block absolute z-0" style={{ top:28, left:'calc(12.5%)', right:'calc(12.5%)', height:2 }}>
            <motion.div className="h-full rounded-full" initial={{ scaleX:0, transformOrigin:'left' }}
              animate={lineInView?{ scaleX:1 }:{}}
              transition={{ duration:1.8, ease:'easeInOut' }}
              style={{ background:'linear-gradient(90deg,#EE6B00,#FEC800)' }} />
          </div>

          <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
            {STEPS.map((s,i)=>(
              <motion.div key={i}
                initial={{ opacity:0, y:44 }}
                animate={stepsInView?{ opacity:1, y:0 }:{}}
                transition={{ duration:0.72, delay:i*0.18, ease:[0.22,1,0.36,1] }}
                className="flex flex-col items-center text-center group">

                <div className="relative mb-6">
                  <motion.div whileHover={{ scale:1.1 }} transition={{ duration:0.25, ease:[0.34,1.56,0.64,1] }}
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ background:'linear-gradient(135deg,#FEC800,#EE6B00)', boxShadow:'0 4px 20px rgba(238,107,0,0.4), 0 0 0 6px rgba(238,107,0,0.08)' }}>
                    <s.icon size={22} color="white" />
                  </motion.div>
                  <motion.div
                    initial={{ rotateY:90, opacity:0 }}
                    animate={stepsInView?{ rotateY:0, opacity:1 }:{}}
                    transition={{ duration:0.5, delay:0.3+i*0.18 }}
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center f-display font-black text-navy text-[9px]"
                    style={{ background:'#FEC800', boxShadow:'0 2px 8px rgba(0,0,0,0.2)' }}>
                    {i+1}
                  </motion.div>
                </div>

                <span className="f-mono text-base sm:text-[9px] font-bold text-orange tracking-[0.16em] mb-2 uppercase">{s.n}</span>
                <h3 className="f-display font-bold text-navy mb-3 leading-snug" style={{ fontSize:17 }}>{s.title}</h3>
                <p className="f-body text-sm text-body leading-relaxed max-w-[350px] sm:max-w-[210px]">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <Reveal delay={0.1} className="flex flex-col items-center gap-3 mt-14">
          <CtaBtn   onClick={() =>
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  } size="lg">See How This Fits Your Stack <ArrowRight size={17} /></CtaBtn>
        </Reveal>

        <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7, delay: 0.75 }}
  className="flex justify-center sm:justify-center mt-3"
>
    {/* <LoadingBar /> */}

</motion.div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   TRUST BADGES
═══════════════════════════════════════════════════════════ */

const BADGES = [
  {
    name: "GoodFirms",
    image: goodFirms,
    desc: "Listed for Generative AI & Production Deployment Capabilities",
  },
  {
    name: "RightFirms",
    image: rightFirms,
    desc: "Featured Among US AI Engineering Firms",
  },
  {
    name: "SelectedFirms",
    image: selectedFirms,
    desc: "Recognized in Modern AI Stack & LLM Services",
  },
];

export function TrustBadges() {
  return (
    <section className="sp-sm bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-7xl mx-auto">
  {BADGES.map((badge, index) => (
    <Reveal key={index} delay={index * 0.1}>
      <motion.div
        initial={{ rotateX: 0, rotateY: 0, y: 0 }}
        whileHover={{
          rotateX: -6,
          rotateY: 6,
          y: -10,
          scale: 1.02,
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative bg-white rounded-2xl border border-gray-100 p-6 text-center group h-[260px] flex flex-col justify-center shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.15)]"
      >
        {/* top glow line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(238,107,0,0.6), transparent)",
            transform: "translateZ(30px)",
          }}
        />

        {/* logo */}
        <div className="flex justify-center mb-5" style={{ transform: "translateZ(40px)" }}>
        <img
  src={badge.image}
  alt={badge.name}
  className="h-28 object-contain transition-transform duration-300 group-hover:scale-110 shadow-lg rounded-md p-2 bg-white"
/>
        </div>

        {/* text */}
        <p
          className="text-gray-600 text-base sm:text-lg leading-relaxed"
          style={{ transform: "translateZ(30px)" }}
        >
          {badge.desc}
        </p>

        {/* subtle floating glow */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-b from-orange-50/40 to-transparent pointer-events-none" />
      </motion.div>
    </Reveal>
  ))}
</div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   COMPARISON
═══════════════════════════════════════════════════════════ */
const ROWS = [
  {
    cap: 'AI in production',
    other: 'Stuck in prototypes or staging',
    nav: 'Deployed into real product workflows',
  },
  {
    cap: 'Ownership of AI systems',
    other: 'Split across model, data, dev vendors',
    nav: 'One team, full accountability',
  },
  {
    cap: 'Model reliability at scale',
    other: 'Untested outside demo conditions',
    nav: 'Validated and monitored in production',
  },
  {
    cap: 'Delivery timelines',
    other: 'Delays from vendor coordination gaps',
    nav: 'Milestone-based, predictable execution',
  },
  {
    cap: 'Integration into live systems',
    other: 'Handed off as code, not deployed',
    nav: 'Integrated and running in your product',
  },
  {
    cap: 'IP ownership and control',
    other: 'Risk of vendor and model lock-in',
    nav: '100% owned by your team from day one',
  },
]

export function Comparison() {
  const tableRef = useRef(null)
  const tableInView = useInView(tableRef, { once: true, margin: '-60px' })

  return (
    <>
<section className="relative py-12 sm:py-24 overflow-hidden bg-surf">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Heading */}
    <div className="text-center max-w-4xl mx-auto mb-16">
      <span className="inline-block px-5 py-2 rounded-full bg-yellow/15 text-sm font-semibold text-navy border border-yellow/30">
        Why Naveera
      </span>

      <h2 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight text-navy">
        Why Leading US Engineering Teams
        <span className="block text-orange">Choose Naveera Tech</span>
      </h2>

      <p className="mt-6 text-lg text-body leading-relaxed">
        Stop stitching together multiple vendors.
        Work with one team that builds, deploys, and owns your AI systems end-to-end.
      </p>
    </div>

    {/* Comparison Cards */}
    <div className="space-y-4">
      {[
        {
          title: 'AI in production',
          other: 'Stuck in prototypes or staging',
          nav: 'Deployed into real product workflows',
        },
        {
          title: 'Ownership of AI systems',
          other: 'Split across model, data, and dev vendors',
          nav: 'One team, full accountability',
        },
        {
          title: 'Model reliability at scale',
          other: 'Untested outside demo conditions',
          nav: 'Validated and monitored in production',
        },
        {
          title: 'Delivery timelines',
          other: 'Delays from vendor coordination gaps',
          nav: 'Milestone-based, predictable execution',
        },
        {
          title: 'Integration into live systems',
          other: 'Handed off as code, not deployed',
          nav: 'Integrated and running in your product',
        },
        {
          title: 'IP ownership and control',
          other: 'Risk of vendor and model lock-in',
          nav: '100% owned by your team from day one',
        },
      ].map((item, index) => (
        <div
          key={index}
          className="grid md:grid-cols-3 gap-5 rounded-3xl p-4 md:p-6 bg-white shadow-xl border border-border-subtle"
        >
          {/* Capability */}
          <div className="flex items-center">
            <h3 className="text-2xl font-bold text-navy">
              {item.title}
            </h3>
          </div>

          {/* Others */}
          <div className="rounded-2xl p-4 bg-surf-2 border border-border-subtle">
            <p className="text-sm font-semibold text-muted mb-2">
              Fragmented vendors
            </p>
            <p className="text-body leading-relaxed">
              {item.other}
            </p>
          </div>

          {/* Naveera */}
          <div className="rounded-2xl p-4 bg-yellow/10 border border-yellow/25">
            <p className="text-sm font-semibold text-orange mb-2">
              Naveera Tech
            </p>
            <p className="font-semibold text-navy leading-relaxed">
              {item.nav}
            </p>
          </div>
        </div>
      ))}
    </div>

    {/* CTA */}
    <div className="mt-20 text-center">
      <div className="inline-block rounded-3xl bg-navy px-4 sm:px-8 py-10 shadow-2xl max-w-3xl">
        <h3 className="text-2xl md:text-3xl font-bold text-white">
          Stop Managing Multiple Vendors.
          <span className="block text-yellow">
            Start Shipping On Time.
          </span>
        </h3>

        <p className="mt-4 text-white/80">
          High-priority teams are scoping their first production AI feature this week.
        </p>

        <button   onClick={() =>
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  } className="mt-8 px-8 py-4 rounded-2xl font-semibold text-white btn-primary transition-all duration-300 hover:scale-105">
          Book Strategy Call
        </button>

        {/* Urgency Bar */}
        <div className="mt-6 flex items-center justify-center gap-2 px-2 sm:px-5 py-3 rounded-full bg-navy-700 text-white text-xs sm:text-sm font-medium shadow-lg mx-auto w-fit border border-white/10">
          <span className="w-2 h-2 rounded-full bg-yellow animate-pulse"></span>
          Only a few implementation slots available this month
        </div>

        <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7, delay: 0.75 }}
  className="flex justify-center sm:justify-center mt-3"
>
    {/* <LoadingBar /> */}

</motion.div>
      </div>
    </div>
  </div>
</section>
    </>
  )
}

/* ═══════════════════════════════════════════════════════════
   LEAD FORM
═══════════════════════════════════════════════════════════ */


/* ═══════════════════════════════════════════════════════════
   FAQ
═══════════════════════════════════════════════════════════ */
const FAQS = [
  { q:'Is this for teams still experimenting with AI, or only for teams already stuck?', a:'This is built for teams that have already tried internal builds, vendors, or pilots and are now stuck in staging, delayed timelines, or broken outputs. If you are still exploring use cases, this may not be the right fit yet, but reach out, and we will tell you honestly.' },
  { q:'Can you work with what we have already built, or do we have to start over?',      a:'In most cases, we work with your existing models, data pipelines, and integrations. If something needs to be rebuilt, we will show you exactly why, based on what is blocking production.' },
  { q:'How fast can we realistically get an AI feature into production?',                a:'Most teams we work with go from scoped to deployed within 8 to 12 weeks, depending on complexity. The focus is always on shipping a working feature first, not extending the roadmap.' },
  { q:'We have already spent heavily on AI vendors. What makes this different?',         a:'Most vendors deliver demos, notebooks, or isolated components. We take ownership of the full system, model, data, integration and ship it inside your product, running in production.' },
  { q:'Who owns the AI system, models, and IP after deployment?',                        a:'You do. 100%. No lock-in, no hidden dependencies, no restrictions. Everything is deployed into your environment and owned by your team.' },
  { q:'Will this add overhead to our engineering team?',                                 a:'No. We reduce it. Instead of your team coordinating across vendors or fixing past builds, we handle execution end-to-end so your engineers can focus on core product work.' },
  { q:'What happens on the strategy call? Is this a sales pitch?',                       a:'No sales layer. You speak directly with a senior AI engineer who reviews your current setup, identifies what is blocking production, and outlines what needs to happen next whether you work with us or not.' },
]

function AccItem({ item, index, isOpen, toggle }) {
  const bodyRef = useRef(null)
  const [h, setH] = useState(0)
  useEffect(() => { if (bodyRef.current) setH(isOpen ? bodyRef.current.scrollHeight : 0) }, [isOpen])
  return (
    <div className={`accord ${isOpen?'open':''}`}>
      <button onClick={()=>toggle(index)} aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left">
        <span className="f-display text-[14px] sm:text-[15px] font-bold text-navy leading-snug">{item.q}</span>
        <motion.div animate={{ rotate:isOpen?180:0 }} transition={{ duration:0.26, ease:[0.22,1,0.36,1] }}
          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
          style={{ background:isOpen?'linear-gradient(135deg,#FEC800,#EE6B00)':'rgba(1,12,68,0.06)', border:isOpen?'none':'1px solid rgba(1,12,68,0.1)' }}>
          <ChevronDown size={14} color={isOpen?'#fff':'#010C44'} />
        </motion.div>
      </button>
      <div style={{ height:h, overflow:'hidden', transition:'height 0.38s cubic-bezier(0.4,0,0.2,1)' }}>
        <div ref={bodyRef} className="px-6 pb-6">
          <p className="f-body text-sm text-body leading-[1.78]">{item.a}</p>
        </div>
      </div>
    </div>
  )
}

export function FAQ() {
  const [open, setOpen] = useState(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once:true, margin:'-60px' })

  return (
    <section id="faq" className="sp" style={{ background:'#F8FAFC' }}>
      <div className="cx-sm">
        <motion.div ref={ref} initial={{ opacity:0, y:36 }} animate={inView?{opacity:1,y:0}:{}}
          transition={{ duration:0.8 }} className="sh mb-12">
          <SH chip="FAQ" h2="Answers to Common Questions" />
        </motion.div>
        <div className="flex flex-col gap-3">
          {FAQS.map((item,i)=>(
            <motion.div key={i} initial={{ opacity:0, y:22 }} animate={inView?{opacity:1,y:0}:{}}
              transition={{ duration:0.58, delay:i*0.07, ease:[0.22,1,0.36,1] }}>
              <AccItem item={item} index={i} isOpen={open===i} toggle={i=>setOpen(p=>p===i?null:i)} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   FINAL CTA
═══════════════════════════════════════════════════════════ */
const LIVE = [
  { text:'A CTO just booked a strategy call',      time:'2m ago',  c:'#EE6B00' },
  { text:'New production deployment completed',     time:'11m ago', c:'#010C44' },
  { text:'Client saved $340K replacing 3 vendors', time:'28m ago', c:'#FEC800' },
  { text:'RAG system shipped into product today',   time:'1h ago',  c:'#EE6B00' },
]

export function FinalCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once:true, margin:'-60px' })
  return (
    <section className="sp relative overflow-hidden" style={{ background:'linear-gradient(160deg,#000830,#010C44 45%,#021466)' }}>
      <div className="absolute inset-0 line-grid-dk pointer-events-none" />
      <div className="absolute inset-0 dot-grid pointer-events-none opacity-25" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[600px] pointer-events-none"
           style={{ background:'radial-gradient(ellipse,rgba(238,107,0,0.13) 0%,transparent 60%)' }} />
      {[500,700].map(s=>(
        <div key={s} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none hidden lg:block"
             style={{ width:s, height:s, border:'1px solid rgba(254,200,0,0.05)' }} />
      ))}
      <div className="cx relative">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">
          <motion.div ref={ref} initial={{ opacity:0, x:-40 }} animate={inView?{opacity:1,x:0}:{}}
            transition={{ duration:0.9, ease:[0.22,1,0.36,1] }}>
            <div className="mb-5">
              <span className="chip chip-navy inline-flex items-center gap-1.5"><Sparkles size={11} />Ready to Ship</span>
            </div>
            <h2 className="f-display font-black text-white mb-5 leading-[0.97]"
                style={{ fontSize:'clamp(38px,5.2vw,66px)', letterSpacing:'-0.04em' }}>
              Ready to Ship AI<br />
              <span className="text-grad-brand">Into Production?</span>
            </h2>
            <p className="t-lead text-white/55 mb-9 max-w-xl">
              A production AI feature in your next sprint review is more valuable than an extended roadmap. We help you find and ship that first feature, then scale from there. From prototype to production. Without rebuilding from scratch.
            </p>
            <div   onClick={() =>
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  } className="flex flex-col items-start gap-3 mb-10">
              <CtaBtn   onClick={() =>
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  } size="lg">Book My Tech Strategy Call <ArrowRight size={17} /></CtaBtn>
              <UrgencyRow text="Limited Tech Consultation Calls Available Per Week" />
              <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7, delay: 0.75 }}
  className="flex justify-center sm:justify-center mt-3"
>
    {/* <LoadingBar /> */}

</motion.div>
            </div>
            <div className="flex flex-wrap gap-7">
              {[['GoodFirms','★★★★★','AI & Production'],['RightFirms','★★★★★','US AI Firms'],['SelectedFirms','★★★★★','LLM Services']].map(([n,r,d])=>(
                <div key={n} className="text-center">
                  <p className="f-display font-bold text-white/60 text-xs mb-0.5">{n}</p>
                  <p className="text-yellow text-sm mb-0.5">{r}</p>
                  <p className="f-body text-[10px] text-white/32">{d}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity:0, x:40 }} animate={inView?{opacity:1,x:0}:{}}
            transition={{ duration:0.9, delay:0.15, ease:[0.22,1,0.36,1] }}
            className="space-y-3">
            <p className="f-mono text-[9px] tracking-[0.18em] text-white/60 uppercase mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ boxShadow:'0 0 8px #22C55E' }} />
              Live Platform Activity
            </p>
            {LIVE.map((a,i)=>(
              <motion.div key={i} initial={{ opacity:0, x:20 }} animate={inView?{opacity:1,x:0}:{}}
                transition={{ duration:0.55, delay:0.3+i*0.1 }}
                whileHover={{ x:4 }}
                className="flex items-center gap-3 rounded-card px-5 py-3.5 card-dark">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ background:a.c, boxShadow:`0 0 10px ${a.c}80` }} />
                <span className="f-body text-sm text-white/65 flex-1">{a.text}</span>
                <span className="f-mono text-[10px] text-white/28 shrink-0">{a.time}</span>
              </motion.div>
            ))}
            <motion.div initial={{ opacity:0, y:16 }} animate={inView?{opacity:1,y:0}:{}}
              transition={{ duration:0.6, delay:0.72 }}
              className="rounded-card p-5 mt-1"
              style={{ background:'rgba(238,107,0,0.08)', border:'1px solid rgba(238,107,0,0.22)' }}>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-[10px] shrink-0 flex items-center justify-center"
                     style={{ background:'rgba(238,107,0,0.2)', border:'1px solid rgba(238,107,0,0.3)' }}>
                  <Sparkles size={16} color="#FEC800" />
                </div>
                <div>
                  <p className="f-display font-bold text-white text-sm mb-1">Full Execution Ownership</p>
                  <p className="f-body text-xs text-white/45 leading-relaxed">One team. One contract. Model, data, integration, and deployment all under your IP.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        <div className="mt-16 h-px max-w-sm mx-auto opacity-20"
             style={{ background:'linear-gradient(90deg,transparent,#FEC800 30%,#EE6B00 70%,transparent)' }} />
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════════ */
const COLS = [
  { title:'Services', links:['Generative AI','RAG Architecture','Fine-Tuned Models','LLM Integration','AI Copilots','Monitoring'] },
  { title:'Company',  links:['About Us','Careers','Blog','Press Kit','Contact'] },
  { title:'Legal',    links:['Privacy Policy','Terms of Service','Cookie Policy','GDPR','Security'] },
]

export function Footer() {
  return (
    <footer style={{ background:'#000830', borderTop:'1px solid rgba(255,255,255,0.06)' }}>
      {/* Newsletter */}
      {/* <div style={{ borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
        <div className="cx py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div>
              <h3 className="f-display font-bold text-white text-lg mb-1">Stay ahead of the curve.</h3>
              <p className="f-body text-sm text-white/40">AI strategy insights, weekly.</p>
            </div>
            <form className="flex gap-2 w-full sm:w-auto" onSubmit={e=>e.preventDefault()}>
              <input type="email" placeholder="your@email.com"
                className="flex-1 sm:w-64 px-4 py-3 rounded-[10px] f-body text-sm text-white placeholder-white/28 outline-none transition-colors"
                style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', fontFamily:"'DM Sans',sans-serif" }}
                onFocus={e=>e.target.style.borderColor='#EE6B00'}
                onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.1)'} />
              <motion.button whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
                className="btn btn-primary px-5 py-3">
                <ArrowRight size={15} />
              </motion.button>
            </form>
          </div>
        </div>
      </div> */}

      {/* Links */}
      {/* <div className="cx py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-[10px] flex items-center justify-center"
                   style={{ background:'linear-gradient(135deg,#FEC800,#EE6B00)' }}>
                <span className="f-display font-black text-white text-sm">N</span>
              </div>
              <div>
                <p className="f-display font-extrabold text-white text-[17px] leading-none">Naveera</p>
                <p className="f-body text-[9px] text-white/35 tracking-[0.2em] uppercase mt-0.5">Technology LLC</p>
              </div>
            </div>
            <p className="f-body text-sm text-white/38 leading-relaxed mb-5 max-w-xs">
              Generative AI from prototype to production. Trusted by 200+ US engineering teams.
            </p>
            <div className="flex gap-3">
              {[Twitter,Linkedin,Github,Mail].map((Icon,i)=>(
                <motion.a key={i} href="#" whileHover={{ scale:1.15, y:-2 }} transition={{ duration:0.18 }}
                  className="w-8 h-8 rounded-[8px] flex items-center justify-center transition-colors"
                  style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)' }}
                  onMouseEnter={e=>e.currentTarget.style.background='rgba(238,107,0,0.15)'}
                  onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,0.05)'}>
                  <Icon size={13} className="text-white/45" />
                </motion.a>
              ))}
            </div>
          </div>
          {COLS.map(col=>(
            <div key={col.title}>
              <h4 className="f-display font-bold text-white/60 text-sm mb-4 tracking-wide">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map(l=>(
                  <li key={l}><a href="#" className="f-body text-sm text-white/30 hover:text-white/65 transition-colors duration-200 block">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div> */}

      <div style={{ borderTop:'1px solid rgba(255,255,255,0.06)' }}>
        <div className="cx py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="f-body text-base text-white/80 text-center sm:text-left">© 2026 Naveera Technology LLC. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ boxShadow:'0 0 8px #22C55E' }} />
            <span className="f-mono text-base text-white/80">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
