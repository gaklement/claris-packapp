import { button, color } from './theme'

import React from 'react'
import { defaultStyle } from 'substyle'

function WizardAnswers({
  currentQuestionId,
  setPendingAnswer,
  setTravelLength,
  style,
  wizardQuestions,
}) {
  return wizardQuestions[currentQuestionId].id === 'travelLengthQuestion' ? (
    <input
      {...style('numberInput')}
      type="number"
      placeholder="Gib eine Zahl ein"
      onChange={({ target }) => {
        setTravelLength(target.value)
        setPendingAnswer('unLockNextButton')
      }}
    />
  ) : (
    <div {...style('answersContainer')}>
      {wizardQuestions[currentQuestionId].answers.map((answer, key) => (
        <div key={key} {...style('answer')}>
          {
            <input
              key={answer.id}
              type="radio"
              name="answer"
              value={answer.id}
              onClick={() => setPendingAnswer(answer.id)}
            />
          }
          <div>{answer.option}</div>
        </div>
      ))}
    </div>
  )
}

const styled = defaultStyle(() => ({
  answer: {
    display: 'flex',
  },
  answersContainer: {
    width: '80%',
    margin: '0 auto',
  },
  numberInput: {
    backgroundColor: color.secondary,
    border: 'none',
    display: 'block',
    height: 20,
    margin: 'auto',
    paddingLeft: button.padding,
  },
}))

export default styled(WizardAnswers)
