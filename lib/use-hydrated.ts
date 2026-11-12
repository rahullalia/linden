import { useSyncExternalStore } from "react";

const noSubscription = () => () => {};

/**
 * False on the server and while the page hydrates, true once the browser has
 * taken over. For values that only the browser knows, like the visitor's clock.
 */
export function useHydrated() {
  return useSyncExternalStore(noSubscription, () => true, () => false);
}
