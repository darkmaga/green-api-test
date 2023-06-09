import { Dialog as HeadlessDialog, Transition } from '@headlessui/react'
import { Fragment, ReactNode } from 'react'

type Props = {
  isOpen: boolean
  closeModal: () => void
  title: string
  children: ReactNode
}

const Dialog = ({ isOpen, closeModal, title, children }: Props) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <HeadlessDialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <HeadlessDialog.Panel className="w-full flex flex-col gap-4 max-w-md transform overflow-hidden rounded-2xl bg-dialog-bg p-6 text-left align-middle shadow-xl transition-all">
                <HeadlessDialog.Title as="h3" className="text-lg font-medium leading-6 text-primary">
                  {title}
                </HeadlessDialog.Title>
                {children}
              </HeadlessDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </HeadlessDialog>
    </Transition>
  )
}

export default Dialog
