import { loadData, saveData } from "./firebase.js";
import { useState, useEffect, useRef } from "react";

const LOGO_SRC = "data:image/png;base64,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";

const TYPES = ["正職員工", "固定工讀", "臨時工讀"];
const VISA_TYPES = ["D2", "D4", "D8", "H1"];
const DEFAULT_TEMP_RATE = 10320;

function monthsDiff(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  const n = new Date();
  return (n.getFullYear() - d.getFullYear()) * 12 + (n.getMonth() - d.getMonth()) + (n.getDate() < d.getDate() ? -1 : 0);
}

const INIT = [
  { id: 1, empNo: "A001", name: "王小明", type: "正職員工", visa: "2026-09-15", visaType: "D2", rate: 0, msalary: 3500000, startDate: "2024-03-01", resigned: false, resignDate: "" },
  { id: 2, empNo: "A002", name: "林美玲", type: "正職員工", visa: "", visaType: "", rate: 0, msalary: 2800000, startDate: "2023-07-15", resigned: false, resignDate: "" },
  { id: 3, empNo: "B001", name: "陳大華", type: "固定工讀", visa: "2026-07-01", visaType: "H1", rate: 10000, msalary: 0, startDate: "2025-11-01", resigned: false, resignDate: "" },
  { id: 4, empNo: "C001", name: "張雅婷", type: "臨時工讀", visa: "", visaType: "", rate: 9860, msalary: 0, startDate: "2026-04-20", resigned: false, resignDate: "" },
];

