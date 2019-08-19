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
  const currentQuestion =
    wizardQuestions[currentQuestionId] &&
    wizardQuestions[currentQuestionId].question
  const currentAnswers =
    wizardQuestions[currentQuestionId] &&
    wizardQuestions[currentQuestionId].answers
  const wizardEnd = !wizardQuestions[currentQuestionId]
  return (
    <div {...style}>
      {currentQuestion}
      {currentAnswers.map((answer, key) => (
        <div key={answer} {...style('answer')}>
          <input
            key={answer}
            type="radio"
            name="answer"
            value={answer}
            onClick={setPendingAnswer(answer)}
          />
          <div>{answer}</div>
        </div>
      ))}
      {wizardEnd ? (
        <div>
          Done:
          {givenAnswers.map((answer, key) => {
            const question = wizardQuestions.find(wizardQuestion => {
              return wizardQuestion.id === answer.questionId
            })

            const mappedItems = question.itemsMap.find(map => {
              return map.id === answer.answered
            })
            return (
              mappedItems &&
              mappedItems.items.map(item => (
                <div key={`key-${item}`}>{item}</div>
              ))
            )
          })}
        </div>
      ) : (
        <button
          onClick={ev => {
            setGivenAnswers([
              ...givenAnswers,
              {
                questionId: currentQuestionId,
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
