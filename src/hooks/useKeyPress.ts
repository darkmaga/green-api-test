import { useEffect } from 'react'
import useLatest from './useLatest'

const useKeyPress = (key: string, onPress: () => void) => {
  const latestOnPress = useLatest(onPress)

  useEffect(() => {
    const eventListenerCb = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== key.toLowerCase()) return

      latestOnPress.current()
    }

    document.addEventListener('keypress', eventListenerCb)

    return () => {
      document.removeEventListener('keypress', eventListenerCb)
    }
  }, [key, latestOnPress])
}

export default useKeyPress
