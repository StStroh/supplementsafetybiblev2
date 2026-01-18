import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Activity, ShieldCheck, Zap, CreditCard, LogOut, ChevronRight, Lock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

function clsx(...xs: Array<string | false | null | undefined>) { return xs.filter(Boolean).join(' '); }

function Badge({ children, tone = 'slate' }: { children: any, tone?: 'green'|'red'|'amber'|'slate' }) {
  const tones: Record<string,string> = {
    green:'bg-emerald-100 text-emerald-800',
    red:'bg-rose-100 text-rose-800',
    amber:'bg-amber-100 text-amber-800',
    slate:'bg-slate-100 text-slate-700'
  };
  return <span className={clsx('inline-flex items-center px-2 py-0.5 text-xs rounded-full', tones[tone])}>{children}</span>;
}

function Card({ title, children, actions }: { title: string, children: any, actions?: any }) {
  return (
    <div className="rounded-2xl border bg-white shadow-sm">
      <div className="flex items-center justify-between px-5 py-3 border-b">
        <h3 className="font-semibold">{title}</h3>
        <div>{actions}</div>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function Stat({ icon:Icon, label, value, hint, tone='slate' }:{ icon:any,label:string,value:string|number,hint?:string,tone?:'slate'|'green'|'amber'|'red'}) {
  const toneMap: Record<string,string> = {
    slate:'bg-slate-50 text-slate-900',
    green:'bg-emerald-50 text-emerald-900',
    amber:'bg-amber-50 text-amber-900',
    red:'bg-rose-50 text-rose-900'
  };
  return (
    <div className={clsx('rounded-2xl border p-4 shadow-sm', toneMap[tone])}>
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-white/80 border grid place-items-center"><Icon className="h-5 w-5"/></div>
        <div>
          <div className="text-sm text-slate-600">{label}</div>
          <div className="text-2xl font-bold">{value}</div>
          {hint && <div className="text-xs text-slate-500 mt-0.5">{hint}</div>}
        </div>
      </div>
    </div>
  );
}

function Table({ rows }:{ rows: Array<{when:string, pair:string, severity:string, action:string}> }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left text-slate-600">
            <th className="py-2 pr-4">When</th>
            <th className="py-2 pr-4">Checked</th>
            <th className="py-2 pr-4">Severity</th>
            <th className="py-2">Recommendation</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r,i)=> (
            <tr key={i} className="border-t">
              <td className="py-2 pr-4 text-slate-500">{r.when}</td>
              <td className="py-2 pr-4 font-medium">{r.pair}</td>
              <td className="py-2 pr-4">
                {r.severity === 'Severe' && <Badge tone='red'>Severe</Badge>}
                {r.severity === 'High' && <Badge tone='amber'>High</Badge>}
                {r.severity === 'Moderate' && <Badge tone='slate'>Moderate</Badge>}
                {r.severity === 'Low' && <Badge tone='green'>Low</Badge>}
              </td>
              <td className="py-2 text-slate-600">{r.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

async function openBilling(customerId: string) {
  const res = await fetch('/.netlify/functions/create-portal-session', {
    method:'POST', headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ customerId })
  });
  const json = await res.json();
  if (json?.url) window.location.href = json.url;
}

/*
 * ⚠️ DO NOT MODIFY ENTITLEMENT LOGIC WITHOUT FULL BILLING FLOW REVIEW.
 * This dashboard gates access based on profiles.is_premium and profiles.plan.
 *
 * CRITICAL: entitlement check at line ~132 controls premium access.
 * Changes here affect what paying customers can access.
 *
 * Verified working: 2025-12-14
 * See: /docs/BILLING_FLOW_LOCKED.md
 */
export default function PremiumDashboard(){
  const navigate = useNavigate();
  const [entitlement, setEntitlement] = useState<{isPremium:boolean, email:string|null, subscription_status:string|null, current_period_end:string|null, stripe_customer_id?:string|null} | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadStartTime] = useState(Date.now());

  const chartData = useMemo(()=>{
    const days = 8; const out: any[] = [];
    for (let i=days-1;i>=0;i--){
      const d = new Date(); d.setDate(d.getDate()-i);
      out.push({
        day: d.toLocaleDateString(undefined,{ month:'short', day:'numeric'}),
        checks: Math.max(2, Math.round(12 + Math.sin(i/2)*6 + (Math.random()*4-2)))
      });
    }
    return out;
  },[]);

  const recentRows = [
    { when:'Today 14:22', pair:'Niacin × Metformin', severity:'Moderate', action:'Monitor glucose; consider spacing doses.' },
    { when:'Today 10:05', pair:'St. John\'s Wort × Sertraline', severity:'Severe', action:'Avoid concomitant use; consult prescriber.' },
    { when:'Yesterday', pair:'Magnesium × Doxycycline', severity:'High', action:'Separate by 2-6 hours to reduce chelation.' },
    { when:'2 days ago', pair:'Creatine × Caffeine', severity:'Low', action:'Generally compatible; watch GI tolerance.' },
  ];

  useEffect(()=>{
    let mounted = true;
    (async ()=>{
      const { data: { session } } = await supabase.auth.getSession();
      if (!mounted) return;
      if (!session) { setLoading(false); navigate('/pricing'); return; }
      const res = await fetch('/.netlify/functions/me', { headers:{ Authorization: `Bearer ${session.access_token}` }});
      if (!mounted) return;
      if (!res.ok) { setLoading(false); navigate('/pricing'); return; }
      const json = await res.json();
      setEntitlement(json);
      if (!json?.isPremium) { setLoading(false); navigate('/pricing'); return; }
      setLoading(false);
    })();
    return ()=>{ mounted = false; };
  }, [navigate]);

  useEffect(()=>{
    const timeoutId = setTimeout(()=>{
      if (loading) {
        console.error('[BILLING DIAGNOSTIC] Dashboard still loading after 10 seconds. Check:');
        console.error('  - profiles.is_premium is set to true');
        console.error('  - profiles.subscription_status is "active" or "trialing"');
        console.error('  - profiles.stripe_customer_id exists');
        console.error('  - /me endpoint returns isPremium: true');
        console.error('  - Webhook received and processed payment');
        console.error('  See: /docs/BILLING_FLOW_LOCKED.md');
      }
    }, 10000);
    return ()=> clearTimeout(timeoutId);
  }, [loading]);

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-gradient-to-b from-white to-slate-50">
        <div className="animate-pulse text-slate-600">Loading your Premium dashboard…</div>
      </div>
    );
  }

  if (!entitlement?.isPremium) {
    return (
      <div className="min-h-screen grid place-items-center">
        <div className="text-center">
          <Lock className="mx-auto h-10 w-10 text-slate-400"/>
          <h2 className="mt-2 text-xl font-semibold">Premium required</h2>
          <p className="text-slate-600 mt-1">Your subscription could not be verified.</p>
          <Link to="/pricing" className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-xl bg-teal-600 text-white hover:bg-teal-700">View plans <ChevronRight className="h-4 w-4"/></Link>
        </div>
      </div>
    );
  }

  const renewal = entitlement?.current_period_end ? new Date(entitlement.current_period_end).toLocaleDateString() : '—';
  const subTone = entitlement?.subscription_status==='active' ? 'green' : entitlement?.subscription_status==='past_due' ? 'amber' : 'slate';

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      <header className="sticky top-0 z-40 border-b bg-white/70 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600"/>
            <div>
              <p className="font-semibold">Premium Dashboard</p>
              <p className="text-xs text-slate-500">{entitlement?.email || '—'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge tone={subTone as any}>{entitlement?.subscription_status || 'unknown'}</Badge>
            <button onClick={async()=>{ await supabase.auth.signOut(); window.location.href='/'; }} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border text-sm hover:bg-white">
              <LogOut className="h-4 w-4"/> Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-12 gap-6">
        <section className="lg:col-span-8 space-y-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Stat icon={Zap} label="Checks this week" value={chartData.slice(-7).reduce((a,c)=>a+c.checks,0)} hint="Across team members" tone='green'/>
            <Stat icon={ShieldCheck} label="High/Severe flagged" value={7} hint="Last 7 days" tone='amber'/>
            <Stat icon={Activity} label="Avg. time to answer" value="2.1s" hint="Median latency" tone='slate'/>
          </div>

          <Card title="Usage (last 8 days)">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ left: 8, right: 8, top: 10 }}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0d9488" stopOpacity={0.35}/>
                      <stop offset="95%" stopColor="#0d9488" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200"/>
                  <XAxis dataKey="day" tick={{ fontSize:12 }} stroke="#94a3b8"/>
                  <YAxis allowDecimals={false} tick={{ fontSize:12 }} stroke="#94a3b8"/>
                  <Tooltip contentStyle={{ fontSize:12 }} />
                  <Area type="monotone" dataKey="checks" stroke="#0d9488" fillOpacity={1} fill="url(#g1)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card title="Recent activity" actions={<Link to="/checker" className="inline-flex items-center gap-2 text-sm text-teal-700 hover:underline">Open checker <ChevronRight className="h-4 w-4"/></Link>}>
            <Table rows={recentRows}/>
          </Card>
        </section>

        <aside className="lg:col-span-4 space-y-6">
          <Card title="Subscription">
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Status</span>
                <Badge tone={subTone as any}>{entitlement?.subscription_status || 'unknown'}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Renews</span>
                <span className="font-medium">{renewal}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Plan</span>
                <span className="font-medium">Premium</span>
              </div>
              <div className="pt-2">
                <button
                  onClick={()=> openBilling(entitlement?.stripe_customer_id || 'REPLACE_WITH_CUSTOMER_ID')}
                  className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-teal-600 text-white hover:bg-teal-700"
                >
                  <CreditCard className="h-4 w-4"/> Manage billing
                </button>
                <p className="text-xs text-slate-500 mt-2">
                  Tip: ensure `/me` returns <code>stripe_customer_id</code>; otherwise replace manually.
                </p>
              </div>
            </div>
          </Card>

          <Card title="Shortcuts">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <Link to="/checker" className="rounded-xl border p-3 hover:bg-slate-50">Interaction checker</Link>
              <Link to="/library" className="rounded-xl border p-3 hover:bg-slate-50">Evidence library</Link>
              <Link to="/reports" className="rounded-xl border p-3 hover:bg-slate-50">Saved reports</Link>
              <Link to="/account" className="rounded-xl border p-3 hover:bg-slate-50">Account</Link>
            </div>
          </Card>

          <Card title="Tips">
            <ul className="list-disc pl-5 text-sm text-slate-600 space-y-2">
              <li>Flag High/Severe outcomes for follow-up with your pharmacist or prescriber.</li>
              <li>Separate minerals from certain antibiotics by 2–6 hours to reduce chelation.</li>
              <li>Record checks in QA logs to build defensible procedures (NSF/FDA).</li>
            </ul>
          </Card>
        </aside>
      </main>
    </div>
  );
}
