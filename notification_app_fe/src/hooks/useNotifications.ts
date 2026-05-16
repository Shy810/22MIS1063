import { useState, useEffect, useCallback } from 'react';

const VIEWED_KEY = 'campus_notifications_viewed';

export const useViewedNotifications = () => {
  const [viewedIds, setViewedIds] = useState<Set<string>>(() => {
    const stored = localStorage.getItem(VIEWED_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return new Set(parsed);
      } catch (e) {
        return new Set();
      }
    }
    return new Set();
  });

  const markAsViewed = useCallback((id: string) => {
    setViewedIds((prev) => {
      if (prev.has(id)) return prev; // Already viewed
      const newSet = new Set(prev);
      newSet.add(id);
      localStorage.setItem(VIEWED_KEY, JSON.stringify(Array.from(newSet)));
      return newSet;
    });
  }, []);

  const isViewed = useCallback((id: string) => {
    return viewedIds.has(id);
  }, [viewedIds]);

  const markAllAsViewed = useCallback((ids: string[]) => {
     setViewedIds((prev) => {
        let changed = false;
        const newSet = new Set(prev);
        for(const id of ids) {
            if(!newSet.has(id)){
                newSet.add(id);
                changed = true;
            }
        }
        if(changed) {
            localStorage.setItem(VIEWED_KEY, JSON.stringify(Array.from(newSet)));
            return newSet;
        }
        return prev;
     });
  }, []);

  return { viewedIds, markAsViewed, isViewed, markAllAsViewed };
};
