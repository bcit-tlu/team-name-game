import React, { createContext, useContext, useState, useCallback } from 'react';

interface SessionInfo {
  name: string;
  emoji: string;
}

interface SessionContextValue {
  sessionInfo: SessionInfo | null;
  setSessionInfo: (info: SessionInfo) => void;
  clearSessionInfo: () => void;
}

const SESSION_KEY = 'tng_session_info';

const SessionContext = createContext<SessionContextValue | null>(null);

function loadFromStorage(): SessionInfo | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SessionInfo;
    if (parsed.name && parsed.emoji) return parsed;
    return null;
  } catch {
    return null;
  }
}

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [sessionInfo, setSessionInfoState] = useState<SessionInfo | null>(loadFromStorage);

  const setSessionInfo = useCallback((info: SessionInfo) => {
    setSessionInfoState(info);
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(info));
  }, []);

  const clearSessionInfo = useCallback(() => {
    setSessionInfoState(null);
    sessionStorage.removeItem(SESSION_KEY);
  }, []);

  return (
    <SessionContext.Provider value={{ sessionInfo, setSessionInfo, clearSessionInfo }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) throw new Error('useSession must be used within SessionProvider');
  return context;
}
