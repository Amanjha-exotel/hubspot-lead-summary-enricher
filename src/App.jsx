import { useState } from "react";

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
    pagesViewed: ["Pricing Page (3x)", "Payroll Features", "SAP Integration", "Customer Story: HDFC Life"],
    engagementHistory: ["Attended Payroll AI webinar (Apr 18)", "Downloaded Payroll ROI calculator", "Opened 4 of 5 nurture emails"],
    enrichment: {
      techStack: "SAP SuccessFactors, Workday Time",
      growthSignal: "Hired 200+ in last 90 days",
      revenue: "₹420Cr (FY25)",
      headcountTrend: "+18% YoY",
    },
    briefing: "ABC Fintech is a 1,200-employee BFSI enterprise actively evaluating payroll modernization. Strong intent signals: 3 pricing page visits, SAP integration page reviewed twice, attended the Payroll AI webinar in April. Currently on SAP SuccessFactors — likely seeking specialized India payroll layer for compliance scale. Hiring 200+ in 90 days suggests urgency around payroll throughput. Recommended angle: Lead with SAP integration depth + India compliance automation. Reference HDFC Life case study (they viewed it).",
    nextAction: "Personalized email within 2 hrs · Reference SAP integration + HDFC case study",
    flag: null,
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
    pagesViewed: ["Pricing Page", "Core HR Features"],
    engagementHistory: ["First-time visitor", "No prior nurture touches"],
    enrichment: {
      techStack: "GreytHR (likely competitor)",
      growthSignal: "Stable headcount",
      revenue: "Est. ₹45Cr",
      headcountTrend: "+4% YoY",
    },
    briefing: "Bright Retail is a 180-employee retail company likely shopping for a Core HR upgrade. Currently on GreytHR (inferred from referrer). Engagement is shallow — pricing inquiry on first visit, only 2 sessions. Low urgency signal. ICP fit is Medium (below 500 employees, but Retail is a strong vertical). Recommended angle: Educational outreach, not pitch-led. Share Retail HR case study and offer a 15-min discovery call.",
    nextAction: "Standard nurture sequence · Retail case study email · Discovery call CTA",
    flag: null,
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
    pagesViewed: ["Talent Acquisition", "Performance Management", "MENA Customers", "ROI Calculator"],
    engagementHistory: ["Visited from LinkedIn Ad (Talent campaign)", "Used ROI calculator", "Repeat visitor over 6 days"],
    enrichment: {
      techStack: "Oracle HCM (legacy)",
      growthSignal: "Expanding into KSA",
      revenue: "AED 280M",
      headcountTrend: "+22% YoY",
    },
    briefing: "Gulf Logistics is an 850-employee logistics company expanding into KSA. CPO submitted Talk to Sales form after 5 sessions and using the ROI calculator. Came from LinkedIn Talent campaign. Currently on legacy Oracle HCM — strong replacement signal. MENA market with KSA expansion = highly aligned to PeopleStrong's regional GTM. Recommended angle: Multi-country talent ops + KSA compliance + Oracle migration playbook.",
    nextAction: "Same-day call request · Send MENA logistics case study · Offer migration assessment",
    flag: null,
  },
  {
    id: 4,
    name: "Karan Sethi",
    title: "Recruiter",
    company: "Personal Email",
    industry: "Unknown",
    employees: null,
    location: "Delhi, IN",
    email: "karan.sethi@gmail.com",
    productInterest: "Career Inquiry",
    intentScore: 8,
    icpFit: "Low",
    priority: "Disqualified",
    submittedAt: "34 min ago",
    formType: "Book a Demo",
    assignedSDR: null,
    sdrTeam: "Auto-disqualified",
    sessions: 1,
    pagesViewed: ["Careers Page", "About Us"],
    engagementHistory: ["First visit · Personal email domain"],
    enrichment: {
      techStack: "—",
      growthSignal: "—",
      revenue: "—",
      headcountTrend: "—",
    },
    briefing: "Personal email domain + viewed Careers Page suggests job seeker, not buyer. Auto-flagged for disqualification — not routed to SDR. Added to talent pool nurture for HR community newsletter.",
    nextAction: "Auto-routed to careers nurture · No SDR action",
    flag: "Auto-disqualified by agent — job seeker pattern detected",
  },
];

