import ChatList from './ChatList'
import Conversation from './Converstation'

const Chat = () => {
  return (
    <div className="grid grid-cols-[500px,_1fr] h-full">
      <ChatList />
      <Conversation />
    </div>
  )
}

export default Chat
