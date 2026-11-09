import * as React from "react"

const MOBILE_QUERY = "(max-width: 767px)" // MOBILE_BREAKPOINT - 1

export function useIsMobile() {
  const subscribe = React.useCallback((onStoreChange: () => void) => {
    const mql = window.matchMedia(MOBILE_QUERY)
    mql.addEventListener("change", onStoreChange)
    return () => mql.removeEventListener("change", onStoreChange)
  }, [])

  return React.useSyncExternalStore(
    subscribe,
    () => window.matchMedia(MOBILE_QUERY).matches,
    () => false
  )
}
