import type { PropsData } from '@/interfaces/propsDataTypes'

const Layout = ({ children }: PropsData) => {
  return <div className='font-medium text-slate-00'>{children}</div>
}

export default Layout
