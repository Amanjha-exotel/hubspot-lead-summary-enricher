import { useState } from "react";

const HS = {
  navy: "#1f2d3d",
  navyLight: "#2d3b45",
  orange: "#ff7a59",
  orangeHover: "#ff5c35",
  blue: "#0091ae",
  blueLight: "#e8f7f9",
  green: "#00bda5",
  greenLight: "#e5f8f6",
  yellow: "#f5c26b",
  yellowLight: "#fef9ee",
  red: "#f2545b",
  redLight: "#fef0f0",
  bg: "#f5f8fa",
  white: "#ffffff",
  border: "#dfe3eb",
  borderDark: "#cbd6e2",
  text: "#33475b",
  textMid: "#516f90",
  textLight: "#7c98b6",
  textMuted: "#99acc2",
};

const leads = [
  {
    id: 1,
    name: "Raj Malhotra",
    title: "VP — People Operations",
    company: "ABC Fintech",
    industry: "BFSI",
    employees: 1200,
    location: "Mumbai, IN",
    email: "raj.m@abcfintech.com",
    productInterest: "Payroll",
    intentScore: 92,
    icpFit: "High",
    priority: "Urgent",
    submittedAt: "4 min ago",
    formType: "Book a Demo",
    assignedSDR: "Priya Sharma",
    sdrTeam: "Enterprise Payroll",
    sessions: 7,
    lifecycle: "MQL",
    lastActivity: "Viewed Pricing Page",
    pagesViewed: ["Pricing Page (3×)", "Payroll Features", "SAP Integration", "Customer Story: HDFC Life"],
    engagementHistory: ["Attended Payroll AI webinar (Apr 18)", "Downloaded Payroll ROI calculator", "Opened 4 of 5 nurture emails"],
    enrichment: { techStack: "SAP SuccessFactors", growthSignal: "Hired 200+ in 90 days", revenue: "₹420Cr (FY25)", headcountTrend: "+18% YoY" },
    briefing: "ABC Fintech is a 1,200-employee BFSI enterprise actively evaluating payroll modernization. Strong intent signals: 3 pricing page visits, SAP integration page reviewed twice, attended the Payroll AI webinar in April. Currently on SAP SuccessFactors — likely seeking specialized India payroll layer for compliance scale. Hiring 200+ in 90 days suggests urgency around payroll throughput.",
    nextAction: "Personalized email within 2 hrs · Reference SAP integration + HDFC case study",
  },
  {
    id: 2,
    name: "Anjali Krishnan",
    title: "HR Business Partner",
    company: "Bright Retail",
    industry: "Retail",
    employees: 180,
    location: "Bengaluru, IN",
    email: "anjali.k@brightretail.in",
    productInterest: "Core HR",
    intentScore: 64,
    icpFit: "Medium",
    priority: "Standard",
    submittedAt: "12 min ago",
    formType: "Pricing Inquiry",
    assignedSDR: "Vikram Singh",
    sdrTeam: "Mid Market",
    sessions: 2,
    lifecycle: "Lead",
    lastActivity: "Submitted Pricing Form",
    pagesViewed: ["Pricing Page", "Core HR Features"],
    engagementHistory: ["First-time visitor", "No prior nurture touches"],
    enrichment: { techStack: "GreytHR (inferred)", growthSignal: "Stable headcount", revenue: "Est. ₹45Cr", headcountTrend: "+4% YoY" },
    briefing: "Bright Retail is a 180-employee retail company likely shopping for a Core HR upgrade. Currently on GreytHR. Engagement is shallow — pricing inquiry on first visit, only 2 sessions. Low urgency signal. Recommended angle: educational outreach with a Retail HR case study and a 15-minute discovery call offer.",
    nextAction: "Standard nurture sequence · Retail case study email · Discovery call CTA",
  },
  {
    id: 3,
    name: "Mohammed Al-Rashid",
    title: "Chief People Officer",
    company: "Gulf Logistics",
    industry: "Logistics",
    employees: 850,
    location: "Dubai, AE",
    email: "mohammed@gulflogistics.ae",
    productInterest: "Talent",
    intentScore: 87,
    icpFit: "High",
    priority: "Urgent",
    submittedAt: "23 min ago",
    formType: "Talk to Sales",
    assignedSDR: "Sara Mansour",
    sdrTeam: "MENA Enterprise",
    sessions: 5,
    lifecycle: "MQL",
    lastActivity: "Used ROI Calculator",
    pagesViewed: ["Talent Acquisition", "Performance Mgmt", "MENA Customers", "ROI Calculator"],
    engagementHistory: ["Visited from LinkedIn Ad", "Used ROI calculator", "Repeat visitor over 6 days"],
    enrichment: { techStack: "Oracle HCM (legacy)", growthSignal: "Expanding into KSA", revenue: "AED 280M", headcountTrend: "+22% YoY" },
    briefing: "Gulf Logistics is an 850-employee company expanding into KSA. CPO submitted Talk to Sales after 5 sessions and using the ROI calculator. Currently on legacy Oracle HCM — strong replacement signal. MENA market with KSA expansion is highly aligned to PeopleStrong's regional GTM. Recommended angle: multi-country talent ops + Oracle migration playbook.",
    nextAction: "Same-day call · MENA logistics case study · Offer migration assessment",
  },
  {
    id: 4,
    name: "Karan Sethi",
    title: "Recruiter",
    company: "—",
    industry: "Unknown",
    employees: null,
    location: "Delhi, IN",
    email: "karan.sethi@gmail.com",
    productInterest: "—",
    intentScore: 8,
    icpFit: "Low",
    priority: "Disqualified",
    submittedAt: "34 min ago",
    formType: "Book a Demo",
    assignedSDR: null,
    sdrTeam: "—",
    sessions: 1,
    lifecycle: "Disqualified",
    lastActivity: "Viewed Careers Page",
    pagesViewed: ["Careers Page", "About Us"],
    engagementHistory: ["Personal email domain detected", "Careers page visited"],
    enrichment: { techStack: "—", growthSignal: "—", revenue: "—", headcountTrend: "—" },
    briefing: "Personal email domain + Careers Page visit pattern detected. Auto-flagged as job seeker. Not routed to SDR. Added to talent community newsletter.",
    nextAction: "Auto-routed to careers nurture · No SDR action required",
  },
];

