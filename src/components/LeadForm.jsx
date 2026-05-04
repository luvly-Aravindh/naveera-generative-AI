import { useState, useEffect } from "react"
import { Lock, Clock, Shield } from "lucide-react"

const API_URL = "https://getnos.io/naveera-generative-AI/index.php"
const THANK_YOU_URL = "https://getnos.io/naveera-generative-AI/thank-you.html"

export default function LeadForm() {

  const [formData, setFormData] = useState({
    name: "", // ✅ FIXED (was firstName/lastName)
    email: "",
    company: "",
    challenge: "",
    details: "",
  })

  const [step, setStep] = useState("form")
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [timer, setTimer] = useState(0)

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // ================= TIMER =================
  useEffect(() => {
    if (timer <= 0) return
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [timer])

  // ================= VALIDATION =================
  const validateForm = () => {
    if (!formData.name.trim()) return "Full Name is required"
    if (!formData.email.trim()) return "Email is required"

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) return "Invalid email format"

    if (!formData.company.trim()) return "Company is required"
    if (!formData.challenge.trim()) return "Challenge is required"

    return null
  }

  // ================= SEND OTP =================
  const sendOtp = async (e) => {
    if (e) e.preventDefault()
    if (loading) return

    const error = validateForm()
    if (error) {
      setMessage(error)
      return
    }

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
        setTimer(30) // ✅ resend timer
      } else {
        setMessage(data.message || "Failed to send OTP")
      }
    } catch {
      setMessage("Server error. Please try again.")
    }

    setLoading(false)
  }

  // ================= VERIFY OTP =================
  const verifyOtp = async () => {

    if (otp.length !== 6) {
      setMessage("Enter valid 6-digit OTP")
      return
    }

    setLoading(true)
    setMessage("")

    const payload = new FormData()
    payload.append("action", "verify_otp")
    payload.append("otp", otp)

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
            architecture and outline a specific path forward.
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

          {/* ================= FORM ================= */}
          {step === "form" && (
            <form onSubmit={sendOtp}>

              <div className="grid sm:grid-cols-2 gap-5 mb-5">

                <div className="sm:col-span-2">
                  <label className="field-label">
                    Full Name <span className="text-orange-500">*</span>
                  </label>
                  <input
                    name="name"
                    type="text"
                    value={formData.name}
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
                    What's your biggest data infrastructure challenge right now? <span className="text-orange-500">*</span>
                  </label>
                  <input
                    name="challenge"
                    type="text"
                    value={formData.challenge}
                    onChange={handleChange}
                    className="field"
                    placeholder="e.g. Pipelines failing under load, multiple disconnected vendors"
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
                    placeholder="Describe your current data stack, where it's breaking, and what outcome you are targeting..."
                  />
                </div>

              </div>

              <div className="flex flex-wrap items-center gap-4 mb-6 py-4 px-5 rounded-xl bg-gray-50 border">
                <div className="flex items-center gap-2">
                  <Lock size={12} /> <span className="text-xs font-semibold">No SDR hand-off</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={12} /> <span className="text-xs font-semibold">30-min call only</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield size={12} /> <span className="text-xs font-semibold">100% confidential</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Sending OTP..." : "Book My Strategy Call"}
              </button>

            </form>
          )}

          {/* ================= OTP ================= */}
          {step === "otp" && (
            <div className="text-center">

              <h3 className="text-2xl font-bold mb-4">
                Verify Your Email
              </h3>

              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                className="field mb-4 text-center tracking-widest"
                placeholder="Enter OTP"
                maxLength={6}
              />

              <button onClick={verifyOtp} className="btn btn-primary w-full">
                {loading ? "Verifying..." : "Verify OTP"}
              </button>

              <button
                type="button"
                onClick={sendOtp}
                disabled={timer > 0}
                className="text-sm underline mt-4"
              >
                {timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
              </button>

            </div>
          )}

          {/* ================= MESSAGE ================= */}
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
