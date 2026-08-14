import { useState, useRef } from "react"
import { Lock, Clock, Shield } from "lucide-react"

/* ============================================================
   GETNOS DESK
   The only backend. Form validates, posts once, redirects.

   SECURITY: this key ships inside the public JS bundle and is
   readable by anyone with devtools. Anyone who reads it can post
   unlimited leads into Desk from any machine. Move this call
   behind a server route before running paid traffic.
   ============================================================ */
const DESK_URL = "https://deskbackend.getnos.io/v1/lead"
const DESK_API_KEY = "lh_JUE1b_iJefN42_Hjh0rtT1HhzteViSe1Xg7F-BwaRUc"

/* Campaign label on the lead. Change this one line per campaign. */
const LEAD_SOURCE = "generative-ai"

const THANK_YOU_URL = "https://calendly.com/naveenkumar-m-naveeratech/discovery_call"

/* ============================================================
   BUSINESS EMAIL GATE
   Free consumer inboxes and disposable domains are rejected.
   Add to FREE_DOMAINS for a single domain, or to FREE_FAMILIES
   for a provider that runs many country variants.
   ============================================================ */
const FREE_FAMILIES = [
  "gmail.", "googlemail.", "yahoo.", "ymail.", "rocketmail.",
  "hotmail.", "outlook.", "live.", "msn.", "passport.",
  "aol.", "icloud.", "me.com", "mac.com",
  "proton.", "protonmail.", "gmx.", "yandex.", "mail.ru",
  "rediffmail.", "rediff.", "zoho.com", "zohomail.com",
]

const FREE_DOMAINS = new Set([
  "mail.com", "email.com", "inbox.com", "fastmail.com", "hushmail.com",
  "tutanota.com", "tuta.io", "gmx.net", "web.de", "t-online.de",
  "sify.com", "indiatimes.com", "in.com", "vsnl.net", "bsnl.in",
  "qq.com", "163.com", "126.com", "naver.com", "daum.net",
])

