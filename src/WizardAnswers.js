import { button, color } from './theme'

import React from 'react'
import { defaultStyle } from 'substyle'

function WizardAnswers({
  currentQuestionAnswers,
  currentQuestionId,
  setPendingAnswer,
  setTravelLength,
  style,
}) {
  return currentQuestionId === 'travelLength' ? (
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
      {currentQuestionAnswers.map((answer, key) => (
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
