import { useState, useEffect } from 'react'
import {Routes, Route} from "react-router-dom"
import axios from 'axios'

import './App.css'
import Home from './pages/Home'
import Result from './pages/Result'
import Matches from './pages/Matches'
import CreateGame from './pages/CreateGame'
import Particel from './components/Particle'
import History from './pages/History'
import Final from './pages/Final'


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

function App() {
  const [playerOne, setPlayerOne] = useState<IPlayer['player']>({ 
    id: 1, 
    name: '', 
    match: [{
      matchId: 0,
      playerChoice: [],
      correctResult: [],
      time: 0,
      score: 0,
      status: '',
    }]
  });
  const [playerTwo, setPlayerTwo] = useState<IPlayer['player']>({ 
    id: 2, 
    name: '', 
    match: [{
      matchId: 0,
      playerChoice: [],
      correctResult: [],
      time: 0,
      score: 0,
      status: '',
    }]
  });
  const [gameData, setGameData] = useState<IPlayer['player'][]>([]);
  const [loading, setLoading] = useState<boolean>(false);  
  let [tempArray, setTempArray] = useState<any>([{
    text:'',
    answers:[],
  }])
  const [arrayTempOne, setArrayTempOne] = useState<string[]>([]);
  const [arrayTempTwo, setArrayTempTwo] = useState<string[]>([]);
  const [questions, setQuestions] = useState<ITempArray['temp'][]>([]);
  const [answers, setAnswers] = useState<string[]>(Array.from({length: 6} , () => "empty"));
  const [final, setFinal]  = useState<string>('');
  const [matchCount, setMatchCount] = useState<number>(0); 
  console.log(matchCount);
  console.log(tempArray);
  
  //processing data 
  
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
    tempArray?.map((value:any) => {
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
    console.log(tempA);
    console.log(tempB);
}


  useEffect(() => {
    const storedData = localStorage.getItem("gameData");
    if (storedData) {
      setGameData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("gameData", JSON.stringify(gameData));
  }, [gameData]);

  useEffect(() => {
    const storeAnswerPlayerOne = localStorage.getItem("arrayTempOne");
    if(storeAnswerPlayerOne) {
      setArrayTempOne(JSON.parse(storeAnswerPlayerOne));
    }
  }, [])
  useEffect(() => {
    localStorage.setItem("arrayTempOne", JSON.stringify(arrayTempOne));
  }, [arrayTempOne])

  useEffect(() => {
    const storeAnswerPlayerTwo = localStorage.getItem("arrayTempTwo");
    if(storeAnswerPlayerTwo) {
      setArrayTempTwo(JSON.parse(storeAnswerPlayerTwo));
    }
  }, [])
  useEffect(() => {
    localStorage.setItem("arrayTempTwo", JSON.stringify(arrayTempTwo));
  }, [arrayTempTwo])

  useEffect(() => {
    const storeQuestions = localStorage.getItem("questions");
    if(storeQuestions) {
      setQuestions(JSON.parse(storeQuestions));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("questions", JSON.stringify(questions));
  }, [questions]);
  
  useEffect(() => {
    const storeAnswerList = localStorage.getItem("answerList");
    if(storeAnswerList) {
        setAnswers(JSON.parse(storeAnswerList));
    }
  }, [])
  useEffect(() => {
      localStorage.setItem("answerList", JSON.stringify(answers))
  }, [answers])

  useEffect(() => {
    const storeMatchCount = localStorage.getItem("matchCount");
    if(storeMatchCount) {
      setMatchCount(JSON.parse(storeMatchCount));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("matchCount", JSON.stringify(matchCount))
  },[matchCount]);

  return (
    <div className='bg-gradient-to-tr from-[#00aaff] to-[#e625ff] z-10'>
    <Particel/>
      <Routes>
        <Route path='/' element={
        <Home
          setGameData={setGameData}
          setAnswers={setAnswers}
        ></Home>}></Route>

        <Route path='/create-game' element={
        <CreateGame
          setGameData = {setGameData}
          setPlayerOne = {setPlayerOne}
          setPlayerTwo = {setPlayerTwo}
          playerOne = {playerOne}
          playerTwo = {playerTwo}
          gameData = {gameData}
          setLoading = {setLoading}
          tempArray = {tempArray}
          arrayTempOne = {arrayTempOne}
          arrayTempTwo = {arrayTempTwo}
          setTempArray = {setTempArray}
          setArrayTempOne = {setArrayTempOne}
          setArrayTempTwo = {setArrayTempTwo}
          setQuestions = {setQuestions}
          questions = {questions}
          setAnswers = {setAnswers}
          setMatchCount = {setMatchCount}
          fetchData={fetchData}
        ></CreateGame>}></Route>

        <Route path='/matches' element={
        <Matches
          loading = {loading}
          gameData = {gameData}
          arrayTempOne = {arrayTempOne}
          arrayTempTwo = {arrayTempTwo}
          setGameData = {setGameData}
          questions = {questions}
          answers = {answers}
          setAnswers = {setAnswers}
          matchCount={matchCount}
        ></Matches>}></Route>

        <Route path='/result' element={
          <Result
            gameData={gameData}
            setFinal={setFinal}
            setGameData = {setGameData}
            matchCount={matchCount}
          ></Result>}></Route>
        <Route path='/final' element={
          <Final
            gameData={gameData}
            final = {final}
            setGameData={setGameData}
            setMatchCount={setMatchCount}
            matchCount={matchCount}
            fectData={fetchData}
            setAnswers={setAnswers}
          ></Final>}></Route>
        <Route path='/history' element={<History></History>}></Route>

      </Routes>
    </div>
  )
}

export default App