const priorityMap = {
  Urgent: { color: HS.red, bg: HS.redLight, dot: HS.red },
  Standard: { color: "#f57c00", bg: "#fff8f0", dot: HS.yellow },
  Disqualified: { color: HS.textLight, bg: "#f5f8fa", dot: HS.textMuted },
};

const lifecycleMap = {
  MQL: { color: HS.blue, bg: HS.blueLight },
  Lead: { color: "#7c3aed", bg: "#f3f0ff" },
  Disqualified: { color: HS.textLight, bg: HS.bg },
};

const icpMap = {
  High: { color: HS.green, bg: HS.greenLight },
  Medium: { color: "#f57c00", bg: "#fff8f0" },
  Low: { color: HS.textLight, bg: HS.bg },
};

function IntentRing({ score }) {
  const r = 22, circ = 2 * Math.PI * r;
  const pct = score / 100;
  const color = score > 80 ? HS.red : score > 50 ? HS.orange : HS.textLight;
  return (
    <svg width="60" height="60" viewBox="0 0 60 60">
      <circle cx="30" cy="30" r={r} fill="none" stroke={HS.border} strokeWidth="4" />
      <circle cx="30" cy="30" r={r} fill="none" stroke={color} strokeWidth="4"
        strokeDasharray={circ} strokeDashoffset={circ * (1 - pct)}
        strokeLinecap="round" transform="rotate(-90 30 30)" />
      <text x="30" y="34" textAnchor="middle" fontSize="13" fontWeight="700" fill={color}
        fontFamily="Lexend, sans-serif">{score}</text>
    </svg>
  );
}

