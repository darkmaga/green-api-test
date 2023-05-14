import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Button from '../ui/Button'
import Dialog from '../ui/Dialog'
import Input from '../ui/Input'

type Props = {
  setIsUserExist: () => void
}

const schema = z
  .object({
    idInstance: z.string().min(1, { message: 'IdInstance is required' }),
    apiTokenInstance: z.string().min(1, { message: 'ApiTokenInstance is required' }),
  })
  .required()

type Form = z.infer<typeof schema>

const ProfileSettingsDialog = ({ setIsUserExist }: Props) => {
  const [isOpen, setIsOpen] = useState(
    !(sessionStorage.getItem('idInstance') || sessionStorage.getItem('apiTokenInstance'))
  )

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm<Form>({ resolver: zodResolver(schema), reValidateMode: 'onChange' })

  const closeModal = () => {
    try {
      schema.parse(getValues())
      setIsOpen(false)
    } catch (error) {
      if (!(error instanceof z.ZodError)) return

      const { fieldErrors } = error.flatten<keyof Form>()

      ;(Object.keys(fieldErrors) as (keyof Form)[]).forEach((key) => {
        setError(key, { type: 'custom', message: fieldErrors[key]?.[0] })
      })
    }
  }

  return (
    <Dialog isOpen={isOpen} closeModal={closeModal} title="Please, insert ur data">
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit((data) => {
          sessionStorage.setItem('idInstance', data.idInstance)
          sessionStorage.setItem('apiTokenInstance', data.apiTokenInstance)

          setIsOpen(false)
          setIsUserExist()
        })}
      >
        <Input id="IdInstance" placeholder="IdInstance" {...register('idInstance')} error={errors.idInstance} />
        <Input
          id="ApiTokenInstance"
          placeholder="ApiTokenInstance"
          {...register('apiTokenInstance')}
          error={errors.apiTokenInstance}
        />
        <div className="self-end">
          <Button type="submit" className="ml-3">
            Save
          </Button>
        </div>
      </form>
    </Dialog>
  )
}

export default ProfileSettingsDialog
