import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import useKeyPress from '../hooks/useKeyPress'
import useConversationContext from '../hooks/useUserContext'
import MessageApi, { MessageUrl } from '../services/MessageApi'
import Input from './ui/Input'

type TMessage = {
  from: string | null
  lastMessage: string
  lastMessageDate: Date
}

const Message = ({ from, lastMessage, lastMessageDate }: TMessage) => {
  return (
    <div className={clsx('w-fit px-2 py-1 rounded flex gap-1', !from ? 'self-end bg-[#005c4b]' : 'bg-[#202C33]')}>
      <span>{lastMessage}</span>
      {lastMessageDate && (
        <span className="text-xs self-end">
          {lastMessageDate?.getHours() < 9 ? `0${lastMessageDate.getHours()}` : lastMessageDate.getHours()}:
          {lastMessageDate?.getMinutes() < 9 ? `0${lastMessageDate.getMinutes()}` : lastMessageDate.getMinutes()}
        </span>
      )}
    </div>
  )
}

const Conversation = () => {
  const [inputState, setInputState] = useState('')
  const { conversation, updateConversationList } = useConversationContext()

  const [messages, setMessages] = useState<TMessage[]>([])

  const { trigger: deleteMessages } = useSWRMutation<void, any, MessageUrl.deleteNotification, string>(
    MessageUrl.deleteNotification,
    (_, arg) => MessageApi.deleteNotification(arg)
  )
  const { trigger: sendMessage } = useSWRMutation<
    void,
    any,
    MessageUrl.sendMessage,
    { message: string; chatId: string }
  >(MessageUrl.sendMessage, (_, arg) => MessageApi.sendMessage(arg))

  useSWR(MessageUrl.receiveMessage, MessageApi.getMessages, {
    refreshInterval: 5000,
    onSuccess: ({ data: message }) => {
      if (!message) return

      if (
        message.body.typeWebhook === 'incomingMessageReceived' &&
        message.body.messageData.typeMessage === 'textMessage'
      ) {
        const conversationItem = {
          from: message.body.senderData.sender,
          lastMessage: message.body.messageData.textMessageData.textMessage,
          lastMessageDate: new Date(message.body.timestamp * 1000),
        }

        updateConversationList(conversationItem)
        setMessages((prev) => [...prev, conversationItem])
      }

      deleteMessages(String(message.receiptId))
    },
  })

  const onSendMessage = () => {
    sendMessage({ message: inputState, chatId: conversation.currentUser ?? '' })
    setMessages((prev) => [...prev, { from: null, lastMessageDate: new Date(), lastMessage: inputState }])
    setInputState('')
  }

  useKeyPress('enter', onSendMessage)

  useEffect(() => {
    setMessages(() => {
      const result = []
      const existedDialog = conversation.conversationList.find((c) => c.from === conversation.currentUser)

      if (existedDialog && existedDialog.lastMessage && existedDialog.lastMessageDate) {
        result.push(existedDialog as TMessage)
      }

      return result
    })

    return () => {
      setMessages([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversation.currentUser])

  return (
    <div className="h-full border-l-2 border-dialog-bg">
      {conversation.currentUser ? (
        <div className="h-full relative">
          <div className="bg-bg-image top-0 left-0 absolute h-full w-full brightness-[0.2]" />
          <div className="z-10 h-full relative flex flex-col">
            <div className="flex-1 px-10 py-4 flex gap-3 flex-col [&>*:first-child]:mt-auto overflow-auto max-h-[calc(100vh-96px)]">
              {messages.map((message) => (
                <Message {...message} key={message.from + message.lastMessage} />
              ))}
            </div>
            <div className="p-3 bg-[#202C33] flex items-center gap-3">
              <Input
                placeholder="Enter your message"
                id="message input"
                fullWidth
                value={inputState}
                onChange={(e) => setInputState(e.target.value)}
              />
              <PaperAirplaneIcon className="w-6 h-6" onClick={onSendMessage} />
            </div>
          </div>
        </div>
      ) : (
        <div className="h-full flex justify-center items-center">You didn`t choose any dialog</div>
      )}
    </div>
  )
}

export default Conversation
