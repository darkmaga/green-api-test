import { useContext } from 'react'
import { ConverSationContext } from '../components/Context/ConversationContext'

const useConversationContext = () => {
  const data = useContext(ConverSationContext)

  if (!data) {
    throw new Error('Can not use `useonversationContext` outside of the `ConversationContextProvider`')
  }

  return data
}

export default useConversationContext
