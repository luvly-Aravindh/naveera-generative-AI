import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Play, ArrowRight, Database, Bot, Cpu, Zap, BarChart3, Activity, Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { CtaBtn, SH, Reveal, Counter, UrgBanner, UrgencyRow, FV } from './shared.jsx'
import Vimage from '../assets/v.png'
import LoadingBar from '../components/LoadingBar.jsx'

/* ═══════════════════════════════════════════════════════════
   VIDEO SECTION
═══════════════════════════════════════════════════════════ */
export function VideoSection() {
    // PLAYER SCRIPT
    const playerScript = document.createElement("script");
    playerScript.src = "https://fast.wistia.com/player.js";
    playerScript.async = true;

    // EMBED SCRIPT
    const embedScript = document.createElement("script");
    embedScript.src =
      "https://fast.wistia.com/embed/4bj8ydre24.js";
    embedScript.async = true;
    embedScript.type = "module";

    document.body.appendChild(playerScript);
    document.body.appendChild(embedScript);
  return (
    <>
      <section className="sp" style={{ background:'#fff' }}>
        <div className="cx">
          <Reveal className="sh mb-12">
            <SH chip="The Solution"
                h2="Every Quarter You Delay Shipping"
                accent="Is Another Quarter You Fall Behind."
                sub="A production AI feature in your next sprint review is more valuable than an extended roadmap. We help you find and ship that first feature, then scale from there. From prototype to production. Without rebuilding from scratch." />
            <div className="flex justify-center mt-7 gap-3 flex-wrap">
              <CtaBtn   onClick={() =>
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  } size="lg"><span>Book My Tech Strategy Call</span> <ArrowRight size={17} /></CtaBtn>
            </div>
            <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7, delay: 0.75 }}
  className="flex justify-center sm:justify-center mt-4"
>
    {/* <LoadingBar /> */}
      <UrgencyRow text="Limited Tech Consultation Calls Available Per Week" />

</motion.div>
          </Reveal>


    <motion.div
  initial={{ opacity: 0, y: 52, scale: 0.95 }}
  whileInView={{ opacity: 1, y: 0, scale: 1 }}
  viewport={{ once: true, margin: "-60px" }}
  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
  className="relative rounded-[32px] overflow-hidden mx-auto max-w-4xl"
  style={{
    boxShadow: "0 32px 100px rgba(1,12,68,0.22)",
    border: "1px solid rgba(255,255,255,0.08)",
  }}
>

  {/* WISTIA SCRIPTS */}
  <script
    src="https://fast.wistia.com/player.js"
    async
  ></script>

  <script
    src="https://fast.wistia.com/embed/4bj8ydre24.js"
    async
    type="module"
  ></script>

  {/* VIDEO */}
  <div className="w-full aspect-video">

    <wistia-player
      media-id="4bj8ydre24"
      aspect="1.7777777777777777"
      style={{
        width: "100%",
        height: "100%",
        display: "block",
      }}
    ></wistia-player>

  </div>

</motion.div>
        </div>
      </section>
    </>
  )
}

/* ═══════════════════════════════════════════════════════════
   TESTIMONIALS
═══════════════════════════════════════════════════════════ */
const REVIEWS = [
  { quote:"We had burned $800K with another AI vendor. Every deliverable was a Jupyter notebook or a Slack demo. Naveera scoped our actual use case in week one and had our AI assistant live inside the product by week eight. The same board meeting I dreaded became the one I was proud of.", name:'Adam Robinson',  role:'CTO',          co:'Series-B SaaS Platform', badge:'$800K recovered',   color:'#EE6B00' },
  { quote:"Naveera built our production recommendation engine in 11 weeks. It was live in the product before my Series B investor update. That changed everything for the business and positioned us for the next round.", name:'William Hockey', role:'Founder & CEO', co:'AI-First Startup',       badge:'11 wks to prod',   color:'#010C44' },
  { quote:"I was managing three AI vendors, three Slack channels, and three billing systems. None of it was live. Naveera consolidated everything into one execution relationship. I got eight hours a week back and a shipped AI feature within the quarter.", name:'Erik Kostelnik', role:'VP Engineering', co:'Gen-AI Series-B',         badge:'8hrs/wk reclaimed', color:'#FEC800' },
]