const w = n => "₩ " + n.toLocaleString();
const now = new Date();
const curMonth = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, "0")}`;
const dotColors = ["#5b8fb9","#b85c5c","#6b9e7a","#c4953a","#7b6ba5","#4e8e8e","#c47a5a","#5c7eba"];
function daysLeft(d) { if (!d) return null; return Math.ceil((new Date(d) - new Date()) / 864e5); }
function tenure(startDate) {
  if (!startDate) return "";
  const s = new Date(startDate), n = new Date();
  let y = n.getFullYear() - s.getFullYear(), m = n.getMonth() - s.getMonth();
  if (n.getDate() < s.getDate()) m--;
  if (m < 0) { y--; m += 12; }
  if (y > 0 && m > 0) return `${y}年${m}個月`;
  if (y > 0) return `${y}年`;
  if (m > 0) return `${m}個月`;
  return "未滿1個月";
}
function calcTax(amount) {
  const incomeTax = Math.round(amount * 0.03);
  const localTax = Math.round(amount * 0.003);
  return { incomeTax, localTax, total: incomeTax + localTax, net: amount - incomeTax - localTax };
}

function useIsMobile() {
  const [m, setM] = useState(window.innerWidth < 700);
  useEffect(() => { const h = () => setM(window.innerWidth < 700); window.addEventListener("resize", h); return () => window.removeEventListener("resize", h); }, []);
  return m;
}
function Dot({ id }) { return <div style={{ width: 10, height: 10, borderRadius: "50%", background: dotColors[id % dotColors.length], flexShrink: 0 }} />; }
function Inp({ label, ...p }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1, minWidth: 0 }}>
      <span style={{ fontSize: 11, color: "#7a8a9e", fontWeight: 500 }}>{label}</span>
      <input {...p} style={{ padding: "9px 11px", border: "1px solid #d0d8e4", borderRadius: 6, fontSize: 14, fontFamily: "inherit", outline: "none", background: "#fff", width: "100%", boxSizing: "border-box", color: "#1e2a3a" }}
        onFocus={e => e.target.style.borderColor = "#3b6fa0"} onBlur={e => e.target.style.borderColor = "#d0d8e4"} />
    </div>
  );
}
function RR({ l, r, bold, c }) {
  return (<div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: c || "#7a8a9e" }}>{l}</span><span style={{ fontWeight: bold ? 700 : 500, color: c || "#1e2a3a" }}>{r}</span></div>);
}

// ═══ Navigation Structure ═══
const NAV = [
  { k: "dashboard", l: "儀表板", sub: [
    { k: "dash-ops", l: "營運總覽" },
    { k: "dash-today", l: "今日數據" },
    { k: "dash-month", l: "本月數據" },
    { k: "dash-staff", l: "員工概況" },
    { k: "dash-finance", l: "財務概況" },
    { k: "dash-ai", l: "AI營運摘要" },
  ]},
  { k: "finance", l: "財務管理", sub: [
    { k: "fin-dashboard", l: "財務儀表板" },
    { k: "fin-revenue", l: "營收明細" },
    { k: "fin-collection", l: "收款紀錄" },
    { k: "fin-unpaid", l: "未收款管理" },
    { k: "fin-expense", l: "支出管理" },
    { k: "fin-salary", l: "員工薪資支出" },
    { k: "fin-profit", l: "利潤分析" },
    { k: "fin-monthly", l: "月報表" },
    { k: "fin-yearly", l: "年報表" },
  ]},
  { k: "customers", l: "客戶管理", sub: [
    { k: "cust-list", l: "客戶列表" },
    { k: "cust-detail", l: "客戶資料" },
    { k: "cust-vip", l: "VIP客戶" },
    { k: "cust-active", l: "活躍客戶" },
    { k: "cust-inactive", l: "沉睡客戶" },
    { k: "cust-unpaid", l: "未付款客戶" },
    { k: "cust-ranking", l: "客戶消費排行" },
    { k: "cust-analysis", l: "客戶分析" },
  ]},
  { k: "hr", l: "人資管理", sub: [
    { k: "hr-employees", l: "員工資料" },
    { k: "hr-position", l: "職位管理" },
    { k: "hr-attendance", l: "出勤管理" },
    { k: "hr-schedule", l: "排班管理" },
    { k: "hr-leave", l: "請假管理" },
    { k: "hr-salary", l: "薪資管理" },
    { k: "hr-visa", l: "簽證期限" },
    { k: "hr-performance", l: "績效統計" },
  ]},
  { k: "settings", l: "系統設定", sub: [
    { k: "set-company", l: "公司資料設定" },
    { k: "set-shipping", l: "運費設定" },
    { k: "set-proxy", l: "代購服務費設定" },
    { k: "set-tier", l: "客戶等級設定" },
    { k: "set-permission", l: "權限管理" },
    { k: "set-line", l: "LINE通知設定" },
    { k: "set-sms", l: "簡訊通知設定" },
    { k: "set-api", l: "API串接設定" },
  ]},
];

const DONE_PAGES = ["hr-employees", "hr-salary", "hr-visa"];

function Placeholder({ title }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 20px", textAlign: "center" }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>🚧</div>
      <h3 style={{ fontSize: 18, fontWeight: 600, color: "#34537d", margin: "0 0 8px" }}>{title}</h3>
      <p style={{ fontSize: 14, color: "#8a9ab0", margin: 0 }}>此功能開發中，敬請期待</p>
    </div>
  );
}

export default function App() {
  const mobile = useIsMobile();
  const [emps, setEmps] = useState([]);
  const [tab, setTab] = useState("dash-ops");
  const [expandedNav, setExpandedNav] = useState("dashboard");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState({ empNo: "", name: "", type: TYPES[0], visa: "", visaType: "", rate: "", msalary: "", startDate: "", resigned: false, resignDate: "" });
  const [sideOpen, setSideOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState(false);
  const APP_PASSWORD = "hanji2020//";
  const handleLogin = () => { if (pw === APP_PASSWORD) { setLoggedIn(true); setPwError(false); } else { setPwError(true); } };

  const [calcEmpId, setCalcEmpId] = useState("");
  const [calcHours, setCalcHours] = useState("");
  const [calcOtHours, setCalcOtHours] = useState("");
  const [calcBonus, setCalcBonus] = useState("");
  const [calcOther, setCalcOther] = useState("");
  const [calcTransfer, setCalcTransfer] = useState("");
  const [calcMonthSal, setCalcMonthSal] = useState("");
  const [saved, setSaved] = useState(null);
  const [records, setRecords] = useState([]);

  // ── Expenses ──
  const [expenses, setExpenses] = useState([
    { id: 1, label: "員工薪資", amount: 12300000 },
    { id: 2, label: "倉庫租金", amount: 2500000 },
    { id: 3, label: "物流成本", amount: 3200000 },
    { id: 4, label: "包材費用", amount: 580000 },
    { id: 5, label: "其他支出", amount: 220000 },
  ]);
  const [editingExpId, setEditingExpId] = useState(null);
  const [editingExpVal, setEditingExpVal] = useState("");
  const [showAddExp, setShowAddExp] = useState(false);
  const [newExpLabel, setNewExpLabel] = useState("");
  const [newExpAmount, setNewExpAmount] = useState("");
  const expTotal = expenses.reduce((s, e) => s + e.amount, 0);

  // ── Firebase Load/Save ──
  const loaded = useRef(false);
  useEffect(() => {
    (async () => {
      const le = await loadData("employees");
      const lr = await loadData("records");
      const lx = await loadData("expenses");
      if (le && le.length > 0) setEmps(le); else setEmps(INIT);
      if (lr && lr.length > 0) setRecords(lr);
      if (lx && lx.length > 0) setExpenses(lx);
      loaded.current = true;
    })();
  }, []);
  useEffect(() => { if (loaded.current) saveData("employees", emps); }, [emps]);
  useEffect(() => { if (loaded.current) saveData("records", records); }, [records]);
  useEffect(() => { if (loaded.current) saveData("expenses", expenses); }, [expenses]);

  // ── Employee CRUD ──
  const nextEmpNo = () => {
    const nums = emps.map(e => { const m = (e.empNo || "").match(/^A(\d+)$/); return m ? parseInt(m[1]) : 0; });
    return "A" + String((nums.length > 0 ? Math.max(...nums) : 0) + 1).padStart(3, "0");
  };
  const startEdit = (e) => { setEditingId(e.id); setEditForm({ ...e, rate: String(e.rate), msalary: String(e.msalary || 0) }); };
  const cancelEdit = () => { setEditingId(null); setEditForm(null); };
  const saveEdit = () => { if (!editForm || !editForm.name) return; setEmps(p => p.map(e => e.id === editForm.id ? { ...editForm, rate: +editForm.rate || 0, msalary: +editForm.msalary || 0 } : e)); cancelEdit(); };
  const addEmp = () => {
    if (!addForm.name) return;
    if (addForm.type !== "正職員工" && !addForm.rate) return;
    const empNo = addForm.empNo || nextEmpNo();
    setEmps(p => [...p, { ...addForm, empNo, id: Date.now(), rate: +addForm.rate || 0, msalary: +addForm.msalary || 0 }]);
    setAddForm({ empNo: "", name: "", type: TYPES[0], visa: "", visaType: "", rate: "", msalary: "", startDate: "", resigned: false, resignDate: "" }); setShowAdd(false);
  };
  const delEmp = id => { setEmps(p => p.filter(e => e.id !== id)); cancelEdit(); };
  const getDefaultRate = (type, startDate) => { if (type === "臨時工讀") { const m = monthsDiff(startDate); if (m !== null && m < 2) return DEFAULT_TEMP_RATE; } return ""; };
  const handleAddTypeChange = (t) => { const u = { type: t }; if (t === "臨時工讀" && addForm.startDate) { const d = getDefaultRate(t, addForm.startDate); if (d) u.rate = String(d); } setAddForm(f => ({ ...f, ...u })); };
  const handleAddStartDateChange = (d) => { const u = { startDate: d }; if (addForm.type === "臨時工讀" && d && monthsDiff(d) < 2) u.rate = String(DEFAULT_TEMP_RATE); setAddForm(f => ({ ...f, ...u })); };

  // ── Salary Calc ──
  const calcEmp = emps.find(e => String(e.id) === String(calcEmpId));
  const isFT = calcEmp?.type === "正職員工";
  const hours = +calcHours || 0, otHours = +calcOtHours || 0, bonus = +calcBonus || 0, otherExp = +calcOther || 0, transfer = +calcTransfer || 0, monthSal = +calcMonthSal || 0;
  let totalPayable = 0, basePay = 0, otPay = 0, totalSalary = 0;
  if (calcEmp) { if (isFT) { totalSalary = monthSal; totalPayable = monthSal + bonus - otherExp; } else { basePay = calcEmp.rate * hours; otPay = 5000 * otHours; totalSalary = basePay + otPay; totalPayable = totalSalary + bonus - otherExp; } }
  const tax = calcTax(transfer);
  const cashPay = totalPayable - transfer;
  const handleSave = () => { if (!calcEmp) return; setRecords(p => [...p, { id: Date.now(), month: curMonth, empName: calcEmp.name, empType: calcEmp.type, isFT, rate: calcEmp.rate, hours, otHours, monthSal, basePay, otPay, totalSalary, bonus, otherExp, totalPayable, transfer, incomeTax: tax.incomeTax, localTax: tax.localTax, netTransfer: tax.net, cashPay }]); setSaved({ id: Date.now(), month: curMonth, empName: calcEmp.name, empType: calcEmp.type, isFT, rate: calcEmp.rate, hours, otHours, monthSal, basePay, otPay, totalSalary, bonus, otherExp, totalPayable, transfer, incomeTax: tax.incomeTax, localTax: tax.localTax, netTransfer: tax.net, cashPay }); };
  const clearCalc = () => { setCalcEmpId(""); setCalcHours(""); setCalcOtHours(""); setCalcBonus(""); setCalcOther(""); setCalcTransfer(""); setCalcMonthSal(""); setSaved(null); };

  const monthTotals = {}; records.forEach(r => { monthTotals[r.month] = (monthTotals[r.month] || 0) + r.totalPayable; });
  const annualRows = Object.entries(monthTotals).sort((a, b) => a[0].localeCompare(b[0]));
  const grandTotal = annualRows.reduce((s, [, v]) => s + v, 0);

  const switchTab = k => { setTab(k); setEditingId(null); setShowAdd(false); setSideOpen(false); setSaved(null); };
  const selStyle = { padding: "9px 11px", border: "1px solid #d0d8e4", borderRadius: 6, fontSize: 14, fontFamily: "inherit", background: "#fff", color: "#1e2a3a", width: "100%", boxSizing: "border-box" };
  const btnP = { padding: "7px 18px", background: "#34537d", color: "#fff", border: "none", borderRadius: 6, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", fontSize: 13 };
  const btnS = { padding: "7px 18px", background: "#e4e9f0", color: "#4a5568", border: "none", borderRadius: 6, fontWeight: 500, cursor: "pointer", fontFamily: "inherit", fontSize: 13 };

  // Current page title
  const getTitle = () => {
    for (const n of NAV) { if (n.k === tab) return n.l; if (n.sub) for (const s of n.sub) if (s.k === tab) return s.l; }
    return "";
  };

  // ── Sidebar ──
  const sideContent = (
    <>
      <div style={{ padding: "18px 16px 14px", borderBottom: "1px solid #3d5f8a" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src={LOGO_SRC} alt="logo" style={{ width: 42, height: 42 }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: 17, letterSpacing: 1 }}><span style={{ color: "#fff" }}>韓集</span><span style={{ color: "#8ab4e0" }}>集</span><span style={{ color: "#fff" }}>運</span></div>
            <div style={{ fontSize: 10, color: "#8aa4c4", marginTop: 1 }}>物流管理系統</div>
          </div>
        </div>
      </div>
      <div style={{ padding: "8px 8px", flex: 1, overflowY: "auto" }}>
        {NAV.map(n => (
          <div key={n.k}>
            <button onClick={() => {
              if (n.sub) { setExpandedNav(expandedNav === n.k ? "" : n.k); }
              else { switchTab(n.k); setExpandedNav(""); }
            }} style={{
              display: "flex", alignItems: "center", gap: 8, width: "100%",
              padding: "9px 12px", border: "none", borderRadius: 6, cursor: "pointer",
              fontFamily: "inherit", fontSize: 13, fontWeight: (tab === n.k || (n.sub && n.sub.some(s => s.k === tab))) ? 600 : 400,
              background: (tab === n.k || (n.sub && n.sub.some(s => s.k === tab))) ? "rgba(255,255,255,.12)" : "transparent",
              color: (tab === n.k || (n.sub && n.sub.some(s => s.k === tab))) ? "#fff" : "#8aa4c4",
              marginBottom: 1, textAlign: "left",
            }}>
              <span style={{ fontSize: 8, color: (tab === n.k || (n.sub && n.sub.some(s => s.k === tab))) ? "#fff" : "#8aa4c4" }}>●</span>{n.l}
              {n.sub && <span style={{ marginLeft: "auto", fontSize: 10, opacity: 0.6 }}>{expandedNav === n.k ? "▼" : "▶"}</span>}
            </button>
            {n.sub && expandedNav === n.k && (
              <div style={{ paddingLeft: 20, marginBottom: 4 }}>
                {n.sub.map(s => (
                  <button key={s.k} onClick={() => switchTab(s.k)} style={{
                    display: "flex", alignItems: "center", gap: 6, width: "100%",
                    padding: "7px 10px", border: "none", borderRadius: 5, cursor: "pointer",
                    fontFamily: "inherit", fontSize: 12, fontWeight: tab === s.k ? 600 : 400,
                    background: tab === s.k ? "rgba(255,255,255,.1)" : "transparent",
                    color: tab === s.k ? "#fff" : "#8aa4c4",
                    marginBottom: 1, textAlign: "left",
                  }}>
                    {DONE_PAGES.includes(s.k) && <span style={{ fontSize: 8, color: "#6b9e7a" }}>●</span>}
                    {s.l}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ padding: "12px 16px", borderTop: "1px solid #3d5f8a", fontSize: 11, color: "#8aa4c4" }}>共 {emps.filter(e => !e.resigned).length} 位在職員工</div>
    </>
  );

  // ═══ Dashboard ═══
  const DashboardView = () => (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 14 }}>

        {/* 今日營運 */}
        <div style={{ background: "#fff", borderRadius: 8, padding: 16, border: "1px solid #dce3ed" }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 14px", color: "#1e2a3a" }}>今日營運</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { label: "今日入庫", value: "128", unit: "件", color: "#34537d" },
              { label: "今日出貨", value: "76", unit: "件", color: "#5b9e6f" },
              { label: "待出貨", value: "43", unit: "件", color: "#c4953a" },
              { label: "異常件", value: "2", unit: "件", color: "#c0504d" },
            ].map((s, i) => (
              <div key={i} style={{ background: "#f5f8fc", borderRadius: 6, padding: "12px", textAlign: "center" }}>
                <div style={{ fontSize: 11, color: "#8a9ab0", marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.value}<span style={{ fontSize: 12, fontWeight: 400, marginLeft: 2 }}>{s.unit}</span></div>
              </div>
            ))}
          </div>
        </div>

        {/* 今日財務 */}
        <div style={{ background: "#fff", borderRadius: 8, padding: 16, border: "1px solid #dce3ed" }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 14px", color: "#1e2a3a" }}>今日財務</h3>
          <div style={{ fontSize: 13, color: "#4a5568" }}>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f0f2f5" }}>
              <span>今日營收</span><span style={{ fontWeight: 700, color: "#34537d" }}>{w(1850000)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f0f2f5" }}>
              <span>本月營收</span><span style={{ fontWeight: 700, color: "#34537d" }}>{w(32450000)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f0f2f5" }}>
              <span>未收款</span><span style={{ fontWeight: 700, color: "#c0504d" }}>{w(4120000)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0" }}>
              <span>今日收款</span><span style={{ fontWeight: 700, color: "#5b9e6f" }}>{w(980000)}</span>
            </div>
          </div>
        </div>

        {/* 員工狀況 */}
        <div style={{ background: "#fff", borderRadius: 8, padding: 16, border: "1px solid #dce3ed" }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 14px", color: "#1e2a3a" }}>員工狀況</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            {[
              { label: "出勤", value: `${emps.filter(e => !e.resigned).length} / ${emps.filter(e => !e.resigned).length}`, unit: "人", color: "#34537d" },
              { label: "請假", value: "1", unit: "人", color: "#c4953a" },
              { label: "加班", value: "2", unit: "人", color: "#7b6ba5" },
            ].map((s, i) => (
              <div key={i} style={{ background: "#f5f8fc", borderRadius: 6, padding: "12px", textAlign: "center" }}>
                <div style={{ fontSize: 11, color: "#8a9ab0", marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: s.color }}>{s.value}<span style={{ fontSize: 11, fontWeight: 400, marginLeft: 2 }}>{s.unit}</span></div>
              </div>
            ))}
          </div>
        </div>

        {/* 員工績效排行 */}
        <div style={{ background: "#fff", borderRadius: 8, padding: 16, border: "1px solid #dce3ed" }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 14px", color: "#1e2a3a" }}>員工績效排行</h3>
          <div style={{ fontSize: 13, color: "#4a5568" }}>
            {[
              { rank: 1, name: "小王", count: 182, color: "#c4953a" },
              { rank: 2, name: "小李", count: 156, color: "#8a9ab0" },
              { rank: 3, name: "小張", count: 143, color: "#b85c5c" },
            ].map((r, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", padding: "8px 0", borderBottom: i < 2 ? "1px solid #f0f2f5" : "none", gap: 10 }}>
                <span style={{ width: 22, height: 22, borderRadius: "50%", background: r.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>{r.rank}</span>
                <span style={{ flex: 1, fontWeight: 500 }}>{r.name}</span>
                <span style={{ fontWeight: 700, color: "#34537d" }}>{r.count} 件</span>
              </div>
            ))}
          </div>
        </div>

        {/* 客戶狀況 */}
        <div style={{ background: "#fff", borderRadius: 8, padding: 16, border: "1px solid #dce3ed", gridColumn: mobile ? "auto" : "1 / -1" }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 14px", color: "#1e2a3a" }}>客戶狀況</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            {[
              { label: "本月活躍客戶", value: "635", color: "#34537d" },
              { label: "新增客戶", value: "18", color: "#5b9e6f" },
              { label: "VIP 客戶", value: "42", color: "#c4953a" },
            ].map((s, i) => (
              <div key={i} style={{ background: "#f5f8fc", borderRadius: 6, padding: "12px", textAlign: "center" }}>
                <div style={{ fontSize: 11, color: "#8a9ab0", marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );

  return (
    <div style={{ fontFamily: "'Noto Sans TC','Helvetica Neue',sans-serif", minHeight: "100vh", background: "#eef2f7", color: "#1e2a3a" }}>
      {!loggedIn ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "#f0f1f3", padding: 20 }}>
          <div style={{ background: "#fff", borderRadius: 12, padding: "40px 32px 32px", width: "100%", maxWidth: 380, textAlign: "center", boxShadow: "0 2px 12px rgba(0,0,0,.06)" }}>
            <img src={LOGO_SRC} alt="logo" style={{ width: 80, height: 80, display: "block", margin: "0 auto 14px", borderRadius: "50%", border: "2px solid #e8eaed" }} />
            <h1 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 700, color: "#2d4263" }}>韓集<span style={{ color: "#5b8ec9", fontWeight: 800 }}>集</span><span style={{ fontWeight: 800 }}>運</span></h1>
            <p style={{ margin: "0 0 28px", fontSize: 13, color: "#7a8a9e" }}>管理系統</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, textAlign: "left" }}>
              <div>
                <label style={{ fontSize: 13, color: "#2d4263", fontWeight: 600, marginBottom: 6, display: "block" }}>密碼</label>
                <input type="password" placeholder="輸入密碼" value={pw} autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"
                  onChange={e => { setPw(e.target.value); setPwError(false); }}
                  onKeyDown={e => e.key === "Enter" && handleLogin()}
                  style={{ width: "100%", padding: "12px 14px", border: `1px solid ${pwError ? "#c0504d" : "#d0d8e4"}`, borderRadius: 8, fontSize: 15, fontFamily: "inherit", outline: "none", color: "#1e2a3a", boxSizing: "border-box", background: "#fafbfc" }} />
              </div>
              {pwError && <div style={{ fontSize: 12, color: "#c0504d", textAlign: "center" }}>密碼錯誤，請重新輸入</div>}
              <button onClick={handleLogin} style={{ padding: "13px", background: "#34537d", color: "#fff", border: "none", borderRadius: 8, fontSize: 16, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", letterSpacing: 0.5, marginTop: 4 }}>登入</button>
            </div>
          </div>
          <p style={{ marginTop: 24, fontSize: 12, color: "#7a8a9e" }}>韓集集運 管理系統 v2.0</p>
        </div>
      ) : (
      <div style={{ display: "flex", flexDirection: mobile ? "column" : "row", minHeight: "100vh" }}>

        {/* Mobile top */}
        {mobile && (
          <div style={{ background: "#34537d", padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <img src={LOGO_SRC} alt="logo" style={{ width: 52, height: 52 }} />
              <span style={{ fontWeight: 700, fontSize: 24, letterSpacing: 2 }}><span style={{ color: "#fff" }}>韓集</span><span style={{ color: "#8ab4e0" }}>集</span><span style={{ color: "#fff" }}>運</span></span>
            </div>
            <button onClick={() => setSideOpen(!sideOpen)} style={{ background: "none", border: "none", fontSize: 28, cursor: "pointer", color: "#fff", padding: 4 }}>☰</button>
          </div>
        )}
        {mobile && sideOpen && (
          <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 30, background: "rgba(0,0,0,.3)" }} onClick={() => setSideOpen(false)}>
            <div style={{ position: "absolute", top: 0, right: 0, width: 240, height: "100%", background: "#34537d", display: "flex", flexDirection: "column", overflowY: "auto" }} onClick={e => e.stopPropagation()}>
              {sideContent}
            </div>
          </div>
        )}
        {!mobile && (
          <div style={{ width: 220, background: "#34537d", display: "flex", flexDirection: "column", flexShrink: 0, position: "sticky", top: 0, height: "100vh", overflowY: "auto" }}>
            {sideContent}
          </div>
        )}

        {/* Main */}
        <div style={{ flex: 1, overflow: "auto" }}>
          <div style={{ padding: mobile ? "14px 16px" : "16px 24px", background: "#fff", borderBottom: "1px solid #dce3ed", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <h2 style={{ margin: 0, fontSize: mobile ? 15 : 16, fontWeight: 600 }}>{getTitle()}</h2>
            {tab === "hr-employees" && <button onClick={() => { setShowAdd(true); cancelEdit(); setAddForm(f => ({ ...f, empNo: nextEmpNo() })); }} style={btnP}>＋ 新增</button>}
          </div>

          <div style={{ padding: mobile ? 14 : 22, maxWidth: 860 }}>

            {/* 營運總覽 */}
            {tab === "dash-ops" && <DashboardView />}

            {/* 今日數據 */}
            {tab === "dash-today" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr 1fr" : "repeat(5, 1fr)", gap: 10 }}>
                  {[
                    { label: "今日入庫", value: "235", unit: "件", color: "#34537d" },
                    { label: "今日出貨", value: "76", unit: "件", color: "#5b9e6f" },
                    { label: "待出貨", value: "87", unit: "件", color: "#c4953a" },
                    { label: "異常包裹", value: "3", unit: "件", color: "#c0504d" },
                    { label: "遺失件", value: "0", unit: "件", color: "#8a9ab0" },
                  ].map((s, i) => (
                    <div key={i} style={{ background: "#fff", borderRadius: 8, padding: "16px 12px", border: "1px solid #dce3ed", textAlign: "center" }}>
                      <div style={{ fontSize: 11, color: "#8a9ab0", marginBottom: 6 }}>{s.label}</div>
                      <div style={{ fontSize: 24, fontWeight: 700, color: s.color }}>{s.value}<span style={{ fontSize: 12, fontWeight: 400, marginLeft: 2 }}>{s.unit}</span></div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 14 }}>
                  <div style={{ background: "#fff", borderRadius: 8, padding: 16, border: "1px solid #dce3ed" }}>
                    <h3 style={{ fontSize: 14, fontWeight: 600, margin: "0 0 12px", color: "#34537d" }}>今日營收</h3>
                    <div style={{ fontSize: 13 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f0f2f5" }}><span style={{ color: "#4a5568" }}>今日營收</span><span style={{ fontWeight: 700, color: "#34537d" }}>{w(1850000)}</span></div>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f0f2f5" }}><span style={{ color: "#4a5568" }}>今日收款</span><span style={{ fontWeight: 700, color: "#5b9e6f" }}>{w(980000)}</span></div>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0" }}><span style={{ color: "#4a5568" }}>今日支出</span><span style={{ fontWeight: 700, color: "#c0504d" }}>{w(320000)}</span></div>
                    </div>
                  </div>
                  <div style={{ background: "#fff", borderRadius: 8, padding: 16, border: "1px solid #dce3ed" }}>
                    <h3 style={{ fontSize: 14, fontWeight: 600, margin: "0 0 12px", color: "#34537d" }}>最新入庫紀錄</h3>
                    <div style={{ fontSize: 13 }}>
                      {[
                        { time: "14:32", name: "金小姐", count: 3, status: "已入庫", sc: "#5b9e6f" },
                        { time: "14:15", name: "李先生", count: 1, status: "已入庫", sc: "#5b9e6f" },
                        { time: "13:58", name: "朴小姐", count: 5, status: "待驗收", sc: "#c4953a" },
                        { time: "13:20", name: "崔先生", count: 2, status: "已入庫", sc: "#5b9e6f" },
                      ].map((r, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", padding: "7px 0", borderBottom: i < 3 ? "1px solid #f0f2f5" : "none", gap: 8 }}>
                          <span style={{ fontSize: 12, color: "#8a9ab0", minWidth: 40 }}>{r.time}</span>
                          <span style={{ flex: 1, color: "#4a5568" }}>{r.name}</span>
                          <span style={{ fontWeight: 600 }}>{r.count}件</span>
                          <span style={{ fontSize: 11, color: r.sc, fontWeight: 600, background: r.sc + "18", padding: "2px 8px", borderRadius: 4 }}>{r.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 本月數據 */}
            {tab === "dash-month" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr 1fr", gap: 10 }}>
                  {[
                    { label: "本月累計入庫", value: "4,328", unit: "件", color: "#34537d" },
                    { label: "當月入庫件數", value: "4,289", sub: "未包裝 39 件", unit: "件", color: "#5b9e6f" },
                    { label: "已合併出貨", value: "1,056", sub: "客人合併出貨箱數", unit: "箱", color: "#7b6ba5" },
                  ].map((s, i) => (
                    <div key={i} style={{ background: "#fff", borderRadius: 8, padding: "16px", border: "1px solid #dce3ed", textAlign: "center" }}>
                      <div style={{ fontSize: 11, color: "#8a9ab0", marginBottom: 6 }}>{s.label}</div>
                      <div style={{ fontSize: 26, fontWeight: 700, color: s.color }}>{s.value}<span style={{ fontSize: 12, fontWeight: 400, marginLeft: 2 }}>{s.unit}</span></div>
                      {s.sub && <div style={{ fontSize: 11, color: "#8a9ab0", marginTop: 4 }}>{s.sub}</div>}
                    </div>
                  ))}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 14 }}>
                  <div style={{ background: "#fff", borderRadius: 8, padding: 16, border: "1px solid #dce3ed" }}>
                    <h3 style={{ fontSize: 14, fontWeight: 600, margin: "0 0 12px", color: "#34537d" }}>本月財務</h3>
                    <div style={{ fontSize: 13 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f0f2f5" }}><span style={{ color: "#4a5568" }}>本月營收</span><span style={{ fontWeight: 700, color: "#34537d" }}>{w(32450000)}</span></div>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f0f2f5" }}><span style={{ color: "#4a5568" }}>本月支出</span><span style={{ fontWeight: 700, color: "#c0504d" }}>{w(12800000)}</span></div>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0" }}><span style={{ fontWeight: 700 }}>本月利潤</span><span style={{ fontWeight: 800, fontSize: 16, color: "#5b9e6f" }}>{w(19650000)}</span></div>
                    </div>
                  </div>
                  <div style={{ background: "#fff", borderRadius: 8, padding: 16, border: "1px solid #dce3ed" }}>
                    <h3 style={{ fontSize: 14, fontWeight: 600, margin: "0 0 12px", color: "#34537d" }}>每週出貨趨勢</h3>
                    <div style={{ fontSize: 13 }}>
                      {[
                        { week: "第1週", count: 1023, pct: 100 },
                        { week: "第2週", count: 1156, pct: 113 },
                        { week: "第3週", count: 1087, pct: 106 },
                        { week: "第4週", count: 1062, pct: 104 },
                      ].map((r, i) => (
                        <div key={i} style={{ padding: "8px 0", borderBottom: i < 3 ? "1px solid #f0f2f5" : "none" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><span style={{ color: "#4a5568" }}>{r.week}</span><span style={{ fontWeight: 600 }}>{r.count.toLocaleString()} 件</span></div>
                          <div style={{ background: "#eef2f7", borderRadius: 3, height: 6 }}><div style={{ background: "#34537d", borderRadius: 3, height: 6, width: `${Math.min(r.pct, 100)}%` }} /></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 員工概況 */}
            {tab === "dash-staff" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 10 }}>
                  {[
                    { label: "在職人數", value: emps.filter(e => !e.resigned).length, unit: "人", color: "#34537d" },
                    { label: "今日出勤", value: `${emps.filter(e => !e.resigned).length} / ${emps.filter(e => !e.resigned).length}`, unit: "人", color: "#5b9e6f" },
                    { label: "請假", value: "1", unit: "人", color: "#c4953a" },
                    { label: "加班", value: "2", unit: "人", color: "#7b6ba5" },
                  ].map((s, i) => (
                    <div key={i} style={{ background: "#fff", borderRadius: 8, padding: "16px", border: "1px solid #dce3ed", textAlign: "center" }}>
                      <div style={{ fontSize: 11, color: "#8a9ab0", marginBottom: 6 }}>{s.label}</div>
                      <div style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.value}<span style={{ fontSize: 12, fontWeight: 400, marginLeft: 2 }}>{s.unit}</span></div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 14 }}>
                  <div style={{ background: "#fff", borderRadius: 8, padding: 16, border: "1px solid #dce3ed" }}>
                    <h3 style={{ fontSize: 14, fontWeight: 600, margin: "0 0 12px", color: "#34537d" }}>員工績效排行</h3>
                    {[
                      { rank: 1, name: "小王", count: 182, color: "#c4953a" },
                      { rank: 2, name: "小李", count: 156, color: "#8a9ab0" },
                      { rank: 3, name: "小張", count: 143, color: "#b85c5c" },
                    ].map((r, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", padding: "8px 0", borderBottom: i < 2 ? "1px solid #f0f2f5" : "none", gap: 10, fontSize: 13 }}>
                        <span style={{ width: 22, height: 22, borderRadius: "50%", background: r.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>{r.rank}</span>
                        <span style={{ flex: 1 }}>{r.name}</span>
                        <span style={{ fontWeight: 700, color: "#34537d" }}>{r.count} 件</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: "#fff", borderRadius: 8, padding: 16, border: "1px solid #dce3ed" }}>
                    <h3 style={{ fontSize: 14, fontWeight: 600, margin: "0 0 12px", color: "#34537d" }}>簽證即將到期</h3>
                    {emps.filter(e => e.visa && daysLeft(e.visa) > 0).sort((a, b) => new Date(a.visa) - new Date(b.visa)).slice(0, 5).map(e => {
                      const d = daysLeft(e.visa);
                      return (
                        <div key={e.id} style={{ display: "flex", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #f0f2f5", gap: 8, fontSize: 13 }}>
                          <span style={{ flex: 1 }}>{e.name}</span>
                          {e.visaType && <span style={{ fontSize: 11, color: "#34537d", background: "#e8edf4", padding: "2px 8px", borderRadius: 4 }}>{e.visaType}</span>}
                          <span style={{ fontWeight: 600, color: d <= 30 ? "#c0504d" : d <= 90 ? "#c4953a" : "#5b9e6f" }}>{d}天</span>
                        </div>
                      );
                    })}
                    {emps.filter(e => e.visa && daysLeft(e.visa) > 0).length === 0 && <div style={{ color: "#8a9ab0", fontSize: 13 }}>目前無即將到期的簽證</div>}
                  </div>
                </div>
                <div style={{ background: "#fff", borderRadius: 8, padding: 16, border: "1px solid #dce3ed" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h3 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: "#34537d" }}>本月薪資支出</h3>
                    <span style={{ fontSize: 20, fontWeight: 700, color: "#34537d" }}>{w(records.filter(r => r.month === curMonth).reduce((s, r) => s + r.totalPayable, 0) || 18500000)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* 財務概況 */}
            {tab === "dash-finance" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 10 }}>
                  {[
                    { label: "今日營收", value: w(1850000), color: "#34537d" },
                    { label: "本月營收", value: w(32450000), color: "#34537d" },
                    { label: "未收款", value: w(4120000), color: "#c0504d" },
                    { label: "已收款", value: w(28330000), color: "#5b9e6f" },
                  ].map((s, i) => (
                    <div key={i} style={{ background: "#fff", borderRadius: 8, padding: "16px", border: "1px solid #dce3ed", textAlign: "center" }}>
                      <div style={{ fontSize: 11, color: "#8a9ab0", marginBottom: 6 }}>{s.label}</div>
                      <div style={{ fontSize: 18, fontWeight: 700, color: s.color }}>{s.value}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background: "#fff", borderRadius: 8, padding: 16, border: "1px solid #dce3ed" }}>
                  <h3 style={{ fontSize: 14, fontWeight: 600, margin: "0 0 12px", color: "#34537d" }}>支出明細</h3>
                  <div style={{ fontSize: 13 }}>
                    {[
                      { label: "員工薪資", amount: 12300000 },
                      { label: "倉庫租金", amount: 2500000 },
                      { label: "物流成本", amount: 3200000 },
                      { label: "其他支出", amount: 800000 },
                    ].map((r, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 3 ? "1px solid #f0f2f5" : "none" }}>
                        <span style={{ color: "#4a5568" }}>{r.label}</span><span style={{ fontWeight: 600 }}>{w(r.amount)}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ borderTop: "2px solid #34537d", marginTop: 8, paddingTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: 700 }}>本月利潤</span>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 20, fontWeight: 800, color: "#5b9e6f" }}>{w(19650000)}</div>
                      <div style={{ fontSize: 12, color: "#5b9e6f" }}>利潤率 60.5%</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* AI 營運摘要 */}
            {tab === "dash-ai" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ background: "#fff", borderRadius: 8, padding: 18, border: "1px solid #dce3ed" }}>
                  <h3 style={{ fontSize: 14, fontWeight: 600, margin: "0 0 14px", color: "#34537d" }}>📋 今日摘要</h3>
                  <div style={{ background: "#f5f8fc", borderRadius: 8, padding: 16, fontSize: 14, lineHeight: 1.8, color: "#4a5568", border: "1px solid #e4e9f0" }}>
                    今日入庫量較昨日增加 12%，出貨效率維持穩定。有 3 件異常包裹需處理。未收款金額 {w(4120000)} 建議優先催收超過 30 天的 2 位客戶。本月營收已達 {w(32450000)}，利潤率維持在 60.5%。
                  </div>
                </div>
                <div style={{ background: "#fff", borderRadius: 8, padding: 18, border: "1px solid #dce3ed" }}>
                  <h3 style={{ fontSize: 14, fontWeight: 600, margin: "0 0 14px", color: "#c0504d" }}>⚠️ 異常提醒</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {[
                      { text: "異常包裹 3 件待處理", color: "#c0504d" },
                      { text: "客戶「金先生」欠款超過 60 天", color: "#c0504d" },
                      { text: `員工陳大華簽證 ${daysLeft("2026-07-01") || 0} 天後到期`, color: "#c4953a" },
                    ].map((r, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: r.color + "08", borderRadius: 6, border: `1px solid ${r.color}20` }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: r.color, flexShrink: 0 }} />
                        <span style={{ fontSize: 13, color: "#4a5568" }}>{r.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ background: "#fff", borderRadius: 8, padding: 18, border: "1px solid #dce3ed" }}>
                  <h3 style={{ fontSize: 14, fontWeight: 600, margin: "0 0 14px", color: "#5b9e6f" }}>📈 建議</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {[
                      "本週出貨量下降 6%，建議檢查原因",
                      "VIP 客戶本月消費下降，建議回訪",
                      "建議補充包材庫存，目前剩餘量偏低",
                    ].map((r, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: "#f0fdf4", borderRadius: 6, border: "1px solid #d1fae5" }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#5b9e6f", flexShrink: 0 }} />
                        <span style={{ fontSize: 13, color: "#4a5568" }}>{r}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ═══ 財務儀表板 ═══ */}
            {tab === "fin-dashboard" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 10 }}>
                  {[{l:"今日營收",v:w(1850000),c:"#34537d"},{l:"本月營收",v:w(32450000),c:"#34537d"},{l:"未收款",v:w(4120000),c:"#c0504d"},{l:"本月利潤",v:w(19650000),c:"#5b9e6f"}].map((s,i)=>(
                    <div key={i} style={{background:"#fff",borderRadius:8,padding:16,border:"1px solid #dce3ed",textAlign:"center"}}>
                      <div style={{fontSize:11,color:"#8a9ab0",marginBottom:6}}>{s.l}</div><div style={{fontSize:18,fontWeight:700,color:s.c}}>{s.v}</div></div>))}
                </div>
                <div style={{background:"#fff",borderRadius:8,padding:16,border:"1px solid #dce3ed"}}>
                  <h3 style={{fontSize:14,fontWeight:600,margin:"0 0 14px",color:"#34537d"}}>本月營收 vs 支出</h3>
                  {[{l:"營收",v:32450000,pct:100,c:"#34537d"},{l:"支出",v:12800000,pct:39.5,c:"#c0504d"},{l:"利潤",v:19650000,pct:60.5,c:"#5b9e6f"}].map((r,i)=>(
                    <div key={i} style={{padding:"8px 0",borderBottom:i<2?"1px solid #f0f2f5":"none"}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:4,fontSize:13}}><span style={{color:"#4a5568"}}>{r.l}</span><span style={{fontWeight:600}}>{w(r.v)}</span></div>
                      <div style={{display:"flex",alignItems:"center",gap:8}}><div style={{flex:1,background:"#eef2f7",borderRadius:3,height:8}}><div style={{background:r.c,borderRadius:3,height:8,width:`${r.pct}%`}}/></div><span style={{fontSize:11,color:"#8a9ab0",minWidth:35}}>{r.pct}%</span></div>
                    </div>))}
                </div>
                <div style={{background:"#fff",borderRadius:8,padding:16,border:"1px solid #dce3ed"}}>
                  <h3 style={{fontSize:14,fontWeight:600,margin:"0 0 12px",color:"#34537d"}}>近7日營收趨勢</h3>
                  {[{d:"5/24",v:1620000},{d:"5/25",v:1780000},{d:"5/26",v:1450000},{d:"5/27",v:1920000},{d:"5/28",v:2100000},{d:"5/29",v:1680000},{d:"5/30",v:1850000}].map((r,i)=>(
                    <div key={i} style={{padding:"6px 0",borderBottom:i<6?"1px solid #f0f2f5":"none"}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:3,fontSize:13}}><span style={{color:"#4a5568"}}>{r.d}</span><span style={{fontWeight:600}}>{w(r.v)}</span></div>
                      <div style={{background:"#eef2f7",borderRadius:3,height:5}}><div style={{background:"#34537d",borderRadius:3,height:5,width:`${(r.v/2100000*100).toFixed(0)}%`}}/></div>
                    </div>))}
                </div>
              </div>
            )}

            {/* ═══ 營收明細 ═══ */}
            {tab === "fin-revenue" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{background:"#fff",borderRadius:8,padding:16,border:"1px solid #dce3ed"}}>
                  <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"}}>
                    <select style={{...selStyle,width:"auto",minWidth:120}}><option>全部類型</option><option>出貨</option><option>代購</option><option>其他</option></select>
                    <input type="date" style={{...selStyle,width:"auto"}} />
                  </div>
                  <div style={{overflowX:"auto"}}>
                    <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
                      <thead><tr>{["日期","客戶","類型","金額","狀態"].map(h=><th key={h} style={{padding:"8px",textAlign:"left",fontSize:11,color:"#8a9ab0",borderBottom:"1px solid #dce3ed"}}>{h}</th>)}</tr></thead>
                      <tbody>
                        {[{d:"5/30 14:20",n:"金小姐",t:"出貨",a:85000,s:"已收款",sc:"#5b9e6f"},{d:"5/30 13:15",n:"李先生",t:"代購",a:120000,s:"未收款",sc:"#c0504d"},{d:"5/30 11:40",n:"朴小姐",t:"出貨",a:45000,s:"已收款",sc:"#5b9e6f"},{d:"5/30 10:05",n:"崔先生",t:"出貨",a:230000,s:"已收款",sc:"#5b9e6f"},{d:"5/30 09:30",n:"鄭小姐",t:"代購",a:95000,s:"未收款",sc:"#c0504d"}].map((r,i)=>(
                          <tr key={i} style={{borderBottom:"1px solid #f0f2f5"}}>
                            <td style={{padding:8,color:"#8a9ab0"}}>{r.d}</td><td style={{padding:8}}>{r.n}</td>
                            <td style={{padding:8}}><span style={{fontSize:11,background:"#e8edf4",padding:"2px 8px",borderRadius:4}}>{r.t}</span></td>
                            <td style={{padding:8,fontWeight:600}}>{w(r.a)}</td>
                            <td style={{padding:8}}><span style={{fontSize:11,color:r.sc,fontWeight:600}}>{r.s}</span></td></tr>))}
                      </tbody>
                    </table>
                  </div>
                  <div style={{borderTop:"2px solid #34537d",marginTop:8,paddingTop:10,fontSize:13,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
                    <span>已收款 <b style={{color:"#5b9e6f"}}>{w(980000)}</b></span><span>未收款 <b style={{color:"#c0504d"}}>{w(870000)}</b></span><span>總計 <b style={{color:"#34537d"}}>{w(1850000)}</b></span>
                  </div>
                </div>
              </div>
            )}

            {/* ═══ 收款紀錄 ═══ */}
            {tab === "fin-collection" && (
              <div style={{background:"#fff",borderRadius:8,padding:16,border:"1px solid #dce3ed"}}>
                <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"}}>
                  <select style={{...selStyle,width:"auto",minWidth:120}}><option>全部方式</option><option>現金</option><option>轉帳</option><option>信用卡</option></select>
                  <input type="date" style={{...selStyle,width:"auto"}} />
                </div>
                <div style={{overflowX:"auto"}}>
                  <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
                    <thead><tr>{["日期","客戶","金額","付款方式","備註"].map(h=><th key={h} style={{padding:"8px",textAlign:"left",fontSize:11,color:"#8a9ab0",borderBottom:"1px solid #dce3ed"}}>{h}</th>)}</tr></thead>
                    <tbody>
                      {[{d:"5/30 14:30",n:"金小姐",a:85000,m:"轉帳",note:""},{d:"5/30 12:00",n:"崔先生",a:230000,m:"現金",note:""},{d:"5/29 16:20",n:"朴小姐",a:150000,m:"轉帳",note:"部分付款"},{d:"5/29 10:00",n:"鄭小姐",a:95000,m:"信用卡",note:""}].map((r,i)=>(
                        <tr key={i} style={{borderBottom:"1px solid #f0f2f5"}}>
                          <td style={{padding:8,color:"#8a9ab0"}}>{r.d}</td><td style={{padding:8}}>{r.n}</td>
                          <td style={{padding:8,fontWeight:600}}>{w(r.a)}</td>
                          <td style={{padding:8}}><span style={{fontSize:11,background:"#e8edf4",padding:"2px 8px",borderRadius:4}}>{r.m}</span></td>
                          <td style={{padding:8,color:"#8a9ab0",fontSize:12}}>{r.note}</td></tr>))}
                    </tbody>
                  </table>
                </div>
                <div style={{borderTop:"2px solid #34537d",marginTop:10,paddingTop:10,fontSize:13}}>
                  <div style={{display:"flex",justifyContent:"space-between",padding:"4px 0"}}><span>今日收款合計</span><span style={{fontWeight:700,color:"#34537d"}}>{w(980000)}</span></div>
                  <div style={{display:"flex",justifyContent:"space-between",padding:"4px 0"}}><span>本月收款合計</span><span style={{fontWeight:700,color:"#34537d"}}>{w(28330000)}</span></div>
                </div>
              </div>
            )}

            {/* ═══ 未收款管理 ═══ */}
            {tab === "fin-unpaid" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{display:"grid",gridTemplateColumns:mobile?"1fr":"1fr 1fr 1fr",gap:10}}>
                  {[{l:"未收款總額",v:w(4120000),c:"#c0504d"},{l:"超過30天",v:w(1200000),c:"#c0504d"},{l:"客戶數",v:"12 位",c:"#34537d"}].map((s,i)=>(
                    <div key={i} style={{background:"#fff",borderRadius:8,padding:16,border:`1px solid ${i<2?"#f0d0ce":"#dce3ed"}`,textAlign:"center"}}>
                      <div style={{fontSize:11,color:"#8a9ab0",marginBottom:6}}>{s.l}</div><div style={{fontSize:20,fontWeight:700,color:s.c}}>{s.v}</div></div>))}
                </div>
                <div style={{background:"#fff",borderRadius:8,padding:16,border:"1px solid #dce3ed"}}>
                  <h3 style={{fontSize:14,fontWeight:600,margin:"0 0 12px",color:"#34537d"}}>未收款客戶</h3>
                  {[{n:"金先生",a:850000,d:62,last:"5/15",c:"#c0504d"},{n:"李小姐",a:420000,d:45,last:"5/20",c:"#c0504d"},{n:"朴先生",a:350000,d:28,last:"未催收",c:"#c4953a"},{n:"崔小姐",a:180000,d:12,last:"",c:"#8a9ab0"},{n:"張先生",a:120000,d:5,last:"",c:"#8a9ab0"}].map((r,i)=>(
                    <div key={i} style={{display:"flex",alignItems:"center",padding:"10px 0",borderBottom:i<4?"1px solid #f0f2f5":"none",gap:10,flexWrap:"wrap",fontSize:13}}>
                      <span style={{width:8,height:8,borderRadius:"50%",background:r.c,flexShrink:0}}/>
                      <span style={{flex:1,fontWeight:600,minWidth:60}}>{r.n}</span>
                      <span style={{fontWeight:700,color:"#c0504d"}}>{w(r.a)}</span>
                      <span style={{fontSize:11,color:r.c,fontWeight:600}}>{r.d}天</span>
                      {r.last && <span style={{fontSize:11,color:"#8a9ab0"}}>催收 {r.last}</span>}
                    </div>))}
                </div>
              </div>
            )}

            {/* ═══ 支出管理 ═══ */}
            {tab === "fin-expense" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{background:"#fff",borderRadius:8,padding:16,border:"1px solid #dce3ed",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span style={{fontSize:14,fontWeight:600}}>本月支出總額</span><span style={{fontSize:22,fontWeight:700,color:"#34537d"}}>{w(expTotal)}</span>
                </div>
                <div style={{background:"#fff",borderRadius:8,padding:16,border:"1px solid #dce3ed"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                    <h3 style={{fontSize:14,fontWeight:600,margin:0,color:"#34537d"}}>支出分類</h3>
                    <span style={{fontSize:11,color:"#8a9ab0"}}>點兩下金額可修改</span>
                  </div>
                  {expenses.map((exp,i)=>{
                    const pct = expTotal > 0 ? Math.round(exp.amount / expTotal * 100) : 0;
                    const isEditing = editingExpId === exp.id;
                    return (
                      <div key={exp.id} style={{padding:"10px 0",borderBottom:i<expenses.length-1?"1px solid #f0f2f5":"none"}}>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4,fontSize:13,gap:8}}>
                          <span style={{color:"#4a5568",flex:1}}>{exp.label}</span>
                          {isEditing ? (
                            <div style={{display:"flex",gap:6,alignItems:"center"}}>
                              <input type="number" value={editingExpVal} onChange={e => setEditingExpVal(e.target.value)} autoFocus
                                style={{width:120,padding:"6px 10px",border:"1px solid #34537d",borderRadius:6,fontSize:14,fontFamily:"inherit",outline:"none",textAlign:"right"}} />
                              <button onClick={() => { setExpenses(p => p.map(x => x.id === exp.id ? {...x, amount: +editingExpVal || 0} : x)); setEditingExpId(null); }}
                                style={{padding:"6px 12px",background:"#34537d",color:"#fff",border:"none",borderRadius:6,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>確認</button>
                              <button onClick={() => setEditingExpId(null)}
                                style={{padding:"6px 10px",background:"#e4e9f0",color:"#4a5568",border:"none",borderRadius:6,fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>取消</button>
                            </div>
                          ) : (
                            <div style={{display:"flex",alignItems:"center",gap:8}}>
                              <span style={{fontWeight:600,cursor:"pointer",padding:"4px 8px",borderRadius:4,transition:"background .15s"}}
                                onDoubleClick={() => { setEditingExpId(exp.id); setEditingExpVal(String(exp.amount)); }}
                                onTouchEnd={(e) => {
                                  if (exp._lastTap && Date.now() - exp._lastTap < 300) { setEditingExpId(exp.id); setEditingExpVal(String(exp.amount)); }
                                  exp._lastTap = Date.now();
                                }}
                              >{w(exp.amount)}</span>
                              <button onClick={() => { setExpenses(p => p.filter(x => x.id !== exp.id)); }}
                                style={{padding:"2px 6px",background:"none",border:"none",cursor:"pointer",fontSize:14,color:"#c0504d",opacity:0.5}}>×</button>
                            </div>
                          )}
                        </div>
                        <div style={{display:"flex",alignItems:"center",gap:8}}>
                          <div style={{flex:1,background:"#eef2f7",borderRadius:3,height:6}}><div style={{background:"#34537d",borderRadius:3,height:6,width:`${pct}%`,transition:"width .3s"}}/></div>
                          <span style={{fontSize:11,color:"#8a9ab0",minWidth:30}}>{pct}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {showAddExp ? (
                  <div style={{background:"#fff",borderRadius:8,padding:16,border:"1px solid #dce3ed"}}>
                    <p style={{margin:"0 0 10px",fontWeight:600,fontSize:14}}>新增支出項目</p>
                    <div style={{display:"grid",gridTemplateColumns:mobile?"1fr":"1fr 1fr",gap:10}}>
                      <Inp label="項目名稱" value={newExpLabel} onChange={e => setNewExpLabel(e.target.value)} placeholder="例：水電費" />
                      <Inp label="金額（₩）" type="number" value={newExpAmount} onChange={e => setNewExpAmount(e.target.value)} placeholder="0" />
                    </div>
                    <div style={{display:"flex",gap:8,marginTop:12}}>
                      <button onClick={() => { if (newExpLabel && newExpAmount) { setExpenses(p => [...p, {id: Date.now(), label: newExpLabel, amount: +newExpAmount || 0}]); setNewExpLabel(""); setNewExpAmount(""); setShowAddExp(false); }}}
                        style={btnP}>儲存</button>
                      <button onClick={() => { setShowAddExp(false); setNewExpLabel(""); setNewExpAmount(""); }} style={btnS}>取消</button>
                    </div>
                  </div>
                ) : (
                  <button onClick={() => setShowAddExp(true)} style={{...btnP,padding:"12px",fontSize:15,width:"100%",borderRadius:8}}>＋ 新增支出</button>
                )}
              </div>
            )}

            {/* ═══ 員工薪資支出 ═══ */}
            {tab === "fin-salary" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{background:"#fff",borderRadius:8,padding:16,border:"1px solid #dce3ed",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span style={{fontSize:14,fontWeight:600}}>本月薪資總支出</span><span style={{fontSize:22,fontWeight:700,color:"#34537d"}}>{w(18500000)}</span>
                </div>
                <div style={{background:"#fff",borderRadius:8,padding:16,border:"1px solid #dce3ed"}}>
                  {emps.filter(e=>!e.resigned).map((e,i)=>(
                    <div key={e.id} style={{display:"flex",alignItems:"center",padding:"10px 0",borderBottom:i<emps.filter(x=>!x.resigned).length-1?"1px solid #f0f2f5":"none",gap:10,flexWrap:"wrap",fontSize:13}}>
                      <Dot id={e.id}/><span style={{minWidth:45,color:"#8a9ab0"}}>{e.empNo}</span>
                      <span style={{flex:1,fontWeight:600}}>{e.name}</span>
                      <span style={{fontSize:11,background:"#e8edf4",padding:"2px 8px",borderRadius:4}}>{e.type}</span>
                      <span style={{fontWeight:700,minWidth:100,textAlign:"right"}}>{w(e.type==="正職員工"?e.msalary:e.rate*160)}</span>
                      <span style={{fontSize:11,fontWeight:600,color:i<2?"#5b9e6f":"#c4953a",background:i<2?"#e8f5e920":"#fff3e0",padding:"2px 8px",borderRadius:4}}>{i<2?"已發放 ✓":"未發放"}</span>
                    </div>))}
                  <div style={{borderTop:"2px solid #34537d",marginTop:8,paddingTop:10,fontSize:13}}>
                    <div style={{display:"flex",justifyContent:"space-between",padding:"4px 0"}}><span>已發放</span><span style={{fontWeight:700,color:"#5b9e6f"}}>{w(6300000)}</span></div>
                    <div style={{display:"flex",justifyContent:"space-between",padding:"4px 0"}}><span>未發放</span><span style={{fontWeight:700,color:"#c4953a"}}>{w(2050000)}</span></div>
                  </div>
                </div>
              </div>
            )}

            {/* ═══ 利潤分析 ═══ */}
            {tab === "fin-profit" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{background:"#fff",borderRadius:8,padding:16,border:"1px solid #dce3ed",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
                  <div><div style={{fontSize:11,color:"#8a9ab0"}}>本月利潤</div><div style={{fontSize:24,fontWeight:700,color:"#5b9e6f"}}>{w(19650000)}</div></div>
                  <div style={{background:"#e8f5e9",padding:"8px 16px",borderRadius:8}}><span style={{fontSize:14,fontWeight:700,color:"#5b9e6f"}}>利潤率 60.5%</span></div>
                </div>
                <div style={{background:"#fff",borderRadius:8,padding:16,border:"1px solid #dce3ed"}}>
                  <h3 style={{fontSize:14,fontWeight:600,margin:"0 0 12px",color:"#34537d"}}>收入結構</h3>
                  {[{l:"出貨收入",v:24500000,pct:75.5,c:"#34537d"},{l:"代購收入",v:6800000,pct:21,c:"#7b6ba5"},{l:"其他收入",v:1150000,pct:3.5,c:"#8a9ab0"}].map((r,i)=>(
                    <div key={i} style={{padding:"8px 0",borderBottom:i<2?"1px solid #f0f2f5":"none"}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:4,fontSize:13}}><span>{r.l}</span><span style={{fontWeight:600}}>{w(r.v)}</span></div>
                      <div style={{display:"flex",alignItems:"center",gap:8}}><div style={{flex:1,background:"#eef2f7",borderRadius:3,height:6}}><div style={{background:r.c,borderRadius:3,height:6,width:`${r.pct}%`}}/></div><span style={{fontSize:11,color:"#8a9ab0"}}>{r.pct}%</span></div>
                    </div>))}
                </div>
                <div style={{background:"#fff",borderRadius:8,padding:16,border:"1px solid #dce3ed"}}>
                  <h3 style={{fontSize:14,fontWeight:600,margin:"0 0 12px",color:"#34537d"}}>每月利潤趨勢</h3>
                  {[{m:"2026/01",v:15200000,r:58},{m:"2026/02",v:16800000,r:59},{m:"2026/03",v:18100000,r:61},{m:"2026/04",v:17500000,r:60},{m:"2026/05",v:19650000,r:60.5}].map((r,i)=>(
                    <div key={i} style={{padding:"8px 0",borderBottom:i<4?"1px solid #f0f2f5":"none"}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:4,fontSize:13}}>
                        <span style={{color:r.m===curMonth?"#34537d":"#4a5568",fontWeight:r.m===curMonth?700:400}}>{r.m}</span>
                        <span><span style={{fontWeight:600}}>{w(r.v)}</span><span style={{fontSize:11,color:"#5b9e6f",marginLeft:8}}>利潤率 {r.r}%</span></span>
                      </div>
                      <div style={{background:"#eef2f7",borderRadius:3,height:6}}><div style={{background:r.m===curMonth?"#5b9e6f":"#34537d",borderRadius:3,height:6,width:`${(r.v/20000000*100).toFixed(0)}%`}}/></div>
                    </div>))}
                </div>
              </div>
            )}

            {/* ═══ 月報表 ═══ */}
            {tab === "fin-monthly" && (
              <div style={{background:"#fff",borderRadius:8,overflow:"hidden",border:"1px solid #dce3ed"}}>
                <div style={{padding:"14px 18px",background:"#34537d",color:"#fff",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span style={{fontWeight:600,fontSize:15}}>月報表</span>
                  <select style={{background:"rgba(255,255,255,.15)",color:"#fff",border:"1px solid rgba(255,255,255,.3)",borderRadius:6,padding:"6px 10px",fontSize:13,fontFamily:"inherit"}}>
                    <option>2026/05</option><option>2026/04</option><option>2026/03</option><option>2026/02</option><option>2026/01</option>
                  </select>
                </div>
                <div style={{padding:18,fontSize:13}}>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
                    {[{l:"總營收",v:w(32450000),c:"#34537d"},{l:"總支出",v:w(12800000),c:"#c0504d"},{l:"淨利潤",v:w(19650000),c:"#5b9e6f"},{l:"利潤率",v:"60.5%",c:"#5b9e6f"}].map((s,i)=>(
                      <div key={i} style={{background:"#f5f8fc",borderRadius:6,padding:12,textAlign:"center"}}><div style={{fontSize:11,color:"#8a9ab0",marginBottom:4}}>{s.l}</div><div style={{fontSize:16,fontWeight:700,color:s.c}}>{s.v}</div></div>))}
                  </div>
                  <div style={{borderBottom:"1px solid #f0f2f5",paddingBottom:12,marginBottom:12}}>
                    <div style={{fontWeight:600,marginBottom:8,color:"#34537d"}}>營運數據</div>
                    {[{l:"出貨件數",v:"4,328 件"},{l:"客戶數",v:"635 位"},{l:"新增客戶",v:"18 位"}].map((r,i)=>(
                      <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"4px 0"}}><span style={{color:"#4a5568"}}>{r.l}</span><span style={{fontWeight:600}}>{r.v}</span></div>))}
                  </div>
                  <div style={{borderBottom:"1px solid #f0f2f5",paddingBottom:12,marginBottom:12}}>
                    <div style={{fontWeight:600,marginBottom:8,color:"#34537d"}}>營收明細</div>
                    {[{l:"出貨",v:24500000},{l:"代購",v:6800000},{l:"其他",v:1150000}].map((r,i)=>(
                      <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"4px 0"}}><span style={{color:"#4a5568"}}>{r.l}</span><span style={{fontWeight:600}}>{w(r.v)}</span></div>))}
                  </div>
                  <div>
                    <div style={{fontWeight:600,marginBottom:8,color:"#34537d"}}>支出明細</div>
                    {[{l:"薪資",v:12300000},{l:"租金",v:2500000},{l:"物流",v:3200000},{l:"其他",v:800000}].map((r,i)=>(
                      <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"4px 0"}}><span style={{color:"#4a5568"}}>{r.l}</span><span style={{fontWeight:600}}>{w(r.v)}</span></div>))}
                  </div>
                </div>
              </div>
            )}

            {/* ═══ 年報表 ═══ */}
            {tab === "fin-yearly" && (
              <div style={{background:"#fff",borderRadius:8,overflow:"hidden",border:"1px solid #dce3ed"}}>
                <div style={{padding:"14px 18px",background:"#34537d",color:"#fff"}}><span style={{fontWeight:600,fontSize:15}}>2026 年度報表</span></div>
                <div style={{padding:18,overflowX:"auto"}}>
                  <table style={{width:"100%",borderCollapse:"collapse",fontSize:13,minWidth:500}}>
                    <thead><tr>{["月份","營收","支出","利潤","利潤率"].map(h=><th key={h} style={{padding:"8px",textAlign:h==="月份"?"left":"right",fontSize:11,color:"#8a9ab0",borderBottom:"1px solid #dce3ed"}}>{h}</th>)}</tr></thead>
                    <tbody>
                      {[{m:"01月",r:26200000,e:11000000,p:15200000,pr:"58%"},{m:"02月",r:28500000,e:11700000,p:16800000,pr:"59%"},{m:"03月",r:29700000,e:11600000,p:18100000,pr:"61%"},{m:"04月",r:29200000,e:11700000,p:17500000,pr:"60%"},{m:"05月",r:32450000,e:12800000,p:19650000,pr:"60.5%"}].map((r,i)=>(
                        <tr key={i} style={{borderBottom:"1px solid #f0f2f5",background:i===4?"#f5f8fc":"transparent"}}>
                          <td style={{padding:8,fontWeight:i===4?700:400}}>{r.m}</td>
                          <td style={{padding:8,textAlign:"right"}}>{w(r.r)}</td>
                          <td style={{padding:8,textAlign:"right",color:"#c0504d"}}>{w(r.e)}</td>
                          <td style={{padding:8,textAlign:"right",color:"#5b9e6f",fontWeight:600}}>{w(r.p)}</td>
                          <td style={{padding:8,textAlign:"right"}}>{r.pr}</td></tr>))}
                    </tbody>
                  </table>
                  <div style={{borderTop:"2px solid #34537d",marginTop:8,paddingTop:12}}>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                      {[{l:"年度總營收",v:w(146050000),c:"#34537d"},{l:"年度總支出",v:w(58800000),c:"#c0504d"},{l:"年度總利潤",v:w(87250000),c:"#5b9e6f"},{l:"平均利潤率",v:"59.7%",c:"#5b9e6f"}].map((s,i)=>(
                        <div key={i} style={{background:"#f5f8fc",borderRadius:6,padding:10,textAlign:"center"}}><div style={{fontSize:11,color:"#8a9ab0",marginBottom:4}}>{s.l}</div><div style={{fontSize:16,fontWeight:700,color:s.c}}>{s.v}</div></div>))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ═══ 客戶列表 ═══ */}
            {tab === "cust-list" && (
              <div style={{background:"#fff",borderRadius:8,padding:16,border:"1px solid #dce3ed"}}>
                <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"}}>
                  <input placeholder="搜尋姓名 / 電話 / 編號" style={{...selStyle,flex:1,minWidth:150}} />
                  <select style={{...selStyle,width:"auto",minWidth:100}}><option>全部</option><option>VIP</option><option>一般</option><option>黑名單</option></select>
                  <button style={btnP}>＋ 新增客戶</button>
                </div>
                <div style={{overflowX:"auto"}}>
                  <table style={{width:"100%",borderCollapse:"collapse",fontSize:13,minWidth:550}}>
                    <thead><tr>{["編號","客戶名","電話","等級","累計消費","最近出貨"].map(h=><th key={h} style={{padding:8,textAlign:"left",fontSize:11,color:"#8a9ab0",borderBottom:"1px solid #dce3ed"}}>{h}</th>)}</tr></thead>
                    <tbody>
                      {[{id:"C001",n:"金小姐",p:"010-1234-5678",g:"VIP",t:12500000,d:"5/30",gc:"#c4953a"},{id:"C002",n:"李先生",p:"010-2345-6789",g:"一般",t:3200000,d:"5/28",gc:"#34537d"},{id:"C003",n:"朴小姐",p:"010-3456-7890",g:"VIP",t:8900000,d:"5/30",gc:"#c4953a"},{id:"C004",n:"崔先生",p:"010-4567-8901",g:"黑名單",t:1500000,d:"4/12",gc:"#c0504d"},{id:"C005",n:"鄭小姐",p:"010-5678-9012",g:"一般",t:2800000,d:"5/29",gc:"#34537d"},{id:"C006",n:"張先生",p:"010-6789-0123",g:"VIP",t:7200000,d:"3/15",gc:"#c4953a"}].map((r,i)=>(
                        <tr key={i} style={{borderBottom:"1px solid #f0f2f5",cursor:"pointer"}} onClick={()=>switchTab("cust-detail")}>
                          <td style={{padding:8,color:"#8a9ab0"}}>{r.id}</td><td style={{padding:8,fontWeight:600}}>{r.n}</td><td style={{padding:8,fontSize:12,color:"#8a9ab0"}}>{r.p}</td>
                          <td style={{padding:8}}><span style={{fontSize:11,fontWeight:600,color:r.gc,background:r.gc+"15",padding:"2px 8px",borderRadius:4}}>{r.g}</span></td>
                          <td style={{padding:8,fontWeight:600}}>{w(r.t)}</td><td style={{padding:8,color:"#8a9ab0"}}>{r.d}</td></tr>))}
                    </tbody>
                  </table>
                </div>
                <div style={{marginTop:12,fontSize:12,color:"#8a9ab0"}}>總客戶 635 位</div>
              </div>
            )}

            {/* ═══ 客戶資料 ═══ */}
            {tab === "cust-detail" && (
              <div style={{display:"flex",flexDirection:"column",gap:14}}>
                <div style={{background:"#fff",borderRadius:8,padding:16,border:"1px solid #dce3ed"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:8,marginBottom:14}}>
                    <div><div style={{fontSize:18,fontWeight:700}}>金小姐</div><div style={{fontSize:12,color:"#8a9ab0"}}>C001 · 加入日期 2024-06-15</div></div>
                    <span style={{fontSize:12,fontWeight:600,color:"#c4953a",background:"#c4953a15",padding:"4px 12px",borderRadius:6}}>VIP ⭐</span>
                  </div>
                  <div style={{fontSize:13,lineHeight:2}}>
                    {[{l:"電話",v:"010-1234-5678"},{l:"LINE ID",v:"kim_123"},{l:"地址",v:"首爾市 江南區 ..."},{l:"備註",v:"每週固定出貨，需優先處理"}].map((r,i)=>(
                      <div key={i} style={{display:"flex",gap:12}}><span style={{color:"#8a9ab0",minWidth:55}}>{r.l}</span><span>{r.v}</span></div>))}
                  </div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:mobile?"1fr 1fr":"repeat(4, 1fr)",gap:10}}>
                  {[{l:"累計消費",v:w(12500000),c:"#34537d"},{l:"本月消費",v:w(850000),c:"#34537d"},{l:"平均月消費",v:w(960000),c:"#5b9e6f"},{l:"出貨次數",v:"128 次",c:"#7b6ba5"}].map((s,i)=>(
                    <div key={i} style={{background:"#fff",borderRadius:8,padding:14,border:"1px solid #dce3ed",textAlign:"center"}}><div style={{fontSize:11,color:"#8a9ab0",marginBottom:4}}>{s.l}</div><div style={{fontSize:16,fontWeight:700,color:s.c}}>{s.v}</div></div>))}
                </div>
                <div style={{background:"#fff",borderRadius:8,padding:16,border:"1px solid #dce3ed"}}>
                  <h3 style={{fontSize:14,fontWeight:600,margin:"0 0 12px",color:"#34537d"}}>最近出貨紀錄</h3>
                  {[{d:"5/30",c:3,a:85000,s:"已出貨"},{d:"5/25",c:2,a:62000,s:"已出貨"},{d:"5/18",c:5,a:145000,s:"已出貨"}].map((r,i)=>(
                    <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:i<2?"1px solid #f0f2f5":"none",fontSize:13}}>
                      <span style={{color:"#8a9ab0"}}>{r.d}</span><span>{r.c}件</span><span style={{fontWeight:600}}>{w(r.a)}</span>
                      <span style={{fontSize:11,color:"#5b9e6f",fontWeight:600}}>{r.s}</span></div>))}
                </div>
                <div style={{background:"#fff",borderRadius:8,padding:16,border:"1px solid #fde8e8"}}>
                  <h3 style={{fontSize:14,fontWeight:600,margin:"0 0 12px",color:"#c0504d"}}>未付款紀錄</h3>
                  <div style={{display:"flex",justifyContent:"space-between",padding:"8px 0",fontSize:13}}>
                    <span style={{color:"#8a9ab0"}}>5/30</span><span style={{fontWeight:600,color:"#c0504d"}}>{w(85000)}</span><span style={{fontSize:11,color:"#c4953a"}}>待收款（3天）</span></div>
                </div>
              </div>
            )}

            {/* ═══ VIP客戶 ═══ */}
            {tab === "cust-vip" && (
              <div style={{display:"flex",flexDirection:"column",gap:14}}>
                <div style={{background:"#fff",borderRadius:8,padding:16,border:"1px solid #dce3ed",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
                  <div><div style={{fontSize:11,color:"#8a9ab0"}}>VIP 客戶數</div><div style={{fontSize:24,fontWeight:700,color:"#c4953a"}}>42 位</div></div>
                  <div style={{background:"#f5f8fc",padding:"8px 14px",borderRadius:6,fontSize:12,color:"#8a9ab0"}}>VIP 標準：累計消費 ≥ ₩5,000,000</div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:mobile?"1fr":"1fr 1fr",gap:10}}>
                  <div style={{background:"#fff",borderRadius:8,padding:14,border:"1px solid #dce3ed",textAlign:"center"}}><div style={{fontSize:11,color:"#8a9ab0",marginBottom:4}}>VIP 本月總消費</div><div style={{fontSize:18,fontWeight:700,color:"#34537d"}}>{w(18500000)}</div></div>
                  <div style={{background:"#fff",borderRadius:8,padding:14,border:"1px solid #dce3ed",textAlign:"center"}}><div style={{fontSize:11,color:"#8a9ab0",marginBottom:4}}>VIP 佔總營收</div><div style={{fontSize:18,fontWeight:700,color:"#5b9e6f"}}>57%</div></div>
                </div>
                <div style={{background:"#fff",borderRadius:8,padding:16,border:"1px solid #dce3ed"}}>
                  {[{r:1,n:"金小姐",t:12500000,m:850000,s:"活躍",sc:"#5b9e6f"},{r:2,n:"朴小姐",t:8900000,m:620000,s:"活躍",sc:"#5b9e6f"},{r:3,n:"張先生",t:7200000,m:0,s:"⚠️ 沉睡",sc:"#c4953a"},{r:4,n:"崔先生",t:5100000,m:380000,s:"活躍",sc:"#5b9e6f"},{r:5,n:"黃小姐",t:5050000,m:210000,s:"活躍",sc:"#5b9e6f"}].map((r,i)=>(
                    <div key={i} style={{display:"flex",alignItems:"center",padding:"10px 0",borderBottom:i<4?"1px solid #f0f2f5":"none",gap:10,fontSize:13,flexWrap:"wrap"}}>
                      <span style={{fontWeight:700,color:"#c4953a",minWidth:20}}>{r.r}.</span>
                      <span style={{flex:1,fontWeight:600,minWidth:60}}>{r.n}</span>
                      <span style={{fontWeight:600}}>{w(r.t)}</span>
                      <span style={{fontSize:12,color:"#8a9ab0"}}>本月 {w(r.m)}</span>
                      <span style={{fontSize:11,color:r.sc,fontWeight:600}}>{r.s}</span></div>))}
                </div>
              </div>
            )}

            {/* ═══ 活躍客戶 ═══ */}
            {tab === "cust-active" && (
              <div style={{display:"flex",flexDirection:"column",gap:14}}>
                <div style={{display:"grid",gridTemplateColumns:mobile?"1fr":"1fr 1fr 1fr",gap:10}}>
                  {[{l:"活躍客戶",v:"185 位",c:"#5b9e6f"},{l:"本月消費",v:w(28900000),c:"#34537d"},{l:"平均消費",v:"₩ 156,000/人",c:"#7b6ba5"}].map((s,i)=>(
                    <div key={i} style={{background:"#fff",borderRadius:8,padding:16,border:"1px solid #dce3ed",textAlign:"center"}}><div style={{fontSize:11,color:"#8a9ab0",marginBottom:6}}>{s.l}</div><div style={{fontSize:18,fontWeight:700,color:s.c}}>{s.v}</div></div>))}
                </div>
                <div style={{background:"#fff",borderRadius:8,padding:16,border:"1px solid #dce3ed"}}>
                  <div style={{fontSize:12,color:"#8a9ab0",marginBottom:12}}>活躍定義：最近30天內有出貨紀錄</div>
                  {[{n:"金小姐",g:"VIP",d:"5/30",m:850000},{n:"朴小姐",g:"VIP",d:"5/30",m:620000},{n:"李先生",g:"一般",d:"5/28",m:180000},{n:"鄭小姐",g:"一般",d:"5/29",m:95000},{n:"崔先生",g:"VIP",d:"5/27",m:380000}].map((r,i)=>(
                    <div key={i} style={{display:"flex",alignItems:"center",padding:"10px 0",borderBottom:i<4?"1px solid #f0f2f5":"none",gap:10,fontSize:13,flexWrap:"wrap"}}>
                      <span style={{flex:1,fontWeight:600,minWidth:60}}>{r.n}</span>
                      <span style={{fontSize:11,color:r.g==="VIP"?"#c4953a":"#34537d",background:r.g==="VIP"?"#c4953a15":"#e8edf4",padding:"2px 8px",borderRadius:4}}>{r.g}</span>
                      <span style={{fontSize:12,color:"#8a9ab0"}}>最近 {r.d}</span>
                      <span style={{fontWeight:600}}>本月 {w(r.m)}</span></div>))}
                </div>
              </div>
            )}

            {/* ═══ 沉睡客戶 ═══ */}
            {tab === "cust-inactive" && (
              <div style={{display:"flex",flexDirection:"column",gap:14}}>
                <div style={{display:"grid",gridTemplateColumns:mobile?"1fr":"1fr 1fr 1fr",gap:10}}>
                  {[{l:"沉睡客戶",v:"89 位",c:"#8a9ab0"},{l:"超過60天",v:"32 位",c:"#c0504d"},{l:"流失風險（曾VIP）",v:"12 位",c:"#c4953a"}].map((s,i)=>(
                    <div key={i} style={{background:"#fff",borderRadius:8,padding:16,border:`1px solid ${i===1?"#f0d0ce":"#dce3ed"}`,textAlign:"center"}}><div style={{fontSize:11,color:"#8a9ab0",marginBottom:6}}>{s.l}</div><div style={{fontSize:18,fontWeight:700,color:s.c}}>{s.v}</div></div>))}
                </div>
                <div style={{background:"#fff",borderRadius:8,padding:16,border:"1px solid #dce3ed"}}>
                  <div style={{fontSize:12,color:"#8a9ab0",marginBottom:12}}>沉睡定義：超過30天未出貨</div>
                  {[{n:"張先生",g:"VIP",d:"3/15",days:76,t:7200000,c:"#c0504d"},{n:"吳小姐",g:"一般",d:"3/28",days:63,t:2100000,c:"#c0504d"},{n:"黃先生",g:"一般",d:"4/20",days:40,t:1800000,c:"#c4953a"},{n:"王小姐",g:"一般",d:"4/28",days:32,t:950000,c:"#c4953a"}].map((r,i)=>(
                    <div key={i} style={{display:"flex",alignItems:"center",padding:"10px 0",borderBottom:i<3?"1px solid #f0f2f5":"none",gap:10,fontSize:13,flexWrap:"wrap"}}>
                      <span style={{width:8,height:8,borderRadius:"50%",background:r.c,flexShrink:0}}/>
                      <span style={{flex:1,fontWeight:600,minWidth:60}}>{r.n}</span>
                      <span style={{fontSize:11,color:r.g==="VIP"?"#c4953a":"#34537d",background:r.g==="VIP"?"#c4953a15":"#e8edf4",padding:"2px 8px",borderRadius:4}}>{r.g}</span>
                      <span style={{fontSize:12,color:"#8a9ab0"}}>最後 {r.d}</span>
                      <span style={{fontSize:12,fontWeight:600,color:r.c}}>沉睡{r.days}天</span>
                      <span style={{fontSize:12,color:"#8a9ab0"}}>累計 {w(r.t)}</span></div>))}
                </div>
              </div>
            )}

            {/* ═══ 未付款客戶 ═══ */}
            {tab === "cust-unpaid" && (
              <div style={{display:"flex",flexDirection:"column",gap:14}}>
                <div style={{display:"grid",gridTemplateColumns:mobile?"1fr":"1fr 1fr 1fr",gap:10}}>
                  {[{l:"未付款總額",v:w(4120000),c:"#c0504d"},{l:"未付款客戶",v:"12 位",c:"#34537d"},{l:"超過30天",v:"3 位",c:"#c0504d"}].map((s,i)=>(
                    <div key={i} style={{background:"#fff",borderRadius:8,padding:16,border:`1px solid ${s.c==="#c0504d"?"#f0d0ce":"#dce3ed"}`,textAlign:"center"}}><div style={{fontSize:11,color:"#8a9ab0",marginBottom:6}}>{s.l}</div><div style={{fontSize:18,fontWeight:700,color:s.c}}>{s.v}</div></div>))}
                </div>
                <div style={{background:"#fff",borderRadius:8,padding:16,border:"1px solid #dce3ed"}}>
                  {[{n:"金先生",a:850000,cnt:3,oldest:"3/28",days:62,c:"#c0504d"},{n:"李小姐",a:420000,cnt:2,oldest:"4/15",days:45,c:"#c0504d"},{n:"朴先生",a:350000,cnt:1,oldest:"5/02",days:28,c:"#c4953a"},{n:"崔小姐",a:180000,cnt:1,oldest:"5/18",days:12,c:"#8a9ab0"},{n:"張先生",a:120000,cnt:1,oldest:"5/25",days:5,c:"#8a9ab0"}].map((r,i)=>(
                    <div key={i} style={{padding:"12px 0",borderBottom:i<4?"1px solid #f0f2f5":"none"}}>
                      <div style={{display:"flex",alignItems:"center",gap:10,fontSize:13,flexWrap:"wrap"}}>
                        <span style={{width:8,height:8,borderRadius:"50%",background:r.c,flexShrink:0}}/>
                        <span style={{flex:1,fontWeight:600,minWidth:60}}>{r.n}</span>
                        <span style={{fontWeight:700,color:"#c0504d"}}>{w(r.a)}</span>
                        <span style={{fontSize:11,color:"#8a9ab0"}}>{r.cnt}筆</span>
                        <span style={{fontSize:11,fontWeight:600,color:r.c}}>最早 {r.oldest}（{r.days}天）</span></div>
                    </div>))}
                </div>
              </div>
            )}

            {/* ═══ 客戶消費排行 ═══ */}
            {tab === "cust-ranking" && (
              <div style={{display:"flex",flexDirection:"column",gap:14}}>
                <div style={{display:"flex",gap:8,marginBottom:2}}>
                  <select style={{...selStyle,width:"auto",minWidth:100}}><option>全部</option><option>本月</option><option>本季</option><option>本年</option></select>
                </div>
                <div style={{background:"#fff",borderRadius:8,padding:16,border:"1px solid #dce3ed"}}>
                  {[{r:1,n:"金小姐",t:12500000,cnt:128,g:"VIP",medal:"🥇"},{r:2,n:"朴小姐",t:8900000,cnt:95,g:"VIP",medal:"🥈"},{r:3,n:"張先生",t:7200000,cnt:82,g:"VIP",medal:"🥉"},{r:4,n:"崔先生",t:5100000,cnt:64,g:"VIP",medal:""},{r:5,n:"李先生",t:3200000,cnt:45,g:"一般",medal:""},{r:6,n:"鄭小姐",t:2800000,cnt:38,g:"一般",medal:""}].map((r,i)=>(
                    <div key={i} style={{display:"flex",alignItems:"center",padding:"10px 0",borderBottom:i<5?"1px solid #f0f2f5":"none",gap:10,fontSize:13,flexWrap:"wrap"}}>
                      <span style={{minWidth:28,fontWeight:700,fontSize:r.medal?16:13,textAlign:"center"}}>{r.medal||r.r+"."}</span>
                      <span style={{flex:1,fontWeight:600,minWidth:60}}>{r.n}</span>
                      <span style={{fontSize:11,color:r.g==="VIP"?"#c4953a":"#34537d",background:r.g==="VIP"?"#c4953a15":"#e8edf4",padding:"2px 8px",borderRadius:4}}>{r.g}</span>
                      <span style={{fontWeight:700,color:"#34537d"}}>{w(r.t)}</span>
                      <span style={{fontSize:12,color:"#8a9ab0"}}>{r.cnt}次</span></div>))}
                </div>
                <div style={{background:"#fff",borderRadius:8,padding:16,border:"1px solid #dce3ed",fontSize:13}}>
                  <div style={{display:"flex",justifyContent:"space-between",padding:"6px 0"}}><span style={{color:"#4a5568"}}>前10名佔總營收</span><span style={{fontWeight:700,color:"#34537d"}}>68%</span></div>
                  <div style={{display:"flex",justifyContent:"space-between",padding:"6px 0"}}><span style={{color:"#4a5568"}}>前20名佔總營收</span><span style={{fontWeight:700,color:"#34537d"}}>85%</span></div>
                </div>
              </div>
            )}

            {/* ═══ 客戶分析 ═══ */}
            {tab === "cust-analysis" && (
              <div style={{display:"flex",flexDirection:"column",gap:14}}>
                <div style={{display:"grid",gridTemplateColumns:mobile?"1fr 1fr":"repeat(4, 1fr)",gap:10}}>
                  {[{l:"總客戶數",v:"635 位",c:"#34537d"},{l:"本月活躍",v:"185 位（29%）",c:"#5b9e6f"},{l:"新增客戶",v:"18 位",c:"#7b6ba5"},{l:"流失客戶",v:"5 位",c:"#c0504d"}].map((s,i)=>(
                    <div key={i} style={{background:"#fff",borderRadius:8,padding:14,border:"1px solid #dce3ed",textAlign:"center"}}><div style={{fontSize:11,color:"#8a9ab0",marginBottom:4}}>{s.l}</div><div style={{fontSize:16,fontWeight:700,color:s.c}}>{s.v}</div></div>))}
                </div>
                <div style={{background:"#fff",borderRadius:8,padding:16,border:"1px solid #dce3ed"}}>
                  <h3 style={{fontSize:14,fontWeight:600,margin:"0 0 12px",color:"#34537d"}}>客戶等級分佈</h3>
                  {[{l:"VIP",v:42,pct:7,c:"#c4953a"},{l:"一般",v:580,pct:91,c:"#34537d"},{l:"黑名單",v:13,pct:2,c:"#c0504d"}].map((r,i)=>(
                    <div key={i} style={{padding:"8px 0",borderBottom:i<2?"1px solid #f0f2f5":"none"}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:4,fontSize:13}}><span>{r.l}</span><span style={{fontWeight:600}}>{r.v} 位</span></div>
                      <div style={{display:"flex",alignItems:"center",gap:8}}><div style={{flex:1,background:"#eef2f7",borderRadius:3,height:6}}><div style={{background:r.c,borderRadius:3,height:6,width:`${r.pct}%`}}/></div><span style={{fontSize:11,color:"#8a9ab0"}}>{r.pct}%</span></div>
                    </div>))}
                </div>
                <div style={{background:"#fff",borderRadius:8,padding:16,border:"1px solid #dce3ed"}}>
                  <h3 style={{fontSize:14,fontWeight:600,margin:"0 0 12px",color:"#34537d"}}>消費區間分佈</h3>
                  {[{l:"₩0 - 100萬",v:420,pct:66},{l:"₩100萬 - 500萬",v:150,pct:24},{l:"₩500萬 - 1000萬",v:45,pct:7},{l:"₩1000萬以上",v:20,pct:3}].map((r,i)=>(
                    <div key={i} style={{padding:"8px 0",borderBottom:i<3?"1px solid #f0f2f5":"none"}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:4,fontSize:13}}><span>{r.l}</span><span style={{fontWeight:600}}>{r.v} 位</span></div>
                      <div style={{display:"flex",alignItems:"center",gap:8}}><div style={{flex:1,background:"#eef2f7",borderRadius:3,height:6}}><div style={{background:"#34537d",borderRadius:3,height:6,width:`${r.pct}%`}}/></div><span style={{fontSize:11,color:"#8a9ab0"}}>{r.pct}%</span></div>
                    </div>))}
                </div>
                <div style={{background:"#fff",borderRadius:8,padding:16,border:"1px solid #dce3ed"}}>
                  <h3 style={{fontSize:14,fontWeight:600,margin:"0 0 12px",color:"#34537d"}}>每月新增客戶趨勢</h3>
                  {[{m:"2026/01",v:12},{m:"2026/02",v:15},{m:"2026/03",v:22},{m:"2026/04",v:16},{m:"2026/05",v:18}].map((r,i)=>(
                    <div key={i} style={{padding:"6px 0",borderBottom:i<4?"1px solid #f0f2f5":"none"}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:3,fontSize:13}}><span style={{color:r.m===curMonth?"#34537d":"#4a5568",fontWeight:r.m===curMonth?700:400}}>{r.m}</span><span style={{fontWeight:600}}>{r.v} 位</span></div>
                      <div style={{background:"#eef2f7",borderRadius:3,height:5}}><div style={{background:"#34537d",borderRadius:3,height:5,width:`${(r.v/22*100).toFixed(0)}%`}}/></div>
                    </div>))}
                </div>
              </div>
            )}

            {/* ═══ 職位管理 ═══ */}
            {tab === "hr-position" && (
              <div style={{display:"flex",flexDirection:"column",gap:14}}>
                <div style={{background:"#fff",borderRadius:8,padding:16,border:"1px solid #dce3ed"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                    <h3 style={{fontSize:14,fontWeight:600,margin:0,color:"#34537d"}}>現有職位</h3>
                    <button style={btnP}>＋ 新增職位</button>
                  </div>
                  {[
                    {name:"正職員工",count:emps.filter(e=>!e.resigned&&e.type==="正職員工").length,type:"月薪制",rule:"固定月薪",c:"#34537d"},
                    {name:"固定工讀",count:emps.filter(e=>!e.resigned&&e.type==="固定工讀").length,type:"時薪制",rule:"時薪 × 時數 + 加班費",c:"#5b9e6f"},
                    {name:"臨時工讀",count:emps.filter(e=>!e.resigned&&e.type==="臨時工讀").length,type:"時薪制",rule:"入職2月內 ₩10,320",c:"#c4953a"},
                  ].map((r,i)=>(
                    <div key={i} style={{padding:"14px 0",borderBottom:i<2?"1px solid #f0f2f5":"none"}}>
                      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
                        <div style={{display:"flex",alignItems:"center",gap:10}}>
                          <span style={{width:10,height:10,borderRadius:"50%",background:r.c}}/>
                          <span style={{fontWeight:600,fontSize:15}}>{r.name}</span>
                          <span style={{fontSize:12,color:"#8a9ab0"}}>{r.count} 人</span>
                        </div>
                        <span style={{fontSize:11,background:"#e8edf4",padding:"3px 10px",borderRadius:4,color:"#34537d"}}>{r.type}</span>
                      </div>
                      <div style={{fontSize:12,color:"#8a9ab0",marginTop:6,paddingLeft:20}}>規則：{r.rule}</div>
                    </div>
                  ))}
                </div>
                <div style={{background:"#f5f8fc",borderRadius:8,padding:14,border:"1px solid #e4e9f0",fontSize:12,color:"#8a9ab0"}}>
                  加班費規則：每日超過 8 小時，每小時加 ₩5,000
                </div>
              </div>
            )}

            {/* ═══ 出勤管理 ═══ */}
            {tab === "hr-attendance" && (
              <div style={{display:"flex",flexDirection:"column",gap:14}}>
                <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:2}}>
                  <span style={{fontSize:13,color:"#4a5568"}}>日期</span>
                  <input type="date" defaultValue="2026-05-30" style={{...selStyle,width:"auto"}} />
                </div>
                <div style={{display:"grid",gridTemplateColumns:mobile?"1fr 1fr":"repeat(4, 1fr)",gap:10}}>
                  {[{l:"出勤",v:`${emps.filter(e=>!e.resigned).length-1}人`,c:"#5b9e6f"},{l:"請假",v:"1人",c:"#c4953a"},{l:"加班",v:"2人",c:"#7b6ba5"},{l:"未到",v:"0人",c:"#8a9ab0"}].map((s,i)=>(
                    <div key={i} style={{background:"#fff",borderRadius:8,padding:14,border:"1px solid #dce3ed",textAlign:"center"}}>
                      <div style={{fontSize:11,color:"#8a9ab0",marginBottom:4}}>{s.l}</div><div style={{fontSize:20,fontWeight:700,color:s.c}}>{s.v}</div></div>))}
                </div>
                <div style={{background:"#fff",borderRadius:8,padding:16,border:"1px solid #dce3ed"}}>
                  <h3 style={{fontSize:14,fontWeight:600,margin:"0 0 12px",color:"#34537d"}}>今日出勤列表</h3>
                  {emps.filter(e=>!e.resigned).map((e,i)=>{
                    const att = i===2 ? {s:"🟡 請假",t:"事假",h:"",c:"#c4953a"} : i===1 ? {s:"✅ 出勤",t:"09:00 - 20:00",h:"11h（加班3h）",c:"#5b9e6f"} : i===3 ? {s:"✅ 出勤",t:"10:00 - 19:00",h:"9h（加班1h）",c:"#5b9e6f"} : {s:"✅ 出勤",t:"09:00 - 18:00",h:"8h",c:"#5b9e6f"};
                    return (
                      <div key={e.id} style={{display:"flex",alignItems:"center",padding:"10px 0",borderBottom:i<emps.filter(x=>!x.resigned).length-1?"1px solid #f0f2f5":"none",gap:10,fontSize:13,flexWrap:"wrap"}}>
                        <span style={{color:"#8a9ab0",minWidth:40}}>{e.empNo}</span>
                        <span style={{fontWeight:600,flex:1,minWidth:50}}>{e.name}</span>
                        <span style={{color:att.c,fontWeight:600}}>{att.s}</span>
                        <span style={{color:"#8a9ab0",fontSize:12}}>{att.t}</span>
                        {att.h && <span style={{fontSize:12,fontWeight:600}}>{att.h}</span>}
                      </div>);
                  })}
                </div>
                <div style={{background:"#fff",borderRadius:8,padding:16,border:"1px solid #dce3ed"}}>
                  <h3 style={{fontSize:14,fontWeight:600,margin:"0 0 12px",color:"#34537d"}}>本月出勤統計</h3>
                  {emps.filter(e=>!e.resigned).map((e,i)=>(
                    <div key={e.id} style={{display:"flex",alignItems:"center",padding:"8px 0",borderBottom:i<emps.filter(x=>!x.resigned).length-1?"1px solid #f0f2f5":"none",gap:10,fontSize:13,flexWrap:"wrap"}}>
                      <span style={{fontWeight:600,flex:1,minWidth:50}}>{e.name}</span>
                      <span style={{color:"#5b9e6f"}}>出勤 {22-i}天</span>
                      <span style={{color:"#c4953a"}}>請假 {i===2?1:0}天</span>
                      <span style={{color:"#7b6ba5"}}>加班 {[12,18,5,0][i]||0}h</span>
                    </div>))}
                </div>
              </div>
            )}

            {/* ═══ 排班管理 ═══ */}
            {tab === "hr-schedule" && (
              <div style={{display:"flex",flexDirection:"column",gap:14}}>
                <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:2}}>
                  <span style={{fontSize:13,color:"#4a5568"}}>週別</span>
                  <select style={{...selStyle,width:"auto",minWidth:140}}><option>5/26 - 6/1</option><option>6/2 - 6/8</option><option>6/9 - 6/15</option></select>
                </div>
                <div style={{background:"#fff",borderRadius:8,padding:16,border:"1px solid #dce3ed",overflowX:"auto"}}>
                  <table style={{width:"100%",borderCollapse:"collapse",fontSize:13,minWidth:500}}>
                    <thead><tr><th style={{padding:8,textAlign:"left",fontSize:11,color:"#8a9ab0",borderBottom:"1px solid #dce3ed"}}></th>
                      {["週一","週二","週三","週四","週五","週六","週日"].map(d=><th key={d} style={{padding:8,textAlign:"center",fontSize:11,color:"#8a9ab0",borderBottom:"1px solid #dce3ed"}}>{d}</th>)}
                    </tr></thead>
                    <tbody>
                      {[
                        {n:"王小明",s:["早","早","早","早","早","休","休"]},
                        {n:"林美玲",s:["早","早","早","早","早","早","休"]},
                        {n:"陳大華",s:["午","午","午","午","午","休","休"]},
                        {n:"張雅婷",s:["—","午","午","—","午","午","休"]},
                      ].map((r,i)=>(
                        <tr key={i} style={{borderBottom:"1px solid #f0f2f5"}}>
                          <td style={{padding:8,fontWeight:600}}>{r.n}</td>
                          {r.s.map((c,j)=>(
                            <td key={j} style={{padding:8,textAlign:"center"}}>
                              <span style={{display:"inline-block",padding:"4px 10px",borderRadius:5,fontSize:12,fontWeight:600,
                                background: c==="早"?"#e8edf4":c==="午"?"#fdf9f0":c==="休"?"#f0fdf4":"#f5f5f5",
                                color: c==="早"?"#34537d":c==="午"?"#c4953a":c==="休"?"#5b9e6f":"#8a9ab0"
                              }}>{c}</span>
                            </td>))}
                        </tr>))}
                    </tbody>
                  </table>
                </div>
                <div style={{background:"#f5f8fc",borderRadius:8,padding:14,border:"1px solid #e4e9f0",fontSize:12,color:"#8a9ab0"}}>
                  <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
                    <span><span style={{display:"inline-block",width:10,height:10,borderRadius:3,background:"#e8edf4",marginRight:4}}/>早班 09:00-18:00</span>
                    <span><span style={{display:"inline-block",width:10,height:10,borderRadius:3,background:"#fdf9f0",marginRight:4}}/>午班 13:00-22:00</span>
                    <span><span style={{display:"inline-block",width:10,height:10,borderRadius:3,background:"#f0fdf4",marginRight:4}}/>休假</span>
                    <span><span style={{display:"inline-block",width:10,height:10,borderRadius:3,background:"#f5f5f5",marginRight:4}}/>未排班</span>
                  </div>
                </div>
              </div>
            )}

            {/* ═══ 請假管理 ═══ */}
            {tab === "hr-leave" && (
              <div style={{display:"flex",flexDirection:"column",gap:14}}>
                <div style={{display:"grid",gridTemplateColumns:mobile?"1fr":"1fr 1fr 1fr",gap:10}}>
                  {[{l:"本月請假",v:"5 次",c:"#34537d"},{l:"待審核",v:"1 件",c:"#c4953a"},{l:"今日請假",v:"1 人",c:"#8a9ab0"}].map((s,i)=>(
                    <div key={i} style={{background:"#fff",borderRadius:8,padding:14,border:"1px solid #dce3ed",textAlign:"center"}}>
                      <div style={{fontSize:11,color:"#8a9ab0",marginBottom:4}}>{s.l}</div><div style={{fontSize:18,fontWeight:700,color:s.c}}>{s.v}</div></div>))}
                </div>
                <div style={{background:"#fff",borderRadius:8,padding:16,border:"1px solid #dce3ed"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                    <h3 style={{fontSize:14,fontWeight:600,margin:0,color:"#34537d"}}>請假紀錄</h3>
                    <button style={btnP}>＋ 申請請假</button>
                  </div>
                  <div style={{overflowX:"auto"}}>
                    <table style={{width:"100%",borderCollapse:"collapse",fontSize:13,minWidth:450}}>
                      <thead><tr>{["日期","員工","假別","天數","狀態"].map(h=><th key={h} style={{padding:8,textAlign:"left",fontSize:11,color:"#8a9ab0",borderBottom:"1px solid #dce3ed"}}>{h}</th>)}</tr></thead>
                      <tbody>
                        {[
                          {d:"6/02",n:"王小明",t:"事假",days:"1天",s:"待審核",sc:"#c4953a",bg:"#fff3e0"},
                          {d:"5/28",n:"陳大華",t:"事假",days:"1天",s:"已核准 ✓",sc:"#5b9e6f",bg:"#e8f5e920"},
                          {d:"5/20",n:"林美玲",t:"病假",days:"1天",s:"已核准 ✓",sc:"#5b9e6f",bg:"#e8f5e920"},
                          {d:"5/15",n:"張雅婷",t:"特休",days:"2天",s:"已核准 ✓",sc:"#5b9e6f",bg:"#e8f5e920"},
                          {d:"5/08",n:"王小明",t:"病假",days:"1天",s:"已核准 ✓",sc:"#5b9e6f",bg:"#e8f5e920"},
                        ].map((r,i)=>(
                          <tr key={i} style={{borderBottom:"1px solid #f0f2f5"}}>
                            <td style={{padding:8,color:"#8a9ab0"}}>{r.d}</td>
                            <td style={{padding:8,fontWeight:600}}>{r.n}</td>
                            <td style={{padding:8}}><span style={{fontSize:11,background:"#e8edf4",padding:"2px 8px",borderRadius:4}}>{r.t}</span></td>
                            <td style={{padding:8}}>{r.days}</td>
                            <td style={{padding:8}}><span style={{fontSize:11,fontWeight:600,color:r.sc}}>{r.s}</span></td>
                          </tr>))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ═══ 績效統計 ═══ */}
            {tab === "hr-performance" && (
              <div style={{display:"flex",flexDirection:"column",gap:14}}>
                <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:2}}>
                  <span style={{fontSize:13,color:"#4a5568"}}>月份</span>
                  <select style={{...selStyle,width:"auto",minWidth:120}}><option>2026/05</option><option>2026/04</option><option>2026/03</option></select>
                </div>
                <div style={{background:"#fff",borderRadius:8,padding:16,border:"1px solid #dce3ed"}}>
                  <h3 style={{fontSize:14,fontWeight:600,margin:"0 0 14px",color:"#34537d"}}>績效排行</h3>
                  {[
                    {r:1,n:"王小明",pkg:182,days:22,ot:12,eff:8.3,medal:"🥇",c:"#c4953a"},
                    {r:2,n:"林美玲",pkg:156,days:21,ot:18,eff:7.4,medal:"🥈",c:"#8a9ab0"},
                    {r:3,n:"陳大華",pkg:143,days:20,ot:5,eff:7.2,medal:"🥉",c:"#b85c5c"},
                    {r:4,n:"張雅婷",pkg:98,days:18,ot:0,eff:5.4,medal:"",c:"#34537d"},
                  ].map((r,i)=>(
                    <div key={i} style={{padding:"12px 0",borderBottom:i<3?"1px solid #f0f2f5":"none"}}>
                      <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap",fontSize:13}}>
                        <span style={{minWidth:28,fontWeight:700,fontSize:r.medal?16:13,textAlign:"center"}}>{r.medal||r.r+"."}</span>
                        <span style={{fontWeight:600,flex:1,minWidth:50}}>{r.n}</span>
                        <span style={{fontWeight:700,color:"#34537d"}}>處理 {r.pkg}件</span>
                      </div>
                      <div style={{display:"flex",gap:12,marginTop:6,paddingLeft:38,fontSize:12,color:"#8a9ab0",flexWrap:"wrap"}}>
                        <span>出勤 {r.days}天</span>
                        <span>加班 {r.ot}h</span>
                        <span style={{color:"#5b9e6f",fontWeight:600}}>效率 {r.eff}件/天</span>
                      </div>
                    </div>))}
                </div>
                <div style={{display:"grid",gridTemplateColumns:mobile?"1fr":"1fr 1fr 1fr",gap:10}}>
                  {[{l:"總處理件數",v:"579 件",c:"#34537d"},{l:"平均效率",v:"7.1 件/天/人",c:"#5b9e6f"},{l:"總加班時數",v:"35h",c:"#7b6ba5"}].map((s,i)=>(
                    <div key={i} style={{background:"#fff",borderRadius:8,padding:14,border:"1px solid #dce3ed",textAlign:"center"}}>
                      <div style={{fontSize:11,color:"#8a9ab0",marginBottom:4}}>{s.l}</div><div style={{fontSize:18,fontWeight:700,color:s.c}}>{s.v}</div></div>))}
                </div>
                <div style={{background:"#fff",borderRadius:8,padding:16,border:"1px solid #dce3ed"}}>
                  <h3 style={{fontSize:14,fontWeight:600,margin:"0 0 12px",color:"#34537d"}}>每月趨勢</h3>
                  {[{m:"2026/03",v:512,eff:6.4},{m:"2026/04",v:548,eff:6.8},{m:"2026/05",v:579,eff:7.1}].map((r,i)=>(
                    <div key={i} style={{padding:"8px 0",borderBottom:i<2?"1px solid #f0f2f5":"none"}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:4,fontSize:13}}>
                        <span style={{color:r.m===curMonth?"#34537d":"#4a5568",fontWeight:r.m===curMonth?700:400}}>{r.m}</span>
                        <span><span style={{fontWeight:600}}>{r.v}件</span><span style={{fontSize:12,color:"#5b9e6f",marginLeft:8}}>平均{r.eff}件/天</span></span>
                      </div>
                      <div style={{background:"#eef2f7",borderRadius:3,height:6}}><div style={{background:r.m===curMonth?"#5b9e6f":"#34537d",borderRadius:3,height:6,width:`${(r.v/600*100).toFixed(0)}%`}}/></div>
                    </div>))}
                </div>
              </div>
            )}

            {/* ═══ 公司資料設定 ═══ */}
            {tab === "set-company" && (
              <div style={{display:"flex",flexDirection:"column",gap:14}}>
                <div style={{background:"#fff",borderRadius:8,padding:16,border:"1px solid #dce3ed"}}>
                  <h3 style={{fontSize:14,fontWeight:600,margin:"0 0 14px",color:"#34537d"}}>公司基本資訊</h3>
                  <div style={{display:"grid",gridTemplateColumns:mobile?"1fr":"1fr 1fr",gap:10}}>
                    <Inp label="公司名稱" defaultValue="韓集集運" /><Inp label="統一編號" defaultValue="123-45-67890" />
                    <Inp label="電話" defaultValue="02-1234-5678" /><Inp label="負責人" defaultValue="" />
                    <div style={{gridColumn:mobile?"auto":"1/-1"}}><Inp label="地址" defaultValue="首爾市" /></div>
                  </div>
                </div>
                <div style={{background:"#fff",borderRadius:8,padding:16,border:"1px solid #dce3ed"}}>
                  <h3 style={{fontSize:14,fontWeight:600,margin:"0 0 14px",color:"#34537d"}}>銀行帳戶</h3>
                  <div style={{display:"grid",gridTemplateColumns:mobile?"1fr":"1fr 1fr 1fr",gap:10}}>
                    <Inp label="銀行" defaultValue="國民銀行" /><Inp label="戶名" defaultValue="韓集集運" /><Inp label="帳號" defaultValue="" />
                  </div>
                </div>
                <div style={{background:"#fff",borderRadius:8,padding:16,border:"1px solid #dce3ed"}}>
                  <h3 style={{fontSize:14,fontWeight:600,margin:"0 0 14px",color:"#34537d"}}>營業資訊</h3>
                  <div style={{display:"grid",gridTemplateColumns:mobile?"1fr":"1fr 1fr",gap:10}}>
                    <Inp label="營業時間" defaultValue="09:00 - 18:00" /><Inp label="休息日" defaultValue="週日" />
                  </div>
                </div>
                <button style={{...btnP,padding:"12px",fontSize:15,width:"100%",borderRadius:8}}>儲存設定</button>
              </div>
            )}

            {/* ═══ 運費設定 ═══ */}
            {tab === "set-shipping" && (
              <div style={{display:"flex",flexDirection:"column",gap:14}}>
                <div style={{background:"#fff",borderRadius:8,padding:16,border:"1px solid #dce3ed"}}>
                  <h3 style={{fontSize:14,fontWeight:600,margin:"0 0 14px",color:"#34537d"}}>運費計算方式</h3>
                  <div style={{display:"grid",gridTemplateColumns:mobile?"1fr":"1fr 1fr 1fr",gap:10}}>
                    <Inp label="基本運費（/kg）" defaultValue="5000" type="number" /><Inp label="續重費用（/kg）" defaultValue="3000" type="number" /><Inp label="最低收費" defaultValue="8000" type="number" />
                  </div>
                </div>
                <div style={{background:"#fff",borderRadius:8,padding:16,border:"1px solid #dce3ed"}}>
                  <h3 style={{fontSize:14,fontWeight:600,margin:"0 0 14px",color:"#34537d"}}>重量區間設定</h3>
                  {[{range:"0 - 1 kg",price:"₩ 8,000"},{range:"1 - 5 kg",price:"₩ 5,000/kg"},{range:"5 - 10 kg",price:"₩ 4,500/kg"},{range:"10 kg 以上",price:"₩ 4,000/kg"}].map((r,i)=>(
                    <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:i<3?"1px solid #f0f2f5":"none",fontSize:13}}>
                      <span style={{color:"#4a5568"}}>{r.range}</span><span style={{fontWeight:600}}>{r.price}</span></div>))}
                </div>
                <div style={{background:"#fff",borderRadius:8,padding:16,border:"1px solid #dce3ed"}}>
                  <h3 style={{fontSize:14,fontWeight:600,margin:"0 0 14px",color:"#34537d"}}>附加費用</h3>
                  <div style={{display:"grid",gridTemplateColumns:mobile?"1fr":"1fr 1fr 1fr",gap:10}}>
                    <Inp label="偏遠地區" defaultValue="3000" type="number" /><Inp label="易碎品加收" defaultValue="2000" type="number" /><Inp label="超大件" defaultValue="5000" type="number" />
                  </div>
                </div>
                <button style={{...btnP,padding:"12px",fontSize:15,width:"100%",borderRadius:8}}>儲存設定</button>
              </div>
            )}

            {/* ═══ 代購服務費設定 ═══ */}
            {tab === "set-proxy" && (
              <div style={{display:"flex",flexDirection:"column",gap:14}}>
                <div style={{background:"#fff",borderRadius:8,padding:16,border:"1px solid #dce3ed"}}>
                  <h3 style={{fontSize:14,fontWeight:600,margin:"0 0 14px",color:"#34537d"}}>代購費率</h3>
                  <div style={{display:"grid",gridTemplateColumns:mobile?"1fr":"1fr 1fr",gap:10}}>
                    <Inp label="基本服務費率（%）" defaultValue="10" type="number" /><Inp label="最低服務費（₩）" defaultValue="3000" type="number" />
                  </div>
                </div>
                <div style={{background:"#fff",borderRadius:8,padding:16,border:"1px solid #dce3ed"}}>
                  <h3 style={{fontSize:14,fontWeight:600,margin:"0 0 14px",color:"#34537d"}}>金額區間費率</h3>
                  {[{range:"₩0 - 50,000",rate:"10%"},{range:"₩50,000 - 200,000",rate:"8%"},{range:"₩200,000 以上",rate:"6%"}].map((r,i)=>(
                    <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:i<2?"1px solid #f0f2f5":"none",fontSize:13}}>
                      <span style={{color:"#4a5568"}}>{r.range}</span><span style={{fontWeight:600,color:"#34537d"}}>{r.rate}</span></div>))}
                </div>
                <div style={{background:"#fff",borderRadius:8,padding:16,border:"1px solid #dce3ed"}}>
                  <h3 style={{fontSize:14,fontWeight:600,margin:"0 0 14px",color:"#34537d"}}>附加費用</h3>
                  <div style={{display:"grid",gridTemplateColumns:mobile?"1fr":"1fr 1fr",gap:10}}>
                    <Inp label="特殊商品加收（₩）" defaultValue="5000" type="number" /><Inp label="急件加收（₩）" defaultValue="10000" type="number" />
                  </div>
                </div>
                <button style={{...btnP,padding:"12px",fontSize:15,width:"100%",borderRadius:8}}>儲存設定</button>
              </div>
            )}

            {/* ═══ 客戶等級設定 ═══ */}
            {tab === "set-tier" && (
              <div style={{display:"flex",flexDirection:"column",gap:14}}>
                <div style={{background:"#fff",borderRadius:8,padding:16,border:"1px solid #dce3ed"}}>
                  <h3 style={{fontSize:14,fontWeight:600,margin:"0 0 14px",color:"#34537d"}}>等級規則</h3>
                  {[{g:"VIP",rule:"累計消費 ≥ ₩5,000,000",benefit:"折扣 5%",c:"#c4953a",count:42},{g:"一般",rule:"累計消費 < ₩5,000,000",benefit:"無折扣",c:"#34537d",count:580},{g:"黑名單",rule:"手動設定",benefit:"禁止下單",c:"#c0504d",count:13}].map((r,i)=>(
                    <div key={i} style={{padding:"14px 0",borderBottom:i<2?"1px solid #f0f2f5":"none"}}>
                      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
                        <div style={{display:"flex",alignItems:"center",gap:10}}>
                          <span style={{fontSize:12,fontWeight:600,color:r.c,background:r.c+"15",padding:"3px 10px",borderRadius:4}}>{r.g}</span>
                          <span style={{fontSize:12,color:"#8a9ab0"}}>{r.count} 位</span>
                        </div>
                        <span style={{fontSize:12,color:"#5b9e6f",fontWeight:600}}>{r.benefit}</span>
                      </div>
                      <div style={{fontSize:12,color:"#8a9ab0",marginTop:4}}>條件：{r.rule}</div>
                    </div>))}
                </div>
                <button style={{...btnP,padding:"12px",fontSize:15,width:"100%",borderRadius:8}}>儲存設定</button>
              </div>
            )}

            {/* ═══ 權限管理 ═══ */}
            {tab === "set-permission" && (
              <div style={{display:"flex",flexDirection:"column",gap:14}}>
                <div style={{background:"#fff",borderRadius:8,padding:16,border:"1px solid #dce3ed"}}>
                  <h3 style={{fontSize:14,fontWeight:600,margin:"0 0 14px",color:"#34537d"}}>角色權限</h3>
                  {[{role:"老闆",perm:"全部功能",c:"#c4953a"},{role:"主管",perm:"儀表板 + 財務 + 人資 + 客戶",c:"#34537d"},{role:"倉庫員工",perm:"包裹管理 + 出貨",c:"#5b9e6f"},{role:"客服",perm:"客戶管理",c:"#7b6ba5"}].map((r,i)=>(
                    <div key={i} style={{display:"flex",alignItems:"center",padding:"10px 0",borderBottom:i<3?"1px solid #f0f2f5":"none",gap:10,fontSize:13,flexWrap:"wrap"}}>
                      <span style={{fontWeight:600,minWidth:70,color:r.c}}>{r.role}</span>
                      <span style={{flex:1,color:"#4a5568"}}>{r.perm}</span>
                    </div>))}
                </div>
                <div style={{background:"#fff",borderRadius:8,padding:16,border:"1px solid #dce3ed"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                    <h3 style={{fontSize:14,fontWeight:600,margin:0,color:"#34537d"}}>帳號列表</h3>
                    <button style={btnP}>＋ 新增帳號</button>
                  </div>
                  {[{user:"admin",role:"老闆",s:"啟用中",sc:"#5b9e6f"},{user:"manager1",role:"主管",s:"啟用中",sc:"#5b9e6f"},{user:"staff01",role:"倉庫員工",s:"啟用中",sc:"#5b9e6f"}].map((r,i)=>(
                    <div key={i} style={{display:"flex",alignItems:"center",padding:"10px 0",borderBottom:i<2?"1px solid #f0f2f5":"none",gap:10,fontSize:13,flexWrap:"wrap"}}>
                      <span style={{fontWeight:600,minWidth:80}}>{r.user}</span>
                      <span style={{fontSize:11,background:"#e8edf4",padding:"2px 8px",borderRadius:4}}>{r.role}</span>
                      <span style={{flex:1}}/>
                      <span style={{fontSize:11,color:r.sc,fontWeight:600}}>{r.s}</span>
                    </div>))}
                </div>
              </div>
            )}

            {/* ═══ LINE通知設定 ═══ */}
            {tab === "set-line" && (
              <div style={{display:"flex",flexDirection:"column",gap:14}}>
                <div style={{background:"#fff",borderRadius:8,padding:16,border:"1px solid #dce3ed"}}>
                  <h3 style={{fontSize:14,fontWeight:600,margin:"0 0 14px",color:"#34537d"}}>LINE Notify Token</h3>
                  <div style={{display:"flex",gap:8}}><Inp label="" placeholder="貼上你的 LINE Notify Token" style={{flex:1}} /><button style={{...btnP,alignSelf:"flex-end",height:38}}>儲存</button></div>
                </div>
                <div style={{background:"#fff",borderRadius:8,padding:16,border:"1px solid #dce3ed"}}>
                  <h3 style={{fontSize:14,fontWeight:600,margin:"0 0 14px",color:"#34537d"}}>通知項目</h3>
                  {[{l:"新訂單通知",on:true},{l:"包裹入庫通知",on:true},{l:"異常包裹通知",on:true},{l:"每日營收摘要",on:false},{l:"客戶付款通知",on:true},{l:"員工請假通知",on:false}].map((r,i)=>(
                    <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0",borderBottom:i<5?"1px solid #f0f2f5":"none",fontSize:13}}>
                      <span>{r.l}</span>
                      <div onClick={()=>{}} style={{width:42,height:24,borderRadius:12,background:r.on?"#5b9e6f":"#d0d8e4",cursor:"pointer",position:"relative"}}>
                        <div style={{width:20,height:20,borderRadius:"50%",background:"#fff",position:"absolute",top:2,left:r.on?20:2,transition:"left .2s",boxShadow:"0 1px 3px rgba(0,0,0,.2)"}}/>
                      </div>
                    </div>))}
                </div>
                <button style={{...btnS,padding:"12px",fontSize:14,width:"100%",borderRadius:8}}>發送測試通知</button>
              </div>
            )}

            {/* ═══ 簡訊通知設定 ═══ */}
            {tab === "set-sms" && (
              <div style={{display:"flex",flexDirection:"column",gap:14}}>
                <div style={{background:"#fff",borderRadius:8,padding:16,border:"1px solid #dce3ed"}}>
                  <h3 style={{fontSize:14,fontWeight:600,margin:"0 0 14px",color:"#34537d"}}>簡訊服務商</h3>
                  <div style={{display:"grid",gridTemplateColumns:mobile?"1fr":"1fr 1fr",gap:10}}>
                    <div style={{display:"flex",flexDirection:"column",gap:4}}>
                      <span style={{fontSize:11,color:"#7a8a9e",fontWeight:500}}>服務商</span>
                      <select style={selStyle}><option>選擇服務商</option><option>Twilio</option><option>NHN Cloud</option><option>CoolSMS</option></select>
                    </div>
                    <Inp label="API Key" placeholder="貼上 API Key" />
                  </div>
                </div>
                <div style={{background:"#fff",borderRadius:8,padding:16,border:"1px solid #dce3ed"}}>
                  <h3 style={{fontSize:14,fontWeight:600,margin:"0 0 14px",color:"#34537d"}}>通知模板</h3>
                  {[{l:"入庫通知",v:"您的包裹已入庫，共{件數}件"},{l:"出貨通知",v:"您的包裹已出貨，運單號{單號}"},{l:"催款通知",v:"您有未付款項 {金額}，請儘速處理"}].map((r,i)=>(
                    <div key={i} style={{padding:"12px 0",borderBottom:i<2?"1px solid #f0f2f5":"none"}}>
                      <div style={{fontSize:12,color:"#8a9ab0",marginBottom:4}}>{r.l}</div>
                      <div style={{background:"#f5f8fc",borderRadius:6,padding:"8px 12px",fontSize:13,color:"#4a5568",border:"1px solid #e4e9f0"}}>{r.v}</div>
                    </div>))}
                </div>
                <button style={{...btnP,padding:"12px",fontSize:15,width:"100%",borderRadius:8}}>儲存設定</button>
              </div>
            )}

            {/* ═══ API串接設定 ═══ */}
            {tab === "set-api" && (
              <div style={{display:"flex",flexDirection:"column",gap:14}}>
                {[{name:"物流 API",provider:"○○物流",status:true},{name:"金流 API",provider:"○○Pay",status:true},{name:"LINE API",provider:"LINE Notify",status:true}].map((api,i)=>(
                  <div key={i} style={{background:"#fff",borderRadius:8,padding:16,border:"1px solid #dce3ed"}}>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
                      <h3 style={{fontSize:14,fontWeight:600,margin:0,color:"#34537d"}}>{api.name}</h3>
                      <span style={{fontSize:11,fontWeight:600,color:api.status?"#5b9e6f":"#c0504d",background:api.status?"#e8f5e9":"#fde8e8",padding:"3px 10px",borderRadius:4}}>{api.status?"✅ 已連接":"❌ 未連接"}</span>
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:mobile?"1fr":"1fr 1fr",gap:10}}>
                      <Inp label="服務商" defaultValue={api.provider} />
                      <Inp label="API Key" placeholder="貼上 API Key" type="password" />
                    </div>
                  </div>
                ))}
                <button style={{...btnP,padding:"12px",fontSize:15,width:"100%",borderRadius:8}}>儲存設定</button>
              </div>
            )}

            {/* ═══ HR: 員工資料 ═══ */}
            {tab === "hr-employees" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                {showAdd && (
                  <div style={{ background: "#fff", borderRadius: 8, padding: 16, marginBottom: 6, border: "1px solid #dce3ed" }}>
                    <p style={{ margin: "0 0 10px", fontWeight: 600, fontSize: 14 }}>新增員工</p>
                    <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(auto-fill,minmax(155px,1fr))", gap: 10 }}>
                      <Inp label="員工編號" value={addForm.empNo} onChange={e => setAddForm(f => ({ ...f, empNo: e.target.value }))} />
                      <Inp label="姓名 *" value={addForm.name} onChange={e => setAddForm(f => ({ ...f, name: e.target.value }))} />
                      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        <span style={{ fontSize: 11, color: "#7a8a9e", fontWeight: 500 }}>部門類型</span>
                        <select value={addForm.type} onChange={e => handleAddTypeChange(e.target.value)} style={selStyle}>{TYPES.map(t => <option key={t}>{t}</option>)}</select>
                      </div>
                      <Inp label="入職日期" type="date" value={addForm.startDate} onChange={e => handleAddStartDateChange(e.target.value)} />
                      <Inp label="簽證到期日" type="date" value={addForm.visa} onChange={e => setAddForm(f => ({ ...f, visa: e.target.value }))} />
                      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        <span style={{ fontSize: 11, color: "#7a8a9e", fontWeight: 500 }}>簽證種類</span>
                        <select value={addForm.visaType} onChange={e => setAddForm(f => ({ ...f, visaType: e.target.value }))} style={selStyle}>
                          <option value="">無</option>{VISA_TYPES.map(t => <option key={t}>{t}</option>)}
                        </select>
                      </div>
                      {addForm.type === "正職員工" && <Inp label="基本月薪 (₩)" type="number" value={addForm.msalary} placeholder="0" onChange={e => setAddForm(f => ({ ...f, msalary: e.target.value }))} />}
                      {addForm.type !== "正職員工" && <Inp label="時薪 (₩) *" type="number" value={addForm.rate} placeholder="0" onChange={e => setAddForm(f => ({ ...f, rate: e.target.value }))} />}
                    </div>
                    {addForm.type === "臨時工讀" && addForm.startDate && monthsDiff(addForm.startDate) < 2 && <div style={{ marginTop: 8, fontSize: 11, color: "#c4953a" }}>入職未滿兩個月，預設時薪 {w(DEFAULT_TEMP_RATE)}</div>}
                    <div style={{ display: "flex", gap: 8, marginTop: 12 }}><button onClick={addEmp} style={btnP}>儲存</button><button onClick={() => setShowAdd(false)} style={btnS}>取消</button></div>
                  </div>
                )}
                {emps.slice().sort((a, b) => { if (a.resigned && !b.resigned) return 1; if (!a.resigned && b.resigned) return -1; return (a.empNo || "").localeCompare(b.empNo || ""); }).map(e => {
                  const isEd = editingId === e.id; const ef = editForm;
                  const days = daysLeft(e.visa); let vc = "#5b9e6f", vl = days !== null ? `${days}天` : "";
                  if (days !== null && days < 0) { vc = "#c0504d"; vl = "已過期"; } else if (days !== null && days <= 30) vc = "#c0504d"; else if (days !== null && days <= 90) vc = "#c4953a";
                  return (
                    <div key={e.id} style={{ background: e.resigned ? "#f0f0f0" : "#fff", borderRadius: 8, overflow: "hidden", border: `1px solid ${e.resigned ? "#d5d5d5" : "#dce3ed"}`, opacity: e.resigned ? 0.7 : 1 }}>
                      <div onClick={() => isEd ? cancelEdit() : startEdit(e)} style={{ display: "flex", alignItems: "center", padding: "13px 16px", gap: 12, cursor: "pointer", flexWrap: "wrap", background: isEd ? "#f5f8fc" : e.resigned ? "#f0f0f0" : "#fff" }}>
                        <Dot id={e.id} />
                        <div style={{ flex: 1, minWidth: 70 }}>
                          <div style={{ fontWeight: 600, fontSize: 14, color: e.resigned ? "#999" : "#1e2a3a" }}>
                            {e.empNo && <span style={{ color: "#7a8a9e", fontWeight: 500, marginRight: 6 }}>{e.empNo}</span>}{e.name}
                            {e.resigned && <span style={{ marginLeft: 8, fontSize: 11, fontWeight: 600, color: "#c0504d", background: "#fde8e8", padding: "2px 8px", borderRadius: 4 }}>已離職</span>}
                          </div>
                          <div style={{ fontSize: 11, color: "#8a9ab0" }}>{e.type}{e.type === "正職員工" && e.msalary ? ` · 月薪 ${w(e.msalary)}` : ""}{e.type !== "正職員工" ? ` · ${w(e.rate)}/h` : ""}</div>
                          {e.startDate && <div style={{ fontSize: 11, color: "#8a9ab0" }}>入職 {e.startDate}（{tenure(e.startDate)}）{e.resigned && e.resignDate ? ` → 離職 ${e.resignDate}` : ""}</div>}
                        </div>
                        {e.visa && <span style={{ fontSize: 11, fontWeight: 500, color: vc }}>簽證{vl}</span>}
                        <span style={{ fontSize: 14, color: "#8a9ab0", transform: isEd ? "rotate(180deg)" : "rotate(0)", transition: "transform .2s" }}>▾</span>
                      </div>
                      {isEd && ef && (
                        <div style={{ padding: "0 16px 14px", borderTop: "1px solid #e4e9f0" }}>
                          <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(auto-fill,minmax(155px,1fr))", gap: 10, paddingTop: 12 }}>
                            <Inp label="員工編號" value={ef.empNo || ""} onChange={ev => setEditForm(f => ({ ...f, empNo: ev.target.value }))} />
                            <Inp label="姓名" value={ef.name} onChange={ev => setEditForm(f => ({ ...f, name: ev.target.value }))} />
                            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}><span style={{ fontSize: 11, color: "#7a8a9e", fontWeight: 500 }}>部門類型</span>
                              <select value={ef.type} onChange={ev => { const t = ev.target.value; const u = { type: t }; if (t === "臨時工讀" && ef.startDate && monthsDiff(ef.startDate) < 2) u.rate = String(DEFAULT_TEMP_RATE); setEditForm(f => ({ ...f, ...u })); }} style={selStyle}>{TYPES.map(t => <option key={t}>{t}</option>)}</select></div>
                            <Inp label="入職日期" type="date" value={ef.startDate || ""} onChange={ev => { const d = ev.target.value; const u = { startDate: d }; if (ef.type === "臨時工讀" && d && monthsDiff(d) < 2) u.rate = String(DEFAULT_TEMP_RATE); setEditForm(f => ({ ...f, ...u })); }} />
                            <Inp label="簽證到期日" type="date" value={ef.visa} onChange={ev => setEditForm(f => ({ ...f, visa: ev.target.value }))} />
                            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}><span style={{ fontSize: 11, color: "#7a8a9e", fontWeight: 500 }}>簽證種類</span>
                              <select value={ef.visaType || ""} onChange={ev => setEditForm(f => ({ ...f, visaType: ev.target.value }))} style={selStyle}><option value="">無</option>{VISA_TYPES.map(t => <option key={t}>{t}</option>)}</select></div>
                            {ef.type === "正職員工" && <Inp label="基本月薪 (₩)" type="number" value={ef.msalary} onChange={ev => setEditForm(f => ({ ...f, msalary: ev.target.value }))} />}
                            {ef.type !== "正職員工" && <Inp label="時薪 (₩)" type="number" value={ef.rate} onChange={ev => setEditForm(f => ({ ...f, rate: ev.target.value }))} />}
                          </div>
                          <div style={{ display: "flex", gap: 8, marginTop: 12, alignItems: "center", flexWrap: "wrap" }}>
                            {!e.resigned ? <button onClick={() => { setEmps(p => p.map(x => x.id === e.id ? { ...x, resigned: true, resignDate: new Date().toISOString().split("T")[0] } : x)); cancelEdit(); }} style={{ padding: "5px 14px", background: "#fff3e0", border: "none", borderRadius: 5, cursor: "pointer", fontSize: 12, fontWeight: 500, color: "#c4953a", fontFamily: "inherit" }}>離職</button>
                            : <button onClick={() => { setEmps(p => p.map(x => x.id === e.id ? { ...x, resigned: false, resignDate: "" } : x)); cancelEdit(); }} style={{ padding: "5px 14px", background: "#e8f5e9", border: "none", borderRadius: 5, cursor: "pointer", fontSize: 12, fontWeight: 500, color: "#5b9e6f", fontFamily: "inherit" }}>復職</button>}
                            <button onClick={() => delEmp(e.id)} style={{ padding: "5px 14px", background: "#fde8e8", border: "none", borderRadius: 5, cursor: "pointer", fontSize: 12, fontWeight: 500, color: "#c0504d", fontFamily: "inherit" }}>刪除</button>
                            <button onClick={cancelEdit} style={btnS}>取消</button>
                            <div style={{ flex: 1 }} />
                            <button onClick={saveEdit} style={btnP}>儲存</button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* ═══ HR: 月薪資表 ═══ */}
            {tab === "hr-salary" && (
              <div>
                {!saved ? (
                  <div style={{ background: "#fff", borderRadius: 8, padding: mobile ? 14 : 20, border: "1px solid #dce3ed" }}>
                    <div style={{ marginBottom: 16, padding: "10px 14px", background: "#34537d", borderRadius: 6, color: "#fff" }}>
                      <span style={{ fontWeight: 600, fontSize: 15, letterSpacing: 1 }}>{curMonth}</span><span style={{ fontSize: 12, opacity: .7, marginLeft: 8 }}>薪資計算</span>
                    </div>
                    <div style={{ marginBottom: 14 }}>
                      <span style={{ fontSize: 11, color: "#7a8a9e", fontWeight: 500, display: "block", marginBottom: 4 }}>選擇員工</span>
                      <select value={calcEmpId} onChange={e => { const id = e.target.value; const emp = emps.find(x => String(x.id) === id); setCalcEmpId(id); setSaved(null); setCalcHours(""); setCalcOtHours(""); setCalcBonus(""); setCalcOther(""); setCalcTransfer(""); setCalcMonthSal(emp && emp.type === "正職員工" && emp.msalary ? String(emp.msalary) : ""); }} style={{ ...selStyle, cursor: "pointer" }}>
                        <option value="">請選擇員工</option>
                        {emps.filter(e => !e.resigned).map(e => <option key={e.id} value={e.id}>{e.name}（{e.type}{e.type === "正職員工" && e.msalary ? ` · 月薪 ${w(e.msalary)}` : ""}{e.type !== "正職員工" ? ` · ${w(e.rate)}/h` : ""}）</option>)}
                        {emps.filter(e => e.resigned).length > 0 && <option disabled>── 已離職 ──</option>}
                        {emps.filter(e => e.resigned).map(e => <option key={e.id} value={e.id}>{e.name}（已離職）</option>)}
                      </select>
                    </div>
                    {calcEmp && (<>
                      <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 10, marginBottom: 14 }}>
                        {isFT ? (<><Inp label="月薪 (₩)" type="number" placeholder="0" value={calcMonthSal} onChange={e => setCalcMonthSal(e.target.value)} /><Inp label="獎金 (₩)" type="number" placeholder="0" value={calcBonus} onChange={e => setCalcBonus(e.target.value)} /></>)
                        : (<><Inp label="工作時數（正常）" type="number" placeholder="0" value={calcHours} onChange={e => setCalcHours(e.target.value)} /><Inp label="加班時數（每日超過8h加總）" type="number" placeholder="0" value={calcOtHours} onChange={e => setCalcOtHours(e.target.value)} /><Inp label="獎金 (₩)" type="number" placeholder="0" value={calcBonus} onChange={e => setCalcBonus(e.target.value)} /></>)}
                        <Inp label="其他支出 (₩)" type="number" placeholder="0" value={calcOther} onChange={e => setCalcOther(e.target.value)} />
                        <Inp label="公司匯款 (₩)" type="number" placeholder="0" value={calcTransfer} onChange={e => setCalcTransfer(e.target.value)} />
                      </div>
                      <div style={{ background: "#f5f8fc", borderRadius: 8, padding: 14, marginBottom: 14, fontSize: 13, border: "1px solid #dce3ed" }}>
                        {isFT ? <RR l="月薪" r={w(monthSal)} bold /> : (<><RR l="基本時薪" r={`${w(calcEmp.rate)} × ${hours}h = ${w(basePay)}`} />{otHours > 0 && <RR l="加班（每h+₩5,000）" r={`₩ 5,000 × ${otHours}h = ${w(otPay)}`} c="#c4953a" />}<div style={{ borderTop: "1px solid #dce3ed", margin: "6px 0" }} /><RR l="薪資小計" r={w(totalSalary)} bold /></>)}
                        {bonus > 0 && <RR l="＋ 獎金" r={w(bonus)} c="#5b9e6f" />}
                        {otherExp > 0 && <RR l="－ 其他支出" r={w(otherExp)} c="#c0504d" />}
                        <div style={{ borderTop: "1px solid #dce3ed", margin: "6px 0" }} />
                        <RR l="應付金額" r={w(totalPayable)} bold />
                        {transfer > 0 && (<div style={{ background: "#f0f4fa", borderRadius: 6, padding: "8px 10px", marginTop: 8, fontSize: 12, border: "1px solid #dce3ed" }}><RR l="公司匯款" r={w(transfer)} /><RR l="　含所得稅（3.0%）" r={w(tax.incomeTax)} c="#c0504d" /><RR l="　含地方稅（0.3%）" r={w(tax.localTax)} c="#c0504d" /></div>)}
                        <div style={{ display: "flex", justifyContent: "space-between", padding: "9px 12px", background: "#34537d", borderRadius: 6, color: "#fff", fontWeight: 600, fontSize: 15, marginTop: 8 }}><span>現金支付</span><span>{w(cashPay)}</span></div>
                      </div>
                      <button onClick={handleSave} style={{ width: "100%", padding: "12px", background: "#34537d", color: "#fff", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", fontSize: 15 }}>儲存計算結果</button>
                    </>)}
                  </div>
                ) : (
                  <div>
                    <div style={{ background: "#fff", borderRadius: 10, overflow: "hidden", border: "1px solid #dce3ed", maxWidth: 400, margin: "0 auto" }}>
                      <div style={{ background: "#34537d", padding: "24px 20px 18px", color: "#fff", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <img src={LOGO_SRC} alt="logo" style={{ width: 48, height: 48, marginBottom: 10 }} />
                        <div style={{ fontSize: 10, opacity: .7, marginBottom: 3, letterSpacing: 2 }}>韓集集運 SALARY STATEMENT</div>
                        <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: 1 }}>{saved.month} 薪資明細</div>
                      </div>
                      <div style={{ padding: "18px 20px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14, paddingBottom: 12, borderBottom: "1px dashed #dce3ed" }}>
                          <div><div style={{ fontWeight: 600, fontSize: 16 }}>{saved.empName}</div></div>
                          {!saved.isFT && <div style={{ textAlign: "right", fontSize: 12, color: "#7a8a9e" }}>時薪 {w(saved.rate)}</div>}
                        </div>
                        <div style={{ fontSize: 13, lineHeight: 2.2 }}>
                          {saved.isFT ? <RR l="月薪" r={w(saved.monthSal)} bold /> : (<><RR l="基本工時" r={`${saved.hours}h × ${w(saved.rate)} = ${w(saved.basePay)}`} />{saved.otHours > 0 && <RR l="加班（每h+₩5,000）" r={`₩ 5,000 × ${saved.otHours}h = ${w(saved.otPay)}`} c="#c4953a" />}<RR l="薪資小計" r={w(saved.totalSalary)} bold /></>)}
                          {saved.bonus > 0 && <RR l="＋ 獎金" r={w(saved.bonus)} c="#5b9e6f" />}
                          {saved.otherExp > 0 && <RR l="－ 其他支出" r={w(saved.otherExp)} c="#c0504d" />}
                        </div>
                        <div style={{ borderTop: "1px dashed #dce3ed", margin: "6px 0 10px" }} />
                        <div style={{ fontSize: 14, lineHeight: 2.4 }}><RR l="應付金額" r={w(saved.totalPayable)} bold /></div>
                        {saved.transfer > 0 && (<div style={{ background: "#f5f8fc", borderRadius: 6, padding: "10px 14px", margin: "6px 0", fontSize: 13, border: "1px solid #dce3ed" }}><RR l="公司匯款" r={w(saved.transfer)} bold /><RR l="　含所得稅（3.0%）" r={w(saved.incomeTax)} c="#c0504d" /><RR l="　含地方稅（0.3%）" r={w(saved.localTax)} c="#c0504d" /></div>)}
                        <div style={{ background: "#f0f4fa", borderRadius: 8, padding: "12px 16px", marginTop: 8, display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid #dce3ed" }}><span style={{ fontWeight: 600, fontSize: 14 }}>現金支付</span><span style={{ fontWeight: 700, fontSize: 20, color: "#34537d" }}>{w(saved.cashPay)}</span></div>
                        <div style={{ background: "#34537d", borderRadius: 8, padding: "16px", marginTop: 10 }}>
                          <div style={{ textAlign: "center", color: "#8aa4c4", fontSize: 11, marginBottom: 6, letterSpacing: 2 }}>本月實領金額</div>
                          <div style={{ textAlign: "center", color: "#fff", fontWeight: 800, fontSize: 28, letterSpacing: 1 }}>{w(saved.transfer + saved.cashPay)}</div>
                          <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 10, fontSize: 12, color: "#8aa4c4" }}><span>公司匯款 {w(saved.transfer)}</span><span>+</span><span>現金 {w(saved.cashPay)}</span></div>
                        </div>
                      </div>
                      <div style={{ textAlign: "center", padding: "8px 0 14px", fontSize: 10, color: "#8a9ab0" }}>{new Date().toLocaleDateString()}</div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}><button onClick={clearCalc} style={{ padding: "10px 22px", ...btnP, fontSize: 14 }}>計算下一位</button></div>
                  </div>
                )}
                {records.length > 0 && !saved && (() => {
                  const curRecs = records.filter(r => r.month === curMonth);
                  const totalTransfer = curRecs.reduce((s, r) => s + r.transfer, 0);
                  const totalCash = curRecs.reduce((s, r) => s + r.cashPay, 0);
                  return (
                    <div style={{ marginTop: 18 }}>
                      <p style={{ fontSize: 12, fontWeight: 600, color: "#7a8a9e", marginBottom: 8 }}>已儲存的紀錄</p>
                      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        {curRecs.slice().reverse().map(r => (
                          <div key={r.id} style={{ background: "#fff", borderRadius: 6, padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid #dce3ed", flexWrap: "wrap", gap: 4 }}>
                            <div><span style={{ fontWeight: 600, fontSize: 14 }}>{r.empName}</span><span style={{ fontSize: 11, color: "#8a9ab0", marginLeft: 6 }}>{r.empType}</span></div>
                            <div style={{ textAlign: "right" }}><div style={{ fontSize: 12, color: "#7a8a9e" }}>匯款 {w(r.transfer)}　現金 {w(r.cashPay)}</div></div>
                          </div>
                        ))}
                      </div>
                      {curRecs.length > 0 && (
                        <div style={{ background: "#fff", borderRadius: 8, marginTop: 10, border: "1px solid #dce3ed", overflow: "hidden" }}>
                          <div style={{ padding: "10px 14px", background: "#34537d", color: "#fff", fontWeight: 600, fontSize: 14 }}>{curMonth} 當月總薪資</div>
                          <div style={{ padding: "12px 14px", fontSize: 13 }}>
                            <RR l="公司匯款合計" r={w(totalTransfer)} /><RR l="現金支付合計" r={w(totalCash)} />
                            <div style={{ borderTop: "1px solid #dce3ed", margin: "8px 0" }} />
                            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 16 }}><span>總薪資</span><span style={{ color: "#34537d" }}>{w(totalTransfer + totalCash)}</span></div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            )}

            {/* ═══ HR: 年薪資表 ═══ */}
            {tab === "fin-yearly" && (
              <div style={{ background: "#fff", borderRadius: 8, overflow: "hidden", border: "1px solid #dce3ed" }}>
                <div style={{ padding: "14px 18px", background: "#34537d", color: "#fff" }}><span style={{ fontWeight: 600, fontSize: 15, letterSpacing: 1 }}>{now.getFullYear()} 年薪資表</span></div>
                {annualRows.length === 0 ? <div style={{ textAlign: "center", padding: 50, color: "#8a9ab0", fontSize: 13 }}>尚無紀錄，請先至「月薪資表」儲存</div>
                : (<><div style={{ padding: "4px 0" }}>{annualRows.map(([month, total], i) => (
                  <div key={month} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 18px", borderBottom: i < annualRows.length - 1 ? "1px solid #eef2f7" : "none" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}><div style={{ width: 7, height: 7, borderRadius: "50%", background: month === curMonth ? "#34537d" : "#c8d1de" }} /><span style={{ fontWeight: 500, fontSize: 15, color: month === curMonth ? "#34537d" : "#4a5568" }}>{month}</span></div>
                    <span style={{ fontWeight: 600, fontSize: 15 }}>{w(total)}</span>
                  </div>))}</div>
                  <div style={{ padding: "16px 18px", borderTop: "2px solid #34537d", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f0f4fa" }}><span style={{ fontWeight: 600, fontSize: 15 }}>年度加總</span><span style={{ fontWeight: 700, fontSize: 20, color: "#34537d" }}>{w(grandTotal)}</span></div></>)}
              </div>
            )}

            {/* ═══ HR: 居留簽證 ═══ */}
            {tab === "hr-visa" && (() => {
              const visaEmps = emps.filter(e => e.visa).sort((a, b) => new Date(a.visa) - new Date(b.visa));
              return (
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  {visaEmps.length === 0 ? <div style={{ textAlign: "center", padding: 50, color: "#8a9ab0", fontSize: 13 }}>目前沒有需要追蹤的簽證</div>
                  : visaEmps.map(e => {
                    const days = daysLeft(e.visa); let vc = "#5b9e6f", vl = `${days}天`, bg = "#fff";
                    if (days < 0) { vc = "#c0504d"; vl = "已過期"; bg = "#fdf5f5"; } else if (days <= 30) { vc = "#c0504d"; bg = "#fdf5f5"; } else if (days <= 90) { vc = "#c4953a"; bg = "#fdf9f0"; }
                    return (
                      <div key={e.id} style={{ background: bg, borderRadius: 8, padding: "14px 16px", border: `1px solid ${days <= 30 ? "#f0d0ce" : days <= 90 ? "#eddcb5" : "#dce3ed"}`, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                        <Dot id={e.id} />
                        <div style={{ flex: 1, minWidth: 80 }}>
                          <div style={{ fontWeight: 600, fontSize: 14 }}>{e.empNo && <span style={{ color: "#7a8a9e", fontWeight: 500, marginRight: 6 }}>{e.empNo}</span>}{e.name}</div>
                          <div style={{ fontSize: 11, color: "#8a9ab0" }}>{e.type}</div>
                        </div>
                        {e.visaType && <span style={{ fontSize: 12, fontWeight: 600, color: "#34537d", background: "#e8edf4", padding: "3px 10px", borderRadius: 5 }}>{e.visaType}</span>}
                        <div style={{ textAlign: "right", minWidth: 90 }}><div style={{ fontSize: 12, color: "#7a8a9e" }}>{e.visa}</div><div style={{ fontSize: 13, fontWeight: 600, color: vc }}>{vl}</div></div>
                      </div>);
                  })}
                </div>);
            })()}

          </div>
        </div>
      </div>
      )}
    </div>
  );
}
