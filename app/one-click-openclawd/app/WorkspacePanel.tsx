'use client';

import { useState } from 'react';

import ProvisioningStatus, {
  type VmResult,
} from '@/app/one-click-openclawd/app/ProvisioningStatus';
import TerminalBox from '@/app/one-click-openclawd/app/TerminalBox';

interface WorkspacePanelProps {
  userId: string;
  initialResult: VmResult;
}

export default function WorkspacePanel({ userId, initialResult }: WorkspacePanelProps) {
  const initialReady =
    initialResult?.success && initialResult?.status?.toUpperCase() === 'RUNNING';
  const [isReady, setIsReady] = useState(initialReady);

  const handleStartOnboarding = () => {
    window.dispatchEvent(
      new CustomEvent('openclaw-terminal-input', {
        detail: { data: 'openclaw onboard\r' },
      })
    );
  };

  return (
    <>
      <ProvisioningStatus
        userId={userId}
        initialResult={initialResult}
        onReadyChange={setIsReady}
      />
      {!isReady && (
        <p className="mt-4 text-sm text-slate-500">
          The terminal will appear once your VM is running.
        </p>
      )}
      {isReady && (
        <>
          <p className="mt-4 text-sm text-slate-500">
            If the VM is running but the terminal shows nothing, refresh the page.
          </p>
          <TerminalBox />
          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
            <h2 className="text-base font-semibold text-slate-900">
              OpenClawd onboarding checklist
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Follow these prompts in the terminal.
            </p>
            <button
              type="button"
              onClick={handleStartOnboarding}
              className="mt-3 inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:border-slate-400 hover:bg-slate-100"
            >
              Start onboarding
            </button>
            <span className="ml-3 text-xs text-slate-500">
              This can take up to 1 minute to show anything.
            </span>
            <ol className="mt-3 space-y-2">
              <li>
                <span className="font-medium text-slate-900">
                  Safety confirmation:
                </span>{' '}
                “I understand this is powerful and inherently risky. Continue?” →{' '}
                <span className="font-medium text-slate-900">Yes</span>
              </li>
              <li>
                <span className="font-medium text-slate-900">Onboarding mode:</span>{' '}
                QuickStart
              </li>
              <li>
                <span className="font-medium text-slate-900">
                  Model/auth provider:
                </span>{' '}
                OpenRouter
              </li>
              <li>
                <span className="font-medium text-slate-900">
                  OpenRouter auth method:
                </span>{' '}
                OpenRouter API key
              </li>
              <li>
                <span className="font-medium text-slate-900">Get your API key:</span>{' '}
                open{' '}
                <a
                  href="https://openrouter.ai/"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-slate-900 underline decoration-slate-300 underline-offset-2"
                >
                  openrouter.ai
                </a>{' '}
                and click “Get API Key”
              </li>
              <li>
                <span className="font-medium text-slate-900">Enter key:</span> paste it
                into “Enter OpenRouter API key”
              </li>
              <li>
                <span className="font-medium text-slate-900">Default model:</span>{' '}
                select “Enter model manually”, then type “openrouter/google/gemini-3-flash-preview”
              </li>
              <li>
                <span className="font-medium text-slate-900">
                  Select channel (QuickStart):
                </span>{' '}
                recommend WhatsApp, but any app works
              </li>
              <li>
                <span className="font-medium text-slate-900">
                  Configure skills now? (recommended)
                </span>{' '}
                → Yes, select what you want
              </li>
              <li>
                <span className="font-medium text-slate-900">Enable hooks?</span> Skip
                for now
              </li>
              <li>
                <span className="font-medium text-slate-900">
                  Install shell completion script?
                </span>{' '}
                Yes
              </li>
              <li>
                <span className="font-medium text-slate-900">
                  How do you want to hatch your bot?
                </span>{' '}
                Hatch in TUI (recommended)
              </li>
            </ol>
          </div>
          <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              CLI shortcuts
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent('openclaw-terminal-input', {
                      detail: { data: 'openclaw tui\r' },
                    })
                  )
                }
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-medium text-slate-900 transition hover:border-slate-400 hover:bg-slate-100"
              >
                Open Chat
              </button>
              <button
                type="button"
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent('openclaw-terminal-input', {
                      detail: { data: 'openclaw configure\r' },
                    })
                  )
                }
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-medium text-slate-900 transition hover:border-slate-400 hover:bg-slate-100"
              >
                Change Settings
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