export function Testimonials() {
  const [active, setActive] = useState(0)
  const r = REVIEWS[active]
  const ref = useRef(null)
  const inView = useInView(ref, { once:true, margin:'-60px' })

  return (
    <>
      <section className="sp" style={{ background:'#F8FAFC' }}>
        <div className="cx">
          <motion.div ref={ref} initial={{ opacity:0, y:36 }} animate={inView?{opacity:1,y:0}:{}}
            transition={{ duration:0.8 }} className="sh mb-14">
            <SH chip="Client Results"
                h2="See How 200+ US Engineering Teams"
                accent="Stopped Doing Demos and Started Shipping."
                sub={<><strong className="text-navy font-bold">$800K to $1.2M quarterly savings, verified.</strong></>} />
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-6 items-start">
            {/* Sidebar */}
            <div className="hidden lg:flex flex-col gap-3 col-span-2">
              {REVIEWS.map((rv,i)=>(
                <motion.button key={i} onClick={()=>setActive(i)}
                  whileHover={{ x:4 }} transition={{ duration:0.18 }}
                  className="flex items-center gap-3 rounded-card p-4 text-left transition-all duration-200"
                  style={{ background:active===i?'#fff':'rgba(15,23,42,0.02)', border:active===i?`1.5px solid ${rv.color}30`:'1.5px solid rgba(15,23,42,0.07)', boxShadow:active===i?'0 4px 20px rgba(1,12,68,0.08)':'none' }}>
                  <div className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center f-display font-black text-white text-xs"
                       style={{ background:`linear-gradient(135deg,${rv.color},${rv.color}80)` }}>
                    {rv.name.split(' ').map(n=>n[0]).join('')}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={`f-display text-sm font-bold truncate ${active===i?'text-navy':'text-muted'}`}>{rv.name}</p>
                    <p className="f-body text-xs text-muted truncate">{rv.role} · {rv.co}</p>
                  </div>
                  {active===i && <motion.span layoutId="t-dot" className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background:rv.color }} />}
                </motion.button>
              ))}
            </div>

            {/* Main card */}
            <div className="col-span-3">
              <AnimatePresence mode="wait">
                <motion.div key={active}
                  initial={{ opacity:0, y:20, scale:0.97 }}
                  animate={{ opacity:1, y:0, scale:1 }}
                  exit={{ opacity:0, y:-14, scale:0.97 }}
                  transition={{ duration:0.4, ease:[0.22,1,0.36,1] }}
                  className="bg-white rounded-card-lg p-8 sm:p-10 relative overflow-hidden"
                  style={{ border:`1.5px solid ${r.color}20`, boxShadow:`0 8px 48px rgba(1,12,68,0.08)` }}>

                  <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-card-lg"
                       style={{ background:`linear-gradient(90deg,${r.color},transparent)` }} />
                  <div className="absolute top-0 right-0 w-56 h-48 pointer-events-none"
                       style={{ background:`radial-gradient(circle,${r.color}07 0%,transparent 70%)` }} />

                  <div className="flex gap-0.5 mb-5">
                    {Array.from({length:5}).map((_,j)=><Star key={j} size={13} style={{ color:'#FEC800', fill:'#FEC800' }} />)}
                  </div>
                  <Quote size={32} style={{ color:`${r.color}25` }} className="mb-3" />
                  <p className="f-body text-[15px] text-body/80 leading-[1.78] italic mb-7">"{r.quote}"</p>

                  <div className="flex items-center justify-between pt-5" style={{ borderTop:'1px solid rgba(15,23,42,0.07)' }}>
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center f-display font-black text-white text-sm"
                           style={{ background:`linear-gradient(135deg,${r.color},${r.color}80)` }}>
                        {r.name.split(' ').map(n=>n[0]).join('')}
                      </div>
                      <div>
                        <p className="f-display font-bold text-navy text-[15px]">{r.name}</p>
                        <p className="f-body text-xs text-muted">{r.role} · {r.co}</p>
                      </div>
                    </div>
                    <span className="f-display text-[11px] font-bold px-3 py-1.5 rounded-pill hidden sm:inline"
                          style={{ color:r.color, background:`${r.color}0F`, border:`1px solid ${r.color}22` }}>
                      {r.badge}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Mobile controls */}
              <div className="lg:hidden flex items-center justify-between mt-5">
                <div className="flex gap-2">
                  {REVIEWS.map((_,i)=>(
                    <button key={i} onClick={()=>setActive(i)}
                      className="h-2 rounded-pill transition-all duration-250"
                      style={{ width:active===i?20:8, background:active===i?'#EE6B00':'rgba(1,12,68,0.2)' }} />
                  ))}
                </div>
                <div className="flex gap-2">
                  {[ChevronLeft,ChevronRight].map((Icon,j)=>(
                    <motion.button key={j} whileHover={{ scale:1.1 }} whileTap={{ scale:0.9 }}
                      onClick={()=>setActive(i=>(i+(j?1:-1)+REVIEWS.length)%REVIEWS.length)}
                      className="w-9 h-9 rounded-full flex items-center justify-center"
                      style={{ background:'rgba(1,12,68,0.06)', border:'1px solid rgba(1,12,68,0.1)' }}>
                      <Icon size={15} className="text-navy/60" />
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Reveal delay={0.1} className="flex flex-col items-center gap-3 mt-10">
            <CtaBtn   onClick={() =>
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  } size="lg">Join 500+ Tech Leaders Already Winning <ArrowRight size={17} /></CtaBtn>
          </Reveal>

          <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7, delay: 0.75 }}
  className="flex justify-center sm:justify-center mt-3"
>
    {/* <LoadingBar /> */}
          <UrgencyRow text="Limited Tech Consultation Calls Available Per Week" />

</motion.div>
        </div>
      </section>
    </>
  )
}

