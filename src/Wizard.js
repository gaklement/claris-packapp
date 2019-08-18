import { compose, withState } from 'recompose'

import React from 'react'
import { defaultStyle } from 'substyle'
import wizardQuestions from './wizardQuestions'

function Wizard({ currentQuestionId, setGivenAnswers, style }) {
  return (
    <div {...style}>
      {wizardQuestions[currentQuestionId].question}
      {wizardQuestions[currentQuestionId].answers.map((answer, key) => (
        <div key={key} {...style('answer')}>
          <input type="radio" name="answer" value={`answer-${key}`} />
          <div>{answer}</div>
        </div>
      ))}
    </div>
  )
}

const styled = defaultStyle(() => ({
  width: 400,
  backgroundColor: 'lightblue',
  margin: 'auto',

  answer: {
    display: 'flex',
  },
}))

export default compose(
  withState('currentQuestionId', 'setCurrentQuestionId', 0),
  withState('givenAnswers', 'setGivenAnswers', []),
  styled
)(Wizard)
