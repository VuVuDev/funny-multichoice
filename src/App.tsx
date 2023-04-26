import { useState, useEffect } from 'react'
import {Routes, Route} from "react-router-dom"

import './App.css'
import Home from './pages/Home'
import Result from './pages/Result'
import Matches from './pages/Matches'
import CreateGame from './pages/CreateGame'
// import Particel from './components/Particle'
import History from './pages/History'
import Final from './pages/Final'


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

function App() {
  const [playerOne, setPlayerOne] = useState<IPlayer['player']>({ 
    id: 1, 
    name: '', 
    status: ''
  });
  const [playerTwo, setPlayerTwo] = useState<IPlayer['player']>({ 
    id: 2, 
    name: '', 
    status: ''
  });
  const [gameData, setGameData] = useState<IPlayer['player'][]>([]);
  const [loading, setLoading] = useState<boolean>(false);  
  const [tempArray, setTempArray] = useState<ITempArray['temp'][]>([{
    text:'',
    answers:[],
  }])
  const [arrayTempOne, setArrayTempOne] = useState<string[]>([]);
  const [arrayTempTwo, setArrayTempTwo] = useState<string[]>([]);
  const [answersPlayerOne, setAnswersPlayerOne] = useState<string[]>([]);
  const [answersPlayerTwo, setAnswersPlayerTwo] = useState<string[]>([]);
  const [questions, setQuestions] = useState<ITempArray['temp'][]>([]);
  const [answers, setAnswers] = useState<string[]>(Array.from({length: 6} , () => "empty"));
  console.log(answersPlayerOne);
  console.log(answersPlayerTwo);

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
        setAnswers(JSON.parse(storeAnswerList))
    }
  }, [])
  useEffect(() => {
      localStorage.setItem("answerList", JSON.stringify(answers))
  }, [answers])

  return (
    <div className='bg-gradient-to-tr from-[#00aaff] to-[#e625ff] z-10'>
    {/* <Particel/> */}
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
          setAnswersPlayerOne = {setAnswersPlayerOne}
          setAnswersPlayerTwo = {setAnswersPlayerTwo}
        ></Matches>}></Route>

        <Route path='/result' element={<Result></Result>}></Route>
        <Route path='/final' element={<Final></Final>}></Route>
        <Route path='/history' element={<History></History>}></Route>

      </Routes>
    </div>
  )
}

export default App
