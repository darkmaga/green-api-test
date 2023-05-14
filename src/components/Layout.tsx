import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className="bg-secondary min-h-screen h-screen min-w-screen w-screen">
      <div className="max-w-[1440px] mx-auto text-primary py-4 h-full">{children}</div>
    </div>
  )
}

export default Layout
