import { compose, withHandlers, withState } from 'recompose'

import React from 'react'
import { defaultStyle } from 'substyle'
import { isNil } from 'lodash'
import wizardQuestions from './wizardQuestions'

function Wizard({
  currentQuestionId,
  onNextClick,
  pendingAnswer,
  setPendingAnswer,
  style,
}) {
  const wizardEnd = !wizardQuestions[currentQuestionId]

  return (
    <div {...style}>
      {!wizardEnd && (
        <div id="question">{`${wizardQuestions[currentQuestionId].question}`}</div>
      )}
      {!wizardEnd &&
        wizardQuestions[currentQuestionId].answers.map((answer, key) => (
          <div key={key} {...style('answer')}>
            <input
              key={answer.id}
              type="radio"
              name="answer"
              value={answer.id}
              onClick={() => setPendingAnswer(answer.id)}
            />
            <div>{answer.option}</div>
          </div>
        ))}
      {!wizardEnd && (
        <button
          id="next"
          onClick={onNextClick}
          type="text"
          disabled={isNil(pendingAnswer)}
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
  withHandlers({
    onNextClick: ({
      currentQuestionId,
      givenAnswers,
      onWizardComplete,
      pendingAnswer,
      setCurrentQuestionId,
      setGivenAnswers,
      setPendingAnswer,
    }) => () => {
      const options = wizardQuestions[currentQuestionId].answers
      const mappedItems = options.find(option => option.id === pendingAnswer)
        .items
      const wizardEnd = !wizardQuestions[currentQuestionId + 1]

      if (wizardEnd) {
        onWizardComplete([...givenAnswers, ...mappedItems])
      }

      setGivenAnswers([...givenAnswers, ...mappedItems])
      setCurrentQuestionId(currentQuestionId + 1)
      setPendingAnswer(null)
    },
  }),
  styled
)(Wizard)
