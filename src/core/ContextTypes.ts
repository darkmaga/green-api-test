export type TConversationContext = {
  conversation: TConversationState
  updateCurrentUser: (currentUser: string | null) => void
  updateConversationList: (conversationItem: TConversation) => void
} | null

export type TConversationState = {
  currentUser: string | null
  conversationList: TConversation[]
}

export type TConversation = { from: string; lastMessage: string | null; lastMessageDate: Date | null }
