import { ReactNode, createContext, useState } from 'react'
import { TConversation, TConversationContext, TConversationState } from '../../core/ContextTypes'

type Props = {
  children: ReactNode
}

export const ConverSationContext = createContext<TConversationContext>(null)
const ConversationProvider = ConverSationContext.Provider

const ConversationContextProvider = ({ children }: Props) => {
  const [conversation, setConversation] = useState<TConversationState>({ currentUser: null, conversationList: [] })
  const updateCurrentUser = (currentUser: string | null) => {
    setConversation((prev) => ({
      ...prev,
      currentUser,
    }))
  }

  const updateConversationList = (conversationItem: TConversation) => {
    setConversation((prev) => {
      const prevElementIndex = prev.conversationList.find((c) => c.from === conversationItem.from)

      return {
        ...prev,
        // eslint-disable-next-line no-extra-boolean-cast
        conversationList: prevElementIndex
          ? [conversationItem, ...prev.conversationList.filter((c) => c.from !== prevElementIndex?.from)]
          : [conversationItem, ...prev.conversationList],
      }
    })
  }

  return (
    <ConversationProvider value={{ conversation, updateCurrentUser, updateConversationList }}>
      {children}
    </ConversationProvider>
  )
}

export default ConversationContextProvider
