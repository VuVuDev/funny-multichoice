
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
    gameData: IPlayer['player'][];
    matchCount: number;
    search: boolean;
    searchList: IPlayer['player'][];
}   

function ResultTable({gameData, matchCount, search, searchList}:Ipros) {
    return (
        <div className='mt-[20px] sm:m-0 m-1'>
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
    )
}

export default ResultTable
