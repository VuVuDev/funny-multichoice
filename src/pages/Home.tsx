import React from 'react'
import { useNavigate } from 'react-router';
import Topbar from '../components/Topbar';



interface IPlayer {
    player: {
        id: number;
        name: string;
        status: string;
    }
}

interface Ipros {
    setGameData: React.Dispatch<React.SetStateAction<IPlayer['player'][]>>
    setAnswers: React.Dispatch<React.SetStateAction<string[]>>;
}

function Home({setGameData, setAnswers}:Ipros) {
    const navigate = useNavigate();
    const goToCreate = () => {
        navigate("/create-game");
        setGameData([]);
        setAnswers(Array.from({length: 6} , () => "empty"));    
    }
    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <div className='w-[960px] h-[520px] bg-[#ffffffc9] rounded-lg z-10'>
               <Topbar></Topbar>
                <div className='flex flex-col justify-center items-center mt-[100px]'>
                    <h1 className='font-mono font-extrabold text-[50px]'>Funny Multichoice🐸 </h1>
                    <div className='mt-[20px]'>
                        <button className='px-4 py-2 hover:bg-green-400 hover:text-white transition border-2 border-slate-400 rounded-md font-bold'
                        onClick={() => goToCreate()}
                        >Start Game</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
