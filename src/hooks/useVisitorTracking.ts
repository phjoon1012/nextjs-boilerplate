import { useState, useEffect } from 'react';

interface VisitorData {
  uniqueVisitorsToday: number;
  isNewVisitor: boolean;
}

export const useVisitorTracking = () => {
  const [visitorCount, setVisitorCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const generateVisitorId = (): string => {
    // Generate a unique visitor ID based on browser fingerprint
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx?.fillText('visitor-id', 10, 10);
    const canvasFingerprint = canvas.toDataURL();
    
    const fingerprint = [
      navigator.userAgent,
      navigator.language,
      screen.width + 'x' + screen.height,
      new Date().getTimezoneOffset(),
      canvasFingerprint.slice(-50) // Last 50 chars of canvas fingerprint
    ].join('|');
    
    // Create a simple hash
    let hash = 0;
    for (let i = 0; i < fingerprint.length; i++) {
      const char = fingerprint.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    return Math.abs(hash).toString(36);
  };

  const trackVisitor = async (): Promise<void> => {
    try {
      const visitorId = generateVisitorId();
      const userAgent = navigator.userAgent;
      
      const response = await fetch('/api/visitors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          visitorId,
          userAgent,
          // Note: We don't send IP from client-side for privacy
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to track visitor');
      }

      const data: VisitorData = await response.json();
      setVisitorCount(data.uniqueVisitorsToday);
      setError(null);
    } catch (err) {
      console.error('Visitor tracking error:', err);
      setError('Failed to track visitor');
      // Fallback: try to get just the count without tracking
      await getVisitorCount();
    } finally {
      setIsLoading(false);
    }
  };

  const getVisitorCount = async (): Promise<void> => {
    try {
      const response = await fetch('/api/visitors');
      
      if (!response.ok) {
        throw new Error('Failed to get visitor count');
      }

      const data = await response.json();
      setVisitorCount(data.uniqueVisitorsToday);
      setError(null);
    } catch (err) {
      console.error('Visitor count error:', err);
      setError('Failed to get visitor count');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Only track on client-side
    if (typeof window !== 'undefined') {
      trackVisitor();
    }
  }, []);

  return {
    visitorCount,
    isLoading,
    error,
    refreshCount: getVisitorCount
  };
};
