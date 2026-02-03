'use client';

import { useEffect, useRef } from 'react';
import { Terminal as XTerm } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import { WebLinksAddon } from '@xterm/addon-web-links';
import '@xterm/xterm/css/xterm.css';

type ConnectResponse = {
  url?: string;
};

export type TerminalConnectionStatus = 'connecting' | 'connected' | 'disconnected';

interface TerminalProps {
  onStatusChange?: (status: TerminalConnectionStatus) => void;
}

export default function Terminal({ onStatusChange }: TerminalProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const terminalRef = useRef<XTerm | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const pendingInputRef = useRef('');

  useEffect(() => {
    let isDisposed = false;
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const terminal = new XTerm({
      cursorBlink: true,
      fontFamily: 'Menlo, Monaco, Consolas, "Liberation Mono", monospace',
      fontSize: 14,
      scrollback: 2000,
      theme: { background: '#0b0b0b' },
    });
    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);
    terminal.loadAddon(new WebLinksAddon());
    terminal.open(container);
    fitAddon.fit();

    terminalRef.current = terminal;
    fitAddonRef.current = fitAddon;

    const handleResize = () => {
      if (!terminalRef.current || !fitAddonRef.current) {
        return;
      }
      fitAddonRef.current.fit();
      const socket = socketRef.current;
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(
          JSON.stringify({
            type: 'resize',
            cols: terminalRef.current.cols,
            rows: terminalRef.current.rows,
          })
        );
      }
    };

    const sendToSocket = (data: string) => {
      const socket = socketRef.current;
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: 'data', data }));
        return true;
      }
      pendingInputRef.current += data;
      return false;
    };

    const handleInjectedInput = (event: Event) => {
      const customEvent = event as CustomEvent<{ data?: string }>;
      const data = customEvent.detail?.data;
      if (!data) {
        return;
      }
      sendToSocket(data);
    };

    const setStatus = (status: TerminalConnectionStatus) => {
      onStatusChange?.(status);
    };

    const connect = async () => {
      setStatus('connecting');
      try {
        const response = await fetch('/api/vm/connect', { method: 'POST' });
        if (!response.ok) {
          console.error('Failed to fetch terminal connection URL.');
          setStatus('disconnected');
          return;
        }

        const data = (await response.json()) as ConnectResponse;
        if (!data.url) {
          console.error('No connection URL returned from API.');
          setStatus('disconnected');
          return;
        }
        if (isDisposed) {
          return;
        }

        const socket = new WebSocket(data.url);
        socketRef.current = socket;

        socket.addEventListener('open', () => {
          setStatus('connected');
          handleResize();
          if (pendingInputRef.current) {
            const queued = pendingInputRef.current;
            pendingInputRef.current = '';
            sendToSocket(queued);
          }
        });
        socket.addEventListener('message', async (event) => {
          if (!terminalRef.current) {
            return;
          }
          if (typeof event.data === 'string') {
            terminalRef.current.write(event.data);
            return;
          }
          if (event.data instanceof ArrayBuffer) {
            const text = new TextDecoder().decode(event.data);
            terminalRef.current.write(text);
            return;
          }
          if (event.data instanceof Blob) {
            const text = await event.data.text();
            terminalRef.current.write(text);
          }
        });
        socket.addEventListener('error', (event) => {
          console.error('Terminal WebSocket error', event);
          setStatus('disconnected');
        });
        socket.addEventListener('close', () => {
          setStatus('disconnected');
        });

        terminal.onData((data) => {
          sendToSocket(data);
        });

        window.addEventListener('resize', handleResize);
        window.addEventListener('openclaw-terminal-input', handleInjectedInput);
      } catch (error) {
        console.error('Unable to connect terminal:', error);
        setStatus('disconnected');
      }
    };

    void connect();

    return () => {
      isDisposed = true;
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('openclaw-terminal-input', handleInjectedInput);
      socketRef.current?.close();
      socketRef.current = null;
      terminalRef.current?.dispose();
      terminalRef.current = null;
    };
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
}
