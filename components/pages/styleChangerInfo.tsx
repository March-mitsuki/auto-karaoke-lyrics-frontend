
const StyleChangerInfo = () => {
    return (
        <>
            <div className='flex rounded-lg bg-red-300 items-center px-3 py-1'>
                <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='2'>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
                <span className='pl-4'>构建css时请遵循csstype和json文件的规则</span>
                <a href='https://github.com/frenic/csstype' className='pl-4 underline'>具体请看这里</a>
            </div>
        </>
    )
}

export default StyleChangerInfo