const stats = {
  todayLeads: 38,
  routedAuto: 31,
  disqualified: 5,
  pendingReview: 2,
  avgRoutingTime: "1m 14s",
  highIntentLeads: 11,
};

const sdrTeams = [
  { name: "Enterprise Payroll", load: 7, capacity: 12, region: "IND" },
  { name: "Enterprise Core HR", load: 5, capacity: 10, region: "IND" },
  { name: "Mid Market", load: 9, capacity: 15, region: "IND" },
  { name: "MENA Enterprise", load: 4, capacity: 8, region: "MENA" },
];

const priorityConfig = {
  Urgent: { color: "#ff3b5c", bg: "rgba(255,59,92,0.12)", label: "URGENT" },
  Standard: { color: "#f5a623", bg: "rgba(245,166,35,0.12)", label: "STANDARD" },
  Disqualified: { color: "#94a3b8", bg: "rgba(74,85,104,0.15)", label: "DISQUALIFIED" },
};

const icpConfig = {
  High: { color: "#00d4aa" },
  Medium: { color: "#f5a623" },
  Low: { color: "#94a3b8" },
};

export default function App() {
  const [activeTab, setActiveTab] = useState("inbox");
  const [selectedLead, setSelectedLead] = useState(leads[0]);

  return (
    <div style={{
      fontFamily: "'DM Mono', 'Courier New', monospace",
      background: "#ffffff",
      color: "#0f172a",
      minHeight: "100vh",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@400;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #ffffff; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 2px; }
        .tab-btn { background: none; border: none; cursor: pointer; transition: all 0.2s; }
        .lead-card { transition: all 0.15s; cursor: pointer; }
        .lead-card:hover { border-color: #cbd5e1 !important; }
        .lead-card.active { border-color: #00d4aa !important; background: rgba(0,212,170,0.04) !important; }
        .pulse { animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
        .fade-in { animation: fadeIn 0.3s ease forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* Header */}
      <div style={{
        borderBottom: "1px solid #e2e8f0",
        padding: "16px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#f8fafc",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{
            width: "32px", height: "32px",
            background: "linear-gradient(135deg, #7c3aed, #0084ff)",
            borderRadius: "8px",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "14px", fontWeight: "700",
          }}>L</div>
          <div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "15px", fontWeight: "700", color: "#0f172a", letterSpacing: "0.02em" }}>
              Lead Intelligence & SDR Briefing Agent
            </div>
            <div style={{ fontSize: "10px", color: "#94a3b8", letterSpacing: "0.08em", marginTop: "1px" }}>
              POWERED BY CLAUDE · HUBSPOT · BREEZE INTELLIGENCE
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div className="pulse" style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00d4aa" }} />
            <span style={{ fontSize: "10px", color: "#94a3b8", letterSpacing: "0.06em" }}>LIVE · Watching form submissions</span>
          </div>
          <div style={{ fontSize: "11px", color: "#94a3b8" }}>28 May 2026</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ borderBottom: "1px solid #e2e8f0", padding: "0 32px", background: "#f8fafc", display: "flex", gap: "0" }}>
        {[
          { id: "inbox", label: "LEAD INBOX" },
          { id: "routing", label: "ROUTING & CAPACITY" },
          { id: "flow", label: "AGENT FLOW" },
          { id: "performance", label: "PERFORMANCE" },
        ].map((t) => (
          <button
            key={t.id}
            className="tab-btn"
            onClick={() => setActiveTab(t.id)}
            style={{
              padding: "12px 20px",
              fontSize: "10px",
              letterSpacing: "0.1em",
              fontFamily: "'DM Mono', monospace",
              color: activeTab === t.id ? "#7c3aed" : "#4a5568",
              borderBottom: activeTab === t.id ? "2px solid #7c3aed" : "2px solid transparent",
              marginBottom: "-1px",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ padding: "20px 32px" }}>

        {/* INBOX */}
        {activeTab === "inbox" && (
          <div>
            {/* KPI strip */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px", marginBottom: "20px" }}>
              {[
                { label: "LEADS TODAY", value: stats.todayLeads, color: "#0f172a" },
                { label: "AUTO-ROUTED", value: stats.routedAuto, color: "#00d4aa" },
                { label: "HIGH INTENT", value: stats.highIntentLeads, color: "#ff3b5c" },
                { label: "DISQUALIFIED", value: stats.disqualified, color: "#94a3b8" },
                { label: "AVG ROUTE TIME", value: stats.avgRoutingTime, color: "#0084ff" },
              ].map((k, i) => (
                <div key={i} style={{
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  padding: "12px 14px",
                }}>
                  <div style={{ fontSize: "9px", color: "#94a3b8", letterSpacing: "0.1em", marginBottom: "6px" }}>{k.label}</div>
                  <div style={{ fontSize: "20px", fontFamily: "'Syne', sans-serif", fontWeight: "700", color: k.color }}>{k.value}</div>
                </div>
              ))}
            </div>

            {/* Two-column inbox */}
            <div style={{ display: "grid", gridTemplateColumns: "380px 1fr", gap: "16px" }}>
              {/* Lead list */}
              <div>
                <div style={{ fontSize: "9px", color: "#94a3b8", letterSpacing: "0.1em", marginBottom: "10px", padding: "0 4px" }}>
                  RECENT LEADS · LAST 60 MIN
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {leads.map((l) => {
                    const pri = priorityConfig[l.priority];
                    const icp = icpConfig[l.icpFit];
                    return (
                      <div
                        key={l.id}
                        className={`lead-card ${selectedLead.id === l.id ? "active" : ""}`}
                        onClick={() => setSelectedLead(l)}
                        style={{
                          background: "#f8fafc",
                          border: "1px solid #e2e8f0",
                          borderRadius: "8px",
                          padding: "12px 14px",
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
                          <div>
                            <div style={{ fontSize: "12px", color: "#0f172a", fontWeight: "500", marginBottom: "2px" }}>{l.name}</div>
                            <div style={{ fontSize: "10px", color: "#64748b" }}>{l.title}</div>
                            <div style={{ fontSize: "10px", color: "#94a3b8", marginTop: "2px" }}>{l.company} · {l.industry}</div>
                          </div>
                          <div style={{ textAlign: "right" }}>
                            <div style={{
                              fontSize: "16px",
                              fontFamily: "'Syne', sans-serif",
                              fontWeight: "700",
                              color: l.intentScore > 80 ? "#ff3b5c" : l.intentScore > 50 ? "#f5a623" : "#4a5568",
                            }}>{l.intentScore}</div>
                            <div style={{ fontSize: "8px", color: "#94a3b8", letterSpacing: "0.08em" }}>INTENT</div>
                          </div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "8px" }}>
                          <div style={{ display: "flex", gap: "6px" }}>
                            <span style={{
                              background: pri.bg, color: pri.color,
                              padding: "2px 7px", borderRadius: "3px",
                              fontSize: "9px", letterSpacing: "0.06em", fontWeight: "500",
                            }}>{pri.label}</span>
                            <span style={{
                              background: "rgba(255,255,255,0.04)",
                              color: icp.color,
                              padding: "2px 7px", borderRadius: "3px",
                              fontSize: "9px", letterSpacing: "0.06em",
                            }}>ICP: {l.icpFit.toUpperCase()}</span>
                          </div>
                          <div style={{ fontSize: "9px", color: "#94a3b8" }}>{l.submittedAt}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Briefing panel */}
              <div key={selectedLead.id} className="fade-in" style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                padding: "24px",
              }}>
                {/* Lead header */}
                <div style={{ borderBottom: "1px solid #e2e8f0", paddingBottom: "16px", marginBottom: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: "22px",
                        fontWeight: "700",
                        color: "#0f172a",
                        marginBottom: "4px",
                      }}>{selectedLead.name}</div>
                      <div style={{ fontSize: "12px", color: "#64748b" }}>{selectedLead.title} · {selectedLead.company}</div>
                      <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "4px" }}>
                        {selectedLead.industry} · {selectedLead.employees ? `${selectedLead.employees.toLocaleString()} employees` : "—"} · {selectedLead.location}
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{
                        fontSize: "32px",
                        fontFamily: "'Syne', sans-serif",
                        fontWeight: "800",
                        color: selectedLead.intentScore > 80 ? "#ff3b5c" : selectedLead.intentScore > 50 ? "#f5a623" : "#4a5568",
                        lineHeight: "1",
                      }}>{selectedLead.intentScore}</div>
                      <div style={{ fontSize: "9px", color: "#94a3b8", letterSpacing: "0.1em", marginTop: "4px" }}>INTENT SCORE</div>
                    </div>
                  </div>
                </div>

                {/* AI Briefing — the centerpiece */}
                <div style={{
                  background: "linear-gradient(135deg, rgba(124,58,237,0.08), rgba(0,132,255,0.08))",
                  border: "1px solid rgba(124,58,237,0.3)",
                  borderRadius: "8px",
                  padding: "16px 18px",
                  marginBottom: "20px",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                    <div style={{ fontSize: "12px", color: "#7c3aed" }}>✦</div>
                    <div style={{ fontSize: "9px", color: "#7c3aed", letterSpacing: "0.1em" }}>AGENT BRIEFING FOR SDR</div>
                  </div>
                  <div style={{ fontSize: "12px", color: "#0f172a", lineHeight: "1.7" }}>
                    {selectedLead.briefing}
                  </div>
                  {selectedLead.nextAction && (
                    <div style={{
                      marginTop: "14px", paddingTop: "12px", borderTop: "1px solid rgba(124,58,237,0.2)",
                    }}>
                      <div style={{ fontSize: "9px", color: "#7c3aed", letterSpacing: "0.1em", marginBottom: "6px" }}>NEXT ACTION</div>
                      <div style={{ fontSize: "11px", color: "#64748b" }}>{selectedLead.nextAction}</div>
                    </div>
                  )}
                </div>

                {/* Three column data */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px", marginBottom: "20px" }}>
                  {/* Behavior */}
                  <div>
                    <div style={{ fontSize: "9px", color: "#94a3b8", letterSpacing: "0.1em", marginBottom: "10px" }}>WEBSITE BEHAVIOR</div>
                    <div style={{ fontSize: "11px", color: "#0084ff", marginBottom: "8px" }}>{selectedLead.sessions} sessions</div>
                    {selectedLead.pagesViewed.map((p, i) => (
                      <div key={i} style={{ fontSize: "10px", color: "#64748b", padding: "3px 0", display: "flex", gap: "6px" }}>
                        <span style={{ color: "#0084ff", opacity: 0.5 }}>›</span>{p}
                      </div>
                    ))}
                  </div>
                  {/* Engagement */}
                  <div>
                    <div style={{ fontSize: "9px", color: "#94a3b8", letterSpacing: "0.1em", marginBottom: "10px" }}>ENGAGEMENT</div>
                    {selectedLead.engagementHistory.map((p, i) => (
                      <div key={i} style={{ fontSize: "10px", color: "#64748b", padding: "3px 0", display: "flex", gap: "6px" }}>
                        <span style={{ color: "#00d4aa", opacity: 0.5 }}>›</span>{p}
                      </div>
                    ))}
                  </div>
                  {/* Enrichment */}
                  <div>
                    <div style={{ fontSize: "9px", color: "#94a3b8", letterSpacing: "0.1em", marginBottom: "10px" }}>ACCOUNT ENRICHMENT</div>
                    <div style={{ fontSize: "10px", color: "#64748b", padding: "3px 0" }}>
                      <span style={{ color: "#94a3b8" }}>Tech:</span> {selectedLead.enrichment.techStack}
                    </div>
                    <div style={{ fontSize: "10px", color: "#64748b", padding: "3px 0" }}>
                      <span style={{ color: "#94a3b8" }}>Growth:</span> {selectedLead.enrichment.growthSignal}
                    </div>
                    <div style={{ fontSize: "10px", color: "#64748b", padding: "3px 0" }}>
                      <span style={{ color: "#94a3b8" }}>Revenue:</span> {selectedLead.enrichment.revenue}
                    </div>
                    <div style={{ fontSize: "10px", color: "#64748b", padding: "3px 0" }}>
                      <span style={{ color: "#94a3b8" }}>HC trend:</span> {selectedLead.enrichment.headcountTrend}
                    </div>
                  </div>
                </div>

                {/* Routing */}
                <div style={{
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "6px",
                  padding: "14px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                  <div>
                    <div style={{ fontSize: "9px", color: "#94a3b8", letterSpacing: "0.1em", marginBottom: "4px" }}>ROUTED TO</div>
                    {selectedLead.assignedSDR ? (
                      <div>
                        <div style={{ fontSize: "13px", color: "#0f172a", marginBottom: "2px" }}>{selectedLead.assignedSDR}</div>
                        <div style={{ fontSize: "10px", color: "#64748b" }}>{selectedLead.sdrTeam} Team</div>
                      </div>
                    ) : (
                      <div style={{ fontSize: "12px", color: "#94a3b8" }}>{selectedLead.flag || "Not routed"}</div>
                    )}
                  </div>
                  {selectedLead.assignedSDR && (
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button style={{
                        background: "rgba(0,212,170,0.1)",
                        border: "1px solid rgba(0,212,170,0.3)",
                        borderRadius: "4px",
                        padding: "6px 12px",
                        fontSize: "10px",
                        color: "#00d4aa",
                        cursor: "pointer",
                        fontFamily: "'DM Mono', monospace",
                      }}>✓ Confirm Routing</button>
                      <button style={{
                        background: "transparent",
                        border: "1px solid #cbd5e1",
                        borderRadius: "4px",
                        padding: "6px 12px",
                        fontSize: "10px",
                        color: "#64748b",
                        cursor: "pointer",
                        fontFamily: "'DM Mono', monospace",
                      }}>Reassign</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ROUTING */}
        {activeTab === "routing" && (
          <div>
            <div style={{ fontSize: "10px", color: "#94a3b8", letterSpacing: "0.08em", marginBottom: "16px" }}>
              SDR TEAM CAPACITY · LIVE LOAD BALANCING
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "14px", marginBottom: "28px" }}>
              {sdrTeams.map((t, i) => {
                const pct = Math.round((t.load / t.capacity) * 100);
                const color = pct > 80 ? "#ff3b5c" : pct > 60 ? "#f5a623" : "#00d4aa";
                return (
                  <div key={i} style={{
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    padding: "16px 18px",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                      <div>
                        <div style={{ fontSize: "13px", color: "#0f172a", marginBottom: "2px" }}>{t.name}</div>
                        <div style={{ fontSize: "9px", color: "#94a3b8", letterSpacing: "0.08em" }}>{t.region} REGION</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: "20px", fontFamily: "'Syne', sans-serif", fontWeight: "700", color }}>{t.load}/{t.capacity}</div>
                        <div style={{ fontSize: "9px", color: "#94a3b8", letterSpacing: "0.08em" }}>LEADS · CAPACITY</div>
                      </div>
                    </div>
                    <div style={{ height: "6px", background: "#e2e8f0", borderRadius: "3px", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: "3px" }} />
                    </div>
                    <div style={{ fontSize: "10px", color: "#94a3b8", marginTop: "8px" }}>
                      {pct < 60 ? "Available · accepting new leads" : pct < 80 ? "Moderate · prioritize urgent" : "High load · escalation enabled"}
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ fontSize: "10px", color: "#94a3b8", letterSpacing: "0.08em", marginBottom: "12px" }}>
              ROUTING LOGIC
            </div>
            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "20px" }}>
              {[
                { cond: "Intent Score > 80 + ICP High + Employees > 1000 + Region = IND", route: "Enterprise Team (by product)" },
                { cond: "Intent Score > 80 + Region = MENA", route: "MENA Enterprise Team" },
                { cond: "Intent Score 40–80 + Employees 100–999", route: "Mid Market Team (round robin)" },
                { cond: "Intent Score < 30 OR personal email domain", route: "Auto-disqualify · nurture only" },
                { cond: "Product Interest = Payroll + Tech Stack contains SAP", route: "SAP Specialist (Priya Sharma)" },
              ].map((r, i) => (
                <div key={i} style={{
                  padding: "12px 0",
                  borderBottom: i < 4 ? "1px solid #e2e8f0" : "none",
                  display: "grid",
                  gridTemplateColumns: "1fr auto 1fr",
                  gap: "16px",
                  alignItems: "center",
                }}>
                  <div style={{ fontSize: "11px", color: "#64748b" }}>{r.cond}</div>
                  <div style={{ color: "#7c3aed", fontSize: "12px" }}>→</div>
                  <div style={{ fontSize: "11px", color: "#00d4aa" }}>{r.route}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FLOW */}
        {activeTab === "flow" && (
          <div>
            <div style={{ fontSize: "10px", color: "#94a3b8", letterSpacing: "0.08em", marginBottom: "20px" }}>
              END-TO-END AGENT FLOW · TRIGGERED ON FORM SUBMISSION
            </div>
            {[
              {
                step: "01", title: "INGEST", color: "#7c3aed",
                items: [
                  "HubSpot form submission webhook fires within 2 seconds",
                  "Contact ID, form fields, UTM, page context passed to agent",
                  "Pull contact's historical engagement (emails, sessions, downloads)",
                  "Pull associated company record if exists",
                ],
              },
              {
                step: "02", title: "ENRICH", color: "#0084ff",
                items: [
                  "HubSpot Breeze Intelligence for company firmographic data",
                  "Tech stack inference from observed signals (referrer, integrations viewed)",
                  "Growth signal pulled from hiring activity and company news",
                  "Email domain check for B2B vs. personal (job seeker filter)",
                ],
              },
              {
                step: "03", title: "SCORE", color: "#f5a623",
                items: [
                  "Compute Intent Score (0–100) from behavior weights",
                  "Demo request: +30 · Pricing page visit: +15 · Webinar attended: +12",
                  "Compute ICP Fit (High/Med/Low) from firmographics + role",
                  "Set Priority: Urgent / Standard / Disqualified",
                ],
              },
              {
                step: "04", title: "BRIEF", color: "#00d4aa",
                items: [
                  "Claude generates 4–6 sentence SDR briefing in PeopleStrong voice",
                  "Briefing includes: account context, intent signals, recommended angle",
                  "Briefing references specific pages and content the lead engaged with",
                  "Next-best action recommended (call, email angle, content to send)",
                ],
              },
              {
                step: "05", title: "ROUTE", color: "#ff3b5c",
                items: [
                  "Apply routing logic: region + product + intent + SDR capacity",
                  "Assign to specific SDR (or team round-robin within constraints)",
                  "Write back to HubSpot: assigned owner, briefing, intent score, priority",
                  "Send Slack DM to SDR with briefing card + HubSpot deep link · target SLA: under 2 min from form submission",
                ],
              },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", gap: "0" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "48px" }}>
                  <div style={{
                    width: "36px", height: "36px",
                    borderRadius: "50%",
                    background: `${s.color}22`,
                    border: `2px solid ${s.color}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "10px", color: s.color, fontWeight: "600",
                  }}>{s.step}</div>
                  {i < 4 && <div style={{ width: "2px", flex: 1, background: "#e2e8f0", minHeight: "20px" }} />}
                </div>
                <div style={{
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  padding: "16px 20px",
                  marginLeft: "12px",
                  marginBottom: i < 4 ? "8px" : "0",
                  flex: 1,
                }}>
                  <div style={{ fontSize: "10px", color: s.color, letterSpacing: "0.1em", marginBottom: "10px" }}>{s.title}</div>
                  {s.items.map((item, j) => (
                    <div key={j} style={{ fontSize: "11px", color: "#64748b", padding: "4px 0", display: "flex", gap: "8px" }}>
                      <span style={{ color: s.color, opacity: 0.5 }}>›</span>{item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PERFORMANCE */}
        {activeTab === "performance" && (
          <div>
            <div style={{ fontSize: "10px", color: "#94a3b8", letterSpacing: "0.08em", marginBottom: "16px" }}>
              30-DAY ROLLING METRICS · AGENT VS PRE-AGENT BASELINE
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px", marginBottom: "24px" }}>
              {[
                { label: "SPEED TO LEAD", before: "47 min", after: "1m 14s", delta: "−97%", color: "#00d4aa" },
                { label: "SDR RESEARCH TIME", before: "18 min/lead", after: "3 min/lead", delta: "−83%", color: "#00d4aa" },
                { label: "MQL → SQL RATE", before: "22%", after: "31%", delta: "+41%", color: "#00d4aa" },
                { label: "DEMO BOOKED RATE", before: "14%", after: "23%", delta: "+64%", color: "#00d4aa" },
                { label: "LEADS LOST > 1 HR", before: "62%", after: "8%", delta: "−87%", color: "#00d4aa" },
                { label: "SDR SATISFACTION", before: "6.2 / 10", after: "8.7 / 10", delta: "+40%", color: "#00d4aa" },
              ].map((m, i) => (
                <div key={i} style={{
                  background: "#f8fafc", border: "1px solid #e2e8f0",
                  borderRadius: "8px", padding: "16px 18px",
                }}>
                  <div style={{ fontSize: "9px", color: "#94a3b8", letterSpacing: "0.1em", marginBottom: "10px" }}>{m.label}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <div>
                      <div style={{ fontSize: "10px", color: "#94a3b8", marginBottom: "4px" }}>Before</div>
                      <div style={{ fontSize: "13px", color: "#64748b" }}>{m.before}</div>
                    </div>
                    <div style={{ color: "#94a3b8", fontSize: "12px" }}>→</div>
                    <div>
                      <div style={{ fontSize: "10px", color: "#94a3b8", marginBottom: "4px" }}>After</div>
                      <div style={{ fontSize: "16px", color: "#0f172a", fontFamily: "'Syne', sans-serif", fontWeight: "700" }}>{m.after}</div>
                    </div>
                    <div style={{
                      background: "rgba(0,212,170,0.12)", color: m.color,
                      padding: "3px 8px", borderRadius: "3px",
                      fontSize: "10px", fontWeight: "600",
                    }}>{m.delta}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "20px" }}>
              <div style={{ fontSize: "10px", color: "#94a3b8", letterSpacing: "0.1em", marginBottom: "14px" }}>
                AGENT QUALITY METRICS (HUMAN-IN-THE-LOOP VALIDATION)
              </div>
              {[
                { label: "Briefing accuracy (SDR rating)", value: "94%" },
                { label: "Routing override rate (SDR reassigns)", value: "6%" },
                { label: "Intent score correlation with conversion", value: "0.78 (r)" },
                { label: "Auto-disqualified leads with no false positives", value: "98%" },
              ].map((m, i) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between",
                  padding: "10px 0", borderBottom: i < 3 ? "1px solid #e2e8f0" : "none",
                }}>
                  <div style={{ fontSize: "11px", color: "#64748b" }}>{m.label}</div>
                  <div style={{ fontSize: "12px", color: "#0f172a", fontWeight: "500" }}>{m.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
