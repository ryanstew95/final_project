// quiz.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/quiz.css";
import Quiz from "../asset/THELOGO.png";
import Dude from "../asset/dude.png";
import Dude2 from "../asset/thumbs-down.png";
import Dude3 from "../asset/thinking-dude.png";

const QuizComponent = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [lives, setLives] = useState(5);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [hintUsed, setHintUsed] = useState(false);
  const [showDudeImage, setShowDudeImage] = useState(false); // thumbs up
  const [options, setOptions] = useState([]);
  const [fiftyOptions, setFiftyOptions] = useState([]);
  const [clickFifty, setClickFifty] = useState(false);
  const [clickSwap, setClickSwap] = useState(false);
  const [numberOfquestionsPerRound, setNumberOfQuestionsPerRound] = useState(0);


  const timerDuration = 300; // 5 minutes in seconds
  const [timer, setTimer] = useState(timerDuration);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [timer]);


  const optionLabel = {
    0: "A",
    1: "B",
    2: "C",
    3: "D",
  };


  useEffect(() => {
    if (questions.length > 0 && currentQuestionIndex < questions.length) {
      const opts = [
        questions[currentQuestionIndex].optiona,
        questions[currentQuestionIndex].optionb,
        questions[currentQuestionIndex].optionc,
        questions[currentQuestionIndex].optiond,
      ]
      setOptions(opts);
      setFiftyOptions(opts);
    }
  }, [currentQuestionIndex]);

  const handleSkipClick = async () => {
    if (currentRound === 3 && numberOfquestionsPerRound + 1 === 5) {
      try {
        await navigate("/congrads", { state: { score, lives, startTime } }); // pass the score as state
      } catch (error) {
        console.error("Error navigating to /congrads:", error);
      }
    }
    else if (numberOfquestionsPerRound % 5 === 4) {
      setCurrentRound((prevRound) => prevRound + 1);
      setNumberOfQuestionsPerRound(0);
      setClickFifty(false);
      setClickSwap(false);
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setNumberOfQuestionsPerRound((prevIndex) => prevIndex + 1);
    }
  };

  const handleFiftyClick = () => {
    const question = questions[currentQuestionIndex];
    const correctIndex = Object.keys(optionLabel).find(
      (key) => optionLabel[key] === question.correct_option
    );
    const newOption = [];
    newOption.push(options[correctIndex]);
    let random = Math.floor(Math.random() * 4);
    while (random === +correctIndex) {
      random = Math.floor(Math.random() * 4);
    }

    newOption.push(options[random]);
    setFiftyOptions(newOption);
    setClickFifty(true);
  };

  const handleSwapClick = () => {
    if (numberOfquestionsPerRound + 1 % 5 === 4) {
      setCurrentRound((prevRound) => prevRound + 1);
      setCurrentQuestionIndex(0);
      setNumberOfQuestionsPerRound(0);
      setClickFifty(false);
      setClickSwap(false);
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setClickSwap(true);
    }

  };
  const [showDude2Image, setShowDude2Image] = useState(false); // thumbs down
  const [showDude3Image, setShowDude3Image] = useState(true); // thinking face
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    // Fetch questions
    fetch(`http://localhost:8080/api/questions/${currentRound}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setQuestions(data.questions);
        const opts = [
          data.questions[currentQuestionIndex].optiona,
          data.questions[currentQuestionIndex].optionb,
          data.questions[currentQuestionIndex].optionc,
          data.questions[currentQuestionIndex].optiond,
        ]
        setOptions(opts);
        setFiftyOptions(opts);
        setCurrentQuestionIndex(0);
      })
      .catch((error) => console.error("Error fetching questions:", error));
  }, [currentRound]);

  useEffect(() => {
    // record start time
    setStartTime(new Date());
  }, []);

  const handleAnswerClick = (selectedAnswer) => {
    setNumberOfQuestionsPerRound((prevIndex) => prevIndex + 1);
    console.log("currentRound", currentRound);
    const correctOption = questions[currentQuestionIndex].correct_option;
    // console log for debugging
    console.log("correct option:", correctOption);

    // Map the correct option to the corresponding index (A->0, B->1, C->2, D->3)
    const correctIndex = correctOption.charCodeAt(0) - "A".charCodeAt(0);
    // console log for debugging
    console.log("correct index:", correctIndex);

    let lastScore = 0;

    if (selectedAnswer === correctIndex) {
      // Handle correct answer logic
      console.log("Correct answer!");

      if (hintUsed || clickFifty) {
        setScore((prevScore) => prevScore + 10);
        lastScore = 10;
      } else {
        setScore((prevScore) => prevScore + 20);
        lastScore = 20;
      }

      setShowDudeImage(true);
      setShowDude2Image(false);
      setShowDude3Image(false);

      setTimeout(() => {
        setShowDudeImage(false);
        setShowDude3Image(true);
        handleNextClick(lastScore);
      }, 1500);
    } else {
      console.log("Wrong answer!");
      setLives((prevLives) => prevLives - 1);
      // setScore((prevScore) => prevScore);
      setShowDudeImage(false);
      setShowDude2Image(true);
      setShowDude3Image(false);
      setScore((prevScore) => prevScore - 10);
      lastScore = -10;
      setTimeout(() => {
        setShowDude2Image(false);
        setShowDude3Image(true);
        handleNextClick(lastScore);
      }, 1500);
    }
  };

  const handleHintClick = () => {
    setHintUsed(true); // Set hintUsed to true when the hint is clicked
    setShowHint(true); // Show the hint
  };

  const handleNextClick = async (lastScore) => {
    if (currentRound === 3 && numberOfquestionsPerRound + 1 === 5) {
      try {
        await navigate("/congrads", {
          state: { score: score + lastScore, lives, startTime },
        }); 
      } catch (error) {
        console.error("Error navigating to /congrads:", error);
      }
    } else {
      setNumberOfQuestionsPerRound ((prevIndex) => prevIndex + 1);
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setShowHint(false); // Reset the hint display when moving to the next question
      setHintUsed(false);

      if (numberOfquestionsPerRound % 5 === 4) {
        // Move to the next round after every 5 questions
        setCurrentRound((prevRound) => prevRound + 1);
        setNumberOfQuestionsPerRound(0);
        setClickFifty(false);
        setClickSwap(false);
      }

      if (lives === 0) {
        // All lives are gone, navigate to the home page
        try {
          await navigate("/");
        } catch (error) {
          console.error("Error navigating to /:", error);
        }
      }
    }
  };

  if (questions.length === 0) {
    return <p>Loading...</p>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="container">
      <img className="logo" src={Quiz} alt="quizjs" />

      {/* {currentQuestionIndex > questions.length - 1 ? <span>No More questions</span> : */}

      <div className="game">
        <p className="round">Round {currentRound}</p>
        <p className="questions">{currentQuestion.question}</p>
        <ul className="answers">
          {options.map((option, index) => (
            <li key={index}>
              <button
                className="buttons"
                onClick={() => handleAnswerClick(index)}
              >
                {optionLabel[index]}.
                {fiftyOptions.length === 2
                  ? fiftyOptions.includes(option)
                    ? option
                    : ""
                  : option}
              </button>
            </li>
          ))}
        </ul>
        {showDudeImage && <img className="dude" src={Dude} alt="Dude" />}
        {showDude2Image && <img className="dude2" src={Dude2} alt="Dude2" />}
        {showDude3Image && <img className="dude3" src={Dude3} alt="Dude3" />}
        <p className="lives">
          Lives: {Array.from({ length: lives }, (_, index) => "❤️").join(" ")}
        </p>
        <p className="score">Score: {score}</p>
        <p className="timer">
          Time Left: {Math.floor(timer / 60)}:
          {(timer % 60).toString().padStart(2, "0")}
        </p>{" "}
        {showHint && <p className="hint">Hint: {currentQuestion.hint}</p>}
        <button className="h-button" onClick={handleHintClick}>
          Hint
        </button>
        <button className="s-button" onClick={handleSkipClick}>
          Skip
        </button>
        <button
          disabled={options.length < 4 || clickFifty}
          className="fifty-fifty-button"
          onClick={handleFiftyClick}
        >
          50/50
        </button>
        <button disabled={clickSwap} className="switch-button" onClick={handleSwapClick}>
          Swap
        </button>
      </div>
    </div>
  );
};

export default QuizComponent;
