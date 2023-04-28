import { useNavigate } from 'react-router';
import Topbar from '../components/Topbar'
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
interface IPros {
    gameData: IPlayer['player'][];
    final: string;
    setGameData: React.Dispatch<React.SetStateAction<IPlayer['player'][]>>;
    setMatchCount: React.Dispatch<React.SetStateAction<number>>;
    setAnswers: React.Dispatch<React.SetStateAction<string[]>>;
    matchCount: number;
    fectData: () => void;
}

function Final({gameData, final, setGameData, setMatchCount, matchCount, fectData, setAnswers}:IPros) {
    const navigate = useNavigate();

    const gotoMatch = () => {
      navigate("/matches");
      setMatchCount(2);
      handlePlayMatchTwo();
      fectData();
      setAnswers(Array.from({length: 6} , () => "empty"));
    }
    const gotoHome = () => {
      navigate("/");
    }
    const handlePlayMatchTwo = () => {
        const newGameData = gameData.map((value: IPlayer['player']) => {
          value.match = 
          [
            ...value.match,
            {
              matchId: 1,
              correctResult: [],
              playerChoice: [],
              score: 0,
              status: '',
              time: 0,
            }
          ]
          return {
            ...value
          }
        })
        setGameData(newGameData);
    }
    
    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <div className='w-[960px] h-[520px] bg-[#ffffffc9] rounded-lg z-10'>
               <Topbar></Topbar>
               <div>
                    <div className='flex flex-col justify-center items-center mt-[100px]'>
                        <h1 className='font-mono font-extrabold text-[50px]'> MATCH {matchCount}</h1>
                        <h1 className='font-mono font-extrabold text-[40px]'>{final.trimEnd() !== "This game is drawn!" ? <div className='flex flex-col justify-center items-center'>WINER: <span className='font-mono'>{final} 🥳</span></div> : ""}</h1>
                    </div>
                    <div className={`${matchCount == 2 ? "hidden" : ""} flex justify-center items-center mt-[50px]`}>
                        <button className='px-4 py-2 border-2 border-slate-400 rounded-md font-bold hover:bg-green-500 hover:text-white transition' onClick={() => gotoMatch()}>Play Match 2</button>
                    </div>
                    <div className={`${matchCount == 2 ? "" : "hidden"} flex justify-center items-center mt-[50px]`}>
                        <button className='px-4 py-2 border-2 border-slate-400 rounded-md font-bold hover:bg-green-500 hover:text-white transition' onClick={() => gotoHome()}>Go Home</button>
                    </div>
               </div>
            </div>
        </div>
    )
}

export default Final
