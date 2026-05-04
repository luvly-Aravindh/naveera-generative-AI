import { useState } from "react"
import { Lock, Clock, Shield } from "lucide-react"

const API_URL = "https://getnos.io/naveera-generative-AI/index.php"
const THANK_YOU_URL = "https://getnos.io/naveera-generative-AI/thank-you.html"

export default function LeadForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    challenge: "",
    details: "",
  })

  const [step, setStep] = useState("form")
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const sendOtp = async (e) => {
    if (e) e.preventDefault()

    setLoading(true)
    setMessage("")

    const payload = new FormData()
    payload.append("action", "send_otp")

    Object.entries(formData).forEach(([key, value]) => {
      payload.append(key, value)
    })

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: payload,
      })

      const data = await response.json()

      if (data.status === "success") {
        setStep("otp")
        setMessage("OTP sent to your email")
      } else {
        setMessage(data.message || "Failed to send OTP")
      }
    } catch {
      setMessage("Server error. Please try again.")
    }

    setLoading(false)
  }

  const verifyOtp = async () => {
    setLoading(true)
    setMessage("")

    const payload = new FormData()
    payload.append("action", "verify_otp")
    payload.append("email", formData.email.trim())
    payload.append("otp", otp.trim())

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: payload,
      })

      const data = await response.json()

      if (data.status === "success") {
        window.location.href = THANK_YOU_URL
      } else {
        setMessage(data.message || "Invalid OTP")
      }
    } catch {
      setMessage("Verification failed")
    }

    setLoading(false)
  }

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="sh mb-12">
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <span className="chip">Get Started</span>
          </div>

          <h2 className="f-display font-extrabold t-h2 mb-4 text-navy">
            Get a Direct Technical Breakdown
            <br />
            <span className="text-grad-brand">
              of What Is Blocking Your AI Rollout
            </span>
          </h2>

          <p className="t-lead max-w-2xl mx-auto text-body">
            In 30 minutes, our engineering team will review your current AI
            architecture, identify what is preventing production deployment,
            and outline a specific path forward. No sales pitch just a direct
            technical assessment from someone who has shipped Generative AI
            in production before.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6">
        <div
          className="bg-white rounded-2xl p-8"
          style={{
            boxShadow: "0 4px 40px rgba(1,12,68,0.09)",
            border: "1px solid rgba(15,23,42,0.07)",
          }}
        >
          {step === "form" && (
            <form onSubmit={sendOtp}>
              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <div className="sm:col-span-2">
                  <label className="field-label">
                  Full Name <span className="text-orange-500">*</span>
                  </label>
                  <input
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="field"
                    placeholder="Alex Warren"
                    required
                  />
                </div>

                <div>
                  <label className="field-label">
                    Work Email <span className="text-orange-500">*</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="field"
                    placeholder="alex@company.com"
                    required
                  />
                </div>

                <div>
                  <label className="field-label">
                    Company <span className="text-orange-500">*</span>
                  </label>
                  <input
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    className="field"
                    placeholder="Acme Inc."
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="field-label">
                    What is your biggest Gen AI delivery challenge right now?
                    <span className="text-orange-500">*</span>
                  </label>
                  <input
                    name="challenge"
                    type="text"
                    value={formData.challenge}
                    onChange={handleChange}
                    className="field"
                    placeholder="e.g. LLM stuck in staging after 6 months"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="field-label">
                    Tell us about your requirement
                  </label>
                  <textarea
                    name="details"
                    rows="4"
                    value={formData.details}
                    onChange={handleChange}
                    className="field"
                    placeholder="Describe your current AI setup, what you have tried, and what outcome you are targeting..."
                  />
                </div>
              </div>

              <div
                className="flex flex-wrap items-center gap-4 mb-6 py-4 px-5 rounded-xl"
                style={{
                  background: "#F8FAFC",
                  border: "1px solid rgba(15,23,42,0.07)",
                }}
              >
                <div className="flex items-center gap-2">
                  <Lock size={12} color="#EE6B00" />
                  <span className="text-xs font-semibold">
                    No SDR hand-off
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock size={12} color="#EE6B00" />
                  <span className="text-xs font-semibold">
                    30-min call only
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Shield size={12} color="#EE6B00" />
                  <span className="text-xs font-semibold">
                    100% confidential
                  </span>
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-full">
                {loading ? "Sending OTP..." : "Book My Strategy Call"}
              </button>
            </form>
          )}

          {step === "otp" && (
            <div className="text-center">
              <h3 className="text-2xl font-bold text-[#17303F] mb-4">
                Verify Your Email
              </h3>

              <p className="text-sm text-gray-500 mb-5">
                Enter the 6-digit OTP sent to your email.
              </p>

              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="field mb-4"
                placeholder="Enter OTP"
                maxLength={6}
              />

              <button
                onClick={verifyOtp}
                className="btn btn-primary w-full"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>

              <button
                type="button"
                onClick={sendOtp}
                className="text-sm underline mt-4"
              >
                Resend OTP
              </button>
            </div>
          )}

          {message && (
            <p className="text-center text-red-500 mt-4">
              {message}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