/* ═══════════════════════════════════════════════════════════
   SERVICES
═══════════════════════════════════════════════════════════ */
const SERVICES = [
  { icon:Database,  title:'RAG Architecture',         body:'Built on your proprietary data, not generic LLM wrappers. Purpose-scoped retrieval that performs at scale in production.',               tag:'Core Infra'  },
  { icon:Bot,       title:'AI Copilots & Assistants', body:'Integrated directly into your product UI and workflows not standalone tools your team ignores.',                                       tag:'Product'     },
  { icon:Cpu,       title:'Fine-Tuned Models',        body:'Trained on your domain with measurable output quality. Accuracy benchmarked against your real business KPIs, not benchmark datasets.',  tag:'ML'          },
  { icon:Zap,       title:'LLM Integration & Safety', body:'Hallucination mitigation and output validation built in from day one. Enterprise-grade reliability out of the box.',                     tag:'Safety'      },
  { icon:BarChart3, title:'KPI Evaluation',           body:'Measure model performance against the metrics that matter to your product team, not just abstract accuracy benchmarks.',                 tag:'Measurement' },
  { icon:Activity,  title:'Monitoring & Retraining',  body:'Ongoing monitoring and retraining pipelines so performance holds post-launch not just on demo day.',                                   tag:'Post-Launch' },
]

function SvcCard({ s, i }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once:true, margin:'-60px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity:0, y:48, scale:0.93 }}
      animate={inView?{ opacity:1, y:0, scale:1 }:{}}
      transition={{ duration:0.72, delay:i*0.09, ease:[0.22,1,0.36,1] }}
      whileHover={{ y:-5 }}
      className="card-surf p-7 group"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-card pointer-events-none"
           style={{ background:'radial-gradient(circle at top left,rgba(238,107,0,0.04) 0%,transparent 60%)' }} />
      <div className="flex items-start justify-between mb-5">
        <div className="icon-box">
          <s.icon size={20} color="#FEC800" />
        </div>
        <span className="chip chip-soft text-[9px]">{s.tag}</span>
      </div>
      <h3 className="f-display font-bold text-navy mb-3 leading-snug group-hover:text-orange transition-colors duration-200"
          style={{ fontSize:'17px' }}>
        {s.title}
      </h3>
      <p className="f-body text-sm text-body leading-relaxed mb-4">{s.body}</p>
      {/* <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
        <span className="f-display text-xs font-bold text-orange">Learn more</span>
        <ArrowRight size={11} color="#EE6B00" />
      </div> */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-card scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"
           style={{ background:'linear-gradient(90deg,#EE6B00,#FEC800)' }} />
    </motion.div>
  )
}

