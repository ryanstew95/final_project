import React from 'react'
import '../style/App.css'
import InstructionImage from '../asset/instruction.png'
import Quiz from '../asset/THELOGO.png'
import 'animate.css'
import Brandon from '../asset/brandon.png'
import VolumeButton from './VolumeButton'
import '../style/header.css'

function header (props) {
  if (props.page === 'home') {
    return (
      <div className="top-page-container">
        <div className="top-page">
          <div className="quizjs">
            <img
              className="animate__animated animate__backInDown"
              src={Quiz}
              alt="quizjs"
            />
          </div>
          <div className="des-container">
            <div className="des">
              <h1>
                QuizJS is a series of questions that defy conventional thinking
                and logic.
              </h1>
              <h1>
                Test your wit against a series of fun, unexpected, and absurd
                questions!
              </h1>
            </div>
          </div>
          <VolumeButton />
        </div>
      </div>
    )
  }

  if (props.page === 'instructions') {
    return (
      <div className="top-page-container">
        <div className="top-page">
          <img
            src={InstructionImage}
            alt="instructions"
            className="instruction-image"
          />
          <VolumeButton />
        </div>
      </div>
    )
  }

  if (props.page === 'quiz') {
    return (
      <div className="top-page-container">
        <div className="top-page">
          <div className="quizjs">
            <img className="quizjs-image" src={Quiz} alt="quizjs" />
          </div>
          <VolumeButton />
        </div>
      </div>
    )
  }

  if (props.page === 'congrads') {
    return (
      <div className="top-page">
        <div className="logo">
          <img className="dude" src={Brandon} alt="dude" />
          <img className="quiz" src={Quiz} alt="quizjs" />
        </div>
      </div>
    )
  } else {
    return <h1>header</h1>
  }
}

export default header
