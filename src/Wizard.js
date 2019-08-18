import { compose, withHandlers, withState } from 'recompose'

import React from 'react'
import { defaultStyle } from 'substyle'
import wizardQuestions from './wizardQuestions'

function Wizard({ currentQuestionId, onClick, style, wizardActive }) {
  return (
    <div {...style()}>
      <button onClick={onClick}>Wizard</button>
      {wizardActive && (
        <div {...style('container')}>
          {wizardQuestions[currentQuestionId].question}
          {wizardQuestions[currentQuestionId].answers.map((answer, key) => (
            <div
              key={key}
              {...style('answer')}
              onClick={ev => console.log(ev.target.value)}
            >
              <input type="radio" />
              <div>{answer}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const styled = defaultStyle(() => ({
  container: {
    width: 400,
    backgroundColor: 'lightblue',
    margin: 'auto',
  },
  answer: {
    display: 'flex',
  },
}))

export default compose(
  withState('wizardActive', 'setWizardActive', false),
  withState('currentQuestionId', 'setCurrentQuestionId', 0),
  withHandlers({
    onClick: ({ setWizardActive }) => () => {
      setWizardActive(true)
    },
  }),
  styled
)(Wizard)
