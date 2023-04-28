import { IoMdCloseCircle, IoMdRefreshCircle, IoMdHelpCircle } from "react-icons/io";



function Topbar() {
    const closeWindows = () => {
        if (confirm("Close Window?")) {
            close();
          }
    }
    return (
        <div className='border-b-2 border-slate-200 pb-2'>
            <h1 className='flex flex-row w-full justify-end pt-2 pr-2'>
                <IoMdHelpCircle className="text-green-500 cursor-pointer mr-1"></IoMdHelpCircle>
                <IoMdRefreshCircle className="text-yellow-500 cursor-pointer mr-1"></IoMdRefreshCircle>
                <IoMdCloseCircle className="text-red-500 cursor-pointer mr-1" onClick = {() => closeWindows()}></IoMdCloseCircle>
            </h1>
    </div>
    )
}

export default Topbar
