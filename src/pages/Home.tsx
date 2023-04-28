import React from 'react'
import { useNavigate } from 'react-router';
import Topbar from '../components/Topbar';


interface IMatch {
    match: {
      matchId: number;
      playerChoice: string[];
      correctResult: string[];
      time: number;
      score:number;
      status: string;
    }
  }
  
  interface IPlayer {
    player: {
      id: number;
      name: string;
      match: IMatch['match'][];
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
            <div className='w-[960px] sm:h-[520px] h-[720px] bg-[#ffffffc9] rounded-lg z-10 m-3'>
               <Topbar></Topbar>
                <div className='flex flex-col justify-center items-center sm:mt-[100px] mt-[160px] text-center px-2 '>
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
