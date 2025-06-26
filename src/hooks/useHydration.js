// src/hooks/useHydration.js
import { useState, useEffect } from "react";

export const useHydration = (...stores) => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Check if all stores have been hydrated
    const checkHydration = () => {
      const allHydrated = stores.every((store) => {
        // Use the persist API to check hydration status
        return store.persist?.hasHydrated() || false;
      });

      if (allHydrated && !hydrated) {
        setHydrated(true);
      }
    };

    // Check immediately
    checkHydration();

    // Set up listeners for hydration completion
    const unsubscribers = stores.map((store) => {
      if (store.persist?.onFinishHydration) {
        return store.persist.onFinishHydration(checkHydration);
      }
      return () => {};
    });

    return () => {
      unsubscribers.forEach((unsub) => unsub());
    };
  }, [stores, hydrated]);

  return hydrated;
};
