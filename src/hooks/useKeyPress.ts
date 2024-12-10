import { useEffect, useCallback } from 'react'

export function useKeyPress(targetKey: string, handler: () => void) {
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === targetKey) {
        handler()
      }
    },
    [targetKey, handler]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])
} 