import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { AlertCircle, Layers, Activity, Package, ArrowRight } from 'lucide-react'
import { CtaBtn, UrgencyRow, SH, Reveal, StaggerReveal, FV } from './shared.jsx'
import LoadingBar from '../components/LoadingBar.jsx'

const CARDS = [
  { icon:AlertCircle, color:'#EE6B00', tag:'Execution Gap',  title:'AI Still Not In Your Product',        body:'Significant time and budget spent, but AI still doesn\'t live in the product. Every sprint ends with a promise, not a deployment.' },
  { icon:Layers,      color:'#010C44', tag:'Vendor Chaos',   title:'No Clear Ownership When Things Break', body:'Multiple vendors or systems with no clear accountability. You end up as the glue between their gaps and nothing gets shipped.' },
  { icon:Activity,    color:'#EE6B00', tag:'Staging Hell',   title:'LLM Integrations Stuck in Staging',    body:'LLM integrations that never escape staging. They block new initiatives and keep your entire roadmap locked on past debt.' },
  { icon:Package,     color:'#010C44', tag:'Tech Debt',      title:'Teams Fixing Old Builds',              body:'Your best engineers patch past AI builds instead of shipping new features. That is the real cost of a failed AI vendor.' },
]

function PainCard({ c, i }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once:true, margin:'-60px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity:0, y:48, scale:0.94 }}
      animate={inView ? { opacity:1, y:0, scale:1 } : {}}
      transition={{ duration:0.72, delay:i*0.1, ease:[0.22,1,0.36,1] }}
      whileHover={{ y:-5 }}
      className="card p-7 group"
    >
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-card"
           style={{ background:`linear-gradient(90deg,transparent,${c.color}70,transparent)` }} />

      <div className="flex items-start justify-between mb-5">
        <div className="icon-box-sm" style={{ background:`${c.color}10`, borderColor:`${c.color}25` }}>
          <c.icon size={18} style={{ color:c.color }} />
        </div>
        <span className="chip-soft chip text-[9px]">{c.tag}</span>
      </div>

      <h3 className="f-display font-bold t-h3 text-navy mb-3 leading-snug group-hover:text-orange transition-colors duration-200">
        {c.title}
      </h3>
      <p className="f-body text-sm text-body leading-relaxed">{c.body}</p>

      {/* Bottom hover reveal */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 rounded-b-card"
           style={{ background:`linear-gradient(90deg,${c.color},${c.color}40,transparent)` }} />
    </motion.div>
  )
}

export default function PainPoints() {
  return (
    <section className="sp" style={{ background:'#F8FAFC' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="sh mb-12">
          <SH chip="The Problem"
              h2="Every CTO and Founder We Speak To"
              accent="Comes In With the Same Experience."
              sub="If any of these feel familiar, a 30-minute technical review will show you exactly what is blocking deployment and what it takes to move forward." />
        </Reveal>

        <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {CARDS.map((c,i) => <PainCard key={i} c={c} i={i} />)}
        </div>

        <Reveal className="flex flex-col items-center gap-3">
          <CtaBtn   onClick={() =>
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  } size="lg">
            Show Me What's Slowing Us Down <ArrowRight size={17} />
          </CtaBtn>
          <UrgencyRow text="3 Spots Left · 30-Minute Technical Deep Dive Call" />
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
