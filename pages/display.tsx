import dynamic from "next/dynamic";
const SocketDisplay = dynamic(() => import('../components/pages/socketDisplay'), {ssr: false})

const Display = () => {
    return (
        <>
            <SocketDisplay />
        </>
    )
}

export default Display