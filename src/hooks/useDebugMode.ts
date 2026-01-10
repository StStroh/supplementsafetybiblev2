import { useState, useEffect } from 'react';

export function useDebugMode(): boolean {
  const [isDebug, setIsDebug] = useState(false);

  useEffect(() => {
    const checkDebugMode = () => {
      const params = new URLSearchParams(window.location.search);
      setIsDebug(params.get('debug') === '1');
    };

    checkDebugMode();

    window.addEventListener('popstate', checkDebugMode);
    return () => window.removeEventListener('popstate', checkDebugMode);
  }, []);

  return isDebug;
}
