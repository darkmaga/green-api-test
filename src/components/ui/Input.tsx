import clsx from 'clsx'
import { InputHTMLAttributes, forwardRef } from 'react'
import type { FieldError } from 'react-hook-form'

type Props = {
  placeholder: string
  id: string
  error?: FieldError
  className?: string
  fullWidth?: boolean
} & InputHTMLAttributes<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, Props>(({ placeholder, error, id, className, fullWidth, ...rest }, ref) => {
  return (
    <fieldset className={clsx(fullWidth && 'w-full')}>
      <input
        placeholder={placeholder}
        ref={ref}
        className={clsx(
          'min-h-[40px] w-full rounded-md px-4 bg-secondary-light text-primary outline-none',
          className && className
        )}
        {...rest}
      />
      {error && (
        <label htmlFor={id} className="text-error">
          {error.message}
        </label>
      )}
    </fieldset>
  )
})

export default Input
