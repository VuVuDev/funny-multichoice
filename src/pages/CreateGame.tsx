import React, {useRef} from 'react'
import { useNavigate } from 'react-router'
import Topbar from '../components/Topbar'
import axios from 'axios';


interface IPlayer {
    player: {
        id: number;
        name: string;
        status: string
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

interface IPros {
    setGameData: React.Dispatch<React.SetStateAction<IPlayer['player'][]>>;
    gameData: IPlayer['player'][];
    setPlayerOne: React.Dispatch<React.SetStateAction<IPlayer['player']>>;
    setPlayerTwo: React.Dispatch<React.SetStateAction<IPlayer['player']>>;
    playerOne: IPlayer['player'];
    playerTwo: IPlayer['player'];
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    tempArray: ITempArray['temp'][];
    arrayTempOne: string[];
    arrayTempTwo: string[];
    setArrayTempOne: React.Dispatch<React.SetStateAction<string[]>>;
    setArrayTempTwo: React.Dispatch<React.SetStateAction<string[]>>;
    setTempArray: React.Dispatch<React.SetStateAction<ITempArray['temp'][]>>;
    setQuestions: React.Dispatch<React.SetStateAction<ITempArray['temp'][]>>;
    questions: ITempArray['temp'][];
    setAnswers: React.Dispatch<React.SetStateAction<string[]>>;

}

function CreateGame({setGameData, setPlayerOne, setAnswers,setPlayerTwo, playerOne, playerTwo, gameData, setLoading, tempArray, setQuestions, setTempArray, setArrayTempOne, setArrayTempTwo}:IPros) {
    const navigate = useNavigate();
    const inputRefOne = useRef<HTMLInputElement>(null);
    const inputRefTwo = useRef<HTMLInputElement>(null);

    const goToMatches = () => {
        navigate("/matches")
    }
    const handleOnChangeSetPlayerOne = (event: React.ChangeEvent<HTMLInputElement>):void => {
        setPlayerOne({
            id:1,
            name: event.target.value,
            status: ''
        })
    }
    const handleOnChangeSetPlayerTwo = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setPlayerTwo({
            id:2,
            name: event.target.value,
            status: ''
        })
    }
    const handleSubmit = () => {
        setGameData([
            ...gameData,
            playerOne,
            playerTwo,
        ])
        goToMatches();
        fetchData();
        setAnswers(Array.from({length: 6} , () => "empty"));
    }
    const handleSubmitCheck = () => {
        if(playerOne.name === '' || playerOne.name.trimEnd() === "") {
            alert("Input cant empty!");
            inputRefOne.current?.focus();
            return;
        };
        if(playerTwo.name === '' || playerTwo.name.trimEnd() === "") {
            alert("Input cant empty!");
            inputRefTwo.current?.focus();
            return;
        }
        const pattern = /[!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?]/;
        if(pattern.test(playerOne.name)) {
          alert("Name does not contain special character!");
          setPlayerOne({
            ...playerOne,
            name: "",
          })
          inputRefOne.current?.focus();
          return;
        }
        if(/\d+/.test(playerOne.name)) {
          alert("Name does not contain number!");
          setPlayerOne({
            ...playerOne,
            name: "",
          });
          inputRefOne.current?.focus();
          return;
        }
        if(pattern.test(playerTwo.name)) {
            alert("Name does not contain special character!");
            setPlayerTwo({
                ...playerTwo,
                name: "",
              })
              inputRefTwo.current?.focus();
            return;
          }
        if(/\d+/.test(playerTwo.name)) {
            alert("Name does not contain number!");
            setPlayerTwo({
                ...playerTwo,
                name: "",
              })
              inputRefTwo.current?.focus();
            return;
        }
        if(playerOne.name.split("").length > 15) {
            alert("Player name too long!");
            setPlayerOne({
                ...playerOne,
                name: ""
            });
            inputRefOne.current?.focus();
            return;
        }
        if(playerTwo.name.split("").length > 15) {
            alert("Player name too long!");
            setPlayerTwo({
                ...playerTwo,
                name: ""
            });
            inputRefTwo.current?.focus();
            return;
        }
        handleSubmit();
    }
    const handleOnKeyDownSetGameData = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === "Enter") {
            handleSubmitCheck();
        }
    }


    const fetchData = async () => {
        setLoading(true);
        try {
            const responses = await Promise.all(
                Array.from({length: 6}, () => axios.get("https://opentdb.com/api.php?amount=1&type=multiple"))
            )
            const data = responses.map((responses => responses.data.results));
            handleSetQuestion(data);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }

    const shuffle = (array:any) => {

        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
        return array;
    }
    const getAnswerLable = (index: number) => {
        return String.fromCharCode(65 + index);
    }
    const handleSetQuestion = (data:any) => {
         let setQuestionList = data.map((value:any) => {
            return value.map((item:any) => {
                let shuffleAnswer = shuffle([...item.incorrect_answers, item.correct_answer]);
                let correctAnswerIndex = shuffleAnswer.indexOf(item.correct_answer);
                const lableAnswers = shuffleAnswer.map((answer:string, index:number) => ({
                    key: getAnswerLable(index),
                    answerKey: answer,
                    isCorrect: index === correctAnswerIndex,
                }));

                return {
                    text: item.question,
                    answers: lableAnswers,
                }
            })
        }) 
        tempArray = setQuestionList;
        setTempArray(setQuestionList);
        setArrayTempOne([]);
        setArrayTempTwo([]);
        let questionCorrectTemp: string[] = [];
        tempArray.map((value:any) => {
            value.map((item:ITempArray['temp']) => {
                // console.log(item);  
                item.answers.map((stuff: ILable['lableAnswer']) => {
                    if(stuff.isCorrect == true) {
                        questionCorrectTemp.push(stuff.key);
                    }
                })
            })
        })
        let temQuestions: ITempArray['temp'][] = [];
        tempArray.map((value:any) => {
            value.map((item:ITempArray['temp']) => {
                temQuestions.push(item);
            })
        })
        setQuestions(temQuestions);
        temQuestions = [];
        // conso    le.log(questionCorrectTemp);    
        let tempA:string[] = [];
        let tempB:string[] = [];
        
        for(let i = 0; i < questionCorrectTemp.length; i++) {
            if(i%2 === 0) {
                tempA.push(questionCorrectTemp[i]);
            } else {
                tempB.push(questionCorrectTemp[i]);
            }
        }
        setArrayTempOne(tempA);
        setArrayTempTwo(tempB);
        questionCorrectTemp = [];
    }
    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <div className='w-[960px] h-[520px] bg-[#ffffffc9] rounded-lg z-10'>
                <Topbar></Topbar>
                <div className='flex flex-col justify-center items-center mt-[50px]'>
                    <h1 className='font-mono font-extrabold text-[50px]'>Create Game😤</h1>
                </div>
                <div className='flex flex-col items-center justify-center mt-[25px] p-[20px]'>
                    <div className='flex flex-row mb-[30px] p-2 border-2 border-slate-400 rounded-md'>
                        <h3 className='mr-2'>Player 1:</h3>
                        <input type="text" placeholder='name' ref={inputRefOne} value={playerOne?.name} className='outline-none border-2 rounded-md px-2'
                            onChange={(e) => handleOnChangeSetPlayerOne(e)}
                            onKeyDown={(e) => handleOnKeyDownSetGameData(e)}
                        />
                    </div>
                    <div className='flex flex-row p-2 border-2 border-slate-400 rounded-md'>
                        <h3 className='mr-2'>Player 2:</h3>
                        <input type="text" placeholder='name' ref={inputRefTwo} value={playerTwo.name} className='outline-none border-2 rounded-md px-2'
                            onChange={(e) => handleOnChangeSetPlayerTwo(e)}
                            onKeyDown={(e) => handleOnKeyDownSetGameData(e)}
                        />
                    </div>
                    <div>
                        <button className='px-6 p-2 mt-[25px] border-2 border-slate-300 rounded-md hover:bg-green-500 hover:text-white font-bold transition '
                        onClick={() => handleSubmitCheck()}
                        >Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateGame
