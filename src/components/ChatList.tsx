import { PlusIcon, UserIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import { useState } from 'react'
import { TConversation } from '../core/ContextTypes'
import useConversationContext from '../hooks/useUserContext'
import NewPersonDialog from './dialogs/NewPersonDialog'

const DialogPerson = ({ from, lastMessage, lastMessageDate }: TConversation) => {
  const { updateCurrentUser, conversation } = useConversationContext()

  return (
    <button
      className={clsx(
        'p-4 w-full grid grid-cols-[auto,1fr,auto] gap-3 items-center cursor-pointer hover:bg-secondary-light',
        conversation.currentUser === from && 'bg-secondary-light'
      )}
      onClick={() => updateCurrentUser(from)}
    >
      <span className="w-10 bg-gray-400 rounded-full">
        <UserIcon className="fill-white flex justify-center align-center" />
      </span>
      <div className="flex flex-col gap-2 justify-self-start text-start">
        <span>{from}</span>
        <span>{lastMessage}</span>
      </div>
      {lastMessageDate && (
        <div className="justify-self-end">
          {lastMessageDate?.getHours() < 9 ? `0${lastMessageDate.getHours()}` : lastMessageDate.getHours()}:
          {lastMessageDate?.getMinutes() < 9 ? `0${lastMessageDate.getMinutes()}` : lastMessageDate.getMinutes()}
        </div>
      )}
    </button>
  )
}

const AddNewDialogPerson = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        className="sticky w-fit cursor-pointer hover:bg-secondary-light top-full left-1/2 -translate-x-1/2 flex items-center gap-3 px-3 py-2 bg-dialog-bg rounded-full"
        onClick={() => setIsOpen(true)}
      >
        <span>
          <PlusIcon className="w-6 h-6" />
        </span>
        Create new dialog
      </button>
      <NewPersonDialog isOpen={isOpen} closeModal={() => setIsOpen(false)} />
    </>
  )
}

const ChatList = () => {
  const { conversation } = useConversationContext()

  return (
    <div className="h-full relative overflow-auto">
      {conversation.conversationList.map((c) => (
        <DialogPerson key={c.from} {...c} />
      ))}
      <AddNewDialogPerson />
    </div>
  )
}

export default ChatList