const DISPOSABLE = [
  "mailinator", "10minutemail", "guerrillamail", "sharklasers", "yopmail",
  "temp-mail", "tempmail", "throwaway", "trashmail", "dispostable",
  "getnada", "maildrop", "mailnesia", "fakeinbox", "spamgourmet",
  "moakt", "emailondeck", "mohmal", "burnermail", "grr.la",
]

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_RE = /^[6-9]\d{9}$/
const WEBSITE_RE =
  /^(https?:\/\/)?(www\.)?[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*\.[a-z]{2,}(:\d{2,5})?([/?#][^\s]*)?$/i

/* Strip everything that is not a digit, then unwrap a pasted +91 or a
   leading 0 so a copied contact still passes. Deliberately does NOT
   truncate: an 11 digit typo has to reach validation and be rejected,
   not get quietly cut down to something that looks valid. */
const phoneDigits = (raw) => {
  let d = String(raw || "").replace(/\D/g, "")
  if (d.length > 10 && d.startsWith("91")) d = d.slice(2)
  if (d.length === 11 && d.startsWith("0")) d = d.slice(1)
  return d
}

/* Input handler only. Caps the field at 10 so typing cannot overflow. */
const sanitizePhone = (raw) => phoneDigits(raw).slice(0, 10)

const normalizeWebsite = (raw) => {
  const v = String(raw || "").trim()
  if (!v) return ""
  return /^https?:\/\//i.test(v) ? v : "https://" + v
}

/* Bare registrable domain from the website, used as the company label. */
const domainOf = (url) =>
  String(url || "")
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .split(/[/?#:]/)[0]
    .toLowerCase()

const isFreeEmail = (email) => {
  const domain = String(email).split("@")[1]
  if (!domain) return false
  const d = domain.toLowerCase()
  if (FREE_DOMAINS.has(d)) return true
  if (FREE_FAMILIES.some((f) => d === f.replace(/\.$/, "") || d.startsWith(f))) return true
  if (DISPOSABLE.some((f) => d.includes(f))) return true
  return false
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export default function LeadForm() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
  })

  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [hp, setHp] = useState("")     // honeypot, humans never fill this
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const submitting = useRef(false)     // survives re-renders, blocks double posts

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    const { name, value } = e.target
    const next = name === "phone" ? sanitizePhone(value) : value

    setFormData((prev) => ({ ...prev, [name]: next }))

    // Clear a field error the moment the value becomes valid again.
    if (errors[name]) {
      const err = validateField(name, next)
      if (!err) setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
  }

  // ================= VALIDATION =================
  const validateField = (name, rawValue) => {
    const value = String(rawValue || "").trim()

    if (name === "name") {
      if (!value) return "Full name is required"
      if (value.length < 2) return "Enter your full name"
      if (!/[a-z]/i.test(value)) return "Enter a valid name"
      return ""
    }

    if (name === "email") {
      if (!value) return "Business email is required"
      if (!EMAIL_RE.test(value)) return "Enter a valid email address"
      if (isFreeEmail(value)) return "Please use your business email, not a personal inbox"
      return ""
    }

    if (name === "phone") {
      const d = phoneDigits(value)
      if (!d) return "Phone number is required"
      if (d.length !== 10) return "Phone number must be exactly 10 digits"
      if (!PHONE_RE.test(d)) return "Number must start with 6, 7, 8 or 9"
      return ""
    }

    if (name === "website") {
      if (!value) return "Website is required"
      if (/\s/.test(value)) return "Website cannot contain spaces"
      if (!WEBSITE_RE.test(value)) return "Enter a valid website, for example acme.com"
      return ""
    }

    return ""
  }

  const validateForm = () => {
    const next = {}
    Object.keys(formData).forEach((key) => {
      const err = validateField(key, formData[key])
      if (err) next[key] = err
    })
    return next
  }

  // ================= POST TO DESK =================
  const pushToDesk = async () => {
    const website = normalizeWebsite(formData.website)

    const res = await fetch(DESK_URL, {
      method: "POST",
      keepalive: true, // lets the request finish after the redirect fires
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${DESK_API_KEY}`,
      },
      body: JSON.stringify({
        form: "contact",
        source: LEAD_SOURCE,
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: phoneDigits(formData.phone),
        website,
        company: domainOf(website),
        honeypot: hp,
      }),
    })

    const data = await res.json().catch(() => ({}))

    // Desk returns duplicate:true when the same lead posts again inside ~15 min.
    if (data.duplicate) return data
    if (!res.ok) throw new Error(data.message || `Desk responded ${res.status}`)
    return data
  }

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    if (e) e.preventDefault()
    if (submitting.current) return

    // Honeypot: a bot fills every input it finds. Send it nowhere useful.
    if (hp.trim()) {
      window.location.href = THANK_YOU_URL
      return
    }

    const found = validateForm()
    setErrors(found)
    setTouched({ name: true, email: true, phone: true, website: true })

    const firstBad = Object.keys(found)[0]
    if (firstBad) {
      setMessage("")
      const el = document.querySelector(`[name="${firstBad}"]`)
      if (el) {
        el.focus()
        el.scrollIntoView({ behavior: "smooth", block: "center" })
      }
      return
    }

    submitting.current = true
    setLoading(true)
    setMessage("")

    // One retry, then send them through regardless. The booking is the
    // conversion, so a Desk outage must never block the calendar.
    try {
      await pushToDesk()
    } catch (first) {
      console.error("[desk] attempt 1 failed:", first)
      await sleep(1200)
      try {
        await pushToDesk()
      } catch (second) {
        console.error("[desk] attempt 2 failed, sending to booking anyway:", second)
      }
    }

    window.location.href = THANK_YOU_URL
  }

  // Red border only once the field has been visited, so the form does not
  // look broken before the visitor has typed anything.
  const fieldStyle = (name) =>
    touched[name] && errors[name] ? { borderColor: "#ef4444" } : undefined

  const FieldError = ({ name }) =>
    touched[name] && errors[name] ? (
      <p id={`err-${name}`} className="text-xs text-red-500 mt-1.5">
        {errors[name]}
      </p>
    ) : null

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

          <form onSubmit={handleSubmit} noValidate>

            <div className="grid sm:grid-cols-2 gap-5 mb-5">

              <div className="sm:col-span-2">
                <label htmlFor="lf-name" className="field-label">
                  Name <span className="text-orange-500">*</span>
                </label>
                <input
                  id="lf-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={loading}
                  aria-invalid={Boolean(touched.name && errors.name)}
                  aria-describedby={touched.name && errors.name ? "err-name" : undefined}
                  style={fieldStyle("name")}
                  className="field"
                  placeholder="Alex Warren"
                />
                <FieldError name="name" />
              </div>

              <div>
                <label htmlFor="lf-email" className="field-label">
                  Business Email <span className="text-orange-500">*</span>
                </label>
                <input
                  id="lf-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={loading}
                  aria-invalid={Boolean(touched.email && errors.email)}
                  aria-describedby={touched.email && errors.email ? "err-email" : undefined}
                  style={fieldStyle("email")}
                  className="field"
                  placeholder="alex@company.com"
                />
                <FieldError name="email" />
              </div>

              <div>
                <label htmlFor="lf-phone" className="field-label">
                  Phone Number <span className="text-orange-500">*</span>
                </label>
                <input
                  id="lf-phone"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  maxLength={10}
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={loading}
                  aria-invalid={Boolean(touched.phone && errors.phone)}
                  aria-describedby={touched.phone && errors.phone ? "err-phone" : undefined}
                  style={fieldStyle("phone")}
                  className="field"
                  placeholder="9876543210"
                />
                <FieldError name="phone" />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="lf-website" className="field-label">
                  Website <span className="text-orange-500">*</span>
                </label>
                <input
                  id="lf-website"
                  name="website"
                  type="text"
                  autoComplete="url"
                  value={formData.website}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={loading}
                  aria-invalid={Boolean(touched.website && errors.website)}
                  aria-describedby={touched.website && errors.website ? "err-website" : undefined}
                  style={fieldStyle("website")}
                  className="field"
                  placeholder="company.com"
                />
                <FieldError name="website" />
              </div>

              {/* Honeypot. Off screen rather than display:none, which some
                  bots detect and skip. Never announced to screen readers. */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "-9999px",
                  width: "1px",
                  height: "1px",
                  overflow: "hidden",
                }}
              >
                <label htmlFor="lf-company-url">Do not fill this in</label>
                <input
                  id="lf-company-url"
                  name="company_url"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={hp}
                  onChange={(e) => setHp(e.target.value)}
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
              {loading ? "Booking your call..." : "Book My Strategy Call"}
            </button>

          </form>

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