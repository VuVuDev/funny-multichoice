import React from 'react'
import Topbar from '../components/Topbar'
import { useNavigate } from 'react-router'

function Result() {
    const navigate = useNavigate();
    const goToFinal = () => {
        navigate("/final")
    }
    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <div className='w-[960px] h-[520px] bg-[#ffffffc9] rounded-lg z-10'>
                <Topbar></Topbar>
                
                <div className='flex flex-col justify-center items-center'>
                    <div className='mt-[50px]'>
                         <h1 className='font-mono font-extrabold text-[40px]'>Match result🤩</h1>
                         <div className='flex flex-row mt-[10px] rounded-md border-2 border-slate-400 items-center bg-slate-300 cursor-pointer'>
                            <input type="text" placeholder='name' className='pl-2 outline-none rounded-md mr-2 py-1 px-4'/>
                            <p className='font-bold'>Search</p>
                         </div>
                    </div>
                    <div className='mt-[20px]'>
                        <table>
                            <tbody>
                                <tr>
                                    <th className='border-2 w-[160px] border-slate-400'>Player</th>
                                    <th className='border-2 w-[160px] border-slate-400'>Answer</th>
                                    <th className='border-2 w-[160px] border-slate-400'>Result</th>
                                    <th className='border-2 w-[160px] border-slate-400'>Score</th>
                                    <th className='border-2 w-[160px] border-slate-400'>Time</th>
                                </tr>
                                <tr>
                                    <td className='border-2  text-center border-slate-400'>Name</td>
                                    <td className='border-2  text-center border-slate-400'>Name</td>
                                    <td className='border-2  text-center border-slate-400'>Name</td>
                                    <td className='border-2  text-center border-slate-400'>Name</td>
                                    <td className='border-2  text-center border-slate-400'>Name</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='mt-[20px]'>
                        <button className='px-4 py-2 border-2 border-slate-400 rounded hover:bg-green-500 hover:text-white transition font-bold'
                        onClick={() => goToFinal()}
                        >Go Finally</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Result
