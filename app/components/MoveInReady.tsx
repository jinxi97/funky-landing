import React from 'react';
import { Globe, Database, Smartphone } from 'lucide-react';

// ── Language / tool icon components ──────────────────────────────────────────

const PythonIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 256 255" xmlns="http://www.w3.org/2000/svg">
    <path d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.557 34.475-33.319V33.97S194.67.072 126.916.072zM92.802 19.66a11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13 11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13z" fill="#387EB8"/>
    <path d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.6v-8.745h86.441s41.486 4.705 41.486-60.712c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475-.557-34.475 33.32v56.013s-5.235 33.897 62.518 33.897zm34.114-19.586a11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13 11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13z" fill="#FFE052"/>
  </svg>
);

const AndroidBotIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#3DDC84">
    <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5S11 23.33 11 22.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zm-2.5-1C2.67 17 2 16.33 2 15.5v-7C2 7.67 2.67 7 3.5 7S5 7.67 5 8.5v7c0 .83-.67 1.5-1.5 1.5zm17 0c-.83 0-1.5-.67-1.5-1.5v-7c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v7c0 .83-.67 1.5-1.5 1.5zM15.53 2.16l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48A5.84 5.84 0 0 0 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C7.08 3.04 6 4.6 6 6.5h12c0-1.91-1.08-3.47-2.47-4.34zM10 5H9V4h1v1zm5 0h-1V4h1v1z"/>
  </svg>
);

// ── Dep chip ─────────────────────────────────────────────────────────────────

type DepChipProps =
  | { icon: React.ReactNode; label: string; pill?: never; color?: never }
  | { pill: string; color: 'violet' | 'emerald' | 'slate' | 'amber' | 'blue' | 'indigo'; icon?: never; label?: never };

const DepChip = (props: DepChipProps) => {
  if (props.pill !== undefined) {
    const colorMap = {
      violet:  'bg-violet-50  border-violet-200  text-violet-700',
      emerald: 'bg-emerald-50 border-emerald-200 text-emerald-700',
      slate:   'bg-slate-50   border-slate-200   text-slate-600',
      amber:   'bg-amber-50   border-amber-200   text-amber-700',
      blue:    'bg-blue-50    border-blue-200    text-blue-700',
      indigo:  'bg-indigo-50  border-indigo-200  text-indigo-700',
    };
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold border ${colorMap[props.color]}`}>
        {props.pill}
      </span>
    );
  }
  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200">
      {props.icon}
      <span className="text-xs font-medium text-slate-600">{props.label}</span>
    </div>
  );
};

// ── Workspace card ────────────────────────────────────────────────────────────

type WorkspaceCardProps = {
  headerIcon: React.ReactNode;
  gradient: string;
  title: string;
  description: string;
  deps: React.ReactNode[];
};

const WorkspaceCard = ({ headerIcon, gradient, title, description, deps }: WorkspaceCardProps) => (
  <div className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden">
    {/* Card header */}
    <div className="p-6 pb-4">
      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-md mb-4`}>
        {headerIcon}
      </div>
      <h3 className="font-bold text-slate-900 text-base mb-3">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
    </div>

    {/* Divider + deps */}
    <div className="mt-auto px-6 py-4 border-t border-slate-100 bg-slate-50/60">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-2.5">Pre-installed</p>
      <div className="flex flex-wrap gap-2">
        {deps}
      </div>
    </div>
  </div>
);

// ── Section ───────────────────────────────────────────────────────────────────

const MoveInReady = () => (
  <section className="py-24 bg-white border-t border-slate-200">
    <div className="max-w-7xl mx-auto px-6">

      {/* Heading */}
      <div className="text-center mb-14">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Move-in ready.</h2>
        <p className="text-slate-500 max-w-xl mx-auto">
          Every Funky workspace comes pre-loaded with the tools your agent needs.
          Pick a template, <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">git clone</code> your scripts, and go.
        </p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6">

        <WorkspaceCard
          headerIcon={<Globe size={22} />}
          gradient="from-blue-500 to-indigo-600"
          title="Browser Workspace"
          description="Control any browser with natural language. Built for web automation, UI testing, and scraping agents."
          deps={[
            <DepChip key="py"  icon={<PythonIcon />} label="Python" />,
            <DepChip key="bu"  pill="browser-use" color="violet" />,
            <DepChip key="pw"  pill="Playwright"  color="emerald" />,
          ]}
        />

        <WorkspaceCard
          headerIcon={<Smartphone size={22} />}
          gradient="from-green-500 to-emerald-600"
          title="Android Workspace"
          description="Automate and test Android apps from the cloud. Your agent drives a real device over ADB."
          deps={[
            <DepChip key="adb" icon={<AndroidBotIcon />} label="Android ADB" />,
            <DepChip key="emu" pill="Emulator" color="emerald" />,
          ]}
        />

        <WorkspaceCard
          headerIcon={<Database size={22} />}
          gradient="from-amber-500 to-orange-500"
          title="Data Analyst Workspace"
          description="Query, transform, and analyse data at any scale. Your agent runs SQL and Python side by side."
          deps={[
            <DepChip key="dd"  pill="DuckDB"  color="amber" />,
            <DepChip key="sq"  pill="SQLite"  color="blue" />,
            <DepChip key="pd"  pill="Pandas"  color="indigo" />,
          ]}
        />

      </div>
    </div>
  </section>
);

export default MoveInReady;