function Badge({ children, color, bg, small }) {
  return (
    <span style={{
      background: bg, color,
      padding: small ? "2px 8px" : "3px 10px",
      borderRadius: "20px",
      fontSize: small ? "11px" : "12px",
      fontWeight: "500",
      whiteSpace: "nowrap",
      fontFamily: "Lexend, sans-serif",
    }}>{children}</span>
  );
}

function NavItem({ icon, label, active }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "10px",
      padding: "9px 16px", cursor: "pointer",
      background: active ? "rgba(255,255,255,0.1)" : "transparent",
      borderLeft: active ? `3px solid ${HS.orange}` : "3px solid transparent",
      color: active ? "#fff" : "rgba(255,255,255,0.65)",
      fontSize: "13px", fontFamily: "Lexend, sans-serif",
      transition: "all 0.15s",
    }}>
      <span style={{ fontSize: "15px" }}>{icon}</span>
      {label}
    </div>
  );
}

export default function App() {
  const [selected, setSelected] = useState(leads[0]);
  const [activeTab, setActiveTab] = useState("overview");
  const [activeNav, setActiveNav] = useState("inbox");

  return (
    <div style={{ fontFamily: "Lexend, 'DM Sans', sans-serif", background: HS.bg, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: ${HS.bg}; }
        ::-webkit-scrollbar-thumb { background: ${HS.border}; border-radius: 4px; }
        .lead-row:hover { background: #f0f4f8 !important; }
        .lead-row.active { background: ${HS.blueLight} !important; border-left: 3px solid ${HS.blue} !important; }
        .nav-item:hover { background: rgba(255,255,255,0.08) !important; color: #fff !important; }
        .hs-btn { transition: all 0.15s; cursor: pointer; }
        .hs-btn:hover { filter: brightness(0.92); }
        .tab-btn { background: none; border: none; cursor: pointer; font-family: Lexend, sans-serif; }
        .prop-row:hover { background: #f5f8fa; }
      `}</style>

      {/* Top Nav */}
      <div style={{ background: HS.navy, height: "48px", display: "flex", alignItems: "center", padding: "0 20px", gap: "24px", flexShrink: 0, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <svg width="22" height="22" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill={HS.orange}/>
            <path d="M8 12l3 3 5-5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
          </svg>
          <span style={{ color: "#fff", fontSize: "16px", fontWeight: "700", letterSpacing: "-0.3px" }}>HubSpot</span>
        </div>
        {["Contacts", "Companies", "Deals", "Activities", "Reports"].map((item, i) => (
          <span key={i} style={{ color: i === 0 ? "#fff" : "rgba(255,255,255,0.6)", fontSize: "13px", cursor: "pointer", fontWeight: i === 0 ? "500" : "400" }}>{item}</span>
        ))}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: "6px", padding: "5px 12px", display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>🔍</span>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>Search HubSpot...</span>
          </div>
          <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: HS.orange, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", color: "#fff", fontWeight: "600" }}>A</div>
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Left Sidebar */}
        <div style={{ width: "200px", background: HS.navyLight, flexShrink: 0, paddingTop: "12px" }}>
          <div style={{ padding: "8px 16px 14px", fontSize: "10px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", fontWeight: "600" }}>CRM</div>
          {[
            { id: "inbox", icon: "📥", label: "Lead Inbox" },
            { id: "contacts", icon: "👤", label: "Contacts" },
            { id: "companies", icon: "🏢", label: "Companies" },
            { id: "tasks", icon: "✓", label: "Tasks" },
          ].map(n => (
            <div key={n.id} className="nav-item" onClick={() => setActiveNav(n.id)} style={{
              display: "flex", alignItems: "center", gap: "10px",
              padding: "9px 16px", cursor: "pointer",
              background: activeNav === n.id ? "rgba(255,255,255,0.1)" : "transparent",
              borderLeft: activeNav === n.id ? `3px solid ${HS.orange}` : "3px solid transparent",
              color: activeNav === n.id ? "#fff" : "rgba(255,255,255,0.6)",
              fontSize: "13px", transition: "all 0.15s",
            }}>
              <span style={{ fontSize: "14px" }}>{n.icon}</span>{n.label}
            </div>
          ))}
          <div style={{ padding: "16px 16px 8px", fontSize: "10px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", fontWeight: "600", marginTop: "8px" }}>INTELLIGENCE</div>
          {[
            { id: "routing", icon: "⇄", label: "SDR Routing" },
            { id: "scoring", icon: "◎", label: "Intent Scores" },
          ].map(n => (
            <div key={n.id} className="nav-item" onClick={() => setActiveNav(n.id)} style={{
              display: "flex", alignItems: "center", gap: "10px",
              padding: "9px 16px", cursor: "pointer",
              background: activeNav === n.id ? "rgba(255,255,255,0.1)" : "transparent",
              borderLeft: activeNav === n.id ? `3px solid ${HS.orange}` : "3px solid transparent",
              color: activeNav === n.id ? "#fff" : "rgba(255,255,255,0.6)",
              fontSize: "13px", transition: "all 0.15s",
            }}>
              <span style={{ fontSize: "14px" }}>{n.icon}</span>{n.label}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Page header */}
          <div style={{ background: HS.white, borderBottom: `1px solid ${HS.border}`, padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "2px" }}>
                <span style={{ fontSize: "12px", color: HS.textLight }}>CRM</span>
                <span style={{ fontSize: "12px", color: HS.textLight }}>›</span>
                <span style={{ fontSize: "12px", color: HS.textMid }}>Lead Inbox</span>
              </div>
              <h1 style={{ fontSize: "20px", fontWeight: "600", color: HS.text }}>Lead Inbox</h1>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <button className="hs-btn" style={{ background: HS.white, border: `1px solid ${HS.border}`, borderRadius: "4px", padding: "7px 14px", fontSize: "13px", color: HS.text, fontFamily: "Lexend, sans-serif" }}>
                Filter
              </button>
              <button className="hs-btn" style={{ background: HS.orange, border: "none", borderRadius: "4px", padding: "7px 16px", fontSize: "13px", color: "#fff", fontWeight: "500", fontFamily: "Lexend, sans-serif" }}>
                + Enroll in Sequence
              </button>
            </div>
          </div>

          {/* KPI strip */}
          <div style={{ background: HS.white, borderBottom: `1px solid ${HS.border}`, padding: "12px 24px", display: "flex", gap: "32px" }}>
            {[
              { label: "Leads today", value: "38", delta: "+6 vs yesterday" },
              { label: "Auto-routed", value: "31", delta: "82% automation rate" },
              { label: "High intent", value: "11", delta: "Intent score > 75" },
              { label: "Avg. route time", value: "1m 14s", delta: "↓ from 47 min" },
              { label: "MQL → SQL rate", value: "31%", delta: "↑ 9pts vs baseline" },
            ].map((k, i) => (
              <div key={i}>
                <div style={{ fontSize: "11px", color: HS.textLight, marginBottom: "2px" }}>{k.label}</div>
                <div style={{ fontSize: "20px", fontWeight: "600", color: HS.text, lineHeight: 1 }}>{k.value}</div>
                <div style={{ fontSize: "11px", color: i > 0 ? HS.green : HS.textLight, marginTop: "2px" }}>{k.delta}</div>
              </div>
            ))}
          </div>

          {/* Two-column layout */}
          <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
            {/* Leads table */}
            <div style={{ width: "380px", borderRight: `1px solid ${HS.border}`, background: HS.white, overflow: "auto", flexShrink: 0 }}>
              {/* Table header */}
              <div style={{ padding: "10px 16px", borderBottom: `1px solid ${HS.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "12px", color: HS.textMid, fontWeight: "500" }}>4 records</span>
                <div style={{ display: "flex", gap: "8px" }}>
                  <span style={{ fontSize: "12px", color: HS.blue, cursor: "pointer" }}>Sort ↕</span>
                  <span style={{ fontSize: "12px", color: HS.blue, cursor: "pointer" }}>Columns</span>
                </div>
              </div>
              {leads.map((lead) => {
                const pri = priorityMap[lead.priority];
                return (
                  <div key={lead.id} className={`lead-row ${selected.id === lead.id ? "active" : ""}`}
                    onClick={() => { setSelected(lead); setActiveTab("overview"); }}
                    style={{ padding: "12px 16px", borderBottom: `1px solid ${HS.border}`, cursor: "pointer", borderLeft: "3px solid transparent" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: HS.orange, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", color: "#fff", fontWeight: "600", flexShrink: 0 }}>
                          {lead.name.charAt(0)}
                        </div>
                        <div>
                          <div style={{ fontSize: "13px", fontWeight: "600", color: HS.text }}>{lead.name}</div>
                          <div style={{ fontSize: "11px", color: HS.textMid }}>{lead.company}</div>
                        </div>
                      </div>
                      <IntentRing score={lead.intentScore} />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                      <Badge color={pri.color} bg={pri.bg} small>{lead.priority}</Badge>
                      <Badge color={lifecycleMap[lead.lifecycle].color} bg={lifecycleMap[lead.lifecycle].bg} small>{lead.lifecycle}</Badge>
                    </div>
                    <div style={{ fontSize: "11px", color: HS.textLight }}>
                      <span style={{ marginRight: "8px" }}>📋 {lead.formType}</span>
                      <span>🕐 {lead.submittedAt}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Contact record panel */}
            <div style={{ flex: 1, overflow: "auto", background: HS.bg }}>
              {/* Contact header */}
              <div style={{ background: HS.white, borderBottom: `1px solid ${HS.border}`, padding: "20px 24px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                    <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: HS.orange, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", color: "#fff", fontWeight: "700" }}>
                      {selected.name.charAt(0)}
                    </div>
                    <div>
                      <h2 style={{ fontSize: "22px", fontWeight: "700", color: HS.text, marginBottom: "2px" }}>{selected.name}</h2>
                      <div style={{ fontSize: "13px", color: HS.textMid }}>{selected.title} · {selected.company}</div>
                      <div style={{ display: "flex", gap: "6px", marginTop: "8px" }}>
                        <Badge color={priorityMap[selected.priority].color} bg={priorityMap[selected.priority].bg}>{selected.priority}</Badge>
                        <Badge color={icpMap[selected.icpFit].color} bg={icpMap[selected.icpFit].bg}>ICP: {selected.icpFit}</Badge>
                        <Badge color={lifecycleMap[selected.lifecycle].color} bg={lifecycleMap[selected.lifecycle].bg}>{selected.lifecycle}</Badge>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button className="hs-btn" style={{ background: HS.white, border: `1px solid ${HS.border}`, borderRadius: "4px", padding: "7px 14px", fontSize: "13px", color: HS.text, fontFamily: "Lexend, sans-serif" }}>Email</button>
                    <button className="hs-btn" style={{ background: HS.white, border: `1px solid ${HS.border}`, borderRadius: "4px", padding: "7px 14px", fontSize: "13px", color: HS.text, fontFamily: "Lexend, sans-serif" }}>Call</button>
                    <button className="hs-btn" style={{ background: HS.orange, border: "none", borderRadius: "4px", padding: "7px 16px", fontSize: "13px", color: "#fff", fontWeight: "500", fontFamily: "Lexend, sans-serif" }}>Enroll in Sequence</button>
                  </div>
                </div>

                {/* Tabs */}
                <div style={{ display: "flex", gap: "0", marginTop: "16px", borderBottom: `1px solid ${HS.border}`, marginBottom: "-21px" }}>
                  {["overview", "activity", "briefing"].map(t => (
                    <button key={t} className="tab-btn" onClick={() => setActiveTab(t)} style={{
                      padding: "8px 16px", fontSize: "13px", fontWeight: "500",
                      color: activeTab === t ? HS.blue : HS.textMid,
                      borderBottom: activeTab === t ? `2px solid ${HS.blue}` : "2px solid transparent",
                      marginBottom: "-1px", textTransform: "capitalize",
                    }}>{t === "briefing" ? "✦ AI Briefing" : t.charAt(0).toUpperCase() + t.slice(1)}</button>
                  ))}
                </div>
              </div>

              <div style={{ padding: "20px 24px" }}>
                {/* OVERVIEW TAB */}
                {activeTab === "overview" && (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    {/* Contact Properties */}
                    <div style={{ background: HS.white, border: `1px solid ${HS.border}`, borderRadius: "6px", overflow: "hidden" }}>
                      <div style={{ padding: "12px 16px", borderBottom: `1px solid ${HS.border}`, display: "flex", justifyContent: "space-between" }}>
                        <span style={{ fontSize: "13px", fontWeight: "600", color: HS.text }}>Contact Information</span>
                        <span style={{ fontSize: "12px", color: HS.blue, cursor: "pointer" }}>Edit</span>
                      </div>
                      {[
                        { label: "Email", value: selected.email },
                        { label: "Job title", value: selected.title },
                        { label: "Form submitted", value: selected.formType },
                        { label: "Location", value: selected.location },
                        { label: "Product interest", value: selected.productInterest },
                        { label: "Assigned SDR", value: selected.assignedSDR || "—" },
                      ].map((p, i) => (
                        <div key={i} className="prop-row" style={{ display: "flex", padding: "9px 16px", borderBottom: `1px solid ${HS.border}` }}>
                          <div style={{ width: "140px", fontSize: "12px", color: HS.textLight, flexShrink: 0 }}>{p.label}</div>
                          <div style={{ fontSize: "12px", color: HS.text, fontWeight: "500" }}>{p.value}</div>
                        </div>
                      ))}
                    </div>

                    {/* Company Properties */}
                    <div style={{ background: HS.white, border: `1px solid ${HS.border}`, borderRadius: "6px", overflow: "hidden" }}>
                      <div style={{ padding: "12px 16px", borderBottom: `1px solid ${HS.border}`, display: "flex", justifyContent: "space-between" }}>
                        <span style={{ fontSize: "13px", fontWeight: "600", color: HS.text }}>Company Details</span>
                        <span style={{ fontSize: "12px", color: HS.blue, cursor: "pointer" }}>View company</span>
                      </div>
                      {[
                        { label: "Company name", value: selected.company },
                        { label: "Industry", value: selected.industry },
                        { label: "Employees", value: selected.employees ? selected.employees.toLocaleString() : "—" },
                        { label: "Revenue", value: selected.enrichment.revenue },
                        { label: "Tech stack", value: selected.enrichment.techStack },
                        { label: "HC trend", value: selected.enrichment.headcountTrend },
                      ].map((p, i) => (
                        <div key={i} className="prop-row" style={{ display: "flex", padding: "9px 16px", borderBottom: `1px solid ${HS.border}` }}>
                          <div style={{ width: "140px", fontSize: "12px", color: HS.textLight, flexShrink: 0 }}>{p.label}</div>
                          <div style={{ fontSize: "12px", color: HS.text, fontWeight: "500" }}>{p.value}</div>
                        </div>
                      ))}
                    </div>

                    {/* Website Behavior */}
                    <div style={{ background: HS.white, border: `1px solid ${HS.border}`, borderRadius: "6px", overflow: "hidden" }}>
                      <div style={{ padding: "12px 16px", borderBottom: `1px solid ${HS.border}` }}>
                        <span style={{ fontSize: "13px", fontWeight: "600", color: HS.text }}>Website Activity</span>
                        <span style={{ fontSize: "12px", color: HS.textLight, marginLeft: "8px" }}>{selected.sessions} sessions</span>
                      </div>
                      {selected.pagesViewed.map((p, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "9px 16px", borderBottom: `1px solid ${HS.border}` }}>
                          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: HS.blue, flexShrink: 0 }} />
                          <span style={{ fontSize: "12px", color: HS.text }}>{p}</span>
                        </div>
                      ))}
                    </div>

                    {/* Engagement */}
                    <div style={{ background: HS.white, border: `1px solid ${HS.border}`, borderRadius: "6px", overflow: "hidden" }}>
                      <div style={{ padding: "12px 16px", borderBottom: `1px solid ${HS.border}` }}>
                        <span style={{ fontSize: "13px", fontWeight: "600", color: HS.text }}>Engagement History</span>
                      </div>
                      {selected.engagementHistory.map((e, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "10px 16px", borderBottom: `1px solid ${HS.border}` }}>
                          <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: HS.greenLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", flexShrink: 0 }}>✓</div>
                          <span style={{ fontSize: "12px", color: HS.text, paddingTop: "3px" }}>{e}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ACTIVITY TAB */}
                {activeTab === "activity" && (
                  <div style={{ background: HS.white, border: `1px solid ${HS.border}`, borderRadius: "6px", overflow: "hidden" }}>
                    <div style={{ padding: "12px 16px", borderBottom: `1px solid ${HS.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "13px", fontWeight: "600", color: HS.text }}>Activity Feed</span>
                      <div style={{ display: "flex", gap: "8px" }}>
                        {["All", "Emails", "Calls", "Notes"].map(f => (
                          <span key={f} style={{ fontSize: "12px", color: f === "All" ? HS.blue : HS.textLight, cursor: "pointer", padding: "2px 8px", borderRadius: "3px", background: f === "All" ? HS.blueLight : "transparent" }}>{f}</span>
                        ))}
                      </div>
                    </div>
                    {[
                      { type: "Form", icon: "📋", time: selected.submittedAt, desc: `Submitted "${selected.formType}" form`, color: HS.blue },
                      ...selected.engagementHistory.map(e => ({ type: "Activity", icon: "📊", time: "Recent", desc: e, color: HS.green })),
                      ...selected.pagesViewed.map(p => ({ type: "Page view", icon: "👁", time: "Session", desc: `Viewed: ${p}`, color: HS.textLight })),
                    ].map((a, i) => (
                      <div key={i} style={{ display: "flex", gap: "12px", padding: "12px 16px", borderBottom: `1px solid ${HS.border}` }}>
                        <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: `${a.color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", flexShrink: 0 }}>{a.icon}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: "13px", color: HS.text }}>{a.desc}</div>
                          <div style={{ fontSize: "11px", color: HS.textLight, marginTop: "2px" }}>{a.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* BRIEFING TAB */}
                {activeTab === "briefing" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    {/* AI Briefing Card */}
                    <div style={{ background: HS.white, border: `1px solid ${HS.border}`, borderRadius: "6px", overflow: "hidden" }}>
                      <div style={{ padding: "12px 16px", borderBottom: `1px solid ${HS.border}`, background: "#f8f4ff", display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ color: "#7c3aed", fontSize: "15px" }}>✦</span>
                        <span style={{ fontSize: "13px", fontWeight: "600", color: "#7c3aed" }}>AI-Generated SDR Briefing</span>
                        <span style={{ marginLeft: "auto", fontSize: "11px", color: HS.textLight }}>Generated {selected.submittedAt}</span>
                      </div>
                      <div style={{ padding: "16px" }}>
                        <p style={{ fontSize: "13px", color: HS.text, lineHeight: "1.7" }}>{selected.briefing}</p>
                      </div>
                    </div>

                    {/* Next Action */}
                    <div style={{ background: HS.white, border: `1px solid ${HS.border}`, borderRadius: "6px", overflow: "hidden" }}>
                      <div style={{ padding: "12px 16px", borderBottom: `1px solid ${HS.border}` }}>
                        <span style={{ fontSize: "13px", fontWeight: "600", color: HS.text }}>Recommended Next Action</span>
                      </div>
                      <div style={{ padding: "14px 16px", display: "flex", alignItems: "flex-start", gap: "10px" }}>
                        <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: HS.yellowLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", flexShrink: 0 }}>⚡</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: "13px", color: HS.text, lineHeight: "1.6" }}>{selected.nextAction}</div>
                          {selected.assignedSDR && (
                            <div style={{ marginTop: "10px", display: "flex", gap: "8px" }}>
                              <button className="hs-btn" style={{ background: HS.orange, border: "none", borderRadius: "4px", padding: "6px 14px", fontSize: "12px", color: "#fff", fontWeight: "500", fontFamily: "Lexend, sans-serif" }}>
                                Open in Sequence
                              </button>
                              <button className="hs-btn" style={{ background: HS.white, border: `1px solid ${HS.border}`, borderRadius: "4px", padding: "6px 14px", fontSize: "12px", color: HS.text, fontFamily: "Lexend, sans-serif" }}>
                                Log activity
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Routing */}
                    <div style={{ background: HS.white, border: `1px solid ${HS.border}`, borderRadius: "6px", overflow: "hidden" }}>
                      <div style={{ padding: "12px 16px", borderBottom: `1px solid ${HS.border}` }}>
                        <span style={{ fontSize: "13px", fontWeight: "600", color: HS.text }}>Routing Decision</span>
                      </div>
                      <div style={{ padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <div style={{ fontSize: "12px", color: HS.textLight, marginBottom: "3px" }}>Assigned to</div>
                          {selected.assignedSDR ? (
                            <>
                              <div style={{ fontSize: "14px", fontWeight: "600", color: HS.text }}>{selected.assignedSDR}</div>
                              <div style={{ fontSize: "12px", color: HS.textMid }}>{selected.sdrTeam} Team</div>
                            </>
                          ) : (
                            <div style={{ fontSize: "13px", color: HS.textLight }}>Auto-disqualified — no SDR assigned</div>
                          )}
                        </div>
                        {selected.assignedSDR && (
                          <div style={{ display: "flex", gap: "8px" }}>
                            <button className="hs-btn" style={{ background: HS.greenLight, border: `1px solid ${HS.green}`, borderRadius: "4px", padding: "6px 12px", fontSize: "12px", color: HS.green, fontFamily: "Lexend, sans-serif" }}>
                              ✓ Confirm
                            </button>
                            <button className="hs-btn" style={{ background: HS.white, border: `1px solid ${HS.border}`, borderRadius: "4px", padding: "6px 12px", fontSize: "12px", color: HS.textMid, fontFamily: "Lexend, sans-serif" }}>
                              Reassign
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Intent score breakdown */}
                    <div style={{ background: HS.white, border: `1px solid ${HS.border}`, borderRadius: "6px", overflow: "hidden" }}>
                      <div style={{ padding: "12px 16px", borderBottom: `1px solid ${HS.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "13px", fontWeight: "600", color: HS.text }}>Intent Score Breakdown</span>
                        <span style={{ fontSize: "20px", fontWeight: "700", color: selected.intentScore > 80 ? HS.red : selected.intentScore > 50 ? HS.orange : HS.textLight }}>{selected.intentScore}/100</span>
                      </div>
                      {[
                        { label: "Form submission type", pts: selected.formType === "Book a Demo" || selected.formType === "Talk to Sales" ? 30 : 15, max: 30 },
                        { label: "Pricing page visits", pts: selected.pagesViewed.some(p => p.includes("Pricing")) ? 15 : 0, max: 15 },
                        { label: "Session depth", pts: Math.min(selected.sessions * 5, 20), max: 20 },
                        { label: "Content engagement", pts: selected.engagementHistory.length * 4, max: 20 },
                        { label: "ICP match", pts: selected.icpFit === "High" ? 15 : selected.icpFit === "Medium" ? 8 : 0, max: 15 },
                      ].map((s, i) => (
                        <div key={i} style={{ padding: "10px 16px", borderBottom: `1px solid ${HS.border}`, display: "flex", alignItems: "center", gap: "12px" }}>
                          <div style={{ flex: 1, fontSize: "12px", color: HS.textMid }}>{s.label}</div>
                          <div style={{ width: "120px", height: "5px", background: HS.bg, borderRadius: "3px", overflow: "hidden" }}>
                            <div style={{ height: "100%", width: `${(s.pts / s.max) * 100}%`, background: HS.blue, borderRadius: "3px" }} />
                          </div>
                          <div style={{ fontSize: "12px", color: HS.text, fontWeight: "600", width: "40px", textAlign: "right" }}>+{s.pts}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
