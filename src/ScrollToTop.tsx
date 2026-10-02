import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

/**
 * Scrolls to the top of the page on every PUSH/REPLACE navigation.
 * - POP (browser Back / Forward): no-op — lets the browser restore position.
 * - Hash links (#section): no-op — lets the browser jump to the anchor.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const navType = useNavigationType()

  useEffect(() => {
    if (navType === 'POP') return   // back / forward — don't interfere
    if (hash) return                 // anchor link — let browser handle

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash, navType])

  return null
}
