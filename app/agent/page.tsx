import TerminalClient from './TerminalClient';

export default function AgentPage() {
  return (
    <main className="h-screen w-screen bg-slate-950 text-slate-100">
      <div className="h-full w-full">
        <TerminalClient />
      </div>
    </main>
  );
}
