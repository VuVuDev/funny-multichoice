import React from 'react'
import Topbar from '../components/Topbar'

function Final() {
    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <div className='w-[960px] h-[520px] bg-[#ffffffc9] rounded-lg z-10'>
               <Topbar></Topbar>
               <div>
                    <div className='flex flex-col justify-center items-center mt-[100px]'>
                        <h1 className='font-mono font-extrabold text-[50px]'>MATCH 1</h1>
                        <h1 className='font-mono font-extrabold text-[50px]'>WINER: <span className='font-mono'>Name 🥳</span></h1>
                    </div>
                    <div className='flex justify-center items-center mt-[50px]'>
                        <button className='px-4 py-2 border-2 border-slate-400 rounded-md font-bold hover:bg-green-500 hover:text-white transition'>Play Match 2</button>
                    </div>
               </div>
            </div>
        </div>
    )
}

export default Final
