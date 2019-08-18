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
  console.log('pend', pendingAnswer)
  const wizardEnd = !wizardQuestions[currentQuestionId]
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
              value={answer}
              onClick={() => setPendingAnswer(answer)}
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
            return mappedItems.items.map(item => <div key={key}>{item}</div>)
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
