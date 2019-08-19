import { compose, withHandlers, withState } from 'recompose'

import React from 'react'
import { defaultStyle } from 'substyle'
import wizardQuestions from './wizardQuestions'

function Wizard({
  currentQuestionId,
  givenAnswers,
  onNextClick,
  pendingAnswer,
  setPendingAnswer,
  style,
}) {
  const wizardEnd = !wizardQuestions[currentQuestionId]

  return (
    <div {...style}>
      {!wizardEnd && wizardQuestions[currentQuestionId].question}
      {!wizardEnd &&
        wizardQuestions[currentQuestionId].answers.map((answer, key) => (
          <div key={answer} {...style('answer')}>
            <input
              key={answer}
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
            return (
              mappedItems &&
              mappedItems.items.map(item => (
                <div key={`key-${item}`}>{item}</div>
              ))
            )
          })}
        </div>
      ) : (
        <button onClick={onNextClick} type="text" disabled={!pendingAnswer}>
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
  withHandlers({
    onNextClick: ({
      currentQuestionId,
      givenAnswers,
      pendingAnswer,
      setCurrentQuestionId,
      setGivenAnswers,
      setPendingAnswer,
    }) => () => {
      setGivenAnswers([
        ...givenAnswers,
        {
          questionId: currentQuestionId,
          answered: pendingAnswer,
        },
      ])
      setCurrentQuestionId(currentQuestionId + 1)
      setPendingAnswer('')
    },
  }),
  styled
)(Wizard)
