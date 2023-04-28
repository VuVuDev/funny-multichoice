import Topbar from '../components/Topbar'
import { useNavigate } from 'react-router'
import { useState } from 'react';


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
    setFinal: React.Dispatch<React.SetStateAction<string>>;
    setGameData: React.Dispatch<React.SetStateAction<IPlayer['player'][]>>
    matchCount: number;
}
function Result({gameData, setFinal, matchCount}:IPros) {
    const navigate = useNavigate();
    const [search, setSearch] = useState<boolean>(false);
    const [searchInput, setSearchInput] = useState<string>('')
    const [searchList, setSearchList] = useState<IPlayer['player'][]>([]);

    const goToFinal = () => {
        navigate("/final")
        gameData.map((value:IPlayer['player']) => {
            value.match.map((item:IMatch['match']) => {
                if(item.status === "Winner") {
                    setFinal(value.name);
                }
                if (item.status === "Draw") {
                    setFinal("This game is draw!")
                }
            })
        } )
    }

    const handleOnChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
        if(searchInput == '' || searchInput.trimEnd() == '') {
            setSearch(false);
        }
    }
    const handlSearch = () => {
        setSearch(true);
        let newGameData = gameData.filter((value:IPlayer['player']) => {
            return value.name.toLowerCase().includes(searchInput.toLowerCase());
        })
        setSearchList([...newGameData]);
    }
    console.log(matchCount);
    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <div className='w-[960px] h-[520px] bg-[#ffffffc9] rounded-lg z-10'>
                <Topbar></Topbar>
                
                <div className='flex flex-col justify-center items-center'>
                    <div className='mt-[50px]'>
                         <h1 className='font-mono font-extrabold text-[40px]'>Match {matchCount} result🤩</h1>
                         <div className='flex flex-row mt-[10px] rounded-md border-2 border-slate-400 items-center bg-slate-300 cursor-pointer'>
                            <input type="text" placeholder='name' value={searchInput} className='pl-2 outline-none rounded-md mr-2 py-1 px-4' onChange={(e) => handleOnChangeSearch(e)}/>
                            <p className='font-bold' onClick={() => handlSearch()}>Search</p>
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
                                {
                                    gameData.map((value:IPlayer['player'], index: number) => {
                                        return (
                                            <tr key={index} className={`${search ? "hidden" : ""}`}>
                                                <td className='border-2  text-center border-slate-400'>{value.name}</td>
                                                <td className='border-2  text-center border-slate-400'>{
                                                    value.match.map((item:IMatch['match'], index: number) => {
                                                        if(matchCount == 1 && item.matchId == 0) {
                                                            return (
                                                                <div key={index}>{item.playerChoice.map((stuff: string, index:number) => {
                                                                    return (
                                                                        <span key={index}>{index < 2 ? stuff + ", " : stuff}</span>
                                                                    )
                                                                })}</div>
                                                            )
                                                        } else if (matchCount == 2 && item.matchId == 1) {
                                                            return (
                                                                <div key={index}>{item.playerChoice.map((stuff: string, index:number) => {
                                                                    return (
                                                                        <span key={index}>{index < 2 ? stuff + ", " : stuff}</span>
                                                                    )
                                                                })}</div>
                                                            )
                                                        }
                                                    })
                                                }</td>
                                                <td className='border-2  text-center border-slate-400'>{
                                                    value.match.map((item:IMatch['match'], index: number) => {
                                                        if(matchCount == 1 && item.matchId == 0) {
                                                            return (
                                                                <div key={index}>{item.correctResult.map((stuff: string, index:number) => {
                                                                    return (
                                                                        <span key={index}>{index < 2 ? stuff + ", " : stuff}</span>
                                                                    )
                                                                })}</div>
                                                            )
                                                        } else if (matchCount == 2 && item.matchId == 1) {
                                                            return (
                                                                <div key={index}>{item.correctResult.map((stuff: string, index:number) => {
                                                                    return (
                                                                        <span key={index}>{index < 2 ? stuff + ", " : stuff}</span>
                                                                    )
                                                                })}</div>
                                                            )
                                                        }
                                                    })
                                                }</td>
                                                <td className='border-2  text-center border-slate-400'>{
                                                     value.match.map((item:IMatch['match'], index:number) => {
                                                        if(matchCount == 1 && item.matchId == 0) {
                                                            return (
                                                                <span key={index}>{item.score}</span>
                                                            )
                                                        } else if (matchCount == 2 && item.matchId == 1) {
                                                            return (
                                                                <span key={index}>{item.score}</span>
                                                            )
                                                        }
                                                     })
                                                }</td>
                                                <td className='border-2  text-center border-slate-400'>{
                                                    value.match.map((item:IMatch['match'], index:number) => {
                                                        if(matchCount == 1 && item.matchId == 0) {
                                                            return (
                                                                <span key={index}>{item.time}</span>
                                                            )
                                                        } else if(matchCount == 2 && item.matchId == 1) {
                                                            return (
                                                                <span key={index}>{item.time}</span>
                                                            )
                                                        }
                                                     })
                                                }</td>
                                            </tr>
                                        )
                                    })
                                }

                            {
                                    searchList.map((value:IPlayer['player'], index: number) => {
                                        return (
                                            <tr key={index} className={`${search ? "" : "hidden"}`}>
                                                <td className='border-2  text-center border-slate-400'>{value.name}</td>
                                                <td className='border-2  text-center border-slate-400'>{
                                                   value.match.map((item:IMatch['match'], index: number) => {
                                                        if(matchCount == 1 && item.matchId == 0) {
                                                            return (
                                                                <div key={index}>{item.playerChoice.map((stuff: string, index:number) => {
                                                                    return (
                                                                        <span key={index}>{index < 2 ? stuff + ", " : stuff}</span>
                                                                    )
                                                                })}</div>
                                                            )
                                                        } else if (matchCount == 2 && item.matchId == 1) {
                                                            return (
                                                                <div key={index}>{item.playerChoice.map((stuff: string, index:number) => {
                                                                    return (
                                                                        <span key={index}>{index < 2 ? stuff + ", " : stuff}</span>
                                                                    )
                                                                })}</div>
                                                            )
                                                        }
                                                    })
                                                }</td>
                                                <td className='border-2  text-center border-slate-400'>{
                                                   value.match.map((item:IMatch['match'], index: number) => {
                                                        if(matchCount == 1 && item.matchId == 0) {
                                                            return (
                                                                <div key={index}>{item.correctResult.map((stuff: string, index:number) => {
                                                                    return (
                                                                        <span key={index}>{index < 2 ? stuff + ", " : stuff}</span>
                                                                    )
                                                                })}</div>
                                                            )
                                                        } else if (matchCount == 2 && item.matchId == 1) {
                                                            return (
                                                                <div key={index}>{item.correctResult.map((stuff: string, index:number) => {
                                                                    return (
                                                                        <span key={index}>{index < 2 ? stuff + ", " : stuff}</span>
                                                                    )
                                                                })}</div>
                                                            )
                                                        }
                                                    })
                                                }</td>
                                                <td className='border-2  text-center border-slate-400'>{
                                                     value.match.map((item:IMatch['match'], index:number) => {
                                                        if(matchCount == 1 && item.matchId == 0) {
                                                            return (
                                                                <span key={index}>{item.score}</span>
                                                            )
                                                        } else if (matchCount == 2 && item.matchId == 1) {
                                                            return (
                                                                <span key={index}>{item.score}</span>
                                                            )
                                                        }
                                                     })
                                                }</td>
                                                <td className='border-2  text-center border-slate-400'>{
                                                    value.match.map((item:IMatch['match'], index:number) => {
                                                        if(matchCount == 1 && item.matchId == 0) {
                                                            return (
                                                                <span key={index}>{item.time}</span>
                                                            )
                                                        } else if(matchCount == 2 && item.matchId == 1) {
                                                            return (
                                                                <span key={index}>{item.time}</span>
                                                            )
                                                        }
                                                     })
                                                }</td>
                                            </tr>
                                        )
                                    })
                                }
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
