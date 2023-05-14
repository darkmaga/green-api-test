import clsx from 'clsx'
import { ButtonHTMLAttributes } from 'react'

type Props = {
  children: string
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({ children, className, type = 'button', disabled, ...rest }: Props) => {
  return (
    <button
      type={type}
      className={clsx('px-2 py-3 ', disabled ? 'text-disabled cursor-not-allowed' : 'text-primary', className)}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