export function Services() {
  return (
    <>
      <section id="services" className="sp" style={{ background:'#fff' }}>
        <div className="cx">
          <Reveal className="sh mb-12">
            <SH chip="What We Build"
                h2="What Naveera Tech Builds"
                accent="for Your Product"
                sub="Every engagement is scoped around a specific, shippable AI outcome. Here is what we build." />
          </Reveal>
          <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {SERVICES.map((s,i)=><SvcCard key={i} s={s} i={i} />)}
          </div>
          <Reveal className="flex flex-col items-center gap-3">
            <CtaBtn   onClick={() =>
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  } size="lg">See How This Would Work for Your Stack <ArrowRight size={17} /></CtaBtn>
        <UrgencyRow text="High-priority teams are scoping their first AI-product" />

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
    </>
  )
}

/* ═══════════════════════════════════════════════════════════
   RESULTS
═══════════════════════════════════════════════════════════ */
const METRICS = [
  { num:11,  unit:'wks', label:'Average time from scoping to production AI feature deployment across our last 40 engagements'    },
  { num:3,   unit:'×',   label:'Faster AI rollout vs. teams rebuilding with new vendors after a failed first attempt'            },
  { num:70,  unit:'%+',  label:'Reduction in manual work in workflows where AI automation was successfully deployed'              },
  { num:2,   unit:'×',   label:'Increase in engineering output on core product once AI infrastructure is off their plate'        },
  { num:100, unit:'%',   label:'Ownership of AI systems, models, and IP with zero vendor lock-in'                                },
]

function MetCard({ m, i }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once:true, margin:'-60px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity:0, y:44, scale:0.9 }}
      animate={inView?{ opacity:1, y:0, scale:1 }:{}}
      transition={{ duration:0.72, delay:i*0.1, ease:[0.22,1,0.36,1] }}
      whileHover={{ y:-3 }}
      className="card-dark p-7 text-center group cursor-default"
    >
      <div className="flex items-end justify-center gap-0.5 mb-4 leading-none">
        <span className="f-display font-black"
          style={{ fontSize:'clamp(42px,5vw,60px)', background:'linear-gradient(135deg,#FEC800,#EE6B00)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
          {inView ? <Counter end={m.num} /> : '0'}
        </span>
        <span className="f-display font-black pb-2"
          style={{ fontSize:'clamp(24px,3vw,36px)', background:'linear-gradient(135deg,#FEC800,#EE6B00)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
          {m.unit}
        </span>
      </div>
      <div className="w-8 h-px mx-auto mb-4 group-hover:w-14 transition-all duration-300"
           style={{ background:'linear-gradient(90deg,#FEC800,#EE6B00)' }} />
      <p className="f-body text-[12px] text-white/50 leading-relaxed max-w-[180px] mx-auto">{m.label}</p>
    </motion.div>
  )
}

export function Results() {
  const ref = useRef(null)
  const inView = useInView(ref, { once:true, margin:'-60px' })
  return (
    <section id="results" className="sp relative overflow-hidden" style={{ background:'linear-gradient(160deg,#000830,#010C44 50%,#021466)' }}>
      <div className="absolute inset-0 line-grid-dk pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none"
           style={{ background:'radial-gradient(ellipse at top,rgba(238,107,0,0.12) 0%,transparent 60%)' }} />
      <div className="cx relative">
        <motion.div ref={ref} initial={{ opacity:0, y:36 }} animate={inView?{opacity:1,y:0}:{}}
          transition={{ duration:0.8 }} className="sh mb-14">
          <SH light chip="Measured Impact" h2="What Engineering Teams See" accent="After Deploying Generative AI" />
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {METRICS.map((m,i)=><MetCard key={i} m={m} i={i} />)}
        </div>
      </div>
    </section>
  )
}
