import { motion } from "framer-motion";
import { Brain, Lightbulb, ShieldCheck, Layers, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Consultative Approach",
    desc: "Our consultants work with you to define a clear GenAI roadmap, identifying the right tools, data strategy, and delivery path to solve your specific challenges.",
  },
  {
    icon: Lightbulb,
    title: "Intelligent Solutions",
    desc: "We replace costly, siloed systems with robust GenAI pipelines. Our teams analyze your data landscape and implement scalable, full lifecycle AI solutions.",
  },
  {
    icon: ShieldCheck,
    title: "Operational Excellence",
    desc: "We ensure high availability and data integrity across your AI systems, minimizing downtime and keeping your infrastructure reliable, current, and scalable.",
  },
  {
    icon: Layers,
    title: "Flexible Delivery Models",
    desc: "From rapid implementation to cloud migration and ongoing AI modernization, our delivery models are tailored to your business needs.",
  },
];

export default function GenAISection() {
  return (
    <section
      className="relative overflow-hidden py-24 sm:px-6 px-2"
      style={{
        background:
          "linear-gradient(160deg, #000830, #010C44 50%, #021466)",
      }}
    >
      {/* Grid */}
      <div className="absolute inset-0 line-grid-dk pointer-events-none" />

      {/* Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(238,107,0,0.12) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative">

        {/* Header */}
        <div className="max-w-4xl mx-auto mb-16 text-white text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold leading-tight"
          >
            Why US Tech Teams Partner with{" "}
            <span className="text-orange-400">
              Naveera Tech for Generative AI Execution
            </span>
          </motion.h2>

          <p className="text-blue-200 mt-6 text-lg leading-relaxed">
            Our GenAI approach blends{" "}
            <span className="text-orange-400 font-semibold">
              60% human intelligence
            </span>{" "}
            with{" "}
            <span className="text-orange-400 font-semibold">
              40% AI acceleration
            </span>
            , delivering human-led outcomes at a more cost-effective rate than
            traditional AI tools. Senior engineers guide architecture, strategy,
            and quality assurance at every stage, while AI reduces overhead and
            accelerates execution.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 flex gap-5 items-start shadow-xl hover:bg-white/10 hover:border-orange-400/40 transition"
              >
                <div className="min-w-[52px] h-[52px] flex items-center justify-center rounded-xl bg-[#ff8520] text-white shadow-md group-hover:scale-110 transition">
                  <Icon size={24} />
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-orange-300 transition">
                    {item.title}
                  </h3>
                  <p className="text-blue-200 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          >
            <button
              onClick={() =>
                document.getElementById("contact")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
              }
              className="inline-flex items-center btn btn-primary btn-primary-lg px-10 py-4 w-full sm:w-auto justify-center"
            >
              Book Your Tech Strategy Call
              <ArrowRight size={17} />
            </button>
          </motion.div>
        </div>

      </div>
    </section>
  );
}