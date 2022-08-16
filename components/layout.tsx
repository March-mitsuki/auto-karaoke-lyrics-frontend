import type { Props } from '@/interfaces/propsDataTypes';

const Layout = ({ children }: Props) => {
    return (
        <div className='font-medium text-slate-00'>
            { children }
        </div>
    );
}

export default Layout;