import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import useConversationContext from '../../hooks/useUserContext'
import { phoneNumberRegExp } from '../../utils/regexp'
import Button from '../ui/Button'
import Dialog from '../ui/Dialog'
import Input from '../ui/Input'

type Props = {
  isOpen: boolean
  closeModal: () => void
}

const schema = z.object({
  phoneNumber: z.string().regex(phoneNumberRegExp, { message: 'Wrong phone number' }),
})

type Form = z.infer<typeof schema>

const NewPersonDialog = ({ isOpen, closeModal }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({ resolver: zodResolver(schema) })
  const { updateConversationList } = useConversationContext()

  return (
    <Dialog title="Enter phone number" isOpen={isOpen} closeModal={closeModal}>
      <form
        className="flex flex-col gap-3"
        onSubmit={handleSubmit((data) => {
          updateConversationList({
            from: `${data.phoneNumber}@c.us`,
            lastMessage: null,
            lastMessageDate: null,
          })
          closeModal()
        })}
      >
        <Input placeholder="Phone number" id="phone number" {...register('phoneNumber')} error={errors.phoneNumber} />
        <div className="self-end">
          <Button onClick={closeModal} className="ml-3">
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Dialog>
  )
}

export default NewPersonDialog
