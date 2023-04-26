import React, { useEffect ,useState } from 'react'
import Topbar from '../components/Topbar'
import { useNavigate } from 'react-router';
import { WaveSpinner } from "react-spinners-kit";


interface IPlayer {
    player: {
        id: number;
        name: string;
        status: string;
    }
}
interface ILable {
    lableAnswer: {
        key: string;
        answerKey: string;
        isCorrect: boolean;
    }
}
interface ITempArray {
    temp: {
        text:string;
        answers: ILable['lableAnswer'][];
    }
}


interface Ipros {
    loading: boolean;
    gameData: IPlayer['player'][];
    arrayTempOne: string[];
    arrayTempTwo: string[];
    setGameData: React.Dispatch<React.SetStateAction<IPlayer['player'][]>>;
    questions: ITempArray['temp'][];
    setAnswers: React.Dispatch<React.SetStateAction<string[]>>;
    answers: string[];
    setAnswersPlayerOne: React.Dispatch<React.SetStateAction<string[]>>;
    setAnswersPlayerTwo: React.Dispatch<React.SetStateAction<string[]>>;
}

function Matches({loading, gameData, questions, setAnswers, answers, setAnswersPlayerOne, setAnswersPlayerTwo}:Ipros) {
    const navigate = useNavigate();
    const gotoResult = () => {
        navigate("/result")
    }
    const [currentPlayer, setCurrentPlayer] = useState<number>(0);
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [countDown, setCountDown] = useState<number>(10)
    const [countDownQuestion, setCoutnDownQuestion] = useState<number>(2)

     useEffect(() => {
        const timer = setInterval(() => {
            if(loading==false) {
                setCountDown(countDown => countDown - 1);
            }
        },1000); 
        if(countDown == -1 || countDown < -1) {
            setCountDown(10);
            setCurrentPlayer(currentPlayer === 0 ? 1 : 0);
            setCurrentQuestion(currentQuestion => currentQuestion + 1);
        }
        if(currentQuestion === 5 && countDown == 0) {
            clearInterval(timer);
            gotoResult()
        }
        if(currentPlayer === 1 && countDown === -1 ) {
            setCoutnDownQuestion(countDownQuestion => countDownQuestion - 1);
        }
        return () => clearInterval(timer);
    })

    const handleSubmitAction = () => {
        if(currentQuestion === questions.length - 1 ) {
            gotoResult();
            handleSetPlayerChosen();
            return;
        } else {
            handleSubmit();
        }
    }
    const handleSubmit = () => {
        setCurrentPlayer(currentPlayer === 0 ? 1 : 0);
        setCurrentQuestion(currentQuestion => currentQuestion + 1);
        setCountDown(10);
        if(currentPlayer == 1) {
            setCoutnDownQuestion(countDownQuestion => countDownQuestion - 1);
        }
    }
    
    console.log(answers);
    const handleSubmitAnswer = (answerIndex: number, answerValue: string) => {  
        let newList = [...answers];
        if(answers[currentQuestion] === answerValue) {
            newList[currentQuestion] = "empty";
            setAnswers(newList);
        } else {
            newList[currentQuestion] = answerValue;
            setAnswers(newList);
        }
    }

    const handleSetPlayerChosen = () => {
        let tempA:string[] = [];
        let tempB:string[] = [];
        for( let i = 0; i < answers.length; i++ ) {
            if(i%2 === 0) {
                tempA.push(answers[i]);
            } else {
                tempB.push(answers[i]);
            }
        }
        setAnswersPlayerOne(tempA);
        setAnswersPlayerTwo(tempB);
    }

    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <div className='w-[960px] h-[520px] bg-[#ffffffc9] rounded-lg z-10'>
                <Topbar></Topbar>

                {/* load */}
                <div className={`${loading ? "" : "hidden"}`}>
                    <div className='flex flex-col justify-center items-center mt-[50px]'>
                        <h1 className='font-mono text-[50px] font-extrabold mb-[50px]'>MATCH 1</h1>
                        <div className='flex flex-col items-center justify-center'>
                            <WaveSpinner size={60} color="#686769"/>
                            <p className='font-bold mt-[20px] text-[24px]'>Loading...</p>
                        </div>
                    </div>
                </div>

                <div className={`${loading ? "hidden" : ""}`}>
                    <div className='p-[20px] w-full'>
                        <div className='flex flex-col border-b-2 pb-[20px] border-slate-300'>
                            <div className='flex justify-center items-center'>
                                <h1 className='font-bold mt-[10px] text-[24px]'>{gameData[currentPlayer]?.name}'s Turn</h1>
                            </div>
                            <div className='flex flex-row-reverse justify-between items-center'>
                                <h3>{countDownQuestion} question left</h3>
                                <div className='w-[45px] h-[45px] rounded-[50%] border-2 flex items-center justify-center font-bold border-slate-400'>
                                    <span>{countDown}</span>
                                </div>
                            </div>
                        </div>

                        <div>

                            <div className='flex items-center justify-center'>
                                <p className='mt-[10px] font-bold' dangerouslySetInnerHTML={{__html: questions[currentQuestion]?.text}}></p>
                            </div>
                            <div className=''>
                                <div className='flex flex-wrap gap-10 justify-center items-center mt-[40px]'>
                                {
                                    questions[currentQuestion]?.answers.map((value:ILable['lableAnswer'], index:number) => (
                                        <div key={index} className={`flex flex-row items-center justify-center p-2 rounded-md border-2 border-slate-400 cursor-pointer ${String.fromCharCode(65 + index) === answers[currentQuestion] ? "bg-green-200" : ""}`}
                                            onClick={() => handleSubmitAnswer(index, String.fromCharCode(65 + index))}
                                        >
                                            <div className='w-[20px] h-[20px] border-2 border-slate-400 rounded-[50%] flex justify-center items-center'>{String.fromCharCode(65 + index)}</div>
                                            <div className='w-[320px] ml-2'><p dangerouslySetInnerHTML={{__html: value.answerKey}}></p></div>
                                        </div>
                                    ))
                                }
                                </div>
                            </div>
                            <div className='flex justify-center items-center'>
                                <button className='font-bold px-4 py-2 border-2 border-slate-400 rounded-md mt-[50px] hover:bg-green-400 hover:text-white transition'
                                onClick={() => handleSubmitAction()}
                                >Submit</button>
                            </div>
                        </div>
                    </div>
                   
                </div>
            </div>
        </div>
    )
}

export default Matches
