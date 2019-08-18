import { compose, withState } from 'recompose'

import React from 'react'
import { defaultStyle } from 'substyle'
import wizardQuestions from './wizardQuestions'

function Wizard({
  currentQuestionId,
  givenAnswers,
  pendingAnswer,
  setGivenAnswers,
  setPendingAnswer,
  setCurrentQuestionId,
  style,
}) {
  console.log('given', givenAnswers)
  return (
    <div {...style}>
      {wizardQuestions[currentQuestionId] &&
        wizardQuestions[currentQuestionId].question}
      {wizardQuestions[currentQuestionId] &&
        wizardQuestions[currentQuestionId].answers.map((answer, key) => (
          <div key={key} {...style('answer')}>
            <input
              type="radio"
              name="answer"
              value={key}
              onClick={() => setPendingAnswer(key)}
            />
            <div>{answer}</div>
          </div>
        ))}
      {wizardQuestions[currentQuestionId] && (
        <button
          onClick={ev => {
            setGivenAnswers([
              ...givenAnswers,
              {
                question: currentQuestionId,
                answered: pendingAnswer,
              },
            ])
            setCurrentQuestionId(currentQuestionId + 1)
          }}
          type="text"
        >
          Next
        </button>
      )}
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
  withState('pendingAnswer', 'setPendingAnswer'),
  styled
)(Wizard)
